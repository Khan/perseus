/* eslint-disable @khanacademy/ts-no-error-suppressions */
/**
 * Reusable checkbox component.
 **/
import {color} from "@khanacademy/wonder-blocks-tokens";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";

import {gray41, gray68} from "../styles/global-colors";

import HoverBehavior from "./hover-behavior";

type CheckboxProps = {
    // Whether or not the checkbox is checked.  The parent responsible for
    // responding to onChange events and updating this prop appropriately.
    checked: boolean;
    // When disable the checkbox will appear faded out and will not
    // respond to events and cannot be tabbed to.
    disabled?: boolean;
    // Appear as if disabled but allow it to respond to events and be
    // tabbed to.
    // This allows us to hook alternate responses into clicking on a
    // disabled checkbox.
    appearDisabled?: boolean;
    // Called when the value has changed.
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tabIndex?: number | string;
    style?: {
        marginTop: number;
    };
    // For e2e test
    dataTestId?: string;
    // Unique identifier for this checkbox.
    id?: string;
};

const borderRadius = 4;

// NOTE(jangmi): Checkbox may have `onChange` depends on circumstances but lack
// of onChange causes Dev only alert so we provide the no op func as default
// to prevent that.
const onChangeCheckboxNoop = (event: React.ChangeEvent<HTMLInputElement>) => {};

export default class Checkbox extends React.Component<CheckboxProps> {
    static defaultProps: {
        checked: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    } = {
        checked: false,
        onChange: onChangeCheckboxNoop,
    };

    render(): React.ReactNode {
        const {
            checked,
            disabled,
            appearDisabled,
            onChange,
            tabIndex,
            style,
            dataTestId,
            id,
        } = this.props;

        const checkedColor = gray41;

        return (
            <HoverBehavior>
                {({focused}, handlers) => (
                    <div
                        {...handlers}
                        className={css(
                            styles.container,
                            focused && styles.focused,
                        )}
                        style={style}
                        data-testid={dataTestId}
                        data-checked={checked}
                    >
                        <svg
                            className={css(
                                styles.svg,
                                (disabled || appearDisabled) && styles.disabled,
                            )}
                            width={sizeWithPadding}
                            height={sizeWithPadding}
                            /* pad the viewbox to avoid bad clipping when zooming */
                            viewBox={`-${padding} -${padding}
                         ${sizeWithPadding} ${sizeWithPadding}`}
                        >
                            <g fill="none" fillRule="evenodd">
                                {checked && (
                                    <g>
                                        <rect
                                            fill={checkedColor}
                                            width={size}
                                            height={size}
                                            x="0"
                                            y="0"
                                            rx={borderRadius}
                                        />
                                        <path
                                            fill={color.white}
                                            stroke={color.white}
                                            d="M4.98 7.41a0.58.58 0 1 0-0.81.81L6.47
                                 10.53c0.23.23.59.23.81
                                 0l4.55-4.55a0.58.58 0 0
                                 0-0.81-0.81L6.88 9.31 4.98 7.41z"
                                        />
                                    </g>
                                )}
                                {!checked && (
                                    <rect
                                        fill={color.white}
                                        stroke={gray68}
                                        width={size - 2 * padding}
                                        height={size - 2 * padding}
                                        x={padding}
                                        y={padding}
                                        rx="4"
                                        strokeWidth={borderWidth}
                                    />
                                )}
                            </g>
                        </svg>
                        <input
                            type="checkbox"
                            id={id}
                            checked={checked}
                            className={css(
                                styles.checkbox,
                                disabled && styles.defaultCursor,
                            )}
                            disabled={disabled}
                            onChange={onChange}
                            // @ts-expect-error - TS2322 - Type 'string | number | undefined' is not assignable to type 'number | undefined'.
                            tabIndex={tabIndex}
                        />
                    </div>
                )}
            </HoverBehavior>
        );
    }
}

const size = 16;
const padding = 0.5;
const borderWidth = 1;
const sizeWithPadding = size + 2 * padding;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "inline-block",
        verticalAlign: "middle",
        lineHeight: 0,
        borderRadius: borderRadius,
        width: sizeWithPadding,
        height: sizeWithPadding,
        flexShrink: 0,
    },
    focused: {
        "::before": {
            content: '""',
            position: "absolute",
            top: -2,
            right: -2,
            bottom: -2,
            left: -2,
            borderRadius: borderRadius + 2,
            backgroundColor: "lightblue",
        },
    },
    svg: {
        position: "absolute",
        left: 0,
        top: 0,
    },
    checkbox: {
        appearance: "none",
        opacity: 0,
        position: "absolute",
        top: padding,
        width: size,
        height: size,
        margin: 0,
        outline: "none",
        cursor: "pointer",
    },
    disabled: {
        opacity: 0.5,
    },
    defaultCursor: {
        cursor: "default",
    },
});
