import type {PerseusExplanationWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type ExplanationDefaultWidgetOptions = Pick<
    PerseusExplanationWidgetOptions,
    "showPrompt" | "hidePrompt" | "explanation" | "widgets"
>;

const defaultWidgetOptions: ExplanationDefaultWidgetOptions = {
    showPrompt: "Explain",
    hidePrompt: "Hide explanation",
    explanation: "explanation goes here\n\nmore explanation",
    widgets: {},
};

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    // The explanation field contains markdown content that can have nested widgets
    // We need to traverse it to visit any nested widgets
    return {
        ...props,
        explanation: traverseRenderer({
            content: props.explanation,
            widgets: props.widgets,
            images: props.images || {},
        }).content,
    };
};

const explanationWidgetLogic: WidgetLogic = {
    name: "explanation",
    defaultWidgetOptions,
    defaultAlignment: "inline",
    accessible: true,
    traverseChildWidgets: traverseChildWidgets,
};

export default explanationWidgetLogic;
