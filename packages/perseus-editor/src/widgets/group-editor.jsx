/* eslint-disable react/forbid-prop-types, react/sort-comp */
// @flow
import {ApiOptions, Changeable} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor.jsx";

type Props = $FlowFixMe;

class GroupEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        content: PropTypes.string,
        widgets: PropTypes.object,
        images: PropTypes.object,
        metadata: PropTypes.any,
        apiOptions: ApiOptions.propTypes,
    };

    static widgetName: "group" = "group";

    static defaultProps: Props = {
        content: "",
        widgets: {},
        images: {},
        // `undefined` instead of `null` so that getDefaultProps works for
        // `the GroupMetadataEditor`
        metadata: undefined,
    };

    render(): React.Node {
        return (
            <div className="perseus-group-editor">
                <div>
                    {/* the metadata editor; used for tags on
                    khanacademy.org */}
                    {this._renderMetadataEditor()}
                </div>
                <Editor
                    // eslint-disable-next-line react/no-string-refs
                    ref="editor"
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

    _renderMetadataEditor: () => React.Node = () => {
        const GroupMetadataEditor = this.props.apiOptions.GroupMetadataEditor;
        return (
            <GroupMetadataEditor
                value={this.props.metadata}
                onChange={this.change("metadata")}
            />
        );
    };

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    getSaveWarnings: () => $ReadOnlyArray<$FlowFixMe> = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.editor.getSaveWarnings();
    };

    serialize: () => $FlowFixMe = () => {
        // eslint-disable-next-line react/no-string-refs
        return _.extend({}, this.refs.editor.serialize(), {
            metadata: this.props.metadata,
        });
    };
}

export default GroupEditor;
