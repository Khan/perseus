// @flow

import {removeDenylistProps} from "./widget-prop-denylist.js";

const EditorJsonify = {
    serialize: function (): $FlowFixMe {
        // Omit props that get passed to all widgets
        return removeDenylistProps(this.props);
    },
};

export default EditorJsonify;
