import NumericInputEditor from "./numeric-input-editor";

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding an input number widget that allows users to enter numerical values.
 */
class InputNumberEditor extends NumericInputEditor {
    static widgetName = "input-number" as const;
}

export default InputNumberEditor;
