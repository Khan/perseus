import _ from "underscore";

import {excludeDenylistKeys} from "./widget-prop-denylist";

const EditorJsonify = {
    serialize: function (): any {
        // Omit props that get passed to all widgets
        // @ts-expect-error - TS2339 - Property 'props' does not exist on type '{ readonly serialize: () => any; }'.
        return excludeDenylistKeys(this.props);
    },
} as const;

export default EditorJsonify;
