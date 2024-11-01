import type {CategorizerPromptJSON} from "./widget-ai-utils/categorizer/prompt-utils";
import type {DefinitionPromptJSON} from "./widget-ai-utils/definition/prompt-utils";
import type {DropdownPromptJSON} from "./widget-ai-utils/dropdown/prompt-utils";
import type {ExplanationPromptJSON} from "./widget-ai-utils/explanation/prompt-utils";
import type {ExpressionPromptJSON} from "./widget-ai-utils/expression/prompt-utils";
import type {MatrixPromptJSON} from "./widget-ai-utils/matrix/prompt-utils";
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
    | "cs-program"
    | "definition"
    | "explanation"
    | "expression"
    | "dropdown"
    | "matrix"
    | "measurer"
    | "number-line"
    | "numeric-input"
    | "orderer"
    | "passage"
    | "passage-ref"
    | "phet-simulation"
    | "plotter"
    | "python-program"
    | "radio"
    | "sorter"
    | "video";

export type WidgetPromptJSON =
    | CategorizerPromptJSON
    | DefinitionPromptJSON
    | ExplanationPromptJSON
    | ExpressionPromptJSON
    | DropdownPromptJSON
    | MatrixPromptJSON
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
