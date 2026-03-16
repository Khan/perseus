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

/**
 * The signature of a widget's client-side validation function. This function
 * runs before the learner submits their attempt, so it will be passed
 * answerless widget option data (as returned by `PublicWidgetOptionsFunction`).
 *
 * Returns an invalid result (ie. empty) if the input is not yet ready to be
 * scored, or null if valid.
 */
export type WidgetValidatorFunction = (
    /**
     * The user's input. Undefined if the widget has never been interacted
     * with.
     */
    userInput: UserInput | undefined,

    /** The non-sensitive data needed to validate the input. */
    validationData: ValidationData,

    /** The locale for locale-sensitive validation. */
    locale: string,
) => ValidationResult;

/** The signature of a widget's scoring function. */
export type WidgetScorerFunction = (
    /**
     * The user's input (guess) data to score. Undefined if never interacted
     * with.
     */
    userInput: UserInput | undefined,

    /** The scoring criteria containing the correct answer. */
    rubric: Rubric,

    /**
     * The locale for locale-sensitive scoring (eg. decimal separators).
     */
    locale?: string,
) => PerseusScore;

/** The result of scoring a widget's user input. */
export type PerseusScore =
    | {
          /** Indicates the input is not ready to score. */
          type: "invalid";
          /**
           * An error code describing why the input is invalid, or null
           * for a generic invalid state.
           */
          message?: ErrorCode | null;
          /** When true, suppresses the "almost there" hint. */
          suppressAlmostThere?: boolean | null | undefined;
      }
    | {
          /**
           * Indicates the input has been scored and points awarded (widgets
           * are free to reward any number of points, but the score is only
           * considered "correct" when `earned` == `total`).
           */
          type: "points";
          /** The number of points the learner earned. */
          earned: number;
          /** The total possible points for this widget. */
          total: number;
          /** An optional feedback message to display alongside the score. */
          message?: string | null | undefined;
      };

/**
 * The return type of a widget validator. Null means the input is valid and
 * ready to score; otherwise, an invalid PerseusScore describing why it is not
 * ready.
 */
export type ValidationResult = Extract<PerseusScore, {type: "invalid"}> | null;

/**
 * The outcome status reported by a self-grading widget (CS Program or IFrame)
 * via postMessage.
 */
export type UserInputStatus = "correct" | "incorrect" | "incomplete";

/** Scoring rubric for the Categorizer widget. */
export type PerseusCategorizerRubric = {
    /**
     * The correct category index for each item. The array index corresponds to
     * the item; the value is the category index.
     * e.g. [0, 1, 0, 1, 2]
     */
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

/** Validation data for the Categorizer widget. */
export type PerseusCategorizerValidationData = {
    /**
     * Translatable text; items to categorize.
     * e.g. ["banana", "yellow", "apple", "purple", "shirt"]
     */
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

/** Scoring rubric for the Dropdown widget. */
export type PerseusDropdownRubric = {
    /** The list of choices; each has a `correct` flag used for scoring. */
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

/** Scoring rubric for the Expression widget. */
export type PerseusExpressionRubric = {
    /**
     * Ordered list of answer forms matched top-to-bottom; the first
     * match determines the score.
     */
    answerForms: Array<PerseusExpressionAnswerForm>;
    /**
     * Variable names treated as functions (e.g. ["f", "g"]) during KAS
     * parsing.
     */
    functions: string[];
    extraKeys?: ReadonlyArray<string>;
};

/**
 * User input for the Expression widget: the raw math expression
 * string the learner typed, parsed by @khanacademy/kas for scoring.
 */
export type PerseusExpressionUserInput = string;

/**
 * Scoring rubric for the Group widget: the full widget options including all
 * nested widgets and their rubrics.
 */
export type PerseusGroupRubric = PerseusGroupWidgetOptions;

/**
 * Validation data for the Group widget: the full renderer content used to
 * recursively validate nested widgets.
 */
export type PerseusGroupValidationData = PerseusRenderer;

/**
 * User input for the Group widget: a map of widget IDs to each widget's user
 * input. Scored by recursively scoring all contained widgets.
 */
export type PerseusGroupUserInput = UserInputMap;

/** Scoring rubric for the GradedGroup widget. */
export type PerseusGradedGroupRubric = PerseusGradedGroupWidgetOptions;

/** Scoring rubric for the GradedGroupSet widget. */
export type PerseusGradedGroupSetRubric = PerseusGradedGroupSetWidgetOptions;

/** Scoring rubric for the Grapher widget. */
export type PerseusGrapherRubric = {
    /** The expected function type and coordinates for a correct answer. */
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
     * The outcome of the iframe's interaction, as reported by the iframe via
     * postMessage.
     */
    status: UserInputStatus;
    /** An optional message from the iframe to display alongside the score. */
    message?: string | null;
};

/** Scoring rubric for the InputNumber widget. */
export type PerseusInputNumberRubric = {
    /**
     * Constrains which numeric forms are accepted.
     * Defaults to "number" if unset.
     */
    answerType?:
        | "number"
        | "decimal"
        | "integer"
        | "rational"
        | "improper"
        | "mixed"
        | "percent"
        | "pi";
    /**
     * When true, approximate answers within `maxError` of the correct
     * value are accepted.
     */
    inexact?: boolean;
    /**
     * The maximum allowable deviation from the correct value when
     * `inexact` is true.
     */
    maxError?: number | string;
    /** Whether the learner's answer must be in simplified form. */
    simplify: "required" | "optional" | "enforced";
    /** The correct answer value. */
    value: string | number;
};

/** User input for the InputNumber widget. */
export type PerseusInputNumberUserInput = {
    /**
     * The raw value entered by the learner. May be a TeX expression; the
     * scorer parses it before grading.
     */
    currentValue: string;
};

/** Scoring rubric for the InteractiveGraph widget. */
export type PerseusInteractiveGraphRubric = {
    /**
     * The expected graph state for a correct answer.
     */
    // TODO(LEMS-2344): make the type of `correct` more specific.
    correct: PerseusGraphCorrectType;
    /**
     * The initial graph state; used to detect an unanswered/empty widget
     * (input equals this when nothing has moved).
     */
    graph: PerseusGraphType;
};

/**
 * User input for the InteractiveGraph widget: the graph type and coordinates
 * the learner positioned.
 */
export type PerseusInteractiveGraphUserInput = PerseusGraphType;

/** Scoring rubric for the LabelImage widget. */
export type PerseusLabelImageRubric = {
    /**
     * The expected answers for each labeled region in the image, parallel to
     * the user input's markers.
     */
    markers: Array<{
        /** The set of correct answer labels for this marker. */
        answers: string[];
        /** The label text identifying this marker in the image. */
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

/** Scoring rubric for the Matcher widget. */
export type PerseusMatcherRubric = {
    /**
     * Static concepts for the left column. e.g. ["Fruit", "Color", "Clothes"]
     *
     * Translatable text.
     */
    left: string[];
    /**
     * the correct right-column values, ordered to match the left. e.g.
     * ["Banana", "Red", "Shirt"]
     *
     * Translatable markup.
     */
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

/** Scoring rubric for the Matrix widget. */
export type PerseusMatrixRubric = {
    /** The correct 2D matrix of answers. */
    answers: PerseusMatrixWidgetAnswers;
} & PerseusMatrixValidationData;

/**
 * Validation data for the Matrix widget; currently empty — validation is
 * performed from user input alone.
 */
export type PerseusMatrixValidationData = Empty;

/** User input for the Matrix widget. */
export type PerseusMatrixUserInput = {
    /**
     * A 2D array of cell values entered by the learner; each string may be a
     * numeric expression.
     */
    answers: string[][];
};

/** Scoring rubric for the NumberLine widget. */
export type PerseusNumberLineRubric = {
    /**
     * The correct inequality relation (e.g. "lt", "ge"), or null
     * for an equality question.
     */
    correctRel: string | null | undefined;
    /** The correct numeric position on the number line. */
    correctX: number;
    /** The [min, max] extent of the number line. */
    range: number[];
    /** The starting position of the point. Defaults to range[0] if null. */
    initialX: number | null | undefined;
    /** When true, the widget shows a shaded region and a relation selector. */
    isInequality: boolean;
    /** When true, the learner can adjust the number of tick-mark divisions. */
    isTickCtrl?: boolean;
    /** The [min, max] allowed number of divisions when isTickCtrl is true. */
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

/** Scoring rubric for the NumericInput widget. */
export type PerseusNumericInputRubric = {
    /**
     * All possible correct and incorrect answer configurations,
     * each with a value, status, and optional constraints.
     */
    answers: PerseusNumericInputAnswer[];
    /**
     * When true, allows shorthand coefficient entry: "-" means -1
     * and an empty string means 1.
     */
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

/** Scoring rubric for the FreeResponse widget. */
export type PerseusFreeResponseRubric = {
    /** The question text shown to the learner. */
    question: string;
    /** The criteria used for AI-assisted scoring of the learner's response. */
    scoringCriteria: ReadonlyArray<PerseusFreeResponseWidgetScoringCriterion>;
};

/**
 * Scoring rubric for the Orderer widget: the full widget options
 * including the correct ordering.
 */
export type PerseusOrdererRubric = PerseusOrdererWidgetOptions;

/** User input for the Orderer widget. */
export type PerseusOrdererUserInput = {
    /**
     * The content strings of the items in the learner's current order,
     * compared against the rubric's correctOptions to score.
     */
    current: string[];
};

/** Scoring rubric for the Plotter widget. */
export type PerseusPlotterRubric = {
    /** The expected Y-axis values representing the correct answer. */
    correct: number[];
} & PerseusPlotterValidationData;

/** Validation data for the Plotter widget. */
export type PerseusPlotterValidationData = {
    /** The initial Y-axis values the chart is pre-populated with. */
    starting: number[];
};

/**
 * User input for the Plotter widget: an array of Y-axis values, one
 * per bar or data point, as set by the learner.
 */
export type PerseusPlotterUserInput = number[];

/** Scoring rubric for the Radio widget. */
export type PerseusRadioRubric = {
    /** The answer choices shown to the learner; each has a `correct` flag. */
    choices: PerseusRadioChoice[];
    /**
     * When true, the learner must select exactly as many choices as there
     * are correct answers before the answer is graded.
     */
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

/** Scoring rubric for the Sorter widget. */
export type PerseusSorterRubric = {
    /**
     * Translatable text; the correct ordering of the cards. The
     * learner sees them in a randomized order.
     */
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

/** Scoring rubric for the Table widget. */
export type PerseusTableRubric = {
    /** Translatable text; the correct 2D array of cell values. */
    answers: string[][];
};

/**
 * User input for the Table widget: a 2D array of cell values
 * entered by the learner, scored against the rubric's answers.
 */
export type PerseusTableUserInput = string[][];

/**
 * A registry mapping widget type names to their rubric types.
 */
// NOTE: Extend this interface to add new widget rubric types.
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

/** A union of all widget rubric types. */
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
 * A registry mapping widget type names to their client-side
 * validation data types.
 */
export interface ValidationDataTypes {
    categorizer: PerseusCategorizerValidationData;
    group: PerseusGroupValidationData;
    plotter: PerseusPlotterValidationData;
}

/**
 * A union type of all the different widget validation data types that exist.
 */
export type ValidationData = ValidationDataTypes[keyof ValidationDataTypes];
