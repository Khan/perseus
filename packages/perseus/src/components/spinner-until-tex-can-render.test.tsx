import {render, act} from "@testing-library/react";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom matchers
import {Dependencies} from "..";
import {testDependencies} from "../../../../testing/test-dependencies";

import {SpinnerUntilTexCanRender} from "./spinner-until-tex-can-render";

describe("SpinnerUntilTexCanRender", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders a spinner while waiting for the TeX renderer to load", () => {
        let simulateTeXRendering: undefined | (() => unknown);

        type FakeTeXProps = {children: string; onRender?: () => unknown};
        function FakeTeX({children, onRender}: FakeTeXProps) {
            simulateTeXRendering = onRender;
            return <div className="fake-tex">{children}</div>;
        }
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: FakeTeX,
        });

        // Act
        const {container} = render(
            <SpinnerUntilTexCanRender children={() => <p>rendered</p>} />,
        );

        // Assert
        expect(container).toMatchSnapshot("first render: displays a spinner");

        // Act
        act(() => {
            simulateTeXRendering?.();
        });

        // Assert
        expect(container).toMatchSnapshot(
            "second render: displays the sortable",
        );
    });
});
