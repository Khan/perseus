import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import MatcherEditor from "../matcher-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("matcher-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders", async () => {
        render(<MatcherEditor onChange={() => {}} />);

        expect(screen.getByText("Correct answer:")).toBeInTheDocument();
    });

    it("is possible to change option: order of matched pairs matters", async () => {
        const onChangeMock = jest.fn();

        render(<MatcherEditor onChange={onChangeMock} />);

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "Order of the matched pairs matters:",
            }),
        );

        expect(onChangeMock).toHaveBeenCalledWith({orderMatters: true});
    });

    it("should be possible to change padding", async () => {
        const onChangeMock = jest.fn();

        render(<MatcherEditor onChange={onChangeMock} />);

        await userEvent.click(screen.getByRole("checkbox", {name: "Padding:"}));

        expect(onChangeMock).toHaveBeenCalledWith({padding: false});
    });
});
