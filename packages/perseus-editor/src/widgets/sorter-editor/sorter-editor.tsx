import {
    sorterLogic,
    type PerseusSorterWidgetOptions,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox, TextField} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import arrowDown from "@phosphor-icons/core/regular/arrow-down.svg";
import arrowUp from "@phosphor-icons/core/regular/arrow-up.svg";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import trash from "@phosphor-icons/core/regular/trash.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import {TypedSingleSelect} from "../../components/typed-single-select";

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

type CardEditorProps = {
    // Zero-based, but the cards are numbered from one in their labels so the
    // numbering matches what the author sees.
    index: number;
    value: string;
    isFirst: boolean;
    isLast: boolean;
    onChange: (value: string) => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onDelete: () => void;
};

/**
 * An editor for a single sorter card: its text, plus the controls that move it
 * within the answer or remove it.
 */
function CardEditor({
    index,
    value,
    isFirst,
    isLast,
    onChange,
    onMoveUp,
    onMoveDown,
    onDelete,
}: CardEditorProps) {
    const cardNumber = index + 1;

    return (
        <View tag="li" style={styles.card}>
            {/*
             * The cards have no visible label, but screen reader users still
             * need each input to have a distinguishable name, hence the
             * aria-label. The card's controls are named the same way so it's
             * clear which card each one acts on.
             */}
            <TextField
                aria-label={`Card ${cardNumber}`}
                value={value}
                onChange={onChange}
                style={styles.cardInput}
            />
            <IconButton
                aria-label={`Move card ${cardNumber} up`}
                icon={arrowUp}
                kind="tertiary"
                actionType="neutral"
                size="small"
                disabled={isFirst}
                onClick={onMoveUp}
            />
            <IconButton
                aria-label={`Move card ${cardNumber} down`}
                icon={arrowDown}
                kind="tertiary"
                actionType="neutral"
                size="small"
                disabled={isLast}
                onClick={onMoveDown}
            />
            <IconButton
                aria-label={`Delete card ${cardNumber}`}
                icon={trash}
                kind="tertiary"
                actionType="destructive"
                size="small"
                onClick={onDelete}
            />
        </View>
    );
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a sorter widget that allows users to arrange items in a specific order.
 */
class SorterEditor extends React.Component<Props> {
    static widgetName = "sorter" as const;

    static defaultProps: PerseusSorterWidgetOptions =
        sorterLogic.defaultWidgetOptions;

    onCardChange = (index: number, value: string) => {
        const correct = [...this.props.correct];
        correct[index] = value;
        this.props.onChange({correct});
    };

    onAddCard = () => {
        this.props.onChange({correct: [...this.props.correct, ""]});
    };

    onMoveCard = (index: number, offset: -1 | 1) => {
        const correct = [...this.props.correct];
        const newIndex = index + offset;
        [correct[index], correct[newIndex]] = [
            correct[newIndex],
            correct[index],
        ];
        this.props.onChange({correct});
    };

    onDeleteCard = (index: number) => {
        this.props.onChange({
            correct: this.props.correct.filter((card, i) => i !== index),
        });
    };

    serialize = (): PerseusSorterWidgetOptions => {
        return {
            correct: this.props.correct,
            layout: this.props.layout,
            padding: this.props.padding,
        };
    };

    render(): React.ReactNode {
        return (
            <View style={styles.editor}>
                <View style={styles.section}>
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
                    <View tag="ol" style={styles.cards}>
                        {this.props.correct.map((card, i) => (
                            <CardEditor
                                key={i}
                                index={i}
                                value={card}
                                isFirst={i === 0}
                                isLast={i === this.props.correct.length - 1}
                                onChange={(value) =>
                                    this.onCardChange(i, value)
                                }
                                onMoveUp={() => this.onMoveCard(i, -1)}
                                onMoveDown={() => this.onMoveCard(i, 1)}
                                onDelete={() => this.onDeleteCard(i)}
                            />
                        ))}
                    </View>
                    <Button
                        kind="tertiary"
                        startIcon={plusCircle}
                        style={styles.addCard}
                        onClick={this.onAddCard}
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
                                selectedValue={this.props.layout}
                                onChange={(layout) =>
                                    this.props.onChange({layout})
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
                        checked={this.props.padding}
                        onChange={(value) => {
                            this.props.onChange({padding: value});
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
    }
}

const styles = StyleSheet.create({
    // Separates the three sections (cards, layout, padding) from each other.
    editor: {
        gap: sizing.size_240,
    },
    // Separates a section's label from the control it describes. Smaller than
    // the gap between sections so each label groups with its own control.
    section: {
        gap: sizing.size_080,
    },
    // The cards always stack in the editor, regardless of the `layout` option,
    // which only controls how the widget renders for students.
    cards: {
        listStyle: "none",
        paddingInlineStart: 0,
        // Drop the browser's default list margins; `section` and `editor`
        // above own the spacing around the list.
        marginBlock: 0,
        gap: sizing.size_120,
    },
    // A card's text sits on one line with the controls that reorder and remove
    // it, so the controls stay next to the card they act on.
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_040,
    },
    // Let the text take the space the controls don't need.
    cardInput: {
        flexGrow: 1,
    },
    // Keep the button hugging its label rather than stretching to the width of
    // the cards above it.
    addCard: {
        alignSelf: "flex-start",
    },
});

export default SorterEditor;
