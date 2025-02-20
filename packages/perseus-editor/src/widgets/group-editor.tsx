/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/forbid-prop-types */
import {ApiOptions, Changeable} from "@khanacademy/perseus";
import {
    groupLogic,
    type GroupDefaultWidgetOptions,
} from "@khanacademy/perseus-core";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor";

type Props = any;

class GroupEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        content: PropTypes.string,
        widgets: PropTypes.object,
        images: PropTypes.object,
        apiOptions: ApiOptions.propTypes,
    };

    static widgetName = "group" as const;

    static defaultProps: GroupDefaultWidgetOptions =
        groupLogic.defaultWidgetOptions;

    editor = React.createRef<Editor>();

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

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
