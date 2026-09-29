import {groupLogic} from "@khanacademy/perseus-core";
import * as React from "react";
import invariant from "tiny-invariant";

import Editor from "../../editor";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {
    PerseusGroupWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

interface Props extends PerseusGroupWidgetOptions {
    onChange: (options: PerseusGroupWidgetOptions) => void;
    apiOptions: APIOptionsWithDefaults;
}

class GroupEditor extends React.Component<Props> {
    static defaultProps: PerseusGroupWidgetOptions =
        groupLogic.defaultWidgetOptions;

    editor = React.createRef<Editor>();

    getSaveWarnings: () => ReadonlyArray<any> = () => {
        return this.editor.current?.getSaveWarnings();
    };

    serialize(): PerseusRenderer {
        invariant(
            this.editor.current,
            "cannot serialize GroupEditor without Editor",
        );
        return {...this.editor.current.serialize()};
    }

    render(): React.ReactNode {
        return (
            <div className="perseus-group-editor">
                <Editor
                    ref={this.editor}
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
