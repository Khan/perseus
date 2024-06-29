import {getLineCoords} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import arrowCounterClockwise from "@phosphor-icons/core/bold/arrow-counter-clockwise-bold.svg";
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

type PropsInner = {
    type: PerseusGraphType["type"];
    startCoords: CollinearTuple;
    onChange: (startCoords: CollinearTuple) => void;
};

const StartCoordSettingsInner = (props: PropsInner) => {
    const {type, startCoords, onChange} = props;

    // Check if coords is of type CollinearTuple
    switch (type) {
        case "linear":
        case "ray":
            return (
                <>
                    <View style={styles.tile}>
                        <LabelLarge>Point 1</LabelLarge>
                        <CoordinatePairInput
                            coord={startCoords[0]}
                            onChange={(value) =>
                                onChange([value, startCoords[1]])
                            }
                        />
                    </View>
                    <View style={styles.tile}>
                        <LabelLarge>Point 2</LabelLarge>
                        <CoordinatePairInput
                            coord={startCoords[1]}
                            onChange={(value) =>
                                onChange([startCoords[0], value])
                            }
                        />
                    </View>
                </>
            );
        default:
            return null;
    }
};

const StartCoordSettings = (props: Props) => {
    const {type, range, step, onChange} = props;
    const [isOpen, setIsOpen] = React.useState(true);

    if (type !== "linear" && type !== "ray") {
        return null;
    }

    const defaultStartCoords = getLineCoords({type: type}, range, step);

    return (
        <View style={styles.container}>
            {/* Heading for the collapsible section */}
            <Heading
                title="Start coordinates"
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
            />

            {/* Start coordinates main UI */}
            {isOpen && (
                <>
                    <StartCoordSettingsInner
                        type={type}
                        startCoords={props.startCoords ?? defaultStartCoords}
                        onChange={onChange}
                    />

                    {/* Button to reset to default */}
                    <Strut size={spacing.small_12} />
                    <Button
                        startIcon={arrowCounterClockwise}
                        kind="tertiary"
                        size="small"
                        onClick={() => {
                            onChange(defaultStartCoords);
                        }}
                    >
                        Use default start coords
                    </Button>
                </>
            )}
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
