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
    MakeWidgetMap,
    PerseusGraphType,
    PerseusWidgetOptions,
} from "./data-schema";
import type {ErrorCode} from "./error-codes";
import type {Relationship} from "./types";
import type {CategorizerPublicWidgetOptions} from "./widgets/categorizer/categorizer-util";
import type {GroupPublicWidgetOptions} from "./widgets/group/group-util";
import type {PlotterPublicWidgetOptions} from "./widgets/plotter/plotter-util";

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

    /** The answerless data needed to validate the input. */
    validationData: ValidationData,

    /**
     * The user's locale, needed for some validations. For example,
     * commas may be interpreted as decimal separators in some locales.
     */
    locale: string,
) => ValidationResult;

/** The signature of a widget's scoring function. */
export type WidgetScorerFunction = (
    /**
     * The user's input (guess) data to score. Undefined if the user never
     * interacted with the widget.
     */
    userInput: UserInput | undefined,

    /** The scoring criteria containing the correct answer. */
    rubric: PerseusWidgetOptions,

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
           * are free to award any number of points, but the score is only
           * considered "correct" when `earned` >= `total`).
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

export type PerseusBlankUserInput = {
    /**
     * The user's placed answer tile on the blank, or null if the user has not
     * placed a tile yet.
     */
    selected: string | null;
};

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

/** User input for the Dropdown widget. */
export type PerseusDropdownUserInput = {
    /**
     * The 1-indexed position of the selected choice in the dropdown.
     * A value of 0 indicates nothing is selected.
     */
    value: number;
};

/**
 * User input for the Expression widget: the raw math expression
 * string the learner typed, parsed by @khanacademy/kas for scoring.
 */
export type PerseusExpressionUserInput = string;

/**
 * User input for the Group widget: a map of widget IDs to each widget's user
 * input. Scored by recursively scoring all contained widgets.
 */
export type PerseusGroupUserInput = UserInputMap;

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

/** User input for the InputNumber widget. */
export type PerseusInputNumberUserInput = {
    /**
     * The raw value entered by the learner. May be a TeX expression; the
     * scorer parses it before grading.
     */
    currentValue: string;
};

/**
 * User input for the InteractiveGraph widget: the graph type and coordinates
 * the learner positioned.
 */
export type PerseusInteractiveGraphUserInput = PerseusGraphType;

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

/** User input for the Matrix widget. */
export type PerseusMatrixUserInput = {
    /**
     * A 2D array of cell values entered by the learner; each string may be a
     * numeric expression.
     */
    answers: string[][];
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

/** User input for the Orderer widget. */
export type PerseusOrdererUserInput = {
    /**
     * The content strings of the items in the learner's current order,
     * compared against the rubric's correctOptions to score.
     */
    current: string[];
};

/**
 * User input for the Plotter widget: an array of Y-axis values, one
 * per bar or data point, as set by the learner.
 */
export type PerseusPlotterUserInput = number[];

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

/**
 * User input for the Table widget: a 2D array of cell values
 * entered by the learner, scored against the rubric's answers.
 */
export type PerseusTableUserInput = string[][];

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
    categorizer: CategorizerPublicWidgetOptions;
    group: GroupPublicWidgetOptions;
    plotter: PlotterPublicWidgetOptions;
}

/**
 * A union type of all the different widget validation data types that exist.
 */
export type ValidationData = ValidationDataTypes[keyof ValidationDataTypes];
