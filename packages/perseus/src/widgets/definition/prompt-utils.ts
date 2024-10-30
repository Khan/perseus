import {WidgetType} from "../../prompt-types";

import type definition from "./definition";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof definition.widget>;

export type DefinitionPromptJSON = {
    type: WidgetType;
    definition: WidgetProps["definition"];
    togglePrompt: WidgetProps["togglePrompt"];
};

export const getPromptJSON = (
    renderProps: WidgetProps,
): DefinitionPromptJSON => {
    return {
        type: WidgetType.DEFINITION,
        definition: renderProps.definition || "",
        togglePrompt: renderProps.togglePrompt || "",
    };
};
