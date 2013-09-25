/** @jsx React.DOM */
(function(Perseus) {

var Editor = Perseus.Editor;

var HintRenderer = Perseus.HintRenderer = React.createClass({
    render: function() {
        var shouldBold = this.props.bold;
        var hint = this.props.hint;
        return <div className={shouldBold ? "last-hint" : ""}>
            {Perseus.Renderer(hint)}
        </div>;
    }
});

var HintEditor = Perseus.HintEditor = React.createClass({
    getDefaultProps: function() {
        return {
            content: ""
        };
    },

    render: function() {
        return <div className="perseus-hint-editor">
            <Editor ref="editor" content={this.props.content}
                    onChange={this.props.onChange} widgetEnabled={false} />

            <div className="hint-controls-container clearfix">
                <span class="reorder-hints">
                    <a href="#"
                        class={this.props.isLast && "hidden"}
                        onClick={function() {
                            this.props.onMove(1);
                            return false;
                        }.bind(this)}>
                        <span className="icon-circle-arrow-down" />
                    </a>
                    {' '}
                    <a href="#"
                        class={this.props.isFirst && "hidden"}
                        onClick={function() {
                            this.props.onMove(-1);
                            return false;
                        }.bind(this)}>
                        <span className="icon-circle-arrow-up" />
                    </a>
                </span>
                <a href="#" className="remove-hint simple-button orange"
                        onClick={function() {
                            this.props.onRemove();
                            return false;
                        }.bind(this)}>
                    <span className="icon-trash" /> Remove this hint
                </a>
            </div>
        </div>;
    },

    focus: function() {
        this.refs.editor.focus();
    },

    toJSON: function(skipValidation) {
        return this.refs.editor.toJSON(skipValidation);
    }
});

})(Perseus);
