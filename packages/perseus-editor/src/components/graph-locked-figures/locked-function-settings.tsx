/**
 * LockedFunctionSettings is a component that allows the user to edit the
 * settings of specifically a locked function on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useEffect, useState} from "react";

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
    const equationPrefix = directionalAxis === "x" ? "y=" : "x=";
    const lineLabel = `Function (${equationPrefix}${equation})`;
    const domainLimits = domain ? [...domain] : [-Infinity, Infinity];
    const [domainEntries, setDomainEntries] = useState([
        domain ? domain[0].toString() : "",
        domain ? domain[1].toString() : "",
    ]);

    useEffect(() => {
        setDomainEntries([
            domain ? domain[0].toString() : "",
            domain ? domain[1].toString() : "",
        ]);
    }, [domain]);

    function handlePropChange(property: string, newValue: string) {
        const updatedProps: Partial<LockedFunctionType> = {};
        updatedProps[property] = newValue;
        onChangeProps(updatedProps);
    }

    function handleDomainChange(limitIndex: number, newValueString: string) {
        const newDomainEntry = [...domainEntries];
        newDomainEntry[limitIndex] = newValueString;
        setDomainEntries(newDomainEntry);
        if (isNaN(parseFloat(newValueString)) && newValueString !== "") {
            return;
        }

        const newDomain: Interval | undefined = [
            domainLimits[0],
            domainLimits[1],
        ];
        let newValue = parseFloat(newValueString);
        if (newValueString === "" && limitIndex === 0) {
            newValue = -Infinity;
        } else if (newValueString === "" && limitIndex === 1) {
            newValue = Infinity;
        }
        newDomain[limitIndex] = newValue;
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
                            <LabelLarge style={styles.accordionHeader}>
                                {lineLabel}
                            </LabelLarge>
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

                    <View style={[styles.row, styles.rowSpace]}>
                        <SingleSelect
                            selectedValue={directionalAxis}
                            onChange={handlePropChange.bind(
                                null,
                                "directionalAxis",
                            )}
                            aria-label="equation prefix"
                            style={styles.equationPrefix}
                            // Placeholder is required, but never gets used.
                            placeholder=""
                        >
                            <OptionItem value="x" label="y =" />
                            <OptionItem value="y" label="x =" />
                        </SingleSelect>
                        <Strut size={spacing.xSmall_8} />
                        <TextField
                            type="text"
                            aria-label="equation"
                            value={equation}
                            onChange={handlePropChange.bind(null, "equation")}
                            style={[styles.textField]}
                        />
                    </View>

                    {/* Domain restrictions */}
                    <View style={[styles.row, styles.rowSpace]}>
                        <LabelMedium tag="label" style={styles.domainMin}>
                            {"domain min"}

                            <Strut size={spacing.xxSmall_6} />
                            <TextField
                                type="number"
                                style={styles.domainMinField}
                                value={domainEntries[0]}
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
                                value={domainEntries[1]}
                                onChange={handleDomainChange.bind(null, 1)}
                            />
                        </LabelMedium>
                    </View>

                    {/* Actions */}
                    <LockedFigureSettingsActions
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
    accordionHeader: {
        textOverflow: "ellipsis",
        maxWidth: "calc(100% - 64px)",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    equationPrefix: {
        minWidth: "auto",
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
