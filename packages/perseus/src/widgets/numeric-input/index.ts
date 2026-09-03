import numericInputLogic from "@khanacademy/perseus-core/widgets/numeric-input";

import {defineWidgetRegistration} from "../../widget-registration";

import numericInputWidget from "./numeric-input";

export const numericInputRegistration = defineWidgetRegistration({
    widget: numericInputWidget,
    logic: numericInputLogic,
});

export default numericInputWidget;
