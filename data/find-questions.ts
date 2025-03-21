#!/usr/bin/env -S node -r @swc-node/register

/**
 * To use this:
 * - Modify `predicateCallback` to look for questions that
 *   match your requirements
 * - run: ./find-questions.js
 */

import fs from "fs";
import path from "path";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

// ==========================
// MODIFY THIS WHEN SEARCHING
// ==========================

/**
 * predicateCallback used to check if the given question matches
 * the rules you're looking for
 *
 * @param {PerseusRenderer} q the question to check
 * @returns {boolean} whether the question is a match
 */
function predicateCallback(q: PerseusRenderer) {
    // Look through each widget in the question
    for (const widget of Object.values(q.widgets)) {
        // Skip everything that's not an interactive-graph
        if (widget.type !== "interactive-graph") {
            continue;
        }

        // Make sure the interactive-graph has the data we're comparing
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!widget?.options?.gridStep || !widget?.options.step) {
            continue;
        }

        // Do that actual check
        const [xGridStep, yGridStep] = widget.options.gridStep;
        const [xTickStep, yTickStep] = widget.options.step;
        if (xGridStep > xTickStep || yGridStep > yTickStep) {
            return true;
        }
    }

    return false;
}

// ================================
// DON'T MODIFY THIS WHEN SEARCHING
// ================================

// Find all `.json` files in a directory (recursive)
function findJsonFiles(dir, accumulator: string[] = []) {
    fs.readdirSync(dir).forEach((file) => {
        const absolutePath = path.join(dir, file);
        if (fs.statSync(absolutePath).isDirectory()) {
            return findJsonFiles(absolutePath, accumulator);
        } else if (absolutePath.endsWith(".json")) {
            return accumulator.push(absolutePath);
        }
    });
    return accumulator;
}

// Open and parse JSON files, check if it passes
// the predicate match, and if so store it in the output array
function checkFiles(jsonFiles) {
    const output: string[] = [];
    for (const fileName of jsonFiles) {
        const data = fs.readFileSync(fileName, "utf8");
        const json = JSON.parse(data);
        if (predicateCallback(json)) {
            output.push(data);
        }
    }
    return output;
}

function main() {
    const jsonFiles = findJsonFiles("./questions");
    const matches = checkFiles(jsonFiles);

    // output in a copy/paste-able way
    // so it can be dropped into flipbook
    /* eslint-disable no-console */
    console.log(matches.join("\n"));
}

main();
