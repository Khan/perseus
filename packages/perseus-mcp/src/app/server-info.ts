// What get_server_info reports when a person has a problem: enough to
// diagnose it from, and nothing of their items.
import type {BuildInfo} from "../build-info";
import type {SearchStatus} from "../ports/content-search";

/** Long enough for an error's message, too short to carry an item. */
const MAX_MESSAGE = 300;

export type RecordedError = {
    at: string;
    /** What failed: a tool's name, or "server" for startup problems. */
    source: string;
    message: string;
};

/** The last `limit` errors, oldest first, kept in memory only. */
export function createErrorLog(limit: number, now: () => Date) {
    const errors: RecordedError[] = [];
    return {
        record(source: string, message: string): void {
            errors.push({
                at: now().toISOString(),
                source,
                message:
                    message.length > MAX_MESSAGE
                        ? `${message.slice(0, MAX_MESSAGE)}…`
                        : message,
            });
            if (errors.length > limit) {
                errors.shift();
            }
        },
        recent(): RecordedError[] {
            return [...errors];
        },
    };
}

export type ErrorLog = ReturnType<typeof createErrorLog>;

export type ServerFacts = {
    build: BuildInfo;
    transport: "stdio" | "http";
    startedAt: string;
    node: string;
    os: {platform: string; release: string; arch: string};
    dataDir: string;
    drafts: number;
    skippedDrafts: number;
    exercises: number;
    /** Null when the HTTP server isn't listening. */
    httpUrl: string | null;
    previewPages: "prebuilt" | "compiled by Vite";
    /** Content search: what its index holds, or why it can't be used. */
    search: SearchStatus;
    errors: RecordedError[];
};

/** The report get_server_info returns. */
export function describeServer(facts: ServerFacts) {
    return {
        perseusMcp: {
            version: facts.build.version,
            commit: facts.build.commit,
            runsFrom:
                facts.build.source === "bundle"
                    ? "the testers' bundle"
                    : "the perseus repo",
        },
        transport: facts.transport,
        startedAt: facts.startedAt,
        node: facts.node,
        os: facts.os,
        data: {
            dir: facts.dataDir,
            drafts: facts.drafts,
            skippedDrafts: facts.skippedDrafts,
            exercises: facts.exercises,
        },
        preview:
            facts.httpUrl == null
                ? {
                      served: false,
                      reason: "The HTTP server isn't listening; see the errors.",
                  }
                : {
                      served: true,
                      url: facts.httpUrl,
                      pages: facts.previewPages,
                  },
        search: facts.search,
        recentErrors: facts.errors,
    };
}

export type ServerInfo = ReturnType<typeof describeServer>;
