import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import PhetSimEditor from "../phet-sim-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("phet-sim editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders", async () => {
        // Act
        render(<PhetSimEditor onChange={() => {}} />);

        // Assert
        expect(screen.getByLabelText("URL")).toBeInTheDocument();
        expect(screen.getByLabelText("Description")).toBeInTheDocument();
    });

    it("should be possible to change URL", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(<PhetSimEditor onChange={onChangeMock} />);
        await userEvent.type(screen.getByLabelText("URL"), "h");

        // Assert
        expect(onChangeMock).toBeCalledWith({url: "h"});
    });

    it("should be possible to change Description", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(<PhetSimEditor onChange={onChangeMock} />);
        await userEvent.type(screen.getByLabelText("Description"), "P");

        // Assert
        expect(onChangeMock).toBeCalledWith({description: "P"});
    });
});
