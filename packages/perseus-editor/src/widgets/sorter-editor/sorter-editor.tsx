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

// The controls in a card's row. Reordering and deleting shuffle the rows
// around, so the editor needs to name a specific one when moving focus.
type CardControl = "input" | "moveUp" | "moveDown" | "delete";

const controlKey = (index: number, control: CardControl) =>
    `${index}:${control}`;

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
    // Hands each control's DOM node to the editor, which moves focus once a
    // card has been added, moved, or deleted.
    registerControl: (control: CardControl, node: HTMLElement | null) => void;
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
    registerControl,
}: CardEditorProps) {
    const cardNumber = index + 1;

    // IconButton's ref can also be a react-router Link, which has nothing to
    // focus, so only DOM nodes are worth keeping.
    const registerButton =
        (control: CardControl) =>
        (node: React.ComponentRef<typeof IconButton> | null) =>
            registerControl(control, node instanceof HTMLElement ? node : null);

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
                ref={(node) => registerControl("input", node)}
            />
            <IconButton
                aria-label={`Move card ${cardNumber} up`}
                icon={arrowUp}
                kind="tertiary"
                actionType="neutral"
                size="small"
                disabled={isFirst}
                onClick={onMoveUp}
                ref={registerButton("moveUp")}
            />
            <IconButton
                aria-label={`Move card ${cardNumber} down`}
                icon={arrowDown}
                kind="tertiary"
                actionType="neutral"
                size="small"
                disabled={isLast}
                onClick={onMoveDown}
                ref={registerButton("moveDown")}
            />
            <IconButton
                aria-label={`Delete card ${cardNumber}`}
                icon={trash}
                kind="tertiary"
                actionType="destructive"
                size="small"
                onClick={onDelete}
                ref={registerButton("delete")}
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

    // Every card control currently rendered, keyed by card index and control.
    cardControls = new Map<string, HTMLElement>();

    addCardButton = React.createRef<HTMLButtonElement>();

    // What to focus once the changed list of cards has rendered. Focus has to
    // wait: the control the author clicked may not exist yet (a card that's
    // being added), may be gone (a card that's being deleted), or may now
    // belong to a different card (the cards on either side of a move).
    pendingFocus: (() => void) | null = null;

    componentDidUpdate() {
        const focus = this.pendingFocus;
        if (focus) {
            this.pendingFocus = null;
            focus();
        }
    }

    registerCardControl = (
        index: number,
        control: CardControl,
        node: HTMLElement | null,
    ) => {
        const key = controlKey(index, control);
        if (node) {
            this.cardControls.set(key, node);
        } else {
            this.cardControls.delete(key);
        }
    };

    focusCardControl = (index: number, control: CardControl) => {
        this.cardControls.get(controlKey(index, control))?.focus();
    };

    onCardChange = (index: number, value: string) => {
        const correct = [...this.props.correct];
        correct[index] = value;
        this.props.onChange({correct});
    };

    onAddCard = () => {
        // Focus the card that's about to render so the author can type into it
        // right away instead of tabbing back from the button.
        const index = this.props.correct.length;
        this.pendingFocus = () => this.focusCardControl(index, "input");
        this.props.onChange({correct: [...this.props.correct, ""]});
    };

    onMoveCard = (index: number, offset: -1 | 1) => {
        const correct = [...this.props.correct];
        const newIndex = index + offset;
        [correct[index], correct[newIndex]] = [
            correct[newIndex],
            correct[index],
        ];

        // Follow the card to its new position, so pressing the same button
        // again keeps moving the same card in the same direction.
        this.pendingFocus = () =>
            this.focusCardControl(
                newIndex,
                offset === -1 ? "moveUp" : "moveDown",
            );
        this.props.onChange({correct});
    };

    onDeleteCard = (index: number) => {
        const correct = this.props.correct.filter((card, i) => i !== index);

        // Stay on the delete button, which now belongs to the card that moved
        // up into this slot (or to the new last card, if this was the last
        // one). With no cards left there is nothing to delete, so fall back to
        // the button that adds one.
        this.pendingFocus =
            correct.length === 0
                ? () => this.addCardButton.current?.focus()
                : () =>
                      this.focusCardControl(
                          Math.min(index, correct.length - 1),
                          "delete",
                      );
        this.props.onChange({correct});
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
                                registerControl={(control, node) =>
                                    this.registerCardControl(i, control, node)
                                }
                            />
                        ))}
                    </View>
                    <Button
                        kind="tertiary"
                        startIcon={plusCircle}
                        style={styles.addCard}
                        onClick={this.onAddCard}
                        ref={this.addCardButton}
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
