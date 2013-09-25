/** @jsx React.DOM */
(function(Perseus) {

var ItemEditor = Perseus.ItemEditor;
var ItemRenderer = Perseus.ItemRenderer;
var CombinedHintsEditor = Perseus.CombinedHintsEditor;

Perseus.EditorPage = React.createClass({
    
    render: function() {

        var itemEditor = <ItemEditor question={this.props.question}
                answerArea={this.props.answerArea}
                onChange={this.updatePreview}
                ref="itemEditor" />;

        return <div id="perseus" className="framework-perseus">
            <div className="perseus-editor-table">
                <div className="perseus-editor-row">

                    {itemEditor}

                    <div className={"perseus-editor-preview-panel " +
                                "perseus-editor-right-cell"}>
                        <div id="problemarea">
                            <div id="workarea"></div>
                            <div id="hintsarea" style={{display: "none"}} />
                        </div>
                        <div id="answer_area_wrap">
                            <span id="examples-show" style={{display: "none"}}>
                                Acceptable formats
                            </span>
                            <div id="solutionarea"></div>
                            <a
                                    href="#"
                                    className="simple-button disabled green">
                                Check Answer
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <CombinedHintsEditor
                    ref="hintsEditor"
                    hints={this.props.hints} />
        </div>;

    },
    
    componentWillMount: function() {
        this.rendererMountNode = document.createElement("div");
    },
    
    updatePreview: function() {
        this.renderer = React.renderComponent(Perseus.ItemRenderer({
            item: this.toJSON(true),
            initialHintsVisible: 0  /* none; to be displayed below */
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
        return _.extend(this.refs.itemEditor.toJSON(skipValidation), {
            hints: this.refs.hintsEditor.toJSON()
        });
    }

});


})(Perseus);
