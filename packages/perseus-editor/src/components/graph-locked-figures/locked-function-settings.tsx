/**
 * LockedFunctionSettings is a component that allows the user to edit the
 * settings of specifically a locked function on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";
import {TextField, RadioGroup, Choice} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import PerseusEditorAccordion from "../perseus-editor-accordion";

import ColorSelect from "./color-select";
import LineStrokeSelect from "./line-stroke-select";
import LineSwatch from "./line-swatch";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {LockedFunctionType} from "@khanacademy/perseus";
import type {Interval} from "mafs";

export type Props = LockedFunctionType &
    LockedFigureSettingsCommonProps & {
        /**
         * Called when the props (points, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedFunctionType>) => void;
    };

export const LockedFunctionSettings = (props: Props) => {
    const {
        color: lineColor,
        strokeStyle,
        equation,
        directionalAxis,
        domain,
        onChangeProps,
        onMove,
        onRemove,
    } = props;
    const lineLabel = `Function (<tbd>)`;
    const domainLimits = domain ? [...domain] : [-Infinity, Infinity];

    function handlePropChange(property: string, newValue: string) {
        const updatedProps: Partial<LockedFunctionType> = {};
        updatedProps[property] = newValue;
        onChangeProps(updatedProps);
    }

    function handleDomainChange(limitIndex: number, newValueString: string) {
        // TODO: Is this the better way to handle validating numbers? (getting warnings in the console)
        //       Also, unable to enter a negative number (have to enter number, then add minus sign)
        const newValue = parseFloat(newValueString);
        const otherIndex = Math.abs(limitIndex - 1);
        const otherValue = domainLimits[otherIndex];
        const newDomain: Interval = [-Infinity, Infinity];
        newDomain[limitIndex] = newValue;
        newDomain[otherIndex] = otherValue;
        onChangeProps({domain: newDomain});
    }

    return (
        <UniqueIDProvider
            mockOnFirstRender={true}
            scope="locked-function-settings"
        >
            {(ids) => (
                <PerseusEditorAccordion
                    expanded={props.expanded}
                    onToggle={props.onToggle}
                    header={
                        <View style={styles.row}>
                            <LabelLarge>{lineLabel}</LabelLarge>
                            <Strut size={spacing.xSmall_8} />
                            <LineSwatch
                                color={lineColor}
                                lineStyle={strokeStyle}
                            />
                        </View>
                    }
                >
                    <View style={[styles.row, styles.spaceUnder]}>
                        {/* Line color settings */}
                        <ColorSelect
                            selectedValue={lineColor}
                            onChange={handlePropChange.bind(null, "color")}
                        />
                        <Strut size={spacing.small_12} />

                        {/* Line style settings */}
                        <LineStrokeSelect
                            selectedValue={strokeStyle}
                            onChange={handlePropChange.bind(
                                null,
                                "strokeStyle",
                            )}
                        />
                    </View>

                    <LabelMedium
                        tag="label"
                        style={[styles.row, styles.rowSpace]}
                    >
                        {"equation"}
                        <Strut size={spacing.xSmall_8} />
                        <TextField
                            type="text"
                            value={equation}
                            onChange={handlePropChange.bind(null, "equation")}
                            style={[styles.textField]}
                        />
                    </LabelMedium>

                    <RadioGroup
                        label="directional axis"
                        groupName={ids.get("directional-axis")}
                        selectedValue={directionalAxis}
                        onChange={handlePropChange.bind(
                            null,
                            "directionalAxis",
                        )}
                        style={[styles.row, styles.rowSpace]}
                    >
                        <Choice label="x" value="x" />
                        <Strut size={spacing.large_24} />
                        <Choice label="y" value="y" style={styles.choiceY} />
                    </RadioGroup>

                    {/* Domain restrictions */}
                    <View style={[styles.row, styles.rowSpace]}>
                        <LabelMedium tag="label" style={styles.domainMin}>
                            {"domain min"}

                            <Strut size={spacing.xxSmall_6} />
                            <TextField
                                type="number"
                                style={styles.domainMinField}
                                value={`${domainLimits[0]}`}
                                onChange={handleDomainChange.bind(null, 0)}
                            />
                        </LabelMedium>
                        <Strut size={spacing.medium_16} />
                        <LabelMedium
                            tag="label"
                            aria-label="domain max"
                            style={styles.domainMax}
                        >
                            {"max"}

                            <Strut size={spacing.xxSmall_6} />
                            <TextField
                                type="number"
                                style={styles.domainMaxField}
                                value={`${domainLimits[1]}`}
                                onChange={(newValue) => {
                                    onChangeProps({
                                        domain: [
                                            domainLimits[0],
                                            parseFloat(newValue),
                                        ],
                                    });
                                }}
                            />
                        </LabelMedium>
                    </View>

                    {/* Actions */}
                    <LockedFigureSettingsActions
                        showM2Features={props.showM2Features}
                        figureType={props.type}
                        onMove={onMove}
                        onRemove={onRemove}
                    />
                </PerseusEditorAccordion>
            )}
        </UniqueIDProvider>
    );
};

const styles = StyleSheet.create({
    choiceY: {
        // WB RadioGroup adds a top margin to the last option,
        //     which messes with the linear nature of this group
        marginTop: 0,
    },
    domainMin: {
        alignItems: "center",
        display: "flex",
        width: "calc(((100% - 141px) / 2) + 88.6px)",
        // @ts-expect-error // TS2353: textWrap does not exist in type CSSProperties
        textWrap: "nowrap",
    },
    domainMinField: {
        width: "calc(100% - 88.6px)", // make room for the label
    },
    domainMax: {
        alignItems: "center",
        display: "flex",
        width: "calc(((100% - 141px) / 2) + 36.2px)",
    },
    domainMaxField: {
        width: "calc(100% - 36.2px)", // make room for the label
    },
    rowSpace: {
        marginTop: spacing.xSmall_8,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    textField: {
        flexGrow: "1",
    },
});

export default LockedFunctionSettings;
