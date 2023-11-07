import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {setDependencies} from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {question1} from "../__testdata__/plotter.testdata";
import {Plotter} from "../plotter";

import {renderQuestion} from "./renderQuestion";

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
        render(
            // @ts-expect-error - TS2769 - test works, but I can't figure out how to make the types happy
            <Plotter
                static={false}
                trackInteraction={() => {}}
                onChange={() => {}}
                apiOptions={{
                    ...ApiOptions.defaults,
                    isMobile: true,
                }}
                starting={[0]}
            />,
        );

        // Assert
        expect(
            screen.getByText("Drag handles to make graph"),
        ).toBeInTheDocument();
    });

    it("should not show drag text when static", () => {
        // Arrange and Act
        render(
            // @ts-expect-error - TS2769 - test works, but I can't figure out how to make the types happy
            <Plotter
                static={true}
                trackInteraction={() => {}}
                onChange={() => {}}
                apiOptions={{
                    ...ApiOptions.defaults,
                    isMobile: true,
                }}
                starting={[0]}
            />,
        );

        // Assert
        expect(
            screen.queryByText("Drag handles to make graph"),
        ).not.toBeInTheDocument();
    });
});
