import {Util} from "@khanacademy/perseus";
import {freeResponseLogic} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {spacing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import plusCircleIcon from "@phosphor-icons/core/regular/plus-circle.svg";
import trashIcon from "@phosphor-icons/core/regular/trash.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {
    PerseusFreeResponseWidgetOptions,
    FreeResponseDefaultWidgetOptions,
    PerseusFreeResponseWidgetScoringCriterion,
} from "@khanacademy/perseus-core";
import type {ChangeEventHandler} from "react";

type Props = PerseusFreeResponseWidgetOptions & {
    onChange: (options: Partial<PerseusFreeResponseWidgetOptions>) => void;
};

class FreeResponseEditor extends React.Component<Props> {
    static defaultProps: FreeResponseDefaultWidgetOptions =
        freeResponseLogic.defaultWidgetOptions;

    static widgetName = "free-response" as const;

    serialize: () => PerseusFreeResponseWidgetOptions = () => {
        return {
            allowUnlimitedCharacters: this.props.allowUnlimitedCharacters,
            characterLimit: this.props.characterLimit,
            placeholder: this.props.placeholder,
            question: this.props.question,
            scoringCriteria: this.props.scoringCriteria,
        };
    };

    getSaveWarnings: () => Array<string> = () => {
        const warnings: Array<string> = [];
        if (!this.props.question) {
            warnings.push("The question is empty");
        }
        if (this.props.question.match(Util.rWidgetRule) != null) {
            warnings.push("The question contains a widget");
        }
        return warnings;
    };

    handleUpdateCharacterLimit: ChangeEventHandler<HTMLInputElement> = (e) => {
        const val = parseInt(e.target.value);
        if (isNaN(val)) {
            return;
        }

        this.props.onChange({characterLimit: Math.max(1, val)});
    };

    handleUpdateCriterion = (
        index: number,
        criterion: PerseusFreeResponseWidgetScoringCriterion,
    ) => {
        const newCriteria = this.props.scoringCriteria.map((c, i) => {
            if (i === index) {
                return criterion;
            }
            return c;
        });

        this.props.onChange({
            scoringCriteria: newCriteria,
        });
    };

    handleDeleteCriterion: (index: number) => void = (index: number) => {
        this.props.onChange({
            scoringCriteria: this.props.scoringCriteria.filter(
                (_, i) => i !== index,
            ),
        });
    };

    handleAddCriterion: () => void = () => {
        this.props.onChange({
            scoringCriteria: [...this.props.scoringCriteria, {text: ""}],
        });
    };

    renderCriteriaList: () => React.ReactNode = () => {
        const isDeletable = this.props.scoringCriteria.length > 1;

        return this.props.scoringCriteria.map((criterion, index) => {
            return (
                <CriterionEditor
                    criterion={criterion}
                    index={index}
                    isDeletable={isDeletable}
                    key={index}
                    onChange={this.handleUpdateCriterion}
                    onDelete={this.handleDeleteCriterion}
                />
            );
        });
    };

    render(): React.ReactNode {
        return (
            <View>
                <LabeledField
                    label={<HeadingSmall>Question</HeadingSmall>}
                    field={
                        <textarea
                            value={this.props.question}
                            onChange={(e) =>
                                this.props.onChange({question: e.target.value})
                            }
                        />
                    }
                    styles={{root: styles.labeledInputField}}
                />
                <LabeledField
                    label={<HeadingSmall>Placeholder</HeadingSmall>}
                    field={
                        <textarea
                            value={this.props.placeholder}
                            onChange={(e) =>
                                this.props.onChange({
                                    placeholder: e.target.value,
                                })
                            }
                        />
                    }
                    styles={{root: styles.labeledInputField}}
                />
                <LabeledField
                    label={
                        <HeadingSmall>Allow unlimited characters</HeadingSmall>
                    }
                    field={
                        <Checkbox
                            checked={this.props.allowUnlimitedCharacters}
                            onChange={(val) =>
                                this.props.onChange({
                                    allowUnlimitedCharacters: val,
                                })
                            }
                        />
                    }
                    styles={{root: styles.labeledInputField}}
                />
                {!this.props.allowUnlimitedCharacters && (
                    <LabeledField
                        label={<HeadingSmall>Character limit</HeadingSmall>}
                        field={
                            <input
                                type="number"
                                min={1}
                                value={this.props.characterLimit}
                                onChange={this.handleUpdateCharacterLimit}
                            />
                        }
                        styles={{root: styles.labeledInputField}}
                    />
                )}
                <View>
                    <HeadingSmall>Scoring criteria</HeadingSmall>
                    <View style={styles.criteriaList}>
                        {this.renderCriteriaList()}
                    </View>
                    <View>
                        <Button
                            onClick={this.handleAddCriterion}
                            startIcon={plusCircleIcon}
                        >
                            Add an item
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const CriterionEditor = function (props: {
    index: number;
    isDeletable: boolean;
    criterion: PerseusFreeResponseWidgetScoringCriterion;
    onChange: (
        index: number,
        criterion: PerseusFreeResponseWidgetScoringCriterion,
    ) => void;
    onDelete: (index: number) => void;
}): React.ReactNode {
    return (
        <View style={styles.criterionContainer}>
            <textarea
                aria-label={`Criterion ${props.index + 1}`}
                onChange={(e) =>
                    props.onChange(props.index, {
                        text: e.target.value,
                    })
                }
                value={props.criterion.text}
            />

            {props.isDeletable && (
                <View style={styles.deleteButtonContainer}>
                    <Button
                        aria-label={`Delete criterion ${props.index + 1}`}
                        actionType="destructive"
                        disabled={!props.isDeletable}
                        kind="tertiary"
                        onClick={() => props.onDelete(props.index)}
                        size="small"
                        startIcon={trashIcon}
                    >
                        Delete
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    criteriaList: {
        gap: spacing.small_12,
    },
    criterionContainer: {
        paddingTop: spacing.xSmall_8,
        paddingBottom: spacing.xSmall_8,
        borderBottom: `1px solid ${semanticColor.core.border.neutral.subtle}`,
        ":last-child": {
            borderBottom: "none",
        },
    },
    deleteButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    labeledInputField: {
        paddingBottom: spacing.large_24,
    },
});

export default FreeResponseEditor;
