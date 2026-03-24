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
    // This is disabled because it ends up also deleting the `.gitkeep`
    // placeholder file in the docs/ directory that ensures the folder exists
    // in git. Instead, we have a custom package.json script (clean:docs) that
    // deletes all files in this folder but retains the `.gitkeep` file.
    cleanOutputDir: false,
    githubPages: true,
    plugin: [
        "typedoc-plugin-missing-exports",
        ...(process.env.GITHUB_ACTIONS
            ? [path.join(__dirname, "github-annotations-plugin.cjs")]
            : []),
    ],
    packageOptions: {
        excludeExternals: true,
        excludeInternal: true,
        excludePrivate: true,
        excludeProtected: true,
        includeVersion: true,
        // Suppress warnings about React internal symbols (e.g. lifecycle
        // methods from @types/react) that TypeDoc resolves but can't link to
        // because they aren't part of our documentation.
        externalSymbolLinkMappings: {
            "@types/react": {"*": "#"},
        },
        readme: "README.md",
        entryPoints: ["./src/index.ts"],
    },
};

module.exports = config;
