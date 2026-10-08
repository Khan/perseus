import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {
    semanticColor,
    border,
    color,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {ClickableRole} from "@khanacademy/wonder-blocks-clickable";
import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";
import type {Typography} from "@khanacademy/wonder-blocks-typography";
import type {StyleDeclaration} from "aphrodite";

export type PillKind =
    | "neutral"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "critical"
    | "transparent";

export type PillSize = "small" | "medium" | "large";

type Props = AriaProps & {
    /**
     * The unique identifier for the pill.
     */
    id?: string;
    /**
     * The text to display within the pill.
     */
    children: string | React.ReactElement<React.ComponentProps<Typography>>;
    /**
     * Determines the color of the pill. Defaults to "neutral".
     * Neutral pills are gray, accent pills are blue.
     */
    kind?: PillKind;
    /**
     * The role the pill should have depending on its behavior.
     * By default, it has none. If pill is Clickable, this is automatically
     * set to “button".
     *
     * Role should be set according to the pill's behavior. For example,
     * if the pill is used as a tab in a tabbed panel, set its role to "tab".
     * If pills are being selected or deselected from a list, they should
     * probably have a role of "checkbox".
     */
    role?: ClickableRole;
    /**
     * Called when the pill is clicked.
     */
    onClick?: () => unknown;
    /**
     * Custom styles to add to this pill component.
     */
    style?: StyleType;
    /**
     * The tab index of the pill (clickable only).
     */
    tabIndex?: number;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
};

const PillInner = (props: {
    children: string | React.ReactElement<React.ComponentProps<Typography>>;
}) => {
    const {children} = props;

    if (typeof children !== "string") {
        return children;
    }

    return <BodyText tag="span">{children}</BodyText>;
};

/**
 * A `Pill` component displays text in a rounded, colored container. This is
 * usually used to add label tags.
 */
const Pill = React.forwardRef(function Pill(
    props: Props,
    ref: React.ForwardedRef<HTMLElement | HTMLButtonElement>,
) {
    const {
        id,
        children,
        kind = "neutral",
        role,
        onClick,
        style,
        tabIndex,
        testId,
        ...ariaProps
    } = props;

    const wrapperSizeStyle = pillStyles.wrapperLarge;

    const colorStyles = _generateColorStyles(!!onClick, kind);

    const defaultStyles = [
        pillStyles.wrapper,
        colorStyles.pill,
        wrapperSizeStyle,
    ];

    if (onClick) {
        return (
            <Clickable
                id={id}
                role={role}
                onClick={onClick}
                style={[defaultStyles, colorStyles.clickableWrapper, style]}
                testId={testId}
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
                tabIndex={tabIndex}
                {...ariaProps}
            >
                {() => <PillInner>{children}</PillInner>}
            </Clickable>
        );
    }

    return (
        <View
            id={id}
            role={role}
            style={[defaultStyles, style]}
            testId={testId}
            ref={ref as React.ForwardedRef<HTMLElement>}
            {...ariaProps}
        >
            <PillInner>{children}</PillInner>
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

const _generateColorStyles = (clickable: boolean, kind: PillKind) => {
    const pillType = `${kind}-${clickable.toString()}`;
    if (styles[pillType]) {
        return styles[pillType];
    }

    let backgroundColor;
    let textColor;

    switch (kind) {
        case "accent":
            // Use action tokens for accent so it is similar to the button
            // primary progressive background and foreground colors
            backgroundColor =
                semanticColor.action.primary.progressive.default.background;
            textColor =
                semanticColor.action.primary.progressive.default.foreground;
            break;
        case "info":
            backgroundColor = semanticColor.feedback.info.subtle.background;
            textColor = semanticColor.feedback.info.subtle.text;
            break;
        case "success":
            backgroundColor = semanticColor.feedback.success.subtle.background;
            textColor = semanticColor.feedback.success.subtle.text;
            break;
        case "warning":
            backgroundColor = semanticColor.feedback.warning.subtle.background;
            textColor = semanticColor.feedback.warning.subtle.text;
            break;
        case "critical":
            backgroundColor = semanticColor.feedback.critical.subtle.background;
            textColor = semanticColor.feedback.critical.subtle.text;
            break;
        case "transparent":
            backgroundColor = semanticColor.core.transparent;
            textColor = semanticColor.core.foreground.neutral.strong;
            break;
        case "neutral":
        default:
            // NOTE(WB-1950): Will remove use of status token once the `neutral` kind is removed in favour of Badge
            backgroundColor = semanticColor.status.neutral.background;
            textColor = semanticColor.core.foreground.neutral.strong;
    }

    const pressColor =
        kind === "transparent" || kind === "neutral"
            ? color.offBlack16 // NOTE(WB-1950): Neutral pills will be replaced with Badge and the transparent kind will be removed
            : kind === "accent"
              ? semanticColor.action.primary.progressive.press.background
              : // NOTE(WB-1950): This will be simplified once we split this into Badge and Pill.
                `color-mix(in srgb, ${color.offBlack32}, ${backgroundColor})`;

    const theme = {
        default: {
            border:
                kind === "transparent"
                    ? `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`
                    : "none",
            background: backgroundColor,
            foreground: textColor,
        },
        hover: {
            border: semanticColor.core.border.instructive.default,
        },
        press: {
            border: semanticColor.core.border.instructive.strong,
            background: pressColor,
        },
    };

    const colorStyles: StyleDeclaration = {
        pill: {
            backgroundColor: theme.default.background,
            outline: theme.default.border,
            color: theme.default.foreground,
            alignItems: "center",
            justifyContent: "center",
        },
        clickableWrapper: {
            outline: theme.default.border,

            ":hover": {
                outline: `${border.width.medium} solid ${theme.hover.border}`,
                outlineOffset: sizing.size_020,
            },
            ":active": {
                backgroundColor: theme.press.background,
                outline: `${border.width.medium} solid ${theme.press.border}`,
                outlineOffset: sizing.size_020,
            },
            ...focusStyles.focus,
        },
    };

    styles[pillType] = StyleSheet.create(colorStyles);
    return styles[pillType];
};

export default Pill;
