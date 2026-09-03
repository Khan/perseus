import matrixLogic from "@khanacademy/perseus-core/widgets/matrix";

import {defineWidgetRegistration} from "../../widget-registration";

import matrixWidget from "./matrix";

export const matrixRegistration = defineWidgetRegistration({
    widget: matrixWidget,
    logic: matrixLogic,
});

export default matrixWidget;
