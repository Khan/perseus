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

// Annotated because WidgetLogic types `defaultWidgetOptions` as `any`. Without
// this, the `any` spreads: a destructured prop whose default is `any` is itself
// `any`, which would silently untype every option below.
const defaultOptions: PerseusSorterWidgetOptions =
    sorterLogic.defaultWidgetOptions;

const layoutOptions = {
    horizontal: "Horizontal",
    vertical: "Vertical",
} as const satisfies Record<PerseusSorterWidgetOptions["layout"], string>;

// The widget options are optional because WidgetEditor renders this editor with
// whatever options the content has, and content predating an option won't carry
// it. The defaults below fill in the gaps.
type Props = Partial<PerseusSorterWidgetOptions> & {
    onChange: (
        newOptions: Partial<PerseusSorterWidgetOptions>,
        callback?: () => void,
    ) => void;
};

/**
 * What WidgetEditor can call on this editor through its ref. It serializes the
 * editor mid-edit, to fold the editor's current options into the change it's
 * about to publish, so `serialize` has to report the options this editor was
 * last rendered with.
 */
type SorterEditorHandle = {
    serialize: () => PerseusSorterWidgetOptions;
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
                serialize: () => ({correct, layout, padding}),
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
    // Widgets.registerEditors registers the editor under this name, and throws
    // without it.
    widgetName: "sorter" as const,

    // Read directly by the editor page to seed the options of a newly inserted
    // sorter. It's deliberately not how this component gets its own defaults —
    // React only applies defaultProps to a component's props up to React 18,
    // so the defaults live in the destructuring above instead.
    defaultProps: defaultOptions,
});
