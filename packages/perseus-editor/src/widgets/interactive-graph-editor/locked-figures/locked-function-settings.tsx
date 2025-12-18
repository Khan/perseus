/**
 * LockedFunctionSettings is a component that allows the user to edit the
 * settings of specifically a locked function on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {TextField} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import copyIcon from "@phosphor-icons/core/assets/regular/copy.svg";
import autoPasteIcon from "@phosphor-icons/core/assets/regular/note-pencil.svg";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {useEffect, useId, useState} from "react";

import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import LineStrokeSelect from "./line-stroke-select";
import LineSwatch from "./line-swatch";
import LineWeightSelect from "./line-weight-select";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import examples from "./locked-function-examples";
import LockedLabelSettings from "./locked-label-settings";
import {
    generateLockedFigureAppearanceDescription,
    joinLabelsAsSpokenMath,
} from "./util";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {
    LockedFigureColor,
    LockedFunctionType,
    LockedLabelType,
} from "@khanacademy/perseus-core";

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
        weight,
        ariaLabel,
        onChangeProps,
        onMove,
        onRemove,
    } = props;
    const labels = props.labels;
    const equationPrefix = directionalAxis === "x" ? "y=" : "x=";
    const lineLabel = `Function (${equationPrefix}${equation})`;

    // Tracking the string value of domain/range constraints to handle interim state of
    //     entering a negative value, as well as representing Infinity as an empty string.
    // This variable is used when specifying the values of the input fields.
    const getDomainStringValues = (domain): [string, string] => {
        return [
            Number.isFinite(domain[0]) ? domain[0].toString() : "",
            Number.isFinite(domain[1]) ? domain[1].toString() : "",
        ];
    };

    const [domainEntries, setDomainEntries] = useState(
        getDomainStringValues(domain),
    );

    const [exampleCategory, setExampleCategory] = useState("");

    useEffect(() => {
        // "useEffect" used to maintain parity between domain/range constraints and their string representation.
        setDomainEntries(getDomainStringValues(domain));
    }, [domain]);

    /**
     * Generate the prepopulated aria label for the function,
     * with the math details converted into spoken words.
     */
    async function getPrepopulatedAriaLabel() {
        const visiblelabel = await joinLabelsAsSpokenMath(labels);

        let str = `Function${visiblelabel} with equation ${equationPrefix}${equation}`;

        // Add the domain/range constraints to the aria label
        // if they are not the default values.
        if (Number.isFinite(domain[0]) || Number.isFinite(domain[1])) {
            str += `, domain from ${domain[0]} to ${domain[1]}`;
        }

        const functionAppearance = generateLockedFigureAppearanceDescription(
            lineColor,
            strokeStyle,
            undefined, // fillStyle is not used for functions
            weight,
        );
        str += functionAppearance;

        return str;
    }

    // Generic function for handling property changes (except for 'domain/range')
    function handlePropChange(property: string, newValue: string) {
        const updatedProps: Partial<LockedFunctionType> = {};
        updatedProps[property] = newValue;
        onChangeProps(updatedProps);
    }

    /*
     Reason for having a separate 'propChange' function for 'domain/range':
        Domain/Range entries are optional. Their default value is +/- Infinity.
        Since input fields that are empty evaluate to zero, there needs to be
            dedicated code to convert empty to Infinity.
     */
    function handleDomainChange(limitIndex: number, newValueString: string) {
        const newDomainEntries: [string, string] = [...domainEntries];
        newDomainEntries[limitIndex] = newValueString;
        setDomainEntries(newDomainEntries);
        const newDomain: [min: number, max: number] = [...domain];

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

    function handleColorChange(newValue: LockedFigureColor) {
        const newProps: Partial<LockedFunctionType> = {
            color: newValue,
        };

        // Update the color of all the labels to match the point
        newProps.labels = labels.map((label) => ({
            ...label,
            color: newValue,
        }));

        onChangeProps(newProps);
    }

    function handleLabelChange(
        updatedLabel: Partial<LockedLabelType>,
        labelIndex: number,
    ) {
        const updatedLabels = [...labels];
        updatedLabels[labelIndex] = {
            ...labels[labelIndex],
            ...updatedLabel,
        };

        onChangeProps({labels: updatedLabels});
    }

    function handleLabelRemove(labelIndex: number) {
        const updatedLabels = labels.filter((_, index) => index !== labelIndex);

        onChangeProps({labels: updatedLabels});
    }

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
            <View style={[styles.row, {marginBottom: sizing.size_080}]}>
                {/* Line color settings */}
                <ColorSelect
                    selectedValue={lineColor}
                    onChange={handleColorChange}
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

            {/* Line weight settings */}
            <LineWeightSelect
                selectedValue={weight}
                onChange={(value) => onChangeProps({weight: value})}
            />

            <View style={[styles.row, styles.rowSpace]}>
                {/* Directional axis (x or y) */}
                <SingleSelect
                    selectedValue={directionalAxis}
                    onChange={(newValue) => {
                        handlePropChange("directionalAxis", newValue);
                    }}
                    aria-label="equation prefix"
                    style={[styles.dropdownLabel, styles.axisMenu]}
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

            {/* Domain/Range restrictions */}
            <View style={[styles.row, styles.rowSpace]}>
                <LabelMedium
                    tag="label"
                    style={[styles.dropdownLabel, styles.domainMin]}
                >
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
                    style={[styles.dropdownLabel, styles.domainMax]}
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
            <PerseusEditorAccordion
                header={<LabelLarge>Example Functions</LabelLarge>}
                expanded={false}
                containerStyle={styles.exampleWorkspace}
                panelStyle={styles.exampleAccordionPanel}
            >
                <LabelMedium tag="label" style={styles.dropdownLabel}>
                    {"Choose a category"}
                    <Strut size={spacing.xxSmall_6} />
                    <SingleSelect
                        selectedValue={exampleCategory}
                        onChange={setExampleCategory}
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
                </LabelMedium>
                {exampleCategorySelected && (
                    <ul className={css(styles.exampleContainer)}>
                        {exampleContent.map((example, index) => (
                            <ExampleItem
                                key={index}
                                category={exampleCategory}
                                example={example}
                                index={index}
                                pasteEquationFn={handlePropChange}
                            />
                        ))}
                    </ul>
                )}
            </PerseusEditorAccordion>

            {/* Aria label */}
            <Strut size={spacing.small_12} />
            <View style={styles.horizontalRule} />
            <LockedFigureAria
                ariaLabel={ariaLabel}
                getPrepopulatedAriaLabel={getPrepopulatedAriaLabel}
                onChangeProps={(newProps) => {
                    onChangeProps(newProps);
                }}
            />

            {/* Visible Labels */}
            <Strut size={spacing.xxxSmall_4} />
            <View style={styles.horizontalRule} />
            <Strut size={spacing.small_12} />
            <LabelMedium>Visible labels</LabelMedium>
            {labels.map((label, labelIndex) => (
                <LockedLabelSettings
                    key={labelIndex}
                    {...label}
                    expanded={true}
                    onChangeProps={(newLabel) => {
                        handleLabelChange(newLabel, labelIndex);
                    }}
                    onRemove={() => {
                        handleLabelRemove(labelIndex);
                    }}
                    containerStyle={styles.labelContainer}
                />
            ))}
            <Button
                kind="tertiary"
                startIcon={plusCircle}
                onClick={() => {
                    const newLabel = {
                        ...getDefaultFigureForType("label"),
                        // Vertical offset for each label so they
                        // don't overlap.
                        coord: [0, -labels.length],
                        // Default to the same color as the function
                        color: lineColor,
                    } satisfies LockedLabelType;

                    onChangeProps({
                        labels: [...labels, newLabel],
                    });
                }}
                style={styles.addButton}
            >
                Add visible label
            </Button>

            {/* Actions */}
            <LockedFigureSettingsActions
                figureType={props.type}
                onMove={onMove}
                onRemove={onRemove}
            />
        </PerseusEditorAccordion>
    );
};

type ItemProps = {
    category: string;
    example: string;
    index: number;
    pasteEquationFn: (property: string, newValue: string) => void;
};

const ExampleItem = (props: ItemProps): React.ReactElement => {
    const {category, example, index, pasteEquationFn} = props;
    const exampleId = useId();

    return (
        <li key={`${category}-${index}`} className={css(styles.exampleRow)}>
            <IconButton
                icon={autoPasteIcon}
                kind="tertiary"
                aria-label="paste example"
                aria-describedby={exampleId}
                onClick={() => pasteEquationFn("equation", example)}
                size="medium"
                style={styles.copyPasteButton}
            />
            <IconButton
                icon={copyIcon}
                kind="tertiary"
                aria-label="copy example"
                aria-describedby={exampleId}
                onClick={() => navigator.clipboard.writeText(example)}
                size="medium"
                style={styles.copyPasteButton}
            />
            <Strut size={spacing.xxxSmall_4} />
            <View style={styles.exampleContent} id={exampleId}>
                {example}
            </View>
        </li>
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
    axisMenu: {
        minWidth: "auto",
    },
    copyPasteButton: {
        flexShrink: "0",
        margin: "0 2px",
    },
    domainMin: {
        justifyContent: "space-between",
        // The 'width' property is applied to the label, which wraps the text and the input field.
        // The width of the input fields (min/max) should be the same (to have a consistent look),
        //     so the following calculation distributes the space accordingly.
        // For the "domain/range min" block, the text is 82.7px, and the strut is 6px (88.7px total).
        // The "domain/range max" block is 30.23px, and the strut is 6px (36.23px total).
        // The calculation takes the remain space after the text & struts (141px total) are removed,
        //     and divides it between the two input fields equally.
        // The calculation reads: "Take 1/2 of the non-text space, and add the required space for this label's text"
        width: "calc(((100% - 141px) / 2) + 88.7px)",
        textWrap: "nowrap",
    },
    domainMinField: {
        width: "calc(100% - 88.7px)", // make room for the label
    },
    domainMax: {
        // See explanation for "domainMin" for the calculation below.
        width: "calc(((100% - 141px) / 2) + 36.2px)",
    },
    domainMaxField: {
        width: "calc(100% - 36.2px)", // make room for the label
    },
    dropdownLabel: {
        alignItems: "center",
        display: "flex",
    },
    exampleAccordionPanel: {
        alignItems: "start",
        paddingBottom: "12px",
        flexDirection: "row",
        flexWrap: "wrap",
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
        margin: "8px 0 0 0",
        overflowY: "scroll",
        padding: "4px 12px 4px 4px",
    },
    exampleContent: {
        fontFamily: `"Lato", sans-serif`,
        flexGrow: "1",
        color: color.offBlack,
    },
    exampleRow: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        minHeight: "44px",
    },
    exampleWorkspace: {
        background: color.white50,
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

    // Label settings styles
    addButton: {
        alignSelf: "start",
    },
    horizontalRule: {
        height: 1,
        backgroundColor: color.offBlack16,
    },
    labelContainer: {
        backgroundColor: color.white,
    },
});

export default LockedFunctionSettings;
