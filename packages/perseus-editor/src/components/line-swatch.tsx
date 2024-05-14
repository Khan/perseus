import {lockedFigureColors, type LockedFigureColor} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
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
        backgroundColor: wbColor.white,
        justifyContent: "center",
        padding: spacing.xSmall_8,
        borderRadius: spacing.xxxSmall_4,
    },
    lineSwatch: {
        // Add a white outline so that the color swatch is visible when
        // the dropdown option is highlighted with its blue background.
        width: 40,
    },
});

export default LineSwatch;
