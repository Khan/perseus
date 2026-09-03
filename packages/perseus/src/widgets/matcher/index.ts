import matcherLogic from "@khanacademy/perseus-core/widgets/matcher";

import {defineWidgetRegistration} from "../../widget-registration";

import matcherWidget from "./matcher";

export const matcherRegistration = defineWidgetRegistration({
    widget: matcherWidget,
    logic: matcherLogic,
});

export default matcherWidget;
