import {
    sorterLogic,
    type PerseusSorterWidgetOptions,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import {TypedSingleSelect} from "../../components/typed-single-select";

import CardEditor from "./card-editor";
import styles from "./sorter-editor.module.css";

// Ideally Content Creators would keep it <=7
// but 10 is our hard limit
const maxCards = 10;

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

type Props = PerseusSorterWidgetOptions & {
    onChange: (
        newOptions: Partial<PerseusSorterWidgetOptions>,
        callback?: () => void,
    ) => void;
};

/**
 * Imperative API that WidgetEditor calls
 */
type SorterEditorHandle = {
    serialize: () => PerseusSorterWidgetOptions;
    getSaveWarnings: () => string[];
};

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a sorter widget that allows users to arrange items in a specific order.
 */
const SorterEditor = React.forwardRef<SorterEditorHandle, Props>(
    function SorterEditor(
        {
            correct = defaultOptions.correct,
            layout = defaultOptions.layout,
            padding = defaultOptions.padding,
            onChange,
        },
        ref,
    ) {
        React.useImperativeHandle(
            ref,
            () => ({
                serialize: () => {
                    return {correct, layout, padding};
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
            [correct, layout, padding],
        );

        const onCardChange = (index: number, value: string) => {
            const newCorrect = [...correct];
            newCorrect[index] = value;
            onChange({correct: newCorrect});
        };

        const onAddCard = () => {
            if (correct.length >= maxCards) {
                return;
            }
            onChange({correct: [...correct, ""]});
        };

        const onMoveCard = (index: number, offset: -1 | 1) => {
            const newCorrect = [...correct];
            const newIndex = index + offset;
            [newCorrect[index], newCorrect[newIndex]] = [
                newCorrect[newIndex],
                newCorrect[index],
            ];
            onChange({correct: newCorrect});
        };

        const onDeleteCard = (index: number) => {
            onChange({
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
                        disabled={correct.length >= maxCards}
                        onClick={onAddCard}
                    >
                        Add a card
                    </Button>
                </View>
                <View>
                    <LabeledField
                        label="Layout"
                        field={
                            <TypedSingleSelect
                                options={layoutOptions}
                                selectedValue={layout}
                                onChange={(newLayout) =>
                                    onChange({layout: newLayout})
                                }
                            />
                        }
                    />
                    <InfoTip>
                        <p>
                            Use the horizontal layout for short text and small
                            images. The vertical layout is best for longer text
                            and larger images.
                        </p>
                    </InfoTip>
                </View>
                <div>
                    <Checkbox
                        label="Padding"
                        checked={padding}
                        onChange={(value) => {
                            onChange({padding: value});
                        }}
                    />
                    <InfoTip>
                        <p>
                            Padding is good for text, but not needed for images.
                        </p>
                    </InfoTip>
                </div>
            </View>
        );
    },
);

export default Object.assign(SorterEditor, {
    // Read directly by the editor page to seed the options of a newly inserted
    // sorter.
    defaultProps: defaultOptions,
});
