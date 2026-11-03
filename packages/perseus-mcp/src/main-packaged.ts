// Runs the server from a package (the Claude Desktop extension, built by
// scripts/build-mcpb-lib.ts): this file is bundled into server/index.mjs, next
// to the prebuilt pages and perseus-core's type definitions. Nothing here
// loads Vite, which the package doesn't include.
import path from "node:path";

import {createStaticPreviewSource} from "./adapters/preview/static-preview-pages";
import {packagedPaths} from "./runtime-paths";
import {start} from "./start";

const paths = packagedPaths(path.resolve(import.meta.dirname, ".."));

await start({
    paths,
    previewSource: (pages) =>
        createStaticPreviewSource(pages ?? paths.pagesDir),
});
