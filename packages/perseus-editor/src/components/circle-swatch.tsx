import {lockedFigureColors, lockedCircleFillStyles} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {
    LockedFigureColor,
    LockedCircleFillType,
} from "@khanacademy/perseus";

type Props = {
    color: LockedFigureColor;
    fillStyle: LockedCircleFillType;
    strokeStyle: "solid" | "dashed";
};

const CircleSwatch = (props: Props) => {
    const {color, fillStyle, strokeStyle} = props;

    return (
        <View
            aria-label={`${color}, stroke ${strokeStyle}, fill ${fillStyle}`}
            style={[
                styles.container,
                {
                    border: `4px ${strokeStyle} ${lockedFigureColors[color]}`,
                },
            ]}
        >
            <View
                style={[
                    styles.innerCircle,
                    {
                        backgroundColor: lockedFigureColors[color],
                        opacity: lockedCircleFillStyles[fillStyle],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Add a white outline so that the color swatch is visible when
        // the dropdown option is highlighted with its blue background.
        outline: `2px solid ${wbColor.offWhite}`,
        borderRadius: "50%",
        width: spacing.large_24,
        height: spacing.large_24,
        backgroundColor: wbColor.white,
        alignItems: "center",
        justifyContent: "center",
    },
    innerCircle: {
        width: 20,
        height: 20,
        borderRadius: "50%",
    },
});

export default CircleSwatch;
