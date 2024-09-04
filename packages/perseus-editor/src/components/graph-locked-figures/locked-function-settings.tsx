/**
 * LockedFunctionSettings is a component that allows the user to edit the
 * settings of specifically a locked function on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import caretDoubleLeftIcon from "@phosphor-icons/core/assets/regular/caret-double-left.svg";
import copyIcon from "@phosphor-icons/core/assets/regular/copy.svg";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {useEffect, useState} from "react";

import PerseusEditorAccordion from "../perseus-editor-accordion";

import ColorSelect from "./color-select";
import LineStrokeSelect from "./line-stroke-select";
import LineSwatch from "./line-swatch";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import examples from "./locked-function-examples";

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

const LockedFunctionSettings = (props: Props) => {
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

    // Tracking the string value of domain constraints to handle interim state of
    //     entering a negative value, as well as representing Infinity as an empty string.
    // This variable is used when specifying the values of the input fields.
    const [domainEntries, setDomainEntries] = useState([
        domain && domain[0] !== -Infinity ? domain[0].toString() : "",
        domain && domain[1] !== Infinity ? domain[1].toString() : "",
    ]);

    const [exampleCategory, setExampleCategory] = useState("");

    useEffect(() => {
        // "useEffect" used to maintain parity between domain constraints and their string representation.
        setDomainEntries([
            domain && domain[0] !== -Infinity ? domain[0].toString() : "",
            domain && domain[1] !== Infinity ? domain[1].toString() : "",
        ]);
    }, [domain]);

    // Generic function for handling property changes (except for 'domain')
    function handlePropChange(property: string, newValue: string) {
        const updatedProps: Partial<LockedFunctionType> = {};
        updatedProps[property] = newValue;
        onChangeProps(updatedProps);
    }

    /*
     Reason for having a separate 'propChange' function for 'domain':
        Domain entries are optional. Their default value is +/- Infinity.
        Since input fields that are empty evaluate to zero, there needs to be
            dedicated code to convert empty to Infinity.
     */
    function handleDomainChange(limitIndex: number, newValueString: string) {
        const newDomainEntries = [...domainEntries];
        newDomainEntries[limitIndex] = newValueString;
        setDomainEntries(newDomainEntries);
        const newDomain: Interval = domain
            ? [...domain]
            : [-Infinity, Infinity];

        let newValue = parseFloat(newValueString);
        if (newValueString === "" && limitIndex === 0) {
            newValue = -Infinity;
        } else if (newValueString === "" && limitIndex === 1) {
            newValue = Infinity;
        }
        newDomain[limitIndex] = newValue;
        onChangeProps({domain: newDomain});
    }

    const exampleCategories = Object.keys(examples);
    const exampleCategorySelected = exampleCategory !== "";
    const exampleContent = exampleCategorySelected
        ? examples[exampleCategory]
        : ["Select category to see example equations"];
    const exampleContentStyles = exampleCategorySelected
        ? styles.exampleContent
        : [styles.exampleContent, styles.exampleContentInstructions];

    return (
        <PerseusEditorAccordion
            expanded={props.expanded}
            onToggle={props.onToggle}
            header={
                <View style={styles.row}>
                    <LabelLarge style={styles.accordionHeader}>
                        {lineLabel}
                    </LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <LineSwatch color={lineColor} lineStyle={strokeStyle} />
                </View>
            }
        >
            <View style={[styles.row, styles.spaceUnder]}>
                {/* Line color settings */}
                <ColorSelect
                    selectedValue={lineColor}
                    onChange={(newValue) => {
                        handlePropChange("color", newValue);
                    }}
                />
                <Strut size={spacing.small_12} />

                {/* Line style settings */}
                <LineStrokeSelect
                    selectedValue={strokeStyle}
                    onChange={(newValue) => {
                        handlePropChange("strokeStyle", newValue);
                    }}
                />
            </View>

            <View style={[styles.row, styles.rowSpace]}>
                {/* Directional axis (x or y) */}
                <SingleSelect
                    selectedValue={directionalAxis}
                    onChange={(newValue) => {
                        handlePropChange("directionalAxis", newValue);
                    }}
                    aria-label="equation prefix"
                    style={styles.dropdownMenu}
                    // Placeholder is required, but never gets used.
                    placeholder=""
                >
                    <OptionItem value="x" label="y =" />
                    <OptionItem value="y" label="x =" />
                </SingleSelect>
                <Strut size={spacing.xSmall_8} />
                {/* Equation entry */}
                <TextField
                    type="text"
                    aria-label="equation"
                    value={equation}
                    onChange={(newValue) => {
                        handlePropChange("equation", newValue);
                    }}
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
                        onChange={(newValue) => {
                            handleDomainChange(0, newValue);
                        }}
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
                        onChange={(newValue) => {
                            handleDomainChange(1, newValue);
                        }}
                    />
                </LabelMedium>
            </View>

            {/* Examples */}
            <View style={[styles.exampleWorkspace, styles.rowSpace]}>
                <SingleSelect
                    selectedValue={exampleCategory}
                    onChange={setExampleCategory}
                    style={styles.dropdownMenu}
                    placeholder="examples"
                >
                    {exampleCategories.map((category) => {
                        return (
                            <OptionItem
                                key={category}
                                value={category}
                                label={category}
                            />
                        );
                    })}
                </SingleSelect>
                <Strut size={spacing.small_12} />
                <ul className={css(styles.exampleContainer)}>
                    {exampleContent.map((example, index) => {
                        return (
                            <li
                                key={`${exampleCategory}-${index}`}
                                className={css(styles.exampleRow)}
                            >
                                {exampleCategorySelected && (
                                    <IconButton
                                        icon={copyIcon}
                                        aria-label="copy example"
                                        onClick={(e) =>
                                            navigator.clipboard.writeText(
                                                example,
                                            )
                                        }
                                        size="medium"
                                        style={styles.copyButton}
                                    />
                                )}
                                {!exampleCategorySelected && (
                                    <PhosphorIcon
                                        icon={caretDoubleLeftIcon}
                                        size="medium"
                                        color={color.fadedOffBlack64}
                                    />
                                )}
                                <Strut size={spacing.small_12} />
                                <View style={exampleContentStyles}>
                                    {example}
                                </View>
                            </li>
                        );
                    })}
                </ul>
            </View>

            {/* Actions */}
            <LockedFigureSettingsActions
                figureType={props.type}
                onMove={onMove}
                onRemove={onRemove}
            />
        </PerseusEditorAccordion>
    );
};

const styles = StyleSheet.create({
    accordionHeader: {
        textOverflow: "ellipsis",
        // A maximum width needs to be specified in order for the ellipsis to work.
        // The 64px in the calculation accounts for the line swatch (56px) and the preceding strut (8px).
        // Margin and padding won't work here because they would create space between the header text and the swatch.
        maxWidth: "calc(100% - 64px)",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    copyButton: {
        flexShrink: "0",
    },
    domainMin: {
        alignItems: "center",
        display: "flex",
        // The 'width' property is applied to the label, which wraps the text and the input field.
        // The width of the input fields (min/max) should be the same (to have a consistent look),
        //     so the following calculation distributes the space accordingly.
        // For the "domain min" block, the text is 82.7px, and the strut is 6px (88.7px total).
        // The "domain max" block is 30.23px, and the strut is 6px (36.23px total).
        // The calculation takes the remain space after the text & struts (141px total) are removed,
        //     and divides it between the two input fields equally.
        // The calculation reads: "Take 1/2 of the non-text space, and add the required space for this label's text"
        width: "calc(((100% - 141px) / 2) + 88.7px)",
        // @ts-expect-error // TS2353: textWrap does not exist in type CSSProperties
        textWrap: "nowrap",
    },
    domainMinField: {
        width: "calc(100% - 88.7px)", // make room for the label
    },
    domainMax: {
        alignItems: "center",
        display: "flex",
        // See explanation for "domainMin" for the calculation below.
        width: "calc(((100% - 141px) / 2) + 36.2px)",
    },
    domainMaxField: {
        width: "calc(100% - 36.2px)", // make room for the label
    },
    dropdownMenu: {
        minWidth: "auto",
        maxWidth: "120px",
    },
    exampleContainer: {
        background: "white",
        border: `1px solid ${color.fadedOffBlack16}`,
        borderRadius: "4px",
        flexGrow: "1",
        listStyleType: "none",
        // Nothing special about the maxHeight value,
        //    just a good height to partially show a 3rd example in the list
        //    to hint at scrollable content.
        maxHeight: "88px",
        margin: "0",
        overflowY: "scroll",
        padding: "12px",
    },
    exampleContent: {
        color: color.offBlack,
        fontFamily: `"Lato", sans-serif`,
        flexGrow: "1",
    },
    exampleContentInstructions: {
        color: color.fadedOffBlack64,
    },
    exampleRow: {
        display: "flex",
        flexDirection: "row",
        minHeight: "44px",
    },
    exampleWorkspace: {
        display: "flex",
        flexDirection: "row",
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
