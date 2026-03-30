import {act, render, screen} from "@testing-library/react";
import {parseGIF, decompressFrames} from "gifuct-js";
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

jest.mock("gifuct-js");

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
        expect(
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            container.querySelector("div[class*=spinnerContainer]"),
        ).toBeVisible();
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

        // A minimal fake frame from gifuct-js with a 50ms delay.
        const fakeFrame = {
            patch: new Uint8ClampedArray(4), // 1x1 RGBA
            delay: 50,
            dims: {width: 1, height: 1, top: 0, left: 0},
            disposalType: 0,
        };

        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            // Make gifuct-js return two fake frames (100ms total loop).
            (parseGIF as jest.Mock).mockReturnValue({});
            (decompressFrames as jest.Mock).mockReturnValue([
                fakeFrame,
                fakeFrame,
            ]);
            // jsdom doesn't implement canvas getContext or ImageData.
            jest.spyOn(
                HTMLCanvasElement.prototype,
                "getContext",
            ).mockReturnValue({
                putImageData: jest.fn(),
                clearRect: jest.fn(),
                drawImage: jest.fn(),
                imageSmoothingEnabled: true,
            } as Partial<CanvasRenderingContext2D> as CanvasRenderingContext2D);
            // decodeGifFrames calls fetch() in componentDidMount,
            // before any Image is constructed, so we need fetch
            // available immediately (the image-loader-utils mock
            // only sets it up inside the Image constructor).
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: true,
                    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
                }),
            ) as jest.Mock;
            // @ts-expect-error - jsdom doesn't have ImageData
            global.ImageData = class ImageData {
                data: Uint8ClampedArray;
                width: number;
                height: number;
                constructor(
                    data: Uint8ClampedArray,
                    width: number,
                    height: number,
                ) {
                    this.data = data;
                    this.width = width;
                    this.height = height;
                }
            };
        });

        it("renders a canvas when isGifPlaying is false", () => {
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
            expect(screen.getByTestId("gif-canvas")).toBeInTheDocument();
        });

        it("renders a canvas when isGifPlaying is true", () => {
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
            expect(screen.getByTestId("gif-canvas")).toBeInTheDocument();
        });

        it("does not render a canvas when isGifPlaying is undefined", () => {
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
            expect(screen.queryByTestId("gif-canvas")).not.toBeInTheDocument();
        });

        describe("gif auto-pause", () => {
            it("calls onGifPause after all frames have been rendered", async () => {
                // Arrange
                const onGifPause = jest.fn();
                render(
                    <SvgImage
                        src={GIF_SRC}
                        alt="test gif"
                        allowZoom={false}
                        width={500}
                        height={285}
                        isGifPlaying={true}
                        onGifPause={onGifPause}
                    />,
                );

                // Flush the fetch → arrayBuffer → decodeGifFrames → .then()
                // promise chain so playback starts.
                // eslint-disable-next-line testing-library/no-unnecessary-act
                await act(async () => {
                    // Need enough microtask ticks for the full async chain:
                    // fetch() → arrayBuffer() → async return → .then()
                    for (let i = 0; i < 10; i++) {
                        await Promise.resolve();
                    }
                });

                // Act — advance enough for both 50ms frames to render.
                // RAF fires at ~16ms intervals, so we need enough ticks
                // for two frames plus the initial timestamp capture.
                act(() => {
                    jest.advanceTimersByTime(200);
                });

                // Assert
                expect(onGifPause).toHaveBeenCalledTimes(1);
            });

            it("does not call onGifPause again after pausing", async () => {
                // Arrange
                const onGifPause = jest.fn();
                const {rerender} = render(
                    <SvgImage
                        src={GIF_SRC}
                        alt="test gif"
                        allowZoom={false}
                        width={500}
                        height={285}
                        isGifPlaying={true}
                        onGifPause={onGifPause}
                    />,
                );

                // eslint-disable-next-line testing-library/no-unnecessary-act
                await act(async () => {
                    for (let i = 0; i < 10; i++) {
                        await Promise.resolve();
                    }
                });
                act(() => {
                    jest.advanceTimersByTime(200);
                });
                expect(onGifPause).toHaveBeenCalledTimes(1);

                // Act - pause the GIF
                rerender(
                    <SvgImage
                        src={GIF_SRC}
                        alt="test gif"
                        allowZoom={false}
                        width={500}
                        height={285}
                        isGifPlaying={false}
                        onGifPause={onGifPause}
                    />,
                );
                act(() => {
                    jest.advanceTimersByTime(200);
                });

                // Assert - onGifPause should not have been called again
                expect(onGifPause).toHaveBeenCalledTimes(1);
            });
        });
    });
});
