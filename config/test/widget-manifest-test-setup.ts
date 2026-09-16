import fs from "fs";
import path from "path";

import {
    enterWidgetManifestContext,
    getWidgetManifest,
    resetWidgetManifests,
} from "@khanacademy/perseus-core/registry";

const repositoryRoot = path.resolve(__dirname, "../..");
const manifestDirectory =
    process.env.PERSEUS_WIDGET_MANIFEST_DIR ??
    path.join(repositoryRoot, ".widget-manifests");

if (process.env.PERSEUS_WIDGET_MANIFESTS === "1") {
    const testPath = expect.getState().testPath;
    if (!testPath) {
        throw new Error(
            "Jest did not provide a test path for widget recording",
        );
    }

    const fileName = path
        .relative(repositoryRoot, testPath)
        .replace(/\\/g, "/");
    const restore = enterWidgetManifestContext(fileName);

    afterAll(() => {
        const outputPath = path.join(manifestDirectory, `${fileName}.json`);
        fs.mkdirSync(path.dirname(outputPath), {recursive: true});
        fs.writeFileSync(
            outputPath,
            `${JSON.stringify(getWidgetManifest(fileName), null, 2)}\n`,
        );
        resetWidgetManifests(fileName);
        restore();
    });
}
