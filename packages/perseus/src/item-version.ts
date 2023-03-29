import allWidgets from "./all-widgets";
import version from "./version";
import * as Widgets from "./widgets";

Widgets.registerWidgets(allWidgets);

const ItemVersion = Widgets.getVersionVector();
ItemVersion["::renderer::"] = version.itemDataVersion;

export default ItemVersion;
