/**
 * @jest-environment node
 */
const path = require("path");

const {RuleTester} = require("eslint");

const rule = require("./no-adjacent-text-nodes");

const fixturesDir = path.join(__dirname, "__fixtures__");

const ruleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {jsx: true},
        project: "./tsconfig.json",
        tsconfigRootDir: fixturesDir,
    },
});

const filename = path.join(fixturesDir, "file.tsx");

/**
 * @param {string} code
 * @returns {{code: string, filename: string}}
 */
function valid(code) {
    return {code, filename};
}

/**
 * @param {string} code
 * @param {number} errorCount
 */
function invalid(code, errorCount = 1) {
    return {
        code,
        filename,
        errors: Array.from({length: errorCount}, () => ({
            messageId: "adjacentTextNodes",
        })),
    };
}

ruleTester.run("no-adjacent-text-nodes", rule, {
    valid: [
        valid(`const el = <p>Hello world</p>;`),
        valid(`declare const userName: string; const el = <p>{userName}</p>;`),
        valid(
            `declare const userName: string;
            const el = <p>{\`Hello \${userName}\`}</p>;`,
        ),
        // Text separated by elements renders as separate DOM parents.
        valid(
            `declare const a: string; declare const b: string;
            const el = <p>{a}<br />{b}</p>;`,
        ),
        valid(`const el = <p>Hello <b>world</b></p>;`),
        // Whitespace that contains a line break is removed by JSX.
        valid(
            `const el = (
                <div>
                    <b>one</b>
                    <i>two</i>
                </div>
            );`,
        ),
        valid(
            `declare const isOpen: boolean;
            const el = <p>Label {isOpen && <span>open</span>}</p>;`,
        ),
        valid(`const el = <p>Label {null}</p>;`),
        valid(`const el = <p>Label {""}</p>;`),
        valid(
            `declare const isOpen: boolean;
            const el = <p>Label {isOpen}</p>;`,
        ),
        // ReactNode includes ReactElement, so we can't tell it's text.
        valid(
            `import type {ReactNode} from "react";
            declare const children: ReactNode;
            const el = <p>Label {children}</p>;`,
        ),
        // We can't know what `any` renders.
        valid(
            `declare const value: any;
            const el = <p>Label {value}</p>;`,
        ),
        // A comment renders nothing and doesn't separate text.
        valid(
            `declare const userName: string;
            const el = (
                <p>
                    {/* the name */}
                    {userName}
                </p>
            );`,
        ),
    ],
    invalid: [
        invalid(
            `declare const userName: string; const el = <p>Hello {userName}</p>;`,
        ),
        invalid(
            `declare const userName: string; const el = <p>{userName} items</p>;`,
        ),
        invalid(`declare const count: number; const el = <p>{count}%</p>;`),
        invalid(
            `declare const a: string; declare const b: string;
            const el = <p>{a}{b}</p>;`,
        ),
        // `{a} {b}` renders three text nodes: a, " ", and b.
        invalid(
            `declare const a: string; declare const b: string;
            const el = <p>{a} {b}</p>;`,
            2,
        ),
        invalid(`const el = <p>Hello{" "}<b>world</b></p>;`),
        invalid(`const el = <p>{"Hello"}{"world"}</p>;`),
        invalid(
            `declare const userName: string | undefined;
            const el = <p>Hello {userName}</p>;`,
        ),
        invalid(
            `declare const isRequired: boolean;
            declare const required: string;
            declare const instructions: string;
            const el = (
                <div>
                    {instructions}
                    {isRequired && \` \${required}\`}
                </div>
            );`,
        ),
        invalid(
            `declare const isOpen: boolean;
            const el = <p>Toggle {isOpen ? "close" : <span>open</span>}</p>;`,
        ),
        invalid(
            `declare const label: string | null;
            const el = <p>Label: {label ?? "none"}</p>;`,
        ),
        invalid(
            `declare const a: string; declare const b: string;
            const el = <p>{a}{/* comment */}{b}</p>;`,
        ),
        invalid(
            `declare const userName: string;
            const el = <>Hello {userName}</>;`,
        ),
        invalid(
            `declare function format(n: number): string;
            const el = <p>Total: {format(3)}</p>;`,
        ),
    ],
});
