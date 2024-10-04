import type {Coord} from "./interactive2/types";
import type {
    PerseusCategorizerWidgetOptions,
    PerseusDefinitionWidgetOptions,
    PerseusDropdownWidgetOptions,
    PerseusExplanationWidgetOptions,
    PerseusExpressionAnswerForm,
    PerseusGradedGroupSetWidgetOptions,
    PerseusGradedGroupWidgetOptions,
    PerseusGrapherWidgetOptions,
    PerseusGraphType,
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

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type EmptyUserInput = Empty;

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type NullUserInput = null;

export type PerseusCategorizerRubric = PerseusCategorizerWidgetOptions;

export type PerseusCategorizerUserInput = {
    values: ReadonlyArray<number>;
};

// TODO(LEMS-2440): Can possibly be removed during 2440?
// This is not used for grading at all. The only place it is used is to define
// Props type in cs-program.tsx, but RenderProps already contains WidgetOptions
export type PerseusCSProgramRubric = Empty;

export type PerseusCSProgramUserInput = {
    status: UserInputStatus;
    message: string | null;
};

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusDefinitionRubric = PerseusDefinitionWidgetOptions;

export type PerseusDropdownRubric = PerseusDropdownWidgetOptions;

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

export type PerseusGradedGroupRubric = PerseusGradedGroupWidgetOptions;

export type PerseusGradedGroupSetRubric = PerseusGradedGroupSetWidgetOptions;

export type PerseusGrapherRubric = PerseusGrapherWidgetOptions;

/**
 * TODO: this is kind of just a guess right now
 * based off of an old comment in grapher
 */
export type PerseusGrapherUserInput = {
    type: string;
    asymptote: ReadonlyArray<Coord>;
    coords: ReadonlyArray<Coord>;
};

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

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusMoleculeUserInput = ReadonlyArray<ReadonlyArray<string>>;

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
    | PerseusMoleculeUserInput
    | PerseusNumberLineUserInput
    | PerseusNumericInputUserInput
    | PerseusOrdererUserInput
    | PerseusPlotterUserInput
    | PerseusRadioUserInput
    | PerseusSorterUserInput
    | PerseusTableUserInput
    | EmptyUserInput;
