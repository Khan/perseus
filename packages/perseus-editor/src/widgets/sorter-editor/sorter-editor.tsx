import {
    isFeatureOn,
    sorterLogic,
    SORTER_MAX_HORIZONTAL_CARDS,
    SORTER_MAX_CARDS,
    type PerseusSorterWidgetOptions,
    type SorterVariant,
} from "@khanacademy/perseus-core";
import Banner from "@khanacademy/wonder-blocks-banner";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import PerseusEditorAccordion from "../../components/perseus-editor-accordion";
import {TypedSingleSelect} from "../../components/typed-single-select";

import CardEditor from "./card-editor";
import LegendEditor, {getDefaultLegend} from "./legend-editor";
import styles from "./sorter-editor.module.css";

import type {APIOptions} from "@khanacademy/perseus";

// There's nothing to sort with fewer than two cards.
const minCards = 2;

// Annotated because WidgetLogic types `defaultWidgetOptions` as `any`. Without
// this, the `any` spreads: a destructured prop whose default is `any` is itself
// `any`, which would silently untype every option below.
const defaultOptions: PerseusSorterWidgetOptions =
    sorterLogic.defaultWidgetOptions;

const layoutOptions = {
    horizontal: "Horizontal",
    vertical: "Vertical",
} satisfies Record<PerseusSorterWidgetOptions["layout"], string>;

const variantOptions = {
    scale: "Scale",
    timeline: "Timeline",
} satisfies Record<SorterVariant, string>;

// TODO(benchristel): Define Props in terms of WidgetEditorProps. We can't do
//  this currently because `pnpm build:types` fails with a cryptic error. The
//  cause seems to be a combination of WidgetEditorProps' use of APIOptions and
//  the fact that this is a functional component.
interface Props extends PerseusSorterWidgetOptions {
    apiOptions?: APIOptions;
    onChange: (options: PerseusSorterWidgetOptions) => void;
}

/**
 * Imperative API that WidgetEditor calls
 */
type SorterEditorHandle = {
    getSaveWarnings: () => string[];
};

/**
 * An editor for adding a sorter widget that allows users to arrange items in a specific order.
 */
const SorterEditor = React.forwardRef<SorterEditorHandle, Props>(
    function SorterEditor(
        {
            correct = defaultOptions.correct,
            layout = defaultOptions.layout,
            variant = defaultOptions.variant,
            padding = defaultOptions.padding,
            legend,
            apiOptions,
            onChange,
        },
        ref,
    ) {
        const isDndSorter = isFeatureOn({apiOptions}, "dnd-widget-sorter");
        const [isLegendExpanded, setIsLegendExpanded] = React.useState(true);
        const displaysVertically =
            layout === "vertical" ||
            correct.length > SORTER_MAX_HORIZONTAL_CARDS;

        React.useImperativeHandle(
            ref,
            () => ({
                // TODO(LEMS-3643): Remove `getSaveWarnings` once the frontend
                // uses the new linter rules for save warnings.
                getSaveWarnings: () => {
                    const warnings: string[] = [];
                    // don't allow too few cards
                    if (correct.length < minCards) {
                        warnings.push(
                            `Sorter requires at least ${minCards} cards.`,
                        );
                    }
                    // don't allow blanks
                    if (correct.some((card) => card.trim() === "")) {
                        warnings.push("Sorter cards cannot be blank.");
                    }
                    return warnings;
                },
            }),
            [correct],
        );

        function handleChange(changes: Partial<PerseusSorterWidgetOptions>) {
            onChange({
                correct,
                layout,
                padding,
                variant,
                legend,
                ...changes,
            });
        }

        function handleVariantChange(newVariant: SorterVariant) {
            if (legend == null) {
                handleChange({variant: newVariant});
                return;
            }

            const {startCap, endCap} = getDefaultLegend(newVariant);
            handleChange({
                variant: newVariant,
                legend: {...legend, startCap, endCap},
            });
        }

        const onCardChange = (index: number, value: string) => {
            const newCorrect = [...correct];
            newCorrect[index] = value;
            handleChange({correct: newCorrect});
        };

        const onAddCard = () => {
            if (correct.length >= SORTER_MAX_CARDS) {
                return;
            }
            handleChange({correct: [...correct, ""]});
        };

        const onMoveCard = (index: number, offset: -1 | 1) => {
            const newCorrect = [...correct];
            const newIndex = index + offset;
            [newCorrect[index], newCorrect[newIndex]] = [
                newCorrect[newIndex],
                newCorrect[index],
            ];
            handleChange({correct: newCorrect});
        };

        const onDeleteCard = (index: number) => {
            handleChange({
                correct: correct.filter((card, i) => i !== index),
            });
        };

        return (
            <View className={styles.editor}>
                <View className={styles.section}>
                    <div>
                        Correct answer{" "}
                        <InfoTip>
                            <p>
                                Enter the correct answer (in the correct order)
                                here. The preview on the right will have the
                                cards in a randomized order, which is how the
                                student will see them.
                            </p>
                            <p>
                                For horizontal orientation, the top input
                                represents the leftmost card and the bottom
                                input represents the rightmost card.
                            </p>
                        </InfoTip>
                    </div>
                    <View tag="ol" className={styles.cards}>
                        {correct.map((card, i) => (
                            <CardEditor
                                key={i}
                                index={i}
                                value={card}
                                isFirst={i === 0}
                                isLast={i === correct.length - 1}
                                onChange={(value) => onCardChange(i, value)}
                                onMoveUp={() => onMoveCard(i, -1)}
                                onMoveDown={() => onMoveCard(i, 1)}
                                onDelete={() => onDeleteCard(i)}
                            />
                        ))}
                    </View>
                    <Button
                        kind="tertiary"
                        startIcon={plusCircle}
                        className={styles.addCard}
                        disabled={correct.length >= SORTER_MAX_CARDS}
                        onClick={onAddCard}
                    >
                        Add a card
                    </Button>
                </View>
                {isDndSorter && (
                    <LabeledField
                        label="Variant"
                        field={
                            <TypedSingleSelect
                                options={variantOptions}
                                selectedValue={variant}
                                onChange={handleVariantChange}
                            />
                        }
                    />
                )}
                <LabeledField
                    label="Layout"
                    field={
                        <TypedSingleSelect
                            options={layoutOptions}
                            selectedValue={layout}
                            onChange={(layout) => handleChange({layout})}
                        />
                    }
                    contextLabel={
                        <InfoTip>
                            <p>
                                Use the horizontal layout for short text and
                                small images. The vertical layout is best for
                                longer text and larger images.
                            </p>
                        </InfoTip>
                    }
                    styles={{
                        contextLabel: {
                            marginInlineEnd: "auto",
                        },
                    }}
                />
                {layout === "horizontal" &&
                    correct.length > SORTER_MAX_HORIZONTAL_CARDS && (
                        <Banner
                            kind="warning"
                            text={`Sorter widget with more than ${SORTER_MAX_HORIZONTAL_CARDS} options will display vertically, even if the layout is set to horizontal.`}
                        />
                    )}
                <div className={styles.row}>
                    <Checkbox
                        label="Padding"
                        checked={padding}
                        onChange={(padding) => handleChange({padding})}
                    />
                    <InfoTip>
                        <p>
                            Padding is good for text, but not needed for images.
                        </p>
                    </InfoTip>
                </div>
                {isDndSorter && (
                    <PerseusEditorAccordion
                        header={
                            <BodyText size="medium" weight="bold" tag="span">
                                Legend
                            </BodyText>
                        }
                        expanded={isLegendExpanded}
                        onToggle={setIsLegendExpanded}
                    >
                        <LegendEditor
                            legend={legend}
                            variant={variant}
                            displaysVertically={displaysVertically}
                            onChange={(legend) => handleChange({legend})}
                        />
                    </PerseusEditorAccordion>
                )}
            </View>
        );
    },
);

export default Object.assign(SorterEditor, {
    // Read directly by the editor page to seed the options of a newly inserted
    // sorter.
    defaultProps: defaultOptions,
});
