import {execFileSync} from "node:child_process";

/**
 * Load the Vite config with Node's native TypeScript and ECMAScript module
 * support, then return a JSON-serializable value selected by `expression`.
 * Jest transforms tests to CommonJS and does not transform `.mts`, so a
 * direct import would not exercise the runtime that loads this config during
 * package builds.
 */
const readConfigValue = (expression: string) => {
    const script = `
        import {createPackageConfig, getPackageNames} from "./config/build/vite.config.mts";
        const value = await (${expression});
        process.stdout.write(JSON.stringify(value));
    `;
    return JSON.parse(
        execFileSync(
            process.execPath,
            ["--input-type=module", "--eval", script],
            {
                encoding: "utf8",
            },
        ),
    );
};

describe("createPackageConfig", () => {
    it("builds every package as an ES module library in its dist directory", () => {
        // Arrange, Act
        const configs = readConfigValue(`getPackageNames().map((name) => {
            const config = createPackageConfig(name);
            return {
                formats: config.build.lib.formats,
                outDir: config.build.outDir,
            };
        })`);

        expect(configs).toHaveLength(12);
        configs.forEach((config) => {
            expect(config.formats).toEqual(["es"]);
            expect(config.outDir).toMatch(/packages\/.+\/dist$/);
        });
    });

    it("builds every exported source from one package config", () => {
        // Arrange, Act
        const config = readConfigValue(`(() => {
            const config = createPackageConfig("perseus");
            return {
                entries: config.build.lib.entry,
                output: config.build.rolldownOptions.output,
                cssAssetName: config.build.rolldownOptions.output.assetFileNames({names: ["index.css"]}),
                fontAssetName: config.build.rolldownOptions.output.assetFileNames({names: ["Symbola.woff"]}),
            };
        })()`);

        expect(config.entries).toEqual({
            index: expect.stringMatching(/packages\/perseus\/src\/index\.ts$/),
            strings: expect.stringMatching(
                /packages\/perseus\/src\/strings\.ts$/,
            ),
        });
        expect(config.output).toMatchObject({
            entryFileNames: "[name].js",
            chunkFileNames: "chunk-[name]-[hash].js",
        });
        expect(config.cssAssetName).toBe("[name][extname]");
        expect(config.fontAssetName).toBe("assets/[name][extname]");
    });

    it("externalizes declared dependencies but bundles vendored aliases", () => {
        // Arrange, Act
        const result = readConfigValue(`(() => {
            const {external} = createPackageConfig("perseus").build.rolldownOptions;
            return {
                react: external("react"),
                core: external("@khanacademy/perseus-core"),
                raphael: external("raphael"),
            };
        })()`);

        expect(result).toEqual({react: true, core: true, raphael: false});
    });

    it("replaces production environment checks", () => {
        // Arrange, Act
        const define = readConfigValue(
            `createPackageConfig("perseus", {environment: "production"}).define`,
        );

        expect(define).toMatchObject({
            "process.env.NODE_ENV": '"production"',
            "process.env.STORYBOOK": "false",
        });
    });

    it("copies MathQuill fonts and keeps their CSS URLs package-relative", () => {
        // Arrange, Act
        const result = readConfigValue(`(async () => {
            const fs = await import("node:fs/promises");
            const path = await import("node:path");
            const {build} = await import("vite");
            const outDir = await fs.mkdtemp(
                path.join(process.cwd(), ".vite-test-"),
            );

            try {
                const config = createPackageConfig("math-input");
                config.logLevel = "silent";
                config.build.outDir = outDir;
                config.build.emptyOutDir = true;
                await build(config);

                return {
                    assets: (
                        await fs.readdir(path.join(outDir, "assets"))
                    ).sort(),
                    css: await fs.readFile(path.join(outDir, "index.css"), "utf8"),
                };
            } finally {
                await fs.rm(outDir, {recursive: true, force: true});
            }
        })()`);
        const fonts = [
            "Symbola.eot",
            "Symbola.svg",
            "Symbola.ttf",
            "Symbola.woff",
            "Symbola.woff2",
        ];

        expect(result.assets).toEqual(fonts);
        for (const font of fonts) {
            expect(result.css).toContain(`url(./assets/${font}`);
        }
    }, 30_000);
});
