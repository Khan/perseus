import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import {HideAnswersToggle} from "../hide-answers-toggle";
import {strings} from "../strings";

const labelText = strings.hideAnswersToggleLabel;

describe("HideAnswersToggle", () => {
    it("should render the toggle switch", () => {
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
        userEvent.click(toggleSwitchBefore);
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
