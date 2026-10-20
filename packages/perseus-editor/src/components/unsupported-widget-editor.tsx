import * as React from "react";

import EditorJsonify from "../mixins/editor-jsonify";

/**
 * Shown in place of a widget editor when no editor is registered for the
 * widget's type.
 *
 * It serializes the widget's options unchanged, so saving keeps the content
 * as it was.
 */
class UnsupportedWidgetEditor extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
                <p>Perseus doesn't support this widget type.</p>
                <p>
                    Learners will see a message and they will not be graded on
                    this part. Please replace this widget with a supported one.
                </p>
            </div>
        );
    }
}

export default UnsupportedWidgetEditor;
