import * as React from "react";

import EditorJsonify from "../../mixins/editor-jsonify";

import type {WidgetEditorRefHandle} from "../types";

class DeprecatedStandinEditor
    extends React.Component
    implements WidgetEditorRefHandle
{
    serialize(): any {
        return EditorJsonify.serialize.call(this);
    }

    render(): React.ReactNode {
        return (
            <div>
                <p>This widget has been deprecated and removed</p>
                <p>
                    Learners will see a message and they will not be graded on
                    this part. Please replace this widget with a supported one.
                </p>
            </div>
        );
    }
}

export default DeprecatedStandinEditor;
