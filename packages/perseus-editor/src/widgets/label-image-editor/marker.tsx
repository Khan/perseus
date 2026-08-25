/**
 * Controlled editor image marker on the question image.
 *
 * Allows to select which label choices are the answers for each marker, using
 * a multi-select listbox inside a popover.
 */

import Button from "@khanacademy/wonder-blocks-button";
import {Listbox, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {useCallback, useEffect, useRef} from "react";

import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";

type MarkerProps = PerseusLabelImageWidgetOptions["markers"][number] & {
    // The list of possible answer choices.
    choices: PerseusLabelImageWidgetOptions["choices"];
    // Whether a marker may have more than one answer. Mirrors the widget
    // option of the same name, so that authors can't build a multi-answer
    // marker that isn't specified as such.
    multipleAnswers: boolean;
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

const markerDescription =
    "Click to select marker answers or to delete marker. " +
    "Repositioning marker is not implemented.";

function Marker({
    answers,
    choices,
    label,
    multipleAnswers,
    onChange,
    onOpenedChange,
    onRemove,
    opened,
    x,
    y,
}: MarkerProps) {
    // The marker is edited as a whole, so every change reports the untouched
    // fields alongside the changed one.
    const updateMarker = useCallback(
        (
            changes: Partial<PerseusLabelImageWidgetOptions["markers"][number]>,
        ) => {
            onChange({answers, label, x, y, ...changes});
        },
        [answers, label, onChange, x, y],
    );

    // Exclude those answers that are no longer present in choices. `filter`
    // keeps the surviving answers in order, so a shorter list is the only way
    // the two can differ.
    const isFirstRender = useRef(true);
    useEffect(() => {
        // Pruning belongs to props *changing*, not to the marker appearing: a
        // marker that mounts with stale answers reports no change until the
        // author edits something, which is what the class version did from
        // `UNSAFE_componentWillReceiveProps` (never called on mount).
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const filteredAnswers = answers.filter((answer) =>
            choices.includes(answer),
        );

        if (filteredAnswers.length !== answers.length) {
            updateMarker({answers: filteredAnswers});
        }
    }, [answers, choices, updateMarker]);

    // Listbox reports the whole selection rather than the toggled item, so
    // there's no merging to do here. Multi-select hands back an array and
    // single-select a bare value, so normalise both to the answers list.
    const handleAnswersChange = (
        value: string | null | undefined | Array<string | null | undefined>,
    ) => {
        const values = Array.isArray(value) ? value : [value];

        updateMarker({
            answers: values.filter(
                (answer): answer is string => answer != null,
            ),
        });
    };

    return (
        <Popover
            // Controlled, so that QuestionMarkers can keep at most one
            // marker's dropdown open at a time.
            opened={opened}
            onClose={() => onOpenedChange(false)}
            dismissEnabled
            aria-label="Marker answers"
            content={
                <PopoverContentCore style={styles.dropdownBody}>
                    {/* Deleting the marker is a command, not one of the
                        answers, so it lives outside the listbox. */}
                    <div className={css(styles.actionContainer)}>
                        <Button
                            kind="tertiary"
                            actionType="destructive"
                            size="small"
                            onClick={onRemove}
                        >
                            Delete marker
                        </Button>
                    </div>

                    <hr className={css(styles.dividerHorizontal)} />

                    {/* An empty listbox would crash: it renders
                        `aria-activedescendant` from its focused option,
                        and there is no option at index 0 to read an id
                        from once it takes focus. */}
                    {choices.length > 0 && (
                        <Listbox
                            // Listbox seeds its selection from `value` on
                            // mount and never re-reads the prop, so remount
                            // it whenever the choices change to keep the
                            // checkmarks in step with the pruned answers.
                            key={choices.join(" ")}
                            aria-label="Answer choices"
                            // Also swaps the affordance: checkboxes for
                            // multi-select, checkmarks for single.
                            selectionType={
                                multipleAnswers ? "multiple" : "single"
                            }
                            // A marker authored while multiple answers were
                            // allowed keeps showing all of them until the
                            // author picks one, rather than silently losing
                            // the extras the moment the option is turned
                            // off. Listbox collapses the selection to the
                            // clicked value on the next single-select
                            // change.
                            value={answers}
                            onChange={handleAnswersChange}
                        >
                            {choices.map((choice) => (
                                <OptionItem
                                    key={choice}
                                    label={choice}
                                    value={choice}
                                />
                            ))}
                        </Listbox>
                    )}

                    <div className={css(styles.labelContainer)}>
                        <TextField
                            placeholder="ARIA label (for screen readers)"
                            onChange={(newValue) =>
                                updateMarker({label: newValue})
                            }
                            value={label}
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
                onClick={() => onOpenedChange(!opened)}
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

        width: sizing.size_160,
        height: sizing.size_160,
        marginInlineStart: `calc(-1 * ${sizing.size_080})`,
        marginBlockStart: `calc(-1 * ${sizing.size_080})`,

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
        marginInlineStart: `calc(-1 * ${sizing.size_120})`,
        marginBlockStart: `calc(-1 * ${sizing.size_120})`,

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

    // PopoverContentCore supplies the card itself (background, border, radius,
    // shadow) and Popover positions it, so this only handles the menu layout
    // inside it.
    dropdownBody: {
        // PopoverContentCore defaults to 24px of padding. Listbox draws its own
        // padding and its options need to highlight edge to edge on hover, so
        // the menu opts out of it entirely and the other sections pad
        // themselves.
        padding: 0,

        // PopoverContentCore hides overflow, so a long choice list needs its
        // own scroll container or it gets silently clipped.
        overflowY: "auto",
    },

    actionContainer: {
        padding: sizing.size_040,
    },

    labelContainer: {
        // Extra space for the text field outline.
        padding: sizing.size_060,
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
