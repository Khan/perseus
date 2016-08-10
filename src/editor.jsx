/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, no-console, no-var, object-curly-spacing, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */
/* globals katex */

var React = require('react');
var ReactDOM = require("react-dom");
var ReactCreateFragment = require("react-addons-create-fragment");
var $ = require('jquery');
var _ = require("underscore");

var ApiOptions = require("./perseus-api.jsx").Options;
var DragTarget = require("react-components/drag-target.jsx");
var {iconChevronDown, iconChevronRight, iconTrash} =
    require("./icon-paths.js");
var InlineIcon = require("./components/inline-icon.jsx");
var KatexErrorView = require("./katex-error-view.jsx");
var PerseusMarkdown = require("./perseus-markdown.jsx");
var PropCheckBox = require("./components/prop-check-box.jsx");
var Util = require("./util.js");
var Widgets = require("./widgets.js");
var preprocessTex = require("./util/katex-preprocess.js");

var WIDGET_PROP_BLACKLIST = require("./mixins/widget-prop-blacklist.jsx");

// like [[snowman input-number 1]]
var widgetPlaceholder = "[[\u2603 {id}]]";
var widgetRegExp = "(\\[\\[\u2603 {id}\\]\\])";
var rWidgetSplit = new RegExp(widgetRegExp.replace('{id}', '[a-z-]+ [0-9]+'),
                              'g');

var shortcutRegexp = /^\[\[([a-z\-]+)$/;// like [[nu, [[int, etc

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

    render: function() {
        var widgets = Widgets.getPublicWidgets();
        var orderedWidgetNames = _.sortBy(_.keys(widgets), (name) => {
            return widgets[name].displayName;
        });
        var addWidgetString = "Add a widget\u2026";
        return <select value="" onChange={this.handleChange}>
            <option value="">{addWidgetString}</option>
            <option disabled>--</option>
            {_.map(orderedWidgetNames, (name) => {
                return <option key={name} value={name}>
                    {widgets[name].displayName}
                </option>;
            })}
        </select>;
    },
});

// This component handles upgading widget editor props via prop
// upgrade transforms. Widget editors will always be rendered
// with all available transforms applied, but the results of those
// transforms will not be propogated upwards until serialization.
var WidgetEditor = React.createClass({
    propTypes: {
        // Unserialized props
        id: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onRemove: React.PropTypes.func.isRequired,
        apiOptions: ApiOptions.propTypes,

        // Serialized props
        type: React.PropTypes.string.isRequired,
        alignment: React.PropTypes.string,
        static: React.PropTypes.bool,
        graded: React.PropTypes.bool,
        options: React.PropTypes.any,
        version: React.PropTypes.shape({
            major: React.PropTypes.number.isRequired,
            minor: React.PropTypes.number.isRequired,
        }),
    },

    getInitialState: function() {
        return {
            showWidget: false,
        };
    },

    componentWillMount: function() {
        this._upgradeWidgetInfo(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        this._upgradeWidgetInfo(nextProps);
    },

    _upgradeWidgetInfo: function(props) {
        // We can't call serialize here because this.refs.widget
        // doesn't exist before this component is mounted.
        var filteredProps = _.omit(props, WIDGET_PROP_BLACKLIST);
        var info = Widgets.upgradeWidgetInfoToLatestVersion(filteredProps);
        this.setState({
            widgetInfo: info,
        });
    },

    _toggleWidget: function(e) {
        e.preventDefault();
        this.setState({showWidget: !this.state.showWidget});
    },

    _handleWidgetChange: function(newProps, cb, silent) {
        var newWidgetInfo = _.clone(this.state.widgetInfo);
        newWidgetInfo.options = _.extend(
            this.refs.widget.serialize(),
            newProps
        );
        this.props.onChange(newWidgetInfo, cb, silent);
    },

    _toggleStatic: function(e) {
        e.preventDefault();
        var newWidgetInfo = _.extend({}, this.state.widgetInfo, {
            static: !this.state.widgetInfo.static,
        });
        this.props.onChange(newWidgetInfo);
    },

    _handleAlignmentChange: function(e) {
        var newAlignment = e.target.value;
        var newWidgetInfo = _.clone(this.state.widgetInfo);
        newWidgetInfo.alignment = newAlignment;
        this.props.onChange(newWidgetInfo);
    },

    render: function() {
        var widgetInfo = this.state.widgetInfo;

        var Ed = Widgets.getEditor(widgetInfo.type);
        var supportedAlignments;
        if (this.props.apiOptions.showAlignmentOptions) {
            supportedAlignments =
                Widgets.getSupportedAlignments(widgetInfo.type);
        } else {
            supportedAlignments = ["default"];
        }

        var supportsStaticMode = Widgets.supportsStaticMode(widgetInfo.type);

        var isUngradedEnabled = (widgetInfo.type === "transformer");
        var gradedPropBox = <PropCheckBox
            label="Graded:"
            graded={widgetInfo.graded}
            onChange={this.props.onChange}
        />;

        return <div className="perseus-widget-editor">
            <div
                className={"perseus-widget-editor-title " +
                    (this.state.showWidget ? "open" : "closed")}
            >
                <a
                    className="perseus-widget-editor-title-id"
                    href="#"
                    onClick={this._toggleWidget}
                >
                    {this.props.id}
                    {this.state.showWidget
                        ? <InlineIcon {...iconChevronDown} />
                        : <InlineIcon {...iconChevronRight} />
                    }
                </a>

                {supportsStaticMode &&
                    <input
                        type="button"
                        onClick={this._toggleStatic}
                        className="simple-button--small"
                        value={widgetInfo.static ?
                            "Unset as static" : "Set as static"}
                    />
                }
                {supportedAlignments.length > 1 &&
                    <select
                        className="alignment"
                        value={widgetInfo.alignment}
                        onChange={this._handleAlignmentChange}
                    >
                        {supportedAlignments.map((alignment) =>
                            <option key={alignment}>{alignment}</option>
                        )}
                    </select>
                }
                <a
                    href="#"
                    className={
                            "remove-widget " +
                            "simple-button simple-button--small orange"
                        }
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.onRemove();
                    }}
                >
                    <InlineIcon {...iconTrash} />
                </a>
            </div>
            <div
                className={"perseus-widget-editor-content " +
                    (this.state.showWidget ? "enter" : "leave")}
            >
                {isUngradedEnabled && gradedPropBox}
                <Ed
                    ref="widget"
                    onChange={this._handleWidgetChange}
                    static={widgetInfo.static}
                    apiOptions={this.props.apiOptions}
                    {...widgetInfo.options}
                />
            </div>
        </div>;
    },

    getSaveWarnings: function() {
        var issuesFunc = this.refs.widget.getSaveWarnings;
        return issuesFunc ? issuesFunc() : [];
    },

    serialize: function() {
        // TODO(alex): Make this properly handle the case where we load json
        // with a more recent widget version than this instance of Perseus
        // knows how to handle.
        var widgetInfo = this.state.widgetInfo;
        return {
            type: widgetInfo.type,
            alignment: widgetInfo.alignment,
            static: widgetInfo.static,
            graded: widgetInfo.graded,
            options: this.refs.widget.serialize(),
            version: widgetInfo.version,
        };
    },
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
    while (true) { // @Nolint
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
        apiOptions: ApiOptions.propTypes,
        imageUploader: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            content: "",
            placeholder: "",
            widgets: {},
            images: {},
            disabled: false,
            widgetEnabled: true,
            immutableWidgets: false,
            showWordCount: false,
            warnNoPrompt: false,
            warnNoWidgets: false,
        };
    },

    getInitialState: function() {
        return {
            showKatexErrors: false,
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
            {...this.props.widgets[id]}
        />;
    },

    _handleWidgetEditorChange: function(id, newProps, cb, silent) {
        var widgets = _.clone(this.props.widgets);
        widgets[id] = _.extend({}, widgets[id], newProps);
        this.props.onChange({widgets: widgets}, cb, silent);
    },

    _handleWidgetEditorRemove: function(id) {
        var re = new RegExp(widgetRegExp.replace('{id}', id), 'gm');
        var textarea = ReactDOM.findDOMNode(this.refs.textarea);

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
                    height: height,
                };
                props.onChange(
                    {
                        images: _.clone(images),
                    },
                    null, // callback
                    true  // silent
                );
            });
        });
    },
    componentDidMount: function() {
        // This can't be in componentWillMount because that's happening during
        // the middle of our parent's render, so we can't call
        // this.props.onChange during that, since it calls our parent's
        // setState
        this._sizeImages(this.props);

        $(ReactDOM.findDOMNode(this.refs.textarea))
            .on('copy cut', this._maybeCopyWidgets)
            .on('paste', this._maybePasteWidgets);
    },

    componentDidUpdate: function(prevProps) {
        // TODO(alpert): Maybe fix React so this isn't necessary
        var textarea = ReactDOM.findDOMNode(this.refs.textarea);
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
                            fileAndSentinel.sentinel, url),
                    });
                });
            });
    },

    handleChange: function() {
        var textarea = ReactDOM.findDOMNode(this.refs.textarea);
        this.props.onChange({content: textarea.value});
    },

    _handleKeyDown: function(e) {
        // Tab-completion of widgets. For example, to insert an image:
        // type `[[im`, then tab.
        if (e.key === "Tab") {
            var textarea = ReactDOM.findDOMNode(this.refs.textarea);

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

    _maybeCopyWidgets: function(e) {
        // If there are widgets being cut/copied, put the widget JSON in
        // localStorage.perseusLastCopiedWidgets to allow copy-pasting of
        // widgets between Editors. Also store the text to be pasted in
        // localStorage.perseusLastCopiedText since we want to know if the user
        // is actually pasting something originally from Perseus later.
        var textarea = e.target;
        var selectedText = textarea.value.substring(
            textarea.selectionStart,
            textarea.selectionEnd
        );

        var widgetNames = _.map(selectedText.match(rWidgetSplit), (syntax) => {
            return Util.rWidgetParts.exec(syntax)[1];
        });

        var widgetData = _.pick(this.serialize().widgets, widgetNames);

        localStorage.perseusLastCopiedText = selectedText;
        localStorage.perseusLastCopiedWidgets = JSON.stringify(widgetData);

        console.log(
            `Widgets copied: ${localStorage.perseusLastCopiedWidgets}`);
    },

    _maybePasteWidgets: function(e) {
        // Use the data from localStorage to paste any widgets we copied
        // before. Avoid name conflicts by renumbering pasted widgets so that
        // their numbers are always higher than the highest numbered widget of
        // their type.
        // TODO(sam): Fix widget numbering in the widget editor titles

        var widgetJSON = localStorage.perseusLastCopiedWidgets;
        var lastCopiedText = localStorage.perseusLastCopiedText;
        var textToBePasted = e.originalEvent.clipboardData.getData('text');

        // Only intercept if we have widget data to paste and the user is
        // pasting something originally from Perseus.
        // TODO(sam/aria/alex): Make it so that you can paste arbitrary text
        // (e.g. from a text editor) instead of exactly what was copied, and
        // let the widgetJSON match up with it. This would let you copy text
        // into a buffer, perform complex operations on it, then paste it back.
        if (widgetJSON && lastCopiedText === textToBePasted) {
            e.preventDefault();

            var widgetData = JSON.parse(widgetJSON);
            var safeWidgetMapping = this._safeWidgetNameMapping(widgetData);

            // Use safe widget name map to construct the new widget data
            // TODO(aria/alex): Don't use `rWidgetSplit` or other piecemeal
            // regexes directly; abstract this out so that we don't have to
            // worry about potential edge cases.
            var safeWidgetData = {};
            for (const [key, data] of Object.entries(widgetData)) {
                safeWidgetData[safeWidgetMapping[key]] = data;
            }
            var newWidgets = _.extend(safeWidgetData, this.props.widgets);

            // Use safe widget name map to construct new text
            var safeText = lastCopiedText.replace(rWidgetSplit, (syntax) => {
                var match = Util.rWidgetParts.exec(syntax);
                var completeWidget = match[0];
                var widget = match[1];
                return completeWidget.replace(
                    widget, safeWidgetMapping[widget]);
            });

            // Add pasted text to previous content, replacing selected text to
            // replicate normal paste behavior.
            var textarea = e.target;
            var selectionStart = textarea.selectionStart;
            var newContent =
                this.props.content.substr(0, selectionStart) +
                safeText +
                this.props.content.substr(textarea.selectionEnd);

            this.props.onChange({content: newContent, widgets: newWidgets},
                () => {
                    var expectedCursorPosition =
                        selectionStart + safeText.length;
                    Util.textarea.moveCursor(textarea, expectedCursorPosition);
                });
        }
    },

    _safeWidgetNameMapping: function(widgetData) {
        // Helper function for _maybePasteWidgets.
        // For each widget about to be pasted, construct a mapping from
        // old widget name to a new widget name that doesn't have conflicts
        // with widgets already in the editor.
        // eg. If there is an "image 2" already present in the editor and we're
        // about to paste in two new images, return
        // { "image 1": "image 3", "image 2": "image 4" }

        // List of widgets about to be pasted as [[name, number], ...]
        var widgets = _.keys(widgetData).map((name) => name.split(' '));
        var widgetTypes = _.uniq(widgets.map((widget) => widget[0]));

        // List of existing widgets as [[name, number], ...]
        var existingWidgets = _.keys(this.props.widgets)
            .map((name) => name.split(' '));

        // Mapping of widget type to a safe (non-conflicting) number
        // eg. { "image": 2, "dropdown": 1 }
        var safeWidgetNums = {};
        _.each(widgetTypes, (type) => {
            safeWidgetNums[type] = _.chain(existingWidgets)
                .filter((existingWidget) => existingWidget[0] === type)
                .map((existingWidget) => +existingWidget[1] + 1)
                .max()
                .value();
            // If there are no existing widgets _.max returns -Infinity
            safeWidgetNums[type] = Math.max(safeWidgetNums[type], 1);
        });

        // Construct mapping, incrementing the vals in safeWidgetNums as we go
        var safeWidgetMapping = {};
        _.each(widgets, (widget) => {
            var widgetName = widget.join(' ');
            var widgetType = widget[0];

            safeWidgetMapping[widgetName] =
                `${widgetType} ${safeWidgetNums[widgetType]}`;
            safeWidgetNums[widgetType]++;
        });

        return safeWidgetMapping;
    },

    _addWidgetToContent: function(oldContent, cursorRange, widgetType) {
        var textarea = ReactDOM.findDOMNode(this.refs.textarea);

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
        var isBlock = Widgets.getDefaultAlignment(widgetType) === "block";

        var prelude = oldContent.slice(0, cursorRange[0]);
        var postlude = oldContent.slice(cursorRange[1]);

        var newPrelude = isBlock ?
            makeEndWithAParagraphIfNecessary(prelude) :
            prelude;
        var newPostlude = isBlock ?
            makeStartWithAParagraphAlways(postlude) :
            postlude;

        var newContent = newPrelude + widgetContent + newPostlude;

        var newWidgets = _.clone(this.props.widgets);
        newWidgets[id] = {
            options: Widgets.getEditor(widgetType).defaultProps,
            type: widgetType,
            // Track widget version on creation, so that a widget editor
            // without a valid version prop can only possibly refer to a
            // pre-versioning creation time.
            version: Widgets.getVersion(widgetType),
        };

        this.props.onChange({
            content: newContent,
            widgets: newWidgets,
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
        var textarea = ReactDOM.findDOMNode(this.refs.textarea);
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
        } else if (templateType === "allWidgets") {
            template = Widgets.getAllWidgetTypes()
                              .map(type => `[[${Util.snowman} ${type} 1]]`)
                              .join("\n\n");
        } else {
            throw new Error("Invalid template type: " + templateType);
        }

        var newContent = oldContent + template;

        this.props.onChange({content: newContent}, this.focusAndMoveToEnd);
    },

    getSaveWarnings: function() {
        var parsed = PerseusMarkdown.parse(this.props.content);
        var unescapedDollarsExist = false;

        PerseusMarkdown.traverseContent(parsed, (node) => {
            if (node.type === "unescapedDollar") {
                unescapedDollarsExist = true;
            }
        });

        var noAltImages = [];
        PerseusMarkdown.traverseContent(parsed, (node) => {
            if (node.type === "image" && !node.alt) {
                var shortUrl = node.target.length < 9 ? node.target :
                        node.target.slice(0, 3) + "..." +
                        node.target.slice(-3);

                noAltImages.push(
                    "Image '" + node.target +
                    "' doesn't have alt text: ![add alt text here](" +
                    shortUrl + ")");
            }
        });

        var widgetIds = _.intersection(this.widgetIds, _.keys(this.refs));
        var widgetWarnings = _(widgetIds)
            .chain()
            .map(id => {
                var issuesFunc = this.refs[id].getSaveWarnings;
                var issues = issuesFunc ? issuesFunc() : [];
                return _.map(issues, (issue) => (id + ": " + issue));
            })
            .flatten(true)
            .value();

        var warnings = noAltImages.concat(widgetWarnings);

        if (unescapedDollarsExist) {
            warnings.unshift(
                "This content is UNTRANSLATABLE because there are" +
                ' "unescaped" $ signs outside of math expressions.' +
                " Please substitute $ -> \\$ where appropriate."
            );
        }

        return warnings;
    },

    focus: function() {
        ReactDOM.findDOMNode(this.refs.textarea).focus();
    },

    focusAndMoveToEnd: function() {
        this.focus();
        var textarea = ReactDOM.findDOMNode(this.refs.textarea);
        textarea.selectionStart = textarea.value.length;
        textarea.selectionEnd = textarea.value.length;
    },

    render: function() {
        var pieces;
        var widgets;
        var underlayPieces;
        var widgetsDropDown;
        var templatesDropDown;
        var widgetsAndTemplates;
        var wordCountDisplay;
        var katexErrorList = [];

        if (this.props.showWordCount) {
            var numChars = PerseusMarkdown.characterCount(this.props.content);
            var numWords = Math.floor(numChars / 6);
            wordCountDisplay = <span
                className="perseus-editor-word-count"
                title={'~' + commafyInteger(numWords) + ' words (' +
                             commafyInteger(numChars) + ' characters)'}
            >
                {commafyInteger(numWords)}
            </span>;
        }

        if (this.props.widgetEnabled) {
            pieces = Util.split(this.props.content, rWidgetSplit);
            widgets = {};
            underlayPieces = [];

            for (var i = 0; i < pieces.length; i++) {
                if (i % 2 === 0) {
                    // Normal text
                    underlayPieces.push(pieces[i]);

                    const ast = PerseusMarkdown.parse(pieces[i]);

                    PerseusMarkdown.traverseContent(ast, (node) => {
                        if (node.type === 'math' || node.type === 'blockMath') {
                            const content = preprocessTex(node.content);
                            try {
                                katex.renderToString(content);
                            } catch (e) {
                                katexErrorList.push({
                                    math: content,
                                    message: e.message,
                                });
                            }
                        }
                    });

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
            widgetsDropDown = <WidgetSelect
                ref="widgetSelect"
                onChange={this._addWidget}
            />;

            var insertTemplateString = "Insert template\u2026";
            templatesDropDown = <select onChange={this.addTemplate}>
                <option value="">{insertTemplateString}</option>
                <option disabled>--</option>
                <option value="table">Table</option>
                <option value="titledTable">Titled table</option>
                <option value="alignment">Aligned equations</option>
                <option value="piecewise">Piecewise function</option>
                <option disabled>--</option>
                <option value="allWidgets">All widgets (for testing)</option>
            </select>;

            if (!this.props.immutableWidgets) {
                widgetsAndTemplates = <div className="perseus-editor-widgets">
                    <div className="perseus-editor-widgets-selectors">
                        {widgetsDropDown}
                        {templatesDropDown}
                        {wordCountDisplay}
                    </div>
                    {ReactCreateFragment(widgets)}
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
            <div
                className="perseus-textarea-underlay"
                ref="underlay"
                key="underlay"
            >
                {underlayPieces}
            </div>,
            <textarea
                ref="textarea"
                key="textarea"
                onChange={this.handleChange}
                onKeyDown={this._handleKeyDown}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                value={this.props.content}
            />,
        ];
        var textareaWrapper;
        if (this.props.imageUploader) {
            textareaWrapper = <DragTarget
                onDrop={this.handleDrop}
                className="perseus-textarea-pair"
            >
                {completeTextarea}
            </DragTarget>;
        } else {
            textareaWrapper = <div className="perseus-textarea-pair">
                {completeTextarea}
            </div>;
        }

        var contentWithoutWidgets = this.props.content.replace(
            /\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]/g, '');
        var noPrompt = contentWithoutWidgets.trim().length === 0;
        var noWidgets =
            !/\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]/g.test(this.props.content);

        var warningStyle = {
            borderTop: 'none',
            padding: 4,
            backgroundColor: 'pink',
        };

        return <div
            className={"perseus-single-editor " + (this.props.className || "")}
        >
            {textareaWrapper}
            {katexErrorList.length > 0 &&
                <KatexErrorView errorList={katexErrorList}/>}
            {this.props.warnNoPrompt && noPrompt &&
                <div style={warningStyle}>
                    Graded Groups should contain a prompt
                </div>}
            {this.props.warnNoWidgets && noWidgets &&
                <div style={warningStyle}>
                    Graded Groups should contain at least one widget
                </div>}
            {wordCountDisplay}
            {widgetsAndTemplates}
        </div>;
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
            replace: this.props.replace,
            content: this.props.content,
            images: this.props.images,
            widgets: widgets,
        };
    },
});

module.exports = Editor;
