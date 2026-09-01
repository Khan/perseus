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

// The imperative API that consumers drive via a ref.
export type MarkerHandle = {
    // Imperative way to open the dropdown externally.
    // TODO: Replace with declarative API.
    openDropdown: () => void;
};

const Marker = React.forwardRef<MarkerHandle, MarkerProps>(function Marker(
    {answers, choices, label, onChange, onRemove, x, y},
    ref,
) {
    const [showDropdown, setShowDropdown] = React.useState(false);

    React.useImperativeHandle(
        ref,
        () => ({
            openDropdown: () => setShowDropdown(true),
        }),
        [],
    );

    function updateAnswers(answers: string[]) {
        onChange({answers, label, x, y});
    }

    // Answer choices can be renamed or deleted at any time, which would leave
    // this marker pointing at a choice that no longer exists. Prune those so we
    // never serialize an answer that can't be matched.
    React.useEffect(() => {
        const filteredAnswers = answers.filter((answer) =>
            choices.includes(answer),
        );

        if (JSON.stringify(answers) !== JSON.stringify(filteredAnswers)) {
            updateAnswers(filteredAnswers);
        }
    });

    function handleToggleAnswer(toggleAnswer: string) {
        updateAnswers(
            answers.includes(toggleAnswer)
                ? answers.filter((answer) => answer !== toggleAnswer)
                : [...answers, toggleAnswer],
        );
    }

    function handleLabelChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange({answers, label: e.target.value, x, y});
    }

    return (
        <Popover
            opened={showDropdown}
            onClose={() => setShowDropdown(false)}
            dismissEnabled={true}
            content={
                <PopoverContentCore style={styles.dropdownBody}>
                    <Option value="" onClick={() => onRemove()}>
                        Delete marker
                    </Option>

                    <hr className={css(styles.dividerHorizontal)} />

                    <OptionGroup
                        onSelected={handleToggleAnswer}
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
                            onChange={handleLabelChange}
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
                    aria-label={
                        label
                            ? `Edit marker: ${label}`
                            : "Edit unlabeled marker"
                    }
                    className={css(
                        styles.marker,
                        answers.length > 0 && styles.markerWithAnswers,
                        showDropdown && styles.markerSelected,
                    )}
                    onClick={() => setShowDropdown((opened) => !opened)}
                    style={{
                        // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: authored LTR image coordinates; content doesn't flip with page direction, so converting to logical insets would misplace/misalign the marker in RTL
                        left: `${x}%`,
                        // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: authored LTR image coordinates; content doesn't flip with page direction, so converting to logical insets would misplace/misalign the marker in RTL
                        top: `${y}%`,
                    }}
                />
            )}
        </Popover>
    );
});

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
