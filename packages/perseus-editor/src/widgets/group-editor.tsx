/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/forbid-prop-types, react/sort-comp */
import {ApiOptions, Changeable} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import invariant from "tiny-invariant";
import _ from "underscore";

import Editor from "../editor";

type Props = any;

class GroupEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        content: PropTypes.string,
        widgets: PropTypes.object,
        images: PropTypes.object,
        metadata: PropTypes.any,
        apiOptions: ApiOptions.propTypes,
    };

    static widgetName = "group" as const;

    static defaultProps: Props = {
        content: "",
        widgets: {},
        images: {},
        // `undefined` instead of `null` so that getDefaultProps works for
        // `the GroupMetadataEditor`
        metadata: undefined,
    };

    editor = React.createRef<Editor>();

    render(): React.ReactNode {
        return (
            <div className="perseus-group-editor">
                <div>
                    {/* the metadata editor; used for tags on
                    khanacademy.org */}
                    {this._renderMetadataEditor()}
                </div>
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

    _renderMetadataEditor: () => React.ReactElement = () => {
        const GroupMetadataEditor = this.props.apiOptions.GroupMetadataEditor;
        return (
            <GroupMetadataEditor
                value={this.props.metadata}
                // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                onChange={this.change("metadata")}
            />
        );
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    getSaveWarnings: () => ReadonlyArray<string> = () => {
        invariant(this.editor.current != null);
        return this.editor.current?.getSaveWarnings();
    };

    serialize: () => any = () => {
        return _.extend({}, this.editor.current?.serialize(), {
            metadata: this.props.metadata,
        });
    };
}

export default GroupEditor;
