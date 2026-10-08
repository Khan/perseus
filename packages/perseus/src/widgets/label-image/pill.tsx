import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, border, sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";
import type {Typography} from "@khanacademy/wonder-blocks-typography";
import type {StyleDeclaration} from "aphrodite";

type Props = AriaProps & {
    /**
     * The unique identifier for the pill.
     */
    id?: string;
    /**
     * The text to display within the pill.
     */
    children: React.ReactElement<React.ComponentProps<Typography>>;
    /**
     * Called when the pill is clicked.
     */
    onClick?: () => unknown;
    /**
     * Custom styles to add to this pill component.
     */
    style?: StyleType;
};

const Pill = React.forwardRef(function Pill(
    props: Props,
    ref: React.ForwardedRef<HTMLElement | HTMLButtonElement>,
) {
    const {id, children, role, onClick, style, ...ariaProps} = props;

    const wrapperSizeStyle = pillStyles.wrapperLarge;

    const colorStyles = _generateColorStyles(!!onClick);

    const defaultStyles = [
        pillStyles.wrapper,
        colorStyles.pill,
        wrapperSizeStyle,
    ];

    if (onClick) {
        return (
            <Clickable
                id={id}
                onClick={onClick}
                style={[defaultStyles, colorStyles.clickableWrapper, style]}
                // eslint-disable-next-line no-restricted-syntax
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
                {...ariaProps}
            >
                {() => children}
            </Clickable>
        );
    }

    return (
        <View
            id={id}
            role={role}
            style={[defaultStyles, style]}
            // eslint-disable-next-line no-restricted-syntax
            ref={ref as React.ForwardedRef<HTMLElement>}
            {...ariaProps}
        >
            {children}
        </View>
    );
});

const pillStyles = StyleSheet.create({
    wrapper: {
        display: "inline-flex",
        width: "fit-content",
    },
    wrapperLarge: {
        paddingInline: sizing.size_120,
        paddingBlock: sizing.size_060,
        borderRadius: border.radius.radius_240,
        height: sizing.size_320,
    },
});

const styles: Record<string, any> = {};

/**
 * A global focus style that can be applied to interactive elements.
 *
 * This style injects a combination of `outline` and `box-shadow` to indicate
 * the element is focused. This is used for accessibility purposes as it allows
 * the element to present a focus state on Windows High Contrast mode.
 */
const focus = {
    ":focus-visible": {
        boxShadow: `0 0 0 ${border.width.medium} ${semanticColor.focus.inner}`,
        outline: `${border.width.medium} solid ${semanticColor.focus.outer}`,
        outlineOffset: border.width.medium,
    },
};

const _generateColorStyles = (clickable: boolean) => {
    const pillType = `${clickable.toString()}`;
    if (styles[pillType]) {
        return styles[pillType];
    }

    const colorStyles: StyleDeclaration = {
        pill: {
            backgroundColor:
                semanticColor.action.primary.progressive.default.background,
            outline: "none",
            color: semanticColor.action.primary.progressive.default.foreground,
            alignItems: "center",
            justifyContent: "center",
        },
        clickableWrapper: {
            outline: "none",

            ":hover": {
                outline: `${border.width.medium} solid ${semanticColor.core.border.instructive.default}`,
                outlineOffset: sizing.size_020,
            },
            ":active": {
                backgroundColor:
                    semanticColor.action.primary.progressive.press.background,
                outline: `${border.width.medium} solid ${semanticColor.core.border.instructive.strong}`,
                outlineOffset: sizing.size_020,
            },
            ...focus,
        },
    };

    styles[pillType] = StyleSheet.create(colorStyles);
    return styles[pillType];
};

export default Pill;
