import dropdownLogic from "@khanacademy/perseus-core/widgets/dropdown";

import {defineWidgetRegistration} from "../../widget-registration";

import dropdownWidget from "./dropdown";

export const dropdownRegistration = defineWidgetRegistration({
    widget: dropdownWidget,
    logic: dropdownLogic,
});

export default dropdownWidget;
