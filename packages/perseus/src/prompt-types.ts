import type {CategorizerPromptJSON} from "./widget-ai-utils/categorizer/prompt-utils";
import type {DefinitionPromptJSON} from "./widget-ai-utils/definition/prompt-utils";
import type {DropdownPromptJSON} from "./widget-ai-utils/dropdown/prompt-utils";
import type {ExplanationPromptJSON} from "./widget-ai-utils/explanation/prompt-utils";
import type {ExpressionPromptJSON} from "./widget-ai-utils/expression/prompt-utils";
import type {GrapherPromptJSON} from "./widget-ai-utils/grapher/prompt-utils";
import type {ImagePromptJSON} from "./widget-ai-utils/image/prompt-utils";
import type {InputNumberPromptJSON} from "./widget-ai-utils/input-number/prompt-utils";
import type {LabelImagePromptJSON} from "./widget-ai-utils/label-image/prompt-utils";
import type {MatcherPromptJSON} from "./widget-ai-utils/matcher/prompt-utils";
import type {NumberLinePromptJSON} from "./widget-ai-utils/number-line/prompt-utils";
import type {NumericInputPromptJSON} from "./widget-ai-utils/numeric-input/prompt-utils";
import type {OrdererPromptJSON} from "./widget-ai-utils/orderer/prompt-utils";
import type {PassagePromptJSON} from "./widget-ai-utils/passage/prompt-utils";
import type {PassageRefPromptJSON} from "./widget-ai-utils/passage-ref/prompt-utils";
import type {RadioPromptJSON} from "./widget-ai-utils/radio/prompt-utils";
import type {SorterPromptJSON} from "./widget-ai-utils/sorter/prompt-utils";
import type {UnsupportedWidgetPromptJSON} from "./widget-ai-utils/unsupported-widget";

export type WidgetType =
    | "categorizer"
    | "definition"
    | "dropdown"
    | "dropdown"
    | "explanation"
    | "expression"
    | "grapher"
    | "image"
    | "input-number"
    | "label-image"
    | "matcher"
    | "measurer"
    | "number-line"
    | "numeric-input"
    | "orderer"
    | "passage-ref"
    | "passage"
    | "phet-simulation"
    | "plotter"
    | "python-program"
    | "radio"
    | "radio"
    | "sorter"
    | "video";

export type UnsupportedWidget =
    | "cs-program"
    | "iframe"
    | "interaction"
    | "video";

export type WidgetPromptJSON =
    | CategorizerPromptJSON
    | DefinitionPromptJSON
    | ExplanationPromptJSON
    | ExpressionPromptJSON
    | DropdownPromptJSON
    | GrapherPromptJSON
    | RadioPromptJSON
    | ImagePromptJSON
    | InputNumberPromptJSON
    | LabelImagePromptJSON
    | MatcherPromptJSON
    | NumberLinePromptJSON
    | NumericInputPromptJSON
    | OrdererPromptJSON
    | PassagePromptJSON
    | PassageRefPromptJSON
    | RadioPromptJSON
    | SorterPromptJSON
    | UnsupportedWidgetPromptJSON;

export type RendererPromptJSON = {
    content: string;
    widgets: {
        [widgetId: string]: WidgetPromptJSON;
    };
};

export interface GetPromptJSONInterface {
    getPromptJSON(): RendererPromptJSON;
}
