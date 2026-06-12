import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

/**
 * A single selectable segment. Built on Wonder Blocks `Clickable` (the same
 * primitive `Pill` uses) so it gets focus handling and a real `disabled` /
 * `aria-disabled` state for free, while letting us render arbitrary children
 * (math, icons) and set a `radio`/`checkbox` role.
 *
 * Disabled styling intentionally uses the WB disabled tokens so it reads as
 * disabled consistently with the rest of the design system (no opacity hack).
 */
type ToggleButtonProps = {
    selected: boolean;
    onClick: () => void;
    disabled?: boolean;
    role?: "radio" | "checkbox";
    "aria-label"?: string;
    children: React.ReactNode;
    style?: StyleType;
};

export function ToggleButton({
    selected,
    onClick,
    disabled = false,
    role = "radio",
    children,
    style,
    "aria-label": ariaLabel,
}: ToggleButtonProps): React.ReactElement {
    return (
        <Clickable
            role={role}
            aria-checked={selected}
            aria-label={ariaLabel}
            disabled={disabled}
            onClick={onClick}
            style={[styles.reset, style]}
        >
            {({hovered, pressed}) => (
                <View
                    style={[
                        styles.segment,
                        selected && styles.segmentSelected,
                        !disabled &&
                            !selected &&
                            (hovered || pressed) &&
                            styles.segmentHovered,
                        disabled && styles.segmentDisabled,
                        disabled && selected && styles.segmentDisabledSelected,
                    ]}
                >
                    {children}
                </View>
            )}
        </Clickable>
    );
}

/**
 * A row of mutually-exclusive (single-select) segments — a segmented control.
 * Replaces the deprecated `Pill`-as-button pattern. Pass `disabled` to disable
 * the whole group (e.g. `editingDisabled`).
 */
type Option = {
    value: string;
    label: React.ReactNode;
    ariaLabel?: string;
};

type SegmentedControlProps = {
    options: ReadonlyArray<Option>;
    selectedValue: string | null | undefined;
    onChange: (value: string) => void;
    disabled?: boolean;
    "aria-label"?: string;
};

export function SegmentedControl({
    options,
    selectedValue,
    onChange,
    disabled = false,
    "aria-label": ariaLabel,
}: SegmentedControlProps): React.ReactElement {
    return (
        <View role="radiogroup" aria-label={ariaLabel} style={styles.group}>
            {options.map((option) => (
                <ToggleButton
                    key={option.value}
                    role="radio"
                    selected={option.value === selectedValue}
                    aria-label={option.ariaLabel}
                    disabled={disabled}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </ToggleButton>
            ))}
        </View>
    );
}

/**
 * A group of independent (multi-select) toggles — i.e. a set of checkboxes
 * styled as buttons. Unlike `SegmentedControl`, more than one can be selected,
 * and the group wraps onto multiple rows as an aligned grid (consistent row and
 * column gaps) when it doesn't fit on one line. `onToggle` is called with the
 * value that was clicked; the caller flips it in/out of `selectedValues`.
 */
type ToggleButtonGroupProps = {
    options: ReadonlyArray<Option>;
    selectedValues: ReadonlyArray<string>;
    onToggle: (value: string) => void;
    disabled?: boolean;
    "aria-label"?: string;
};

export function ToggleButtonGroup({
    options,
    selectedValues,
    onToggle,
    disabled = false,
    "aria-label": ariaLabel,
}: ToggleButtonGroupProps): React.ReactElement {
    return (
        <View role="group" aria-label={ariaLabel} style={styles.wrapGroup}>
            {options.map((option) => (
                <ToggleButton
                    key={option.value}
                    role="checkbox"
                    selected={selectedValues.includes(option.value)}
                    aria-label={option.ariaLabel}
                    disabled={disabled}
                    onClick={() => onToggle(option.value)}
                >
                    {option.label}
                </ToggleButton>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    // inline-flex so the (single-select) group flows inline with adjacent
    // labels/badges (e.g. the "Status" label) instead of wrapping onto its own
    // line. It stays cohesive — its segments never split across lines; the whole
    // group wraps below the label as a unit if there isn't room.
    group: {
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        verticalAlign: "middle",
        gap: sizing.size_080,
    },
    // Multi-select group: wraps onto multiple rows as an aligned grid with
    // consistent row + column gaps. Stretch to the full available width so it
    // only wraps when the segments genuinely don't fit on one line (not because
    // a flex parent shrank it to content width).
    wrapGroup: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        alignSelf: "stretch",
        gap: sizing.size_080,
    },
    // Reset the Clickable's native <button> chrome; the visual lives on the
    // inner View so it can react to hovered/pressed state. The keyboard focus
    // ring is a rounded box-shadow (follows the border radius, unlike `outline`)
    // shown only on `:focus-visible` so it doesn't appear after a mouse click.
    reset: {
        borderRadius: border.radius.radius_040,
        ":focus-visible": {
            outline: "none",
            boxShadow: `0 0 0 ${border.width.medium} ${semanticColor.focus.outer}`,
        },
    },
    segment: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingBlock: sizing.size_040,
        paddingInline: sizing.size_120,
        borderRadius: border.radius.radius_040,
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        backgroundColor: semanticColor.core.background.base.default,
        color: semanticColor.core.foreground.neutral.strong,
        fontSize: font.body.size.small,
        lineHeight: font.body.lineHeight.small,
        whiteSpace: "nowrap",
    },
    segmentSelected: {
        backgroundColor: semanticColor.core.background.instructive.default,
        borderColor: semanticColor.core.background.instructive.default,
        color: semanticColor.core.foreground.knockout.default,
    },
    segmentHovered: {
        borderColor: semanticColor.core.border.neutral.default,
        backgroundColor: semanticColor.core.background.neutral.subtle,
    },
    segmentDisabled: {
        backgroundColor: semanticColor.core.background.disabled.subtle,
        borderColor: semanticColor.core.border.disabled.default,
        color: semanticColor.core.foreground.disabled.default,
        cursor: "not-allowed",
    },
    segmentDisabledSelected: {
        backgroundColor: semanticColor.core.background.disabled.strong,
        borderColor: semanticColor.core.background.disabled.strong,
        color: semanticColor.core.foreground.disabled.strong,
    },
});
