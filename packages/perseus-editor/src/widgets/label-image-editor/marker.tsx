/**
 * Controlled editor image marker on the question image.
 *
 * Allows to select which label choices are the answers for each marker, using
 * the dropdown component.
 */

import Button from "@khanacademy/wonder-blocks-button";
import {Listbox, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

// Wonder Blocks Listbox's onChange allows a single value, nullish entries,
// and an array. The type isn't exported from the package, so we need
// to derive it here.)
type ListboxSelection = Parameters<
    NonNullable<PropsFor<typeof Listbox>["onChange"]>
>[0];

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

    function handleToggleAnswer(selectedValues: ListboxSelection) {
        // Listbox allows for single, array, or nullish selections, but we only
        // ever use an array for the "multiple" type listbox here.
        const values = Array.isArray(selectedValues)
            ? selectedValues
            : [selectedValues];

        updateAnswers(values.filter((value) => value != null));
    }

    function handleLabelChange(value: string) {
        onChange({answers, label: value, x, y});
    }

    return (
        <Popover
            opened={showDropdown}
            onClose={() => setShowDropdown(false)}
            dismissEnabled={true}
            content={
                <PopoverContentCore style={styles.dropdownBody}>
                    <div className={css(styles.labelContainer)}>
                        <TextField
                            placeholder="ARIA label (for screen readers)"
                            onChange={handleLabelChange}
                            value={label}
                        />
                    </div>
                    <hr className={css(styles.dividerHorizontal)} />
                    <Listbox
                        aria-label="Answer choices"
                        onChange={handleToggleAnswer}
                        selectionType="multiple"
                        value={answers}
                    >
                        {choices.map((choice) => (
                            <OptionItem
                                key={choice}
                                value={choice}
                                label={choice}
                            />
                        ))}
                    </Listbox>
                    <hr className={css(styles.dividerHorizontal)} />
                    <Button
                        kind="tertiary"
                        actionType="destructive"
                        onClick={onRemove}
                    >
                        Delete marker
                    </Button>
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

        width: sizing.size_160,
        height: sizing.size_160,

        // Keep the marker centered on its specified coordinate.
        transform: "translate(-50%, -50%)",

        cursor: "pointer",

        background:
            "linear-gradient(to bottom, rgba(33, 36, 44, 0.2), rgba(33, 36, 44, 0.5))",

        border: `solid 2px ${semanticColor.core.background.base.default}`,
        borderRadius: sizing.size_160,

        boxShadow: "0 2px 10px 0 rgba(33, 36, 44, 0.1)",
    },

    markerSelected: {
        width: sizing.size_280,
        height: sizing.size_280,

        border: "none",
        borderRadius: sizing.size_280,

        // Render selected marker border as inset.
        "::before": {
            content: "''",
            display: "block",

            width: sizing.size_200,
            height: sizing.size_200,
            marginInlineStart: sizing.size_020,

            border: `solid 2px ${semanticColor.core.background.base.default}`,
            borderRadius: sizing.size_200,
        },
    },

    markerWithAnswers: {
        background: semanticColor.core.background.instructive.default,
    },

    labelContainer: {
        padding: sizing.size_060,
    },

    dividerHorizontal: {
        height: 0,
        margin: 0,

        border: `solid ${semanticColor.core.border.neutral.default}`,
        borderWidth: "0 0 1px",

        boxShadow: "none",
    },

    dropdownBody: {
        // Reset the default padding from WB Popover.
        padding: 0,
    },
});

export default Marker;
