import {
    sorterLogic,
    type PerseusSorterWidgetOptions,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox, TextField} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
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
    // The cards have no visible label, but screen reader users still need each
    // input to have a distinguishable name, hence the aria-label.
    ariaLabel: string;
    value: string;
    onChange: (value: string) => void;
    inputRef: React.Ref<HTMLInputElement>;
};

/**
 * An editor for a single sorter card.
 */
function CardEditor({ariaLabel, value, onChange, inputRef}: CardEditorProps) {
    return (
        <TextField
            aria-label={ariaLabel}
            value={value}
            onChange={onChange}
            ref={inputRef}
        />
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

    // The card inputs, by index, so a newly added card can be focused.
    cardInputs: (HTMLInputElement | null)[] = [];

    // Set when the author adds a card, then consumed once the new input has
    // rendered — focus can't move to an input that doesn't exist yet.
    pendingFocusIndex: number | null = null;

    componentDidUpdate() {
        const index = this.pendingFocusIndex;
        if (index != null) {
            this.pendingFocusIndex = null;
            this.cardInputs[index]?.focus();
        }
    }

    onCardChange = (index: number, value: string) => {
        const correct = [...this.props.correct];
        correct[index] = value;
        this.props.onChange({correct});
    };

    onAddCard = () => {
        // Focus the card that's about to render so the author can type into it
        // right away instead of tabbing back from the button.
        this.pendingFocusIndex = this.props.correct.length;
        this.props.onChange({correct: [...this.props.correct, ""]});
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
                            <View tag="li" key={i}>
                                <CardEditor
                                    ariaLabel={`Card ${i + 1}`}
                                    value={card}
                                    onChange={(value) =>
                                        this.onCardChange(i, value)
                                    }
                                    inputRef={(node) => {
                                        this.cardInputs[i] = node;
                                    }}
                                />
                            </View>
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
    // Keep the button hugging its label rather than stretching to the width of
    // the card inputs above it.
    addCard: {
        alignSelf: "flex-start",
    },
});

export default SorterEditor;
