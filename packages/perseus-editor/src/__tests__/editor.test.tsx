import {ApiOptions, Dependencies, Util} from "@khanacademy/perseus";
import {act, render, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../testing/test-dependencies";
import {DependenciesContext} from "../../../perseus/src/dependencies";
import Editor from "../editor";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {UserEvent} from "@testing-library/user-event";

const Harnessed = (props: Partial<PropsFor<typeof Editor>>) => {
    return (
        <DependenciesContext.Provider value={testDependenciesV2}>
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
        </DependenciesContext.Provider>
    );
};

describe("Editor", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    let userEvent: UserEvent;
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
        await userEvent.click(
            screen.getByRole("button", {name: "Remove image widget"}),
        );

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    test("clicking on the widget editor should open it", async () => {
        // Arrange
        const images: Array<Record<any, any>> = [];
        const originalImage = window.Image;
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

        render(<Harnessed />);

        // Act
        const widgetDisclosure = screen.getByText("image 1");
        await userEvent.click(widgetDisclosure);

        // Trigger the image load
        images.forEach((img) => {
            if (img?.onload) {
                act(() => img.onload());
            }
        });

        // Assert
        const previewImage = screen.getByAltText(/Preview:/);
        await waitFor(() =>
            expect(previewImage).toHaveAttribute(
                "src",
                "http://placekitten.com/200/300",
            ),
        );

        // Cleanup
        window.Image = originalImage;
    });

    it("should update values", async () => {
        // Arrange
        jest.spyOn(Util, "getImageSizeModern").mockResolvedValue([200, 200]);

        const changeFn = jest.fn();
        render(<Harnessed onChange={changeFn} />);

        // Act
        const widgetDisclosure = screen.getByText("image 1");
        await userEvent.click(widgetDisclosure);

        const captionInput = screen.getByLabelText(/Caption:/);

        await userEvent.clear(captionInput);
        captionInput.focus();
        await userEvent.paste("kittens");
        await userEvent.tab(); // blurring the input triggers onChange to be called

        // Assert
        expect(changeFn).toHaveBeenCalledWith(
            {
                widgets: {
                    "image 1": expect.objectContaining({
                        type: "image",
                        graded: true,
                        options: expect.objectContaining({
                            caption: "kittens",
                        }),
                    }),
                },
            },
            undefined,
            undefined,
        );
    });

    it("should not log a warning given a widget with an undefined key", () => {
        const consoleErrorSpy = jest.spyOn(console, "error");

        render(
            <Harnessed
                widgets={{
                    "image 1": {
                        type: "image",
                        key: undefined,
                        options: {
                            backgroundImage: {
                                url: "http://placekitten.com/200/300",
                            },
                        },
                    },
                }}
            />,
        );

        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("should add the latest expression widget", async () => {
        // PerseusRenderer but TS is being dumb
        let cbData: any;
        render(
            <Harnessed
                onChange={(data) => {
                    cbData = data;
                }}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        const select = screen.getByTestId("editor__widget-select");
        await userEvent.selectOptions(select, "Expression / Equation");

        expect(cbData?.widgets?.["expression 1"]?.version).toEqual({
            major: 2,
            minor: 0,
        });
    });

    it("should add the latest radio widget", async () => {
        // PerseusRenderer but TS is being dumb
        let cbData: any;
        render(
            <Harnessed
                onChange={(data) => {
                    cbData = data;
                }}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        const select = screen.getByTestId("editor__widget-select");
        await userEvent.selectOptions(select, "Radio / Multiple choice");

        expect(cbData?.widgets?.["radio 1"]?.version).toEqual({
            major: 2,
            minor: 0,
        });
    });

    test("default templates work", async () => {
        // PerseusRenderer but TS is being dumb
        let cbData: any;
        render(
            <Harnessed
                onChange={(data) => {
                    cbData = data;
                }}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        const select = screen.getByTestId("editor__template-select");
        await userEvent.selectOptions(select, "Table");

        expect(cbData?.content).toMatch(/header 1 | header 2 | header 3/i);
    });

    test("custom templates work", async () => {
        // PerseusRenderer but TS is being dumb
        let cbData: any;
        render(
            <Harnessed
                onChange={(data) => {
                    cbData = data;
                }}
                additionalTemplates={{
                    "custom-template": "This is my custom template",
                }}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        const select = screen.getByTestId("editor__template-select");
        await userEvent.selectOptions(select, "custom-template");

        expect(cbData?.content).toMatch(/This is my custom template/i);
    });
});
