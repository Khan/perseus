// @flow
import allWidgets from "./all-widgets.js";
import version from "./version.js";
import * as Widgets from "./widgets.js";

Widgets.registerWidgets(allWidgets);

// $FlowFixMe[signature-verification-failure]
const ItemVersion = Widgets.getVersionVector();
ItemVersion["::renderer::"] = version.itemDataVersion;

export default ItemVersion;
