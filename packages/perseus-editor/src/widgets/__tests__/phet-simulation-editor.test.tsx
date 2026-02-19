import {Dependencies} from "@khanacademy/perseus";
import {phetSimulationLogic} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import PhetSimulationEditor from "../phet-simulation-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("phet-simulation editor", () => {
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
        // Act
        render(
            <PhetSimulationEditor
                {...phetSimulationLogic.initializeWidgetOptions()}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByLabelText("URL")).toBeInTheDocument();
        expect(screen.getByLabelText("Description")).toBeInTheDocument();
    });

    it("should be possible to change URL", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <PhetSimulationEditor
                {...phetSimulationLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        await userEvent.type(screen.getByLabelText("URL"), "h");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({url: "h"});
    });

    it("should be possible to change Description", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <PhetSimulationEditor
                {...phetSimulationLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        await userEvent.type(screen.getByLabelText("Description"), "P");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({description: "P"});
    });
});
