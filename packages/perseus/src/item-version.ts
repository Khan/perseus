import allWidgets from "./all-widgets";
import * as Widgets from "./widgets";

Widgets.registerWidgets(allWidgets);

const ItemVersion = Widgets.getVersionVector();

export default ItemVersion;
