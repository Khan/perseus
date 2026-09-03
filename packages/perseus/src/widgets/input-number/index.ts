import inputNumberLogic from "@khanacademy/perseus-core/widgets/input-number";

import {defineWidgetRegistration} from "../../widget-registration";

import inputNumberWidget from "./input-number";

export const inputNumberRegistration = defineWidgetRegistration({
    widget: inputNumberWidget,
    logic: inputNumberLogic,
});

export default inputNumberWidget;
