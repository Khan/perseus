import {WidgetType} from "../../prompt-types";

import type {Definition} from "./definition";
import type {PerseusDefinitionWidgetOptions} from "../../perseus-types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

export type DefinitionPromptJSON = {
    type: WidgetType;
    definition: PerseusDefinitionWidgetOptions["definition"];
    togglePrompt: PerseusDefinitionWidgetOptions["togglePrompt"];
};

export const getPromptJSON = (
    renderProps: PropsFor<typeof Definition>,
): DefinitionPromptJSON => {
    return {
        type: WidgetType.DEFINITION,
        definition: renderProps.definition || "",
        togglePrompt: renderProps.togglePrompt || "",
    };
};
