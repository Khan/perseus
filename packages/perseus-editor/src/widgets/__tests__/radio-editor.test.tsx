import {Dependencies, ApiOptions} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import RadioEditor from "../radio/editor";

import type {UserEvent} from "@testing-library/user-event";

describe("radio-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

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
            {wrapper: RenderStateRoot},
        );

        expect(screen.getByText(/Multiple selections/)).toBeInTheDocument();
    });

    it("should toggle multiple select checkbox", async () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                apiOptions={ApiOptions.defaults}
            />,
            {wrapper: RenderStateRoot},
        );

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "Multiple selections",
            }),
        );

        expect(onChangeMock).toBeCalledWith({multipleSelect: true});
    });

    it("should toggle randomize order checkbox", async () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                apiOptions={ApiOptions.defaults}
            />,
            {wrapper: RenderStateRoot},
        );

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "Randomize order",
            }),
        );

        expect(onChangeMock).toBeCalledWith({randomize: true});
    });

    it("should be possible to add answer", async () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                apiOptions={ApiOptions.defaults}
            />,
            {wrapper: RenderStateRoot},
        );

        await userEvent.click(
            screen.getAllByRole("link", {
                name: "Add a choice",
            })[0],
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                choices: [{}, {}, {}, {}, {isNoneOfTheAbove: false}],
                hasNoneOfTheAbove: false,
            }),
            // there's some anonymous function that's also passed
            expect.anything(),
        );
    });

    it("should be possible to delete answer", async () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                apiOptions={ApiOptions.defaults}
            />,
            {wrapper: RenderStateRoot},
        );

        await userEvent.click(
            screen.getAllByRole("link", {
                name: "Remove this choice",
            })[0],
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                choices: [{}, {}, {}],
                hasNoneOfTheAbove: false,
            }),
        );
    });
});
