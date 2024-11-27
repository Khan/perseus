import type definition from "../../widgets/definition/definition";
import type React from "react";

export type DefinitionPromptJSON = {
    type: "definition";
    definition: string;
    togglePrompt: string;
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof definition.widget>,
): DefinitionPromptJSON => {
    return {
        type: "definition",
        definition: renderProps.definition,
        togglePrompt: renderProps.togglePrompt,
    };
};
