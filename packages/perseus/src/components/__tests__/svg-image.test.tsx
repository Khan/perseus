import {act, render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {mockImageLoading} from "../../testing/image-loader-utils";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import * as GraphieUtils from "../../util/graphie-utils";
import {typicalCase} from "../../util/graphie-utils.testdata";
import {earthMoonImage, graphieImage} from "../../widgets/image/utils";
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
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.getElementsByTagName("img")[0].src).toEqual(
            "https://www.khanacademy.org/my-test-img.png",
        );
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

    describe("Zoom image button", () => {
        it("should render for a normal responsive image", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            // Act
            render(
                <SvgImage
                    src={earthMoonImage.url}
                    // This goes down the "responsive" path because it has
                    // the `responsive` prop AND has size passed in.
                    width={earthMoonImage.width}
                    height={earthMoonImage.height}
                    responsive={true}
                    alt="earth moon image"
                    allowZoom={true}
                />,
            );

            // Assert
            const zoomButton = screen.getByRole("button", {
                name: "Zoom image.",
            });
            expect(zoomButton).toBeVisible();
        });

        it("should render for a normal unresponsive image (responsive=false)", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            // Act
            render(
                <SvgImage
                    src={earthMoonImage.url}
                    width={earthMoonImage.width}
                    height={earthMoonImage.height}
                    // Not responsive
                    responsive={false}
                    alt="earth moon image"
                    allowZoom={true}
                />,
            );

            // Assert
            const zoomButton = screen.getByRole("button", {
                name: "Zoom image.",
            });
            expect(zoomButton).toBeVisible();
        });

        it("should render for a normal unresponsive image (responsive=true, size is undefined)", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            // Act
            render(
                <SvgImage
                    src={earthMoonImage.url}
                    // Responsive, but no size is passed in
                    responsive={true}
                    alt="earth moon image"
                    allowZoom={true}
                />,
            );

            // Assert
            const zoomButton = screen.getByRole("button", {
                name: "Zoom image.",
            });
            expect(zoomButton).toBeVisible();
        });

        it("should render for a graphie image", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            // Act
            render(
                <SvgImage
                    src={graphieImage.url}
                    // This goes down the "responsive" path because it has
                    // the `responsive` prop AND has size passed in.
                    width={graphieImage.width}
                    height={graphieImage.height}
                    responsive={true}
                    alt="graphie image"
                    allowZoom={true}
                />,
            );

            // Assert
            const zoomButton = screen.getByRole("button", {
                name: "Zoom image.",
            });
            expect(zoomButton).toBeVisible();
        });

        it("should render for a graphie image (responsive=false)", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            // Act
            render(
                <SvgImage
                    src={graphieImage.url}
                    width={graphieImage.width}
                    height={graphieImage.height}
                    // Not responsive
                    responsive={false}
                    alt="graphie image"
                    allowZoom={true}
                />,
            );

            // Assert
            const zoomButton = screen.getByRole("button", {
                name: "Zoom image.",
            });
            expect(zoomButton).toBeVisible();
        });

        it("should render for a graphie image (responsive=true, size is undefined)", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            // Act
            render(
                <SvgImage
                    src={graphieImage.url}
                    // Responsive, but no size is passed in
                    responsive={true}
                    alt="graphie image"
                    allowZoom={true}
                />,
            );

            // Assert
            const zoomButton = screen.getByRole("button", {
                name: "Zoom image.",
            });
            expect(zoomButton).toBeVisible();
        });
    });
});
