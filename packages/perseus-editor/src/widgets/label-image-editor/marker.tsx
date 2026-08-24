/**
 * Controlled editor image marker on the question image.
 *
 * Allows to select which label choices are the answers for each marker, using
 * the dropdown component.
 */

import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import Option, {OptionGroup} from "../../components/dropdown-option";
import FormWrappedTextField from "../../components/form-wrapped-text-field";

import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";

type MarkerProps = PerseusLabelImageWidgetOptions["markers"][number] & {
    // The list of possible answer choices.
    choices: PerseusLabelImageWidgetOptions["choices"];
    // Whether the answer choices dropdown is shown. Owned by QuestionMarkers
    // rather than this component, so that opening one marker's dropdown closes
    // whichever one was already open.
    opened: boolean;
    // Callback for when the user opens or closes the dropdown.
    onOpenedChange: (opened: boolean) => void;
    // Callback for when any of the marker props are changed.
    onChange: (
        marker: PerseusLabelImageWidgetOptions["markers"][number],
    ) => void;
    // Callback to remove marker from the question image.
    onRemove: () => void;
};

class Marker extends React.Component<MarkerProps> {
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
        this.props.onOpenedChange(!this.props.opened);
    };

    handleCloseDropdown: () => void = () => {
        this.props.onOpenedChange(false);
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
        const {answers, choices, label, onRemove, opened, x, y} = this.props;

        const markerDescription =
            "Click to select marker answers or to delete marker. " +
            "Repositioning marker is not implemented.";

        return (
            <Popover
                // Controlled, so that QuestionMarkers can keep at most one
                // marker's dropdown open at a time.
                opened={opened}
                onClose={this.handleCloseDropdown}
                dismissEnabled
                aria-label="Marker answers"
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
                <button
                    type="button"
                    aria-label={markerDescription}
                    className={css(
                        styles.marker,
                        answers.length > 0 && styles.markerWithAnswers,
                        opened && styles.markerSelected,
                    )}
                    onClick={this.handleToggleDropdown}
                    style={{
                        // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: authored LTR image coordinates; content doesn't flip with page direction, so converting to logical insets would misplace/misalign the marker in RTL
                        left: `${x}%`,
                        // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: authored LTR image coordinates; content doesn't flip with page direction, so converting to logical insets would misplace/misalign the marker in RTL
                        top: `${y}%`,
                    }}
                    title={markerDescription}
                />
            </Popover>
        );
    }
}

const styles = StyleSheet.create({
    marker: {
        position: "absolute",

        boxSizing: "content-box",

        // The marker is a <button>, so it has to opt out of the user agent's
        // button chrome. `padding` is load-bearing: Chrome applies
        // `padding: 1px 6px`, which `content-box` adds on top of the width and
        // height below, rendering the marker 32x22 instead of a 20px circle.
        appearance: "none",
        padding: 0,

        width: 16,
        height: 16,
        // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y centering on an authored LTR image coordinate; content doesn't flip with page direction, so a logical margin would misplace/misalign the marker in RTL
        marginLeft: -8,
        // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y centering on an authored LTR image coordinate; content doesn't flip with page direction, so a logical margin would misplace/misalign the marker in RTL
        marginTop: -8,

        cursor: "pointer",

        background:
            "linear-gradient(to bottom, rgba(33, 36, 44, 0.2), rgba(33, 36, 44, 0.5))",

        border: `solid 2px ${semanticColor.core.background.base.default}`,
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

            border: `solid 2px ${semanticColor.core.background.base.default}`,
            borderRadius: 20,
        },
    },

    markerWithAnswers: {
        background: semanticColor.core.background.instructive.default,
    },

    // PopoverContentCore supplies the card itself (background, border, radius,
    // shadow) and Popover positions it, so this only handles the menu layout
    // inside it.
    dropdownBody: {
        // PopoverContentCore defaults to 24px of padding. The options draw
        // their own inline padding and need to highlight edge to edge on
        // hover, so the menu opts out of it entirely.
        padding: 0,

        // The options' checkmarks are absolutely positioned, so the menu has to
        // be their containing block to keep them at the menu's inline start.
        // Without this they'd resolve against the popper wrapper instead.
        position: "relative",

        maxBlockSize: 320,
        // PopoverContentCore hides overflow, so a long choice list needs its
        // own scroll container or it gets silently clipped.
        overflowY: "auto",
    },

    labelContainer: {
        padding: 4,
    },

    dividerHorizontal: {
        height: 0,
        margin: 0,

        border: `solid ${semanticColor.core.border.neutral.default}`,
        borderWidth: "0 0 1px",

        boxShadow: "none",
    },
});

export default Marker;
