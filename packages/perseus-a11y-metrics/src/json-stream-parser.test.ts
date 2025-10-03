import {jsonStreamParser, number, string, Tokenizer} from "./json-stream-parser";

xdescribe("a JsonStreamParser", () => {
    it("allows callers to subscribe to a particular path pattern", async () => {
        const parser = jsonStreamParser()
        const objectStream = parser.subscribeTo(["foo"])

        parser.push(`{"foo": 42}`);

        expect(await objectStream.next()).toBe(42);
    })

    it("buffers multiple values to send to subscribers", async () => {
        const parser = jsonStreamParser()
        const objectStream = parser.subscribeTo(["foo"])

        parser.push(`{"foo": 42}`);
        parser.push(`{"foo": 37}`);

        // Consume the 42
        await objectStream.next()

        expect(await objectStream.next()).toBe(37);
    })

    it("allows requesting values before they are pushed", async () => {
        const parser = jsonStreamParser()
        const objectStream = parser.subscribeTo(["foo"])

        const promise = objectStream.next()

        parser.push(`{"foo": 42}`);

        expect(await promise).toBe(42);
    })

    it("allows requesting multiple values before they are pushed", async () => {
        const parser = jsonStreamParser()
        const objectStream = parser.subscribeTo(["foo"])

        const promise1 = objectStream.next()
        const promise2 = objectStream.next()

        parser.push(`{"foo": 1}`);
        parser.push(`{"foo": 2}`);

        expect(await promise1).toBe(1);
        expect(await promise2).toBe(2);
    })

    it("allows interleaving calls to next and push", async () => {
        const parser = jsonStreamParser()
        const objectStream = parser.subscribeTo(["foo"])

        const promise1 = objectStream.next()
        const promise2 = objectStream.next()

        parser.push(`{"foo": 1}`);

        const promise3 = objectStream.next()

        parser.push(`{"foo": 2}`);
        parser.push(`{"foo": 3}`);
        parser.push(`{"foo": 4}`);

        const promise4 = objectStream.next()
        const promise5 = objectStream.next()

        parser.push(`{"foo": 5}`);

        expect(await promise1).toBe(1);
        expect(await promise2).toBe(2);
        expect(await promise3).toBe(3);
        expect(await promise4).toBe(4);
        expect(await promise5).toBe(5);
    })
})

xdescribe("a JSON Tokenizer", () => {
    it("tokenizes a string", () => {
        const tokenizer = new Tokenizer()
        const tokens = tokenizer.push(`"hello"`)
        expect(tokens).toEqual([{type: "primitive", value: "hello"}])
    })

    it("ignores whitespace", () => {
        const tokenizer = new Tokenizer()
        const tokens = tokenizer.push(" \n\t")
        expect(tokens).toEqual([])
    })
})

describe("the number token regex", () => {
    const valid = [
        "0",
        "-0",
        "0.0",
        "1.0",
        "90123456789.123456789",
        "1e9",
        "1e-9",
        "1e+9",
        "0e0",
        "0e0123456789",
        "1.2E1",
    ];

    const invalid = [
        "01",
        "-01",
        "1.",
        "1..0",
        "1.0.0",
        "1-2",
        ".1",
        "e9",
        "1e++9",
        "1e--9",
    ]

    it.each(valid)("accepts %s", (input) => {
        expect(input.match(number)?.[0]).toEqual(input);
        expect(() => JSON.parse(input)).not.toThrowError();
    })

    it.each(invalid)("rejects %s", (input) => {
        expect(input.match(number)?.[0]).not.toEqual(input);
        expect(() => JSON.parse(input)).toThrowError();
    })
})

describe("the string token regex", () => {
    const valid = [
        `""`,
        `"hello"`,
        `"\\n\\r\\t\\b\\f\\/\\\\"`,
        `"\\u09af"`,
        `"\\u0000\\u0000 ok"`,
    ];

    const invalid = [
        `"`,
        `"hello`,
        `"\\x"`,
        `"\\u123"`,
        `"\\u"`,
    ];

    it.each(valid)("accepts %s", (input) => {
        expect(input.match(string)?.[0]).toEqual(input);
        expect(() => JSON.parse(input)).not.toThrowError();
    })

    it.each(invalid)("rejects %s", (input) => {
        expect(input.match(string)?.[0]).not.toEqual(input);
        expect(() => JSON.parse(input)).toThrowError();
    })

})
