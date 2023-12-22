import {Dependencies, ApiOptions} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import RadioEditor from "../radio/editor";

describe("radio-editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        render(
            <RadioEditor
                onChange={() => undefined}
                apiOptions={ApiOptions.defaults}
            />,
        );

        expect(
            await screen.findByText(/Multiple selections/),
        ).toBeInTheDocument();
    });

    it("should toggle multiple select checkbox", () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                apiOptions={ApiOptions.defaults}
            />,
        );

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "Multiple selections",
            }),
        );

        expect(onChangeMock).toBeCalledWith({multipleSelect: true});
    });

    it("should toggle randomize order checkbox", () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                apiOptions={ApiOptions.defaults}
            />,
        );

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "Randomize order",
            }),
        );

        expect(onChangeMock).toBeCalledWith({randomize: true});
    });

    it("should be possible to add answer", () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                apiOptions={ApiOptions.defaults}
            />,
        );

        userEvent.click(
            screen.getAllByRole("link", {
                name: "Add a choice",
            })[0],
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                choices: [{}, {}, {isNoneOfTheAbove: false}],
                hasNoneOfTheAbove: false,
            }),
            // there's some anonymous function that's also passed
            expect.anything(),
        );
    });

    it("should be possible to delete answer", () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                apiOptions={ApiOptions.defaults}
            />,
        );

        userEvent.click(
            screen.getAllByRole("link", {
                name: "Remove this choice",
            })[0],
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                choices: [{}],
                hasNoneOfTheAbove: false,
            }),
        );
    });
});
