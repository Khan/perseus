import {
    ApiOptions,
    Dependencies,
    Widgets,
    widgets,
    Util,
} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../testing/test-dependencies";
import Editor from "../editor";
import ImageEditor from "../widgets/image-editor";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const Harnessed = (props: Partial<PropsFor<typeof Editor>>) => {
    return (
        <Editor
            apiOptions={ApiOptions.defaults}
            onChange={() => {}}
            content="[[☃ image 1]]"
            widgets={{
                "image 1": {
                    type: "image",
                    options: {
                        backgroundImage: {
                            url: "http://placekitten.com/200/300",
                        },
                    },
                },
            }}
            {...props}
        />
    );
};

describe("Editor", () => {
    beforeAll(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const ImageWidget = widgets.find((w) => w.name === "image")!;
        expect(ImageWidget).toBeDefined();
        Widgets.registerWidget("image", ImageWidget);
        Widgets.registerEditors([ImageEditor]);
    });

    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should delete widget if confirmed", async () => {
        const onChangeMock = jest.fn();
        jest.spyOn(window, "confirm").mockReturnValue(true);

        // Arrange
        render(<Harnessed onChange={onChangeMock} />);

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Remove image widget"}),
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({content: ""});
    });

    it("should NOT delete widget if not confirmed", async () => {
        const onChangeMock = jest.fn();
        jest.spyOn(window, "confirm").mockReturnValue(false);

        // Arrange
        render(<Harnessed onChange={onChangeMock} />);

        // Act
        screen.getByRole("button", {name: "Remove image widget"}),
            await userEvent.click();

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    test("clicking on the widget editor should open it", async () => {
        // Arrange
        render(<Harnessed />);

        // Act
        const widgetDisclosure = screen.getByRole("link", {
            name: "image 1",
        });
        await userEvent.click(widgetDisclosure);

        // Assert
        const previewImage = screen.getByAltText("Editor preview of image");
        expect(previewImage).toHaveAttribute(
            "src",
            "http://placekitten.com/200/300",
        );
    });

    it("should update values", async () => {
        // Arrange
        jest.spyOn(Util, "getImageSizeModern").mockResolvedValue([200, 200]);

        const changeFn = jest.fn();
        render(<Harnessed onChange={changeFn} />);

        // Act
        const widgetDisclosure = screen.getByRole("link", {
            name: "image 1",
        });
        await userEvent.click(widgetDisclosure);

        const captionInput = screen.getByLabelText(/Caption:/);

        await userEvent.clear(captionInput);
        await userEvent.type(captionInput, "A picture of kittens");
        await userEvent.tab(); // blurring the input triggers onChange to be called

        // Assert
        expect(changeFn).toHaveBeenCalledWith(
            {
                widgets: {
                    "image 1": expect.objectContaining({
                        type: "image",
                        graded: true,
                        options: expect.objectContaining({
                            caption: "A picture of kittens",
                        }),
                    }),
                },
            },
            undefined,
            undefined,
        );
    });
});
