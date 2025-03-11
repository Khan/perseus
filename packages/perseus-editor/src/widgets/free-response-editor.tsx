import {freeResponseLogic} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
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
        return this.props.scoringCriteria.map((criterion, index) => {
            return (
                <CriterionEditor
                    criterion={criterion}
                    index={index}
                    key={index}
                    numCriteria={this.props.scoringCriteria.length}
                    onChange={this.handleUpdateCriterion}
                    onDelete={this.handleDeleteCriterion}
                />
            );
        });
    };

    render(): React.ReactNode {
        return (
            <View>
                <label className={css(styles.questionContainer)}>
                    <HeadingSmall>Question</HeadingSmall>
                    <textarea
                        value={this.props.question}
                        onChange={(e) =>
                            this.props.onChange({question: e.target.value})
                        }
                    />
                </label>
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
    numCriteria: number;
    criterion: PerseusFreeResponseWidgetScoringCriterion;
    onChange: (
        index: number,
        criterion: PerseusFreeResponseWidgetScoringCriterion,
    ) => void;
    onDelete: (index: number) => void;
}): React.ReactNode {
    const isOnlyCriterion = props.numCriteria <= 1;

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

            {!isOnlyCriterion && (
                <View style={styles.deleteButtonContainer}>
                    <Button
                        aria-label={`Delete criterion ${props.index + 1}`}
                        color="destructive"
                        disabled={isOnlyCriterion}
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
    questionContainer: {
        display: "flex",
        flexDirection: "column",
        gap: spacing.xSmall_8,
        paddingBottom: spacing.medium_16,
    },
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
});

export default FreeResponseEditor;
