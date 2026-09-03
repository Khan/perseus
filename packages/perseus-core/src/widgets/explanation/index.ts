import type {PerseusExplanationWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusExplanationWidgetOptions = {
    showPrompt: "Explain",
    hidePrompt: "Hide explanation",
    explanation: "explanation goes here\n\nmore explanation",
    widgets: {},
};

const explanationWidgetLogic = {
    name: "explanation",
    defaultWidgetOptions,
    defaultAlignment: "inline",
    accessible: true,
} satisfies WidgetLogic<"explanation">;

export default explanationWidgetLogic;
