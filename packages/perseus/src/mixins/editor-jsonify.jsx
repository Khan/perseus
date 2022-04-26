// @flow
import _ from "underscore";

import WIDGET_PROP_BLACKLIST from "./widget-prop-blacklist.js";

const EditorJsonify = {
    serialize: function (): $FlowFixMe {
        // Omit props that get passed to all widgets
        return _.omit(this.props, WIDGET_PROP_BLACKLIST);
    },
};

export default EditorJsonify;
