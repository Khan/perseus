import {screen, render} from "@testing-library/react";
import React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {Plotter} from "../plotter";

describe("plotter widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
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
