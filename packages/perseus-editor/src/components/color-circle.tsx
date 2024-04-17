import {View} from "@khanacademy/wonder-blocks-core";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    color: string;
    filled?: boolean;
};

const ColorCircle = (props: Props) => {
    const {color, filled = true} = props;

    return (
        <View
            aria-label={`Color: ${color}, ${filled ? "filled" : "open"}`}
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
