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
    lineStyle: "solid" | "dashed";
};

const LineSwatch = (props: Props) => {
    const {color, lineStyle} = props;

    return (
        <View style={styles.container}>
            <View
                aria-label={`${color}, ${lineStyle}`}
                style={[
                    styles.lineSwatch,
                    {
                        border: `5px ${lineStyle} ${lockedFigureColors[color]}`,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: semanticColor.core.background.base.default,
        justifyContent: "center",
        padding: spacing.xSmall_8,
        borderRadius: spacing.xxxSmall_4,
    },
    lineSwatch: {
        width: 40,
    },
});

export default LineSwatch;
