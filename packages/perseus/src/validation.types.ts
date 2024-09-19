import type {Coord} from "./interactive2/types";
import type {
    PerseusCategorizerWidgetOptions,
    PerseusCSProgramWidgetOptions,
    PerseusDefinitionWidgetOptions,
    PerseusDropdownWidgetOptions,
    PerseusExplanationWidgetOptions,
    PerseusExpressionWidgetOptions,
    PerseusGraphType,
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

/**
 * TODO: this is kind of just a guess right now
 * based off of an old comment in grapher
 */
export type PerseusGrapherUserInput = {
    type: string;
    asymptote: ReadonlyArray<Coord>;
    coords: ReadonlyArray<Coord>;
};

export type PerseusIFrameUserInput = {
    status: UserInputStatus;
    message: string | null;
};

export type PerseusInputNumberUserInput = {
    currentValue: string;
};

export type PerseusInteractiveGraphUserInput = PerseusGraphType;

export type PerseusLabelImageUserInput = {
    markers: ReadonlyArray<InteractiveMarkerType>;
};

export type PerseusMatcherUserInput = {
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
};

export type PerseusMatrixUserInput = {
    answers: ReadonlyArray<ReadonlyArray<number>>;
};

export type PerseusNumberLineUserInput = {
    numLinePosition: number;
    rel: Relationship | "eq";
    numDivisions: number;
    divisionRange: ReadonlyArray<number>;
};

export type PerseusNumericInputUserInput = {
    currentValue: string;
};

export type PerseusOrdererUserInput = {
    current: ReadonlyArray<string>;
};

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
