/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {groupLogic} from "@khanacademy/perseus-core";
import * as React from "react";
import invariant from "tiny-invariant";

import Editor from "../editor";

import type {
    GroupDefaultWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

type Props = {
    content?: string;
    widgets?: Record<string, any>;
    images?: Record<string, any>;
    apiOptions?: any;
    onChange: (...args: ReadonlyArray<any>) => any;
};

class GroupEditor extends React.Component<Props> {
    static widgetName = "group" as const;

    static defaultProps: GroupDefaultWidgetOptions =
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
                    immutableWidgets={false}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export default GroupEditor;
