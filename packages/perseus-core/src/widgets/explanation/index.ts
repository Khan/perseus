import type {PerseusExplanationWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type ExplanationDefaultWidgetOptions = Pick<
    PerseusExplanationWidgetOptions,
    "showPrompt" | "hidePrompt" | "explanation" | "widgets"
>;

function initializeWidgetOptions(): ExplanationDefaultWidgetOptions {
    return {
        showPrompt: "Explain",
        hidePrompt: "Hide explanation",
        explanation: "explanation goes here\n\nmore explanation",
        widgets: {},
    };
}

const explanationWidgetLogic: WidgetLogic<ExplanationDefaultWidgetOptions> = {
    name: "explanation",
    initializeWidgetOptions,
    defaultAlignment: "inline",
    accessible: true,
};

export default explanationWidgetLogic;
