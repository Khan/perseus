import scoreLabelImage, {scoreMarker} from "./score-label-image";

const emptyMarker = {
    label: "",
    answers: [],
    selected: [],
    x: 0,
    y: 0,
} as const;

const emptyUserInput = {
    label: "",
    selected: [],
    x: 0,
    y: 0,
} as const;

const emptyScoringData = {
    label: "",
    answers: [],
    x: 0,
    y: 0,
} as const;

describe("scoreMarker", function () {
    it("should score correct for empty marker with no user answers", function () {
        const score = scoreMarker({
            ...emptyMarker,
        });

        expect(score).toEqual({
            hasAnswers: false,
            isCorrect: true,
        });
    });

    it("should score incorrect for empty marker with user answer", function () {
        const score = scoreMarker({
            ...emptyMarker,
            selected: ["Fiat"],
        });

        expect(score).toEqual({
            hasAnswers: true,
            isCorrect: false,
        });
    });

    it("should score incorrect for no user answers", function () {
        const score = scoreMarker({
            ...emptyMarker,
            answers: ["Lamborghini", "Fiat", "Ferrari"],
        });

        expect(score).toEqual({
            hasAnswers: false,
            isCorrect: false,
        });
    });

    it("should score incorrect for wrong user answers", function () {
        const score = scoreMarker({
            ...emptyMarker,
            answers: ["Lamborghini", "Fiat", "Ferrari"],
            selected: ["Fiat", "Ferrari"],
        });

        expect(score).toEqual({
            hasAnswers: true,
            isCorrect: false,
        });
    });

    it("should score correct for user answers", function () {
        const score = scoreMarker({
            ...emptyMarker,
            answers: ["Lamborghini", "Fiat", "Ferrari"],
            selected: ["Lamborghini", "Fiat", "Ferrari"],
        });

        expect(score).toEqual({
            hasAnswers: true,
            isCorrect: true,
        });
    });
});

describe("scoreLabelImage", function () {
    it("should not grade non-interacted widget", function () {
        const userInput = {
            markers: [
                {
                    ...emptyUserInput,
                    label: "England",
                },
                {
                    ...emptyUserInput,
                    label: "Germany",
                },
                {
                    ...emptyUserInput,
                    label: "Italy",
                },
            ],
        } as const;

        const scoringData = {
            markers: [
                {
                    ...emptyScoringData,
                    label: "England",
                    answers: ["Mini", "Morris Minor", "Reliant Robin"],
                },
                {
                    ...emptyScoringData,
                    label: "Germany",
                    answers: ["BMW", "Volkswagen", "Porsche"],
                },
                {
                    ...emptyScoringData,
                    label: "Italy",
                    answers: ["Lamborghini", "Fiat", "Ferrari"],
                },
            ],
        };

        const score = scoreLabelImage(userInput, scoringData);

        expect(score).toHaveInvalidInput();
    });

    it("should not grade widget with not all markers answered", function () {
        const userInput = {
            markers: [
                {
                    ...emptyUserInput,
                    label: "England",
                    selected: ["Fiat"],
                },
                {
                    ...emptyUserInput,
                    label: "Germany",
                    answers: ["BMW", "Volkswagen", "Porsche"],
                    selected: ["Lamborghini"],
                },
                {
                    ...emptyMarker,
                    label: "Italy",
                },
            ],
        } as const;

        const scoringData = {
            markers: [
                {
                    ...emptyScoringData,
                    label: "England",
                },
                {
                    ...emptyScoringData,
                    label: "Germany",
                    answers: ["BMW", "Volkswagen", "Porsche"],
                },
                {
                    ...emptyScoringData,
                    label: "Italy",
                    answers: ["Lamborghini", "Fiat", "Ferrari"],
                },
            ],
        } as const;

        const score = scoreLabelImage(userInput, scoringData);

        expect(score).toHaveInvalidInput();
    });

    it("should grade as incorrect for widget with no answers for markers", function () {
        const userInput = {
            markers: [
                {
                    ...emptyUserInput,
                    label: "England",
                    selected: ["Fiat"],
                },
                {
                    ...emptyUserInput,
                    label: "Germany",
                    selected: ["Lamborghini"],
                },
                {
                    ...emptyUserInput,
                    label: "Italy",
                    selected: ["Ferrari"],
                },
            ],
        } as const;

        const scoringData = {
            markers: [
                {
                    ...emptyScoringData,
                    label: "England",
                },
                {
                    ...emptyScoringData,
                    label: "Germany",
                },
                {
                    ...emptyScoringData,
                    label: "Italy",
                },
            ],
        } as const;

        const score = scoreLabelImage(userInput, scoringData);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("should grade as incorrect for widget with some wrong answers", function () {
        const userInput = {
            markers: [
                {
                    ...emptyMarker,
                    label: "England",
                    selected: ["Mini"],
                },
                {
                    ...emptyMarker,
                    label: "Germany",
                    selected: ["BMW", "Volkswagen", "Porsche"],
                },
                {
                    ...emptyMarker,
                    label: "Italy",
                    selected: ["Ferrari"],
                },
            ],
        } as const;

        const scoringData = {
            markers: [
                {
                    ...emptyMarker,
                    label: "England",
                    answers: ["Mini", "Morris Minor", "Reliant Robin"],
                },
                {
                    ...emptyMarker,
                    label: "Germany",
                    answers: ["BMW", "Volkswagen", "Porsche"],
                },
                {
                    ...emptyMarker,
                    label: "Italy",
                    answers: ["Lamborghini", "Fiat", "Ferrari"],
                },
            ],
        } as const;

        const score = scoreLabelImage(userInput, scoringData);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("should grade as correct for widget with all correct answers", function () {
        const userInput = {
            markers: [
                {
                    ...emptyMarker,
                    label: "England",
                    selected: ["Mini", "Morris Minor", "Reliant Robin"],
                },
                {
                    ...emptyMarker,
                    label: "Germany",
                    selected: ["BMW", "Volkswagen", "Porsche"],
                },
                {
                    ...emptyMarker,
                    label: "Italy",
                    selected: ["Lamborghini", "Fiat", "Ferrari"],
                },
            ],
        } as const;

        const scoringData = {
            markers: [
                {
                    ...emptyMarker,
                    label: "England",
                    answers: ["Mini", "Morris Minor", "Reliant Robin"],
                },
                {
                    ...emptyMarker,
                    label: "Germany",
                    answers: ["BMW", "Volkswagen", "Porsche"],
                },
                {
                    ...emptyMarker,
                    label: "Italy",
                    answers: ["Lamborghini", "Fiat", "Ferrari"],
                },
            ],
        } as const;

        const score = scoreLabelImage(userInput, scoringData);

        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
