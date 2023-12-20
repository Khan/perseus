import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import CategorizerEditor from "../categorizer-editor";

describe("categorizer-editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        render(
            <CategorizerEditor
                onChange={() => undefined}
                apiOptions={ApiOptions.defaults}
            />,
        );

        expect(
            await screen.findByText("Randomize item order"),
        ).toBeInTheDocument();
    });

    it("should be possible to change randomize item order", async () => {
        const onChangeMock = jest.fn();

        render(
            <CategorizerEditor
                onChange={onChangeMock}
                apiOptions={ApiOptions.defaults}
            />,
        );

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "Randomize item order",
            }),
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({randomizeItems: true}),
        );
    });
});
