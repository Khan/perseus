import type {CategorizerPromptJSON} from "./widget-ai-utils/categorizer/categorizer-ai-utils";
import type {DefinitionPromptJSON} from "./widget-ai-utils/definition/definition-ai-utils";
import type {DropdownPromptJSON} from "./widget-ai-utils/dropdown/dropdown-ai-utils";
import type {ExplanationPromptJSON} from "./widget-ai-utils/explanation/explanation-ai-utils";
import type {ExpressionPromptJSON} from "./widget-ai-utils/expression/expression-ai-utils";
import type {GradedGroupPromptJSON} from "./widget-ai-utils/graded-group/graded-group-ai-utils";
import type {GradedGroupSetPromptJSON} from "./widget-ai-utils/graded-group-set/graded-group-set-ai-utils";
import type {GrapherPromptJSON} from "./widget-ai-utils/grapher/grapher-ai-utils";
import type {GroupPromptJSON} from "./widget-ai-utils/group/group-ai-utils";
import type {ImagePromptJSON} from "./widget-ai-utils/image/image-ai-utils";
import type {InputNumberPromptJSON} from "./widget-ai-utils/input-number/input-number-ai-utils";
import type {LabelImagePromptJSON} from "./widget-ai-utils/label-image/label-image-ai-utils";
import type {MatcherPromptJSON} from "./widget-ai-utils/matcher/prompt-utils";
import type {MatrixPromptJSON} from "./widget-ai-utils/matrix/prompt-utils";
import type {NumberLinePromptJSON} from "./widget-ai-utils/number-line/prompt-utils";
import type {NumericInputPromptJSON} from "./widget-ai-utils/numeric-input/prompt-utils";
import type {OrdererPromptJSON} from "./widget-ai-utils/orderer/prompt-utils";
import type {PassagePromptJSON} from "./widget-ai-utils/passage/prompt-utils";
import type {PassageRefPromptJSON} from "./widget-ai-utils/passage-ref/prompt-utils";
import type {RadioPromptJSON} from "./widget-ai-utils/radio/prompt-utils";
import type {SorterPromptJSON} from "./widget-ai-utils/sorter/prompt-utils";
import type {UnsupportedWidgetPromptJSON} from "./widget-ai-utils/unsupported-widget";

export type UnsupportedWidget =
    | "cs-program"
    | "iframe"
    | "interaction"
    | "interactive-graph-unsupported"
    | "measurer"
    | "phet-simulation"
    | "plotter"
    | "python-program"
    | "video";

export type WidgetPromptJSON =
    | CategorizerPromptJSON
    | DefinitionPromptJSON
    | DropdownPromptJSON
    | ExplanationPromptJSON
    | ExpressionPromptJSON
    | GradedGroupPromptJSON
    | GradedGroupSetPromptJSON
    | GrapherPromptJSON
    | GroupPromptJSON
    | ImagePromptJSON
    | InputNumberPromptJSON
    | LabelImagePromptJSON
    | MatcherPromptJSON
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
