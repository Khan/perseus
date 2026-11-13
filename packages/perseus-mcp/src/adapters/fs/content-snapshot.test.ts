import {mkdir, mkdtemp, rm, writeFile} from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
    CoreWidgetRegistry,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {
    ARTICLE_DIR,
    EXERCISE_DIR,
    readSnapshotIndex,
    snapshotDocuments,
} from "./content-snapshot";

import type {SnapshotSkips} from "./content-snapshot";
import type {ContentDocument} from "../../domain/search/content-document";

const PATH = [{id: "d"}, {id: "c"}, {id: "u"}, {id: "l"}];

const ARTICLE = [generateTestPerseusRenderer({content: "Read me"})];

function itemData(content: string) {
    return generateTestPerseusItem({
        question: generateTestPerseusRenderer({content}),
    });
}

describe("content snapshot", () => {
    let dir: string;

    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    beforeEach(async () => {
        dir = await mkdtemp(path.join(os.tmpdir(), "content-snapshot-"));
        await mkdir(path.join(dir, EXERCISE_DIR), {recursive: true});
        await mkdir(path.join(dir, ARTICLE_DIR), {recursive: true});
        const index = {
            version: "v1",
            domains: [{id: "d", slug: "math", title: "Math", listed: true}],
            courses: [
                {id: "c", slug: "algebra", title: "Algebra", listed: true},
                {id: "cx", slug: "staging", title: "Staging", listed: false},
            ],
            units: [
                {id: "u", slug: "equations", title: "Equations", listed: true},
            ],
            lessons: [
                {id: "l", slug: "one-step", title: "One-step", listed: true},
            ],
            exercises: [
                {
                    id: "e1",
                    contentId: "e1",
                    title: "Solve equations",
                    slug: "solve",
                    defaultUrlPath: "/math/algebra/e/solve",
                    listed: true,
                    topicPaths: [{path: [...PATH, {id: "e1"}]}],
                    translatedPerseusContentSha: "new",
                    problemTypes: [
                        {
                            name: "Type 1",
                            items: [
                                {id: "i1", sha: "s1", live: true},
                                {id: "missing", sha: "s2", live: true},
                            ],
                        },
                    ],
                },
                {
                    id: "e2",
                    contentId: "e2",
                    title: "No file",
                    translatedPerseusContentSha: "none",
                    problemTypes: [],
                },
                // Shares i1 with e1, from a staging course.
                {
                    id: "e3",
                    contentId: "e3",
                    title: "Staging copy",
                    slug: "staging-copy",
                    defaultUrlPath: "/math/staging/e/copy",
                    listed: true,
                    topicPaths: [{path: [{id: "d"}, {id: "cx"}, {id: "e3"}]}],
                    translatedPerseusContentSha: "cur",
                    problemTypes: [
                        {name: "Shared", items: [{id: "i1", sha: "s1"}]},
                    ],
                },
            ],
            articles: [
                {
                    id: "a1",
                    contentId: "a1",
                    title: "About equations",
                    defaultUrlPath: "/math/algebra/a/about",
                    listed: true,
                    topicPaths: [{path: [...PATH, {id: "a1"}]}],
                    translatedPerseusContentSha: "art",
                },
            ],
        };
        await writeFile(
            path.join(dir, "snapshot-en.json"),
            JSON.stringify(index, null, "\t"),
        );
        // An older version, which isn't read, and the current one.
        await writeFile(
            path.join(dir, EXERCISE_DIR, "e1-old.json"),
            JSON.stringify([{id: "i1", item_data: itemData("Old text")}]),
        );
        await writeFile(
            path.join(dir, EXERCISE_DIR, "e1-new.json"),
            JSON.stringify([
                {id: "i1", item_data: itemData("Solve $x+1=2$.")},
                {id: "unlisted", item_data: itemData("Not in the index")},
            ]),
        );
        await writeFile(
            path.join(dir, EXERCISE_DIR, "e3-cur.json"),
            JSON.stringify([{id: "i1", item_data: itemData("Solve $x+1=2$.")}]),
        );
        await writeFile(
            path.join(dir, ARTICLE_DIR, "a1-art.json"),
            JSON.stringify(ARTICLE),
        );
    });

    afterEach(async () => {
        await rm(dir, {recursive: true, force: true});
    });

    it("makes one document per listed item of the current version, and per article", async () => {
        // Arrange
        const index = await readSnapshotIndex(dir);
        const skips: SnapshotSkips = {
            missingFiles: 0,
            missingItems: 0,
            unparsable: [],
        };

        // Act
        const documents: ContentDocument[] = [];
        for await (const document of snapshotDocuments(dir, index, skips)) {
            documents.push(document);
        }

        // Assert
        expect(documents).toEqual([
            expect.objectContaining({
                id: "item-i1",
                kind: "item",
                title: ["Solve equations", "Staging copy"],
                exerciseId: ["e1", "e3"],
                problemType: ["Type 1", "Shared"],
                listed: true,
                text: "Solve .",
                math: ["x+1=2"],
                domain: ["math"],
                // Only its listed paths: the staging course is unlisted.
                course: ["algebra"],
                lessonTitle: ["One-step"],
                sourceFile: `${EXERCISE_DIR}/e1-new.json`,
                snapshotVersion: "v1",
            }),
            expect.objectContaining({
                id: "article-a1",
                kind: "article",
                title: ["About equations"],
                listed: true,
                text: "Read me",
                unit: ["equations"],
                sourceFile: `${ARTICLE_DIR}/a1-art.json`,
            }),
        ]);
        expect(skips).toEqual({
            missingFiles: 1,
            missingItems: 1,
            unparsable: [],
        });
    });

    it("lists each item Perseus can't parse, with its file", async () => {
        // Arrange
        await writeFile(
            path.join(dir, EXERCISE_DIR, "e1-new.json"),
            JSON.stringify([{id: "i1", item_data: {question: 5}}]),
        );
        const index = await readSnapshotIndex(dir);
        const skips: SnapshotSkips = {
            missingFiles: 0,
            missingItems: 0,
            unparsable: [],
        };

        // Act
        const documents: ContentDocument[] = [];
        for await (const document of snapshotDocuments(dir, index, skips)) {
            documents.push(document);
        }

        // Assert
        expect(documents.map((d) => d.id)).toEqual(["article-a1"]);
        expect(skips.unparsable).toEqual([
            {
                kind: "item",
                contentId: "i1",
                sourceFile: `${EXERCISE_DIR}/e1-new.json`,
                reason: expect.any(String),
            },
        ]);
    });
});
