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
    out: "docs",
    cleanOutputDir: true,
    githubPages: true,
    theme: "perseus",
    packageOptions: {
        excludePrivate: true,
        excludeInternal: true,
        readme: "README.md",
        entryPoints: ["./src/index.ts"],
    },
};

module.exports = config;
