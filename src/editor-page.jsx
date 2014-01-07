/** @jsx React.DOM */

require("./core.js");
require("./item-editor.jsx");
require("./item-renderer.jsx");
require("./hint-editor.jsx");

var ItemEditor = Perseus.ItemEditor;
var ItemRenderer = Perseus.ItemRenderer;
var CombinedHintsEditor = Perseus.CombinedHintsEditor;

Perseus.EditorPage = React.createClass({

    render: function() {

        return <div id="perseus" className="framework-perseus">
            <ItemEditor
                    ref="itemEditor"
                    question={this.props.question}
                    answerArea={this.props.answerArea}
                    onChange={this.handleChange} />

            <CombinedHintsEditor
                    ref="hintsEditor"
                    hints={this.props.hints}
                    onChange={this.handleChange} />
        </div>;

    },

    componentDidMount: function() {
        this.rendererMountNode = document.createElement("div");
        this.updateRenderer();
    },

    updateRenderer: function(cb) {
        var rendererConfig = _({
            item: this.toJSON(true),
            initialHintsVisible: 0  /* none; to be displayed below */
        }).extend(
            _(this.props).pick("workAreaSelector",
                               "solutionAreaSelector",
                               "hintsAreaSelector")
        );

        this.renderer = React.renderComponent(
            Perseus.ItemRenderer(rendererConfig),
            this.rendererMountNode,
            cb);
    },

    handleChange: function(toChange, cb) {
        var newProps = _(this.props).pick("question", "hints", "answerArea");
        _(newProps).extend(toChange);
        this.props.onChange(newProps, function() {
            this.updateRenderer(cb);
        }.bind(this));
    },

    scorePreview: function() {
        if (this.renderer) {
            return this.renderer.scoreInput();
        } else {
            return null;
        }
    },

    toJSON: function(skipValidation) {
        return _.extend(this.refs.itemEditor.toJSON(skipValidation), {
            hints: this.refs.hintsEditor.toJSON()
        });
    }

});

/* Renders an EditorPage as a non-controlled component.
 *
 * Normally the parent of EditorPage must pass it an onChange callback and then
 * respond to any changes by modifying the EditorPage props to reflect those
 * changes. With StatefulEditorPage changes are stored in state so you can
 * query them with toJSON.
 */
Perseus.StatefulEditorPage = React.createClass({
    render: function() {
        return Perseus.EditorPage(this.state);
    },
    getInitialState: function() {
        return _({}).extend(this.props, {
            onChange: this.handleChange,
            ref: "editor"
        });
    },
    // getInitialState isn't called if the react component is re-rendered
    // in-place on the dom, in which case this is called instead, so we
    // need to update the state here.
    // (This component is currently re-rendered by the "Add image" button.)
    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    },
    toJSON: function() {
        return this.refs.editor.toJSON();
    },
    handleChange: function(newState, cb) {
        this.setState(newState, cb);
    },
    scorePreview: function() {
        return this.refs.editor.scorePreview();
    }
});


