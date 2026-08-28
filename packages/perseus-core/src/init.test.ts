import fs from "fs";
import path from "path";

import {initPerseusCore} from "./init";
import {isWidgetRegistered} from "./widgets/core-widget-registry";

function widgetDirectoryNames(): Array<string> {
    return (
        fs
            .readdirSync(path.join(__dirname, "widgets"), {withFileTypes: true})
            // Dot-directories are tooling scratch space (e.g. .claude), not widgets.
            .filter(
                (entry) => entry.isDirectory() && !entry.name.startsWith("."),
            )
            .map((entry) => entry.name)
    );
}

describe("initPerseusCore", () => {
    it("registers the logic of every widget directory", () => {
        initPerseusCore();

        for (const name of widgetDirectoryNames()) {
            expect(isWidgetRegistered(name)).toBe(true);
        }
    });

    it("registers free-response", () => {
        initPerseusCore();

        expect(isWidgetRegistered("free-response")).toBe(true);
    });

    it("resolves deprecated widget types to the standin logic", () => {
        initPerseusCore();

        expect(isWidgetRegistered("transformer")).toBe(true);
    });
});

describe("the ./init subpath", () => {
    it("shares one registry with the package barrel", () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const subpath = require("@khanacademy/perseus-core/init");
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const barrel = require("@khanacademy/perseus-core");

        // Registering through the subpath is observable through the barrel:
        // the two entries resolve to one Registry, not one per build.
        subpath.initPerseusCore();

        expect(barrel.CoreWidgetRegistry.isWidgetRegistered("radio")).toBe(
            true,
        );
    });
});

describe("the ./widgets/* subpath", () => {
    it.each(widgetDirectoryNames())("resolves %s", (name) => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const {default: logic} = require(
            `@khanacademy/perseus-core/widgets/${name}`,
        );

        expect(logic.name).toBe(name);
    });
});
