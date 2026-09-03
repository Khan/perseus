import videoLogic from "@khanacademy/perseus-core/widgets/video";

import {defineWidgetRegistration} from "../../widget-registration";

import videoWidget from "./video";

export const videoRegistration = defineWidgetRegistration({
    widget: videoWidget,
    logic: videoLogic,
});

export default videoWidget;
