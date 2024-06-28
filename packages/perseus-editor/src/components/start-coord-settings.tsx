import {getLineCoords} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "./coordinate-pair-input";
import Heading from "./heading";

import type {
    PerseusGraphType,
    Range,
    CollinearTuple,
} from "@khanacademy/perseus";

type Props = PerseusGraphType & {
    range: [x: Range, y: Range];
    step: [x: number, y: number];
    onChange: (startCoords: CollinearTuple) => void;
};

const StartCoordSettingsInner = (props: Props) => {
    const {range, step, onChange} = props;

    // Check if coords is of type CollinearTuple
    if (props.type === "linear" || props.type === "ray") {
        const startCoords =
            props.startCoords ?? getLineCoords({type: props.type}, range, step);

        return (
            <>
                <View style={styles.tile}>
                    <LabelLarge>Point 1</LabelLarge>
                    <CoordinatePairInput
                        coord={startCoords[0]}
                        onChange={(value) => onChange([value, startCoords[1]])}
                    />
                </View>
                <View style={styles.tile}>
                    <LabelLarge>Point 2</LabelLarge>
                    <CoordinatePairInput
                        coord={startCoords[1]}
                        onChange={(value) => onChange([startCoords[0], value])}
                    />
                </View>
            </>
        );
    }

    return null;
};

const StartCoordSettings = (props: Props) => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <View>
            <Heading
                title="Start coordinates"
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
            />
            {isOpen && <StartCoordSettingsInner {...props} />}
        </View>
    );
};

const styles = StyleSheet.create({
    tile: {
        backgroundColor: color.fadedBlue8,
        marginTop: spacing.xSmall_8,
        padding: spacing.small_12,
        borderRadius: spacing.xSmall_8,
    },
});

export default StartCoordSettings;
