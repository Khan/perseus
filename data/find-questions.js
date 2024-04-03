/**
 * To use this:
 * - Modify `predicateCallback` to look for questions that
 *   match your requirements
 * - run: node find-questions.js
 */

const Path = require("path");
const fs = require("fs");

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
function predicateCallback(q) {
    // Look through each widget in the question
    for (let widget of Object.values(q.widgets)) {
        // Skip everything that's not an interactive-graph
        if (widget.type !== "interactive-graph") continue;

        // Make sure the interactive-graph has the data we're comparing
        if (!widget?.options?.gridStep || !widget?.options.step) continue;

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
const jsonFiles = [];
function findJsonFiles(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const absolutePath = Path.join(dir, file);
        if (fs.statSync(absolutePath).isDirectory()) {
            return findJsonFiles(absolutePath);
        } else if (absolutePath.endsWith(".json")) {
            return jsonFiles.push(absolutePath);
        }
    });
}

// Open and parse JSON files, check if it passes
// the predicate match, and if so store it in the output array
const output = [];
function checkFiles() {
    for (let fileName of jsonFiles) {
        const data = fs.readFileSync(fileName, "utf8");
        const json = JSON.parse(data);
        if (predicateCallback(json)) {
            output.push(data);
        }
    }
}

function main() {
    findJsonFiles("./questions");
    checkFiles();

    // output in a copy/paste-able way
    // so it can be dropped into flipbook
    console.log(output.join("\n"));
}

main();
