import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import {
    readSnapshotIndex,
    snapshotDocuments,
} from "../src/adapters/fs/content-snapshot";
import {createMeilisearchClient} from "../src/adapters/search/meilisearch";
import {createSreMathSpeech} from "../src/adapters/search/sre-math-speech";
import {
    CONTENT_INDEX_SETTINGS,
    CONTENT_INDEX_UID,
    CONTENT_META_INDEX_UID,
    INDEX_META_ID,
} from "../src/domain/search/content-document";

import type {SnapshotSkips} from "../src/adapters/fs/content-snapshot";
import type {
    ContentDocument,
    IndexMeta,
} from "../src/domain/search/content-document";

export type BuildSearchIndexOptions = {
    snapshotDir: string;
    /** Meilisearch's URL, such as `http://localhost:7700`. */
    url: string;
    apiKey?: string;
    /** The index to build. Default `CONTENT_INDEX_UID`. */
    indexUid?: string;
    log: (line: string) => void;
};

export type BuildSearchIndexResult = SnapshotSkips & {
    documents: number;
    items: number;
    articles: number;
    snapshotVersion: string;
};

const BATCH_SIZE = 1000;

/**
 * Builds the content search index from a content snapshot. The documents go
 * into a new index, `<indexUid>-building`, which replaces `indexUid` only
 * once it's complete, so search keeps working while it's rebuilt.
 */
export async function buildSearchIndex(
    options: BuildSearchIndexOptions,
): Promise<BuildSearchIndexResult> {
    const {log, indexUid = CONTENT_INDEX_UID} = options;
    const client = createMeilisearchClient({
        url: options.url,
        apiKey: options.apiKey,
    });
    // Migrating items looks widgets up in the registry.
    CoreWidgetRegistry.registerCoreWidgets();
    const speak = await createSreMathSpeech();

    log(`Reading the snapshot index in ${options.snapshotDir}`);
    const index = await readSnapshotIndex(options.snapshotDir);
    log(
        `Snapshot ${index.version}: ${index.exercises.length} exercises, ` +
            `${index.articles.length} articles`,
    );

    const building = `${indexUid}-building`;
    await client.deleteIndex(building);
    await client.createIndex(building, "id");
    await client.updateSettings(building, CONTENT_INDEX_SETTINGS);

    const skips: SnapshotSkips = {
        missingFiles: 0,
        missingItems: 0,
        unparsable: [],
    };
    const result: BuildSearchIndexResult = {
        ...skips,
        documents: 0,
        items: 0,
        articles: 0,
        snapshotVersion: index.version,
    };
    const tasks: number[] = [];
    let batch: ContentDocument[] = [];
    const send = async () => {
        if (batch.length > 0) {
            tasks.push(await client.addDocuments(building, batch));
            batch = [];
        }
    };
    for await (const document of snapshotDocuments(
        options.snapshotDir,
        index,
        skips,
        speak,
    )) {
        batch.push(document);
        result.documents++;
        result[document.kind === "item" ? "items" : "articles"]++;
        if (batch.length >= BATCH_SIZE) {
            await send();
            if (result.documents % (BATCH_SIZE * 20) === 0) {
                log(`Sent ${result.documents} documents`);
            }
        }
    }
    await send();
    log(`Sent ${result.documents} documents; waiting for Meilisearch`);
    // Tasks run in order, but each can fail on its own.
    for (const task of tasks) {
        await client.waitForTask(task);
    }

    if (!(await client.indexExists(indexUid))) {
        await client.createIndex(indexUid, "id");
    }
    await client.swapIndexes(indexUid, building);
    await client.deleteIndex(building);

    // What the index was built from, for get_server_info and for imports,
    // which read items from the snapshot. Only for the default index: the
    // meta index describes that one.
    if (indexUid === CONTENT_INDEX_UID) {
        if (!(await client.indexExists(CONTENT_META_INDEX_UID))) {
            await client.createIndex(CONTENT_META_INDEX_UID, "id");
        }
        const meta: IndexMeta = {
            id: INDEX_META_ID,
            snapshotDir: options.snapshotDir,
            snapshotVersion: index.version,
            builtAt: new Date().toISOString(),
            items: result.items,
            articles: result.articles,
        };
        await client.waitForTask(
            await client.addDocuments(CONTENT_META_INDEX_UID, [meta]),
        );
    }
    return {...result, ...skips};
}
