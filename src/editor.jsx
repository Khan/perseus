/** @jsx React.DOM */

var React = require('react');
var PropCheckBox = require("./components/prop-check-box.jsx");
var Util = require("./util.js");
var Widgets = require("./widgets.js");
var DragTarget = require("react-components/drag-target.jsx");
var InfoTip = require("react-components/info-tip.jsx");

// like [[snowman input-number 1]]
var widgetPlaceholder = "[[\u2603 {id}]]";
var widgetRegExp = "(\\[\\[\u2603 {id}\\]\\])";
var rWidgetSplit = new RegExp(widgetRegExp.replace('{id}', '[a-z-]+ [0-9]+'), 'g');

var shortcuts = {
    regexp: /^\[\[([a-z]+)$/, // like [[nu, [[int, etc
    list: []
}

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
        var widgets = Widgets.getPublicWidgets();
        var orderedWidgetNames = _.sortBy(_.keys(widgets), (name) => {
            return widgets[name].displayName;
        });

        return <select onChange={this.handleChange}>
            <option value="">Add a widget{"\u2026"}</option>
            <option disabled>--</option>
            {_.map(orderedWidgetNames, (name) => {
                var i = 0;
                var shortcut = '';

                do {
                    shortcut += name.charAt(i++);
                } while (shortcuts.list.indexOf(shortcut) > -1)

                shortcuts.list.push(shortcut);

                return <option value={name} key={name} data-shortcut={shortcut}>
                    {widgets[name].displayName + ' [' + shortcut.toUpperCase() + ']'}
                </option>;
            })}
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
            graded: true,
            options: {}
        };
    },

    getInitialState: function() {
        return {
            showWidget: true
        };
    },

    render: function() {
        // We can't call our widget's `serialize` here, because on
        // first render that ref hasn't mounted yet.
        // This means that on first render we'll send in
        // `options: {}` to `upgradeWidgetInfoToLatestVersion`, but
        // `upgradeWidgetInfoToLatestVersion` accounts for that
        // before sending {} to any of our prop upgrade functions.
        var upgradedWidgetInfo = Widgets.upgradeWidgetInfoToLatestVersion(
            this.props
        );
        var type = upgradedWidgetInfo.type;

        var cls = Widgets.getEditor(type);

        var isUngradedEnabled = (type === "transformer");
        var direction = this.state.showWidget ? "down" : "right";

        var gradedPropBox = <PropCheckBox label="Graded:"
                                graded={upgradedWidgetInfo.graded}
                                onChange={this.props.onChange} />;

        return <div className="perseus-widget-editor">
            <div className={"perseus-widget-editor-title " + (this.state.showWidget ? "open" : "closed")}>
                <a href="#" onClick={this.toggleWidget}>
                    {this.props.id}
                    <i className={"icon-chevron-" + direction} />
                </a>
                <a href="#" className="remove-widget simple-button simple-button--small orange"
                        onClick={() => {
                            this.props.onRemove();
                            return false;
                        }}>
                    <span className="icon-trash" />
                </a>
            </div>
            <div className={"perseus-widget-editor-content " +
                    (this.state.showWidget ? "enter" : "leave")}>
                {isUngradedEnabled && gradedPropBox}
                {cls(_.extend({
                    ref: "widget",
                    onChange: this._handleWidgetChange
                }, upgradedWidgetInfo.options))}
            </div>
        </div>;
    },

    toggleWidget: function(e) {
        e.preventDefault();
        this.setState({showWidget: !this.state.showWidget});
    },

    _handleWidgetChange: function(newProps, cb) {
        // TODO(jack): It is unfortunate to call serialize here, but is
        // important so that the widgetInfo we pass to our upgrade functions is
        // always complete. If we just sent this.props in, we could run into
        // situations where we would send things like { answerType: "decimal" }
        // to our upgrade functions, without the rest of the props representing
        // the widget.
        var currentWidgetInfo = _.extend({}, this.props, {
            options: this.refs.widget.serialize()
        });
        var newWidgetInfo = Widgets.upgradeWidgetInfoToLatestVersion(
            currentWidgetInfo
        );
        newWidgetInfo.options = _.extend(newWidgetInfo.options, newProps);
        this.props.onChange(newWidgetInfo, cb);
    },

    getSaveWarnings: function() {
        var issuesFunc = this.refs.widget.getSaveWarnings;
        return issuesFunc ? issuesFunc() : [];
    },

    serialize: function() {
        return {
            type: this.props.type,
            graded: this.props.graded,
            options: this.refs.widget.serialize(),
            version: Widgets.getVersion(this.props.type)
        };
    }
});

// This is more general than the actual markdown image parsing regex,
// which is fine for correctness since it should only mean we could
// store extra image dimensions, unless the question is insanely
// formatted.
// A simplified regex here should hopefully be easier to keep in
// sync if the markdown parsing changes, though if it becomes
// easy to hook into the actual markdown regex without copy-pasting
// it, we should do that.
var IMAGE_REGEX = /!\[[^\]]*\]\(([^\s\)]+)[^\)]*\)/g;

/**
 * Find all the matches to a /g regex.
 *
 * Returns an array of the regex matches. Infinite loops if `regex` does not
 * have a /g modifier.
 *
 * Note: Returns an array of the capture objects, whereas String::match
 * ignores captures. If you don't need captures, use String::match
 */
var allMatches = function(regex, str) {
    var result = [];
    while (true) {
        var match = regex.exec(str);
        if (!match) {
            break;
        }
        result.push(match);
    }
    return result;
};

/**
 * Return an array of URLs of all the images in the given renderer
 * markdown.
 */
var imageUrlsFromContent = function(content) {
    return _.map(
        allMatches(IMAGE_REGEX, content),
        (capture) => capture[1]
    );
};

/**
 * Sends the dimensions of the image located at the given url to `callback`
 */
var sizeImage = function(url, callback) {
    var image = new Image();
    image.onload = () => {
        var width = image.naturalWidth || image.width;
        var height = image.naturalHeight || image.height;
        callback(width, height);
    };
    image.src = url;
};

var Editor = React.createClass({
    propTypes: {
        imageUploader: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            content: "",
            placeholder: "",
            widgets: {},
            images: {},
            widgetEnabled: true,
            immutableWidgets: false
        };
    },

    getWidgetEditor: function(id, type) {
        if (!Widgets.getEditor(type)) {
            return;
        }
        return WidgetEditor(_.extend({
            ref: id,
            id: id,
            type: type,
            onChange: this._handleWidgetEditorChange.bind(this, id),
            onRemove: this._handleWidgetEditorRemove.bind(this, id)
        }, this.props.widgets[id]));
    },

    _handleWidgetEditorChange: function(id, newProps, cb) {
        var widgets = _.clone(this.props.widgets);
        widgets[id] = _.extend({}, widgets[id], newProps);
        this.props.onChange({widgets: widgets}, cb);
    },

    _handleWidgetEditorRemove: function(id) {
        var re = new RegExp(widgetRegExp.replace('{id}', id), 'gm');
        var textarea = this.refs.textarea.getDOMNode();

        this.props.onChange({content: textarea.value.replace(re, '')});
    },

    /**
     * Calculate the size of all the images in props.content, and send
     * those sizes to this.props.images using props.onChange.
     */
    _sizeImages: function(props) {
        var imageUrls = imageUrlsFromContent(props.content);

        // Discard any images in our dimension table that no
        // longer exist in content.
        var images = _.pick(props.images, imageUrls);

        // Only calculate sizes for images that were not present previously.
        // Most content edits shouldn't have new images.
        // This could get weird in the case of multiple images with the same
        // URL, if you've changed the backing image size, but given graphie
        // hashes it's probably an edge case.
        var newImageUrls = _.filter(imageUrls, (url) => !images[url]);

        // TODO(jack): Q promises would make this nicer and only
        // fire once.
        _.each(newImageUrls, (url) => {
            sizeImage(url, (width, height) => {
                // We keep modifying the same image object rather than a new
                // copy from this.props because all changes here are additive.
                // Maintaining old changes isn't strictly necessary if
                // props.onChange calls are not batched, but would be if they
                // were, so this is nice from that anti-race-condition
                // perspective as well.
                images[url] = {
                    width: width,
                    height: height
                };
                props.onChange({
                        images: _.clone(images)
                    },
                    null, // callback
                    true // silent
                );
            });
        });
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
                    var key = duplicate ? i : id;
                    underlayPieces.push(
                            <b className={classes} key={key}>{pieces[i]}</b>);
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
            widgetsDropDown = <WidgetSelect ref="widgetSelect" onChange={this.addWidget} />;
            widgetsDropDownInfoTip = <div className="info-tip">
                <InfoTip>
                    <p>Type <b>[[&lt;shortcut&gt;</b> followed by SPACE or ENTER to quickly add a widget.</p>
                </InfoTip>
            </div>

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
                        {widgetsDropDownInfoTip}
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
        underlayPieces.push(<br key="end"/>);

        var completeTextarea = [
                <div className="perseus-textarea-underlay"
                     ref="underlay"
                     key="underlay">
                    {underlayPieces}
                </div>,
                <textarea ref="textarea"
                          key="textarea"
                          onChange={this.handleChange}
                          onKeyDown={this.handleKeyDown}
                          placeholder={this.props.placeholder}
                          value={this.props.content} />
            ];
        var textareaWrapper;
        if (this.props.imageUploader) {
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

    componentDidMount: function() {
        // This can't be in componentWillMount because that's happening during
        // the middle of our parent's render, so we can't call
        // this.props.onChange during that, since it calls our parent's
        // setState
        this._sizeImages(this.props);
    },

    componentDidUpdate: function(prevProps) {
        // TODO(alpert): Maybe fix React so this isn't necessary
        var textarea = this.refs.textarea.getDOMNode();
        textarea.value = this.props.content;

        // This can't be in componentWillReceiveProps because that's happening
        // during the middle of our parent's render.
        if (this.props.content !== prevProps.content) {
            this._sizeImages(this.props);
        }
    },

    handleDrop: function(e) {
        var content = this.props.content;
        var dataTransfer = e.nativeEvent.dataTransfer;

        // files will hold something if the drag was from the desktop or a file
        // located on the user's computer.
        var files = dataTransfer.files;

        // ... but we only get a url if the drag originated in another window
        if (files.length === 0) {
            var imageUrl = dataTransfer.getData("URL");

            if (imageUrl) {
                // TODO(joel) - relocate when the image upload dialog lands
                var newContent = content + "\n\n![](" + imageUrl + ")";
                this.props.onChange({ content: newContent });
            }

            return;
        }

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
                this.props.imageUploader(fileAndSentinel.file, url => {
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

    handleKeyDown: function(e) {
        if ([13, 32].indexOf(e.keyCode) !== -1) {
            var textarea = this.refs.textarea.getDOMNode();
            var word = Util.textarea.getWordBeforeCursor(textarea);
            var matches = word.string.toLowerCase().match(shortcuts.regexp);

            if (matches !== null && shortcuts.list.indexOf(matches[1]) !== -1) {
                var newContent = Util.insertContent(textarea.value, '', [ word.pos.start, word.pos.end + 1 ]);

                this.props.onChange({ content: newContent }, () => {
                    Util.textarea.moveCursor(textarea, word.pos.start);
                    this.triggerShortcut(matches[1]);
                });

                e.preventDefault();
            }
        }
    },

    triggerShortcut: function(shortcut) {
        var select = this.refs.widgetSelect.getDOMNode();
        var widget = select.querySelector(`[data-shortcut="${shortcut}"]`);

        if (widget) {
            select.value = widget.getAttribute('value');
            Util.simulateEvent('change', select);
        }
    },

    addWidget: function(widgetType) {
        var oldContent = this.props.content;
        var textarea = this.refs.textarea.getDOMNode();
        var cursorPos = textarea.selectionStart;

        for (var i = 1; oldContent.indexOf(widgetPlaceholder.replace('{id}', widgetType + " " + i)) > -1; i++) {
            // pass
        }

        var id = widgetType + " " + i;
        var widgetContent = widgetPlaceholder.replace('{id}', id) + ' ';

        // Add newlines before "big" widgets like graphs
        if (widgetType !== "input-number" && widgetType !== "dropdown") {
            widgetContent = "\n\n" + widgetContent;
        }

        var newContent = Util.insertContent(oldContent, widgetContent, [ textarea.selectionStart, textarea.selectionEnd ]);
        var widgets = _.clone(this.props.widgets);

        widgets[id] = {type: widgetType};
        this.props.onChange({
            content: newContent,
            widgets: widgets
        }, function() {
            Util.textarea.moveCursor(textarea, cursorPos + widgetContent.length);
        });
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

    getSaveWarnings: function() {
        var widgetIds = _.intersection(this.widgetIds, _.keys(this.refs));
        return _(widgetIds)
            .chain()
            .map(id => {
                var issuesFunc = this.refs[id].getSaveWarnings;
                return issuesFunc ? issuesFunc() : [];
            })
            .flatten(true)
            .value();
    },

    serialize: function() {
        // need to serialize the widgets since the state might not be
        // completely represented in props. ahem //transformer// (and
        // interactive-graph and plotter).
        var widgets = {};
        var widgetIds = _.intersection(this.widgetIds, _.keys(this.refs));
        _.each(widgetIds, id => {
            widgets[id] = this.refs[id].serialize();
        });

        return {
            content: this.props.content,
            images: this.props.images,
            widgets: widgets,
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

module.exports = Editor;
