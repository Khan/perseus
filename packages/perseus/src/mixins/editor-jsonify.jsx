// @flow
import _ from "underscore";

import WIDGET_PROP_DENYLIST from "./widget-prop-denylist.js";

const EditorJsonify = {
    serialize: function (): $FlowFixMe {
        // Omit props that get passed to all widgets
        return _.omit(this.props, WIDGET_PROP_DENYLIST);
    },
};

export default EditorJsonify;
