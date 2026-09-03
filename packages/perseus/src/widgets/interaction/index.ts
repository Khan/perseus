import interactionLogic from "@khanacademy/perseus-core/widgets/interaction";

import {defineWidgetRegistration} from "../../widget-registration";

import interactionWidget from "./interaction";

export const interactionRegistration = defineWidgetRegistration({
    widget: interactionWidget,
    logic: interactionLogic,
});

export default interactionWidget;
