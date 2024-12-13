/**
 * This file contains types used for validation and scoring. The types abide by
 * a naming convention so that they're easy to follow and that we remain
 * consistent across all of the widgets.
 *
 * These types are:
 *
 * `Perseus<Widget>UserInput`: the data returned by the widget that the user
 * entered. This is referred to as the 'guess' in some older parts of Perseus.
 *
 * `Perseus<Widget>ValidationData`: the data needed to do validation of the
 * user input. Validation refers to the different checks that we can do both on
 * the client-side (before submitting user input for scoring) and on the
 * server-side (when we score it). As such, it cannot contain any of the
 * sensitive scoring data that would reveal the answer.
 *
 * `Perseus<Widget>ScoringData` (nee `Perseus<Widget>Rubric`): the data needed
 * to score the user input. By convention, this type is defined as the set of
 * sensitive answer data and then intersected with
 * `Perseus<Widget>ValidationData`.
 *
 * For example:
 * ```
 * type Perseus<Widget>ScoringData = {
 *     correct: string;  // Used _only_ for scoring
 *     size: number;     // Used _only_ for scoring
 * } & Perseus<Widget>ValidationData;
 * ```
 */

import type {
    GrapherAnswerTypes,
    PerseusDropdownChoice,
    PerseusExpressionAnswerForm,
    PerseusGradedGroupSetWidgetOptions,
    PerseusGradedGroupWidgetOptions,
    PerseusGraphType,
    PerseusGroupWidgetOptions,
    PerseusMatcherWidgetOptions,
    PerseusMatrixWidgetAnswers,
    PerseusNumericInputAnswer,
    PerseusOrdererWidgetOptions,
    PerseusRadioChoice,
    PerseusGraphCorrectType,
} from "./perseus-types";
import type {InteractiveMarkerType} from "./widgets/label-image/types";
import type {Relationship} from "./widgets/number-line/number-line";

export type UserInputStatus = "correct" | "incorrect" | "incomplete";

export type PerseusCategorizerScoringData = {
    // The correct answers where index relates to the items and value relates
    // to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
} & PerseusCategorizerValidationData;

export type PerseusCategorizerUserInput = {
    values: PerseusCategorizerScoringData["values"];
};

export type PerseusCategorizerValidationData = {
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
};

// TODO(LEMS-2440): Can possibly be removed during 2440?
// This is not used for grading at all. The only place it is used is to define
// Props type in cs-program.tsx, but RenderProps already contains WidgetOptions
// and is already included in the Props type.
export type PerseusCSProgramRubric = Empty;

export type PerseusCSProgramUserInput = {
    status: UserInputStatus;
    message: string | null;
};

export type PerseusDropdownScoringData = {
    choices: ReadonlyArray<PerseusDropdownChoice>;
};

export type PerseusDropdownUserInput = {
    value: number;
};

export type PerseusExpressionScoringData = {
    answerForms: ReadonlyArray<PerseusExpressionAnswerForm>;
    functions: ReadonlyArray<string>;
};

export type PerseusExpressionUserInput = string;

export type PerseusGroupScoringData = PerseusGroupWidgetOptions;
export type PerseusGroupUserInput = UserInputMap;

export type PerseusGradedGroupScoringData = PerseusGradedGroupWidgetOptions;

export type PerseusGradedGroupSetScoringData =
    PerseusGradedGroupSetWidgetOptions;

export type PerseusGrapherScoringData = {
    correct: GrapherAnswerTypes;
};

export type PerseusGrapherUserInput = PerseusGrapherScoringData["correct"];

// TODO(LEMS-2440): Can possibly be removed during 2440; only userInput used
export type PerseusIFrameRubric = Empty;

export type PerseusIFrameUserInput = {
    status: UserInputStatus;
    message: string | null;
};

export type PerseusInputNumberScoringData = {
    answerType?:
        | "number"
        | "decimal"
        | "integer"
        | "rational"
        | "improper"
        | "mixed"
        | "percent"
        | "pi";
    inexact?: boolean;
    maxError?: number | string;
    simplify: "required" | "optional" | "enforced";
    value: string | number;
};

export type PerseusInputNumberUserInput = {
    currentValue: string;
};

export type PerseusInteractiveGraphScoringData = {
    // TODO(LEMS-2344): make the type of `correct` more specific
    correct: PerseusGraphCorrectType;
    graph: PerseusGraphType;
};

export type PerseusInteractiveGraphUserInput = PerseusGraphType;

/* TODO(LEMS-2440): Should be removed or refactored. Grading info may need
    to be moved to the rubric from userInput. */
export type PerseusLabelImageRubric = Empty;

export type PerseusLabelImageUserInput = {
    markers: ReadonlyArray<InteractiveMarkerType>;
};

export type PerseusMatcherScoringData = PerseusMatcherWidgetOptions;

export type PerseusMatcherUserInput = {
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
};

export type PerseusMatrixScoringData = {
    // A data matrix representing the "correct" answers to be entered into the matrix
    answers: PerseusMatrixWidgetAnswers;
} & PerseusMatrixValidationData;

export type PerseusMatrixValidationData = Empty;

export type PerseusMatrixUserInput = {
    answers: PerseusMatrixScoringData["answers"];
};

export type PerseusNumberLineScoringData = {
    correctRel: string | null | undefined;
    correctX: number;
    range: ReadonlyArray<number>;
    initialX: number | null | undefined;
    isInequality: boolean;
};

export type PerseusNumberLineUserInput = {
    isTickCrtl?: boolean;
    numLinePosition: number;
    rel: Relationship | "eq";
    numDivisions: number;
    divisionRange: ReadonlyArray<number>;
};

export type PerseusNumericInputScoringData = {
    // A list of all the possible correct and incorrect answers
    answers: ReadonlyArray<PerseusNumericInputAnswer>;
    // A coefficient style number allows the student to use - for -1 and an empty string to mean 1.
    coefficient: boolean;
};

export type PerseusNumericInputUserInput = {
    currentValue: string;
};

export type PerseusOrdererScoringData = PerseusOrdererWidgetOptions;

export type PerseusOrdererUserInput = {
    current: ReadonlyArray<string>;
};

export type PerseusPlotterScoringData = {
    // The Y values that represent the correct answer expected
    correct: ReadonlyArray<number>;
} & PerseusPlotterValidationData;

export type PerseusPlotterValidationData = {
    // The Y values the graph should start with
    starting: ReadonlyArray<number>;
};

export type PerseusPlotterUserInput = ReadonlyArray<number>;

export type PerseusRadioScoringData = {
    // The choices provided to the user.
    choices: ReadonlyArray<PerseusRadioChoice>;
};

export type PerseusRadioUserInput = {
    choicesSelected: ReadonlyArray<boolean>;
};

export type PerseusSorterScoringData = {
    // Translatable Text; The correct answer (in the correct order). The user will see the cards in a randomized order.
    correct: ReadonlyArray<string>;
};

export type PerseusSorterUserInput = {
    options: ReadonlyArray<string>;
    changed: boolean;
};

export type PerseusTableRubric = {
    // Translatable Text; A 2-dimensional array of text to populate the table with
    answers: ReadonlyArray<ReadonlyArray<string>>;
};

export type PerseusTableUserInput = ReadonlyArray<ReadonlyArray<string>>;

export type Rubric =
    | PerseusCategorizerScoringData
    | PerseusCSProgramRubric
    | PerseusDropdownScoringData
    | PerseusExpressionScoringData
    | PerseusGroupScoringData
    | PerseusGradedGroupScoringData
    | PerseusGradedGroupSetScoringData
    | PerseusGrapherScoringData
    | PerseusIFrameRubric
    | PerseusInputNumberScoringData
    | PerseusInteractiveGraphScoringData
    | PerseusLabelImageRubric
    | PerseusMatcherScoringData
    | PerseusMatrixScoringData
    | PerseusNumberLineScoringData
    | PerseusNumericInputScoringData
    | PerseusOrdererScoringData
    | PerseusPlotterScoringData
    | PerseusRadioScoringData
    | PerseusSorterScoringData
    | PerseusTableRubric;

export type UserInput =
    | PerseusCategorizerUserInput
    | PerseusCSProgramUserInput
    | PerseusDropdownUserInput
    | PerseusExpressionUserInput
    | PerseusGrapherUserInput
    | PerseusIFrameUserInput
    | PerseusInputNumberUserInput
    | PerseusInteractiveGraphUserInput
    | PerseusLabelImageUserInput
    | PerseusMatcherUserInput
    | PerseusMatrixUserInput
    | PerseusNumberLineUserInput
    | PerseusNumericInputUserInput
    | PerseusOrdererUserInput
    | PerseusPlotterUserInput
    | PerseusRadioUserInput
    | PerseusSorterUserInput
    | PerseusTableUserInput;

export type UserInputMap = {[widgetId: string]: UserInput | UserInputMap};

/**
 * deprecated prefer using UserInputMap
 */
export type UserInputArray = ReadonlyArray<
    UserInputArray | UserInput | null | undefined
>;
