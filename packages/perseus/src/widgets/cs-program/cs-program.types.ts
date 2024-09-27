export type Status = "correct" | "incorrect" | "incomplete";

export type UserInput = {
    status: Status;
    message: string | null;
};
