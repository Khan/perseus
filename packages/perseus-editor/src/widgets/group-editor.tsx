/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/forbid-prop-types */
import {
    groupLogic,
    type GroupDefaultWidgetOptions,
    type PerseusWidgetsMap,
} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor";

type Props = {
    content: string;
    widgets: PerseusWidgetsMap;
    images: any;
    onChange: (options: any) => void;
};

class GroupEditor extends React.Component<Props> {
    static widgetName = "group" as const;

    static defaultProps: GroupDefaultWidgetOptions =
        groupLogic.defaultWidgetOptions;

    editor = React.createRef<React.ElementRef<typeof Editor>>();

    getSaveWarnings: () => ReadonlyArray<any> = () => {
        return this.editor.current?.getSaveWarnings();
    };

    serialize: () => any = () => {
        return _.extend({}, this.editor.current?.serialize());
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-group-editor">
                <Editor
                    ref={this.editor}
                    content={this.props.content}
                    widgets={this.props.widgets}
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
