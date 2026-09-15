import createRollupConfig from "../rollup.config";

/**
 * These tests run the real config generator against the real `packages/`
 * folder, so they double as a check that every package's entry points can be
 * resolved.
 */
describe("createRollupConfig", () => {
    const findConfig = (configs, pkgName, format) =>
        configs.find(
            (c) =>
                c.output.format === format &&
                c.output.dir.includes(`packages/${pkgName}`),
        );

    it("generates a cjs and an esm config for each package", async () => {
        // Arrange, Act
        const configs = await createRollupConfig({});

        expect(findConfig(configs, "perseus", "cjs")).toBeDefined();
        expect(findConfig(configs, "perseus", "esm")).toBeDefined();
    });

    it("generates only the formats named by --configFormats", async () => {
        // Arrange, Act
        const configs = await createRollupConfig({configFormats: "esm"});

        expect(configs.map((c) => c.output.format)).not.toContain("cjs");
        expect(configs.map((c) => c.output.format)).toContain("esm");
    });

    it("writes cjs to dist/ and esm to dist/es/", async () => {
        // Arrange, Act
        const configs = await createRollupConfig({});

        expect(findConfig(configs, "perseus", "cjs").output.dir).toBe(
            "packages/perseus/dist",
        );
        expect(findConfig(configs, "perseus", "esm").output.dir).toBe(
            "packages/perseus/dist/es",
        );
    });

    it("emits one file per entry point plus hashed shared chunks", async () => {
        // Arrange, Act
        const configs = await createRollupConfig({});

        expect(findConfig(configs, "perseus", "esm").output).toMatchObject({
            entryFileNames: "[name].js",
            chunkFileNames: "chunk-[name]-[hash].js",
        });
    });

    it("builds all of a package's entry points from a single config", async () => {
        // Arrange, Act
        const configs = await createRollupConfig({configFormats: "esm"});

        // perseus exposes more than just its main entry point, and they all
        // have to be inputs of one config for shared modules to be emitted
        // into a single shared chunk.
        const {input} = findConfig(configs, "perseus", "esm");
        expect(Object.keys(input).length).toBeGreaterThan(1);
        expect(input.index).toMatch(/^packages\/perseus\/src\//);
    });
});
