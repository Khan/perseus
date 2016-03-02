/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, semi */
/* To fix, remove an entry above, run ka-lint, and fix errors. */


var assert = require("assert");

describe("Polyfill Sanity Checks", () => {
    describe("Array", () => {
        it("Array.of", () => {
            const a = Array.of(10);

            assert.equal(a.length, 1);
            assert.equal(a[0], 10);
        });

        it("Array.prototype.fill", () => {
            const a = [1, 2, 3].fill(10);

            assert.equal(a.length, 3);
            assert.equal(a[0], 10);
            assert.equal(a[1], 10);
            assert.equal(a[2], 10);
        });

        it("Array.prototype.find", () => {
            const obj = [{x:5, y:10}, {x:12, y:36}].find(p => p.x < 10);

            assert.equal(obj.x, 5);
            assert.equal(obj.y, 10);
        });

        it("Array.prototype.findIndex", () => {
            const index = [{x:5, y:10}, {x:12, y:36}].findIndex(p => p.x > 10);

            assert.equal(index, 1);
        });

        it("Array.prototype.includes", () => {
            assert.ok(['apple', 'banana'].includes('apple'));
            assert.ok(!['apple', 'banana'].includes('apple pie'));
        });
    });

    describe("Object", () => {
        it("Object.assign", () => {
            const target = {};
            const a = {x:5};
            const b = {y:10};
            const result = Object.assign(target, a, b);

            assert.equal(target.x, 5);
            assert.equal(target.y, 10);
            assert.equal(target, result);
        });

        it("Object.values", () => {
            const values = Object.values({x:5, y:10});

            assert.equal(values.length, 2);
            assert.equal(values[0], 5);
            assert.equal(values[1], 10);
        });

        it("Object.entries", () => {
            const entries = Object.entries({x:5, y:10});

            assert.equal(entries.length, 2);
            assert.equal(entries[0].length, 2);
            assert.equal(entries[1].length, 2);

            assert.equal(entries[0][0], "x");
            assert.equal(entries[0][1], 5);
            assert.equal(entries[1][0], "y");
            assert.equal(entries[1][1], 10);
        });
    });

    describe("Symbol", () => {
        it("using a symbol as a computed property", () => {
            const a = Symbol("a");
            const obj = {
                [a]: "a",
            };
            assert(obj[a]);
        });
    });

    describe("Iteration", () => {
        it("iterating over Object.values", () => {
            for (const v of Object.values({x:5, y:10})) {
                assert(v)
            }
        });

        it("iterating over Object.entries", () => {
            for (const [k, v] of Object.entries({x:5, y:10})) {
                assert(k);
                assert(v);
            }
        });

        it("iterating over arrays", () => {
            for (const i of [1, 2, 3]) {
                assert(i);
            }
        });
    });
});
