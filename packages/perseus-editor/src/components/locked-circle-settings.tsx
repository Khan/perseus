import {components} from "@khanacademy/perseus";
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CircleSwatch from "./circle-swatch";
import ColorSelect from "./color-select";
import CoordinatePairInput from "./coordinate-pair-input";
import LockedFigureSettingsAccordion from "./locked-figure-settings-accordion";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {AccordionProps} from "./locked-figure-settings";
import type {
    LockedCircleFillType,
    LockedCircleType,
} from "@khanacademy/perseus";

const {InfoTip} = components;

export type Props = AccordionProps &
    LockedCircleType & {
        /**
         * Called when the delete button is pressed.
         */
        onRemove: () => void;
        /**
         * Called when the props (coords, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedCircleType>) => void;
    };

const LockedCircleSettings = (props: Props) => {
    const {
        center,
        radius,
        color,
        fillStyle,
        strokeStyle,
        expanded,
        onToggle,
        onChangeProps,
        onRemove,
    } = props;

    const [radiusInput, setRadiusInput] = React.useState(radius.toString());

    const ids = useUniqueIdWithMock();
    const radiusInputId = ids.get("radius-input");
    const strokeSelectId = ids.get("stroke-style-select");
    const fillSelectId = ids.get("fill-style-select");

    function handleRadiusChange(newValue) {
        // Update the local state (update the input field value).
        setRadiusInput(newValue);

        // If the new value is not a number, don't update the props.
        // If it's empty, keep the props the same value instead of setting to 0.
        if (isNaN(+newValue) || newValue === "") {
            return;
        }

        // Update the props (update the graph).
        onChangeProps({radius: +newValue});
    }

    function handleColorChange(newValue) {
        onChangeProps({color: newValue});
    }

    return (
        <LockedFigureSettingsAccordion
            expanded={expanded}
            onToggle={onToggle}
            header={
                // Summary: Circle, center, radius, color (opacity, dashed)
                <View style={styles.row}>
                    <LabelLarge>{`Circle (${center[0]}, ${center[1]}), radius ${radius}`}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <CircleSwatch
                        color={props.color}
                        fillStyle={fillStyle}
                        strokeStyle={strokeStyle}
                    />
                </View>
            }
        >
            {/* Center point */}
            <View style={styles.row}>
                <CoordinatePairInput
                    coord={center}
                    onChangeProps={onChangeProps}
                    changedProp="center"
                />
                <View style={styles.spaceUnder}>
                    <InfoTip>
                        The coordinates for the center of the circle
                    </InfoTip>
                </View>
            </View>

            {/* Radius */}
            <View style={[styles.row, styles.spaceUnder]}>
                <LabelMedium
                    htmlFor={radiusInputId}
                    style={styles.label}
                    tag="label"
                >
                    radius
                </LabelMedium>
                <TextField
                    id={radiusInputId}
                    type="number"
                    value={radiusInput}
                    onChange={handleRadiusChange}
                    style={{maxWidth: 72}}
                />
                <Strut size={spacing.medium_16} />

                {/* Stroke style */}
                <LabelMedium
                    tag="label"
                    htmlFor={strokeSelectId}
                    style={styles.label}
                >
                    stroke
                </LabelMedium>
                <SingleSelect
                    id={strokeSelectId}
                    selectedValue={strokeStyle}
                    onChange={(value: "solid" | "dashed") =>
                        onChangeProps({strokeStyle: value})
                    }
                    // Placeholder is required, but never gets used.
                    placeholder=""
                >
                    <OptionItem value="solid" label="solid">
                        solid
                    </OptionItem>
                    <OptionItem value="dashed" label="dashed">
                        dashed
                    </OptionItem>
                </SingleSelect>
            </View>

            <View style={[styles.row, styles.spaceUnder]}>
                {/* Color */}
                <ColorSelect
                    selectedValue={color}
                    onChange={handleColorChange}
                />
                <Strut size={spacing.medium_16} />

                {/* Fill opacity */}
                <LabelMedium
                    tag="label"
                    htmlFor={fillSelectId}
                    style={styles.label}
                >
                    fill
                </LabelMedium>
                <SingleSelect
                    id={fillSelectId}
                    selectedValue={fillStyle}
                    onChange={(value: LockedCircleFillType) =>
                        onChangeProps({fillStyle: value})
                    }
                    // Placeholder is required, but never gets used.
                    placeholder=""
                >
                    <OptionItem value="none" label="none">
                        none
                    </OptionItem>
                    <OptionItem value="solid" label="solid">
                        solid
                    </OptionItem>
                    <OptionItem value="translucent" label="translucent">
                        translucent
                    </OptionItem>
                </SingleSelect>
            </View>

            {/* Actions */}
            <LockedFigureSettingsActions
                onRemove={onRemove}
                figureAriaLabel={`locked circle at ${center[0]}, ${center[1]}`}
            />
        </LockedFigureSettingsAccordion>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        marginInlineEnd: spacing.xxSmall_6,
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
});

export default LockedCircleSettings;
