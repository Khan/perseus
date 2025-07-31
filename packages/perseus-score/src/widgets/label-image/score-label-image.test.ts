import scoreLabelImage, {scoreLabelImageMarker} from "./score-label-image";

describe("scoreLabelImageMarker", function () {
    it("should score correct for empty marker with no user answers", function () {
        const score = scoreLabelImageMarker([], []);

        expect(score).toEqual({
            hasAnswers: false,
            isCorrect: true,
        });
    });

    it("should score incorrect for empty marker with user answer", function () {
        const score = scoreLabelImageMarker(["Fiat"], []);

        expect(score).toEqual({
            hasAnswers: true,
            isCorrect: false,
        });
    });

    it("should score incorrect for no user answers", function () {
        const score = scoreLabelImageMarker(
            [],
            ["Lamborghini", "Fiat", "Ferrari"],
        );

        expect(score).toEqual({
            hasAnswers: false,
            isCorrect: false,
        });
    });

    it("should score incorrect for wrong user answers", function () {
        const score = scoreLabelImageMarker(
            ["Fiat", "Ferrari"],
            ["Lamborghini", "Fiat", "Ferrari"],
        );

        expect(score).toEqual({
            hasAnswers: true,
            isCorrect: false,
        });
    });

    it("should score correct for user answers", function () {
        const score = scoreLabelImageMarker(
            ["Lamborghini", "Fiat", "Ferrari"],
            ["Lamborghini", "Fiat", "Ferrari"],
        );

        expect(score).toEqual({
            hasAnswers: true,
            isCorrect: true,
        });
    });
});

describe("scoreLabelImage", function () {
    it("should grade as invalid for undefined user input", function () {
        const userInput = undefined;

        const rubric = {
            markers: [
                {
                    label: "England",
                    answers: [],
                },
                {
                    label: "Germany",
                    answers: [],
                },
                {
                    label: "Italy",
                    answers: [],
                },
            ],
        };

        const score = scoreLabelImage(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("should grade as incorrect for widget with no answers for markers", function () {
        const userInput = {
            markers: [
                {
                    label: "England",
                    selected: ["Fiat"],
                },
                {
                    label: "Germany",
                    selected: ["Lamborghini"],
                },
                {
                    label: "Italy",
                    selected: ["Ferrari"],
                },
            ],
        };

        const rubric = {
            markers: [
                {
                    label: "England",
                    answers: [],
                },
                {
                    label: "Germany",
                    answers: [],
                },
                {
                    label: "Italy",
                    answers: [],
                },
            ],
        };

        const score = scoreLabelImage(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("should grade as incorrect for widget with some wrong answers", function () {
        const userInput = {
            markers: [
                {
                    label: "England",
                    selected: ["Mini"],
                },
                {
                    label: "Germany",
                    selected: ["BMW", "Volkswagen", "Porsche"],
                },
                {
                    label: "Italy",
                    selected: ["Ferrari"],
                },
            ],
        };

        const rubric = {
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
        };

        const score = scoreLabelImage(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("should grade as correct for widget with all correct answers", function () {
        const userInput = {
            markers: [
                {
                    label: "England",
                    selected: ["Mini", "Morris Minor", "Reliant Robin"],
                },
                {
                    label: "Germany",
                    selected: ["BMW", "Volkswagen", "Porsche"],
                },
                {
                    label: "Italy",
                    selected: ["Lamborghini", "Fiat", "Ferrari"],
                },
            ],
        };

        const rubric = {
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
        };

        const score = scoreLabelImage(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
