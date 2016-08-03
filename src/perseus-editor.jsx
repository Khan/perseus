const {Editor, EditorState} = require('draft-js');

const PerseusEditor = React.createClass({

    propTypes: {
        onChange: React.PropTypes.func,
    },

    getInitialState() {
        return {
            editorState: EditorState.createEmpty(),
        };
    },

    handleChange(editorState) {
        const currContent = editorState.getCurrentContent();
        if (currContent !== this.pastContentState) {
            this.props.onChange({content: currContent.getPlainText('\n')});
        }
        this.pastContentState = currContent;
        this.setState({editorState});
    },

    render() {
        return <div>
            <Editor
                editorState={this.state.editorState}
                onChange={this.handleChange}
                spellCheck={true}
                stripPastedStyles={true}
                placeholder="You can learn anything"
            />
        </div>;
    },
});

module.exports = PerseusEditor;
