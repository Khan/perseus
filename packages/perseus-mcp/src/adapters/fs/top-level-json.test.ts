import {readTopLevel} from "./top-level-json";

import type {TopLevelValue} from "./top-level-json";

async function* chunksOf(text: string, size: number): AsyncGenerator<string> {
    for (let i = 0; i < text.length; i += size) {
        yield text.slice(i, i + size);
    }
}

async function readAll(
    text: string,
    keys: string[],
    chunkSize: number,
): Promise<TopLevelValue[]> {
    const values: TopLevelValue[] = [];
    for await (const value of readTopLevel(
        chunksOf(text, chunkSize),
        new Set(keys),
    )) {
        values.push(value);
    }
    return values;
}

const SNAPSHOT = JSON.stringify(
    {
        version: "abc",
        skipped: [{id: "s"}],
        count: 3,
        exercises: [
            {id: "e1", title: 'Braces } and ] and "quotes" \\ in text'},
            {id: "e2", nested: {list: [1, [2, {deep: true}]]}},
        ],
        meta: {a: 1},
        flag: false,
    },
    null,
    "\t",
);

describe("readTopLevel", () => {
    it.each([1, 7, 64, 100000])(
        "reads array elements and other values in %i-character chunks",
        async (chunkSize) => {
            // Arrange, Act
            const values = await readAll(
                SNAPSHOT,
                ["version", "exercises", "meta", "count", "flag"],
                chunkSize,
            );

            // Assert
            expect(values).toEqual([
                {key: "version", value: "abc"},
                {key: "count", value: 3},
                {
                    key: "exercises",
                    value: {
                        id: "e1",
                        title: 'Braces } and ] and "quotes" \\ in text',
                    },
                },
                {
                    key: "exercises",
                    value: {id: "e2", nested: {list: [1, [2, {deep: true}]]}},
                },
                {key: "meta", value: {a: 1}},
                {key: "flag", value: false},
            ]);
        },
    );

    it("skips keys it isn't asked for", async () => {
        // Arrange, Act
        const values = await readAll(SNAPSHOT, ["skipped"], 5);

        // Assert
        expect(values).toEqual([{key: "skipped", value: {id: "s"}}]);
    });

    it("reads compact JSON", async () => {
        // Arrange, Act
        const values = await readAll(
            '{"a":[{"x":1},{"y":2}],"b":7}',
            ["a", "b"],
            3,
        );

        // Assert
        expect(values).toEqual([
            {key: "a", value: {x: 1}},
            {key: "a", value: {y: 2}},
            {key: "b", value: 7},
        ]);
    });
});
