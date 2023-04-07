import MathQuill from "mathquill";

import MathQuillWrapper from "../mathquill-wrapper";

const MQ = MathQuill.getInterface(2);

export default class TestMathQuillWrapper extends MathQuillWrapper {
    getContent() {
        return this.mathField.latex();
    }

    selectAll() {
        this.mathField.select();
    }

    clearSelection() {
        this.mathField.clearSelection();
    }

    moveToStart() {
        this.mathField.moveToDirEnd(MQ.L);
    }

    isSelected() {
        const selection = this.getSelection();

        if (selection) {
            return selection.ends[-1][-1] === 0 && selection.ends[1][1] === 0;
        }

        return false;
    }
}
