import {screen, within} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";

const question1: PerseusRenderer = {
    content:
        "**Match each claim with its supporting evidence.**\n\n[[\u2603 matcher 1]]",
    images: {},
    widgets: {
        "matcher 1": {
            version: {major: 0, minor: 0},
            type: "matcher",
            graded: true,
            options: {
                labels: ["**Claims**", "**Evidence**"],
                padding: true,
                orderMatters: false,
                right: [
                    "Medium-sized stars typically exist for roughly 10 billion years",
                    "The current trajectory of the Earth\u2019s tectonic plate movement",
                    "The life cycle of medium-sized stars includes a red giant stage and ends in a whimper as a white dwarf",
                    "Rapid escalation of greenhouse gas emissions",
                    "The current trajectory of the Milky Way galaxy and those in its immediate proximity",
                ],
                left: [
                    "Our Sun will run out of fuel and die in around 5 billion years ",
                    "Plate tectonics will rearrange the continents: the Pacific will narrow, bringing Australia closer to the Americas, and the Atlantic will expand to form the largest of the oceans ",
                    "Our Sun will run out of hydrogen, swell into a red giant, gobble up the inner rocky planets, and then collapse and die ",
                    "Average global temperatures will rise ",
                    "In 3 to 4 billion years, our galaxy will begin a slow collision with its closest large neighbor, Andromeda ",
                ],
            },
        },
    },
};

describe("matcher widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: ({
                children,
                onRender: onLoad,
            }: {
                children: React.ReactNode;
                onRender?: () => unknown;
            }) => {
                React.useLayoutEffect(() => {
                    onLoad?.();
                }, [onLoad]);
                return <span className="tex-mock">{children}</span>;
            },
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1, {isMobile: false});

        // Act
        const rightColumn = screen.getAllByRole("cell")[1];
        const rightItems = within(rightColumn).getAllByRole("listitem");
        const shuffledRightItems = rightItems.map((item) => item.textContent);

        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "**Match each claim with its supporting evidence.**\n\n[[\u2603 matcher 1]]",
            widgets: {
                "matcher 1": {
                    type: "matcher",
                    options: {
                        labels: ["**Claims**", "**Evidence**"],
                        left: [
                            "Our Sun will run out of fuel and die in around 5 billion years ",
                            "Plate tectonics will rearrange the continents: the Pacific will narrow, bringing Australia closer to the Americas, and the Atlantic will expand to form the largest of the oceans ",
                            "Our Sun will run out of hydrogen, swell into a red giant, gobble up the inner rocky planets, and then collapse and die ",
                            "Average global temperatures will rise ",
                            "In 3 to 4 billion years, our galaxy will begin a slow collision with its closest large neighbor, Andromeda ",
                        ],
                        right: [
                            "Medium-sized stars typically exist for roughly 10 billion years",
                            "The current trajectory of the Earth\u2019s tectonic plate movement",
                            "The life cycle of medium-sized stars includes a red giant stage and ends in a whimper as a white dwarf",
                            "Rapid escalation of greenhouse gas emissions",
                            "The current trajectory of the Milky Way galaxy and those in its immediate proximity",
                        ],
                        orderMatters: false,
                    },
                    userInput: {
                        left: [
                            "Our Sun will run out of fuel and die in around 5 billion years ",
                            "Plate tectonics will rearrange the continents: the Pacific will narrow, bringing Australia closer to the Americas, and the Atlantic will expand to form the largest of the oceans ",
                            "Our Sun will run out of hydrogen, swell into a red giant, gobble up the inner rocky planets, and then collapse and die ",
                            "Average global temperatures will rise ",
                            "In 3 to 4 billion years, our galaxy will begin a slow collision with its closest large neighbor, Andromeda ",
                        ],
                        right: shuffledRightItems,
                    },
                },
            },
        });
    });
});
