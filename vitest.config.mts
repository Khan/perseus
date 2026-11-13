// SPIKE: run the Jest suite under Vitest.
import {existsSync, readFileSync, readdirSync} from "node:fs";
import {createRequire} from "node:module";
import {basename, dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

import react from "@vitejs/plugin-react";
import {defineConfig} from "vitest/config";

const root = dirname(fileURLToPath(import.meta.url));
const cssModulesTransform = createRequire(import.meta.url)(
    "jest-css-modules-transform",
);

// Workspace packages without a `react` dependency, and the repo scripts in
// `utils/`, as in Jest's config: their tests run in node, so code that depends
// on the DOM fails there instead of passing under jsdom.
const nodeDirs = [
    ...readdirSync(join(root, "packages"))
        .filter((name) => {
            const file = join(root, "packages", name, "package.json");
            if (!existsSync(file)) {
                return false;
            }
            const pkg = JSON.parse(readFileSync(file, "utf8"));
            return ![
                "dependencies",
                "peerDependencies",
                "devDependencies",
            ].some((field) => pkg[field]?.react);
        })
        .map((name) => `packages/${name}`),
    "utils",
];
const testFiles = "**/*.test.{js,jsx,ts,tsx}";

export default defineConfig({
    // Unlike vite.config.mts, no `aphrodite` -> `aphrodite/no-important`
    // alias, so class names match the Jest snapshots.
    plugins: [
        react(),
        {
            // Like Jest's jest-css-modules-transform: a CSS module exports its
            // class names, and its CSS is not added to the document.
            name: "css-modules-names",
            enforce: "pre",
            async resolveId(source, importer) {
                if (!source.split("?")[0].endsWith(".module.css")) {
                    return;
                }
                const resolved = await this.resolve(source, importer, {
                    skipSelf: true,
                });
                // A virtual id, so that Vite's CSS plugin skips it.
                return (
                    resolved &&
                    `\0css-names:${Buffer.from(resolved.id.split("?")[0]).toString("base64url")}`
                );
            },
            load(id) {
                if (!id.startsWith("\0css-names:")) {
                    return;
                }
                const file = Buffer.from(
                    id.slice("\0css-names:".length),
                    "base64url",
                ).toString();
                const code = cssModulesTransform.process(
                    readFileSync(file, "utf8"),
                    file,
                    {config: {rootDir: root}},
                ).code;
                // The transform's output is CommonJS: run it to read the
                // class names it exports.
                const cjs = {exports: {}};
                // eslint-disable-next-line no-new-func -- see above
                new Function("module", "exports", code)(cjs, cjs.exports);
                return `export default ${JSON.stringify(cjs.exports)};`;
            },
        },
        {
            // Jest's svg.transform: an .svg import is its file name.
            name: "svg-basename",
            enforce: "pre",
            load(id) {
                const file = id.split("?")[0];
                if (file.endsWith(".svg")) {
                    return `export default ${JSON.stringify(basename(file))};`;
                }
            },
        },
    ],
    css: {modules: {localsConvention: "camelCase"}},
    test: {
        globals: true,
        exclude: ["**/node_modules/**", "**/dist/**", ".claude/**"],
        projects: [
            {
                extends: true,
                test: {
                    name: "node",
                    environment: "node",
                    include: nodeDirs.map((dir) => `${dir}/${testFiles}`),
                },
            },
            {
                extends: true,
                test: {
                    name: "jsdom",
                    environment: "jsdom",
                    include: [testFiles],
                    exclude: [
                        "**/node_modules/**",
                        "**/dist/**",
                        ".claude/**",
                        ...nodeDirs.map((dir) => `${dir}/**`),
                    ],
                },
            },
        ],
        setupFiles: [
            "config/test/vitest/setup.ts",
            "config/test/custom-matchers.ts",
        ],
        restoreMocks: true,
        unstubEnvs: true,
        mockReset: true,
        server: {
            deps: {
                // Jest transformed these packages too.
                inline: [/@phosphor-icons\/core/, /@preact\/signals-core/],
            },
        },
    },
});
