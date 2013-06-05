/** @jsx React.DOM */
(function(Perseus) {

// like [[snowman input-number 1]]
var rWidgetSplit = /(\[\[\u2603 [a-z-]+ [0-9]+\]\])/g;

var SingleEditor = Perseus.SingleEditor = React.createClass({
    defaultState: {
        content: "",
        widgets: {}
    },

    getInitialState: function() {
        var props = _.pick(this.props, _.keys(this.defaultState));
        return _.defaults(props, this.defaultState);
    },

    componentDidUpdate: function(prevProps, prevState, rootNode) {
        if (!_.isEqual(prevState, this.state) && this.props.onChange) {
            this.props.onChange();
        }
    },

    render: function() {
        var widgetEnabled = this.props.widgetEnabled != null ?
                this.props.widgetEnabled :
                true;

        var pieces;
        var widgets;
        var underlayPieces;
        var widgetEditors;

        if (widgetEnabled) {
            pieces = Perseus.Util.split(this.state.content, rWidgetSplit);
            widgets = {};
            underlayPieces = [];

            for (var i = 0; i < pieces.length; i++) {
                var type = i % 2;
                if (type === 0) {
                    // Normal text
                    underlayPieces.push(pieces[i]);
                } else {
                    // Widget reference
                    var match = Perseus.Util.rWidgetParts.exec(pieces[i]);
                    var id = match[1];
                    var type = match[2];
                    var num = match[3];

                    var selected = false;
                    // TODO(alpert):
                    // var selected = focused && selStart === selEnd &&
                    //         offset <= selStart &&
                    //         selStart < offset + text.length;
                    // if (selected) {
                    //     selectedWidget = id;
                    // }

                    var duplicate = id in widgets;
                    var cls = Perseus.Widgets._widgetTypes[type + "-editor"];

                    var classes = (duplicate || !cls ? "error " : "") +
                            (selected ? "selected " : "");
                    underlayPieces.push(
                            <b className={classes}>{pieces[i]}</b>);

                    if (cls) {
                        widgets[id] = <div>
                            <strong>{id}</strong>
                            {cls(_.extend({
                                ref: id,
                                onChange: this.props.onChange
                            }, (this.state.widgets[id] || {}).options))}
                        </div>
                    }
                }
            }

            _.each(_.keys(this.state.widgets), function(id) {
                if (!(id in widgets)) {
                    // It's strange if these preloaded options stick around
                    // since it's inconsistent with how things work if you
                    // don't have the serialize/deserialize step in the middle
                    // TODO(alpert): Save options in a consistent manner so
                    // that you can undo the deletion of a widget
                    delete this.state.widgets[id];
                }
            }, this);

            this.widgetIds = _.keys(widgets);
            widgetEditors = <div className="perseus-editor-widgets">
                <div>
                    <select onChange={this.addWidget}>
                        <option value="">Add a widget{"\u2026"}</option>
                        <option disabled>--</option>
                        <option value="input-number">
                                Text input (number)</option>
                        <option value="expression">
                                Expression input</option>
                        <option value="interactive-graph">
                                Interactive graph</option>
                    </select>
                </div>
                {widgets}
            </div>;
        } else {
            underlayPieces = [this.state.content];
        }

        // Without this, the underlay isn't the proper size when the text ends
        // with a newline.
        underlayPieces.push(<br />);

        return <div className={"perseus-single-editor " +
                (this.props.className || "")}>
            <div className="perseus-textarea-pair">
                <div className="perseus-textarea-underlay" ref="underlay">
                    {underlayPieces}
                </div>

                <textarea ref="textarea" onKeyUp={this.handleKeyUp}>
                    {this.state.content}
                </textarea>
            </div>
            {widgetEditors}
        </div>;
    },

    // TODO(alpert): Change to input
    handleKeyUp: React.autoBind(function() {
        var textarea = this.refs.textarea.getDOMNode();
        this.setState({content: textarea.value});
    }),

    addWidget: React.autoBind(function(e) {
        var widgetType = e.target.value;
        if (widgetType === "") {
            // TODO(alpert): Not sure if change will trigger here
            // but might as well be safe
            return;
        }
        e.target.value = "";

        var textarea = this.refs.textarea.getDOMNode();
        var oldVal = textarea.value;

        for (var i = 1; oldVal.indexOf("[[\u2603 " + widgetType + " " + i +
                "]]") > -1; i++) {
            ;
        }

        var id = widgetType + " " + i;
        // TODO(alpert): Add newlines before "big" widgets like graphs
        var newVal = oldVal + "[[\u2603 " + id + "]]";

        this.setState({content: newVal});
        var textarea = this.refs.textarea.getDOMNode()

        textarea.value = newVal;
        textarea.focus();
        textarea.selectionStart = newVal.length;
        textarea.selectionEnd = newVal.length;
    }),

    toJSON: function(skipValidation) {
        var widgets = {};

        _.each(this.widgetIds, function(id) {
            var typeAndNum = id.split(" ", 2);
            widgets[id] = {
                options: this.refs[id].toJSON(skipValidation),
                type: typeAndNum[0]
            };
        }, this);

        return {
            content: this.state.content,
            widgets: widgets
        };
    },

    focus: function() {
        this.refs.textarea.getDOMNode().focus();
    }
});

var HintEditor = React.createClass({
    render: function() {
        return <div className="perseus-hint-editor">
            <SingleEditor ref="editor" content={this.props.content}
                    onChange={this.props.onChange} widgetEnabled={false} />

            <div className="remove-hint-container">
                <a href="#" className="simple-button orange"
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

var AnswerAreaEditor = React.createClass({
    defaultState: {
        // TODO(alpert): Separate into validatey things
        type: "input-number",
        options: {}
    },

    mixins: [Perseus.Util.PropsToState],

    componentDidMount: function() {
        // TODO(alpert): How to do this at initialization instead of here?
        this.refs.answerType.getDOMNode().value = this.state.type;
    },

    render: function() {
        var cls;
        if (this.state.type === "multiple") {
            cls = SingleEditor;
        } else {
            cls = Perseus.Widgets._widgetTypes[this.state.type + "-editor"];
        }

        var editor = cls(_.extend({
            ref: "editor",
            onChange: this.props.onChange
        }, this.state.options));

        return <div className="perseus-answer-editor">
            <label>
                Answer type:
                <select ref="answerType"
                        onChange={function(e) {
                            this.setState({
                                type: e.target.value,
                                options: {}
                            });
                        }.bind(this)}>
                    <option value="radio">Multiple choice</option>
                    <option value="input-number">Text input (number)</option>
                    <option value="expression">Expression input</option>
                    <option value="multiple">Custom format</option>
                </select>
            </label>
            {editor}
        </div>;
    },

    toJSON: function(skipValidation) {
        return {
            type: this.state.type,
            options: this.refs.editor.toJSON(skipValidation)
        };
    }
});

var ItemEditor = Perseus.ItemEditor = React.createClass({
    defaultState: {
        question: {},
        answerArea: {},
        hints: []
    },

    mixins: [Perseus.Util.PropsToState],

    componentDidUpdate: function(prevProps, prevState, rootNode) {
        if (!_.isEqual(prevState, this.state)) {
            this.updatePreview();
        }
    },

    componentWillMount: function() {
        this.rendererMountNode = document.createElement("div");
    },

    componentDidMount: function() {
        this.updatePreview();
    },

    render: function() {
        return <div className="perseus-item-editor">
            {SingleEditor(_.extend({
                ref: "questionEditor",
                className: "perseus-question-editor",
                onChange: this.updatePreview
            }, this.state.question))}

            {AnswerAreaEditor(_.extend({
                ref: "answerAreaEditor",
                onChange: this.updatePreview
            }, this.state.answerArea))}

            {this.state.hints.map(function(hint, i) {
                return HintEditor(_.extend({
                    ref: "hintEditor" + i,
                    onChange: this.updatePreview,
                    onRemove: function() {
                        var newHints = this.toJSON(true).hints;
                        newHints.splice(i, 1);
                        this.setState({hints: newHints});
                    }.bind(this)
                }, hint));
            }, this)}

            <div className="add-hint-container">
                <a href="#" className="simple-button orange"
                        onClick={this.addHint}>
                    <span className="icon-plus" />
                </a>
            </div>
        </div>;
    },

    addHint: React.autoBind(function() {
        var newHints = this.toJSON(true).hints;
        newHints.push({});
        this.setState({hints: newHints});

        var i = newHints.length - 1;
        this.refs["hintEditor" + i].focus();
        return false;
    }),

    updatePreview: React.autoBind(function() {
        React.renderComponent(Perseus.ItemRenderer({
            item: this.toJSON(true),
            hintsVisible: -1  /* all */
        }), this.rendererMountNode);
    }),

    toJSON: function(skipValidation) {
        return {
            question: this.refs.questionEditor.toJSON(skipValidation),
            answerArea: this.refs.answerAreaEditor.toJSON(skipValidation),
            hints: this.state.hints.map(function(hint, i) {
                // TODO(alpert): eww.
                return this.refs["hintEditor" + i].toJSON(skipValidation)
            }, this)
        };
    },

    focus: function() {
        this.questionEditor.focus();
    }
});

})(Perseus);
