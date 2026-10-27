import {
    isFeatureOn,
    sorterLogic,
    SORTER_MAX_HORIZONTAL_CARDS,
    SORTER_MAX_LEGEND_LABEL_LENGTH,
    SORTER_MAX_CARDS,
    type PerseusSorterWidgetOptions,
    type SorterLegend,
    type SorterLegendCap,
} from "@khanacademy/perseus-core";
import Banner from "@khanacademy/wonder-blocks-banner";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox, TextField} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import {TypedSingleSelect} from "../../components/typed-single-select";

import CardEditor from "./card-editor";
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
} as const satisfies Record<PerseusSorterWidgetOptions["layout"], string>;

const capOptions = {
    arrow: "Arrow",
    bar: "Bar",
    none: "None",
} as const satisfies Record<SorterLegendCap, string>;

const positionOptions = {
    above: "Above",
    below: "Below",
} as const satisfies Record<SorterLegend["position"], string>;

// Not in `defaultOptions`: those get applied to existing content, which would
// make every old sorter look edited. This is only filled in on the first edit.
const defaultLegend: SorterLegend = {
    startCap: "none",
    endCap: "none",
    startLabel: "",
    endLabel: "",
    ariaLabel: "",
    position: "below",
};

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
            padding = defaultOptions.padding,
            legend,
            apiOptions,
            onChange,
        },
        ref,
    ) {
        const showLegend = isFeatureOn({apiOptions}, "dnd-widget-sorter");
        const displaysVertically =
            layout === "vertical" ||
            correct.length > SORTER_MAX_HORIZONTAL_CARDS;

        React.useImperativeHandle(
            ref,
            () => ({
                serialize: () => {
                    return {correct, layout, padding, legend};
                },

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
            [correct, layout, padding, legend],
        );

        function handleChange(changes: Partial<PerseusSorterWidgetOptions>) {
            onChange({
                correct,
                layout,
                padding,
                legend,
                ...changes,
            });
        }

        function handleLegendChange(changes: Partial<SorterLegend>) {
            handleChange({legend: {...defaultLegend, ...legend, ...changes}});
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
                {showLegend && (
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legendTitle}>Legend</legend>
                        <LegendEndEditor
                            end="Start"
                            label={
                                legend?.startLabel ?? defaultLegend.startLabel
                            }
                            cap={legend?.startCap ?? defaultLegend.startCap}
                            onLabelChange={(startLabel) =>
                                handleLegendChange({startLabel})
                            }
                            onCapChange={(startCap) =>
                                handleLegendChange({startCap})
                            }
                        />
                        <LegendEndEditor
                            end="End"
                            label={legend?.endLabel ?? defaultLegend.endLabel}
                            cap={legend?.endCap ?? defaultLegend.endCap}
                            onLabelChange={(endLabel) =>
                                handleLegendChange({endLabel})
                            }
                            onCapChange={(endCap) =>
                                handleLegendChange({endCap})
                            }
                        />
                        <LabeledField
                            label="Position"
                            field={
                                <TypedSingleSelect
                                    options={positionOptions}
                                    selectedValue={
                                        legend?.position ??
                                        defaultLegend.position
                                    }
                                    disabled={displaysVertically}
                                    onChange={(position) =>
                                        handleLegendChange({position})
                                    }
                                />
                            }
                            contextLabel={
                                displaysVertically && (
                                    <InfoTip>
                                        <p>
                                            Position only applies to sorters
                                            that display horizontally. This
                                            sorter displays vertically because
                                            of its layout or because it has more
                                            than {SORTER_MAX_HORIZONTAL_CARDS}{" "}
                                            cards.
                                        </p>
                                    </InfoTip>
                                )
                            }
                            styles={{
                                contextLabel: {
                                    marginInlineEnd: "auto",
                                },
                            }}
                        />
                        <LabeledField
                            label="Screen reader label"
                            field={
                                <TextField
                                    value={
                                        legend?.ariaLabel ??
                                        defaultLegend.ariaLabel
                                    }
                                    aria-required={true}
                                    onChange={(ariaLabel) =>
                                        handleLegendChange({ariaLabel})
                                    }
                                />
                            }
                            contextLabel={
                                <>
                                    Required{" "}
                                    <InfoTip>
                                        <p>
                                            Describe the order of the cards, and
                                            include the words from the start and
                                            end labels. For example:
                                            &ldquo;Interest rates, lowest at the
                                            start to highest at the end.&rdquo;
                                        </p>
                                    </InfoTip>
                                </>
                            }
                            styles={{
                                contextLabel: {
                                    marginInlineEnd: "auto",
                                },
                            }}
                        />
                    </fieldset>
                )}
            </View>
        );
    },
);

type LegendEndEditorProps = {
    end: "Start" | "End";
    label: string;
    cap: SorterLegendCap;
    onLabelChange: (label: string) => void;
    onCapChange: (cap: SorterLegendCap) => void;
};

function LegendEndEditor({
    end,
    label,
    cap,
    onLabelChange,
    onCapChange,
}: LegendEndEditorProps) {
    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legendTitle}>{end}</legend>
            <LabeledField
                label={`${end} label`}
                // In the description so screen readers hear the count along
                // with the field's name.
                description={`${label.length} of ${SORTER_MAX_LEGEND_LABEL_LENGTH} characters`}
                field={<TextField value={label} onChange={onLabelChange} />}
            />
            {label.length > SORTER_MAX_LEGEND_LABEL_LENGTH && (
                <Banner
                    kind="warning"
                    text={`Labels longer than ${SORTER_MAX_LEGEND_LABEL_LENGTH} characters may not fit on the legend.`}
                />
            )}
            <LabeledField
                label={`${end} cap`}
                field={
                    <TypedSingleSelect
                        options={capOptions}
                        selectedValue={cap}
                        onChange={onCapChange}
                    />
                }
            />
        </fieldset>
    );
}

export default Object.assign(SorterEditor, {
    // Read directly by the editor page to seed the options of a newly inserted
    // sorter.
    defaultProps: defaultOptions,
});
