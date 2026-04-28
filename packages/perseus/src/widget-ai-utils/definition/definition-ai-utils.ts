import type definition from "../../widgets/definition/definition";
import type React from "react";

/**
 * JSON describing a definition widget. Intended for consumption by AI tools.
 * The definition widget usually appears inline in a paragraph of text. It
 * renders a term and displays its definition in a popover when clicked.
 * Learners' interactions with this widget are not graded.
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
