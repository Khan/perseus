import Key from "../../data/keys";

export interface MathQuillInterface {
    L: "L";
    R: "R";
    MathField: (
        mount: HTMLDivElement | HTMLSpanElement,
        config: MathFieldConfig,
    ) => MathFieldInterface;
}

type MathQuillDir = "L" | "R";

export type MathFieldConfig = {
    spaceBehavesLikeTab?: boolean;
    leftRightIntoCmdGoes?: string;
    restrictMismatchedBrackets?: boolean;
    sumStartsWithNEquals?: boolean;
    supSubsRequireOperand?: boolean;
    charsThatBreakOutOfSupSub?: string;
    autoSubscriptNumerals?: boolean;
    autoCommands?: string;
    autoOperatorNames?: string;
    maxDepth?: number;
    substituteTextarea?: () => HTMLElement;
    handlers?: {
        edit?: (mathField: MathFieldInterface) => void;
        upOutOf?: (mathField: MathFieldInterface) => void;
        moveOutOf?: (dir: MathQuillDir, mathField: MathFieldInterface) => void;
    };
};

export interface MathFieldInterface {
    // Puts the focus on the editable field.
    // http://docs.mathquill.com/en/latest/Api_Methods/#focus
    focus: () => MathFieldInterface;
    // Removes focus from the editable field.
    // http://docs.mathquill.com/en/latest/Api_Methods/#blur
    blur: () => MathFieldInterface;
    // Write LaTeX
    // https://docs.mathquill.com/en/latest/Api_Methods/#writelatex_string
    write: (input: string) => MathFieldInterface;
    // Enter a LaTeX command
    // https://docs.mathquill.com/en/latest/Api_Methods/#cmdlatex_string
    cmd: (input: string) => MathFieldInterface;
    // Simulates keystrokes given a string like "Ctrl-Home Del"
    // https://docs.mathquill.com/en/latest/Api_Methods/#keystrokekeys
    keystroke: (input: string) => MathFieldInterface;
    // Simulates typing text, one character at a time
    // https://docs.mathquill.com/en/latest/Api_Methods/#typedtexttext
    typedText: (input: string) => MathFieldInterface;
    // () => {}: Gets the contents as LaTeX
    // (string) => {}: Sets the contents as LaTeX
    // https://docs.mathquill.com/en/latest/Api_Methods/#latex
    latex: (input?: string) => string;
    // Moves the cursor to the end of the mathfield in the direction specified
    // https://docs.mathquill.com/en/latest/Api_Methods/#movetodirenddirection
    moveToDirEnd: (direction: "L" | "R") => void;
    // Selects the contents
    // https://docs.mathquill.com/en/latest/Api_Methods/#select
    select: () => void;
    // Clears the selection
    // https://docs.mathquill.com/en/latest/Api_Methods/#clearselection
    clearSelection: () => void;
    // Custom helper in our MathQuill fork
    // check to see if cursor is on right end
    cursorAtRightEnd: () => boolean;
    // Custom helper in our MathQuill fork
    // check to see if cursor is on left end
    cursorAtLeftEnd: () => boolean;
    // This isn't part of the MathQuill public API
    // I don't know what it is and it feels wrong using it
    __controller: any;
}

export enum MathFieldActionType {
    WRITE = "write",
    CMD = "cmd",
    KEYSTROKE = "keystroke",
    MQ_END = 0,
}

// The MathQuill MathField Cursor
// it's not part of the public API for MathQuill,
// we reach into the internals to get it
export type MathFieldCursor = any;

export type MathFieldUpdaterCallback = (
    mathField: MathFieldInterface,
    key: Key,
) => void;
