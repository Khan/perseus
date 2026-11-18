import {Dependencies} from "@khanacademy/perseus";
import {measurerLogic} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import MeasurerEditor from "./measurer-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("MeasurerEditor", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("calls onChange with all options when a checkbox is toggled", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <MeasurerEditor
                {...measurerLogic.defaultWidgetOptions}
                showProtractor={false}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.click(screen.getByLabelText("Show protractor"));

        // Assert
        expect(onChange).toHaveBeenCalledWith({
            ...measurerLogic.defaultWidgetOptions,
            showProtractor: true,
        });
    });
});
