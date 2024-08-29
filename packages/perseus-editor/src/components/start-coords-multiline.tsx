import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "./coordinate-pair-input";
import PerseusEditorAccordion from "./perseus-editor-accordion";

import type {CollinearTuple, PerseusGraphType} from "@khanacademy/perseus";

type Props = {
    type: "linear-system" | "segment";
    startCoords: CollinearTuple[];
    onChange: (startCoords: PerseusGraphType["startCoords"]) => void;
};

const StartCoordsMultiline = (props: Props) => {
    const {startCoords, type, onChange} = props;

    const graphName = type === "segment" ? "Segment" : "Line";

    return (
        <>
            {startCoords.map((coordPair, i) => (
                <PerseusEditorAccordion
                    key={`segment-${i}-start-coords`}
                    header={<LabelLarge>{`${graphName} ${i + 1}`}</LabelLarge>}
                    expanded={true}
                >
                    <View style={styles.nestedTile}>
                        <LabelLarge>Point 1:</LabelLarge>
                        <Strut size={spacing.small_12} />
                        <CoordinatePairInput
                            coord={coordPair[0]}
                            labels={["x", "y"]}
                            onChange={(value) => {
                                const newCoords = [...startCoords];
                                newCoords[i] = [value, coordPair[1]];
                                onChange(newCoords);
                            }}
                        />
                    </View>
                    <View style={styles.nestedTile}>
                        <LabelLarge>Point 2:</LabelLarge>
                        <Strut size={spacing.small_12} />
                        <CoordinatePairInput
                            coord={coordPair[1]}
                            labels={["x", "y"]}
                            onChange={(value) => {
                                const newCoords = [...startCoords];
                                newCoords[i] = [coordPair[0], value];
                                onChange(newCoords);
                            }}
                        />
                    </View>
                </PerseusEditorAccordion>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    nestedTile: {
        paddingBottom: spacing.small_12,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default StartCoordsMultiline;
