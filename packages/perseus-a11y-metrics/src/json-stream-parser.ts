export function jsonStreamParser(): JsonStreamParser {
    return new JsonStreamParser();
}

export class JsonStreamParser {
    subscriptions: Subscription[] = []
    tokenizer = new Tokenizer();
    parserState = new ParserState();

    subscribeTo(path: string[]): ObjectStream {
        const stream = new ObjectStream()
        this.streams.push(stream)
        return stream;
    }

    push(data: string) {
        const tokens = this.tokenizer.push(data)

        for (const token of tokens) {
            const completedObject = this.parserState.push(token)
            if (completedObject) {
                for (const sub of this.subscriptions) {
                    if (sub.matches(completedObject.path)) {
                        sub.push(completedObject.value);
                    }
                    // sub.push(JSON.parse(data).foo) // FIXME stop referencing foo
                }
            }
        }

        for (const stream of this.streams) {
            stream.push(JSON.parse(data).foo) // FIXME stop referencing foo
        }
    }
}

export class Subscription {
    private stream = new ObjectStream();

    matches(path: string[]) {
        return true // FIXME
    }

    async next(): Promise<unknown> {
        return this.stream.next()
    }

    push(object: unknown): void {
        this.stream.push(object);
    }
}

export class ObjectStream {
    /**
     * Stores a queue of the values that have been `push`ed but not yet
     * retrieved via `next`.
     */
    private valueBuffer: unknown[] = []

    /**
     * Stores a queue of functions that are waiting to receive a value.
     * Functions are queued here when `next` is called, but we don't have a
     * value to return yet.
     */
    private promiseResolveBuffer: Array<(value: unknown) => void> = [];

    async next(): Promise<unknown> {
        if (this.valueBuffer.length > 0) {
            return this.valueBuffer.shift()
        }

        return await new Promise((resolve) => {
            this.promiseResolveBuffer.push(resolve);
        })
    }

    push(object: unknown) {
        if (this.promiseResolveBuffer.length > 0) {
            this.promiseResolveBuffer.shift()?.(object)
        } else {
            this.valueBuffer.push(object)
        }
    }
}

type Token =
    | {type: "primitive", value: string | number | boolean | null}
    | {type: "{"}
    | {type: "}"}
    | {type: "["}
    | {type: "]"}
    | {type: ","}
    | {type: ":"}

type TreeNode = {pathSegment: string, type: ""}

export class ParserState {
    private path: string[] = [];
    // private nodeStack: Array<"object" | "array">

    push(token: Token) {

    }
}

/**
 * Regexes based on: https://www.json.org/json-en.html
 */
const space = /^[ \n\r\t]/
export const number = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/
export const string = /^"([^"\\]|\\(["\\/bfnrt]|u[0-9a-f]{4}))*"/
const keyword = /^(true|false|null)/

export function tokenize(input: string): {tokens: Token[], remaining: string} {
    let remaining = input
    const tokens: Token[] = []
    while (remaining.length > 0) {
        switch (remaining[0]) {
            case ",":
            case ":":
            case "{":
            case "}":
            case "[":
            case "]":
                tokens.push({type: remaining[0]})
                remaining = remaining.slice(1)
                break;
            case `"`: {
                // If we see a quote, we're at the beginning of a string.
                const match = remaining.match(string);
                if (!match) {
                    return {tokens, remaining};
                }
                tokens.push({type: "primitive", value: JSON.parse(match[0])})
                remaining = remaining.slice(match[0].length)
                break;
            }
            case " ":
            case "\n":
            case "\r":
            case "\t": {
                // The next token is whitespace; ignore it.
                const match = remaining.match(space);
                if (!match) {
                    return {tokens, remaining};
                }
                remaining = remaining.slice(match[0].length)
                break;
            }
            case "t":
            case "f":
            case "n": {
                // The next token is true, false, or null.
                const match = remaining.match(keyword);
                if (!match) {
                    return {tokens, remaining};
                }
                tokens.push({type: "primitive", value: JSON.parse(match[0])})
                remaining = remaining.slice(match[0].length)
                break;
            }
            default: {
                // Anything else is either a number, or a syntax error.
                const match = remaining.match(number);
                if (!match) {
                    return {tokens, remaining};
                }
                tokens.push({type: "primitive", value: JSON.parse(match[0])})
                remaining = remaining.slice(match[0].length)
                break;
            }
        }
    }
    return {tokens, remaining};
}

export class Tokenizer {
    push(data: string): Token[] {

    }
}
