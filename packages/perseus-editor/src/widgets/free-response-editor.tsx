import {freeResponseLogic} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {spacing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import plusCircleIcon from "@phosphor-icons/core/regular/plus-circle.svg";
import trashIcon from "@phosphor-icons/core/regular/trash.svg";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import type {
    PerseusFreeResponseWidgetOptions,
    FreeResponseDefaultWidgetOptions,
    PerseusFreeResponseWidgetScoringCriterion,
} from "@khanacademy/perseus-core";

type Props = PerseusFreeResponseWidgetOptions & {
    onChange: (options: Partial<PerseusFreeResponseWidgetOptions>) => void;
};

class FreeResponseEditor extends React.Component<Props> {
    static defaultProps: FreeResponseDefaultWidgetOptions =
        freeResponseLogic.defaultWidgetOptions;

    static widgetName = "free-response" as const;

    serialize(): PerseusFreeResponseWidgetOptions {
        return {
            allowUnlimitedCharacters: this.props.allowUnlimitedCharacters,
            characterLimit: this.props.characterLimit,
            placeholder: this.props.placeholder,
            question: this.props.question,
            scoringCriteria: this.props.scoringCriteria,
        };
    }

    getSaveWarnings(): Array<string> {
        const warnings: Array<string> = [];
        if (!this.props.question) {
            warnings.push("The question is empty");
        }
        return warnings;
    }

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

    handleDeleteCriterion = (index: number) => {
        this.props.onChange({
            scoringCriteria: this.props.scoringCriteria.filter(
                (_, i) => i !== index,
            ),
        });
    };

    handleAddCriterion = () => {
        this.props.onChange({
            scoringCriteria: [...this.props.scoringCriteria, {text: ""}],
        });
    };

    renderCriteriaList = () => {
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
                <label className={css(styles.textOptionWithLabelContainer)}>
                    <HeadingSmall>Question</HeadingSmall>
                    <textarea
                        value={this.props.question}
                        onChange={(e) =>
                            this.props.onChange({question: e.target.value})
                        }
                    />
                </label>
                <label className={css(styles.textOptionWithLabelContainer)}>
                    <HeadingSmall>Placeholder</HeadingSmall>
                    <textarea
                        value={this.props.placeholder}
                        onChange={(e) =>
                            this.props.onChange({placeholder: e.target.value})
                        }
                    />
                </label>
                <label
                    className={css(styles.textOptionWithLabelContainer)}
                    htmlFor="allow-unlimited-characters"
                >
                    <HeadingSmall>Allow unlimited characters</HeadingSmall>
                    <Checkbox
                        checked={this.props.allowUnlimitedCharacters}
                        id="allow-unlimited-characters"
                        onChange={(val) =>
                            this.props.onChange({
                                allowUnlimitedCharacters: val,
                            })
                        }
                    />
                </label>
                {!this.props.allowUnlimitedCharacters && (
                    <label className={css(styles.textOptionWithLabelContainer)}>
                        <HeadingSmall>Character limit</HeadingSmall>
                        <input
                            type="number"
                            min={1}
                            value={this.props.characterLimit}
                            onChange={(e) =>
                                this.props.onChange({
                                    characterLimit: parseInt(e.target.value),
                                })
                            }
                        />
                    </label>
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
                        color="destructive"
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
        borderBottom: `1px solid ${semanticColor.border.primary}`,
        ":last-child": {
            borderBottom: "none",
        },
    },
    deleteButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    textOptionWithLabelContainer: {
        display: "flex",
        flexDirection: "column",
        gap: spacing.xSmall_8,
        paddingBottom: spacing.medium_16,
    },
});

export default FreeResponseEditor;
