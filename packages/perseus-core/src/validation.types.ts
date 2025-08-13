/**
 * This file contains types used for validation and scoring. The types abide by
 * a naming convention so that they're easy to follow and that we remain
 * consistent across all of the widgets.
 *
 * These types are:
 *
 *   * `Perseus<Widget>UserInput`: the data from the widget that represents the
 *     data the user entered. This is referred to as the 'guess' in some older
 *     parts of Perseus.
 *
 *   * `Perseus<Widget>ValidationData`: the data needed to do validation of the
 *     user input. Validation refers to the different checks that we can do
 *     both on the client-side (before submitting user input for scoring) and
 *     on the server-side (when we score it). As such, it cannot contain any of
 *     the sensitive scoring data that would reveal the answer.
 *
 *   * `Perseus<Widget>Rubric` (nee `Perseus<Widget>Rubric`): the data
 *     needed to score the user input. By convention, this type is defined as
 *     the set of sensitive answer data and then intersected with
 *     `Perseus<Widget>ValidationData`.
 *
 * For example:
 * ```
 * type Perseus<Widget>Rubric = {
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
    PerseusMatrixWidgetAnswers,
    PerseusNumericInputAnswer,
    PerseusOrdererWidgetOptions,
    PerseusRadioChoice,
    PerseusGraphCorrectType,
    MakeWidgetMap,
    PerseusFreeResponseWidgetScoringCriterion,
} from "./data-schema";
import type {Relationship} from "./types";
import type {UserSelectedChoices} from "@khanacademy/perseus/src/types";

export type WidgetValidatorFunction = (
    userInput: UserInput | undefined,
    validationData: ValidationData,
    locale: string,
) => ValidationResult;

export type WidgetScorerFunction = (
    // The user data needed to score
    userInput: UserInput | undefined,
    // The scoring criteria to score against
    rubric: Rubric,
    // Locale, for math evaluation
    // (1,000.00 === 1.000,00 in some countries)
    locale?: string,
) => PerseusScore;

export type PerseusScore =
    | {
          type: "invalid";
          message?: string | null | undefined;
          suppressAlmostThere?: boolean | null | undefined;
      }
    | {
          type: "points";
          earned: number;
          total: number;
          message?: string | null | undefined;
      };

export type ValidationResult = Extract<PerseusScore, {type: "invalid"}> | null;

export type UserInputStatus = "correct" | "incorrect" | "incomplete";

export type PerseusCategorizerRubric = {
    // The correct answers where index relates to the items and value relates
    // to the category.  e.g. [0, 1, 0, 1, 2]
    values: number[];
} & PerseusCategorizerValidationData;

export type PerseusCategorizerUserInput = {
    values: Array<number | null | undefined>;
};

export type PerseusCategorizerValidationData = {
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: string[];
};

export type PerseusCSProgramUserInput = {
    status: UserInputStatus;
    message: string | null;
};

export type PerseusDropdownRubric = {
    choices: Array<PerseusDropdownChoice>;
};

export type PerseusDropdownUserInput = {
    value: number;
};

export type PerseusExpressionRubric = {
    answerForms: Array<PerseusExpressionAnswerForm>;
    functions: string[];
};

export type PerseusExpressionUserInput = string;

export type PerseusGroupRubric = PerseusGroupWidgetOptions;
export type PerseusGroupValidationData = {widgets: ValidationDataMap};
export type PerseusGroupUserInput = UserInputMap;

export type PerseusGradedGroupRubric = PerseusGradedGroupWidgetOptions;

export type PerseusGradedGroupSetRubric = PerseusGradedGroupSetWidgetOptions;

export type PerseusGrapherRubric = {
    correct: GrapherAnswerTypes;
};

export type PerseusGrapherUserInput = GrapherAnswerTypes;

export type PerseusIFrameUserInput = {
    status: UserInputStatus;
    message: string | null;
};

export type PerseusInputNumberRubric = {
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

export type PerseusInteractiveGraphRubric = {
    // TODO(LEMS-2344): make the type of `correct` more specific
    correct: PerseusGraphCorrectType;
    graph: PerseusGraphType;
};

export type PerseusInteractiveGraphUserInput = PerseusGraphType;

export type PerseusLabelImageRubric = {
    markers: Array<{
        answers: string[];
        label: string;
    }>;
};

export type PerseusLabelImageUserInputMarker = {
    selected?: string[];
    label: string;
};

export type PerseusLabelImageUserInput = {
    markers: PerseusLabelImageUserInputMarker[];
};

export type PerseusMatcherRubric = {
    // Translatable Text; Static concepts to show in the left column. e.g. ["Fruit", "Color", "Clothes"]
    left: string[];
    // Translatable Markup; Values that represent the concepts to be correlated with the concepts.  e.g. ["Red", "Shirt", "Banana"]
    right: string[];
};

export type PerseusMatcherUserInput = {
    left: string[];
    right: string[];
};

export type PerseusMatrixRubric = {
    // A data matrix representing the "correct" answers to be entered into the matrix
    answers: PerseusMatrixWidgetAnswers;
} & PerseusMatrixValidationData;

export type PerseusMatrixValidationData = Empty;

export type PerseusMatrixUserInput = {
    answers: string[][];
};

export type PerseusNumberLineRubric = {
    correctRel: string | null | undefined;
    correctX: number;
    range: number[];
    initialX: number | null | undefined;
    isInequality: boolean;
    isTickCtrl?: boolean;
    divisionRange: number[];
};

export type PerseusNumberLineUserInput = {
    numLinePosition: number;
    rel: Relationship | "eq";
    numDivisions: number;
};

export type PerseusNumericInputRubric = {
    // A list of all the possible correct and incorrect answers
    answers: PerseusNumericInputAnswer[];
    // A coefficient style number allows the student to use - for -1 and an empty string to mean 1.
    coefficient: boolean;
};

export type PerseusNumericInputUserInput = {
    currentValue: string;
};

export type PerseusFreeResponseUserInput = {
    currentValue: string;
};

export type PerseusFreeResponseRubric = {
    question: string;
    scoringCriteria: ReadonlyArray<PerseusFreeResponseWidgetScoringCriterion>;
};

export type PerseusOrdererRubric = PerseusOrdererWidgetOptions;

export type PerseusOrdererUserInput = {
    current: string[];
};

export type PerseusPlotterRubric = {
    // The Y values that represent the correct answer expected
    correct: number[];
} & PerseusPlotterValidationData;

export type PerseusPlotterValidationData = {
    // The Y values the graph should start with
    starting: number[];
};

export type PerseusPlotterUserInput = number[];

export type PerseusRadioRubric = {
    // The choices provided to the user.
    choices: PerseusRadioChoice[];
    // If true, the number of choices selected must match the number of correct choices.
    countChoices?: boolean;
};

export type PerseusRadioUserInput = {
    choicesSelected: UserSelectedChoices[];
};

export type PerseusSorterRubric = {
    // Translatable Text; The correct answer (in the correct order). The user will see the cards in a randomized order.
    correct: string[];
};

export type PerseusSorterUserInput = {
    options: string[];
    changed: boolean;
};

export type PerseusTableRubric = {
    // Translatable Text; A 2-dimensional array of text to populate the table with
    answers: string[][];
};

export type PerseusTableUserInput = string[][];

export interface RubricRegistry {
    categorizer: PerseusCategorizerRubric;
    dropdown: PerseusDropdownRubric;
    expression: PerseusExpressionRubric;
    "graded-group-set": PerseusGradedGroupSetRubric;
    "graded-group": PerseusGradedGroupRubric;
    grapher: PerseusGrapherRubric;
    group: PerseusGroupRubric;
    "input-number": PerseusInputNumberRubric;
    "interactive-graph": PerseusInteractiveGraphRubric;
    "label-image": PerseusLabelImageRubric;
    matcher: PerseusMatcherRubric;
    matrix: PerseusMatrixRubric;
    "number-line": PerseusNumberLineRubric;
    "numeric-input": PerseusNumericInputRubric;
    orderer: PerseusOrdererRubric;
    plotter: PerseusPlotterRubric;
    radio: PerseusRadioRubric;
    sorter: PerseusSorterRubric;
    table: PerseusTableRubric;
}

/**
 * A map of scoring data (previously referred to as "rubric"), keyed by
 * `widgetId`. This data is used to score a learner's guess for a PerseusItem.
 *
 * NOTE:  The value in this map is intentionally a subset of WidgetOptions<T>.
 * By using the same shape (minus any unneeded render data), we are able to
 * share functionality that understands how to traverse maps of `widget id` to
 * `options`.
 */
export type RubricMap = {
    [Property in keyof RubricRegistry as `${Property} ${number}`]: {
        type: Property;
        static?: boolean;
        options: RubricRegistry[Property];
    };
};

export type Rubric = RubricRegistry[keyof RubricRegistry];

/**
 * This is an interface so that it can be extended if a widget is created
 * outside of this Perseus package. See `PerseusWidgetTypes` for a full
 * explanation.
 */
interface UserInputRegistry {
    categorizer: PerseusCategorizerUserInput;
    "cs-program": PerseusCSProgramUserInput;
    dropdown: PerseusDropdownUserInput;
    expression: PerseusExpressionUserInput;
    "free-response": PerseusFreeResponseUserInput;
    grapher: PerseusGrapherUserInput;
    group: PerseusGroupUserInput;
    iframe: PerseusIFrameUserInput;
    "input-number": PerseusInputNumberUserInput;
    "interactive-graph": PerseusInteractiveGraphUserInput;
    "label-image": PerseusLabelImageUserInput;
    matcher: PerseusMatcherUserInput;
    matrix: PerseusMatrixUserInput;
    "number-line": PerseusNumberLineUserInput;
    "numeric-input": PerseusNumericInputUserInput;
    orderer: PerseusOrdererUserInput;
    plotter: PerseusPlotterUserInput;
    radio: PerseusRadioUserInput;
    sorter: PerseusSorterUserInput;
    table: PerseusTableUserInput;
}

//    | PerseusMockWidgetUserInput

/** A union type of all the widget user input types */
export type UserInput = UserInputRegistry[keyof UserInputRegistry];

/**
 * A map of widget IDs to user input types (strongly typed based on the format
 * of the widget ID).
 */
export type UserInputMap = MakeWidgetMap<UserInputRegistry>;

/**
 * deprecated prefer using UserInputMap
 */
export type UserInputArray = Array<
    UserInputArray | UserInput | null | undefined
>;

export interface ValidationDataTypes {
    categorizer: PerseusCategorizerValidationData;
    group: PerseusGroupValidationData;
    plotter: PerseusPlotterValidationData;
}

/**
 * A map of validation data, keyed by `widgetId`. This data is used to check if
 * a question is answerable. This data represents the minimal intersection of
 * data that's available in the client (widget options) and server (scoring
 * data) and is represented by a group of types known as "validation data".
 *
 * NOTE: The value in this map is intentionally a subset of WidgetOptions<T>.
 * By using the same shape (minus any unneeded data), we are able to pass a
 * `PerseusWidgetsMap` or ` into any function that accepts a
 * `ValidationDataMap` without any mutation of data.
 */
export type ValidationDataMap = {
    [Property in keyof ValidationDataTypes as `${Property} ${number}`]: {
        type: Property;
        static?: boolean;
        options: ValidationDataTypes[Property];
    };
};

/**
 * A union type of all the different widget validation data types that exist.
 */
export type ValidationData = ValidationDataTypes[keyof ValidationDataTypes];
