import type {CategorizerPromptJSON} from "./widget-ai-utils/categorizer/prompt-utils";
import type {DefinitionPromptJSON} from "./widget-ai-utils/definition/prompt-utils";
import type {DropdownPromptJSON} from "./widget-ai-utils/dropdown/prompt-utils";
import type {ExplanationPromptJSON} from "./widget-ai-utils/explanation/prompt-utils";
import type {ExpressionPromptJSON} from "./widget-ai-utils/expression/prompt-utils";
import type {GrapherPromptJSON} from "./widget-ai-utils/grapher/prompt-utils";
import type {IFramePromptJSON} from "./widget-ai-utils/iframe/prompt-utils";
import type {ImagePromptJSON} from "./widget-ai-utils/image/prompt-utils";
import type {InputNumberPromptJSON} from "./widget-ai-utils/input-number/prompt-utils";
import type {LabelImagePromptJSON} from "./widget-ai-utils/label-image/prompt-utils";
import type {MatcherPromptJSON} from "./widget-ai-utils/matcher/prompt-utils";
import type {NumericInputPromptJSON} from "./widget-ai-utils/numeric-input/prompt-utils";
import type {RadioPromptJSON} from "./widget-ai-utils/radio/prompt-utils";

export type WidgetType =
    | "categorizer"
    | "definition"
    | "dropdown"
    | "explanation"
    | "expression"
    | "grapher"
    | "iframe"
    | "image"
    | "input-number"
    | "label-image"
    | "matcher"
    | "radio"
    | "numeric-input";

export type UnsupportedWidget = "cs-program" | "interaction";

export type WidgetPromptJSON =
    | CategorizerPromptJSON
    | DefinitionPromptJSON
    | ExplanationPromptJSON
    | ExpressionPromptJSON
    | DropdownPromptJSON
    | GrapherPromptJSON
    | RadioPromptJSON
    | IFramePromptJSON
    | ImagePromptJSON
    | InputNumberPromptJSON
    | LabelImagePromptJSON
    | MatcherPromptJSON
    | NumericInputPromptJSON;

export type RendererPromptJSON = {
    content: string;
    widgets: {
        [widgetId: string]: WidgetPromptJSON;
    };
};

export interface GetPromptJSONInterface {
    getPromptJSON(): RendererPromptJSON;
}
