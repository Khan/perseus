import categorizerLogic from "@khanacademy/perseus-core/widgets/categorizer";

import {defineWidgetRegistration} from "../../widget-registration";

import categorizerWidget from "./categorizer";

export const categorizerRegistration = defineWidgetRegistration({
    widget: categorizerWidget,
    logic: categorizerLogic,
});

export default categorizerWidget;
