import {lockedFigureColors, lockedFigureFillStyles} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {
    LockedFigureColor,
    LockedFigureFillType,
} from "@khanacademy/perseus";

type Props = {
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: "solid" | "dashed";
};

const EllipseSwatch = (props: Props) => {
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
                        opacity:
                            fillStyle === "white"
                                ? 0
                                : lockedFigureFillStyles[fillStyle],
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
        width: spacing.xLarge_32,
        height: spacing.large_24,
        backgroundColor: wbColor.white,
        alignItems: "center",
        justifyContent: "center",
    },
    innerCircle: {
        width: 28,
        height: 20,
        borderRadius: "50%",
    },
});

export default EllipseSwatch;
