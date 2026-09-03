import imageLogic from "@khanacademy/perseus-core/widgets/image";

import {defineWidgetRegistration} from "../../widget-registration";

import imageWidget from "./image";

export const imageRegistration = defineWidgetRegistration({
    widget: imageWidget,
    logic: imageLogic,
});

export default imageWidget;
