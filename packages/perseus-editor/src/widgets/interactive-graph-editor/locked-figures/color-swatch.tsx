import {
    lockedFigureColors,
    type LockedFigureColor,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    color: LockedFigureColor;
    filled?: boolean;
    decorative?: boolean;
};

const ColorSwatch = (props: Props) => {
    const {color, filled = true, decorative = false} = props;

    return (
        <View
            aria-label={
                // Don't include an aria label for decorative circles.
                !decorative
                    ? `${color}, ${filled ? "filled" : "open"}`
                    : undefined
            }
            style={[
                styles.colorSwatch,
                {
                    border: `4px solid ${lockedFigureColors[color]}`,
                    backgroundColor: filled
                        ? lockedFigureColors[color]
                        : semanticColor.core.background.base.default,
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    colorSwatch: {
        // Add a white outline so that the color swatch is visible when
        // the dropdown option is highlighted with its blue background.
        outline: `2px solid ${semanticColor.focus.outer}`,
        borderRadius: "50%",
        width: spacing.large_24,
        height: spacing.large_24,
    },
});

export default ColorSwatch;
