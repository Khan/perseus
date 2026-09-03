import labelImageLogic from "@khanacademy/perseus-core/widgets/label-image";

import {defineWidgetRegistration} from "../../widget-registration";

import labelImageWidget from "./label-image";

export const labelImageRegistration = defineWidgetRegistration({
    widget: labelImageWidget,
    logic: labelImageLogic,
});

export default labelImageWidget;
