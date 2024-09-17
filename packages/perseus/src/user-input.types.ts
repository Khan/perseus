import type {Coord} from "./interactive2/types";

export type UserInputStatus = "correct" | "incorrect" | "incomplete";

export type PerseusCategorizerUserInput = {
    values: ReadonlyArray<number>;
};

export type PerseusCSProgramUserInput = {
    status: UserInputStatus;
    message: string | null;
};

export type PerseusDropdownUserInput = {
    value: number;
};

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
