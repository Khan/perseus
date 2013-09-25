/** @jsx React.DOM */
(function(Perseus) {

var ItemEditor = Perseus.ItemEditor;
var ItemRenderer = Perseus.ItemRenderer;

Perseus.EditorPage = React.createClass({
    
    render: function() {

        var itemEditor = <ItemEditor question={this.props.question}
                answerArea={this.props.answerArea}
                hints={this.props.hints}
                onChange={this.updatePreview}
                ref="itemEditor" />;

        return <div id="perseus" class="framework-perseus">

            {itemEditor}

            <div className="perseus-editor-preview-panel">
                <div id="problemarea">
                    <div id="workarea"></div>
                    <div id="hintsarea"></div>
                </div>
                <div id="answer_area_wrap">
                    <span id="examples-show" style={{display: "none"}}>
                        Acceptable formats
                    </span>
                    <div id="solutionarea"></div>
                    <a href="#" className="simple-button disabled green">
                        Check Answer
                    </a>
                </div>
            </div>

            <div class="clear"></div>
        </div>;

    },
    
    componentWillMount: function() {
        this.rendererMountNode = document.createElement("div");
    },
    
    updatePreview: function() {
        this.renderer = React.renderComponent(Perseus.ItemRenderer({
            item: this.toJSON(true),
            initialHintsVisible: -1  /* all */
        }), this.rendererMountNode);
    },
    
    scorePreview: function() {
        if (this.renderer) {
            return this.renderer.scoreInput();
        } else {
            return null;
        }
    },

    toJSON: function(skipValidation) {
        return this.refs.itemEditor.toJSON(skipValidation);
    }

});


})(Perseus);
