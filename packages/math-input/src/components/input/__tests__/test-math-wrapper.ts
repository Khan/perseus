import MathWrapper from "../math-wrapper";

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
        this.mathField.moveToLeftEnd();
    }

    isSelected() {
        const selection = this.getSelection();

        if (selection) {
            return (
                selection.getEnd(-1)[-1] === 0 && selection.getEnd(1)[1] === 0
            );
        }

        return false;
    }
}
