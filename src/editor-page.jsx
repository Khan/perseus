/** @jsx React.DOM */
(function(Perseus) {

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
                    hints={this.props.hints} />
        </div>;

    },

    componentWillMount: function() {
        this.rendererMountNode = document.createElement("div");
    },

    handleChange: function() {
        var obj = this.toJSON(true);
        if (this.props.onChange) {
            this.props.onChange(obj);
        }

        var rendererConfig = _({
            item: obj,
            initialHintsVisible: 0  /* none; to be displayed below */
        }).extend(
            _(this.props).pick("workAreaSelector",
                               "solutionAreaSelector",
                               "hintsAreaSelector")
        );

        this.renderer = React.renderComponent(
            Perseus.ItemRenderer(rendererConfig),
            this.rendererMountNode);
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


})(Perseus);
