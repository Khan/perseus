// @flow

import {removeDenylistProps} from "./widget-prop-blacklist.js";

const EditorJsonify = {
    serialize: function (): $FlowFixMe {
        // Omit props that get passed to all widgets
        return removeDenylistProps(this.props);
    },
};

export default EditorJsonify;
