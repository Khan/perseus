/**
 * LockedFiguresSection is a section of the InteractiveGraphEditor that allows
 * the user to add and remove locked figures from the graph. It includes
 * the dropdown for adding figures as well as the settings for each figure.
 */
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import LockedFigureSelect from "./locked-figure-select";
import LockedFigureSettings from "./locked-figure-settings";
import {getDefaultFigureForFigureType} from "./util";

import type {Props as InteractiveGraphEditorProps} from "../widgets/interactive-graph-editor";
import type {LockedFigure, LockedFigureType} from "@khanacademy/perseus";

type Props = {
    figures?: Array<LockedFigure>;
    onChange: (props: Partial<InteractiveGraphEditorProps>) => void;
};

const LockedFiguresSection = (props: Props) => {
    const uniqueId = useUniqueIdWithMock().get("locked-figures-section");
    const {figures, onChange} = props;

    function addLockedFigure(newFigure: LockedFigureType) {
        const lockedFigures = figures || [];
        const newProps = {
            lockedFigures: [
                ...lockedFigures,
                getDefaultFigureForFigureType(newFigure),
            ],
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

    function changeColor(index: number, colorName: string) {
        const lockedFigures = figures || [];
        const newProps = {
            lockedFigures: [
                ...lockedFigures.slice(0, index),
                {
                    ...lockedFigures[index],
                    style: {
                        ...lockedFigures[index].style,
                        fill: colorName,
                        stroke: colorName,
                    },
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
                    onChangeColor={(color) => changeColor(index, color)}
                    onChangeCoord={(coord) => changeCoord(index, coord)}
                    onRemove={() => removeLockedFigure(index)}
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
