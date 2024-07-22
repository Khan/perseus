import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {mockStrings} from "../../../strings";
import {HideAnswersToggle} from "../hide-answers-toggle";

import type {UserEvent} from "@testing-library/user-event";

const labelText = mockStrings.hideAnswersToggleLabel;

describe("HideAnswersToggle", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should render the toggle switch", async () => {
        const screen = render(
            <HideAnswersToggle areAnswersHidden={false} onChange={undefined} />,
            {
                wrapper: RenderStateRoot,
            },
        );
        const toggleSwitch = screen.getByLabelText(
            labelText,
        ) as HTMLInputElement;
        expect(toggleSwitch).toBeInTheDocument();
        expect(toggleSwitch.checked).toBe(false);
    });

    it("should call the onChange callback when the toggle switch is clicked", async () => {
        const onChange = jest.fn((checked) => expect(checked).toBe(true));
        const screen = render(
            <HideAnswersToggle areAnswersHidden={false} onChange={onChange} />,
            {wrapper: RenderStateRoot},
        );
        const toggleSwitchBefore = screen.getByLabelText(
            labelText,
        ) as HTMLInputElement;
        await userEvent.click(toggleSwitchBefore);
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
