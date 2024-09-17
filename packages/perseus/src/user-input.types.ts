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
