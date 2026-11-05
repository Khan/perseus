/**
 * A small client for Meilisearch's REST API: the calls the content search
 * index needs, to build and to search. Meilisearch runs writes as tasks,
 * one after another; `waitForTask` waits for one to finish and throws if it
 * failed.
 */
export type MeilisearchClient = {
    /**
     * Searches an index (`POST /indexes/<uid>/search`). The reply is
     * Meilisearch's, unchecked: T is what the caller expects of it.
     */
    search<T>(uid: string, body: object): Promise<T>;
    /** A document by id, or undefined when there's none; unchecked, too. */
    getDocument<T>(uid: string, id: string): Promise<T | undefined>;
    /** How many documents an index holds. */
    documentCount(uid: string): Promise<number>;
    indexExists(uid: string): Promise<boolean>;
    createIndex(uid: string, primaryKey: string): Promise<void>;
    deleteIndex(uid: string): Promise<void>;
    updateSettings(uid: string, settings: object): Promise<void>;
    /** Queues documents to add, returning the task's uid to wait for. */
    addDocuments(
        uid: string,
        documents: ReadonlyArray<object>,
    ): Promise<number>;
    /** Swaps two indexes' contents, so a rebuilt index replaces the old. */
    swapIndexes(a: string, b: string): Promise<void>;
    waitForTask(taskUid: number): Promise<void>;
};

export type MeilisearchOptions = {
    /** Such as `http://localhost:7700`. */
    url: string;
    apiKey?: string;
    /** How long to wait for a task. Default 10 minutes. */
    taskTimeoutMs?: number;
};

type TaskReply = {taskUid: number};
type Task = {
    status: "enqueued" | "processing" | "succeeded" | "failed" | "canceled";
    error?: {message: string; code?: string} | null;
};

/** A request Meilisearch refused, with its error code when it gave one. */
export class MeilisearchRequestError extends Error {
    readonly status: number;
    readonly code: string | undefined;

    constructor(message: string, status: number, code: string | undefined) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

/** A task that failed, with Meilisearch's error code when it gave one. */
class MeilisearchTaskError extends Error {
    readonly code: string | undefined;

    constructor(message: string, code: string | undefined) {
        super(message);
        this.code = code;
    }
}

export function createMeilisearchClient(
    options: MeilisearchOptions,
): MeilisearchClient {
    const base = options.url.replace(/\/$/, "");
    const timeoutMs = options.taskTimeoutMs ?? 10 * 60 * 1000;

    async function request(
        method: string,
        path: string,
        body?: unknown,
    ): Promise<Response> {
        const headers: Record<string, string> = {};
        if (options.apiKey != null) {
            headers.Authorization = `Bearer ${options.apiKey}`;
        }
        if (body !== undefined) {
            headers["Content-Type"] = "application/json";
        }
        return fetch(`${base}${path}`, {
            method,
            headers,
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    }

    async function expectOk(response: Response, what: string): Promise<void> {
        if (!response.ok) {
            const detail = await response.text();
            let code: string | undefined;
            try {
                const body: {code?: unknown} = JSON.parse(detail);
                code = typeof body.code === "string" ? body.code : undefined;
            } catch {
                // Not JSON: no code.
            }
            throw new MeilisearchRequestError(
                `Meilisearch couldn't ${what}: ${response.status} ${detail}`,
                response.status,
                code,
            );
        }
    }

    async function runTask(
        method: string,
        path: string,
        body: unknown,
        what: string,
    ): Promise<number> {
        const response = await request(method, path, body);
        await expectOk(response, what);
        const reply: TaskReply = await response.json();
        return reply.taskUid;
    }

    async function waitForTask(taskUid: number): Promise<void> {
        const deadline = Date.now() + timeoutMs;
        let delayMs = 50;
        for (;;) {
            const response = await request("GET", `/tasks/${taskUid}`);
            await expectOk(response, `read task ${taskUid}`);
            const task: Task = await response.json();
            if (task.status === "succeeded") {
                return;
            }
            if (task.status === "failed" || task.status === "canceled") {
                throw new MeilisearchTaskError(
                    `Meilisearch task ${taskUid} ${task.status}: ` +
                        (task.error?.message ?? "no reason given"),
                    task.error?.code,
                );
            }
            if (Date.now() > deadline) {
                throw new Error(`Meilisearch task ${taskUid} timed out`);
            }
            await new Promise((resolve) => setTimeout(resolve, delayMs));
            delayMs = Math.min(delayMs * 2, 1000);
        }
    }

    const enc = encodeURIComponent;
    return {
        async search<T>(uid: string, body: object): Promise<T> {
            const response = await request(
                "POST",
                `/indexes/${enc(uid)}/search`,
                body,
            );
            await expectOk(response, `search ${uid}`);
            const reply: T = await response.json();
            return reply;
        },
        async getDocument<T>(uid: string, id: string): Promise<T | undefined> {
            const response = await request(
                "GET",
                `/indexes/${enc(uid)}/documents/${enc(id)}`,
            );
            if (response.status === 404) {
                return undefined;
            }
            await expectOk(response, `read document ${id} of ${uid}`);
            const document: T = await response.json();
            return document;
        },
        async documentCount(uid) {
            const response = await request("GET", `/indexes/${enc(uid)}/stats`);
            await expectOk(response, `read ${uid}'s stats`);
            const stats: {numberOfDocuments?: number} = await response.json();
            return stats.numberOfDocuments ?? 0;
        },
        async indexExists(uid) {
            const response = await request("GET", `/indexes/${enc(uid)}`);
            if (response.status === 404) {
                return false;
            }
            await expectOk(response, `read index ${uid}`);
            return true;
        },
        async createIndex(uid, primaryKey) {
            await waitForTask(
                await runTask(
                    "POST",
                    "/indexes",
                    {uid, primaryKey},
                    `create index ${uid}`,
                ),
            );
        },
        async deleteIndex(uid) {
            const task = await runTask(
                "DELETE",
                `/indexes/${enc(uid)}`,
                undefined,
                `delete index ${uid}`,
            );
            try {
                await waitForTask(task);
            } catch (e) {
                // Meilisearch accepts deleting an index that doesn't exist,
                // then fails the task.
                if (
                    e instanceof MeilisearchTaskError &&
                    e.code === "index_not_found"
                ) {
                    return;
                }
                throw e;
            }
        },
        async updateSettings(uid, settings) {
            await waitForTask(
                await runTask(
                    "PATCH",
                    `/indexes/${enc(uid)}/settings`,
                    settings,
                    `update ${uid}'s settings`,
                ),
            );
        },
        addDocuments(uid, documents) {
            return runTask(
                "POST",
                `/indexes/${enc(uid)}/documents`,
                documents,
                `add documents to ${uid}`,
            );
        },
        async swapIndexes(a, b) {
            await waitForTask(
                await runTask(
                    "POST",
                    "/swap-indexes",
                    [{indexes: [a, b]}],
                    `swap ${a} and ${b}`,
                ),
            );
        },
        waitForTask,
    };
}
