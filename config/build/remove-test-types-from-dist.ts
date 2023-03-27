import * as fs from "fs";
import * as path from "path";

import * as fglob from "fast-glob";

const rootDir = path.join(__dirname, "..");
const testFiles = fglob.sync("packages/*/dist/**/*.test.d.ts", {
    cwd: rootDir,
});

for (const file of testFiles) {
    fs.unlinkSync(path.join(rootDir, file));
}

const filesInTestDirs = fglob.sync("packages/*/dist/**/__tests__/*.d.ts", {
    cwd: rootDir,
});

for (const file of filesInTestDirs) {
    fs.unlinkSync(path.join(rootDir, file));
}

const dirs = fglob.sync("packages/*/dist/**/__tests__", {
    cwd: rootDir,
    onlyFiles: false,
});

for (const dir of dirs) {
    fs.rmdirSync(path.join(rootDir, dir));
}

const filesInUtils = fglob.sync("utils/**/*.d.ts", {
    cwd: rootDir,
});

for (const file of filesInUtils) {
    fs.unlinkSync(path.join(rootDir, file));
}
