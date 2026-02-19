import {Dependencies} from "@khanacademy/perseus";
import {numberLineLogic} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import NumberLineEditor from "../number-line-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("number-line-editor", () => {
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
            <NumberLineEditor
                {...numberLineLogic.initializeWidgetOptions()}
                onChange={() => undefined}
            />,
        );

        expect(await screen.findByText("Correct x")).toBeInTheDocument();
    });

    const relationships = ["lt", "gt", "le", "ge", "eq"];
    relationships.forEach((rel) => {
        it(`should be possible to set relationship to: ${rel}`, async () => {
            const onChangeMock = jest.fn();

            render(
                <NumberLineEditor
                    {...numberLineLogic.initializeWidgetOptions()}
                    onChange={onChangeMock}
                />,
            );

            const select = screen.getByRole("combobox", {
                name: "Select relationship",
            });
            await userEvent.selectOptions(select, rel);

            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({correctRel: rel}),
            );
        });
    });

    it("should be possible to update the answer", async () => {
        const onChangeMock = jest.fn();

        render(
            <NumberLineEditor
                {...numberLineLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );

        const input = screen.getByPlaceholderText("answer");
        await userEvent.type(input, "1");

        expect(onChangeMock).toHaveBeenCalledWith({correctX: 1});
    });

    it("should be possible to update position", async () => {
        const onChangeMock = jest.fn();

        render(
            <NumberLineEditor
                {...numberLineLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );

        const input = screen.getByRole("textbox", {name: "Position: ∈"});
        await userEvent.type(input, "1");

        expect(onChangeMock).toHaveBeenCalledWith({initialX: 1});
    });

    const styles = {
        decimal: "Decimals",
        improper: "Improper fractions",
        mixed: "Mixed numbers",
        "non-reduced": "Non-reduced",
    };
    Object.entries(styles).forEach(([key, title]) => {
        it(`should be possible to update style: ${title}`, async () => {
            const onChangeMock = jest.fn();

            render(
                <NumberLineEditor
                    {...numberLineLogic.initializeWidgetOptions()}
                    onChange={onChangeMock}
                />,
            );

            await userEvent.click(screen.getByTitle(title));

            expect(onChangeMock).toHaveBeenCalledWith({labelStyle: key});
        });
    });

    it("should be possible to change show tick controller", async () => {
        const onChangeMock = jest.fn();

        render(
            <NumberLineEditor
                {...numberLineLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );

        await userEvent.click(
            screen.getByRole("checkbox", {name: "Show tick controller"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith({isTickCtrl: true});
    });

    it("should be possible to change show label tickets", async () => {
        const onChangeMock = jest.fn();

        render(
            <NumberLineEditor
                {...numberLineLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );

        await userEvent.click(
            screen.getByRole("checkbox", {name: "Show label ticks"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith({labelTicks: false});
    });

    it("should be possible to change show tooltips", async () => {
        const onChangeMock = jest.fn();

        render(
            <NumberLineEditor
                {...numberLineLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );

        await userEvent.click(
            screen.getByRole("checkbox", {name: "Show tooltips"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith({showTooltips: true});
    });

    it("should be possible to update tick steps", async () => {
        const onChangeMock = jest.fn();

        render(
            <NumberLineEditor
                {...numberLineLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );

        const input = screen.getByRole("textbox", {
            name: "or tick step:",
        });
        await userEvent.type(input, "6");

        expect(onChangeMock).toHaveBeenCalledWith({
            numDivisions: null,
            tickStep: 6,
        });
    });

    it("should be possible to update snap divisions", async () => {
        const onChangeMock = jest.fn();

        render(
            <NumberLineEditor
                {...numberLineLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );

        const input = screen.getByRole("textbox", {
            name: "Snap increments per tick:",
        });
        await userEvent.type(input, "6");

        expect(onChangeMock).toHaveBeenCalledWith({snapDivisions: 26});
    });
});
