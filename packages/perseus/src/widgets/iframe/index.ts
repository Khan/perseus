import iframeLogic from "@khanacademy/perseus-core/widgets/iframe";

import {defineWidgetRegistration} from "../../widget-registration";

import iframeWidget from "./iframe";

export const iframeRegistration = defineWidgetRegistration({
    widget: iframeWidget,
    logic: iframeLogic,
});

export default iframeWidget;
