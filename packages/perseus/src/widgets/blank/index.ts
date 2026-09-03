import blankLogic from "@khanacademy/perseus-core/widgets/blank";

import {defineWidgetRegistration} from "../../widget-registration";

import blankWidget from "./blank";

export const blankRegistration = defineWidgetRegistration({
    widget: blankWidget,
    logic: blankLogic,
});

export default blankWidget;
