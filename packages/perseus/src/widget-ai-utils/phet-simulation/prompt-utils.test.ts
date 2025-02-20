import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./phet-simulation-ai-utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

const question1: PerseusRenderer = {
    content:
        "Do this fun PhET simulation! A projectile data lab!\n[[\u2603 phet-simulation 1]]\n",
    images: {},
    widgets: {
        "phet-simulation 1": {
            graded: false,
            version: {major: 0, minor: 0},
            static: false,
            type: "phet-simulation",
            options: {
                url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
                description: "Projectile Data Lab",
            },
            alignment: "default",
        },
    },
};

describe("PhET Simulation AI utils", () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        en: {stringConstant: "localized string"},
                    }),
                ok: true,
            }),
        ) as jest.Mock;
        global.URL.canParse = jest.fn(() => true) as jest.Mock;
    });

    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "phet-simulation",
            isSupported: false,
            message: "",
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1, {isMobile: false});

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "Do this fun PhET simulation! A projectile data lab!\n[[\u2603 phet-simulation 1]]\n",
            widgets: {
                "phet-simulation 1": {
                    type: "phet-simulation",
                    isSupported: false,
                    message: "",
                },
            },
        });
    });
});
