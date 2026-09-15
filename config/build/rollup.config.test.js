import createRollupConfig from "./rollup.config";

/**
 * These tests run the real config generator against the real `packages/`
 * folder, so they double as a check that every package's entry points can be
 * resolved.
 */
describe("createRollupConfig", () => {
    const findConfig = (configs, pkgName) =>
        configs.find((c) => c.output.dir === `packages/${pkgName}/dist`);

    it("generates exactly one esm config per package, writing to dist/", async () => {
        // Arrange, Act
        const configs = await createRollupConfig({});

        configs.forEach((c) => expect(c.output.format).toBe("esm"));

        const outputDirs = configs.map((c) => c.output.dir);
        outputDirs.forEach((dir) => expect(dir).toMatch(/^packages\/.+\/dist$/));
        expect(new Set(outputDirs).size).toBe(configs.length);
    });

    it("emits one file per entry point plus hashed shared chunks", async () => {
        // Arrange, Act
        const configs = await createRollupConfig({});

        expect(findConfig(configs, "perseus").output).toMatchObject({
            entryFileNames: "[name].js",
            chunkFileNames: "chunk-[name]-[hash].js",
        });
    });

    it("builds all of a package's entry points from a single config", async () => {
        // Arrange, Act
        const configs = await createRollupConfig({});

        // perseus exposes more than just its main entry point, and they all
        // have to be inputs of one config for shared modules to be emitted
        // into a single shared chunk.
        const {input} = findConfig(configs, "perseus");
        expect(Object.keys(input).length).toBeGreaterThan(1);
        expect(input.index).toMatch(/^packages\/perseus\/src\//);
    });
});
