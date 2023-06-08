import MathWrapper from "../math-wrapper";
import {mathQuillInstance} from "../mathquill-instance";

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
        this.mathField.moveToDirEnd(mathQuillInstance.L);
    }

    isSelected() {
        const selection = this.getSelection();

        if (selection) {
            return selection.ends[-1][-1] === 0 && selection.ends[1][1] === 0;
        }

        return false;
    }
}
