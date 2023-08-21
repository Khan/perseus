import _ from "underscore";

import WIDGET_PROP_DENYLIST from "./widget-prop-denylist";

const EditorJsonify = {
    serialize: function (): any {
        // Omit props that get passed to all widgets
        // @ts-expect-error - TS2339 - Property 'props' does not exist on type '{ readonly serialize: () => any; }'.
        return _.omit(this.props, WIDGET_PROP_DENYLIST);
    },
} as const;

export default EditorJsonify;
