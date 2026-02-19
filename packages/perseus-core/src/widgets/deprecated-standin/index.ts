import type {WidgetLogic} from "../logic-export.types";

function initializeWidgetOptions(): Record<string, never> {
    return {};
}

const deprecatedStandinWidgetLogic: WidgetLogic<Record<string, never>> = {
    name: "deprecated-standin",
    initializeWidgetOptions,
    accessible: true,
};

export default deprecatedStandinWidgetLogic;
