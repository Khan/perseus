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
    failOn(console, "console", "error");
    failOn(console, "console", "warn");
    failOn(console, "console", "info");
    failOn(console, "console", "log");
    failOn(console, "console", "debug");
    failOn(process.stderr, "process.stderr", "write");
    failOn(process.stdout, "process.stdout", "write");
}

function failOn(receiver: any, receiverExpression: string, method: string) {
    const callStacks: Array<string | undefined> = [];
    let originalMethod: undefined | ((...data: unknown[]) => unknown);

    // We use *All instead of *Each to catch console logs that occur outside
    // any test case.
    beforeAll(() => {
        stubMethod();
    });
    afterAll(() => {
        restoreMethod();
        throwIfAnyCallsWereRecorded();
    });

    // Throw errors after each test case, so the specific test case that logs
    // is marked as failing.
    afterEach(() => {
        throwIfAnyCallsWereRecorded();
    });

    function stubMethod() {
        originalMethod = receiver[method];
        receiver[method] = (...args: unknown[]) => {
            const ret = originalMethod?.apply(receiver, args);
            // The Error() function captures the stack trace at this point.
            callStacks.push(Error().stack);
            return ret;
        };
    }

    function restoreMethod() {
        receiver[method] = originalMethod;
    }

    function throwIfAnyCallsWereRecorded() {
        if (callStacks.length === 0) {
            return;
        }

        const message = `${explanation(receiverExpression, method)}\n\n${gray(callStacks.join("\n"))}`;
        callStacks.length = 0;
        throw new Error(message);
    }
}

function explanation(receiverExpression: string, method: string): string {
    return (
        `Expected test not to call ${bold(`${receiverExpression}.${method}()`)}.\n\n` +
        `If the ${method} is expected, test for it explicitly by mocking it out using ${bold(
            "rs.spyOn",
        )}(${receiverExpression}, '${method}').mockImplementation(() => {}) and test that the warning occurs.`
    );
}

// TODO: use styleText from node:util here.
const gray = (str) => `\u001B[90m${str}\u001B[39m`;
const bold = (str) => `\u001B[1m${str}\u001B[22m`;
