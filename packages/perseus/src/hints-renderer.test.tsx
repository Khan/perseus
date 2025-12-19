import {describe, beforeEach, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";

import {PerseusI18nContextProvider} from "./components/i18n-context";
import {DependenciesContext, setDependencies} from "./dependencies";
import HintsRenderer from "./hints-renderer";
import {ApiOptions} from "./perseus-api";
import {mockStrings} from "./strings";

import type {Hint} from "@khanacademy/perseus-core";

describe("HintsRenderer", () => {
    beforeEach(() => {
        setDependencies(testDependencies);
    });

    it("rendering normal hints works as expected", () => {
        // Arrange
        const hints: ReadonlyArray<Hint> = [
            {
                content: "This is the first hint",
                images: {},
                widgets: {},
            },
            {
                content: "This is the second hint",
                images: {},
                widgets: {},
            },
        ];

        // Act
        render(
            <DependenciesContext.Provider value={testDependenciesV2}>
                <PerseusI18nContextProvider strings={mockStrings} locale="en">
                    <HintsRenderer
                        hints={hints}
                        hintsVisible={2}
                        dependencies={testDependenciesV2}
                        apiOptions={ApiOptions.defaults}
                        strings={mockStrings}
                    />
                </PerseusI18nContextProvider>
            </DependenciesContext.Provider>,
        );

        // Assert
        expect(screen.getByText("This is the first hint")).toBeInTheDocument();
        expect(screen.getByText("This is the second hint")).toBeInTheDocument();
    });

    it("rendering hints with placeholder as true should not show the hint", () => {
        // Arrange
        const hints: ReadonlyArray<Hint> = [
            {
                content: "This is a normal hint",
                images: {},
                widgets: {},
            },
            {
                content: "This is a placeholder hint",
                images: {},
                widgets: {},
                placeholder: true,
            },
            {
                content: "This is another normal hint",
                images: {},
                widgets: {},
            },
        ];

        // Act
        render(
            <DependenciesContext.Provider value={testDependenciesV2}>
                <PerseusI18nContextProvider strings={mockStrings} locale="en">
                    <HintsRenderer
                        hints={hints}
                        hintsVisible={3}
                        dependencies={testDependenciesV2}
                        apiOptions={ApiOptions.defaults}
                        strings={mockStrings}
                    />
                </PerseusI18nContextProvider>
            </DependenciesContext.Provider>,
        );

        // Assert
        expect(screen.getByText("This is a normal hint")).toBeInTheDocument();
        expect(
            screen.queryByText("This is a placeholder hint"),
        ).not.toBeInTheDocument();
        expect(
            screen.getByText("This is another normal hint"),
        ).toBeInTheDocument();
    });

    it("doesn't throw when focusing", () => {
        // Arrange
        const hints: ReadonlyArray<Hint> = [
            {
                content: "",
                images: {},
                widgets: {},
                placeholder: true,
            },
            {
                content: "",
                images: {},
                widgets: {},
                placeholder: true,
            },
        ];

        // Act
        let rerender;
        expect(() => {
            const renderReturn = render(
                <DependenciesContext.Provider value={testDependenciesV2}>
                    <PerseusI18nContextProvider
                        strings={mockStrings}
                        locale="en"
                    >
                        <HintsRenderer
                            hints={hints}
                            hintsVisible={0}
                            dependencies={testDependenciesV2}
                            apiOptions={ApiOptions.defaults}
                            strings={mockStrings}
                        />
                    </PerseusI18nContextProvider>
                </DependenciesContext.Provider>,
            );
            rerender = renderReturn.rerender;
        }).not.toThrow();

        // increase `hintsVisible`, this was originally throwing because
        // placeholders weren't being rendered and parents components were
        // trying to focus the elements with refs
        expect(() => {
            rerender(
                <DependenciesContext.Provider value={testDependenciesV2}>
                    <PerseusI18nContextProvider
                        strings={mockStrings}
                        locale="en"
                    >
                        <HintsRenderer
                            hints={hints}
                            hintsVisible={2}
                            dependencies={testDependenciesV2}
                            apiOptions={ApiOptions.defaults}
                            strings={mockStrings}
                        />
                    </PerseusI18nContextProvider>
                </DependenciesContext.Provider>,
            );
        }).not.toThrow();
    });
});
