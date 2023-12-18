import {screen, render} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../../testing/test-dependencies";
import * as Dependencies from "../dependencies";
import ErrorBoundary from "../error-boundary";

import "@testing-library/jest-dom";

const ProblematicComponent = () => {
    throw new Error("I can haz error");
};

describe("error boundary", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render children", () => {
        render(
            <ErrorBoundary>
                <span>Hello world</span>
            </ErrorBoundary>,
        );

        expect(screen.getByText("Hello world")).toBeInTheDocument();
    });

    it("should render error icon when children error", () => {
        render(
            <ErrorBoundary>
                <ProblematicComponent />
            </ErrorBoundary>,
        );

        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(screen.getByTitle("Rendering Error!")).toBeInTheDocument();
    });

    it("should call the onError callback when children error", () => {
        const onErrorCallback = jest.fn();

        render(
            <ErrorBoundary onError={onErrorCallback}>
                <ProblematicComponent />
            </ErrorBoundary>,
        );

        expect(onErrorCallback).toHaveBeenCalled();
    });

    it("should log the error when children error", () => {
        const errorSpy = jest.spyOn(testDependencies.Log, "error");

        render(
            <ErrorBoundary>
                <ProblematicComponent />
            </ErrorBoundary>,
        );

        expect(errorSpy).toHaveBeenCalledWith(
            "Unhandled Perseus error: I can haz error",
            "Internal",
            {
                cause: expect.anything(),
                loggedMetadata: {
                    componentStack: `
    in ProblematicComponent
    in ErrorBoundary`,
                },
            },
        );
    });
});
