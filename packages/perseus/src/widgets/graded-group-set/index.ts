import gradedGroupSetLogic from "@khanacademy/perseus-core/widgets/graded-group-set";

import {defineWidgetRegistration} from "../../widget-registration";

import gradedGroupSetWidget from "./graded-group-set";

export const gradedGroupSetRegistration = defineWidgetRegistration({
    widget: gradedGroupSetWidget,
    logic: gradedGroupSetLogic,
});

export default gradedGroupSetWidget;
