/**
 * This file contains types used for validation and scoring. The types abide by
 * a naming convention so that they're easy to follow and that we remain
 * consistency across all of the widgets.
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
 *   * `Perseus<Widget>ScoringData` (nee `Perseus<Widget>Rubric`): the data
 *     needed to score the user input. By convention, this type is defined as
 *     the set of sensitive answer data and then intersected with
 *     `Perseus<Widget>ValidationData`.
 *
 * For example:
 * ```
 * type Perseus<Widget>ScoringData = {
 *     correct: string;  // Used _only_ for scoring
 *     size: number;     // Used _only_ for scoring
 * } & Perseus<Widget>ValidationData;
 * ```
 */

import type {Relationship} from "./widgets/number-line/number-line";
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
} from "@khanacademy/perseus-core";

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
export type PerseusGroupValidationData = {widgets: ValidationDataMap};
export type PerseusGroupUserInput = UserInputMap;

export type PerseusGradedGroupScoringData = PerseusGradedGroupWidgetOptions;

export type PerseusGradedGroupSetScoringData =
    PerseusGradedGroupSetWidgetOptions;

export type PerseusGrapherScoringData = {
    correct: GrapherAnswerTypes;
};

export type PerseusGrapherUserInput = PerseusGrapherScoringData["correct"];

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

export type PerseusLabelImageScoringData = {
    markers: ReadonlyArray<{
        answers: ReadonlyArray<string>;
        label: string;
    }>;
};

export type PerseusLabelImageUserInput = {
    markers: ReadonlyArray<{
        selected?: ReadonlyArray<string>;
        label: string;
    }>;
};

export type PerseusMatcherScoringData = {
    // Translatable Text; Static concepts to show in the left column. e.g. ["Fruit", "Color", "Clothes"]
    left: ReadonlyArray<string>;
    // Translatable Markup; Values that represent the concepts to be correlated with the concepts.  e.g. ["Red", "Shirt", "Banana"]
    right: ReadonlyArray<string>;
};

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

export type PerseusTableScoringData = {
    // Translatable Text; A 2-dimensional array of text to populate the table with
    answers: ReadonlyArray<ReadonlyArray<string>>;
};

export type PerseusTableUserInput = ReadonlyArray<ReadonlyArray<string>>;

export interface ScoringDataRegistry {
    categorizer: PerseusCategorizerScoringData;
    dropdown: PerseusDropdownScoringData;
    expression: PerseusExpressionScoringData;
    "graded-group-set": PerseusGradedGroupSetScoringData;
    "graded-group": PerseusGradedGroupScoringData;
    grapher: PerseusGrapherScoringData;
    group: PerseusGroupScoringData;
    image: PerseusLabelImageScoringData;
    "input-number": PerseusInputNumberScoringData;
    "interactive-graph": PerseusInteractiveGraphScoringData;
    "label-image": PerseusLabelImageScoringData;
    matcher: PerseusMatcherScoringData;
    matrix: PerseusMatrixScoringData;
    "number-line": PerseusNumberLineScoringData;
    "numeric-input": PerseusNumericInputScoringData;
    orderer: PerseusOrdererScoringData;
    plotter: PerseusPlotterScoringData;
    radio: PerseusRadioScoringData;
    sorter: PerseusSorterScoringData;
    table: PerseusTableScoringData;
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
export type ScoringDataMap = {
    [Property in keyof ScoringDataRegistry as `${Property} ${number}`]: {
        type: Property;
        static?: boolean;
        options: ScoringDataRegistry[Property];
    };
};

export type ScoringData = ScoringDataRegistry[keyof ScoringDataRegistry];

export type ScoringRenderer = {
    content: string;
    widgets: ScoringDataMap;
};

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
 * @deprecated prefer using UserInputMap
 */
export type UserInputArray = ReadonlyArray<
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
