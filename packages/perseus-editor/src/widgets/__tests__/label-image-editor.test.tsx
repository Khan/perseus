import {Dependencies, ApiOptions} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import LabelImageEditor from "../label-image-editor/label-image-editor";

import type {PreferredPopoverDirection} from "../label-image-editor/behavior";
import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    choices: ["Choice 1", "Choice 2", "Choice 3"],
    imageAlt: "Test image alt text",
    imageUrl: "https://example.com/test-image.png",
    imageWidth: 400,
    imageHeight: 300,
    markers: [
        {
            answers: ["Choice 1"],
            label: "First marker",
            x: 25,
            y: 25,
        },
        {
            answers: ["Choice 2"],
            label: "Second marker",
            x: 50,
            y: 50,
        },
    ],
    multipleAnswers: false,
    hideChoicesFromInstructions: false,
    preferredPopoverDirection: "NONE" as PreferredPopoverDirection,
    onChange: jest.fn(),
};

describe("label-image-editor", () => {
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
        render(<LabelImageEditor {...defaultProps} />);

        expect(
            screen.getByPlaceholderText("Alt text (for screen readers)"),
        ).toBeInTheDocument();
    });

    it("should render with default props", () => {
        const onChangeMock = jest.fn();
        render(<LabelImageEditor {...defaultProps} onChange={onChangeMock} />);

        // Should render without crashing
        expect(screen.getByText("Image")).toBeInTheDocument();
    });

    it("should call onChange when image URL is changed", async () => {
        const onChangeMock = jest.fn();
        render(
            <LabelImageEditor
                {...defaultProps}
                imageUrl=""
                onChange={onChangeMock}
            />,
        );

        const imageUrlInput = screen.getByPlaceholderText("URL");
        await userEvent.type(imageUrlInput, "a");

        // Check onChange was called with the new URL
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                imageUrl: "a",
            }),
        );
    });

    it("should call onChange when alt text is changed", async () => {
        const onChangeMock = jest.fn();
        render(
            <LabelImageEditor
                {...defaultProps}
                imageAlt=""
                onChange={onChangeMock}
            />,
        );

        const altInput = screen.getByPlaceholderText(
            "Alt text (for screen readers)",
        );
        await userEvent.type(altInput, "a");

        // Check onChange was called
        expect(onChangeMock).toHaveBeenCalledWith({imageAlt: "a"});
    });

    it("should not render alt text field when no image is selected", () => {
        const onChangeMock = jest.fn();
        render(
            <LabelImageEditor
                {...defaultProps}
                imageUrl=""
                imageWidth={0}
                imageHeight={0}
                onChange={onChangeMock}
            />,
        );

        expect(
            screen.queryByPlaceholderText("Alt text (for screen readers)"),
        ).not.toBeInTheDocument();
    });

    it("serializes correctly", () => {
        const editorRef = React.createRef<LabelImageEditor>();
        const onChangeMock = jest.fn();

        render(
            <LabelImageEditor
                ref={editorRef}
                {...defaultProps}
                onChange={onChangeMock}
            />,
        );

        const serialized = editorRef.current?.serialize();

        expect(serialized).toEqual({
            choices: defaultProps.choices,
            imageAlt: defaultProps.imageAlt,
            imageUrl: defaultProps.imageUrl,
            imageWidth: defaultProps.imageWidth,
            imageHeight: defaultProps.imageHeight,
            markers: defaultProps.markers,
            multipleAnswers: defaultProps.multipleAnswers,
            hideChoicesFromInstructions:
                defaultProps.hideChoicesFromInstructions,
            preferredPopoverDirection: defaultProps.preferredPopoverDirection,
        });
    });

    it("should not allow markers to be added when editingDisabled is true", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <LabelImageEditor
                {...defaultProps}
                onChange={onChangeMock}
                apiOptions={{editingDisabled: true}}
            />,
        );

        // Act
        // Double click on the image to add a marker
        await userEvent.dblClick(screen.getByRole("presentation"));

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    describe("popover direction snapshots", () => {
        it("should render with UP popover direction", () => {
            const {container} = render(
                <LabelImageEditor
                    {...defaultProps}
                    preferredPopoverDirection="UP"
                />,
            );

            expect(container).toMatchSnapshot();
        });

        it("should render with DOWN popover direction", () => {
            const {container} = render(
                <LabelImageEditor
                    {...defaultProps}
                    preferredPopoverDirection="DOWN"
                />,
            );

            expect(container).toMatchSnapshot();
        });

        it("should render with LEFT popover direction", () => {
            const {container} = render(
                <LabelImageEditor
                    {...defaultProps}
                    preferredPopoverDirection="LEFT"
                />,
            );

            expect(container).toMatchSnapshot();
        });

        it("should render with RIGHT popover direction", () => {
            const {container} = render(
                <LabelImageEditor
                    {...defaultProps}
                    preferredPopoverDirection="RIGHT"
                />,
            );

            expect(container).toMatchSnapshot();
        });

        it("should render with NONE popover direction", () => {
            const {container} = render(
                <LabelImageEditor
                    {...defaultProps}
                    preferredPopoverDirection="NONE"
                />,
            );

            expect(container).toMatchSnapshot();
        });
    });

    describe("getSaveWarnings", () => {
        it("should return warning when there are fewer than 2 choices", () => {
            const editorRef = React.createRef<LabelImageEditor>();
            const onChangeMock = jest.fn();

            render(
                <LabelImageEditor
                    ref={editorRef}
                    {...defaultProps}
                    choices={["Choice 1"]}
                    onChange={onChangeMock}
                />,
            );

            const warnings = editorRef.current?.getSaveWarnings();

            expect(warnings).toContain(
                "Question requires at least two answer choices",
            );
        });

        it("should return warning when image URL is not specified", () => {
            const editorRef = React.createRef<LabelImageEditor>();
            const onChangeMock = jest.fn();

            render(
                <LabelImageEditor
                    ref={editorRef}
                    {...defaultProps}
                    imageUrl=""
                    onChange={onChangeMock}
                />,
            );

            const warnings = editorRef.current?.getSaveWarnings();

            expect(warnings).toContain("Image is not specified for question");
        });

        it("should return warning when image has no alt text", () => {
            const editorRef = React.createRef<LabelImageEditor>();
            const onChangeMock = jest.fn();

            render(
                <LabelImageEditor
                    ref={editorRef}
                    {...defaultProps}
                    imageAlt=""
                    onChange={onChangeMock}
                />,
            );

            const warnings = editorRef.current?.getSaveWarnings();

            expect(warnings).toContain("Question image has no alt text");
        });

        it("should return warning when there are no markers", () => {
            const editorRef = React.createRef<LabelImageEditor>();
            const onChangeMock = jest.fn();

            render(
                <LabelImageEditor
                    ref={editorRef}
                    {...defaultProps}
                    markers={[]}
                    onChange={onChangeMock}
                />,
            );

            const warnings = editorRef.current?.getSaveWarnings();

            expect(warnings).toContain(
                "Question has no markers, to label answers on image",
            );
        });

        it("should return warning when markers have no answers", () => {
            const editorRef = React.createRef<LabelImageEditor>();
            const onChangeMock = jest.fn();

            render(
                <LabelImageEditor
                    ref={editorRef}
                    {...defaultProps}
                    markers={[
                        {
                            answers: [],
                            label: "First marker",
                            x: 25,
                            y: 25,
                        },
                    ]}
                    onChange={onChangeMock}
                />,
            );

            const warnings = editorRef.current?.getSaveWarnings();

            expect(warnings).toContain(
                "Question has 1 markers with no answers selected",
            );
        });

        it("should return warning when markers have no ARIA label", () => {
            const editorRef = React.createRef<LabelImageEditor>();
            const onChangeMock = jest.fn();

            render(
                <LabelImageEditor
                    ref={editorRef}
                    {...defaultProps}
                    markers={[
                        {
                            answers: ["Choice 1"],
                            label: "",
                            x: 25,
                            y: 25,
                        },
                    ]}
                    onChange={onChangeMock}
                />,
            );

            const warnings = editorRef.current?.getSaveWarnings();

            expect(warnings).toContain(
                "Question has 1 markers with no ARIA label",
            );
        });

        it("should return multiple warnings when multiple issues exist", () => {
            const editorRef = React.createRef<LabelImageEditor>();
            const onChangeMock = jest.fn();

            render(
                <LabelImageEditor
                    ref={editorRef}
                    {...defaultProps}
                    choices={["Choice 1"]}
                    imageAlt=""
                    markers={[]}
                    onChange={onChangeMock}
                />,
            );

            const warnings = editorRef.current?.getSaveWarnings();

            expect(warnings).toHaveLength(3);
            expect(warnings).toContain(
                "Question requires at least two answer choices",
            );
            expect(warnings).toContain("Question image has no alt text");
            expect(warnings).toContain(
                "Question has no markers, to label answers on image",
            );
        });

        it("should return no warnings when all fields are valid", () => {
            const editorRef = React.createRef<LabelImageEditor>();
            const onChangeMock = jest.fn();

            render(
                <LabelImageEditor
                    ref={editorRef}
                    {...defaultProps}
                    onChange={onChangeMock}
                />,
            );

            const warnings = editorRef.current?.getSaveWarnings();

            expect(warnings).toHaveLength(0);
        });
    });
});
