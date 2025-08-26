import {ApiOptions, Dependencies, Util} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import ImageEditor from "../image-editor/image-editor";

import type {UserEvent} from "@testing-library/user-event";

const realKhanImageUrl =
    "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg";

const apiOptions = ApiOptions.defaults;

describe("image editor", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should render empty image editor", () => {
        // Arrange

        // Act
        render(<ImageEditor apiOptions={apiOptions} onChange={() => {}} />);

        // Assert
        const urlField = screen.getByRole("textbox", {name: "Image url:"});
        expect(urlField).toBeInTheDocument();
    });

    test("should render populated image editor", () => {
        // Arrange

        // Act
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{url: realKhanImageUrl}}
                alt="Earth and moon"
                caption="Earth and moon"
                onChange={() => {}}
            />,
        );

        const urlField = screen.getByRole("textbox", {name: "Image url:"});
        const altField = screen.getAllByRole("textbox")[1]; // Second textarea is alt
        const captionField = screen.getAllByRole("textbox")[2]; // Third textarea is caption

        // Assert
        expect(urlField).toBeInTheDocument();
        expect(altField).toBeInTheDocument();
        expect(captionField).toBeInTheDocument();

        expect(urlField).toHaveValue(realKhanImageUrl);
        expect(altField).toHaveValue("Earth and moon");
        expect(captionField).toHaveValue("Earth and moon");
    });

    test("should render warning for non-Khan Academy image", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{}}
                onChange={onChangeMock}
            />,
        );

        // Act
        const urlField = screen.getByRole("textbox", {name: "Image url:"});
        urlField.focus();
        await userEvent.paste("https://example.com/image.png");
        await userEvent.tab();

        // Assert
        expect(
            screen.getByText(
                "Images must be from sites hosted by Khan Academy. Please input a Khan Academy-owned address, or use the Add Image tool to rehost an existing image",
            ),
        ).toBeInTheDocument();
    });

    test("should call onChange with the new image url", async () => {
        // Arrange
        jest.spyOn(Util, "getImageSizeModern").mockResolvedValue([200, 300]);
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{}}
                onChange={onChangeMock}
            />,
        );

        // Act
        const urlField = screen.getByRole("textbox", {name: "Image url:"});
        urlField.focus();
        await userEvent.paste(realKhanImageUrl);
        await userEvent.tab();

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            backgroundImage: {
                url: realKhanImageUrl,
                width: 200,
                height: 300,
            },
            box: [200, 300],
        });
    });

    test("should call onChange with new alt text", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{url: realKhanImageUrl}}
                onChange={onChangeMock}
            />,
        );

        // Act
        const altField = screen.getByRole("textbox", {name: "Alt text:"});
        altField.focus();
        await userEvent.paste("Earth and moon");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            alt: "Earth and moon",
        });
    });

    test("should call onChange with new caption", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{url: realKhanImageUrl}}
                onChange={onChangeMock}
            />,
        );

        // Act
        const captionField = screen.getByRole("textbox", {name: "Caption:"});
        captionField.focus();
        await userEvent.paste("Earth and moon");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            caption: "Earth and moon",
        });
    });
});
