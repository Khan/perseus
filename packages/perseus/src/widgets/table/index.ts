import tableLogic from "@khanacademy/perseus-core/widgets/table";

import {defineWidgetRegistration} from "../../widget-registration";

import tableWidget from "./table";

export const tableRegistration = defineWidgetRegistration({
    widget: tableWidget,
    logic: tableLogic,
});

export default tableWidget;
