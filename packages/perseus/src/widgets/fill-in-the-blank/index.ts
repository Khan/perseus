import fillInTheBlankLogic from "@khanacademy/perseus-core/widgets/fill-in-the-blank";

import {defineWidgetRegistration} from "../../widget-registration";

import fillInTheBlankWidget from "./fill-in-the-blank";

export const fillInTheBlankRegistration = defineWidgetRegistration({
    widget: fillInTheBlankWidget,
    logic: fillInTheBlankLogic,
});

export default fillInTheBlankWidget;
