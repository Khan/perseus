import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {TypedSingleSelect} from "./typed-single-select";

import type {UserEvent} from "@testing-library/user-event";

describe("TypedSingleSelect", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders one dropdown option per entry with a truthy label", async () => {
        // Arrange
        render(
            <TypedSingleSelect
                aria-label="Letter"
                placeholder=""
                options={{a: "A", b: "B", c: "C"}}
                selectedValue="a"
                onChange={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        await userEvent.click(screen.getByRole("combobox", {name: "Letter"}));

        // Assert
        expect(screen.getAllByRole("option")).toHaveLength(3);
        expect(screen.getByRole("option", {name: "A"})).toBeInTheDocument();
        expect(screen.getByRole("option", {name: "B"})).toBeInTheDocument();
        expect(screen.getByRole("option", {name: "C"})).toBeInTheDocument();
    });

    it("omits entries whose value is falsey (empty string, false, null, undefined)", async () => {
        // Arrange
        render(
            <TypedSingleSelect
                aria-label="Letter"
                placeholder=""
                options={{
                    a: "A",
                    b: false,
                    c: null,
                    d: undefined,
                    e: "E",
                    f: "",
                }}
                selectedValue="a"
                onChange={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        await userEvent.click(screen.getByRole("combobox", {name: "Letter"}));

        // Assert
        expect(screen.getAllByRole("option")).toHaveLength(2);
        expect(screen.getByRole("option", {name: "A"})).toBeInTheDocument();
        expect(screen.getByRole("option", {name: "E"})).toBeInTheDocument();
    });

    it("reflects selectedValue as the selected option", () => {
        // Arrange, Act
        render(
            <TypedSingleSelect
                aria-label="Letter"
                placeholder=""
                options={{a: "A", b: "B", c: "C"}}
                selectedValue="b"
                onChange={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        // Assert
        expect(screen.getByRole("combobox")).toHaveTextContent("B");
    });

    it("calls onChange with the chosen option's key", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <TypedSingleSelect
                aria-label="Letter"
                placeholder=""
                options={{a: "A", b: "B", c: "C"}}
                selectedValue="a"
                onChange={onChange}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        await userEvent.click(screen.getByRole("combobox", {name: "Letter"}));
        await userEvent.click(screen.getByRole("option", {name: "C"}));

        // Assert
        expect(onChange).toHaveBeenCalledWith("c");
    });

    it("renders an object-form option's label and its leftAccessory", async () => {
        // Arrange
        render(
            <TypedSingleSelect
                aria-label="Letter"
                placeholder=""
                options={{
                    a: {
                        label: "A",
                        leftAccessory: <span data-testid="accessory" />,
                    },
                }}
                selectedValue="a"
                onChange={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        await userEvent.click(screen.getByRole("combobox", {name: "Letter"}));

        // Assert
        expect(screen.getByRole("option", {name: "A"})).toBeInTheDocument();
        expect(screen.getByTestId("accessory")).toBeInTheDocument();
    });

    it("does not forward the options prop to the DOM", () => {
        // Arrange, Act
        render(
            <TypedSingleSelect
                aria-label="Letter"
                placeholder=""
                options={{a: "A", b: "B", c: "C"}}
                selectedValue="a"
                onChange={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        // Assert: `options` is the wrapper's own prop and must not leak onto
        // the rendered control (it would serialize to "[object Object]").
        expect(screen.getByRole("combobox")).not.toHaveAttribute("options");
    });

    it("forwards pass-through props: disabled keeps the dropdown closed", async () => {
        // Arrange
        render(
            <TypedSingleSelect
                aria-label="Letter"
                placeholder=""
                disabled={true}
                options={{a: "A", b: "B", c: "C"}}
                selectedValue="a"
                onChange={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        await userEvent.click(screen.getByRole("combobox", {name: "Letter"}));

        // Assert
        expect(screen.queryByRole("option")).not.toBeInTheDocument();
    });
});
