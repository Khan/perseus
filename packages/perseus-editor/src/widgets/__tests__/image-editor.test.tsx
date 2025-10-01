import {ApiOptions, Dependencies, Util} from "@khanacademy/perseus";
import {act, render, screen, fireEvent} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {getFeatureFlags} from "../../../../../testing/feature-flags-util";
import {testDependencies} from "../../../../../testing/test-dependencies";
import {earthMoonImage} from "../../../../perseus/src/widgets/image/utils";
import ImageEditor from "../image-editor/image-editor";

import type {UserEvent} from "@testing-library/user-event";

const realKhanImageUrl =
    "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg";
const nonKhanImageWarning =
    "Images must be from sites hosted by Khan Academy. Please input a Khan Academy-owned address, or use the Add Image tool to rehost an existing image";
const altTextTooLongError =
    "Alt text should not exceed 150 characters. Please pair your alt with a long description below if you need significantly more text to sufficiently describe the image.";
const altTextTooShortError =
    "Add more detail to describe your image. While alt text should be brief, it must also describe the image well.";

const apiOptions = {
    ...ApiOptions.defaults,
    flags: getFeatureFlags({"image-widget-upgrade": true}),
};

describe("image editor", () => {
    let userEvent: UserEvent;
    const images: Array<Record<any, any>> = [];
    let originalImage;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        originalImage = window.Image;
        // The editor preview uses SvgImage, which uses ImageLoader.
        // We need to mock the image loading in ImageLoader for it to render.
        // Mock HTML Image so we can trigger onLoad callbacks and see full
        // image rendering.
        // @ts-expect-error - TS2322 - Type 'Mock<Record<string, any>, [], any>' is not assignable to type 'new (width?: number | undefined, height?: number | undefined) => HTMLImageElement'.
        window.Image = jest.fn(() => {
            const img: Record<string, any> = {};
            images.push(img);
            return img;
        });
    });

    afterEach(() => {
        window.Image = originalImage;
    });

    // Tells the image loader 1, or all, of our images loaded
    const markImagesAsLoaded = (imageIndex?: number) => {
        if (imageIndex != null) {
            const img = images[imageIndex];
            if (img?.onload) {
                act(() => img.onload());
            }
        } else {
            images.forEach((i) => {
                if (i?.onload) {
                    act(() => i.onload());
                }
            });
        }
    };

    it("should render empty image editor", () => {
        // Arrange

        // Act
        render(<ImageEditor apiOptions={apiOptions} onChange={() => {}} />);

        // Assert
        const urlField = screen.getByRole("textbox", {name: "Image URL"});
        expect(urlField).toBeInTheDocument();

        // None of the rest of the UI should be rendered.
        expect(screen.queryByText(nonKhanImageWarning)).not.toBeInTheDocument();
        expect(screen.queryByText("Preview:")).not.toBeInTheDocument();
        expect(screen.queryByText("Dimensions:")).not.toBeInTheDocument();
        expect(screen.queryByText("Alt text:")).not.toBeInTheDocument();
        expect(screen.queryByText("Long Description:")).not.toBeInTheDocument();
        expect(screen.queryByText("Caption:")).not.toBeInTheDocument();

        expect(screen.queryByText(altTextTooLongError)).not.toBeInTheDocument();
        expect(
            screen.queryByText(altTextTooShortError),
        ).not.toBeInTheDocument();
    });

    it("should render populated image editor with all fields", () => {
        // Arrange

        // Act
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{url: realKhanImageUrl}}
                alt="Earth and moon alt"
                longDescription="Earth and moon long description"
                caption="Earth and moon caption"
                title="Earth and moon title"
                onChange={() => {}}
            />,
        );

        const dimensionsLabel = screen.getByText("Dimensions:");
        const urlField = screen.getByRole("textbox", {name: "Image URL"});
        const altField = screen.getByRole("textbox", {name: "Alt text"});
        const longDescriptionField = screen.getByRole("textbox", {
            name: "Long description",
        });
        const captionField = screen.getByRole("textbox", {name: "Caption"});
        const titleField = screen.getByRole("textbox", {name: "Title"});

        // Assert
        expect(dimensionsLabel).toBeInTheDocument();
        expect(urlField).toBeInTheDocument();
        expect(altField).toBeInTheDocument();
        expect(longDescriptionField).toBeInTheDocument();
        expect(captionField).toBeInTheDocument();
        expect(titleField).toBeInTheDocument();

        expect(screen.getByText("unknown")).toBeInTheDocument();
        expect(urlField).toHaveValue(realKhanImageUrl);
        expect(altField).toHaveValue("Earth and moon alt");
        expect(longDescriptionField).toHaveValue(
            "Earth and moon long description",
        );
        expect(captionField).toHaveValue("Earth and moon caption");
        expect(titleField).toHaveValue("Earth and moon title");

        expect(screen.queryByText(altTextTooLongError)).not.toBeInTheDocument();
        expect(
            screen.queryByText(altTextTooShortError),
        ).not.toBeInTheDocument();
    });

    it("should render populated image editor with only URL", () => {
        // Arrange

        // Act
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{url: realKhanImageUrl}}
                onChange={() => {}}
            />,
        );

        const dimensionsLabel = screen.getByText("Dimensions:");
        const urlField = screen.getByRole("textbox", {name: "Image URL"});
        const altField = screen.getByRole("textbox", {name: "Alt text"});
        const longDescriptionField = screen.getByRole("textbox", {
            name: "Long description",
        });
        const captionField = screen.getByRole("textbox", {name: "Caption"});
        const titleField = screen.getByRole("textbox", {name: "Title"});

        // Assert
        expect(dimensionsLabel).toBeInTheDocument();
        expect(urlField).toBeInTheDocument();
        expect(altField).toBeInTheDocument();
        expect(longDescriptionField).toBeInTheDocument();
        expect(captionField).toBeInTheDocument();
        expect(titleField).toBeInTheDocument();

        expect(screen.getByText("unknown")).toBeInTheDocument();
        expect(urlField).toHaveValue(realKhanImageUrl);

        // All other fields should have value "" if undefined
        expect(altField).toHaveValue("");
        expect(longDescriptionField).toHaveValue("");
        expect(captionField).toHaveValue("");
        expect(titleField).toHaveValue("");

        expect(screen.queryByText(altTextTooLongError)).not.toBeInTheDocument();
        expect(
            screen.queryByText(altTextTooShortError),
        ).not.toBeInTheDocument();
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
        const urlField = screen.getByRole("textbox", {name: "Image URL"});
        urlField.focus();
        await userEvent.paste("https://example.com/image.png");
        await userEvent.tab();

        // Assert
        expect(screen.getByText(nonKhanImageWarning)).toBeInTheDocument();
    });

    it("should render preview image with alt text", () => {
        // Arrange

        // Act
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                alt="Earth and moon alt"
                onChange={() => {}}
            />,
        );

        markImagesAsLoaded(); // Tell the ImageLoader that our images are loaded

        // Assert
        expect(
            screen.getByAltText("Preview: Earth and moon alt"),
        ).toBeInTheDocument();
    });

    it("should render preview image without alt text", () => {
        // Arrange
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={() => {}}
            />,
        );

        markImagesAsLoaded(); // Tell the ImageLoader that our images are loaded

        // Assert
        expect(screen.getByAltText("Preview: No alt text")).toBeInTheDocument();
    });

    it("should show unknown dimensions if the image size is not known", () => {
        // Arrange
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{url: realKhanImageUrl}}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByText("unknown")).toBeInTheDocument();
    });

    it("should show the image dimensions if the image size is known", () => {
        // Arrange
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{
                    url: realKhanImageUrl,
                    width: 400,
                    height: 225,
                }}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByText("400 x 225")).toBeInTheDocument();
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
        const urlField = screen.getByRole("textbox", {name: "Image URL"});
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

    it("should call onChange with empty image url", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(<ImageEditor apiOptions={apiOptions} onChange={onChangeMock} />);

        // Act
        const urlField = screen.getByRole("textbox", {name: "Image URL"});
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

        const urlField = screen.getByRole("textbox", {name: "Image URL"});
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

    it("should call onChange with new alt text", async () => {
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
        const altField = screen.getByRole("textbox", {name: "Alt text"});
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
                backgroundImage={{url: realKhanImageUrl}}
                alt="Earth and moon"
                onChange={onChangeMock}
            />,
        );

        // Act
        const altField = screen.getByRole("textbox", {name: "Alt text"});
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
                backgroundImage={{url: realKhanImageUrl}}
                onChange={onChangeMock}
            />,
        );

        // Act
        const altField = screen.getByRole("textbox", {
            name: "Long description",
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
                backgroundImage={{url: realKhanImageUrl}}
                longDescription="Earth and moon long description"
                onChange={onChangeMock}
            />,
        );

        // Act
        const altField = screen.getByRole("textbox", {
            name: "Long description",
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
                backgroundImage={{url: realKhanImageUrl}}
                onChange={onChangeMock}
            />,
        );

        // Act
        const captionField = screen.getByRole("textbox", {name: "Caption"});
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
                backgroundImage={{url: realKhanImageUrl}}
                caption="Earth and moon"
                onChange={onChangeMock}
            />,
        );

        // Act
        const captionField = screen.getByRole("textbox", {name: "Caption"});
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
                backgroundImage={{url: realKhanImageUrl}}
                onChange={onChangeMock}
            />,
        );

        // Act
        const titleField = screen.getByRole("textbox", {name: "Title"});
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
                backgroundImage={{url: realKhanImageUrl}}
                title="Earth and moon"
                onChange={onChangeMock}
            />,
        );

        // Act
        const titleField = screen.getByRole("textbox", {name: "Title"});
        await userEvent.clear(titleField);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            title: "",
        });
    });

    it("should show alt text too short error", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                onChange={onChangeMock}
                backgroundImage={{url: realKhanImageUrl}}
            />,
        );

        // Act - type 3 characters and blur
        // Note: Using fireEvent here instead of userEvent because userEvent.type/paste
        // with userEvent.tab doesn't properly trigger the blur validation for this component
        const altField = screen.getByRole("textbox", {name: "Alt text"});
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.change(altField, {target: {value: "aaa"}});
        fireEvent.blur(altField, {target: {value: "aaa"}});

        // Assert
        expect(screen.getByText(altTextTooShortError)).toBeInTheDocument();
    });

    it("should show alt text too long error", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                onChange={onChangeMock}
                backgroundImage={{url: realKhanImageUrl}}
            />,
        );

        // Act - type 151 characters
        const altField = screen.getByRole("textbox", {name: "Alt text"});
        altField.focus();
        await userEvent.paste("a".repeat(151));

        // Assert
        expect(screen.getByText(altTextTooLongError)).toBeInTheDocument();
    });

    it("should clear the error when the alt text is cleared", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditor
                apiOptions={apiOptions}
                onChange={onChangeMock}
                backgroundImage={{url: realKhanImageUrl}}
                alt="aaa" // Start with short alt text that will trigger error on blur
            />,
        );

        // Act - blur the field to trigger the validation error
        const altField = screen.getByRole("textbox", {name: "Alt text"});
        fireEvent.blur(altField, {target: {value: "aaa"}});

        // Assert - make sure the error is shown
        expect(screen.getByText(altTextTooShortError)).toBeInTheDocument();

        // Act - clear the alt text
        await userEvent.clear(altField);

        // Assert - make sure the error is cleared
        expect(
            screen.queryByText(altTextTooShortError),
        ).not.toBeInTheDocument();
    });

    describe("decorative toggle", () => {
        it("should render when feature flag is enabled", () => {
            // Arrange & Act
            render(
                <ImageEditor
                    apiOptions={apiOptions}
                    backgroundImage={{url: realKhanImageUrl}}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("switch", {name: "Decorative"}),
            ).toBeInTheDocument();
            expect(screen.getByLabelText("Decorative")).toBeInTheDocument();
        });

        it("should not render feature flag is disabled", () => {
            // Arrange & Act
            render(
                <ImageEditor
                    apiOptions={{
                        ...ApiOptions.defaults,
                        flags: getFeatureFlags({"image-widget-upgrade": false}),
                    }}
                    backgroundImage={{url: realKhanImageUrl}}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.queryByRole("switch", {name: "Decorative"}),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByLabelText("Decorative"),
            ).not.toBeInTheDocument();
        });

        it("should render when decorative is true", () => {
            // Arrange & Act
            render(
                <ImageEditor
                    apiOptions={apiOptions}
                    backgroundImage={{url: realKhanImageUrl}}
                    decorative={true}
                    onChange={() => {}}
                />,
            );

            // Assert
            const decorativeToggle = screen.getByRole("switch", {
                name: "Decorative",
            });
            expect(decorativeToggle).toBeInTheDocument();
            expect(decorativeToggle).toBeChecked();
        });

        it("should call onChange when decorative toggle is clicked", async () => {
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
            const decorativeToggle = screen.getByRole("switch", {
                name: "Decorative",
            });
            await userEvent.click(decorativeToggle);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({decorative: true});
        });
    });
});
