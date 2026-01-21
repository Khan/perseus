import type {CategorizerPromptJSON} from "./categorizer/categorizer-ai-utils";
import type {DefinitionPromptJSON} from "./definition/definition-ai-utils";
import type {DropdownPromptJSON} from "./dropdown/dropdown-ai-utils";
import type {ExplanationPromptJSON} from "./explanation/explanation-ai-utils";
import type {ExpressionPromptJSON} from "./expression/expression-ai-utils";
import type {GradedGroupPromptJSON} from "./graded-group/graded-group-ai-utils";
import type {GradedGroupSetPromptJSON} from "./graded-group-set/graded-group-set-ai-utils";
import type {GrapherPromptJSON} from "./grapher/grapher-ai-utils";
import type {GroupPromptJSON} from "./group/group-ai-utils";
import type {ImagePromptJSON} from "./image/image-ai-utils";
import type {InputNumberPromptJSON} from "./input-number/input-number-ai-utils";
import type {LabelImagePromptJSON} from "./label-image/label-image-ai-utils";
import type {MatcherPromptJSON} from "./matcher/matcher-ai-utils";
import type {MatrixPromptJSON} from "./matrix/matrix-ai-utils";
import type {MockWidgetPromptJSON} from "./mock-widget/prompt-utils";
import type {NumberLinePromptJSON} from "./number-line/number-line-ai-utils";
import type {NumericInputPromptJSON} from "./numeric-input/prompt-utils";
import type {OrdererPromptJSON} from "./orderer/orderer-ai-utils";
import type {RadioPromptJSON} from "./radio/radio-ai-utils";
import type {SorterPromptJSON} from "./sorter/sorter-ai-utils";
import type {UnsupportedWidgetPromptJSON} from "./unsupported-widget";

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
    | MockWidgetPromptJSON
    | NumberLinePromptJSON
    | NumericInputPromptJSON
    | OrdererPromptJSON
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
