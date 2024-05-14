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

import type {Props as InteractiveGraphEditorProps} from "../widgets/interactive-graph-editor";
import type {LockedFigure, LockedFigureType} from "@khanacademy/perseus";

type Props = {
    figures?: Array<LockedFigure>;
    onChange: (props: Partial<InteractiveGraphEditorProps>) => void;
};

const LockedFiguresSection = (props: Props) => {
    // Keep track of all figures' accordions' expanded states for the
    // expand/collapse all button. Set the whole array to false initially.
    const [expanded, setExpanded] = React.useState(
        Array(props.figures?.length).fill(false),
    );

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

    function toggleExpanded(newValue: boolean) {
        setExpanded(Array(expanded.length).fill(newValue));
    }

    const allCollapsed = expanded.every((value) => !value);
    const buttonLabel = allCollapsed ? "Expand all" : "Collapse all";
    const showExpandButton = !!figures?.length;

    return (
        <View>
            {figures?.map((figure, index) => (
                <LockedFigureSettings
                    expanded={expanded[index]}
                    onToggle={(newValue) => {
                        const newExpanded = [...expanded];
                        newExpanded[index] = newValue;
                        setExpanded(newExpanded);
                    }}
                    key={`${uniqueId}-locked-${figure}-${index}`}
                    {...figure}
                    onChangeProps={(newProps) => changeProps(index, newProps)}
                    onRemove={() => removeLockedFigure(index)}
                />
            ))}
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
