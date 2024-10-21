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
    cursor: () => MathQuill.Cursor;
    controller: () => MathQuill.Controller;
};

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
 */
declare module "mathquill" {
    interface MQNode extends ControllerRoot {
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
        latex(): string;
    }

    interface Cursor {
        parent: MQNode;
        selection: MQSelection | undefined;
        select(): void;
        endSelection(): void;
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
        seek(
            targetElm: HTMLElement,
            clientX: number,
            _clientY: number,
        ): Controller;
    }

    interface ControllerRoot {
        controller: Controller;
        cursor?: Cursor;
    }
}

export type MathQuillAriaStatisStringsMap = MathQuill.v3.AriaStaticStringsMap;
