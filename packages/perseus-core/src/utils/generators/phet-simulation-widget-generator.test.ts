import {
    generatePhetSimulationOptions,
    generatePhetSimulationWidget,
} from "./phet-simulation-widget-generator";

import type {
    PerseusPhetSimulationWidgetOptions,
    PhetSimulationWidget,
} from "../../data-schema";

describe("generatePhetSimulationOptions", () => {
    test("builds default phet-simulation options", () => {
        // Arrange, Act
        const options: PerseusPhetSimulationWidgetOptions =
            generatePhetSimulationOptions();

        // Assert
        expect(options.url).toBe("");
        expect(options.description).toBe("");
    });

    test("builds phet-simulation options with all props", () => {
        // Arrange, Act
        const options: PerseusPhetSimulationWidgetOptions =
            generatePhetSimulationOptions({
                url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
                description: "Projectile Data Lab",
            });

        // Assert
        expect(options.url).toBe(
            "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
        );
        expect(options.description).toBe("Projectile Data Lab");
    });
});

describe("generatePhetSimulationWidget", () => {
    test("builds a default phet-simulation widget", () => {
        // Arrange, Act
        const widget: PhetSimulationWidget = generatePhetSimulationWidget();

        // Assert
        expect(widget.type).toBe("phet-simulation");
        expect(widget.graded).toBe(false);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({url: "", description: ""});
    });

    test("builds a phet-simulation widget with all props", () => {
        // Arrange, Act
        const widget: PhetSimulationWidget = generatePhetSimulationWidget({
            graded: true,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: generatePhetSimulationOptions({
                url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
                description: "Projectile Data Lab",
            }),
        });

        // Assert
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(true);
        expect(widget.version).toEqual({major: 1, minor: 0});
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
            description: "Projectile Data Lab",
        });
    });

    test("adds options when option builder is used", () => {
        // Arrange, Act
        const widget: PhetSimulationWidget = generatePhetSimulationWidget({
            static: true,
            options: generatePhetSimulationOptions({
                url: "https://google.com/",
                description: "Google",
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.options.url).toBe("https://google.com/");
        expect(widget.options.description).toBe("Google");
    });

    test("fills in missing option fields with defaults when a partial options object is passed directly, without going through the option builder", () => {
        // Arrange, Act
        const widget: PhetSimulationWidget = generatePhetSimulationWidget({
            // @ts-expect-error -- intentionally passing a partial options
            // object directly (not via generatePhetSimulationOptions) to
            // verify the widget generator still fills in defaults for it.
            options: {url: "https://google.com/"},
        });

        // Assert
        expect(widget.options.url).toBe("https://google.com/");
        expect(widget.options.description).toBe("");
    });
});
