import {
    getLineCoords,
    getLinearSystemCoords,
    getSegmentCoords,
} from "@khanacademy/perseus";
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
import PerseusEditorAccordion from "./perseus-editor-accordion";

import type {
    PerseusGraphType,
    Range,
    CollinearTuple,
} from "@khanacademy/perseus";

type Props = PerseusGraphType & {
    range: [x: Range, y: Range];
    step: [x: number, y: number];
    onChange: (startCoords: PerseusGraphType["startCoords"]) => void;
};

const StartCoordSettingsInner = (props: Props) => {
    const {type, range, step, startCoords, onChange} = props;

    switch (type) {
        // coords with type CollinearTuple
        case "linear":
        case "ray":
            // If startCoords is already set (in the editor), use that value.
            // Otherwise, calculate the default startCoords.
            const linearCoords =
                startCoords ?? getLineCoords(props, range, step);
            return (
                <>
                    <View style={styles.tile}>
                        <LabelLarge>Point 1</LabelLarge>
                        <CoordinatePairInput
                            coord={linearCoords[0]}
                            onChange={(value) =>
                                onChange([value, linearCoords[1]])
                            }
                        />
                    </View>
                    <View style={styles.tile}>
                        <LabelLarge>Point 2</LabelLarge>
                        <CoordinatePairInput
                            coord={linearCoords[1]}
                            onChange={(value) =>
                                onChange([linearCoords[0], value])
                            }
                        />
                    </View>
                </>
            );
        // coords with type CollinearTuple[]
        case "linear-system":
        case "segment":
            const multiLineCoords: CollinearTuple[] =
                startCoords ??
                (type === "segment"
                    ? getSegmentCoords(props, range, step)
                    : getLinearSystemCoords(props, range, step));
            const graphName = type === "segment" ? "Segment" : "Line";
            return (
                <>
                    {multiLineCoords.map((coordPair, i) => (
                        <PerseusEditorAccordion
                            key={`segment-${i}-start-coords`}
                            header={
                                <LabelLarge>{`${graphName} ${i + 1}`}</LabelLarge>
                            }
                            expanded={true}
                        >
                            <View style={styles.nestedTile}>
                                <LabelLarge>Point 1</LabelLarge>
                                <CoordinatePairInput
                                    coord={coordPair[0]}
                                    onChange={(value) => {
                                        const newCoords = [...multiLineCoords];
                                        newCoords[i] = [value, coordPair[1]];
                                        onChange(newCoords);
                                    }}
                                />
                            </View>
                            <View style={styles.nestedTile}>
                                <LabelLarge>Point 2</LabelLarge>
                                <CoordinatePairInput
                                    coord={coordPair[1]}
                                    onChange={(value) => {
                                        const newCoords = [...multiLineCoords];
                                        newCoords[i] = [coordPair[0], value];
                                        onChange(newCoords);
                                    }}
                                />
                            </View>
                        </PerseusEditorAccordion>
                    ))}
                </>
            );
        default:
            return null;
    }
};

const StartCoordSettings = (props: Props) => {
    const {type, range, step, onChange} = props;
    const [isOpen, setIsOpen] = React.useState(true);

    if (
        type !== "linear" &&
        type !== "ray" &&
        type !== "segment" &&
        type !== "linear-system"
    ) {
        return null;
    }

    let defaultStartCoords: PerseusGraphType["startCoords"];
    // Passing in undefined start coords to get default coords
    switch (type) {
        case "linear":
        case "ray":
            defaultStartCoords = getLineCoords(
                {...props, startCoords: undefined},
                range,
                step,
            );
            break;
        case "segment":
            defaultStartCoords = getSegmentCoords(
                {...props, startCoords: undefined},
                range,
                step,
            );
            break;
        case "linear-system":
            defaultStartCoords = getLinearSystemCoords(
                {...props, startCoords: undefined},
                range,
                step,
            );
            break;
        default:
            return null;
    }

    return (
        <View style={styles.container}>
            {/* Heading for the collapsible section */}
            <Heading
                isCollapsible={true}
                title="Start coordinates"
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
            />

            {/* Start coordinates main UI */}
            {isOpen && (
                <>
                    <StartCoordSettingsInner {...props} />

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
    nestedTile: {
        paddingBottom: spacing.small_12,
    },
});

export default StartCoordSettings;
