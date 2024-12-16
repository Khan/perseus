import scoreLabelImage from "./score-label-image";

import type {
    PerseusLabelImageScoringData,
    PerseusLabelImageUserInput,
} from "../../validation.types";

describe("scoreLabelImage", function () {
    it("should not grade non-interacted widget", function () {
        const userInput: PerseusLabelImageUserInput = {
            markers: [{label: "England"}, {label: "Germany"}, {label: "Italy"}],
        } as const;

        const scoringData: PerseusLabelImageScoringData = {
            markers: [
                {
                    label: "England",
                    answers: ["Mini", "Morris Minor", "Reliant Robin"],
                },
                {
                    label: "Germany",
                    answers: ["BMW", "Volkswagen", "Porsche"],
                },
                {
                    label: "Italy",
                    answers: ["Lamborghini", "Fiat", "Ferrari"],
                },
            ],
        } as const;

        const score = scoreLabelImage(userInput, scoringData);

        expect(score).toHaveInvalidInput();
    });

    it("should not grade widget with not all markers answered", function () {
        const userInput = {
            markers: [
                {label: "England", selected: ["Fiat"]},
                {label: "Germany", selected: ["Lamborghini"]},
                {label: "Italy"},
            ],
        } as const;

        const scoringData = {
            markers: [
                {
                    label: "England",
                    answers: [],
                },
                {
                    label: "Germany",
                    answers: ["BMW", "Volkswagen", "Porsche"],
                },
                {
                    label: "Italy",
                    answers: ["Lamborghini", "Fiat", "Ferrari"],
                },
            ],
        } as const;

        const score = scoreLabelImage(userInput, scoringData);

        expect(score).toHaveInvalidInput();
    });
});
