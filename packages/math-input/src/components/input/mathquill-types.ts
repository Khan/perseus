import type Key from "../../data/keys";
import type MathQuill from "mathquill";

export type MathQuillInterface = MathQuill.v3.API;

export type MathFieldConfig = MathQuill.v3.Config;

/**
 * Editable math fields have all of the above methods in addition to
 * the ones listed here.
 * https://docs.mathquill.com/en/latest/Api_Methods/
 */
export type MathFieldInterface = MathQuill.v3.EditableMathQuill;

export enum MathFieldActionType {
    WRITE = "write",
    CMD = "cmd",
    KEYSTROKE = "keystroke",
    MQ_END = 0,
}

/**
 * The MathQuill MathField Cursor
 * it's not part of the public API for MathQuill,
 * we reach into the internals to get it
 */
export type MathFieldCursor = any;

export type MathFieldUpdaterCallback = (
    mathField: MathFieldInterface,
    key: Key,
) => void;
