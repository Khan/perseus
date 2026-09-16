const fs = require("fs");
const path = require("path");

class WidgetManifestReporter {
    constructor() {
        this.manifestDirectory =
            process.env.PERSEUS_WIDGET_MANIFEST_DIR ??
            path.resolve(__dirname, "../../.widget-manifests");
    }

    onRunStart() {
        fs.rmSync(this.manifestDirectory, {recursive: true, force: true});
        fs.mkdirSync(this.manifestDirectory, {recursive: true});
    }
}

module.exports = WidgetManifestReporter;
