import gradedGroupLogic from "@khanacademy/perseus-core/widgets/graded-group";

import {defineWidgetRegistration} from "../../widget-registration";

import gradedGroupWidget from "./graded-group";

export const gradedGroupRegistration = defineWidgetRegistration({
    widget: gradedGroupWidget,
    logic: gradedGroupLogic,
});

export default gradedGroupWidget;
