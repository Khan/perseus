var React = require('react');
var _ = require("underscore");

var ApiOptions = require("./perseus-api.jsx").Options;
var DragTarget = require("react-components/drag-target.jsx");
var EnabledFeatures = require("./enabled-features.jsx");
var PropCheckBox = require("./components/prop-check-box.jsx");
var Util = require("./util.js");
var Widgets = require("./widgets.js");
var cx = React.addons.classSet;

var WIDGET_PROP_BLACKLIST = require("./mixins/widget-prop-blacklist.jsx");

var characterCount = require("./perseus-markdown.jsx").characterCount;

// like [[snowman input-number 1]]
var widgetPlaceholder = "[[\u2603 {id}]]";
var widgetRegExp = "(\\[\\[\u2603 {id}\\]\\])";
var rWidgetSplit = new RegExp(widgetRegExp.replace('{id}', '[a-z-]+ [0-9]+'),
                              'g');

var shortcutRegexp = /^\[\[([a-z\-]+)$/; // like [[nu, [[int, etc

var ENDS_WITH_A_PARAGRAPH = /(?:\n{2,}|^\n*)$/;
var TRAILING_NEWLINES = /(\n*)$/;
var LEADING_NEWLINES = /^(\n*)/;

var commafyInteger = (n) => {
    var str = n.toString();
    if (str.length >= 5) {
        str = str.replace(/(\d)(?=(\d{3})+$)/g, "$1{,}");
    }
    return str;
};
var makeEndWithAParagraphIfNecessary = (content) => {
    if (!ENDS_WITH_A_PARAGRAPH.test(content)) {
        var newlines = TRAILING_NEWLINES.exec(content)[1];
        return content + "\n\n".slice(0, 2 - newlines.length);
    } else {
        return content;
    }
};
var makeStartWithAParagraphAlways = (content) => {
    var newlines = LEADING_NEWLINES.exec(content)[1];
    return "\n\n".slice(0, 2 - newlines.length) + content;
};

var WidgetSelect = React.createClass({
    shouldComponentUpdate: function() {
        return false;
    },

    render: function() {
        var widgets = Widgets.getPublicWidgets();
        var orderedWidgetNames = _.sortBy(_.keys(widgets), (name) => {
            return widgets[name].displayName;
        });

        return <select value="" onChange={this.handleChange}>
            <option value="">Add a widget{"\u2026"}</option>
            <option disabled>--</option>
            {_.map(orderedWidgetNames, (name) => {
                return <option key={name} value={name}>
                    {widgets[name].displayName}
                </option>;
            })}
        </select>;
    },

    handleChange: function(e) {
        var widgetType = e.target.value;
        if (widgetType === "") {
            // TODO(alpert): Not sure if change will trigger here
            // but might as well be safe
            return;
        }
        if (this.props.onChange) {
            this.props.onChange(widgetType);
        }
    },
});


var WidgetEditor = React.createClass({
    propTypes: {
        type: React.PropTypes.string,
        id: React.PropTypes.string,
        graded: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        apiOptions: ApiOptions.propTypes,
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

        var Ed = Widgets.getEditor(type);

        var isUngradedEnabled = (type === "transformer");
        var direction = this.state.showWidget ? "down" : "right";

        var gradedPropBox = <PropCheckBox label="Graded:"
                                graded={upgradedWidgetInfo.graded}
                                onChange={this.props.onChange} />;

        return <div className="perseus-widget-editor">
            <div className={"perseus-widget-editor-title " +
                    (this.state.showWidget ? "open" : "closed")}>
                <a href="#" onClick={this.toggleWidget}>
                    {this.props.id}
                    <i className={"icon-chevron-" + direction} />
                </a>
                <a href="#" className={
                            "remove-widget " +
                            "simple-button simple-button--small orange"
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.onRemove();
                        }}>
                    <span className="icon-trash" />
                </a>
            </div>
            <div className={"perseus-widget-editor-content " +
                    (this.state.showWidget ? "enter" : "leave")}>
                {isUngradedEnabled && gradedPropBox}
                <Ed
                    ref="widget"
                    onChange={this._handleWidgetChange}
                    apiOptions={this.props.apiOptions}
                    {...upgradedWidgetInfo.options} />
            </div>
        </div>;
    },

    toggleWidget: function(e) {
        e.preventDefault();
        this.setState({showWidget: !this.state.showWidget});
    },

    _handleWidgetChange: function(newProps, cb, silent) {
        // TODO(jack): It is unfortunate to call serialize here, but is
        // important so that the widgetInfo we pass to our upgrade functions is
        // always complete. If we just sent this.props in, we could run into
        // situations where we would send things like { answerType: "decimal" }
        // to our upgrade functions, without the rest of the props representing
        // the widget.
        var currentWidgetInfo = _.extend(
            _.omit(this.props, WIDGET_PROP_BLACKLIST),
            { options: this.refs.widget.serialize() }
        );
        var newWidgetInfo = Widgets.upgradeWidgetInfoToLatestVersion(
            currentWidgetInfo
        );
        newWidgetInfo.options = _.extend(newWidgetInfo.options, newProps);
        this.props.onChange(newWidgetInfo, cb, silent);
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

var Editor = React.createClass({
    propTypes: {
        imageUploader: React.PropTypes.func,
        apiOptions: ApiOptions.propTypes
    },

    getDefaultProps: function() {
        return {
            content: "",
            placeholder: "",
            widgets: {},
            images: {},
            widgetEnabled: true,
            immutableWidgets: false,
            showWordCount: false,
            apiOptions: ApiOptions.defaults,
        };
    },

    getWidgetEditor: function(id, type) {
        if (!Widgets.getEditor(type)) {
            return;
        }
        return <WidgetEditor
            ref={id}
            id={id}
            type={type}
            onChange={this._handleWidgetEditorChange.bind(this, id)}
            onRemove={this._handleWidgetEditorRemove.bind(this, id)}
            apiOptions={this.props.apiOptions}
            {...this.props.widgets[id]} />;
    },

    _handleWidgetEditorChange: function(id, newProps, cb, silent) {
        var widgets = _.clone(this.props.widgets);
        widgets[id] = _.extend({}, widgets[id], newProps);
        this.props.onChange({widgets: widgets}, cb, silent);
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
            Util.getImageSize(url, (width, height) => {
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
        var wordCountDisplay;
        var classes;

        if (this.props.showWordCount) {
            var numChars = characterCount(this.props.content);
            var numWords = Math.floor(numChars / 6);
            wordCountDisplay = <span
                    className="perseus-editor-word-count"
                    title={'~' + commafyInteger(numWords) + ' words (' +
                                 commafyInteger(numChars) + ' characters)'}>
                {commafyInteger(numWords)}
            </span>;
        }

        if (this.props.widgetEnabled) {
            pieces = Util.split(this.props.content, rWidgetSplit);
            widgets = {};
            underlayPieces = [];

            var searchResultIndex = 0;

            for (var i = 0; i < pieces.length; i++) {
                var type = i % 2;
                if (type === 0) {
                    // Normal text
                    if (this.props.searchString !== "") {
                        var searchRegex =
                            new RegExp(`(${this.props.searchString})`, "g");
                        var smallerPieces = Util.split(pieces[i], searchRegex);

                        for (var j = 0; j < smallerPieces.length; j++) {
                            var smallerPiece = smallerPieces[j];
                            if (smallerPiece === this.props.searchString) {
                                var currentSearchResult =
                                    searchResultIndex === this.props.searchIndex;
                                classes = cx({
                                    "search-result": !currentSearchResult,
                                    "current-search-result": currentSearchResult
                                });

                                // Search result
                                underlayPieces.push(
                                    <b className={classes}>{smallerPiece}</b>);
                                searchResultIndex++;
                            } else {
                                // Normal text
                                underlayPieces.push(smallerPiece);
                            }
                        }
                    } else {
                        underlayPieces.push(pieces[i]);
                    }
                } else {
                    // Widget reference
                    var match = Util.rWidgetParts.exec(pieces[i]);
                    var id = match[1];
                    type = match[2];

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
                    classes = cx({
                        "error": duplicate || !widgets[id],
                        "selected": selected
                    });
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
            widgetsDropDown = <WidgetSelect
                    ref="widgetSelect"
                    onChange={this._addWidget} />;

            templatesDropDown = <select onChange={this.addTemplate}>
                <option value="">Insert template{"\u2026"}</option>
                <option disabled>--</option>
                <option value="table">Table</option>
                <option value="titledTable">Titled table</option>
                <option value="alignment">Aligned equations</option>
                <option value="piecewise">Piecewise function</option>
            </select>;

            if (!this.props.immutableWidgets) {
                widgetsAndTemplates = <div className="perseus-editor-widgets">
                    <div className="perseus-editor-widgets-selectors">
                        {widgetsDropDown}
                        {templatesDropDown}
                        {wordCountDisplay}
                    </div>
                    {widgets}
                </div>;
                // Prevent word count from being displayed elsewhere
                wordCountDisplay = null;
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
                          onKeyDown={this._handleKeyDown}
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
            {wordCountDisplay}
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

        // shift the view so the current search result is visible
        $('.current-search-result').each((index, elem) => {
            var bounds = elem.getBoundingClientRect();
            if (bounds.top < 10 || bounds.bottom > $(window).height() - 10) {
                var scrollY = bounds.top + window.scrollY - 100;
                window.scrollTo(window.scrollX, scrollY);
            }
        });
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

    _handleKeyDown: function(e) {
        if (e.key === "Tab") {
            var textarea = this.refs.textarea.getDOMNode();

            var word = Util.textarea.getWordBeforeCursor(textarea);
            var matches = word.string.toLowerCase().match(shortcutRegexp);

            if (matches != null) {
                var text = matches[1];
                var widgets = Widgets.getAllWidgetTypes();
                var matchingWidgets = _.filter(widgets, (name) => {
                    return name.substring(0, text.length) === text;
                });

                if (matchingWidgets.length === 1) {
                    var widgetType = matchingWidgets[0];

                    this._addWidgetToContent(
                        this.props.content,
                        [word.pos.start, word.pos.end + 1],
                        widgetType
                    );
                }

                e.preventDefault();
            }
        }
    },

    _addWidgetToContent(oldContent, cursorRange, widgetType) {
        var textarea = this.refs.textarea.getDOMNode();

        // Note: we have to use _.map here instead of Array::map
        // because the results of a .match might be null if no
        // widgets were found.
        var allWidgetIds = _.map(oldContent.match(rWidgetSplit), (syntax) => {
            var match = Util.rWidgetParts.exec(syntax);
            var type = match[2];
            var num = +match[3];
            return [type, num];
        });

        var widgetNum = _.reduce(allWidgetIds, (currentNum, otherId) => {
            var [otherType, otherNum] = otherId;
            if (otherType === widgetType) {
                return Math.max(otherNum + 1, currentNum);
            } else {
                return currentNum;
            }
        }, 1);

        var id = widgetType + " " + widgetNum;
        var widgetContent = widgetPlaceholder.replace("{id}", id);

        // Add newlines before block-display widgets like graphs
        var Widget = Widgets.getWidget(widgetType, EnabledFeatures.defaults);
        var isBlock = Widget.displayMode === "block";
        var prelude = oldContent.slice(0, cursorRange[0]);
        var postlude = oldContent.slice(cursorRange[1]);

        var newPrelude = isBlock ?
            makeEndWithAParagraphIfNecessary(prelude) :
            prelude;
        var newPostlude = isBlock ?
            makeStartWithAParagraphAlways(postlude) :
            postlude;

        var newContent = newPrelude + widgetContent + newPostlude;

        this.props.onChange({
            content: newContent
        }, function() {
            Util.textarea.moveCursor(
                textarea,
                // We want to put the cursor after the widget
                // and after any added newlines
                newContent.length - postlude.length
            );
        });
    },

    _addWidget: function(widgetType) {
        var textarea = this.refs.textarea.getDOMNode();
        this._addWidgetToContent(
            this.props.content,
            [textarea.selectionStart, textarea.selectionEnd],
            widgetType
        );
        textarea.focus();
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
        } else if (templateType === "titledTable") {
            template = "|| **Table title** ||\n" +
                       "header 1 | header 2 | header 3\n" +
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

    serialize: function(options) {
        // need to serialize the widgets since the state might not be
        // completely represented in props. ahem //transformer// (and
        // interactive-graph and plotter).
        var widgets = {};
        var widgetIds = _.intersection(this.widgetIds, _.keys(this.refs));
        _.each(widgetIds, id => {
            widgets[id] = this.refs[id].serialize();
        });

        // Preserve the data associated with deleted widgets in their last
        // modified form. This is only intended to be useful in the context of
        // immediate cut and paste operations if Editor.serialize() is called
        // in between the two (which ideally should not be happening).
        // TODO(alex): Remove this once all widget.serialize() methods
        //             have been fixed to only return props,
        //             and the above no longer applies.
        if (options && options.keepDeletedWidgets) {
            _.chain(this.props.widgets)
                .keys()
                .reject((id) => _.contains(widgetIds, id))
                .each((id) => { widgets[id] = this.props.widgets[id]; });
        }

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
