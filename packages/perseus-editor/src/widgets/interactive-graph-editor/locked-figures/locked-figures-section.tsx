/**
 * LockedFiguresSection is a section of the InteractiveGraphEditor that allows
 * the user to add and remove locked figures from the graph. It includes
 * the dropdown for adding figures as well as the settings for each figure.
 */
import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {useId} from "react";

import Heading from "../../../components/heading";

import LockedFigureSelect from "./locked-figure-select";
import LockedFigureSettings from "./locked-figure-settings";
import styles from "./locked-figures-section.module.css";
import {moveItem, moveTarget, useExpandedStates} from "./use-expanded-states";

import type {LockedFigureSettingsMovementType} from "./locked-figure-settings-actions";
import type {Props as InteractiveGraphEditorProps} from "../interactive-graph-editor";
import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {LockedFigure, LockedFigureType} from "@khanacademy/perseus-core";

interface Props {
    figures?: Array<LockedFigure>;
    onChange: (props: Partial<InteractiveGraphEditorProps>) => void;
    apiOptions: APIOptionsWithDefaults;
}

const LockedFiguresSection = (props: Props) => {
    const editingDisabled = props.apiOptions?.editingDisabled ?? false;
    const {figures, onChange} = props;
    const lockedFigures = figures ?? [];
    // Which figures' accordions are open, for the expand/collapse all
    // button. When editing is disabled, default to all open so content
    // can still be reviewed. Otherwise, default to closed.
    const expanded = useExpandedStates(lockedFigures.length, editingDisabled);
    const [isExpanded, setIsExpanded] = React.useState(true);
    const uniqueId = useId();

    function addLockedFigure(newFigure: LockedFigureType) {
        onChange({
            lockedFigures: [
                ...lockedFigures,
                getDefaultFigureForType(newFigure),
            ],
        });
        expanded.added();
    }

    function moveLockedFigure(
        index: number,
        movement: LockedFigureSettingsMovementType,
    ) {
        const target = moveTarget(index, lockedFigures.length, movement);
        // Don't allow moving the first figure up or the last figure down.
        if (target === index) {
            return;
        }
        onChange({lockedFigures: moveItem(lockedFigures, index, target)});
        expanded.moved(index, target);
    }

    function removeLockedFigure(index: number) {
        // eslint-disable-next-line no-alert
        if (window.confirm("Are you sure you want to delete this figure?")) {
            onChange({
                lockedFigures: [
                    ...lockedFigures.slice(0, index),
                    ...lockedFigures.slice(index + 1),
                ],
            });
            expanded.removed(index);
        }
    }

    function changeProps(
        index: number,
        // Omit the type from the figure props so it doesn't think
        // we're trying to pass in the props for the wrong type.
        figureProps: Omit<Partial<LockedFigure>, "type">,
    ) {
        onChange({
            lockedFigures: [
                ...lockedFigures.slice(0, index),
                {
                    ...lockedFigures[index],
                    ...figureProps,
                },
                ...lockedFigures.slice(index + 1),
            ],
        });
    }

    const buttonLabel = expanded.allCollapsed ? "Expand all" : "Collapse all";
    const showExpandButton = lockedFigures.length > 0;

    return (
        <>
            <Heading
                title="Locked Figures"
                isOpen={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
                isCollapsible={true}
            />
            {isExpanded && (
                <View>
                    {lockedFigures.map((figure, index) => {
                        return (
                            <LockedFigureSettings
                                key={`${uniqueId}-locked-${figure}-${index}`}
                                expanded={expanded.isOpen(index)}
                                onToggle={(newValue) =>
                                    expanded.setOpen(index, newValue)
                                }
                                {...figure}
                                editingDisabled={editingDisabled}
                                onChangeProps={(newProps) =>
                                    changeProps(index, newProps)
                                }
                                onMove={(movement) =>
                                    moveLockedFigure(index, movement)
                                }
                                onRemove={() => removeLockedFigure(index)}
                            />
                        );
                    })}
                    <View className={styles.buttonContainer}>
                        <LockedFigureSelect
                            id={`${uniqueId}-select`}
                            editingDisabled={editingDisabled}
                            onChange={addLockedFigure}
                        />
                        {showExpandButton && (
                            <Button
                                kind="secondary"
                                disabled={editingDisabled}
                                onClick={() =>
                                    expanded.setAll(expanded.allCollapsed)
                                }
                                className={styles.button}
                            >
                                {buttonLabel}
                            </Button>
                        )}
                    </View>
                </View>
            )}
        </>
    );
};

export default LockedFiguresSection;
