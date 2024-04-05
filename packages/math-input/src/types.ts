import type {CursorContext} from "./components/input/cursor-contexts";
import type Key from "./data/keys";
import type {KeyType, KeypadType} from "./enums";
import type {KeypadContextRendererInterface} from "@khanacademy/perseus-core";
import type * as React from "react";
import type ReactDOM from "react-dom";

export type IconConfig = {
    data: string;
};

export type NonManyKeyConfig = {
    id: Key;
    type: Exclude<KeyType, "MANY">;
    icon: IconConfig;
    ariaLabel: string;
};

export type ManyKeyConfig = Omit<NonManyKeyConfig, "type"> & {
    type: Extract<KeyType, "MANY">;
    childKeyIds: ReadonlyArray<string>;
};

export type KeyConfig = NonManyKeyConfig | ManyKeyConfig;

export type KeypadConfiguration = {
    keypadType: KeypadType;
    extraKeys?: ReadonlyArray<Key>;
    times?: boolean;
};

export type KeyHandler = (key: Key) => Cursor;

export type Cursor = {
    context: (typeof CursorContext)[keyof typeof CursorContext];
};

export type ClickKeyCallback = (key: Key, event?: React.SyntheticEvent) => void;

export type KeypadPageType =
    | "Geometry"
    | "Operators"
    | "Numbers"
    | "Fractions"
    | "Extras"
    | "Dismiss";

export interface KeypadAPI {
    activate: () => void;
    dismiss: () => void;
    configure: (configuration: KeypadConfiguration, cb: () => void) => void;
    setCursor: (cursor: Cursor) => void;
    setKeyHandler: (keyHandler: KeyHandler) => void;
    getDOMNode: () => ReturnType<typeof ReactDOM.findDOMNode>;
}

export type KeypadContextType = {
    setKeypadActive: (keypadActive: boolean) => void;
    keypadActive: boolean;
    setKeypadElement: (keypadElement?: KeypadAPI) => void;
    keypadElement: KeypadAPI | null | undefined;
    setRenderer: (
        renderer?: KeypadContextRendererInterface | null | undefined,
    ) => void;
    renderer: KeypadContextRendererInterface | null | undefined;
    setScrollableElement: (
        scrollableElement?: HTMLElement | null | undefined,
    ) => void;
    scrollableElement: HTMLElement | null | undefined;
};

/**
 * The translated strings that are used to render the Math Input.
 */
export type MathInputStrings = {
    mathInputBox: string;
    fingerTap: string;
    before: ({obj}: {obj: string}) => string;
    after: ({obj}: {obj: string}) => string;
    "beginning of": ({obj}: {obj: string}) => string;
    "end of": ({obj}: {obj: string}) => string;
    Baseline: string;
    Superscript: string;
    selected: ({obj}: {obj: string}) => string;
    "no answer": string;
    "nothing selected": string;
    "nothing to the right": string;
    "nothing to the left": string;
    "block is empty": string;
    "nothing above": string;
    labelValue: ({label, value}: {label: string; value: string}) => string;
    plus: string;
    minus: string;
    negative: string;
    times: string;
    divide: string;
    decimal: string;
    percent: string;
    cdot: string;
    equalsSign: string;
    notEqualsSign: string;
    greaterThanSign: string;
    lessThanSign: string;
    greaterThanOrEqualToSign: string;
    lessThanOrEqualSign: string;
    fractionExpressionInNumerator: string;
    fractionExcludingExpression: string;
    customExponent: string;
    square: string;
    cube: string;
    squareRoot: string;
    cubeRoot: string;
    radicalWithCustomRoot: string;
    leftParenthesis: string;
    rightParenthesis: string;
    naturalLog: string;
    logBase10: string;
    logCustomBase: string;
    sine: string;
    cosine: string;
    tangent: string;
    pi: string;
    theta: string;
    upArrow: string;
    rightArrow: string;
    downArrow: string;
    leftArrow: string;
    navOutOfParentheses: string;
    navOutOfExponent: string;
    navOutOfBase: string;
    navIntoNumerator: string;
    navOutOfNumeratorIntoDenominator: string;
    navOutOfDenominator: string;
    delete: string;
    dismiss: string;
};
