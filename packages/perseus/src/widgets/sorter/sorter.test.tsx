import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import {act} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import {wait} from "../../testing/wait";
import {renderQuestion} from "../__testutils__/renderQuestion";

import type {Sorter} from "./sorter";

describe("Sorter widget", () => {
    beforeEach(() => {
        jest.spyOn(console, "warn").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
        jest.useRealTimers();

        // Replace the real TeX dependency with a synchronous stub. Real TeX
        // uses MathJax, which doesn't render reliably in jsdom and would
        // leave Sorter stuck on its loading spinner (since it waits for
        // `onRender` to fire before rendering its items). The stub fulfills
        // the same contract — calling `onRender` once the component mounts —
        // so the rest of the production code thinks TeX is ready and
        // proceeds normally.
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

    describe("AssetContext tracking", () => {
        const question = generateTestPerseusRenderer({
            content: "[[☃ sorter 1]]",
            widgets: {
                "sorter 1": {
                    type: "sorter",
                    options: {
                        correct: ["a", "b", "c"],
                        padding: true,
                        layout: "horizontal",
                    },
                },
            },
        });

        it("receives an asset key prefixed with 'sorter-' from the HOC", () => {
            // Arrange, Act
            const {renderer} = renderQuestion(question);
            const sorter: Sorter = renderer.findWidgets("sorter 1")[0];

            // Assert
            expect(sorter.props.assetKey).toMatch(/^sorter-/);
        });

        it("generates a unique asset key per sorter instance", () => {
            // Arrange, Act — render the same question twice to compare keys
            // across separate Sorter instances.
            const {renderer: firstRenderer} = renderQuestion(question);
            const firstSorter: Sorter =
                firstRenderer.findWidgets("sorter 1")[0];
            const {renderer: secondRenderer} = renderQuestion(question);
            const secondSorter: Sorter =
                secondRenderer.findWidgets("sorter 1")[0];

            // Assert
            expect(firstSorter.props.assetKey).not.toBe(
                secondSorter.props.assetKey,
            );
        });

        it("settles the asset when onMeasure fires", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);
            await wait();
            const sorter: Sorter = renderer.findWidgets("sorter 1")[0];
            const setAssetStatusSpy = jest.spyOn(sorter, "_setAssetStatus");

            // Act
            act(() => sorter.onMeasure());

            // Assert
            expect(setAssetStatusSpy).toHaveBeenCalledWith(true);
        });

        it("settles the asset on unmount", () => {
            // Arrange
            const {renderer, unmount} = renderQuestion(question);
            const sorter: Sorter = renderer.findWidgets("sorter 1")[0];
            const setAssetStatusSpy = jest.spyOn(sorter, "_setAssetStatus");

            // Act
            unmount();

            // Assert
            expect(setAssetStatusSpy).toHaveBeenCalledWith(true);
        });
    });
});
