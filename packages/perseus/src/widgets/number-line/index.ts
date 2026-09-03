import numberLineLogic from "@khanacademy/perseus-core/widgets/number-line";

import {defineWidgetRegistration} from "../../widget-registration";

import numberLineWidget from "./number-line";

export const numberLineRegistration = defineWidgetRegistration({
    widget: numberLineWidget,
    logic: numberLineLogic,
});

export default numberLineWidget;
