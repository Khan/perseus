import explanationLogic from "@khanacademy/perseus-core/widgets/explanation";

import {defineWidgetRegistration} from "../../widget-registration";

import explanationWidget from "./explanation";

export const explanationRegistration = defineWidgetRegistration({
    widget: explanationWidget,
    logic: explanationLogic,
});

export default explanationWidget;
