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
            ).mockReturnValue({drawImage: mockDrawImage} as any);
        });

        it("renders a canvas overlay when isGifPaused is true", () => {
            // Arrange, Act
            render(
                <SvgImage
                    src={GIF_SRC}
                    alt="test gif"
                    allowZoom={false}
                    width={500}
                    height={285}
                    isGifPaused={true}
                />,
            );
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(screen.getByTestId("gif-pause-canvas")).toBeInTheDocument();
        });

        it("does not render a canvas overlay when isGifPaused is false", () => {
            // Arrange, Act
            render(
                <SvgImage
                    src={GIF_SRC}
                    alt="test gif"
                    allowZoom={false}
                    width={500}
                    height={285}
                    isGifPaused={false}
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

        it("does not render a canvas overlay when isGifPaused is undefined", () => {
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
                    isGifPaused={true}
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

        it("queries the DOM for the img element again after src changes", () => {
            // Arrange
            const querySelectorSpy = jest.spyOn(
                HTMLDivElement.prototype,
                "querySelector",
            );
            const {rerender} = render(
                <SvgImage
                    src={GIF_SRC}
                    alt="test gif"
                    allowZoom={false}
                    width={500}
                    height={285}
                    isGifPaused={true}
                />,
            );

            // Initial render should query for the img element.
            expect(querySelectorSpy).toHaveBeenCalledTimes(1);

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
            fireEvent.load(img);

            // Act - change src and pause again
            rerender(
                <SvgImage
                    src="https://cdn.kastatic.org/other.gif"
                    alt="test gif"
                    allowZoom={false}
                    width={500}
                    height={285}
                    isGifPaused={true}
                />,
            );

            // Assert
            // After the src changes, the component should query for the new img element again to capture its frame.
            expect(querySelectorSpy).toHaveBeenCalledTimes(2);
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
                        isGifPaused={false}
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

            it("stops calling onGifLoop when isGifPaused becomes true", async () => {
                // Arrange
                const onGifLoop = jest.fn();
                const {rerender} = render(
                    <SvgImage
                        src={GIF_SRC}
                        alt="test gif"
                        allowZoom={false}
                        width={500}
                        height={285}
                        isGifPaused={false}
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
                        isGifPaused={true}
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
                    isGifPaused={false}
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
