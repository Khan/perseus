import {
    sorterLogic,
    type PerseusSorterWidgetOptions,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox, TextField} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
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

type State = {
    // The cards being edited, always with a trailing empty card that authors
    // type into to add another. Kept in local state (rather than read straight
    // off `props.correct`) so that a card can be cleared and retyped without
    // its input disappearing mid-edit.
    cards: string[];
};

type CardEditorProps = {
    // The cards have no visible label, but screen reader users still need each
    // input to have a distinguishable name, hence the aria-label.
    ariaLabel: string;
    value: string;
    onChange: (value: string) => void;
};

/**
 * An editor for a single sorter card.
 */
function CardEditor({ariaLabel, value, onChange}: CardEditorProps) {
    return (
        <TextField aria-label={ariaLabel} value={value} onChange={onChange} />
    );
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a sorter widget that allows users to arrange items in a specific order.
 */
class SorterEditor extends React.Component<Props, State> {
    static widgetName = "sorter" as const;

    static defaultProps: PerseusSorterWidgetOptions =
        sorterLogic.defaultWidgetOptions;

    state: State = {cards: [...this.props.correct, ""]};

    componentDidUpdate(prevProps: Props) {
        if (prevProps.correct !== this.props.correct) {
            this.setState({cards: [...this.props.correct, ""]});
        }
    }

    onCardChange = (index: number, value: string) => {
        const cards = [...this.state.cards];
        cards[index] = value;

        // Typing in the trailing card turns it into a real one, so grow the
        // list to keep an empty card available for the next one.
        if (index === cards.length - 1) {
            cards.push("");
        }

        this.setState({cards});
        // Empty cards are editing scaffolding, not answers.
        this.props.onChange({correct: cards.filter(Boolean)});
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
                        </InfoTip>
                    </div>
                    <View tag="ol" style={styles.cards}>
                        {this.state.cards.map((card, i) => (
                            <View tag="li" key={i}>
                                <CardEditor
                                    ariaLabel={
                                        i === this.state.cards.length - 1
                                            ? "Add a card"
                                            : `Card ${i + 1}`
                                    }
                                    value={card}
                                    onChange={(value) =>
                                        this.onCardChange(i, value)
                                    }
                                />
                            </View>
                        ))}
                    </View>
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
});

export default SorterEditor;
