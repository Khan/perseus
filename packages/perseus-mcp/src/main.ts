// Runs the server from this monorepo's sources, as bin/perseus-mcp.mjs does.
// Vite compiles the preview pages as they're asked for, unless --pages names
// prebuilt ones.
import {createStaticPreviewSource} from "./adapters/preview/static-preview-pages";
import {createViteAppPage} from "./adapters/preview/vite-app-page";
import {createVitePreviewPages} from "./adapters/preview/vite-preview-pages";
import {checkoutPaths} from "./runtime-paths";
import {start} from "./start";

await start({
    paths: checkoutPaths(),
    previewSource: (pages) =>
        pages == null
            ? {
                  createPreview: createVitePreviewPages,
                  previewApp: createViteAppPage(),
              }
            : createStaticPreviewSource(pages),
});
