/**
 * LockedFunctionSettings is a component that allows the user to edit the
 * settings of specifically a locked function on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import copyIcon from "@phosphor-icons/core/assets/regular/copy.svg";
import autoPasteIcon from "@phosphor-icons/core/assets/regular/note-pencil.svg";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import * as React from "react";
import {useEffect, useId, useState} from "react";

import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";
import {TypedSingleSelect} from "../../../components/typed-single-select";

import ColorSelect from "./color-select";
import LineStrokeSelect from "./line-stroke-select";
import LineSwatch from "./line-swatch";
import LineWeightSelect from "./line-weight-select";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import {examples} from "./locked-function-examples";
import styles from "./locked-function-settings.module.css";
import LockedLabelSettings from "./locked-label-settings";
import {
    generateLockedFigureAppearanceDescription,
    joinLabelsAsSpokenMath,
} from "./util";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {ExampleCategory} from "./locked-function-examples";
import type {SelectOptions} from "../../../components/typed-single-select";
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
        editingDisabled = false,
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

    const [exampleCategory, setExampleCategory] =
        useState<ExampleCategory | null>(null);

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

    const exampleContent =
        exampleCategory != null
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
                <View className={`${styles.row} ${styles.header}`}>
                    <BodyText
                        size="medium"
                        weight="bold"
                        tag="span"
                        className={styles.accordionHeader}
                    >
                        {lineLabel}
                    </BodyText>
                    <LineSwatch color={lineColor} lineStyle={strokeStyle} />
                </View>
            }
        >
            <View className={`${styles.row} ${styles.colorRow}`}>
                {/* Line color settings */}
                <ColorSelect
                    selectedValue={lineColor}
                    editingDisabled={editingDisabled}
                    onChange={handleColorChange}
                />

                {/* Line style settings */}
                <LineStrokeSelect
                    selectedValue={strokeStyle}
                    editingDisabled={editingDisabled}
                    onChange={(newValue) => {
                        handlePropChange("strokeStyle", newValue);
                    }}
                />
            </View>

            {/* Line weight settings */}
            <LineWeightSelect
                selectedValue={weight}
                editingDisabled={editingDisabled}
                onChange={(value) => onChangeProps({weight: value})}
            />

            <View
                className={`${styles.row} ${styles.rowSpace} ${styles.axisRow}`}
            >
                {/* Directional axis (x or y) */}
                <TypedSingleSelect
                    selectedValue={directionalAxis}
                    disabled={editingDisabled}
                    options={{x: "y =", y: "x ="}}
                    onChange={(newValue) => {
                        handlePropChange("directionalAxis", newValue);
                    }}
                    aria-label="equation prefix"
                    className={`${styles.dropdownLabel} ${styles.axisMenu}`}
                />
                {/* Equation entry */}
                <TextField
                    type="text"
                    aria-label="equation"
                    value={equation}
                    disabled={editingDisabled}
                    onChange={(newValue) => {
                        handlePropChange("equation", newValue);
                    }}
                    style={{flexGrow: 1}}
                />
            </View>

            {/* Domain/Range restrictions */}
            <View
                className={`${styles.row} ${styles.rowSpace} ${styles.domainRow}`}
            >
                <BodyText
                    tag="label"
                    className={`${styles.dropdownLabel} ${styles.domainMin}`}
                >
                    {"domain min"}

                    <TextField
                        type="number"
                        // make room for the label
                        style={{width: "calc(100% - 88.7px)"}}
                        value={domainEntries[0]}
                        disabled={editingDisabled}
                        onChange={(newValue) => {
                            handleDomainChange(0, newValue);
                        }}
                    />
                </BodyText>
                <BodyText
                    tag="label"
                    aria-label="domain max"
                    className={`${styles.dropdownLabel} ${styles.domainMax}`}
                >
                    {"max"}

                    <TextField
                        type="number"
                        style={{width: "calc(100% - 36.2px)"}}
                        value={domainEntries[1]}
                        disabled={editingDisabled}
                        onChange={(newValue) => {
                            handleDomainChange(1, newValue);
                        }}
                    />
                </BodyText>
            </View>

            {/* Examples */}
            <PerseusEditorAccordion
                header={
                    <BodyText size="medium" weight="bold" tag="span">
                        Example Functions
                    </BodyText>
                }
                expanded={false}
                containerStyle={{
                    background: semanticColor.core.background.base.subtle,
                }}
                panelStyle={{
                    alignItems: "start",
                    paddingBottom: sizing.size_120,
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                <BodyText tag="label" className={styles.dropdownLabel}>
                    {"Choose a category"}
                    <TypedSingleSelect
                        selectedValue={exampleCategory}
                        disabled={editingDisabled}
                        options={
                            {
                                linear: "linear",
                                polynomial: "polynomial",
                                trigonometric: "trigonometric",
                            } satisfies SelectOptions<ExampleCategory>
                        }
                        onChange={setExampleCategory}
                        placeholder="examples"
                    />
                </BodyText>
                {exampleCategory != null && (
                    <ul className={styles.exampleContainer}>
                        {exampleContent.map((example, index) => (
                            <ExampleItem
                                key={index}
                                category={exampleCategory}
                                example={example}
                                index={index}
                                editingDisabled={editingDisabled}
                                pasteEquationFn={handlePropChange}
                            />
                        ))}
                    </ul>
                )}
            </PerseusEditorAccordion>

            {/* Aria label */}
            <View className={`${styles.horizontalRule} ${styles.sectionTop}`} />
            <LockedFigureAria
                ariaLabel={ariaLabel}
                getPrepopulatedAriaLabel={getPrepopulatedAriaLabel}
                editingDisabled={editingDisabled}
                onChangeProps={(newProps) => {
                    onChangeProps(newProps);
                }}
            />

            {/* Visible Labels */}
            <View
                className={`${styles.horizontalRule} ${styles.dividerTight}`}
            />
            <BodyText className={styles.sectionTop}>Visible labels</BodyText>
            {labels.map((label, labelIndex) => (
                <LockedLabelSettings
                    key={labelIndex}
                    {...label}
                    editingDisabled={editingDisabled}
                    expanded={true}
                    onChangeProps={(newLabel) => {
                        handleLabelChange(newLabel, labelIndex);
                    }}
                    onRemove={() => {
                        handleLabelRemove(labelIndex);
                    }}
                    containerStyle={{
                        backgroundColor:
                            semanticColor.core.background.base.default,
                    }}
                />
            ))}
            <Button
                kind="tertiary"
                startIcon={plusCircle}
                disabled={editingDisabled}
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
                className={styles.addButton}
            >
                Add visible label
            </Button>

            {/* Actions */}
            <LockedFigureSettingsActions
                figureType={props.type}
                editingDisabled={editingDisabled}
                onMove={onMove}
                onRemove={onRemove}
            />
        </PerseusEditorAccordion>
    );
};

interface ItemProps {
    category: string;
    example: string;
    index: number;
    editingDisabled?: boolean;
    pasteEquationFn: (property: string, newValue: string) => void;
}

const ExampleItem = (props: ItemProps): React.ReactElement => {
    const {category, example, index, editingDisabled, pasteEquationFn} = props;
    const exampleId = useId();

    return (
        <li key={`${category}-${index}`} className={styles.exampleRow}>
            <IconButton
                icon={autoPasteIcon}
                kind="tertiary"
                aria-label="paste example"
                aria-describedby={exampleId}
                disabled={editingDisabled}
                onClick={() => pasteEquationFn("equation", example)}
                size="medium"
                className={styles.copyPasteButton}
            />
            <IconButton
                icon={copyIcon}
                kind="tertiary"
                aria-label="copy example"
                aria-describedby={exampleId}
                disabled={editingDisabled}
                onClick={() => navigator.clipboard.writeText(example)}
                size="medium"
                className={styles.copyPasteButton}
            />
            <View
                className={`${styles.exampleContent} ${styles.exampleContentIndent}`}
                id={exampleId}
            >
                {example}
            </View>
        </li>
    );
};

export default LockedFunctionSettings;
