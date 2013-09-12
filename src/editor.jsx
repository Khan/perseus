/** @jsx React.DOM */
(function(Perseus) {

// like [[snowman input-number 1]]
var rWidgetSplit = /(\[\[\u2603 [a-z-]+ [0-9]+\]\])/g;

var Editor = Perseus.Editor = React.createClass({
    getDefaultProps: function() {
        return {
            content: "",
            widgets: {},
            widgetEnabled: true,
            immutableWidgets: false
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
            <div>
                <strong>{id}</strong>
            </div>
            {cls(_.extend({
                ref: id,
                onChange: function(newProps, cb) {
                    var widgets = _.clone(this.props.widgets);
                    widgets[id] = _.extend({}, widgets[id]);
                    widgets[id].options = _.extend({}, widgets[id].options,
                            newProps);
                    this.props.onChange({widgets: widgets}, cb);
                }.bind(this)
            }, (this.props.widgets[id] || {}).options))}
        </div>;
    },

    render: function() {
        var pieces;
        var widgets;
        var underlayPieces;
        var widgetsDropDown;
        var templatesDropDown;
        var widgetsAndTemplates;

        if (this.props.widgetEnabled) {
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
            //         // don't have the serialize/deserialize step in the
            //         // middle
            //         // TODO(alpert): Save options in a consistent manner so
            //         // that you can undo the deletion of a widget
            //         delete this.props.widgets[id];
            //     }
            // }, this);

            this.widgetIds = _.keys(widgets);
            widgetsDropDown =  <select onChange={this.addWidget}>
                <option value="">Add a widget{"\u2026"}</option>
                <option disabled>--</option>
                <option value="input-number">
                        Text input (number)</option>
                <option value="expression">
                        Expression / Equation</option>
                <option value="interactive-graph">
                        Interactive graph</option>
                <option value="interactive-number-line">
                        Interactive number line</option>
                <option value="categorization">
                        Categorization</option>
                <option value="table">
                        Table of values</option>
                <option value="dropdown">
                        Drop down</option>
                <option value="orderer">
                        Orderer</option>
            </select>;

            templatesDropDown = <select onChange={this.addTemplate}>
                <option value="">Insert template{"\u2026"}</option>
                <option disabled>--</option>
                <option value="table">Table</option>
                <option value="alignment">Aligned equations</option>
                <option value="piecewise">Piecewise function</option>
            </select>;

            if (!this.props.immutableWidgets) {
                widgetsAndTemplates = <div className="perseus-editor-widgets">
                    <div>
                        {widgetsDropDown}
                        {templatesDropDown}
                    </div>
                    {widgets}
                </div>;
            }
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

                <textarea ref="textarea" onInput={this.handleInput}
                    value={this.props.content} />
            </div>
            {widgetsAndTemplates}
        </div>;
    },

    handleInput: function() {
        var textarea = this.refs.textarea.getDOMNode();
        this.props.onChange({content: textarea.value});
    },

    addWidget: function(e) {
        var widgetType = e.target.value;
        if (widgetType === "") {
            // TODO(alpert): Not sure if change will trigger here
            // but might as well be safe
            return;
        }
        e.target.value = "";

        var oldContent = this.props.content;

        // Add newlines before "big" widgets like graphs
        if (widgetType !== "input-number" && widgetType !== "dropdown") {
            oldContent = oldContent.replace(/\n*$/, "\n\n");
        }

        for (var i = 1; oldContent.indexOf("[[\u2603 " + widgetType + " " + i +
                "]]") > -1; i++) {
            // pass
        }

        var id = widgetType + " " + i;
        var newContent = oldContent + "[[\u2603 " + id + "]]";

        var widgets = _.clone(this.props.widgets);
        widgets[id] = {type: widgetType};
        this.props.onChange({
            content: newContent,
            widgets: widgets
        }, this.focusAndMoveToEnd);
    },

    addTemplate: function(e) {
        var templateType = e.target.value;
        if (templateType === "") {
            return;
        }
        e.target.value = "";

        var oldContent = this.props.content;

        // Force templates to have a blank line before them,
        // as they are usually used as block elements
        // (especially important for tables)
        oldContent = oldContent.replace(/\n*$/, "\n\n");

        var template;
        if (templateType === "table") {
            template = "header 1 | header 2 | header 3\n" +
                       "- | - | -\n" +
                       "data 1 | data 2 | data 3\n" +
                       "data 4 | data 5 | data 6\n" +
                       "data 7 | data 8 | data 9";
        } else if (templateType === "alignment") {
            template = "$\\begin{align} x+5 &= 30 \\\\\n" +
                       "x+5-5 &= 30-5 \\\\\n" +
                       "x &= 25 \\end{align}$";
        } else if (templateType === "piecewise") {
            template = "$f(x) = \\begin{cases}\n" +
                       "7 & \\text{if $x=1$} \\\\\n" +
                       "f(x-1)+5 & \\text{if $x > 1$}\n" +
                       "\\end{cases}$";
        } else {
            throw new Error("Invalid template type: " + templateType);
        }

        var newContent = oldContent + template;

        this.props.onChange({content: newContent}, this.focusAndMoveToEnd);
    },

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
    },

    focusAndMoveToEnd: function() {
        this.focus();
        var textarea = this.refs.textarea.getDOMNode();
        textarea.selectionStart = textarea.value.length;
        textarea.selectionEnd = textarea.value.length;
    }
});
})(Perseus);
