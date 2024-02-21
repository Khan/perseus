import {render, screen} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../../../perseus/src/dependencies";
import GraphSettings from "../graph-settings";

import "@testing-library/jest-dom"; // Imports custom matchers

describe("GraphSettings", () => {
    beforeEach(() => {
        Dependencies.setDependencies(testDependencies);
        // jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
        //     testDependencies,
        // );
    });

    test("displays canvas settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings editableSettings={["canvas"]} onChange={() => {}} />,
        );

        // Assert
        expect(
            screen.getByText("Canvas size (x,y pixels)"),
        ).toBeInTheDocument();
    });

    test("displays graph settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings editableSettings={["graph"]} onChange={() => {}} />,
        );

        // Assert
        expect(screen.getByText("x Label")).toBeInTheDocument();
        expect(screen.getByText("y Label")).toBeInTheDocument();
        expect(screen.getByText("Markings:")).toBeInTheDocument();
    });

    test("displays nothng if snap is by itself", () => {
        // Arrange

        // Act
        render(
            <GraphSettings editableSettings={["snap"]} onChange={() => {}} />,
        );

        // Assert
        expect(screen.queryByText("Snap Step")).toBeNull();
    });

    test("displays snap settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings
                editableSettings={["graph", "snap"]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByText("Snap Step")).toBeInTheDocument();
    });

    test("displays image settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings editableSettings={["image"]} onChange={() => {}} />,
        );

        // Assert
        expect(screen.getByText("Background image:")).toBeInTheDocument();
    });

    test("displays measure settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings
                editableSettings={["measure"]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByText("Show ruler")).toBeInTheDocument();
        expect(screen.getByText("Show protractor")).toBeInTheDocument();
    });
});
