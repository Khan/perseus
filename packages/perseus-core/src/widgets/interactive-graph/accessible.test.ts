import {
    generateIGLockedPoint,
    generateInteractiveGraphOptions,
} from "../../utils/generators/interactive-graph-widget-generator";

import accessible from "./accessible";

import type {PerseusInteractiveGraphWidgetOptions} from "../../data-schema";

describe("InteractiveGraph accessible", () => {
    it("can pass", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions();

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(true);
    });

    it("fails with protractor", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions({
                showProtractor: true,
            });

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(false);
    });

    it("fails with a web+graphie background image", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions({
                backgroundImage: {
                    url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/abc123",
                },
            });

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(false);
    });

    it("fails with a file+graphie background image", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions({
                backgroundImage: {
                    url: "file+graphie://local/abc123",
                },
            });

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(false);
    });

    it("passes with a non-graphie background image", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions({
                backgroundImage: {
                    url: "https://cdn.kastatic.org/images/example.png",
                },
            });

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(true);
    });

    it("passes when backgroundImage url is not set", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions({
                backgroundImage: {url: null},
            });

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(true);
    });

    it("fails with locked figures and no description", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions({
                lockedFigures: [generateIGLockedPoint()],
            });

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(false);
    });

    it("passes with locked figures and description", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions({
                lockedFigures: [generateIGLockedPoint()],
                fullGraphAriaDescription: "Cool description",
            });

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(true);
    });
});
