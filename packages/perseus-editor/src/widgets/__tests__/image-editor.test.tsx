import {ApiOptions, Dependencies, Util} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {getFeatureFlags} from "../../../../../testing/feature-flags-util";
import {testDependencies} from "../../../../../testing/test-dependencies";
import {earthMoonImage} from "../../../../perseus/src/widgets/image/utils";
import ImageEditor from "../image-editor/image-editor";

import type {PerseusImageBackground} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const nonKhanImageWarning =
    "Images must be from sites hosted by Khan Academy. Please input a Khan Academy-owned address, or use the Add Image tool to rehost an existing image";

const apiOptions = {
    ...ApiOptions.defaults,
    flags: getFeatureFlags({"image-widget-upgrade": true}),
};

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

    it.each([
        {}, // No url, no dimensions
        {width: 100, height: 100}, // No url
        {url: earthMoonImage.url, width: 100}, // No height
        {url: earthMoonImage.url, height: 100}, // No width
    ] satisfies Array<PerseusImageBackground>)(
        "should render empty image editor if image is missing values",
        (backgroundImage) => {
            // Arrange

            // Act
            render(
                <ImageEditor
                    apiOptions={apiOptions}
                    onChange={() => {}}
                    backgroundImage={backgroundImage}
                />,
            );

            // Assert
            const urlField = screen.getByRole("textbox", {name: "Image url:"});
            expect(urlField).toBeInTheDocument();

            // None of the rest of the UI should be rendered.
            expect(
                screen.queryByText(nonKhanImageWarning),
            ).not.toBeInTheDocument();
            expect(screen.queryByText("Preview:")).not.toBeInTheDocument();
            expect(screen.queryByText("Dimensions:")).not.toBeInTheDocument();
            expect(screen.queryByText("Alt text:")).not.toBeInTheDocument();
            expect(
                screen.queryByText("Long Description:"),
            ).not.toBeInTheDocument();
            expect(screen.queryByText("Caption:")).not.toBeInTheDocument();
        },
    );

    it("should render populated image editor", () => {
        // Arrange

        // Act
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                alt="Earth and moon alt"
                longDescription="Earth and moon long description"
                caption="Earth and moon caption"
                title="Earth and moon title"
                onChange={() => {}}
            />,
        );

        const widthField = screen.getByRole("spinbutton", {name: "Width"});
        const heightField = screen.getByRole("spinbutton", {name: "Height"});
        const urlField = screen.getByRole("textbox", {name: "Image url:"});
        const altField = screen.getByRole("textbox", {name: "Alt text:"});
        const longDescriptionField = screen.getByRole("textbox", {
            name: "Long description:",
        });
        const captionField = screen.getByRole("textbox", {name: "Caption:"});
        const titleField = screen.getByRole("textbox", {name: "Title:"});

        // Assert
        expect(widthField).toBeInTheDocument();
        expect(heightField).toBeInTheDocument();
        expect(urlField).toBeInTheDocument();
        expect(altField).toBeInTheDocument();
        expect(longDescriptionField).toBeInTheDocument();
        expect(captionField).toBeInTheDocument();
        expect(titleField).toBeInTheDocument();

        expect(widthField).toHaveValue(earthMoonImage.width);
        expect(heightField).toHaveValue(earthMoonImage.height);
        expect(urlField).toHaveValue(earthMoonImage.url);
        expect(altField).toHaveValue("Earth and moon alt");
        expect(longDescriptionField).toHaveValue(
            "Earth and moon long description",
        );
        expect(captionField).toHaveValue("Earth and moon caption");
        expect(titleField).toHaveValue("Earth and moon title");
    });

    it("should render warning for non-Khan Academy image", async () => {
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
        expect(screen.getByText(nonKhanImageWarning)).toBeInTheDocument();
    });

    it("should show the image dimensions if the image size is known", () => {
        // Arrange

        // Act
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={() => {}}
            />,
        );

        const widthField = screen.getByRole("spinbutton", {name: "Width"});
        const heightField = screen.getByRole("spinbutton", {name: "Height"});

        // Assert
        expect(widthField).toHaveValue(400);
        expect(heightField).toHaveValue(225);
    });

    it("should call onChange with the new image url", async () => {
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
        await userEvent.paste(earthMoonImage.url);
        await userEvent.tab();

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            backgroundImage: {
                url: earthMoonImage.url,
                width: 200,
                height: 300,
            },
            box: [200, 300],
        });
    });

    it("should call onChange with empty image url", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(<ImageEditor apiOptions={apiOptions} onChange={onChangeMock} />);

        // Act
        const urlField = screen.getByRole("textbox", {name: "Image url:"});
        urlField.focus();
        await userEvent.clear(urlField);
        await userEvent.tab();

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            backgroundImage: {
                url: "",
                width: 0,
                height: 0,
            },
            box: [0, 0],
        });
    });

    it("should should clear the warning when the image url is cleared", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                onChange={onChangeMock}
                backgroundImage={{url: "abc"}}
            />,
        );

        // Act

        const urlField = screen.getByRole("textbox", {name: "Image url:"});
        urlField.focus();
        await userEvent.paste("abc");
        await userEvent.tab();

        // Assert - make sure the warning is shown first
        expect(screen.getByText(nonKhanImageWarning)).toBeInTheDocument();

        // Act
        await userEvent.clear(urlField);
        await userEvent.tab();

        // Assert - warning goes away when the image url is cleared
        expect(screen.queryByText(nonKhanImageWarning)).not.toBeInTheDocument();
    });

    it("should call onChange with resized image when width is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{
                    url: earthMoonImage.url,
                    // Using easier to verify side lengths.
                    width: 100,
                    height: 200,
                }}
                onChange={onChangeMock}
            />,
        );

        // Act
        const widthField = screen.getByRole("spinbutton", {name: "Width"});
        widthField.focus();
        await userEvent.clear(widthField);
        await userEvent.paste("300");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            backgroundImage: {
                url: earthMoonImage.url,
                width: 300,
                height: 600,
            },
        });
    });

    it("should call onChange with resized image when height is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{
                    url: earthMoonImage.url,
                    // Using easier to verify side lengths.
                    width: 100,
                    height: 200,
                }}
                onChange={onChangeMock}
            />,
        );

        // Act
        const heightField = screen.getByRole("spinbutton", {name: "Height"});
        heightField.focus();
        await userEvent.clear(heightField);
        await userEvent.paste("100");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            backgroundImage: {
                url: earthMoonImage.url,
                width: 50,
                height: 100,
            },
        });
    });

    it("should call onChange with new alt text", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
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

    it("should call onChange with empty alt", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                alt="Earth and moon"
                onChange={onChangeMock}
            />,
        );

        // Act
        const altField = screen.getByRole("textbox", {name: "Alt text:"});
        await userEvent.clear(altField);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            alt: "",
        });
    });

    it("should call onChange with new long description", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={onChangeMock}
            />,
        );

        // Act
        const altField = screen.getByRole("textbox", {
            name: "Long description:",
        });
        altField.focus();
        await userEvent.paste("Earth and moon long description");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            longDescription: "Earth and moon long description",
        });
    });

    it("should call onChange with empty long description", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                longDescription="Earth and moon long description"
                onChange={onChangeMock}
            />,
        );

        // Act
        const altField = screen.getByRole("textbox", {
            name: "Long description:",
        });
        await userEvent.clear(altField);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            longDescription: "",
        });
    });

    it("should not render long description field if the feature flag is off", () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={{
                    ...ApiOptions.defaults,
                    flags: getFeatureFlags({"image-widget-upgrade": false}),
                }}
                onChange={onChangeMock}
            />,
        );

        // Assert
        expect(screen.queryByText("Long Description:")).not.toBeInTheDocument();
    });

    it("should call onChange with new caption", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
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

    it("should call onChange with empty caption", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                caption="Earth and moon"
                onChange={onChangeMock}
            />,
        );

        // Act
        const captionField = screen.getByRole("textbox", {name: "Caption:"});
        await userEvent.clear(captionField);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            caption: "",
        });
    });
    it("should call onChange with new title", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={onChangeMock}
            />,
        );

        // Act
        const titleField = screen.getByRole("textbox", {name: "Title:"});
        titleField.focus();
        await userEvent.paste("Earth and moon");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            title: "Earth and moon",
        });
    });

    it("should call onChange with empty title", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                title="Earth and moon"
                onChange={onChangeMock}
            />,
        );

        // Act
        const titleField = screen.getByRole("textbox", {name: "Title:"});
        await userEvent.clear(titleField);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            title: "",
        });
    });
});
