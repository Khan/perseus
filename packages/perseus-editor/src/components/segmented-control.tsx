import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import styles from "./segmented-control.module.css";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

interface ToggleButtonProps {
    selected: boolean;
    onClick: () => void;
    disabled?: boolean;
    role?: "radio" | "checkbox";
    "aria-label"?: string;
    children: React.ReactNode;
    style?: StyleType;
}

/**
 * A single selectable segment. Built on Wonder Blocks `Clickable` (the same
 * primitive `Pill` uses) so it gets focus handling and a real `disabled` /
 * `aria-disabled` state for free, while letting us render arbitrary children
 * (math, icons) and set a `radio`/`checkbox` role.
 *
 * Disabled styling intentionally uses the WB disabled tokens so it reads as
 * disabled consistently with the rest of the design system (no opacity hack).
 */
function ToggleButton({
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
            className={styles.segment}
            style={style}
        >
            {() => children}
        </Clickable>
    );
}

interface Option {
    value: string;
    label: React.ReactNode;
    ariaLabel?: string;
}

interface SegmentedControlProps {
    options: ReadonlyArray<Option>;
    selectedValue: string | null | undefined;
    onChange: (value: string) => void;
    disabled?: boolean;
    "aria-label"?: string;
}

/**
 * A row of mutually-exclusive (single-select) segments — a segmented control.
 * Replaces the deprecated `Pill`-as-button pattern. Pass `disabled` to disable
 * the whole group (e.g. `editingDisabled`).
 */
export function SegmentedControl({
    options,
    selectedValue,
    onChange,
    disabled = false,
    "aria-label": ariaLabel,
}: SegmentedControlProps): React.ReactElement {
    return (
        <View role="radiogroup" aria-label={ariaLabel} className={styles.group}>
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

interface ToggleButtonGroupProps {
    options: ReadonlyArray<Option>;
    selectedValues: ReadonlyArray<string>;
    onToggle: (value: string) => void;
    disabled?: boolean;
    "aria-label"?: string;
}

/**
 * A group of independent (multi-select) toggles — i.e. a set of checkboxes
 * styled as buttons. Unlike `SegmentedControl`, more than one can be selected,
 * and the group wraps onto multiple rows as an aligned grid (consistent row and
 * column gaps) when it doesn't fit on one line. `onToggle` is called with the
 * value that was clicked; the caller flips it in/out of `selectedValues`.
 */
export function ToggleButtonGroup({
    options,
    selectedValues,
    onToggle,
    disabled = false,
    "aria-label": ariaLabel,
}: ToggleButtonGroupProps): React.ReactElement {
    return (
        <View role="group" aria-label={ariaLabel} className={styles.wrapGroup}>
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
