import grapherLogic from "@khanacademy/perseus-core/widgets/grapher";

import {defineWidgetRegistration} from "../../widget-registration";

import grapherWidget from "./grapher";

export const grapherRegistration = defineWidgetRegistration({
    widget: grapherWidget,
    logic: grapherLogic,
});

export default grapherWidget;
