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
 * in local test.html mode.
 */

var TextListEditor = require("./text-list-editor.jsx");

var StubTagEditor = React.createClass({
    propTypes: {
        value: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            value: []
        };
    },

    render: function() {
        return <div>
            <div style={{fontSize: 14}}>Tags:</div>
            <TextListEditor
                options={this.props.value}
                layout="vertical"
                onChange={this.props.onChange} />
        </div>;
    }
});

module.exports = StubTagEditor;
