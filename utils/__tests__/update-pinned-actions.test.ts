/**
 * @jest-environment node
 */
import fs from "node:fs";

import {beforeEach, describe, expect, it, jest} from "@jest/globals";

import {collectActionRefs} from "../update-pinned-actions";

jest.mock("node:fs");

// A valid 40-character hex SHA for use in tests
const SHA = "abcdef0123456789abcdef0123456789abcdef01";

describe("collectActionRefs", () => {
    let mockReadFileSync: jest.SpiedFunction<typeof fs.readFileSync>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReadFileSync = jest.spyOn(fs, "readFileSync");
    });

    it("returns empty maps for an empty file list", () => {
        const {seen, allRepos} = collectActionRefs([]);

        expect(seen).toMatchInlineSnapshot(`Map {}`);
        expect(allRepos).toMatchInlineSnapshot(`Set {}`);
    });

    describe("already-pinned refs (uses: owner/repo@<sha> # <tag>)", () => {
        it("adds action@ref to seen with a null SHA", () => {
            mockReadFileSync.mockReturnValue(
                // eslint-disable-next-line no-restricted-syntax
                `      uses: actions/checkout@${SHA} # v4.1.0` as any,
            );

            const {seen} = collectActionRefs(["workflow.yml"]);

            expect(seen).toMatchInlineSnapshot(`
Map {
  "actions/checkout@v4.1.0" => null,
}
`);
        });

        it("adds owner/repo to allRepos", () => {
            mockReadFileSync.mockReturnValue(
                // eslint-disable-next-line no-restricted-syntax
                `      uses: actions/checkout@${SHA} # v4.1.0` as any,
            );

            const {allRepos} = collectActionRefs(["workflow.yml"]);

            expect(allRepos).toMatchInlineSnapshot(`
Set {
  "actions/checkout",
}
`);
        });

        it("strips subpath from action when adding to allRepos", () => {
            mockReadFileSync.mockReturnValue(
                // eslint-disable-next-line no-restricted-syntax
                `      uses: actions/cache/restore@${SHA} # v3` as any,
            );

            const {allRepos} = collectActionRefs(["workflow.yml"]);

            expect(allRepos).toMatchInlineSnapshot(`
Set {
  "actions/cache",
}
`);
        });

        it("skips lines that are YAML comments", () => {
            mockReadFileSync.mockReturnValue(
                // eslint-disable-next-line no-restricted-syntax
                `      # uses: actions/checkout@${SHA} # v4.1.0` as any,
            );

            const {seen, allRepos} = collectActionRefs(["workflow.yml"]);

            expect(seen).toMatchInlineSnapshot(`Map {}`);
            expect(allRepos).toMatchInlineSnapshot(`Set {}`);
        });

        it("handles quoted uses values", () => {
            mockReadFileSync.mockReturnValue(
                // eslint-disable-next-line no-restricted-syntax
                `      uses: "actions/checkout@${SHA}" # v4.1.0` as any,
            );

            const {seen} = collectActionRefs(["workflow.yml"]);

            expect(seen).toMatchInlineSnapshot(`
Map {
  "actions/checkout@v4.1.0" => null,
}
`);
        });
    });

    describe("pinned-without-tag refs (uses: owner/repo@<sha>, no comment)", () => {
        it("adds owner/repo to allRepos but not to seen", () => {
            // Trailing newline is required: UNPINNED_RE's negative lookahead
            // `(?![a-f0-9]{40}(?:\s|"))` only excludes a SHA when followed by
            // whitespace or a quote. Without `\n`, the SHA is matched as a tag.
            mockReadFileSync.mockReturnValue(
                // eslint-disable-next-line no-restricted-syntax
                `      uses: actions/checkout@${SHA}\n` as any,
            );

            const {seen, allRepos} = collectActionRefs(["workflow.yml"]);

            expect(seen).toMatchInlineSnapshot(`Map {}`);
            expect(allRepos).toMatchInlineSnapshot(`
Set {
  "actions/checkout",
}
`);
        });
    });

    describe("unpinned refs (uses: owner/repo@<tag>)", () => {
        it("adds action@ref to seen with a null SHA", () => {
            mockReadFileSync.mockReturnValue(
                // eslint-disable-next-line no-restricted-syntax
                `      uses: actions/checkout@v4.1.0` as any,
            );

            const {seen} = collectActionRefs(["workflow.yml"]);

            expect(seen).toMatchInlineSnapshot(`
Map {
  "actions/checkout@v4.1.0" => null,
}
`);
        });

        it("adds owner/repo to allRepos", () => {
            mockReadFileSync.mockReturnValue(
                // eslint-disable-next-line no-restricted-syntax
                `      uses: actions/checkout@v4.1.0` as any,
            );

            const {allRepos} = collectActionRefs(["workflow.yml"]);

            expect(allRepos).toMatchInlineSnapshot(`
Set {
  "actions/checkout",
}
`);
        });
    });

    describe("deduplication", () => {
        it("deduplicates the same action@ref across multiple files", () => {
            mockReadFileSync.mockReturnValue(
                // eslint-disable-next-line no-restricted-syntax
                `      uses: actions/checkout@v4.1.0` as any,
            );

            const {seen} = collectActionRefs([
                "workflow1.yml",
                "workflow2.yml",
            ]);

            expect(seen).toMatchInlineSnapshot(`
Map {
  "actions/checkout@v4.1.0" => null,
}
`);
        });

        it("deduplicates the same repo across different ref patterns", () => {
            mockReadFileSync
                .mockReturnValueOnce(
                    // eslint-disable-next-line no-restricted-syntax
                    `      uses: actions/checkout@${SHA} # v4.1.0` as any,
                )
                .mockReturnValueOnce(
                    // eslint-disable-next-line no-restricted-syntax
                    `      uses: actions/checkout@v4.1.0` as any,
                );

            const {allRepos} = collectActionRefs([
                "workflow1.yml",
                "workflow2.yml",
            ]);

            expect(allRepos).toMatchInlineSnapshot(`
Set {
  "actions/checkout",
}
`);
        });
    });

    describe("multiple actions in one file", () => {
        it("collects all action refs", () => {
            mockReadFileSync.mockReturnValue(
                // eslint-disable-next-line no-restricted-syntax
                [
                    `      uses: actions/checkout@${SHA} # v4.1.0`,
                    `      uses: actions/setup-node@v4`,
                ].join("\n") as any,
            );

            const {seen, allRepos} = collectActionRefs(["workflow.yml"]);

            expect(seen).toMatchInlineSnapshot(`
Map {
  "actions/checkout@v4.1.0" => null,
  "actions/setup-node@v4" => null,
}
`);
            expect(allRepos).toMatchInlineSnapshot(`
Set {
  "actions/checkout",
  "actions/setup-node",
}
`);
        });
    });
});
