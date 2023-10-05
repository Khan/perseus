import allWidgets from "./all-widgets";
import {itemDataVersion} from "./perseus-version";
import * as Widgets from "./widgets";

Widgets.registerWidgets(allWidgets);

const ItemVersion = Widgets.getVersionVector();
ItemVersion["::renderer::"] = itemDataVersion;

export default ItemVersion;
