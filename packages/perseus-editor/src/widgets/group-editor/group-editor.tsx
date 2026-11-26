import * as React from "react";

import Editor from "../../editor";

import type {WidgetEditorProps} from "../widget-editor-props";
import type {PerseusGroupWidgetOptions} from "@khanacademy/perseus-core";

type Props = WidgetEditorProps<PerseusGroupWidgetOptions>;

class GroupEditor extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div className="perseus-group-editor">
                <Editor
                    content={this.props.content}
                    widgets={this.props.widgets}
                    apiOptions={this.props.apiOptions}
                    images={this.props.images}
                    widgetEnabled={true}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export default GroupEditor;
