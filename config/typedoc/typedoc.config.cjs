const fs = require("node:fs");
const path = require("node:path");

const packagesDir = path.join(__dirname, "..", "..", "packages");
const entryPoints = fs
    .readdirSync(packagesDir, {withFileTypes: true})
    .filter(
        (entry) =>
            entry.isDirectory() &&
            fs.existsSync(path.join(packagesDir, entry.name, "package.json")),
    )
    .map((entry) => path.join("packages", entry.name));

/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
    name: "Perseus",
    entryPointStrategy: "packages",
    entryPoints,
    out: "docs/",
    // This is disabled for now. If we enable it, typedoc actually deletes the
    // entire output folder (docs/) which then blows away our .gitkeep
    // placeholder, which then dirties the repo, which is annoying.
    cleanOutputDir: false,
    githubPages: true,
    includeVersion: true,
    plugin: ["typedoc-plugin-missing-exports"],
    packageOptions: {
        excludePrivate: true,
        excludeInternal: true,
        excludeProtected: true,
        readme: "README.md",
        entryPoints: ["./src/index.ts"],
    },
};

module.exports = config;
