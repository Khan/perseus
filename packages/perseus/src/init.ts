import allWidgetRegistrations from "./all-widget-registrations";
import * as Widgets from "./widgets";

/** Registers every production widget and its core logic. */
export const initPerseus = () => {
    Widgets.registerWidgets(allWidgetRegistrations);
    Widgets.replaceDeprecatedWidgets();
};

/** @deprecated Alias for initPerseus. */
export default initPerseus;
