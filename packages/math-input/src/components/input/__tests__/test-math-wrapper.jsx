import MathQuill from "mathquill";

import MathWrapper from "../math-wrapper.js";

const MQ = MathQuill.getInterface(2);

export default class TestMathWrapper extends MathWrapper {
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
