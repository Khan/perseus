import type {Coord} from "./interactive2/types";
import type {
    PerseusCategorizerWidgetOptions,
    PerseusCSProgramWidgetOptions,
    PerseusDefinitionWidgetOptions,
    PerseusDropdownWidgetOptions,
    PerseusExplanationWidgetOptions,
    PerseusExpressionWidgetOptions,
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
} from "./perseus-types";
import type {InteractiveMarkerType} from "./widgets/label-image/types";
import type {Relationship} from "./widgets/number-line/number-line";

export type UserInputStatus = "correct" | "incorrect" | "incomplete";

export type PerseusCategorizerRubric = PerseusCategorizerWidgetOptions;

export type PerseusCategorizerUserInput = {
    values: ReadonlyArray<number>;
};

export type PerseusCSProgramRubric = PerseusCSProgramWidgetOptions;

export type PerseusCSProgramUserInput = {
    status: UserInputStatus;
    message: string | null;
};

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusDefinitionRubric = PerseusDefinitionWidgetOptions;

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusDefinitionUserInput = Empty;

export type PerseusDropdownRubric = PerseusDropdownWidgetOptions;

export type PerseusDropdownUserInput = {
    value: number;
};

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusExplanationRubric = PerseusExplanationWidgetOptions;

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusExplanationUserInput = Empty;

export type PerseusExpressionRubric = PerseusExpressionWidgetOptions;

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

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusImageUserInput = null;

export type PerseusInputNumberRubric = PerseusInputNumberWidgetOptions;

export type PerseusInputNumberUserInput = {
    currentValue: string;
};

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusInteractionRubric = PerseusInteractionWidgetOptions;

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusInteractionUserInput = Empty;

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
export type PerseusPassageUserInput = null;

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusPassageRefRubric = PerseusPassageRefWidgetOptions;

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusPassageRefUserInput = null;

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusPassageRefTargetUserInput = null;

// TODO (LEMS-2396): remove validation logic from widgets that don't validate
export type PerseusPhetSimulationUserInput = null;

export type PerseusPlotterUserInput = ReadonlyArray<number>;

export type PerseusRadioUserInput = {
    countChoices?: boolean;
    choicesSelected: ReadonlyArray<boolean>;
    numCorrect?: number;
    noneOfTheAboveIndex?: number | null | undefined;
    noneOfTheAboveSelected?: boolean;
};

export type PerseusSorterUserInput = {
    options: ReadonlyArray<number>;
};

export type PerseusTableUserInput = ReadonlyArray<ReadonlyArray<string>>;

export type UserInput =
    | PerseusCategorizerUserInput
    | PerseusCSProgramUserInput
    | PerseusDefinitionUserInput
    | PerseusDropdownUserInput
    | PerseusExplanationUserInput
    | PerseusExpressionUserInput
    | PerseusGrapherUserInput
    | PerseusIFrameUserInput
    | PerseusImageUserInput
    | PerseusInputNumberUserInput
    | PerseusInteractionUserInput
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
    | PerseusTableUserInput;
