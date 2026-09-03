import expressionLogic from "@khanacademy/perseus-core/widgets/expression";

import {defineWidgetRegistration} from "../../widget-registration";

import expressionWidget from "./expression";

export const expressionRegistration = defineWidgetRegistration({
    widget: expressionWidget,
    logic: expressionLogic,
});

export {Expression} from "./expression";
export default expressionWidget;
