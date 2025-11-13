/**
 * LockedFiguresSection is a section of the InteractiveGraphEditor that allows
 * the user to add and remove locked figures from the graph. It includes
 * the dropdown for adding figures as well as the settings for each figure.
 */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useId} from "react";

import Heading from "../../../components/heading";

import LockedFigureSelect from "./locked-figure-select";
import LockedFigureSettings from "./locked-figure-settings";
import {getDefaultFigureForType} from "./util";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {LockedFigureSettingsMovementType} from "./locked-figure-settings-actions";
import type {Props as InteractiveGraphEditorProps} from "../interactive-graph-editor";
import type {LockedFigure, LockedFigureType} from "@khanacademy/perseus-core";

type Props = {
    figures?: Array<LockedFigure>;
    onChange: (props: Partial<InteractiveGraphEditorProps>) => void;
    apiOptions: APIOptionsWithDefaults;
};

const LockedFiguresSection = (props: Props) => {
    // Keep track of all figures' accordions' expanded states for the
    // expand/collapse all button. When editing is disabled, default to
    // all open so content can still be reviewed. Otherwise, default to closed.
    const defaultState = props.apiOptions?.editingDisabled ?? false;
    const collapsedStateArray = Array((props.figures ?? []).length).fill(
        defaultState,
    );
    const [expandedStates, setExpandedStates] =
        React.useState(collapsedStateArray);
    const [isExpanded, setIsExpanded] = React.useState(true);

    const uniqueId = useId();
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
        setExpandedStates([...expandedStates, true]);
    }

    function moveLockedFigure(
        index: number,
        movement: LockedFigureSettingsMovementType,
    ) {
        // Don't allow moving the first figure up or the last figure down.
        if (index === 0 && (movement === "back" || movement === "backward")) {
            return;
        }
        if (
            figures &&
            index === figures.length - 1 &&
            (movement === "front" || movement === "forward")
        ) {
            return;
        }

        const lockedFigures = figures || [];
        const newFigures = [...lockedFigures];
        const newExpandedStates = [...expandedStates];

        // First, remove the figure from its current position
        // in the figures array and the expanded states array.
        const [removedFigure] = newFigures.splice(index, 1);
        newExpandedStates.splice(index, 1);

        // Then, add it back in the new position. Add "true" to the
        // expanded states array for the new position (it must already
        // be open since the button to move it is being pressed from there).
        switch (movement) {
            case "back":
                newFigures.unshift(removedFigure);
                newExpandedStates.unshift(true);
                break;
            case "backward":
                newFigures.splice(index - 1, 0, removedFigure);
                newExpandedStates.splice(index - 1, 0, true);
                break;
            case "forward":
                newFigures.splice(index + 1, 0, removedFigure);
                newExpandedStates.splice(index + 1, 0, true);
                break;
            case "front":
                newFigures.push(removedFigure);
                newExpandedStates.push(true);
                break;
        }
        onChange({lockedFigures: newFigures});
        setExpandedStates(newExpandedStates);
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

            // Update expanded states
            const newExpandedStates = [...expandedStates];
            newExpandedStates.splice(index, 1);
            setExpandedStates(newExpandedStates);
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

    function toggleExpanded(newValue: boolean) {
        setExpandedStates(Array(figures?.length).fill(newValue));
    }

    const allCollapsed = expandedStates.every((value) => !value);
    const buttonLabel = allCollapsed ? "Expand all" : "Collapse all";
    const showExpandButton = !!figures?.length;

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
                    {figures?.map((figure, index) => {
                        return (
                            <LockedFigureSettings
                                key={`${uniqueId}-locked-${figure}-${index}`}
                                expanded={expandedStates[index]}
                                onToggle={(newValue) => {
                                    const newExpanded = [...expandedStates];
                                    newExpanded[index] = newValue;
                                    setExpandedStates(newExpanded);
                                }}
                                {...figure}
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
                    <View style={styles.buttonContainer}>
                        <LockedFigureSelect
                            id={`${uniqueId}-select`}
                            onChange={addLockedFigure}
                        />
                        <Strut size={spacing.small_12} />
                        {showExpandButton && (
                            <Button
                                kind="secondary"
                                onClick={() => toggleExpanded(allCollapsed)}
                                style={styles.button}
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

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        marginTop: spacing.xSmall_8,
        flexGrow: 1,
    },
});

export default LockedFiguresSection;
