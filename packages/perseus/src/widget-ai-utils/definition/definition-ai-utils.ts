import type definition from "../../widgets/definition/definition";
import type React from "react";

export type DefinitionPromptJSON = {
    type: "definition";
    definition: string;
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
