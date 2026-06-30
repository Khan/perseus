import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {render, screen, waitFor, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";
import {useState} from "react";

import {testDependencies} from "../../testing/test-dependencies";
import NumericInputEditor from "../numeric-input-editor";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {UserEvent} from "@testing-library/user-event";

const HarnessedEditor = React.forwardRef<
    NumericInputEditor,
    Partial<PropsFor<typeof NumericInputEditor>>
>(
    (
        {onChange = () => undefined, apiOptions = ApiOptions.defaults, ...rest},
        ref,
    ) => {
        return (
            <NumericInputEditor
                apiOptions={apiOptions}
                onChange={onChange}
                ref={ref}
                {...rest}
            />
        );
    },
);
HarnessedEditor.displayName = "Harnessed NumericInputEditor";

describe("numeric-input-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        render(<HarnessedEditor />);

        await waitFor(async () =>
            expect(
                await screen.findByText(/Add new answer/),
            ).toBeInTheDocument(),
        );
    });

    it("should be possible to select normal width", async () => {
        const onChangeMock = jest.fn();

        render(<HarnessedEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(screen.getByRole("radiogroup", {name: /^Width/})).getByRole(
                "radio",
                {name: "Normal (80px)"},
            ),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({size: "normal"}),
            undefined,
        );
    });

    it("should be possible to select small width", async () => {
        const onChangeMock = jest.fn();

        render(<HarnessedEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(screen.getByRole("radiogroup", {name: /^Width/})).getByRole(
                "radio",
                {name: "Small (40px)"},
            ),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({size: "small"}),
            undefined,
        );
    });

    it("should be possible to change text alignment", async () => {
        const onChangeMock = jest.fn();

        render(<HarnessedEditor onChange={onChangeMock} />);

        // Act
        const opener = await screen.findByRole("combobox", {
            name: "Text alignment",
        });
        await userEvent.click(opener);
        await userEvent.click(await screen.findByText("Center"));

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                textAlign: "center",
            }),
        );
    });

    it("should be possible to select coefficient", async () => {
        const onChangeMock = jest.fn();

        render(<HarnessedEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(
                screen.getByRole("radiogroup", {name: /^Number style/}),
            ).getByRole("radio", {name: "Coefficient"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith({coefficient: true});
    });

    it("should be possible to select strictly match only these formats", async () => {
        const onChangeMock = jest.fn();

        render(<HarnessedEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(
                screen.getByRole("radiogroup", {name: /^Answer formats are/}),
            ).getByRole("radio", {name: "Required"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith({
            answers: [
                {
                    answerForms: [],
                    maxError: null,
                    message: "",
                    simplify: "required",
                    status: "correct",
                    strict: true,
                    value: null,
                },
            ],
        });
    });

    it("should be possible to update label text", async () => {
        const onChangeMock = jest.fn();

        render(<HarnessedEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "aria label",
        });

        await userEvent.type(input, "a");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({labelText: "a"}),
            undefined,
        );
    });

    it("regression LEMS-2962: should be possible to have a fraction answer", async () => {
        function StatefulNumericInputEditor() {
            const [props, setProps] = useState({});

            function mergeProps(newProps) {
                setProps({
                    ...props,
                    ...newProps,
                });
            }

            return <HarnessedEditor onChange={mergeProps} {...props} />;
        }

        render(<StatefulNumericInputEditor />);

        const input = screen.getByRole("textbox", {
            name: "User input",
        });

        await userEvent.type(input, "6/8");

        expect(screen.getByText("Correct answer: 3/4")).toBeInTheDocument();
    });

    it("should be possible to set unsimplified answers to ungraded", async () => {
        const onChangeMock = jest.fn();

        render(<HarnessedEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(
                screen.getByRole("radiogroup", {
                    name: /^Unsimplified answers are/,
                }),
            ).getByRole("radio", {name: "Ungraded"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                answers: expect.arrayContaining([
                    expect.objectContaining({simplify: "required"}),
                ]),
            }),
        );
    });

    it("should be possible to set unsimplified answers to accepted", async () => {
        const onChangeMock = jest.fn();

        render(<HarnessedEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(
                screen.getByRole("radiogroup", {
                    name: /^Unsimplified answers are/,
                }),
            ).getByRole("radio", {name: "Accepted"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                answers: expect.arrayContaining([
                    expect.objectContaining({simplify: "optional"}),
                ]),
            }),
        );
    });

    it("should be possible to set unsimplified answers to wrong", async () => {
        const onChangeMock = jest.fn();

        render(<HarnessedEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(
                screen.getByRole("radiogroup", {
                    name: /^Unsimplified answers are/,
                }),
            ).getByRole("radio", {name: "Wrong"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                answers: expect.arrayContaining([
                    expect.objectContaining({simplify: "enforced"}),
                ]),
            }),
        );
    });

    const answerFormats = {
        integer: "Integers",
        decimal: "Decimals",
        proper: "Proper fractions",
        improper: "Improper fractions",
        mixed: "Mixed numbers",
        pi: "Numbers with π",
    };

    Object.entries(answerFormats).forEach(([key, name]) => {
        it(`should be possible to set suggested answer format to: ${name}`, async () => {
            const onChangeMock = jest.fn();

            render(<HarnessedEditor onChange={onChangeMock} />);

            await userEvent.click(screen.getByRole("checkbox", {name: name}));

            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    answers: expect.arrayContaining([
                        expect.objectContaining({answerForms: [key]}),
                    ]),
                }),
            );
        });
    });
});
