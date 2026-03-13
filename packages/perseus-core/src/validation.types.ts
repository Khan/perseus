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
    PerseusRenderer,
} from "./data-schema";
import type {ErrorCode} from "./error-codes";
import type {Relationship} from "./types";

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
          message?: ErrorCode | null;
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

/**
 * User input for the Categorizer widget. Records which category
 * the user assigned to each item.
 */
export type PerseusCategorizerUserInput = {
    /**
     * The category index selected for each item, parallel to the
     * rubric's `items` array. Null/undefined means not yet
     * categorized.
     */
    values: Array<number | null | undefined>;
};

export type PerseusCategorizerValidationData = {
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: string[];
};

/** User input for the CS Program widget. */
export type PerseusCSProgramUserInput = {
    /**
     * The outcome of the CS program run, as reported by the program
     * itself via postMessage.
     */
    status: UserInputStatus;
    /** An optional message from the program to display alongside the score. */
    message: string | null;
};

export type PerseusDropdownRubric = {
    choices: Array<PerseusDropdownChoice>;
};

/** User input for the Dropdown widget. */
export type PerseusDropdownUserInput = {
    /**
     * The 1-indexed position of the selected choice in the dropdown.
     * A value of 0 indicates nothing is selected.
     */
    value: number;
};

export type PerseusExpressionRubric = {
    answerForms: Array<PerseusExpressionAnswerForm>;
    functions: string[];
    extraKeys?: ReadonlyArray<string>;
};

/**
 * User input for the Expression widget: the raw math expression
 * string the learner typed, parsed by @khanacademy/kas for scoring.
 */
export type PerseusExpressionUserInput = string;

export type PerseusGroupRubric = PerseusGroupWidgetOptions;
export type PerseusGroupValidationData = PerseusRenderer;

/**
 * User input for the Group widget: a map of widget IDs to each
 * widget's user input. Scored by recursively scoring all contained
 * widgets.
 */
export type PerseusGroupUserInput = UserInputMap;

export type PerseusGradedGroupRubric = PerseusGradedGroupWidgetOptions;

export type PerseusGradedGroupSetRubric = PerseusGradedGroupSetWidgetOptions;

export type PerseusGrapherRubric = {
    correct: GrapherAnswerTypes;
};

/**
 * User input for the Grapher widget: the function type and
 * coordinates the learner plotted.
 */
export type PerseusGrapherUserInput = GrapherAnswerTypes;

/** User input for the IFrame widget. */
export type PerseusIFrameUserInput = {
    /**
     * The outcome of the iframe's interaction, as reported by the
     * iframe via postMessage.
     */
    status: UserInputStatus;
    /** An optional message from the iframe to display alongside the score. */
    message?: string | null;
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

/** User input for the InputNumber widget. */
export type PerseusInputNumberUserInput = {
    /**
     * The raw value entered by the learner. May be a TeX
     * expression; the scorer parses it before grading.
     */
    currentValue: string;
};

export type PerseusInteractiveGraphRubric = {
    // TODO(LEMS-2344): make the type of `correct` more specific
    correct: PerseusGraphCorrectType;
    graph: PerseusGraphType;
};

/**
 * User input for the InteractiveGraph widget: the graph type and
 * coordinates the learner positioned.
 */
export type PerseusInteractiveGraphUserInput = PerseusGraphType;

export type PerseusLabelImageRubric = {
    markers: Array<{
        answers: string[];
        label: string;
    }>;
};

/** User input for a single image marker in the LabelImage widget. */
export type PerseusLabelImageUserInputMarker = {
    /** The answer labels the user selected for this marker. */
    selected?: string[];
    /** The label identifying this marker in the image. */
    label: string;
};

/** User input for the LabelImage widget. */
export type PerseusLabelImageUserInput = {
    /**
     * The user's selections for each image marker, parallel to the
     * rubric's markers array.
     */
    markers: PerseusLabelImageUserInputMarker[];
};

export type PerseusMatcherRubric = {
    // Translatable Text; Static concepts to show in the left column. e.g. ["Fruit", "Color", "Clothes"]
    left: string[];
    // Translatable Markup; Values that represent the concepts to be correlated with the concepts.  e.g. ["Red", "Shirt", "Banana"]
    right: string[];
};

/** User input for the Matcher widget. */
export type PerseusMatcherUserInput = {
    /** The left-column items in the learner's current arrangement. */
    left: string[];
    /**
     * The right-column items in the learner's arrangement. Must match the
     * rubric's right column to be scored correct.
     */
    right: string[];
};

export type PerseusMatrixRubric = {
    // A data matrix representing the "correct" answers to be entered into the matrix
    answers: PerseusMatrixWidgetAnswers;
} & PerseusMatrixValidationData;

export type PerseusMatrixValidationData = Empty;

/** User input for the Matrix widget. */
export type PerseusMatrixUserInput = {
    /**
     * A 2D array of cell values entered by the learner; each string may be a
     * numeric expression.
     */
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

/** User input for the NumberLine widget. */
export type PerseusNumberLineUserInput = {
    /**
     * The actual numeric axis value where the learner placed the point
     * (e.g. `3.5` on a `[0, 10]` number line). Clamped to the rubric's
     * range and snapped to the nearest tick increment.
     */
    numLinePosition: number;
    /**
     * The inequality relationship selected by the learner (e.g. "lt", "gt",
     * "le", "ge", or "eq" for a standard point).
     */
    rel: Relationship | "eq";
    /**
     * The number of tick-mark divisions the learner has set.
     * Validated against the rubric's divisionRange when
     * isTickCtrl is enabled.
     */
    numDivisions: number;
};

export type PerseusNumericInputRubric = {
    // A list of all the possible correct and incorrect answers
    answers: PerseusNumericInputAnswer[];
    // A coefficient style number allows the student to use - for -1 and an empty string to mean 1.
    coefficient: boolean;
};

/** User input for the NumericInput widget. */
export type PerseusNumericInputUserInput = {
    /**
     * The raw value the learner typed. May be a TeX expression or a percent
     * string (e.g. "75%"); the scorer normalizes it before grading.
     */
    currentValue: string;
};

/** User input for the FreeResponse widget. */
export type PerseusFreeResponseUserInput = {
    /** The free-text string entered by the learner. */
    currentValue: string;
};

export type PerseusFreeResponseRubric = {
    question: string;
    scoringCriteria: ReadonlyArray<PerseusFreeResponseWidgetScoringCriterion>;
};

export type PerseusOrdererRubric = PerseusOrdererWidgetOptions;

/** User input for the Orderer widget. */
export type PerseusOrdererUserInput = {
    /**
     * The content strings of the items in the learner's current order,
     * compared against the rubric's correctOptions to score.
     */
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

/**
 * User input for the Plotter widget: an array of Y-axis values, one
 * per bar or data point, as set by the learner.
 */
export type PerseusPlotterUserInput = number[];

export type PerseusRadioRubric = {
    // The choices provided to the user.
    choices: PerseusRadioChoice[];
    // If true, the number of choices selected must match the number of correct choices.
    countChoices?: boolean;
};

/** User input for the Radio widget. */
export type PerseusRadioUserInput = {
    /**
     * The IDs of the choices the learner selected. Each ID corresponds to a
     * choice's `id` field in the rubric. Order is insignificant — scoring
     * uses set membership, not position. IDs are stable and do not reflect
     * the display order, which may be shuffled.
     */
    selectedChoiceIds: string[];
};

export type PerseusSorterRubric = {
    // Translatable Text; The correct answer (in the correct order). The user will see the cards in a randomized order.
    correct: string[];
};

/** User input for the Sorter widget. */
export type PerseusSorterUserInput = {
    /**
     * The content strings of the sortable cards in the learner's current
     * order, compared to the rubric's correct to score.
     */
    options: string[];
    /**
     * Whether the learner has moved any cards from their initial randomized
     * positions. The widget is invalid (considered empty) until true.
     */
    changed: boolean;
};

export type PerseusTableRubric = {
    // Translatable Text; A 2-dimensional array of text to populate the table with
    answers: string[][];
};

/**
 * User input for the Table widget: a 2D array of cell values
 * entered by the learner, scored against the rubric's answers.
 */
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

export interface ValidationDataTypes {
    categorizer: PerseusCategorizerValidationData;
    group: PerseusGroupValidationData;
    plotter: PerseusPlotterValidationData;
}

/**
 * A union type of all the different widget validation data types that exist.
 */
export type ValidationData = ValidationDataTypes[keyof ValidationDataTypes];
