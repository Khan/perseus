import {
    ApiOptions,
    Dependencies,
    DependenciesContext,
    Util,
} from "@khanacademy/perseus";
import {act, render, screen, fireEvent} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {
    earthMoonImage,
    frescoImage,
} from "../../../../perseus/src/widgets/image/utils";
import {mockImageLoading} from "../../testing/image-loader-utils";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import ImageEditor from "../image-editor/image-editor";

import type {PerseusImageBackground} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {UserEvent} from "@testing-library/user-event";

const nonKhanImageWarning =
    "Images must be from sites hosted by Khan Academy. Please input a Khan Academy-owned address, or use the Add Image tool to rehost an existing image";
const altTextTooLongError =
    "Keep alt succinct at roughly 125 characters in length. Please pair the alt with a long description if you need significantly more text to sufficiently describe the image.";
const altTextTooShortError =
    "Add more detail to describe your image. While alt text should be brief, it must also describe the image well.";

const apiOptions = ApiOptions.defaults;

const ImageEditorWithDependencies = (props: PropsFor<typeof ImageEditor>) => {
    return (
        <DependenciesContext.Provider value={testDependenciesV2}>
            <ImageEditor {...props} />
        </DependenciesContext.Provider>
    );
};

describe("image editor", () => {
    let userEvent: UserEvent;
    let unmockImageLoading: () => void;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        unmockImageLoading = mockImageLoading({
            naturalWidth: earthMoonImage.width,
            naturalHeight: earthMoonImage.height,
        });
    });

    afterEach(() => {
        unmockImageLoading();
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
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    onChange={() => {}}
                    backgroundImage={backgroundImage}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Assert
            const urlField = screen.getByRole("textbox", {name: "Image URL"});
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

    it("should render populated image editor with all fields", () => {
        // Arrange

        // Act
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                alt="Earth and moon alt"
                longDescription="Earth and moon long description"
                caption="Earth and moon caption"
                title="Earth and moon title"
                decorative={false}
                onChange={() => {}}
            />,
        );

        const scaleField = screen.getByRole("spinbutton", {name: "Scale"});
        const widthField = screen.getByRole("spinbutton", {
            name: "Scaled Width",
        });
        const heightField = screen.getByRole("spinbutton", {
            name: "Scaled Height",
        });
        const urlField = screen.getByRole("textbox", {name: "Image URL"});
        const altField = screen.getByRole("textbox", {name: "Alt text"});
        const longDescriptionField = screen.getByRole("textbox", {
            name: "Long description",
        });
        const captionField = screen.getByRole("textbox", {name: "Caption"});
        const titleField = screen.getByRole("textbox", {name: "Title"});

        // Assert
        expect(scaleField).toBeInTheDocument();
        expect(widthField).toBeInTheDocument();
        expect(heightField).toBeInTheDocument();
        expect(urlField).toBeInTheDocument();
        expect(altField).toBeInTheDocument();
        expect(longDescriptionField).toBeInTheDocument();
        expect(captionField).toBeInTheDocument();
        expect(titleField).toBeInTheDocument();

        expect(scaleField).toHaveValue(1);
        expect(widthField).toHaveValue(earthMoonImage.width);
        expect(heightField).toHaveValue(earthMoonImage.height);
        expect(urlField).toHaveValue(earthMoonImage.url);
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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={() => {}}
                longDescription={""}
                decorative={false}
            />,
        );

        const scaleField = screen.getByRole("spinbutton", {name: "Scale"});
        const widthField = screen.getByRole("spinbutton", {
            name: "Scaled Width",
        });
        const heightField = screen.getByRole("spinbutton", {
            name: "Scaled Height",
        });
        const urlField = screen.getByRole("textbox", {name: "Image URL"});
        const altField = screen.getByRole("textbox", {name: "Alt text"});
        const longDescriptionField = screen.getByRole("textbox", {
            name: "Long description",
        });
        const captionField = screen.getByRole("textbox", {name: "Caption"});
        const titleField = screen.getByRole("textbox", {name: "Title"});

        // Assert
        expect(scaleField).toBeInTheDocument();
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
        expect(scaleField).toHaveValue(1);

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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={{}}
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
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

    it("should render warning for large image", () => {
        // Arrange, Act
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                // frescoImage is very large (1698 x 955)
                backgroundImage={frescoImage}
                onChange={() => {}}
                longDescription={""}
                decorative={false}
            />,
        );

        // Assert
        expect(
            screen.getByText(
                "Large images may cause slow performance for learners. Please use a max size of 1024 x 1024.",
            ),
        ).toBeInTheDocument();
    });

    it("should not render warning for smaller image", () => {
        // Arrange, Act
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                // earthMoonImage is small (400 x 225)
                backgroundImage={earthMoonImage}
                onChange={() => {}}
                longDescription={""}
                decorative={false}
            />,
        );

        // Assert
        expect(
            screen.queryByText(
                "Large images may cause slow performance for learners. Please use a max size of 1024 x 1024.",
            ),
        ).not.toBeInTheDocument();
    });

    it("should render preview image with alt text", () => {
        // Arrange

        // Act
        render(
            <DependenciesContext.Provider value={testDependenciesV2}>
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    alt="Earth and moon alt"
                    onChange={() => {}}
                    longDescription={""}
                    decorative={false}
                />
            </DependenciesContext.Provider>,
        );

        act(() => {
            jest.runAllTimers();
        });

        // Assert
        expect(
            screen.getByAltText("Preview: Earth and moon alt"),
        ).toBeInTheDocument();
    });

    it("should render preview image without alt text", () => {
        // Arrange
        render(
            <DependenciesContext.Provider value={testDependenciesV2}>
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    onChange={() => {}}
                    longDescription={""}
                    decorative={false}
                />
            </DependenciesContext.Provider>,
        );

        act(() => {
            jest.runAllTimers();
        });

        // Assert
        expect(screen.getByAltText("Preview: No alt text")).toBeInTheDocument();
    });

    it("should call onChange with the new image url", async () => {
        // Arrange
        jest.spyOn(Util, "getImageSizeModern").mockResolvedValue([200, 300]);
        const onChangeMock = jest.fn();
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={{}}
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
            />,
        );

        // Act
        const urlField = screen.getByRole("textbox", {name: "Image URL"});
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
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
            />,
        );

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

    it("should clear the warning when the image url is cleared", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                onChange={onChangeMock}
                backgroundImage={{url: "abc"}}
                longDescription={""}
                decorative={false}
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

    it("should call onChange with original image size when recalculate natural size is clicked", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={{
                    url: earthMoonImage.url,
                    width: earthMoonImage.width / 2,
                    height: earthMoonImage.height / 2,
                }}
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
            />,
        );

        // Act
        const resetToOriginalSizeButton = screen.getByRole("button", {
            name: "Recalculate natural size",
        });
        await userEvent.click(resetToOriginalSizeButton);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            backgroundImage: earthMoonImage,
        });
    });

    it("should not call onChange when recalculate natural size is clicked and the image size is already the original size", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
            />,
        );

        // Act
        const resetToOriginalSizeButton = screen.getByRole("button", {
            name: "Recalculate natural size",
        });
        await userEvent.click(resetToOriginalSizeButton);

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("should call onChange with new alt text", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                alt="Earth and moon"
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                longDescription="Earth and moon long description"
                onChange={onChangeMock}
                decorative={false}
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

    it("should call onChange with new caption", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                caption="Earth and moon"
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                title="Earth and moon"
                onChange={onChangeMock}
                longDescription={""}
                decorative={false}
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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                onChange={onChangeMock}
                backgroundImage={earthMoonImage}
                longDescription={""}
                decorative={false}
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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                onChange={onChangeMock}
                backgroundImage={earthMoonImage}
                longDescription={""}
                decorative={false}
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
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                onChange={onChangeMock}
                backgroundImage={earthMoonImage}
                alt="aaa" // Start with short alt text that will trigger error on blur
                longDescription={""}
                decorative={false}
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

    it("should show character counter for alt text", () => {
        // Arrange, Act
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                onChange={() => {}}
                backgroundImage={earthMoonImage}
                alt="123456789"
                longDescription={""}
                decorative={false}
            />,
        );

        // Assert
        expect(screen.getByText("123456789")).toBeInTheDocument();
        expect(screen.getByText("9 characters")).toBeInTheDocument();
    });

    it("should show character count = 0 when alt text is undefined", () => {
        // Arrange, Act
        render(
            <ImageEditorWithDependencies
                apiOptions={apiOptions}
                backgroundImage={earthMoonImage}
                onChange={() => {}}
                longDescription={""}
                decorative={false}
            />,
        );

        // Assert
        expect(screen.getByText("0 characters")).toBeInTheDocument();
    });

    describe("decorative toggle", () => {
        it("should render when decorative is true", () => {
            // Arrange & Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    decorative={true}
                    onChange={() => {}}
                    longDescription={""}
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
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    onChange={onChangeMock}
                    longDescription={""}
                    decorative={false}
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

    describe("scale input", () => {
        it("should render the scale inputs", () => {
            // Arrange, Act
            const onChangeMock = jest.fn();
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    scale={1}
                    onChange={onChangeMock}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Assert
            const scaleField = screen.getByRole("spinbutton", {name: "Scale"});
            const scaledWidthField = screen.getByRole("spinbutton", {
                name: "Scaled Width",
            });
            const scaledHeightField = screen.getByRole("spinbutton", {
                name: "Scaled Height",
            });
            const resetToOriginalSizeButton = screen.getByRole("button", {
                name: "Recalculate natural size",
            });
            expect(scaleField).toBeInTheDocument();
            expect(scaleField).toHaveValue(1);
            expect(scaledWidthField).toBeInTheDocument();
            expect(scaledWidthField).toHaveValue(earthMoonImage.width);
            expect(scaledHeightField).toBeInTheDocument();
            expect(scaledHeightField).toHaveValue(earthMoonImage.height);
            expect(resetToOriginalSizeButton).toBeInTheDocument();
        });

        it("should render scaled values of width and height", () => {
            // Arrange, Act
            const onChangeMock = jest.fn();
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    scale={2}
                    onChange={onChangeMock}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Assert
            const scaledWidthField = screen.getByRole("spinbutton", {
                name: "Scaled Width",
            });
            const scaledHeightField = screen.getByRole("spinbutton", {
                name: "Scaled Height",
            });

            expect(scaledWidthField).toBeInTheDocument();
            expect(scaledWidthField).toHaveValue(earthMoonImage.width * 2);
            expect(scaledHeightField).toBeInTheDocument();
            expect(scaledHeightField).toHaveValue(earthMoonImage.height * 2);
        });

        it("should call onChange with new scale when scale is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    scale={1}
                    onChange={onChangeMock}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Act
            const scaleField = screen.getByRole("spinbutton", {name: "Scale"});
            scaleField.focus();
            await userEvent.clear(scaleField);
            await userEvent.paste("2");

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({
                scale: 2,
            });
        });

        it("should call onChange with new scale when scaled width is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    scale={1}
                    onChange={onChangeMock}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Act
            const scaledWidthField = screen.getByRole("spinbutton", {
                name: "Scaled Width",
            });
            scaledWidthField.focus();
            await userEvent.clear(scaledWidthField);
            await userEvent.paste(`${earthMoonImage.width * 2}`);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({
                scale: 2,
            });
        });

        it("should call onChange with new scale when scaled height is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    scale={1}
                    onChange={onChangeMock}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Act
            const scaledHeightField = screen.getByRole("spinbutton", {
                name: "Scaled Height",
            });
            scaledHeightField.focus();
            await userEvent.clear(scaledHeightField);
            await userEvent.paste(`${earthMoonImage.height * 2}`);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({
                scale: 2,
            });
        });

        it.each([0, -1, -3.14])(
            "should not call onChange when scale is invalid (%s)",
            async (scale) => {
                // Arrange
                const onChangeMock = jest.fn();
                render(
                    <ImageEditorWithDependencies
                        apiOptions={apiOptions}
                        backgroundImage={earthMoonImage}
                        scale={1}
                        onChange={onChangeMock}
                        longDescription={""}
                        decorative={false}
                    />,
                );

                // Act
                const scaleField = screen.getByRole("spinbutton", {
                    name: "Scale",
                });
                scaleField.focus();
                await userEvent.clear(scaleField);
                await userEvent.paste(scale.toString());

                // Assert
                expect(onChangeMock).not.toHaveBeenCalled();
            },
        );

        it("should disable the scale inputs when the image size is invalid", () => {
            // Arrange, Act
            const onChangeMock = jest.fn();
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={{
                        // Missing width and height
                        url: earthMoonImage.url,
                    }}
                    onChange={onChangeMock}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Assert
            const scaleField = screen.getByRole("spinbutton", {name: "Scale"});
            const scaledWidthField = screen.getByRole("spinbutton", {
                name: "Scaled Width",
            });
            const scaledHeightField = screen.getByRole("spinbutton", {
                name: "Scaled Height",
            });
            expect(scaleField).toHaveAttribute("aria-disabled", "true");
            expect(scaledWidthField).toHaveAttribute("aria-disabled", "true");
            expect(scaledHeightField).toHaveAttribute("aria-disabled", "true");
        });

        it("should show the warning when the image size is missing", () => {
            // Arrange, Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={{url: earthMoonImage.url}}
                    onChange={() => {}}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Assert
            expect(
                screen.getByText(
                    'Image size is invalid. Please use the "Recalculate natural size" button to enable scaling.',
                ),
            ).toBeInTheDocument();
        });

        it("should show the warning when the image size is zero", () => {
            // Arrange, Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={{
                        url: earthMoonImage.url,
                        width: 0,
                        height: 0,
                    }}
                    onChange={() => {}}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Assert
            expect(
                screen.getByText(
                    'Image size is invalid. Please use the "Recalculate natural size" button to enable scaling.',
                ),
            ).toBeInTheDocument();
        });

        it("should enable the scale inputs when the image size is valid", () => {
            // Arrange, Act
            const onChangeMock = jest.fn();
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={{
                        url: earthMoonImage.url,
                        width: earthMoonImage.width,
                        height: earthMoonImage.height,
                    }}
                    onChange={onChangeMock}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Assert
            const scaleField = screen.getByRole("spinbutton", {name: "Scale"});
            const scaledWidthField = screen.getByRole("spinbutton", {
                name: "Scaled Width",
            });
            const scaledHeightField = screen.getByRole("spinbutton", {
                name: "Scaled Height",
            });
            expect(scaleField).toHaveAttribute("aria-disabled", "false");
            expect(scaledWidthField).toHaveAttribute("aria-disabled", "false");
            expect(scaledHeightField).toHaveAttribute("aria-disabled", "false");
        });

        it("should hide the warning when the image size is valid", () => {
            // Arrange, Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    onChange={() => {}}
                    longDescription={""}
                    decorative={false}
                />,
            );

            // Assert
            expect(
                screen.queryByText(
                    'Image size is invalid. Please use the "Recalculate natural size" button to enable scaling.',
                ),
            ).not.toBeInTheDocument();
        });
    });

    describe("dark mode toggles", () => {
        const pngImage = {
            url: "https://cdn.kastatic.org/ka-content-images/test-image.png",
            width: 400,
            height: 225,
        };

        it("does not render for JPG images", () => {
            // Arrange, Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.queryByRole("switch", {name: "Show in Dark Mode"}),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByRole("switch", {
                    name: "Suppress Dark Mode Filter",
                }),
            ).not.toBeInTheDocument();
        });

        it("does not render for Graphie images", () => {
            // Arrange, Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={{
                        url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138",
                        width: 400,
                        height: 225,
                    }}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.queryByRole("switch", {name: "Show in Dark Mode"}),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByRole("switch", {
                    name: "Suppress Dark Mode Filter",
                }),
            ).not.toBeInTheDocument();
        });

        it("renders both toggles for PNG images", () => {
            // Arrange, Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={pngImage}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("switch", {name: "Show in Dark Mode"}),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("switch", {
                    name: "Suppress Dark Mode Filter",
                }),
            ).toBeInTheDocument();
        });

        it("renders Show in Dark Mode toggle as unchecked by default", () => {
            // Arrange, Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={pngImage}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("switch", {name: "Show in Dark Mode"}),
            ).not.toBeChecked();
        });

        it('renders Suppress Dark Mode Filter toggle as unchecked when URL has no "dark-mode=off" suffix', () => {
            // Arrange, Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={pngImage}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("switch", {
                    name: "Suppress Dark Mode Filter",
                }),
            ).not.toBeChecked();
        });

        it('renders Suppress Dark Mode Filter toggle as checked when URL ends with "?dark-mode=off"', () => {
            // Arrange, Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={{
                        ...pngImage,
                        url: pngImage.url + "?dark-mode=off",
                    }}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("switch", {
                    name: "Suppress Dark Mode Filter",
                }),
            ).toBeChecked();
        });

        it("toggles Show in Dark Mode on click", async () => {
            // Arrange
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={pngImage}
                    onChange={() => {}}
                />,
            );
            const toggle = screen.getByRole("switch", {
                name: "Show in Dark Mode",
            });

            // Act
            await userEvent.click(toggle);

            // Assert
            expect(toggle).toBeChecked();
        });

        it("applies dark mode theme to image preview when Show in Dark Mode is toggled on", async () => {
            // Arrange
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={pngImage}
                    onChange={() => {}}
                />,
            );

            // Act
            await userEvent.click(
                screen.getByRole("switch", {name: "Show in Dark Mode"}),
            );

            // Assert
            expect(
                screen.getByTestId("image-preview-container"),
            ).toHaveAttribute("data-wb-theme", "syl-dark");
        });

        it("removes dark mode theme from image preview when Show in Dark Mode is toggled off", async () => {
            // Arrange
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={pngImage}
                    onChange={() => {}}
                />,
            );
            const toggle = screen.getByRole("switch", {
                name: "Show in Dark Mode",
            });
            await userEvent.click(toggle);

            // Act
            await userEvent.click(toggle);

            // Assert
            expect(
                screen.getByTestId("image-preview-container"),
            ).not.toHaveAttribute("data-wb-theme", "syl-dark");
        });

        it('calls onChange with "?dark-mode=off" appended when Suppress Dark Mode Filter is toggled on', async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={pngImage}
                    onChange={onChangeMock}
                />,
            );

            // Act
            await userEvent.click(
                screen.getByRole("switch", {
                    name: "Suppress Dark Mode Filter",
                }),
            );

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({
                backgroundImage: {
                    ...pngImage,
                    url: pngImage.url + "?dark-mode=off",
                },
            });
        });

        it('calls onChange with "?dark-mode=off" removed when Suppress Dark Mode Filter is toggled off', async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={{
                        ...pngImage,
                        url: pngImage.url + "?dark-mode=off",
                    }}
                    onChange={onChangeMock}
                />,
            );

            // Act
            await userEvent.click(
                screen.getByRole("switch", {
                    name: "Suppress Dark Mode Filter",
                }),
            );

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({
                backgroundImage: {
                    ...pngImage,
                    url: pngImage.url,
                },
            });
        });

        it("hides both toggles and resets dark mode preview when URL changes from PNG to non-PNG", async () => {
            // Arrange
            const {rerender} = render(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={pngImage}
                    onChange={() => {}}
                />,
            );
            await userEvent.click(
                screen.getByRole("switch", {name: "Show in Dark Mode"}),
            );
            expect(
                screen.getByTestId("image-preview-container"),
            ).toHaveAttribute("data-wb-theme", "syl-dark");

            // Act
            rerender(
                <ImageEditorWithDependencies
                    apiOptions={apiOptions}
                    backgroundImage={earthMoonImage}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.queryByRole("switch", {name: "Show in Dark Mode"}),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByRole("switch", {
                    name: "Suppress Dark Mode Filter",
                }),
            ).not.toBeInTheDocument();
            expect(
                screen.getByTestId("image-preview-container"),
            ).not.toHaveAttribute("data-wb-theme", "syl-dark");
        });

        it("disables both toggles when editingDisabled is true", () => {
            // Arrange, Act
            render(
                <ImageEditorWithDependencies
                    apiOptions={{...ApiOptions.defaults, editingDisabled: true}}
                    backgroundImage={pngImage}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("switch", {name: "Show in Dark Mode"}),
            ).toHaveAttribute("aria-disabled", "true");
            expect(
                screen.getByRole("switch", {
                    name: "Suppress Dark Mode Filter",
                }),
            ).toHaveAttribute("aria-disabled", "true");
        });
    });
});
