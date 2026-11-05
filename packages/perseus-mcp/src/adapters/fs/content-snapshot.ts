import {existsSync} from "node:fs";
import {readFile} from "node:fs/promises";
import path from "node:path";

import {
    isFailure,
    parseAndMigratePerseusArticle,
} from "@khanacademy/perseus-core";

import {parseItem} from "../../domain/items/parse";
import {placeContent} from "../../domain/search/content-document";
import {
    articleContentFields,
    itemContentFields,
} from "../../domain/search/content-fields";

import {readTopLevelFromFile} from "./top-level-json";

import type {
    ContentDocument,
    ContentTree,
    TopicPath,
    TreeNode,
} from "../../domain/search/content-document";
import type {ContentSource} from "../../ports/content-search";

/*
 * A content snapshot is a folder of published content:
 *
 * - `snapshot-en.json`, an index: the content tree (domains, courses,
 *   units, lessons), each exercise with its problem types and their items,
 *   and each article;
 * - `Exercise.TranslatedPerseusContent/en/<contentId>-<sha>.json`, every
 *   version of each exercise's items (a list of items, `item_data` each);
 * - `Article.TranslatedPerseusContent/en/<contentId>-<sha>.json`, every
 *   version of each article (a list of renderers).
 *
 * The current version of an exercise or article is the file whose sha is
 * its `translatedPerseusContentSha` in the index; only those are read, and
 * of an exercise's items only those its problem types list. English only.
 */

const INDEX_FILE = "snapshot-en.json";
export const EXERCISE_DIR = "Exercise.TranslatedPerseusContent/en";
export const ARTICLE_DIR = "Article.TranslatedPerseusContent/en";

type SnapshotItemRef = {
    id: string;
    sha: string;
    live?: boolean;
    aiGenerated?: boolean;
};

type SnapshotContent = {
    id: string;
    contentId: string;
    title: string;
    slug: string;
    defaultUrlPath: string;
    listed: boolean;
    topicPaths: TopicPath[] | null;
    translatedPerseusContentSha?: string;
};

type SnapshotExercise = SnapshotContent & {
    problemTypes: Array<{name: string; items: SnapshotItemRef[]}> | null;
};

/** What the index says, kept to what search documents need. */
export type SnapshotIndex = {
    version: string;
    tree: ContentTree;
    exercises: SnapshotExercise[];
    articles: SnapshotContent[];
};

const TREE_KEYS = ["domains", "courses", "units", "lessons"] as const;
type TreeKey = (typeof TREE_KEYS)[number];

function isTreeKey(key: string): key is TreeKey {
    return TREE_KEYS.some((treeKey) => treeKey === key);
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return value != null && typeof value === "object" && !Array.isArray(value);
}

function str(value: unknown): string {
    return typeof value === "string" ? value : "";
}

function contentOf(entry: Record<string, unknown>): SnapshotContent {
    return {
        id: str(entry.id),
        contentId: str(entry.contentId) || str(entry.id),
        title: str(entry.title),
        slug: str(entry.slug),
        defaultUrlPath: str(entry.defaultUrlPath),
        listed: entry.listed === true,
        topicPaths: Array.isArray(entry.topicPaths)
            ? entry.topicPaths.filter(
                  (p): p is TopicPath => isRecord(p) && Array.isArray(p.path),
              )
            : null,
        translatedPerseusContentSha:
            str(entry.translatedPerseusContentSha) || undefined,
    };
}

function problemTypesOf(value: unknown): SnapshotExercise["problemTypes"] {
    if (!Array.isArray(value)) {
        return null;
    }
    return value.filter(isRecord).map((problemType) => ({
        name: str(problemType.name),
        items: Array.isArray(problemType.items)
            ? problemType.items.filter(isRecord).map((item) => ({
                  id: str(item.id),
                  sha: str(item.sha),
                  live: typeof item.live === "boolean" ? item.live : undefined,
                  aiGenerated:
                      typeof item.aiGenerated === "boolean"
                          ? item.aiGenerated
                          : undefined,
              }))
            : [],
    }));
}

/** Reads a snapshot's index, streaming it: it's too large to read whole. */
export async function readSnapshotIndex(
    snapshotDir: string,
): Promise<SnapshotIndex> {
    const nodes: Record<TreeKey, Map<string, TreeNode>> = {
        domains: new Map<string, TreeNode>(),
        courses: new Map<string, TreeNode>(),
        units: new Map<string, TreeNode>(),
        lessons: new Map<string, TreeNode>(),
    };
    const index: SnapshotIndex = {
        version: "",
        tree: nodes,
        exercises: [],
        articles: [],
    };
    const keys = new Set(["version", "exercises", "articles", ...TREE_KEYS]);
    for await (const {key, value} of readTopLevelFromFile(
        path.join(snapshotDir, INDEX_FILE),
        keys,
    )) {
        if (key === "version") {
            index.version = str(value);
        } else if (!isRecord(value)) {
            continue;
        } else if (key === "exercises") {
            index.exercises.push({
                ...contentOf(value),
                problemTypes: problemTypesOf(value.problemTypes),
            });
        } else if (key === "articles") {
            index.articles.push(contentOf(value));
        } else if (isTreeKey(key)) {
            const id = str(value.id);
            nodes[key].set(id, {
                id,
                slug: str(value.slug),
                title: str(value.title),
                listed: value.listed === true,
            });
        }
    }
    return index;
}

/** What reading a snapshot's documents skipped, and why. */
export type SnapshotSkips = {
    /** Exercises and articles with no current content file. */
    missingFiles: number;
    /** Items the index lists that their exercise's file doesn't have. */
    missingItems: number;
    /** Items and articles Perseus couldn't parse. */
    unparsable: number;
};

/** An item's place in an exercise, as the index lists it. */
type ItemUse = {
    exercise: SnapshotExercise;
    problemType: string;
    ref: SnapshotItemRef;
};

/** Every exercise and problem type each item is in, in the index's order. */
function itemUses(index: SnapshotIndex): Map<string, ItemUse[]> {
    const uses = new Map<string, ItemUse[]>();
    for (const exercise of index.exercises) {
        for (const problemType of exercise.problemTypes ?? []) {
            for (const ref of problemType.items) {
                const list = uses.get(ref.id) ?? [];
                list.push({exercise, problemType: problemType.name, ref});
                uses.set(ref.id, list);
            }
        }
    }
    return uses;
}

function unique(values: ReadonlyArray<string>): string[] {
    return [...new Set(values)];
}

/**
 * A search document per current item and article in a snapshot, in the
 * index's order: exercises first. An item in several exercises gets one
 * document listing them all, read from the first of them whose file has
 * it. `skips` counts what was left out.
 */
export async function* snapshotDocuments(
    snapshotDir: string,
    index: SnapshotIndex,
    skips: SnapshotSkips,
): AsyncGenerator<ContentDocument> {
    const usesOf = itemUses(index);
    const done = new Set<string>();
    for (const exercise of index.exercises) {
        const sourceFile = currentFile(EXERCISE_DIR, exercise);
        const fullPath =
            sourceFile == null ? null : path.join(snapshotDir, sourceFile);
        if (sourceFile == null || fullPath == null || !existsSync(fullPath)) {
            skips.missingFiles++;
            continue;
        }
        const raw: unknown = JSON.parse(await readFile(fullPath, "utf8"));
        const items = new Map<string, unknown>();
        if (Array.isArray(raw)) {
            for (const entry of raw) {
                if (isRecord(entry)) {
                    items.set(str(entry.id), entry.item_data);
                }
            }
        }
        for (const problemType of exercise.problemTypes ?? []) {
            for (const ref of problemType.items) {
                if (done.has(ref.id)) {
                    continue;
                }
                if (!items.has(ref.id)) {
                    skips.missingItems++;
                    continue;
                }
                done.add(ref.id);
                const parsed = parseItem(items.get(ref.id));
                if (!parsed.ok) {
                    skips.unparsable++;
                    continue;
                }
                const uses = usesOf.get(ref.id) ?? [];
                const exercises = [...new Set(uses.map((u) => u.exercise))];
                const {listed, ...placement} = placeContent(
                    index.tree,
                    exercises.map((e) => ({
                        listed: e.listed,
                        topicPaths: e.topicPaths ?? [],
                    })),
                );
                yield {
                    id: `item-${ref.id}`,
                    kind: "item",
                    contentId: ref.id,
                    title: unique(exercises.map((e) => e.title)),
                    url: unique(exercises.map((e) => e.defaultUrlPath)),
                    listed,
                    exerciseId: unique(exercises.map((e) => e.contentId)),
                    exerciseSlug: unique(exercises.map((e) => e.slug)),
                    problemType: unique(uses.map((u) => u.problemType)),
                    live: uses.some((u) => u.ref.live === true),
                    aiGenerated: ref.aiGenerated,
                    sourceFile,
                    snapshotVersion: index.version,
                    ...placement,
                    ...itemContentFields(parsed.item),
                };
            }
        }
    }
    for (const article of index.articles) {
        const sourceFile = currentFile(ARTICLE_DIR, article);
        const fullPath =
            sourceFile == null ? null : path.join(snapshotDir, sourceFile);
        if (sourceFile == null || fullPath == null || !existsSync(fullPath)) {
            skips.missingFiles++;
            continue;
        }
        let parsed: ReturnType<typeof parseAndMigratePerseusArticle>;
        try {
            parsed = parseAndMigratePerseusArticle(
                await readFile(fullPath, "utf8"),
            );
        } catch {
            // It throws on a file that isn't JSON.
            skips.unparsable++;
            continue;
        }
        if (isFailure(parsed)) {
            skips.unparsable++;
            continue;
        }
        const sections = Array.isArray(parsed.value)
            ? parsed.value
            : [parsed.value];
        const {listed, ...placement} = placeContent(index.tree, [
            {listed: article.listed, topicPaths: article.topicPaths ?? []},
        ]);
        yield {
            id: `article-${article.contentId}`,
            kind: "article",
            contentId: article.contentId,
            title: [article.title],
            url: [article.defaultUrlPath],
            listed,
            sourceFile,
            snapshotVersion: index.version,
            ...placement,
            ...articleContentFields(sections),
        };
    }
}

/** The current content file's path in the snapshot, if the index has one. */
function currentFile(dir: string, content: SnapshotContent): string | null {
    const sha = content.translatedPerseusContentSha;
    return sha == null ? null : `${dir}/${content.contentId}-${sha}.json`;
}

/**
 * Reads items back from a snapshot's content files, for an import. A
 * `sourceFile` comes from the search index, so one that would leave the
 * snapshot's folder is refused. The last file read is kept, since an
 * import reads several items from each.
 */
export function createSnapshotContentSource(): ContentSource {
    let last: {file: string; items: Map<string, unknown>} | null = null;
    return {
        async readItem(snapshotDir, sourceFile, itemId) {
            const root = path.resolve(snapshotDir);
            const file = path.resolve(root, sourceFile);
            if (!file.startsWith(root + path.sep) || !existsSync(file)) {
                return undefined;
            }
            if (last?.file !== file) {
                const raw: unknown = JSON.parse(await readFile(file, "utf8"));
                const items = new Map<string, unknown>();
                if (Array.isArray(raw)) {
                    for (const entry of raw) {
                        if (isRecord(entry)) {
                            items.set(str(entry.id), entry.item_data);
                        }
                    }
                }
                last = {file, items};
            }
            return last.items.get(itemId);
        },
    };
}
