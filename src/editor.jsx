/** @jsx React.DOM */
(function(Perseus) {

require("./core.js");
var Util = require("./util.js");

var Widgets = require("./widgets.js");
var PropCheckBox = require("./components/prop-check-box.jsx");

// like [[snowman input-number 1]]
var rWidgetSplit = /(\[\[\u2603 [a-z-]+ [0-9]+\]\])/g;

/* This component makes its children a drag target. Example:
 *
 *     <DragTarget onDrop={this.handleDrop}>Drag to me</DragTarget>
 *
 *     ...
 *
 *     handleDrop: function(e) {
 *         this.addImages(e.nativeEvent.dataTransfer.files);
 *     }
 *
 * Now "Drag to me" will be a drag target - when something is dragged over it,
 * the element will become partially transparent as a visual indicator that
 * it's a target.
 */
// TODO(joel) - indicate before the hover is over the target that it's possible
// to drag into the target. This would (I think) require a high level handler -
// like on Perseus itself, waiting for onDragEnter, then passing down the
// event. Sounds like a pain. Possible workaround - create a div covering the
// entire page...
//
// Other extensions:
// * custom styles for global drag and dragOver
// * only respond to certain types of drags (only images for instance)!
var DragTarget = React.createClass({
    propTypes: {
        onDrop: React.PropTypes.func.isRequired,
        component: React.PropTypes.component,
        shouldDragHighlight: React.PropTypes.func
    },
    render: function() {
        // This is the only property of the returned component we need to
        // calculate here because it will be overwritten by transferPropsTo.
        var opacity = this.state.dragHover ? { "opacity": 0.3 } : {};

        var component = this.props.component;
        return this.transferPropsTo(
            <component style={opacity}
                       onDrop={this.handleDrop}
                       onDragEnd={this.handleDragEnd}
                       onDragOver={this.handleDragOver}
                       onDragEnter={this.handleDragEnter}
                       onDragLeave={this.handleDragLeave}>
                {this.props.children}
            </component>
        );
    },
    getInitialState: function() {
        return { dragHover: false };
    },
    getDefaultProps: function() {
        return {
            component: React.DOM.div,
            shouldDragHighlight: function() { return true; }
        };
    },
    handleDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ dragHover: false });
        this.props.onDrop(e);
    },
    handleDragEnd: function() {
        this.setState({ dragHover: false });
    },
    handleDragOver: function(e) {
        e.preventDefault();
    },
    handleDragLeave: function() {
        this.setState({ dragHover: false });
    },
    handleDragEnter: function(e) {
        this.setState({ dragHover: this.props.shouldDragHighlight(e) });
    }
});

var WidgetSelect = React.createClass({
    handleChange: function(e) {
        var widgetType = e.target.value;
        if (widgetType === "") {
            // TODO(alpert): Not sure if change will trigger here
            // but might as well be safe
            return;
        }
        e.target.value = "";
        if (this.props.onChange) {
            this.props.onChange(widgetType);
        }
    },
    shouldComponentUpdate: function() {
        return false;
    },
    render: function() {
        return <select onChange={this.handleChange}>
            <option value="">Add a widget{"\u2026"}</option>
            <option disabled>--</option>
            <option value="input-number">
                    Text input (number)</option>
            <option value="expression">
                    Expression / Equation</option>
            <option value="radio">
                    Multiple choice</option>
            <option value="interactive-graph">
                    Interactive graph</option>
            <option value="number-line">
                    Number line</option>
            <option value="categorization">
                    Categorization</option>
            <option value="plotter">
                    Plotter</option>
            <option value="table">
                    Table of values</option>
            <option value="dropdown">
                    Drop down</option>
            <option value="orderer">
                    Orderer</option>
            <option value="measurer">
                    Measurer</option>
            <option value="transformer">
                    Transformer</option>
            <option value="matcher">
                    Two column matcher</option>
            <option value="sorter">
                    Sorter</option>
        </select>;
    }
});


var WidgetEditor = React.createClass({
    propTypes: {
        type: React.PropTypes.string,
        id: React.PropTypes.string,
        graded: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            graded: true
        };
    },

    getInitialState: function() {
        return {
            showWidget: true
        };
    },

    render: function() {
        var cls = Widgets.get(this.props.type + "-editor");

        var isUngradedEnabled = (this.props.type === "transformer");
        var direction = this.state.showWidget ? "down" : "right";

        var gradedPropBox = <PropCheckBox label="Graded:"
                                graded={this.props.graded}
                                onChange={this.props.onChange} />;

        return <div className="perseus-widget-editor">
            <a href="#" className={"perseus-widget-editor-title " +
                    (this.state.showWidget ? "open" : "closed")}
                    onClick={this.toggleWidget}>
                {this.props.id}
                <i className={"icon-chevron-" + direction} />
            </a>
            <div className={"perseus-widget-editor-content " +
                    (this.state.showWidget ? "enter" : "leave")}>
                {isUngradedEnabled && gradedPropBox}
                {cls(_.extend({
                    ref: "widget",
                    onChange: this._handleWidgetChange
                }, this.props.options))}
            </div>
        </div>;
    },

    toggleWidget: function(e) {
        e.preventDefault();
        this.setState({showWidget: !this.state.showWidget});
    },

    _handleWidgetChange: function(newProps, cb) {
        this.props.onChange({
            options: _.extend({}, this.props.options, newProps)
        }, cb);
    },

    toJSON: function(skipValidation) {
        return {
            type: this.props.type,
            graded: this.props.graded,
            options: this.refs.widget.toJSON(skipValidation)
        };
    }
});

var Editor = Perseus.Editor = React.createClass({
    getDefaultProps: function() {
        return {
            content: "",
            placeholder: "",
            widgets: {},
            widgetEnabled: true,
            immutableWidgets: false
        };
    },

    componentDidUpdate: function(prevProps, prevState) {
        // TODO(alpert): Maybe fix React so this isn't necessary
        var textarea = this.refs.textarea.getDOMNode();
        textarea.value = this.props.content;
    },

    getWidgetEditor: function(id, type) {
        if (!Widgets.get(type + "-editor")) {
            return;
        }
        return WidgetEditor(_.extend({
            ref: id,
            id: id,
            type: type,
            onChange: _.bind(this._handleWidgetEditorChange, this, id)
        }, this.props.widgets[id]));
    },

    _handleWidgetEditorChange: function(id, newProps, cb) {
        var widgets = _.clone(this.props.widgets);
        widgets[id] = _.extend({}, widgets[id], newProps);
        this.props.onChange({widgets: widgets}, cb);
    },

    render: function() {
        var pieces;
        var widgets;
        var underlayPieces;
        var widgetsDropDown;
        var templatesDropDown;
        var widgetsAndTemplates;

        if (this.props.widgetEnabled) {
            pieces = Util.split(this.props.content, rWidgetSplit);
            widgets = {};
            underlayPieces = [];

            for (var i = 0; i < pieces.length; i++) {
                var type = i % 2;
                if (type === 0) {
                    // Normal text
                    underlayPieces.push(pieces[i]);
                } else {
                    // Widget reference
                    var match = Util.rWidgetParts.exec(pieces[i]);
                    var id = match[1];
                    var type = match[2];

                    var selected = false;
                    // TODO(alpert):
                    // var selected = focused && selStart === selEnd &&
                    //         offset <= selStart &&
                    //         selStart < offset + text.length;
                    // if (selected) {
                    //     selectedWidget = id;
                    // }

                    var duplicate = id in widgets;

                    widgets[id] = this.getWidgetEditor(id, type);
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
            widgetsDropDown = <WidgetSelect onChange={this.addWidget} />;

            templatesDropDown = <select onChange={this.addTemplate}>
                <option value="">Insert template{"\u2026"}</option>
                <option disabled>--</option>
                <option value="table">Table</option>
                <option value="alignment">Aligned equations</option>
                <option value="piecewise">Piecewise function</option>
            </select>;

            if (!this.props.immutableWidgets) {
                widgetsAndTemplates = <div className="perseus-editor-widgets">
                    <div className="perseus-editor-widgets-selectors">
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

        var completeTextarea = [
                <div className="perseus-textarea-underlay" ref="underlay">
                    {underlayPieces}
                </div>,
                <textarea ref="textarea"
                          onChange={this.handleChange}
                          placeholder={this.props.placeholder}
                          value={this.props.content} />
            ];
        var textareaWrapper;
        if (Perseus.imageUploader) {
            textareaWrapper = <DragTarget
                    onDrop={this.handleDrop}
                    className="perseus-textarea-pair">
                {completeTextarea}
            </DragTarget>;
        } else {
            textareaWrapper = <div className="perseus-textarea-pair">
                {completeTextarea}
            </div>;
        }


        return <div className={"perseus-single-editor " +
                (this.props.className || "")} >
            {textareaWrapper}
            {widgetsAndTemplates}
        </div>;
    },

    handleDrop: function(e) {
        var files = e.nativeEvent.dataTransfer.files;
        var content = this.props.content;

        /* For each file we make sure it's an image, then create a sentinel -
         * snowman + identifier to insert into the current text. The sentinel
         * only lives there temporarily until we get a response back from the
         * server that the image is now hosted on AWS, at which time we replace
         * the temporary sentinel with the permanent url for the image.
         *
         * There is an abuse of tap in the middle of the pipeline to make sure
         * everything is sequenced in the correct order. We want to modify the
         * content (given any number of images) at the same time, i.e. only
         * once, so we do that step with the tap. After the content has been
         * changed we send off the request for each image.
         *
         * Note that the snowman doesn't do anything special in this case -
         * it's effectively just part of a broken link. Perseus could be
         * extended to recognize this sentinel and highlight it like for
         * widgets.
         */
        _(files)
            .chain()
            .map(function(file) {
                if (!file.type.match('image.*')) {
                    return null;
                }

                var sentinel = "\u2603 " + _.uniqueId("image_");
                // TODO(joel) - figure out how to temporarily include the image
                // before the server returns.
                content += "\n\n![](" + sentinel + ")";

                return { file: file, sentinel: sentinel };
            })
            .reject(_.isNull)
            .tap(() => { this.props.onChange({ content: content }); })
            .each(fileAndSentinel => {
                Perseus.imageUploader(fileAndSentinel.file, url => {
                    this.props.onChange({
                        content: this.props.content.replace(
                            fileAndSentinel.sentinel, url)
                    });
                });
            });
    },

    handleChange: function() {
        var textarea = this.refs.textarea.getDOMNode();
        this.props.onChange({content: textarea.value});
    },

    addWidget: function(widgetType) {
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
        var widgetIds = _.intersection(this.widgetIds, _.keys(this.refs));

        _.each(widgetIds, function(id) {
            widgets[id] = this.refs[id].toJSON(skipValidation);
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
