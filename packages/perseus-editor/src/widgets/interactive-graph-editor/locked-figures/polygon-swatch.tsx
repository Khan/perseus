import {
    lockedFigureColors,
    lockedFigureFillStyles,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {
    LockedFigureColor,
    LockedFigureFillType,
} from "@khanacademy/perseus-core";

type Props = {
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: "solid" | "dashed";
};

const PolygonSwatch = (props: Props) => {
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
                    styles.innerSquare,
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
        outline: `2px solid ${semanticColor.focus.inner}`,
        width: spacing.large_24,
        height: spacing.large_24,
        backgroundColor: semanticColor.core.background.base.default,
        alignItems: "center",
        justifyContent: "center",
    },
    innerSquare: {
        width: 20,
        height: 20,
    },
});

export default PolygonSwatch;
