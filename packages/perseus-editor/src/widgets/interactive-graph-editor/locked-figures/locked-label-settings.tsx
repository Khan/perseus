/**
 * LockedLabelSettings is a component that allows the user to edit the
 * settings of specifically a locked label on the graph within the
 * Interactive Graph widget.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {components} from "@khanacademy/perseus";
import {
    lockedFigureColors,
    type LockedLabelType,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";
import {TypedSingleSelect} from "../../../components/typed-single-select";

import ColorSelect from "./color-select";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import styles from "./locked-label-settings.module.css";

import type {LockedFigureSettingsMovementType} from "./locked-figure-settings-actions";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {InfoTip} = components;

// Passed to Wonder Blocks `StyleType`-only props (CoordinatePairInput,
// ColorSelect) which don't accept a CSS-module className.
const spaceUnderStyle: StyleType = {marginBottom: sizing.size_080};

export type Props = LockedLabelType & {
    /**
     * Whether editing is disabled for this label's controls.
     */
    editingDisabled?: boolean;
    /**
     * Called when the props (coord, color, etc.) are updated.
     */
    onChangeProps: (newProps: Partial<LockedLabelType>) => void;

    // Movement props. Used for standalone label actions.
    // Not used within other locked figure settings.
    /**
     * Called when a movement button (top, up, down, bottom) is pressed.
     * This is also used to indicate that this LockedLabelSettings component
     * is for a standalone label, not part of a larger locked figure.
     */
    onMove?: (movement: LockedFigureSettingsMovementType) => void;
    /**
     * Called when the delete button is pressed.
     */
    onRemove: () => void;

    // Accordion props. Used for standalone labels for the expand/collapse
    // button functionality. Not used within other locked figure settings.
    /**
     * Whether this accordion is expanded.
     */
    expanded?: boolean;
    /**
     * Called when the accordion is expanded or collapsed.
     */
    onToggle?: (expanded: boolean) => void;

    // Container style for the accordion.
    containerStyle?: StyleType;
};

export default function LockedLabelSettings(props: Props) {
    const {
        type,
        coord,
        color,
        size,
        text,
        expanded,
        editingDisabled = false,
        onChangeProps,
        onMove,
        onRemove,
        onToggle,
        containerStyle,
    } = props;

    return (
        <PerseusEditorAccordion
            expanded={expanded}
            onToggle={onToggle}
            header={
                <View
                    className={`${styles.row} ${styles.accordionHeaderContainer} ${styles.header}`}
                >
                    <BodyText size="medium" weight="bold" tag="span">
                        Label ({coord[0]}, {coord[1]})
                    </BodyText>
                    {text !== "" && (
                        <BodyText
                            size="medium"
                            weight="bold"
                            tag="span"
                            className={styles.accordionHeader}
                            style={{
                                color: lockedFigureColors[color],
                            }}
                        >
                            {text}
                        </BodyText>
                    )}
                </View>
            }
            containerStyle={containerStyle}
        >
            {/* Coord settings */}
            <CoordinatePairInput
                coord={coord}
                disabled={editingDisabled}
                onChange={(newCoords) => {
                    onChangeProps({coord: newCoords});
                }}
                style={spaceUnderStyle}
            />

            {/* Text settings */}
            <View className={styles.row}>
                <BodyText
                    tag="label"
                    className={`${styles.row} ${styles.textLabel}`}
                >
                    text
                    <TextField
                        value={text}
                        placeholder="ex. $x^2$ or $\frac{1}{2}$"
                        disabled={editingDisabled}
                        onChange={(newValue) =>
                            onChangeProps({
                                text: newValue,
                            })
                        }
                    />
                </BodyText>
                <InfoTip>
                    Surround your text with $ for TeX.
                    <br />
                    Example: {`This circle has radius $\\frac{1}{2}$ units.`}
                    <br />
                    <br />
                    It is important to use TeX when appropriate for
                    accessibility. The above example would be read as &quot;This
                    circle has radius one-half units&quot; by screen readers.
                </InfoTip>
            </View>

            <View className={`${styles.row} ${styles.colorRow}`}>
                <ColorSelect
                    selectedValue={color}
                    editingDisabled={editingDisabled}
                    onChange={(newColor) => {
                        onChangeProps({color: newColor});
                    }}
                    style={spaceUnderStyle}
                />

                {/* Size settings */}
                <BodyText
                    tag="label"
                    className={`${styles.row} ${styles.sizeLabel}`}
                >
                    size
                    <TypedSingleSelect<LockedLabelType["size"]>
                        selectedValue={size}
                        disabled={editingDisabled}
                        onChange={(newValue) => onChangeProps({size: newValue})}
                        options={{
                            small: "small",
                            medium: "medium",
                            large: "large",
                        }}
                        // Placeholder is required, but never gets used since
                        // we have a label for the select.
                        placeholder=""
                    />
                </BodyText>
            </View>

            {/* Actions */}
            <LockedFigureSettingsActions
                figureType={type}
                editingDisabled={editingDisabled}
                onMove={onMove}
                onRemove={onRemove}
            />
        </PerseusEditorAccordion>
    );
}
