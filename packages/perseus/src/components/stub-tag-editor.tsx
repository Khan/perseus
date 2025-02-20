import PropTypes from "prop-types";
import * as React from "react";

import TextListEditor from "./text-list-editor";

const EMPTY_ARRAY = [];

/**
 * Stub Tag Editor.
 *
 * This is stupidly used by Perseus Zero because I didn't implement
 * the <TagEditor> for Perseus Zero (since everyone wants me to
 * delete it anyways).
 *
 * This is a small wrapper for a TextListEditor that allows us to
 * edit raw Tag ID strings in perseus zero (please don't use this).
 *
 * It also gives a nicer interface for the group metadata editor
 * in local demo mode.
 */
class StubTagEditor extends React.Component<any> {
    static propTypes = {
        value: PropTypes.arrayOf(PropTypes.string),
        onChange: PropTypes.func.isRequired,
        showTitle: PropTypes.bool.isRequired,
    };

    static defaultProps: any = {
        value: EMPTY_ARRAY,
        showTitle: true,
    };

    render(): React.ReactNode {
        return (
            <div>
                {this.props.showTitle && (
                    <div style={{fontSize: 14}}>Tags:</div>
                )}
                {/* this is silly, but we have to `|| []` here because
                we sometimes have the metadata set to null
                (legacy saves, I think), which doesn't get defaulted
                through defaultProps */}
                <TextListEditor
                    options={this.props.value || EMPTY_ARRAY}
                    layout="vertical"
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export default StubTagEditor;
