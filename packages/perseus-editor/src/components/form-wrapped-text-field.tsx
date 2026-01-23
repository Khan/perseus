/* eslint-disable @khanacademy/ts-no-error-suppressions */
/**
 * DEPRECATED: Use <TextField> from ./text-field.jsx instead.
 *
 * This component wraps an <input> in a <form> to make it easier to add an
 * `onSubmit` handler.  In practice though this can complicate things because
 * each field is in it's own form which is not how forms should be structured.
 * If you need to handle `onSubmit`, please use <TextField> directly with your
 * own <form> that wraps all text fields in the form.
 **/
import {color, color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {gray41} from "../styles/global-colors";

import type {components} from "@khanacademy/perseus";

type Props = {
    // This id is used to tie the input field to the label that describes it.
    id?: string;
    testId?: string;
    type?: string;
    name?: string;
    readOnly?: boolean;
    value?: string | ReadonlyArray<string> | number | undefined;
    placeholder?: string;
    // https://reactjs.org/docs/uncontrolled-components.html#default-values
    defaultValue?: string | number | ReadonlyArray<string> | undefined;
    disabled?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    invalid?: "true" | "false";
    // styling
    // This prop is passed directly to <input>.  This is incorrect since HTML
    // tags don't know what to do with an aphrodite which is typed as:
    // {
    //   _len: number,
    //   _name: string,
    //   _definition: CSSProperties,
    // }
    // TODO(WB-1026): Update StyleType to reflect the aphrodite type
    // TODO(FEI-3282): Update uses of StyleType in khan/frontend to be correct
    style?: React.CSSProperties | undefined;
    className?: string;
    width?: number | string;
    grow?: boolean | number;
    shrink?: boolean | number;
    // HACK(mattmorgan) to enforce WB LabelMedium-like styles on this older
    // component.
    labelMediumInputText?: boolean;
    icon?: React.ReactElement<React.ComponentProps<typeof components.Icon>>;
    leftSideIcon?: boolean;
    backgroundColor?: string;
    focusBorderColor?: string;
    borderColor?: string;
    color?: string;
    // events
    onSubmit?: (arg1: React.ChangeEvent<HTMLInputElement>) => unknown;
    onBlur?: (arg1: React.ChangeEvent<HTMLInputElement>) => unknown;
    onFocus?: (arg1: React.ChangeEvent<HTMLInputElement>) => unknown;
    onChange?: (arg1: React.ChangeEvent<HTMLInputElement>) => unknown;
    onClick?: (arg1: React.MouseEvent<HTMLInputElement>) => unknown;
    onKeyPress?: (arg1: React.KeyboardEvent<HTMLInputElement>) => unknown;
    onKeyDown?: (arg1: React.KeyboardEvent<HTMLInputElement>) => unknown;
    // aria
    ["aria-label"]?: string;
    ["aria-describedby"]?: string | undefined;
};

type State = {
    focused: boolean;
};

type PropsWithForwardRef = Props & {
    forwardedRef: React.ForwardedRef<HTMLInputElement>;
};

class FormWrappedTextField extends React.Component<PropsWithForwardRef, State> {
    state = {
        focused: false,
    };

    handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {onBlur} = this.props;
        onBlur?.(e);

        this.setState({focused: false});
    };

    handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {onFocus} = this.props;
        onFocus?.(e);

        this.setState({focused: true});
    };

    disableDefault = (e: Event) => {
        e.preventDefault();
    };

    render() {
        const {
            forwardedRef,
            width,
            grow,
            shrink,
            icon,
            backgroundColor,
            focusBorderColor,
            borderColor,
            color,
            onSubmit,
            leftSideIcon,
            id,
            testId,
            type,
            labelMediumInputText,
            ...allProps
        } = this.props;
        const {focused} = this.state;

        const extraStyles: any = {};
        const spanStyle = [styles.input, styles.container];

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (width) {
            extraStyles.width = width;
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (grow) {
            extraStyles.flexGrow = grow === true ? 1 : grow;
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (shrink || shrink === 0) {
            extraStyles.flexShrink = shrink === true ? 0 : shrink;
        }

        if (backgroundColor) {
            extraStyles.backgroundColor = backgroundColor;
        } else {
            spanStyle.push(styles.defaultBackground);
        }

        // Add text color if specified.
        if (color) {
            extraStyles.color = color;
        }

        const borderColorStyle = focused
            ? focusBorderColor || WBColor.blue
            : borderColor || WBColor.offBlack16;
        extraStyles.border = `1px solid ${borderColorStyle}`;

        const wrappedIcon = icon && (
            <span className={css(styles.icon)}>{icon}</span>
        );

        const inputBase = labelMediumInputText
            ? styles.labelMediumInputBase
            : styles.inputBase;

        return (
            <form
                className={css(...spanStyle)}
                style={extraStyles}
                // @ts-expect-error - TS2322 - Type '((arg1: ChangeEvent<HTMLInputElement>) => unknown) | ((e: Event) => void)' is not assignable to type 'FormEventHandler<HTMLFormElement> | undefined'.
                onSubmit={onSubmit || this.disableDefault}
            >
                {leftSideIcon && wrappedIcon}
                <input
                    {...allProps}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    type={type}
                    className={css(inputBase)}
                    ref={forwardedRef}
                    id={id}
                    data-testid={testId}
                />
                {!leftSideIcon && wrappedIcon}
            </form>
        );
    }
}

const styles = StyleSheet.create({
    inputBase: {
        background: "inherit",
        border: "none",

        fontFamily: "inherit",
        fontSize: 15,
        lineHeight: "22px",

        outline: "none",
        "::placeholder": {
            color: gray41,
        },
        width: "100%",
        color: "inherit",
        marginBottom: 0,
        paddingLeft: 0,
        boxShadow: "none",
        padding: 0, // override Chrome's stylesheet
        margin: 0, // override Safari's stylesheet
    },
    // HACK(mattmorgan) to enforce WB LabelMedium-like styles on this older
    // component.
    labelMediumInputBase: {
        background: "inherit",
        border: "none",
        outline: "none",
        "::placeholder": {
            color: gray41,
        },
        width: "100%",
        fontWeight: "normal",
        fontFamily: "Lato, san-serif",
        fontSize: "16px",
        lineHeight: "20px",
    },
    input: {
        height: 40,
        borderRadius: 4,
        boxSizing: "border-box",
        padding: "8px 10px",
    },
    container: {
        display: "inline-flex",
        alignItems: "center",
        marginBottom: 0,
    },
    defaultBackground: {
        backgroundColor: color.white,
    },
    icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default React.forwardRef<HTMLInputElement, Props>((props, ref) => (
    <FormWrappedTextField {...props} forwardedRef={ref} />
));
