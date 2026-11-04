/**
 * @jest-environment node
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {copyPreviousData} from "./copy-previous-data";

describe("copyPreviousData", () => {
    let root: string;
    let from: string;
    let to: string;

    beforeEach(() => {
        root = fs.mkdtempSync(path.join(os.tmpdir(), "perseus-mcp-"));
        from = path.join(root, "old");
        to = path.join(root, "new");
        fs.mkdirSync(path.join(from, "drafts"), {recursive: true});
        fs.writeFileSync(path.join(from, "drafts", "a.json"), "old a");
        fs.writeFileSync(path.join(from, "drafts", "b.json"), "old b");
    });

    afterEach(() => {
        fs.rmSync(root, {recursive: true, force: true});
    });

    it("copies the drafts, keeping files the new folder already has", () => {
        // Arrange
        fs.mkdirSync(path.join(to, "drafts"), {recursive: true});
        fs.writeFileSync(path.join(to, "drafts", "a.json"), "new a");

        // Act
        const copied = copyPreviousData(from, to);

        // Assert
        expect({
            copied,
            a: fs.readFileSync(path.join(to, "drafts", "a.json"), "utf8"),
            b: fs.readFileSync(path.join(to, "drafts", "b.json"), "utf8"),
            oldKept: fs.existsSync(path.join(from, "drafts", "a.json")),
        }).toEqual({copied: 2, a: "new a", b: "old b", oldKept: true});
    });

    it("copies only once", () => {
        // Arrange
        copyPreviousData(from, to);
        fs.rmSync(path.join(to, "drafts", "b.json"));

        // Act
        const copied = copyPreviousData(from, to);

        // Assert
        expect({
            copied,
            b: fs.existsSync(path.join(to, "drafts", "b.json")),
        }).toEqual({copied: null, b: false});
    });
});
