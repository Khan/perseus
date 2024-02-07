import type Key from "../../data/keys";
import type MathQuill from "mathquill";

export type MathQuillInterface = MathQuill.v3.API;

export type MathFieldConfig = MathQuill.v3.Config;

/**
 * Editable math fields have all of the above methods in addition to
 * the ones listed here.
 * https://docs.mathquill.com/en/latest/Api_Methods/
 */
export type MathFieldInterface = MathQuill.v3.EditableMathQuill & {
    cursor: () => Cursor;
    controller: () => Controller;
};

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

/**
 * The MathQuill API (see mathuill.d.ts) does not include types
 * for cursor() and controller(), and adding these types there
 * in the MathQuill repo causes unexpected conflicts with other types.
 *
 * We don't want to use the cursor and controller default type `any`
 * so we declare the types here.
 *
 * Note: This is different from the MathFieldCursor defined above.
 */

interface MQNode {
    id: number;
    parent: NodeBase;
}

interface MQSelection {
    id: number;
    getEnd(dir: number): number;
}

interface NodeBase extends MQNode {
    ctrlSeq: string | undefined;
    blocks: MQNode;
}

interface Cursor {
    parent: MQNode;
    selection: MQSelection | undefined;

    show(): Cursor;
    hide(): Cursor;
    insAtRightEnd(root: ControllerRoot): Cursor;
    insRightOf(el: MQNode): Cursor;
    insLeftOf(el: MQNode): Cursor;
    startSelection(): void;
}

interface Controller {
    parent: string;
    root: ControllerRoot;
    cursor: Cursor;

    backspace(): Controller;
    seek(targetElm: HTMLElement, clientX: number, _clientY: number): Controller;
}

interface ControllerRoot {
    controller: Controller;
    cursor?: Cursor;
}
