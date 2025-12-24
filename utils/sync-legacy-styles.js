const fs = require("fs");
const path = require("path");

const {objectifyCSS} = require("./extract-aphrodite");

const perseusDirectory = path.join(
    path.dirname(__dirname),
    "packages",
    "perseus",
);

const getVariableName = (pathName) => {
    const contents = fs.readFileSync(pathName, "utf-8");
    const match = contents.match(/const\s+([a-zA-Z0-9_]+)\s*=\s*{/);
    if (match) {
        return match[1];
    }
};

const filesToSync = fs
    .readdirSync(perseusDirectory, {
        recursive: true,
        withFileTypes: true,
    })
    .filter((file) => file.name.endsWith("_legacy-styles.js"))
    .map((file) => {
        const cssFileName = file.name.replace(
            "_legacy-styles.js",
            ".module.css",
        );
        const cssPathName = path.join(file["path"], cssFileName);
        const variableName = getVariableName(
            path.join(file["path"], file.name),
        );
        return {cssPathName, variableName};
    });

filesToSync.forEach((file) => {
    objectifyCSS(file.cssPathName, file.variableName);
});
