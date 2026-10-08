import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, border, sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    /**
     * The unique identifier for the pill.
     */
    id?: string;
    /**
     * The content to display within the pill.
     */
    children: React.ReactNode;
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
    {id, children, onClick, style}: Props,
    ref: React.ForwardedRef<HTMLElement | HTMLButtonElement>,
) {
    if (onClick) {
        return (
            <Clickable
                id={id}
                onClick={onClick}
                style={[styles.pill, styles.clickable, style]}
                // eslint-disable-next-line no-restricted-syntax
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
            >
                {() => children}
            </Clickable>
        );
    }

    return (
        <View
            id={id}
            style={[styles.pill, style]}
            // eslint-disable-next-line no-restricted-syntax
            ref={ref as React.ForwardedRef<HTMLElement>}
        >
            {children}
        </View>
    );
});

const styles = StyleSheet.create({
    pill: {
        display: "inline-flex",
        width: "fit-content",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: sizing.size_120,
        paddingBlock: sizing.size_060,
        borderRadius: border.radius.radius_240,
        color: semanticColor.core.foreground.knockout.default,
        backgroundColor: semanticColor.core.background.instructive.strong,
    },
    clickable: {
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
        ":focus-visible": {
            boxShadow: `0 0 0 ${border.width.medium} ${semanticColor.focus.inner}`,
            outline: `${border.width.medium} solid ${semanticColor.focus.outer}`,
            outlineOffset: border.width.medium,
        },
    },
});

export default Pill;
