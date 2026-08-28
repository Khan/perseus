/**
 * Controlled editor image marker on the question image.
 *
 * Allows to select which label choices are the answers for each marker, using
 * the dropdown component.
 */

import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import Option, {OptionGroup} from "../../components/dropdown-option";
import FormWrappedTextField from "../../components/form-wrapped-text-field";
import {gray85} from "../../styles/global-colors";

import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";

type MarkerProps = PerseusLabelImageWidgetOptions["markers"][number] & {
    // The list of possible answer choices.
    choices: PerseusLabelImageWidgetOptions["choices"];
    // Callback for when any of the marker props are changed.
    onChange: (
        marker: PerseusLabelImageWidgetOptions["markers"][number],
    ) => void;
    // Callback to remove marker from the question image.
    onRemove: () => void;
};

type State = {
    // Whether answer choices dropdown is shown, controlled by the user clicking
    // on the marker icon.
    showDropdown: boolean;
};

class Marker extends React.Component<MarkerProps, State> {
    state: State = {showDropdown: false};

    UNSAFE_componentWillReceiveProps(nextProps: MarkerProps) {
        const {answers} = this.props;

        // Exclude those answers that are no longer present in choices.
        const filteredAnswers = answers.filter((answer) =>
            nextProps.choices.includes(answer),
        );

        if (JSON.stringify(answers) !== JSON.stringify(filteredAnswers)) {
            // Update marker on the next frame when these props take affect.
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            setTimeout(() => this.updateAnswers(filteredAnswers));
        }
    }

    openDropdown() {
        this.setState({showDropdown: true});
    }

    updateAnswers(answers: string[]) {
        const {label, onChange, x, y} = this.props;

        onChange({
            answers,
            label,
            x,
            y,
        });
    }

    updateLabel(label: string) {
        const {answers, onChange, x, y} = this.props;

        onChange({
            answers,
            label,
            x,
            y,
        });
    }

    handleToggleDropdown: () => void = () => {
        this.setState(({showDropdown}) => ({showDropdown: !showDropdown}));
    };

    handleCloseDropdown: () => void = () => {
        this.setState({showDropdown: false});
    };

    handleLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        this.updateLabel(e.target.value);
    };

    handleSelectAnswer: (toggleAnswer: string) => void = (
        toggleAnswer: string,
    ) => {
        let {answers} = this.props;

        if (answers.includes(toggleAnswer)) {
            answers = answers.filter((answer) => answer !== toggleAnswer);
        } else {
            answers = [...answers, toggleAnswer];
        }

        this.updateAnswers(answers);
    };

    render(): React.ReactNode {
        const {answers, choices, label, onRemove, x, y} = this.props;

        const {showDropdown} = this.state;

        return (
            <Popover
                opened={showDropdown}
                onClose={this.handleCloseDropdown}
                dismissEnabled={true}
                // We need an explicit viewport padding here to prevent the
                // popover from exhibiting odd behavior in specific cases.
                //
                // Wonder Blocks derives its default viewport padding from a CSS
                // custom property at module-evaluation time, which resolves to
                // NaN if the token stylesheet hasn't been applied yet. Popper
                // then produces a NaN horizontal offset and pins the popover to
                // the left edge of the window, away from its anchor. Passing
                // the value explicitly (WB's documented default is 12px) keeps
                // the popover anchored to the marker.
                viewportPadding={12}
                content={
                    <PopoverContentCore style={styles.dropdownBody}>
                        <Option value="" onClick={() => onRemove()}>
                            Delete marker
                        </Option>

                        <hr className={css(styles.dividerHorizontal)} />

                        <OptionGroup
                            onSelected={this.handleSelectAnswer}
                            selectedValues={answers}
                        >
                            {choices.map((choice) => (
                                <Option key={choice} value={choice}>
                                    {choice}
                                </Option>
                            ))}
                        </OptionGroup>

                        <div className={css(styles.labelContainer)}>
                            <FormWrappedTextField
                                placeholder="ARIA label (for screen readers)"
                                onChange={this.handleLabelChange}
                                value={label}
                                width="100%"
                            />
                        </div>
                    </PopoverContentCore>
                }
            >
                {/*
                 * Child-as-function is needed here to allow click-outside dismissal.
                 *
                 * If we use a plain element instead, Popover wraps the child's
                 * onClick in stopPropagation, so the opening click never reaches
                 * the window listener that implements click-outside dismissal.
                 *
                 * That listener discards the first click it sees, expecting it
                 * to be the opening one, so it ends up eating the first real
                 * outside click instead of closing. The function form leaves
                 * our handler untouched.
                 */}
                {() => (
                    <button
                        type="button"
                        className={css(
                            styles.marker,
                            answers.length > 0 && styles.markerWithAnswers,
                            showDropdown && styles.markerSelected,
                        )}
                        onClick={this.handleToggleDropdown}
                        style={{
                            // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: authored LTR image coordinates; content doesn't flip with page direction, so converting to logical insets would misplace/misalign the marker in RTL
                            left: `${x}%`,
                            // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: authored LTR image coordinates; content doesn't flip with page direction, so converting to logical insets would misplace/misalign the marker in RTL
                            top: `${y}%`,
                        }}
                        title={
                            "Click to select marker answers or to delete marker. " +
                            "Repositioning marker is not implemented."
                        }
                    />
                )}
            </Popover>
        );
    }
}

const styles = StyleSheet.create({
    marker: {
        position: "absolute",

        // The marker is a <button>, so reset the user agent styles that would
        // otherwise fight the dot styling below.
        appearance: "none",
        padding: 0,

        boxSizing: "content-box",

        width: 16,
        height: 16,
        // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y centering on an authored LTR image coordinate; content doesn't flip with page direction, so a logical margin would misplace/misalign the marker in RTL
        marginLeft: -8,
        // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y centering on an authored LTR image coordinate; content doesn't flip with page direction, so a logical margin would misplace/misalign the marker in RTL
        marginTop: -8,

        cursor: "pointer",

        background:
            "linear-gradient(to bottom, rgba(33, 36, 44, 0.2), rgba(33, 36, 44, 0.5))",

        border: "solid 2px #ffffff",
        borderRadius: 16,

        boxShadow: "0 2px 10px 0 rgba(33, 36, 44, 0.1)",
    },

    markerSelected: {
        width: 28,
        height: 28,
        // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y centering on an authored LTR image coordinate; content doesn't flip with page direction, so a logical margin would misplace/misalign the marker in RTL
        marginLeft: -12,
        // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y centering on an authored LTR image coordinate; content doesn't flip with page direction, so a logical margin would misplace/misalign the marker in RTL
        marginTop: -12,

        border: "none",
        borderRadius: 28,

        // Render selected marker border as inset.
        "::before": {
            content: "''",
            display: "block",

            width: 20,
            height: 20,
            marginInlineStart: 2,

            border: "solid 2px #ffffff",
            borderRadius: 20,
        },
    },

    markerWithAnswers: {
        background: "#1865f2",
    },

    labelContainer: {
        padding: 4,
    },

    dividerHorizontal: {
        height: 0,
        margin: 0,

        border: `solid ${gray85}`,
        borderWidth: "0 0 1px",

        boxShadow: "none",
    },

    dropdownBody: {
        // Reset the default padding from WB Popover.
        padding: 0,

        overflowY: "auto",
    },
});

export default Marker;
