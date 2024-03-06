import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import LockedFigureSelect from "./locked-figure-select";
import LockedFigureSettings from "./locked-figure-settings";

import type {Props as InteractiveGraphEditorProps} from "../widgets/interactive-graph-editor";
import type {LockedFigure, LockedPoint} from "@khanacademy/perseus";

const startingValues = {
    point: {
        type: "point",
        coord: [0, 0],
        style: {fill: color.offBlack64, stroke: color.offBlack64},
    } as LockedPoint,
};

const colorMap = {
    blue: color.blue,
    red: color.red,
    gray: color.offBlack64,
};

type Props = {
    figures?: Array<LockedFigure>;
    onChange: (props: Partial<InteractiveGraphEditorProps>) => void;
};

const LockedFiguresSection = (props: Props) => {
    const uniqueId = useUniqueIdWithMock().get("locked-figures-section");
    const {figures, onChange} = props;

    function addLockedFigure(newFigure: string) {
        const lockedFigures = figures || [];
        const newProps = {
            lockedFigures: [...lockedFigures, startingValues[newFigure]],
        };
        onChange(newProps);
    }

    function removeLockedFigure(index: number) {
        const lockedFigures = figures || [];
        onChange({
            lockedFigures: [
                ...lockedFigures.slice(0, index),
                ...lockedFigures.slice(index + 1),
            ],
        });
    }

    // Note: This might change when we switch to Mafs.
    function changeColor(index: number, color: string) {
        const lockedFigures = figures || [];
        const newProps = {
            lockedFigures: [
                ...lockedFigures.slice(0, index),
                {
                    ...lockedFigures[index],
                    style: {
                        ...lockedFigures[index].style,
                        fill: colorMap[color],
                        stroke: colorMap[color],
                    },
                },
                ...lockedFigures.slice(index + 1),
            ],
        };
        onChange(newProps);
    }

    function changeCoord(index: number, coord: [number, number]) {
        const lockedFigures = figures || [];
        const newProps = {
            lockedFigures: [
                ...lockedFigures.slice(0, index),
                {
                    ...lockedFigures[index],
                    coord,
                },
                ...lockedFigures.slice(index + 1),
            ],
        };
        onChange(newProps);
    }

    return (
        <View style={styles.container}>
            {figures?.map((figure, index) => (
                <LockedFigureSettings
                    key={`${uniqueId}-locked-${figure}-${index}`}
                    {...figure}
                    onRemove={() => removeLockedFigure(index)}
                    onChangeColor={(color) => changeColor(index, color)}
                    onChangeCoord={(coord) => changeCoord(index, coord)}
                />
            ))}
            <LockedFigureSelect
                id={`${uniqueId}-select`}
                onChange={addLockedFigure}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: spacing.large_24,
    },
});

export default LockedFiguresSection;
