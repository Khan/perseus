/**
 * @jest-environment node
 */
import fs from "node:fs";

import {GraffitiRenderError} from "../../app/errors";
import {checkoutPaths} from "../../runtime-paths";

import {createNodeGraffitiRenderer} from "./node-graffiti-renderer";

const paths = checkoutPaths().graffiti!;

// Graffiti is linked in from its own checkout and has to be built there.
const describeIfBuilt = fs.existsSync(paths.module) ? describe : describe.skip;

const TRIANGLE = `
import {label, point, polygon, scaledUniform} from "graffiti";

const canvas = scaledUniform([0, 4], [0, 3], 20, {margin: 10});
export default {
    canvas,
    shapes: [polygon([point(0, 0), point(4, 0), point(0, 3)])],
    labels: [label(point(4, 0), "B", "right")],
};
`;

describeIfBuilt("createNodeGraffitiRenderer", () => {
    beforeEach(() => {
        // The shared test setup fakes timers, which stalls child processes.
        jest.useRealTimers();
    });

    it("draws the script's shapes and passes on its labels", async () => {
        // Arrange
        const renderer = createNodeGraffitiRenderer(paths);

        // Act
        const drawing = await renderer.render(TRIANGLE);

        // Assert
        expect({
            svg: drawing.svg.includes("<polygon"),
            labels: drawing.data.labels.map((l) => l.content),
            size: [drawing.width, drawing.height],
        }).toEqual({svg: true, labels: ["B"], size: [100, 80]});
    });

    it("refuses a script that imports anything but Graffiti", async () => {
        // Arrange
        const renderer = createNodeGraffitiRenderer(paths);

        // Act
        const drawing = renderer.render(
            'import fs from "node:fs"; export default fs;',
        );

        // Assert
        await expect(drawing).rejects.toThrow(
            'can import only "graffiti", not "node:fs"',
        );
    });

    it("gives a script no network", async () => {
        // Arrange
        const renderer = createNodeGraffitiRenderer(paths);

        // Act
        const drawing = renderer.render(
            'export default async () => fetch("https://example.com");',
        );

        // Assert
        await expect(drawing).rejects.toThrow("fetch is not defined");
    });

    it("stops a script that runs too long", async () => {
        // Arrange
        const renderer = createNodeGraffitiRenderer(paths, {timeLimitMs: 500});

        // Act
        const drawing = renderer.render("while (true) {}");

        // Assert
        await expect(drawing).rejects.toThrow(GraffitiRenderError);
    });
});
