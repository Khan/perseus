import {afterEach} from "@rstest/core";

/**
 * @file
 * Derived from https://www.npmjs.com/package/jest-fail-on-console
 * (MIT licensed)
 *
 * Copyright (c) 2022 Valentin Hervieu
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export function failOnConsole() {
    failOn("error");
    failOn("warn");
    failOn("info");
    failOn("log");
    failOn("debug");
}

function failOn(consoleMethod: string) {
    const consoleCallStacks: Array<string | undefined> = [];
    let originalMethod: undefined | ((...data: unknown[]) => void);

    // We use *All instead of *Each to catch console logs that occur outside
    // any test case.
    beforeAll(() => {
        stubConsole();
    });
    afterAll(() => {
        restoreConsole();
        flushMessages();
    });

    // Throw errors after each test case, so the specific test case that logs
    // is marked as failing.
    afterEach(() => {
        flushMessages();
    });

    function stubConsole() {
        originalMethod = console[consoleMethod];
        console[consoleMethod] = (...args: unknown[]) => {
            originalMethod?.(...args);
            // The Error() function captures the stack trace at this point.
            consoleCallStacks.push(Error().stack);
        };
    }

    function restoreConsole() {
        console[consoleMethod] = originalMethod;
    }

    function flushMessages() {
        if (consoleCallStacks.length === 0) {
            return;
        }

        const message = `${explanation(consoleMethod)}\n\n${gray(consoleCallStacks.join("\n"))}`;
        consoleCallStacks.length = 0;
        throw new Error(message);
    }
}

function explanation(consoleMethod: string): string {
    return (
        `Expected test not to call ${bold(`console.${consoleMethod}()`)}.\n\n` +
        `If the ${consoleMethod} is expected, test for it explicitly by mocking it out using ${bold(
            "jest.spyOn",
        )}(console, '${consoleMethod}').mockImplementation() and test that the warning occurs.`
    );
}

// TODO: use styleText from node:util here.
const gray = (str) => `\u001B[90m${str}\u001B[39m`;
const bold = (str) => `\u001B[1m${str}\u001B[22m`;
