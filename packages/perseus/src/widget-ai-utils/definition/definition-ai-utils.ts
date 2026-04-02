import type definition from "../../widgets/definition/definition";
import type React from "react";

/**
 * The definition widget usually appears inline in a paragraph of text. It
 * renders a term and displays its definition in a popover when clicked.
 */
export type DefinitionPromptJSON = {
    type: "definition";
    /** The definition of the term. */
    definition: string;
    /** The term being defined. */
    togglePrompt: string;
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof definition.widget>,
): DefinitionPromptJSON => {
    return {
        type: "definition",
        definition: widgetData.definition,
        togglePrompt: widgetData.togglePrompt,
    };
};
