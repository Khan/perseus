/**
 * Controlled list of answer choices, supports arrow key navigation.
 *
 * Enables single or multiple answers selection, using radio or checkbox input
 * types, respectively.
 */

import Color from "@khanacademy/wonder-blocks-color";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import Icon from "../../components/icon";
import {iconCheckMedium} from "../../icon-paths";
import Renderer from "../../renderer";
import sharedStyles from "../../styles/shared";

export type AnswerType = {
    // The answer string, can be plain text or a KaTeX expression.
    content: string;
    // Whether the answer is selected.
    checked: boolean;
};

type AnswerProps = AnswerType & {
    // The input control type to use.
    inputType: "checkbox" | "radio";
    // The radio group name.
    groupName: string;
    // The answer position within choices.
    index: number;
    // Callback to handle change to answer selection.
    onChange: (checked: boolean) => void;
    // Callbacks to handle navigating between adjacent answers.
    onFocusPrevAnswer: () => void;
    onFocusNextAnswer: () => void;
};

type AnswerState = {
    // Whether answer is currently focused.
    isInputFocused: boolean;
};

type AnswerChoicesProps = {
    // The list of possible answers in a specific order.
    choices: ReadonlyArray<AnswerType>;
    // Whether multiple answers may be chosen.
    multipleSelect: boolean;
    // Callback to handle change to answer choices selection.
    onChange: (selection: ReadonlyArray<boolean>) => void;
};

type AnswerChoicesState = {
    // Globally unique radio group name.
    groupName: string;
};

class AnswerChoice extends React.Component<AnswerProps, AnswerState> {
    // The radio button or checkbox input control.
    _input: HTMLInputElement | null | undefined;

    state: AnswerState = {
        isInputFocused: false,
    };

    focusInput() {
        if (this._input) {
            this._input.focus();
        }
    }

    handleClick(e: React.MouseEvent<HTMLDivElement>) {
        const {checked, onChange} = this.props;

        e.preventDefault();

        // We manually handle clicks, setting focus on the input control.
        this.focusInput();

        // And toggling the answer selection state.
        onChange(!checked);
    }

    handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        const {onFocusPrevAnswer, onFocusNextAnswer} = this.props;

        // This may override built-in browser arrow key navigation for radio
        // group. Checkbox fieldset does not have such built-in capability,
        // thus we do this manually for both input types.
        switch (e.key) {
            case "ArrowUp":
                e.preventDefault();
                onFocusPrevAnswer();
                break;

            case "ArrowDown":
                e.preventDefault();
                onFocusNextAnswer();
                break;
        }
    }

    handleInputChange(e: React.SyntheticEvent<HTMLInputElement>) {
        // Prevent answer selection from double-toggling, as `handleClick` is
        // handling changes to selection state.
        e.preventDefault();
    }

    handleInputFocus() {
        this.setState({isInputFocused: true});
    }

    handleInputBlur() {
        this.setState({isInputFocused: false});
    }

    renderCheckmark(): React.ReactNode {
        const {checked} = this.props;

        return (
            <span className={css(styles.checkmarkContainer)}>
                {checked && (
                    <Icon
                        icon={iconCheckMedium}
                        size={16}
                        color={Color.offBlack}
                    />
                )}
            </span>
        );
    }

    render(): React.ReactElement {
        const {content, checked, groupName, index, inputType} = this.props;

        const {isInputFocused} = this.state;

        const answerId = `${groupName}-${index}`;

        return (
            <div
                className={css(
                    styles.answerChoice,
                    isInputFocused && styles.answerFocused,
                )}
                onClick={(e) => this.handleClick(e)}
                onKeyDown={(e) => this.handleKeyDown(e)}
            >
                <span className={css(styles.answerInputWrapper)}>
                    <input
                        className={css(sharedStyles.perseusSrOnly)}
                        checked={checked}
                        name={groupName}
                        id={answerId}
                        type={inputType}
                        onChange={(e) => this.handleInputChange(e)}
                        onFocus={() => this.handleInputFocus()}
                        onBlur={() => this.handleInputBlur()}
                        ref={(node) => (this._input = node)}
                    />

                    {this.renderCheckmark()}
                </span>

                <label htmlFor={answerId}>
                    <Renderer content={content} />
                </label>
            </div>
        );
    }
}

export default class AnswerChoices extends React.Component<
    AnswerChoicesProps,
    AnswerChoicesState
> {
    // The rendered answers elements.
    _choices: Array<AnswerChoice | null | undefined>;

    constructor(props: AnswerChoicesProps) {
        super(props);

        this._choices = [];

        this.state = {
            groupName: _.uniqueId("answer_choices_"),
        };
    }

    focusAnswer(index = 0) {
        const numChoices = this.props.choices.length;

        // Wrap the index if necessary.
        if (index < 0) {
            index += numChoices;
        } else if (index >= numChoices) {
            index -= numChoices;
        }

        const choice = this._choices[index];

        if (choice) {
            choice.focusInput();
        }
    }

    onAnswerChange(index: number, checked: boolean) {
        const {choices, multipleSelect, onChange} = this.props;

        const selection: Array<boolean> = [];

        // Compile the selection state of answer choices. In single selection
        // mode (radio input type), only 0 or 1 answer may be chosen.
        for (let i = 0; i < choices.length; i++) {
            selection.push(
                multipleSelect
                    ? i === index
                        ? checked
                        : choices[i].checked
                    : i === index
                    ? checked
                    : false,
            );
        }

        onChange(selection);
    }

    onFocusAnswer(index: number) {
        this.focusAnswer(index);
    }

    render(): React.ReactElement<React.ComponentProps<"fieldset">> {
        const {choices, multipleSelect} = this.props;

        const {groupName} = this.state;

        return (
            <fieldset>
                {choices.map((choice, index) => (
                    <AnswerChoice
                        {...choice}
                        key={choice.content}
                        groupName={groupName}
                        index={index}
                        inputType={multipleSelect ? "checkbox" : "radio"}
                        onChange={(checked) =>
                            this.onAnswerChange(index, checked)
                        }
                        onFocusPrevAnswer={() => this.onFocusAnswer(index - 1)}
                        onFocusNextAnswer={() => this.onFocusAnswer(index + 1)}
                        ref={(node) => (this._choices[index] = node)}
                    />
                ))}
            </fieldset>
        );
    }
}

const styles = StyleSheet.create({
    answerChoice: {
        display: "flex",
        alignItems: "center",

        userSelect: "none",

        padding: "10px 16px 10px 0px",

        fontWeight: "bold",

        border: "solid 2px transparent",
        borderRadius: 2,

        ":active": {
            backgroundColor: "rgba(33, 36, 44, 0.08)",
        },
    },

    answerFocused: {
        borderColor: "#1865f2",

        ":active": {
            borderColor: "transparent",
        },
    },

    answerInputWrapper: {
        marginRight: 8,
    },

    checkmarkContainer: {
        display: "flex",
        position: "relative",

        width: 16,
        height: 16,

        marginLeft: 8,
    },
});
