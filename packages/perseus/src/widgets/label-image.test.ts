import LabelImageWidget from "./label-image";

const LabelImage = LabelImageWidget.widget;

const emptyMarker = {
    label: "",
    answers: [],
    selected: [],
    x: 0,
    y: 0,
} as const;

describe("LabelImage", function () {
    describe("gradeMarker", function () {
        it("should score correct for empty marker with no user answers", function () {
            const score = LabelImage.gradeMarker({
                ...emptyMarker,
            });

            expect(score).toEqual({
                hasAnswers: false,
                isCorrect: true,
            });
        });

        it("should score incorrect for empty marker with user answer", function () {
            const score = LabelImage.gradeMarker({
                ...emptyMarker,
                selected: ["Fiat"],
            });

            expect(score).toEqual({
                hasAnswers: true,
                isCorrect: false,
            });
        });

        it("should score incorrect for no user answers", function () {
            const score = LabelImage.gradeMarker({
                ...emptyMarker,
                answers: ["Lamborghini", "Fiat", "Ferrari"],
            });

            expect(score).toEqual({
                hasAnswers: false,
                isCorrect: false,
            });
        });

        it("should score incorrect for wrong user answers", function () {
            const score = LabelImage.gradeMarker({
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
            const score = LabelImage.gradeMarker({
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

    describe("validate", function () {
        it("should not grade non-interacted widget", function () {
            const state = {
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

            const score = LabelImage.validate(state);

            expect(score).toEqual({
                type: "invalid",
                message: null,
            });
        });

        it("should not grade widget with not all markers answered", function () {
            const state = {
                markers: [
                    {
                        ...emptyMarker,
                        label: "England",
                        selected: ["Fiat"],
                    },
                    {
                        ...emptyMarker,
                        label: "Germany",
                        answers: ["BMW", "Volkswagen", "Porsche"],
                        selected: ["Lamborghini"],
                    },
                    {
                        ...emptyMarker,
                        label: "Italy",
                        answers: ["Lamborghini", "Fiat", "Ferrari"],
                    },
                ],
            } as const;

            const score = LabelImage.validate(state);

            expect(score).toEqual({
                type: "invalid",
                message: null,
            });
        });

        it("should grade as incorrect for widget with no answers for markers", function () {
            const state = {
                markers: [
                    {
                        ...emptyMarker,
                        label: "England",
                        selected: ["Fiat"],
                    },
                    {
                        ...emptyMarker,
                        label: "Germany",
                        selected: ["Lamborghini"],
                    },
                    {
                        ...emptyMarker,
                        label: "Italy",
                        selected: ["Ferrari"],
                    },
                ],
            } as const;

            const score = LabelImage.validate(state);

            expect(score).toEqual({
                type: "points",
                earned: 0,
                total: 1,
                message: null,
            });
        });

        it("should grade as incorrect for widget with some wrong answers", function () {
            const state = {
                markers: [
                    {
                        ...emptyMarker,
                        label: "England",
                        answers: ["Mini", "Morris Minor", "Reliant Robin"],
                        selected: ["Mini"],
                    },
                    {
                        ...emptyMarker,
                        label: "Germany",
                        answers: ["BMW", "Volkswagen", "Porsche"],
                        selected: ["BMW", "Volkswagen", "Porsche"],
                    },
                    {
                        ...emptyMarker,
                        label: "Italy",
                        answers: ["Lamborghini", "Fiat", "Ferrari"],
                        selected: ["Ferrari"],
                    },
                ],
            } as const;

            const score = LabelImage.validate(state);

            expect(score).toEqual({
                type: "points",
                earned: 0,
                total: 1,
                message: null,
            });
        });

        it("should grade as correct for widget with all correct answers", function () {
            const state = {
                markers: [
                    {
                        ...emptyMarker,
                        label: "England",
                        answers: ["Mini", "Morris Minor", "Reliant Robin"],
                        selected: ["Mini", "Morris Minor", "Reliant Robin"],
                    },
                    {
                        ...emptyMarker,
                        label: "Germany",
                        answers: ["BMW", "Volkswagen", "Porsche"],
                        selected: ["BMW", "Volkswagen", "Porsche"],
                    },
                    {
                        ...emptyMarker,
                        label: "Italy",
                        answers: ["Lamborghini", "Fiat", "Ferrari"],
                        selected: ["Lamborghini", "Fiat", "Ferrari"],
                    },
                ],
            } as const;

            const score = LabelImage.validate(state);

            expect(score).toEqual({
                type: "points",
                earned: 1,
                total: 1,
                message: null,
            });
        });
    });

    describe("imageSideForMarkerPosition", function () {
        it("should return side: top", function () {
            expect(LabelImage.imageSideForMarkerPosition(21, 0)).toEqual("top");
            expect(LabelImage.imageSideForMarkerPosition(79, 0)).toEqual("top");
            expect(LabelImage.imageSideForMarkerPosition(50, 0)).toEqual("top");
            expect(LabelImage.imageSideForMarkerPosition(50, 25)).toEqual(
                "top",
            );
            expect(LabelImage.imageSideForMarkerPosition(50, 50)).toEqual(
                "top",
            );
        });

        it("should return side: right", function () {
            expect(LabelImage.imageSideForMarkerPosition(100, 0)).toEqual(
                "right",
            );
            expect(LabelImage.imageSideForMarkerPosition(100, 100)).toEqual(
                "right",
            );
            expect(LabelImage.imageSideForMarkerPosition(100, 50)).toEqual(
                "right",
            );
            expect(LabelImage.imageSideForMarkerPosition(75, 50)).toEqual(
                "right",
            );
            expect(LabelImage.imageSideForMarkerPosition(51, 50)).toEqual(
                "right",
            );
        });

        it("should return side: bottom", function () {
            expect(LabelImage.imageSideForMarkerPosition(21, 100)).toEqual(
                "bottom",
            );
            expect(LabelImage.imageSideForMarkerPosition(79, 100)).toEqual(
                "bottom",
            );
            expect(LabelImage.imageSideForMarkerPosition(50, 100)).toEqual(
                "bottom",
            );
            expect(LabelImage.imageSideForMarkerPosition(50, 75)).toEqual(
                "bottom",
            );
            expect(LabelImage.imageSideForMarkerPosition(50, 51)).toEqual(
                "bottom",
            );
        });

        it("should return side: left", function () {
            expect(LabelImage.imageSideForMarkerPosition(0, 0)).toEqual("left");
            expect(LabelImage.imageSideForMarkerPosition(0, 100)).toEqual(
                "left",
            );
            expect(LabelImage.imageSideForMarkerPosition(0, 50)).toEqual(
                "left",
            );
            expect(LabelImage.imageSideForMarkerPosition(25, 50)).toEqual(
                "left",
            );
            expect(LabelImage.imageSideForMarkerPosition(49, 50)).toEqual(
                "left",
            );
        });
    });

    describe("navigateToMarkerIndex", function () {
        it("should not navigate if all other markers were answered", function () {
            const markers = [
                {
                    ...emptyMarker,
                    label: "this",
                },
                {
                    ...emptyMarker,
                    label: "above",
                    y: -1,
                    showCorrectness: "correct",
                },
                {
                    ...emptyMarker,
                    label: "right",
                    x: 1,
                    showCorrectness: "correct",
                },
                {
                    ...emptyMarker,
                    label: "below",
                    y: 1,
                    showCorrectness: "correct",
                },
                {
                    ...emptyMarker,
                    label: "left",
                    x: -1,
                    showCorrectness: "correct",
                },
            ];

            expect(
                markers[
                    // @ts-expect-error [FEI-5003] - TS2345 - Argument of type '({ label: string; answers: readonly []; selected: readonly []; x: 0; y: 0; } | { label: string; y: number; showCorrectness: string; answers: readonly []; selected: readonly []; x: 0; } | { label: string; x: number; showCorrectness: string; answers: readonly []; selected: readonly []; y: 0; })[]' is not assignable to parameter of type 'readonly InteractiveMarkerType[]'.
                    LabelImage.navigateToMarkerIndex({x: 0, y: 0}, markers, 0)
                ].label,
            ).toEqual("this");
        });

        describe("up direction", function () {
            const navigateDirecton = {x: 0, y: -1} as const;

            it("should navigate to marker above", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        y: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "below",
                        y: 1,
                    },
                    {
                        ...emptyMarker,
                        label: "above",
                        y: -1,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("above");
            });

            it("should navigate to lowest marker", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        y: -1,
                    },
                    {
                        ...emptyMarker,
                        label: "lowest",
                        y: 1,
                    },
                    {
                        ...emptyMarker,
                        label: "below",
                        y: 0,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("lowest");
            });

            it("should navigate to the next above marker in original order", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        y: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "above 1",
                        y: -1,
                    },
                    {
                        ...emptyMarker,
                        label: "above 2",
                        y: -1,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("above 1");
            });

            it("should navigate to the next coplanar marker in original order", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        y: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "coplanar 1",
                        y: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "coplanar 2",
                        y: 0,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("coplanar 1");
            });
        });

        describe("right direction", function () {
            const navigateDirecton = {x: 1, y: 0} as const;

            it("should navigate to marker on the right", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        x: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "left",
                        x: -1,
                    },
                    {
                        ...emptyMarker,
                        label: "right",
                        x: 1,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("right");
            });

            it("should navigate to leftmost marker", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        x: 1,
                    },
                    {
                        ...emptyMarker,
                        label: "leftmost",
                        x: -1,
                    },
                    {
                        ...emptyMarker,
                        label: "left",
                        x: 0,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("leftmost");
            });

            it("should navigate to the next right marker in original order", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        x: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "right 1",
                        x: 1,
                    },
                    {
                        ...emptyMarker,
                        label: "right 2",
                        x: 1,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("right 1");
            });

            it("should navigate to the next coplanar marker in original order", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        x: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "coplanar 1",
                        x: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "coplanar 2",
                        x: 0,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("coplanar 1");
            });
        });

        describe("down direction", function () {
            const navigateDirecton = {x: 0, y: 1} as const;

            it("should navigate to marker below", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        y: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "above",
                        y: -1,
                    },
                    {
                        ...emptyMarker,
                        label: "below",
                        y: 1,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("below");
            });

            it("should navigate to highest marker", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        y: 1,
                    },
                    {
                        ...emptyMarker,
                        label: "highest",
                        y: -1,
                    },
                    {
                        ...emptyMarker,
                        label: "above",
                        y: 0,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("highest");
            });

            it("should navigate to the next below marker in original order", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        y: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "below 1",
                        y: 1,
                    },
                    {
                        ...emptyMarker,
                        label: "below 2",
                        y: 1,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("below 1");
            });

            it("should navigate to the next coplanar marker in original order", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        y: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "coplanar 1",
                        y: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "coplanar 2",
                        y: 0,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("coplanar 1");
            });
        });

        describe("left direction", function () {
            const navigateDirecton = {x: -1, y: 0} as const;

            it("should navigate to marker on the left", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        x: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "right",
                        x: 1,
                    },
                    {
                        ...emptyMarker,
                        label: "left",
                        x: -1,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("left");
            });

            it("should navigate to rightmost marker", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        x: -1,
                    },
                    {
                        ...emptyMarker,
                        label: "rightmost",
                        x: 1,
                    },
                    {
                        ...emptyMarker,
                        label: "right",
                        x: 0,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("rightmost");
            });

            it("should navigate to the next left marker in original order", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        x: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "left 1",
                        x: -1,
                    },
                    {
                        ...emptyMarker,
                        label: "left 2",
                        x: -1,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("left 1");
            });

            it("should navigate to the next coplanar marker in original order", function () {
                const markers = [
                    {
                        ...emptyMarker,
                        label: "this",
                        x: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "coplanar 1",
                        x: 0,
                    },
                    {
                        ...emptyMarker,
                        label: "coplanar 2",
                        x: 0,
                    },
                ];

                expect(
                    markers[
                        LabelImage.navigateToMarkerIndex(
                            navigateDirecton,
                            markers,
                            0,
                        )
                    ].label,
                ).toEqual("coplanar 1");
            });
        });
    });
});
