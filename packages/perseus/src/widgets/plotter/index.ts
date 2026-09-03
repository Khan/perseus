import plotterLogic from "@khanacademy/perseus-core/widgets/plotter";

import {defineWidgetRegistration} from "../../widget-registration";

import plotterWidget from "./plotter";

export const plotterRegistration = defineWidgetRegistration({
    widget: plotterWidget,
    logic: plotterLogic,
});

export default plotterWidget;
