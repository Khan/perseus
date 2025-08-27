import {ApiOptions, Dependencies, Util} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import ImageEditor from "../image-editor/image-editor";

import type {UserEvent} from "@testing-library/user-event";

const realKhanImageUrl =
    "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg";
const nonKhanImageWarning =
    "Images must be from sites hosted by Khan Academy. Please input a Khan Academy-owned address, or use the Add Image tool to rehost an existing image";

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

    it("should render empty image editor", () => {
        // Arrange

        // Act
        render(<ImageEditor apiOptions={apiOptions} onChange={() => {}} />);

        // Assert
        const urlField = screen.getByRole("textbox", {name: "Image url:"});
        expect(urlField).toBeInTheDocument();

        // None of the rest of the UI should be rendered.
        expect(screen.queryByText(nonKhanImageWarning)).not.toBeInTheDocument();
        expect(screen.queryByText("Preview:")).not.toBeInTheDocument();
        expect(screen.queryByText("Dimensions:")).not.toBeInTheDocument();
        expect(screen.queryByText("Alt text:")).not.toBeInTheDocument();
        expect(screen.queryByText("Caption:")).not.toBeInTheDocument();
    });

    it("should render populated image editor", () => {
        // Arrange

        // Act
        render(
            <ImageEditor
                apiOptions={apiOptions}
                backgroundImage={{url: realKhanImageUrl}}
                alt="Earth and moon alt"
                caption="Earth and moon caption"
                onChange={() => {}}
            />,
        );

        const dimensionsLabel = screen.getByText("Dimensions:");
        const urlField = screen.getByRole("textbox", {name: "Image url:"});
        const altField = screen.getByRole("textbox", {name: "Alt text:"});
        const captionField = screen.getByRole("textbox", {name: "Caption:"});

        // Assert
        expect(dimensionsLabel).toBeInTheDocument();
        expect(urlField).toBeInTheDocument();
        expect(altField).toBeInTheDocument();
        expect(captionField).toBeInTheDocument();

        expect(screen.getByText("unknown")).toBeInTheDocument();
        expect(urlField).toHaveValue(realKhanImageUrl);
        expect(altField).toHaveValue("Earth and moon alt");
        expect(captionField).toHaveValue("Earth and moon caption");
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
            backgroundImage: {},
            box: undefined,
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
        const altField = screen.getByRole("textbox", {name: "Alt text:"});
        altField.focus();
        await userEvent.paste("Earth and moon");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            alt: "Earth and moon",
        });
    });

    it("should call onChange with undefined alt", async () => {
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
        const altField = screen.getByRole("textbox", {name: "Alt text:"});
        await userEvent.clear(altField);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            alt: undefined,
        });
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
        const captionField = screen.getByRole("textbox", {name: "Caption:"});
        captionField.focus();
        await userEvent.paste("Earth and moon");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            caption: "Earth and moon",
        });
    });

    it("should call onChange with undefined caption", async () => {
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
        const captionField = screen.getByRole("textbox", {name: "Caption:"});
        await userEvent.clear(captionField);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            caption: undefined,
        });
    });
});
