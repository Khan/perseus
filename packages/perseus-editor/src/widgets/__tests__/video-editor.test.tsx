import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import VideoEditor from "../video-editor/video-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("VideoEditor", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", () => {
        // Arrange, Act
        render(<VideoEditor onChange={() => undefined} />);

        // Assert
        expect(screen.getByLabelText("KA Video Slug")).toBeInTheDocument();
    });

    it("should call onChange when KA video Slug is provided", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(<VideoEditor onChange={onChangeMock} />);

        // Act

        const slugInput = screen.getByLabelText("KA Video Slug");
        await userEvent.type(slugInput, "a");
        slugInput.blur();

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({location: "a"});
    });

    it("should call onChange with the slug from the URL if a Khan Academy URL is provided (with prefix)", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(<VideoEditor onChange={onChangeMock} />);

        // Act

        const slugInput = screen.getByLabelText("KA Video Slug");
        slugInput.focus();
        await userEvent.paste(
            // Real URL for a Khan Academy video lesson
            "https://www.khanacademy.org/college-careers-more/personal-finance/pf-paying-for-college/pf-financial-aid-process-tutorial/v/applying-for-financial-aid-when-facing-immigration-challenges",
        );
        slugInput.blur();

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            location:
                "applying-for-financial-aid-when-facing-immigration-challenges",
        });
    });

    it("should call onChange with the slug from the URL if a Khan Academy URL is provided (without prefix)", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(<VideoEditor onChange={onChangeMock} />);

        // Act

        const slugInput = screen.getByLabelText("KA Video Slug");
        slugInput.focus();
        await userEvent.paste(
            // Real URL for a Khan Academy video lesson
            "khanacademy.org/college-careers-more/personal-finance/pf-paying-for-college/pf-financial-aid-process-tutorial/v/applying-for-financial-aid-when-facing-immigration-challenges",
        );
        slugInput.blur();

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            location:
                "applying-for-financial-aid-when-facing-immigration-challenges",
        });
    });

    it("should call onChange with the URL if a non-Khan Academy URL is provided", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(<VideoEditor onChange={onChangeMock} />);

        // Act
        const slugInput = screen.getByLabelText("KA Video Slug");
        slugInput.focus();
        await userEvent.paste("https://example.com");
        slugInput.blur();

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            location: "https://example.com",
        });
    });
});
