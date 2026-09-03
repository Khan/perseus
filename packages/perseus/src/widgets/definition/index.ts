import definitionLogic from "@khanacademy/perseus-core/widgets/definition";

import {defineWidgetRegistration} from "../../widget-registration";

import definitionWidget from "./definition";

export const definitionRegistration = defineWidgetRegistration({
    widget: definitionWidget,
    logic: definitionLogic,
});

export default definitionWidget;
