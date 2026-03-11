import {act, render} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {mockImageLoading} from "../../testing/image-loader-utils";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import * as GraphieUtils from "../../util/graphie-utils";
import {typicalCase} from "../../util/graphie-utils.testdata";
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

        it("does not re-trigger loadGraphie when a prop change arrives after setupGraphie completes with multiple labels", () => {
            // Arrange
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            // Mock loadGraphie to synchronously call back with three labels.
            // Previously, setupGraphie called setState once per label, causing
            // labelsRendered to only reflect the last label. A subsequent prop
            // change would then expose the inconsistent state to Graphie, which
            // would re-call _setupGraphie and trigger loadGraphie again.
            jest.spyOn(GraphieUtils, "loadGraphie").mockImplementation(
                (url, callback) => {
                    callback(
                        {
                            labels: [
                                {
                                    content: "A",
                                    coordinates: [1, 1],
                                    alignment: "center",
                                    typesetAsMath: false,
                                    style: {},
                                },
                                {
                                    content: "B",
                                    coordinates: [2, 2],
                                    alignment: "center",
                                    typesetAsMath: false,
                                    style: {},
                                },
                                {
                                    content: "C",
                                    coordinates: [3, 3],
                                    alignment: "center",
                                    typesetAsMath: false,
                                    style: {},
                                },
                            ],
                            range: [
                                [0, 10],
                                [0, 10],
                            ],
                        },
                        false,
                    );
                },
            );

            const loadGraphieSpy = jest.spyOn(GraphieUtils, "loadGraphie");

            // Act
            const {rerender} = render(
                <SvgImage
                    src={typicalCase.url}
                    alt="svg image"
                    allowZoom={false}
                    width={200}
                    height={200}
                />,
            );

            act(() => {
                jest.runAllTimers();
            });

            // Simulate the zoomSize prop change arriving after setupGraphie
            rerender(
                <SvgImage
                    src={typicalCase.url}
                    alt="svg image"
                    allowZoom={false}
                    width={300}
                    height={300}
                />,
            );

            // Assert - loadGraphie should only have been called once.
            // A second call would indicate setupGraphie was re-triggered by
            // the prop change, meaning labelsRendered was in an inconsistent
            // state (only the last label survived the setState storm).
            expect(loadGraphieSpy).toHaveBeenCalledTimes(1);
        });
    });
});
