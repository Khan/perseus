/** @jsx React.DOM */
(function(Perseus) {

// like [[snowman input-number 1]]
var rWidgetSplit = /(\[\[\u2603 [a-z-]+ [0-9]+\]\])/g;

var Editor = Perseus.Editor = React.createClass({
    getDefaultProps: function() {
        return {
            content: "",
            widgets: {}
        };
    },

    componentDidUpdate: function(prevProps, prevState, rootNode) {
        // TODO(alpert): Maybe fix React so this isn't necessary
        var textarea = this.refs.textarea.getDOMNode();
        textarea.value = this.props.content;
    },

    getWidgetEditor: function(id, type, num) {
        var cls = Perseus.Widgets._widgetTypes[type + "-editor"];
        if (!cls) {
            return;
        }

        return <div>
            <strong>{id}</strong>
            {cls(_.extend({
                ref: id,
                onChange: function(newProps) {
                    var widgets = _.clone(this.props.widgets);
                    widgets[id] = _.extend({}, widgets[id]);
                    widgets[id].options = _.extend({}, widgets[id].options,
                            newProps);
                    this.props.onChange({widgets: widgets});
                }.bind(this)
            }, (this.props.widgets[id] || {}).options))}
        </div>;
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
            pieces = Perseus.Util.split(this.props.content, rWidgetSplit);
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

                    widgets[id] = this.getWidgetEditor(id, type, num);
                    var classes = (duplicate || !widgets[id] ? "error " : "") +
                            (selected ? "selected " : "");
                    underlayPieces.push(
                            <b className={classes}>{pieces[i]}</b>);
                }
            }

            // TODO(alpert): Move this to the content-change event handler
            // _.each(_.keys(this.props.widgets), function(id) {
            //     if (!(id in widgets)) {
            //         // It's strange if these preloaded options stick around
            //         // since it's inconsistent with how things work if you
            //         // don't have the serialize/deserialize step in the middle
            //         // TODO(alpert): Save options in a consistent manner so
            //         // that you can undo the deletion of a widget
            //         delete this.props.widgets[id];
            //     }
            // }, this);

            this.widgetIds = _.keys(widgets);
            widgetEditors = <div className="perseus-editor-widgets">
                <div>
                    <select onChange={this.addWidget}>
                        <option value="">Add a widget{"\u2026"}</option>
                        <option disabled>--</option>
                        <option value="input-number">
                                Text input (number)</option>
                        <option value="expression">
                                Expression / Equation</option>
                        <option value="interactive-graph">
                                Interactive graph</option>
                        <option value="table">
                                Table of values</option>
                        <option value="dropdown">
                                Drop down</option>
                    </select>
                </div>
                {widgets}
            </div>;
        } else {
            underlayPieces = [this.props.content];
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

                <textarea ref="textarea" onInput={this.handleInput}>
                    {this.props.content}
                </textarea>
            </div>
            {widgetEditors}
        </div>;
    },

    handleInput: React.autoBind(function() {
        var textarea = this.refs.textarea.getDOMNode();
        this.props.onChange({content: textarea.value});
    }),

    addWidget: React.autoBind(function(e) {
        var widgetType = e.target.value;
        if (widgetType === "") {
            // TODO(alpert): Not sure if change will trigger here
            // but might as well be safe
            return;
        }
        e.target.value = "";

        var oldContent = this.props.content;

        for (var i = 1; oldContent.indexOf("[[\u2603 " + widgetType + " " + i +
                "]]") > -1; i++) {
            ;
        }

        var id = widgetType + " " + i;
        // TODO(alpert): Add newlines before "big" widgets like graphs
        var newContent = oldContent + "[[\u2603 " + id + "]]";

        var widgets = _.clone(this.props.widgets);
        widgets[id] = {type: widgetType};
        this.props.onChange({
            content: newContent,
            widgets: widgets
        });

        var textarea = this.refs.textarea.getDOMNode();
        textarea.focus();
        textarea.selectionStart = newContent.length;
        textarea.selectionEnd = newContent.length;
    }),

    toJSON: function(skipValidation) {
        // Could be _.pick(this.props, "content", "widgets"); but validation!
        var widgets = {};

        _.each(this.widgetIds, function(id) {
            var typeAndNum = id.split(" ", 2);
            widgets[id] = {
                options: this.refs[id].toJSON(skipValidation),
                type: typeAndNum[0]
            };
        }, this);

        return {
            content: this.props.content,
            widgets: widgets
        };
    },

    focus: function() {
        this.refs.textarea.getDOMNode().focus();
    }
});
})(Perseus);
