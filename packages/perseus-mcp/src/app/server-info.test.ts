import {createErrorLog, describeServer} from "./server-info";

import type {ServerFacts} from "./server-info";

const NOW = () => new Date("2026-01-01T00:00:00Z");

const facts: ServerFacts = {
    build: {version: "0.0.1", commit: "abc1234", source: "bundle"},
    transport: "stdio",
    startedAt: "2026-01-01T00:00:00Z",
    node: "v24.22.1",
    os: {platform: "darwin", release: "25.5.0", arch: "arm64"},
    dataDir: "/data",
    drafts: 3,
    skippedDrafts: 0,
    collections: 1,
    httpUrl: "http://localhost:4567",
    previewPages: "prebuilt",
    errors: [],
};

describe("createErrorLog", () => {
    it("keeps only the most recent errors", () => {
        // Arrange
        const log = createErrorLog(2, NOW);

        // Act
        log.record("a", "first");
        log.record("b", "second");
        log.record("c", "third");

        // Assert
        expect(log.recent().map((error) => error.source)).toEqual(["b", "c"]);
    });

    it("shortens long messages", () => {
        // Arrange
        const log = createErrorLog(5, NOW);

        // Act
        log.record("tool", "x".repeat(1000));

        // Assert
        expect(log.recent()[0].message).toHaveLength(301);
    });
});

describe("describeServer", () => {
    it("says where perseus-mcp runs from and where previews are served", () => {
        // Arrange, Act
        const info = describeServer(facts);

        // Assert
        expect({
            perseusMcp: info.perseusMcp,
            preview: info.preview,
        }).toEqual({
            perseusMcp: {
                version: "0.0.1",
                commit: "abc1234",
                runsFrom: "the testers' bundle",
            },
            preview: {
                served: true,
                url: "http://localhost:4567",
                pages: "prebuilt",
            },
        });
    });

    it("says previews aren't served when HTTP isn't listening", () => {
        // Arrange, Act
        const info = describeServer({...facts, httpUrl: null});

        // Assert
        expect(info.preview.served).toBe(false);
    });
});
