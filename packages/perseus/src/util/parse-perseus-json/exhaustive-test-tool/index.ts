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
//     find ~/Desktop/content/*/* -type d | xargs -n1 packages/perseus/src/util/parse-perseus-json/exhaustive-test-tool/index.ts

import {formatPath} from "../object-path";
import {Mismatch} from "../parser-types";
import {createHash} from "crypto";
import * as fs from "fs/promises"
import {Dirent} from "fs";
import {join} from "path";
import {parsePerseusItem} from "../perseus-parsers/perseus-item";
import {isSuccess} from "../result";
import {ErrorTrackingParseContext} from "../error-tracking-parse-context";

let numFiles = 0;
async function main() {
    // process.argv.slice(2) is a common NodeJS idiom. The first two args are
    // `node` and the path to this script, so we can get rid of them.
    const realArgs = process.argv.slice(2)
    const {inputDir} = parseCommandLineArguments(realArgs);
    console.log("testing files in " + inputDir)

    for await (const dirent of listFilesRecursively(inputDir)) {
        await testFile(getPathOfDirent(dirent))
        numFiles++
    }

    console.log("tested " + numFiles + " files")
}

function parseCommandLineArguments(args: string[]) {
    return {inputDir: args[0]}
}

async function testFile(path: string) {
    if (!path.endsWith(".json")) {
        return;
    }
    const json = await fs.readFile(path, "utf-8")
    let assessmentItems = null
    try {
        assessmentItems = JSON.parse(json)
    } catch {
        console.warn("Failed to parse JSON file: " + path)
        return;
    }
    if (!Array.isArray(assessmentItems)) {
        return
    }

    for (const rawItem of assessmentItems.map(i => "item_data" in i ? i.item_data : i)) {
        for (const mismatch of getMismatches(rawItem)) {
            const desc = describeMismatch(mismatch)
            const hash = sha256(desc)
            await fs.mkdir("/tmp/test-results/" + hash, {recursive: true})
            await fs.writeFile(`/tmp/test-results/${hash}/mismatch.txt`, desc, "utf-8")
            await fs.writeFile(`/tmp/test-results/${hash}/item.json`, String(JSON.stringify(rawItem)), "utf-8")
        }
    }
}

function getMismatches(rawItem: unknown): Mismatch[] {
    const result = parsePerseusItem(rawItem, new ErrorTrackingParseContext([]))
    if (isSuccess(result)) {
        return []
    }
    return result.detail
}

function describeMismatch(mismatch: Mismatch): string {
    const path = formatPath(mismatch.path)
        // Replace numbered widget IDs with generic ones, e.g.
        // ["interactive-graph 1"] -> ["interactive-graph N"]
        .replace(/\["([^"\d]+)\d+"]/g, `["$1N"]`)
        // Replace array indices with generic ones, e.g.
        // [5] -> [N]
        .replace(/\[(\d+)]/g, "[N]")
    return `${path} -- expected ${mismatch.expected.join(", ")}; got ${typeName(mismatch.badValue)}\n`
}

function typeName(value: unknown): string {
    if (value === null) {
        return "null"
    }
    if (value === undefined) {
        return "undefined"
    }
    if (Array.isArray(value)) {
        return "array"
    }
    return typeof value
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
    return join(dirent.parentPath || dirent.path, dirent.name)
}

function sha256(s: string): string {
    return createHash("sha256").update(s, "utf-8").digest().toString("hex")
}

main()
