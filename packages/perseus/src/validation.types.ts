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
    PerseusNumberLineWidgetOptions,
    PerseusNumericInputAnswer,
    PerseusOrdererWidgetOptions,
    PerseusPlotterWidgetOptions,
    PerseusRadioChoice,
    PerseusTableWidgetOptions,
    PerseusGraphCorrectType,
} from "./perseus-types";
import type {InteractiveMarkerType} from "./widgets/label-image/types";
import type {Relationship} from "./widgets/number-line/number-line";

export type UserInputStatus = "correct" | "incorrect" | "incomplete";

export type PerseusCategorizerRubric = {
    // The correct answers where index relates to the items and value relates
    // to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
};

export type PerseusCategorizerUserInput = {
    values: PerseusCategorizerRubric["values"];
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

export type PerseusDropdownRubric = {
    choices: ReadonlyArray<PerseusDropdownChoice>;
};

export type PerseusDropdownUserInput = {
    value: number;
};

export type PerseusExpressionRubric = {
    answerForms: ReadonlyArray<PerseusExpressionAnswerForm>;
    functions: ReadonlyArray<string>;
};

export type PerseusExpressionUserInput = string;

export type PerseusGroupRubric = PerseusGroupWidgetOptions;

export type PerseusGradedGroupRubric = PerseusGradedGroupWidgetOptions;

export type PerseusGradedGroupSetRubric = PerseusGradedGroupSetWidgetOptions;

export type PerseusGrapherRubric = {
    correct: GrapherAnswerTypes;
};

export type PerseusGrapherUserInput = PerseusGrapherRubric["correct"];

// TODO(LEMS-2440): Can possibly be removed during 2440; only userInput used
export type PerseusIFrameRubric = Empty;

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

/* TODO(LEMS-2440): Should be removed or refactored. Grading info may need
    to be moved to the rubric from userInput. */
export type PerseusLabelImageRubric = Empty;

export type PerseusLabelImageUserInput = {
    markers: ReadonlyArray<InteractiveMarkerType>;
};

export type PerseusMatcherRubric = PerseusMatcherWidgetOptions;

export type PerseusMatcherUserInput = {
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
};

export type PerseusMatrixRubric = {
    // A data matrix representing the "correct" answers to be entered into the matrix
    answers: PerseusMatrixWidgetAnswers;
};

export type PerseusMatrixUserInput = {
    answers: PerseusMatrixRubric["answers"];
};

export type PerseusNumberLineRubric = PerseusNumberLineWidgetOptions & {
    isInequality: boolean;
};

export type PerseusNumberLineUserInput = {
    isTickCrtl?: boolean;
    numLinePosition: number;
    rel: Relationship | "eq";
    numDivisions: number;
    divisionRange: ReadonlyArray<number>;
};

export type PerseusNumericInputRubric = {
    // A list of all the possible correct and incorrect answers
    answers: ReadonlyArray<PerseusNumericInputAnswer>;
    // A coefficient style number allows the student to use - for -1 and an empty string to mean 1.
    coefficient: boolean;
};

export type PerseusNumericInputUserInput = {
    currentValue: string;
};

export type PerseusOrdererRubric = PerseusOrdererWidgetOptions;

export type PerseusOrdererUserInput = {
    current: ReadonlyArray<string>;
};

export type PerseusPlotterRubric = PerseusPlotterWidgetOptions;

export type PerseusPlotterUserInput = ReadonlyArray<number>;

export type PerseusRadioRubric = {
    // The choices provided to the user.
    choices: ReadonlyArray<PerseusRadioChoice>;
};

export type PerseusRadioUserInput = {
    choicesSelected: ReadonlyArray<boolean>;
    noneOfTheAboveSelected?: boolean;
};

export type PerseusSorterRubric = {
    // Translatable Text; The correct answer (in the correct order). The user will see the cards in a randomized order.
    correct: ReadonlyArray<string>;
};

export type PerseusSorterUserInput = {
    options: ReadonlyArray<string>;
    changed: boolean;
};

export type PerseusTableRubric = PerseusTableWidgetOptions;

export type PerseusTableUserInput = ReadonlyArray<ReadonlyArray<string>>;

export type Rubric =
    | PerseusCategorizerRubric
    | PerseusCSProgramRubric
    | PerseusDropdownRubric
    | PerseusExpressionRubric
    | PerseusGroupRubric
    | PerseusGradedGroupRubric
    | PerseusGradedGroupSetRubric
    | PerseusGrapherRubric
    | PerseusIFrameRubric
    | PerseusInputNumberRubric
    | PerseusInteractiveGraphRubric
    | PerseusLabelImageRubric
    | PerseusMatcherRubric
    | PerseusMatrixRubric
    | PerseusNumberLineRubric
    | PerseusNumericInputRubric
    | PerseusOrdererRubric
    | PerseusPlotterRubric
    | PerseusRadioRubric
    | PerseusSorterRubric
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
