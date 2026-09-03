import groupLogic from "@khanacademy/perseus-core/widgets/group";

import {defineWidgetRegistration} from "../../widget-registration";

import groupWidget from "./group";

export const groupRegistration = defineWidgetRegistration({
    widget: groupWidget,
    logic: groupLogic,
});

export default groupWidget;
