import type {
    GrapherAnswerTypes,
    PerseusDefinitionWidgetOptions,
    PerseusDropdownChoice,
    PerseusExplanationWidgetOptions,
    PerseusExpressionAnswerForm,
    PerseusGradedGroupSetWidgetOptions,
    PerseusGradedGroupWidgetOptions,
    PerseusGraphType,
    PerseusGroupWidgetOptions,
    PerseusIFrameWidgetOptions,
    PerseusImageWidgetOptions,
    PerseusInputNumberWidgetOptions,
    PerseusInteractionWidgetOptions,
    PerseusLabelImageWidgetOptions,
    PerseusMatcherWidgetOptions,
    PerseusMatrixWidgetOptions,
    PerseusNumberLineWidgetOptions,
    PerseusNumericInputWidgetOptions,
    PerseusOrdererWidgetOptions,
    PerseusPassageRefWidgetOptions,
    PerseusPassageWidgetOptions,
    PerseusPlotterWidgetOptions,
    PerseusRadioWidgetOptions,
    PerseusSorterWidgetOptions,
    PerseusTableWidgetOptions,
    PerseusVideoWidgetOptions,
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

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusDefinitionRubric = PerseusDefinitionWidgetOptions;

export type PerseusDropdownRubric = {
    choices: ReadonlyArray<PerseusDropdownChoice>;
};

export type PerseusDropdownUserInput = {
    value: number;
};

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusExplanationRubric = PerseusExplanationWidgetOptions;

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

export type PerseusIFrameRubric = PerseusIFrameWidgetOptions;

export type PerseusIFrameUserInput = {
    status: UserInputStatus;
    message: string | null;
};

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusImageRubric = PerseusImageWidgetOptions;

export type PerseusInputNumberRubric = PerseusInputNumberWidgetOptions;

export type PerseusInputNumberUserInput = {
    currentValue: string;
};

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusInteractionRubric = PerseusInteractionWidgetOptions;

export type PerseusInteractiveGraphRubric = {
    // TODO(LEMS-2344): make the type of `correct` more specific
    correct: PerseusGraphType;
    graph: PerseusGraphType;
};

export type PerseusInteractiveGraphUserInput = PerseusGraphType;

export type PerseusLabelImageRubric = PerseusLabelImageWidgetOptions;

export type PerseusLabelImageUserInput = {
    markers: ReadonlyArray<InteractiveMarkerType>;
};

export type PerseusMatcherRubric = PerseusMatcherWidgetOptions;

export type PerseusMatcherUserInput = {
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
};

export type PerseusMatrixRubric = PerseusMatrixWidgetOptions;

export type PerseusMatrixUserInput = {
    answers: ReadonlyArray<ReadonlyArray<number>>;
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

export type PerseusNumericInputRubric = PerseusNumericInputWidgetOptions;

export type PerseusNumericInputUserInput = {
    currentValue: string;
};

export type PerseusOrdererRubric = PerseusOrdererWidgetOptions;

export type PerseusOrdererUserInput = {
    current: ReadonlyArray<string>;
};

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusPassageRubric = PerseusPassageWidgetOptions;

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusPassageRefRubric = PerseusPassageRefWidgetOptions;

export type PerseusPlotterRubric = PerseusPlotterWidgetOptions;

export type PerseusPlotterUserInput = ReadonlyArray<number>;

export type PerseusRadioRubric = PerseusRadioWidgetOptions;

export type PerseusRadioUserInput = {
    countChoices?: boolean;
    choicesSelected: ReadonlyArray<boolean>;
    numCorrect?: number;
    noneOfTheAboveIndex?: number | null | undefined;
    noneOfTheAboveSelected?: boolean;
};

export type PerseusSorterRubric = PerseusSorterWidgetOptions;

export type PerseusSorterUserInput = {
    options: ReadonlyArray<string>;
    changed: boolean;
};

export type PerseusTableRubric = PerseusTableWidgetOptions;

export type PerseusTableUserInput = ReadonlyArray<ReadonlyArray<string>>;

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusVideoRubric = PerseusVideoWidgetOptions;

export type Rubric =
    | PerseusCategorizerRubric
    | PerseusCSProgramRubric
    | PerseusDefinitionRubric
    | PerseusDropdownRubric
    | PerseusExplanationRubric
    | PerseusExpressionRubric
    | PerseusGroupRubric
    | PerseusGradedGroupRubric
    | PerseusGradedGroupSetRubric
    | PerseusGrapherRubric
    | PerseusIFrameRubric
    | PerseusImageRubric
    | PerseusInputNumberRubric
    | PerseusInteractionRubric
    | PerseusInteractiveGraphRubric
    | PerseusLabelImageRubric
    | PerseusMatcherRubric
    | PerseusMatrixRubric
    | PerseusNumberLineRubric
    | PerseusNumericInputRubric
    | PerseusOrdererRubric
    | PerseusPassageRubric
    | PerseusPassageRefRubric
    | PerseusPlotterRubric
    | PerseusRadioRubric
    | PerseusSorterRubric
    | PerseusTableRubric
    | PerseusVideoRubric;

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
