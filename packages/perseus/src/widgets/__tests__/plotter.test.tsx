import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {setDependencies} from "../../dependencies";
import {question1} from "../__testdata__/plotter.testdata";
import {Plotter} from "../plotter";

import {renderQuestion} from "./renderQuestion";

import type {APIOptions} from "../../types";

describe("plotter widget", () => {
    beforeEach(() => {
        setDependencies(testDependencies);
    });

    it("should snapshot basic question", () => {
        // Arrange and Act
        const {container} = renderQuestion(question1);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should show drag text when not static", () => {
        // Arrange and Act
        const apiOptions: APIOptions = {isMobile: true};
        render(
            <Plotter
                static={false}
                trackInteraction={() => {}}
                onChange={() => {}}
                apiOptions={apiOptions}
                starting={[0]}
                markings={""}
            />,
        );

        // Assert
        expect(
            screen.getByText("Drag handles to make graph"),
        ).toBeInTheDocument();
    });

    it("should not show drag text when static", () => {
        // Arrange and Act
        const apiOptions: APIOptions = {isMobile: true};
        render(
            <Plotter
                static={true}
                trackInteraction={() => {}}
                onChange={() => {}}
                apiOptions={apiOptions}
                starting={[0]}
                markings={""}
            />,
        );

        // Assert
        expect(
            screen.queryByText("Drag handles to make graph"),
        ).not.toBeInTheDocument();
    });
});
