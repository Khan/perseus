/**
 * LockedFiguresSection is a section of the InteractiveGraphEditor that allows
 * the user to add and remove locked figures from the graph. It includes
 * the dropdown for adding figures as well as the settings for each figure.
 */
import Button from "@khanacademy/wonder-blocks-button";
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import LockedFigureSelect from "./locked-figure-select";
import LockedFigureSettings from "./locked-figure-settings";
import {getDefaultFigureForType} from "./util";

import type {LockedFigureSettingsMovementType} from "./locked-figure-settings-actions";
import type {Props as InteractiveGraphEditorProps} from "../widgets/interactive-graph-editor";
import type {LockedFigure, LockedFigureType} from "@khanacademy/perseus";

type Props = {
    // Whether to show the M2 features in the locked figure settings.
    // TODO(LEMS-2016): Remove this prop once the M2 flag is fully rolled out.
    showM2Features: boolean;
    figures?: Array<LockedFigure>;
    onChange: (props: Partial<InteractiveGraphEditorProps>) => void;
};

const LockedFiguresSection = (props: Props) => {
    // Keep track of all figures' accordions' expanded states for the
    // expand/collapse all button. Set the whole array to false initially.
    const collapsedStateArray = Array((props.figures ?? []).length).fill(false);
    const [expandedStates, setExpandedStates] =
        React.useState(collapsedStateArray);

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
        setExpandedStates([...expandedStates, true]);
    }

    function moveLockedFigure(
        index: number,
        movement: LockedFigureSettingsMovementType,
    ) {
        // Don't allow moving the first figure up or the last figure down.
        if (index === 0 && (movement === "top" || movement === "up")) {
            return;
        }
        if (
            figures &&
            index === figures.length - 1 &&
            (movement === "down" || movement === "bottom")
        ) {
            return;
        }

        const lockedFigures = figures || [];
        const newFigures = [...lockedFigures];

        // First, remove the figure from its current position.
        const [removedFigure] = newFigures.splice(index, 1);

        // Then, add it back in the new position.
        switch (movement) {
            case "top":
                newFigures.unshift(removedFigure);
                break;
            case "up":
                newFigures.splice(index - 1, 0, removedFigure);
                break;
            case "down":
                newFigures.splice(index + 1, 0, removedFigure);
                break;
            case "bottom":
                newFigures.push(removedFigure);
                break;
        }
        onChange({lockedFigures: newFigures});
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
        <View>
            {figures?.map((figure, index) => {
                return (
                    <LockedFigureSettings
                        key={`${uniqueId}-locked-${figure}-${index}`}
                        showM2Features={props.showM2Features}
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
                        onMove={(movement) => moveLockedFigure(index, movement)}
                        onRemove={() => removeLockedFigure(index)}
                    />
                );
            })}
            <View style={styles.buttonContainer}>
                <LockedFigureSelect
                    showM2Features={props.showM2Features}
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
