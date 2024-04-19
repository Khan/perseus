import {View} from "@khanacademy/wonder-blocks-core";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {LockedFigureColor} from "@khanacademy/perseus";

type Props = {
    color: LockedFigureColor;
    filled?: boolean;
    decorative?: boolean;
};

const ColorCircle = (props: Props) => {
    const {color, filled = true, decorative = false} = props;

    return (
        <View
            aria-label={
                // Don't include an aria label for decorative circles.
                !decorative
                    ? `Color: ${color}, ${filled ? "filled" : "open"}`
                    : undefined
            }
            style={[
                styles.colorCircle,
                {
                    border: `4px solid ${wbColor[color]}`,
                    backgroundColor: filled ? wbColor[color] : wbColor.white,
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    colorCircle: {
        // Add a white outline so that the color circle is visible when
        // the dropdown option is highlighted with its blue background.
        outline: `2px solid ${wbColor.offWhite}`,
        borderRadius: "50%",
        width: spacing.large_24,
        height: spacing.large_24,
    },
});

export default ColorCircle;
