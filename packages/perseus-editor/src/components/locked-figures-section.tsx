/**
 * LockedFiguresSection is a section of the InteractiveGraphEditor that allows
 * the user to add and remove locked figures from the graph. It includes
 * the dropdown for adding figures as well as the settings for each figure.
 */
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import LockedFigureSelect from "./locked-figure-select";
import LockedFigureSettings from "./locked-figure-settings";
import {getDefaultFigureForType} from "./util";

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
                getDefaultFigureForType(newFigure),
            ],
        };
        onChange(newProps);
    }

    function removeLockedFigure(index: number) {
        // eslint-disable-next-line no-alert
        if (window.confirm("Are you sure you want to delete this figure?")) {
            const lockedFigures = figures || [];
            onChange({
                lockedFigures: [
                    ...lockedFigures.slice(0, index),
                    ...lockedFigures.slice(index + 1),
                ],
            });
        }
    }

    function changeProps(
        index: number,
        // Omit the type from the figure props so it doesn't think
        // we're trying to pass in the props for the wrong type.
        figureProps: Omit<Partial<LockedFigure>, "type">,
    ) {
        const lockedFigures = figures || [];
        const newFigures = {
            lockedFigures: [
                ...lockedFigures.slice(0, index),
                {
                    ...lockedFigures[index],
                    ...figureProps,
                },
                ...lockedFigures.slice(index + 1),
            ],
        };
        onChange(newFigures);
    }

    return (
        <View>
            {figures?.map((figure, index) => (
                <LockedFigureSettings
                    key={`${uniqueId}-locked-${figure}-${index}`}
                    {...figure}
                    onChangeProps={(newProps) => changeProps(index, newProps)}
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

export default LockedFiguresSection;
