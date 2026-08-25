import {render, screen, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import Marker from "./marker";

import type {UserEvent} from "@testing-library/user-event";

const markerDescription =
    "Click to select marker answers or to delete marker. " +
    "Repositioning marker is not implemented.";

// `opened` is controlled by QuestionMarkers in production, so the tests drive
// it the same way rather than reaching into Marker's internals.
function ControlledMarker(
    props: Partial<React.ComponentProps<typeof Marker>>,
): React.ReactElement {
    const [opened, setOpened] = React.useState(false);

    return (
        <Marker
            answers={[]}
            choices={[]}
            label=""
            multipleAnswers={true}
            onChange={() => {}}
            onRemove={() => {}}
            x={50}
            y={50}
            {...props}
            opened={opened}
            onOpenedChange={setOpened}
        />
    );
}

describe("Marker", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("renders the ARIA label field when the marker is opened", async () => {
        // Arrange
        render(<ControlledMarker label="Marker 1" />);

        // Act
        await userEvent.click(screen.getByTitle(markerDescription));

        // Assert
        expect(screen.getByDisplayValue("Marker 1")).toBeInTheDocument();
    });

    it("renders each choice as an option in a multi-select listbox", async () => {
        // Arrange
        render(
            <ControlledMarker
                label="Marker 1"
                choices={["Choice 1", "Choice 2"]}
            />,
        );

        // Act
        await userEvent.click(screen.getByTitle(markerDescription));

        // Assert
        const listbox = screen.getByRole("listbox", {name: "Answer choices"});
        expect(listbox).toHaveAttribute("aria-multiselectable", "true");
        expect(within(listbox).getAllByRole("option")).toHaveLength(2);
        expect(
            within(listbox).getByRole("option", {name: "Choice 1"}),
        ).toBeInTheDocument();
        expect(
            within(listbox).getByRole("option", {name: "Choice 2"}),
        ).toBeInTheDocument();
    });

    it("marks the marker's answers as the selected options", async () => {
        // Arrange
        render(
            <ControlledMarker
                answers={["Choice 2"]}
                choices={["Choice 1", "Choice 2"]}
            />,
        );

        // Act
        await userEvent.click(screen.getByTitle(markerDescription));

        // Assert
        expect(screen.getByRole("option", {name: "Choice 1"})).toHaveAttribute(
            "aria-selected",
            "false",
        );
        expect(screen.getByRole("option", {name: "Choice 2"})).toHaveAttribute(
            "aria-selected",
            "true",
        );
    });

    it("adds the clicked choice to the marker's answers", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <ControlledMarker
                answers={["Choice 2"]}
                choices={["Choice 1", "Choice 2"]}
                label="Marker 1"
                onChange={onChange}
            />,
        );
        await userEvent.click(screen.getByTitle(markerDescription));

        // Act
        await userEvent.click(screen.getByRole("option", {name: "Choice 1"}));

        // Assert
        expect(onChange).toHaveBeenCalledWith({
            answers: ["Choice 2", "Choice 1"],
            label: "Marker 1",
            x: 50,
            y: 50,
        });
    });

    it("removes an already-selected choice from the marker's answers", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <ControlledMarker
                answers={["Choice 1", "Choice 2"]}
                choices={["Choice 1", "Choice 2"]}
                label="Marker 1"
                onChange={onChange}
            />,
        );
        await userEvent.click(screen.getByTitle(markerDescription));

        // Act
        await userEvent.click(screen.getByRole("option", {name: "Choice 1"}));

        // Assert
        expect(onChange).toHaveBeenCalledWith({
            answers: ["Choice 2"],
            label: "Marker 1",
            x: 50,
            y: 50,
        });
    });

    it("calls onRemove when the delete button is pressed", async () => {
        // Arrange
        const onRemove = jest.fn();
        render(<ControlledMarker onRemove={onRemove} />);
        await userEvent.click(screen.getByTitle(markerDescription));

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Delete marker"}),
        );

        // Assert
        expect(onRemove).toHaveBeenCalled();
    });

    it("omits the listbox when the marker has no choices to offer", async () => {
        // Arrange
        render(<ControlledMarker choices={[]} />);

        // Act
        await userEvent.click(screen.getByTitle(markerDescription));

        // Assert
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
});
