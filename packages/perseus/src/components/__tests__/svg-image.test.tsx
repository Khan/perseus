import {act, fireEvent, render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {mockImageLoading} from "../../testing/image-loader-utils";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import * as GraphieUtils from "../../util/graphie-utils";
import {typicalCase} from "../../util/graphie-utils.testdata";
import {graphieImage} from "../../widgets/image/utils";
import SvgImage from "../svg-image";

describe("SvgImage", () => {
    let unmockImageLoading: () => void;

    beforeEach(() => {
        jest.clearAllMocks();

        unmockImageLoading = mockImageLoading();

        jest.spyOn(Dependencies, "useDependencies").mockReturnValue({
            ...testDependenciesV2,
        });
    });

    afterEach(() => {
        unmockImageLoading();
    });

    it("should render a spinner initially", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Act
        const {container} = render(
            <SvgImage
                src="http://localhost/sample.png"
                alt="png image"
                allowZoom={false}
            />,
        );

        // Assert
        expect(screen.getByTestId("loading-spinner")).toBeVisible();
        expect(container).toMatchSnapshot();
    });

    it("should load and render a png", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Act
        const {container} = render(
            <SvgImage
                src="http://localhost/sample.png"
                alt="png image"
                allowZoom={false}
            />,
        );

        act(() => {
            jest.runAllTimers();
        });

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should load and render a normal graphie svg", async () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Act
        const {container} = render(
            <SvgImage
                src={typicalCase.url}
                alt="svg image"
                allowZoom={false}
            />,
        );

        act(() => {
            jest.runAllTimers();
        });

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should load and render a localized graphie svg", async () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            kaLocale: "es",
        });

        // Act
        const {container} = render(
            <SvgImage
                src={typicalCase.url}
                alt="svg image"
                allowZoom={false}
            />,
        );

        act(() => {
            jest.runAllTimers();
        });

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should call the generateUrl dependency to set the img src", () => {
        // Arrange
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue({
            ...testDependenciesV2,
            generateUrl: () => {
                return "https://www.khanacademy.org/my-test-img.png";
            },
        });

        // Act
        render(
            <SvgImage
                src="http://localhost/sample.png"
                alt="png image"
                allowZoom={false}
            />,
        );

        act(() => {
            jest.runAllTimers();
        });

        // Assert
        expect(
            screen.getByRole<HTMLImageElement>("img", {name: "png image"}).src,
        ).toEqual("https://www.khanacademy.org/my-test-img.png");
    });

    describe("Graphie label scaling", () => {
        const mockLabels = [
            {
                content: "A",
                coordinates: [1, 1],
                alignment: "center" as const,
                typesetAsMath: false,
                style: {},
            },
        ];

        it("should have default label size when no scale is provided", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            jest.spyOn(GraphieUtils, "loadGraphie").mockImplementation(
                (url, onDataLoaded) => {
                    onDataLoaded(
                        {
                            labels: mockLabels,
                            range: [
                                [-10, 10],
                                [-10, 10],
                            ],
                        },
                        false,
                    );
                },
            );

            const {container} = render(
                <SvgImage
                    src={graphieImage.url}
                    alt="svg image"
                    allowZoom={false}
                    width={graphieImage.width}
                    height={graphieImage.height}
                />,
            );

            act(() => {
                jest.runAllTimers();
            });

            // Assert
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const labels = container.querySelectorAll(".graphie-label");
            const label = labels[0];
            expect(label).toHaveStyle({
                fontSize: "100%",
            });
        });

        it.each([
            [1, "100%"],
            [2, "200%"],
            [0.5, "50%"],
        ])(
            "should have scaled label size when scale is %s",
            (scale, expectedFontSize) => {
                // Arrange
                jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                    testDependencies,
                );
                jest.spyOn(GraphieUtils, "loadGraphie").mockImplementation(
                    (url, onDataLoaded) => {
                        onDataLoaded(
                            {
                                labels: mockLabels,
                                range: [
                                    [-10, 10],
                                    [-10, 10],
                                ],
                            },
                            false,
                        );
                    },
                );

                const {container} = render(
                    <SvgImage
                        src={graphieImage.url}
                        alt="svg image"
                        allowZoom={false}
                        scale={scale}
                        width={graphieImage.width}
                        height={graphieImage.height}
                    />,
                );

                act(() => {
                    jest.runAllTimers();
                });

                // Assert
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const label = container.querySelectorAll(".graphie-label")[0];
                expect(label).toHaveStyle({
                    fontSize: expectedFontSize,
                });
            },
        );

        it("should have default label padding when no scale is provided", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            jest.spyOn(GraphieUtils, "loadGraphie").mockImplementation(
                (url, onDataLoaded) => {
                    onDataLoaded(
                        {
                            labels: mockLabels,
                            range: [
                                [-10, 10],
                                [-10, 10],
                            ],
                        },
                        false,
                    );
                },
            );

            const {container} = render(
                <SvgImage
                    src={graphieImage.url}
                    alt="svg image"
                    allowZoom={false}
                    width={graphieImage.width}
                    height={graphieImage.height}
                />,
            );

            act(() => {
                jest.runAllTimers();
            });

            // Assert
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const label = container.querySelectorAll(".graphie-label")[0];
            expect(label).toHaveStyle({
                padding: "7px", // default padding
            });
        });

        it.each([
            [1, "7px"], // default padding
            [2, "14px"],
            [0.5, "3.5px"],
        ])(
            "should have scaled label padding when scale is %s",
            (scale, expectedPadding) => {
                // Arrange
                jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                    testDependencies,
                );
                jest.spyOn(GraphieUtils, "loadGraphie").mockImplementation(
                    (url, onDataLoaded) => {
                        onDataLoaded(
                            {
                                labels: mockLabels,
                                range: [
                                    [-10, 10],
                                    [-10, 10],
                                ],
                            },
                            false,
                        );
                    },
                );

                const {container} = render(
                    <SvgImage
                        src={graphieImage.url}
                        alt="svg image"
                        allowZoom={false}
                        scale={scale}
                        width={graphieImage.width}
                        height={graphieImage.height}
                    />,
                );

                act(() => {
                    jest.runAllTimers();
                });

                // Assert
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const label = container.querySelectorAll(".graphie-label")[0];
                expect(label).toHaveStyle({
                    padding: expectedPadding,
                });
            },
        );
    });

    describe("infinite loop prevention", () => {
        it("should only call loadGraphie once even if component re-renders during loading", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            const loadGraphieSpy = jest.spyOn(GraphieUtils, "loadGraphie");

            // Act
            const {rerender} = render(
                <SvgImage
                    src={typicalCase.url}
                    alt="svg image"
                    allowZoom={false}
                />,
            );

            // Simulate a re-render before async loadGraphie completes
            // (this would previously cause loadGraphie to be called again)
            rerender(
                <SvgImage
                    src={typicalCase.url}
                    alt="svg image"
                    allowZoom={false}
                />,
            );

            // Another re-render
            rerender(
                <SvgImage
                    src={typicalCase.url}
                    alt="svg image"
                    allowZoom={false}
                />,
            );

            // Assert - loadGraphie should only be called once despite multiple re-renders
            expect(loadGraphieSpy).toHaveBeenCalledTimes(1);
        });

        it("should reset loading flag when src changes", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            const loadGraphieSpy = jest.spyOn(GraphieUtils, "loadGraphie");

            // Act
            const {rerender} = render(
                <SvgImage
                    src={typicalCase.url}
                    alt="svg image"
                    allowZoom={false}
                />,
            );

            // Change the src prop
            rerender(
                <SvgImage
                    src="web+graphie://ka-perseus-graphie.s3.amazonaws.com/different-image"
                    alt="svg image"
                    allowZoom={false}
                />,
            );

            // Assert - loadGraphie should be called twice (once for each src)
            expect(loadGraphieSpy).toHaveBeenCalledTimes(2);
        });

        it("should allow loadGraphie to be called again after loading completes", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            const loadGraphieSpy = jest.spyOn(GraphieUtils, "loadGraphie");

            // Act
            const {rerender} = render(
                <SvgImage
                    src={typicalCase.url}
                    alt="svg image"
                    allowZoom={false}
                />,
            );

            // Complete the async loading
            act(() => {
                jest.runAllTimers();
            });

            // Change to a different graphie image
            rerender(
                <SvgImage
                    src="web+graphie://ka-perseus-graphie.s3.amazonaws.com/different-image"
                    alt="svg image"
                    allowZoom={false}
                />,
            );

            // Assert - loadGraphie should be called twice
            expect(loadGraphieSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe("gif pause/play", () => {
        const GIF_SRC = "https://cdn.kastatic.org/test.gif";
        let mockDrawImage: jest.Mock;

        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            mockDrawImage = jest.fn();
            jest.spyOn(
                HTMLCanvasElement.prototype,
                "getContext",
            ).mockReturnValue({
                drawImage: mockDrawImage,
            } as Partial<CanvasRenderingContext2D> as CanvasRenderingContext2D);
        });

        it("renders a canvas overlay when isGifPlaying is false", () => {
            // Arrange, Act
            render(
                <SvgImage
                    src={GIF_SRC}
                    alt="test gif"
                    allowZoom={false}
                    width={500}
                    height={285}
                    isGifPlaying={false}
                />,
            );
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(screen.getByTestId("gif-pause-canvas")).toBeInTheDocument();
        });

        it("does not render a canvas overlay when isGifPlaying is true", () => {
            // Arrange, Act
            render(
                <SvgImage
                    src={GIF_SRC}
                    alt="test gif"
                    allowZoom={false}
                    width={500}
                    height={285}
                    isGifPlaying={true}
                />,
            );
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(
                screen.queryByTestId("gif-pause-canvas"),
            ).not.toBeInTheDocument();
        });

        it("does not render a canvas overlay when isGifPlaying is undefined", () => {
            // Arrange, Act
            render(
                <SvgImage
                    src={GIF_SRC}
                    alt="test gif"
                    allowZoom={false}
                    width={500}
                    height={285}
                />,
            );
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(
                screen.queryByTestId("gif-pause-canvas"),
            ).not.toBeInTheDocument();
        });

        it("calls drawImage on the canvas when the img fires onLoad while paused", () => {
            // Arrange
            render(
                <SvgImage
                    src={GIF_SRC}
                    alt="test gif"
                    allowZoom={false}
                    width={500}
                    height={285}
                    isGifPlaying={false}
                />,
            );
            act(() => {
                jest.runAllTimers();
            });

            const img = screen.getByRole<HTMLImageElement>("img", {
                name: "test gif",
            });
            Object.defineProperty(img, "naturalWidth", {
                value: 500,
                configurable: true,
            });
            Object.defineProperty(img, "naturalHeight", {
                value: 285,
                configurable: true,
            });

            // Act - simulate the img element's own load event (the hook for captureGifFrame)
            fireEvent.load(img!);

            // Assert
            expect(mockDrawImage).toHaveBeenCalledWith(img, 0, 0);
        });

        describe("gif loop detection", () => {
            const LOOP_DURATION_MS = 100;

            it("calls onGifLoop after one loop duration elapses", async () => {
                // Arrange
                const onGifLoop = jest.fn();
                render(
                    <SvgImage
                        src={GIF_SRC}
                        alt="test gif"
                        allowZoom={false}
                        width={500}
                        height={285}
                        isGifPlaying={true}
                        onGifLoop={onGifLoop}
                    />,
                );

                // Flush the fetch promise so _gifLoopDurationMs is set
                // eslint-disable-next-line testing-library/no-unnecessary-act
                await act(async () => {});

                // Act
                act(() => {
                    jest.advanceTimersByTime(LOOP_DURATION_MS);
                });

                // Assert
                expect(onGifLoop).toHaveBeenCalledTimes(1);
            });

            it("stops calling onGifLoop when isGifPlaying becomes false", async () => {
                // Arrange
                const onGifLoop = jest.fn();
                const {rerender} = render(
                    <SvgImage
                        src={GIF_SRC}
                        alt="test gif"
                        allowZoom={false}
                        width={500}
                        height={285}
                        isGifPlaying={true}
                        onGifLoop={onGifLoop}
                    />,
                );

                // eslint-disable-next-line testing-library/no-unnecessary-act
                await act(async () => {});
                act(() => {
                    jest.advanceTimersByTime(LOOP_DURATION_MS);
                });
                expect(onGifLoop).toHaveBeenCalledTimes(1);

                // Act - pause the GIF
                rerender(
                    <SvgImage
                        src={GIF_SRC}
                        alt="test gif"
                        allowZoom={false}
                        width={500}
                        height={285}
                        isGifPlaying={false}
                        onGifLoop={onGifLoop}
                    />,
                );
                act(() => {
                    jest.advanceTimersByTime(LOOP_DURATION_MS);
                });

                // Assert - onGifLoop should not have been called again
                expect(onGifLoop).toHaveBeenCalledTimes(1);
            });
        });

        it("does not call drawImage when the img fires onLoad while playing", () => {
            // Arrange
            render(
                <SvgImage
                    src={GIF_SRC}
                    alt="test gif"
                    allowZoom={false}
                    width={500}
                    height={285}
                    isGifPlaying={true}
                />,
            );
            act(() => {
                jest.runAllTimers();
            });

            const img = screen.getByRole<HTMLImageElement>("img", {
                name: "test gif",
            });
            Object.defineProperty(img, "naturalWidth", {
                value: 500,
                configurable: true,
            });

            // Act
            fireEvent.load(img!);

            // Assert
            expect(mockDrawImage).not.toHaveBeenCalled();
        });
    });
});
