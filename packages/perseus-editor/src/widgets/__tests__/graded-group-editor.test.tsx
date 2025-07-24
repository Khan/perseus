import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import GradedGroupEditor from "../graded-group-editor";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

describe("GradedGroupEditor", () => {
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
        render(<GradedGroupEditor onChange={() => undefined} />);

        expect(
            await screen.findByText("Graded Groups should contain a prompt"),
        ).toBeInTheDocument();
    });

    /**
     * Regression LEMS-3321: make sure a hint is a full PerseusRenderer
     */
    it("should add a full Renderer for a hint", async () => {
        const onChangeMock = jest.fn();

        render(<GradedGroupEditor onChange={onChangeMock} />);
        await userEvent.click(screen.getByRole("button", {name: "Add a hint"}));

        const expected: PerseusRenderer = {
            content: "",
            images: {},
            widgets: {},
        };

        expect(onChangeMock).toHaveBeenCalledWith(
            {hint: expected},
            // this is just the changeable callback
            expect.any(Function),
        );
    });
});
