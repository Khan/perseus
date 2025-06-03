#!/usr/bin/env -S node -r @swc-node/register

// This is a NodeJS script that tests the Perseus JSON parsing code against a
// content data dump.
//
// USAGE:
// First, download the content data dump:
//
//     mkdir ~/Desktop/content
//     gsutil -m cp -r gs://content-property.khanacademy.org/{Article,Exercise}.{Translated,}PerseusContent ~/Desktop/content
//
// Then, run the test tool over the content like so:
//
//     find ~/Desktop/content/*/* -type d | xargs -n1 packages/perseus-core/src/parse-perseus-json/exhaustive-test-tool/index.ts  ~/Desktop/test-results
//
// Output will be written to ~/Desktop/test-results. The output format is:
//
// - one directory per unique parse error, named after the hash of the error
//   message. Each directory will contain:
//     - mismatch.txt: a description of the parse error
//     - item.json: the shortest assessmentItem (in number of JSON bytes) that
//       produced that parse error.

import {createHash} from "crypto";
import * as fs from "fs/promises";
import {join} from "path";

import {ErrorTrackingParseContext} from "../error-tracking-parse-context";
import {isPlainObject} from "../general-purpose-parsers";
import {formatPath} from "../object-path";
import {parsePerseusItem} from "../perseus-parsers/perseus-item";
import {parsePerseusRenderer} from "../perseus-parsers/perseus-renderer";
import {isSuccess} from "../result";

import type {Mismatch} from "../parser-types";
import type {Dirent} from "fs";

async function main() {
    // process.argv.slice(2) is a common NodeJS idiom. The first two args are
    // `node` and the path to this script, so we can get rid of them.
    const realArgs = process.argv.slice(2);
    const {inputDir, outputDir} = parseCommandLineArguments(realArgs);
    // eslint-disable-next-line no-console
    console.log("testing files in " + inputDir);

    let numFiles = 0;
    for await (const dirent of listFilesRecursively(inputDir)) {
        await testFile(getPathOfDirent(dirent), outputDir);
        numFiles++;
    }

    // eslint-disable-next-line no-console
    console.log("tested " + numFiles + " files");
}

function parseCommandLineArguments(args: string[]) {
    const [outputDir, inputDir] = args;
    return {outputDir, inputDir};
}

async function testFile(path: string, outputDir: string) {
    if (!path.endsWith(".json")) {
        return;
    }
    const json = await fs.readFile(path, "utf-8");
    for (const tester of createContentItemTesters(json, path)) {
        for (const mismatch of tester.getMismatches()) {
            const desc = describeMismatch(mismatch);
            const hash = sha256(desc);
            await fs.mkdir(join(outputDir, hash), {recursive: true});
            await fs.writeFile(
                join(outputDir, hash, "mismatch.txt"),
                desc,
                "utf-8",
            );
            // We'd like to find the shortest assessment item that reproduces
            // each mismatch, to keep our regression tests succinct and
            // readable. To that end, we only update the item.json file if the
            // current item is shorter than the one already on disk.
            await writeFileIfShorterThanExisting(
                join(outputDir, hash, "item.json"),
                String(JSON.stringify(tester.rawData)),
            );
        }
    }
}

interface ContentItemTester {
    readonly rawData: unknown;
    getMismatches(): Mismatch[];
}

function createContentItemTesters(
    json: string,
    path: string,
): ContentItemTester[] {
    let contentItems: unknown;
    try {
        contentItems = JSON.parse(json);
    } catch {
        // eslint-disable-next-line no-console
        console.warn("Failed to parse JSON file: " + path);
        return [];
    }
    if (!Array.isArray(contentItems)) {
        return [];
    }

    const testers: ContentItemTester[] = [];
    for (const item of contentItems) {
        const tester = createContentItemTester(item, path);
        if (tester != null) {
            testers.push(tester);
        }
    }

    return testers;
}

function createContentItemTester(
    item: unknown,
    path: string,
): ContentItemTester | undefined {
    if (isPlainObject(item)) {
        if ("item_data" in item) {
            // We're looking at an exercise.
            return new AssessmentItemTester(item.item_data);
        }

        if ("content" in item) {
            // We're looking at an article.
            return new ArticleTester(item);
        }
    }

    // eslint-disable-next-line no-console
    console.warn("Cannot classify content as an article or exercise: ", path);
}

class AssessmentItemTester implements ContentItemTester {
    constructor(readonly rawData: unknown) {}

    getMismatches(): Mismatch[] {
        const result = parsePerseusItem(
            this.rawData,
            new ErrorTrackingParseContext([]),
        );
        if (isSuccess(result)) {
            return [];
        }
        return result.detail;
    }
}

class ArticleTester implements ContentItemTester {
    constructor(readonly rawData: unknown) {}

    getMismatches(): Mismatch[] {
        const result = parsePerseusRenderer(
            this.rawData,
            new ErrorTrackingParseContext([]),
        );
        if (isSuccess(result)) {
            return [];
        }
        return result.detail;
    }
}

function describeMismatch(mismatch: Mismatch): string {
    const path = formatPath(mismatch.path)
        // Replace numbered widget IDs with generic ones, e.g.
        // ["interactive-graph 1"] -> ["interactive-graph N"]
        .replace(/\["([^"\d]+)\d+"]/g, `["$1N"]`)
        // Replace array indices with generic ones, e.g.
        // [5] -> [N]
        .replace(/\[(\d+)]/g, "[N]");
    return `${path} -- expected ${mismatch.expected.join(", ")}; got ${typeName(mismatch.badValue)}\n`;
}

function typeName(value: unknown): string {
    if (value === null) {
        return "null";
    }
    if (value === undefined) {
        return "undefined";
    }
    if (Array.isArray(value)) {
        return "array";
    }
    return typeof value;
}

async function writeFileIfShorterThanExisting(path: string, content: string) {
    const size = await fs
        .stat(path)
        .then((stat) => stat.size)
        .catch(() => null);
    const contentLength = Buffer.byteLength(content, "utf-8");
    if (size == null || contentLength < size) {
        await fs.writeFile(path, content, "utf-8");
    }
}

async function* listFilesRecursively(dir: string) {
    for await (const entry of await fs.opendir(dir, {recursive: true})) {
        if (entry.isFile()) {
            yield entry;
        }
    }
}

function getPathOfDirent(dirent: Dirent): string {
    // We read from both `parentPath` (introduced in Node 20.12) and `path`
    // (deprecated in Node 20.12) to support as many Node versions as possible.
    return join(dirent.parentPath || dirent.path, dirent.name);
}

function sha256(s: string): string {
    return createHash("sha256").update(s, "utf-8").digest().toString("hex");
}

main();
