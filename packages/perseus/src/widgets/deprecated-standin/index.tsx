import deprecatedStandinLogic from "@khanacademy/perseus-core/widgets/deprecated-standin";

import {defineWidgetRegistration} from "../../widget-registration";

import deprecatedStandinWidget from "./deprecated-standin";

export const deprecatedStandinRegistration = defineWidgetRegistration({
    widget: deprecatedStandinWidget,
    logic: deprecatedStandinLogic,
});

export default deprecatedStandinWidget;
