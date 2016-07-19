webpackJsonpPerseus([1],Array(55).concat([
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* globals true */

	// As new widgets get added here, please also make sure they get added in
	// webapp perseus/traversal.py so they can be properly translated.
	module.exports = [[__webpack_require__(91), true && __webpack_require__(92)], [__webpack_require__(93), true && __webpack_require__(94)], [__webpack_require__(95), true && __webpack_require__(96)], [__webpack_require__(97), true && __webpack_require__(98)], [__webpack_require__(99), true && __webpack_require__(100)], [__webpack_require__(101), true && __webpack_require__(102)], [__webpack_require__(103), true && __webpack_require__(104)], [__webpack_require__(105), true && __webpack_require__(106)], [__webpack_require__(107), true && __webpack_require__(108)], [__webpack_require__(109), true && __webpack_require__(110)], [__webpack_require__(111), true && __webpack_require__(112)], [__webpack_require__(113), true && __webpack_require__(114)], [__webpack_require__(115), true && __webpack_require__(116)], [__webpack_require__(117), true && __webpack_require__(118)], [__webpack_require__(119), true && __webpack_require__(120)], [__webpack_require__(121), true && __webpack_require__(122)], [__webpack_require__(123), true && __webpack_require__(124)], [__webpack_require__(125), true && __webpack_require__(126)], [__webpack_require__(127), true && __webpack_require__(128)], [__webpack_require__(129), true && __webpack_require__(130)], [__webpack_require__(131), true && __webpack_require__(132)], [__webpack_require__(133), true && __webpack_require__(134)], [__webpack_require__(135), true && __webpack_require__(136)], [__webpack_require__(137), true && __webpack_require__(138)], [__webpack_require__(139), true && __webpack_require__(140)], [__webpack_require__(141), true && __webpack_require__(142)], [__webpack_require__(143), true && __webpack_require__(144)], [__webpack_require__(145), true && __webpack_require__(146)], [__webpack_require__(147), true && __webpack_require__(148)], [__webpack_require__(149), true && __webpack_require__(150)],
	// These widgets are only used when testing things, so remove them in the
	// non-editor bundle.
	true && [__webpack_require__(151), __webpack_require__(152)], true && [__webpack_require__(153), __webpack_require__(154)], true && [__webpack_require__(155), __webpack_require__(156)]];

/***/ },
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _fullBleedContainer, _responsiveSpan;

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-undef, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var _require = __webpack_require__(53);

	var StyleSheet = _require.StyleSheet;
	var css = _require.css;

	var React = __webpack_require__(19);
	var classNames = __webpack_require__(54);
	var Changeable = __webpack_require__(172);
	var WidgetJsonifyDeprecated = __webpack_require__(183);
	var _ = __webpack_require__(20);

	var ApiClassNames = __webpack_require__(7).ClassNames;
	var ApiOptions = __webpack_require__(7).Options;

	var _require2 = __webpack_require__(39);

	var iconCircle = _require2.iconCircle;
	var iconCircleThin = _require2.iconCircleThin;

	var InlineIcon = __webpack_require__(40);
	var Renderer = __webpack_require__(30);
	var Util = __webpack_require__(8);
	var mediaQueries = __webpack_require__(184);
	var sharedStyles = __webpack_require__(185);

	var Categorizer = React.createClass({
	    displayName: "Categorizer",

	    mixins: [WidgetJsonifyDeprecated, Changeable],

	    propTypes: {
	        apiOptions: ApiOptions.propTypes,

	        // List of categories (across the top)
	        categories: React.PropTypes.arrayOf(React.PropTypes.string),
	        // List of items that are being categorized (along the left side)
	        items: React.PropTypes.arrayOf(React.PropTypes.string),
	        trackInteraction: React.PropTypes.func.isRequired,
	        // Ordered list of correct answers, mapping items to categories thusly:
	        //   values[<items_index>] == <categories_index>
	        values: React.PropTypes.arrayOf(React.PropTypes.number)
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            items: [],
	            categories: [],
	            values: []
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            uniqueId: _.uniqueId("perseus_radio_")
	        };
	    },

	    render: function render() {
	        var _this = this;

	        var self = this;

	        var responsive = this.props.apiOptions.responsiveStyling && this.props.apiOptions.xomManatee;
	        var indexedItems = this.props.items.map(function (item, n) {
	            return [item, n];
	        });
	        if (this.props.randomizeItems) {
	            indexedItems = Util.shuffle(indexedItems, this.props.problemNum);
	        }

	        var table = React.createElement(
	            "table",
	            { className: "categorizer-table" },
	            React.createElement(
	                "thead",
	                null,
	                React.createElement(
	                    "tr",
	                    null,
	                    React.createElement(
	                        "th",
	                        null,
	                        " "
	                    ),
	                    this.props.categories.map(function (category, i) {
	                        // Array index is the correct key here, as that's how
	                        // category grading actually works -- no way to add or
	                        // remove categories or items in the middle. (If we later
	                        // add that, this should be fixed.)
	                        return React.createElement(
	                            "th",
	                            { className: css(styles.header), key: i },
	                            React.createElement(Renderer, { content: category })
	                        );
	                    })
	                )
	            ),
	            React.createElement(
	                "tbody",
	                null,
	                indexedItems.map(function (indexedItem) {
	                    var item = indexedItem[0];
	                    var itemNum = indexedItem[1];
	                    var uniqueId = self.state.uniqueId + "_" + itemNum;
	                    return React.createElement(
	                        "tr",
	                        { key: itemNum },
	                        React.createElement(
	                            "td",
	                            null,
	                            React.createElement(Renderer, { content: item })
	                        ),
	                        _.range(self.props.categories.length).map(function (catNum) {
	                            var selected = self.props.values[itemNum] === catNum;
	                            return React.createElement(
	                                "td",
	                                {
	                                    className: "category " + css(styles.cell, responsive && styles.responsiveCell),
	                                    key: catNum
	                                },
	                                React.createElement(
	                                    "div",
	                                    { className: ApiClassNames.INTERACTIVE,
	                                        onClick: _this.onChange.bind(_this, itemNum, catNum) },
	                                    React.createElement("input", {
	                                        type: "radio",
	                                        name: uniqueId,
	                                        className: css(responsive && sharedStyles.responsiveInput, responsive && sharedStyles.responsiveRadioInput, styles.radioInput),
	                                        checked: selected,
	                                        onChange: _this.onChange.bind(_this, itemNum, catNum),
	                                        onClick: function onClick(e) {
	                                            return e.stopPropagation();
	                                        }
	                                    }),
	                                    React.createElement(
	                                        "span",
	                                        {
	                                            className: css(responsive && styles.responsiveSpan, styles.radioSpan, selected && styles.checkedRadioSpan, _this.props.static && selected && styles.staticCheckedRadioSpan)
	                                        },
	                                        selected ? React.createElement(InlineIcon, iconCircle) : React.createElement(InlineIcon, iconCircleThin)
	                                    )
	                                )
	                            );
	                        })
	                    );
	                })
	            )
	        );

	        // TODO(benkomalo): kill CSS-based styling and move everything to
	        // aphrodite.
	        var extraClassNames = classNames({
	            "categorizer-container": true,
	            "static-mode": this.props.static
	        });
	        var inlineStyles = this.props.apiOptions.xomManatee ? [styles.fullBleedContainer] : [];

	        return React.createElement(
	            "div",
	            { className: extraClassNames + ' ' + css.apply(undefined, inlineStyles) },
	            table
	        );
	    },

	    onChange: function onChange(itemNum, catNum) {
	        var values = _.clone(this.props.values);
	        values[itemNum] = catNum;
	        this.change("values", values);
	        this.props.trackInteraction();
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Categorizer.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Categorizer, {
	    validate: function validate(state, rubric) {
	        var completed = true;
	        var allCorrect = true;
	        _.each(rubric.values, function (value, i) {
	            if (state.values[i] == null) {
	                completed = false;
	            }
	            if (state.values[i] !== value) {
	                allCorrect = false;
	            }
	        });
	        if (!completed) {
	            return {
	                type: "invalid",
	                message: i18n._("Make sure you select something for every row.")
	            };
	        }
	        return {
	            type: "points",
	            earned: allCorrect ? 1 : 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	// TODO(benkomalo): inject page-margin into Perseus instead of hardcoding.
	var pageMargin = 16;
	var styles = StyleSheet.create({
	    fullBleedContainer: (_fullBleedContainer = {}, _fullBleedContainer[mediaQueries.mdOrSmaller] = {
	        marginLeft: -pageMargin,
	        marginRight: -pageMargin,
	        overflowX: 'auto'
	    }, _fullBleedContainer),

	    header: {
	        textAlign: 'center',
	        verticalAlign: 'bottom'
	    },

	    cell: {
	        textAlign: 'center',
	        padding: 0,
	        color: '#ccc',
	        verticalAlign: 'middle'
	    },

	    // Legacy styling?
	    // TODO(jared): remove when XOM is done

	    radioInput: {
	        display: 'none'
	    },

	    radioSpan: {
	        fontSize: 30,
	        paddingRight: 3,

	        ':hover': {
	            color: '#999'
	        }
	    },

	    checkedRadioSpan: {
	        color: '#333'
	    },

	    // .static-mode is applied by the Categorizer when the rendered
	    // widget is static; in this case we gray out the choices to show
	    // the user that the widget can't be interacted with.
	    staticCheckedRadioSpan: {
	        color: '#888'
	    },

	    // New (XOM) Styling

	    responsiveSpan: (_responsiveSpan = {}, _responsiveSpan[mediaQueries.smOrSmaller] = {
	        display: 'none'
	    }, _responsiveSpan)
	});

	module.exports = {
	    name: "categorizer",
	    displayName: "Categorizer",
	    widget: Categorizer,
	    transform: function transform(editorProps) {
	        return _.pick(editorProps, "items", "categories", "randomizeItems");
	    },
	    staticTransform: function staticTransform(editorProps) {
	        return _.pick(editorProps, "items", "categories", "values", "randomizeItems");
	    }
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, comma-dangle, indent, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var Changeable = __webpack_require__(172);
	var _ = __webpack_require__(20);

	var ApiOptions = __webpack_require__(7).Options;
	var EditorJsonify = __webpack_require__(173);
	var PropCheckBox = __webpack_require__(47);
	var TextListEditor = __webpack_require__(65);

	var Categorizer = __webpack_require__(91).widget;

	var CategorizerEditor = React.createClass({
	    displayName: "CategorizerEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        apiOptions: ApiOptions.propTypes,
	        items: React.PropTypes.arrayOf(React.PropTypes.string),
	        categories: React.PropTypes.arrayOf(React.PropTypes.string),
	        values: React.PropTypes.arrayOf(React.PropTypes.number),
	        randomizeItems: React.PropTypes.bool
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            items: [],
	            categories: [],
	            values: [],
	            randomizeItems: false
	        };
	    },

	    render: function render() {
	        var _this = this;

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(PropCheckBox, {
	                    label: "Randomize item order",
	                    labelAlignment: "right",
	                    randomizeItems: this.props.randomizeItems,
	                    onChange: this.props.onChange })
	            ),
	            "Categories:",
	            React.createElement(TextListEditor, {
	                options: this.props.categories,
	                onChange: function onChange(cat) {
	                    _this.change("categories", cat);
	                },
	                layout: "horizontal" }),
	            "Items:",
	            React.createElement(TextListEditor, {
	                options: this.props.items,
	                onChange: function onChange(items) {
	                    _this.change({
	                        items: items,
	                        // TODO(eater): This truncates props.values so there
	                        // are never more correct answers than items, ensuring
	                        // the widget is possible to answer correctly.
	                        // It doesn't necessarly keep each answer with
	                        // its corresponding item if an item is deleted from
	                        // the middle. Inconvenient, but it's at least possible
	                        // for content creators to catch and fix.
	                        values: _.first(_this.props.values, items.length)
	                    });
	                },
	                layout: "vertical" }),
	            React.createElement(Categorizer, {
	                apiOptions: this.props.apiOptions,
	                items: this.props.items,
	                categories: this.props.categories,
	                values: this.props.values,
	                onChange: function onChange(newProps) {
	                    _this.props.onChange(newProps);
	                },
	                trackInteraction: function trackInteraction() {}
	            })
	        );
	    }
	});

	module.exports = CategorizerEditor;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/**
	 * This widget is for embedding Khan Academy CS programs.
	 */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var updateQueryString = __webpack_require__(8).updateQueryString;

	var PADDING_WIDTH = 2;

	var IS_KA_SITE = /khanacademy\.org/;
	var KA_EMBED_URL = "https://{hostname}/computer-programming/program/" + "{programID}/embedded?embed=yes&author=no";

	function getUrlFromProgramID(programID) {
	    var url = KA_EMBED_URL.replace("{programID}", programID);
	    var currentHostname = document.location.hostname;
	    var embedHostname = "www.khanacademy.org";
	    if (IS_KA_SITE.test(currentHostname)) {
	        embedHostname = currentHostname;
	    }
	    return url.replace("{hostname}", embedHostname);
	}

	/* This renders the scratchpad in an iframe and handles validation via
	 * window.postMessage */
	var CSProgram = React.createClass({
	    displayName: "CSProgram",


	    mixins: [Changeable],

	    propTypes: {
	        programID: React.PropTypes.string,
	        width: React.PropTypes.number,
	        height: React.PropTypes.number,
	        settings: React.PropTypes.array,
	        showEditor: React.PropTypes.bool,
	        showButtons: React.PropTypes.bool,
	        status: React.PropTypes.oneOf(['incomplete', 'incorrect', 'correct']),
	        message: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            showEditor: false,
	            showButtons: false,
	            status: "incomplete",
	            // optional message
	            message: null
	        };
	    },

	    handleMessageEvent: function handleMessageEvent(e) {
	        // We receive data from the iframe that contains {passed: true/false}
	        //  and use that to set the status
	        // It could also contain an optional message
	        var data = {};
	        try {
	            data = JSON.parse(e.originalEvent.data);
	        } catch (err) {
	            return;
	        }

	        if (_.isUndefined(data.testsPassed)) {
	            return;
	        }

	        var status = data.testsPassed ? "correct" : "incorrect";
	        this.change({
	            status: status,
	            message: data.message
	        });
	    },

	    componentDidMount: function componentDidMount() {
	        $(window).on("message", this.handleMessageEvent);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        $(window).off("message", this.handleMessageEvent);
	    },

	    render: function render() {
	        if (!this.props.programID) {
	            return React.createElement("div", null);
	        }

	        var url = getUrlFromProgramID(this.props.programID);
	        var className;
	        var style = {
	            height: this.props.height
	        };

	        if (this.props.showEditor) {
	            url += "&editor=yes";
	            style.width = "100%";
	            className = "perseus-scratchpad-editor";
	        } else {
	            url += "&editor=no";
	            style.width = this.props.width + PADDING_WIDTH;
	            className = "perseus-scratchpad";
	        }

	        if (this.props.showButtons) {
	            url += "&buttons=yes";
	            style.height += 50;
	        } else {
	            url += "&buttons=no";
	        }

	        // Turn array of [{name: "", value: ""}] into object
	        if (this.props.settings) {
	            var settings = {};
	            _.each(this.props.settings, function (setting) {
	                if (setting.name && setting.value) {
	                    settings[setting.name] = setting.value;
	                }
	            });
	            // This becomes available to programs as Program.settings()
	            url = updateQueryString(url, "settings", JSON.stringify(settings));
	        }

	        // We sandbox the iframe so that we whitelist only the functionality
	        //  that we need. This makes it a bit safer in case some content
	        //  creator "went wild".
	        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
	        return React.createElement("iframe", { sandbox: "allow-same-origin allow-scripts",
	            src: url,
	            style: style,
	            className: className,
	            allowFullScreen: true });
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return CSProgram.validate({
	            status: this.props.status,
	            message: this.props.message
	        }, rubric);
	    },

	    statics: {
	        // The widget's grading function
	        validate: function validate(state, rubric) {
	            // The iframe can tell us whether it's correct or incorrect,
	            //  and pass an optional message
	            if (state.status === "correct") {
	                return {
	                    type: "points",
	                    earned: 1,
	                    total: 1,
	                    message: state.message || null
	                };
	            } else if (state.status === "incorrect") {
	                return {
	                    type: "points",
	                    earned: 0,
	                    total: 1,
	                    message: state.message || null
	                };
	            } else {
	                return {
	                    type: "invalid",
	                    message: "Keep going, you're not there yet!"
	                };
	            }
	        }
	    }
	});

	module.exports = {
	    name: "cs-program",
	    displayName: "CS Program",
	    supportedAlignments: ["block", "full-width"],
	    widget: CSProgram
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-console, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, space-before-function-paren, space-infix-ops */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var BlurInput = __webpack_require__(171);
	var InfoTip = __webpack_require__(82);
	var PropCheckBox = __webpack_require__(47);

	var DEFAULT_WIDTH = 400;
	var DEFAULT_HEIGHT = 400;

	/**
	 * This is used for editing a name/value pair.
	 */
	var PairEditor = React.createClass({
	    displayName: "PairEditor",


	    mixins: [Changeable, EditorJsonify],

	    propTypes: {
	        name: React.PropTypes.string,
	        value: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            name: "",
	            value: ""
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "fieldset",
	            { className: "pair-editor" },
	            React.createElement(
	                "label",
	                null,
	                "Name:",
	                " ",
	                React.createElement(BlurInput, { value: this.props.name,
	                    onChange: this.change("name") })
	            ),
	            React.createElement(
	                "label",
	                null,
	                " Value:",
	                " ",
	                React.createElement(BlurInput, { value: this.props.value,
	                    onChange: this.change("value") })
	            )
	        );
	    }
	});

	/**
	 * This is used for editing a set of name/value pairs.
	 */
	var PairsEditor = React.createClass({
	    displayName: "PairsEditor",


	    mixins: [Changeable, EditorJsonify],

	    propTypes: {
	        pairs: React.PropTypes.arrayOf(React.PropTypes.shape({
	            name: React.PropTypes.string,
	            value: React.PropTypes.string
	        })).isRequired
	    },

	    render: function render() {
	        var _this = this;

	        var editors = _.map(this.props.pairs, function (pair, i) {
	            return React.createElement(PairEditor, { key: i, name: pair.name, value: pair.value,
	                onChange: _this.handlePairChange.bind(_this, i) });
	        });
	        return React.createElement(
	            "div",
	            null,
	            editors
	        );
	    },

	    handlePairChange: function handlePairChange(pairIndex, pair) {
	        // If they're both non empty, add a new one
	        var pairs = this.props.pairs.slice();
	        pairs[pairIndex] = pair;

	        var lastPair = pairs[pairs.length - 1];
	        if (lastPair.name && lastPair.value) {
	            pairs.push({ name: "", value: "" });
	        }
	        this.change("pairs", pairs);
	    }
	});

	var KA_PROGRAM_URL = /khanacademy\.org\/computer-programming\/[^\/]+\/(\d+)/;

	/**
	 * Given a program URL from the site, extract its program ID.
	 * If the input does not match the known URL patterns, it is assumed to be
	 * a program ID.
	 */
	function isolateProgramID(programUrl) {
	    var match = KA_PROGRAM_URL.exec(programUrl);
	    if (match) {
	        programUrl = match[1];
	    }

	    return programUrl;
	}

	/**
	 * This is the main editor for this widget, to specify all the options.
	 */
	var CSProgramEditor = React.createClass({
	    displayName: "CSProgramEditor",


	    mixins: [Changeable, EditorJsonify],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            programID: "",
	            settings: [{ name: "", value: "" }],
	            showEditor: false,
	            showButtons: false,
	            width: DEFAULT_WIDTH,
	            height: DEFAULT_HEIGHT
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "label",
	                null,
	                "Url or Program ID:",
	                " ",
	                React.createElement(BlurInput, { name: "programID",
	                    value: this.props.programID,
	                    onChange: this._handleProgramIDChange })
	            ),
	            React.createElement("br", null),
	            React.createElement(PropCheckBox, {
	                label: "Show Editor",
	                showEditor: this.props.showEditor,
	                onChange: this.props.onChange }),
	            React.createElement(
	                InfoTip,
	                null,
	                "If you show the editor, you should use the \"full-width\" alignment to make room for the width of the editor."
	            ),
	            React.createElement("br", null),
	            React.createElement(PropCheckBox, {
	                label: "Show Buttons",
	                showButtons: this.props.showButtons,
	                onChange: this.props.onChange }),
	            React.createElement("br", null),
	            React.createElement(
	                "label",
	                null,
	                "Settings:",
	                React.createElement(PairsEditor, { name: "settings",
	                    pairs: this.props.settings,
	                    onChange: this._handleSettingsChange }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    "Settings that you add here are available to the program as an object returned by ",
	                    React.createElement(
	                        "code",
	                        null,
	                        "Program.settings()"
	                    )
	                )
	            )
	        );
	    },

	    _handleSettingsChange: function _handleSettingsChange(settings) {
	        this.change({ settings: settings.pairs });
	    },

	    _handleProgramIDChange: function _handleProgramIDChange(programID) {
	        var _this2 = this;

	        programID = isolateProgramID(programID);

	        $.getJSON("https://www.khanacademy.org/api/internal/scratchpads/" + programID).done(function (programInfo) {
	            _this2.change({
	                width: programInfo.width,
	                height: programInfo.height,
	                programID: programID
	            });
	        }).fail(function (jqxhr, textStatus, error) {
	            console.error("Error retrieving scratchpad info for " + "program ID ", programID);
	            console.error(textStatus + ", " + error);
	            _this2.change({
	                width: DEFAULT_WIDTH,
	                height: DEFAULT_HEIGHT,
	                programID: programID
	            });
	        });
	    }
	});

	module.exports = CSProgramEditor;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var classNames = __webpack_require__(54);
	var FancySelect = __webpack_require__(186);
	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var FancyOption = FancySelect.Option;

	var ApiClassNames = __webpack_require__(7).ClassNames;
	var ApiOptions = __webpack_require__(7).Options;

	var captureScratchpadTouchStart = __webpack_require__(8).captureScratchpadTouchStart;

	var Dropdown = React.createClass({
	    displayName: "Dropdown",

	    propTypes: {
	        apiOptions: ApiOptions.propTypes,
	        choices: React.PropTypes.arrayOf(React.PropTypes.string),
	        onChange: React.PropTypes.func.isRequired,
	        placeholder: React.PropTypes.string,
	        selected: React.PropTypes.number,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            choices: [],
	            selected: 0,
	            placeholder: "",
	            apiOptions: ApiOptions.defaults
	        };
	    },

	    render: function render() {
	        var choices = this.props.choices.slice();

	        var selectClasses = classNames({
	            "perseus-widget-dropdown": true,
	            "perseus-fancy-dropdown": this.props.apiOptions.fancyDropdowns
	        });

	        if (this.props.apiOptions.fancyDropdowns) {
	            return React.createElement(
	                FancySelect,
	                {
	                    onChange: this._handleChange,
	                    className: selectClasses + " " + ApiClassNames.INTERACTIVE,
	                    value: this.props.selected },
	                React.createElement(
	                    FancyOption,
	                    { value: 0, visible: false },
	                    React.createElement(
	                        "span",
	                        { className: "placeholder" },
	                        this.props.placeholder
	                    )
	                ),
	                choices.map(function (choice, i) {
	                    // Always visible so we can animate them with css
	                    return React.createElement(
	                        FancyOption,
	                        { key: i + 1, value: i + 1, visible: true },
	                        choice
	                    );
	                })
	            );
	        } else {
	            return React.createElement(
	                "select",
	                {
	                    onChange: this._handleChangeEvent,
	                    onTouchStart: captureScratchpadTouchStart,
	                    className: selectClasses + " " + ApiClassNames.INTERACTIVE,
	                    disabled: this.props.apiOptions.readOnly,
	                    value: this.props.selected },
	                React.createElement(
	                    "option",
	                    { value: 0, disabled: true },
	                    this.props.placeholder
	                ),
	                choices.map(function (choice, i) {
	                    return React.createElement(
	                        "option",
	                        {
	                            key: "" + (i + 1),
	                            value: i + 1 },
	                        choice
	                    );
	                })
	            );
	        }
	    },

	    focus: function focus() {
	        ReactDOM.findDOMNode(this).focus();
	        return true;
	    },

	    _handleChangeEvent: function _handleChangeEvent(e) {
	        this._handleChange(parseInt(e.target.value));
	    },

	    _handleChange: function _handleChange(selected) {
	        this.props.trackInteraction();
	        this.props.onChange({ selected: selected });
	    },

	    getUserInput: function getUserInput() {
	        return { value: this.props.selected };
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Dropdown.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Dropdown, {
	    validate: function validate(state, rubric) {
	        var selected = state.value;
	        if (selected === 0) {
	            return {
	                type: "invalid",
	                message: null
	            };
	        } else {
	            var correct = rubric.choices[selected - 1].correct;
	            return {
	                type: "points",
	                earned: correct ? 1 : 0,
	                total: 1,
	                message: null
	            };
	        }
	    }
	});

	var propTransform = function propTransform(editorProps) {
	    return {
	        placeholder: editorProps.placeholder,
	        choices: _.map(editorProps.choices, function (choice) {
	            return choice.content;
	        })
	    };
	};

	module.exports = {
	    name: "dropdown",
	    displayName: "Drop down",
	    defaultAlignment: "inline-block",
	    accessible: true,
	    widget: Dropdown,
	    transform: propTransform
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, max-len, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, semi, space-before-function-paren */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var _require = __webpack_require__(39);

	var iconPlus = _require.iconPlus;
	var iconTrash = _require.iconTrash;

	var InfoTip = __webpack_require__(82);
	var InlineIcon = __webpack_require__(40);
	var EditorJsonify = __webpack_require__(173);

	var DropdownEditor = React.createClass({
	    displayName: "DropdownEditor",

	    mixins: [EditorJsonify],

	    propTypes: {
	        choices: React.PropTypes.arrayOf(React.PropTypes.shape({
	            content: React.PropTypes.string,
	            correct: React.PropTypes.bool
	        })),
	        placeholder: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            placeholder: "",
	            choices: [{
	                content: "",
	                correct: false
	            }]
	        };
	    },

	    render: function render() {
	        var dropdownGroupName = _.uniqueId("perseus_dropdown_");
	        return React.createElement(
	            "div",
	            { className: "perseus-widget-dropdown" },
	            React.createElement(
	                "div",
	                { className: "dropdown-info" },
	                "Dropdown",
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "The drop down is useful for making inequalities in a custom format. We normally use the symbols ",
	                        "<",
	                        ", ",
	                        ">",
	                        ", ≤, ≥ (in that order) which you can copy into the choices. When possible, use the \"multiple choice\" answer type instead."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "dropdown-placeholder" },
	                React.createElement("input", {
	                    type: "text",
	                    placeholder: "Placeholder value",
	                    value: this.props.placeholder,
	                    onChange: this.onPlaceholderChange }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "This value will appear as the drop down default. It should give the user some indication of the values available in the drop down itself, e.g., Yes/No/Maybe."
	                    )
	                )
	            ),
	            React.createElement("div", { className: "clearfix" }),
	            React.createElement(
	                "ul",
	                { className: "dropdown-choices" },
	                this.props.choices.map(function (choice, i) {
	                    var checkedClass = choice.correct ? 'correct' : 'incorrect';

	                    return React.createElement(
	                        "li",
	                        { key: "" + i },
	                        React.createElement(
	                            "div",
	                            null,
	                            React.createElement("input", {
	                                ref: "radio" + i,
	                                type: "radio",
	                                name: dropdownGroupName,
	                                checked: choice.correct ? "checked" : "",
	                                onChange: this.onCorrectChange.bind(this, i),
	                                value: i }),
	                            React.createElement("input", {
	                                type: "text",
	                                ref: "editor" + i,
	                                onChange: this.onContentChange.bind(this, i),
	                                className: checkedClass,
	                                value: choice.content }),
	                            React.createElement(
	                                "a",
	                                { href: "#", className: "simple-button orange",
	                                    onClick: this.removeChoice.bind(this, i) },
	                                React.createElement(
	                                    "span",
	                                    { className: "remove-choice" },
	                                    React.createElement(InlineIcon, iconTrash)
	                                )
	                            )
	                        )
	                    );
	                }, this)
	            ),
	            React.createElement(
	                "div",
	                { className: "add-choice-container" },
	                React.createElement(
	                    "a",
	                    { href: "#", className: "simple-button orange",
	                        onClick: this.addChoice },
	                    React.createElement(InlineIcon, iconPlus),
	                    ' ',
	                    "Add a choice",
	                    ' '
	                )
	            )
	        );
	    },

	    onPlaceholderChange: function onPlaceholderChange(e) {
	        var placeholder = e.target.value;
	        this.props.onChange({ placeholder: placeholder });
	    },

	    onCorrectChange: function onCorrectChange(choiceIndex) {
	        var choices = _.map(this.props.choices, function (choice, i) {
	            return _.extend({}, choice, {
	                correct: i === choiceIndex
	            });
	        });
	        this.props.onChange({ choices: choices });
	    },

	    onContentChange: function onContentChange(choiceIndex, e) {
	        var choices = this.props.choices.slice();
	        var choice = _.clone(choices[choiceIndex]);
	        choice.content = e.target.value;
	        choices[choiceIndex] = choice;
	        this.props.onChange({ choices: choices });
	    },

	    addChoice: function addChoice(e) {
	        e.preventDefault();

	        var choices = this.props.choices;
	        var blankChoice = { content: "", correct: false };
	        this.props.onChange({
	            choices: choices.concat([blankChoice])
	        }, this.focus.bind(this, choices.length));
	    },

	    removeChoice: function removeChoice(choiceIndex, e) {
	        e.preventDefault();
	        var choices = _(this.props.choices).clone();
	        choices.splice(choiceIndex, 1);
	        this.props.onChange({
	            choices: choices
	        });
	    },

	    focus: function focus(i) {
	        ReactDOM.findDOMNode(this.refs["editor" + i]).focus();
	        return true;
	    }
	});

	module.exports = DropdownEditor;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _explanationLink;

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, indent, no-var, object-curly-spacing, react/forbid-prop-types, react/jsx-closing-bracket-location, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var _require = __webpack_require__(53);

	var StyleSheet = _require.StyleSheet;
	var css = _require.css;

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var PerseusApi = __webpack_require__(7);
	var Renderer = __webpack_require__(30);
	var mediaQueries = __webpack_require__(184);
	var styleConstants = __webpack_require__(80);

	var defaultExplanationProps = {
	    showPrompt: "Explain",
	    hidePrompt: "Hide explanation",
	    explanation: "explanation goes here\n\nmore explanation",
	    widgets: {}
	};

	var Explanation = React.createClass({
	    displayName: "Explanation",

	    mixins: [Changeable],

	    propTypes: {
	        apiOptions: PerseusApi.Options.propTypes,
	        explanation: React.PropTypes.string,
	        hidePrompt: React.PropTypes.string,
	        showPrompt: React.PropTypes.string,
	        trackInteraction: React.PropTypes.func.isRequired,
	        widgets: React.PropTypes.object
	    },

	    getDefaultProps: function getDefaultProps() {
	        return defaultExplanationProps;
	    },

	    getInitialState: function getInitialState() {
	        return {
	            expanded: false,
	            contentHeight: 0
	        };
	    },

	    _onClick: function _onClick() {
	        this.setState({
	            expanded: !this.state.expanded
	        });
	        this.props.trackInteraction();
	    },

	    // After rendering, we want to measure the height of the explanation so we
	    // know what to animate the height to/from when showing/hiding the
	    // explanation.
	    _updateHeight: function _updateHeight() {
	        var contentElement = ReactDOM.findDOMNode(this.refs.content);

	        // Add up the heights of all the the child nodes
	        var contentHeight = Array.prototype.reduce.call(contentElement.childNodes, function (memo, el) {
	            return memo + (el.offsetHeight || 0);
	        }, 0);

	        // Add in padding since we're using border-box sizing.
	        contentHeight += 2 * verticalContentPadding;

	        // Only update state if the height is different, otherwise we'll end
	        // up calling componentDidUpdate in an infinite loop!
	        if (contentHeight !== this.state.contentHeight) {
	            this.setState({
	                contentHeight: contentHeight
	            });
	        }
	    },

	    componentDidMount: function componentDidMount() {
	        this._updateHeight();
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	        if (prevProps !== this.props) {
	            // Internal state only changes on height changes itself (which
	            // we wouldn't want to call _updateHeight() on), or on toggling
	            // expansion (which also doesn't affect the content height), so
	            // we only care about prop changes.
	            this._updateHeight();
	        }
	    },

	    render: function render() {
	        var xomManateeEnabled = this.props.apiOptions.xomManatee;
	        var Link = this.props.apiOptions.baseElements.Link;


	        var linkAnchor = this.state.expanded ? this.props.hidePrompt : this.props.showPrompt;
	        if (!xomManateeEnabled) {
	            linkAnchor = "[" + linkAnchor + "]";
	        }

	        return React.createElement(
	            "div",
	            { className: css(styles.container) },
	            React.createElement(
	                "div",
	                { className: css(styles.explanationLinkContainer) },
	                React.createElement(
	                    Link,
	                    {
	                        className: css(styles.explanationLink),
	                        href: this.props.apiOptions.readOnly ? null : "javascript:void(0)",
	                        onClick: this.props.apiOptions.readOnly ? null : this._onClick
	                    },
	                    linkAnchor
	                ),
	                xomManateeEnabled && this.state.expanded && React.createElement(
	                    "svg",
	                    { className: css(styles.disclosureArrow) },
	                    React.createElement("polygon", {
	                        style: { fill: backgroundColor },
	                        points: "0," + arrowHeight + " " + (arrowWidth + "," + arrowHeight + " ") + (arrowWidth / 2 + ",0")
	                    })
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: css(styles.content, xomManateeEnabled && styles.contentXom, this.state.expanded && styles.contentExpanded),
	                    style: {
	                        height: this.state.expanded ? this.state.contentHeight : 0,
	                        overflow: this.state.expanded ? "visible" : "hidden"
	                    },
	                    ref: "content"
	                },
	                React.createElement(Renderer, {
	                    apiOptions: this.props.apiOptions,
	                    content: this.props.explanation,
	                    widgets: this.props.widgets
	                })
	            )
	        );
	    },

	    getUserInput: function getUserInput() {
	        return {};
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Explanation.validate(this.getUserInput(), rubric);
	    }
	});

	var leftBorderSpacing = 23;
	var verticalContentPadding = 10;

	var arrowWidth = 30;
	var arrowHeight = 14;
	var backgroundColor = styleConstants.gray95;

	var styles = StyleSheet.create({
	    container: {
	        display: 'inline',
	        position: 'relative'
	    },

	    explanationLinkContainer: {
	        display: 'inline-block'
	    },

	    explanationLink: (_explanationLink = {
	        fontStyle: 'italic',
	        color: '#007d96'

	    }, _explanationLink[mediaQueries.xl] = {
	        fontSize: 20,
	        lineHeight: 1.1
	    }, _explanationLink[mediaQueries.lgOrSmaller] = {
	        fontSize: 17,
	        lineHeight: 1.4
	    }, _explanationLink[mediaQueries.smOrSmaller] = {
	        fontSize: 14,
	        lineHeight: 1.3
	    }, _explanationLink),

	    content: {
	        position: 'relative',
	        transition: 'all 0.1s'
	    },

	    contentExpanded: {
	        borderLeft: '5px solid #ccc',
	        marginLeft: -leftBorderSpacing,
	        paddingLeft: leftBorderSpacing,

	        paddingTop: verticalContentPadding,
	        paddingBottom: verticalContentPadding,

	        // Note: we still use arrow height as the vertical margin, even in
	        // non-XOM when there is no arrow, but it's good enough.
	        marginBottom: arrowHeight,
	        marginTop: arrowHeight
	    },

	    contentXom: {
	        background: backgroundColor,

	        // TODO(benkomalo): this is to "full bleed" the background.
	        // The actual content padding differs depending on the host
	        // container, so this needs to be fixed eventually.
	        marginLeft: styleConstants.negativePhoneMargin,
	        marginRight: styleConstants.negativePhoneMargin,
	        paddingLeft: styleConstants.phoneMargin,
	        paddingRight: styleConstants.phoneMargin
	    },

	    disclosureArrow: {
	        // HACK - positioning at "bottom: 0", doesn't actually position it to
	        // the real bottom, because the container is `inline-block`, and it
	        // seems to position it to the baseline? We put in a generous
	        // fudge factor to position it down to be flush with the content box
	        // below it.
	        bottom: -(arrowHeight + 5),
	        height: arrowHeight,
	        left: '50%',
	        marginLeft: -(arrowWidth / 2),
	        position: 'absolute',
	        width: arrowWidth
	    }
	});

	_.extend(Explanation, {
	    validate: function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "explanation",
	    displayName: "Explanation (for hints)",
	    defaultAlignment: "inline",
	    widget: Explanation,
	    transform: _.identity
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var Editor = __webpack_require__(13);
	var TextInput = __webpack_require__(176);

	var defaultExplanationProps = {
	    showPrompt: "Explain",
	    hidePrompt: "Hide explanation",
	    explanation: "explanation goes here\n\nmore explanation",
	    widgets: {}
	};

	var ExplanationEditor = React.createClass({
	    displayName: "ExplanationEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        showPrompt: React.PropTypes.string,
	        hidePrompt: React.PropTypes.string,
	        explanation: React.PropTypes.string,
	        widgets: React.PropTypes.object,
	        apiOptions: React.PropTypes.any,
	        enabledFeatures: React.PropTypes.any
	    },

	    getDefaultProps: function getDefaultProps() {
	        return defaultExplanationProps;
	    },

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    render: function render() {
	        var _this = this;

	        return React.createElement(
	            "div",
	            { className: "perseus-widget-explanation-editor" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "label",
	                    null,
	                    "Prompt to show explanation: ",
	                    React.createElement(TextInput, {
	                        value: this.props.showPrompt,
	                        onChange: this.change("showPrompt") })
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "label",
	                    null,
	                    "Prompt to hide explanation: ",
	                    React.createElement(TextInput, {
	                        value: this.props.hidePrompt,
	                        onChange: this.change("hidePrompt") })
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(Editor, {
	                    apiOptions: this.props.apiOptions,
	                    enabledFeatures: this.props.enabledFeatures,
	                    content: this.props.explanation,
	                    widgets: this.props.widgets,
	                    widgetEnabled: true,
	                    immutableWidgets: false,
	                    onChange: function onChange(props) {
	                        var newProps = {};
	                        if (_.has(props, "content")) {
	                            newProps.explanation = props.content;
	                        }
	                        if (_.has(props, "widgets")) {
	                            newProps.widgets = props.widgets;
	                        }
	                        _this.change(newProps);
	                    } })
	            )
	        );
	    }
	});

	module.exports = ExplanationEditor;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, comma-dangle, indent, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Interactive2 = __webpack_require__(188);
	var SvgImage = __webpack_require__(32);
	var Util = __webpack_require__(8);
	var ButtonGroup = __webpack_require__(58);

	/* Graphie and relevant components. */
	var Graphie = __webpack_require__(67);
	var MovablePoint = Graphie.MovablePoint;
	var MovableLine = Graphie.MovableLine;

	var knumber = __webpack_require__(197).number;
	var kvector = __webpack_require__(197).vector;
	var kpoint = __webpack_require__(197).point;
	var KhanColors = __webpack_require__(189);

	var _require = __webpack_require__(158);

	var containerSizeClassPropType = _require.containerSizeClassPropType;

	var _require2 = __webpack_require__(80);

	var interactiveSizes = _require2.interactiveSizes;

	var _require3 = __webpack_require__(158);

	var getInteractiveBoxFromSizeClass = _require3.getInteractiveBoxFromSizeClass;

	/* Mixins. */

	var Changeable = __webpack_require__(172);

	var _require4 = __webpack_require__(199);

	var GrapherUtil = _require4.GrapherUtil;
	var typeToButton = _require4.typeToButton;
	var functionForType = _require4.functionForType;
	var DEFAULT_GRAPHER_PROPS = _require4.DEFAULT_GRAPHER_PROPS;


	function isFlipped(newCoord, oldCoord, line) {
	    var CCW = function CCW(a, b, c) {
	        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
	    };
	    return CCW(line[0], line[1], oldCoord) > 0 !== CCW(line[0], line[1], newCoord) > 0;
	}

	/* Styles */
	var typeSelectorStyle = {
	    padding: "5px 5px"
	};

	/* Graphing interface. */
	var FunctionGrapher = React.createClass({
	    displayName: "FunctionGrapher",

	    mixins: [Changeable],

	    _coords: function _coords(props) {
	        // Coords are usually based on props, but should fall back to the
	        // model's default whenever they're not provided (if there's a model)
	        props = props || this.props;
	        var graph = props.graph;
	        var defaultModelCoords = props.model && GrapherUtil.maybePointsFromNormalized(props.model.defaultCoords, graph.range, graph.step, graph.snapStep);
	        return props.coords || defaultModelCoords || null;
	    },

	    _asymptote: function _asymptote(props) {
	        // Unlike coords, asymptotes are never null; see defaultPlotProps.
	        props = props || this.props;
	        return props.asymptote;
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            graph: {
	                range: [[-10, 10], [-10, 10]],
	                step: [1, 1]
	            },
	            coords: null,
	            asymptote: null
	        };
	    },

	    render: function render() {
	        var _this = this;

	        var pointForCoord = function pointForCoord(coord, i) {
	            return React.createElement(MovablePoint, {
	                key: i,
	                coord: coord,
	                "static": _this.props.static,
	                constraints: [Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function (coord) {
	                    // Always enforce that this is a function
	                    var isFunction = _.all(_this._coords(), function (otherCoord, j) {
	                        return i === j || !otherCoord || !knumber.equal(coord[0], otherCoord[0]);
	                    });

	                    // Evaluate this criteria before per-point constraints
	                    if (!isFunction) {
	                        return false;
	                    }

	                    // Specific functions have extra per-point constraints
	                    if (_this.props.model && _this.props.model.extraCoordConstraint) {
	                        var extraConstraint = _this.props.model.extraCoordConstraint;
	                        // Calculat resulting coords and verify that
	                        // they're valid for this graph
	                        var proposedCoords = _.clone(_this._coords());
	                        var oldCoord = _.clone(proposedCoords[i]);
	                        proposedCoords[i] = coord;
	                        return extraConstraint(coord, oldCoord, proposedCoords, _this._asymptote(), _this.props.graph);
	                    }

	                    return isFunction;
	                }],
	                onMove: function onMove(newCoord, oldCoord) {
	                    var coords;
	                    // Reflect over asymptote, if allowed
	                    var asymptote = _this._asymptote();
	                    if (asymptote && _this.props.model.allowReflectOverAsymptote && isFlipped(newCoord, oldCoord, asymptote)) {
	                        coords = _.map(_this._coords(), function (coord) {
	                            return kpoint.reflectOverLine(coord, asymptote);
	                        });
	                    } else {
	                        coords = _.clone(_this._coords());
	                    }
	                    coords[i] = newCoord;
	                    _this.props.onChange({
	                        coords: coords
	                    });
	                } });
	        };
	        var points = _.map(this._coords(), pointForCoord);
	        var box = this.props.graph.box;

	        var imageDescription = this.props.graph.backgroundImage;
	        var image = null;
	        if (imageDescription.url) {
	            var scale = box[0] / interactiveSizes.defaultBoxSize;
	            image = React.createElement(SvgImage, { src: imageDescription.url,
	                width: imageDescription.width,
	                height: imageDescription.height,
	                scale: scale });
	        }

	        return React.createElement(
	            "div",
	            {
	                className: "perseus-widget " + "perseus-widget-grapher",
	                style: {
	                    width: box[0],
	                    height: this.props.flexibleType ? "auto" : box[1],
	                    boxSizing: "initial"
	                } },
	            React.createElement(
	                "div",
	                {
	                    className: "graphie-container above-scratchpad",
	                    style: {
	                        width: box[0],
	                        height: box[1]
	                    } },
	                image,
	                React.createElement(
	                    Graphie,
	                    this.props.graph,
	                    this.props.model && this.renderPlot(),
	                    this.props.model && this.renderAsymptote(),
	                    this.props.model && points
	                )
	            )
	        );
	    },

	    renderPlot: function renderPlot() {
	        var model = this.props.model;
	        var xRange = this.props.graph.range[0];
	        var style = { stroke: KhanColors.DYNAMIC };

	        var coeffs = model.getCoefficients(this._coords(), this._asymptote());
	        if (!coeffs) {
	            return;
	        }

	        var functionProps = model.getPropsForCoeffs(coeffs, xRange);
	        return React.createElement(model.Movable, _extends({}, functionProps, {
	            key: this.props.model.url,
	            range: xRange,
	            style: style }));
	    },

	    renderAsymptote: function renderAsymptote() {
	        var _this2 = this;

	        var model = this.props.model;
	        var graph = this.props.graph;
	        var asymptote = this._asymptote();
	        var dashed = {
	            strokeDasharray: "- "
	        };
	        return asymptote && React.createElement(
	            MovableLine,
	            { onMove: function onMove(newCoord, oldCoord) {
	                    // Calculate and apply displacement
	                    var delta = kvector.subtract(newCoord, oldCoord);
	                    var newAsymptote = _.map(_this2._asymptote(), function (coord) {
	                        return kvector.add(coord, delta);
	                    });
	                    _this2.props.onChange({
	                        asymptote: newAsymptote
	                    });
	                }, constraints: [Interactive2.MovableLine.constraints.bound(), Interactive2.MovableLine.constraints.snap(), function (newCoord, oldCoord) {
	                    // Calculate and apply proposed displacement
	                    var delta = kvector.subtract(newCoord, oldCoord);
	                    var proposedAsymptote = _.map(_this2._asymptote(), function (coord) {
	                        return kvector.add(coord, delta);
	                    });
	                    // Verify that resulting asymptote is valid for graph
	                    if (model.extraAsymptoteConstraint) {
	                        return model.extraAsymptoteConstraint(newCoord, oldCoord, _this2._coords(), proposedAsymptote, graph);
	                    }
	                    return true;
	                }], normalStyle: dashed,
	                highlightStyle: dashed },
	            _.map(asymptote, function (coord, i) {
	                return React.createElement(MovablePoint, {
	                    key: "asymptoteCoord-" + i,
	                    coord: coord,
	                    "static": true,
	                    draw: null,
	                    extendLine: true });
	            })
	        );
	    }
	});

	/* Widget and editor. */
	var Grapher = React.createClass({
	    displayName: "Grapher",

	    propTypes: {
	        containerSizeClass: containerSizeClassPropType.isRequired,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return DEFAULT_GRAPHER_PROPS;
	    },

	    render: function render() {
	        var type = this.props.plot.type;
	        var coords = this.props.plot.coords;
	        var asymptote = this.props.plot.asymptote;

	        var typeSelector = React.createElement(
	            "div",
	            { style: typeSelectorStyle,
	                className: "above-scratchpad" },
	            React.createElement(ButtonGroup, {
	                value: type,
	                allowEmpty: true,
	                buttons: _.map(this.props.availableTypes, typeToButton),
	                onChange: this.handleActiveTypeChange })
	        );

	        var box = getInteractiveBoxFromSizeClass(this.props.containerSizeClass);

	        // Calculate additional graph properties so that the same values are
	        // passed in to both FunctionGrapher and Graphie.
	        var options = _extends({}, this.props.graph, GrapherUtil.getGridAndSnapSteps(this.props.graph, box[0]), {
	            gridConfig: this._getGridConfig(_extends({}, this.props.graph, {
	                box: box
	            }, GrapherUtil.getGridAndSnapSteps(this.props.graph, box[0])))
	        });

	        // The `graph` prop will eventually be passed to the <Graphie>
	        // component. In fact, if model is `null`, this is functionalliy
	        // identical to a <Graphie>. Otherwise, some points and a plot will be
	        // overlayed.
	        var grapherProps = {
	            graph: {
	                box: box,
	                range: options.range,
	                step: options.step,
	                snapStep: options.snapStep,
	                backgroundImage: options.backgroundImage,
	                options: options,
	                setup: this._setupGraphie
	            },
	            onChange: this.handlePlotChanges,
	            model: type && functionForType(type),
	            coords: coords,
	            asymptote: asymptote,
	            static: this.props.static
	        };

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(FunctionGrapher, grapherProps),
	            this.props.availableTypes.length > 1 && typeSelector
	        );
	    },

	    handlePlotChanges: function handlePlotChanges(newPlot) {
	        var plot = _.extend({}, this.props.plot, newPlot);
	        this.props.onChange({
	            plot: plot
	        });
	        this.props.trackInteraction();
	    },

	    handleActiveTypeChange: function handleActiveTypeChange(newType) {
	        var graph = this.props.graph;
	        var plot = _.extend({}, this.props.plot, GrapherUtil.defaultPlotProps(newType, graph));
	        this.props.onChange({
	            plot: plot
	        });
	    },

	    _getGridConfig: function _getGridConfig(options) {
	        return _.map(options.step, function (step, i) {
	            return Util.gridDimensionConfig(step, options.range[i], options.box[i], options.gridStep[i]);
	        });
	    },

	    _setupGraphie: function _setupGraphie(graphie, options) {
	        if (options.markings === "graph") {
	            graphie.graphInit({
	                range: options.range,
	                scale: _.pluck(options.gridConfig, "scale"),
	                axisArrows: "<->",
	                labelFormat: function labelFormat(s) {
	                    return "\\small{" + s + "}";
	                },
	                gridStep: options.gridStep,
	                snapStep: options.snapStep,
	                tickStep: _.pluck(options.gridConfig, "tickStep"),
	                labelStep: 1,
	                unityLabels: _.pluck(options.gridConfig, "unityLabel")
	            });
	            graphie.label([0, options.range[1][1]], options.labels[1], "above");
	            graphie.label([options.range[0][1], 0], options.labels[0], "right");
	        } else if (options.markings === "grid") {
	            graphie.graphInit({
	                range: options.range,
	                scale: _.pluck(options.gridConfig, "scale"),
	                gridStep: options.gridStep,
	                axes: false,
	                ticks: false,
	                labels: false
	            });
	        } else if (options.markings === "none") {
	            graphie.init({
	                range: options.range,
	                scale: _.pluck(options.gridConfig, "scale")
	            });
	        }
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return GrapherUtil.validate(this.getUserInput(), rubric);
	    },

	    getUserInput: function getUserInput() {
	        return this.props.plot;
	    },

	    focus: $.noop
	});

	var propTransform = function propTransform(editorProps) {
	    var widgetProps = {
	        availableTypes: editorProps.availableTypes,
	        graph: editorProps.graph
	    };

	    // If there's only one type, the graph type is deterministic
	    if (widgetProps.availableTypes.length === 1) {
	        var graph = widgetProps.graph;
	        var type = GrapherUtil.chooseType(widgetProps.availableTypes);
	        widgetProps.plot = GrapherUtil.defaultPlotProps(type, graph);
	    }

	    return widgetProps;
	};

	// Note that in addition to the standard staticTransform, in static
	// mode we set static=true for the graph's handles in FunctionGrapher.
	var staticTransform = function staticTransform(editorProps) {
	    return _.extend({}, propTransform(editorProps), {
	        // Don't display graph type choices if we're in static mode
	        availableTypes: [editorProps.correct.type],
	        // Display the same graph marked as correct in the widget editor.
	        plot: editorProps.correct
	    });
	};

	module.exports = {
	    name: "grapher",
	    displayName: "Grapher",
	    widget: Grapher,
	    transform: propTransform,
	    staticTransform: staticTransform
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-redeclare, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);

	var GraphSettings = __webpack_require__(187);
	var InfoTip = __webpack_require__(82);
	var MultiButtonGroup = __webpack_require__(174);

	var Grapher = __webpack_require__(99).widget;

	var _require = __webpack_require__(199);

	var GrapherUtil = _require.GrapherUtil;
	var allTypes = _require.allTypes;
	var typeToButton = _require.typeToButton;
	var DEFAULT_GRAPHER_PROPS = _require.DEFAULT_GRAPHER_PROPS;

	var _require2 = __webpack_require__(158);

	var containerSizeClass = _require2.containerSizeClass;
	var getInteractiveBoxFromSizeClass = _require2.getInteractiveBoxFromSizeClass;


	var GrapherEditor = React.createClass({
	    displayName: "GrapherEditor",

	    mixins: [Changeable],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            correct: DEFAULT_GRAPHER_PROPS.plot,
	            graph: DEFAULT_GRAPHER_PROPS.graph,
	            availableTypes: DEFAULT_GRAPHER_PROPS.availableTypes
	        };
	    },

	    render: function render() {
	        var _this = this;

	        var sizeClass = containerSizeClass.SMALL;
	        var equationString = void 0;
	        var graph = void 0;
	        if (this.props.graph.valid === true) {
	            var graphProps = {
	                graph: this.props.graph,
	                plot: this.props.correct,
	                availableTypes: this.props.availableTypes,
	                onChange: function onChange(newProps, cb) {
	                    var correct = _this.props.correct;
	                    if (correct.type === newProps.plot.type) {
	                        correct = _.extend({}, correct, newProps.plot);
	                    } else {
	                        // Clear options from previous graph
	                        correct = newProps.plot;
	                    }
	                    _this.props.onChange({ correct: correct }, cb);
	                },
	                trackInteraction: function trackInteraction() {}
	            };

	            graph = React.createElement(Grapher, _extends({}, graphProps, {
	                containerSizeClass: sizeClass
	            }));
	            equationString = GrapherUtil.getEquationString(graphProps);
	        } else {
	            graph = React.createElement(
	                "div",
	                { className: "perseus-error" },
	                this.props.graph.valid
	            );
	        }

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                null,
	                "Correct answer",
	                ' ',
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."
	                    )
	                ),
	                ' ',
	                ": ",
	                equationString
	            ),
	            React.createElement(GraphSettings, {
	                editableSettings: ["graph", "snap", "image"],
	                box: getInteractiveBoxFromSizeClass(sizeClass),
	                range: this.props.graph.range,
	                labels: this.props.graph.labels,
	                step: this.props.graph.step,
	                gridStep: this.props.graph.gridStep,
	                snapStep: this.props.graph.snapStep,
	                valid: this.props.graph.valid,
	                backgroundImage: this.props.graph.backgroundImage,
	                markings: this.props.graph.markings,
	                rulerLabel: this.props.graph.rulerLabel,
	                rulerTicks: this.props.graph.rulerTicks,
	                onChange: this.change("graph") }),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "label",
	                    null,
	                    "Available functions:",
	                    ' ',
	                    " "
	                ),
	                React.createElement(MultiButtonGroup, {
	                    allowEmpty: false,
	                    values: this.props.availableTypes,
	                    buttons: _.map(allTypes, typeToButton),
	                    onChange: this.handleAvailableTypesChange })
	            ),
	            graph
	        );
	    },

	    handleAvailableTypesChange: function handleAvailableTypesChange(newAvailableTypes) {
	        var correct = this.props.correct;

	        // If the currently 'correct' type is removed from the list of types,
	        // we need to change it to avoid impossible questions.
	        if (!_.contains(newAvailableTypes, this.props.correct.type)) {
	            var graph = this.props.graph;
	            var newType = GrapherUtil.chooseType(newAvailableTypes);
	            var correct = GrapherUtil.defaultPlotProps(newType, graph);
	        }
	        this.props.onChange({
	            availableTypes: newAvailableTypes,
	            correct: correct
	        });
	    },

	    serialize: function serialize() {
	        return _.chain(this.props).pick("correct", "availableTypes").extend({ graph: _.omit(this.props.graph, "box") }).value();
	    }
	});

	module.exports = GrapherEditor;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/* globals i18n */
	var classNames = __webpack_require__(54);
	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var ApiOptions = __webpack_require__(7).Options;
	var Changeable = __webpack_require__(172);

	var _require = __webpack_require__(39);

	var iconOk = _require.iconOk;
	var iconRemove = _require.iconRemove;

	var InlineIcon = __webpack_require__(40);
	var Renderer = __webpack_require__(30);

	// A Graded Group is more or less a Group widget that displays a check
	// answer button below the rendered content. When clicked, the widget grades
	// the stuff inside and displays feedback about whether the inputted answer was
	// correct or not.

	var GRADING_STATUSES = {
	    ungraded: 'ungraded',
	    correct: 'correct',
	    incorrect: 'incorrect',
	    invalid: 'invalid'
	};

	// Prepended to all invalid messages to make the widget messages a bit clearer
	var INVALID_MESSAGE_PREFIX = "We couldn't grade your answer.";
	var DEFAULT_INVALID_MESSAGE = "It looks like you left something blank or " + "entered in an invalid answer.";

	var GradedGroup = React.createClass({
	    displayName: "GradedGroup",

	    mixins: [Changeable],

	    propTypes: {
	        content: React.PropTypes.string,
	        widgets: React.PropTypes.object,
	        images: React.PropTypes.object,
	        apiOptions: ApiOptions.propTypes,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            content: "",
	            widgets: {},
	            images: {}
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            status: GRADING_STATUSES.ungraded,
	            message: ""
	        };
	    },

	    render: function render() {
	        var _this = this;

	        var apiOptions = _.extend({}, ApiOptions.defaults, this.props.apiOptions, {
	            // Api Rewriting to support correct onFocus/onBlur
	            // events for the mobile API
	            onFocusChange: function onFocusChange(newFocus, oldFocus) {
	                if (oldFocus) {
	                    _this.props.onBlur(oldFocus);
	                }
	                if (newFocus) {
	                    _this.props.onFocus(newFocus);
	                }
	            }
	        });

	        var icon = null;
	        // Colors are 10% darker than the colors in graded-group.less
	        if (this.state.status === GRADING_STATUSES.correct) {
	            icon = React.createElement(InlineIcon, _extends({}, iconOk, { style: { color: "#526f03" } }));
	        } else if (this.state.status === GRADING_STATUSES.incorrect) {
	            icon = React.createElement(InlineIcon, _extends({}, iconRemove, { style: { color: "#ff5454" } }));
	        }

	        var classes = classNames({
	            "perseus-graded-group": true,
	            "answer-correct": this.state.status === GRADING_STATUSES.correct,
	            "answer-incorrect": this.state.status === GRADING_STATUSES.incorrect
	        });

	        return React.createElement(
	            "div",
	            { className: classes },
	            React.createElement(Renderer, _extends({}, this.props, {
	                ref: "renderer",
	                apiOptions: apiOptions,
	                onInteractWithWidget: this._onInteractWithWidget })),
	            icon && React.createElement(
	                "div",
	                { className: "group-icon" },
	                icon
	            ),
	            React.createElement(
	                "p",
	                null,
	                this.state.message
	            ),
	            React.createElement("input", {
	                type: "button",
	                value: i18n._("Check Answer"),
	                className: "simple-button",
	                disabled: this.props.apiOptions.readOnly,
	                onClick: this._checkAnswer })
	        );
	    },

	    // This is a little strange because the id of the widget that actually
	    // changed is going to be lost in favor of the group widget's id. The
	    // widgets prop also wasn't actually changed, and this only serves to
	    // alert our renderer (our parent) of the fact that some interaction
	    // has occurred.
	    _onInteractWithWidget: function _onInteractWithWidget(id) {
	        // Reset grading display when user changes answer
	        this.setState({
	            status: GRADING_STATUSES.ungraded,
	            message: ""
	        });

	        if (this.refs.renderer) {
	            this.change("widgets", this.props.widgets);
	        }
	    },

	    _checkAnswer: function _checkAnswer() {
	        var score = this.refs.renderer.score();

	        var status;
	        var message;
	        if (score.type === "points") {
	            status = score.total === score.earned ? GRADING_STATUSES.correct : GRADING_STATUSES.incorrect;
	            message = score.message || "";
	        } else {
	            // score.type is "invalid"
	            status = GRADING_STATUSES.invalid;
	            message = score.message ? INVALID_MESSAGE_PREFIX + " " + score.message : INVALID_MESSAGE_PREFIX + " " + DEFAULT_INVALID_MESSAGE;
	        }

	        this.setState({
	            status: status,
	            message: message
	        });

	        this.props.trackInteraction({
	            status: status
	        });
	    },

	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        return nextProps !== this.props || nextState !== this.state;
	    },

	    // Mobile API
	    getInputPaths: function getInputPaths() {
	        return this.refs.renderer.getInputPaths();
	    },

	    setInputValue: function setInputValue(path, newValue, cb) {
	        return this.refs.renderer.setInputValue(path, newValue, cb);
	    },

	    getAcceptableFormatsForInputPath: function getAcceptableFormatsForInputPath(path) {
	        return this.refs.renderer.getAcceptableFormatsForInputPath(path);
	    },

	    focus: function focus() {
	        return this.refs.renderer.focus();
	    },

	    focusInputPath: function focusInputPath(path) {
	        this.refs.renderer.focusPath(path);
	    },

	    blurInputPath: function blurInputPath(path) {
	        this.refs.renderer.blurPath(path);
	    }
	});

	var traverseChildWidgets = function traverseChildWidgets(props, traverseRenderer) {
	    return _.extend({}, props, traverseRenderer(props));
	};

	module.exports = {
	    name: "graded-group",
	    displayName: "Graded Group",
	    widget: GradedGroup,
	    traverseChildWidgets: traverseChildWidgets,
	    hidden: false,
	    tracking: "all"
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var ApiOptions = __webpack_require__(7).Options;
	var Changeable = __webpack_require__(172);
	var Editor = __webpack_require__(13);

	var GradedGroupEditor = React.createClass({
	    displayName: "GradedGroupEditor",

	    mixins: [Changeable],

	    propTypes: {
	        content: React.PropTypes.string,
	        widgets: React.PropTypes.object,
	        images: React.PropTypes.object,
	        apiOptions: ApiOptions.propTypes
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            content: "",
	            widgets: {},
	            images: {}
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "perseus-group-editor" },
	            React.createElement(Editor, {
	                ref: "editor",
	                content: this.props.content,
	                widgets: this.props.widgets,
	                apiOptions: this.props.apiOptions,
	                enabledFeatures: this.props.enabledFeatures,
	                images: this.props.images,
	                widgetEnabled: true,
	                immutableWidgets: false,
	                onChange: this.props.onChange })
	        );
	    },

	    getSaveWarnings: function getSaveWarnings() {
	        return this.refs.editor.getSaveWarnings();
	    },

	    serialize: function serialize() {
	        return this.refs.editor.serialize();
	    }
	});

	module.exports = GradedGroupEditor;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var ApiOptions = __webpack_require__(7).Options;
	var Changeable = __webpack_require__(172);
	var Renderer = __webpack_require__(30);

	var Group = React.createClass({
	    displayName: "Group",

	    mixins: [Changeable],

	    propTypes: {
	        content: React.PropTypes.string,
	        widgets: React.PropTypes.object,
	        images: React.PropTypes.object,
	        icon: React.PropTypes.object,
	        reviewModeRubric: React.PropTypes.object
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            content: "",
	            widgets: {},
	            images: {},
	            icon: null
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        // TODO(marcia): See comment in render method about our cyclical
	        // numbering scheme. We force another render so that we can annotate
	        // the group with the correct number.
	        this.forceUpdate();
	    },

	    render: function render() {
	        var _this = this;

	        var apiOptions = _.extend({}, ApiOptions.defaults, this.props.apiOptions, {
	            // Api Rewriting to support correct onFocus/onBlur
	            // events for the mobile API
	            onFocusChange: function onFocusChange(newFocus, oldFocus) {
	                if (oldFocus) {
	                    _this.props.onBlur(oldFocus);
	                }
	                if (newFocus) {
	                    _this.props.onFocus(newFocus);
	                }
	            }
	        });

	        // Allow a problem number annotation to be added.
	        // This is cyclical and should probably be reconsidered. In order to
	        // render the annotation ("Question 3 of 10"), we call interWidgets to
	        // figure out our index in the list of all fellow group widgets. On
	        // first render, though, we don't exist yet in this list, and so we
	        // give ourselves number -1. To combat this, we forceUpdate in
	        // componentDidMount so that we can number ourselves properly. But,
	        // really we should have a more unidirectional flow. TODO(marcia): fix.
	        var number = _.indexOf(this.props.interWidgets("group"), this);
	        var problemNumComponent = this.props.apiOptions.groupAnnotator(number, this.props.widgetId);

	        // This is a little strange because the id of the widget that actually
	        // changed is going to be lost in favor of the group widget's id. The
	        // widgets prop also wasn't actually changed, and this only serves to
	        // alert our renderer (our parent) of the fact that some interaction
	        // has occurred.
	        var onInteractWithWidget = function onInteractWithWidget(id) {
	            if (_this.refs.renderer) {
	                _this.change("widgets", _this.refs.renderer.props.widgets);
	            }
	        };

	        return React.createElement(
	            "div",
	            { className: "perseus-group" },
	            problemNumComponent,
	            React.createElement(Renderer, _extends({}, this.props, {
	                ref: "renderer",
	                apiOptions: apiOptions,
	                interWidgets: this._interWidgets,
	                reviewMode: !!this.props.reviewModeRubric,
	                onInteractWithWidget: onInteractWithWidget })),
	            this.props.icon && React.createElement(
	                "div",
	                { className: "group-icon" },
	                this.props.icon
	            )
	        );
	    },

	    _interWidgets: function _interWidgets(filterCriterion, localResults) {
	        if (localResults.length) {
	            return localResults;
	        } else {
	            return this.props.interWidgets(filterCriterion);
	        }
	    },

	    getUserInput: function getUserInput() {
	        return this.refs.renderer.getUserInput();
	    },

	    getSerializedState: function getSerializedState() {
	        return this.refs.renderer.getSerializedState();
	    },

	    restoreSerializedState: function restoreSerializedState(state, callback) {
	        this.refs.renderer.restoreSerializedState(state, callback);
	        // Tell our renderer that we have no props to change
	        // (all our changes were in state):
	        return null;
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return this.refs.renderer.score();
	    },

	    // Mobile API:
	    getInputPaths: function getInputPaths() {
	        return this.refs.renderer.getInputPaths();
	    },

	    setInputValue: function setInputValue(path, newValue, cb) {
	        return this.refs.renderer.setInputValue(path, newValue, cb);
	    },

	    getAcceptableFormatsForInputPath: function getAcceptableFormatsForInputPath(path) {
	        return this.refs.renderer.getAcceptableFormatsForInputPath(path);
	    },

	    /**
	     * WARNING: This is an experimental/temporary API and should not be relied
	     *     upon in production code. This function may change its behavior or
	     *     disappear without notice.
	     *
	     * This function was created to allow Renderer.getAllWidgetIds to descend
	     * into our renderer.
	     */
	    getRenderer: function getRenderer() {
	        return this.refs.renderer;
	    },

	    focus: function focus() {
	        return this.refs.renderer.focus();
	    },

	    focusInputPath: function focusInputPath(path) {
	        this.refs.renderer.focusPath(path);
	    },

	    blurInputPath: function blurInputPath(path) {
	        this.refs.renderer.blurPath(path);
	    }
	});

	var traverseChildWidgets = function traverseChildWidgets(props, traverseRenderer) {

	    return _.extend({}, props, traverseRenderer(props));
	};

	module.exports = {
	    name: "group",
	    displayName: "Group",
	    widget: Group,
	    traverseChildWidgets: traverseChildWidgets,
	    hidden: false
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var ApiOptions = __webpack_require__(7).Options;
	var Changeable = __webpack_require__(172);

	var Editor = __webpack_require__(13);

	var GroupEditor = React.createClass({
	    displayName: "GroupEditor",

	    mixins: [Changeable],

	    propTypes: {
	        content: React.PropTypes.string,
	        widgets: React.PropTypes.object,
	        images: React.PropTypes.object,
	        metadata: React.PropTypes.any,
	        apiOptions: ApiOptions.propTypes
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            content: "",
	            widgets: {},
	            images: {},
	            // `undefined` instead of `null` so that getDefaultProps works for
	            // `the GroupMetadataEditor`
	            metadata: undefined
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "perseus-group-editor" },
	            React.createElement(
	                "div",
	                null,
	                this._renderMetadataEditor()
	            ),
	            React.createElement(Editor, {
	                ref: "editor",
	                content: this.props.content,
	                widgets: this.props.widgets,
	                apiOptions: this.props.apiOptions,
	                enabledFeatures: this.props.enabledFeatures,
	                images: this.props.images,
	                widgetEnabled: true,
	                immutableWidgets: false,
	                onChange: this.props.onChange })
	        );
	    },

	    _renderMetadataEditor: function _renderMetadataEditor() {
	        var GroupMetadataEditor = this.props.apiOptions.GroupMetadataEditor;
	        return React.createElement(GroupMetadataEditor, {
	            value: this.props.metadata,
	            onChange: this.change("metadata") });
	    },

	    getSaveWarnings: function getSaveWarnings() {
	        return this.refs.editor.getSaveWarnings();
	    },

	    serialize: function serialize() {
	        return _.extend({}, this.refs.editor.serialize(), {
	            metadata: this.props.metadata
	        });
	    }
	});

	module.exports = GroupEditor;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/**
	 * This is an iframe widget. It is used for rendering an iframe that
	 *  then communicates its state via window.postMessage
	 * This is useful for embedding arbitrary visualizations/simulations with
	 *  completed conditions, such as the mazes and games in Algorithms.
	 * It's particularly well suited for embedding our ProcessingJS programs,
	 *  but could also be used for embedding viz's hosted elsewhere.
	 */

	/* globals KA */
	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var WidgetJsonifyDeprecated = __webpack_require__(183);
	var updateQueryString = __webpack_require__(8).updateQueryString;

	/* This renders the iframe and handles validation via window.postMessage */
	var Iframe = React.createClass({
	    displayName: "Iframe",


	    mixins: [Changeable, WidgetJsonifyDeprecated],

	    propTypes: {
	        width: React.PropTypes.string,
	        height: React.PropTypes.string,
	        url: React.PropTypes.string,
	        settings: React.PropTypes.array,
	        status: React.PropTypes.oneOf(['incomplete', 'incorrect', 'correct']),
	        message: React.PropTypes.string,
	        allowFullScreen: React.PropTypes.bool
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            status: "incomplete",
	            // optional message
	            message: null,
	            allowFullScreen: false
	        };
	    },
	    handleMessageEvent: function handleMessageEvent(e) {
	        // We receive data from the iframe that contains {passed: true/false}
	        //  and use that to set the status
	        // It could also contain an optional message
	        var data = {};
	        try {
	            data = JSON.parse(e.originalEvent.data);
	        } catch (err) {
	            return;
	        }

	        if (_.isUndefined(data.testsPassed)) {
	            return;
	        }

	        var status = data.testsPassed ? "correct" : "incorrect";
	        this.change({
	            status: status,
	            message: data.message
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        $(window).on("message", this.handleMessageEvent);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        $(window).off("message", this.handleMessageEvent);
	    },

	    render: function render() {
	        var style = {
	            width: this.props.width,
	            height: this.props.height
	        };
	        var url = this.props.url;

	        // If the URL doesnt start with http, it must be a program ID
	        if (url && url.length && url.indexOf("http") !== 0) {
	            url = "https://www.khanacademy.org/computer-programming/program/" + url + "/embedded?buttons=no&embed=yes&editor=no&author=no";
	            url = updateQueryString(url, "width", this.props.width);
	            url = updateQueryString(url, "height", this.props.height);
	            // Origin is used by output.js in deciding to send messages
	            url = updateQueryString(url, "origin", window.location.origin);
	        }

	        // Zero-rated users may incur data charges for viewing non-zero.ka.org
	        // resources, so we need to warn them first.
	        if (typeof KA !== "undefined" && KA.isZeroRated) {
	            if (url.match(/https?:\/\/[^\/]*khanacademy.org/)) {
	                // Internal URLs should be rewritten to point at zero.ka.org,
	                // unless they already do so
	                if (!url.match(/zero.khanacademy.org/)) {
	                    url = url.replace('khanacademy.org', 'zero.khanacademy.org');
	                }
	            } else {
	                // External URLs should be rewritten to point at a warning
	                // interstitial
	                url = '/zero/external-link?context=iframe&url=' + encodeURIComponent(url);
	            }
	        }

	        // Turn array of [{name: "", value: ""}] into object
	        if (this.props.settings) {
	            var settings = {};
	            _.each(this.props.settings, function (setting) {
	                if (setting.name && setting.value) {
	                    settings[setting.name] = setting.value;
	                }
	            });
	            // This becomes available to programs as Program.settings()
	            url = updateQueryString(url, "settings", JSON.stringify(settings));
	        }

	        // We sandbox the iframe so that we whitelist only the functionality
	        //  that we need. This makes it a bit safer in case some content
	        //  creator "went wild".
	        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
	        return React.createElement("iframe", { sandbox: "allow-same-origin allow-scripts",
	            style: style, src: url,
	            allowFullScreen: this.props.allowFullScreen });
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Iframe.validate(this.getUserInput(), rubric);
	    }
	});

	/**
	 * This is the widget's grading function
	 */
	_.extend(Iframe, {
	    validate: function validate(state, rubric) {
	        // The iframe can tell us whether it's correct or incorrect,
	        //  and pass an optional message
	        if (state.status === "correct") {
	            return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: state.message || null
	            };
	        } else if (state.status === "incorrect") {
	            return {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: state.message || null
	            };
	        } else {
	            return {
	                type: "invalid",
	                message: "Keep going, you're not there yet!"
	            };
	        }
	    }
	});

	module.exports = {
	    name: "iframe",
	    displayName: "Iframe",
	    widget: Iframe,
	    // Let's not expose it to all content creators yet
	    hidden: true
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, space-infix-ops */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var BlurInput = __webpack_require__(171);
	var PropCheckBox = __webpack_require__(47);

	/**
	 * This is used for editing a name/value pair.
	 */
	var PairEditor = React.createClass({
	    displayName: "PairEditor",


	    mixins: [Changeable, EditorJsonify],

	    propTypes: {
	        name: React.PropTypes.string,
	        value: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            name: "",
	            value: ""
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "fieldset",
	            null,
	            React.createElement(
	                "label",
	                null,
	                "Name:",
	                React.createElement(BlurInput, { value: this.props.name,
	                    onChange: this.change("name") })
	            ),
	            React.createElement(
	                "label",
	                null,
	                "Value:",
	                React.createElement(BlurInput, { value: this.props.value,
	                    onChange: this.change("value") })
	            )
	        );
	    }
	});

	/**
	 * This is used for editing a set of name/value pairs.
	 */
	var PairsEditor = React.createClass({
	    displayName: "PairsEditor",


	    mixins: [Changeable, EditorJsonify],

	    propTypes: {
	        pairs: React.PropTypes.arrayOf(React.PropTypes.shape({
	            name: React.PropTypes.string,
	            value: React.PropTypes.string
	        })).isRequired
	    },

	    render: function render() {
	        var _this = this;

	        var editors = _.map(this.props.pairs, function (pair, i) {
	            return React.createElement(PairEditor, { key: i, name: pair.name, value: pair.value,
	                onChange: _this.handlePairChange.bind(_this, i) });
	        });
	        return React.createElement(
	            "div",
	            null,
	            editors
	        );
	    },

	    handlePairChange: function handlePairChange(pairIndex, pair) {
	        // If they're both non empty, add a new one
	        var pairs = this.props.pairs.slice();
	        pairs[pairIndex] = pair;

	        var lastPair = pairs[pairs.length - 1];
	        if (lastPair.name && lastPair.value) {
	            pairs.push({ name: "", value: "" });
	        }
	        this.change("pairs", pairs);
	    }
	});

	/**
	 * This is the main editor for this widget, to specify all the options.
	 */
	var IframeEditor = React.createClass({
	    displayName: "IframeEditor",


	    mixins: [Changeable, EditorJsonify],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            url: "",
	            settings: [{ name: "", value: "" }],
	            width: "400",
	            height: "400",
	            allowFullScreen: false
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { style: { fontWeight: "bold", textAlign: "center" } },
	                "This widget is deprecated! ",
	                React.createElement("br", null),
	                "Try using the Video or CS Program widgets instead."
	            ),
	            React.createElement(
	                "label",
	                null,
	                "Url or Program ID:",
	                React.createElement(BlurInput, { name: "url",
	                    value: this.props.url,
	                    onChange: this.change("url") })
	            ),
	            React.createElement("br", null),
	            React.createElement(
	                "label",
	                null,
	                "Settings:",
	                React.createElement(PairsEditor, { name: "settings",
	                    pairs: this.props.settings,
	                    onChange: this.handleSettingsChange })
	            ),
	            React.createElement("br", null),
	            React.createElement(
	                "label",
	                null,
	                "Width:",
	                React.createElement(BlurInput, { name: "width",
	                    value: this.props.width,
	                    onChange: this.change("width") })
	            ),
	            React.createElement(
	                "label",
	                null,
	                "Height:",
	                React.createElement(BlurInput, { name: "height",
	                    value: this.props.height,
	                    onChange: this.change("height") })
	            ),
	            React.createElement(PropCheckBox, { label: "Allow full screen",
	                allowFullScreen: this.props.allowFullScreen,
	                onChange: this.props.onChange })
	        );
	    },

	    handleSettingsChange: function handleSettingsChange(settings) {
	        this.change({ settings: settings.pairs });
	    }
	});

	module.exports = IframeEditor;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable no-var, object-curly-spacing */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	// TODO(kevindangoor) fix these lint errors
	/*eslint-disable react/sort-comp, react/jsx-indent-props, react/prop-types,
	    react/jsx-closing-bracket-location
	*/

	var classNames = __webpack_require__(54);
	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var ApiOptions = __webpack_require__(7).Options;
	var Renderer = __webpack_require__(30);

	var Changeable = __webpack_require__(172);

	var SvgImage = __webpack_require__(32);

	var _require = __webpack_require__(80);

	var baseUnitPx = _require.baseUnitPx;


	var defaultBoxSize = 400;
	var defaultRange = [0, 10];
	var defaultBackgroundImage = {
	    url: null,
	    width: 0,
	    height: 0
	};
	var supportedAlignments = ["block", "float-left", "float-right", "full-width"];
	var DEFAULT_ALIGNMENT = "block";

	var ImageWidget = React.createClass({
	    displayName: "ImageWidget",

	    propTypes: {
	        alignment: React.PropTypes.oneOf(supportedAlignments),
	        alt: React.PropTypes.string,
	        apiOptions: ApiOptions.propTypes,
	        // TODO(alex): Rename to something else, e.g. "image", perhaps flatten
	        backgroundImage: React.PropTypes.shape({
	            url: React.PropTypes.string,
	            width: React.PropTypes.number,
	            height: React.PropTypes.number
	        }),

	        box: React.PropTypes.arrayOf(React.PropTypes.number),

	        caption: React.PropTypes.string,

	        // TODO(alex): Convert uses of this widget's labeling functionality to
	        // SvgImage wherever possible (almost certainly requires a backfill)
	        labels: React.PropTypes.arrayOf(React.PropTypes.shape({
	            content: React.PropTypes.string,
	            coordinates: React.PropTypes.arrayOf(React.PropTypes.number),
	            alignment: React.PropTypes.string
	        })),

	        range: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)),

	        title: React.PropTypes.string,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    mixins: [Changeable],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            alignment: DEFAULT_ALIGNMENT,
	            title: "",
	            range: [defaultRange, defaultRange],
	            box: [defaultBoxSize, defaultBoxSize],
	            backgroundImage: defaultBackgroundImage,
	            labels: [],
	            alt: "",
	            caption: ""
	        };
	    },

	    render: function render() {
	        var image;
	        var alt;
	        var apiOptions = this.props.apiOptions;


	        var backgroundImage = this.props.backgroundImage;

	        if (backgroundImage.url) {
	            image = React.createElement(SvgImage, {
	                src: backgroundImage.url,
	                alt:
	                /* alt text is formatted in a sr-only
	                   div next to the image, so we make
	                   this empty here.
	                   If there is no alt text at all,
	                   we don't put an alt attribute on
	                   the image, so that screen readers
	                   know there's something they can't
	                   read there :(.
	                   NOTE: React <=0.13 (maybe later)
	                   has a bug where it won't ever
	                   remove an attribute, so if this
	                   alt node is ever defined it's
	                   not removed. This is sort of
	                   dangerous, but we usually re-key
	                   new renderers so that they're
	                   rendered from scratch anyways,
	                   so this shouldn't be a problem
	                   in practice right now, although
	                   it will exhibit weird behaviour
	                   while editing. */
	                this.props.alt ? "" : undefined,
	                width: backgroundImage.width,
	                height: backgroundImage.height,
	                preloader: apiOptions.imagePreloader,
	                extraGraphie: {
	                    box: this.props.box,
	                    range: this.props.range,
	                    labels: this.props.labels
	                },
	                trackInteraction: this.props.trackInteraction,
	                zoomToFullSizeOnMobile: apiOptions.xomManatee,
	                constrainHeight: apiOptions.xomManatee,
	                allowFullBleed: apiOptions.xomManatee
	            });
	        }

	        if (this.props.alt) {
	            alt = React.createElement(
	                "span",
	                { className: "perseus-sr-only" },
	                React.createElement(Renderer, {
	                    content: this.props.alt,
	                    apiOptions: apiOptions
	                })
	            );
	        }

	        // As of the XOM Manatee beta, we combine an image's title and caption.
	        if (apiOptions.xomManatee) {
	            var titleAndCaption;

	            if (this.props.title || this.props.caption) {
	                var _title = this.props.title;

	                // Bold the title, and make it the first sentence of the
	                // caption.
	                if (_title) {
	                    // We add a period to separate the title from the caption
	                    // (if it exists), unless the title already ends with a
	                    // punctuation symbol (whitespace ignored). Copied from
	                    // webapp: https://github.com/Khan/webapp/blob/6e930637edb65696d0749ea0f7558214aee32b4e/javascript/tutorial-shared-package/components/content-description.jsx#L80
	                    // TODO(charlie): Internationalize this check, and the
	                    // delimiter that is being inserted.
	                    if (this.props.caption && !/[.?!"']\s*$/.test(_title)) {
	                        _title += ".";
	                    }

	                    _title = "**" + _title + "** ";
	                }

	                var className = classNames({
	                    "perseus-image-caption": true,
	                    "has-title": !!_title
	                });

	                // Caption is left-aligned within a container that's centered
	                // below the image, with these width constraints:
	                // 1. Minimum width = 288px if image is full width, else 0
	                // 2. Maximum width = min(400px, content width, image width)
	                // The following CSS should do the trick, since CSS precedence
	                // is minWidth > maxWidth > width.
	                // TODO(david): If caption is only 1 line long, center-align
	                //     the text.
	                var alignment = this.props.alignment;
	                var isImageFullWidth = alignment === "block" || alignment === "full-width";
	                var minWidth = isImageFullWidth ? 288 : 0;
	                var maxWidth = Math.min(400, backgroundImage.width);
	                titleAndCaption = React.createElement(
	                    "div",
	                    { className: className },
	                    React.createElement(
	                        "div",
	                        { style: {
	                                display: "inline-block",
	                                marginTop: baseUnitPx,
	                                minWidth: minWidth,
	                                maxWidth: maxWidth,
	                                width: "100%"
	                            }
	                        },
	                        React.createElement(Renderer, {
	                            content: _title + this.props.caption,
	                            apiOptions: apiOptions
	                        })
	                    )
	                );
	            }

	            return React.createElement(
	                "div",
	                { className: "perseus-image-widget" },
	                image,
	                alt,
	                titleAndCaption
	            );
	        } else {
	            var title;
	            var caption;

	            if (this.props.title) {
	                title = React.createElement(
	                    "div",
	                    { className: "perseus-image-title" },
	                    React.createElement(Renderer, {
	                        content: this.props.title,
	                        apiOptions: apiOptions
	                    })
	                );
	            }

	            if (this.props.caption) {
	                caption = React.createElement(
	                    "div",
	                    { className: "perseus-image-caption" },
	                    React.createElement(Renderer, {
	                        content: this.props.caption,
	                        apiOptions: apiOptions
	                    })
	                );
	            }

	            return React.createElement(
	                "div",
	                { className: "perseus-image-widget" },
	                title,
	                image,
	                alt,
	                caption
	            );
	        }
	    },

	    getUserInput: function getUserInput() {
	        return null;
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return ImageWidget.validate(this.getUserInput(), rubric);
	    },

	    focus: $.noop
	});

	_.extend(ImageWidget, {
	    validate: function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "image",
	    // This widget's accessibility depends on its contents: if the image has
	    // has a background but no alt text, it is not accessible
	    accessible: function accessible(props) {
	        var bgImage = props.backgroundImage;
	        return !(bgImage && bgImage.url && !props.alt);
	    },
	    defaultAlignment: DEFAULT_ALIGNMENT,
	    supportedAlignments: supportedAlignments,
	    displayName: "Image",
	    widget: ImageWidget
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var _require = __webpack_require__(39);

	var iconTrash = _require.iconTrash;

	var Util = __webpack_require__(8);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var BlurInput = __webpack_require__(171);
	var Editor = __webpack_require__(13);
	var InfoTip = __webpack_require__(82);
	var InlineIcon = __webpack_require__(40);
	var RangeInput = __webpack_require__(190);

	var defaultBoxSize = 400;
	var defaultRange = [0, 10];
	var defaultBackgroundImage = {
	    url: null,
	    width: 0,
	    height: 0
	};

	// Match any image URL (including "web+graphie" links) that is hosted by KA.
	// We're somewhat generous in our AWS URL matching
	// ("ka-<something>.s3.amazonaws.com") so that we don't have to update Perseus
	// every time we add a new proxied AWS bucket.
	var INTERNALLY_HOSTED_DOMAINS = "(" + "ka-.*\.s3\.amazonaws\.com|" + "(fastly|cdn)\.kastatic\.org|" + "khanacademy\.org|" + "kasandbox\.org" + ")";
	var INTERNALLY_HOSTED_URL_RE = new RegExp("^(https?|web\\+graphie)://[^/]*" + INTERNALLY_HOSTED_DOMAINS);

	/**
	 * Alignment option for captions, relative to specified coordinates.
	 */
	var captionAlignments = ["center", "above", "above right", "right", "below right", "below", "below left", "left", "above left"];

	function blankLabel() {
	    return {
	        content: "",
	        coordinates: [0, 0],
	        alignment: "center"
	    };
	}

	var ImageEditor = React.createClass({
	    displayName: "ImageEditor",

	    mixins: [Changeable, EditorJsonify],

	    componentDidMount: function componentDidMount() {
	        var _this = this;

	        // defer this because it can call a change handler synchronously
	        _.defer(function () {
	            var url = _this.props.backgroundImage.url;
	            _this.onUrlChange(url, true);
	        });
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            title: "",
	            range: [defaultRange, defaultRange],
	            box: [defaultBoxSize, defaultBoxSize],
	            backgroundImage: defaultBackgroundImage,
	            labels: [],
	            alt: "",
	            caption: ""
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            showAdvancedSettings: this.props.title.length > 0 || this.props.labels.length > 0,
	            backgroundImageError: ""
	        };
	    },

	    render: function render() {
	        var _this2 = this;

	        var backgroundImage = this.props.backgroundImage;

	        var imageSettings = React.createElement(
	            "div",
	            { className: "image-settings" },
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    React.createElement(
	                        "div",
	                        null,
	                        "Alt text:",
	                        React.createElement(
	                            InfoTip,
	                            null,
	                            "This is important for screenreaders. The content of this alt text will be formatted as markdown (tables, emphasis, etc. are supported)."
	                        )
	                    ),
	                    React.createElement(Editor, {
	                        apiOptions: this.props.apiOptions,
	                        enabledFeatures: this.props.enabledFeatures,
	                        content: this.props.alt,
	                        onChange: function onChange(props) {
	                            if (props.content != null) {
	                                _this2.change("alt", props.content);
	                            }
	                        },
	                        widgetEnabled: false
	                    })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    React.createElement(
	                        "div",
	                        null,
	                        "Caption:"
	                    ),
	                    React.createElement(Editor, {
	                        apiOptions: this.props.apiOptions,
	                        enabledFeatures: this.props.enabledFeatures,
	                        content: this.props.caption,
	                        onChange: function onChange(props) {
	                            if (props.content != null) {
	                                _this2.change("caption", props.content);
	                            }
	                        },
	                        widgetEnabled: false
	                    })
	                )
	            )
	        );

	        var advancedSettings = React.createElement(
	            "div",
	            { className: "graph-settings" },
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Graphie X range:",
	                    ' ',
	                    React.createElement(RangeInput, {
	                        value: this.props.range[0],
	                        onChange: _.partial(this.onRangeChange, 0) })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Graphie Y range:",
	                    ' ',
	                    React.createElement(RangeInput, {
	                        value: this.props.range[1],
	                        onChange: _.partial(this.onRangeChange, 1) })
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "add-label" },
	                React.createElement(
	                    "button",
	                    { onClick: this.addLabel },
	                    ' ',
	                    "Add a label",
	                    ' '
	                )
	            ),
	            this.props.labels.length > 0 && React.createElement(
	                "table",
	                { className: "label-settings" },
	                React.createElement(
	                    "thead",
	                    null,
	                    React.createElement(
	                        "tr",
	                        null,
	                        React.createElement(
	                            "th",
	                            null,
	                            "Coordinates"
	                        ),
	                        React.createElement(
	                            "th",
	                            null,
	                            "Content"
	                        ),
	                        React.createElement(
	                            "th",
	                            null,
	                            "Alignment"
	                        ),
	                        React.createElement("th", null)
	                    )
	                ),
	                React.createElement(
	                    "tbody",
	                    null,
	                    this.props.labels.map(this._renderRowForLabel)
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    React.createElement(
	                        "div",
	                        null,
	                        "Title:",
	                        React.createElement(
	                            InfoTip,
	                            null,
	                            "Appears above the image."
	                        )
	                    ),
	                    React.createElement(Editor, {
	                        apiOptions: this.props.apiOptions,
	                        enabledFeatures: this.props.enabledFeatures,
	                        content: this.props.title,
	                        onChange: function onChange(props) {
	                            if (props.content != null) {
	                                _this2.change("title", props.content);
	                            }
	                        },
	                        widgetEnabled: false
	                    })
	                )
	            )
	        );

	        var showHideAdvancedSettings = React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "a",
	                { href: "#", onClick: this._toggleAdvancedSettings },
	                this.state.showAdvancedSettings ? "Hide " : "Show ",
	                "advanced settings"
	            ),
	            this.state.showAdvancedSettings && advancedSettings
	        );

	        var backgroundImageErrorText = React.createElement(
	            "div",
	            { className: "renderer-widget-error" },
	            this.state.backgroundImageError
	        );

	        return React.createElement(
	            "div",
	            { className: "perseus-image-editor" },
	            React.createElement(
	                "label",
	                null,
	                "Image url:",
	                React.createElement(
	                    InfoTip,
	                    null,
	                    "Paste an image or graphie image URL."
	                ),
	                this.state.backgroundImageError && backgroundImageErrorText,
	                React.createElement(BlurInput, {
	                    value: backgroundImage.url || '',
	                    style: { width: 332 },
	                    onChange: function onChange(url) {
	                        return _this2.onUrlChange(url, false);
	                    } })
	            ),
	            backgroundImage.url && imageSettings,
	            backgroundImage.url && showHideAdvancedSettings
	        );
	    },

	    _toggleAdvancedSettings: function _toggleAdvancedSettings(e) {
	        e.preventDefault();
	        this.setState({
	            showAdvancedSettings: !this.state.showAdvancedSettings
	        });
	    },

	    _renderRowForLabel: function _renderRowForLabel(label, i) {
	        return React.createElement(
	            "tr",
	            { key: i },
	            React.createElement(
	                "td",
	                null,
	                React.createElement(RangeInput, {
	                    value: label.coordinates,
	                    onChange: this.onCoordinateChange.bind(this, i) })
	            ),
	            React.createElement(
	                "td",
	                { style: { verticalAlign: "bottom", width: "5px" } },
	                React.createElement("input", {
	                    type: "text",
	                    className: "graph-settings-axis-label",
	                    value: label.content,
	                    onChange: this.onContentChange.bind(this, i) })
	            ),
	            React.createElement(
	                "td",
	                null,
	                React.createElement(
	                    "select",
	                    {
	                        className: "perseus-widget-dropdown",
	                        value: label.alignment,
	                        onChange: this.onAlignmentChange.bind(this, i) },
	                    captionAlignments.map(function (alignment, i) {
	                        return React.createElement(
	                            "option",
	                            { key: "" + i, value: alignment },
	                            alignment
	                        );
	                    }, this)
	                )
	            ),
	            React.createElement(
	                "td",
	                null,
	                React.createElement(
	                    "a",
	                    {
	                        href: "#",
	                        className: "simple-button orange delete-label",
	                        title: "Remove this label",
	                        onClick: this.removeLabel.bind(this, i)
	                    },
	                    React.createElement(InlineIcon, iconTrash)
	                )
	            )
	        );
	    },

	    addLabel: function addLabel(e) {
	        e.preventDefault();
	        var labels = this.props.labels.slice();
	        var label = blankLabel();
	        labels.push(label);
	        this.props.onChange({
	            labels: labels
	        });
	    },

	    removeLabel: function removeLabel(labelIndex, e) {
	        e.preventDefault();
	        var labels = _(this.props.labels).clone();
	        labels.splice(labelIndex, 1);
	        this.props.onChange({ labels: labels });
	    },

	    onCoordinateChange: function onCoordinateChange(labelIndex, newCoordinates) {
	        var labels = this.props.labels.slice();
	        labels[labelIndex] = _.extend({}, labels[labelIndex], {
	            coordinates: newCoordinates
	        });
	        this.props.onChange({ labels: labels });
	    },

	    onContentChange: function onContentChange(labelIndex, e) {
	        var newContent = e.target.value;
	        var labels = this.props.labels.slice();
	        labels[labelIndex] = _.extend({}, labels[labelIndex], {
	            content: newContent
	        });
	        this.props.onChange({ labels: labels });
	    },

	    onAlignmentChange: function onAlignmentChange(labelIndex, e) {
	        var newAlignment = e.target.value;
	        var labels = this.props.labels.slice();
	        labels[labelIndex] = _.extend({}, labels[labelIndex], {
	            alignment: newAlignment
	        });
	        this.props.onChange({ labels: labels });
	    },

	    setUrl: function setUrl(url, width, height, silent) {
	        // Because this calls into WidgetEditor._handleWidgetChange, which
	        // checks for this widget's ref to serialize it.
	        //
	        // Errors if you switch items before the `Image` from `onUrlChange`
	        // loads.
	        if (!this.isMounted()) {
	            return;
	        }

	        var image = _.clone(this.props.backgroundImage);
	        image.url = url;
	        image.width = width;
	        image.height = height;
	        var box = [image.width, image.height];
	        this.props.onChange({
	            backgroundImage: image,
	            box: box
	        }, null, silent);
	    },

	    // silently load the image when the component mounts
	    // silently update url and sizes when the image loads
	    // noisily load the image in response to the author changing it
	    onUrlChange: function onUrlChange(url, silent) {
	        var _this3 = this;

	        // All article content must be KA-owned!
	        if (!INTERNALLY_HOSTED_URL_RE.test(url)) {
	            this.setState({
	                backgroundImageError: 'Images must be from sites hosted by Khan Academy. ' + 'Please input a Khan Academy-owned address, or use the ' + 'Add Image tool to rehost an existing image'
	            });
	            return;
	        } else {
	            this.setState({ backgroundImageError: "" });
	        }

	        // We update our background image prop after the image loads below. To
	        // avoid weirdness when we change to a very slow URL, then a much
	        // faster URL, we keep track of the URL we're trying to change to.
	        this._leadingUrl = url;

	        if (!url) {
	            this.setUrl(url, 0, 0, silent);
	            return;
	        }

	        Util.getImageSize(url, function (width, height) {
	            if (_this3._leadingUrl !== url) {
	                return;
	            }

	            _this3.setUrl(url, width, height, true);
	        });
	    },

	    onRangeChange: function onRangeChange(type, newRange) {
	        var range = this.props.range.slice();
	        range[type] = newRange;
	        this.props.onChange({ range: range });
	    },

	    getSaveWarnings: function getSaveWarnings() {
	        var warnings = [];

	        if (this.props.backgroundImage.url && !this.props.alt) {
	            warnings.push("No alt text");
	        }

	        return warnings;
	    }
	});

	module.exports = ImageEditor;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, no-redeclare, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-infix-ops */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);

	var Graphie = __webpack_require__(67);

	var Label = Graphie.Label;
	var Line = Graphie.Line;
	var MovablePoint = Graphie.MovablePoint;
	var MovableLine = Graphie.MovableLine;
	var Plot = Graphie.Plot;
	var PlotParametric = Graphie.PlotParametric;
	var Point = Graphie.Point;
	var Rect = Graphie.Rect;

	var kvector = __webpack_require__(197).vector;

	// Memoize KAS parsing
	var KAShashFunc = function KAShashFunc(expr, options) {
	    options = options || {};
	    var result = expr + "||" + options.decimal_separatpr + "||";
	    var functions = options.functions;
	    var functionsLength = functions ? functions.length : 0;
	    for (var i = 0; i < functionsLength; i++) {
	        result += functions[i] + "|";
	    }
	    return result;
	};

	var _parseCache = Object.create(null);
	var KASparse = function KASparse(expr, options) {
	    var hash = KAShashFunc(expr, options);
	    var cached = _parseCache[hash];
	    if (cached) {
	        return cached;
	    }
	    cached = KAS.parse(expr, options);
	    _parseCache[hash] = cached;
	    return cached;
	};

	var _compileCache = Object.create(null);
	var KAScompile = function KAScompile(expr, options) {
	    var hash = KAShashFunc(expr, options);
	    var cached = _compileCache[hash];
	    if (cached) {
	        return cached;
	    }
	    var parsed = KAS.parse(expr, options).expr;
	    cached = parsed ? parsed.compile() : function () {
	        return 0;
	    };
	    _compileCache[hash] = cached;
	    return cached;
	};

	var defaultInteractionProps = {
	    graph: {
	        box: [400, 400],
	        labels: ["x", "y"],
	        range: [[-10, 10], [-10, 10]],
	        tickStep: [1, 1],
	        gridStep: [1, 1],
	        markings: "graph"
	    },
	    elements: []
	};

	var Interaction = React.createClass({
	    displayName: "Interaction",

	    mixins: [Changeable],

	    // TODO(eater): Make more better
	    propTypes: {
	        graph: React.PropTypes.object,
	        elements: React.PropTypes.arrayOf(React.PropTypes.object)
	    },

	    getDefaultProps: function getDefaultProps() {
	        return defaultInteractionProps;
	    },

	    getInitialState: function getInitialState() {
	        return {
	            variables: this._getInitialVariables(this.props.elements),
	            functions: this._getInitialFunctions(this.props.elements)
	        };
	    },

	    _getInitialVariables: function _getInitialVariables(elements) {
	        var variables = {};
	        // TODO(eater): look at all this copypasta! refactor this!
	        _.each(_.where(elements, { type: "movable-point" }), function (element) {
	            var subscript = element.options.varSubscript;
	            var startXExpr = KASparse(element.options.startX || "0").expr;
	            var startYExpr = KASparse(element.options.startY || "0").expr;
	            var startX = 0;
	            var startY = 0;
	            if (startXExpr) {
	                startX = startXExpr.eval({}) || 0;
	            }
	            if (startYExpr) {
	                startY = startYExpr.eval({}) || 0;
	            }
	            variables["x_" + subscript] = startX;
	            variables["y_" + subscript] = startY;
	        }, this);
	        _.each(_.where(elements, { type: "movable-line" }), function (element) {
	            var startSubscript = element.options.startSubscript;
	            var endSubscript = element.options.endSubscript;
	            var startXExpr = KASparse(element.options.startX || "0").expr;
	            var startYExpr = KASparse(element.options.startY || "0").expr;
	            var endXExpr = KASparse(element.options.endX || "0").expr;
	            var endYExpr = KASparse(element.options.endY || "0").expr;
	            var startX = 0;
	            var startY = 0;
	            var endX = 0;
	            var endY = 0;
	            if (startXExpr) {
	                startX = startXExpr.eval({}) || 0;
	            }
	            if (startYExpr) {
	                startY = startYExpr.eval({}) || 0;
	            }
	            if (endXExpr) {
	                endX = endXExpr.eval({}) || 0;
	            }
	            if (endYExpr) {
	                endY = endYExpr.eval({}) || 0;
	            }
	            variables["x_" + startSubscript] = startX;
	            variables["y_" + startSubscript] = startY;
	            variables["x_" + endSubscript] = endX;
	            variables["y_" + endSubscript] = endY;
	        }, this);
	        _.each(_.where(elements, { type: "function" }), function (element) {
	            variables[element.options.funcName] = element.options.value;
	        });
	        return variables;
	    },

	    _getInitialFunctions: function _getInitialFunctions(elements) {
	        return _.map(_.where(elements, { type: "function" }), function (element) {
	            return element.options.funcName;
	        });
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            variables: this._getInitialVariables(nextProps.elements),
	            functions: this._getInitialFunctions(nextProps.elements)
	        });
	    },

	    _setupGraphie: function _setupGraphie(graphie, options) {
	        graphie.graphInit(_.extend({}, options, {
	            grid: _.contains(["graph", "grid"], this.props.graph.markings),
	            axes: _.contains(["graph"], this.props.graph.markings),
	            ticks: _.contains(["graph"], this.props.graph.markings),
	            labels: _.contains(["graph"], this.props.graph.markings),
	            labelFormat: function labelFormat(s) {
	                return "\\small{" + s + "}";
	            },
	            axisArrows: "<->",
	            unityLabels: false
	        }));
	        if (this.props.graph.markings === "graph") {
	            var labels = this.props.graph.labels;
	            var range = this.props.graph.range;
	            graphie.label([0, range[1][1]], labels[1], "above");
	            graphie.label([range[0][1], 0], labels[0], "right");
	        }
	    },

	    _updatePointLocation: function _updatePointLocation(subscript, coord) {
	        var variables = _.clone(this.state.variables);
	        variables["x_" + subscript] = coord[0];
	        variables["y_" + subscript] = coord[1];
	        this.setState({ variables: variables });
	        this.props.trackInteraction();
	    },

	    _updateLineLocation: function _updateLineLocation(options, startCoord) {
	        var xDiff = this._eval("(" + options.endX + ")-(" + options.startX + ")");
	        var yDiff = this._eval("(" + options.endY + ")-(" + options.startY + ")");
	        var endCoord = kvector.add(startCoord, [xDiff, yDiff]);
	        var variables = _.clone(this.state.variables);
	        variables["x_" + options.startSubscript] = startCoord[0];
	        variables["y_" + options.startSubscript] = startCoord[1];
	        variables["x_" + options.endSubscript] = endCoord[0];
	        variables["y_" + options.endSubscript] = endCoord[1];
	        this.setState({ variables: variables });
	        this.props.trackInteraction();
	    },

	    _eval: function _eval(expression, variables) {
	        var _this = this;

	        var func = KAScompile(expression, { functions: this.state.functions });
	        var compiledVars = _.extend({}, this.state.variables, variables);
	        _.each(_.keys(compiledVars), function (name) {
	            if (_.isString(compiledVars[name])) {
	                var func = KAScompile(compiledVars[name], {
	                    functions: _this.state.functions
	                });
	                compiledVars[name] = function (x) {
	                    return func(_.extend({}, compiledVars, {
	                        x: x
	                    }));
	                };
	            }
	        });
	        // Default to 0 if the expression couldn't be parsed
	        return func(compiledVars) || 0;
	    },

	    // Return an array of all the variables in an expression
	    _extractVars: function _extractVars(expr) {
	        if (expr == null) {
	            return [];
	        }
	        var vars = [];
	        _.each(expr.args(), function (arg) {
	            if (arg && arg.constructor.name === "Expr") {
	                vars = vars.concat(this._extractVars(arg));
	            }
	        }, this);

	        if (expr.name() === "Var") {
	            vars.push(expr.prettyPrint());
	        }
	        return vars;
	    },

	    render: function render() {
	        return React.createElement(
	            Graphie,
	            {
	                box: this.props.graph.box,
	                range: this.props.graph.range,
	                options: this.props.graph,
	                setup: this._setupGraphie
	            },
	            _.map(this.props.elements, function (element, n) {
	                var _this2 = this;

	                if (element.type === "point") {
	                    return React.createElement(Point, {
	                        key: element.key,
	                        coord: [this._eval(element.options.coordX), this._eval(element.options.coordY)],
	                        color: element.options.color
	                    });
	                } else if (element.type === "line") {
	                    var start = [this._eval(element.options.startX), this._eval(element.options.startY)];
	                    var end = [this._eval(element.options.endX), this._eval(element.options.endY)];
	                    return React.createElement(Line, {
	                        key: element.key,
	                        start: start,
	                        end: end,
	                        style: {
	                            stroke: element.options.color,
	                            strokeWidth: element.options.strokeWidth,
	                            strokeDasharray: element.options.strokeDasharray,
	                            arrows: element.options.arrows
	                        }
	                    });
	                } else if (element.type === "movable-point") {
	                    // TODO(eater): Would be nice if the constraint system
	                    // were more flexible.
	                    var constraints = [function (coord) {
	                        var coordX = Math.max(_this2._eval(element.options.constraintXMin), Math.min(_this2._eval(element.options.constraintXMax), coord[0]));
	                        var coordY = Math.max(_this2._eval(element.options.constraintYMin), Math.min(_this2._eval(element.options.constraintYMax), coord[1]));
	                        return [coordX, coordY];
	                    }];
	                    if (element.options.constraint === "snap") {
	                        constraints.push(MovablePoint.constraints.snap(element.options.snap));
	                    } else if (element.options.constraint === "x") {
	                        constraints.push(function (coord) {
	                            return [_this2._eval(element.options.constraintFn, { y: coord[1] }), coord[1]];
	                        });
	                    } else if (element.options.constraint === "y") {
	                        constraints.push(function (coord) {
	                            return [coord[0], _this2._eval(element.options.constraintFn, { x: coord[0] })];
	                        });
	                    }

	                    // TODO(eater): foo_[xyz] are hacky non-props to get the
	                    // component to update when constraints change
	                    return React.createElement(MovablePoint, {
	                        key: element.key,
	                        coord: [this.state.variables["x_" + element.options.varSubscript], this.state.variables["y_" + element.options.varSubscript]],
	                        constraints: constraints,
	                        foo_x: element.options.constraint,
	                        foo_y: element.options.constraintFn,
	                        foo_z: element.options.snap,
	                        onMove: _.partial(this._updatePointLocation, element.options.varSubscript)
	                    });
	                } else if (element.type === "movable-line") {
	                    // TODO(eater): Would be nice if the constraint system
	                    // were more flexible.
	                    // TODO(eater): Don't duplicate this code from
	                    // movable-point above
	                    var constraints = [function (coord) {
	                        var coordX = Math.max(_this2._eval(element.options.constraintXMin), Math.min(_this2._eval(element.options.constraintXMax), coord[0]));
	                        var coordY = Math.max(_this2._eval(element.options.constraintYMin), Math.min(_this2._eval(element.options.constraintYMax), coord[1]));
	                        return [coordX, coordY];
	                    }];
	                    if (element.options.constraint === "snap") {
	                        constraints.push(MovablePoint.constraints.snap(element.options.snap));
	                    } else if (element.options.constraint === "x") {
	                        constraints.push(function (coord) {
	                            return [_this2._eval(element.options.constraintFn, { y: coord[1] }), coord[1]];
	                        });
	                    } else if (element.options.constraint === "y") {
	                        constraints.push(function (coord) {
	                            return [coord[0], _this2._eval(element.options.constraintFn, { x: coord[0] })];
	                        });
	                    }
	                    var start = [this.state.variables["x_" + element.options.startSubscript], this.state.variables["y_" + element.options.startSubscript]];
	                    var end = [this.state.variables["x_" + element.options.endSubscript], this.state.variables["y_" + element.options.endSubscript]];
	                    return React.createElement(
	                        MovableLine,
	                        {
	                            key: element.key,
	                            constraints: constraints,
	                            onMove: _.bind(this._updateLineLocation, this, element.options),
	                            foo_x: element.options.constraint,
	                            foo_y: element.options.constraintFn,
	                            foo_z: element.options.snap
	                        },
	                        React.createElement(MovablePoint, { coord: start,
	                            "static": true,
	                            normalStyle: { stroke: "none", fill: "none" } }),
	                        React.createElement(MovablePoint, { coord: end,
	                            "static": true,
	                            normalStyle: { stroke: "none", fill: "none" } })
	                    );
	                } else if (element.type === "function") {
	                    var fn = function fn(x) {
	                        return _this2._eval(element.options.value, { x: x });
	                    };
	                    // find all the variables referenced by this function
	                    var vars = _.without(this._extractVars(KASparse(element.options.value).expr), "x");
	                    // and find their values, so we redraw if any change
	                    var varValues = _.object(vars, _.map(vars, function (v) {
	                        return _this2.state.variables[v];
	                    }));

	                    var range = [this._eval(element.options.rangeMin, this.state.variables), this._eval(element.options.rangeMax, this.state.variables)];

	                    return React.createElement(Plot, {
	                        key: element.key,
	                        fn: fn,
	                        foo_fn: element.options.value,
	                        foo_varvalues: varValues,
	                        range: range,
	                        style: {
	                            stroke: element.options.color,
	                            strokeWidth: element.options.strokeWidth,
	                            strokeDasharray: element.options.strokeDasharray,
	                            plotPoints: 100 }
	                    });
	                } else if (element.type === "parametric") {
	                    var fn = function fn(t) {
	                        return [_this2._eval(element.options.x, { t: t }), _this2._eval(element.options.y, { t: t })];
	                    };
	                    // find all the variables referenced by this function
	                    var vars = _.without(this._extractVars(KASparse(element.options.x).expr).concat(this._extractVars(KASparse(element.options.y).expr)), "t");
	                    // and find their values, so we redraw if any change
	                    var varValues = _.object(vars, _.map(vars, function (v) {
	                        return _this2.state.variables[v];
	                    }));

	                    var range = [this._eval(element.options.rangeMin, this.state.variables), this._eval(element.options.rangeMax, this.state.variables)];

	                    return React.createElement(PlotParametric, {
	                        key: element.key,
	                        fn: fn,
	                        foo_fnx: element.options.x,
	                        foo_fny: element.options.y,
	                        foo_varvalues: varValues,
	                        range: range,
	                        style: {
	                            stroke: element.options.color,
	                            strokeWidth: element.options.strokeWidth,
	                            strokeDasharray: element.options.strokeDasharray,
	                            plotPoints: 100 }
	                    });
	                } else if (element.type === "label") {
	                    var coord = [this._eval(element.options.coordX), this._eval(element.options.coordY)];
	                    return React.createElement(Label, {
	                        key: n + 1,
	                        coord: coord,
	                        text: element.options.label,
	                        style: {
	                            color: element.options.color
	                        }
	                    });
	                } else if (element.type === "rectangle") {
	                    return React.createElement(Rect, {
	                        key: n + 1,
	                        x: this._eval(element.options.coordX),
	                        y: this._eval(element.options.coordY),
	                        width: _.max([this._eval(element.options.width), 0]),
	                        height: _.max([this._eval(element.options.height), 0]),
	                        style: {
	                            stroke: "none",
	                            fill: element.options.color
	                        }
	                    });
	                }
	            }, this)
	        );
	    },

	    getUserInput: function getUserInput() {
	        // TODO(eater): Perhaps we want to be able to record the state of the
	        // user's interaction. Unfortunately sending all the props will
	        // probably make the attempt payload too large. So for now, don't send
	        // anything.
	        return {};
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Interaction.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Interaction, {
	    validate: function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "interaction",
	    displayName: "Interaction",
	    widget: Interaction,
	    transform: _.identity
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var ArrowPicker = __webpack_require__(202);
	var ColorPicker = __webpack_require__(203);
	var ConstraintEditor = __webpack_require__(204);
	var DashPicker = __webpack_require__(205);
	var ElementContainer = __webpack_require__(206);
	var GraphSettings = __webpack_require__(187);
	var MathInput = __webpack_require__(178);
	var NumberInput = __webpack_require__(175);
	var TeX = __webpack_require__(61);
	var TextInput = __webpack_require__(176);

	var KhanColors = __webpack_require__(189);

	var defaultInteractionProps = {
	    graph: {
	        box: [400, 400],
	        labels: ["x", "y"],
	        range: [[-10, 10], [-10, 10]],
	        tickStep: [1, 1],
	        gridStep: [1, 1],
	        markings: "graph"
	    },
	    elements: []
	};

	//
	// Editor for non-interactive points
	//
	// TODO(eater): Factor this out
	//
	var PointEditor = React.createClass({
	    displayName: "PointEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        coordX: React.PropTypes.string,
	        coordY: React.PropTypes.string,
	        color: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            coordX: "0",
	            coordY: "0",
	            color: KhanColors.BLACK
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "graph-settings" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Coordinate: ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large("
	                ),
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.coordX,
	                    onChange: this.change("coordX")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    ","
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.coordY,
	                    onChange: this.change("coordY")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large)"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(ColorPicker, {
	                    value: this.props.color,
	                    onChange: this.change("color")
	                })
	            )
	        );
	    }
	});

	//
	// Editor for non-interactive line segments
	//
	// TODO(eater): Factor this out
	//
	var LineEditor = React.createClass({
	    displayName: "LineEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        startX: React.PropTypes.string,
	        startY: React.PropTypes.string,
	        endX: React.PropTypes.string,
	        endY: React.PropTypes.string,
	        color: React.PropTypes.string,
	        strokeDasharray: React.PropTypes.string,
	        arrows: React.PropTypes.string,
	        strokeWidth: React.PropTypes.number
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            startX: "-5",
	            startY: "5",
	            endX: "5",
	            endY: "5",
	            color: KhanColors.BLACK,
	            strokeDasharray: "",
	            arrows: "",
	            strokeWidth: 2
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "graph-settings" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Start: ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large("
	                ),
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.startX,
	                    onChange: this.change("startX")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    ","
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.startY,
	                    onChange: this.change("startY")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large)"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "End: ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large("
	                ),
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.endX,
	                    onChange: this.change("endX")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    ","
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.endY,
	                    onChange: this.change("endY")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large)"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(ColorPicker, {
	                    value: this.props.color,
	                    onChange: this.change("color")
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(DashPicker, {
	                    value: this.props.strokeDasharray,
	                    onChange: this.change("strokeDasharray") }),
	                "   ",
	                React.createElement(ArrowPicker, {
	                    value: this.props.arrows,
	                    onChange: this.change("arrows")
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-left-col" },
	                    "Width: ",
	                    React.createElement(NumberInput, {
	                        value: this.props.strokeWidth,
	                        placeholder: 2,
	                        onChange: this.change("strokeWidth") })
	                )
	            )
	        );
	    }
	});

	//
	// Editor for interactive movable points
	//
	// TODO(eater): Factor this out
	// TODO(eater): Rethink how constraints are represented
	//
	var MovablePointEditor = React.createClass({
	    displayName: "MovablePointEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        startX: React.PropTypes.string,
	        startY: React.PropTypes.string,
	        constraint: React.PropTypes.string,
	        snap: React.PropTypes.number,
	        constraintFn: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            startX: "0",
	            startY: "0",
	            constraint: "none",
	            snap: 0.5,
	            constraintFn: "0",
	            constraintXMin: "-10",
	            constraintXMax: "10",
	            constraintYMin: "-10",
	            constraintYMax: "10"
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "graph-settings" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Start: ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large("
	                ),
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.startX,
	                    onChange: this.change("startX")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    ","
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.startY,
	                    onChange: this.change("startY")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large)"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Update ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "(x_n, y_n)"
	                ),
	                " for ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "n ="
	                ),
	                " ",
	                React.createElement(NumberInput, {
	                    value: this.props.varSubscript,
	                    placeholder: 0,
	                    onChange: this.change("varSubscript")
	                })
	            ),
	            React.createElement(ConstraintEditor, this.props)
	        );
	    }
	});

	//
	// Editor for interactive movable line segments
	//
	// TODO(eater): Factor this out
	// TODO(eater): Rethink how constraints are represented
	//
	var MovableLineEditor = React.createClass({
	    displayName: "MovableLineEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        startX: React.PropTypes.string,
	        startY: React.PropTypes.string,
	        endX: React.PropTypes.string,
	        endY: React.PropTypes.string,
	        constraint: React.PropTypes.string,
	        snap: React.PropTypes.number,
	        constraintFn: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            startX: "-5",
	            startY: "5",
	            endX: "5",
	            endY: "5",
	            constraint: "none",
	            snap: 0.5,
	            constraintFn: "0",
	            constraintXMin: "-10",
	            constraintXMax: "10",
	            constraintYMin: "-10",
	            constraintYMax: "10"
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "graph-settings" },
	            "Initial position:",
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Start: ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large("
	                ),
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.startX,
	                    onChange: this.change("startX")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    ","
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.startY,
	                    onChange: this.change("startY")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large)"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "End: ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large("
	                ),
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.endX,
	                    onChange: this.change("endX")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    ","
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.endY,
	                    onChange: this.change("endY")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large)"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Start updates ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "(x_n, y_n)"
	                ),
	                " for ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "n ="
	                ),
	                React.createElement(NumberInput, {
	                    value: this.props.startSubscript,
	                    placeholder: 0,
	                    onChange: this.change("startSubscript") })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "End updates ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "(x_m, y_m)"
	                ),
	                " for ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "m ="
	                ),
	                React.createElement(NumberInput, {
	                    value: this.props.endSubscript,
	                    placeholder: 0,
	                    onChange: this.change("endSubscript") })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "All constraints are applied to the start point."
	            ),
	            React.createElement(ConstraintEditor, this.props)
	        );
	    }
	});

	//
	// Editor for function plots
	//
	// TODO(eater): Factor this out
	//
	var FunctionEditor = React.createClass({
	    displayName: "FunctionEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        value: React.PropTypes.string,
	        rangeMin: React.PropTypes.string,
	        rangeMax: React.PropTypes.string,
	        color: React.PropTypes.string,
	        strokeDashArray: React.PropTypes.string,
	        strokeWidth: React.PropTypes.number
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: "x",
	            rangeMin: "-10",
	            rangeMax: "10",
	            color: KhanColors.BLUE,
	            strokeDasharray: "",
	            strokeWidth: 2
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "graph-settings" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    TeX,
	                    null,
	                    this.props.funcName + "(x)="
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.value,
	                    onChange: this.change("value")
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Range: ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large("
	                ),
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.rangeMin,
	                    onChange: this.change("rangeMin")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    ","
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.rangeMax,
	                    onChange: this.change("rangeMax")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large)"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(ColorPicker, {
	                    value: this.props.color,
	                    onChange: this.change("color")
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(DashPicker, {
	                    value: this.props.strokeDasharray,
	                    onChange: this.change("strokeDasharray") })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-left-col" },
	                    "Width: ",
	                    React.createElement(NumberInput, {
	                        value: this.props.strokeWidth,
	                        placeholder: 2,
	                        onChange: this.change("strokeWidth") })
	                )
	            )
	        );
	    }
	});

	//
	// Editor for parametric plots
	//
	// TODO(eater): Factor this out
	//
	var ParametricEditor = React.createClass({
	    displayName: "ParametricEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        x: React.PropTypes.string,
	        y: React.PropTypes.string,
	        rangeMin: React.PropTypes.string,
	        rangeMax: React.PropTypes.string,
	        color: React.PropTypes.string,
	        strokeDashArray: React.PropTypes.string,
	        strokeWidth: React.PropTypes.number
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            x: "cos(t)",
	            y: "sin(t)",
	            rangeMin: "0",
	            rangeMax: "2\\pi",
	            color: KhanColors.BLUE,
	            strokeDasharray: "",
	            strokeWidth: 2
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "graph-settings" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    TeX,
	                    null,
	                    "X(t) ="
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.x,
	                    onChange: this.change("x")
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    TeX,
	                    null,
	                    "Y(t) ="
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.y,
	                    onChange: this.change("y")
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Range: ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large("
	                ),
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.rangeMin,
	                    onChange: this.change("rangeMin")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    ","
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.rangeMax,
	                    onChange: this.change("rangeMax")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large)"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(ColorPicker, {
	                    value: this.props.color,
	                    onChange: this.change("color")
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(DashPicker, {
	                    value: this.props.strokeDasharray,
	                    onChange: this.change("strokeDasharray") })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-left-col" },
	                    "Width: ",
	                    React.createElement(NumberInput, {
	                        value: this.props.strokeWidth,
	                        placeholder: 2,
	                        onChange: this.change("strokeWidth") })
	                )
	            )
	        );
	    }
	});

	//
	// Editor for labels
	//
	// TODO(eater): Factor this out maybe?
	// TODO(eater): Add text direction
	//
	var LabelEditor = React.createClass({
	    displayName: "LabelEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        color: React.PropTypes.string,
	        coordX: React.PropTypes.string,
	        coordY: React.PropTypes.string,
	        label: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            coordX: "0",
	            coordY: "0",
	            color: KhanColors.BLACK,
	            label: "\\phi"
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "graph-settings" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(TextInput, {
	                    value: this.props.label,
	                    onChange: this.change("label"),
	                    style: {
	                        width: "100%"
	                    }
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Location: ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large("
	                ),
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.coordX,
	                    onChange: this.change("coordX")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    ","
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.coordY,
	                    onChange: this.change("coordY")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large)"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(ColorPicker, {
	                    value: this.props.color,
	                    onChange: this.change("color")
	                })
	            )
	        );
	    }
	});

	//
	// Editor for rectangles
	//
	// TODO(eater): Factor this out maybe?
	//
	var RectangleEditor = React.createClass({
	    displayName: "RectangleEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        color: React.PropTypes.string,
	        coordX: React.PropTypes.string,
	        coordY: React.PropTypes.string,
	        height: React.PropTypes.string,
	        width: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            coordX: "-5",
	            coordY: "5",
	            width: "2",
	            height: "3",
	            color: KhanColors.LIGHT_BLUE
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "graph-settings" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Bottom left: ",
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large("
	                ),
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.coordX,
	                    onChange: this.change("coordX")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    ","
	                ),
	                " ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.coordY,
	                    onChange: this.change("coordY")
	                }),
	                React.createElement(
	                    TeX,
	                    null,
	                    "\\Large)"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Width: ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.width,
	                    onChange: this.change("width")
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Height: ",
	                React.createElement(MathInput, {
	                    buttonSets: [],
	                    buttonsVisible: "never",
	                    value: this.props.height,
	                    onChange: this.change("height")
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(ColorPicker, {
	                    value: this.props.color,
	                    lightColors: true,
	                    onChange: this.change("color")
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "You want a border? Sorry, draw your own."
	            )
	        );
	    }
	});

	var InteractionEditor = React.createClass({
	    displayName: "InteractionEditor",

	    mixins: [EditorJsonify, Changeable],

	    // TODO(eater): Make more better
	    propTypes: {
	        elements: React.PropTypes.arrayOf(React.PropTypes.object),
	        graph: React.PropTypes.objectOf(React.PropTypes.any)
	    },

	    getDefaultProps: function getDefaultProps() {
	        return defaultInteractionProps;
	    },

	    getInitialState: function getInitialState() {
	        return {
	            usedVarSubscripts: this._getAllVarSubscripts(this.props.elements),
	            usedFunctionNames: this._getAllFunctionNames(this.props.elements)
	        };
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            usedVarSubscripts: this._getAllVarSubscripts(nextProps.elements),
	            usedFunctionNames: this._getAllFunctionNames(nextProps.elements)
	        });
	    },

	    _getAllVarSubscripts: function _getAllVarSubscripts(elements) {
	        return _.map(_.where(elements, { type: "movable-point" }), function (element) {
	            return element.options.varSubscript;
	        }).concat(_.map(_.where(elements, { type: "movable-line" }), function (element) {
	            return element.options.startSubscript;
	        })).concat(_.map(_.where(elements, { type: "movable-line" }), function (element) {
	            return element.options.endSubscript;
	        }));
	    },

	    _getAllFunctionNames: function _getAllFunctionNames(elements) {
	        return _.map(_.where(elements, { type: "function" }), function (element) {
	            return element.options.funcName;
	        });
	    },

	    _updateGraphProps: function _updateGraphProps(newProps) {
	        // TODO(eater): GraphSettings should name this tickStep instead
	        // of step. Grr..
	        this.change({
	            graph: _.extend(_.omit(newProps, "step"), {
	                tickStep: newProps.step
	            })
	        });
	    },

	    _addNewElement: function _addNewElement(e) {
	        var elementType = e.target.value;
	        if (elementType === "") {
	            return;
	        }
	        e.target.value = "";
	        var newElement = {
	            type: elementType,
	            key: elementType + "-" + (Math.random() * 0xffffff << 0).toString(16),
	            options: elementType === "point" ? _.clone(PointEditor.defaultProps) : elementType === "line" ? _.clone(LineEditor.defaultProps) : elementType === "movable-point" ? _.clone(MovablePointEditor.defaultProps) : elementType === "movable-line" ? _.clone(MovableLineEditor.defaultProps) : elementType === "function" ? _.clone(FunctionEditor.defaultProps) : elementType === "parametric" ? _.clone(ParametricEditor.defaultProps) : elementType === "label" ? _.clone(LabelEditor.defaultProps) : elementType === "rectangle" ? _.clone(RectangleEditor.defaultProps) : {}
	        };

	        var nextSubscript;
	        if (elementType === "movable-point") {
	            nextSubscript = _.max([_.max(this.state.usedVarSubscripts), -1]) + 1;
	            newElement.options.varSubscript = nextSubscript;
	        } else if (elementType === "movable-line") {
	            nextSubscript = _.max([_.max(this.state.usedVarSubscripts), -1]) + 1;
	            newElement.options.startSubscript = nextSubscript;
	            newElement.options.endSubscript = nextSubscript + 1;
	        } else if (elementType === "function") {
	            // TODO(eater): The 22nd function added will be {(x) since '{'
	            // comes after 'z'
	            var nextLetter = String.fromCharCode(_.max([_.max(_.map(this.state.usedFunctionNames, function (c) {
	                return c.charCodeAt(0);
	            })), "e".charCodeAt(0)]) + 1);
	            newElement.options.funcName = nextLetter;
	        }
	        this.change({
	            elements: this.props.elements.concat(newElement)
	        });
	    },

	    _deleteElement: function _deleteElement(index) {
	        var element = this.props.elements[index];
	        this.change({ elements: _.without(this.props.elements, element) });
	    },

	    _moveElementUp: function _moveElementUp(index) {
	        var element = this.props.elements[index];
	        var newElements = _.without(this.props.elements, element);
	        newElements.splice(index - 1, 0, element);
	        this.change({ elements: newElements });
	    },

	    _moveElementDown: function _moveElementDown(index) {
	        var element = this.props.elements[index];
	        var newElements = _.without(this.props.elements, element);
	        newElements.splice(index + 1, 0, element);
	        this.change({ elements: newElements });
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "perseus-widget-interaction-editor" },
	            React.createElement(
	                ElementContainer,
	                {
	                    title: "Grid settings"
	                },
	                React.createElement(GraphSettings, {
	                    editableSettings: ["canvas", "graph"],
	                    box: this.props.graph.box,
	                    labels: this.props.graph.labels,
	                    range: this.props.graph.range,
	                    step: this.props.graph.tickStep,
	                    gridStep: this.props.graph.gridStep,
	                    markings: this.props.graph.markings,
	                    onChange: this._updateGraphProps
	                }),
	                this.props.graph.valid === true || React.createElement(
	                    "div",
	                    null,
	                    this.props.graph.valid
	                )
	            ),
	            _.map(this.props.elements, function (element, n) {
	                var _this = this;

	                if (element.type === "movable-point") {
	                    return React.createElement(
	                        ElementContainer,
	                        {
	                            title: React.createElement(
	                                "span",
	                                null,
	                                "Movable point ",
	                                React.createElement(
	                                    TeX,
	                                    null,
	                                    "(x_{" + element.options.varSubscript + "}, y_{" + element.options.varSubscript + "})"
	                                )
	                            ),
	                            onUp: n === 0 ? null : this._moveElementUp.bind(this, n),
	                            onDown: n === this.props.elements.length - 1 ? null : this._moveElementDown.bind(this, n),
	                            onDelete: this._deleteElement.bind(this, n),
	                            key: element.key
	                        },
	                        React.createElement(MovablePointEditor, _extends({}, element.options, {
	                            onChange: function onChange(newProps) {
	                                var elements = JSON.parse(JSON.stringify(_this.props.elements));
	                                _.extend(elements[n].options, newProps);
	                                _this.change({ elements: elements });
	                            }
	                        }))
	                    );
	                } else if (element.type === "movable-line") {
	                    return React.createElement(
	                        ElementContainer,
	                        {
	                            title: React.createElement(
	                                "span",
	                                null,
	                                "Movable line ",
	                                React.createElement(
	                                    TeX,
	                                    null,
	                                    "(x_{" + element.options.startSubscript + "}, y_{" + element.options.startSubscript + "})"
	                                ),
	                                " to ",
	                                React.createElement(
	                                    TeX,
	                                    null,
	                                    "(x_{" + element.options.endSubscript + "}, y_{" + element.options.endSubscript + "})"
	                                )
	                            ),
	                            onUp: n === 0 ? null : this._moveElementUp.bind(this, n),
	                            onDown: n === this.props.elements.length - 1 ? null : this._moveElementDown.bind(this, n),
	                            onDelete: this._deleteElement.bind(this, n),
	                            key: element.key
	                        },
	                        React.createElement(MovableLineEditor, _extends({}, element.options, {
	                            onChange: function onChange(newProps) {
	                                var elements = JSON.parse(JSON.stringify(_this.props.elements));
	                                _.extend(elements[n].options, newProps);
	                                _this.change({ elements: elements });
	                            }
	                        }))
	                    );
	                } else if (element.type === "point") {
	                    return React.createElement(
	                        ElementContainer,
	                        {
	                            title: React.createElement(
	                                "span",
	                                null,
	                                "Point ",
	                                React.createElement(
	                                    TeX,
	                                    null,
	                                    "(" + element.options.coordX + ", " + element.options.coordY + ")"
	                                )
	                            ),
	                            onUp: n === 0 ? null : this._moveElementUp.bind(this, n),
	                            onDown: n === this.props.elements.length - 1 ? null : this._moveElementDown.bind(this, n),
	                            onDelete: this._deleteElement.bind(this, n),
	                            key: element.key
	                        },
	                        React.createElement(PointEditor, _extends({}, element.options, {
	                            onChange: function onChange(newProps) {
	                                var elements = JSON.parse(JSON.stringify(_this.props.elements));
	                                _.extend(elements[n].options, newProps);
	                                _this.change({ elements: elements });
	                            }
	                        }))
	                    );
	                } else if (element.type === "line") {
	                    return React.createElement(
	                        ElementContainer,
	                        {
	                            title: React.createElement(
	                                "span",
	                                null,
	                                "Line ",
	                                React.createElement(
	                                    TeX,
	                                    null,
	                                    "(" + element.options.startX + ", " + element.options.startY + ")"
	                                ),
	                                " to ",
	                                React.createElement(
	                                    TeX,
	                                    null,
	                                    "(" + element.options.endX + ", " + element.options.endY + ")"
	                                )
	                            ),
	                            onUp: n === 0 ? null : this._moveElementUp.bind(this, n),
	                            onDown: n === this.props.elements.length - 1 ? null : this._moveElementDown.bind(this, n),
	                            onDelete: this._deleteElement.bind(this, n),
	                            key: element.key
	                        },
	                        React.createElement(LineEditor, _extends({}, element.options, {
	                            onChange: function onChange(newProps) {
	                                var elements = JSON.parse(JSON.stringify(_this.props.elements));
	                                _.extend(elements[n].options, newProps);
	                                _this.change({ elements: elements });
	                            }
	                        }))
	                    );
	                } else if (element.type === "function") {
	                    return React.createElement(
	                        ElementContainer,
	                        {
	                            title: React.createElement(
	                                "span",
	                                null,
	                                "Function ",
	                                React.createElement(
	                                    TeX,
	                                    null,
	                                    element.options.funcName + "(x) = " + element.options.value
	                                )
	                            ),
	                            onUp: n === 0 ? null : this._moveElementUp.bind(this, n),
	                            onDown: n === this.props.elements.length - 1 ? null : this._moveElementDown.bind(this, n),
	                            onDelete: this._deleteElement,
	                            key: element.key
	                        },
	                        React.createElement(FunctionEditor, _extends({}, element.options, {
	                            onChange: function onChange(newProps) {
	                                var elements = JSON.parse(JSON.stringify(_this.props.elements));
	                                _.extend(elements[n].options, newProps);
	                                _this.change({ elements: elements });
	                            }
	                        }))
	                    );
	                } else if (element.type === "parametric") {
	                    return React.createElement(
	                        ElementContainer,
	                        {
	                            title: React.createElement(
	                                "span",
	                                null,
	                                "Parametric"
	                            ),
	                            onUp: n === 0 ? null : this._moveElementUp.bind(this, n),
	                            onDown: n === this.props.elements.length - 1 ? null : this._moveElementDown.bind(this, n),
	                            onDelete: this._deleteElement,
	                            key: element.key
	                        },
	                        React.createElement(ParametricEditor, _extends({}, element.options, {
	                            onChange: function onChange(newProps) {
	                                var elements = JSON.parse(JSON.stringify(_this.props.elements));
	                                _.extend(elements[n].options, newProps);
	                                _this.change({ elements: elements });
	                            }
	                        }))
	                    );
	                } else if (element.type === "label") {
	                    return React.createElement(
	                        ElementContainer,
	                        {
	                            title: React.createElement(
	                                "span",
	                                null,
	                                "Label ",
	                                React.createElement(
	                                    TeX,
	                                    null,
	                                    element.options.label
	                                ),
	                                " "
	                            ),
	                            onUp: n === 0 ? null : this._moveElementUp.bind(this, n),
	                            onDown: n === this.props.elements.length - 1 ? null : this._moveElementDown.bind(this, n),
	                            onDelete: this._deleteElement,
	                            key: element.key
	                        },
	                        React.createElement(LabelEditor, _extends({}, element.options, {
	                            onChange: function onChange(newProps) {
	                                var elements = JSON.parse(JSON.stringify(_this.props.elements));
	                                _.extend(elements[n].options, newProps);
	                                _this.change({ elements: elements });
	                            }
	                        }))
	                    );
	                } else if (element.type === "rectangle") {
	                    return React.createElement(
	                        ElementContainer,
	                        {
	                            title: React.createElement(
	                                "span",
	                                null,
	                                "Rectangle ",
	                                React.createElement(
	                                    TeX,
	                                    null,
	                                    "(" + element.options.coordX + ", " + element.options.coordY + ")"
	                                ),
	                                " — ",
	                                React.createElement(
	                                    TeX,
	                                    null,
	                                    element.options.width + " \\times " + element.options.height
	                                )
	                            ),
	                            onUp: n === 0 ? null : this._moveElementUp.bind(this, n),
	                            onDown: n === this.props.elements.length - 1 ? null : this._moveElementDown.bind(this, n),
	                            onDelete: this._deleteElement,
	                            key: element.key
	                        },
	                        React.createElement(RectangleEditor, _extends({}, element.options, {
	                            onChange: function onChange(newProps) {
	                                var elements = JSON.parse(JSON.stringify(_this.props.elements));
	                                _.extend(elements[n].options, newProps);
	                                _this.change({ elements: elements });
	                            }
	                        }))
	                    );
	                }
	            }, this),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-interaction-editor-select-element" },
	                React.createElement(
	                    "select",
	                    { onChange: this._addNewElement },
	                    React.createElement(
	                        "option",
	                        { value: "" },
	                        "Add an element",
	                        "…"
	                    ),
	                    React.createElement(
	                        "option",
	                        { disabled: true },
	                        "--"
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "point" },
	                        "Point"
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "line" },
	                        "Line segment"
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "function" },
	                        "Function plot"
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "parametric" },
	                        "Parametric plot"
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "label" },
	                        "Label"
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "rectangle" },
	                        "Rectangle"
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "movable-point" },
	                        "★ Movable point"
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "movable-line" },
	                        "★ Movable line segment"
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = InteractionEditor;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, comma-dangle, indent, no-redeclare, no-undef, no-unused-vars, no-var, object-curly-spacing, one-var, prefer-spread, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, space-infix-ops */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Graph = __webpack_require__(191);
	var InfoTip = __webpack_require__(82);
	var Interactive2 = __webpack_require__(188);
	var NumberInput = __webpack_require__(175);
	var Util = __webpack_require__(8);

	var knumber = __webpack_require__(197).number;
	var kpoint = __webpack_require__(197).point;
	var KhanColors = __webpack_require__(189);
	var GraphUtils = __webpack_require__(165);

	var _require = __webpack_require__(80);

	var interactiveSizes = _require.interactiveSizes;

	var _require2 = __webpack_require__(158);

	var containerSizeClassPropType = _require2.containerSizeClassPropType;
	var getInteractiveBoxFromSizeClass = _require2.getInteractiveBoxFromSizeClass;


	var DeprecationMixin = Util.DeprecationMixin;

	var TRASH_ICON_URI = 'https://ka-perseus-graphie.s3.amazonaws.com/b1452c0d79fd0f7ff4c3af9488474a0a0decb361.png';

	var defaultBackgroundImage = {
	    url: null
	};

	var eq = Util.eq;
	var deepEq = Util.deepEq;

	var UNLIMITED = "unlimited";

	// Sample background image:
	// https://ka-perseus-graphie.s3.amazonaws.com/29c1b0fcd17fe63df0f148fe357044d5d5c7d0bb.png

	function ccw(a, b, c) {
	    return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
	}

	function collinear(a, b, c) {
	    return eq(ccw(a, b, c), 0);
	}

	function sign(val) {
	    if (eq(val, 0)) {
	        return 0;
	    } else {
	        return val > 0 ? 1 : -1;
	    }
	}

	// default to defaultValue if actual is null or undefined
	function defaultVal(actual, defaultValue) {
	    return actual == null ? defaultValue : actual;
	}

	// Given rect bounding points A and B, whether point C is inside the rect
	function pointInRect(a, b, c) {
	    return c[0] <= Math.max(a[0], b[0]) && c[0] >= Math.min(a[0], b[0]) && c[1] <= Math.max(a[1], b[1]) && c[1] >= Math.min(a[1], b[1]);
	}

	// Whether line segment AB intersects line segment CD
	// http://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
	function intersects(ab, cd) {
	    var triplets = [[ab[0], ab[1], cd[0]], [ab[0], ab[1], cd[1]], [cd[0], cd[1], ab[0]], [cd[0], cd[1], ab[1]]];

	    var orientations = _.map(triplets, function (triplet) {
	        return sign(ccw.apply(null, triplet));
	    });

	    if (orientations[0] !== orientations[1] && orientations[2] !== orientations[3]) {
	        return true;
	    }

	    for (var i = 0; i < 4; i++) {
	        if (orientations[i] === 0 && pointInRect.apply(null, triplets[i])) {
	            return true;
	        }
	    }

	    return false;
	}

	function vector(a, b) {
	    return _.map(_.zip(a, b), function (pair) {
	        return pair[0] - pair[1];
	    });
	}

	function magnitude(v) {
	    return Math.sqrt(_.reduce(v, function (memo, el) {
	        return memo + Math.pow(el, 2);
	    }, 0));
	}

	function dotProduct(a, b) {
	    return _.reduce(_.zip(a, b), function (memo, pair) {
	        return memo + pair[0] * pair[1];
	    }, 0);
	}

	function sideLengths(coords) {
	    var segments = _.zip(coords, rotate(coords));
	    return _.map(segments, function (segment) {
	        return magnitude(vector.apply(null, segment));
	    });
	}

	// Based on http://math.stackexchange.com/a/151149
	function angleMeasures(coords) {
	    var triplets = _.zip(rotate(coords, -1), coords, rotate(coords, 1));

	    var offsets = _.map(triplets, function (triplet) {
	        var p = vector(triplet[1], triplet[0]);
	        var q = vector(triplet[2], triplet[1]);
	        var raw = Math.acos(dotProduct(p, q) / (magnitude(p) * magnitude(q)));
	        return sign(ccw.apply(null, triplet)) > 0 ? raw : -raw;
	    });

	    var sum = _.reduce(offsets, function (memo, arg) {
	        return memo + arg;
	    }, 0);

	    return _.map(offsets, function (offset) {
	        return sum > 0 ? Math.PI - offset : Math.PI + offset;
	    });
	}

	// Whether two polygons are similar (or if specified, congruent)
	function similar(coords1, coords2, tolerance) {
	    if (coords1.length !== coords2.length) {
	        return false;
	    }

	    var n = coords1.length;

	    var angles1 = angleMeasures(coords1);
	    var angles2 = angleMeasures(coords2);

	    var sides1 = sideLengths(coords1);
	    var sides2 = sideLengths(coords2);

	    for (var i = 0; i < 2 * n; i++) {
	        var angles = angles2.slice();
	        var sides = sides2.slice();

	        // Reverse angles and sides to allow matching reflected polygons
	        if (i >= n) {
	            angles.reverse();
	            sides.reverse();
	            // Since sides are calculated from two coordinates,
	            // simply reversing results in an off by one error
	            sides = rotate(sides, 1);
	        }

	        angles = rotate(angles, i);
	        sides = rotate(sides, i);

	        if (deepEq(angles1, angles)) {
	            var sidePairs = _.zip(sides1, sides);

	            var factors = _.map(sidePairs, function (pair) {
	                return pair[0] / pair[1];
	            });

	            var same = _.all(factors, function (factor) {
	                return eq(factors[0], factor);
	            });

	            var congruentEnough = _.all(sidePairs, function (pair) {
	                return knumber.equal(pair[0], pair[1], tolerance);
	            });

	            if (same && congruentEnough) {
	                return true;
	            }
	        }
	    }

	    return false;
	}

	// Less than or approximately equal
	function leq(a, b) {
	    return a < b || eq(a, b);
	}

	// Given triangle with sides ABC return angle opposite side C in degrees
	function lawOfCosines(a, b, c) {
	    return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180 / Math.PI;
	}

	function canonicalSineCoefficients(coeffs) {
	    // For a curve of the form f(x) = a * Sin(b * x - c) + d,
	    // this function ensures that a, b > 0, and c is its
	    // smallest possible positive value.
	    var amplitude = coeffs[0];
	    var angularFrequency = coeffs[1];
	    var phase = coeffs[2];
	    var verticalOffset = coeffs[3];

	    // Guarantee a > 0
	    if (amplitude < 0) {
	        amplitude *= -1;
	        angularFrequency *= -1;
	        phase *= -1;
	    }

	    var period = 2 * Math.PI;
	    // Guarantee b > 0
	    if (angularFrequency < 0) {
	        angularFrequency *= -1;
	        phase *= -1;
	        phase += period / 2;
	    }

	    // Guarantee c is smallest possible positive value
	    while (phase > 0) {
	        phase -= period;
	    }
	    while (phase < 0) {
	        phase += period;
	    }

	    return [amplitude, angularFrequency, phase, verticalOffset];
	}

	// e.g. rotate([1, 2, 3]) -> [2, 3, 1]
	function rotate(array, n) {
	    n = typeof n === "undefined" ? 1 : n % array.length;
	    return array.slice(n).concat(array.slice(0, n));
	}

	function capitalize(str) {
	    return str.replace(/(?:^|-)(.)/g, function (match, letter) {
	        return letter.toUpperCase();
	    });
	}

	function getLineEquation(first, second) {
	    if (eq(first[0], second[0])) {
	        return "x = " + first[0].toFixed(3);
	    } else {
	        var m = (second[1] - first[1]) / (second[0] - first[0]);
	        var b = first[1] - m * first[0];
	        return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
	    }
	}

	// Stolen from the wikipedia article
	// http://en.wikipedia.org/wiki/Line-line_intersection
	function getLineIntersection(firstPoints, secondPoints) {
	    var x1 = firstPoints[0][0],
	        y1 = firstPoints[0][1],
	        x2 = firstPoints[1][0],
	        y2 = firstPoints[1][1],
	        x3 = secondPoints[0][0],
	        y3 = secondPoints[0][1],
	        x4 = secondPoints[1][0],
	        y4 = secondPoints[1][1];

	    var determinant = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

	    if (Math.abs(determinant) < 1e-9) {
	        return "Lines are parallel";
	    } else {
	        var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / determinant;
	        var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / determinant;
	        return "Intersection: (" + x.toFixed(3) + ", " + y.toFixed(3) + ")";
	    }
	}

	function numSteps(range, step) {
	    return Math.floor((range[1] - range[0]) / step);
	}

	var deprecatedProps = {
	    showGraph: function showGraph(props) {
	        return { markings: props.showGraph ? "graph" : "none" };
	    }
	};

	var InteractiveGraph = React.createClass({
	    displayName: "InteractiveGraph",

	    propTypes: {
	        containerSizeClass: containerSizeClassPropType.isRequired,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getInitialState: function getInitialState() {
	        return {
	            shouldShowInstructions: this._getShouldShowInstructions()
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            labels: ["x", "y"],
	            range: [[-10, 10], [-10, 10]],
	            step: [1, 1],
	            backgroundImage: defaultBackgroundImage,
	            markings: "graph",
	            showProtractor: false,
	            showRuler: false,
	            rulerLabel: "",
	            rulerTicks: 10,
	            graph: {
	                type: "linear"
	            }
	        };
	    },

	    mixins: [DeprecationMixin],
	    deprecatedProps: deprecatedProps,

	    _getShouldShowInstructions: function _getShouldShowInstructions(props) {
	        props = props || this.props;
	        return this.isClickToAddPoints(props) && (props.graph.coords == null || props.graph.coords.length === 0);
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	        var oldType = prevProps.graph.type;
	        var newType = this.props.graph.type;
	        if (oldType !== newType || prevProps.graph.allowReflexAngles !== this.props.graph.allowReflexAngles || prevProps.graph.angleOffsetDeg !== this.props.graph.angleOffsetDeg || prevProps.graph.numPoints !== this.props.graph.numPoints || prevProps.graph.numSides !== this.props.graph.numSides || prevProps.graph.numSegments !== this.props.graph.numSegments || prevProps.graph.showAngles !== this.props.graph.showAngles || prevProps.graph.showSides !== this.props.graph.showSides || prevProps.graph.snapTo !== this.props.graph.snapTo || prevProps.graph.snapDegrees !== this.props.graph.snapDegrees) {
	            this["remove" + capitalize(oldType) + "Controls"]();
	            this["add" + capitalize(newType) + "Controls"]();
	        }
	        if (this.shouldResetGraphie) {
	            this.resetGraphie();
	        }
	    },

	    render: function render() {
	        var _this = this;

	        var typeSelect;
	        var extraOptions;
	        if (this.props.flexibleType) {
	            typeSelect = React.createElement(
	                "select",
	                {
	                    value: this.props.graph.type,
	                    onChange: function onChange(e) {
	                        var type = e.target.value;
	                        _this.onChange({
	                            graph: { type: type }
	                        });
	                    } },
	                React.createElement(
	                    "option",
	                    { value: "linear" },
	                    "Linear function"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "quadratic" },
	                    "Quadratic function"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "sinusoid" },
	                    "Sinusoid function"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "circle" },
	                    "Circle"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "point" },
	                    "Point(s)"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "linear-system" },
	                    "Linear System"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "polygon" },
	                    "Polygon"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "segment" },
	                    "Line Segment(s)"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "ray" },
	                    "Ray"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "angle" },
	                    "Angle"
	                )
	            );

	            if (this.props.graph.type === "point") {
	                extraOptions = React.createElement(
	                    "select",
	                    {
	                        key: "point-select",
	                        value: this.props.graph.numPoints || 1,
	                        onChange: function onChange(e) {
	                            // Convert numbers, leave UNLIMITED intact:
	                            var num = +e.target.value || e.target.value;
	                            _this.onChange({
	                                graph: {
	                                    type: "point",
	                                    numPoints: num,
	                                    coords: null
	                                }
	                            });
	                        } },
	                    _.map(_.range(1, 7), function (n) {
	                        return React.createElement(
	                            "option",
	                            { value: n },
	                            n,
	                            " point",
	                            n > 1 && "s"
	                        );
	                    }),
	                    React.createElement(
	                        "option",
	                        { value: UNLIMITED },
	                        "unlimited"
	                    )
	                );
	            } else if (this.props.graph.type === "polygon") {
	                extraOptions = React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "select",
	                            {
	                                key: "polygon-select",
	                                value: this.props.graph.numSides || 3,
	                                onChange: function onChange(e) {
	                                    // Convert numbers, leave UNLIMITED intact:
	                                    var num = +e.target.value || e.target.value;
	                                    var graph = _.extend({}, _this.props.graph, {
	                                        numSides: num,
	                                        coords: null,
	                                        snapTo: "grid" // reset the snap for
	                                        // UNLIMITED, which only
	                                        // supports "grid"
	                                    });
	                                    _this.onChange({ graph: graph });
	                                } },
	                            _.map(_.range(3, 13), function (n) {
	                                return React.createElement(
	                                    "option",
	                                    { value: n },
	                                    n,
	                                    " sides"
	                                );
	                            }),
	                            React.createElement(
	                                "option",
	                                { value: UNLIMITED },
	                                "unlimited sides"
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "label",
	                            null,
	                            " Snap to",
	                            ' ',
	                            React.createElement(
	                                "select",
	                                {
	                                    key: "polygon-snap",
	                                    value: this.props.graph.snapTo,
	                                    onChange: function onChange(e) {
	                                        var graph = _.extend({}, _this.props.graph, {
	                                            snapTo: e.target.value,
	                                            coords: null
	                                        });
	                                        _this.onChange({ graph: graph });
	                                    } },
	                                React.createElement(
	                                    "option",
	                                    { value: "grid" },
	                                    "grid"
	                                ),
	                                this.props.graph.numSides !== UNLIMITED && [React.createElement(
	                                    "option",
	                                    { value: "angles" },
	                                    ' ',
	                                    "interior angles",
	                                    ' '
	                                ), React.createElement(
	                                    "option",
	                                    { value: "sides" },
	                                    ' ',
	                                    "side measures",
	                                    ' '
	                                )]
	                            )
	                        ),
	                        React.createElement(
	                            InfoTip,
	                            null,
	                            React.createElement(
	                                "p",
	                                null,
	                                "These options affect the movement of the vertex points. The grid option will guide the points to the nearest half step along the grid."
	                            ),
	                            React.createElement(
	                                "p",
	                                null,
	                                "The interior angle and side measure options guide the points to the nearest whole angle or side"
	                            ),
	                            " measure respectively.",
	                            ' '
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "label",
	                            null,
	                            "Show angle measures:",
	                            ' ',
	                            React.createElement("input", { type: "checkbox",
	                                checked: this.props.graph.showAngles,
	                                onChange: this.toggleShowAngles })
	                        ),
	                        React.createElement(
	                            InfoTip,
	                            null,
	                            React.createElement(
	                                "p",
	                                null,
	                                "Displays the interior angle measures."
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "label",
	                            null,
	                            "Show side measures:",
	                            ' ',
	                            React.createElement("input", { type: "checkbox",
	                                checked: this.props.graph.showSides,
	                                onChange: this.toggleShowSides })
	                        ),
	                        React.createElement(
	                            InfoTip,
	                            null,
	                            React.createElement(
	                                "p",
	                                null,
	                                "Displays the side lengths."
	                            )
	                        )
	                    )
	                );
	            } else if (this.props.graph.type === "segment") {
	                extraOptions = React.createElement(
	                    "select",
	                    {
	                        key: "segment-select",
	                        value: this.props.graph.numSegments || 1,
	                        onChange: function onChange(e) {
	                            var num = +e.target.value;
	                            _this.onChange({
	                                graph: {
	                                    type: "segment",
	                                    numSegments: num,
	                                    coords: null
	                                }
	                            });
	                        } },
	                    _.map(_.range(1, 7), function (n) {
	                        return React.createElement(
	                            "option",
	                            { value: n },
	                            n,
	                            " segment",
	                            n > 1 && "s"
	                        );
	                    })
	                );
	            } else if (this.props.graph.type === "angle") {
	                var allowReflexAngles = defaultVal(this.props.graph.allowReflexAngles, true);
	                extraOptions = React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "label",
	                            null,
	                            "Show angle measure:",
	                            ' ',
	                            React.createElement("input", { type: "checkbox",
	                                checked: this.props.graph.showAngles,
	                                onChange: this.toggleShowAngles })
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "label",
	                            null,
	                            "Allow reflex angles:",
	                            ' ',
	                            React.createElement("input", { type: "checkbox",
	                                checked: allowReflexAngles,
	                                onChange: function onChange(newVal) {
	                                    _this.onChange({
	                                        graph: _.extend({}, _this.props.graph, {
	                                            allowReflexAngles: !allowReflexAngles,
	                                            coords: null
	                                        })
	                                    });
	                                } })
	                        ),
	                        React.createElement(
	                            InfoTip,
	                            null,
	                            React.createElement(
	                                "p",
	                                null,
	                                "Reflex angles are angles with a measure greater than 180 degrees."
	                            ),
	                            React.createElement(
	                                "p",
	                                null,
	                                "By default, these should remain enabled."
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "label",
	                            null,
	                            "Snap to increments of",
	                            ' ',
	                            React.createElement(NumberInput, {
	                                key: "degree-snap",
	                                placeholder: 1,
	                                value: this.props.graph.snapDegrees,
	                                onChange: function onChange(newVal) {
	                                    _this.onChange({
	                                        graph: _.extend({}, _this.props.graph, {
	                                            snapDegrees: Math.abs(newVal),
	                                            coords: null
	                                        })
	                                    });
	                                } }),
	                            ' ',
	                            "degrees",
	                            ' '
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "label",
	                            null,
	                            ' ',
	                            "With an offset of",
	                            ' ',
	                            React.createElement(NumberInput, {
	                                key: "angle-offset",
	                                placeholder: 0,
	                                value: this.props.graph.angleOffsetDeg,
	                                onChange: function onChange(newVal) {
	                                    _this.onChange({
	                                        graph: _.extend({}, _this.props.graph, {
	                                            angleOffsetDeg: newVal,
	                                            coords: null
	                                        })
	                                    });
	                                } }),
	                            ' ',
	                            "degrees",
	                            ' '
	                        )
	                    )
	                );
	            }
	        }

	        var box = getInteractiveBoxFromSizeClass(this.props.containerSizeClass);

	        var instructions;
	        if (this.isClickToAddPoints() && this.state.shouldShowInstructions) {
	            if (this.props.graph.type === "point") {
	                instructions = i18n._("Click to add points");
	            } else if (this.props.graph.type === "polygon") {
	                instructions = i18n._("Click to add vertices");
	            }
	        } else {
	            instructions = undefined;
	        }

	        var onMouseDown = this.isClickToAddPoints() ? this.handleAddPointsMouseDown : null;

	        var gridStep = this.props.gridStep || Util.getGridStep(this.props.range, this.props.step, box[0]);
	        var snapStep = this.props.snapStep || Util.snapStepFromGridStep(gridStep);

	        return React.createElement(
	            "div",
	            { className: "perseus-widget " + "perseus-widget-interactive-graph",
	                style: {
	                    width: box[0],
	                    height: this.props.flexibleType ? "auto" : box[1]
	                } },
	            React.createElement(Graph, {
	                instructions: instructions,
	                ref: "graph",
	                box: box,
	                labels: this.props.labels,
	                range: this.props.range,
	                step: this.props.step,
	                gridStep: gridStep,
	                snapStep: snapStep,
	                markings: this.props.markings,
	                backgroundImage: this.props.backgroundImage,
	                showProtractor: this.props.showProtractor,
	                showRuler: this.props.showRuler,
	                rulerLabel: this.props.rulerLabel,
	                rulerTicks: this.props.rulerTicks,
	                onMouseDown: onMouseDown,
	                onGraphieUpdated: this.setGraphie }),
	            typeSelect,
	            extraOptions
	        );
	    },

	    componentDidMount: function componentDidMount() {
	        this.setGraphie(this.refs.graph.graphie());
	    },

	    setGraphie: function setGraphie(newGraphie) {
	        this.graphie = newGraphie;
	        this.setupGraphie();
	    },

	    handleAddPointsMouseDown: function handleAddPointsMouseDown(coord) {
	        // This function should only be called when this.isClickToAddPoints()
	        // is true
	        if (!this.isClickToAddPoints()) {
	            throw new Error("handleAddPointsClick should not be registered" + "when isClickToAddPoints() is false");
	        }
	        if (!this.isCoordInTrash(coord)) {
	            var point;
	            if (this.props.graph.type === "point") {
	                point = this.createPointForPointsType(coord, this.points.length);
	                if (!point.constrain()) {
	                    point.remove();
	                    return;
	                }
	                this.points.push(point);

	                // interactive2 allows us to grab the point
	                var idx = this.points.length - 1;
	                this.points[idx].grab(coord);

	                this.updateCoordsFromPoints();
	            } else if (this.props.graph.type === "polygon") {
	                if (this.polygon.closed()) {
	                    return;
	                }
	                point = this.createPointForPolygonType(coord, this.points.length);
	                this.points.push(point);

	                var idx = this.points.length - 1;
	                this.points[idx].grab(coord);

	                // We don't call updateCoordsFromPoints for
	                // polygons, since the polygon won't be
	                // closed yet.
	                this.updatePolygon();
	            }

	            this.setState({
	                shouldShowInstructions: false
	            });
	        }
	    },

	    resetGraphie: function resetGraphie() {
	        this.shouldResetGraphie = false;
	        this.refs.graph.reset();
	    },

	    setupGraphie: function setupGraphie() {
	        this.setTrashCanVisibility(0);
	        if (this.isClickToAddPoints()) {
	            this.setTrashCanVisibility(0.5);
	        }

	        var type = this.props.graph.type;
	        this["add" + capitalize(type) + "Controls"]();
	    },

	    setTrashCanVisibility: function setTrashCanVisibility(opacity) {
	        var graphie = this.graphie;

	        if (knumber.equal(opacity, 0)) {
	            if (this.trashCan) {
	                this.trashCan.remove();
	                this.trashCan = null;
	            }
	        } else {
	            if (!this.trashCan) {
	                this.trashCan = graphie.raphael.image(TRASH_ICON_URI, graphie.xpixels - 40, graphie.ypixels - 40, 40, 40);
	            }
	            this.trashCan.attr({
	                opacity: opacity
	            });
	        }
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if (this.isClickToAddPoints() !== this.isClickToAddPoints(nextProps)) {
	            this.shouldResetGraphie = true;
	            this.setState({
	                shouldShowInstructions: this._getShouldShowInstructions(nextProps)
	            });
	        }

	        if (this.props.containerSizeClass !== nextProps.containerSizeClass) {
	            this.shouldResetGraphie = true;
	        }
	    },

	    isClickToAddPoints: function isClickToAddPoints(props) {
	        props = props || this.props;
	        return props.graph.type === "point" && props.graph.numPoints === UNLIMITED || props.graph.type === "polygon" && props.graph.numSides === UNLIMITED;
	    },

	    addLine: function addLine(type) {
	        var self = this;
	        var graphie = self.graphie;
	        var coords = InteractiveGraph.getLineCoords(self.props.graph, self.props);

	        var points = self.points = _.map(coords, function (coord) {
	            return Interactive2.addMovablePoint(graphie, {
	                coord: coord,
	                constraints: [Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap()],
	                onMove: function onMove() {
	                    var graph = _.extend({}, self.props.graph, {
	                        coords: _.invoke(points, "coord")
	                    });
	                    self.onChange({ graph: graph });
	                },
	                normalStyle: {
	                    stroke: KhanColors.INTERACTIVE,
	                    fill: KhanColors.INTERACTIVE
	                }
	            });
	        });

	        var lineConfig = {
	            points: points,
	            static: true
	        };

	        if (type === "line") {
	            lineConfig.extendLine = true;
	        } else if (type === "ray") {
	            lineConfig.extendRay = true;
	        }

	        var line = self.line = Interactive2.addMovableLine(graphie, lineConfig);

	        // A and B can't be in the same place
	        points[0].listen("constraints", "isLine", function (coord) {
	            return !kpoint.equal(coord, points[1].coord());
	        });
	        points[1].listen("constraints", "isLine", function (coord) {
	            return !kpoint.equal(coord, points[0].coord());
	        });
	    },

	    removeLine: function removeLine() {
	        _.invoke(this.points, "remove");
	        this.line.remove();
	    },

	    addLinearControls: function addLinearControls() {
	        this.addLine("line");
	    },

	    removeLinearControls: function removeLinearControls() {
	        this.removeLine();
	    },

	    addQuadraticControls: function addQuadraticControls() {
	        var _this2 = this;

	        var graphie = this.graphie;
	        var coords = this.props.graph.coords;
	        if (!coords) {
	            coords = InteractiveGraph.defaultQuadraticCoords(this.props);
	        }

	        var pointA;
	        var pointB;
	        var pointC;
	        var onMoveHandler = function onMoveHandler() {
	            var graph = _.extend({}, _this2.props.graph, {
	                coords: [pointA.coord(), pointB.coord(), pointC.coord()]
	            });
	            _this2.onChange({ graph: graph });
	            _this2.updateQuadratic();
	        };

	        pointA = this.pointA = Interactive2.addMovablePoint(graphie, {
	            coord: coords[0],
	            constraints: [Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function (coord) {
	                return !pointA || coord[0] !== pointB.coord()[0] && coord[0] !== pointC.coord()[0];
	            }],
	            onMove: onMoveHandler
	        });

	        pointB = this.pointB = Interactive2.addMovablePoint(graphie, {
	            coord: coords[1],
	            constraints: [Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function (coord) {
	                return !pointB || coord[0] !== pointA.coord()[0] && coord[0] !== pointC.coord()[0];
	            }],
	            onMove: onMoveHandler
	        });

	        pointC = this.pointC = Interactive2.addMovablePoint(graphie, {
	            coord: coords[2],
	            constraints: [Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function (coord) {
	                return !pointC || coord[0] !== pointA.coord()[0] && coord[0] !== pointB.coord()[0];
	            }],
	            onMove: onMoveHandler
	        });

	        this.updateQuadratic();
	    },

	    updateQuadratic: function updateQuadratic() {
	        var coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(this.props);
	        if (!coeffs) {
	            return;
	        }

	        // Extract coefficients the parabola
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2];

	        // Plot and style
	        if (this.parabola) {
	            var path = this.graphie.svgParabolaPath(a, b, c);
	            this.parabola.attr({ path: path });
	        } else {
	            this.parabola = this.graphie.parabola(a, b, c);
	            this.parabola.attr({ stroke: KhanColors.DYNAMIC });
	            this.parabola.toBack();
	        }
	    },

	    removeQuadraticControls: function removeQuadraticControls() {
	        this.pointA.remove();
	        this.pointB.remove();
	        this.pointC.remove();
	        if (this.parabola) {
	            this.parabola.remove();
	            this.parabola = null;
	        }
	    },

	    addSinusoidControls: function addSinusoidControls() {
	        var _this3 = this;

	        var graphie = this.graphie;
	        var coords = this.props.graph.coords;
	        if (!coords) {
	            coords = InteractiveGraph.defaultSinusoidCoords(this.props);
	        }

	        var pointA;
	        var pointB;
	        var onMoveHandler = function onMoveHandler() {
	            var graph = _.extend({}, _this3.props.graph, {
	                coords: [pointA.coord(), pointB.coord()]
	            });
	            _this3.onChange({ graph: graph });
	            _this3.updateSinusoid();
	        };

	        pointA = this.pointA = Interactive2.addMovablePoint(graphie, {
	            coord: coords[0],
	            constraints: [Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function (coord) {
	                return !pointA || coord[0] !== pointB.coord()[0];
	            }],
	            onMove: onMoveHandler
	        });

	        pointB = this.pointB = Interactive2.addMovablePoint(graphie, {
	            coord: coords[1],
	            constraints: [Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function (coord) {
	                return !pointA || coord[0] !== pointA.coord()[0];
	            }],
	            onMove: onMoveHandler
	        });

	        this.updateSinusoid();
	    },

	    updateSinusoid: function updateSinusoid() {
	        var coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(this.props);
	        if (!coeffs) {
	            return;
	        }

	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2],
	            d = coeffs[3];

	        // Plot and style
	        if (this.sinusoid) {
	            var path = this.graphie.svgSinusoidPath(a, b, c, d);
	            this.sinusoid.attr({ path: path });
	        } else {
	            this.sinusoid = this.graphie.sinusoid(a, b, c, d);
	            this.sinusoid.attr({ stroke: KhanColors.DYNAMIC });
	            this.sinusoid.toBack();
	        }
	    },

	    removeSinusoidControls: function removeSinusoidControls() {
	        this.pointA.remove();
	        this.pointB.remove();
	        if (this.sinusoid) {
	            this.sinusoid.remove();
	            this.sinusoid = null;
	        }
	    },

	    addCircleControls: function addCircleControls() {
	        var _this4 = this;

	        var graphie = this.graphie;
	        var minSnap = _.min(graphie.snap);

	        var circle = this.circle = graphie.addCircleGraph({
	            center: this.props.graph.center || [0, 0],
	            radius: this.props.graph.radius || _.min(this.props.step),
	            snapX: graphie.snap[0],
	            snapY: graphie.snap[1],
	            minRadius: minSnap * 2,
	            snapRadius: minSnap
	        });

	        $(circle).on("move", function () {
	            var graph = _.extend({}, _this4.props.graph, {
	                center: circle.center,
	                radius: circle.radius
	            });
	            _this4.onChange({ graph: graph });
	        });
	    },

	    removeCircleControls: function removeCircleControls() {
	        this.circle.remove();
	    },

	    addLinearSystemControls: function addLinearSystemControls() {
	        var _this5 = this;

	        var graphie = this.graphie;
	        var coords = InteractiveGraph.getLinearSystemCoords(this.props.graph, this.props);

	        var segmentColors = [KhanColors.INTERACTIVE, KhanColors.GREEN];
	        var points = this.points = _.map(coords, function (segmentCoords, segmentIndex) {
	            var segmentPoints = _.map(segmentCoords, function (coord, i) {
	                return Interactive2.addMovablePoint(graphie, {
	                    coord: coord,
	                    constraints: [Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function (coord) {
	                        if (!segmentPoints) {
	                            // points hasn't been defined yet because
	                            // we're still creating them
	                            return;
	                        }
	                        return !kpoint.equal(coord, segmentPoints[1 - i].coord());
	                    }],
	                    onMove: function onMove() {
	                        var graph = _.extend({}, _this5.props.graph, {
	                            coords: _.map(_this5.points, function (segment) {
	                                return _.invoke(segment, "coord");
	                            })
	                        });
	                        _this5.onChange({ graph: graph });
	                    },
	                    normalStyle: {
	                        stroke: segmentColors[segmentIndex],
	                        fill: segmentColors[segmentIndex]
	                    }
	                });
	            });
	            return segmentPoints;
	        });

	        var lines = this.lines = _.map(points, function (segmentPoints, segmentIndex) {
	            return Interactive2.addMovableLine(graphie, {
	                points: segmentPoints,
	                static: true,
	                extendLine: true,
	                normalStyle: {
	                    stroke: segmentColors[segmentIndex]
	                }
	            });
	        });
	    },

	    removeLinearSystemControls: function removeLinearSystemControls() {
	        _.invoke(this.lines, "remove");
	        _.map(this.points, function (segment) {
	            return _.invoke(segment, "remove");
	        });
	    },

	    isCoordInTrash: function isCoordInTrash(coord) {
	        var graphie = this.graphie;
	        var screenPoint = graphie.scalePoint(coord);
	        return screenPoint[0] >= graphie.xpixels - 40 && screenPoint[1] >= graphie.ypixels - 40;
	    },

	    createPointForPointsType: function createPointForPointsType(coord, i) {
	        var self = this;
	        var graphie = self.graphie;
	        var point = Interactive2.addMovablePoint(graphie, {
	            coord: coord,
	            constraints: [Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function (coord) {
	                // TODO(jack): There ought to be a
	                // MovablePoint.constraints.avoid
	                // default that lets you do things like this
	                return _.all(self.points, function (pt) {
	                    return point === pt || !kpoint.equal(coord, pt.coord());
	                });
	            }],
	            onMoveStart: function onMoveStart() {
	                if (self.isClickToAddPoints()) {
	                    self.setTrashCanVisibility(1);
	                }
	            },
	            onMove: self.updateCoordsFromPoints,
	            onMoveEnd: function onMoveEnd(coord) {
	                if (self.isClickToAddPoints()) {
	                    if (self.isCoordInTrash(coord)) {
	                        // remove this point from points
	                        self.points = _.filter(self.points, function (pt) {
	                            return pt !== point;
	                        });
	                        // update the correct answer box
	                        self.updateCoordsFromPoints();

	                        // remove this movablePoint from graphie.
	                        // we wait to do this until we're not inside of
	                        // said point's onMoveEnd method so its state is
	                        // consistent throughout this method call
	                        setTimeout(point.remove.bind(point), 0);
	                    }
	                    // In case we mouseup'd off the graphie and that
	                    // stopped the move (in which case, we might not
	                    // be in isCoordInTrash()
	                    self.setTrashCanVisibility(0.5);
	                }
	            },
	            normalStyle: {
	                stroke: KhanColors.INTERACTIVE,
	                fill: KhanColors.INTERACTIVE
	            }
	        });

	        return point;
	    },

	    removePoint: function removePoint(point) {
	        var index = null;
	        this.points = _.filter(this.points, function (pt, i) {
	            if (pt === point) {
	                index = i;
	                return false;
	            } else {
	                return true;
	            }
	        });
	        return index;
	    },

	    createPointForPolygonType: function createPointForPolygonType(coord, i) {
	        var _this6 = this;

	        var graphie = this.graphie;

	        // TODO(alex): check against "grid" instead, use constants
	        var snapToGrid = !_.contains(["angles", "sides"], this.props.graph.snapTo);

	        // Index relative to current point -> absolute index
	        // NOTE: This does not work when isClickToAddPoints() == true,
	        // as `i` can be changed by dragging a point to the trash
	        // Currently this function is only called when !isClickToAddPoints()
	        var rel = function rel(j) {
	            return (i + j + _this6.points.length) % _this6.points.length;
	        };

	        var onMoveEndHandler = function onMoveEndHandler(coord) {
	            if (_this6.isClickToAddPoints()) {
	                if (_this6.isCoordInTrash(coord)) {
	                    // remove this point from points
	                    var index = _this6.removePoint(point);
	                    if (_this6.polygon.closed()) {
	                        _this6.points = rotate(_this6.points, index);
	                        _this6.polygon.update({ closed: false });
	                    }
	                    _this6.updatePolygon();
	                    // the polygon is now unclosed, so we need to
	                    // remove any points props
	                    _this6.clearCoords();

	                    // remove this movablePoint from graphie.
	                    // wait to do this until we're not inside of
	                    // said point's onMoveEnd method so state is
	                    // consistent throughout the method call
	                    setTimeout(point.remove.bind(point), 0);
	                } else if (_this6.points.length > 1 && (point === _this6.points[0] && kpoint.equal(coord, _.last(_this6.points).coord()) || point === _.last(_this6.points) && kpoint.equal(coord, _this6.points[0].coord()))) {
	                    // If the user clicked and dragged a point over endpoint,
	                    // join the them
	                    var pointToRemove = _this6.points.pop();
	                    if (_this6.points.length > 2) {
	                        _this6.polygon.update({ closed: true });
	                        _this6.updateCoordsFromPoints();
	                    } else {
	                        _this6.polygon.update({ closed: false });
	                        _this6.clearCoords();
	                    }
	                    _this6.updatePolygon();
	                    // remove this movablePoint from graphie.
	                    // wait to do this until we're not inside of
	                    // said point's onMoveEnd method so state is
	                    // consistent throughout the method call
	                    setTimeout(pointToRemove.remove.bind(pointToRemove), 0);
	                } else {
	                    // If the user clicked and dragged a point over any other
	                    // existing point, fix shape
	                    var shouldRemove = _.any(_this6.points, function (pt) {
	                        return pt !== point && kpoint.equal(pt.coord(), coord);
	                    });
	                    if (shouldRemove) {
	                        _this6.removePoint(point);

	                        if (_this6.points.length < 3) {
	                            _this6.polygon.update({ closed: false });
	                            _this6.clearCoords();
	                        } else if (_this6.polygon.closed()) {
	                            _this6.updateCoordsFromPoints();
	                        }
	                        _this6.updatePolygon();
	                        // remove this movablePoint from graphie.
	                        // wait to do this until we're not inside
	                        // said point's onMoveEnd method so state
	                        // is consistent throughout the method call
	                        setTimeout(point.remove.bind(point), 0);
	                    } else {
	                        // If this was
	                        //  * not a deletion
	                        //  * and a click on the first or last point
	                        //  * and not a drag,
	                        //  * and not a creation of a new point
	                        //    (see !point.state.isInitialMove, below),
	                        //  * and our polygon is not closed,
	                        //  * and we can close it (we need at least 3 points),
	                        // then close it
	                        if ((point === _this6.points[0] || point === _.last(_this6.points)) && !point.hasMoved() && !point.state.isInitialMove && !_this6.polygon.closed() && _this6.points.length > 2) {

	                            _this6.polygon.update({ closed: true });
	                            _this6.updatePolygon();

	                            // We finally have a closed polygon, so save our
	                            // points to props
	                            _this6.updateCoordsFromPoints();
	                        }
	                    }
	                }

	                // In case we mouseup'd off the graphie and that
	                // stopped the move
	                _this6.setTrashCanVisibility(0.5);
	            }

	            point.state.isInitialMove = false;
	        };

	        var graphConstraint = function graphConstraint(coord) {
	            // These constraints are all relative to the other points, so if
	            // we're creating the initial points and haven't added any others
	            // to the graph, we can't enforce them.
	            if (_this6.points == null || _this6.points.length === 0) {
	                return true;
	            }

	            var coords = _.invoke(_this6.points, "coord");
	            coords[i] = coord;

	            // Check for invalid positioning, but only if we aren't adding
	            // points one click at a time, since those added points could
	            // have already violated these constraints
	            if (!_this6.isClickToAddPoints()) {
	                // Polygons can't have consecutive collinear points
	                if (collinear(coords[rel(-2)], coords[rel(-1)], coords[i]) || collinear(coords[rel(-1)], coords[i], coords[rel(1)]) || collinear(coords[i], coords[rel(1)], coords[rel(2)])) {
	                    return false;
	                }

	                var segments = _.zip(coords, rotate(coords));

	                if (_this6.points.length > 3) {
	                    // Constrain to simple (non self-intersecting) polygon by
	                    // testing whether adjacent segments intersect any others
	                    for (var j = -1; j <= 0; j++) {
	                        var segment = segments[rel(j)];
	                        var others = _.without(segments, segment, segments[rel(j - 1)], segments[rel(j + 1)]);

	                        for (var k = 0; k < others.length; k++) {
	                            var other = others[k];
	                            if (intersects(segment, other)) {
	                                return false;
	                            }
	                        }
	                    }
	                }
	            }

	            if (_this6.props.graph.snapTo === "angles" && _this6.points.length > 2) {
	                // Snap to whole degree interior angles

	                var angles = _.map(angleMeasures(coords), function (rad) {
	                    return rad * 180 / Math.PI;
	                });

	                _.each([-1, 1], function (j) {
	                    angles[rel(j)] = Math.round(angles[rel(j)]);
	                });

	                var getAngle = function getAngle(a, vertex, b) {
	                    var angle = GraphUtils.findAngle(coords[rel(a)], coords[rel(b)], coords[rel(vertex)]);
	                    return (angle + 360) % 360;
	                };

	                var innerAngles = [angles[rel(-1)] - getAngle(-2, -1, 1), angles[rel(1)] - getAngle(-1, 1, 2)];
	                innerAngles[2] = 180 - (innerAngles[0] + innerAngles[1]);

	                // Avoid degenerate triangles
	                if (_.any(innerAngles, function (angle) {
	                    return leq(angle, 1);
	                })) {
	                    return false;
	                }

	                var knownSide = magnitude(vector(coords[rel(-1)], coords[rel(1)]));

	                var onLeft = sign(ccw(coords[rel(-1)], coords[rel(1)], coords[i])) === 1;

	                // Solve for side by using the law of sines
	                var side = Math.sin(innerAngles[1] * Math.PI / 180) / Math.sin(innerAngles[2] * Math.PI / 180) * knownSide;

	                var outerAngle = GraphUtils.findAngle(coords[rel(1)], coords[rel(-1)]);

	                var offset = _this6.graphie.polar(side, outerAngle + (onLeft ? 1 : -1) * innerAngles[0]);

	                return _this6.graphie.addPoints(coords[rel(-1)], offset);
	            } else if (_this6.props.graph.snapTo === "sides" && _this6.points.length > 1) {
	                // Snap to whole unit side measures

	                var sides = _.map([[coords[rel(-1)], coords[i]], [coords[i], coords[rel(1)]], [coords[rel(-1)], coords[rel(1)]]], function (coords) {
	                    return magnitude(vector.apply(null, coords));
	                });

	                _.each([0, 1], function (j) {
	                    sides[j] = Math.round(sides[j]);
	                });

	                // Avoid degenerate triangles
	                if (leq(sides[1] + sides[2], sides[0]) || leq(sides[0] + sides[2], sides[1]) || leq(sides[0] + sides[1], sides[2])) {
	                    return false;
	                }

	                // Solve for angle by using the law of cosines
	                var innerAngle = lawOfCosines(sides[0], sides[2], sides[1]);

	                var outerAngle = GraphUtils.findAngle(coords[rel(1)], coords[rel(-1)]);

	                var onLeft = sign(ccw(coords[rel(-1)], coords[rel(1)], coords[i])) === 1;

	                var offset = _this6.graphie.polar(sides[0], outerAngle + (onLeft ? 1 : -1) * innerAngle);

	                return _this6.graphie.addPoints(coords[rel(-1)], offset);
	            } else {
	                // Snap to grid (already done)
	                return true;
	            }
	        };

	        var point = Interactive2.addMovablePoint(graphie, {
	            coord: coord,
	            constraints: [Interactive2.MovablePoint.constraints.bound(), snapToGrid ? Interactive2.MovablePoint.constraints.snap() : null, graphConstraint],
	            onMoveStart: function onMoveStart() {
	                if (_this6.isClickToAddPoints()) {
	                    _this6.setTrashCanVisibility(1);
	                }
	            },
	            onMove: function onMove() {
	                if (_this6.polygon.closed()) {
	                    _this6.updateCoordsFromPoints();
	                }
	            },
	            onMoveEnd: onMoveEndHandler,
	            normalStyle: {
	                stroke: KhanColors.INTERACTIVE,
	                fill: KhanColors.INTERACTIVE
	            }
	        });
	        point.state.isInitialMove = true;

	        return point;
	    },

	    updateCoordsFromPoints: function updateCoordsFromPoints() {
	        var graph = _.extend({}, this.props.graph, {
	            // Handle old movable points with .coord, or
	            // Interactive2.MovablePoint's with .coord()
	            coords: _.map(this.points, function (point) {
	                return _.result(point, "coord");
	            })
	        });
	        this.onChange({ graph: graph });
	    },

	    clearCoords: function clearCoords() {
	        var graph = _.extend({}, this.props.graph, {
	            coords: null
	        });
	        this.onChange({ graph: graph });
	    },

	    onChange: function onChange(data) {
	        this.props.onChange(data);
	        this.props.trackInteraction();
	    },

	    addPointControls: function addPointControls() {
	        var coords = InteractiveGraph.getPointCoords(this.props.graph, this.props);
	        // Clear out our old points so that newly added points don't
	        // "collide" with them and reposition when being added
	        // Without this, when added, each point checks whether it is on top
	        // of a point in this.points, which (a) shouldn't matter since
	        // we're clearing out this.points anyways, and (b) can cause problems
	        // if each of this.points is a MovablePoint instead of an
	        // Interactive2.MovablePoint, since one has a .coord and the other
	        // has .coord()
	        // TODO(jack): Figure out a better way to do this
	        this.points = [];
	        this.points = _.map(coords, this.createPointForPointsType, this);
	    },

	    removePointControls: function removePointControls() {
	        _.invoke(this.points, "remove");
	    },

	    addSegmentControls: function addSegmentControls() {
	        var self = this;
	        var graphie = this.graphie;

	        var coords = InteractiveGraph.getSegmentCoords(this.props.graph, this.props);

	        this.points = [];
	        this.lines = _.map(coords, function (segment, i) {
	            var updateCoordProps = function updateCoordProps() {
	                var graph = _.extend({}, self.props.graph, {
	                    coords: _.invoke(self.lines, "coords")
	                });
	                self.onChange({ graph: graph });
	            };

	            var points = _.map(segment, function (coord, i) {
	                return Interactive2.addMovablePoint(graphie, {
	                    coord: coord,
	                    normalStyle: {
	                        stroke: KhanColors.INTERACTIVE,
	                        fill: KhanColors.INTERACTIVE
	                    },
	                    constraints: [Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function (coord) {
	                        if (!points) {
	                            // points hasn't been defined yet because
	                            // we're still creating them
	                            return;
	                        }
	                        return !kpoint.equal(coord, points[1 - i].coord());
	                    }],
	                    onMove: updateCoordProps
	                });
	            });

	            self.points = self.points.concat(points);
	            var line = Interactive2.addMovableLine(graphie, {
	                points: points,
	                static: false,
	                constraints: [Interactive2.MovableLine.constraints.bound(), Interactive2.MovableLine.constraints.snap()],
	                onMove: [Interactive2.MovableLine.onMove.updatePoints, updateCoordProps],
	                normalStyle: {
	                    stroke: KhanColors.INTERACTIVE
	                },
	                highlightStyle: {
	                    stroke: KhanColors.INTERACTING
	                }
	            });
	            _.invoke(points, "toFront");

	            return line;
	        }, this);
	    },

	    removeSegmentControls: function removeSegmentControls() {
	        _.invoke(this.points, "remove");
	        _.invoke(this.lines, "remove");
	    },

	    addRayControls: function addRayControls() {
	        this.addLine("ray");
	    },

	    removeRayControls: function removeRayControls() {
	        this.removeLine();
	    },

	    addPolygonControls: function addPolygonControls() {
	        this.polygon = null;
	        var coords = InteractiveGraph.getPolygonCoords(this.props.graph, this.props);
	        // Clear out our old points so that newly added points don't
	        // "collide", as in `addPointControls`
	        this.points = [];
	        this.points = _.map(coords, this.createPointForPolygonType, this);
	        this.updatePolygon();
	    },

	    updatePolygon: function updatePolygon() {
	        var closed;
	        if (this.polygon) {
	            closed = this.polygon.closed();
	        } else if (this.points.length >= 3) {
	            closed = true;
	        } else {
	            // There will only be fewer than 3 points in click-to-add-vertices
	            // mode, so we don't need to explicitly check for that here.
	            closed = false;
	        }

	        var graphie = this.graphie;
	        var n = this.points.length;

	        // TODO(alex): check against "grid" instead, use constants
	        var snapToGrid = !_.contains(["angles", "sides"], this.props.graph.snapTo);

	        var angleLabels = _.times(n, function (i) {
	            if (!this.props.graph.showAngles || !closed && (i === 0 || i === n - 1)) {
	                return "";
	            } else if (this.props.graph.snapTo === "angles") {
	                return "$deg0";
	            } else {
	                return "$deg1";
	            }
	        }, this);

	        var showRightAngleMarkers = _.times(n, function (i) {
	            return closed || i !== 0 && i !== n - 1;
	        }, this);

	        var numArcs = _.times(n, function (i) {
	            if (this.props.graph.showAngles && (closed || i !== 0 && i !== n - 1)) {
	                return 1;
	            } else {
	                return 0;
	            }
	        }, this);

	        var sideLabels = _.times(n, function (i) {
	            if (!this.props.graph.showSides || !closed && i === n - 1) {
	                return "";
	            } else if (this.props.graph.snapTo === "sides") {
	                return "$len0";
	            } else {
	                return "$len1";
	            }
	        }, this);

	        if (this.polygon == null) {
	            var self = this;
	            self.polygon = Interactive2.addMovablePolygon(graphie, {
	                constraints: [Interactive2.MovablePolygon.constraints.bound(), snapToGrid ? Interactive2.MovablePolygon.constraints.snap() : null],
	                closed: closed,
	                points: self.points,
	                angleLabels: angleLabels,
	                showRightAngleMarkers: showRightAngleMarkers,
	                numArcs: numArcs,
	                sideLabels: sideLabels,
	                onMove: [Interactive2.MovablePolygon.onMove.updatePoints, function () {
	                    if (this.closed()) {
	                        self.updateCoordsFromPoints();
	                    }
	                }]
	            });
	        } else {
	            // We only need to pass in the properties that might've changed
	            this.polygon.update({
	                closed: closed,
	                points: this.points,
	                angleLabels: angleLabels,
	                showRightAngleMarkers: showRightAngleMarkers,
	                numArcs: numArcs,
	                sideLabels: sideLabels
	            });
	        }
	    },

	    removePolygonControls: function removePolygonControls() {
	        _.invoke(this.points, "remove");
	        this.polygon.remove();
	    },

	    addAngleControls: function addAngleControls() {
	        var _this7 = this;

	        var graphie = this.graphie;

	        var coords = InteractiveGraph.getAngleCoords(this.props.graph, this.props);

	        // The vertex snaps to the grid, but the rays don't...
	        this.points = _.map(coords, function (coord, i) {
	            return graphie.addMovablePoint(_.extend({
	                coord: coord,
	                normalStyle: {
	                    stroke: KhanColors.INTERACTIVE,
	                    fill: KhanColors.INTERACTIVE
	                }
	            }, i === 1 ? {
	                snapX: graphie.snap[0],
	                snapY: graphie.snap[1]
	            } : {}));
	        });

	        // ...they snap to whole-degree angles from the vertex.
	        this.angle = graphie.addMovableAngle({
	            points: this.points,
	            snapDegrees: this.props.graph.snapDegrees || 1,
	            snapOffsetDeg: this.props.graph.angleOffsetDeg || 0,
	            angleLabel: this.props.graph.showAngles ? "$deg0" : "",
	            pushOut: 2,
	            allowReflex: defaultVal(this.props.graph.allowReflexAngles, true)
	        });

	        $(this.angle).on("move", function () {
	            var graph = _.extend({}, _this7.props.graph, {
	                coords: _this7.angle.getClockwiseCoords()
	            });
	            _this7.onChange({ graph: graph });
	        });
	    },

	    removeAngleControls: function removeAngleControls() {
	        _.invoke(this.points, "remove");
	        this.angle.remove();
	    },

	    toggleShowAngles: function toggleShowAngles() {
	        var graph = _.extend({}, this.props.graph, {
	            showAngles: !this.props.graph.showAngles
	        });
	        this.onChange({ graph: graph });
	    },

	    toggleShowSides: function toggleShowSides() {
	        var graph = _.extend({}, this.props.graph, {
	            showSides: !this.props.graph.showSides
	        });
	        this.onChange({ graph: graph });
	    },

	    getUserInput: function getUserInput() {
	        return this.props.graph;
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return InteractiveGraph.validate(this.getUserInput(), rubric, this);
	    },

	    focus: $.noop
	});

	_.extend(InteractiveGraph, {
	    getQuadraticCoefficients: function getQuadraticCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];
	        var p3 = coords[2];

	        var denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
	        if (denom === 0) {
	            return;
	        }
	        var a = (p3[0] * (p2[1] - p1[1]) + p2[0] * (p1[1] - p3[1]) + p1[0] * (p3[1] - p2[1])) / denom;
	        var b = (p3[0] * p3[0] * (p1[1] - p2[1]) + p2[0] * p2[0] * (p3[1] - p1[1]) + p1[0] * p1[0] * (p2[1] - p3[1])) / denom;
	        var c = (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] + p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] + p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) / denom;
	        return [a, b, c];
	    },

	    getSinusoidCoefficients: function getSinusoidCoefficients(coords) {
	        // It's assumed that p1 is the root and p2 is the first peak
	        var p1 = coords[0];
	        var p2 = coords[1];

	        // Resulting coefficients are canonical for this sine curve
	        var amplitude = p2[1] - p1[1];
	        var angularFrequency = Math.PI / (2 * (p2[0] - p1[0]));
	        var phase = p1[0] * angularFrequency;
	        var verticalOffset = p1[1];

	        return [amplitude, angularFrequency, phase, verticalOffset];
	    },

	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getLineCoords: function getLineCoords(graph, props) {
	        return graph.coords || InteractiveGraph.pointsFromNormalized(props, [[0.25, 0.75], [0.75, 0.75]]);
	    },

	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getPointCoords: function getPointCoords(graph, props) {
	        var numPoints = graph.numPoints || 1;
	        var coords = graph.coords;

	        if (coords) {
	            return coords;
	        } else {
	            switch (numPoints) {
	                case 1:
	                    // Back in the day, one point's coords were in graph.coord
	                    coords = [graph.coord || [0, 0]];
	                    break;
	                case 2:
	                    coords = [[-5, 0], [5, 0]];
	                    break;
	                case 3:
	                    coords = [[-5, 0], [0, 0], [5, 0]];
	                    break;
	                case 4:
	                    coords = [[-6, 0], [-2, 0], [2, 0], [6, 0]];
	                    break;
	                case 5:
	                    coords = [[-6, 0], [-3, 0], [0, 0], [3, 0], [6, 0]];
	                    break;
	                case 6:
	                    coords = [[-5, 0], [-3, 0], [-1, 0], [1, 0], [3, 0], [5, 0]];
	                    break;
	                case UNLIMITED:
	                    coords = [];
	                    break;
	            }
	            // Transform coords from their -10 to 10 space to 0 to 1
	            // because of the old graph.coord, and also it's easier.
	            var range = [[-10, 10], [-10, 10]];
	            coords = InteractiveGraph.normalizeCoords(coords, range);

	            var coords = InteractiveGraph.pointsFromNormalized(props, coords);
	            return coords;
	        }
	    },

	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getLinearSystemCoords: function getLinearSystemCoords(graph, props) {
	        return graph.coords || _.map([[[0.25, 0.75], [0.75, 0.75]], [[0.25, 0.25], [0.75, 0.25]]], function (coords) {
	            return InteractiveGraph.pointsFromNormalized(props, coords);
	        });
	    },

	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getPolygonCoords: function getPolygonCoords(graph, props) {
	        var coords = graph.coords;
	        if (coords) {
	            return coords;
	        }

	        var n = graph.numSides || 3;

	        if (n === UNLIMITED) {
	            coords = [];
	        } else {
	            var angle = 2 * Math.PI / n;
	            var offset = (1 / n - 1 / 2) * Math.PI;

	            // TODO(alex): Generalize this to more than just triangles so that
	            // all polygons have whole number side lengths if snapping to sides
	            var radius = graph.snapTo === "sides" ? Math.sqrt(3) / 3 * 7 : 4;

	            // Generate coords of a regular polygon with n sides
	            coords = _.times(n, function (i) {
	                return [radius * Math.cos(i * angle + offset), radius * Math.sin(i * angle + offset)];
	            });
	        }

	        var range = [[-10, 10], [-10, 10]];
	        coords = InteractiveGraph.normalizeCoords(coords, range);

	        var snapToGrid = !_.contains(["angles", "sides"], graph.snapTo);
	        coords = InteractiveGraph.pointsFromNormalized(props, coords,
	        /* noSnap */!snapToGrid);

	        return coords;
	    },

	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getSegmentCoords: function getSegmentCoords(graph, props) {
	        var coords = graph.coords;
	        if (coords) {
	            return coords;
	        }

	        var n = graph.numSegments || 1;
	        var ys = {
	            1: [5],
	            2: [5, -5],
	            3: [5, 0, -5],
	            4: [6, 2, -2, -6],
	            5: [6, 3, 0, -3, -6],
	            6: [5, 3, 1, -1, -3, -5]
	        }[n];
	        var range = [[-10, 10], [-10, 10]];

	        return _.map(ys, function (y) {
	            var segment = [[-5, y], [5, y]];
	            segment = InteractiveGraph.normalizeCoords(segment, range);
	            segment = InteractiveGraph.pointsFromNormalized(props, segment);
	            return segment;
	        });
	    },

	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getAngleCoords: function getAngleCoords(graph, props) {
	        var coords = graph.coords;
	        if (coords) {
	            return coords;
	        }

	        var snap = graph.snapDegrees || 1;
	        var angle = snap;
	        while (angle < 20) {
	            angle += snap;
	        }
	        angle = angle * Math.PI / 180;
	        var offset = (graph.angleOffsetDeg || 0) * Math.PI / 180;

	        coords = InteractiveGraph.pointsFromNormalized(props, [[0.85, 0.50], [0.5, 0.50]]);

	        var radius = magnitude(vector.apply(null, coords));

	        // Adjust the lower point by angleOffsetDeg degrees
	        coords[0] = [coords[1][0] + radius * Math.cos(offset), coords[1][1] + radius * Math.sin(offset)];
	        // Position the upper point angle radians from the
	        // lower point
	        coords[2] = [coords[1][0] + radius * Math.cos(angle + offset), coords[1][1] + radius * Math.sin(angle + offset)];

	        return coords;
	    },

	    normalizeCoords: function normalizeCoords(coordsList, range) {
	        return _.map(coordsList, function (coords) {
	            return _.map(coords, function (coord, i) {
	                var extent = range[i][1] - range[i][0];
	                return (coord + range[i][1]) / extent;
	            });
	        });
	    },

	    getEquationString: function getEquationString(props) {
	        var type = props.graph.type;
	        var funcName = "get" + capitalize(type) + "EquationString";
	        return InteractiveGraph[funcName](props);
	    },

	    pointsFromNormalized: function pointsFromNormalized(props, coordsList, noSnap) {
	        return _.map(coordsList, function (coords) {
	            return _.map(coords, function (coord, i) {
	                var range = props.range[i];
	                if (noSnap) {
	                    return range[0] + (range[1] - range[0]) * coord;
	                } else {
	                    var step = props.step[i];
	                    var nSteps = numSteps(range, step);
	                    var tick = Math.round(coord * nSteps);
	                    return range[0] + step * tick;
	                }
	            });
	        });
	    },

	    getLinearEquationString: function getLinearEquationString(props) {
	        var coords = InteractiveGraph.getLineCoords(props.graph, props);
	        if (eq(coords[0][0], coords[1][0])) {
	            return "x = " + coords[0][0].toFixed(3);
	        } else {
	            var m = (coords[1][1] - coords[0][1]) / (coords[1][0] - coords[0][0]);
	            var b = coords[0][1] - m * coords[0][0];
	            if (eq(m, 0)) {
	                return "y = " + b.toFixed(3);
	            } else {
	                return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
	            }
	        }
	    },

	    getCurrentQuadraticCoefficients: function getCurrentQuadraticCoefficients(props) {
	        // TODO(alpert): Don't duplicate
	        var coords = props.graph.coords || InteractiveGraph.defaultQuadraticCoords(props);
	        return InteractiveGraph.getQuadraticCoefficients(coords);
	    },

	    defaultQuadraticCoords: function defaultQuadraticCoords(props) {
	        var coords = [[0.25, 0.75], [0.5, 0.25], [0.75, 0.75]];
	        return InteractiveGraph.pointsFromNormalized(props, coords);
	    },

	    getQuadraticEquationString: function getQuadraticEquationString(props) {
	        var coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(props);
	        return "y = " + coeffs[0].toFixed(3) + "x^2 + " + coeffs[1].toFixed(3) + "x + " + coeffs[2].toFixed(3);
	    },

	    getCurrentSinusoidCoefficients: function getCurrentSinusoidCoefficients(props) {
	        var coords = props.graph.coords || InteractiveGraph.defaultSinusoidCoords(props);
	        return InteractiveGraph.getSinusoidCoefficients(coords);
	    },

	    defaultSinusoidCoords: function defaultSinusoidCoords(props) {
	        var coords = [[0.5, 0.5], [0.65, 0.60]];
	        return InteractiveGraph.pointsFromNormalized(props, coords);
	    },

	    getSinusoidEquationString: function getSinusoidEquationString(props) {
	        var coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(props);
	        return "y = " + coeffs[0].toFixed(3) + "sin(" + coeffs[1].toFixed(3) + "x - " + coeffs[2].toFixed(3) + ") + " + coeffs[3].toFixed(3);
	    },

	    getCircleEquationString: function getCircleEquationString(props) {
	        var graph = props.graph;
	        // TODO(alpert): Don't duplicate
	        var center = graph.center || [0, 0];
	        var radius = graph.radius || 2;
	        return "center (" + center[0] + ", " + center[1] + "), radius " + radius;
	    },

	    getLinearSystemEquationString: function getLinearSystemEquationString(props) {
	        var coords = InteractiveGraph.getLinearSystemCoords(props.graph, props);
	        return "\n" + getLineEquation(coords[0][0], coords[0][1]) + "\n" + getLineEquation(coords[1][0], coords[1][1]) + "\n" + getLineIntersection(coords[0], coords[1]);
	    },

	    getPointEquationString: function getPointEquationString(props) {
	        var coords = InteractiveGraph.getPointCoords(props.graph, props);
	        return coords.map(function (coord) {
	            return "(" + coord[0] + ", " + coord[1] + ")";
	        }).join(", ");
	    },

	    getSegmentEquationString: function getSegmentEquationString(props) {
	        var segments = InteractiveGraph.getSegmentCoords(props.graph, props);
	        return _.map(segments, function (segment) {
	            return "[" + _.map(segment, function (coord) {
	                return "(" + coord.join(", ") + ")";
	            }).join(" ") + "]";
	        }).join(" ");
	    },

	    getRayEquationString: function getRayEquationString(props) {
	        var coords = InteractiveGraph.getLineCoords(props.graph, props);
	        var a = coords[0];
	        var b = coords[1];
	        var eq = InteractiveGraph.getLinearEquationString(props);

	        if (a[0] > b[0]) {
	            eq += " (for x <= " + a[0].toFixed(3) + ")";
	        } else if (a[0] < b[0]) {
	            eq += " (for x >= " + a[0].toFixed(3) + ")";
	        } else if (a[1] > b[1]) {
	            eq += " (for y <= " + a[1].toFixed(3) + ")";
	        } else {
	            eq += " (for y >= " + a[1].toFixed(3) + ")";
	        }

	        return eq;
	    },

	    getPolygonEquationString: function getPolygonEquationString(props) {
	        var coords = InteractiveGraph.getPolygonCoords(props.graph, props);
	        return _.map(coords, function (coord) {
	            return "(" + coord.join(", ") + ")";
	        }).join(" ");
	    },

	    getAngleEquationString: function getAngleEquationString(props) {
	        var coords = InteractiveGraph.getAngleCoords(props.graph, props);
	        var angle = GraphUtils.findAngle(coords[2], coords[0], coords[1]);
	        return angle.toFixed(0) + "° angle" + " at (" + coords[1].join(", ") + ")";
	    },

	    validate: function validate(state, rubric, component) {
	        // When nothing has moved, there will neither be coords nor the
	        // circle's center/radius fields. When those fields are absent, skip
	        // all these checks; just go mark the answer as empty.
	        var hasValue = !!(state.coords || state.center && state.radius);

	        if (state.type === rubric.correct.type && hasValue) {
	            if (state.type === "linear") {
	                var guess = state.coords;
	                var correct = rubric.correct.coords;
	                // If both of the guess points are on the correct line, it's
	                // correct.
	                if (collinear(correct[0], correct[1], guess[0]) && collinear(correct[0], correct[1], guess[1])) {
	                    return {
	                        type: "points",
	                        earned: 1,
	                        total: 1,
	                        message: null
	                    };
	                }
	            } else if (state.type === "linear-system") {
	                var guess = state.coords;
	                var correct = rubric.correct.coords;

	                if (collinear(correct[0][0], correct[0][1], guess[0][0]) && collinear(correct[0][0], correct[0][1], guess[0][1]) && collinear(correct[1][0], correct[1][1], guess[1][0]) && collinear(correct[1][0], correct[1][1], guess[1][1]) || collinear(correct[0][0], correct[0][1], guess[1][0]) && collinear(correct[0][0], correct[0][1], guess[1][1]) && collinear(correct[1][0], correct[1][1], guess[0][0]) && collinear(correct[1][0], correct[1][1], guess[0][1])) {
	                    return {
	                        type: "points",
	                        earned: 1,
	                        total: 1,
	                        message: null
	                    };
	                }
	            } else if (state.type === "quadratic") {
	                // If the parabola coefficients match, it's correct.
	                var guessCoeffs = this.getQuadraticCoefficients(state.coords);
	                var correctCoeffs = this.getQuadraticCoefficients(rubric.correct.coords);
	                if (deepEq(guessCoeffs, correctCoeffs)) {
	                    return {
	                        type: "points",
	                        earned: 1,
	                        total: 1,
	                        message: null
	                    };
	                }
	            } else if (state.type === "sinusoid") {
	                var guessCoeffs = this.getSinusoidCoefficients(state.coords);
	                var correctCoeffs = this.getSinusoidCoefficients(rubric.correct.coords);

	                var canonicalGuessCoeffs = canonicalSineCoefficients(guessCoeffs);
	                var canonicalCorrectCoeffs = canonicalSineCoefficients(correctCoeffs);
	                // If the canonical coefficients match, it's correct.
	                if (deepEq(canonicalGuessCoeffs, canonicalCorrectCoeffs)) {
	                    return {
	                        type: "points",
	                        earned: 1,
	                        total: 1,
	                        message: null
	                    };
	                }
	            } else if (state.type === "circle") {
	                if (deepEq(state.center, rubric.correct.center) && eq(state.radius, rubric.correct.radius)) {
	                    return {
	                        type: "points",
	                        earned: 1,
	                        total: 1,
	                        message: null
	                    };
	                }
	            } else if (state.type === "point") {
	                var guess = state.coords;
	                var correct = InteractiveGraph.getPointCoords(rubric.correct, component);
	                guess = guess.slice();
	                correct = correct.slice();
	                // Everything's already rounded so we shouldn't need to do an
	                // eq() comparison but _.isEqual(0, -0) is false, so we'll use
	                // eq() anyway. The sort should be fine because it'll stringify
	                // it and -0 converted to a string is "0"
	                guess.sort();
	                correct.sort();
	                if (deepEq(guess, correct)) {
	                    return {
	                        type: "points",
	                        earned: 1,
	                        total: 1,
	                        message: null
	                    };
	                }
	            } else if (state.type === "polygon") {
	                var guess = state.coords.slice();
	                var correct = rubric.correct.coords.slice();

	                var match;
	                if (rubric.correct.match === "similar") {
	                    match = similar(guess, correct, Number.POSITIVE_INFINITY);
	                } else if (rubric.correct.match === "congruent") {
	                    match = similar(guess, correct, knumber.DEFAULT_TOLERANCE);
	                } else if (rubric.correct.match === "approx") {
	                    match = similar(guess, correct, 0.1);
	                } else {
	                    /* exact */
	                    guess.sort();
	                    correct.sort();
	                    match = deepEq(guess, correct);
	                }

	                if (match) {
	                    return {
	                        type: "points",
	                        earned: 1,
	                        total: 1,
	                        message: null
	                    };
	                }
	            } else if (state.type === "segment") {
	                var guess = state.coords.slice();
	                var correct = rubric.correct.coords.slice();
	                guess = _.invoke(guess, "sort").sort();
	                correct = _.invoke(correct, "sort").sort();
	                if (deepEq(guess, correct)) {
	                    return {
	                        type: "points",
	                        earned: 1,
	                        total: 1,
	                        message: null
	                    };
	                }
	            } else if (state.type === "ray") {
	                var guess = state.coords;
	                var correct = rubric.correct.coords;
	                if (deepEq(guess[0], correct[0]) && collinear(correct[0], correct[1], guess[1])) {
	                    return {
	                        type: "points",
	                        earned: 1,
	                        total: 1,
	                        message: null
	                    };
	                }
	            } else if (state.type === "angle") {
	                var guess = state.coords;
	                var correct = rubric.correct.coords;

	                var match;
	                if (rubric.correct.match === "congruent") {
	                    var angles = _.map([guess, correct], function (coords) {
	                        var angle = GraphUtils.findAngle(coords[2], coords[0], coords[1]);
	                        return (angle + 360) % 360;
	                    });
	                    match = eq.apply(null, angles);
	                } else {
	                    /* exact */
	                    match = deepEq(guess[1], correct[1]) && collinear(correct[1], correct[0], guess[0]) && collinear(correct[1], correct[2], guess[2]);
	                }

	                if (match) {
	                    return {
	                        type: "points",
	                        earned: 1,
	                        total: 1,
	                        message: null
	                    };
	                }
	            }
	        }

	        // The input wasn't correct, so check if it's a blank input or if it's
	        // actually just wrong
	        if (!hasValue || _.isEqual(state, rubric.graph)) {
	            // We're where we started.
	            return {
	                type: "invalid",
	                message: null
	            };
	        } else {
	            return {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: null
	            };
	        }
	    }
	});

	module.exports = {
	    name: "interactive-graph",
	    displayName: "Interactive graph",
	    widget: InteractiveGraph
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Util = __webpack_require__(8);

	var DeprecationMixin = Util.DeprecationMixin;

	var GraphSettings = __webpack_require__(187);
	var InfoTip = __webpack_require__(82);

	var InteractiveGraph = __webpack_require__(111).widget;

	var _require = __webpack_require__(80);

	var interactiveSizes = _require.interactiveSizes;

	var _require2 = __webpack_require__(158);

	var containerSizeClass = _require2.containerSizeClass;
	var getInteractiveBoxFromSizeClass = _require2.getInteractiveBoxFromSizeClass;


	var defaultBackgroundImage = {
	    url: null
	};

	var deprecatedProps = {
	    showGraph: function showGraph(props) {
	        return { markings: props.showGraph ? "graph" : "none" };
	    }
	};

	var InteractiveGraphEditor = React.createClass({
	    displayName: "InteractiveGraphEditor",

	    className: "perseus-widget-interactive-graph",

	    getDefaultProps: function getDefaultProps() {
	        return {
	            labels: ["x", "y"],
	            range: [[-10, 10], [-10, 10]],
	            step: [1, 1],
	            valid: true,
	            backgroundImage: defaultBackgroundImage,
	            markings: "graph",
	            showProtractor: false,
	            showRuler: false,
	            rulerLabel: "",
	            rulerTicks: 10,
	            correct: {
	                type: "linear",
	                coords: null
	            }
	        };
	    },

	    // TODO(jack): Use versioning instead of DeprecationMixin
	    mixins: [DeprecationMixin],
	    deprecatedProps: deprecatedProps,

	    render: function render() {
	        var _this = this;

	        var graph;
	        var equationString;

	        var gridStep = this.props.gridStep || Util.getGridStep(this.props.range, this.props.step, interactiveSizes.defaultBoxSize);
	        var snapStep = this.props.snapStep || Util.snapStepFromGridStep(gridStep);

	        var sizeClass = containerSizeClass.SMALL;
	        if (this.props.valid === true) {
	            // TODO(aria): send these down all at once
	            var graphProps = {
	                ref: "graph",
	                box: this.props.box,
	                range: this.props.range,
	                labels: this.props.labels,
	                step: this.props.step,
	                gridStep: gridStep,
	                snapStep: snapStep,
	                graph: this.props.correct,
	                backgroundImage: this.props.backgroundImage,
	                markings: this.props.markings,
	                showProtractor: this.props.showProtractor,
	                showRuler: this.props.showRuler,
	                rulerLabel: this.props.rulerLabel,
	                rulerTicks: this.props.rulerTicks,
	                trackInteraction: function trackInteraction() {},
	                flexibleType: true,
	                onChange: function onChange(newProps) {
	                    var correct = _this.props.correct;
	                    if (correct.type === newProps.graph.type) {
	                        correct = _.extend({}, correct, newProps.graph);
	                    } else {
	                        // Clear options from previous graph
	                        correct = newProps.graph;
	                    }
	                    _this.props.onChange({ correct: correct });
	                }
	            };
	            graph = React.createElement(InteractiveGraph, _extends({}, graphProps, {
	                containerSizeClass: sizeClass
	            }));
	            equationString = InteractiveGraph.getEquationString(graphProps);
	        } else {
	            graph = React.createElement(
	                "div",
	                { className: "perseus-error" },
	                this.props.valid
	            );
	        }

	        return React.createElement(
	            "div",
	            { className: "perseus-widget-interactive-graph" },
	            React.createElement(
	                "div",
	                null,
	                "Correct answer",
	                ' ',
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."
	                    )
	                ),
	                ' ',
	                ": ",
	                equationString
	            ),
	            React.createElement(GraphSettings, {
	                box: getInteractiveBoxFromSizeClass(sizeClass),
	                range: this.props.range,
	                labels: this.props.labels,
	                step: this.props.step,
	                gridStep: gridStep,
	                snapStep: snapStep,
	                valid: this.props.valid,
	                backgroundImage: this.props.backgroundImage,
	                markings: this.props.markings,
	                showProtractor: this.props.showProtractor,
	                showRuler: this.props.showRuler,
	                rulerLabel: this.props.rulerLabel,
	                rulerTicks: this.props.rulerTicks,
	                onChange: this.props.onChange }),
	            this.props.correct.type === "polygon" && React.createElement(
	                "div",
	                { className: "type-settings" },
	                React.createElement(
	                    "label",
	                    null,
	                    ' ',
	                    "Student answer must",
	                    ' ',
	                    React.createElement(
	                        "select",
	                        {
	                            value: this.props.correct.match,
	                            onChange: this.changeMatchType },
	                        React.createElement(
	                            "option",
	                            { value: "exact" },
	                            "match exactly"
	                        ),
	                        React.createElement(
	                            "option",
	                            { value: "congruent" },
	                            "be congruent"
	                        ),
	                        React.createElement(
	                            "option",
	                            { value: "approx" },
	                            "be approximately congruent"
	                        ),
	                        React.createElement(
	                            "option",
	                            { value: "similar" },
	                            "be similar"
	                        )
	                    )
	                ),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "ul",
	                        null,
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "p",
	                                null,
	                                React.createElement(
	                                    "b",
	                                    null,
	                                    "Match Exactly:"
	                                ),
	                                " Match exactly in size, orientation, and location on the grid even if it is not shown in the background."
	                            )
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "p",
	                                null,
	                                React.createElement(
	                                    "b",
	                                    null,
	                                    "Be Congruent:"
	                                ),
	                                " Be congruent in size and shape, but can be located anywhere on the grid."
	                            )
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "p",
	                                null,
	                                React.createElement(
	                                    "b",
	                                    null,
	                                    "Be Approximately Congruent:"
	                                ),
	                                " Be exactly similar, and congruent in size and shape to within 0.1 units, but can be located anywhere on the grid. ",
	                                React.createElement(
	                                    "em",
	                                    null,
	                                    "Use this with snapping to angle measure."
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "p",
	                                null,
	                                React.createElement(
	                                    "b",
	                                    null,
	                                    "Be Similar:"
	                                ),
	                                " Be similar with matching interior angles, and side measures that are matching or a multiple of the correct side measures. The figure can be located anywhere on the grid."
	                            )
	                        )
	                    )
	                )
	            ),
	            this.props.correct.type === "angle" && React.createElement(
	                "div",
	                { className: "type-settings" },
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "label",
	                        null,
	                        ' ',
	                        "Student answer must",
	                        ' ',
	                        React.createElement(
	                            "select",
	                            {
	                                value: this.props.correct.match,
	                                onChange: this.changeMatchType },
	                            React.createElement(
	                                "option",
	                                { value: "exact" },
	                                "match exactly"
	                            ),
	                            React.createElement(
	                                "option",
	                                { value: "congruent" },
	                                "be congruent"
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        InfoTip,
	                        null,
	                        React.createElement(
	                            "p",
	                            null,
	                            "Congruency requires only that the angle measures are the same. An exact match implies congruency, but also requires that the angles have the same orientation and that the vertices are in the same position."
	                        )
	                    )
	                )
	            ),
	            graph
	        );
	    },

	    changeMatchType: function changeMatchType(e) {
	        var correct = _.extend({}, this.props.correct, {
	            match: e.target.value
	        });
	        this.props.onChange({ correct: correct });
	    },

	    serialize: function serialize() {
	        var json = _.pick(this.props, "step", "backgroundImage", "markings", "labels", "showProtractor", "showRuler", "rulerLabel", "rulerTicks", "range", "gridStep", "snapStep");

	        var graph = this.refs.graph;
	        if (graph) {
	            var correct = graph && graph.getUserInput();
	            _.extend(json, {
	                // TODO(alpert): Allow specifying flexibleType (whether the
	                // graph type should be a choice or not)
	                graph: { type: correct.type },
	                correct: correct
	            });

	            _.each(["allowReflexAngles", "angleOffsetDeg", "numPoints", "numSides", "numSegments", "showAngles", "showSides", "snapTo", "snapDegrees"], function (key) {
	                if (_.has(correct, key)) {
	                    json.graph[key] = correct[key];
	                }
	            });
	        }
	        return json;
	    }
	});

	module.exports = InteractiveGraphEditor;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable array-bracket-spacing, comma-dangle, no-undef, no-unused-vars, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var WidgetJsonifyDeprecated = __webpack_require__(183);

	var MAX_SIZE = 8;

	// Styling
	var CELL_PADDING = 5;

	var TABLE_STYLE = {
	    display: "table",
	    tableLayout: "fixed"
	};

	var ROW_STYLE = {
	    display: "table-row"
	};

	var CELL_STYLE = {
	    display: "table-cell",
	    padding: CELL_PADDING
	};

	var BASE_TILE_STYLE = {
	    borderRadius: 10,
	    cursor: "pointer"
	};

	var MOVE_COUNT_STYLE = {
	    padding: CELL_PADDING,
	    display: "inline-block"
	};

	var RESET_BUTTON_STYLE = {
	    "float": "right",
	    paddingRight: CELL_PADDING
	};

	var MAIN_TILE_SIZE = 50;

	var mapCells = function mapCells(cells, func) {
	    return _.map(cells, function (row, y) {
	        return _.map(row, function (value, x) {
	            return func(value, y, x);
	        });
	    });
	};

	var genCells = function genCells(height, width, func) {
	    return _.times(height, function (y) {
	        return _.times(width, function (x) {
	            return func(y, x);
	        });
	    });
	};

	var PATTERNS = {
	    plus: function plus() {
	        return [[false, true, false], [true, true, true], [false, true, false]];
	    },
	    x: function x() {
	        return [[true, false, true], [false, true, false], [true, false, true]];
	    },
	    "plus/x": function plusX(iter) {
	        return iter % 2 ? PATTERNS.x() : PATTERNS.plus();
	    }
	};

	/**
	 * Clamps value to an integer in the range [min, max]
	 */
	var clampToInt = function clampToInt(value, min, max) {
	    value = Math.floor(value);
	    value = Math.max(value, min);
	    value = Math.min(value, max);
	    return value;
	};

	// A single glowy cell
	var Tile = React.createClass({
	    displayName: "Tile",

	    propTypes: {
	        value: React.PropTypes.bool.isRequired,
	        size: React.PropTypes.number.isRequired
	    },

	    render: function render() {
	        var color = this.props.value ? "#55dd55" : "#115511";
	        var style = _.extend({}, BASE_TILE_STYLE, {
	            width: this.props.size,
	            height: this.props.size,
	            backgroundColor: color
	        });
	        return React.createElement("div", {
	            style: style,
	            onClick: this._flip });
	    },

	    _flip: function _flip() {
	        this.props.onChange(!this.props.value);
	    }
	});

	// A grid of glowy cells
	var TileGrid = React.createClass({
	    displayName: "TileGrid",

	    propTypes: {
	        cells: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.bool)).isRequired,
	        size: React.PropTypes.number.isRequired
	    },

	    render: function render() {
	        var _this = this;

	        return React.createElement(
	            "div",
	            { style: TABLE_STYLE, className: "no-select" },
	            _.map(this.props.cells, function (row, y) {
	                return React.createElement(
	                    "div",
	                    { key: y, style: ROW_STYLE },
	                    _.map(row, function (cell, x) {
	                        return React.createElement(
	                            "div",
	                            { key: x, style: CELL_STYLE },
	                            React.createElement(Tile, {
	                                value: cell,
	                                size: _this.props.size,
	                                onChange: _.partial(_this.props.onChange, y, x)
	                            })
	                        );
	                    })
	                );
	            })
	        );
	    }
	});

	// Returns a copy of the tiles, with tiles flipped according to
	// whether or not their y, x position satisfies the predicate
	var flipTilesPredicate = function flipTilesPredicate(oldCells, predicate) {
	    return _.map(oldCells, function (row, y) {
	        return _.map(row, function (cell, x) {
	            return predicate(y, x) ? !cell : cell;
	        });
	    });
	};

	var flipTilesPattern = function flipTilesPattern(oldCells, tileY, tileX, pattern) {
	    return flipTilesPredicate(oldCells, function (y, x) {
	        var offsetY = y - tileY;
	        var offsetX = x - tileX;
	        if (Math.abs(offsetY) <= 1 && Math.abs(offsetX) <= 1) {
	            return pattern[offsetY + 1][offsetX + 1];
	        } else {
	            return false;
	        }
	    });
	};

	// The lights puzzle widget
	var LightsPuzzle = React.createClass({
	    displayName: "LightsPuzzle",

	    mixins: [Changeable, WidgetJsonifyDeprecated],

	    propTypes: {
	        cells: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.bool)),
	        startCells: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.bool)),
	        flipPattern: React.PropTypes.string.isRequired,
	        moveCount: React.PropTypes.number.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            cells: [[false, false, false], [false, false, false], [false, false, false]],
	            startCells: [[false, false, false], [false, false, false], [false, false, false]],
	            flipPattern: "plus",
	            moveCount: 0
	        };
	    },

	    render: function render() {
	        var width = this._width();
	        var tileSize = MAIN_TILE_SIZE;
	        var pxWidth = width * (tileSize + 2 * CELL_PADDING);
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(TileGrid, {
	                cells: this.props.cells,
	                size: tileSize,
	                onChange: this._flipTile }),
	            React.createElement(
	                "div",
	                { style: { width: pxWidth } },
	                React.createElement(
	                    "div",
	                    { style: MOVE_COUNT_STYLE },
	                    "Moves: ",
	                    this.props.moveCount
	                ),
	                React.createElement(
	                    "div",
	                    { style: RESET_BUTTON_STYLE },
	                    React.createElement("input", {
	                        type: "button",
	                        value: "Reset",
	                        onClick: this._reset,
	                        className: "simple-button" })
	                )
	            ),
	            React.createElement("div", { className: "clearfix" })
	        );
	    },

	    _width: function _width() {
	        if (this.props.cells.length !== 0) {
	            return this.props.cells[0].length;
	        } else {
	            return 0; // default to 0
	        }
	    },

	    componentDidMount: function componentDidMount() {
	        this._initNextPatterns();
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        if (prevProps.flipPattern !== this.props.flipPattern) {
	            this._initNextPatterns();
	        }
	    },

	    _initNextPatterns: function _initNextPatterns() {
	        this._currPattern = PATTERNS[this.props.flipPattern](0);
	        this._nextPattern = PATTERNS[this.props.flipPattern](1);
	        this._patternIndex = 2;
	    },

	    _shiftPatterns: function _shiftPatterns() {
	        this._currPattern = this._nextPattern;
	        this._nextPattern = PATTERNS[this.props.flipPattern](this._patternIndex);
	        this._patternIndex++;
	    },

	    _flipTile: function _flipTile(tileY, tileX) {
	        var newCells = flipTilesPattern(this.props.cells, tileY, tileX, this._currPattern);
	        this._shiftPatterns();

	        this.change({
	            cells: newCells,
	            moveCount: this.props.moveCount + 1
	        });
	    },

	    _reset: function _reset() {
	        this.change({
	            cells: this.props.startCells,
	            moveCount: 0
	        });
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return validate(rubric, this.getUserInput());
	    }
	});

	// grading function
	var validate = function validate(rubric, state) {
	    var empty = _.all(state.cells, function (row, y) {
	        return _.all(row, function (cell, x) {
	            return cell === rubric.startCells[y][x];
	        });
	    });
	    if (empty) {
	        return {
	            type: "invalid",
	            message: i18n._("Click on the tiles to change the lights.")
	        };
	    }

	    var correct = _.all(state.cells, function (row) {
	        return _.all(row, function (cell) {
	            return cell;
	        });
	    });

	    if (correct) {
	        return {
	            type: "points",
	            earned: 1,
	            total: 1,
	            message: null
	        };
	    } else if (rubric.gradeIncompleteAsWrong) {
	        return {
	            type: "points",
	            earned: 0,
	            total: 1,
	            message: null
	        };
	    } else {
	        return {
	            type: "invalid",
	            message: i18n._("You must turn on all of the lights to continue.")
	        };
	    }
	};

	// The function run on the editor props to create the widget props
	var transformProps = function transformProps(editorProps) {
	    return {
	        cells: editorProps.startCells,
	        startCells: editorProps.startCells,
	        flipPattern: editorProps.flipPattern
	    };
	};

	module.exports = {
	    name: "lights-puzzle",
	    displayName: "Lights Puzzle",
	    hidden: true,
	    widget: LightsPuzzle,
	    transform: transformProps
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable array-bracket-spacing, comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var NumberInput = __webpack_require__(175);
	var PropCheckBox = __webpack_require__(47);
	var InfoTip = __webpack_require__(82);

	var MAX_SIZE = 8;

	// styling
	var CELL_PADDING = 5;

	var TABLE_STYLE = {
	    display: "table",
	    tableLayout: "fixed"
	};

	var ROW_STYLE = {
	    display: "table-row"
	};

	var CELL_STYLE = {
	    display: "table-cell",
	    padding: CELL_PADDING
	};

	var BASE_TILE_STYLE = {
	    borderRadius: 10,
	    cursor: "pointer"
	};

	var PATTERNS = {
	    plus: function plus() {
	        return [[false, true, false], [true, true, true], [false, true, false]];
	    },
	    x: function x() {
	        return [[true, false, true], [false, true, false], [true, false, true]];
	    },
	    "plus/x": function plusX(iter) {
	        return iter % 2 ? PATTERNS.x() : PATTERNS.plus();
	    }
	};

	/**
	 * Clamps value to an integer in the range [min, max]
	 */
	var clampToInt = function clampToInt(value, min, max) {
	    value = Math.floor(value);
	    value = Math.max(value, min);
	    value = Math.min(value, max);
	    return value;
	};

	// Returns a copy of the tiles, with tiles flipped according to
	// whether or not their y, x position satisfies the predicate
	var flipTilesPredicate = function flipTilesPredicate(oldCells, predicate) {
	    return _.map(oldCells, function (row, y) {
	        return _.map(row, function (cell, x) {
	            return predicate(y, x) ? !cell : cell;
	        });
	    });
	};

	// A single glowy cell
	var Tile = React.createClass({
	    displayName: "Tile",

	    propTypes: {
	        value: React.PropTypes.bool.isRequired,
	        size: React.PropTypes.number.isRequired
	    },

	    render: function render() {
	        var color = this.props.value ? "#55dd55" : "#115511";
	        var style = _.extend({}, BASE_TILE_STYLE, {
	            width: this.props.size,
	            height: this.props.size,
	            backgroundColor: color
	        });
	        return React.createElement("div", {
	            style: style,
	            onClick: this._flip });
	    },

	    _flip: function _flip() {
	        this.props.onChange(!this.props.value);
	    }
	});

	// A grid of glowy cells
	var TileGrid = React.createClass({
	    displayName: "TileGrid",

	    propTypes: {
	        cells: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.bool)).isRequired,
	        size: React.PropTypes.number.isRequired
	    },

	    render: function render() {
	        var _this = this;

	        return React.createElement(
	            "div",
	            { style: TABLE_STYLE, className: "no-select" },
	            _.map(this.props.cells, function (row, y) {
	                return React.createElement(
	                    "div",
	                    { key: y, style: ROW_STYLE },
	                    _.map(row, function (cell, x) {
	                        return React.createElement(
	                            "div",
	                            { key: x, style: CELL_STYLE },
	                            React.createElement(Tile, {
	                                value: cell,
	                                size: _this.props.size,
	                                onChange: _.partial(_this.props.onChange, y, x)
	                            })
	                        );
	                    })
	                );
	            })
	        );
	    }
	});

	// The widget editor
	var LightsPuzzleEditor = React.createClass({
	    displayName: "LightsPuzzleEditor",

	    mixins: [Changeable, EditorJsonify],

	    propTypes: {
	        startCells: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.bool)),
	        flipPattern: React.PropTypes.string.isRequired,
	        gradeIncompleteAsWrong: React.PropTypes.bool.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            startCells: [[false, false, false], [false, false, false], [false, false, false]],
	            flipPattern: "plus",
	            gradeIncompleteAsWrong: false
	        };
	    },

	    _height: function _height() {
	        return this.props.startCells.length;
	    },

	    _width: function _width() {
	        if (this.props.startCells.length !== 0) {
	            return this.props.startCells[0].length;
	        } else {
	            return 0; // default to 0
	        }
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                null,
	                "Width:",
	                React.createElement(NumberInput, {
	                    value: this._width(),
	                    placeholder: 5,
	                    onChange: this._changeWidth }),
	                ", ",
	                "Height:",
	                React.createElement(NumberInput, {
	                    value: this._height(),
	                    placeholder: 5,
	                    onChange: this._changeHeight })
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Flip pattern:",
	                React.createElement(
	                    "select",
	                    {
	                        value: this.props.flipPattern,
	                        onChange: this._handlePatternChange },
	                    _.map(_.keys(PATTERNS), function (pattern, i) {
	                        return React.createElement(
	                            "option",
	                            { value: pattern, key: i },
	                            pattern
	                        );
	                    })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Grade incomplete puzzles as wrong:",
	                " ",
	                React.createElement(PropCheckBox, {
	                    gradeIncompleteAsWrong: this.props.gradeIncompleteAsWrong,
	                    onChange: this.props.onChange }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    "By default, incomplete puzzles are graded as empty."
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Starting configuration:"
	            ),
	            React.createElement(
	                "div",
	                { style: { overflowX: "auto" } },
	                React.createElement(TileGrid, {
	                    cells: this.props.startCells,
	                    size: 50,
	                    onChange: this._switchTile })
	            )
	        );
	    },

	    _handlePatternChange: function _handlePatternChange(e) {
	        this.change("flipPattern", e.target.value);
	    },

	    _changeWidth: function _changeWidth(newWidth) {
	        newWidth = clampToInt(newWidth, 1, MAX_SIZE);
	        this._truncateCells(newWidth, this._height());
	    },

	    _changeHeight: function _changeHeight(newHeight) {
	        newHeight = clampToInt(newHeight, 1, MAX_SIZE);
	        this._truncateCells(this._width(), newHeight);
	    },

	    _truncateCells: function _truncateCells(newWidth, newHeight) {
	        var _this2 = this;

	        var newCells = _.times(newHeight, function (y) {
	            return _.times(newWidth, function (x) {
	                // explicitly cast the result to a boolean with !!
	                return !!(_this2.props.startCells[y] && _this2.props.startCells[y][x]);
	            });
	        });

	        this.change({ startCells: newCells });
	    },

	    _switchTile: function _switchTile(tileY, tileX) {
	        var newCells = flipTilesPredicate(this.props.startCells, function (y, x) {
	            return y === tileY && x === tileX;
	        });

	        this.change({ startCells: newCells });
	    }
	});

	module.exports = LightsPuzzleEditor;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, max-len, no-undef, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, space-before-function-paren */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var classNames = __webpack_require__(54);
	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var NumberInput = __webpack_require__(175);
	var Renderer = __webpack_require__(30);
	var TextInput = __webpack_require__(176);
	var MathOutput = __webpack_require__(193);
	var SimpleKeypadInput = __webpack_require__(168);

	var ApiOptions = __webpack_require__(7).Options;
	var KhanAnswerTypes = __webpack_require__(45);

	var keypadElementPropType = __webpack_require__(159).propTypes.keypadElementPropType;

	var assert = __webpack_require__(164).assert;
	var stringArrayOfSize = __webpack_require__(8).stringArrayOfSize;

	// We store three sets of dimensions for the brackets, for our three types of
	// inputs, which vary in formatting: (1) the "static" inputs rendered for the
	// mobile apps (that are being deprecated), (2) the normal inputs rendered on
	// desktop, and (3) the keypad-based inputs newly rendered for the mobile apps
	// and mobile web. The first two sets of dimensions come from `matrix.less`;
	// the keypad-based input's dimensions are provided to the component itself,
	// below.
	var STATIC_INPUT_DIMENSIONS = {
	    INPUT_MARGIN: 4,
	    INPUT_HEIGHT: 38,
	    INPUT_WIDTH: 82
	};

	var NORMAL_DIMENSIONS = {
	    INPUT_MARGIN: 3,
	    INPUT_HEIGHT: 30,
	    INPUT_WIDTH: 40
	};

	var KEYPAD_INPUT_DIMENSIONS = {
	    INPUT_MARGIN: 4,
	    INPUT_HEIGHT: 34,
	    INPUT_WIDTH: 34
	};

	/* Input handling: Maps a (row, column) pair to a unique ref used by React,
	 * and extracts (row, column) pairs from input paths, used to allow outsiders
	 * to focus, blur, set input values, etc. */
	var getInputPath = function getInputPath(row, column) {
	    return ["" + row, "" + column];
	};

	var getDefaultPath = function getDefaultPath() {
	    return getInputPath(0, 0);
	};

	var getRowFromPath = function getRowFromPath(path) {
	    // 'path' should be a (row, column) pair
	    assert(_.isArray(path) && path.length === 2);
	    return +path[0];
	};

	var getColumnFromPath = function getColumnFromPath(path) {
	    // 'path' should be a (row, column) pair
	    assert(_.isArray(path) && path.length === 2);
	    return +path[1];
	};

	var getRefForPath = function getRefForPath(path) {
	    var row = getRowFromPath(path);
	    var column = getColumnFromPath(path);
	    return "answer" + row + "," + column;
	};

	var getMatrixSize = function getMatrixSize(matrix) {
	    var matrixSize = [1, 1];

	    // We need to find the widest row and tallest column to get the correct
	    // matrix size.
	    _(matrix).each(function (matrixRow, row) {
	        var rowWidth = 0;
	        _(matrixRow).each(function (matrixCol, col) {
	            if (matrixCol != null && matrixCol.toString().length) {
	                rowWidth = col + 1;
	            }
	        });

	        // Matrix width:
	        matrixSize[1] = Math.max(matrixSize[1], rowWidth);

	        // Matrix height:
	        if (rowWidth > 0) {
	            matrixSize[0] = Math.max(matrixSize[0], row + 1);
	        }
	    });
	    return matrixSize;
	};

	var Matrix = React.createClass({
	    displayName: "Matrix",

	    propTypes: {
	        answers: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]))),
	        apiOptions: ApiOptions.propTypes,
	        cursorPosition: React.PropTypes.arrayOf(React.PropTypes.number),
	        keypadElement: keypadElementPropType,
	        matrixBoardSize: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
	        prefix: React.PropTypes.string,
	        suffix: React.PropTypes.string,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            matrixBoardSize: [3, 3],
	            answers: [[]],
	            prefix: "",
	            suffix: "",
	            cursorPosition: [0, 0],
	            apiOptions: ApiOptions.defaults
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            enterTheMatrix: 0
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        // Used in the `onBlur` and `onFocus` handlers
	        this.cursorPosition = [0, 0];
	    },

	    render: function render() {
	        var _this = this;

	        // Set the input sizes through JS so we can control the size of the
	        // brackets. (If we set them in CSS we won't know values until the
	        // inputs are rendered.)
	        var dimensions = void 0;
	        if (this.props.apiOptions.customKeypad) {
	            dimensions = KEYPAD_INPUT_DIMENSIONS;
	        } else if (this.props.apiOptions.staticRender) {
	            dimensions = STATIC_INPUT_DIMENSIONS;
	        } else {
	            dimensions = NORMAL_DIMENSIONS;
	        }
	        var _dimensions = dimensions;
	        var INPUT_MARGIN = _dimensions.INPUT_MARGIN;
	        var INPUT_HEIGHT = _dimensions.INPUT_HEIGHT;
	        var INPUT_WIDTH = _dimensions.INPUT_WIDTH;


	        var matrixSize = getMatrixSize(this.props.answers);
	        var maxRows = this.props.matrixBoardSize[0];
	        var maxCols = this.props.matrixBoardSize[1];
	        var cursorRow = this.props.cursorPosition[0];
	        var cursorCol = this.props.cursorPosition[1];

	        var highlightedRow = Math.max(cursorRow, matrixSize[0] - 1);
	        var highlightedCol = Math.max(cursorCol, matrixSize[1] - 1);
	        var bracketHeight = (highlightedRow + 1) * (INPUT_HEIGHT + 2 * INPUT_MARGIN);
	        var bracketOffset = (highlightedCol + 1) * (INPUT_WIDTH + 2 * INPUT_MARGIN);

	        var className = classNames({
	            "perseus-matrix": true,
	            "static-mode": this.props.static,
	            "the-matrix": this.state.enterTheMatrix >= 5
	        });

	        return React.createElement(
	            "div",
	            { className: className },
	            this.props.prefix && React.createElement(
	                "div",
	                { className: "matrix-prefix" },
	                React.createElement(Renderer, { content: this.props.prefix })
	            ),
	            React.createElement(
	                "div",
	                { className: "matrix-input" },
	                React.createElement("div", {
	                    className: "matrix-bracket bracket-left",
	                    style: {
	                        height: bracketHeight
	                    } }),
	                React.createElement("div", {
	                    className: "matrix-bracket bracket-right",
	                    style: {
	                        height: bracketHeight,
	                        left: bracketOffset
	                    } }),
	                _(maxRows).times(function (row) {
	                    var rowVals = _this.props.answers[row];
	                    return React.createElement(
	                        "div",
	                        { className: "matrix-row", key: row },
	                        _(maxCols).times(function (col) {
	                            var outside = row > highlightedRow || col > highlightedCol;
	                            var inputProps = {
	                                className: outside ? "outside" : "inside",
	                                ref: getRefForPath(getInputPath(row, col)),
	                                value: rowVals ? rowVals[col] : null,
	                                style: {
	                                    height: INPUT_HEIGHT,
	                                    width: INPUT_WIDTH,
	                                    margin: INPUT_MARGIN
	                                },
	                                disabled: _this.props.apiOptions.readOnly,
	                                onFocus: function onFocus() {
	                                    // We store this locally so that we can use
	                                    // the new information in the `onBlur`
	                                    // handler, which happens before the props
	                                    // change has time to propagate.
	                                    // TODO(emily): Try to fix `MathOutput` so
	                                    // it correctly sends blur events before
	                                    // focus events.
	                                    _this.cursorPosition = [row, col];
	                                    _this.props.onChange({
	                                        cursorPosition: [row, col]
	                                    }, function () {
	                                        // This isn't a user interaction, so
	                                        // return false to signal that the
	                                        // matrix shouldn't be focused
	                                        return false;
	                                    });
	                                    _this._handleFocus(row, col);
	                                },
	                                onBlur: function onBlur() {
	                                    if (row === _this.cursorPosition[0] && col === _this.cursorPosition[1]) {
	                                        _this.props.onChange({
	                                            cursorPosition: [0, 0]
	                                        }, function () {
	                                            // This isn't a user interaction,
	                                            // so return false to signal that
	                                            // the matrix shouldn't be focused
	                                            return false;
	                                        });
	                                    }
	                                    _this._handleBlur(row, col);
	                                },
	                                onKeyDown: function onKeyDown(e) {
	                                    _this.handleKeyDown(row, col, e);
	                                },
	                                onChange: function onChange(value) {
	                                    _this.onValueChange(row, col, value);
	                                }
	                            };

	                            var MatrixInput = void 0;
	                            if (_this.props.apiOptions.customKeypad) {
	                                var style = {
	                                    margin: INPUT_MARGIN,
	                                    width: INPUT_WIDTH,
	                                    height: INPUT_HEIGHT,
	                                    // Ensure that any borders are included in
	                                    // the provided width.
	                                    boxSizing: 'border-box',
	                                    backgroundColor: outside ? '#f3f3f3' : '#fff'
	                                };

	                                MatrixInput = React.createElement(SimpleKeypadInput, _extends({}, inputProps, {
	                                    style: style,
	                                    scrollable: true,
	                                    keypadElement: _this.props.keypadElement
	                                }));
	                            } else if (_this.props.apiOptions.staticRender) {
	                                MatrixInput = React.createElement(MathOutput, inputProps);
	                            } else if (_this.props.numericInput) {
	                                MatrixInput = React.createElement(NumberInput, inputProps);
	                            } else {
	                                MatrixInput = React.createElement(TextInput, inputProps);
	                            }
	                            return React.createElement(
	                                "span",
	                                {
	                                    key: col,
	                                    className: "matrix-input-field" },
	                                MatrixInput
	                            );
	                        })
	                    );
	                })
	            ),
	            this.props.suffix && React.createElement(
	                "div",
	                { className: "matrix-suffix" },
	                React.createElement(Renderer, { content: this.props.suffix })
	            )
	        );
	    },

	    getInputPaths: function getInputPaths() {
	        var inputPaths = [];
	        var maxRows = this.props.matrixBoardSize[0];
	        var maxCols = this.props.matrixBoardSize[1];

	        _(maxRows).times(function (row) {
	            _(maxCols).times(function (col) {
	                var inputPath = getInputPath(row, col);
	                inputPaths.push(inputPath);
	            });
	        });

	        return inputPaths;
	    },

	    getGrammarTypeForPath: function getGrammarTypeForPath(inputPath) {
	        return "number";
	    },

	    _handleFocus: function _handleFocus(row, col) {
	        this.props.onFocus(getInputPath(row, col));
	    },

	    _handleBlur: function _handleBlur(row, col) {
	        this.props.onBlur(getInputPath(row, col));
	    },

	    focus: function focus() {
	        this.focusInputPath(getDefaultPath());
	        return true;
	    },

	    focusInputPath: function focusInputPath(path) {
	        var inputID = getRefForPath(path);
	        this.refs[inputID].focus();
	    },

	    blurInputPath: function blurInputPath(path) {
	        if (path.length === 0) {
	            path = getDefaultPath();
	        }

	        var inputID = getRefForPath(path);
	        this.refs[inputID].blur();
	    },

	    getDOMNodeForPath: function getDOMNodeForPath(inputPath) {
	        var inputID = getRefForPath(inputPath);
	        return ReactDOM.findDOMNode(this.refs[inputID]);
	    },

	    setInputValue: function setInputValue(inputPath, value, callback) {
	        var row = getRowFromPath(inputPath);
	        var col = getColumnFromPath(inputPath);
	        this.onValueChange(row, col, value, callback);
	    },

	    handleKeyDown: function handleKeyDown(row, col, e) {
	        var maxRow = this.props.matrixBoardSize[0];
	        var maxCol = this.props.matrixBoardSize[1];
	        var enterTheMatrix = null;

	        var curInput = this.refs[getRefForPath(getInputPath(row, col))];
	        var curValueString = curInput.getStringValue();
	        var cursorStartPosition = curInput.getSelectionStart();
	        var cursorEndPosition = curInput.getSelectionEnd();

	        var nextPath = null;
	        if (e.key === "ArrowUp" && row > 0) {
	            nextPath = getInputPath(row - 1, col);
	        } else if (e.key === "ArrowDown" && row + 1 < maxRow) {
	            nextPath = getInputPath(row + 1, col);
	        } else if (e.key === "ArrowLeft" && col > 0) {
	            if (cursorStartPosition === 0 && cursorEndPosition === 0) {
	                // Only go to next input if we're at the *start* of the content
	                nextPath = getInputPath(row, col - 1);
	            }
	        } else if (e.key === "ArrowRight" && col + 1 < maxCol) {
	            if (cursorStartPosition === curValueString.length) {
	                // Only go to next input if we're at the *end* of the content
	                nextPath = getInputPath(row, col + 1);
	            }
	        } else if (e.key === "Enter") {
	            enterTheMatrix = this.state.enterTheMatrix + 1;
	        } else if (e.key === "Escape") {
	            enterTheMatrix = 0;
	        }

	        if (nextPath) {
	            // Prevent the cursor from jumping again inside the next input
	            e.preventDefault();

	            // Focus the input and move the cursor to the end of it.
	            var input = this.refs[getRefForPath(nextPath)];

	            // Multiply by 2 to ensure the cursor always ends up at the end;
	            // Opera sometimes sees a carriage return as 2 characters.
	            var inputValString = input.getStringValue();
	            var valueLength = inputValString.length * 2;

	            input.focus();
	            if (e.key === "ArrowRight") {
	                input.setSelectionRange(0, 0);
	            } else {
	                input.setSelectionRange(valueLength, valueLength);
	            }
	        }

	        if (enterTheMatrix != null) {
	            this.setState({
	                enterTheMatrix: enterTheMatrix
	            });
	        }
	    },

	    onValueChange: function onValueChange(row, column, value, cb) {
	        var answers = _.map(this.props.answers, _.clone);
	        if (!answers[row]) {
	            answers[row] = [];
	        }
	        answers[row][column] = value;
	        this.props.onChange({
	            answers: answers
	        }, cb);
	        this.props.trackInteraction();
	    },

	    getUserInput: function getUserInput() {
	        return {
	            answers: this.props.answers
	        };
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Matrix.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Matrix, {
	    validate: function validate(state, rubric) {
	        var solution = rubric.answers;
	        var supplied = state.answers;
	        var solutionSize = getMatrixSize(solution);
	        var suppliedSize = getMatrixSize(supplied);

	        var incorrectSize = solutionSize[0] !== suppliedSize[0] || solutionSize[1] !== suppliedSize[1];

	        var createValidator = KhanAnswerTypes.number.createValidatorFunctional;
	        var message = null;
	        var hasEmptyCell = false;
	        var incorrect = false;
	        _(suppliedSize[0]).times(function (row) {
	            _(suppliedSize[1]).times(function (col) {
	                if (supplied[row][col] == null || supplied[row][col].toString().length === 0) {
	                    hasEmptyCell = true;
	                }
	                var validator = createValidator(solution[row][col], { simplify: true });
	                var result = validator(supplied[row][col]);
	                if (result.message) {
	                    message = result.message;
	                }
	                if (!result.correct) {
	                    incorrect = true;
	                }
	            });
	        });

	        if (hasEmptyCell) {
	            return {
	                type: "invalid",
	                message: i18n._("Make sure you fill in all cells in the matrix.")
	            };
	        }

	        if (incorrectSize) {
	            return {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: null
	            };
	        }

	        return {
	            type: "points",
	            earned: incorrect ? 0 : 1,
	            total: 1,
	            message: message
	        };
	    }
	});

	var propTransform = function propTransform(editorProps) {
	    // Remove answers before passing to widget
	    var blankAnswers = _(editorProps.matrixBoardSize[0]).times(function () {
	        return stringArrayOfSize(editorProps.matrixBoardSize[1]);
	    });
	    editorProps = _.pick(editorProps, "matrixBoardSize", "prefix", "suffix");
	    return _.extend(editorProps, {
	        answers: blankAnswers
	    });
	};

	var staticTransform = function staticTransform(editorProps) {
	    var widgetProps = _.pick(editorProps, "matrixBoardSize", "prefix", "suffix");
	    // We convert matrix cells from numbers to string to match the expected
	    // input into the rendered widget.
	    widgetProps.answers = _.map(editorProps.answers, function (row) {
	        // Replace null values with empty string
	        return _.map(row, function (cell) {
	            return cell != null ? String(cell) : "";
	        });
	    });
	    return widgetProps;
	};

	module.exports = {
	    name: "matrix",
	    displayName: "Matrix",
	    widget: Matrix,
	    transform: propTransform,
	    staticTransform: staticTransform
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-before-function-paren */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var Editor = __webpack_require__(13);
	var RangeInput = __webpack_require__(190);

	var Matrix = __webpack_require__(115).widget;

	// Really large matrices will cause issues with question formatting, so we
	// have to cap it at some point.
	var MAX_BOARD_SIZE = 6;

	var getMatrixSize = function getMatrixSize(matrix) {
	    var matrixSize = [1, 1];

	    // We need to find the widest row and tallest column to get the correct
	    // matrix size.
	    _(matrix).each(function (matrixRow, row) {
	        var rowWidth = 0;
	        _(matrixRow).each(function (matrixCol, col) {
	            if (matrixCol != null && matrixCol.toString().length) {
	                rowWidth = col + 1;
	            }
	        });

	        // Matrix width:
	        matrixSize[1] = Math.max(matrixSize[1], rowWidth);

	        // Matrix height:
	        if (rowWidth > 0) {
	            matrixSize[0] = Math.max(matrixSize[0], row + 1);
	        }
	    });
	    return matrixSize;
	};

	var MatrixEditor = React.createClass({
	    displayName: "MatrixEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        matrixBoardSize: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
	        answers: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)),
	        prefix: React.PropTypes.string,
	        suffix: React.PropTypes.string,
	        cursorPosition: React.PropTypes.arrayOf(React.PropTypes.number)
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            matrixBoardSize: [3, 3],
	            answers: [[]],
	            prefix: "",
	            suffix: "",
	            cursorPosition: [0, 0]
	        };
	    },

	    render: function render() {
	        var _this = this;

	        var matrixProps = _.extend({
	            numericInput: true,
	            onBlur: function onBlur() {},
	            onFocus: function onFocus() {},
	            trackInteraction: function trackInteraction() {}
	        }, this.props);
	        return React.createElement(
	            "div",
	            { className: "perseus-matrix-editor" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                " ",
	                "Max matrix size:",
	                " ",
	                React.createElement(RangeInput, {
	                    value: this.props.matrixBoardSize,
	                    onChange: this.onMatrixBoardSizeChange,
	                    format: this.props.labelStyle,
	                    useArrowKeys: true })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(Matrix, matrixProps)
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                " ",
	                "Matrix prefix:",
	                " ",
	                React.createElement(Editor, {
	                    ref: "prefix",
	                    apiOptions: this.props.apiOptions,
	                    enabledFeatures: this.props.enabledFeatures,
	                    content: this.props.prefix,
	                    widgetEnabled: false,
	                    onChange: function onChange(newProps) {
	                        _this.change({ prefix: newProps.content });
	                    } })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                " ",
	                "Matrix suffix:",
	                " ",
	                React.createElement(Editor, {
	                    ref: "suffix",
	                    apiOptions: this.props.apiOptions,
	                    enabledFeatures: this.props.enabledFeatures,
	                    content: this.props.suffix,
	                    widgetEnabled: false,
	                    onChange: function onChange(newProps) {
	                        _this.change({ suffix: newProps.content });
	                    } })
	            )
	        );
	    },

	    onMatrixBoardSizeChange: function onMatrixBoardSizeChange(range) {
	        var _this2 = this;

	        var matrixSize = getMatrixSize(this.props.answers);
	        if (range[0] !== null && range[1] !== null) {
	            range = [Math.round(Math.min(Math.max(range[0], 1), MAX_BOARD_SIZE)), Math.round(Math.min(Math.max(range[1], 1), MAX_BOARD_SIZE))];
	            var answers = _(Math.min(range[0], matrixSize[0])).times(function (row) {
	                return _(Math.min(range[1], matrixSize[1])).times(function (col) {
	                    return _this2.props.answers[row][col];
	                });
	            });
	            this.props.onChange({
	                matrixBoardSize: range,
	                answers: answers
	            });
	        }
	    }
	});

	module.exports = MatrixEditor;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/forbid-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Renderer = __webpack_require__(30);
	var Sortable = __webpack_require__(192);

	var ApiOptions = __webpack_require__(7).Options;
	var shuffle = __webpack_require__(8).shuffle;
	var seededRNG = __webpack_require__(8).seededRNG;

	var Matcher = React.createClass({
	    displayName: "Matcher",

	    propTypes: {
	        apiOptions: ApiOptions.propTypes,
	        labels: React.PropTypes.array,
	        left: React.PropTypes.array,
	        onChange: React.PropTypes.func,
	        orderMatters: React.PropTypes.bool,
	        padding: React.PropTypes.bool,
	        problemNum: React.PropTypes.number,
	        right: React.PropTypes.array,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            left: [],
	            right: [],
	            labels: ["", ""],
	            orderMatters: false,
	            padding: true,
	            problemNum: 0,
	            onChange: function onChange() {}
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            leftHeight: 0,
	            rightHeight: 0
	        };
	    },

	    render: function render() {
	        // Use the same random() function to shuffle both columns sequentially
	        var rng = seededRNG(this.props.problemNum);

	        var left;
	        if (!this.props.orderMatters) {
	            // If the order doesn't matter, don't shuffle the left column
	            left = this.props.left;
	        } else {
	            left = shuffle(this.props.left, rng, /* ensurePermuted */true);
	        }

	        var right = shuffle(this.props.right, rng, /* ensurePermuted */true);

	        var showLabels = _.any(this.props.labels);
	        var constraints = { height: _.max([this.state.leftHeight, this.state.rightHeight]) };

	        var cellMarginPx = this.props.apiOptions.xomManatee ? 8 : 5;
	        var widgetMarginPx = this.props.apiOptions.xomManatee ? 16 : 0;

	        return React.createElement(
	            "div",
	            { className: "perseus-widget-matcher perseus-clearfix" },
	            React.createElement(
	                "div",
	                { className: "column", style: { marginLeft: widgetMarginPx } },
	                showLabels && React.createElement(
	                    "div",
	                    { className: "column-label" },
	                    React.createElement(Renderer, { content: this.props.labels[0] || "..." })
	                ),
	                React.createElement(Sortable, {
	                    options: left,
	                    layout: "vertical",
	                    padding: this.props.padding,
	                    disabled: !this.props.orderMatters,
	                    constraints: constraints,
	                    onMeasure: this.onMeasureLeft,
	                    onChange: this.changeAndTrack,
	                    margin: cellMarginPx,
	                    ref: "left"
	                })
	            ),
	            React.createElement(
	                "div",
	                { className: "column", style: { marginRight: widgetMarginPx } },
	                showLabels && React.createElement(
	                    "div",
	                    { className: "column-label" },
	                    React.createElement(Renderer, { content: this.props.labels[1] || "..." })
	                ),
	                React.createElement(Sortable, {
	                    options: right,
	                    layout: "vertical",
	                    padding: this.props.padding,
	                    constraints: constraints,
	                    onMeasure: this.onMeasureRight,
	                    onChange: this.changeAndTrack,
	                    margin: cellMarginPx,
	                    ref: "right"
	                })
	            )
	        );
	    },

	    changeAndTrack: function changeAndTrack(e) {
	        this.props.onChange(e);
	        this.props.trackInteraction();
	    },

	    onMeasureLeft: function onMeasureLeft(dimensions) {
	        var height = _.max(dimensions.heights);
	        this.setState({ leftHeight: height });
	    },

	    onMeasureRight: function onMeasureRight(dimensions) {
	        var height = _.max(dimensions.heights);
	        this.setState({ rightHeight: height });
	    },

	    getUserInput: function getUserInput() {
	        return {
	            left: this.refs.left.getOptions(),
	            right: this.refs.right.getOptions()
	        };
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Matcher.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Matcher, {
	    validate: function validate(state, rubric) {
	        var correct = _.isEqual(state.left, rubric.left) && _.isEqual(state.right, rubric.right);

	        return {
	            type: "points",
	            earned: correct ? 1 : 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "matcher",
	    displayName: "Two column matcher",
	    widget: Matcher
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var InfoTip = __webpack_require__(82);
	var PropCheckBox = __webpack_require__(47);
	var TextListEditor = __webpack_require__(65);

	var MatcherEditor = React.createClass({
	    displayName: "MatcherEditor",

	    propTypes: {
	        left: React.PropTypes.array,
	        right: React.PropTypes.array,
	        labels: React.PropTypes.array,
	        orderMatters: React.PropTypes.bool,
	        padding: React.PropTypes.bool
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            left: ["$x$", "$y$", "$z$"],
	            right: ["$1$", "$2$", "$3$"],
	            labels: ["test", "label"],
	            orderMatters: false,
	            padding: true
	        };
	    },

	    render: function render() {
	        var _this = this;

	        return React.createElement(
	            "div",
	            { className: "perseus-matcher-editor" },
	            React.createElement(
	                "div",
	                null,
	                ' ',
	                "Correct answer:",
	                ' ',
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Enter the correct answers here. The preview on the right will show the cards in a randomized order, which is how the student will see them."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-clearfix" },
	                React.createElement(TextListEditor, {
	                    options: this.props.left,
	                    onChange: function onChange(options, cb) {
	                        _this.props.onChange({ left: options }, cb);
	                    },
	                    layout: "vertical" }),
	                React.createElement(TextListEditor, {
	                    options: this.props.right,
	                    onChange: function onChange(options, cb) {
	                        _this.props.onChange({ right: options }, cb);
	                    },
	                    layout: "vertical" })
	            ),
	            React.createElement(
	                "span",
	                null,
	                ' ',
	                "Labels:",
	                ' ',
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "These are entirely optional."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement("input", { type: "text",
	                    defaultValue: this.props.labels[0],
	                    onChange: this.onLabelChange.bind(this, 0) }),
	                React.createElement("input", { type: "text",
	                    defaultValue: this.props.labels[1],
	                    onChange: this.onLabelChange.bind(this, 1) })
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(PropCheckBox, {
	                    label: "Order of the matched pairs matters:",
	                    orderMatters: this.props.orderMatters,
	                    onChange: this.props.onChange }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "With this option enabled, only the order provided above will be treated as correct. This is useful when ordering is significant, such as in the context of a proof."
	                    ),
	                    React.createElement(
	                        "p",
	                        null,
	                        "If disabled, pairwise matching is sufficient. To make this clear, the left column becomes fixed in the provided order and only the cards in the right column can be moved."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(PropCheckBox, {
	                    label: "Padding:",
	                    padding: this.props.padding,
	                    onChange: this.props.onChange }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Padding is good for text, but not needed for images."
	                    )
	                )
	            )
	        );
	    },

	    onLabelChange: function onLabelChange(index, e) {
	        var labels = _.clone(this.props.labels);
	        labels[index] = e.target.value;
	        this.props.onChange({ labels: labels });
	    },

	    getSaveWarnings: function getSaveWarnings() {
	        if (this.props.left.length !== this.props.right.length) {
	            return ["The two halves of the matcher have different numbers" + " of cards."];
	        }
	        return [];
	    },

	    serialize: function serialize() {
	        return _.pick(this.props, "left", "right", "labels", "orderMatters", "padding");
	    }
	});

	module.exports = MatcherEditor;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, indent, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _2 = __webpack_require__(20);

	var GraphUtils = __webpack_require__(165);

	var defaultImage = {
	    url: null,
	    top: 0,
	    left: 0
	};

	var Measurer = React.createClass({
	    displayName: "Measurer",

	    propTypes: {
	        box: React.PropTypes.arrayOf(React.PropTypes.number),
	        image: React.PropTypes.shape({
	            url: React.PropTypes.string,
	            top: React.PropTypes.number,
	            left: React.PropTypes.number
	        }),
	        showProtractor: React.PropTypes.bool,
	        protractorX: React.PropTypes.number,
	        protractorY: React.PropTypes.number,
	        showRuler: React.PropTypes.bool,
	        rulerLabel: React.PropTypes.string,
	        rulerTicks: React.PropTypes.number,
	        rulerPixels: React.PropTypes.number,
	        rulerLength: React.PropTypes.number
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            box: [480, 480],
	            image: {},
	            showProtractor: true,
	            protractorX: 7.5,
	            protractorY: 0.5,
	            showRuler: false,
	            rulerLabel: "",
	            rulerTicks: 10,
	            rulerPixels: 40,
	            rulerLength: 10
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    render: function render() {
	        var image = _2.extend({}, defaultImage, this.props.image);
	        return React.createElement(
	            "div",
	            {
	                className: "perseus-widget perseus-widget-measurer " + "graphie-container above-scratchpad",
	                style: { width: this.props.box[0], height: this.props.box[1] } },
	            image.url && React.createElement("img", {
	                src: image.url,
	                style: {
	                    top: image.top,
	                    left: image.left
	                } }),
	            React.createElement("div", { className: "graphie", ref: "graphieDiv" })
	        );
	    },

	    componentDidMount: function componentDidMount() {
	        this.setupGraphie();
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        var shouldSetupGraphie = _2.any(["box", "showProtractor", "showRuler", "rulerLabel", "rulerTicks", "rulerPixels", "rulerLength"], function (prop) {
	            return prevProps[prop] !== this.props[prop];
	        }, this);

	        if (shouldSetupGraphie) {
	            this.setupGraphie();
	        }
	    },

	    setupGraphie: function setupGraphie() {
	        var graphieDiv = ReactDOM.findDOMNode(this.refs.graphieDiv);
	        $(graphieDiv).empty();
	        var graphie = this.graphie = GraphUtils.createGraphie(graphieDiv);

	        var scale = [40, 40];
	        var range = [[0, this.props.box[0] / scale[0]], [0, this.props.box[1] / scale[1]]];
	        graphie.init({
	            range: range,
	            scale: scale
	        });
	        graphie.addMouseLayer({
	            allowScratchpad: true
	        });

	        if (this.protractor) {
	            this.protractor.remove();
	        }

	        if (this.props.showProtractor) {
	            this.protractor = graphie.protractor([this.props.protractorX, this.props.protractorY]);
	        }

	        if (this.ruler) {
	            this.ruler.remove();
	        }

	        if (this.props.showRuler) {
	            this.ruler = graphie.ruler({
	                center: [(range[0][0] + range[0][1]) / 2, (range[1][0] + range[1][1]) / 2],
	                label: this.props.rulerLabel,
	                pixelsPerUnit: this.props.rulerPixels,
	                ticksPerUnit: this.props.rulerTicks,
	                units: this.props.rulerLength
	            });
	        }
	    },

	    getUserInput: function getUserInput() {
	        return {};
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        // TODO(joel) - I don't understand how this is useful!
	        return Measurer.validate(this.getUserInput(), rubric);
	    },

	    focus: $.noop
	});

	_2.extend(Measurer, {
	    validate: function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: 1,
	            total: 1,
	            message: null
	        };
	    }
	});

	var propUpgrades = {
	    1: function _(v0props) {
	        var v1props = _2(v0props).chain().omit("imageUrl", "imageTop", "imageLeft").extend({
	            image: {
	                url: v0props.imageUrl,
	                top: v0props.imageTop,
	                left: v0props.imageLeft
	            }
	        }).value();
	        return v1props;
	    }
	};

	module.exports = {
	    name: "measurer",
	    displayName: "Measurer",
	    widget: Measurer,
	    version: { major: 1, minor: 0 },
	    propUpgrades: propUpgrades
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var InfoTip = __webpack_require__(82);
	var NumberInput = __webpack_require__(175);
	var PropCheckBox = __webpack_require__(47);
	var RangeInput = __webpack_require__(190);

	var defaultImage = {
	    url: null,
	    top: 0,
	    left: 0
	};

	var MeasurerEditor = React.createClass({
	    displayName: "MeasurerEditor",

	    mixins: [Changeable, EditorJsonify],
	    className: "perseus-widget-measurer",

	    propTypes: {
	        box: React.PropTypes.arrayOf(React.PropTypes.number),
	        image: React.PropTypes.shape({
	            url: React.PropTypes.string,
	            top: React.PropTypes.number,
	            left: React.PropTypes.number
	        }),
	        showProtractor: React.PropTypes.bool,
	        showRuler: React.PropTypes.bool,
	        rulerLabel: React.PropTypes.string,
	        rulerTicks: React.PropTypes.number,
	        rulerPixels: React.PropTypes.number,
	        rulerLength: React.PropTypes.number
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            box: [480, 480],
	            image: {},
	            showProtractor: true,
	            showRuler: false,
	            rulerLabel: "",
	            rulerTicks: 10,
	            rulerPixels: 40,
	            rulerLength: 10
	        };
	    },

	    render: function render() {
	        var _this = this;

	        var image = _.extend({}, defaultImage, this.props.image);

	        return React.createElement(
	            "div",
	            { className: "perseus-widget-measurer" },
	            React.createElement(
	                "div",
	                null,
	                "Image displayed under protractor and/or ruler:"
	            ),
	            React.createElement(
	                "div",
	                null,
	                "URL:",
	                ' ',
	                React.createElement("input", { type: "text",
	                    className: "perseus-widget-measurer-url",
	                    ref: "image-url",
	                    defaultValue: image.url,
	                    onChange: this._changeUrl }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Create an image in graphie, or use the \"Add image\" function to create a background."
	                    )
	                )
	            ),
	            image.url && React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "label",
	                    { className: "perseus-widget-left-col" },
	                    "Pixels from top:",
	                    " ",
	                    React.createElement(NumberInput, {
	                        placeholder: 0,
	                        onChange: this._changeTop,
	                        value: image.top,
	                        useArrowKeys: true })
	                ),
	                React.createElement(
	                    "label",
	                    { className: "perseus-widget-right-col" },
	                    "Pixels from left:",
	                    " ",
	                    React.createElement(NumberInput, {
	                        placeholder: 0,
	                        onChange: this._changeLeft,
	                        value: image.left,
	                        useArrowKeys: true })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Containing area [width, height]:",
	                ' ',
	                React.createElement(RangeInput, {
	                    onChange: this.change("box"),
	                    value: this.props.box,
	                    useArrowKeys: true })
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-left-col" },
	                    React.createElement(PropCheckBox, { label: "Show ruler",
	                        showRuler: this.props.showRuler,
	                        onChange: this.props.onChange })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-right-col" },
	                    React.createElement(PropCheckBox, { label: "Show protractor",
	                        showProtractor: this.props.showProtractor,
	                        onChange: this.props.onChange })
	                )
	            ),
	            this.props.showRuler && React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "label",
	                        null,
	                        ' ',
	                        "Ruler label:",
	                        ' ',
	                        React.createElement(
	                            "select",
	                            {
	                                onChange: function onChange(e) {
	                                    return _this.change("rulerLabel", e.target.value);
	                                },
	                                value: this.props.rulerLabel },
	                            React.createElement(
	                                "option",
	                                { value: "" },
	                                "None"
	                            ),
	                            React.createElement(
	                                "optgroup",
	                                { label: "Metric" },
	                                this.renderLabelChoices([["milimeters", "mm"], ["centimeters", "cm"], ["meters", "m"], ["kilometers", "km"]])
	                            ),
	                            React.createElement(
	                                "optgroup",
	                                { label: "Imperial" },
	                                this.renderLabelChoices([["inches", "in"], ["feet", "ft"], ["yards", "yd"], ["miles", "mi"]])
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "label",
	                        null,
	                        ' ',
	                        "Ruler ticks:",
	                        ' ',
	                        React.createElement(
	                            "select",
	                            {
	                                onChange: function onChange(e) {
	                                    return _this.change("rulerTicks", +e.target.value);
	                                },
	                                value: this.props.rulerTicks },
	                            _.map([1, 2, 4, 8, 10, 16], function (n) {
	                                return React.createElement(
	                                    "option",
	                                    { key: n, value: n },
	                                    n
	                                );
	                            })
	                        )
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "label",
	                        null,
	                        "Ruler pixels per unit:",
	                        " ",
	                        React.createElement(NumberInput, {
	                            placeholder: 40,
	                            onChange: this.change("rulerPixels"),
	                            value: this.props.rulerPixels,
	                            useArrowKeys: true })
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "label",
	                        null,
	                        "Ruler length in units:",
	                        " ",
	                        React.createElement(NumberInput, {
	                            placeholder: 10,
	                            onChange: this.change("rulerLength"),
	                            value: this.props.rulerLength,
	                            useArrowKeys: true })
	                    )
	                )
	            )
	        );
	    },

	    _changeUrl: function _changeUrl(e) {
	        this._changeImage("url", e.target.value);
	    },

	    _changeTop: function _changeTop(newTop) {
	        this._changeImage("top", newTop);
	    },

	    _changeLeft: function _changeLeft(newLeft) {
	        this._changeImage("left", newLeft);
	    },

	    _changeImage: function _changeImage(subProp, newValue) {
	        var image = _.clone(this.props.image);
	        image[subProp] = newValue;
	        this.change("image", image);
	    },

	    renderLabelChoices: function renderLabelChoices(choices) {
	        return _.map(choices, function (nameAndValue) {
	            var name = nameAndValue[0];
	            var value = nameAndValue[1];

	            return React.createElement(
	                "option",
	                { key: value, value: value },
	                name
	            );
	        });
	    }
	});

	module.exports = MeasurerEditor;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, object-curly-spacing */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);

	var draw = __webpack_require__(207);

	var _require = __webpack_require__(208);

	var layout = _require.layout;

	var SmilesParser = __webpack_require__(209);

	var parse = SmilesParser.parse;
	var ParseError = SmilesParser.ParseError;

	var borderSize = 30;

	var Molecule = React.createClass({
	    displayName: "Molecule",

	    propTypes: {
	        id: React.PropTypes.string.isRequired,
	        rotationAngle: React.PropTypes.number,
	        smiles: React.PropTypes.string
	    },

	    getInitialState: function getInitialState() {
	        return { parsedSmiles: null, error: null };
	    },

	    componentWillMount: function componentWillMount() {
	        this.stateFromSmiles(this.props.smiles);
	    },

	    componentDidMount: function componentDidMount() {
	        this.canvasRender();
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.stateFromSmiles(nextProps.smiles);
	    },

	    componentDidUpdate: function componentDidUpdate() {
	        this.canvasRender();
	    },

	    stateFromSmiles: function stateFromSmiles(smiles) {
	        try {
	            this.setState({
	                parsedSmiles: parse(smiles),
	                error: null
	            });
	        } catch (e) {
	            if (e instanceof ParseError) {
	                this.setState({ error: e.message });
	            } else {
	                throw e;
	            }
	        }
	    },

	    setCanvasBounds: function setCanvasBounds(canvas, items) {
	        var xmax = Math.max.apply(Math, items.map(function (item) {
	            return item.pos ? item.pos[0] : -Infinity;
	        }));
	        var ymax = Math.max.apply(Math, items.map(function (item) {
	            return item.pos ? item.pos[1] : -Infinity;
	        }));
	        var xmin = Math.min.apply(Math, items.map(function (item) {
	            return item.pos ? item.pos[0] : Infinity;
	        }));
	        var ymin = Math.min.apply(Math, items.map(function (item) {
	            return item.pos ? item.pos[1] : Infinity;
	        }));
	        var width = xmax - xmin + 2 * borderSize;
	        var height = ymax - ymin + 2 * borderSize;
	        canvas.width = width;
	        canvas.height = height;
	        return [borderSize - xmin, borderSize - ymin];
	    },

	    canvasRender: function canvasRender() {
	        // Since canvas drawing happens only through an imperative API, we sync
	        // up the component with the canvas here, which happens when the
	        // component mounts or updates.
	        if (!!this.state.error || !this.state.parsedSmiles) {
	            return;
	        }
	        var items = layout(this.state.parsedSmiles, this.props.rotationAngle);
	        var canvas = this.refs.canvas;
	        var translation = this.setCanvasBounds(canvas, items);
	        var ctx = canvas.getContext("2d");
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        ctx.save();
	        ctx.translate(translation[0], translation[1]);
	        draw(ctx, items);
	        ctx.restore();
	    },
	    render: function render() {
	        // TODO(colin): escape the punctuation in the SMILES alt text for
	        // screen readers?
	        var content = React.createElement(
	            "canvas",
	            {
	                className: "molecule-canvas",
	                id: this.props.id + "-molecule",
	                ref: "canvas"
	            },
	            "A molecular structure drawing.  SMILES notation:",
	            this.props.smiles,
	            "."
	        );
	        if (this.state.error) {
	            content = React.createElement(
	                "div",
	                { className: "error" },
	                this.state.error
	            );
	        }
	        return React.createElement(
	            "div",
	            { className: "molecule-canvas" },
	            content
	        );
	    }
	});

	var MoleculeWidget = React.createClass({
	    displayName: "MoleculeWidget",

	    propTypes: {
	        rotationAngle: React.PropTypes.number,
	        smiles: React.PropTypes.string,
	        widgetId: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return { rotationAngle: 0 };
	    },

	    simpleValidate: function simpleValidate() {
	        return { type: "points", earned: 0, total: 0, message: null };
	    },

	    getUserInput: function getUserInput() {
	        return [];
	    },

	    validate: function validate(state, rubric) {
	        // TODO(colin): this is here as part of the interface for a component.
	        // Figure out if there is something more appropriate that this should
	        // return.
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    },

	    render: function render() {
	        return React.createElement(Molecule, {
	            id: this.props.widgetId,
	            smiles: this.props.smiles,
	            rotationAngle: this.props.rotationAngle
	        });
	    }
	});

	module.exports = {
	    name: "molecule-renderer",
	    displayName: "Molecule renderer",
	    hidden: false,
	    widget: MoleculeWidget,
	    molecule: Molecule
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(19);

	var EditorJsonify = __webpack_require__(173);
	var Changeable = __webpack_require__(172);
	var NumberInput = __webpack_require__(175);
	var TextInput = __webpack_require__(176);

	var MoleculeWidgetEditor = React.createClass({
	    displayName: "MoleculeWidgetEditor",

	    propTypes: {
	        rotationAngle: React.PropTypes.number,
	        smiles: React.PropTypes.string
	    },

	    mixins: [Changeable, EditorJsonify],

	    updateMolecule: function updateMolecule(newValue) {
	        this.change({ smiles: newValue });
	    },

	    updateRotation: function updateRotation(newValue) {
	        this.change({ rotationAngle: newValue });
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "SMILES: ",
	                    React.createElement(TextInput, {
	                        onChange: this.updateMolecule,
	                        value: this.props.smiles
	                    })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Rotation (deg): ",
	                    React.createElement(NumberInput, {
	                        onChange: this.updateRotation,
	                        value: this.props.rotationAngle
	                    })
	                )
	            )
	        );
	    }
	});

	module.exports = MoleculeWidgetEditor;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, no-var, react/jsx-sort-prop-types */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/* globals i18n, $_ */
	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);

	var NumberInput = __webpack_require__(175);
	var MathOutput = __webpack_require__(193);

	var ApiOptions = __webpack_require__(7).Options;

	var Graphie = __webpack_require__(67);
	var MovablePoint = Graphie.MovablePoint;
	var Line = Graphie.Line;

	var knumber = __webpack_require__(197).number;
	var KhanMath = __webpack_require__(85);
	var KhanColors = __webpack_require__(189);

	var bound = function bound(x, gt, lt) {
	    return Math.min(Math.max(x, gt), lt);
	};
	var assert = __webpack_require__(164).assert;

	var EN_DASH = "–";

	var reverseRel = {
	    ge: "le",
	    gt: "lt",
	    le: "ge",
	    lt: "gt"
	};

	var toggleStrictRel = {
	    ge: "gt",
	    gt: "ge",
	    le: "lt",
	    lt: "le"
	};

	function formatImproper(n, d) {
	    if (d === 1) {
	        return "" + n;
	    } else {
	        return n + "/" + d;
	    }
	}

	function formatMixed(n, d) {
	    if (n < 0) {
	        return "-" + formatMixed(-n, d);
	    }
	    var w = Math.floor(n / d);
	    if (w === 0) {
	        return formatImproper(n, d);
	    } else if (n - w * d === 0) {
	        return "" + w;
	    } else {
	        return w + "\\:" + formatImproper(n - w * d, d);
	    }
	}

	function formatNonReduced(n, d, base) {
	    var factor = Math.floor(base / d);
	    return formatImproper(n * factor, base);
	}

	var _label = function _label(graphie, labelStyle, pos, value, base) {
	    value = value || pos;

	    // TODO(jack): Find out if any exercises have "decimal ticks" set,
	    // and if so, re-save them and remove this check.
	    if (labelStyle === "decimal" || labelStyle === "decimal ticks") {
	        return graphie.label([pos, -0.53], Math.round(value * 100) / 100, "center");
	    } else if (labelStyle === "improper") {
	        var frac = KhanMath.toFraction(value);
	        return graphie.label([pos, -0.53], formatImproper(frac[0], frac[1]), "center");
	    } else if (labelStyle === "mixed") {
	        var _frac = KhanMath.toFraction(value);
	        return graphie.label([pos, -0.53], formatMixed(_frac[0], _frac[1]), "center");
	    } else if (labelStyle === "non-reduced") {
	        var _frac2 = KhanMath.toFraction(value);
	        return graphie.label([pos, -0.53], formatNonReduced(_frac2[0], _frac2[1], base), "center");
	    }
	};

	var TickMarks = Graphie.createSimpleClass(function (graphie, props) {
	    // Avoid infinite loop
	    if (!_.isFinite(props.tickStep) || props.tickStep <= 0) {
	        return []; // this has screwed me for the last time!
	    }

	    var results = [];

	    // For convenience, extract some props into separate variables
	    var range = props.range;
	    var labelRange = props.labelRange;
	    var leftLabel = labelRange[0] == null ? range[0] : labelRange[0];
	    var rightLabel = labelRange[1] == null ? range[1] : labelRange[1];

	    // Find base via GCD for non-reduced fractions
	    var base;
	    if (props.labelStyle === "non-reduced") {
	        var fractions = [leftLabel, rightLabel];
	        for (var i = 0; i <= props.numDivisions; i++) {
	            var x = range[0] + i * props.tickStep;
	            fractions.push(x);
	        }
	        var getDenom = function getDenom(x) {
	            return knumber.toFraction(x)[1];
	        };
	        var denoms = _.map(fractions, getDenom);
	        base = _.reduce(denoms, function (x, y) {
	            return KhanMath.getLCM(x, y);
	        });
	    } else {
	        base = undefined;
	    }

	    // Draw and save the tick marks and tick labels
	    for (var _i = 0; _i <= props.numDivisions; _i++) {
	        var _x = range[0] + _i * props.tickStep;
	        results.push(graphie.line([_x, -0.2], [_x, 0.2]));

	        var labelTicks = props.labelTicks;
	        if (labelTicks || props.labelStyle === "decimal ticks") {
	            results.push(_label(graphie, props.labelStyle, _x, _x, base));
	        }
	    }

	    // Render the text labels
	    graphie.style({ color: KhanColors.DYNAMIC }, function () {
	        results.push(_label(graphie, props.labelStyle, leftLabel, leftLabel, base));
	        results.push(_label(graphie, props.labelStyle, rightLabel, rightLabel, base));
	    });

	    // Render the labels' lines
	    graphie.style({
	        stroke: KhanColors.DYNAMIC,
	        strokeWidth: 3.5
	    }, function () {
	        results.push(graphie.line([leftLabel, -0.2], [leftLabel, 0.2]));
	        results.push(graphie.line([rightLabel, -0.2], [rightLabel, 0.2]));
	    });

	    return results;
	});

	var NumberLine = React.createClass({
	    displayName: "NumberLine",

	    propTypes: {
	        range: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,

	        labelRange: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
	        labelStyle: React.PropTypes.string.isRequired,
	        labelTicks: React.PropTypes.bool.isRequired,

	        divisionRange: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
	        numDivisions: React.PropTypes.number.isRequired,
	        snapDivisions: React.PropTypes.number.isRequired,

	        isTickCtrl: React.PropTypes.bool.isRequired,
	        isInequality: React.PropTypes.bool.isRequired,

	        numLinePosition: React.PropTypes.number.isRequired,
	        rel: React.PropTypes.oneOf(["lt", "gt", "le", "ge"]),

	        onFocus: React.PropTypes.func.isRequired,
	        onBlur: React.PropTypes.func.isRequired,
	        onChange: React.PropTypes.func.isRequired,

	        apiOptions: ApiOptions.propTypes,
	        static: React.PropTypes.bool,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    mixins: [Changeable],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            range: [0, 10],
	            labelStyle: "decimal",
	            labelRange: [null, null],
	            divisionRange: [1, 12],
	            labelTicks: true,
	            isTickCtrl: false,
	            isInequality: false,
	            numLinePosition: 0,
	            snapDivisions: 2,
	            rel: "ge",
	            apiOptions: ApiOptions.defaults
	        };
	    },

	    isValid: function isValid() {
	        var range = this.props.range;
	        var initialX = this.props.numLinePosition;
	        var divisionRange = this.props.divisionRange;

	        initialX = initialX == null ? range[0] : initialX;

	        return range[0] < range[1] && knumber.sign(initialX - range[0]) >= 0 && knumber.sign(initialX - range[1]) <= 0 && divisionRange[0] < divisionRange[1] && 0 < this.props.numDivisions && 0 < this.props.snapDivisions;
	    },

	    onNumDivisionsChange: function onNumDivisionsChange(numDivisions, cb) {
	        var divRange = this.props.divisionRange.slice();
	        var width = this.props.range[1] - this.props.range[0];

	        // Don't allow a fraction for the number of divisions
	        numDivisions = Math.round(numDivisions);

	        // Don't allow negative numbers for the number of divisions
	        numDivisions = numDivisions < 0 ? numDivisions * -1 : numDivisions;

	        // If the number of divisions isn't blank, update the number line
	        if (numDivisions) {
	            var nextProps = _.extend({}, this.props, {
	                tickStep: width / numDivisions
	            });

	            var newNumLinePosition = this.snapNumLinePosition(nextProps, this.props.numLinePosition);

	            this.props.onChange({
	                divisionRange: divRange,
	                numDivisions: numDivisions,
	                numLinePosition: newNumLinePosition
	            }, cb);
	        }
	    },

	    _handleTickCtrlFocus: function _handleTickCtrlFocus() {
	        this.props.onFocus(["tick-ctrl"]);
	    },

	    _handleTickCtrlBlur: function _handleTickCtrlBlur() {
	        this.props.onBlur(["tick-ctrl"]);
	    },

	    focus: function focus() {
	        if (this.props.isTickCtrl) {
	            this.refs["tick-ctrl"].focus();
	            return true;
	        }
	    },

	    focusInputPath: function focusInputPath(path) {
	        if (path.length === 1) {
	            this.refs[path[0]].focus();
	        }
	    },

	    blurInputPath: function blurInputPath(path) {
	        if (path.length === 1) {
	            this.refs[path[0]].blur();
	        }
	    },

	    getInputPaths: function getInputPaths() {
	        if (this.props.isTickCtrl) {
	            return [["tick-ctrl"]];
	        } else {
	            return [];
	        }
	    },

	    getDOMNodeForPath: function getDOMNodeForPath(inputPath) {
	        if (inputPath.length === 1) {
	            return ReactDOM.findDOMNode(this.refs[inputPath[0]]);
	        }
	    },

	    getGrammarTypeForPath: function getGrammarTypeForPath(inputPath) {
	        if (inputPath.length === 1 && inputPath[0] === "tick-ctrl") {
	            return "number";
	        }
	    },

	    setInputValue: function setInputValue(inputPath, value, callback) {
	        if (inputPath.length === 1 && inputPath[0] === "tick-ctrl") {
	            this.onNumDivisionsChange(value, callback);
	        }
	    },

	    _renderGraphie: function _renderGraphie() {
	        var _this = this;

	        // Position variables
	        var range = this.props.range;
	        var width = range[1] - range[0];

	        var options = _.pick(this.props, ["range", "isTickCtrl"]);

	        // TODO(aria): Maybe save this as `this.calculatedProps`?
	        var props = _.extend({}, this.props, {
	            tickStep: width / this.props.numDivisions
	        });

	        return React.createElement(
	            Graphie,
	            {
	                ref: "graphie",
	                box: [460, 80],
	                options: options,
	                onMouseDown: function onMouseDown(coord) {
	                    _this.refs.graphie.movables.numberLinePoint.grab(coord);
	                },
	                setup: this._setupGraphie
	            },
	            React.createElement(TickMarks, _.pick(props, ["range", "numDivisions", "labelTicks", "labelStyle", "labelRange", "tickStep"])),
	            this._renderInequality(props),
	            this._renderNumberLinePoint(props)
	        );
	    },

	    snapNumLinePosition: function snapNumLinePosition(props, numLinePosition) {
	        var left = props.range[0];
	        var right = props.range[1];
	        var snapX = props.tickStep / props.snapDivisions;

	        var x = bound(numLinePosition, left, right);
	        x = left + knumber.roundTo(x - left, snapX);
	        assert(_.isFinite(x));
	        return x;
	    },

	    _renderNumberLinePoint: function _renderNumberLinePoint(props) {
	        var _this2 = this;

	        var isOpen = _(["lt", "gt"]).contains(props.rel);

	        // In static mode the point's fill and stroke is blue to signify that
	        // it can't be interacted with.
	        var fill;
	        if (isOpen) {
	            fill = KhanColors._BACKGROUND;
	        } else if (props.static) {
	            fill = KhanColors.DYNAMIC;
	        } else {
	            fill = KhanColors.INTERACTIVE;
	        }
	        var normalStyle = {
	            fill: fill,
	            stroke: props.static ? KhanColors.DYNAMIC : KhanColors.INTERACTIVE,
	            "stroke-width": isOpen ? 3 : 1
	        };
	        var highlightStyle = {
	            fill: isOpen ? KhanColors._BACKGROUND : KhanColors.INTERACTING,
	            "stroke-width": isOpen ? 3 : 1
	        };

	        return React.createElement(MovablePoint, {
	            ref: "numberLinePoint",
	            pointSize: 6,
	            coord: [props.numLinePosition, 0],
	            constraints: [function (coord, prevCoord) {
	                // constrain-y
	                return [coord[0], prevCoord[1]];
	            }, function (coord, prevCoord) {
	                // snap X
	                var x = _this2.snapNumLinePosition(props, coord[0]);
	                return [x, coord[1]];
	            }],
	            normalStyle: normalStyle,
	            highlightStyle: highlightStyle,
	            onMove: function onMove(coord) {
	                _this2.change({ numLinePosition: coord[0] });
	                _this2.props.trackInteraction();
	            }
	        });
	    },

	    handleReverse: function handleReverse() {
	        var newRel = reverseRel[this.props.rel];
	        this.props.onChange({ rel: newRel });
	    },

	    handleToggleStrict: function handleToggleStrict() {
	        var newRel = toggleStrictRel[this.props.rel];
	        this.props.onChange({ rel: newRel });
	    },

	    _getInequalityEndpoint: function _getInequalityEndpoint(props) {
	        var isGreater = _(["ge", "gt"]).contains(props.rel);
	        var widthInPixels = 400;
	        var range = props.range;
	        var scale = (range[1] - range[0]) / widthInPixels;
	        var buffer = 30 * scale;
	        var left = range[0] - buffer;
	        var right = range[1] + buffer;
	        var end = isGreater ? [right, 0] : [left, 0];
	        return end;
	    },

	    _renderInequality: function _renderInequality(props) {
	        if (props.isInequality) {
	            var end = this._getInequalityEndpoint(props);
	            var style = {
	                arrows: "->",
	                stroke: KhanColors.DYNAMIC,
	                strokeWidth: 3.5
	            };

	            return React.createElement(Line, {
	                start: [props.numLinePosition, 0],
	                end: end,
	                style: style
	            });
	        } else {
	            return null;
	        }
	    },

	    _setupGraphie: function _setupGraphie(graphie, options) {
	        // Ensure a sane configuration to avoid infinite loops
	        if (!this.isValid()) {
	            return;
	        }

	        // Position variables
	        var widthInPixels = 400;
	        var range = options.range;
	        var scale = (range[1] - range[0]) / widthInPixels;
	        var buffer = 30 * scale;

	        // Initiate the graphie without actually drawing anything
	        var left = range[0] - buffer;
	        var right = range[1] + buffer;
	        var bottom = -1;
	        var top = 1;

	        graphie.init({
	            range: [[left, right], [bottom, top]],
	            scale: [1 / scale, 40]
	        });

	        // Draw the number line
	        var center = (range[0] + range[1]) / 2;
	        graphie.line([center, 0], [right, 0], { arrows: "->" });
	        graphie.line([center, 0], [left, 0], { arrows: "->" });
	    },

	    getUserInput: function getUserInput() {
	        return {
	            numLinePosition: this.props.numLinePosition,
	            rel: this.props.isInequality ? this.props.rel : "eq",
	            numDivisions: this.props.numDivisions,
	            divisionRange: this.props.divisionRange
	        };
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return NumberLine.validate(this.getUserInput(), rubric);
	    },

	    render: function render() {
	        var divisionRange = this.props.divisionRange;
	        var divRangeString = divisionRange[0] + EN_DASH + divisionRange[1];
	        var invalidNumDivisions = this.props.numDivisions < divisionRange[0] || this.props.numDivisions > divisionRange[1];

	        var inequalityControls = React.createElement(
	            "div",
	            null,
	            React.createElement("input", {
	                type: "button",
	                className: "simple-button",
	                value: i18n._("Switch direction"),
	                onClick: this.handleReverse
	            }),
	            React.createElement("input", {
	                type: "button",
	                className: "simple-button",
	                value: _(["le", "ge"]).contains(this.props.rel) ? i18n._("Make circle open") : i18n._("Make circle filled"),
	                onClick: this.handleToggleStrict
	            })
	        );

	        var tickCtrl;
	        if (this.props.isTickCtrl) {
	            var Input;
	            if (this.props.apiOptions.staticRender) {
	                Input = MathOutput;
	            } else {
	                Input = NumberInput;
	            }
	            tickCtrl = React.createElement(
	                "label",
	                null,
	                i18n._("Number of divisions:"),
	                " ",
	                React.createElement(Input, {
	                    ref: "tick-ctrl",
	                    value: this.props.numDivisions || divisionRange[0],
	                    checkValidity: function checkValidity(val) {
	                        return val >= divisionRange[0] && val <= divisionRange[1];
	                    },
	                    onChange: this.onNumDivisionsChange,
	                    onFocus: this._handleTickCtrlFocus,
	                    onBlur: this._handleTickCtrlBlur,
	                    useArrowKeys: true
	                })
	            );
	        }

	        return React.createElement(
	            "div",
	            { className: "perseus-widget " + "perseus-widget-interactive-number-line"
	            },
	            tickCtrl,
	            !this.isValid() ? React.createElement(
	                "div",
	                { className: "perseus-error" },
	                "Invalid number line configuration."
	            ) : this.props.isTickCtrl && invalidNumDivisions ? React.createElement(
	                "div",
	                { className: "perseus-error" },
	                $_({ divRangeString: divRangeString }, "Please make sure the number of divisions is in " + "the range %(divRangeString)s.")
	            ) : this._renderGraphie(),
	            !this.props.static && this.props.isInequality && inequalityControls
	        );
	    }
	});

	_.extend(NumberLine, {
	    validate: function validate(state, rubric) {
	        var range = rubric.range;
	        var divisionRange = state.divisionRange;
	        var start = rubric.initialX != null ? rubric.initialX : range[0];
	        var startRel = rubric.isInequality ? "ge" : "eq";
	        var correctRel = rubric.correctRel || "eq";
	        var correctPos = knumber.equal(state.numLinePosition, rubric.correctX || 0);
	        var outsideAllowedRange = state.numDivisions > divisionRange[1] || state.numDivisions < divisionRange[0];

	        if (state.isTickCrtl && outsideAllowedRange) {
	            return {
	                type: "invalid",
	                message: "Number of divisions is outside the allowed range."
	            };
	        } else if (correctPos && correctRel === state.rel) {
	            return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if (state.numLinePosition === start && state.rel === startRel) {
	            // We're where we started.
	            return {
	                type: "invalid",
	                message: null
	            };
	        } else {
	            return {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: null
	            };
	        }
	    }
	});

	var numberLineTransform = function numberLineTransform(editorProps) {
	    var props = _.pick(editorProps, ["range", "labelRange", "labelStyle", "labelTicks", "divisionRange", "snapDivisions", "isTickCtrl", "isInequality"]);

	    var numLinePosition = editorProps.initialX != null ? editorProps.initialX : editorProps.range[0];

	    var width = editorProps.range[1] - editorProps.range[0];

	    var numDivisions;
	    if (editorProps.numDivisions != null) {
	        numDivisions = editorProps.numDivisions;
	    } else if (editorProps.tickStep != null) {
	        numDivisions = width / editorProps.tickStep;
	    } else {
	        numDivisions = undefined; // send to getDefaultProps()
	    }

	    _.extend(props, {
	        numLinePosition: numLinePosition,
	        numDivisions: numDivisions,
	        // Use getDefaultProps value if null
	        snapDivisions: props.snapDivisions || undefined
	    });

	    return props;
	};

	var staticTransform = function staticTransform(editorProps) {
	    var props = _.pick(editorProps, ["range", "labelRange", "labelStyle", "labelTicks", "divisionRange", "snapDivisions",

	    // isTickCtrl is ignored since users can't interact with it anyway
	    "isInequality"]);

	    // The correct x is the initial position of the point
	    var numLinePosition = editorProps.correctX != null ? editorProps.correctX : editorProps.range[0];

	    var width = editorProps.range[1] - editorProps.range[0];

	    var numDivisions;
	    if (editorProps.numDivisions != null) {
	        numDivisions = editorProps.numDivisions;
	    } else if (editorProps.tickStep != null) {
	        numDivisions = width / editorProps.tickStep;
	    } else {
	        numDivisions = undefined; // send to getDefaultProps()
	    }

	    _.extend(props, {
	        numLinePosition: numLinePosition,
	        numDivisions: numDivisions,
	        // Render the relation in the correct answer
	        rel: editorProps.isInequality ? editorProps.correctRel : null,
	        // Use getDefaultProps value if null
	        snapDivisions: props.snapDivisions || undefined
	    });

	    return props;
	};

	module.exports = {
	    name: "number-line",
	    displayName: "Number line",
	    widget: NumberLine,
	    transform: numberLineTransform,
	    staticTransform: staticTransform
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable no-var, react/jsx-sort-prop-types */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var EditorJsonify = __webpack_require__(173);

	var ButtonGroup = __webpack_require__(58);
	var InfoTip = __webpack_require__(82);
	var NumberInput = __webpack_require__(175);
	var PropCheckBox = __webpack_require__(47);
	var RangeInput = __webpack_require__(190);

	var knumber = __webpack_require__(197).number;
	var bound = function bound(x, gt, lt) {
	    return Math.min(Math.max(x, gt), lt);
	};

	var EN_DASH = "–";

	var NumberLineEditor = React.createClass({
	    displayName: "NumberLineEditor",

	    propTypes: {
	        range: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,

	        labelRange: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
	        labelStyle: React.PropTypes.string.isRequired,
	        labelTicks: React.PropTypes.bool,

	        divisionRange: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
	        numDivisions: React.PropTypes.number.isRequired,
	        snapDivisions: React.PropTypes.number,

	        tickStep: React.PropTypes.number,
	        correctRel: React.PropTypes.oneOf(["lt", "gt", "le", "ge", "eq"]),
	        correctX: React.PropTypes.number,
	        initialX: React.PropTypes.number,
	        isTickCtrl: React.PropTypes.bool,

	        onChange: React.PropTypes.func.isRequired,

	        static: React.PropTypes.bool
	    },

	    mixins: [EditorJsonify],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            range: [0, 10],

	            labelRange: [null, null],
	            labelStyle: "decimal",
	            labelTicks: true,

	            divisionRange: [1, 12],
	            numDivisions: 5,
	            snapDivisions: 2,

	            tickStep: null,
	            correctRel: "eq",
	            correctX: null,
	            initialX: null
	        };
	    },

	    onRangeChange: function onRangeChange(range) {
	        // Changing the range constrains the initial position, as well as the
	        // position of the answer and labels. Atm, it just marks them as
	        // invalid and prevents the number line from showing; it was annoying
	        // to change it for them, because if they're typing in fractions,
	        // it registers one-at-a-time and messes things up.
	        this.props.onChange({ range: range });
	    },

	    onLabelRangeChange: function onLabelRangeChange(i, num) {
	        var labelRange = this.props.labelRange.slice();
	        var otherNum = labelRange[1 - i];

	        if (num == null || otherNum == null) {
	            labelRange[i] = num;
	        } else {
	            // If both labels have values, this updates the "appropriate" one.
	            // It enforces that the position of the left label <= right label.
	            // If left otherwise, it makes certain aspects of validation hard.
	            labelRange = [Math.min(num, otherNum), Math.max(num, otherNum)];
	        }

	        this.props.onChange({ labelRange: labelRange });
	    },

	    onDivisionRangeChange: function onDivisionRangeChange(divisionRange) {
	        var numDivisions = this.props.numDivisions;
	        numDivisions = bound(numDivisions, divisionRange[0], divisionRange[1]);
	        this.props.onChange({
	            divisionRange: divisionRange,
	            numDivisions: numDivisions });
	    },

	    onNumChange: function onNumChange(key, value) {
	        var opts = {};
	        opts[key] = value;
	        this.props.onChange(opts);
	    },

	    onNumDivisionsChange: function onNumDivisionsChange(numDivisions) {
	        var divRange = this.props.divisionRange.slice();

	        if (!_.isFinite(numDivisions)) {
	            numDivisions = null;
	        }

	        // Don't allow a fraction for the number of divisions
	        numDivisions = Math.round(numDivisions);

	        // Don't allow negative numbers for the number of divisions
	        numDivisions = numDivisions < 0 ? numDivisions * -1 : numDivisions;

	        // If the number of divisions isn't blank, update the number line
	        if (numDivisions) {
	            // Constrain numDivisions to be within the allowed range
	            numDivisions = Math.min(divRange[1], Math.max(divRange[0], numDivisions));

	            this.props.onChange({
	                tickStep: null,
	                divisionRange: divRange,
	                numDivisions: numDivisions
	            });
	        }
	    },

	    onTickStepChange: function onTickStepChange(tickStep) {
	        this.props.onChange({
	            numDivisions: null,
	            tickStep: tickStep
	        });
	    },

	    onChangeRelation: function onChangeRelation(e) {
	        var value = e.target.value;
	        this.props.onChange({
	            correctRel: value,
	            isInequality: value !== "eq"
	        });
	    },

	    onLabelStyleChange: function onLabelStyleChange(labelStyle) {
	        this.props.onChange({
	            labelStyle: labelStyle
	        });
	    },

	    render: function render() {
	        var range = this.props.range;
	        var labelRange = this.props.labelRange;
	        var divisionRange = this.props.divisionRange;

	        range[0] = +range[0];range[1] = +range[1];

	        var width = range[1] - range[0];
	        var numDivisions = this.props.numDivisions;
	        var snapDivisions = this.props.snapDivisions;
	        var tickStep = this.props.tickStep;
	        var isTickCtrl = this.props.isTickCtrl;

	        var step = void 0;
	        if (!isTickCtrl) {
	            // this will help constrain the answer to what is reachable
	            step = tickStep ? tickStep / snapDivisions : width / numDivisions / snapDivisions;
	        } else {
	            // but if tickCtrl is on, the range of what is reachable is
	            // rather large, and it becomes obnoxious to check for this
	            step = null;
	        }

	        var labelStyleEditorButtons = [{ value: "decimal", content: "0.75", title: "Decimals" }, { value: "improper", content: "⁷⁄₄",
	            title: "Improper fractions" }, { value: "mixed", content: "1¾",
	            title: "Mixed numbers" }, { value: "non-reduced", content: "⁸⁄₄",
	            title: "Non-reduced" }];

	        return React.createElement(
	            "div",
	            { className: "perseus-widget-number-line-editor" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Correct x",
	                " ",
	                React.createElement(
	                    "select",
	                    {
	                        value: this.props.correctRel,
	                        onChange: this.onChangeRelation
	                    },
	                    React.createElement(
	                        "option",
	                        { value: "eq" },
	                        " = "
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "lt" },
	                        " < "
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "gt" },
	                        " > "
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "le" },
	                        " ≤ "
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "ge" },
	                        " ≥ "
	                    )
	                ),
	                " ",
	                React.createElement(NumberInput, {
	                    value: this.props.correctX,
	                    format: this.props.labelStyle,
	                    onChange: this.onNumChange.bind(this, "correctX"),
	                    checkValidity: function checkValidity(val) {
	                        return val >= range[0] && val <= range[1] && (!step || knumber.isInteger((val - range[0]) / step));
	                    },
	                    placeholder: "answer", size: "normal",
	                    useArrowKeys: true
	                }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "This is the correct answer. The answer is validated (as right or wrong) by using only the end position of the point and the relation (=, <, >, ≤, ≥)."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                this.props.static ? React.createElement(
	                    "label",
	                    null,
	                    "Range:"
	                ) : React.createElement(
	                    "label",
	                    null,
	                    "Position:",
	                    " ",
	                    React.createElement(NumberInput, {
	                        value: this.props.initialX,
	                        format: this.props.labelStyle,
	                        onChange: this.onNumChange.bind(this, "initialX"),
	                        placeholder: range[0],
	                        checkValidity: function checkValidity(val) {
	                            return val >= range[0] && val <= range[1];
	                        },
	                        useArrowKeys: true
	                    }),
	                    " ∈ " /* element of (little E) symbol @Nolint */
	                ),
	                React.createElement(RangeInput, {
	                    value: range,
	                    onChange: this.onRangeChange,
	                    format: this.props.labelStyle,
	                    useArrowKeys: true
	                }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "This controls the initial position of the point along the number line and the ",
	                        React.createElement(
	                            "strong",
	                            null,
	                            "range"
	                        ),
	                        ", the position of the endpoints of the number line. Setting the range constrains the position of the answer and the labels."
	                    ),
	                    React.createElement(
	                        "p",
	                        null,
	                        "In static mode, the initial position of the point is determined by Correct x instead of position."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-left-col" },
	                    "Labels:",
	                    " ",
	                    React.createElement(NumberInput, {
	                        value: labelRange[0], placeholder: range[0],
	                        format: this.props.labelStyle,
	                        checkValidity: function checkValidity(val) {
	                            return val >= range[0] && val <= range[1];
	                        },
	                        onChange: this.onLabelRangeChange.bind(this, 0),
	                        useArrowKeys: true
	                    }),
	                    React.createElement(
	                        "span",
	                        null,
	                        " & "
	                    ),
	                    React.createElement(NumberInput, {
	                        value: labelRange[1], placeholder: range[1],
	                        format: this.props.labelStyle,
	                        checkValidity: function checkValidity(val) {
	                            return val >= range[0] && val <= range[1];
	                        },
	                        onChange: this.onLabelRangeChange.bind(this, 1),
	                        useArrowKeys: true
	                    }),
	                    React.createElement(
	                        InfoTip,
	                        null,
	                        React.createElement(
	                            "p",
	                            null,
	                            "This controls the position of the left / right labels. By default, the labels are set by the range ",
	                            React.createElement("br", null),
	                            React.createElement(
	                                "strong",
	                                null,
	                                "Note:"
	                            ),
	                            " Ensure that the labels line up with the tick marks, or it may be confusing for users."
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Style:",
	                " ",
	                React.createElement(ButtonGroup, {
	                    allowEmpty: false,
	                    value: this.props.labelStyle,
	                    buttons: labelStyleEditorButtons,
	                    onChange: this.onLabelStyleChange
	                }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "This controls the styling of the labels for the two main labels as well as all the tick mark labels, if applicable. Your choices are decimal, improper fractions, mixed fractions, and non-reduced fractions."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                !this.props.static && React.createElement(
	                    "div",
	                    { className: "perseus-widget-left-col" },
	                    React.createElement(PropCheckBox, {
	                        label: "Show tick controller",
	                        isTickCtrl: this.props.isTickCtrl,
	                        onChange: this.props.onChange
	                    })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-right-col" },
	                    React.createElement(PropCheckBox, {
	                        label: "Show label ticks",
	                        labelTicks: this.props.labelTicks,
	                        onChange: this.props.onChange
	                    })
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                isTickCtrl && React.createElement(
	                    "span",
	                    null,
	                    React.createElement(
	                        "label",
	                        null,
	                        "Start num divisions at",
	                        " ",
	                        React.createElement(NumberInput, {
	                            value: this.props.numDivisions || null,
	                            format: "decimal",
	                            onChange: this.onNumDivisionsChange,
	                            checkValidity: function checkValidity(val) {
	                                return val >= divisionRange[0] && val <= divisionRange[1];
	                            },
	                            placeholder: width / this.props.tickStep,
	                            useArrowKeys: true
	                        })
	                    ),
	                    React.createElement(
	                        InfoTip,
	                        null,
	                        React.createElement(
	                            "p",
	                            null,
	                            "This controls the number (and position) of the tick marks. The number of divisions is constrained to",
	                            " " + divisionRange[0] + EN_DASH + divisionRange[1],
	                            ".",
	                            React.createElement("br", null),
	                            React.createElement(
	                                "strong",
	                                null,
	                                "Note:"
	                            ),
	                            " The user will be able to specify the number of divisions in a number input."
	                        )
	                    )
	                ),
	                !isTickCtrl && React.createElement(
	                    "span",
	                    null,
	                    React.createElement(
	                        "label",
	                        null,
	                        "Num divisions:",
	                        " ",
	                        React.createElement(NumberInput, {
	                            value: this.props.numDivisions || null,
	                            format: "decimal",
	                            onChange: this.onNumDivisionsChange,
	                            checkValidity: function checkValidity(val) {
	                                return val >= divisionRange[0] && val <= divisionRange[1];
	                            },
	                            placeholder: width / this.props.tickStep,
	                            useArrowKeys: true
	                        })
	                    ),
	                    " ",
	                    React.createElement(
	                        "label",
	                        null,
	                        "or tick step:",
	                        " ",
	                        React.createElement(NumberInput, {
	                            value: this.props.tickStep || null,
	                            format: this.props.labelStyle,
	                            onChange: this.onTickStepChange,
	                            checkValidity: function checkValidity(val) {
	                                return val > 0 && val <= width;
	                            },
	                            placeholder: width / this.props.numDivisions,
	                            useArrowKeys: true
	                        })
	                    ),
	                    React.createElement(
	                        InfoTip,
	                        null,
	                        React.createElement(
	                            "p",
	                            null,
	                            "This controls the number (and position) of the tick marks; you can either set the number of divisions (2 divisions would split the entire range in two halves), or the tick step (the distance between ticks) and the other value will be updated accordingly. ",
	                            React.createElement("br", null),
	                            React.createElement(
	                                "strong",
	                                null,
	                                "Note:"
	                            ),
	                            " There is no check to see if labels coordinate with the tick marks, which may be confusing for users if the blue labels and black ticks are off-step."
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "label",
	                    null,
	                    "Snap increments per tick:",
	                    " ",
	                    React.createElement(NumberInput, {
	                        value: snapDivisions,
	                        checkValidity: function checkValidity(val) {
	                            return val > 0;
	                        },
	                        format: this.props.labelStyle,
	                        onChange: this.onNumChange.bind(this, "snapDivisions"),
	                        useArrowKeys: true
	                    })
	                ),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "This determines the number of different places the point will snap between two adjacent tick marks. ",
	                        React.createElement("br", null),
	                        React.createElement(
	                            "strong",
	                            null,
	                            "Note:"
	                        ),
	                        "Ensure the required number of snap increments is provided to answer the question."
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = NumberLineEditor;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, max-len, no-console, no-unused-vars, no-var, one-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var Renderer = __webpack_require__(30);
	var Util = __webpack_require__(8);

	var ApiClassNames = __webpack_require__(7).ClassNames;

	var PlaceholderCard = React.createClass({
	    displayName: "PlaceholderCard",

	    propTypes: {
	        width: React.PropTypes.number.isRequired,
	        height: React.PropTypes.number.isRequired
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            {
	                className: "card-wrap " + ApiClassNames.INTERACTIVE,
	                style: { width: this.props.width } },
	            React.createElement("div", {
	                className: "card placeholder",
	                style: { height: this.props.height } })
	        );
	    }
	});

	var DragHintCard = React.createClass({
	    displayName: "DragHintCard",

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "card-wrap " + ApiClassNames.INTERACTIVE },
	            React.createElement("div", { className: "card drag-hint" })
	        );
	    }
	});

	var PropTypes = {
	    position: React.PropTypes.shape({
	        left: React.PropTypes.number,
	        top: React.PropTypes.number
	    })
	};

	var Card = React.createClass({
	    displayName: "Card",

	    propTypes: {
	        floating: React.PropTypes.bool.isRequired,
	        animating: React.PropTypes.bool,
	        width: React.PropTypes.number,
	        stack: React.PropTypes.bool,

	        onMouseDown: React.PropTypes.func,
	        onMouseMove: React.PropTypes.func,
	        onMouseUp: React.PropTypes.func,

	        // Used only for floating/animating cards
	        startMouse: PropTypes.position,
	        startOffset: PropTypes.position,
	        animateTo: PropTypes.position,
	        onAnimationEnd: React.PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            stack: false,
	            animating: false
	        };
	    },

	    render: function render() {
	        var style = {};

	        if (this.props.floating) {
	            style = {
	                position: "absolute",
	                left: this.props.startOffset.left,
	                top: this.props.startOffset.top
	            };
	        }

	        if (this.props.width) {
	            style.width = this.props.width;
	        }

	        var className = ["card"];
	        if (this.props.stack) {
	            className.push("stack");
	        }
	        if (this.props.floating && !this.props.animating) {
	            className.push("dragging");
	            style.left += this.props.mouse.left - this.props.startMouse.left;
	            style.top += this.props.mouse.top - this.props.startMouse.top;
	        }

	        // Pull out the content to get rendered
	        var rendererProps = _.pick(this.props, "content");

	        var onMouseDown = this.props.animating ? $.noop : this.onMouseDown;

	        return React.createElement(
	            "div",
	            { className: "card-wrap " + ApiClassNames.INTERACTIVE,
	                style: style,
	                onMouseDown: onMouseDown,
	                onTouchStart: onMouseDown,
	                onTouchMove: this.onMouseMove,
	                onTouchEnd: this.onMouseUp,
	                onTouchCancel: this.onMouseUp },
	            React.createElement(
	                "div",
	                { className: className.join(" ") },
	                React.createElement(Renderer, rendererProps)
	            )
	        );
	    },

	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        // Cards in the bank or drag list don't usually change -- they only
	        // reorder themselves -- so we want to skip the update to things a
	        // little faster. We also need to re-render if the content changes,
	        // which happens only in the editor. (We do want to update the floating
	        // card on mouse move to update its position.)
	        return this.props.floating || nextProps.floating || this.props.content !== nextProps.content ||
	        // TODO(alpert): Remove ref here after fixing facebook/react#1392.
	        this.props.fakeRef !== nextProps.fakeRef;
	    },

	    componentDidMount: function componentDidMount() {
	        this.mouseMoveUpBound = false;
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	        if (this.props.animating && !prevProps.animating) {
	            // If we just were changed into animating, start the animation.
	            // We pick the animation speed based on the distance that the card
	            // needs to travel. (Why sqrt? Just because it looks nice -- with a
	            // linear scale, far things take too long to come back.)
	            var ms = 15 * Math.sqrt(Math.sqrt(Math.pow(this.props.animateTo.left - this.props.startOffset.left, 2) + Math.pow(this.props.animateTo.top - this.props.startOffset.top, 2)));
	            $(ReactDOM.findDOMNode(this)).animate(this.props.animateTo, Math.max(ms, 1), this.props.onAnimationEnd);
	        }
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        // Event handlers should be unbound before component unmounting, but
	        // just in case...
	        if (this.mouseMoveUpBound) {
	            console.warn("Removing an element with bound event handlers.");

	            this.unbindMouseMoveUp();
	            Util.resetTouchHandlers();
	        }
	    },

	    bindMouseMoveUp: function bindMouseMoveUp() {
	        this.mouseMoveUpBound = true;
	        $(document).on("mousemove", this.onMouseMove);
	        $(document).on("mouseup", this.onMouseUp);
	    },

	    unbindMouseMoveUp: function unbindMouseMoveUp() {
	        this.mouseMoveUpBound = false;
	        $(document).off("mousemove", this.onMouseMove);
	        $(document).off("mouseup", this.onMouseUp);
	    },

	    onMouseDown: function onMouseDown(event) {
	        event.preventDefault();
	        var loc = Util.extractPointerLocation(event);
	        if (loc) {
	            this.bindMouseMoveUp();
	            this.props.onMouseDown && this.props.onMouseDown(loc, this);
	        }
	    },

	    onMouseMove: function onMouseMove(event) {
	        event.preventDefault();
	        var loc = Util.extractPointerLocation(event);
	        if (loc) {
	            this.props.onMouseMove && this.props.onMouseMove(loc);
	        }
	    },

	    onMouseUp: function onMouseUp(event) {
	        event.preventDefault();
	        var loc = Util.extractPointerLocation(event);
	        if (loc) {
	            this.unbindMouseMoveUp();
	            this.props.onMouseUp && this.props.onMouseUp(loc);
	        }
	    }
	});

	var NORMAL = "normal",
	    AUTO = "auto",
	    HORIZONTAL = "horizontal",
	    VERTICAL = "vertical";

	var Orderer = React.createClass({
	    displayName: "Orderer",

	    propTypes: {
	        correctOptions: React.PropTypes.array,
	        current: React.PropTypes.array,
	        height: React.PropTypes.oneOf([NORMAL, AUTO]),
	        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
	        options: React.PropTypes.array,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            current: [],
	            options: [],
	            correctOptions: [],
	            height: NORMAL,
	            layout: HORIZONTAL
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            current: [],
	            dragging: false,
	            placeholderIndex: null
	        };
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if (!_.isEqual(this.props.current, nextProps.current)) {
	            this.setState({ current: nextProps.current });
	        }
	    },

	    render: function render() {
	        var _this = this;

	        // This is the card we are currently dragging
	        var dragging = this.state.dragging && React.createElement(Card, { ref: "dragging",
	            floating: true,
	            content: this.state.dragContent,
	            startOffset: this.state.offsetPos,
	            startMouse: this.state.grabPos,
	            mouse: this.state.mousePos,
	            width: this.state.dragWidth,
	            onMouseUp: this.onRelease,
	            onMouseMove: this.onMouseMove,
	            key: this.state.dragKey || "draggingCard"
	        });

	        // This is the card that is currently animating
	        var animating = this.state.animating && React.createElement(Card, { floating: true,
	            animating: true,
	            content: this.state.dragContent,
	            startOffset: this.state.offsetPos,
	            width: this.state.dragWidth,
	            animateTo: this.state.animateTo,
	            onAnimationEnd: this.state.onAnimationEnd,
	            key: this.state.dragKey || "draggingCard"
	        });

	        // This is the list of draggable, rearrangable cards
	        var sortableCards = _.map(this.state.current, function (opt, i) {
	            return React.createElement(Card, {
	                ref: "sortable" + i,
	                fakeRef: "sortable" + i,
	                floating: false,
	                content: opt.content,
	                width: opt.width,
	                key: opt.key,
	                onMouseDown: this.state.animating ? $.noop : this.onClick.bind(null, "current", i) });
	        }, this);

	        if (this.state.placeholderIndex != null) {
	            var placeholder = React.createElement(PlaceholderCard, {
	                ref: "placeholder",
	                width: this.state.dragWidth,
	                height: this.state.dragHeight,
	                key: "placeholder" });
	            sortableCards.splice(this.state.placeholderIndex, 0, placeholder);
	        }

	        var anySortableCards = sortableCards.length > 0;
	        sortableCards.push(dragging, animating);

	        // If there are no cards in the list, then add a "hint" card
	        var sortable = React.createElement(
	            "div",
	            { className: "perseus-clearfix draggable-box" },
	            !anySortableCards && React.createElement(DragHintCard, null),
	            React.createElement(
	                "div",
	                { ref: "dragList" },
	                sortableCards
	            )
	        );

	        // This is the bank of stacks of cards
	        var bank = React.createElement(
	            "div",
	            { ref: "bank", className: "bank perseus-clearfix" },
	            _.map(this.props.options, function (opt, i) {
	                return React.createElement(Card, {
	                    ref: "bank" + i,
	                    floating: false,
	                    content: opt.content,
	                    stack: true,
	                    key: i,
	                    onMouseDown: _this.state.animating ? $.noop : _this.onClick.bind(null, "bank", i),
	                    onMouseMove: _this.onMouseMove,
	                    onMouseUp: _this.onRelease });
	            }, this)
	        );

	        return React.createElement(
	            "div",
	            { className: "draggy-boxy-thing orderer " + "height-" + this.props.height + " " + "layout-" + this.props.layout + " " + "above-scratchpad blank-background " + "perseus-clearfix " + ApiClassNames.INTERACTIVE,
	                ref: "orderer" },
	            bank,
	            sortable
	        );
	    },

	    onClick: function onClick(type, index, loc, draggable) {
	        var $draggable = $(ReactDOM.findDOMNode(draggable));
	        var list = this.state.current.slice();

	        var opt;
	        var placeholderIndex = null;

	        if (type === "current") {
	            // If this is coming from the original list, remove the original
	            // card from the list
	            list.splice(index, 1);
	            opt = this.state.current[index];
	            placeholderIndex = index;
	        } else if (type === "bank") {
	            opt = this.props.options[index];
	        }

	        this.setState({
	            current: list,
	            dragging: true,
	            placeholderIndex: placeholderIndex,
	            dragKey: opt.key,
	            dragContent: opt.content,
	            dragWidth: $draggable.width(),
	            dragHeight: $draggable.height(),
	            grabPos: loc,
	            mousePos: loc,
	            offsetPos: $draggable.position()
	        });
	    },

	    onRelease: function onRelease(loc) {
	        var _this2 = this;

	        var draggable = this.refs.dragging;
	        if (draggable == null) {
	            return;
	        }
	        var inCardBank = this.isCardInBank(draggable);
	        var index = this.state.placeholderIndex;

	        // Here, we build a callback function for the card to call when it is
	        // done animating
	        var onAnimationEnd = function onAnimationEnd() {
	            var list = _this2.state.current.slice();

	            if (!inCardBank) {
	                // Insert the new card into the position
	                var newCard = {
	                    content: _this2.state.dragContent,
	                    key: _.uniqueId("perseus_draggable_card_"),
	                    width: _this2.state.dragWidth
	                };

	                list.splice(index, 0, newCard);
	            }

	            _this2.props.onChange({
	                current: list
	            });
	            _this2.setState({
	                current: list,
	                dragging: false,
	                placeholderIndex: null,
	                animating: false
	            });
	            _this2.props.trackInteraction();
	        };

	        // Find the position of the card we should animate to
	        // TODO(alpert): Update mouse position once more before animating?
	        var offset = $(ReactDOM.findDOMNode(draggable)).position();
	        var finalOffset = null;
	        if (inCardBank) {
	            // If we're in the card bank, go through the options to find the
	            // one with the same content
	            _.each(this.props.options, function (opt, i) {
	                if (opt.content === this.state.dragContent) {
	                    var card = ReactDOM.findDOMNode(this.refs["bank" + i]);
	                    finalOffset = $(card).position();
	                }
	            }, this);
	        } else if (this.refs.placeholder != null) {
	            // Otherwise, go to the position that the placeholder is at
	            finalOffset = $(ReactDOM.findDOMNode(this.refs.placeholder)).position();
	        }

	        if (finalOffset == null) {
	            // If we didn't find a card to go to, simply make the changes we
	            // would have made at the end. (should only happen if we are
	            // messing around with card contents, and not on the real site)
	            onAnimationEnd();
	        } else {
	            this.setState({
	                offsetPos: offset,
	                animateTo: finalOffset,
	                onAnimationEnd: onAnimationEnd,
	                animating: true,
	                dragging: false
	            });
	        }
	    },

	    onMouseMove: function onMouseMove(loc) {
	        var draggable = this.refs.dragging;
	        if (draggable == null) {
	            return;
	        }

	        var index;
	        if (this.isCardInBank(draggable)) {
	            index = null;
	        } else {
	            index = this.findCorrectIndex(draggable, this.state.current);
	        }

	        this.setState({
	            mousePos: loc,
	            placeholderIndex: index
	        });
	    },

	    findCorrectIndex: function findCorrectIndex(draggable, list) {
	        // Find the correct index for a card given the current cards.
	        var isHorizontal = this.props.layout === HORIZONTAL,
	            $dragList = $(ReactDOM.findDOMNode(this.refs.dragList)),
	            leftEdge = $dragList.offset().left,
	            topEdge = $dragList.offset().top,
	            midWidth = $(ReactDOM.findDOMNode(draggable)).offset().left - leftEdge,
	            midHeight = $(ReactDOM.findDOMNode(draggable)).offset().top - topEdge,
	            index = 0,
	            sumWidth = 0,
	            sumHeight = 0;

	        if (isHorizontal) {
	            _.each(list, function (opt, i) {
	                var card = ReactDOM.findDOMNode(this.refs["sortable" + i]);
	                var outerWidth = $(card).outerWidth(true);
	                if (midWidth > sumWidth + outerWidth / 2) {
	                    index += 1;
	                }
	                sumWidth += outerWidth;
	            }, this);
	        } else {
	            _.each(list, function (opt, i) {
	                var card = ReactDOM.findDOMNode(this.refs["sortable" + i]);
	                var outerHeight = $(card).outerHeight(true);
	                if (midHeight > sumHeight + outerHeight / 2) {
	                    index += 1;
	                }
	                sumHeight += outerHeight;
	            }, this);
	        }

	        return index;
	    },

	    isCardInBank: function isCardInBank(draggable) {
	        if (draggable == null) {
	            return false;
	        }

	        var isHorizontal = this.props.layout === HORIZONTAL,
	            $draggable = $(ReactDOM.findDOMNode(draggable)),
	            $bank = $(ReactDOM.findDOMNode(this.refs.bank)),
	            draggableOffset = $draggable.offset(),
	            bankOffset = $bank.offset(),
	            draggableHeight = $draggable.outerHeight(true),
	            bankHeight = $bank.outerHeight(true),
	            bankWidth = $bank.outerWidth(true),
	            dragList = ReactDOM.findDOMNode(this.refs.dragList),
	            dragListWidth = $(dragList).width(),
	            draggableWidth = $draggable.outerWidth(true);

	        if (isHorizontal) {
	            return draggableOffset.top + draggableHeight / 2 < bankOffset.top + bankHeight;
	        } else {
	            return draggableOffset.left + draggableWidth / 2 < bankOffset.left + bankWidth;
	        }
	    },

	    getUserInput: function getUserInput() {
	        return { current: _.map(this.props.current, function (v) {
	                return v.content;
	            }) };
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Orderer.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Orderer, {
	    validate: function validate(state, rubric) {
	        if (state.current.length === 0) {
	            return {
	                type: "invalid",
	                message: null
	            };
	        }

	        var correct = _.isEqual(state.current, _.pluck(rubric.correctOptions, 'content'));

	        return {
	            type: "points",
	            earned: correct ? 1 : 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "orderer",
	    displayName: "Orderer",
	    widget: Orderer
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, comma-dangle, max-len, no-var, object-curly-spacing, one-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var InfoTip = __webpack_require__(82);
	var TextListEditor = __webpack_require__(65);

	var NORMAL = "normal",
	    AUTO = "auto",
	    HORIZONTAL = "horizontal",
	    VERTICAL = "vertical";

	var OrdererEditor = React.createClass({
	    displayName: "OrdererEditor",

	    propTypes: {
	        correctOptions: React.PropTypes.array,
	        otherOptions: React.PropTypes.array,
	        height: React.PropTypes.oneOf([NORMAL, AUTO]),
	        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
	        onChange: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            correctOptions: [{ content: "$x$" }],
	            otherOptions: [{ content: "$y$" }],
	            height: NORMAL,
	            layout: HORIZONTAL
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "perseus-widget-orderer" },
	            React.createElement(
	                "div",
	                null,
	                ' ',
	                "Correct answer:",
	                ' ',
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Place the cards in the correct order. The same card can be used more than once in the answer but will only be displayed once at the top of a stack of identical cards."
	                    )
	                )
	            ),
	            React.createElement(TextListEditor, {
	                options: _.pluck(this.props.correctOptions, "content"),
	                onChange: this.onOptionsChange.bind(this, "correctOptions"),
	                layout: this.props.layout }),
	            React.createElement(
	                "div",
	                null,
	                ' ',
	                "Other cards:",
	                ' ',
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Create cards that are not part of the answer."
	                    )
	                )
	            ),
	            React.createElement(TextListEditor, {
	                options: _.pluck(this.props.otherOptions, "content"),
	                onChange: this.onOptionsChange.bind(this, "otherOptions"),
	                layout: this.props.layout }),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    ' ',
	                    "Layout:",
	                    ' ',
	                    React.createElement(
	                        "select",
	                        { value: this.props.layout,
	                            onChange: this.onLayoutChange },
	                        React.createElement(
	                            "option",
	                            { value: HORIZONTAL },
	                            "Horizontal"
	                        ),
	                        React.createElement(
	                            "option",
	                            { value: VERTICAL },
	                            "Vertical"
	                        )
	                    )
	                ),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Use the horizontal layout for short text and small images. The vertical layout is best for longer text (e.g. proofs)."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    ' ',
	                    "Height:",
	                    ' ',
	                    React.createElement(
	                        "select",
	                        { value: this.props.height,
	                            onChange: this.onHeightChange },
	                        React.createElement(
	                            "option",
	                            { value: NORMAL },
	                            "Normal"
	                        ),
	                        React.createElement(
	                            "option",
	                            { value: AUTO },
	                            "Automatic"
	                        )
	                    )
	                ),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Use \"Normal\" for text, \"Automatic\" for images."
	                    )
	                )
	            )
	        );
	    },

	    onOptionsChange: function onOptionsChange(whichOptions, options, cb) {
	        var props = {};
	        props[whichOptions] = _.map(options, function (option) {
	            return { content: option };
	        });
	        this.props.onChange(props, cb);
	    },

	    onLayoutChange: function onLayoutChange(e) {
	        this.props.onChange({ layout: e.target.value });
	    },

	    onHeightChange: function onHeightChange(e) {
	        this.props.onChange({ height: e.target.value });
	    },

	    serialize: function serialize() {
	        // We combine the correct answer and the other cards by merging them,
	        // removing duplicates and empty cards, and sorting them into
	        // categories based on their content
	        var options = _.chain(_.pluck(this.props.correctOptions, 'content')).union(_.pluck(this.props.otherOptions, 'content')).uniq().reject(function (content) {
	            return content === "";
	        }).sort().sortBy(function (content) {
	            if (/\d/.test(content)) {
	                return 0;
	            } else if (/^\$?[a-zA-Z]+\$?$/.test(content)) {
	                return 2;
	            } else {
	                return 1;
	            }
	        }).map(function (content) {
	            return { content: content };
	        }).value();

	        return {
	            options: options,
	            correctOptions: this.props.correctOptions,
	            otherOptions: this.props.otherOptions,
	            height: this.props.height,
	            layout: this.props.layout
	        };
	    }
	});

	module.exports = OrdererEditor;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-undef, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-infix-ops */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);

	var Renderer = __webpack_require__(30);
	var PassageMarkdown = __webpack_require__(210);

	var Passage = React.createClass({
	    displayName: "Passage",

	    mixins: [Changeable],

	    propTypes: {
	        passageTitle: React.PropTypes.string,
	        passageText: React.PropTypes.string,
	        footnotes: React.PropTypes.string,
	        showLineNumbers: React.PropTypes.bool
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            passageTitle: "",
	            passageText: "",
	            footnotes: "",
	            showLineNumbers: true
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            nLines: null,
	            startLineNumbersAfter: 0
	        };
	    },

	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
	    },

	    render: function render() {
	        var _this = this;

	        var lineNumbers;
	        var nLines = this.state.nLines;
	        if (this.props.showLineNumbers && nLines) {
	            // lineN is the line number in the current passage;
	            // the displayed line number is
	            // lineN + this.state.startLineNumbersAfter, where
	            // startLineNumbersAfter is the sum of all line numbers
	            // in earlier passages.
	            lineNumbers = _.range(1, nLines + 1).map(function (lineN) {
	                if (lineN === 4 && nLines > 4) {
	                    return React.createElement(
	                        "span",
	                        {
	                            key: "line-marker",
	                            className: "line-marker" },
	                        "Line"
	                    );
	                } else {
	                    return lineN + _this.state.startLineNumbersAfter;
	                }
	            });
	        }

	        var rawContent = this.props.passageText;
	        var parseState = {};
	        var parsedContent = PassageMarkdown.parse(rawContent, parseState);

	        return React.createElement(
	            "div",
	            { className: "perseus-widget-passage-container" },
	            this._renderInstructions(parseState),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-passage" },
	                React.createElement(
	                    "div",
	                    { className: "passage-title" },
	                    React.createElement(Renderer, { content: this.props.passageTitle })
	                ),
	                lineNumbers && React.createElement(
	                    "div",
	                    { className: "line-numbers", "aria-hidden": true },
	                    lineNumbers
	                ),
	                React.createElement(
	                    "h3",
	                    { className: "perseus-sr-only" },
	                    i18n._("Beginning of reading passage.")
	                ),
	                React.createElement(
	                    "div",
	                    { className: "passage-text" },
	                    this._renderContent(parsedContent)
	                ),
	                this._hasFootnotes() && [React.createElement(
	                    "h4",
	                    { key: "footnote-start", className: "perseus-sr-only" },
	                    i18n._("Beginning of reading passage footnotes.")
	                ), React.createElement(
	                    "div",
	                    { key: "footnotes", className: "footnotes" },
	                    this._renderFootnotes()
	                )],
	                React.createElement(
	                    "div",
	                    { className: "perseus-sr-only" },
	                    i18n._("End of reading passage.")
	                )
	            )
	        );
	    },

	    componentDidMount: function componentDidMount() {
	        this._updateState();
	    },

	    componentDidUpdate: function componentDidUpdate() {
	        this._updateState();
	    },

	    _updateState: function _updateState() {
	        this.setState({
	            nLines: this._measureLines(),
	            startLineNumbersAfter: this._getInitialLineNumber()
	        });
	    },

	    _measureLines: function _measureLines() {
	        var $renderer = $(ReactDOM.findDOMNode(this.refs.content));
	        var contentsHeight = $renderer.height();
	        var lineHeight = parseInt($renderer.css("line-height"));
	        var nLines = Math.round(contentsHeight / lineHeight);
	        return nLines;
	    },

	    _getInitialLineNumber: function _getInitialLineNumber() {
	        var _this2 = this;

	        var isPassageBeforeThisPassage = true;
	        var passagesBeforeUs = this.props.interWidgets(function (id, widgetInfo) {
	            if (widgetInfo.type !== "passage") {
	                return false;
	            }
	            if (id === _this2.props.widgetId) {
	                isPassageBeforeThisPassage = false;
	            }
	            return isPassageBeforeThisPassage;
	        });

	        return passagesBeforeUs.map(function (passageWidget) {
	            return passageWidget.getLineCount();
	        }).reduce(function (a, b) {
	            return a + b;
	        }, 0);
	    },

	    getLineCount: function getLineCount() {
	        if (this.state.nLines != null) {
	            return this.state.nLines;
	        } else {
	            return this._measureLines();
	        }
	    },

	    _renderInstructions: function _renderInstructions(parseState) {
	        var firstQuestionNumber = parseState.firstQuestionRef;
	        var firstSentenceRef = parseState.firstSentenceRef;

	        var instructions = "";
	        if (firstQuestionNumber) {
	            instructions += i18n._("The symbol %(questionSymbol)s indicates that question " + "%(questionNumber)s references this portion of the passage.", {
	                questionSymbol: "[[" + firstQuestionNumber + "]]",
	                questionNumber: firstQuestionNumber
	            });
	        }
	        if (firstSentenceRef) {
	            instructions += i18n._(" The symbol %(sentenceSymbol)s indicates that the " + "following sentence is referenced in a question.", {
	                sentenceSymbol: "[" + firstSentenceRef + "]"
	            });
	        }
	        var parsedInstructions = PassageMarkdown.parse(instructions);
	        return React.createElement(
	            "div",
	            { className: "perseus-widget-passage-instructions" },
	            PassageMarkdown.output(parsedInstructions)
	        );
	    },

	    _renderContent: function _renderContent(parsed) {
	        return React.createElement(
	            "div",
	            { ref: "content" },
	            PassageMarkdown.output(parsed)
	        );
	    },

	    _hasFootnotes: function _hasFootnotes() {
	        var rawContent = this.props.footnotes;
	        var isEmpty = /^\s*$/.test(rawContent);
	        return !isEmpty;
	    },

	    _renderFootnotes: function _renderFootnotes() {
	        var rawContent = this.props.footnotes;
	        var parsed = PassageMarkdown.parse(rawContent);
	        return PassageMarkdown.output(parsed);
	    },

	    _getStartRefLineNumber: function _getStartRefLineNumber(referenceNumber) {
	        var refRef = PassageMarkdown.START_REF_PREFIX + referenceNumber;
	        var ref = this.refs[refRef];
	        if (!ref) {
	            return null;
	        }

	        var $ref = $(ReactDOM.findDOMNode(ref));
	        // We really care about the first text after the ref, not the
	        // ref element itself:
	        var $refText = $ref.next();
	        if ($refText.length === 0) {
	            // But if there are no elements after the ref, just
	            // use the ref itself.
	            $refText = $ref;
	        }
	        var vPos = $refText.offset().top;

	        return this.state.startLineNumbersAfter + 1 + this._convertPosToLineNumber(vPos);
	    },

	    _getEndRefLineNumber: function _getEndRefLineNumber(referenceNumber) {
	        var refRef = PassageMarkdown.END_REF_PREFIX + referenceNumber;
	        var ref = this.refs[refRef];
	        if (!ref) {
	            return null;
	        }

	        var $ref = $(ReactDOM.findDOMNode(ref));
	        // We really care about the last text before the ref, not the
	        // ref element itself:
	        var $refText = $ref.prev();
	        if ($refText.length === 0) {
	            // But if there are no elements before the ref, just
	            // use the ref itself.
	            $refText = $ref;
	        }
	        var height = $refText.height();
	        var vPos = $refText.offset().top;

	        var line = this._convertPosToLineNumber(vPos + height);
	        if (height === 0) {
	            // If the element before the end ref span was the start
	            // ref span, it might have 0 height. This is obviously not
	            // the intended use case, but we should handle it gracefully.
	            // If this is the case, then the "bottom" of our element is
	            // actually the top of the line we're on, so we need to add
	            // one to the line number.
	            line += 1;
	        }

	        return this.state.startLineNumbersAfter + line;
	    },

	    _convertPosToLineNumber: function _convertPosToLineNumber(absoluteVPos) {
	        var $content = $(ReactDOM.findDOMNode(this.refs.content));
	        var relativeVPos = absoluteVPos - $content.offset().top;
	        var lineHeight = parseInt($content.css("line-height"));

	        var line = Math.round(relativeVPos / lineHeight);
	        return line;
	    },

	    _getRefContent: function _getRefContent(referenceNumber) {
	        var refRef = PassageMarkdown.START_REF_PREFIX + referenceNumber;
	        var ref = this.refs[refRef];
	        if (!ref) {
	            return null;
	        }
	        return ref.getRefContent();
	    },

	    getReference: function getReference(referenceNumber) {
	        var refStartLine = this._getStartRefLineNumber(referenceNumber);
	        var refEndLine = this._getEndRefLineNumber(referenceNumber);
	        if (refStartLine == null || refEndLine == null) {
	            return null;
	        }
	        var refContent = this._getRefContent(referenceNumber);

	        return {
	            startLine: refStartLine,
	            endLine: refEndLine,
	            content: refContent
	        };
	    },

	    getUserInput: function getUserInput() {
	        return null;
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Passage.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Passage, {
	    validate: function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "passage",
	    displayName: "Passage",
	    widget: Passage,
	    transform: function transform(editorProps) {
	        return _.pick(editorProps, "passageTitle", "passageText", "footnotes", "showLineNumbers");
	    }
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var Editor = __webpack_require__(13);
	var InfoTip = __webpack_require__(82);
	var PropCheckBox = __webpack_require__(47);

	var PassageEditor = React.createClass({
	    displayName: "PassageEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        passageTitle: React.PropTypes.string,
	        passageText: React.PropTypes.string,
	        footnotes: React.PropTypes.string,
	        showLineNumbers: React.PropTypes.bool
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            passageTitle: "",
	            passageText: "",
	            footnotes: "",
	            showLineNumbers: true
	        };
	    },

	    render: function render() {
	        var _this = this;

	        var passageEditor = React.createElement(Editor, {
	            ref: "passage-editor",
	            apiOptions: this.props.apiOptions,
	            enabledFeatures: this.props.enabledFeatures,
	            content: this.props.passageText,
	            widgetEnabled: false,
	            placeholder: "Type passage here...",
	            onChange: function onChange(newProps) {
	                _this.change({ passageText: newProps.content });
	            },
	            showWordCount: true
	        });
	        var footnotesEditor = React.createElement(Editor, {
	            ref: "passage-footnotes-editor",
	            apiOptions: this.props.apiOptions,
	            enabledFeatures: this.props.enabledFeatures,
	            content: this.props.footnotes,
	            widgetEnabled: false,
	            placeholder: "Type footnotes here...",
	            onChange: function onChange(newProps) {
	                _this.change({ footnotes: newProps.content });
	            }
	        });
	        return React.createElement(
	            "div",
	            { className: "perseus-widget-passage-editor" },
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(PropCheckBox, {
	                    label: "Show line numbers",
	                    labelAlignment: "right",
	                    showLineNumbers: this.props.showLineNumbers,
	                    onChange: this.props.onChange })
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Passage title:",
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "An optional title that will appear directly above the passage in the same font style. (E.g. Passage 1)"
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement("input", {
	                        type: "text",
	                        defaultValue: this.props.passageTitle,
	                        onChange: function onChange(e) {
	                            _this.change({ passageTitle: e.target.value });
	                        } })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Passage Text:",
	                passageEditor
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Footnotes:",
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "To add footnotes, add ^ characters where they belong in the passage. Then, add ^ in the footnotes area to reference the footnotes in the passage."
	                    )
	                ),
	                footnotesEditor
	            )
	        );
	    }
	});

	module.exports = PassageEditor;

/***/ },
/* 129 */,
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, react/jsx-closing-bracket-location, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var InfoTip = __webpack_require__(82);
	var NumberInput = __webpack_require__(175);
	var TextInput = __webpack_require__(176);

	var PassageRefEditor = React.createClass({
	    displayName: "PassageRefEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        passageNumber: React.PropTypes.number,
	        referenceNumber: React.PropTypes.number,
	        summaryText: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            passageNumber: 1,
	            referenceNumber: 1,
	            summaryText: ""
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Passage Number: ",
	                    React.createElement(NumberInput, {
	                        value: this.props.passageNumber,
	                        onChange: this.change("passageNumber") })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Reference Number: ",
	                    React.createElement(NumberInput, {
	                        value: this.props.referenceNumber,
	                        onChange: this.change("referenceNumber") })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Summary Text: ",
	                    React.createElement(TextInput, {
	                        value: this.props.summaryText,
	                        onChange: this.change("summaryText") }),
	                    React.createElement(
	                        InfoTip,
	                        null,
	                        React.createElement(
	                            "p",
	                            null,
	                            "Short summary of the referenced section. This will be included in parentheses and quotes automatically."
	                        ),
	                        React.createElement(
	                            "p",
	                            null,
	                            "Ex: The start ... the end"
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = PassageRefEditor;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var WidgetJsonifyDeprecated = __webpack_require__(183);
	var Renderer = __webpack_require__(30);

	var PassageRefTarget = React.createClass({
	    displayName: "PassageRefTarget",

	    mixins: [WidgetJsonifyDeprecated, Changeable],

	    propTypes: {
	        content: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            content: ""
	        };
	    },

	    render: function render() {
	        return React.createElement(Renderer, {
	            content: this.props.content,
	            inline: true,
	            enabledFeatures: this.props.enabledFeatures,
	            apiOptions: this.props.apiOptions
	        });
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return PassageRefTarget.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(PassageRefTarget, {
	    validate: function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "passage-ref-target",
	    displayName: "PassageRefTarget",
	    defaultAlignment: "inline",
	    widget: PassageRefTarget,
	    hidden: true,
	    transform: function transform(editorProps) {
	        return _.pick(editorProps, "content");
	    },
	    version: { major: 0, minor: 0 }
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, react/jsx-closing-bracket-location, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var PassageRefTargetEditor = React.createClass({
	    displayName: "PassageRefTargetEditor",

	    mixins: [EditorJsonify, Changeable],

	    propTypes: {
	        content: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            content: ""
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            "Content:",
	            React.createElement("input", { type: "text",
	                value: this.props.content,
	                onChange: this.handleContentChange })
	        );
	    },

	    handleContentChange: function handleContentChange(e) {
	        this.change({ content: e.target.value });
	    }
	});

	module.exports = PassageRefTargetEditor;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, indent, no-redeclare, no-unused-vars, no-var, object-curly-spacing, one-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp, space-before-function-paren */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var ApiClassNames = __webpack_require__(7).ClassNames;

	var deepEq = __webpack_require__(8).deepEq;
	var KhanMath = __webpack_require__(85);
	var KhanColors = __webpack_require__(189);
	var GraphUtils = __webpack_require__(165);

	var BAR = "bar",
	    LINE = "line",
	    PIC = "pic",
	    HISTOGRAM = "histogram",
	    DOTPLOT = "dotplot";

	var DOT_PLOT_POINT_SIZE = 4;
	var DOT_PLOT_POINT_PADDING = 8;

	var widgetPropTypes = {
	    type: React.PropTypes.oneOf([BAR, LINE, PIC, HISTOGRAM, DOTPLOT]),
	    labels: React.PropTypes.arrayOf(React.PropTypes.string),
	    categories: React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])),

	    scaleY: React.PropTypes.number,
	    maxY: React.PropTypes.number,
	    snapsPerLine: React.PropTypes.number,

	    picSize: React.PropTypes.number,
	    pixBoxHeight: React.PropTypes.number,
	    picUrl: React.PropTypes.string,

	    plotDimensions: React.PropTypes.arrayOf(React.PropTypes.number),
	    labelInterval: React.PropTypes.number,
	    starting: React.PropTypes.arrayOf(React.PropTypes.number),
	    static: React.PropTypes.bool
	};

	var Plotter = React.createClass({
	    displayName: "Plotter",

	    propTypes: {
	        onChange: React.PropTypes.func.isRequired,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            type: BAR,
	            labels: ["", ""],
	            categories: [""],

	            scaleY: 1,
	            maxY: 10,
	            snapsPerLine: 2,

	            picSize: 40,
	            picBoxHeight: 48,
	            picUrl: "",

	            plotDimensions: [380, 300],
	            labelInterval: 1
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            values: this.props.starting || [1]
	        };
	    },

	    render: function render() {
	        return React.createElement("div", {
	            className: "perseus-widget-plotter graphie " + ApiClassNames.INTERACTIVE,
	            ref: "graphieDiv" });
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	        if (this.shouldSetupGraphie) {
	            this.setupGraphie(prevState);
	        }
	    },

	    componentDidMount: function componentDidMount() {
	        this.setupGraphie(this.state);
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var props = ["type", "labels", "categories", "scaleY", "maxY", "snapsPerLine", "picUrl", "labelInterval", "static"];

	        this.shouldSetupGraphie = _.any(props, function (prop) {
	            return !_.isEqual(this.props[prop], nextProps[prop]);
	        }, this);

	        if (!_.isEqual(this.props.starting, nextProps.starting) && !_.isEqual(this.state.values, nextProps.starting)) {
	            this.shouldSetupGraphie = true;
	            this.setState({ values: nextProps.starting });
	        }
	    },

	    setupGraphie: function setupGraphie(prevState) {
	        var self = this;
	        self.shouldSetupGraphie = false;
	        var graphieDiv = ReactDOM.findDOMNode(self.refs.graphieDiv);
	        $(graphieDiv).empty();
	        var graphie = GraphUtils.createGraphie(graphieDiv);

	        // TODO(jakesandlund): It's not the react way to hang
	        // something off the component object, but since graphie
	        // is outside React, it makes it easier to do this.
	        self.graphie = graphie;
	        self.graphie.pics = [];

	        var isBar = self.props.type === BAR,
	            isLine = self.props.type === LINE,
	            isPic = self.props.type === PIC,
	            isHistogram = self.props.type === HISTOGRAM,
	            isDotplot = self.props.type === DOTPLOT;

	        var isTiledPlot = isPic || isDotplot;

	        var config = {};
	        var c = config; // c for short

	        c.graph = {
	            lines: [],
	            bars: [],
	            points: [],
	            dividers: []
	        };
	        c.scaleY = self.props.scaleY;
	        c.dimX = self.props.categories.length;
	        var plotDimensions = self.props.plotDimensions;
	        if (isLine) {
	            c.dimX += 1;
	        } else if (isHistogram) {
	            c.barPad = 0;
	            c.barWidth = 1;
	        } else if (isBar) {
	            c.barPad = 0.15;
	            c.barWidth = 1 - 2 * c.barPad;
	            c.dimX += 2 * c.barPad;
	        } else if (isTiledPlot) {
	            c.picBoxHeight = self.props.picBoxHeight;
	            c.picBoxWidthPx = plotDimensions[0] / self.props.categories.length;
	            var picPadAllWidth = plotDimensions[0] - c.dimX * c.picBoxWidthPx;
	            c.picPad = picPadAllWidth / (2 * c.dimX + 2);
	            var picFullWidth = c.picBoxWidthPx + 2 * c.picPad;

	            // Convert from px to "unscaled"
	            c.picPad = c.picPad / picFullWidth;
	            c.picBoxWidth = c.picBoxWidthPx / picFullWidth;
	            c.dimX += 2 * c.picPad;
	        }

	        if (isDotplot) {
	            c.picBoxHeight = DOT_PLOT_POINT_SIZE * 2 + DOT_PLOT_POINT_PADDING;
	        }

	        c.dimY = Math.ceil(self.props.maxY / c.scaleY) * c.scaleY;
	        c.scale = _.map([c.dimX, c.dimY], function (dim, i) {
	            return plotDimensions[i] / dim;
	        });
	        if (isTiledPlot) {
	            c.scale[1] = c.picBoxHeight / c.scaleY;
	        }

	        var padX = 25 / c.scale[0];
	        var padY = 25 / c.scale[1];

	        // Since dotplot doesn't have an axis along the left it looks weird
	        // with the same padding as the others
	        if (isDotplot) {
	            padX /= 2;
	        }

	        graphie.init({
	            range: [[-3 * padX, c.dimX + padX], [-3 * padY, c.dimY + padY]],
	            scale: c.scale
	        });
	        graphie.addMouseLayer({
	            allowScratchpad: true
	        });

	        if (!isTiledPlot) {
	            for (var y = 0; y <= c.dimY; y += c.scaleY) {
	                graphie.label([0, y], KhanMath.roundToApprox(y, 2), "left",
	                /* isTeX */true /* for the \approx symbol */
	                );
	                graphie.style({ stroke: "#000", strokeWidth: 1, opacity: 0.3 }, function () {
	                    graphie.line([0, y], [c.dimX, y]);
	                });
	            }
	        }

	        self.setupCategories(config);

	        if (isTiledPlot) {
	            self.drawPicHeights(self.state.values, prevState.values);
	        }

	        graphie.style({ stroke: "#000", strokeWidth: 2, opacity: 1.0 }, function () {
	            if (isDotplot) {
	                graphie.line([0.5, 0], [c.dimX - 0.5, 0]);
	            } else {
	                graphie.line([0, 0], [c.dimX, 0]);
	                graphie.line([0, 0], [0, c.dimY]);
	            }
	        });

	        graphie.label([c.dimX / 2, -35 / c.scale[1]], self.props.labels[0], "below", false).css("font-weight", "bold");

	        graphie.label([-60 / c.scale[0], c.dimY / 2], self.props.labels[1], "center", false).css("font-weight", "bold").addClass("rotate");
	    },

	    labelCategory: function labelCategory(x, category) {
	        var graphie = this.graphie;
	        category = category + "";
	        var isTeX = false;
	        var mathyCategory = category.match(/^\$(.*)\$$/);
	        if (mathyCategory) {
	            category = mathyCategory[1];
	            isTeX = true;
	        }
	        graphie.label([x, 0], category, "below", isTeX);
	    },

	    setupCategories: function setupCategories(config) {
	        var self = this;
	        var c = config;
	        var graphie = self.graphie;

	        if (self.props.type === HISTOGRAM) {
	            // Histograms with n labels/categories have n - 1 buckets
	            _.times(self.props.categories.length - 1, function (i) {
	                self.setupBar({
	                    index: i,
	                    startHeight: self.state.values[i],
	                    config: config,
	                    isHistogram: true
	                });
	            });

	            // Label categories
	            _.each(self.props.categories, function (category, i) {
	                var x = 0.5 + i * c.barWidth;

	                self.labelCategory(x, category);
	                var tickHeight = 6 / c.scale[1];
	                graphie.style({
	                    stroke: "#000", strokeWidth: 2, opacity: 1.0
	                }, function () {
	                    graphie.line([x, -tickHeight], [x, 0]);
	                });
	            });
	        } else {
	            _.each(self.props.categories, function (category, i) {
	                var startHeight = self.state.values[i];
	                var x;

	                if (self.props.type === BAR) {
	                    x = self.setupBar({
	                        index: i,
	                        startHeight: startHeight,
	                        config: config,
	                        isHistogram: false
	                    });
	                } else if (self.props.type === LINE) {
	                    x = self.setupLine(i, startHeight, config);
	                } else if (self.props.type === PIC) {
	                    x = self.setupPic(i, config);
	                } else if (self.props.type === DOTPLOT) {
	                    x = self.setupDotplot(i, config);
	                }

	                var tickStart = 0;
	                var tickEnd = -6 / c.scale[1];

	                if (self.props.type === DOTPLOT) {
	                    tickStart = -tickEnd;
	                }

	                if (self.props.type === DOTPLOT) {
	                    // Dotplot lets you specify to only show labels every 'n'
	                    // ticks. It also looks nicer if it makes the labelled
	                    // ticks a bit bigger.
	                    if (i % self.props.labelInterval === 0 || i === self.props.categories.length - 1) {
	                        self.labelCategory(x, category);
	                        tickStart *= 1.5;
	                        tickEnd *= 1.5;
	                    }
	                } else {
	                    self.labelCategory(x, category);
	                }

	                graphie.style({
	                    stroke: "#000", strokeWidth: 2, opacity: 1.0
	                }, function () {
	                    graphie.line([x, tickStart], [x, tickEnd]);
	                });
	            });
	        }
	    },

	    setupBar: function setupBar(args) {
	        var i = args.index;
	        var startHeight = args.startHeight;
	        var config = args.config;
	        var isHistogram = args.isHistogram;

	        var self = this;
	        var graphie = self.graphie;
	        var barHalfWidth = config.barWidth / 2;
	        var x;
	        if (isHistogram) {
	            x = 0.5 + i * config.barWidth + barHalfWidth;
	        } else {
	            x = 0.5 + i + config.barPad;
	        }

	        var scaleBar = function scaleBar(i, height) {
	            var center = graphie.scalePoint(0);

	            // Scale filled bucket (bar)
	            config.graph.bars[i].scale(1, Math.max(0.01, height / config.scaleY), center[0], center[1]);

	            if (isHistogram) {
	                // Scale dividers between buckets
	                var leftDivider = config.graph.dividers[i - 1],
	                    rightDivider = config.graph.dividers[i];

	                if (leftDivider) {
	                    var divHeight = Math.min(self.state.values[i - 1], height);
	                    leftDivider.scale(1, Math.max(0.01, divHeight / config.scaleY), center[0], center[1]);
	                }

	                if (rightDivider) {
	                    var divHeight = Math.min(self.state.values[i + 1], height);
	                    rightDivider.scale(1, Math.max(0.01, divHeight / config.scaleY), center[0], center[1]);
	                }
	            }
	        };

	        graphie.style({
	            stroke: "none", fill: KhanColors.LIGHT_BLUE, opacity: 1.0
	        }, function () {
	            config.graph.bars[i] = graphie.path([[x - barHalfWidth, 0], [x - barHalfWidth, config.scaleY], [x + barHalfWidth, config.scaleY], [x + barHalfWidth, 0], [x - barHalfWidth, 0]]);
	        });

	        if (isHistogram) {
	            if (i > 0) {
	                // Don't draw a divider to the left of the first bucket
	                graphie.style({
	                    stroke: "#000", strokeWidth: 1, opacity: 0.3
	                }, function () {
	                    config.graph.dividers.push(graphie.path([[x - barHalfWidth, 0], [x - barHalfWidth, config.scaleY]]));
	                });
	            }
	        }

	        config.graph.lines[i] = graphie.addMovableLineSegment({
	            coordA: [x - barHalfWidth, startHeight],
	            coordZ: [x + barHalfWidth, startHeight],
	            snapY: config.scaleY / self.props.snapsPerLine,
	            constraints: {
	                constrainX: true
	            },
	            normalStyle: {
	                "stroke": KhanColors.INTERACTIVE,
	                // Don't display graph handles in static mode
	                "stroke-width": this.props.static ? 0 : 4
	            }
	        });

	        config.graph.lines[i].onMove = function (dx, dy) {
	            var y = this.coordA[1];
	            if (y < 0 || y > config.dimY) {
	                y = Math.min(Math.max(y, 0), config.dimY);
	                this.coordA[1] = this.coordZ[1] = y;

	                // Snap the line back into range.
	                this.transform();
	            }

	            var values = _.clone(self.state.values);
	            values[i] = y;
	            self.setState({ values: values });
	            self.changeAndTrack({ values: values });

	            scaleBar(i, y);
	        };

	        scaleBar(i, startHeight);
	        return x;
	    },

	    setupLine: function setupLine(i, startHeight, config) {
	        var self = this;
	        var c = config;
	        var graphie = self.graphie;
	        var x = i + 1;
	        c.graph.points[i] = graphie.addMovablePoint({
	            coord: [x, startHeight],
	            constraints: {
	                constrainX: true
	            },
	            normalStyle: {
	                fill: KhanColors.INTERACTIVE,
	                stroke: KhanColors.INTERACTIVE
	            },
	            snapY: c.scaleY / self.props.snapsPerLine
	        });
	        c.graph.points[i].onMove = function (x, y) {
	            y = Math.min(Math.max(y, 0), c.dimY);
	            var values = _.clone(self.state.values);
	            values[i] = y;
	            self.setState({ values: values });
	            self.changeAndTrack({ values: values });
	            return [x, y];
	        };
	        if (i > 0) {
	            c.graph.lines[i] = graphie.addMovableLineSegment({
	                pointA: c.graph.points[i - 1],
	                pointZ: c.graph.points[i],
	                constraints: {
	                    fixed: true
	                },
	                normalStyle: {
	                    stroke: "#9ab8ed",
	                    "stroke-width": 2
	                }
	            });
	        }
	        return x;
	    },

	    setupDotplot: function setupDotplot(i, config) {
	        var graphie = this.graphie;
	        return this.setupTiledPlot(i, 1, config, function (x, y) {
	            return graphie.ellipse([x, y], [DOT_PLOT_POINT_SIZE / graphie.scale[0], DOT_PLOT_POINT_SIZE / graphie.scale[1]], {
	                fill: KhanColors.INTERACTIVE,
	                stroke: KhanColors.INTERACTIVE
	            });
	        });
	    },

	    setupPic: function setupPic(i, config) {
	        var _this = this;

	        var graphie = this.graphie;
	        return this.setupTiledPlot(i, 0, config, function (x, y) {
	            var scaledCenter = graphie.scalePoint([x, y]);
	            var size = _this.props.picSize;
	            return graphie.raphael.image(_this.props.picUrl, scaledCenter[0] - size / 2, scaledCenter[1] - size / 2, size, size);
	        });
	    },

	    setupTiledPlot: function setupTiledPlot(i, bottomMargin, config, createImage) {
	        var self = this;
	        var c = config;
	        var graphie = self.graphie;
	        var pics = graphie.pics;
	        var x = i + 0.5 + c.picPad;

	        pics[i] = [];
	        var n = Math.round(c.dimY / c.scaleY) + 1;
	        _(n).times(function (j) {
	            j -= 1;
	            var midY = (j + 0.5) * c.scaleY;
	            var leftX = x - c.picBoxWidth / 2;
	            var topY = midY + 0.5 * c.scaleY;
	            var coord = graphie.scalePoint([leftX, topY + bottomMargin]);
	            var mouseRect = graphie.mouselayer.rect(coord[0], coord[1], c.picBoxWidthPx, c.picBoxHeight);
	            $(mouseRect[0]).css({ fill: "#000", opacity: 0.0, cursor: "pointer" }).on("vmousedown", function (e) {
	                e.preventDefault();
	                self.whichPicClicked = i;
	                self.setPicHeight(i, topY);

	                $(document).on("vmouseup.plotTile", function (e) {
	                    $(document).unbind(".plotTile");
	                });

	                $(document).on("vmousemove.plotTile", function (e) {
	                    e.preventDefault();

	                    // Reverse-engineer the initial calculation
	                    var yCoord = graphie.getMouseCoord(e)[1];
	                    var adjustedCoord = Math.floor(yCoord - bottomMargin);

	                    // Calculate top coord from j value, but don't let them
	                    // go below j = -1, which is equivalent to having '0'
	                    // on the dot plot (due to weird indexing).
	                    var newJ = Math.max(-1, Math.floor(adjustedCoord / c.scaleY));
	                    var newMidY = (newJ + 0.5) * c.scaleY;
	                    var newTopY = newMidY + 0.5 * c.scaleY;
	                    self.setPicHeight(self.whichPicClicked, newTopY);
	                });
	            });

	            if (j < 0) {
	                // Don't show a pic underneath the axis!
	                return;
	            }
	            pics[i][j] = createImage(x, midY + bottomMargin);
	        });
	        return x;
	    },

	    setPicHeight: function setPicHeight(i, y) {
	        var values = _.clone(this.state.values);
	        values[i] = y;
	        this.drawPicHeights(values, this.state.values);
	        this.setState({ values: values });
	        this.changeAndTrack({ values: values });
	    },

	    changeAndTrack: function changeAndTrack(data) {
	        this.props.onChange(data);
	        this.props.trackInteraction();
	    },

	    drawPicHeights: function drawPicHeights(values, prevValues) {
	        var self = this;
	        var graphie = self.graphie;
	        var pics = graphie.pics;
	        _.each(pics, function (ps, i) {
	            _.each(ps, function (pic, j) {
	                var y = (j + 1) * self.props.scaleY;
	                var show = y <= values[i];
	                if (self.props.type === DOTPLOT) {
	                    var wasShown = y <= prevValues[i];
	                    var wasJustShown = show && !wasShown;
	                    if (wasJustShown) {
	                        pic.animate({
	                            "stroke-width": 8
	                        }, 75, function () {
	                            return pic.animate({
	                                "stroke-width": 2
	                            }, 75);
	                        });
	                    }
	                }
	                $(pic[0]).css({ display: show ? "inline" : "none" });
	            });
	        });
	    },

	    getUserInput: function getUserInput() {
	        return this.state.values;
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Plotter.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Plotter, {
	    validate: function validate(guess, rubric) {
	        if (deepEq(guess, rubric.starting)) {
	            return {
	                type: "invalid",
	                message: null
	            };
	        } else {
	            return {
	                type: "points",
	                earned: deepEq(guess, rubric.correct) ? 1 : 0,
	                total: 1,
	                message: null
	            };
	        }
	    }
	});

	// We don't need to change any of the original props for static mode
	var staticTransform = _.identity;

	module.exports = {
	    name: "plotter",
	    displayName: "Plotter",
	    widget: Plotter,
	    staticTransform: staticTransform
	};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, max-len, no-var, one-var, react/jsx-closing-bracket-location, react/sort-comp, space-before-function-paren */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var BlurInput = __webpack_require__(171);
	var InfoTip = __webpack_require__(82);
	var NumberInput = __webpack_require__(175);
	var RangeInput = __webpack_require__(190);
	var SvgImage = __webpack_require__(32);
	var TextListEditor = __webpack_require__(65);

	var Plotter = __webpack_require__(133).widget;

	var knumber = __webpack_require__(197).knumber;

	var BAR = "bar",
	    LINE = "line",
	    PIC = "pic",
	    HISTOGRAM = "histogram",
	    DOTPLOT = "dotplot";

	// Return a copy of array with length n, padded with given value
	function padArray(array, n, value) {
	    var copy = _.clone(array);
	    copy.length = n;
	    for (var i = array.length; i < n; i++) {
	        copy[i] = value;
	    }
	    return copy;
	}

	var editorDefaults = {
	    scaleY: 1,
	    maxY: 10,
	    snapsPerLine: 2
	};

	var widgetPropTypes = {
	    type: React.PropTypes.oneOf([BAR, LINE, PIC, HISTOGRAM, DOTPLOT]),
	    labels: React.PropTypes.arrayOf(React.PropTypes.string),
	    categories: React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])),

	    scaleY: React.PropTypes.number,
	    maxY: React.PropTypes.number,
	    snapsPerLine: React.PropTypes.number,

	    picSize: React.PropTypes.number,
	    pixBoxHeight: React.PropTypes.number,
	    picUrl: React.PropTypes.string,

	    plotDimensions: React.PropTypes.arrayOf(React.PropTypes.number),
	    labelInterval: React.PropTypes.number,
	    starting: React.PropTypes.arrayOf(React.PropTypes.number),
	    static: React.PropTypes.bool
	};

	var formatNumber = function formatNumber(num) {
	    return "$" + knumber.round(num, 2) + "$";
	};

	var PlotterEditor = React.createClass({
	    displayName: "PlotterEditor",

	    propTypes: widgetPropTypes,

	    getDefaultProps: function getDefaultProps() {
	        return _.extend({}, editorDefaults, {
	            correct: [1],
	            starting: [1],

	            type: BAR,
	            labels: ["", ""],
	            categories: [""],

	            picSize: 30,
	            picBoxHeight: 36,
	            picUrl: Khan.imageBase + "badges/earth-small.png",

	            plotDimensions: [275, 200],
	            labelInterval: 1
	        });
	    },

	    getInitialState: function getInitialState() {
	        return {
	            editing: "correct",
	            pic: null,
	            loadedUrl: null,
	            minX: null,
	            maxX: null,
	            tickStep: null
	        };
	    },

	    componentWillMount: function componentWillMount() {
	        this.fetchPic(this.props.picUrl);
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.fetchPic(nextProps.picUrl);
	    },

	    fetchPic: function fetchPic(url) {
	        var _this = this;

	        if (this.state.loadedUrl !== url) {
	            var pic = new Image();
	            pic.src = url;
	            pic.onload = function () {
	                _this.setState({
	                    pic: pic,
	                    loadedUrl: url
	                });
	            };
	        }
	    },

	    render: function render() {
	        var setFromScale = _.contains([LINE, HISTOGRAM, DOTPLOT], this.props.type);
	        var canChangeSnaps = !_.contains([PIC, DOTPLOT], this.props.type);
	        var props = _extends({
	            trackInteraction: function trackInteraction() {}
	        }, this.props);

	        return React.createElement(
	            "div",
	            { className: "perseus-widget-plotter-editor" },
	            React.createElement(
	                "div",
	                null,
	                "Chart type:",
	                ' ',
	                _.map([BAR, LINE, PIC, HISTOGRAM, DOTPLOT], function (type) {
	                    return React.createElement(
	                        "label",
	                        { key: type },
	                        React.createElement("input", {
	                            type: "radio",
	                            name: "chart-type",
	                            checked: this.props.type === type,
	                            onChange: _.partial(this.changeType, type) }),
	                        type
	                    );
	                }, this)
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Labels:",
	                ' ',
	                _.map(["x", "y"], function (axis, i) {
	                    return React.createElement(
	                        "label",
	                        { key: axis },
	                        axis + ":",
	                        React.createElement("input", {
	                            type: "text",
	                            onChange: _.partial(this.changeLabel, i),
	                            defaultValue: this.props.labels[i] })
	                    );
	                }, this)
	            ),
	            setFromScale && React.createElement(
	                "div",
	                { className: "set-from-scale-box" },
	                React.createElement(
	                    "span",
	                    { className: "categories-title" },
	                    "Set Categories From Scale"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "label",
	                        null,
	                        "Tick Step:",
	                        ' ',
	                        React.createElement(NumberInput, {
	                            placeholder: 1,
	                            useArrowKeys: true,
	                            value: this.state.tickStep,
	                            onChange: this.handleChangeTickStep })
	                    ),
	                    React.createElement(
	                        InfoTip,
	                        null,
	                        React.createElement(
	                            "p",
	                            null,
	                            "The difference between adjacent ticks."
	                        )
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "label",
	                        null,
	                        "Range:",
	                        ' ',
	                        React.createElement(RangeInput, {
	                            placeholder: [0, 10],
	                            useArrowKeys: true,
	                            value: [this.state.minX, this.state.maxX],
	                            onChange: this.handleChangeRange })
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "button",
	                        { onClick: this.setCategoriesFromScale },
	                        "Set Categories",
	                        ' '
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Label Interval:",
	                    ' ',
	                    React.createElement(NumberInput, {
	                        useArrowKeys: true,
	                        value: this.props.labelInterval,
	                        onChange: this.changeLabelInterval })
	                ),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Which ticks to display the labels for. For instance, setting this to \"4\" will only show every 4th label (plus the last one)"
	                    )
	                )
	            ),
	            this.props.type === PIC && React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Picture:",
	                    ' ',
	                    React.createElement(BlurInput, {
	                        className: "pic-url",
	                        value: this.props.picUrl,
	                        onChange: this.changePicUrl }),
	                    React.createElement(
	                        InfoTip,
	                        null,
	                        React.createElement(
	                            "p",
	                            null,
	                            "Use the default picture of Earth, or insert the URL for a different picture using the \"Add image\" function."
	                        )
	                    )
	                ),
	                this.state.pic && this.state.pic.width !== this.state.pic.height && React.createElement(
	                    "p",
	                    { className: "warning" },
	                    React.createElement(
	                        "b",
	                        null,
	                        "Warning"
	                    ),
	                    ": You are using a picture which is not square.  This means the image will get distorted. You should probably crop it to be square."
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Categories:",
	                    ' ',
	                    React.createElement(TextListEditor, {
	                        ref: "categories",
	                        layout: "horizontal",
	                        options: this.props.categories,
	                        onChange: this.changeCategories })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Scale (y):",
	                    ' ',
	                    React.createElement("input", {
	                        type: "text",
	                        onChange: this.changeScale,
	                        defaultValue: this.props.scaleY })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Max y:",
	                    ' ',
	                    React.createElement("input", {
	                        type: "text",
	                        ref: "maxY",
	                        onChange: this.changeMax,
	                        defaultValue: this.props.maxY })
	                )
	            ),
	            canChangeSnaps && React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Snaps per line:",
	                    ' ',
	                    React.createElement("input", {
	                        type: "text",
	                        onChange: this.changeSnaps,
	                        defaultValue: this.props.snapsPerLine })
	                ),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Creates the specified number of divisions between the horizontal lines. Fewer snaps between lines makes the graph easier for the student to create correctly."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Editing values:",
	                ' ',
	                _.map(["correct", "starting"], function (editing) {
	                    return React.createElement(
	                        "label",
	                        { key: editing },
	                        React.createElement("input", {
	                            type: "radio",
	                            name: "editing",
	                            checked: this.state.editing === editing,
	                            onChange: _.partial(this.changeEditing, editing) }),
	                        editing
	                    );
	                }, this),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Use this toggle to switch between editing the correct answer (what the student will be graded on) and the starting values (what the student will see plotted when they start the problem). Note: These cannot be the same."
	                    ),
	                    React.createElement(
	                        "p",
	                        null,
	                        "In static mode, the starting values are rendered out to the displayed widget."
	                    )
	                )
	            ),
	            React.createElement(Plotter, _extends({}, props, {
	                starting: this.props[this.state.editing],
	                onChange: this.handlePlotterChange }))
	        );
	    },

	    handleChangeTickStep: function handleChangeTickStep(value) {
	        this.setState({
	            tickStep: value
	        });
	    },

	    handleChangeRange: function handleChangeRange(newValue) {
	        this.setState({
	            minX: newValue[0],
	            maxX: newValue[1]
	        });
	    },

	    changeLabelInterval: function changeLabelInterval(value) {
	        this.props.onChange({
	            labelInterval: value
	        });
	    },

	    handlePlotterChange: function handlePlotterChange(newProps) {
	        var props = {};
	        props[this.state.editing] = newProps.values;
	        this.props.onChange(props);
	    },

	    changeType: function changeType(type) {
	        var categories;
	        if (type === HISTOGRAM) {
	            // Switching to histogram, add a label (0) to the left
	            categories = [formatNumber(0)].concat(this.props.categories);
	            this.props.onChange({ type: type, categories: categories });
	        } else if (this.props.type === HISTOGRAM) {
	            // Switching from histogram, remove a label from the left
	            categories = this.props.categories.slice(1);
	            this.props.onChange({ type: type, categories: categories });
	        } else {
	            this.props.onChange({ type: type });
	        }

	        if (categories) {
	            ReactDOM.findDOMNode(this.refs.categories).value = categories.join(", ");
	        }
	    },

	    changeLabel: function changeLabel(i, e) {
	        var labels = _.clone(this.props.labels);
	        labels[i] = e.target.value;
	        this.props.onChange({ labels: labels });
	    },

	    changePicUrl: function changePicUrl(value) {
	        // We don't need the labels and other data in the plotter, so just
	        // extract the raw image and use that.
	        // TODO(emily): Maybe indicate that such a change has happened?
	        var url = SvgImage.getRealImageUrl(value);

	        this.props.onChange({ picUrl: url });
	    },

	    changeCategories: function changeCategories(categories) {
	        var n = categories.length;
	        if (this.props.type === HISTOGRAM) {
	            // Histograms with n labels/categories have n - 1 buckets
	            n--;
	        }
	        var value = this.props.scaleY;

	        this.props.onChange({
	            categories: categories,
	            correct: padArray(this.props.correct, n, value),
	            starting: padArray(this.props.starting, n, value)
	        });
	    },

	    changeScale: function changeScale(e) {
	        var oldScale = this.props.scaleY;
	        var newScale = +e.target.value || editorDefaults.scaleY;

	        var scale = function scale(value) {
	            return value * newScale / oldScale;
	        };

	        var maxY = scale(this.props.maxY);

	        this.props.onChange({
	            scaleY: newScale,
	            maxY: maxY,
	            correct: _.map(this.props.correct, scale),
	            starting: _.map(this.props.starting, scale)
	        });

	        ReactDOM.findDOMNode(this.refs.maxY).value = maxY;
	    },

	    changeMax: function changeMax(e) {
	        this.props.onChange({
	            maxY: +e.target.value || editorDefaults.maxY
	        });
	    },

	    changeSnaps: function changeSnaps(e) {
	        this.props.onChange({
	            snapsPerLine: +e.target.value || editorDefaults.snapsPerLine
	        });
	    },

	    changeEditing: function changeEditing(editing) {
	        this.setState({ editing: editing });
	    },

	    setCategoriesFromScale: function setCategoriesFromScale() {
	        var scale = this.state.tickStep || 1;
	        var min = this.state.minX || 0;
	        var max = this.state.maxX || 0;
	        var length = Math.floor((max - min) / scale) * scale;

	        var categories;
	        if (this.props.type === HISTOGRAM || this.props.type === DOTPLOT) {
	            // Ranges for histogram and dotplot labels should start at zero
	            categories = _.range(0, length + scale, scale);
	        } else {
	            categories = _.range(scale, length + scale, scale);
	        }

	        categories = _.map(categories, function (num) {
	            return num + min;
	        });
	        categories = _.map(categories, formatNumber);

	        this.changeCategories(categories);

	        ReactDOM.findDOMNode(this.refs.categories).value = categories.join(", ");
	    },

	    serialize: function serialize() {
	        var json = _.pick(this.props, "correct", "starting", "type", "labels", "categories", "scaleY", "maxY", "snapsPerLine", "labelInterval");

	        if (this.props.type === PIC) {
	            json.picUrl = this.props.picUrl;
	        }

	        return json;
	    }
	});

	module.exports = PlotterEditor;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(19);

	var Molecule = __webpack_require__(121).molecule;

	var Separator = React.createClass({
	    displayName: "Separator",

	    propTypes: {
	        // TODO(colin): figure out and add shape.
	        data: React.PropTypes.any,
	        index: React.PropTypes.number
	    },

	    componentDidMount: function componentDidMount() {
	        this.drawArrow();
	    },

	    componentDidUpdate: function componentDidUpdate() {
	        this.drawArrow();
	    },

	    arrowLength: 100,

	    drawArrow: function drawArrow() {
	        var canvas = this.refs["arrowCanvas" + this.props.index];
	        var ctx = canvas.getContext("2d");
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        var path = new Path2D();
	        ctx.strokeStyle = "rgb(0,0,0)";
	        ctx.lineWidth = 1.2;
	        ctx.lineCap = "round";
	        var offset = 5;
	        path.moveTo(offset, canvas.height / 2);
	        path.lineTo(canvas.width - offset, canvas.height / 2);
	        path.moveTo(canvas.width - 2 * offset, canvas.height / 2 - offset);
	        path.lineTo(canvas.width - offset, canvas.height / 2);
	        path.moveTo(canvas.width - 2 * offset, canvas.height / 2 + offset);
	        path.lineTo(canvas.width - offset, canvas.height / 2);
	        ctx.stroke(path);
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "arrow-container" },
	            React.createElement(
	                "div",
	                { className: "above-text" },
	                this.props.data.topText
	            ),
	            React.createElement(
	                "canvas",
	                {
	                    height: "30",
	                    id: "arrowCanvas" + this.props.index,
	                    ref: "arrowCanvas" + this.props.index,
	                    width: this.arrowLength
	                },
	                "Reaction arrow pointing to the right."
	            ),
	            React.createElement(
	                "div",
	                { className: "below-text" },
	                this.props.data.bottomText
	            )
	        );
	    }
	});

	var ReactionDiagramWidget = React.createClass({
	    displayName: "ReactionDiagramWidget",

	    propTypes: {
	        // TODO(colin): at the moment, these must be arrays of two elements;
	        // we're limited to a single reaction step.  At some point, add support
	        // for more steps in the reaction.
	        rotationAngle: React.PropTypes.arrayOf(React.PropTypes.number),
	        separators: React.PropTypes.arrayOf(React.PropTypes.object),
	        smiles: React.PropTypes.arrayOf(React.PropTypes.string),
	        widgetId: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return { smiles: [], rotationAngle: [], separators: [] };
	    },

	    simpleValidate: function simpleValidate() {
	        return { type: "points", earned: 0, total: 0, message: null };
	    },

	    getUserInput: function getUserInput() {
	        return [];
	    },

	    validate: function validate(state, rubric) {
	        // TODO(colin): this appears to be part of the perseus interface.
	        // Figure out if there's a more appropriate value to return.
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    },

	    focus: function focus() {
	        return true;
	    },

	    render: function render() {
	        var _this = this;

	        return React.createElement(
	            "div",
	            { className: "reaction", ref: "reaction" },
	            this.props.smiles.map(function (s, i) {
	                var id = _this.props.widgetId + "-" + i;
	                return React.createElement(
	                    "div",
	                    { key: id, className: "molecule-container" },
	                    React.createElement(Molecule, {
	                        id: id,
	                        rotationAngle: _this.props.rotationAngle[i],
	                        smiles: s
	                    }),
	                    i === _this.props.smiles.length - 1 ? null : React.createElement(Separator, {
	                        data: _this.props.separators[i],
	                        index: i
	                    })
	                );
	            })
	        );
	    }
	});

	module.exports = {
	    name: "reaction-diagram",
	    displayName: "Chemical reaction",
	    hidden: false,
	    widget: ReactionDiagramWidget
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, no-var */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var NumberInput = __webpack_require__(175);
	var TextInput = __webpack_require__(176);

	var ReactionDiagramWidgetEditor = React.createClass({
	    displayName: "ReactionDiagramWidgetEditor",

	    propTypes: {
	        rotationAngle: React.PropTypes.arrayOf(React.PropTypes.number),
	        separators: React.PropTypes.arrayOf(React.PropTypes.object),
	        smiles: React.PropTypes.arrayOf(React.PropTypes.string)
	    },

	    mixins: [Changeable, EditorJsonify],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            smiles: ["", ""],
	            rotationAngle: [0, 0],
	            separators: [{ type: "right", topText: "", bottomText: "" }]
	        };
	    },

	    updateMolecule: function updateMolecule(idx) {
	        return function (newValue) {
	            var newSmiles = [].concat(this.props.smiles);
	            newSmiles[idx] = newValue;
	            this.change({ smiles: newSmiles });
	        }.bind(this);
	    },

	    updateRotation: function updateRotation(idx) {
	        return function (newValue) {
	            var newRot = [].concat(this.props.rotationAngle);
	            newRot[idx] = newValue;
	            this.change({ rotationAngle: newRot });
	        }.bind(this);
	    },

	    updateSeparators: function updateSeparators(idx, propName) {
	        var _this = this;

	        return function (newValue) {
	            var newSep = _this.props.separators.map(function (sep) {
	                return _extends({}, sep);
	            });
	            newSep[idx][propName] = newValue;
	            _this.change({ separators: newSep });
	        };
	    },

	    render: function render() {
	        // TODO(colin): use styling instead of &nbsp hacks.
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "LHS SMILES: ",
	                    React.createElement(TextInput, {
	                        onChange: this.updateMolecule(0),
	                        value: this.props.smiles[0]
	                    })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "LHS Rotation (deg): ",
	                    React.createElement(NumberInput, {
	                        onChange: this.updateRotation(0),
	                        value: this.props.rotationAngle[0]
	                    })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "RHS SMILES: ",
	                    React.createElement(TextInput, {
	                        onChange: this.updateMolecule(1),
	                        value: this.props.smiles[1]
	                    })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "RHS Rotation (deg): ",
	                    React.createElement(NumberInput, {
	                        onChange: this.updateRotation(1),
	                        value: this.props.rotationAngle[1]
	                    })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Top of arrow text: ",
	                    React.createElement(TextInput, {
	                        onChange: this.updateSeparators(0, "topText"),
	                        value: this.props.separators[0].topText
	                    })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    "Bottom of arrow text: ",
	                    React.createElement(TextInput, {
	                        onChange: this.updateSeparators(0, "bottomText"),
	                        value: this.props.separators[0].bottomText
	                    })
	                )
	            )
	        );
	    }

	});

	module.exports = ReactionDiagramWidgetEditor;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var ApiOptions = __webpack_require__(7).Options;
	var Changeable = __webpack_require__(172);

	var _require = __webpack_require__(39);

	var iconOk = _require.iconOk;

	var InlineIcon = __webpack_require__(40);
	var Renderer = __webpack_require__(30);
	var Util = __webpack_require__(8);

	var Sequence = React.createClass({
	    displayName: "Sequence",

	    mixins: [Changeable],

	    propTypes: {
	        apiOptions: ApiOptions.propTypes,
	        json: React.PropTypes.arrayOf(React.PropTypes.shape({
	            content: React.PropTypes.string,
	            images: React.PropTypes.object,
	            widgets: React.PropTypes.object
	        })),
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            json: [{
	                content: "",
	                widgets: {},
	                images: {}
	            }]
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            visible: 1
	        };
	    },

	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        return nextProps !== this.props || nextState !== this.state;
	    },

	    render: function render() {
	        var _this = this;

	        var icon = React.createElement(InlineIcon, _extends({}, iconOk, { style: { color: "green" } }));

	        var content = _.chain(this.props.json).first(this.state.visible).map(function (step, i) {
	            return "[[" + Util.snowman + " group " + i + "]]";
	        }).join("\n\n").value();

	        var widgets = {};
	        _.each(this.props.json, function (step, i) {
	            var widgetId = "group " + i;
	            widgets[widgetId] = {
	                type: "group",
	                graded: true,
	                version: { major: 0, minor: 0 },
	                options: _.extend({}, step, {
	                    icon: i < _this.state.visible - 1 ? icon : null
	                })
	            };
	        });

	        return React.createElement(
	            "div",
	            { className: "perseus-sequence" },
	            React.createElement(Renderer, {
	                ref: "renderer",
	                content: content,
	                widgets: widgets,
	                onInteractWithWidget: this._handleInteraction,
	                apiOptions: this.props.apiOptions,
	                enabledFeatures: this.props.enabledFeatures })
	        );
	    },

	    _handleInteraction: function _handleInteraction(groupWidgetId) {
	        var step = parseInt(groupWidgetId.split(" ")[1]);
	        if (step === this.state.visible - 1) {
	            var widget = this.refs.renderer.getWidgetInstance("group " + step);
	            var score = widget.simpleValidate();

	            if (score.type === "points" && score.total === score.earned) {
	                this.setState({
	                    visible: this.state.visible + 1
	                });
	                this.props.trackInteraction({
	                    visible: this.state.visible + 1
	                });
	            }
	        }
	    }
	});

	var traverseChildWidgets = function traverseChildWidgets(props, traverseRenderer) {

	    var oldJson = props.json;
	    if (!_.isArray(oldJson)) {
	        oldJson = [oldJson];
	    }
	    var json = _.map(oldJson, function (rendererOptions) {
	        return traverseRenderer(rendererOptions);
	    });

	    return _.extend({}, props, { json: json });
	};

	module.exports = {
	    name: "sequence",
	    displayName: "Graded Sequence",
	    widget: Sequence,
	    traverseChildWidgets: traverseChildWidgets,
	    tracking: "all"
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-alert, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-infix-ops */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var ApiOptions = __webpack_require__(7).Options;
	var Editor = __webpack_require__(13);

	var _require = __webpack_require__(39);

	var iconCircleArrowDown = _require.iconCircleArrowDown;
	var iconCircleArrowUp = _require.iconCircleArrowUp;
	var iconPlus = _require.iconPlus;
	var iconTrash = _require.iconTrash;

	var InlineIcon = __webpack_require__(40);

	var StepControlButton = React.createClass({
	    displayName: "StepControlButton",

	    render: function render() {
	        var _this = this;

	        return React.createElement(
	            "a",
	            {
	                href: "#",
	                className: "step-control-button " + "simple-button " + "simple-button--small " + "orange",
	                onClick: function onClick(e) {
	                    e.preventDefault();
	                    _this.props.onClick();
	                } },
	            React.createElement(InlineIcon, this.props.icon)
	        );
	    }
	});

	var SequenceEditor = React.createClass({
	    displayName: "SequenceEditor",

	    propTypes: {
	        json: React.PropTypes.arrayOf(React.PropTypes.shape({
	            content: React.PropTypes.string,
	            widgets: React.PropTypes.object,
	            images: React.PropTypes.object
	        })),
	        apiOptions: ApiOptions.propTypes,
	        onChange: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            json: [{
	                content: "",
	                widgets: {},
	                images: {}
	            }]
	        };
	    },

	    render: function render() {
	        var _this2 = this;

	        return React.createElement(
	            "div",
	            { className: "perseus-sequence-editor" },
	            _.map(this.props.json, function (json, i) {
	                return React.createElement(
	                    "div",
	                    { key: i },
	                    "Step ",
	                    i + 1,
	                    React.createElement(
	                        "div",
	                        { style: {
	                                display: "inline-block",
	                                float: "right"
	                            } },
	                        i + 1 < _this2.props.json.length && React.createElement(StepControlButton, {
	                            icon: iconCircleArrowDown,
	                            onClick: function onClick() {
	                                _this2._handleMoveStepLater(i);
	                            } }),
	                        i > 0 && React.createElement(StepControlButton, {
	                            icon: iconCircleArrowUp,
	                            onClick: function onClick() {
	                                _this2._handleMoveStepEarlier(i);
	                            } }),
	                        React.createElement(StepControlButton, {
	                            icon: iconTrash,
	                            onClick: function onClick() {
	                                var msg = "Are you sure you " + "want to remove step " + (i + 1) + "?";
	                                if (confirm(msg)) {
	                                    _this2._handleRemoveStep(i);
	                                }
	                            } }),
	                        React.createElement(StepControlButton, {
	                            icon: iconPlus,
	                            onClick: function onClick() {
	                                _this2._handleAddStepAfter(i);
	                            } })
	                    ),
	                    React.createElement(Editor, {
	                        ref: "editor" + i,
	                        apiOptions: _this2.props.apiOptions,
	                        enabledFeatures: _this2.props.enabledFeatures,
	                        content: json.content,
	                        widgets: json.widgets,
	                        images: json.images,
	                        widgetEnabled: true,
	                        immutableWidgets: false,
	                        onChange: _.partial(_this2._handleEditorChange, i) })
	                );
	            })
	        );
	    },

	    _handleEditorChange: function _handleEditorChange(i, newProps) {
	        var steps = _.clone(this.props.json);
	        steps[i] = _.extend({}, steps[i], newProps);
	        this.props.onChange({ json: steps });
	    },

	    serialize: function serialize() {
	        var _this3 = this;

	        return {
	            json: _.times(this.props.json.length, function (i) {
	                return _this3.refs["editor" + i].serialize();
	            })
	        };
	    },

	    _handleMoveStepEarlier: function _handleMoveStepEarlier(i) {
	        if (i === 0) {
	            return;
	        }
	        var steps = _.clone(this.props.json);
	        var step = steps[i];
	        steps.splice(i, 1);
	        steps.splice(i - 1, 0, step);
	        this.props.onChange({
	            json: steps
	        });
	    },

	    _handleMoveStepLater: function _handleMoveStepLater(i) {
	        var steps = _.clone(this.props.json);
	        if (i + 1 === steps.length) {
	            return;
	        }
	        var step = steps[i];
	        steps.splice(i, 1);
	        steps.splice(i + 1, 0, step);
	        this.props.onChange({
	            json: steps
	        });
	    },

	    _handleAddStepAfter: function _handleAddStepAfter(i) {
	        // We do a full serialization here because we
	        // might be copying widgets:
	        var steps = _.clone(this.props.json);
	        // Here we do magic to allow you to copy-paste
	        // things from the previous section into the new
	        // section while preserving widgets.
	        // To enable this, we preserve the widgets
	        // object for the new section, but wipe out
	        // the content.
	        var newStep = i >= 0 ? {
	            widgets: steps[i].widgets
	        } : {};
	        steps.splice(i + 1, 0, newStep);
	        this.props.onChange({
	            json: steps
	        });
	    },

	    _handleRemoveStep: function _handleRemoveStep(i) {
	        var steps = _.clone(this.props.json);
	        steps.splice(i, 1);
	        this.props.onChange({
	            json: steps
	        });
	    }
	});

	module.exports = SequenceEditor;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, indent, no-unused-vars, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-unary-ops */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/* globals $_, i18n */
	var InfoTip = __webpack_require__(82);
	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);

	var ApiOptions = __webpack_require__(7).Options;
	var assert = __webpack_require__(164).assert;

	var Graphie = __webpack_require__(67);
	var Path = Graphie.Path;
	var Arc = Graphie.Arc;
	var Circle = Graphie.Circle;
	var Label = Graphie.Label;
	var Line = Graphie.Line;
	var MovablePoint = Graphie.MovablePoint;
	var MovableLine = Graphie.MovableLine;

	var NumberInput = __webpack_require__(175);
	var MathOutput = __webpack_require__(193);
	var seededRNG = __webpack_require__(8).seededRNG;
	var Util = __webpack_require__(8);
	var knumber = __webpack_require__(197).number;
	var KhanColors = __webpack_require__(189);
	var KhanMath = __webpack_require__(85);

	var defaultBoxSize = 400;
	var maxSampleSize = 1000;
	var maxTrials = 5000;

	var Histogram = React.createClass({
	    displayName: "Histogram",

	    propTypes: {
	        data: React.PropTypes.arrayOf(React.PropTypes.number),
	        xAxisLabel: React.PropTypes.string,
	        yAxisLabel: React.PropTypes.string,
	        box: React.PropTypes.arrayOf(React.PropTypes.number)
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            data: null,
	            xAxisLabel: "Proportion (%)",
	            yAxisLabel: "Number of times seen",
	            box: [defaultBoxSize, defaultBoxSize]
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            threshold: this._getInitialThreshold(this._range())
	        };
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        // Reset the threshold if the range has changed
	        var oldRange = this._range();
	        var nextRange = this._range(nextProps);
	        if (!Util.deepEq(oldRange, nextRange)) {
	            this.setState({
	                threshold: this._getInitialThreshold(nextRange)
	            });
	        }
	    },

	    /* Renders the vertical line that users can drag across the histogram. */
	    _renderThresholdLine: function _renderThresholdLine() {
	        var _this = this;

	        // Recall the the y-range goes from [-1, yMax] to allow for ticks on
	        // the x-axis.
	        var yRange = [0, this._range()[1][1]];
	        var coords = _.map(yRange, function (y) {
	            return [_this.state.threshold, y];
	        });

	        // Returns an inivisble, placeholder coord that anchors the line
	        var invisiblePointForCoord = function invisiblePointForCoord(coord, i) {
	            return React.createElement(MovablePoint, {
	                key: i,
	                "static": true,
	                coord: coord,
	                normalStyle: { stroke: "none", fill: "none" } });
	        };

	        return React.createElement(
	            MovableLine,
	            { onMove: this.handleMouseInteraction },
	            _.map(coords, invisiblePointForCoord)
	        );
	    },

	    /* Renders the shaded circle in the top right. */
	    _renderCircle: function _renderCircle() {
	        var _this2 = this;

	        var data = this.props.data;

	        // Get proportion of results below threshold
	        var total = _.reduce(data, function (sum, next) {
	            return sum + next;
	        }, 0);
	        var numBelow = _.reduce(data, function (sum, next, i) {
	            if (_this2.state.threshold != null && i <= _this2.state.threshold) {
	                return sum + next;
	            } else {
	                return sum;
	            }
	        }, 0);
	        var proportionBelow = numBelow / total;

	        // This is a hack around the arc taking angles modulo 360.
	        // TODO(charlie): Find a better way around this.
	        var epsilon = 1e-5;
	        var radius = 20;
	        var center = [this.props.box[0] - 1.5 * radius, 1.5 * radius];

	        // Plot little circle
	        var plotBelowCircle = function plotBelowCircle() {
	            var options = {
	                key: "below",
	                center: center,
	                radius: radius,
	                startAngle: 0,
	                endAngle: proportionBelow < 1 ? 360 * proportionBelow : 360 - epsilon,
	                sector: proportionBelow !== 1,
	                unscaled: true,
	                style: {
	                    fill: KhanColors.LIGHT_RED,
	                    stroke: KhanColors.RED
	                }
	            };

	            return React.createElement(Arc, options);
	        };
	        var plotAboveCircle = function plotAboveCircle() {
	            var options = {
	                key: "above",
	                center: center,
	                radius: radius,
	                startAngle: proportionBelow > 0 ? 360 * proportionBelow : epsilon,
	                endAngle: 360,
	                sector: proportionBelow !== 0,
	                unscaled: true,
	                style: {
	                    fill: KhanColors.LIGHT_BLUE,
	                    stroke: KhanColors.BLUE
	                }
	            };

	            return React.createElement(Arc, options);
	        };

	        // Plot the label below the circle
	        var xRange = this._range()[0];
	        var formattedThreshold = Math.min(Math.max(this.state.threshold, xRange[0]), xRange[1]).toFixed(2);
	        var plotLabel = function plotLabel() {
	            var options = {
	                key: "label",
	                coord: [center[0], center[1] + 1.5 * radius],
	                text: numBelow + " of " + total + " results below " + formattedThreshold + "%",
	                direction: "center",
	                tex: false,
	                unscaled: true,
	                style: {
	                    fontSize: "12px"
	                }
	            };
	            return React.createElement(Label, options);
	        };

	        return [proportionBelow > 0 && plotBelowCircle(), proportionBelow < 1 && plotAboveCircle(), plotLabel()];
	    },

	    /* Renders the actual bars of the histogram. */
	    _renderData: function _renderData() {
	        var _this3 = this;

	        var data = this.props.data;
	        var range = this._range();

	        // Plot bars
	        var barWidth = 1;
	        var pathForData = function pathForData(count, i) {
	            // Avoid plotting bars of height 0, else you get a thick blue line
	            // over the x-axis. We don't filter these out of the data passed in
	            // to this function, however, to preserve absolute indices.
	            if (!count) {
	                return;
	            }

	            var isBelow = _this3.state.threshold != null && i <= _this3.state.threshold;
	            var style = {
	                fill: isBelow ? KhanColors.LIGHT_RED : KhanColors.LIGHT_BLUE,
	                stroke: isBelow ? KhanColors.RED : KhanColors.BLUE
	            };
	            var coords = [[i, 0], [i, count], [i + barWidth, count], [i + barWidth, 0]];
	            return React.createElement(Path, { key: i, coords: coords, style: style });
	        };

	        return _.map(data, pathForData);
	    },

	    render: function render() {
	        var data = this.props.data;
	        var range = this._range();

	        var options = {
	            xAxisLabel: this.props.xAxisLabel,
	            yAxisLabel: this.props.yAxisLabel,
	            box: this.props.box,
	            range: range,
	            data: data,
	            scale: [Util.scaleFromExtent(range[0], this.props.box[0]), Util.scaleFromExtent(range[1], this.props.box[1])]
	        };

	        var axisStyle = {
	            stroke: "#000",
	            strokeWidth: 1,
	            opacity: 1.0
	        };
	        var origin = [range[0][0], 0];
	        var bottomRight = [range[0][1], 0];

	        return React.createElement(
	            Graphie,
	            { box: options.box,
	                range: options.range,
	                options: options,
	                setup: this._setupGraphie,
	                onMouseMove: this.handleMouseInteraction,
	                onMouseDown: this.handleMouseInteraction },
	            React.createElement(Line, { start: origin, end: bottomRight, style: axisStyle }),
	            data && this._renderData(),
	            data && this._renderCircle(),
	            data && this._renderThresholdLine()
	        );
	    },

	    _setupGraphie: function _setupGraphie(graphie, options) {
	        var data = options.data;
	        var range = options.range;
	        var scale = options.scale;

	        /* Plot the bars that run parallel to the x-axis. */
	        var xWidth = range[0][1] - range[0][0];
	        var yWidth = range[1][1] - 0;

	        var maxYAxisEntities = 20;
	        var ySkip = Math.ceil(yWidth / maxYAxisEntities);
	        _.each(_.range(0, range[1][1], ySkip), function (y) {

	            // If there's no data, we don't label the axes
	            if (data) {
	                graphie.label([range[0][0], y], KhanMath.roundToApprox(y, 2), "left",
	                /* isTeX */true /* for the \approx symbol */
	                );
	            }

	            graphie.line([range[0][0], y], [range[0][1], y], {
	                stroke: "#000",
	                strokeWidth: 1,
	                opacity: 0.3
	            });
	        });

	        // If there's no data, we don't label the x-axis at all
	        if (data) {
	            // Plot the labels below the bars
	            var maxXAxisEntities = 15;
	            var xSkip = Math.ceil(xWidth / maxXAxisEntities);
	            _.each(_.range(range[0][0], range[0][1], xSkip), function (x) {
	                graphie.label([x, 0], knumber.round(x, 2), "below", true);

	                var tickHeight = 8;
	                graphie.line([x, 0], [x, -tickHeight / scale[1]], {
	                    stroke: "#000",
	                    strokeWidth: 1
	                });
	            });
	        }

	        // Add y axis (x axis is added later to overlap the bars)
	        var axisStyle = {
	            stroke: "#000",
	            strokeWidth: 2,
	            opacity: 1.0
	        };
	        var origin = [range[0][0], 0];
	        var topLeft = [range[0][0], range[1][1]];
	        graphie.line(origin, topLeft, axisStyle);

	        // Add axis labels
	        var xMid = range[0][0] + xWidth / 2;
	        var xOffset = data ? 25 : 0;
	        graphie.label([xMid, -xOffset / scale[1]], options.xAxisLabel, "below", false).css("font-weight", "bold");

	        var yMid = 0 + yWidth / 2;
	        var yOffset = data ? 55 : 28;
	        graphie.label([range[0][0] - yOffset / scale[0], yMid], options.yAxisLabel, "center", false).css("font-weight", "bold").css("-webkit-transform", "rotate(-90deg)");
	    },

	    handleMouseInteraction: function handleMouseInteraction(point) {
	        this.setState({
	            threshold: point[0]
	        });
	    },

	    /* Convenience functions that help calculate props based on other props. */
	    _range: function _range(props) {
	        var defaultRange = [[0, 100], [-1, 10]];
	        props = props || this.props;
	        return props.data ? this._getRangeForData(props.data) : defaultRange;
	    },

	    _getRangeForData: function _getRangeForData(data) {
	        // Find first/last non-zero entry and add some padding
	        var padding = 10;
	        var firstIndex = _.indexOf(data, _.find(data, function (n) {
	            return n > 0;
	        }));
	        var xMin = Math.max(0, firstIndex - padding);
	        var lastIndex = _.lastIndexOf(data, _.last(_.filter(data, function (n) {
	            return n > 0;
	        })));
	        var xMax = Math.min(100 + 1, lastIndex + 1 + padding);

	        // The y-axis is bounded above by largest value, and below by 0.
	        // However, the 'range' of the y-axis goes as low as -1 to allow
	        // Graphie to draw ticks on the x-Axis that extend vertically below
	        // y = 0.
	        var yMin = -1;
	        var yMax = _.max(data);

	        return [[xMin, xMax], [yMin, yMax]];
	    },

	    _getInitialThreshold: function _getInitialThreshold(range) {
	        // We pick a pretty-looking threshold, 1/3 of the way along the axis
	        var xRange = range[0];
	        return xRange[0] + (xRange[1] - xRange[0]) / 3;
	    }
	});

	var Simulator = React.createClass({
	    displayName: "Simulator",

	    mixins: [Changeable],

	    propTypes: {
	        apiOptions: ApiOptions.propTypes,
	        data: React.PropTypes.arrayOf(React.PropTypes.number),
	        numTrials: React.PropTypes.number,
	        proportionLabel: React.PropTypes.string,
	        proportionOrPercentage: React.PropTypes.string,
	        randomSeed: React.PropTypes.number,
	        sampleSize: React.PropTypes.number,
	        trackInteraction: React.PropTypes.func.isRequired,
	        userProportion: React.PropTypes.number,
	        xAxisLabel: React.PropTypes.string,
	        yAxisLabel: React.PropTypes.string
	    },

	    getInitialState: function getInitialState() {
	        return {
	            invalidInput: false
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            data: null,
	            userProportion: null,
	            sampleSize: null,
	            numTrials: null,
	            randomSeed: 0,
	            xAxisLabel: "Proportion (%)",
	            yAxisLabel: "Number of times seen",
	            proportionLabel: "Underlying proportion",
	            proportionOrPercentage: "proportion",
	            apiOptions: ApiOptions.defaults
	        };
	    },

	    componentWillMount: function componentWillMount() {
	        if (this.props.randomSeed != null) {
	            this.generateNumber = Util.seededRNG(this.props.randomSeed);
	        }
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if (nextProps.randomSeed !== this.props.randomSeed) {
	            this.generateNumber = Util.seededRNG(nextProps.randomSeed);
	        }
	    },

	    render: function render() {
	        var _this4 = this;

	        var inputStyle = {
	            marginLeft: "5px"
	        };

	        var highlight = "0px 0px 0px 2px rgba(255, 165, 0, 1)";
	        var highlightStyle = _.extend({}, inputStyle, {
	            WebkitBoxShadow: highlight,
	            MozBoxShadow: highlight,
	            boxShadow: highlight,
	            transition: "all 0.15s"
	        });
	        var unhighlightStyle = _.extend({}, inputStyle, {
	            transition: "all 0.15s"
	        });
	        var style = this.state.invalidInput ? highlightStyle : unhighlightStyle;

	        var InputComponent = this.props.apiOptions.staticRender ? MathOutput : NumberInput;

	        var proportionInput = React.createElement(
	            "div",
	            null,
	            React.createElement(InputComponent, {
	                ref: "userProportion",
	                style: style,
	                value: this.calculateDisplayProportion(),
	                checkValidity: this.checkProportionValidity,
	                disabled: this.props.apiOptions.readOnly,
	                onChange: this.handleUserProportionChange,
	                onFocus: function onFocus() {
	                    return _this4.props.onFocus(["userProportion"]);
	                },
	                onBlur: function onBlur() {
	                    return _this4.props.onBlur(["userProportion"]);
	                } }),
	            React.createElement(
	                InfoTip,
	                null,
	                React.createElement(
	                    "p",
	                    null,
	                    "This controls the proportion or percentage that will be used in your simulation."
	                )
	            )
	        );

	        var sampleSizeInput = React.createElement(
	            "div",
	            null,
	            React.createElement(InputComponent, {
	                ref: "sampleSize",
	                style: style,
	                value: this.props.sampleSize,
	                checkValidity: function checkValidity(val) {
	                    return val >= 0;
	                },
	                disabled: this.props.apiOptions.readOnly,
	                onChange: this.handleSampleSizeChange,
	                onFocus: function onFocus() {
	                    return _this4.props.onFocus(["sampleSize"]);
	                },
	                onBlur: function onBlur() {
	                    return _this4.props.onBlur(["sampleSize"]);
	                } }),
	            React.createElement(
	                InfoTip,
	                null,
	                React.createElement(
	                    "p",
	                    null,
	                    "This controls the sample size that will be used in your simulation. For example, if you set this to 100, then for each trial, responses from 100 participants will be simulated."
	                )
	            )
	        );

	        var numTrialsDisplay = React.createElement(
	            "div",
	            { style: { textAlign: "right" } },
	            React.createElement(
	                "b",
	                null,
	                this.props.numTrials
	            ),
	            React.createElement(
	                InfoTip,
	                null,
	                React.createElement(
	                    "p",
	                    null,
	                    "This is the number of trials used in the simulation. For example, if set to 50, then the survey will be conducted 50 times."
	                )
	            )
	        );

	        // Generates a table from a set of titles and values.
	        var generateTable = function generateTable(contents) {
	            var header = React.createElement(
	                "thead",
	                null,
	                React.createElement(
	                    "tr",
	                    null,
	                    React.createElement(
	                        "th",
	                        null,
	                        "Parameter"
	                    ),
	                    React.createElement(
	                        "th",
	                        null,
	                        "Value"
	                    )
	                )
	            );

	            var body = React.createElement(
	                "tbody",
	                null,
	                _.map(contents, function (row, i) {
	                    return React.createElement(
	                        "tr",
	                        { key: i },
	                        React.createElement(
	                            "td",
	                            null,
	                            row.title
	                        ),
	                        React.createElement(
	                            "td",
	                            null,
	                            row.value
	                        )
	                    );
	                })
	            );

	            return React.createElement(
	                "table",
	                null,
	                header,
	                body
	            );
	        };

	        // Contents for the table to-be generated
	        var contents = [{
	            title: this.props.proportionLabel + ":",
	            value: proportionInput
	        }, {
	            title: "Sample size:",
	            value: sampleSizeInput
	        }, {
	            title: "Number of trials:",
	            value: numTrialsDisplay
	        }];

	        // The 'Run Simulation' button
	        var buttonStyle = {
	            margin: "20px 0"
	        };
	        var startButton = React.createElement(
	            "button",
	            {
	                className: "simple-button",
	                style: buttonStyle,
	                disabled: this.props.apiOptions.readOnly,
	                onClick: this.handleRunSimulation },
	            i18n._("Run simulation")
	        );

	        // When we plot data, ticks on the x-axis require some vertical padding
	        var histogramStyle = {
	            paddingBottom: this.props.data ? 40 : 0
	        };
	        var histogram = React.createElement(
	            "div",
	            { style: histogramStyle },
	            React.createElement(Histogram, { data: this.props.data,
	                xAxisLabel: this.props.xAxisLabel,
	                yAxisLabel: this.props.yAxisLabel })
	        );

	        return React.createElement(
	            "div",
	            null,
	            generateTable(contents),
	            startButton,
	            histogram
	        );
	    },

	    calculateDisplayProportion: function calculateDisplayProportion() {
	        var userProportion = this.props.userProportion;

	        // If we want to display as a percentage, multiply proportion by 100.0.
	        if (this.props.proportionOrPercentage === "percentage") {
	            return Math.round(100 * userProportion);
	        } else {
	            return userProportion;
	        }
	    },

	    checkProportionValidity: function checkProportionValidity(value) {
	        return value >= 0.0 && this.props.proportionOrPercentage === "proportion" && value <= 1.0 || this.props.proportionOrPercentage === "percentage" && value <= 100.0;
	    },

	    handleUserProportionChange: function handleUserProportionChange(value, cb) {
	        var userProportion;

	        // If "percentage" mode is enabled, user will have entered value as
	        // a percentage. However, we always store as a proportion, so we cast.
	        if (this.props.proportionOrPercentage === "percentage") {
	            userProportion = value / 100.0;
	        } else {
	            userProportion = value;
	        }

	        // If they entered a number, we may need to cap it
	        if (userProportion != null) {
	            userProportion = Math.min(1.0, Math.max(0.0, userProportion));
	        }
	        this.props.onChange({
	            userProportion: userProportion
	        }, cb);
	    },

	    handleSampleSizeChange: function handleSampleSizeChange(sampleSize, cb) {
	        if (sampleSize != null) {
	            sampleSize = Math.min(maxSampleSize, Math.max(0, Math.floor(sampleSize)));
	        }
	        this.props.onChange({
	            sampleSize: sampleSize
	        }, cb);
	    },

	    handleRunSimulation: function handleRunSimulation() {
	        // If they haven't filled out a parameter field, highlight it.
	        if (this.props.numTrials == null || this.props.userProportion == null || this.props.sampleSize == null) {
	            this.setState({
	                invalidInput: true
	            });
	            return;
	        } else {
	            this.setState({
	                invalidInput: false
	            });
	        }
	        this.props.onChange({
	            data: this.generateData()
	        });
	        this.props.trackInteraction();
	    },

	    generateData: function generateData(props) {
	        var _this5 = this;

	        props = props || this.props;
	        var getSampleDistribution = function getSampleDistribution(sampleSize, numTrials, proportion) {
	            var draw = function draw() {
	                return _this5.generateNumber() < proportion;
	            };
	            var sampleDistribution = _.times(100 + 1, function () {
	                return 0;
	            });
	            _.times(numTrials, function () {
	                var results = _.times(sampleSize, draw);
	                var count = _.filter(results, _.identity).length;
	                var normalizedCount = Math.floor(100 * count / sampleSize);
	                sampleDistribution[normalizedCount]++;
	            });
	            return sampleDistribution;
	        };
	        return getSampleDistribution(props.sampleSize, props.numTrials, props.userProportion);
	    },

	    /* InputPath API */
	    getInputPaths: function getInputPaths() {
	        return [["userProportion"], ["sampleSize"]];
	    },

	    focus: function focus() {
	        var path = _.head(this.getInputPaths());
	        this.focusInputPath(path);
	        return true;
	    },

	    focusInputPath: function focusInputPath(path) {
	        assert(path.length > 0);
	        var inputID = _.head(path);
	        var inputComponent = this.refs[inputID];
	        inputComponent.focus();
	    },

	    blurInputPath: function blurInputPath(path) {
	        assert(path.length > 0);
	        var inputID = _.head(path);
	        var inputComponent = this.refs[inputID];
	        inputComponent.blur();
	    },

	    getDOMNodeForPath: function getDOMNodeForPath(path) {
	        assert(path.length > 0);
	        var inputID = _.head(path);
	        return ReactDOM.findDOMNode(this.refs[inputID]);
	    },

	    getGrammarTypeForPath: function getGrammarTypeForPath(path) {
	        assert(path.length > 0);
	        return "number";
	    },

	    setInputValue: function setInputValue(path, newValue, cb) {
	        assert(path.length > 0);
	        var inputID = _.head(path);
	        var capitalizedID = inputID.charAt(0).toUpperCase() + inputID.slice(1);
	        var functionName = "handle" + capitalizedID + "Change";
	        this[functionName](newValue, cb);
	    },

	    getUserInput: function getUserInput() {
	        return null;
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Simulator.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Simulator, {
	    validate: function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    }
	});

	var propTransform = function propTransform(editorProps) {
	    var widgetProps = _.clone(editorProps);
	    widgetProps.randomSeed = editorProps.problemNum;
	    return widgetProps;
	};

	module.exports = {
	    name: "simulator",
	    displayName: "Simulator",
	    widget: Simulator,
	    transform: propTransform
	};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/* globals i18n */
	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var InfoTip = __webpack_require__(82);
	var NumberInput = __webpack_require__(175);

	var maxTrials = 5000;

	var SimulatorEditor = React.createClass({
	    displayName: "SimulatorEditor",

	    mixins: [Changeable, EditorJsonify],

	    propTypes: {
	        xAxisLabel: React.PropTypes.string,
	        yAxisLabel: React.PropTypes.string,
	        numTrials: React.PropTypes.number,
	        proportionLabel: React.PropTypes.string,
	        proportionOrPercentage: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            xAxisLabel: "Proportion (%)",
	            yAxisLabel: "Number of times seen",
	            numTrials: 100,
	            proportionLabel: "Underlying proportion",
	            proportionOrPercentage: "proportion"
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "perseus-widget-simulator" },
	            React.createElement(
	                "div",
	                null,
	                i18n._("X-Axis Label"),
	                ":",
	                React.createElement("input", {
	                    type: "text",
	                    className: "graph-settings-axis-label",
	                    value: this.props.xAxisLabel,
	                    onChange: _.partial(this.handleTargetValueChange, "xAxisLabel") })
	            ),
	            React.createElement(
	                "div",
	                null,
	                i18n._("Y-Axis Label"),
	                ":",
	                React.createElement("input", {
	                    type: "text",
	                    className: "graph-settings-axis-label",
	                    value: this.props.yAxisLabel,
	                    onChange: _.partial(this.handleTargetValueChange, "yAxisLabel") })
	            ),
	            React.createElement(
	                "div",
	                null,
	                i18n._('"True Proportion" Label'),
	                ":",
	                React.createElement("input", {
	                    type: "text",
	                    className: "graph-settings-axis-label",
	                    value: this.props.proportionLabel,
	                    onChange: _.partial(this.handleTargetValueChange, "proportionLabel") }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "This text will be displayed next to the box in which the user enters the sample proportion for their simulation. For example, if your question is about surveying for approval ratings, you might want this to say \"Sample approval rating\"."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                i18n._("Proportion or Percentage"),
	                ":",
	                React.createElement(
	                    "select",
	                    {
	                        className: "perseus-widget-dropdown",
	                        value: this.props.proportionOrPercentage,
	                        onChange: _.partial(this.handleTargetValueChange, "proportionOrPercentage") },
	                    React.createElement(
	                        "option",
	                        { key: "proportion", value: "proportion" },
	                        "Proportion"
	                    ),
	                    React.createElement(
	                        "option",
	                        { key: "percentage", value: "percentage" },
	                        "Percentage"
	                    )
	                ),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Do you want the user to describe their simulation in terms of a proportion or a percentage?"
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                i18n._("Number of trials"),
	                ":",
	                React.createElement(NumberInput, {
	                    value: this.props.numTrials,
	                    checkValidity: function checkValidity(val) {
	                        return val >= 0 && val <= maxTrials;
	                    },
	                    onChange: this.change("numTrials") }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "This controls the number of trials used in the simulation. For example, if you set this to 50, then the survey will be conducted 50 times. Warning: setting this too high (i.e., greater than 5000 or so) will freeze the page."
	                    )
	                )
	            )
	        );
	    },

	    handleTargetValueChange: function handleTargetValueChange(propName, e) {
	        this.change(propName, e.target.value);
	    }
	});

	module.exports = SimulatorEditor;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, one-var, react/forbid-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Sortable = __webpack_require__(192);

	var ApiOptions = __webpack_require__(7).Options;
	var shuffle = __webpack_require__(8).shuffle;

	var HORIZONTAL = "horizontal",
	    VERTICAL = "vertical";

	var Sorter = React.createClass({
	    displayName: "Sorter",

	    propTypes: {
	        apiOptions: ApiOptions.propTypes,
	        correct: React.PropTypes.array,
	        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
	        onChange: React.PropTypes.func,
	        padding: React.PropTypes.bool,
	        problemNum: React.PropTypes.number,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            correct: [],
	            layout: HORIZONTAL,
	            padding: true,
	            problemNum: 0,
	            onChange: function onChange() {}
	        };
	    },

	    render: function render() {
	        var options = shuffle(this.props.correct, this.props.problemNum,
	        /* ensurePermuted */true);

	        var marginPx = this.props.apiOptions.xomManatee ? 8 : 5;

	        return React.createElement(
	            "div",
	            { className: "perseus-widget-sorter perseus-clearfix" },
	            React.createElement(Sortable, {
	                options: options,
	                layout: this.props.layout,
	                margin: marginPx,
	                padding: this.props.padding,
	                onChange: this.handleChange,
	                ref: "sortable"
	            })
	        );
	    },

	    handleChange: function handleChange(e) {
	        this.props.onChange(e);
	        this.props.trackInteraction();
	    },

	    getUserInput: function getUserInput() {
	        return { options: this.refs.sortable.getOptions() };
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Sorter.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Sorter, {
	    validate: function validate(state, rubric) {
	        var correct = _.isEqual(state.options, rubric.correct);

	        return {
	            type: "points",
	            earned: correct ? 1 : 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "sorter",
	    displayName: "Sorter",
	    widget: Sorter
	};

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var InfoTip = __webpack_require__(82);
	var PropCheckBox = __webpack_require__(47);
	var TextListEditor = __webpack_require__(65);

	var HORIZONTAL = "horizontal";
	var VERTICAL = "vertical";

	var SorterEditor = React.createClass({
	    displayName: "SorterEditor",

	    propTypes: {
	        correct: React.PropTypes.array,
	        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
	        padding: React.PropTypes.bool
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            correct: ["$x$", "$y$", "$z$"],
	            layout: HORIZONTAL,
	            padding: true
	        };
	    },

	    render: function render() {
	        var editor = this;

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                null,
	                ' ',
	                "Correct answer:",
	                ' ',
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Enter the correct answer (in the correct order) here. The preview on the right will have the cards in a randomized order, which is how the student will see them."
	                    )
	                )
	            ),
	            React.createElement(TextListEditor, {
	                options: this.props.correct,
	                onChange: function onChange(options, cb) {
	                    editor.props.onChange({ correct: options }, cb);
	                },
	                layout: this.props.layout }),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    ' ',
	                    "Layout:",
	                    ' ',
	                    React.createElement(
	                        "select",
	                        { value: this.props.layout,
	                            onChange: this.onLayoutChange },
	                        React.createElement(
	                            "option",
	                            { value: HORIZONTAL },
	                            "Horizontal"
	                        ),
	                        React.createElement(
	                            "option",
	                            { value: VERTICAL },
	                            "Vertical"
	                        )
	                    )
	                ),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Use the horizontal layout for short text and small images. The vertical layout is best for longer text and larger images."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(PropCheckBox, {
	                    label: "Padding:",
	                    padding: this.props.padding,
	                    onChange: this.props.onChange }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "Padding is good for text, but not needed for images."
	                    )
	                )
	            )
	        );
	    },

	    onLayoutChange: function onLayoutChange(e) {
	        this.props.onChange({ layout: e.target.value });
	    },

	    serialize: function serialize() {
	        return _.pick(this.props, "correct", "layout", "padding");
	    }
	});

	module.exports = SorterEditor;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-before-function-paren */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var MathOutput = __webpack_require__(193);
	var Renderer = __webpack_require__(30);
	var Util = __webpack_require__(8);

	var ApiOptions = __webpack_require__(7).Options;
	var KhanAnswerTypes = __webpack_require__(45);

	var assert = __webpack_require__(164).assert;

	/* Input handling: Maps a (row, column) pair to a unique ref used by React,
	 * and extracts (row, column) pairs from input paths, used to allow outsiders
	 * to focus, blur, set input values, etc. */
	var getInputPath = function getInputPath(row, column) {
	    return ["" + row, "" + column];
	};

	var getDefaultPath = function getDefaultPath() {
	    return getInputPath(0, 0);
	};

	var getRowFromPath = function getRowFromPath(path) {
	    // 'path' should be a (row, column) pair
	    assert(_.isArray(path) && path.length === 2);
	    return +path[0];
	};

	var getColumnFromPath = function getColumnFromPath(path) {
	    // 'path' should be a (row, column) pair
	    assert(_.isArray(path) && path.length === 2);
	    return +path[1];
	};

	var getRefForPath = function getRefForPath(path) {
	    var row = getRowFromPath(path);
	    var column = getColumnFromPath(path);
	    return "answer" + row + "," + column;
	};

	var Table = React.createClass({
	    displayName: "Table",

	    propTypes: {
	        answers: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)),
	        editableHeaders: React.PropTypes.bool,
	        // The editor to use when editableHeaders is enabled
	        Editor: React.PropTypes.func,
	        headers: React.PropTypes.arrayOf(React.PropTypes.string),
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        var defaultRows = 4;
	        var defaultColumns = 1;
	        var blankAnswers = _(defaultRows).times(function () {
	            return Util.stringArrayOfSize(defaultColumns);
	        });
	        return {
	            apiOptions: ApiOptions.defaults,
	            headers: [""],
	            editableHeaders: false,
	            rows: defaultRows,
	            columns: defaultColumns,
	            answers: blankAnswers
	        };
	    },

	    _getRows: function _getRows() {
	        return this.props.answers.length;
	    },

	    _getColumns: function _getColumns() {
	        return this.props.answers[0].length;
	    },

	    render: function render() {
	        var _this = this;

	        var rows = this._getRows();
	        var columns = this._getColumns();
	        var headers = this.props.headers;

	        var InputComponent;
	        if (this.props.apiOptions.staticRender) {
	            InputComponent = MathOutput;
	        } else {
	            InputComponent = "input";
	        }

	        return React.createElement(
	            "table",
	            { className: "perseus-widget-table-of-values non-markdown" },
	            React.createElement(
	                "thead",
	                null,
	                React.createElement(
	                    "tr",
	                    null,
	                    _.map(headers, function (header, i) {
	                        if (_this.props.editableHeaders) {
	                            return React.createElement(
	                                "th",
	                                { key: i },
	                                React.createElement(_this.props.Editor, {
	                                    ref: "columnHeader" + i,
	                                    apiOptions: _this.props.apiOptions,
	                                    enabledFeatures: _this.props.enabledFeatures,
	                                    content: header,
	                                    widgetEnabled: false,
	                                    onChange: _.partial(_this.onHeaderChange, i)
	                                })
	                            );
	                        } else {
	                            return React.createElement(
	                                "th",
	                                { key: i },
	                                React.createElement(Renderer, { content: header })
	                            );
	                        }
	                    })
	                )
	            ),
	            React.createElement(
	                "tbody",
	                null,
	                _(rows).times(function (r) {
	                    return React.createElement(
	                        "tr",
	                        { key: r },
	                        _(columns).times(function (c) {
	                            return React.createElement(
	                                "td",
	                                { key: c },
	                                React.createElement(InputComponent, {
	                                    ref: getRefForPath(getInputPath(r, c)),
	                                    type: "text",
	                                    value: _this.props.answers[r][c],
	                                    disabled: _this.props.apiOptions.readOnly,
	                                    onFocus: _.partial(_this._handleFocus, getInputPath(r, c)),
	                                    onBlur: _.partial(_this._handleBlur, getInputPath(r, c)),
	                                    onChange: _.partial(_this.onValueChange, r, c) })
	                            );
	                        })
	                    );
	                })
	            )
	        );
	    },

	    getUserInput: function getUserInput() {
	        return _.map(this.props.answers, _.clone);
	    },

	    onValueChange: function onValueChange(row, column, e) {
	        var answers = _.map(this.props.answers, _.clone);
	        answers[row][column] = e.target.value;
	        this.props.onChange({
	            answers: answers
	        });
	        this.props.trackInteraction();
	    },

	    onHeaderChange: function onHeaderChange(index, e) {
	        var headers = this.props.headers.slice();
	        headers[index] = e.content;
	        this.props.onChange({
	            headers: headers
	        });
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Table.validate(this.getUserInput(), rubric);
	    },

	    _handleFocus: function _handleFocus(inputPath) {
	        this.props.onFocus(inputPath);
	    },

	    _handleBlur: function _handleBlur(inputPath) {
	        this.props.onBlur(inputPath);
	    },

	    focus: function focus() {
	        this.focusInputPath(getDefaultPath());
	        return true;
	    },

	    focusInputPath: function focusInputPath(path) {
	        var inputID = getRefForPath(path);
	        var inputComponent = this.refs[inputID];
	        if (this.props.apiOptions.staticRender) {
	            inputComponent.focus();
	        } else {
	            ReactDOM.findDOMNode(inputComponent).focus();
	        }
	    },

	    blurInputPath: function blurInputPath(path) {
	        var inputID = getRefForPath(path);
	        var inputComponent = this.refs[inputID];
	        if (this.props.apiOptions.staticRender) {
	            inputComponent.blur();
	        } else {
	            ReactDOM.findDOMNode(inputComponent).blur();
	        }
	    },

	    getDOMNodeForPath: function getDOMNodeForPath(path) {
	        var inputID = getRefForPath(path);
	        return ReactDOM.findDOMNode(this.refs[inputID]);
	    },

	    getInputPaths: function getInputPaths() {
	        var rows = this._getRows();
	        var columns = this._getColumns();
	        var inputPaths = [];
	        _(rows).times(function (r) {
	            _(columns).times(function (c) {
	                var inputPath = getInputPath(r, c);
	                inputPaths.push(inputPath);
	            });
	        });
	        return inputPaths;
	    },

	    getGrammarTypeForPath: function getGrammarTypeForPath(inputPath) {
	        return "number";
	    },

	    setInputValue: function setInputValue(path, newValue, cb) {
	        // Extract row, column information
	        var row = getRowFromPath(path);
	        var column = getColumnFromPath(path);

	        var answers = _.map(this.props.answers, _.clone);
	        answers[row][column] = newValue;
	        this.props.onChange({
	            answers: answers
	        }, cb);
	    }
	});

	_.extend(Table, {
	    validate: function validate(state, rubric) {
	        var filterNonEmpty = function filterNonEmpty(table) {
	            return _.filter(table, function (row) {

	                // Check if row has a cell that is nonempty
	                return _.some(row, _.identity);
	            });
	        };
	        var solution = filterNonEmpty(rubric.answers);
	        var supplied = filterNonEmpty(state);
	        var hasEmptyCell = _.some(supplied, function (row) {
	            return _.some(row, function (cell) {
	                return cell === "";
	            });
	        });
	        if (hasEmptyCell || !supplied.length) {
	            return {
	                type: "invalid",
	                message: null
	            };
	        }
	        if (supplied.length !== solution.length) {
	            return {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: null
	            };
	        }
	        var createValidator = KhanAnswerTypes.number.createValidatorFunctional;
	        var message = null;
	        var allCorrect = _.every(solution, function (rowSolution) {
	            var i;
	            for (i = 0; i < supplied.length; i++) {
	                var rowSupplied = supplied[i];
	                var correct = _.every(rowSupplied, function (cellSupplied, i) {
	                    var cellSolution = rowSolution[i];
	                    var validator = createValidator(cellSolution, {
	                        simplify: true
	                    });
	                    var result = validator(cellSupplied);
	                    if (result.message) {
	                        message = result.message;
	                    }
	                    return result.correct;
	                });
	                if (correct) {
	                    supplied.splice(i, 1);
	                    return true;
	                }
	            }
	            return false;
	        });
	        return {
	            type: "points",
	            earned: allCorrect ? 1 : 0,
	            total: 1,
	            message: message
	        };
	    }
	});

	var propTransform = function propTransform(editorProps) {
	    // Remove answers before passing to widget
	    var rows = editorProps.answers.length;
	    var columns = editorProps.answers[0].length;
	    var blankAnswers = _(rows).times(function () {
	        return Util.stringArrayOfSize(columns);
	    });
	    return _.extend({}, editorProps, {
	        answers: blankAnswers
	    });
	};

	module.exports = {
	    name: "table",
	    displayName: "Table of values",
	    accessible: true,
	    widget: Table,
	    transform: propTransform
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var Util = __webpack_require__(8);

	var InfoTip = __webpack_require__(82);
	var NumberInput = __webpack_require__(175);
	var Editor = __webpack_require__(13);

	var Table = __webpack_require__(143).widget;

	var TableEditor = React.createClass({
	    displayName: "TableEditor",

	    propTypes: {
	        rows: React.PropTypes.number,
	        columns: React.PropTypes.number,
	        headers: React.PropTypes.arrayOf(React.PropTypes.string),
	        answers: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string))
	    },

	    getDefaultProps: function getDefaultProps() {
	        var defaultRows = 4;
	        var defaultColumns = 1;
	        var blankAnswers = _(defaultRows).times(function () {
	            return Util.stringArrayOfSize(defaultColumns);
	        });
	        return {
	            headers: [""],
	            rows: defaultRows,
	            columns: defaultColumns,
	            answers: blankAnswers
	        };
	    },

	    focus: function focus() {
	        ReactDOM.findDOMNode(this.refs.numberOfColumns).focus();
	    },

	    render: function render() {
	        var _this = this;

	        var tableProps = _.pick(this.props, "headers", "answers", "onChange", "apiOptions", "enabledFeatures");
	        _.extend(tableProps, {
	            editableHeaders: true,
	            Editor: Editor,
	            onFocus: function onFocus() {},
	            onBlur: function onBlur() {},
	            trackInteraction: function trackInteraction() {}
	        });

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "label",
	                    null,
	                    "Number of columns:",
	                    " ",
	                    React.createElement(NumberInput, {
	                        ref: "numberOfColumns",
	                        value: this.props.columns,
	                        onChange: function onChange(val) {
	                            if (val) {
	                                _this.onSizeInput(_this.props.rows, val);
	                            }
	                        },
	                        useArrowKeys: true })
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "label",
	                    null,
	                    "Number of rows:",
	                    " ",
	                    React.createElement(NumberInput, {
	                        ref: "numberOfRows",
	                        value: this.props.rows,
	                        onChange: function onChange(val) {
	                            if (val) {
	                                _this.onSizeInput(val, _this.props.columns);
	                            }
	                        },
	                        useArrowKeys: true })
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                ' ',
	                "Table of answers:",
	                ' ',
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "The student has to fill out all cells in the table.  For partially filled tables create a table using the template, and insert text input boxes as desired."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(Table, tableProps)
	            )
	        );
	    },

	    onSizeInput: function onSizeInput(numRawRows, numRawColumns) {
	        var rows = +numRawRows || 0;
	        var columns = +numRawColumns || 0;
	        rows = Math.min(Math.max(1, rows), 30);
	        columns = Math.min(Math.max(1, columns), 6);
	        var oldColumns = this.props.columns;
	        var oldRows = this.props.rows;

	        var answers = this.props.answers;
	        // Truncate if necessary; else, append
	        if (rows <= oldRows) {
	            answers.length = rows;
	        } else {
	            _(rows - oldRows).times(function () {
	                answers.push(Util.stringArrayOfSize(oldColumns));
	            });
	        }

	        function fixColumnSizing(array) {
	            // Truncate if necessary; else, append
	            if (columns <= oldColumns) {
	                array.length = columns;
	            } else {
	                _(columns - oldColumns).times(function () {
	                    array.push("");
	                });
	            }
	        }

	        var headers = this.props.headers;
	        fixColumnSizing(headers);
	        _.each(answers, fixColumnSizing);

	        this.props.onChange({
	            rows: rows,
	            columns: columns,
	            answers: answers,
	            headers: headers
	        });
	    },

	    serialize: function serialize() {
	        var json = _.pick(this.props, "headers", "rows", "columns");

	        return _.extend({}, json, {
	            answers: _.map(this.props.answers, _.clone)
	        });
	    }
	});

	module.exports = TableEditor;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable camelcase, comma-dangle, indent, no-redeclare, no-undef, no-var, object-curly-spacing, prefer-spread, react/jsx-closing-bracket-location, react/jsx-indent-props, react/no-did-update-set-state, react/prop-types, react/sort-comp, space-before-function-paren, space-infix-ops */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var Graph = __webpack_require__(191);
	var InlineIcon = __webpack_require__(40);
	var NumberInput = __webpack_require__(175);
	var MathOutput = __webpack_require__(193);
	var TeX = __webpack_require__(61);
	var SimpleKeypadInput = __webpack_require__(168);

	var ApiOptions = __webpack_require__(7).Options;

	var keypadElementPropType = __webpack_require__(159).propTypes.keypadElementPropType;

	var ROTATE_SNAP_DEGREES = 15;
	var DEGREE_SIGN = "°";
	var RENDER_TRANSFORM_DELAY_IN_MS = 300;
	var ROTATE_HANDLE_DIST = 1.5;
	var REFLECT_ROTATE_HANDLE_DIST = 2;
	var REFLECT_BUTTON_SIZE = 1;

	var _require = __webpack_require__(39);

	var iconPlus = _require.iconPlus;
	var iconUndo = _require.iconUndo;

	var deepEq = __webpack_require__(8).deepEq;
	var getGridStep = __webpack_require__(8).getGridStep;
	var captureScratchpadTouchStart = __webpack_require__(8).captureScratchpadTouchStart;

	var knumber = __webpack_require__(197).number;
	var kvector = __webpack_require__(197).vector;
	var kpoint = __webpack_require__(197).point;
	var kray = __webpack_require__(197).ray;
	var kline = __webpack_require__(197).line;
	var KhanMath = __webpack_require__(85);
	var KhanColors = __webpack_require__(189);

	var assert = __webpack_require__(164).assert;

	var defaultBoxSize = 400;
	var defaultBackgroundImage = {
	    url: null
	};

	/* Does a pluck on keys inside objects in an object
	 *
	 * Ex:
	 * tools = {
	 *     translation: {
	 *         enabled: true
	 *     },
	 *     rotation: {
	 *         enabled: false
	 *     }
	 * };
	 * pluckObject(tools, "enabled") returns {
	 *     translation: true
	 *     rotation: false
	 * }
	 */
	function pluckObject(object, subKey) {
	    return _.object(_.map(object, function (value, key) {
	        return [key, value[subKey]];
	    }));
	}

	var defaultGraphProps = function defaultGraphProps(setProps, boxSize) {
	    setProps = setProps || {};
	    var labels = setProps.labels || ["x", "y"];
	    var range = setProps.range || [[-10, 10], [-10, 10]];
	    var step = setProps.step || [1, 1];
	    var gridStep = setProps.gridStep || getGridStep(range, step, boxSize);
	    return {
	        box: [boxSize, boxSize],
	        labels: labels,
	        range: range,
	        step: step,
	        gridStep: gridStep,
	        valid: true,
	        backgroundImage: defaultBackgroundImage,
	        markings: "grid",
	        showProtractor: false
	    };
	};

	var defaultTransformerProps = {
	    apiOptions: ApiOptions.defaults,
	    gradeEmpty: false,
	    graphMode: "interactive",
	    listMode: "dynamic",
	    graph: {},
	    tools: {
	        translation: {
	            enabled: true,
	            required: false,
	            constraints: {}
	        },
	        rotation: {
	            enabled: true,
	            required: false,
	            constraints: {
	                fixed: false
	            },
	            coord: [1, 6]
	        },
	        reflection: {
	            enabled: true,
	            required: false,
	            constraints: {
	                fixed: false
	            },
	            coords: [[2, -4], [2, 2]]
	        },
	        dilation: {
	            enabled: true,
	            required: false,
	            constraints: {
	                fixed: false
	            },
	            coord: [6, 6]
	        }
	    },
	    drawSolutionShape: true,
	    starting: {
	        shape: {
	            type: "polygon-3",
	            coords: [[2, 2], [2, 6], [7, 2]]
	        },
	        transformations: []
	    },
	    correct: {
	        shape: {
	            type: "polygon-3",
	            coords: [[2, 2], [2, 6], [7, 2]]
	        },
	        transformations: []
	    }
	};

	function colorForTool(tool) {
	    return tool.constraints.fixed ? KhanColors.DYNAMIC : KhanColors.INTERACTIVE;
	}

	/* Scales a distance from the default range of
	 * [-10, 10] to a given props.range pair
	 *
	 * Used for sizing various transformation tools
	 * (rotation handle, dilation circle)
	 */
	function scaleToRange(dist, range) {
	    var spreadX = range[0][1] - range[0][0];
	    var spreadY = range[1][1] - range[1][0];

	    return dist * Math.max(spreadX, spreadY) / 20;
	}

	function dilatePointFromCenter(point, dilationCenter, scale) {
	    var pv = kvector.subtract(point, dilationCenter);
	    var pvScaled = kvector.scale(pv, scale);
	    var transformedPoint = kvector.add(dilationCenter, pvScaled);
	    return transformedPoint;
	}

	// TODO(jack): i18nize this
	function stringFromDecimal(number) {
	    return String(KhanMath.roundTo(9, number));
	}

	function stringFromFraction(number) {
	    var frac = KhanMath.toFraction(number, knumber.DEFAULT_TOLERANCE);
	    if (frac[1] === 1) {
	        return stringFromDecimal(number);
	    } else {
	        return stringFromDecimal(frac[0]) + "/" + stringFromDecimal(frac[1]);
	    }
	}

	function texFromPoint(point) {
	    return [React.createElement(
	        TeX,
	        null,
	        "("
	    ), stringFromDecimal(point[0]), React.createElement(
	        TeX,
	        null,
	        ", {}"
	    ), stringFromDecimal(point[1]), React.createElement(
	        TeX,
	        null,
	        ")"
	    )];
	}

	function texFromVector(vector) {
	    return [React.createElement(
	        TeX,
	        null,
	        "\\langle"
	    ), stringFromDecimal(vector[0]), React.createElement(
	        TeX,
	        null,
	        ", {}"
	    ), stringFromDecimal(vector[1]), React.createElement(
	        TeX,
	        null,
	        "\\rangle"
	    )];
	}

	function texFromAngleDeg(angleDeg) {
	    return stringFromDecimal(angleDeg) + DEGREE_SIGN;
	}

	function orderInsensitiveCoordsEqual(coords1, coords2) {
	    coords1 = _.clone(coords1).sort(kpoint.compare);
	    coords2 = _.clone(coords2).sort(kpoint.compare);
	    return _.all(_.map(coords1, function (coord1, i) {
	        var coord2 = coords2[i];
	        return kpoint.equal(coord1, coord2);
	    }));
	}

	var inputComponentForApiOptions = function inputComponentForApiOptions(apiOptions) {
	    if (apiOptions.customKeypad) {
	        return SimpleKeypadInput;
	    } else if (apiOptions.staticRender) {
	        return MathOutput;
	    } else {
	        return NumberInput;
	    }
	};

	/* Perform operations on raw transform objects */
	var TransformOps = {
	    apply: function apply(transform) {
	        // Any transformation with empty text boxes is a no-op until
	        // filled out (these show up as nulls in transform.vector/line/etc).
	        // TODO (jack): Merge this just into reflections now that other
	        // transforms are always valid (after merging transformation
	        // collapsing, which may use isValid)
	        if (!Transformations[transform.type].isValid(transform)) {
	            return _.identity; // do not transform the coord
	        } else {
	            return Transformations[transform.type].apply(transform);
	        }
	    },

	    append: function append(transformList, newTransform) {
	        // Append newTransform to transformList, and collapse the last
	        // two transforms if they are collapsable
	        var results = TransformOps._appendAndCollapseLastTwo(transformList, newTransform);
	        // Collapse any no-ops at the end of the transformation list
	        return TransformOps._collapseFinalNoOps(results);
	    },

	    _collapseFinalNoOps: function _collapseFinalNoOps(transforms) {
	        // Collapse no-op transformations at the end of the list
	        if (transforms.length && TransformOps.isNoOp(_.last(transforms))) {
	            return _.initial(transforms);
	        } else {
	            return transforms;
	        }
	    },

	    _appendAndCollapseLastTwo: function _appendAndCollapseLastTwo(transformList, newTransform) {
	        if (!transformList.length) {
	            return [newTransform];
	        } else {
	            var collapsed = TransformOps.collapse(_.last(transformList), newTransform);
	            return _.initial(transformList).concat(collapsed);
	        }
	    },

	    isNoOp: function isNoOp(transform) {
	        return Transformations[transform.type].isNoOp(transform);
	    },

	    collapse: function collapse(transform1, transform2) {
	        // We can only collapse transforms that have the same type
	        if (transform1.type !== transform2.type) {
	            return [transform1, transform2];
	        }

	        // Clicking the button again removes empty transformations
	        if (TransformOps.isEmpty(transform1) && TransformOps.isEmpty(transform2)) {
	            return [];
	        }

	        // Don't collapse invalid transformations otherwise
	        if (!TransformOps.isValid(transform1) || !TransformOps.isValid(transform2)) {
	            return [transform1, transform2];
	        }

	        return TransformOps._collapseValidMonotypedTransforms(transform1, transform2);
	    },

	    isValid: function isValid(transform) {
	        return Transformations[transform.type].isValid(transform);
	    },

	    isEmpty: function isEmpty(transform) {
	        return Transformations[transform.type].isEmpty(transform);
	    },

	    _collapseValidMonotypedTransforms: function _collapseValidMonotypedTransforms(transform1, transform2) {
	        var collapsed = Transformations[transform1.type].collapse(transform1, transform2);
	        if (collapsed) {
	            // Force all answers into an array
	            if (!_.isArray(collapsed)) {
	                collapsed = [collapsed];
	            }
	            // Add types to all transforms in the answer
	            _.each(collapsed, function (transform) {
	                transform.type = transform1.type;
	            });
	            return collapsed;
	        } else {
	            // These transforms can't be collapsed together
	            return [transform1, transform2];
	        }
	    },

	    toTeX: function toTeX(transform) {
	        return Transformations[transform.type].toTeX(transform);
	    },

	    /* A react representation of this transform object */
	    ListItem: React.createClass({
	        displayName: "ListItem",

	        render: function render() {
	            if (this.props.mode === "dynamic") {
	                return React.createElement(
	                    "div",
	                    null,
	                    TransformOps.toTeX(this.props.transform)
	                );
	            } else if (this.props.mode === "interactive") {
	                var TransformClass = Transformations[this.props.transform.type].Input;
	                return React.createElement(TransformClass, _extends({
	                    ref: "transform",
	                    onChange: this.handleChange,
	                    onFocus: this.props.onFocus,
	                    onBlur: this.props.onBlur,
	                    keypadElement: this.props.keypadElement,
	                    apiOptions: this.props.apiOptions
	                }, this.props.transform));
	            } else {
	                throw new Error("Invalid mode: " + this.props.mode);
	            }
	        },
	        value: function value() {
	            if (this.props.mode === "interactive") {
	                return _.extend({
	                    type: this.props.transform.type
	                }, this.refs.transform.value());
	            } else {
	                return this.props.transform;
	            }
	        },
	        handleChange: _.debounce(function (callback) {
	            this.props.onChange(this.value(), callback);
	        }, RENDER_TRANSFORM_DELAY_IN_MS),

	        /* InputPath API: depending on the API call, this could involve simply
	         * navigating to the right ref and calling the function on that
	         * component, or threading the call down and returning the result. */
	        _getComponentAtPath: function _getComponentAtPath(path) {
	            var transform = this.refs.transform;
	            var ref = _.head(path);
	            return transform.refs[ref];
	        },
	        focus: function focus() {
	            var transform = this.refs.transform;
	            var path = _.head(transform.getInputPaths());
	            if (path) {
	                this.focusInputPath(path);
	            }
	        },
	        focusInputPath: function focusInputPath(path) {
	            this._getComponentAtPath(path).focus();
	        },
	        blurInputPath: function blurInputPath(path) {
	            this._getComponentAtPath(path).blur();
	        },
	        getDOMNodeForPath: function getDOMNodeForPath(path) {
	            return ReactDOM.findDOMNode(this._getComponentAtPath(path));
	        },
	        getGrammarTypeForPath: function getGrammarTypeForPath(path) {
	            return "number";
	        },
	        setInputValue: function setInputValue(path, value, cb) {
	            // `value` comes in as a string on mobile, but we need a number
	            // We let through the empty string so that "Clear" works -- in
	            // that case, the transformer widget will just act as if there is
	            // no input, which is what we want.
	            if (value.length) {
	                value = parseFloat(value);
	                if (isNaN(value)) {
	                    return;
	                }
	            }
	            this.refs.transform.setInputValue(path, value, cb);
	        },
	        getInputPaths: function getInputPaths() {
	            // If we're in dynamic mode, then the list items are made up of
	            // static text.
	            if (this.props.mode === "dynamic") {
	                return [];
	            } else {
	                return this.refs.transform.getInputPaths();
	            }
	        }
	    })
	};

	var Transformations = {
	    translation: {
	        // I18N: As in the command, "Translate the polygon"
	        verbName: i18n._("Translate"),
	        nounName: i18n._("Translation"),
	        lowerNounName: i18n._("translation"),
	        apply: function apply(transform) {
	            return function (coord) {
	                return kvector.add(coord, transform.vector);
	            };
	        },
	        isValid: function isValid(transform) {
	            return _.isFinite(transform.vector[0]) && _.isFinite(transform.vector[1]);
	        },
	        isEmpty: function isEmpty(transform) {
	            return transform.vector[0] === null && transform.vector[1] === null;
	        },
	        isNoOp: function isNoOp(transform) {
	            return kvector.equal(transform.vector, [0, 0]);
	        },
	        collapse: function collapse(transform1, transform2) {
	            return {
	                vector: kvector.add(transform1.vector, transform2.vector)
	            };
	        },
	        toTeX: function toTeX(transform) {
	            // I18N: As in the command, "Translation by <3, 1>"
	            return $_({ vector: texFromVector(transform.vector) }, "Translation by %(vector)s");
	        },
	        Input: React.createClass({
	            displayName: "Input",

	            getInitialState: function getInitialState() {
	                return {
	                    vector: this.props.vector || [null, null]
	                };
	            },
	            componentDidUpdate: function componentDidUpdate(prevProps) {
	                if (!deepEq(this.props, prevProps)) {
	                    this.setState({ vector: this.props.vector });
	                }
	            },
	            render: function render() {
	                var _this = this;

	                var InputComponent = inputComponentForApiOptions(this.props.apiOptions);

	                var vector = [React.createElement(
	                    TeX,
	                    null,
	                    "\\langle"
	                ), React.createElement(InputComponent, {
	                    ref: "x",
	                    placeholder: 0,
	                    value: this.state.vector[0],
	                    useArrowKeys: true,
	                    onChange: function onChange(val0) {
	                        var val1 = _this.state.vector[1];
	                        _this.setState({ vector: [val0, val1] }, function () {
	                            _this.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "x"),
	                    onBlur: _.partial(this.props.onBlur, "x"),
	                    keypadElement: this.props.keypadElement }), React.createElement(
	                    TeX,
	                    null,
	                    ", {}"
	                ), React.createElement(InputComponent, {
	                    ref: "y",
	                    placeholder: 0,
	                    value: this.state.vector[1],
	                    useArrowKeys: true,
	                    onChange: function onChange(val1) {
	                        var val0 = _this.state.vector[0];
	                        _this.setState({ vector: [val0, val1] }, function () {
	                            _this.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "y"),
	                    onBlur: _.partial(this.props.onBlur, "y"),
	                    keypadElement: this.props.keypadElement }), React.createElement(
	                    TeX,
	                    null,
	                    "\\rangle"
	                )];
	                return React.createElement(
	                    "div",
	                    null,
	                    $_({ vector: vector }, "Translation by %(vector)s")
	                );
	            },
	            value: function value() {
	                var x = this.refs.x.getValue();
	                var y = this.refs.y.getValue();
	                return {
	                    vector: [x, y]
	                };
	            },
	            /* InputPath API */
	            setInputValue: function setInputValue(path, value, cb) {
	                var _this2 = this;

	                var id = _.first(path);
	                var vector = _.clone(this.state.vector);
	                if (id === "x") {
	                    vector[0] = value;
	                } else if (id === "y") {
	                    vector[1] = value;
	                }
	                this.setState({ vector: vector }, function () {
	                    _this2.props.onChange(cb);
	                });
	            },
	            getInputPaths: function getInputPaths() {
	                return [["x"], ["y"]];
	            }
	        })
	    },

	    rotation: {
	        // I18N: As in the command, "Rotate the polygon"
	        verbName: i18n._("Rotate"),
	        nounName: i18n._("Rotation"),
	        lowerNounName: i18n._("rotation"),
	        apply: function apply(transform) {
	            return function (coord) {
	                return kpoint.rotateDeg(coord, transform.angleDeg, transform.center);
	            };
	        },
	        isValid: function isValid(transform) {
	            return _.isFinite(transform.angleDeg) && _.isFinite(transform.center[0]) && _.isFinite(transform.center[1]);
	        },
	        isEmpty: function isEmpty(transform) {
	            return transform.angleDeg === null && transform.center[0] === null && transform.center[1] === null;
	        },
	        isNoOp: function isNoOp(transform) {
	            return knumber.equal(transform.angleDeg, 0);
	        },
	        collapse: function collapse(transform1, transform2) {
	            if (!kpoint.equal(transform1.center, transform2.center)) {
	                return false;
	            }
	            return {
	                center: transform1.center,
	                angleDeg: transform1.angleDeg + transform2.angleDeg
	            };
	        },
	        toTeX: function toTeX(transform) {
	            return $_({
	                degrees: texFromAngleDeg(transform.angleDeg),
	                point: texFromPoint(transform.center)
	            }, "Rotation by %(degrees)s about %(point)s");
	        },
	        Input: React.createClass({
	            displayName: "Input",

	            getInitialState: function getInitialState() {
	                return {
	                    center: this.props.center || [null, null],
	                    angleDeg: this.props.angleDeg || null
	                };
	            },
	            componentDidUpdate: function componentDidUpdate(prevProps) {
	                if (!deepEq(this.props, prevProps)) {
	                    this.setState({
	                        center: this.props.center,
	                        angleDeg: this.props.angleDeg
	                    });
	                }
	            },
	            render: function render() {
	                var _this3 = this;

	                var InputComponent = inputComponentForApiOptions(this.props.apiOptions);

	                var point = [React.createElement(
	                    TeX,
	                    null,
	                    "("
	                ), React.createElement(InputComponent, {
	                    ref: "centerX",
	                    placeholder: 0,
	                    value: this.state.center[0],
	                    useArrowKeys: true,
	                    onChange: function onChange(val0) {
	                        var val1 = _this3.state.center[1];
	                        _this3.setState({ center: [val0, val1] }, function () {
	                            _this3.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "centerX"),
	                    onBlur: _.partial(this.props.onBlur, "centerX"),
	                    keypadElement: this.props.keypadElement }), React.createElement(
	                    TeX,
	                    null,
	                    ", {}"
	                ), React.createElement(InputComponent, {
	                    ref: "centerY",
	                    placeholder: 0,
	                    value: this.state.center[1],
	                    useArrowKeys: true,
	                    onChange: function onChange(val1) {
	                        var val0 = _this3.state.center[0];
	                        _this3.setState({ center: [val0, val1] }, function () {
	                            _this3.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "centerY"),
	                    onBlur: _.partial(this.props.onBlur, "centerY"),
	                    keypadElement: this.props.keypadElement }), React.createElement(
	                    TeX,
	                    null,
	                    ")"
	                )];
	                var degrees = [React.createElement(InputComponent, {
	                    ref: "angleDeg",
	                    placeholder: 0,
	                    value: this.state.angleDeg,
	                    useArrowKeys: true,
	                    onChange: function onChange(val) {
	                        _this3.setState({ angleDeg: val }, function () {
	                            _this3.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "angleDeg"),
	                    onBlur: _.partial(this.props.onBlur, "angleDeg"),
	                    keypadElement: this.props.keypadElement }), DEGREE_SIGN];
	                // I18N: %(point)s must come before %(degrees)s in this phrase
	                var text = $_({ point: point, degrees: degrees }, "Rotation about %(point)s by %(degrees)s");

	                return React.createElement(
	                    "div",
	                    null,
	                    text
	                );
	            },
	            value: function value() {
	                var angleDeg = this.refs.angleDeg.getValue();
	                var centerX = this.refs.centerX.getValue();
	                var centerY = this.refs.centerY.getValue();
	                return {
	                    angleDeg: angleDeg,
	                    center: [centerX, centerY]
	                };
	            },
	            /* InputPath API */
	            setInputValue: function setInputValue(path, value, cb) {
	                var _this4 = this;

	                var id = _.first(path);
	                var angleDeg = _.clone(this.state.angleDeg);
	                var center = _.clone(this.state.center);
	                if (id === "angleDeg") {
	                    angleDeg = value;
	                } else if (id === "centerX") {
	                    center[0] = value;
	                } else if (id === "centerY") {
	                    center[1] = value;
	                }
	                this.setState({ angleDeg: angleDeg, center: center }, function () {
	                    _this4.props.onChange(cb);
	                });
	            },
	            getInputPaths: function getInputPaths() {
	                return [["centerX"], ["centerY"], ["angleDeg"]];
	            }
	        })
	    },

	    reflection: {
	        // I18N: As in the command, "Reflect the polygon"
	        verbName: i18n._("Reflect"),
	        nounName: i18n._("Reflection"),
	        lowerNounName: i18n._("reflection"),
	        apply: function apply(transform) {
	            return function (coord) {
	                return kpoint.reflectOverLine(coord, transform.line);
	            };
	        },
	        isValid: function isValid(transform) {
	            // A bit hacky, but we'll also define reflecting over a
	            // single point as a no-op, to avoid NaN fun.
	            return _.all(_.flatten(transform.line), _.isFinite) && !kpoint.equal(transform.line[0], transform.line[1]);
	        },
	        isEmpty: function isEmpty(transform) {
	            return _.all(_.flatten(transform.line), _.isNull);
	        },
	        isNoOp: function isNoOp(transform) {
	            // Invalid transforms are implicitly no-ops, so we don't
	            // have to catch that case here.
	            return false;
	        },
	        collapse: function collapse(transform1, transform2) {
	            if (!kline.equal(transform1.line, transform2.line)) {
	                return false;
	            }
	            return [];
	        },
	        toTeX: function toTeX(transform) {
	            var point1 = transform.line[0];
	            var point2 = transform.line[1];
	            return $_({
	                point1: texFromPoint(point1),
	                point2: texFromPoint(point2)
	            }, "Reflection over the line from %(point1)s to %(point2)s");
	        },
	        Input: React.createClass({
	            displayName: "Input",

	            getInitialState: function getInitialState() {
	                return {
	                    line: this.props.line || [[null, null], [null, null]]
	                };
	            },
	            componentDidUpdate: function componentDidUpdate(prevProps) {
	                if (!deepEq(this.props, prevProps)) {
	                    this.setState({ line: this.props.line });
	                }
	            },
	            render: function render() {
	                var InputComponent = inputComponentForApiOptions(this.props.apiOptions);

	                var point1 = [React.createElement(
	                    TeX,
	                    null,
	                    "("
	                ), React.createElement(InputComponent, {
	                    ref: "x1",
	                    value: this.state.line[0][0],
	                    useArrowKeys: true,
	                    onChange: this.changePoint.bind(this, 0, 0),
	                    onFocus: _.partial(this.props.onFocus, "x1"),
	                    onBlur: _.partial(this.props.onBlur, "x1"),
	                    keypadElement: this.props.keypadElement }), React.createElement(
	                    TeX,
	                    null,
	                    ", {}"
	                ), React.createElement(InputComponent, {
	                    ref: "y1",
	                    value: this.state.line[0][1],
	                    useArrowKeys: true,
	                    onChange: this.changePoint.bind(this, 0, 1),
	                    onFocus: _.partial(this.props.onFocus, "y1"),
	                    onBlur: _.partial(this.props.onBlur, "y1"),
	                    keypadElement: this.props.keypadElement }), React.createElement(
	                    TeX,
	                    null,
	                    ")"
	                )];
	                var point2 = [React.createElement(
	                    TeX,
	                    null,
	                    "("
	                ), React.createElement(InputComponent, {
	                    ref: "x2",
	                    value: this.state.line[1][0],
	                    useArrowKeys: true,
	                    onChange: this.changePoint.bind(this, 1, 0),
	                    onFocus: _.partial(this.props.onFocus, "x2"),
	                    onBlur: _.partial(this.props.onBlur, "x2"),
	                    keypadElement: this.props.keypadElement }), React.createElement(
	                    TeX,
	                    null,
	                    ", {}"
	                ), React.createElement(InputComponent, {
	                    ref: "y2",
	                    value: this.state.line[1][1],
	                    useArrowKeys: true,
	                    onChange: this.changePoint.bind(this, 1, 1),
	                    onFocus: _.partial(this.props.onFocus, "y2"),
	                    onBlur: _.partial(this.props.onBlur, "y2"),
	                    keypadElement: this.props.keypadElement }), React.createElement(
	                    TeX,
	                    null,
	                    ")"
	                )];
	                return React.createElement(
	                    "div",
	                    null,
	                    $_({ point1: point1, point2: point2 }, "Reflection over the line from " + "%(point1)s to %(point2)s")
	                );
	            },
	            changePoint: function changePoint(i, j, val, cb) {
	                var _this5 = this;

	                var line = _.map(this.state.line, _.clone);
	                line[i][j] = val;
	                this.setState({ line: line }, function () {
	                    _this5.props.onChange(cb);
	                });
	            },
	            value: function value() {
	                var x1 = this.refs.x1.getValue();
	                var y1 = this.refs.y1.getValue();
	                var x2 = this.refs.x2.getValue();
	                var y2 = this.refs.y2.getValue();
	                return {
	                    line: [[x1, y1], [x2, y2]]
	                };
	            },
	            /* InputPath API */
	            setInputValue: function setInputValue(path, value, cb) {
	                var id = _.first(path);
	                var j;
	                if (id[0] === "x") {
	                    j = 0;
	                } else if (id[0] === "y") {
	                    j = 1;
	                }
	                var i;
	                if (id[1] === "1") {
	                    i = 0;
	                } else if (id[1] === "2") {
	                    i = 1;
	                }
	                this.changePoint(i, j, value, cb);
	            },
	            getInputPaths: function getInputPaths() {
	                return [["x1"], ["y1"], ["x2"], ["y2"]];
	            }
	        })
	    },

	    dilation: {
	        // I18N: As in the command, "Dilate the polygon"
	        verbName: i18n._("Dilate"),
	        nounName: i18n._("Dilation"),
	        lowerNounName: i18n._("dilation"),
	        apply: function apply(transform) {
	            return function (coord) {
	                return dilatePointFromCenter(coord, transform.center, transform.scale);
	            };
	        },
	        isValid: function isValid(transform) {
	            return _.isFinite(transform.scale) && _.isFinite(transform.center[0]) && _.isFinite(transform.center[1]);
	        },
	        isEmpty: function isEmpty(transform) {
	            return transform.scale === null && transform.center[0] === null && transform.center[1] === null;
	        },
	        isNoOp: function isNoOp(transform) {
	            return knumber.equal(transform.scale, 1);
	        },
	        collapse: function collapse(transform1, transform2) {
	            if (!kpoint.equal(transform1.center, transform2.center)) {
	                return false;
	            }
	            return {
	                center: transform1.center,
	                scale: transform1.scale * transform2.scale
	            };
	        },
	        toTeX: function toTeX(transform) {
	            var scaleString = stringFromFraction(transform.scale);
	            return $_({
	                scale: scaleString,
	                point: texFromPoint(transform.center)
	            }, "Dilation of scale %(scale)s about %(point)s");
	        },
	        Input: React.createClass({
	            displayName: "Input",

	            getInitialState: function getInitialState() {
	                return {
	                    center: this.props.center || [null, null],
	                    scale: this.props.scale || null
	                };
	            },
	            componentDidUpdate: function componentDidUpdate(prevProps) {
	                if (!deepEq(this.props, prevProps)) {
	                    this.setState({
	                        center: this.props.center,
	                        scale: this.props.scale
	                    });
	                }
	            },
	            render: function render() {
	                var _this6 = this;

	                var InputComponent = inputComponentForApiOptions(this.props.apiOptions);

	                var point = [React.createElement(
	                    TeX,
	                    null,
	                    "("
	                ), React.createElement(InputComponent, {
	                    ref: "x",
	                    placeholder: 0,
	                    value: this.state.center[0],
	                    useArrowKeys: true,
	                    onChange: function onChange(val0) {
	                        var val1 = _this6.state.center[1];
	                        _this6.setState({ center: [val0, val1] }, function () {
	                            _this6.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "x"),
	                    onBlur: _.partial(this.props.onBlur, "x"),
	                    keypadElement: this.props.keypadElement }), React.createElement(
	                    TeX,
	                    null,
	                    ", {}"
	                ), React.createElement(InputComponent, {
	                    ref: "y",
	                    placeholder: 0,
	                    value: this.state.center[1],
	                    useArrowKeys: true,
	                    onChange: function onChange(val1) {
	                        var val0 = _this6.state.center[0];
	                        _this6.setState({ center: [val0, val1] }, function () {
	                            _this6.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "y"),
	                    onBlur: _.partial(this.props.onBlur, "y"),
	                    keypadElement: this.props.keypadElement }), React.createElement(
	                    TeX,
	                    null,
	                    ")"
	                )];
	                var scale = React.createElement(InputComponent, {
	                    ref: "scale",
	                    placeholder: 1,
	                    value: this.state.scale,
	                    useArrowKeys: true,
	                    onChange: function onChange(val) {
	                        _this6.setState({ scale: val }, function () {
	                            _this6.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "scale"),
	                    onBlur: _.partial(this.props.onBlur, "scale"),
	                    keypadElement: this.props.keypadElement });
	                return React.createElement(
	                    "div",
	                    null,
	                    $_({ point: point, scale: scale }, "Dilation about %(point)s by %(scale)s")
	                );
	            },
	            value: function value() {
	                var scale = this.refs.scale.getValue();
	                var x = this.refs.x.getValue();
	                var y = this.refs.y.getValue();
	                return {
	                    scale: scale,
	                    center: [x, y]
	                };
	            },
	            /* InputPath API */
	            setInputValue: function setInputValue(path, value, cb) {
	                var _this7 = this;

	                var id = _.first(path);
	                var scale = this.state.scale;
	                var center = _.clone(this.state.center);
	                if (id === "x") {
	                    center[0] = value;
	                } else if (id === "y") {
	                    center[1] = value;
	                } else if (id === "scale") {
	                    scale = value;
	                }
	                this.setState({ scale: scale, center: center }, function () {
	                    _this7.props.onChange(cb);
	                });
	            },
	            getInputPaths: function getInputPaths() {
	                return [["x"], ["y"], ["scale"]];
	            }
	        })
	    }
	};

	/* Various functions to deal with different shape types */
	var ShapeTypes = {
	    getPointCountForType: function getPointCountForType(type) {
	        var splitType = type.split("-");
	        if (splitType[0] === "polygon") {
	            return splitType[1] || 3;
	        } else if (splitType[0] === "line" || splitType[0] === "lineSegment") {
	            return 2;
	        } else if (splitType[0] === "angle") {
	            return 3;
	        } else if (splitType[0] === "circle") {
	            return 2;
	        } else if (splitType[0] === "point") {
	            return 1;
	        }
	    },

	    addMovableShape: function addMovableShape(graphie, options) {
	        if (options.editable && options.translatable) {
	            throw new Error("It doesn't make sense to have a movable shape " + "where you can stretch the points and translate them " + "simultaneously. options: " + JSON.stringify(options));
	        }

	        var shape;
	        var points = _.map(options.shape.coords, function (coord) {
	            var currentPoint;
	            var isMoving = false;
	            var previousCoord = coord;

	            var onMove = function onMove(x, y) {
	                if (!isMoving) {
	                    previousCoord = currentPoint.coord;
	                    isMoving = true;
	                }

	                var moveVector = kvector.subtract([x, y], currentPoint.coord);

	                // Translate from (x, y) semantics to (dX, dY) semantics
	                // This is more useful for translations on multiple points,
	                // where we care about how the points moved, not where any
	                // individual point ended up
	                if (options.onMove) {
	                    moveVector = options.onMove(moveVector[0], moveVector[1]);
	                }

	                // Perform a translation on all points in this shape when
	                // any point moves
	                if (options.translatable) {
	                    _.each(points, function (point) {
	                        // The point itself will be updated by the
	                        // movablePoint class, so only translate the other
	                        // points
	                        if (point !== currentPoint) {
	                            point.setCoord(kvector.add(point.coord, moveVector));
	                        }
	                    });
	                }

	                // Update our shape and our currentPoint
	                // Without this, some shapes (circles, angles) appear
	                // "bouncy" as they are updated with currentPoint at the
	                // current mouse coordinate (oldCoord), rather than newCoord
	                var oldCoord = currentPoint.coord;
	                var newCoord = kvector.add(currentPoint.coord, moveVector);
	                // Temporarily change our coordinate so that
	                // shape.update() sees the new coordinate
	                currentPoint.coord = newCoord;
	                shape.update();
	                // ...But don't break onMove, which assumes it
	                // is the only thing changing our coord
	                currentPoint.coord = oldCoord;
	                return newCoord;
	            };

	            var onMoveEnd = function onMoveEnd() {
	                // onMove isn't guaranteed to be called before onMoveEnd, so
	                // we have to take into account that we may not have moved and
	                // set previousCoord.
	                if (options.onMoveEnd && isMoving) {
	                    isMoving = false;
	                    // We don't use the supplied x and y parameters here
	                    // because MovablePoint's onMoveEnd semantics suck.
	                    // It returns the mouseX, mouseY without processing them
	                    // through onMove, leaving us with weird fractional moves
	                    var change = kvector.subtract(currentPoint.coord, previousCoord);
	                    options.onMoveEnd(change[0], change[1]);
	                }
	                shape.update();
	            };

	            currentPoint = graphie.addMovablePoint({
	                coord: coord,
	                normalStyle: options.normalPointStyle,
	                highlightStyle: options.highlightPointStyle,
	                constraints: {
	                    fixed: !options.translatable && !options.editable
	                },
	                visible: options.showPoints,
	                snapX: options.snap && options.snap[0] || 0,
	                snapY: options.snap && options.snap[1] || 0,
	                bounded: false, // Don't bound it when placing it on the graph
	                onMove: onMove,
	                onMoveEnd: onMoveEnd
	            });

	            // Bound it when moving
	            // We can't set this earlier, because doing so would mean any
	            // points outside of the graph would be moved into a moved into
	            // a position that doesn't preserve the shape
	            currentPoint.bounded = true;

	            return currentPoint;
	        });

	        shape = ShapeTypes.addShape(graphie, options, points);
	        var removeShapeWithoutPoints = shape.remove;
	        shape.remove = function () {
	            removeShapeWithoutPoints.apply(shape);
	            _.invoke(points, "remove");
	        };
	        return shape;
	    },

	    addShape: function addShape(graphie, options, points) {
	        points = points || options.shape.coords;

	        var types = ShapeTypes._typesOf(options.shape);
	        var typeOptions = options.shape.options || ShapeTypes.defaultOptions(types);

	        var shapes = ShapeTypes._mapTypes(types, points, function (type, points, i) {
	            var shapeOptions = _.extend({}, options, typeOptions[i]);
	            return ShapeTypes._addType(graphie, type, points, shapeOptions);
	        });

	        var updateFuncs = _.filter(_.pluck(shapes, "update"), _.identity);
	        var update = function update() {
	            _.invoke(updateFuncs, "call");
	        };

	        var removeFuncs = _.filter(_.pluck(shapes, "remove"), _.identity);
	        var remove = function remove() {
	            _.invoke(removeFuncs, "call");
	        };

	        var getOptions = function getOptions() {
	            return _.map(shapes, function (shape) {
	                if (shape.getOptions) {
	                    return shape.getOptions();
	                } else {
	                    return {};
	                }
	            });
	        };

	        var toJSON = function toJSON() {
	            var coords = _.map(points, function (pt) {
	                if (_.isArray(pt)) {
	                    return pt;
	                } else {
	                    return pt.coord;
	                }
	            });
	            return {
	                type: types,
	                coords: coords,
	                options: getOptions()
	            };
	        };

	        return {
	            type: types,
	            points: points,
	            update: update,
	            remove: remove,
	            toJSON: toJSON,
	            getOptions: getOptions
	        };
	    },

	    equal: function equal(shape1, shape2) {
	        var types1 = ShapeTypes._typesOf(shape1);
	        var types2 = ShapeTypes._typesOf(shape2);
	        if (types1.length !== types2.length) {
	            return false;
	        }
	        var shapes1 = ShapeTypes._mapTypes(types1, shape1.coords, ShapeTypes._combine);
	        var shapes2 = ShapeTypes._mapTypes(types2, shape2.coords, ShapeTypes._combine);
	        return _.all(_.map(shapes1, function (partialShape1, i) {
	            var partialShape2 = shapes2[i];
	            if (partialShape1.type !== partialShape2.type) {
	                return false;
	            }
	            return ShapeTypes._forType(partialShape1.type).equal(partialShape1.coords, partialShape2.coords);
	        }));
	    },

	    _typesOf: function _typesOf(shape) {
	        var types = shape.type;
	        if (!_.isArray(types)) {
	            types = [types];
	        }
	        return _.map(types, function (type) {
	            if (type === "polygon") {
	                return "polygon-3";
	            } else {
	                return type;
	            }
	        });
	    },

	    defaultOptions: function defaultOptions(types) {
	        return _.map(types, function (type) {
	            var typeDefaultOptions = ShapeTypes._forType(type).defaultOptions;
	            return _.extend({}, typeDefaultOptions);
	        });
	    },

	    _forType: function _forType(type) {
	        var baseType = type.split("-")[0];
	        return ShapeTypes[baseType];
	    },

	    _mapTypes: function _mapTypes(types, points, func, context) {
	        return _.map(types, function (type, i) {
	            var pointCount = ShapeTypes.getPointCountForType(type);
	            var currentPoints = _.first(points, pointCount);
	            points = _.rest(points, pointCount);
	            return func.call(context, type, currentPoints, i);
	        });
	    },

	    _addType: function _addType(graphie, type, points, options) {
	        var lineCoords = _.isArray(points[0]) ? {
	            coordA: points[0],
	            coordZ: points[1]
	        } : {
	            pointA: points[0],
	            pointZ: points[1]
	        };

	        type = type.split("-")[0];
	        if (type === "polygon") {
	            var polygon = graphie.addMovablePolygon(_.extend({}, options, {
	                fixed: !options.editable,
	                snapX: options.snap && options.snap[0] || 0,
	                snapY: options.snap && options.snap[1] || 0,
	                points: points,
	                constrainToGraph: false
	            }));
	            return {
	                update: polygon.transform.bind(polygon),
	                remove: polygon.remove.bind(polygon)
	            };
	        } else if (type === "line" || type === "lineSegment") {
	            var line = graphie.addMovableLineSegment(_.extend({}, options, lineCoords, {
	                movePointsWithLine: true,
	                fixed: true,
	                constraints: {
	                    fixed: true
	                },
	                extendLine: type === "line"
	            }));

	            // TODO(jack): Hide points on uneditable lines when translation
	            // is a vector.
	            // We can't just remove the points yet, because they are the
	            // translation handle for the line.
	            return {
	                update: line.transform.bind(line, true),
	                remove: line.remove.bind(line)
	            };
	        } else if (type === "angle") {
	            // If this angle is editable, we want to be able to make angles
	            // both larger and smaller than 180 degrees.
	            // If this angle is not editable, it should always maintain
	            // it's angle measure, even if it is reflected (causing the
	            // clockwise-ness of the points to change)
	            var shouldChangeReflexivity = options.editable ? null : false;

	            var angle = graphie.addMovableAngle({
	                angleLabel: "$deg0",
	                fixed: true,
	                points: points,
	                normalStyle: options.normalStyle,
	                reflex: options.reflex
	            });

	            // Hide non-vertex points on uneditable angles
	            if (!_.isArray(points[0]) && !options.editable) {
	                points[0].remove();
	                points[2].remove();
	            }
	            return {
	                update: angle.update.bind(angle, shouldChangeReflexivity),
	                remove: angle.remove.bind(angle),
	                getOptions: function getOptions() {
	                    return {
	                        reflex: angle.isReflex()
	                    };
	                }
	            };
	        } else if (type === "circle") {
	            var perimeter = {
	                // temporary object for the first removal
	                remove: _.identity
	            };
	            var redrawPerim = function redrawPerim() {
	                var coord0 = points[0].coord || points[0];
	                var coord1 = points[1].coord || points[1];
	                var radius = kpoint.distanceToPoint(coord0, coord1);
	                perimeter.remove();
	                perimeter = graphie.circle(coord0, radius, _.extend({
	                    stroke: KhanColors.DYNAMIC,
	                    "stroke-width": 2
	                }, options.normalStyle));
	            };

	            redrawPerim();
	            if (points[1].remove && !options.editable) {
	                points[1].remove();
	            }

	            return {
	                update: redrawPerim,
	                remove: function remove() {
	                    // Not _.bind because the remove function changes
	                    // when the perimeter is redrawn
	                    perimeter.remove();
	                }
	            };
	        } else if (type === "point") {
	            // do nothing
	            return {
	                update: null,
	                remove: null
	            };
	        } else {
	            throw new Error("Invalid shape type " + type);
	        }
	    },

	    _combine: function _combine(type, coords) {
	        return {
	            type: type,
	            coords: coords
	        };
	    },

	    polygon: {
	        equal: orderInsensitiveCoordsEqual
	    },

	    line: {
	        equal: kline.equal
	    },

	    lineSegment: {
	        equal: orderInsensitiveCoordsEqual
	    },

	    angle: {
	        equal: function equal(points1, points2) {
	            if (!kpoint.equal(points1[1], points2[1])) {
	                return false;
	            }

	            var line1_0 = [points1[1], points1[0]];
	            var line1_2 = [points1[1], points1[2]];
	            var line2_0 = [points2[1], points2[0]];
	            var line2_2 = [points2[1], points2[2]];

	            var equalUnflipped = kray.equal(line1_0, line2_0) && kray.equal(line1_2, line2_2);
	            var equalFlipped = kray.equal(line1_0, line2_2) && kray.equal(line1_2, line2_0);

	            return equalUnflipped || equalFlipped;
	        },

	        defaultOptions: {
	            reflex: false
	        }
	    },

	    circle: {
	        equal: function equal(points1, points2) {
	            var radius1 = kpoint.distanceToPoint(points1[0], points1[1]);
	            var radius2 = kpoint.distanceToPoint(points2[0], points2[1]);
	            return kpoint.equal(points1[0], points2[0]) && knumber.equal(radius1, radius2);
	        }
	    },

	    point: {
	        equal: kpoint.equal
	    }
	};

	var TransformationListItem = TransformOps.ListItem;

	var TransformationList = React.createClass({
	    displayName: "TransformationList",

	    render: function render() {
	        if (this.props.mode === "static") {
	            return React.createElement("span", null); // don't render anything
	        }

	        var transformationList = _.map(this.props.transformations, function (transform, i) {
	            return React.createElement(TransformationListItem, {
	                ref: "transformation" + i,
	                key: "transformation" + i,
	                transform: transform,
	                mode: this.props.mode,
	                onChange: this.handleChange,
	                onFocus: _.partial(this.props.onFocus, "" + i),
	                onBlur: _.partial(this.props.onBlur, "" + i),
	                keypadElement: this.props.keypadElement,
	                apiOptions: this.props.apiOptions });
	        }, this);

	        return React.createElement(
	            "div",
	            { className: "perseus-transformation-list" },
	            transformationList
	        );
	    },

	    _transformationRefs: function _transformationRefs() {
	        var _this8 = this;

	        return _.times(this.props.transformations.length, function (i) {
	            return _this8.refs["transformation" + i];
	        });
	    },

	    value: function value() {
	        return _.invoke(this._transformationRefs(), "value");
	    },

	    handleChange: function handleChange(changed, callback) {
	        this.props.onChange(this.value(), callback);
	    },

	    focusLast: function focusLast() {
	        var transformationRefs = this._transformationRefs();
	        if (transformationRefs.length !== 0) {
	            _.last(transformationRefs).focus();
	        }
	    }
	});

	var ToolButton = React.createClass({
	    displayName: "ToolButton",

	    render: function render() {
	        var classes = this.props.toggled ? "simple-button exercise-orange toggled highlighted-tool-button" : "simple-button";

	        return React.createElement(
	            "button",
	            {
	                type: "button",
	                className: classes,
	                disabled: this.props.disabled,
	                onClick: this.props.onClick,
	                onTouchStart: captureScratchpadTouchStart },
	            this.props.children
	        );
	    }
	});

	var ToolsBar = React.createClass({
	    displayName: "ToolsBar",

	    getInitialState: function getInitialState() {
	        return {
	            selected: null
	        };
	    },

	    render: function render() {
	        var tools = _.map(Transformations, function (tool, type) {
	            if (this.props.enabled[type]) {
	                return React.createElement(
	                    ToolButton,
	                    {
	                        key: type,
	                        disabled: this.props.apiOptions.readOnly,
	                        toggled: this.state.selected === type,
	                        onClick: this.changeSelected.bind(this, type) },
	                    tool.verbName
	                );
	            }
	        }, this);

	        return React.createElement(
	            "div",
	            { className: "transformer-tools-bar" },
	            React.createElement(
	                "span",
	                { className: "simple-button-group" },
	                tools
	            ),
	            React.createElement(
	                "button",
	                {
	                    className: "transformer-undo-button simple-button",
	                    type: "button",
	                    disabled: this.props.apiOptions.readOnly,
	                    onClick: this.props.onUndoClick,
	                    onTouchStart: captureScratchpadTouchStart },
	                React.createElement(InlineIcon, iconUndo),
	                " ",
	                "Undo"
	            ),
	            React.createElement("div", { className: "clear" })
	        );
	    },

	    changeSelected: function changeSelected(tool) {
	        this.props.removeTool(this.state.selected);

	        if (!tool || tool === this.state.selected) {
	            this.setState({
	                selected: null
	            });
	        } else {
	            this.props.addTool(tool);
	            this.setState({
	                selected: tool
	            });
	        }
	    }
	});

	var AddTransformBar = React.createClass({
	    displayName: "AddTransformBar",

	    render: function render() {
	        var tools = _.map(Transformations, function (tool, type) {
	            if (this.props.enabled[type]) {
	                return React.createElement(
	                    ToolButton,
	                    {
	                        key: type,
	                        toggled: false,
	                        disabled: this.props.apiOptions.readOnly,
	                        onClick: this.changeSelected.bind(this, type) },
	                    React.createElement(InlineIcon, iconPlus),
	                    " ",
	                    tool.nounName
	                );
	            }
	        }, this);

	        return React.createElement(
	            "div",
	            { className: "transformer-tools-bar" },
	            tools,
	            React.createElement(
	                "button",
	                {
	                    className: "transformer-undo-button simple-button",
	                    type: "button",
	                    onClick: this.props.onUndoClick,
	                    disabled: this.props.apiOptions.readOnly,
	                    onTouchStart: captureScratchpadTouchStart },
	                React.createElement(InlineIcon, iconUndo),
	                " ",
	                "Undo"
	            ),
	            React.createElement("div", { className: "clear" })
	        );
	    },

	    changeSelected: function changeSelected(tool) {
	        if (tool) {
	            this.props.addTool(tool);
	        }
	    }
	});

	var Transformer = React.createClass({
	    displayName: "Transformer",

	    propTypes: {
	        apiOptions: ApiOptions.propTypes,
	        keypadElement: keypadElementPropType,
	        trackInteraction: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return _.defaults({
	            transformations: []
	        }, defaultTransformerProps);
	    },

	    render: function render() {
	        // Fill in any missing value in this.props.graph
	        // this can happen because the graph json doesn't include
	        // box, for example
	        var graph = _.extend(defaultGraphProps(this.props.graph, defaultBoxSize), this.props.graph);

	        var interactiveToolsMode = this.props.graphMode === "interactive";

	        var ToolsBarClass = interactiveToolsMode ? ToolsBar : AddTransformBar;

	        // This style is applied inline because it is dependent on the
	        // size of the graph as set by the graph.box prop, and this also
	        // lets us specify it in the same place the graph's width is
	        // specified.
	        var toolsBar = React.createElement(
	            "div",
	            { style: { width: graph.box[0] } },
	            React.createElement(ToolsBarClass, {
	                ref: "toolsBar",
	                enabled: pluckObject(this.props.tools, "enabled"),
	                apiOptions: this.props.apiOptions,
	                addTool: this.addTool,
	                removeTool: this.removeTool,
	                onUndoClick: this.handleUndoClick })
	        );

	        return React.createElement(
	            "div",
	            { className: "perseus-widget " + "perseus-widget-transformer" },
	            React.createElement(Graph, {
	                ref: "graph",
	                box: graph.box,
	                range: graph.range,
	                labels: graph.labels,
	                step: graph.step,
	                gridStep: graph.gridStep,
	                markings: graph.markings,
	                backgroundImage: graph.backgroundImage,
	                showProtractor: graph.showProtractor,
	                onGraphieUpdated: this.setupGraphie }),
	            !interactiveToolsMode && "Add transformations below:",
	            this.props.graphMode === "static" && [React.createElement("br", { key: "static-br" }), React.createElement(
	                "em",
	                { key: "static-nomove" },
	                ' ',
	                "Note: For this question, the shape will not move.",
	                ' '
	            )],
	            interactiveToolsMode && toolsBar,
	            React.createElement(TransformationList, {
	                ref: "transformationList",
	                mode: this.props.listMode,
	                transformations: this.props.transformations,
	                onChange: this.setTransformationProps,
	                onFocus: this._handleFocus,
	                onBlur: this._handleBlur,
	                keypadElement: this.props.keypadElement,
	                apiOptions: this.props.apiOptions }),
	            !interactiveToolsMode && toolsBar
	        );
	    },

	    componentDidMount: function componentDidMount() {
	        this.setupGraphie(this.graphie());
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        if (this.shouldSetupGraphie(this.props, prevProps)) {
	            this.refs.graph.reset();
	        } else if (!deepEq(this.props.transformations, this.transformations)) {
	            this.setTransformations(this.props.transformations);
	        }
	    },

	    shouldSetupGraphie: function shouldSetupGraphie(nextProps, prevProps) {
	        if (!deepEq(prevProps.starting, nextProps.starting)) {
	            return true;
	        } else if (prevProps.graphMode !== nextProps.graphMode) {
	            return true;
	        } else if (prevProps.listMode !== nextProps.listMode) {
	            return true;
	        } else if (prevProps.drawSolutionShape !== nextProps.drawSolutionShape) {
	            return true;
	        } else if (nextProps.drawSolutionShape && !deepEq(prevProps.correct.shape, nextProps.correct.shape)) {
	            return true;
	        } else if (!deepEq(this.tools, nextProps.tools)) {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    graphie: function graphie() {
	        return this.refs.graph.graphie();
	    },

	    setupGraphie: function setupGraphie(graphie) {
	        // A background image of our solution:
	        if (this.props.drawSolutionShape && this.props.correct.shape && this.props.correct.shape.coords) {
	            ShapeTypes.addShape(graphie, {
	                fixed: true,
	                shape: this.props.correct.shape,
	                normalStyle: {
	                    stroke: KhanColors.GRAY,
	                    "stroke-dasharray": "",
	                    "stroke-width": 2
	                }
	            });
	        }

	        this.currentTool = null;
	        this.refs.toolsBar.changeSelected(null);
	        this.addTransformerShape(this.props.starting.shape,
	        /* translatable */false);
	        this.setTransformations(this.props.transformations);

	        // Save a copy of our tools so that we can check future
	        // this.props.tools changes against them
	        // This seems weird, but gives us an easy way to tell whether
	        // props changes were self-inflicted (for which a graphie reset
	        // is not required, and is in fact a bad idea right now because
	        // of resetting the size of the dilation tool).
	        // TODO (jack): A deepClone method would be nice here
	        this.tools = {
	            translation: _.clone(this.props.tools.translation),
	            rotation: _.clone(this.props.tools.rotation),
	            reflection: _.clone(this.props.tools.reflection),
	            dilation: _.clone(this.props.tools.dilation)
	        };
	    },

	    /* Applies all transformations in `transformations`
	     * to the starting shape, and updates this.transformations
	     * to reflect this
	     *
	     * Usually called with this.props.transformations
	     */
	    setTransformations: function setTransformations(transformations) {
	        this.resetCoords();
	        this.transformations = _.clone(transformations);
	        _.each(this.transformations, this.applyTransform);
	    },

	    // the polygon that we transform
	    addTransformerShape: function addTransformerShape(shape, translatable) {
	        var self = this;
	        var graphie = this.graphie();

	        this.shape = ShapeTypes.addMovableShape(graphie, {
	            shape: shape,
	            editable: false,
	            showPoints: this.props.graphMode !== "static",
	            translatable: translatable,
	            onMove: function onMove(dX, dY) {
	                dX = KhanMath.roundToNearest(graphie.snap[0], dX);
	                dY = KhanMath.roundToNearest(graphie.snap[1], dY);
	                self.addTransform({
	                    type: "translation",
	                    vector: [dX, dY]
	                });
	                return [dX, dY];
	            },
	            normalPointStyle: {
	                fill: translatable ? KhanColors.INTERACTIVE : KhanColors.DYNAMIC,
	                stroke: translatable ? KhanColors.INTERACTIVE : KhanColors.DYNAMIC
	            },
	            highlightPointStyle: {
	                fill: KhanColors.INTERACTING,
	                stroke: KhanColors.INTERACTING
	            }
	        });
	    },

	    addTool: function addTool(toolId) {
	        var self = this;

	        if (this.props.graphMode === "interactive") {
	            if (toolId === "translation") {
	                this.currentTool = this.addTranslationTool();
	            } else if (toolId === "rotation") {
	                this.currentTool = this.addRotationTool();
	            } else if (toolId === "reflection") {
	                this.currentTool = this.addReflectionTool();
	            } else if (toolId === "dilation") {
	                this.currentTool = this.addDilationTool();
	            } else {
	                throw new Error("Invalid tool id: " + toolId);
	            }
	        } else {
	            var transform;
	            if (toolId === "translation") {
	                transform = {
	                    type: toolId,
	                    vector: [null, null]
	                };
	            } else if (toolId === "rotation") {
	                transform = {
	                    type: toolId,
	                    center: [null, null],
	                    angleDeg: null
	                };
	            } else if (toolId === "reflection") {
	                // Reflections with nulls in them won't be applied until
	                // fills in the blanks
	                transform = {
	                    type: toolId,
	                    line: [[null, null], [null, null]]
	                };
	            } else if (toolId === "dilation") {
	                transform = {
	                    type: toolId,
	                    center: [null, null],
	                    scale: null
	                };
	            } else {
	                throw new Error("Invalid tool id: " + toolId);
	            }

	            this.doTransform(transform, function () {
	                self.refs.transformationList.focusLast();
	            });
	        }
	    },

	    removeTool: function removeTool(toolId) {
	        if (this.currentTool) {
	            this.currentTool.remove();
	        }
	        this.currentTool = null;
	    },

	    addTranslationTool: function addTranslationTool() {
	        var self = this;
	        this.shape.remove();
	        this.addTransformerShape(this.shape.toJSON(),
	        /* translatable */true);

	        return {
	            remove: function remove() {
	                self.shape.remove();
	                self.addTransformerShape(self.shape.toJSON(),
	                /* translatable */false);
	            }
	        };
	    },

	    // Snaps a coord to this.graphie()'s snap
	    snapCoord: function snapCoord(coord) {
	        var graphie = this.graphie();
	        return _.map(coord, function (val, dim) {
	            return KhanMath.roundToNearest(graphie.snap[dim], val);
	        });
	    },

	    // Normalize the coords into something that fits the new 45 degree
	    // reflection line.
	    normalizeReflectionCoords: function normalizeReflectionCoords(messyCoords) {
	        var midpoint = this.snapCoord(kline.midpoint(messyCoords));
	        var origDirectionPolar = kvector.polarDegFromCart(kvector.subtract(messyCoords[0], messyCoords[1]));
	        var directionPolar = [1, KhanMath.roundToNearest(45, origDirectionPolar[1])];
	        var direction = kvector.cartFromPolarDeg(directionPolar);
	        var coords = _.map([-1, 1], function (directionCoefficient) {
	            var coord = kvector.add(midpoint, kvector.scale(direction, directionCoefficient * this.scaleToCurrentRange(REFLECT_ROTATE_HANDLE_DIST)));
	            return this.snapCoord(coord);
	        }, this);
	        return coords;
	    },

	    addReflectionTool: function addReflectionTool() {
	        var options = this.props.tools.reflection;
	        if (!options.enabled) {
	            return;
	        }
	        var self = this;
	        var graphie = this.refs.graph.graphie();

	        var updateReflectionTool = function updateReflectionTool() {
	            self.changeTool("reflection", {
	                coords: _.pluck(reflectPoints, "coord")
	            });
	        };

	        var coords = this.normalizeReflectionCoords(options.coords);

	        // The points defining the line of reflection; hidden from the
	        // user.
	        var reflectPoints = _.map(coords, function (coord) {
	            return graphie.addMovablePoint({
	                coord: coord,
	                visible: false
	            });
	        }, this);

	        // the line of reflection
	        // TODO(jack): graphie.style here is a hack to prevent the dashed
	        // style from leaking into the rest of the shapes. Remove when
	        // graphie.addMovableLineSegment doesn't leak styles anymore.
	        var reflectLine;
	        var normalColor = colorForTool(options);
	        graphie.style({}, function () {
	            reflectLine = graphie.addMovableLineSegment({
	                fixed: options.constraints.fixed,
	                constraints: options.constraints,
	                pointA: reflectPoints[0],
	                pointZ: reflectPoints[1],
	                snapX: graphie.snap[0],
	                snapY: graphie.snap[1],
	                extendLine: true,
	                normalStyle: {
	                    "stroke": normalColor,
	                    "stroke-width": 2,
	                    "stroke-dasharray": "- "
	                },
	                highlightStyle: {
	                    "stroke": KhanColors.INTERACTING,
	                    "stroke-width": 2,
	                    "stroke-dasharray": "- " // TODO(jack) solid doesn't
	                    // work here, but would be
	                    // nicer
	                },
	                movePointsWithLine: true,
	                onMoveEnd: updateReflectionTool
	            });
	        });

	        // the "button" point in the center of the line of reflection
	        var reflectButton = graphie.addReflectButton({
	            fixed: options.constraints.fixed,
	            line: reflectLine,
	            size: this.scaleToCurrentRange(REFLECT_BUTTON_SIZE),
	            onClick: function onClick() {
	                self.doTransform({
	                    type: "reflection",
	                    line: _.pluck(reflectPoints, "coord")
	                });
	                if (reflectRotateHandle) {
	                    // flip the rotation handle
	                    reflectRotateHandle.setCoord(kvector.add(reflectButton.coord, kvector.subtract(reflectButton.coord, reflectRotateHandle.coord)));
	                    reflectRotateHandle.update();
	                }
	            },
	            normalStyle: {
	                stroke: normalColor,
	                "stroke-width": 2,
	                fill: normalColor
	            },
	            highlightStyle: {
	                stroke: KhanColors.INTERACTING,
	                "stroke-width": 3,
	                fill: KhanColors.INTERACTING
	            },
	            onMoveEnd: updateReflectionTool
	        });

	        var reflectRotateHandle = null;
	        if (!options.constraints.fixed) {
	            // The rotation handle for rotating the line of reflection
	            var initRotateHandleAngle = kvector.polarDegFromCart(kvector.subtract(reflectPoints[1].coord, reflectPoints[0].coord))[1] + 90; // 90 degrees off of the line
	            reflectRotateHandle = graphie.addRotateHandle({
	                center: reflectButton,
	                radius: this.scaleToCurrentRange(REFLECT_ROTATE_HANDLE_DIST),
	                angleDeg: initRotateHandleAngle,
	                width: this.scaleToCurrentRange(0.24),
	                hoverWidth: this.scaleToCurrentRange(0.4),
	                lengthAngle: 17,
	                onMove: function onMove(newAngle) {
	                    return KhanMath.roundToNearest(45, newAngle);
	                },
	                onMoveEnd: updateReflectionTool
	            });
	        }

	        // Move the reflectButton and reflectRotateHandle with the line
	        $(reflectLine).on("move", function () {
	            reflectButton.update();
	            $(reflectButton).trigger("move"); // update the rotation handle,
	            // which watches for this in util/interactive.js.
	        });

	        // Update the line and reflect button when the reflectRotateHandle is
	        // rotated
	        if (reflectRotateHandle) {
	            $(reflectRotateHandle).on("move", function () {
	                var rotateHandleApprox = self.snapCoord(reflectRotateHandle.coord);

	                var rotateVector = kvector.subtract(rotateHandleApprox, reflectButton.coord);

	                var flipped = reflectButton.isFlipped() ? 1 : 0;
	                reflectPoints[flipped].setCoord(kvector.add(reflectButton.coord, kvector.rotateDeg(rotateVector, 90)));
	                reflectPoints[1 - flipped].setCoord(kvector.add(reflectButton.coord, kvector.rotateDeg(rotateVector, -90)));

	                reflectLine.transform(true);
	                reflectButton.update();
	            });
	        }

	        return {
	            remove: function remove() {
	                reflectButton.remove();
	                if (reflectRotateHandle) {
	                    reflectRotateHandle.remove();
	                }
	                reflectLine.remove();
	                reflectPoints[0].remove();
	                reflectPoints[1].remove();
	            }
	        };
	    },

	    /* Scales a distance from the default range of
	     * [-10, 10] to the current this.props.graph.range
	     *
	     * Used for sizing various transformation tools
	     * (rotation handle, dilation circle)
	     */
	    scaleToCurrentRange: function scaleToCurrentRange(dist) {
	        return scaleToRange(dist, this.refs.graph.props.range);
	    },

	    addRotationTool: function addRotationTool() {
	        var options = this.props.tools.rotation;
	        if (!options.enabled) {
	            return;
	        }
	        var self = this;
	        var graphie = this.refs.graph.graphie();

	        var pointColor = colorForTool(options);
	        // The center of our rotation, which can be moved to change the
	        // center of rotation
	        this.rotatePoint = graphie.addMovablePoint({
	            constraints: options.constraints,
	            coord: options.coord,
	            snapX: graphie.snap[0],
	            snapY: graphie.snap[1],
	            normalStyle: { // ugh, this seems to be a global and
	                "stroke-dasharray": "", // is set to dash above
	                stroke: pointColor,
	                fill: pointColor
	            },
	            highlightStyle: {
	                "stroke-dasharray": "",
	                stroke: KhanColors.INTERACTING,
	                fill: KhanColors.INTERACTING
	            }
	        });

	        // The point that we move around the center of rotation to actually
	        // cause rotations
	        this.rotateHandle = graphie.addRotateHandle({
	            center: this.rotatePoint,
	            radius: this.scaleToCurrentRange(ROTATE_HANDLE_DIST),
	            width: this.scaleToCurrentRange(0.24),
	            hoverWidth: this.scaleToCurrentRange(0.4),
	            onMove: function onMove(newAngle, oldAngle) {
	                var transform = self.getRotationTransformFromAngle(self.rotatePoint.coord, newAngle - oldAngle);

	                // Rotate polygon with rotateHandle
	                self.doTransform(transform);

	                return oldAngle + transform.angleDeg;
	            }
	        });

	        // Update tools.rotation.coord
	        this.rotatePoint.onMoveEnd = function (x, y) {
	            self.changeTool("rotation", {
	                coord: [x, y]
	            });
	        };

	        return {
	            remove: function remove() {
	                self.rotateHandle.remove();
	                self.rotatePoint.remove();
	            }
	        };
	    },

	    addDilationTool: function addDilationTool() {
	        var options = this.props.tools.dilation;
	        if (!options.enabled) {
	            return;
	        }
	        var self = this;
	        var graphie = this.refs.graph.graphie();

	        var pointColor = colorForTool(options);
	        // the circle for causing dilation transforms
	        self.dilationCircle = graphie.addCircleGraph({
	            centerConstraints: options.constraints,
	            center: options.coord,
	            radius: self.scaleToCurrentRange(2),
	            snapX: graphie.snap[0],
	            snapY: graphie.snap[1],
	            minRadius: self.scaleToCurrentRange(1),
	            snapRadius: self.scaleToCurrentRange(0.5),
	            onResize: function onResize(newRadius, oldRadius) {
	                self.doTransform({
	                    type: "dilation",
	                    center: self.dilationCircle.centerPoint.coord,
	                    scale: newRadius / oldRadius
	                });
	            },
	            circleNormalStyle: {
	                "stroke": pointColor,
	                "stroke-width": 2,
	                "stroke-dasharray": "- ",
	                "fill-opacity": 0
	            },
	            circleHighlightStyle: {
	                "stroke": KhanColors.INTERACTING,
	                "stroke-width": 2,
	                "stroke-dasharray": "",
	                "fill": KhanColors.INTERACTING,
	                "fill-opacity": 0.05
	            },
	            centerNormalStyle: {
	                "stroke": pointColor,
	                "fill": pointColor,
	                "stroke-width": 2,
	                "stroke-dasharray": ""
	            },
	            centerHighlightStyle: {
	                "stroke": pointColor,
	                "fill": pointColor,
	                "stroke-width": 2,
	                "stroke-dasharray": ""
	            }
	        });

	        var origOnMoveEnd = this.dilationCircle.centerPoint.onMoveEnd;
	        this.dilationCircle.centerPoint.onMoveEnd = function () {
	            if (origOnMoveEnd) {
	                origOnMoveEnd.apply(this, _.toArray(arguments));
	            }
	            self.changeTool("dilation", {
	                coord: self.dilationCircle.centerPoint.coord
	            });
	        };

	        return {
	            remove: function remove() {
	                self.dilationCircle.remove();
	            }
	        };
	    },

	    // returns a transformation object representing a rotation
	    // rounds the angle to the nearest 15 degrees
	    getRotationTransformFromAngle: function getRotationTransformFromAngle(center, angleChanged) {
	        angleChanged = (angleChanged + 360) % 360;
	        if (angleChanged > 180) {
	            angleChanged -= 360;
	        }
	        var roundedAngle = Math.round(angleChanged / ROTATE_SNAP_DEGREES) * ROTATE_SNAP_DEGREES;

	        return {
	            type: "rotation",
	            center: center,
	            angleDeg: roundedAngle
	        };
	    },

	    // apply and save a transform
	    doTransform: function doTransform(transform, callback) {
	        this.applyTransform(transform);
	        this.addTransform(transform, callback);
	    },

	    // apply a transform to our polygon (without modifying our transformation
	    // list)
	    applyTransform: function applyTransform(transform) {
	        if (this.props.graphMode !== "static") {
	            var transformFunc = TransformOps.apply(transform);
	            this.applyCoordTransformation(transformFunc);
	        }
	    },

	    // transform our polygon by transforming each point using a given function
	    applyCoordTransformation: function applyCoordTransformation(pointTransform) {
	        _.each(this.shape.points, function (point) {
	            var newCoord = pointTransform(point.coord);
	            point.setCoord(newCoord);
	        });
	        this.shape.update();
	    },

	    resetCoords: function resetCoords() {
	        var startCoords = this.props.starting.shape.coords;
	        _.each(this.shape.points, function (point, i) {
	            point.setCoord(startCoords[i]);
	        });
	        this.shape.update();
	    },

	    // Remove the last transformation
	    handleUndoClick: function handleUndoClick() {
	        this.refs.toolsBar.changeSelected(null);
	        if (this.props.transformations.length) {
	            this.props.onChange({
	                transformations: _.initial(this.props.transformations)
	            });
	        }
	    },

	    setTransformationProps: function setTransformationProps(newTransfomationList, callback) {
	        this.props.onChange({
	            transformations: newTransfomationList
	        }, callback);
	    },

	    // add a transformation to our props list of transformation
	    addTransform: function addTransform(transform, callback) {
	        this.transformations = TransformOps.append(this.transformations, transform);
	        this.props.onChange({
	            transformations: _.clone(this.transformations)
	        }, callback);
	    },

	    changeTool: function changeTool(tool, changes) {
	        var newTools = _.clone(this.props.tools);
	        newTools[tool] = _.extend({}, this.props.tools[tool], changes);
	        this.tools[tool] = _.clone(newTools[tool]);
	        this.props.onChange({
	            tools: newTools
	        });
	        this.props.trackInteraction();
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return Transformer.validate(this.getUserInput(), rubric);
	    },

	    /**
	     * Calculate where the coordinates would be if they were
	     * moved, even if we're in formal mode with no movement
	     * (and thus the actual movablepoints may not have moved
	     */
	    getCoords: function getCoords() {
	        var startCoords = this.props.starting.shape.coords;
	        var transforms = this.props.transformations;
	        return _.reduce(transforms, function (coords, transform) {
	            return _.map(coords, TransformOps.apply(transform));
	        }, startCoords);
	    },

	    getEditorJSON: function getEditorJSON() {
	        var json = _.pick(this.props, "grading", "starting", "graphMode", "listMode", "tools", "drawSolutionShape", "gradeEmpty");
	        json.graph = this.refs.graph.toJSON();
	        json.version = 1.2; // Give us some safety to change the format
	        // when we realize that I wrote
	        // a horrible json spec for this widget

	        json.answer = this.getUserInput();
	        return json;
	    },

	    getUserInput: function getUserInput() {
	        return {
	            transformations: this.props.transformations,
	            // This doesn't call this.shape.toJSON() because that doesn't
	            // handle coordinates in formal mode without movement, since
	            // the movablepoints never move
	            shape: {
	                type: this.shape.type,
	                coords: this.getCoords(),
	                options: this.shape.getOptions()
	            }
	        };
	    },

	    /* InputPath API */

	    _handleFocus: function _handleFocus() {
	        var path = Array.prototype.slice.call(arguments);
	        this.props.onFocus(path);
	    },

	    _handleBlur: function _handleBlur() {
	        var path = Array.prototype.slice.call(arguments);
	        this.props.onBlur(path);
	    },

	    _getTransformationForID: function _getTransformationForID(transformationID) {
	        // Returns the 'transformation' component corresponding to a given ID
	        var refPath = ["transformationList", "transformation" + transformationID];

	        // Follow the path of references
	        var component = this;
	        _.each(refPath, function (ref) {
	            component = component.refs[ref];
	        });
	        return component;
	    },

	    getInputPaths: function getInputPaths() {
	        var _this9 = this;

	        // If we're in static mode, then there is no transformation list, and,
	        // as a result, no input paths.
	        if (this.props.listMode === "static") {
	            return [];
	        }

	        var inputPaths = [];
	        _.each(this.props.transformations, function (transformation, i) {
	            var transformation = _this9._getTransformationForID(i);
	            var innerPaths = transformation.getInputPaths();
	            var fullPaths = _.map(innerPaths, function (innerPath) {
	                return ["" + i].concat(innerPath);
	            });
	            inputPaths = inputPaths.concat(fullPaths);
	        });
	        return inputPaths;
	    },

	    _passToInner: function _passToInner(functionName, path) {
	        if (!path || !path.length) {
	            return;
	        }

	        // First argument tells us which transformation will receive the call;
	        // remaining arguments are used within that transformation to identify
	        // a specific input.
	        var innerPath = _.rest(path);
	        var args = [innerPath].concat(_.rest(arguments, 2));

	        // Pass arguments down to appropriate 'transformation' component
	        var transformationID = _.head(path);
	        var caller = this._getTransformationForID(transformationID);
	        return caller[functionName].apply(caller, args);
	    },

	    focus: function focus() {
	        // Just focus the first showing input
	        var inputs = this.getInputPaths();
	        if (inputs.length > 0) {
	            this.focusInputPath(inputs[0]);
	            return true;
	        }
	        return false;
	    },

	    focusInputPath: function focusInputPath(path) {
	        // Since the transformer exposes the input API, it needs to be robust
	        // to empty paths. We don't expect this to happen, as entire-widget
	        // focusing is typically done through the focus() method, which already
	        // handles the empty path case properly, but it's better to be safe
	        // here.
	        if (path.length === 0) {
	            return false;
	        }

	        assert(path.length >= 2);
	        return this._passToInner('focusInputPath', path);
	    },

	    blurInputPath: function blurInputPath(path) {
	        // Since the transformer exposes the input API, it needs to be robust
	        // to empty paths (which indicate a blurring of the entire widget,
	        // e.g., when switching from interacting with the transformer to
	        // interacting with some other widget).
	        if (path.length === 0) {
	            return false;
	        }

	        assert(path.length >= 2);
	        return this._passToInner('blurInputPath', path);
	    },

	    setInputValue: function setInputValue(path, value, cb) {
	        assert(path.length >= 2);
	        return this._passToInner('setInputValue', path, value, cb);
	    },

	    getDOMNodeForPath: function getDOMNodeForPath(path) {
	        assert(path.length >= 2);
	        return this._passToInner('getDOMNodeForPath', path);
	    },

	    getGrammarTypeForPath: function getGrammarTypeForPath(path) {
	        assert(path.length >= 2);
	        return this._passToInner('getGrammarTypeForPath', path);
	    }
	});

	_.extend(Transformer, {
	    validate: function validate(guess, rubric) {
	        // Check for any required transformations
	        for (var type in Transformations) {
	            if (rubric.tools[type].required) {
	                var isUsed = _.any(_.map(guess.transformations, function (transform) {
	                    // Required transformations must appear in the
	                    // transformation list, and must not be no-ops
	                    return transform.type === type && !TransformOps.isEmpty(transform) && !TransformOps.isNoOp(transform);
	                }));

	                if (!isUsed) {
	                    return {
	                        type: "invalid",
	                        message: i18n._("Your transformation must use a " + "%(type)s.", {
	                            type: Transformations[type].lowerNounName
	                        })
	                    };
	                }
	            }
	        }

	        // Compare shapes
	        if (ShapeTypes.equal(guess.shape, rubric.correct.shape)) {
	            return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if (!rubric.gradeEmpty && deepEq(guess.shape.coords, rubric.starting.shape.coords)) {
	            return {
	                type: "invalid",
	                message: i18n._("Use the interactive graph to define a " + "correct transformation.")
	            };
	        } else {
	            return {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: null
	            };
	        }
	    }
	});

	module.exports = {
	    name: "transformer",
	    displayName: "Transformer",
	    widget: Transformer
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, camelcase, comma-dangle, indent, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var ApiOptions = __webpack_require__(7).Options;

	var Graph = __webpack_require__(191);
	var GraphSettings = __webpack_require__(187);
	var InfoTip = __webpack_require__(82);
	var PropCheckBox = __webpack_require__(47);

	var Transformer = __webpack_require__(145).widget;

	var deepEq = __webpack_require__(8).deepEq;
	var getGridStep = __webpack_require__(8).getGridStep;
	var kline = __webpack_require__(197).line;
	var knumber = __webpack_require__(197).number;
	var kpoint = __webpack_require__(197).point;
	var kray = __webpack_require__(197).ray;
	var kvector = __webpack_require__(197).vector;
	var KhanColors = __webpack_require__(189);

	function arraySum(array) {
	    return _.reduce(array, function (memo, arg) {
	        return memo + arg;
	    }, 0);
	}

	var defaultBackgroundImage = {
	    url: null
	};

	/* Scales a distance from the default range of
	 * [-10, 10] to a given props.range pair
	 *
	 * Used for sizing various transformation tools
	 * (rotation handle, dilation circle)
	 */
	function scaleToRange(dist, range) {
	    var spreadX = range[0][1] - range[0][0];
	    var spreadY = range[1][1] - range[1][0];

	    return dist * Math.max(spreadX, spreadY) / 20;
	}

	function orderInsensitiveCoordsEqual(coords1, coords2) {
	    coords1 = _.clone(coords1).sort(kpoint.compare);
	    coords2 = _.clone(coords2).sort(kpoint.compare);
	    return _.all(_.map(coords1, function (coord1, i) {
	        var coord2 = coords2[i];
	        return kpoint.equal(coord1, coord2);
	    }));
	}

	var defaultGraphProps = function defaultGraphProps(setProps, boxSize) {
	    setProps = setProps || {};
	    var labels = setProps.labels || ["x", "y"];
	    var range = setProps.range || [[-10, 10], [-10, 10]];
	    var step = setProps.step || [1, 1];
	    var gridStep = setProps.gridStep || getGridStep(range, step, boxSize);
	    return {
	        box: [boxSize, boxSize],
	        labels: labels,
	        range: range,
	        step: step,
	        gridStep: gridStep,
	        valid: true,
	        backgroundImage: defaultBackgroundImage,
	        markings: "grid",
	        showProtractor: false
	    };
	};

	var defaultTransformerProps = {
	    apiOptions: ApiOptions.defaults,
	    gradeEmpty: false,
	    graphMode: "interactive",
	    listMode: "dynamic",
	    graph: {},
	    tools: {
	        translation: {
	            enabled: true,
	            required: false,
	            constraints: {}
	        },
	        rotation: {
	            enabled: true,
	            required: false,
	            constraints: {
	                fixed: false
	            },
	            coord: [1, 6]
	        },
	        reflection: {
	            enabled: true,
	            required: false,
	            constraints: {
	                fixed: false
	            },
	            coords: [[2, -4], [2, 2]]
	        },
	        dilation: {
	            enabled: true,
	            required: false,
	            constraints: {
	                fixed: false
	            },
	            coord: [6, 6]
	        }
	    },
	    drawSolutionShape: true,
	    starting: {
	        shape: {
	            type: "polygon-3",
	            coords: [[2, 2], [2, 6], [7, 2]]
	        },
	        transformations: []
	    },
	    correct: {
	        shape: {
	            type: "polygon-3",
	            coords: [[2, 2], [2, 6], [7, 2]]
	        },
	        transformations: []
	    }
	};

	var ToolSettings = React.createClass({
	    displayName: "ToolSettings",

	    getDefaultProps: function getDefaultProps() {
	        return {
	            allowFixed: true
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            this.props.name,
	            ":",
	            ' ',
	            " ",
	            React.createElement(PropCheckBox, {
	                label: "enabled:",
	                enabled: this.props.settings.enabled,
	                onChange: this.props.onChange }),
	            " ",
	            this.props.settings.enabled && React.createElement(PropCheckBox, {
	                label: "required:",
	                required: this.props.settings.required,
	                onChange: this.props.onChange }),
	            this.props.settings.enabled && React.createElement(
	                InfoTip,
	                null,
	                "'Required' will only grade the answer as correct if the student has used at least one such transformation."
	            ),
	            " ",
	            this.props.allowFixed && this.props.settings.enabled && React.createElement(PropCheckBox, {
	                label: "fixed:",
	                fixed: this.props.settings.constraints.fixed,
	                onChange: this.changeConstraints }),
	            this.props.allowFixed && this.props.settings.enabled && React.createElement(
	                InfoTip,
	                null,
	                "Enable 'fixed' to prevent the student from repositioning the tool. The tool will appear in the position at which it is placed in the editor below."
	            )
	        );
	    },

	    changeConstraints: function changeConstraints(changed) {
	        var newConstraints = _.extend({}, this.props.constraints, changed);
	        this.props.onChange({
	            constraints: newConstraints
	        });
	    }
	});

	var TransformationExplorerSettings = React.createClass({
	    displayName: "TransformationExplorerSettings",

	    render: function render() {

	        return React.createElement(
	            "div",
	            { className: "transformer-settings" },
	            React.createElement(
	                "div",
	                null,
	                ' ',
	                "Mode:",
	                ' ',
	                React.createElement(
	                    "select",
	                    { value: this.getMode(),
	                        onChange: this.changeMode },
	                    React.createElement(
	                        "option",
	                        { value: "interactive,dynamic" },
	                        ' ',
	                        "Exploration with text",
	                        ' '
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "interactive,static" },
	                        ' ',
	                        "Exploration without text",
	                        ' '
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "dynamic,interactive" },
	                        ' ',
	                        "Formal with movement",
	                        ' '
	                    ),
	                    React.createElement(
	                        "option",
	                        { value: "static,interactive" },
	                        ' ',
	                        "Formal without movement",
	                        ' '
	                    )
	                ),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "ul",
	                        null,
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "b",
	                                null,
	                                "Exploration:"
	                            ),
	                            " Students create transformations with tools on the graph.",
	                            ' '
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "b",
	                                null,
	                                "Formal with movement:"
	                            ),
	                            " Students specify transformations mathematically in the transformation list. Graph shows the results of these transformations.",
	                            ' '
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "b",
	                                null,
	                                "Formal without movement:"
	                            ),
	                            " Students specify transformations mathematically in the transformation list. Graph does not update.",
	                            ' '
	                        )
	                    )
	                )
	            ),
	            React.createElement(ToolSettings, {
	                name: "Translations",
	                settings: this.props.tools.translation,
	                allowFixed: false,
	                onChange: this.changeHandlerFor("translation") }),
	            React.createElement(ToolSettings, {
	                name: "Rotations",
	                settings: this.props.tools.rotation,
	                onChange: this.changeHandlerFor("rotation") }),
	            React.createElement(ToolSettings, {
	                name: "Reflections",
	                settings: this.props.tools.reflection,
	                onChange: this.changeHandlerFor("reflection") }),
	            React.createElement(ToolSettings, {
	                name: "Dilations",
	                settings: this.props.tools.dilation,
	                onChange: this.changeHandlerFor("dilation") }),
	            React.createElement(PropCheckBox, {
	                label: "Draw Solution:",
	                drawSolutionShape: this.props.drawSolutionShape,
	                onChange: this.props.onChange })
	        );
	    },

	    getMode: function getMode() {
	        return this.props.graphMode + "," + this.props.listMode;
	    },

	    changeMode: function changeMode(e) {
	        var selected = e.target.value;
	        var modes = selected.split(",");

	        this.props.onChange({
	            graphMode: modes[0],
	            listMode: modes[1]
	        });
	    },

	    changeHandlerFor: function changeHandlerFor(toolName) {
	        var _this = this;

	        return function (change) {
	            var newTools = _.clone(_this.props.tools);
	            newTools[toolName] = _.extend({}, _this.props.tools[toolName], change);

	            _this.props.onChange({
	                tools: newTools
	            });
	        };
	    }
	});
	var ShapeTypes = {
	    getPointCountForType: function getPointCountForType(type) {
	        var splitType = type.split("-");
	        if (splitType[0] === "polygon") {
	            return splitType[1] || 3;
	        } else if (splitType[0] === "line" || splitType[0] === "lineSegment") {
	            return 2;
	        } else if (splitType[0] === "angle") {
	            return 3;
	        } else if (splitType[0] === "circle") {
	            return 2;
	        } else if (splitType[0] === "point") {
	            return 1;
	        }
	    },

	    addMovableShape: function addMovableShape(graphie, options) {
	        if (options.editable && options.translatable) {
	            throw new Error("It doesn't make sense to have a movable shape " + "where you can stretch the points and translate them " + "simultaneously. options: " + JSON.stringify(options));
	        }

	        var shape;
	        var points = _.map(options.shape.coords, function (coord) {
	            var currentPoint;
	            var isMoving = false;
	            var previousCoord = coord;

	            var onMove = function onMove(x, y) {
	                if (!isMoving) {
	                    previousCoord = currentPoint.coord;
	                    isMoving = true;
	                }

	                var moveVector = kvector.subtract([x, y], currentPoint.coord);

	                // Translate from (x, y) semantics to (dX, dY) semantics
	                // This is more useful for translations on multiple points,
	                // where we care about how the points moved, not where any
	                // individual point ended up
	                if (options.onMove) {
	                    moveVector = options.onMove(moveVector[0], moveVector[1]);
	                }

	                // Perform a translation on all points in this shape when
	                // any point moves
	                if (options.translatable) {
	                    _.each(points, function (point) {
	                        // The point itself will be updated by the
	                        // movablePoint class, so only translate the other
	                        // points
	                        if (point !== currentPoint) {
	                            point.setCoord(kvector.add(point.coord, moveVector));
	                        }
	                    });
	                }

	                // Update our shape and our currentPoint
	                // Without this, some shapes (circles, angles) appear
	                // "bouncy" as they are updated with currentPoint at the
	                // current mouse coordinate (oldCoord), rather than newCoord
	                var oldCoord = currentPoint.coord;
	                var newCoord = kvector.add(currentPoint.coord, moveVector);
	                // Temporarily change our coordinate so that
	                // shape.update() sees the new coordinate
	                currentPoint.coord = newCoord;
	                shape.update();
	                // ...But don't break onMove, which assumes it
	                // is the only thing changing our coord
	                currentPoint.coord = oldCoord;
	                return newCoord;
	            };

	            var onMoveEnd = function onMoveEnd() {
	                // onMove isn't guaranteed to be called before onMoveEnd, so
	                // we have to take into account that we may not have moved and
	                // set previousCoord.
	                if (options.onMoveEnd && isMoving) {
	                    isMoving = false;
	                    // We don't use the supplied x and y parameters here
	                    // because MovablePoint's onMoveEnd semantics suck.
	                    // It returns the mouseX, mouseY without processing them
	                    // through onMove, leaving us with weird fractional moves
	                    var change = kvector.subtract(currentPoint.coord, previousCoord);
	                    options.onMoveEnd(change[0], change[1]);
	                }
	                shape.update();
	            };

	            currentPoint = graphie.addMovablePoint({
	                coord: coord,
	                normalStyle: options.normalPointStyle,
	                highlightStyle: options.highlightPointStyle,
	                constraints: {
	                    fixed: !options.translatable && !options.editable
	                },
	                visible: options.showPoints,
	                snapX: options.snap && options.snap[0] || 0,
	                snapY: options.snap && options.snap[1] || 0,
	                bounded: false, // Don't bound it when placing it on the graph
	                onMove: onMove,
	                onMoveEnd: onMoveEnd
	            });

	            // Bound it when moving
	            // We can't set this earlier, because doing so would mean any
	            // points outside of the graph would be moved into a moved into
	            // a position that doesn't preserve the shape
	            currentPoint.bounded = true;

	            return currentPoint;
	        });

	        shape = ShapeTypes.addShape(graphie, options, points);
	        var removeShapeWithoutPoints = shape.remove;
	        shape.remove = function () {
	            removeShapeWithoutPoints.apply(shape);
	            _.invoke(points, "remove");
	        };
	        return shape;
	    },

	    addShape: function addShape(graphie, options, points) {
	        points = points || options.shape.coords;

	        var types = ShapeTypes._typesOf(options.shape);
	        var typeOptions = options.shape.options || ShapeTypes.defaultOptions(types);

	        var shapes = ShapeTypes._mapTypes(types, points, function (type, points, i) {
	            var shapeOptions = _.extend({}, options, typeOptions[i]);
	            return ShapeTypes._addType(graphie, type, points, shapeOptions);
	        });

	        var updateFuncs = _.filter(_.pluck(shapes, "update"), _.identity);
	        var update = function update() {
	            _.invoke(updateFuncs, "call");
	        };

	        var removeFuncs = _.filter(_.pluck(shapes, "remove"), _.identity);
	        var remove = function remove() {
	            _.invoke(removeFuncs, "call");
	        };

	        var getOptions = function getOptions() {
	            return _.map(shapes, function (shape) {
	                if (shape.getOptions) {
	                    return shape.getOptions();
	                } else {
	                    return {};
	                }
	            });
	        };

	        var toJSON = function toJSON() {
	            var coords = _.map(points, function (pt) {
	                if (_.isArray(pt)) {
	                    return pt;
	                } else {
	                    return pt.coord;
	                }
	            });
	            return {
	                type: types,
	                coords: coords,
	                options: getOptions()
	            };
	        };

	        return {
	            type: types,
	            points: points,
	            update: update,
	            remove: remove,
	            toJSON: toJSON,
	            getOptions: getOptions
	        };
	    },

	    equal: function equal(shape1, shape2) {
	        var types1 = ShapeTypes._typesOf(shape1);
	        var types2 = ShapeTypes._typesOf(shape2);
	        if (types1.length !== types2.length) {
	            return false;
	        }
	        var shapes1 = ShapeTypes._mapTypes(types1, shape1.coords, ShapeTypes._combine);
	        var shapes2 = ShapeTypes._mapTypes(types2, shape2.coords, ShapeTypes._combine);
	        return _.all(_.map(shapes1, function (partialShape1, i) {
	            var partialShape2 = shapes2[i];
	            if (partialShape1.type !== partialShape2.type) {
	                return false;
	            }
	            return ShapeTypes._forType(partialShape1.type).equal(partialShape1.coords, partialShape2.coords);
	        }));
	    },

	    _typesOf: function _typesOf(shape) {
	        var types = shape.type;
	        if (!_.isArray(types)) {
	            types = [types];
	        }
	        return _.map(types, function (type) {
	            if (type === "polygon") {
	                return "polygon-3";
	            } else {
	                return type;
	            }
	        });
	    },

	    defaultOptions: function defaultOptions(types) {
	        return _.map(types, function (type) {
	            var typeDefaultOptions = ShapeTypes._forType(type).defaultOptions;
	            return _.extend({}, typeDefaultOptions);
	        });
	    },

	    _forType: function _forType(type) {
	        var baseType = type.split("-")[0];
	        return ShapeTypes[baseType];
	    },

	    _mapTypes: function _mapTypes(types, points, func, context) {
	        return _.map(types, function (type, i) {
	            var pointCount = ShapeTypes.getPointCountForType(type);
	            var currentPoints = _.first(points, pointCount);
	            points = _.rest(points, pointCount);
	            return func.call(context, type, currentPoints, i);
	        });
	    },

	    _addType: function _addType(graphie, type, points, options) {
	        var lineCoords = _.isArray(points[0]) ? {
	            coordA: points[0],
	            coordZ: points[1]
	        } : {
	            pointA: points[0],
	            pointZ: points[1]
	        };

	        type = type.split("-")[0];
	        if (type === "polygon") {
	            var polygon = graphie.addMovablePolygon(_.extend({}, options, {
	                fixed: !options.editable,
	                snapX: options.snap && options.snap[0] || 0,
	                snapY: options.snap && options.snap[1] || 0,
	                points: points,
	                constrainToGraph: false
	            }));
	            return {
	                update: polygon.transform.bind(polygon),
	                remove: polygon.remove.bind(polygon)
	            };
	        } else if (type === "line" || type === "lineSegment") {
	            var line = graphie.addMovableLineSegment(_.extend({}, options, lineCoords, {
	                movePointsWithLine: true,
	                fixed: true,
	                constraints: {
	                    fixed: true
	                },
	                extendLine: type === "line"
	            }));

	            // TODO(jack): Hide points on uneditable lines when translation
	            // is a vector.
	            // We can't just remove the points yet, because they are the
	            // translation handle for the line.
	            return {
	                update: line.transform.bind(line, true),
	                remove: line.remove.bind(line)
	            };
	        } else if (type === "angle") {
	            // If this angle is editable, we want to be able to make angles
	            // both larger and smaller than 180 degrees.
	            // If this angle is not editable, it should always maintain
	            // it's angle measure, even if it is reflected (causing the
	            // clockwise-ness of the points to change)
	            var shouldChangeReflexivity = options.editable ? null : false;

	            var angle = graphie.addMovableAngle({
	                angleLabel: "$deg0",
	                fixed: true,
	                points: points,
	                normalStyle: options.normalStyle,
	                reflex: options.reflex
	            });

	            // Hide non-vertex points on uneditable angles
	            if (!_.isArray(points[0]) && !options.editable) {
	                points[0].remove();
	                points[2].remove();
	            }
	            return {
	                update: angle.update.bind(angle, shouldChangeReflexivity),
	                remove: angle.remove.bind(angle),
	                getOptions: function getOptions() {
	                    return {
	                        reflex: angle.isReflex()
	                    };
	                }
	            };
	        } else if (type === "circle") {
	            var perimeter = {
	                // temporary object for the first removal
	                remove: _.identity
	            };
	            var redrawPerim = function redrawPerim() {
	                var coord0 = points[0].coord || points[0];
	                var coord1 = points[1].coord || points[1];
	                var radius = kpoint.distanceToPoint(coord0, coord1);
	                perimeter.remove();
	                perimeter = graphie.circle(coord0, radius, _.extend({
	                    stroke: KhanColors.DYNAMIC,
	                    "stroke-width": 2
	                }, options.normalStyle));
	            };

	            redrawPerim();
	            if (points[1].remove && !options.editable) {
	                points[1].remove();
	            }

	            return {
	                update: redrawPerim,
	                remove: function remove() {
	                    // Not _.bind because the remove function changes
	                    // when the perimeter is redrawn
	                    perimeter.remove();
	                }
	            };
	        } else if (type === "point") {
	            // do nothing
	            return {
	                update: null,
	                remove: null
	            };
	        } else {
	            throw new Error("Invalid shape type " + type);
	        }
	    },

	    _combine: function _combine(type, coords) {
	        return {
	            type: type,
	            coords: coords
	        };
	    },

	    polygon: {
	        equal: orderInsensitiveCoordsEqual
	    },

	    line: {
	        equal: kline.equal
	    },

	    lineSegment: {
	        equal: orderInsensitiveCoordsEqual
	    },

	    angle: {
	        equal: function equal(points1, points2) {
	            if (!kpoint.equal(points1[1], points2[1])) {
	                return false;
	            }

	            var line1_0 = [points1[1], points1[0]];
	            var line1_2 = [points1[1], points1[2]];
	            var line2_0 = [points2[1], points2[0]];
	            var line2_2 = [points2[1], points2[2]];

	            var equalUnflipped = kray.equal(line1_0, line2_0) && kray.equal(line1_2, line2_2);
	            var equalFlipped = kray.equal(line1_0, line2_2) && kray.equal(line1_2, line2_0);

	            return equalUnflipped || equalFlipped;
	        },

	        defaultOptions: {
	            reflex: false
	        }
	    },

	    circle: {
	        equal: function equal(points1, points2) {
	            var radius1 = kpoint.distanceToPoint(points1[0], points1[1]);
	            var radius2 = kpoint.distanceToPoint(points2[0], points2[1]);
	            return kpoint.equal(points1[0], points2[0]) && knumber.equal(radius1, radius2);
	        }
	    },

	    point: {
	        equal: kpoint.equal
	    }
	};

	var TransformationsShapeEditor = React.createClass({
	    displayName: "TransformationsShapeEditor",

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(Graph, {
	                ref: "graph",
	                box: this.props.graph.box,
	                range: this.props.graph.range,
	                labels: this.props.graph.labels,
	                step: this.props.graph.step,
	                gridStep: this.props.graph.gridStep,
	                markings: this.props.graph.markings,
	                backgroundImage: this.props.graph.backgroundImage,
	                onGraphieUpdated: this.setupGraphie }),
	            React.createElement(
	                "select",
	                {
	                    key: "type-select",
	                    value: this.getTypeString(this.props.shape.type),
	                    onChange: this.changeType },
	                React.createElement(
	                    "option",
	                    { value: "polygon-3" },
	                    "Triangle"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "polygon-4" },
	                    "Quadrilateral"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "polygon-5" },
	                    "Pentagon"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "polygon-6" },
	                    "Hexagon"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "line" },
	                    "Line"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "line,line" },
	                    "2 lines"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "lineSegment" },
	                    "Line segment"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "lineSegment,lineSegment" },
	                    ' ',
	                    "2 line segments",
	                    ' '
	                ),
	                React.createElement(
	                    "option",
	                    { value: "angle" },
	                    "Angle"
	                ),
	                React.createElement(
	                    "option",
	                    { value: "circle" },
	                    "Circle"
	                )
	            )
	        );
	    },

	    /* Return the option string for a given type */
	    getTypeString: function getTypeString(type) {
	        if (_.isArray(type)) {
	            return _.map(type, this.getTypeString).join(",");
	        } else if (type === "polygon") {
	            return "polygon-" + this.props.shape.coords.length;
	        } else {
	            return type;
	        }
	    },

	    /* Change the type on the window event e
	     *
	     * e.target.value is the new type string
	     */
	    changeType: function changeType(e) {
	        var types = String(e.target.value).split(",");
	        var pointCount = arraySum(_.map(types, ShapeTypes.getPointCountForType));

	        var radius = scaleToRange(4, this.refs.graph.props.range);
	        var offset = (1 / 2 - 1 / pointCount) * 180;
	        var coords = _.times(pointCount, function (i) {
	            return kpoint.rotateDeg([radius, 0], 360 * i / pointCount + offset);
	        });

	        this.props.onChange({
	            shape: {
	                type: types,
	                coords: coords,
	                options: ShapeTypes.defaultOptions(types)
	            }
	        });
	    },

	    componentDidMount: function componentDidMount() {
	        this.setupGraphie(this.refs.graph.graphie());
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        if (!deepEq(prevProps.shape, this.props.shape)) {
	            this.refs.graph.reset();
	        }
	    },

	    updateCoords: function updateCoords() {
	        this.props.onChange({
	            shape: this.shape.toJSON()
	        });
	    },

	    setupGraphie: function setupGraphie(graphie) {
	        this.shape = ShapeTypes.addMovableShape(graphie, {
	            editable: true,
	            snap: graphie.snap,
	            shape: this.props.shape,
	            onMoveEnd: this.updateCoords
	        });
	    }

	});

	var TransformerEditor = React.createClass({
	    displayName: "TransformerEditor",

	    // TODO (jack): These should be refactored into a nice object at the top
	    // so that we don't have all this duplication
	    getDefaultProps: function getDefaultProps() {
	        return defaultTransformerProps;
	    },

	    render: function render() {
	        // Fill in any missing value in this.props.graph
	        // this can happen because the graph json doesn't include
	        // box, for example
	        var graph = _.extend(defaultGraphProps(this.props.graph, 340), this.props.graph);

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                null,
	                React.createElement(PropCheckBox, {
	                    label: "Grade empty answers as wrong:",
	                    gradeEmpty: this.props.gradeEmpty,
	                    onChange: this.props.onChange }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    React.createElement(
	                        "p",
	                        null,
	                        "We generally do not grade empty answers. This usually works well, but sometimes can result in giving away part of an answer in a multi-part question."
	                    ),
	                    React.createElement(
	                        "p",
	                        null,
	                        "If this is a multi-part question (there is another widget), you probably want to enable this option. Otherwise, you should leave it disabled."
	                    ),
	                    React.createElement(
	                        "p",
	                        null,
	                        "Confused? Talk to Elizabeth."
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Graph settings:"
	            ),
	            React.createElement(GraphSettings, {
	                box: graph.box,
	                labels: graph.labels,
	                range: graph.range,
	                step: graph.step,
	                gridStep: graph.gridStep,
	                valid: graph.valid,
	                backgroundImage: graph.backgroundImage,
	                markings: graph.markings,
	                showProtractor: graph.showProtractor,
	                onChange: this.changeGraph }),
	            React.createElement(
	                "div",
	                null,
	                "Transformation settings:"
	            ),
	            React.createElement(TransformationExplorerSettings, {
	                ref: "transformationSettings",
	                graphMode: this.props.graphMode,
	                listMode: this.props.listMode,
	                tools: this.props.tools,
	                drawSolutionShape: this.props.drawSolutionShape,
	                onChange: this.props.onChange }),
	            React.createElement(
	                "div",
	                null,
	                "Starting location:"
	            ),
	            React.createElement(TransformationsShapeEditor, {
	                ref: "shapeEditor",
	                graph: graph,
	                shape: this.props.starting.shape,
	                onChange: this.changeStarting }),
	            React.createElement(
	                "div",
	                null,
	                "Solution transformations:"
	            ),
	            React.createElement(Transformer, {
	                ref: "explorer",
	                graph: graph,
	                graphMode: this.props.graphMode,
	                listMode: this.props.listMode,
	                gradeEmpty: this.props.gradeEmpty,
	                tools: this.props.tools,
	                drawSolutionShape: this.props.drawSolutionShape,
	                starting: this.props.starting,
	                correct: this.props.starting,
	                transformations: this.props.correct.transformations,
	                onChange: this.changeTransformer,
	                trackInteraction: function trackInteraction() {}
	            })
	        );
	    },

	    // propagate a props change on our graph settings to
	    // this.props.graph
	    changeGraph: function changeGraph(graphChanges, callback) {
	        var newGraph = _.extend({}, this.props.graph, graphChanges);
	        this.props.onChange({
	            graph: newGraph
	        }, callback);
	    },

	    // propagate a props change on our starting graph to
	    // this.props.starting
	    changeStarting: function changeStarting(startingChanges) {
	        var newStarting = _.extend({}, this.props.starting, startingChanges);
	        this.props.onChange({
	            starting: newStarting
	        });
	    },

	    // propagate a transformations change onto correct.transformations
	    changeTransformer: function changeTransformer(changes, callback) {
	        if (changes.transformations) {
	            changes.correct = {
	                transformations: changes.transformations
	            };
	            delete changes.transformations;
	        }
	        this.props.onChange(changes, callback);
	    },

	    serialize: function serialize() {
	        var json = this.refs.explorer.getEditorJSON();
	        json.correct = json.answer;
	        delete json.answer;
	        return json;
	    }
	});

	module.exports = TransformerEditor;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-redeclare, no-undef, no-unused-vars, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	// TODO(joel): teach KAS how to accept an answer only if it's expressed in
	// terms of a certain type.
	// TODO(joel): Allow sigfigs within a range rather than an exact expected
	// value?

	var lens = __webpack_require__(195);
	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var ApiClassNames = __webpack_require__(7).ClassNames;
	var ApiOptions = __webpack_require__(7).Options;
	var Changeable = __webpack_require__(172);
	var MathOutput = __webpack_require__(193);

	var _require = __webpack_require__(194);

	var SignificantFigures = _require.SignificantFigures;
	var displaySigFigs = _require.displaySigFigs;


	var ALL = "all";
	var SOME = "some";
	var MAX_SIGFIGS = 10;

	var countSigfigs = function countSigfigs(value) {
	    return new SignificantFigures(value).sigFigs;
	};

	var sigfigPrint = function sigfigPrint(num, sigfigs) {
	    return displaySigFigs(num, sigfigs, -MAX_SIGFIGS, false);
	};

	/* I just wrote this, but it's old by analogy to `OldExpression`, in that it's
	 * the version that non-mathquill platforms get stuck with. Constructed with an
	 * <input>, a parser, popsicle sticks, and glue.
	 *
	 * In the same way as OldExpression, this parses continuously as you type, then
	 * shows and hides an error buddy. The error message is only shown after a
	* rolling two second delay, but hidden immediately on further typing.
	 */
	var OldUnitInput = React.createClass({
	    displayName: "OldUnitInput",

	    mixins: [Changeable],

	    propTypes: {
	        value: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            apiOptions: ApiOptions.defaults,
	            value: ""
	        };
	    },

	    // TODO(joel) think about showing the error buddy
	    render: function render() {
	        var inputType = this.props.apiOptions.staticRender ? React.createFactory(MathOutput) : React.DOM.input;
	        var input = inputType({
	            onChange: this.handleChange,
	            ref: "input",
	            className: ApiClassNames.INTERACTIVE,
	            value: this.props.value,
	            onFocus: this.handleFocus,
	            onBlur: this.handleBlur
	        });

	        return React.createElement(
	            "div",
	            { className: "old-unit-input" },
	            input,
	            React.createElement(
	                "div",
	                { ref: "error",
	                    className: "error",
	                    style: { display: "none" } },
	                i18n._("I don't understand that")
	            )
	        );
	    },

	    _errorTimeout: null,

	    _showError: function _showError() {
	        if (this.props.value === "") {
	            return;
	        }

	        var $error = $(ReactDOM.findDOMNode(this.refs.error));
	        if (!$error.is(":visible")) {
	            $error.css({ top: 50, opacity: 0.1 }).show().animate({ top: 0, opacity: 1.0 }, 300);
	        }
	    },

	    _hideError: function _hideError() {
	        var $error = $(ReactDOM.findDOMNode(this.refs.error));
	        if ($error.is(":visible")) {
	            $error.animate({ top: 50, opacity: 0.1 }, 300, function () {
	                $(this).hide();
	            });
	        }
	    },

	    componentDidUpdate: function componentDidUpdate() {
	        clearTimeout(this._errorTimeout);
	        if (KAS.unitParse(this.props.value).parsed) {
	            this._hideError();
	        } else {
	            this._errorTimeout = setTimeout(this._showError, 2000);
	        }
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        clearTimeout(this._errorTimeout);
	    },

	    handleBlur: function handleBlur() {
	        this.props.onBlur([]);
	        clearTimeout(this._errorTimeout);
	        if (!KAS.unitParse(this.props.value).parsed) {
	            this._showError();
	        }
	    },

	    handleChange: function handleChange(event) {
	        this._hideError();
	        this.props.onChange({ value: event.target.value });
	    },

	    simpleValidate: function simpleValidate(rubric, onInputError) {
	        onInputError = onInputError || function () {};
	        return OldUnitInput.validate(this.getUserInput(), rubric);
	    },

	    getUserInput: function getUserInput() {
	        return this.props.value;
	    },

	    // begin mobile stuff

	    getInputPaths: function getInputPaths() {
	        // The widget itself is an input, so we return a single empty list to
	        // indicate this.
	        return [[]];
	    },

	    focusInputPath: function focusInputPath(inputPath) {
	        ReactDOM.findDOMNode(this.refs.input).focus();
	    },

	    handleFocus: function handleFocus() {
	        this.props.onFocus([]);
	    },

	    blurInputPath: function blurInputPath(inputPath) {
	        ReactDOM.findDOMNode(this.refs.input).blur();
	    },

	    setInputValue: function setInputValue(path, newValue, cb) {
	        this.props.onChange({
	            value: newValue
	        }, cb);
	    },

	    getDOMNodeForPath: function getDOMNodeForPath() {
	        return ReactDOM.findDOMNode(this.refs.input);
	    },

	    getGrammarTypeForPath: function getGrammarTypeForPath(inputPath) {
	        return "unit";
	    }

	});

	// Extract the primitive units from a unit expression. This first simplifies
	// `expr` to a `Mul` like "5 kg m / s^2" then removes the first term.
	var primUnits = function primUnits(expr) {
	    return expr.simplify().asMul().partition()[1].flatten().simplify();
	};

	_.extend(OldUnitInput, {
	    validate: function validate(state, rubric) {
	        var answer = KAS.unitParse(rubric.value).expr;
	        var guess = KAS.unitParse(state);
	        if (!guess.parsed) {
	            return {
	                type: "invalid",
	                message: i18n._("I couldn't understand those units.")
	            };
	        }

	        // Note: we check sigfigs, then numerical correctness, then units, so
	        // the most significant things come last, that way the user will see
	        // the most important message.
	        var message = null;

	        // did the user specify the right number of sigfigs?
	        // TODO(joel) - add a grading mode where the wrong number of sigfigs
	        // isn't marked wrong
	        var sigfigs = rubric.sigfigs;
	        var sigfigsCorrect = countSigfigs(guess.coefficient) === sigfigs;
	        if (!sigfigsCorrect) {
	            message = i18n._("Check your significant figures.");
	        }

	        // now we need to check that the answer is correct to the precision we
	        // require.
	        var numericallyCorrect;
	        try {
	            var x = new KAS.Var("x");
	            var equality = new KAS.Eq(answer.simplify(), "=", new KAS.Mul(x, guess.expr.simplify()));

	            var conversion = equality.solveLinearEquationForVariable(x);

	            // Make sure the conversion factor between the user's input answer
	            // and the canonical answer is 1, to sigfig places.
	            // TODO(joel) is this sound?
	            numericallyCorrect = Number(conversion.eval()).toPrecision(sigfigs) === Number(1).toPrecision(sigfigs);
	        } catch (e) {
	            numericallyCorrect = false;
	        }

	        if (!numericallyCorrect) {
	            message = i18n._("That answer is numerically incorrect.");
	        }

	        var kasCorrect;
	        var guessUnit = primUnits(guess.expr.simplify());
	        var answerUnit = primUnits(answer.simplify());

	        if (rubric.accepting === ALL) {
	            // We're accepting all units - KAS does the hard work of figuring
	            // out if the user's unit is equivalent to the author's unit.
	            kasCorrect = KAS.compare(guessUnit, answerUnit).equal;
	        } else {
	            // Are any of the accepted units the same as what the user entered?
	            kasCorrect = _(rubric.acceptingUnits).any(function (unit) {
	                var thisAnswerUnit = primUnits(KAS.unitParse(unit).unit.simplify());
	                return KAS.compare(thisAnswerUnit, guessUnit
	                // TODO(joel) - make this work as intended.
	                // { form: true }
	                ).equal;
	            });
	        }
	        if (!kasCorrect) {
	            var message = i18n._("Check your units.");
	        }

	        var correct = kasCorrect && numericallyCorrect && sigfigsCorrect;

	        return {
	            type: "points",
	            earned: correct ? 1 : 0,
	            total: 1,
	            message: message
	        };
	    }
	});

	module.exports = {
	    name: "unit-input",
	    displayName: "Unit",
	    defaultAlignment: "inline-block",
	    getWidget: function getWidget(enabledFeatures) {
	        // Allow toggling between the two versions of the widget
	        return OldUnitInput;
	    },
	    transform: function transform(x) {
	        return lens(x).del(["value"]).freeze();
	    },
	    version: { major: 0, minor: 1 },
	    countSigfigs: countSigfigs,
	    sigfigPrint: sigfigPrint,
	    hidden: true
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	// TODO(joel): teach KAS how to accept an answer only if it's expressed in
	// terms of a certain type.
	// TODO(joel): Allow sigfigs within a range rather than an exact expected
	// value?

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var InlineIcon = __webpack_require__(40);
	var NumberInput = __webpack_require__(175);

	var _require = __webpack_require__(39);

	var iconOk = _require.iconOk;
	var iconRemove = _require.iconRemove;

	var _require2 = __webpack_require__(194);

	var displaySigFigs = _require2.displaySigFigs;


	var ALL = "all";
	var SOME = "some";
	var MAX_SIGFIGS = 10;

	var sigfigPrint = function sigfigPrint(num, sigfigs) {
	    return displaySigFigs(num, sigfigs, -MAX_SIGFIGS, false);
	};

	// Extract the primitive units from a unit expression. This first simplifies
	// `expr` to a `Mul` like "5 kg m / s^2" then removes the first term.
	var primUnits = function primUnits(expr) {
	    return expr.simplify().asMul().partition()[1].flatten().simplify();
	};

	// Show the name of a unit and whether it's recognized by KAS.
	//
	// In the future I plan for this to show an example of a thing that would be
	// accepted in that unit.
	var UnitExample = React.createClass({
	    displayName: "UnitExample",

	    render: function render() {
	        var icon;
	        if (this.state.valid) {
	            icon = React.createElement(
	                "span",
	                null,
	                React.createElement(
	                    "span",
	                    { className: "unit-example-okay" },
	                    React.createElement(InlineIcon, iconOk)
	                ),
	                this.state.solvedExample
	            );
	        } else {
	            icon = React.createElement(
	                "span",
	                { className: "unit-example-not-okay" },
	                React.createElement(InlineIcon, iconRemove)
	            );
	        }

	        return React.createElement(
	            "div",
	            null,
	            icon,
	            " ",
	            this.props.name
	        );
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this._checkValidity(nextProps);
	    },

	    componentWillMount: function componentWillMount() {
	        this._checkValidity(this.props);
	    },

	    _checkValidity: function _checkValidity(_ref) {
	        var name = _ref.name;
	        var original = _ref.original;
	        var sigfigs = _ref.sigfigs;

	        var parseResult = KAS.unitParse(name);
	        var solvedExample = "";

	        // A unit is valid if it parses and is equivalent to the original.
	        var valid = true;

	        if (parseResult.parsed && original) {
	            var x = new KAS.Var("x");
	            var unit = parseResult.unit;

	            var equality = new KAS.Eq(original, "=", new KAS.Mul(x, unit));
	            try {
	                var answer = equality.solveLinearEquationForVariable(x);

	                // The third parameter is the least significant decimal place.
	                // I.e. the index of the last place you care about
	                // (543210.(-1)(-2)(-3) etc). We use -10 because that should
	                // always be safe since we only care up to maximum 10 decimal
	                // places.
	                solvedExample = sigfigPrint(answer.eval(), sigfigs);

	                valid = KAS.compare(primUnits(original), primUnits(unit)).equal;
	            } catch (e) {
	                valid = false;
	            }
	        } else {
	            valid = false;
	        }

	        this.setState({
	            valid: valid,
	            solvedExample: solvedExample
	        });
	    }
	});

	var UnitInputEditor = React.createClass({
	    displayName: "UnitInputEditor",

	    mixins: [Changeable, EditorJsonify],

	    propTypes: {
	        value: React.PropTypes.string,
	        acceptingUnits: React.PropTypes.arrayOf(React.PropTypes.string),
	        accepting: React.PropTypes.oneOf([ALL, SOME]),
	        sigfigs: React.PropTypes.number
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: "5x10^5 kg m / s^2",
	            accepting: ALL,
	            sigfigs: 3
	        };
	    },

	    render: function render() {
	        var _this = this;

	        var _props = this.props;
	        var acceptingUnits = _props.acceptingUnits;
	        var accepting = _props.accepting;

	        acceptingUnits = acceptingUnits || [];
	        var acceptingElem = null;
	        if (accepting === SOME) {
	            var unitsArr = acceptingUnits.map(function (name, i) {
	                return React.createElement(UnitExample, { name: name,
	                    original: _this.original || null,
	                    sigfigs: _this.props.sigfigs,
	                    key: i });
	            });

	            acceptingElem = React.createElement(
	                "div",
	                null,
	                React.createElement("input", {
	                    type: "text",
	                    defaultValue: acceptingUnits.join(", "),
	                    onChange: this.handleAcceptingUnitsChange
	                }),
	                " ",
	                "(comma-separated)",
	                unitsArr
	            );
	        }

	        return React.createElement(
	            "div",
	            { className: "unit-editor" },
	            React.createElement(
	                "div",
	                null,
	                React.createElement("input", { value: this.props.value,
	                    className: "unit-editor-canonical",
	                    onBlur: this._handleBlur,
	                    onKeyPress: this._handleBlur,
	                    onChange: this.onChange }),
	                " ",
	                this.parsed ? React.createElement(
	                    "span",
	                    { className: "unit-example-okay" },
	                    React.createElement(InlineIcon, iconOk)
	                ) : React.createElement(
	                    "span",
	                    { className: "unit-example-not-okay" },
	                    React.createElement(InlineIcon, iconRemove)
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Significant Figures:",
	                " ",
	                React.createElement(NumberInput, { value: this.props.sigfigs,
	                    onChange: this.handleSigfigChange,
	                    checkValidity: this._checkSigfigValidity,
	                    useArrowKeys: true })
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "label",
	                    null,
	                    React.createElement("input", { type: "radio",
	                        name: this.groupId,
	                        onChange: function onChange() {
	                            return _this._setAccepting(ALL);
	                        },
	                        checked: this.props.accepting === ALL }),
	                    " Any equivalent unit "
	                ),
	                React.createElement(
	                    "label",
	                    null,
	                    React.createElement("input", { type: "radio",
	                        name: this.groupId,
	                        onChange: function onChange() {
	                            return _this._setAccepting(SOME);
	                        },
	                        checked: this.props.accepting === SOME }),
	                    " Only these units "
	                )
	            ),
	            acceptingElem
	        );
	    },

	    handleAcceptingUnitsChange: function handleAcceptingUnitsChange(event) {
	        var acceptingUnits = event.target.value.split(",").map(function (str) {
	            return str.trim();
	        }).filter(function (str) {
	            return str !== "";
	        });
	        this.change({ acceptingUnits: acceptingUnits });
	    },

	    handleSigfigChange: function handleSigfigChange(sigfigs) {
	        this.change({ sigfigs: sigfigs });
	    },

	    _checkSigfigValidity: function _checkSigfigValidity(sigfigs) {
	        return sigfigs > 0 && sigfigs <= MAX_SIGFIGS;
	    },

	    _setAccepting: function _setAccepting(val) {
	        this.change({ accepting: val });
	    },

	    componentWillMount: function componentWillMount() {
	        this.groupId = _.uniqueId("accepting");
	        this._doOriginal(this.props);
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this._doOriginal(nextProps);
	    },

	    _doOriginal: function _doOriginal(props) {
	        var tryParse = KAS.unitParse(props.value);
	        this.parsed = false;

	        // Only update this state if the unit parsed *and* it has a magnitude
	        // attached to it. KAS can also parse units without magnitudes ("1.2
	        // g" vs "g").
	        if (tryParse.parsed && tryParse.type === "unitMagnitude") {
	            this.original = tryParse.expr;
	            this.parsed = true;
	        }
	    },

	    onChange: function onChange(event) {
	        this.props.onChange({ value: event.target.value });
	    },

	    getSaveWarnings: function getSaveWarnings() {
	        var _props2 = this.props;
	        var value = _props2.value;
	        var accepting = _props2.accepting;
	        var acceptingUnits = _props2.acceptingUnits;

	        var warnings = [];

	        var tryParse = KAS.unitParse(value);
	        if (!tryParse.parsed) {
	            warnings.push("Answer did not parse");
	        }

	        if (accepting === SOME && acceptingUnits.length === 0) {
	            warnings.push("There are no accepted units");
	        }

	        return warnings;
	    }
	});

	module.exports = UnitInputEditor;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable no-var */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/**
	 * This is a video widget for embedding videos in articles.
	 */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var FixedToResponsive = __webpack_require__(66);

	// Current default is 720p, based on the typical videos we upload currently
	var DEFAULT_WIDTH = 1280;
	var DEFAULT_HEIGHT = 720;

	var KA_EMBED = "https://{hostname}/embed_video?slug={slug}" + "&internal_video_only=1";
	var IS_URL = /^https?:\/\//;
	var IS_KA_SITE = /khanacademy\.org/;

	/**
	 * Video renderer.
	 */
	var Video = React.createClass({
	    displayName: "Video",


	    propTypes: {
	        alignment: React.PropTypes.string,
	        location: React.PropTypes.string
	    },

	    mixins: [Changeable],

	    simpleValidate: function simpleValidate(rubric) {
	        return Video.validate(null, rubric);
	    },

	    render: function render() {
	        var location = this.props.location;
	        if (!location) {
	            return React.createElement("div", null);
	        }

	        var url;

	        if (IS_URL.test(location)) {
	            url = location;
	        } else {
	            url = KA_EMBED.replace("{slug}", location);
	            var currentHostname = document.location.hostname;
	            var embedHostname = "www.khanacademy.org";
	            if (IS_KA_SITE.test(currentHostname)) {
	                embedHostname = currentHostname;
	            }
	            url = url.replace("{hostname}", embedHostname);
	        }

	        return React.createElement(
	            FixedToResponsive // @Nolint this is fine, the linter is wrong
	            ,
	            { width: DEFAULT_WIDTH,
	                height: DEFAULT_HEIGHT
	                // The key is here for the benefit of the editor, to ensure that
	                // any changes cause a re-rendering of the frame.
	                , key: location + this.props.alignment
	            },
	            React.createElement("iframe", {
	                className: "perseus-video-widget",
	                sandbox: "allow-same-origin allow-scripts",
	                width: DEFAULT_WIDTH,
	                height: DEFAULT_HEIGHT,
	                src: url,
	                allowFullScreen: true
	            })
	        );
	    }
	});

	/**
	 * This is the widget's grading function.
	 * Points for videos are tallied by the embedded video itself, in the case
	 * of Khan Academy videos.
	 */
	_.extend(Video, {
	    validate: function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "video",
	    displayName: "Video",
	    defaultAlignment: "block",
	    supportedAlignments: ["block", "float-left", "float-right", "full-width"],
	    widget: Video
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable no-var */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var InfoTip = __webpack_require__(82);
	var BlurInput = __webpack_require__(171);

	var KA_VIDEO_URL = /khanacademy\.org\/.*\/v\/(.*)$/;

	/**
	 * Turns Khan Academy URLs into the KA slugs, if possible. Any other URLs are
	 * returned unchanged.
	 */
	function getSlugFromUrl(url) {
	    var match = KA_VIDEO_URL.exec(url);
	    if (match) {
	        return match[1];
	    }
	    return url;
	}

	/**
	 * This is the main editor for this widget, to specify all the options.
	 */
	var VideoEditor = React.createClass({
	    displayName: "VideoEditor",


	    propTypes: {
	        location: React.PropTypes.string,
	        onChange: React.PropTypes.func
	    },

	    mixins: [Changeable, EditorJsonify],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            location: ""
	        };
	    },

	    _handleUrlChange: function _handleUrlChange(url) {
	        this.props.onChange({ location: getSlugFromUrl(url) });
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "label",
	                null,
	                "URL or KA Video Slug:",
	                ' ',
	                React.createElement(BlurInput, {
	                    name: "location",
	                    value: this.props.location,
	                    style: { width: 290 },
	                    onChange: this._handleUrlChange
	                }),
	                React.createElement(
	                    InfoTip,
	                    null,
	                    "You can paste any URL here. KA video URLs will be converted to just the slug."
	                )
	            )
	        );
	    }
	});

	module.exports = VideoEditor;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, comma-dangle, no-unused-vars, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/**
	 * This is an example graphie-using widget
	 *
	 * TODO(jack): Add more comments
	 */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Util = __webpack_require__(8);
	var Changeable = __webpack_require__(172);
	var WidgetJsonifyDeprecated = __webpack_require__(183);

	var Graphie = __webpack_require__(67);
	var MovablePoint = Graphie.MovablePoint;

	var knumber = __webpack_require__(197).number;
	var kpoint = __webpack_require__(197).point;

	/**
	 * This is the widget's renderer. It shows up in the right column
	 * in the demo, and is what is visible to users, and where
	 * users enter their answers.
	 */
	var ExampleGraphieWidget = React.createClass({
	    displayName: "ExampleGraphieWidget",

	    mixins: [Changeable, WidgetJsonifyDeprecated],

	    propTypes: {
	        graph: React.PropTypes.object.isRequired,
	        coord: React.PropTypes.arrayOf(React.PropTypes.number)
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            // We want to allow our coord to be null to test if the
	            // user has interacted with this widget yet when grading it
	            coord: null,
	            graph: {
	                box: [400, 400],
	                labels: ["x", "y"],
	                range: [[-10, 10], [-10, 10]],
	                step: [1, 1],
	                gridStep: [1, 1],
	                valid: true,
	                backgroundImage: null,
	                markings: "grid",
	                showProtractor: false
	            }
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            Graphie,
	            {
	                ref: "graphie",
	                box: this.props.graph.box,
	                range: this.props.graph.range,
	                options: this.props.graph,
	                setup: this.setupGraphie },
	            React.createElement(MovablePoint, {
	                pointSize: 5,
	                coord: this.props.coord || [0, 0],
	                constraints: [MovablePoint.constraints.snap(), MovablePoint.constraints.bound()],
	                onMove: this.movePoint })
	        );
	    },

	    movePoint: function movePoint(newCoord) {
	        this.change({
	            coord: newCoord
	        });
	    },

	    _getGridConfig: function _getGridConfig(options) {
	        return _.map(options.step, function (step, i) {
	            return Util.gridDimensionConfig(step, options.range[i], options.box[i], options.gridStep[i]);
	        });
	    },

	    setupGraphie: function setupGraphie(graphie, options) {
	        var gridConfig = this._getGridConfig(options);
	        graphie.graphInit({
	            range: options.range,
	            scale: _.pluck(gridConfig, "scale"),
	            axisArrows: "<->",
	            labelFormat: function labelFormat(s) {
	                return "\\small{" + s + "}";
	            },
	            gridStep: options.gridStep,
	            tickStep: _.pluck(gridConfig, "tickStep"),
	            labelStep: 1,
	            unityLabels: _.pluck(gridConfig, "unityLabel")
	        });
	        graphie.label([0, options.range[1][1]], options.labels[1], "above");
	    },

	    simpleValidate: function simpleValidate(rubric) {
	        return ExampleGraphieWidget.validate(this.getUserInput(), rubric);
	    }
	});

	/**
	 * This is the widget's grading function
	 */
	_.extend(ExampleGraphieWidget, {
	    validate: function validate(state, rubric) {
	        if (state.coord == null) {
	            return {
	                type: "invalid",
	                message: null
	            };
	        } else if (kpoint.equal(state.coord, rubric.correct)) {
	            return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else {
	            return {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: null
	            };
	        }
	    }
	});

	/**
	 * For this widget to work, we must export it.
	 * We also must require() this file in src/all-widgets.js
	 */
	module.exports = {
	    name: "example-graphie-widget",
	    displayName: "Example Graphie Widget",
	    hidden: true, // Hides this widget from the Perseus.Editor widget select
	    widget: ExampleGraphieWidget
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var ExampleGraphieWidget = __webpack_require__(151).widget;

	/**
	 * This is the widget's editor. This is what shows up on the left side
	 * of the screen in the demo page. Only the question writer sees this.
	 */
	var ExampleGraphieWidgetEditor = React.createClass({
	    displayName: "ExampleGraphieWidgetEditor",

	    mixins: [Changeable, EditorJsonify],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            correct: [4, 4],
	            graph: {
	                box: [340, 340],
	                labels: ["x", "y"],
	                range: [[-10, 10], [-10, 10]],
	                step: [1, 1],
	                gridStep: [1, 1],
	                valid: true,
	                backgroundImage: null,
	                markings: "grid",
	                showProtractor: false
	            }
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(ExampleGraphieWidget, {
	                graph: this.props.graph,
	                coord: this.props.correct,
	                onChange: this.handleChange })
	        );
	    },

	    handleChange: function handleChange(newProps) {
	        if (newProps.coord) {
	            this.change({
	                correct: newProps.coord
	            });
	        }
	    }
	});

	module.exports = ExampleGraphieWidgetEditor;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/**
	 * This is a simple number-entry widget
	 * It is not as powerful as number-input, but has a simpler, more
	 * representative structure as an example widget, and is easier to
	 * test new ideas on.
	 *
	 * TODO(jack): Add more comments
	 */

	var React = __webpack_require__(19);
	var Changeable = __webpack_require__(172);
	var _ = __webpack_require__(20);

	var TextInput = React.createClass({
	    displayName: "TextInput",

	    render: function render() {
	        return React.createElement("input", {
	            ref: "input",
	            value: this.props.value || "",
	            onChange: this.changeValue });
	    },

	    focus: function focus() {
	        this.refs.input.focus();
	        return true;
	    },

	    changeValue: function changeValue(e) {
	        // Translating from the js event e to the value
	        // of the textbox to send to onChange
	        this.props.onChange(e.target.value);
	    }
	});

	/**
	 * This is the widget's renderer. It shows up in the right column
	 * in the demo, and is what is visible to users, and where
	 * users enter their answers.
	 */
	var ExampleWidget = React.createClass({
	    displayName: "ExampleWidget",

	    propTypes: {
	        value: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: ""
	        };
	    },

	    /**
	     * Changeable creates this.change() to tell our parent to update our props
	     */
	    mixins: [Changeable],

	    render: function render() {
	        return React.createElement(TextInput, {
	            ref: "input",
	            value: this.props.value,
	            onChange: this.change("value") });
	    },

	    getUserInput: function getUserInput() {
	        return this.props.value;
	    },

	    /**
	     * Widgets that are focusable should add a focus method that returns
	     * true if focusing succeeded. The first such widget found will be
	     * focused on page load.
	     */
	    focus: function focus() {
	        this.refs.input.focus();
	        return true;
	    },

	    /**
	     * simpleValidate is called for grading. Rubric is the result of calling
	     * getUserInput() on the editor that created this widget.
	     *
	     * Should return an object representing the grading result, such as
	     * {
	     *     type: "points",
	     *     earned: 1,
	     *     total: 1,
	     *     message: null
	     * }
	     */
	    simpleValidate: function simpleValidate(rubric) {
	        return ExampleWidget.validate(this.getUserInput(), rubric);
	    }
	});

	/**
	 * This is the widget's grading function
	 */
	_.extend(ExampleWidget, {
	    /**
	     * simpleValidate generally defers to this function
	     *
	     * value is usually the result of getUserInput on the widget
	     * rubric is the result of calling serialize() on the editor
	     */
	    validate: function validate(value, rubric) {
	        if (value === "") {
	            return {
	                type: "invalid",
	                message: "It looks like you haven't answered all of the " + "question yet."
	            };
	        } else if (value === rubric.correct) {
	            return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else {
	            return {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: null
	            };
	        }
	    }
	});

	/**
	 * For this widget to work, we must require() this file in src/all-widgets.js
	 */
	module.exports = {
	    name: "example-widget",
	    displayName: "Example Widget",

	    // Tell the renderer what type of `display:` style we would like
	    // for the component wrapping this one.
	    defaultAlignment: "inline-block",

	    hidden: true, // Hides this widget from the Perseus.Editor widget select
	    widget: ExampleWidget
	};

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	/**
	 * This is the widget's editor. This is what shows up on the left side
	 * of the screen in the demo. Only the question writer sees this.
	 */
	var ExampleWidgetEditor = React.createClass({
	    displayName: "ExampleWidgetEditor",

	    mixins: [Changeable, EditorJsonify],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            correct: ""
	        };
	    },

	    handleAnswerChange: function handleAnswerChange(event) {
	        this.change({
	            correct: event.target.value
	        });
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "label",
	                null,
	                "Correct answer:",
	                React.createElement("input", {
	                    value: this.props.correct,
	                    onChange: this.handleAnswerChange,
	                    ref: "input" })
	            )
	        );
	    },

	    focus: function focus() {
	        this.refs.input.focus();
	        return true;
	    }
	});

	module.exports = ExampleWidgetEditor;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);

	var PerseusMarkdown = __webpack_require__(37);
	var mdParse = PerseusMarkdown.parse;
	var mdOutput = PerseusMarkdown.basicOutput;

	var SimpleMarkdownTester = React.createClass({
	    displayName: "SimpleMarkdownTester",

	    propTypes: {
	        value: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: ""
	        };
	    },

	    mixins: [Changeable],

	    toJSON: function toJSON() {
	        return {};
	    },

	    render: function render() {
	        var parsed = mdParse(this.props.value);
	        var output = mdOutput(parsed);
	        return React.createElement(
	            "div",
	            null,
	            output
	        );
	    },

	    /**
	     * Widgets that are focusable should add a focus method that returns
	     * true if focusing succeeded. The first such widget found will be
	     * focused on page load.
	     */
	    focus: function focus() {
	        this.refs.input.focus();
	        return true;
	    },

	    /**
	     * simpleValidate is called for grading. Rubric is the result of calling
	     * toJSON() on the editor that created this widget.
	     *
	     * Should return an object representing the grading result, such as
	     * {
	     *     type: "points",
	     *     earned: 1,
	     *     total: 1,
	     *     message: null
	     * }
	     */
	    simpleValidate: function simpleValidate(rubric) {
	        return SimpleMarkdownTester.validate(this.toJSON(), rubric);
	    }
	});

	/**
	 * This is the widget's grading function
	 */
	_.extend(SimpleMarkdownTester, {
	    /**
	     * simpleValidate generally defers to this function
	     *
	     * state is usually the result of toJSON on the widget
	     * rubric is the result of calling toJSON() on the editor
	     */
	    validate: function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    }
	});

	/**
	 * For this widget to work, we must require() this file in src/all-widgets.js
	 */
	module.exports = {
	    name: "simple-markdown-tester",
	    displayName: "Simple Markdown Tester",
	    hidden: true, // Hides this widget from the Perseus.Editor widget select
	    widget: SimpleMarkdownTester,
	    transform: _.identity
	};

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/**
	 * This is the editor for the simple-markdown-tester widget. This is what shows
	 * up on the left side of the screen in the demo. Only the question writer
	 * sees this.
	 */
	var React = __webpack_require__(19);

	var Changeable = __webpack_require__(172);
	var EditorJsonify = __webpack_require__(173);

	var TextArea = React.createClass({
	    displayName: "TextArea",

	    render: function render() {
	        return React.createElement("textarea", {
	            ref: "input",
	            value: this.props.value || "",
	            onChange: this.changeValue });
	    },

	    focus: function focus() {
	        this.refs.input.focus();
	        return true;
	    },

	    changeValue: function changeValue(e) {
	        // Translating from the js event e to the value
	        // of the textbox to send to onChange
	        this.props.onChange(e.target.value);
	    }
	});

	var SimpleMarkdownTesterEditor = React.createClass({
	    displayName: "SimpleMarkdownTesterEditor",

	    mixins: [Changeable, EditorJsonify],

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: ""
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "label",
	                null,
	                React.createElement(
	                    "div",
	                    null,
	                    "Simple markdown contents:"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(TextArea, {
	                        value: this.props.value,
	                        onChange: this.change("value"),
	                        ref: "input" })
	                )
	            )
	        );
	    },

	    focus: function focus() {
	        this.refs.input.focus();
	        return true;
	    }
	});

	module.exports = SimpleMarkdownTesterEditor;

/***/ },
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, indent, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/**
	 * A <select> component rendered with classes instead of natively,
	 * so that the classes may be styled/animated/magics
	 *
	 * Usage:
	 * <FancySelect value={1}>
	 *     <FancySelect.Option value={0}>text0</FancySelect.Option>
	 *     <FancySelect.Option value={1}>text1</FancySelect.Option>
	 *     <FancySelect.Option value={2}>text2</FancySelect.Option>
	 * </FancySelect>
	 *
	 * Here be dragons.
	 */

	var classNames = __webpack_require__(54);
	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var DROPDOWN_OFFSET = 76;
	var ITEM_HEIGHT = 48;

	var FancyOption = React.createClass({
	    displayName: "FancyOption",

	    render: function render() {
	        throw new Error("FancyOption shouldn't ever be actually rendered");
	    }
	});

	var FancySelect = React.createClass({
	    displayName: "FancySelect",


	    propTypes: {
	        value: React.PropTypes.any.isRequired,
	        className: React.PropTypes.string,
	        onChange: React.PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            onChange: function onChange() {}
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            active: false,
	            // Keep track of whether we've closed this select
	            // from open so that we can only run CSS animations
	            // when closing/opening, and not on page load
	            // If we just use active, we get a closing animation
	            // when the element loads :(.
	            closed: false,
	            // Used to namespace $(document) event handlers
	            selectorNamespace: _.uniqueId("fancy"),
	            nodeOffset: 0
	        };
	    },

	    render: function render() {
	        var _this = this;

	        // Some css-box magic:
	        // We render all of the options on top of each other in a hidden,
	        // floated span. This span then forces the <FancySelect>'s
	        // width to be large enough to fit the largest option when
	        // selected, so that the page doesn't have to re-flow when changing
	        // select items.
	        var optionSizer = React.createElement(
	            "span",
	            { style: {
	                    display: "inline-block",
	                    float: "left",
	                    visibility: "hidden",
	                    height: 0
	                } },
	            React.Children.map(this.props.children, function (option) {
	                return React.createElement(
	                    "div",
	                    { className: "fancy-select-value-hidden",
	                        style: { height: 0 } },
	                    option.props.children
	                );
	            })
	        );

	        var childCount = 0;
	        var selectedOption;
	        React.Children.forEach(this.props.children, function (option) {
	            childCount++;
	            if (option.props.value === _this.props.value) {
	                selectedOption = option;
	            }
	        });

	        var selectBoxClassName = classNames({
	            "fancy-select": true,
	            active: this.state.active,
	            closed: this.state.closed
	        });

	        var selectBox = React.createElement(
	            "div",
	            { className: selectBoxClassName,
	                onClick: this._swapActive },
	            optionSizer,
	            React.createElement(
	                "span",
	                {
	                    className: "fancy-select-value",
	                    style: { position: "absolute" } },
	                selectedOption.props.children
	            )
	        );

	        var options = React.Children.map(this.props.children, function (option, i) {
	            // options can specify visible={true|false|null/undefined} to
	            // control whether they are displayed always, never, or when
	            // active (the default). `true` is useful if you want to manage
	            // visibility manually via css.
	            var visible = option.props.visible != null ? option.props.visible : _this.state.active;
	            if (!visible) {
	                return null;
	            }

	            var className = classNames({
	                "fancy-option": true,
	                active: _this.state.active,
	                closed: _this.state.closed,
	                selected: option.props.value === _this.props.value
	            });
	            if (option.props.className) {
	                className += " " + option.props.className;
	            }

	            var translate;
	            var transition;
	            if (_this.state.active) {
	                var offset = DROPDOWN_OFFSET * i + _this.state.nodeOffset;
	                translate = "translate3d(0, " + offset + "px, 0)";
	                transition = "0.35s ease-in";
	            } else {
	                translate = "translate3d(0, 0, 0)";
	                transition = "0.35s ease-out";
	            }
	            var style = _.extend({}, option.props.style, {
	                WebkitTransform: translate,
	                transform: translate,
	                WebkitTransition: transition,
	                transition: transition
	            });

	            return React.createElement(
	                "li",
	                {
	                    className: className,
	                    style: style,
	                    onClick: function onClick() {
	                        _this._unbindClickHandler();
	                        _this.props.onChange(option.props.value, option);
	                        _this.setState({
	                            active: false,
	                            closed: true
	                        });
	                    } },
	                option.props.children
	            );
	        });

	        var optionsBoxClassName = classNames({
	            "fancy-select-options": true,
	            active: this.state.active,
	            closed: this.state.closed
	        });

	        var height = DROPDOWN_OFFSET * childCount;
	        var clipOffset = this.state.active ? this.state.nodeOffset : 0;
	        var style = {
	            clip: "rect(" + clipOffset + "px, auto, " + height + "px, 0)",
	            WebkitTransition: ".35s ease-in"
	        };

	        return React.createElement(
	            "div",
	            { className: this.props.className },
	            selectBox,
	            React.createElement(
	                "div",
	                { className: "fancy-select-options-wrapper" },
	                React.createElement(
	                    "ul",
	                    { className: optionsBoxClassName, style: style },
	                    options
	                )
	            )
	        );
	    },

	    _swapActive: function _swapActive() {
	        var active = !this.state.active;
	        var closed = !active;
	        var nodeOffset = 0;

	        // Prepare to detect clicks outside of the dropdown
	        if (active) {
	            this._bindClickHandler();
	        } else {
	            this._unbindClickHandler();
	        }

	        // We only need to know the position on screen if it's opening
	        // TODO(jared): it could be useful to recalculate this when the device
	        // is rotated. Maybe "onorientationchange"? Not sure if that is fired
	        // in a webview though.
	        if (active) {
	            var nodeBox = ReactDOM.findDOMNode(this).getBoundingClientRect();
	            var distToBottom = window.innerHeight - nodeBox.bottom;
	            // One of the children is the placeholder
	            var numOptions = React.Children.count(this.props.children) - 1;
	            var overflow = numOptions * ITEM_HEIGHT - distToBottom;
	            if (overflow > 0) {
	                nodeOffset = -overflow;
	            }
	        }

	        this.setState({
	            active: active,
	            closed: closed,
	            nodeOffset: nodeOffset
	        });
	    },

	    _bindClickHandler: function _bindClickHandler() {
	        var _this2 = this;

	        // Close the dropdown when the user clicks elsewhere
	        $(document).on("vclick." + this.state.selectorNamespace, function (e) {
	            // Detect whether the target has our React DOM node as a parent
	            var $this = $(ReactDOM.findDOMNode(_this2));
	            var $closestWidget = $(e.target).closest($this);
	            if (!$closestWidget.length) {
	                _this2._swapActive();
	            }
	        });
	    },

	    _unbindClickHandler: function _unbindClickHandler() {
	        $(document).off("." + this.state.selectorNamespace);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        this._unbindClickHandler();
	    }
	});

	FancySelect.Option = FancyOption;

	module.exports = FancySelect;

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, comma-dangle, object-curly-spacing, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp, space-unary-ops */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var Changeable = __webpack_require__(172);

	var ButtonGroup = __webpack_require__(58);
	var InfoTip = __webpack_require__(82);
	var PropCheckBox = __webpack_require__(47);
	var RangeInput = __webpack_require__(190);
	var TeX = __webpack_require__(61);
	var Util = __webpack_require__(8);
	var KhanMath = __webpack_require__(85);

	var _require = __webpack_require__(80);

	var interactiveSizes = _require.interactiveSizes;


	var defaultBackgroundImage = {
	    url: null,
	    width: 0,
	    height: 0
	};

	function numSteps(range, step) {
	    return Math.floor((range[1] - range[0]) / step);
	}

	var GraphSettings = React.createClass({
	    displayName: "GraphSettings",

	    mixins: [Changeable],

	    propTypes: {
	        editableSettings: React.PropTypes.arrayOf(React.PropTypes.oneOf(["canvas", "graph", "snap", "image", "measure"])),
	        box: React.PropTypes.arrayOf(React.PropTypes.number),
	        labels: React.PropTypes.arrayOf(React.PropTypes.string),
	        range: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)),
	        step: React.PropTypes.arrayOf(React.PropTypes.number),
	        gridStep: React.PropTypes.arrayOf(React.PropTypes.number),
	        snapStep: React.PropTypes.arrayOf(React.PropTypes.number),
	        valid: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
	        backgroundImage: React.PropTypes.object,
	        markings: React.PropTypes.oneOf(["graph", "grid", "none"]),
	        showProtractor: React.PropTypes.bool,
	        showRuler: React.PropTypes.bool,
	        rulerLabel: React.PropTypes.string,
	        rulerTicks: React.PropTypes.number
	    },

	    getInitialState: function getInitialState() {
	        return {
	            labelsTextbox: this.props.labels,
	            gridStepTextbox: this.props.gridStep,
	            snapStepTextbox: this.props.snapStep,
	            stepTextbox: this.props.step,
	            rangeTextbox: this.props.range,
	            backgroundImage: _.clone(this.props.backgroundImage)
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            editableSettings: ["graph", "snap", "image", "measure"],
	            box: [interactiveSizes.defaultBoxSizeSmall, interactiveSizes.defaultBoxSizeSmall],
	            labels: ["x", "y"],
	            range: [[-10, 10], [-10, 10]],
	            step: [1, 1],
	            gridStep: [1, 1],
	            snapStep: [1, 1],
	            valid: true,
	            backgroundImage: defaultBackgroundImage,
	            markings: "graph",
	            showProtractor: false,
	            showRuler: false,
	            rulerLabel: "",
	            rulerTicks: 10
	        };
	    },

	    render: function render() {
	        var _this = this;

	        var scale = [KhanMath.roundTo(2, Util.scaleFromExtent(this.props.range[0], this.props.box[0])), KhanMath.roundTo(2, Util.scaleFromExtent(this.props.range[1], this.props.box[1]))];

	        return React.createElement(
	            "div",
	            null,
	            _.contains(this.props.editableSettings, "canvas") && React.createElement(
	                "div",
	                { className: "graph-settings" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    "Canvas size (x,y pixels)",
	                    React.createElement(RangeInput, {
	                        value: this.props.box,
	                        onChange: function onChange(box) {
	                            _this.change({ box: box });
	                        } })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    "Scale (px per div): ",
	                    React.createElement(
	                        TeX,
	                        null,
	                        "(" + scale[0] + ", " + scale[1] + ")"
	                    )
	                )
	            ),
	            _.contains(this.props.editableSettings, "graph") && React.createElement(
	                "div",
	                { className: "graph-settings" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    React.createElement(
	                        "div",
	                        { className: "perseus-widget-left-col" },
	                        " x Label",
	                        React.createElement("input", { type: "text",
	                            className: "graph-settings-axis-label",
	                            ref: "labels-0",
	                            onChange: function onChange(e) {
	                                return _this.changeLabel(0, e);
	                            },
	                            value: this.state.labelsTextbox[0] })
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "perseus-widget-right-col" },
	                        "y Label",
	                        React.createElement("input", { type: "text",
	                            className: "graph-settings-axis-label",
	                            ref: "labels-1",
	                            onChange: function onChange(e) {
	                                return _this.changeLabel(1, e);
	                            },
	                            value: this.state.labelsTextbox[1] })
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    React.createElement(
	                        "div",
	                        { className: "perseus-widget-left-col" },
	                        "x Range",
	                        React.createElement(RangeInput, {
	                            value: this.state.rangeTextbox[0],
	                            onChange: function onChange(vals) {
	                                return _this.changeRange(0, vals);
	                            } })
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "perseus-widget-right-col" },
	                        "y Range",
	                        React.createElement(RangeInput, {
	                            value: this.state.rangeTextbox[1],
	                            onChange: function onChange(vals) {
	                                return _this.changeRange(1, vals);
	                            } })
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    React.createElement(
	                        "div",
	                        { className: "perseus-widget-left-col" },
	                        "Tick Step",
	                        React.createElement(RangeInput, { value: this.state.stepTextbox,
	                            onChange: this.changeStep })
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "perseus-widget-right-col" },
	                        "Grid Step",
	                        React.createElement(RangeInput, { value: this.state.gridStepTextbox,
	                            onChange: this.changeGridStep })
	                    )
	                ),
	                _.contains(this.props.editableSettings, "snap") && React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    React.createElement(
	                        "div",
	                        { className: "perseus-widget-left-col" },
	                        "Snap Step",
	                        React.createElement(RangeInput, { value: this.state.snapStepTextbox,
	                            onChange: this.changeSnapStep })
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    React.createElement(
	                        "label",
	                        null,
	                        "Markings:",
	                        ' ',
	                        " "
	                    ),
	                    React.createElement(ButtonGroup, { value: this.props.markings,
	                        allowEmpty: false,
	                        buttons: [{ value: "graph", content: "Graph" }, { value: "grid", content: "Grid" }, { value: "none", content: "None" }],
	                        onChange: this.change("markings") })
	                )
	            ),
	            _.contains(this.props.editableSettings, "image") && React.createElement(
	                "div",
	                { className: "image-settings" },
	                React.createElement(
	                    "div",
	                    null,
	                    "Background image:"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    "Url:",
	                    ' ',
	                    React.createElement("input", { type: "text",
	                        className: "graph-settings-background-url",
	                        ref: "bg-url",
	                        defaultValue: this.state.backgroundImage.url,
	                        onKeyPress: this.changeBackgroundUrl,
	                        onBlur: this.changeBackgroundUrl }),
	                    React.createElement(
	                        InfoTip,
	                        null,
	                        React.createElement(
	                            "p",
	                            null,
	                            "Create an image in graphie, or use the \"Add image\" function to create a background."
	                        )
	                    )
	                )
	            ),
	            _.contains(this.props.editableSettings, "measure") && React.createElement(
	                "div",
	                { className: "misc-settings" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    React.createElement(
	                        "div",
	                        { className: "perseus-widget-left-col" },
	                        React.createElement(PropCheckBox, { label: "Show ruler",
	                            showRuler: this.props.showRuler,
	                            onChange: this.change })
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "perseus-widget-right-col" },
	                        React.createElement(PropCheckBox, { label: "Show protractor",
	                            showProtractor: this.props.showProtractor,
	                            onChange: this.change })
	                    )
	                ),
	                this.props.showRuler && React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "label",
	                            null,
	                            ' ',
	                            "Ruler label:",
	                            ' ',
	                            React.createElement(
	                                "select",
	                                {
	                                    onChange: this.changeRulerLabel,
	                                    value: this.props.rulerLabel },
	                                React.createElement(
	                                    "option",
	                                    { value: "" },
	                                    "None"
	                                ),
	                                React.createElement(
	                                    "optgroup",
	                                    { label: "Metric" },
	                                    this.renderLabelChoices([["milimeters", "mm"], ["centimeters", "cm"], ["meters", "m"], ["kilometers", "km"]])
	                                ),
	                                React.createElement(
	                                    "optgroup",
	                                    { label: "Imperial" },
	                                    this.renderLabelChoices([["inches", "in"], ["feet", "ft"], ["yards", "yd"], ["miles", "mi"]])
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "label",
	                            null,
	                            ' ',
	                            "Ruler ticks:",
	                            ' ',
	                            React.createElement(
	                                "select",
	                                {
	                                    onChange: this.changeRulerTicks,
	                                    value: this.props.rulerTicks },
	                                _.map([1, 2, 4, 8, 10, 16], function (n) {
	                                    return React.createElement(
	                                        "option",
	                                        { value: n },
	                                        n
	                                    );
	                                })
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    },

	    renderLabelChoices: function renderLabelChoices(choices) {
	        return _.map(choices, function (nameAndValue) {
	            return React.createElement(
	                "option",
	                { value: nameAndValue[1] },
	                nameAndValue[0]
	            );
	        });
	    },

	    componentDidMount: function componentDidMount() {
	        this.changeGraph = _.debounce(this.changeGraph, 300);
	    },

	    validRange: function validRange(range) {
	        var numbers = _.every(range, function (num) {
	            return _.isFinite(num);
	        });
	        if (!numbers) {
	            return "Range must be a valid number";
	        }
	        if (range[0] >= range[1]) {
	            return "Range must have a higher number on the right";
	        }
	        return true;
	    },

	    validateStepValue: function validateStepValue(settings) {
	        var step = settings.step;
	        var range = settings.range;
	        var name = settings.name;
	        var minTicks = settings.minTicks;
	        var maxTicks = settings.maxTicks;


	        if (!_.isFinite(step)) {
	            return name + " must be a valid number";
	        }
	        var nSteps = numSteps(range, step);
	        if (nSteps < minTicks) {
	            return name + " is too large, there must be at least " + minTicks + " ticks.";
	        }
	        if (nSteps > maxTicks) {
	            return name + " is too small, there can be at most " + maxTicks + " ticks.";
	        }
	        return true;
	    },

	    validSnapStep: function validSnapStep(step, range) {
	        return this.validateStepValue({
	            step: step,
	            range: range,
	            name: "Snap step",
	            minTicks: 5,
	            maxTicks: 60
	        });
	    },

	    validGridStep: function validGridStep(step, range) {
	        return this.validateStepValue({
	            step: step,
	            range: range,
	            name: "Grid step",
	            minTicks: 3,
	            maxTicks: 60
	        });
	    },

	    validStep: function validStep(step, range) {
	        return this.validateStepValue({
	            step: step,
	            range: range,
	            name: "Step",
	            minTicks: 3,
	            maxTicks: 20
	        });
	    },

	    validBackgroundImageSize: function validBackgroundImageSize(image) {
	        // Ignore empty images
	        if (!image.url) {
	            return true;
	        }

	        var validSize = image.width <= 450 && image.height <= 450;

	        if (!validSize) {
	            return "Image must be smaller than 450px x 450px.";
	        }
	        return true;
	    },

	    validateGraphSettings: function validateGraphSettings(range, step, gridStep, snapStep, image) {
	        var self = this;
	        var msg = void 0;
	        var goodRange = _.every(range, function (range) {
	            msg = self.validRange(range);
	            return msg === true;
	        });
	        if (!goodRange) {
	            return msg;
	        }
	        var goodStep = _.every(step, function (step, i) {
	            msg = self.validStep(step, range[i]);
	            return msg === true;
	        });
	        if (!goodStep) {
	            return msg;
	        }
	        var goodGridStep = _.every(gridStep, function (gridStep, i) {
	            msg = self.validGridStep(gridStep, range[i]);
	            return msg === true;
	        });
	        if (!goodGridStep) {
	            return msg;
	        }
	        var goodSnapStep = _.every(snapStep, function (snapStep, i) {
	            msg = self.validSnapStep(snapStep, range[i]);
	            return msg === true;
	        });
	        if (!goodSnapStep) {
	            return msg;
	        }
	        var goodImageSize = this.validBackgroundImageSize(image);
	        if (goodImageSize !== true) {
	            msg = goodImageSize;
	            return msg;
	        }
	        return true;
	    },

	    changeLabel: function changeLabel(i, e) {
	        var val = e.target.value;
	        var labels = this.state.labelsTextbox.slice();
	        labels[i] = val;
	        this.setState({ labelsTextbox: labels }, this.changeGraph);
	    },

	    changeRange: function changeRange(i, values) {
	        var ranges = this.state.rangeTextbox.slice();
	        ranges[i] = values;
	        var step = this.state.stepTextbox.slice();
	        var gridStep = this.state.gridStepTextbox.slice();
	        var snapStep = this.state.snapStepTextbox.slice();
	        var scale = Util.scaleFromExtent(ranges[i], this.props.box[i]);
	        if (this.validRange(ranges[i]) === true) {
	            step[i] = Util.tickStepFromExtent(ranges[i], this.props.box[i]);
	            gridStep[i] = Util.gridStepFromTickStep(step[i], scale);
	            snapStep[i] = gridStep[i] / 2;
	        }
	        this.setState({
	            stepTextbox: step,
	            gridStepTextbox: gridStep,
	            snapStepTextbox: snapStep,
	            rangeTextbox: ranges
	        }, this.changeGraph);
	    },

	    changeStep: function changeStep(step) {
	        this.setState({ stepTextbox: step }, this.changeGraph);
	    },

	    changeSnapStep: function changeSnapStep(snapStep) {
	        this.setState({ snapStepTextbox: snapStep }, this.changeGraph);
	    },

	    changeGridStep: function changeGridStep(gridStep) {
	        this.setState({
	            gridStepTextbox: gridStep,
	            snapStepTextbox: _.map(gridStep, function (step) {
	                return step / 2;
	            })
	        }, this.changeGraph);
	    },

	    changeGraph: function changeGraph() {
	        var labels = this.state.labelsTextbox;
	        var range = _.map(this.state.rangeTextbox, function (range) {
	            return _.map(range, Number);
	        });
	        var step = _.map(this.state.stepTextbox, Number);
	        var gridStep = this.state.gridStepTextbox;
	        var snapStep = this.state.snapStepTextbox;
	        var image = this.state.backgroundImage;

	        // validationResult is either:
	        //   true -> the settings are valid
	        //   a string -> the settings are invalid, and the explanation
	        //               is contained in the string
	        // TODO(aria): Refactor this to not be confusing
	        var validationResult = this.validateGraphSettings(range, step, gridStep, snapStep, image);

	        if (validationResult === true) {
	            // either true or a string
	            this.change({
	                valid: true,
	                labels: labels,
	                range: range,
	                step: step,
	                gridStep: gridStep,
	                snapStep: snapStep,
	                backgroundImage: image
	            });
	        } else {
	            this.change({
	                valid: validationResult // a string message, not false
	            });
	        }
	    },

	    changeBackgroundUrl: function changeBackgroundUrl(e) {
	        var _this2 = this;

	        // Only continue on blur or "enter"
	        if (e.type === "keypress" && e.key !== "Enter") {
	            return;
	        }

	        var setUrl = function setUrl(url, width, height) {
	            var image = _.clone(_this2.props.backgroundImage);
	            image.url = url;
	            image.width = width;
	            image.height = height;
	            _this2.setState({
	                backgroundImage: image
	            }, _this2.changeGraph);
	        };

	        var url = ReactDOM.findDOMNode(this.refs["bg-url"]).value;
	        if (url) {
	            Util.getImageSize(url, function (width, height) {
	                if (_this2.isMounted()) {
	                    setUrl(url, width, height);
	                }
	            });
	        } else {
	            setUrl(null, 0, 0);
	        }
	    },

	    // TODO(aria): Make either a wrapper for standard events to work
	    // with this.change, or make these use some TextInput/NumberInput box
	    changeRulerLabel: function changeRulerLabel(e) {
	        this.change({ rulerLabel: e.target.value });
	    },

	    changeRulerTicks: function changeRulerTicks(e) {
	        this.change({ rulerTicks: +e.target.value });
	    }
	});

	module.exports = GraphSettings;

/***/ },
/* 188 */,
/* 189 */,
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var NumberInput = __webpack_require__(175);

	var truth = function truth() {
	    return true;
	};

	/* A minor abstraction on top of NumberInput for ranges
	 *
	 */
	var RangeInput = React.createClass({
	    displayName: "RangeInput",

	    propTypes: {
	        value: React.PropTypes.array.isRequired,
	        onChange: React.PropTypes.func.isRequired,
	        placeholder: React.PropTypes.array,
	        checkValidity: React.PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            placeholder: [null, null]
	        };
	    },

	    render: function render() {
	        var value = this.props.value;
	        var _checkValidity = this.props.checkValidity || truth;

	        return React.createElement(
	            "div",
	            { className: "range-input" },
	            React.createElement(NumberInput, _extends({}, this.props, {
	                value: value[0],
	                checkValidity: function checkValidity(val) {
	                    return _checkValidity([val, value[1]]);
	                },
	                onChange: this.onChange.bind(this, 0),
	                placeholder: this.props.placeholder[0] })),
	            React.createElement(NumberInput, _extends({}, this.props, {
	                value: value[1],
	                checkValidity: function checkValidity(val) {
	                    return _checkValidity([value[0], val]);
	                },
	                onChange: this.onChange.bind(this, 1),
	                placeholder: this.props.placeholder[1] }))
	        );
	    },

	    onChange: function onChange(i, newVal) {
	        var value = this.props.value;
	        if (i === 0) {
	            this.props.onChange([newVal, value[1]]);
	        } else {
	            this.props.onChange([value[0], newVal]);
	        }
	    }

	});

	module.exports = RangeInput;

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, comma-dangle, no-redeclare, no-var, object-curly-spacing, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var Util = __webpack_require__(8);
	var GraphUtils = __webpack_require__(165);

	var _require = __webpack_require__(80);

	var interactiveSizes = _require.interactiveSizes;


	var SvgImage = __webpack_require__(32);

	var defaultBackgroundImage = {
	    url: null
	};

	/* Style objects */
	var defaultInstructionsStyle = {
	    fontStyle: 'italic',
	    fontWeight: 'bold',
	    fontSize: '32px',
	    width: '100%',
	    height: '100%',
	    textAlign: 'center',
	    backgroundColor: 'white',
	    position: 'absolute',
	    zIndex: 1,
	    transition: 'opacity .25s ease-in-out',
	    '-moz-transition': 'opacity .25s ease-in-out',
	    '-webkit-transition': 'opacity .25s ease-in-out'
	};

	var instructionsTextStyle = {
	    position: 'relative',
	    top: '25%'
	};

	function numSteps(range, step) {
	    return Math.floor((range[1] - range[0]) / step);
	}

	var Graph = React.createClass({
	    displayName: "Graph",

	    propTypes: {
	        box: React.PropTypes.array.isRequired,
	        labels: React.PropTypes.arrayOf(React.PropTypes.string),
	        range: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)),
	        step: React.PropTypes.arrayOf(React.PropTypes.number),
	        gridStep: React.PropTypes.arrayOf(React.PropTypes.number),
	        snapStep: React.PropTypes.arrayOf(React.PropTypes.number),
	        markings: React.PropTypes.string,
	        backgroundImage: React.PropTypes.shape({
	            url: React.PropTypes.string
	        }),
	        showProtractor: React.PropTypes.bool,
	        showRuler: React.PropTypes.bool,
	        rulerLabel: React.PropTypes.string,
	        rulerTicks: React.PropTypes.number,
	        onGraphieUpdated: React.PropTypes.func,
	        instructions: React.PropTypes.string,
	        onClick: React.PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            labels: ["x", "y"],
	            range: [[-10, 10], [-10, 10]],
	            step: [1, 1],
	            gridStep: [1, 1],
	            snapStep: [0.5, 0.5],
	            markings: "graph",
	            backgroundImage: defaultBackgroundImage,
	            showProtractor: false,
	            showRuler: false,
	            rulerLabel: "",
	            rulerTicks: 10,
	            instructions: null,
	            onGraphieUpdated: null,
	            onClick: null,
	            onMouseDown: null
	        };
	    },

	    render: function render() {
	        var image;
	        var imageData = this.props.backgroundImage;
	        if (imageData.url) {
	            var scale = this.props.box[0] / interactiveSizes.defaultBoxSize;
	            image = React.createElement(SvgImage, { src: imageData.url,
	                width: imageData.width,
	                height: imageData.height,
	                scale: scale,
	                responsive: false });
	        } else {
	            image = null;
	        }

	        return React.createElement(
	            "div",
	            {
	                className: "graphie-container above-scratchpad",
	                style: {
	                    width: this.props.box[0],
	                    height: this.props.box[1]
	                },
	                onMouseOut: this.onMouseOut,
	                onMouseOver: this.onMouseOver,
	                onClick: this.onClick },
	            image,
	            React.createElement("div", { className: "graphie", ref: "graphieDiv" })
	        );
	    },

	    componentDidMount: function componentDidMount() {
	        this._setupGraphie(true);
	    },

	    componentDidUpdate: function componentDidUpdate() {
	        // Only setupGraphie once per componentDidUpdate().
	        // See explanation in setupGraphie().
	        this._hasSetupGraphieThisUpdate = false;
	        if (this._shouldSetupGraphie) {
	            this._setupGraphie(false);
	            this._shouldSetupGraphie = false;
	        }
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var potentialChanges = ["labels", "range", "step", "markings", "showProtractor", "showRuler", "rulerLabel", "rulerTicks", "gridStep", "snapStep"];
	        var self = this;
	        _.each(potentialChanges, function (prop) {
	            if (!_.isEqual(self.props[prop], nextProps[prop])) {
	                self._shouldSetupGraphie = true;
	            }
	        });
	    },

	    /* Reset the graphie canvas to its initial state
	     *
	     * Use when re-rendering the parent component and you need a blank
	     * graphie.
	     */
	    reset: function reset() {
	        this._setupGraphie(false);
	    },

	    graphie: function graphie() {
	        return this._graphie;
	    },

	    pointsFromNormalized: function pointsFromNormalized(coordsList, noSnap) {
	        var self = this;
	        return _.map(coordsList, function (coords) {
	            return _.map(coords, function (coord, i) {
	                var range = self.props.range[i];
	                if (noSnap) {
	                    return range[0] + (range[1] - range[0]) * coord;
	                } else {
	                    var step = self.props.step[i];
	                    var nSteps = numSteps(range, step);
	                    var tick = Math.round(coord * nSteps);
	                    return range[0] + step * tick;
	                }
	            });
	        });
	    },

	    _setupGraphie: function _setupGraphie(initialMount) {
	        // Only setupGraphie once per componentDidUpdate().
	        // This prevents this component from rendering graphie
	        // and then immediately re-render graphie because its
	        // parent component asked it to. This will happen when
	        // props on the parent and props on this component both
	        // require graphie to be re-rendered.
	        if (this._hasSetupGraphieThisUpdate) {
	            return;
	        }

	        var graphieDiv = ReactDOM.findDOMNode(this.refs.graphieDiv);
	        $(graphieDiv).empty();
	        var labels = this.props.labels;
	        var range = this.props.range;
	        var graphie = this._graphie = GraphUtils.createGraphie(graphieDiv);

	        var gridConfig = this._getGridConfig();
	        graphie.snap = this.props.snapStep;

	        if (this.props.markings === "graph") {
	            graphie.graphInit({
	                range: range,
	                scale: _.pluck(gridConfig, "scale"),
	                axisArrows: "<->",
	                labelFormat: function labelFormat(s) {
	                    return "\\small{" + s + "}";
	                },
	                gridStep: this.props.gridStep,
	                tickStep: _.pluck(gridConfig, "tickStep"),
	                labelStep: 1,
	                unityLabels: _.pluck(gridConfig, "unityLabel")
	            });
	            graphie.label([0, range[1][1]], labels[1], "above");
	            graphie.label([range[0][1], 0], labels[0], "right");
	        } else if (this.props.markings === "grid") {
	            graphie.graphInit({
	                range: range,
	                scale: _.pluck(gridConfig, "scale"),
	                gridStep: this.props.gridStep,
	                axes: false,
	                ticks: false,
	                labels: false
	            });
	        } else if (this.props.markings === "none") {
	            graphie.init({
	                range: range,
	                scale: _.pluck(gridConfig, "scale")
	            });
	        }

	        // Add instructions just before mouse layer
	        var visible = 0.5;
	        var invisible = 0.0;
	        var $instructionsWrapper;
	        if (this.props.instructions) {
	            var $instructionsWrapper = $("<div/>");
	            _.each(defaultInstructionsStyle, function (value, key) {
	                $instructionsWrapper.css(key, value);
	            });
	            $instructionsWrapper.css("opacity", visible);

	            var $instructions = $("<span/>", {
	                text: this.props.instructions
	            });
	            _.each(instructionsTextStyle, function (value, key) {
	                $instructions.css(key, value);
	            });

	            $instructionsWrapper.append($instructions);
	            $(graphieDiv).append($instructionsWrapper);
	        } else {
	            $instructionsWrapper = undefined;
	        }

	        // Add some handlers for instructions text (if necessary)
	        var onMouseDown = $instructionsWrapper || this.props.onMouseDown ? _.bind(function (coord) {
	            if ($instructionsWrapper) {
	                $instructionsWrapper.remove();
	                $instructionsWrapper = null;
	            }
	            this.props.onMouseDown(coord);
	        }, this) : null;

	        var onMouseOver = $instructionsWrapper ? function () {
	            $instructionsWrapper && $instructionsWrapper.css("opacity", invisible);
	        } : null;

	        var onMouseOut = $instructionsWrapper ? function () {
	            $instructionsWrapper && $instructionsWrapper.css("opacity", visible);
	        } : null;

	        graphie.addMouseLayer({
	            onClick: this.props.onClick,
	            onMouseDown: onMouseDown,
	            onMouseOver: onMouseOver,
	            onMouseOut: onMouseOut,
	            onMouseUp: this.props.onMouseUp,
	            onMouseMove: this.props.onMouseMove,
	            allowScratchpad: true
	        });

	        this._updateProtractor();
	        this._updateRuler();

	        // We set this flag before jumping into our callback
	        // to avoid recursing if our callback calls reset() itself
	        this._hasSetupGraphieThisUpdate = true;
	        if (!initialMount && this.props.onGraphieUpdated) {
	            // Calling a parent callback in componentDidMount is bad and
	            // results in hard-to-reason-about lifecycle problems (esp. with
	            // refs), so we do it only on update and rely on the parent to
	            // query for the graphie object on initial mount
	            this.props.onGraphieUpdated(graphie);
	        }
	    },

	    _getGridConfig: function _getGridConfig() {
	        var self = this;
	        return _.map(self.props.step, function (step, i) {
	            return Util.gridDimensionConfig(step, self.props.range[i], self.props.box[i], self.props.gridStep[i]);
	        });
	    },

	    _updateProtractor: function _updateProtractor() {
	        if (this.protractor) {
	            this.protractor.remove();
	        }

	        if (this.props.showProtractor) {
	            var coord = this.pointsFromNormalized([[0.50, 0.05]])[0];
	            this.protractor = this._graphie.protractor(coord);
	        }
	    },

	    _updateRuler: function _updateRuler() {
	        if (this.ruler) {
	            this.ruler.remove();
	        }

	        if (this.props.showRuler) {
	            var coord = this.pointsFromNormalized([[0.50, 0.25]])[0];
	            var extent = this._graphie.range[0][1] - this._graphie.range[0][0];
	            this.ruler = this._graphie.ruler({
	                center: coord,
	                label: this.props.rulerLabel,
	                pixelsPerUnit: this._graphie.scale[0],
	                ticksPerUnit: this.props.rulerTicks,
	                units: Math.round(0.8 * extent)
	            });
	        }
	    },

	    toJSON: function toJSON() {
	        return _.pick(this.props, 'range', 'step', 'markings', 'labels', 'backgroundImage', 'showProtractor', 'showRuler', 'rulerLabel', 'rulerTicks', 'gridStep', 'snapStep');
	    }
	});

	module.exports = Graph;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, indent, max-len, no-irregular-whitespace, no-var, one-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(33);
	var _ = __webpack_require__(20);

	var Util = __webpack_require__(8);
	var Renderer = __webpack_require__(30);

	var ApiClassNames = __webpack_require__(7).ClassNames;

	var PREFIX = "perseus-sortable";

	// A placeholder that appears in the sortable whenever an item is dragged.
	var Placeholder = React.createClass({
	    displayName: "Placeholder",

	    propTypes: {
	        width: React.PropTypes.number.isRequired,
	        height: React.PropTypes.number.isRequired
	    },

	    render: function render() {
	        var className = [PREFIX + "-card", PREFIX + "-placeholder"].join(" ");
	        var style = { width: this.props.width, height: this.props.height };

	        if (this.props.margin != null) {
	            style.margin = this.props.margin;
	        }

	        return React.createElement("li", { className: className, style: style });
	    }
	});

	var STATIC = "static",
	    DRAGGING = "dragging",
	    ANIMATING = "animating",
	    DISABLED = "disabled";

	// A draggable item in the sortable. Can be in one of four states:
	//     Static:    The item is not being interacted with.
	//     Dragging:  The item is being dragged.
	//     Animating: The item has been released, and is moving to its destination.
	//     Disabled:  The item cannot be interacted with.
	//
	// Usual flow:      Static -> Dragging -> Animating -> Static
	// [Dis|en]abling:  Static|Dragging|Animating -> Disabled -> Static
	var Draggable = React.createClass({
	    displayName: "Draggable",

	    propTypes: {
	        type: React.PropTypes.oneOf([STATIC, DRAGGING, ANIMATING, DISABLED]),
	        content: React.PropTypes.string.isRequired,
	        endPosition: React.PropTypes.object.isRequired,
	        onRender: React.PropTypes.func.isRequired,
	        onMouseDown: React.PropTypes.func.isRequired,
	        onMouseMove: React.PropTypes.func.isRequired,
	        onMouseUp: React.PropTypes.func.isRequired,
	        onAnimationEnd: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            type: STATIC
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            startPosition: { left: 0, top: 0 },
	            startMouse: { left: 0, top: 0 },
	            mouse: { left: 0, top: 0 }
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        this.isMouseMoveUpBound = false;
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        // Event handlers should be unbound before component unmounting, but
	        // just in case...
	        if (this.isMouseMoveUpBound) {
	            this.unbindMouseMoveUp();
	        }
	    },

	    getCurrentPosition: function getCurrentPosition() {
	        return {
	            left: this.state.startPosition.left + this.state.mouse.left - this.state.startMouse.left,
	            top: this.state.startPosition.top + this.state.mouse.top - this.state.startMouse.top
	        };
	    },

	    render: function render() {
	        var className = [PREFIX + "-card", PREFIX + "-draggable", PREFIX + "-" + this.props.type, ApiClassNames.INTERACTIVE].join(" ");

	        var style = {
	            position: "static"
	        };

	        if (this.props.type === DRAGGING || this.props.type === ANIMATING) {
	            _.extend(style, { position: "absolute" }, this.getCurrentPosition());
	        }

	        if (this.props.width) {
	            style.width = this.props.width + 1; // Fix for non-integer widths
	        }
	        if (this.props.height) {
	            style.height = this.props.height;
	        }
	        if (this.props.margin != null) {
	            style.margin = this.props.margin;
	        }

	        return React.createElement(
	            "li",
	            {
	                className: className,
	                style: style,
	                onMouseDown: this.onMouseDown,
	                onTouchStart: this.onMouseDown,
	                onTouchMove: this.onMouseMove,
	                onTouchEnd: this.onMouseUp,
	                onTouchCancel: this.onMouseUp },
	            React.createElement(Renderer, {
	                content: this.props.content,
	                onRender: this.props.onRender })
	        );
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        if (this.props.type === prevProps.type) {
	            return;
	        }

	        if (this.props.type === ANIMATING) {
	            // Start animating
	            var current = this.getCurrentPosition();
	            var duration = 15 * Math.sqrt(Math.sqrt(Math.pow(this.props.endPosition.left - current.left, 2) + Math.pow(this.props.endPosition.top - current.top, 2)));

	            $(ReactDOM.findDOMNode(this)).animate(this.props.endPosition, {
	                duration: Math.max(duration, 1),
	                // Animating -> Static
	                complete: this.props.onAnimationEnd
	            });
	        } else if (this.props.type === STATIC) {
	            // Ensure that any animations are done
	            $(ReactDOM.findDOMNode(this)).finish();
	        }
	    },

	    bindMouseMoveUp: function bindMouseMoveUp() {
	        this.isMouseMoveUpBound = true;
	        $(document).on("mousemove", this.onMouseMove);
	        $(document).on("mouseup", this.onMouseUp);
	    },

	    unbindMouseMoveUp: function unbindMouseMoveUp() {
	        this.isMouseMoveUpBound = false;
	        $(document).off("mousemove", this.onMouseMove);
	        $(document).off("mouseup", this.onMouseUp);
	    },

	    onMouseDown: function onMouseDown(event) {
	        if (this.props.type !== STATIC) {
	            return;
	        }

	        if (!(event.button === 0 || event.touches != null && event.touches.length === 1)) {
	            return;
	        }

	        event.preventDefault();
	        var loc = Util.extractPointerLocation(event);
	        if (loc) {
	            this.setState({
	                startPosition: $(ReactDOM.findDOMNode(this)).position(),
	                startMouse: loc,
	                mouse: loc
	            }, function () {
	                this.bindMouseMoveUp();

	                // Static -> Dragging
	                this.props.onMouseDown();
	            });
	        }
	    },

	    onMouseMove: function onMouseMove(event) {
	        if (this.props.type !== DRAGGING) {
	            return;
	        }

	        event.preventDefault();
	        var loc = Util.extractPointerLocation(event);
	        if (loc) {
	            this.setState({
	                mouse: loc
	            }, this.props.onMouseMove);
	        }
	    },

	    onMouseUp: function onMouseUp(event) {
	        if (this.props.type !== DRAGGING) {
	            return;
	        }

	        event.preventDefault();
	        var loc = Util.extractPointerLocation(event);
	        if (loc) {
	            this.unbindMouseMoveUp();

	            // Dragging -> Animating
	            this.props.onMouseUp();
	        }
	    }
	});

	var HORIZONTAL = "horizontal",
	    VERTICAL = "vertical";

	// The main sortable component.
	var Sortable = React.createClass({
	    displayName: "Sortable",

	    propTypes: {
	        options: React.PropTypes.array.isRequired,
	        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
	        padding: React.PropTypes.bool,
	        disabled: React.PropTypes.bool,
	        constraints: React.PropTypes.object,
	        onMeasure: React.PropTypes.func,
	        margin: React.PropTypes.number,
	        onChange: React.PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            layout: HORIZONTAL,
	            padding: true,
	            disabled: false,
	            constraints: {},
	            onMeasure: function onMeasure() {},
	            margin: 5,
	            onChange: function onChange() {}
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            items: this.itemsFromProps(this.props)
	        };
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var prevProps = this.props;

	        if (!_.isEqual(nextProps.options, prevProps.options)) {

	            // Regenerate items
	            this.setState({
	                items: this.itemsFromProps(nextProps)
	            });
	        } else if (nextProps.layout !== prevProps.layout || nextProps.padding !== prevProps.padding || nextProps.disabled !== prevProps.disabled || !_.isEqual(nextProps.constraints, prevProps.constraints)) {

	            // Clear item measurements
	            this.setState({
	                items: this.clearItemMeasurements(this.state.items)
	            });
	        }
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        // Measure items if their dimensions have been reset
	        if (this.state.items.length && !this.state.items[0].width) {
	            this.measureItems();
	        }
	    },

	    itemsFromProps: function itemsFromProps(props) {
	        var type = props.disabled ? DISABLED : STATIC;
	        return _.map(props.options, function (option, i) {
	            return {
	                option: option,
	                key: i,
	                type: type,
	                endPosition: {},
	                width: 0,
	                height: 0
	            };
	        });
	    },

	    clearItemMeasurements: function clearItemMeasurements(items) {
	        return _.map(items, function (item) {
	            return _.extend(item, {
	                width: 0,
	                height: 0
	            });
	        });
	    },

	    measureItems: function measureItems() {
	        var _this = this;

	        // Measure all items and cache what their dimensions should be, taking
	        // into account constraints and the current layout. This allows syncing
	        // widths and heights for pretty rows/columns. Note that dimensions are
	        // explictly set on Draggables - this prevents them from changing size
	        // or shape while being dragged.

	        var items = _.clone(this.state.items);
	        var $items = _.map(items, function (item) {
	            return $(ReactDOM.findDOMNode(this.refs[item.key]));
	        }, this);

	        var widths = _.invoke($items, "outerWidth");
	        var heights = _.invoke($items, "outerHeight");

	        var constraints = this.props.constraints;
	        var layout = this.props.layout;

	        var syncWidth;
	        if (constraints.width) {
	            // Items must be at least as wide as the specified constraint
	            syncWidth = _.max(widths.concat(constraints.width));
	        } else if (layout === VERTICAL) {
	            // Sync widths to get a clean column
	            syncWidth = _.max(widths);
	        }

	        var syncHeight;
	        if (constraints.height) {
	            // Items must be at least as high as the specified constraint
	            syncHeight = _.max(heights.concat(constraints.height));
	        } else if (layout === HORIZONTAL) {
	            // Sync widths to get a clean row
	            syncHeight = _.max(heights);
	        }

	        items = _.map(items, function (item, i) {
	            item.width = syncWidth || widths[i];
	            item.height = syncHeight || heights[i];
	            return item;
	        });

	        this.setState({ items: items }, function () {
	            _this.props.onMeasure({ widths: widths, heights: heights });
	        });
	    },

	    remeasureItems: _.debounce(function () {
	        this.setState({
	            // Clear item measurements
	            items: this.clearItemMeasurements(this.state.items)
	        }, this.measureItems);
	    }, 20),

	    render: function render() {
	        var className = [PREFIX, "layout-" + this.props.layout].join(" ");
	        var cards = [];

	        className += this.props.padding ? "" : " unpadded";

	        _.each(this.state.items, function (item, i, items) {
	            var isLast = i === items.length - 1;
	            var isStatic = item.type === STATIC || item.type === DISABLED;
	            var margin;

	            if (this.props.layout === HORIZONTAL) {
	                margin = "0 " + this.props.margin + "px 0 0"; // right
	            } else if (this.props.layout === VERTICAL) {
	                margin = "0 0 " + this.props.margin + "px 0"; // bottom
	            }

	            cards.push(React.createElement(Draggable, {
	                content: item.option,
	                key: item.key,
	                type: item.type,
	                ref: item.key,
	                width: item.width,
	                height: item.height,
	                margin: isLast && isStatic ? 0 : margin,
	                endPosition: item.endPosition,
	                onRender: this.remeasureItems,
	                onMouseDown: this.onMouseDown.bind(this, item.key),
	                onMouseMove: this.onMouseMove.bind(this, item.key),
	                onMouseUp: this.onMouseUp.bind(this, item.key),
	                onTouchMove: this.onMouseMove.bind(this, item.key),
	                onTouchEnd: this.onMouseUp.bind(this, item.key),
	                onTouchCancel: this.onMouseUp.bind(this, item.key),
	                onAnimationEnd: this.onAnimationEnd.bind(this, item.key) }));

	            if (item.type === DRAGGING || item.type === ANIMATING) {
	                cards.push(React.createElement(Placeholder, {
	                    key: "placeholder_" + item.key,
	                    ref: "placeholder_" + item.key,
	                    width: item.width,
	                    height: item.height,
	                    margin: isLast ? 0 : margin }));
	            }
	        }, this);

	        return React.createElement(
	            "ul",
	            { className: className },
	            cards
	        );
	    },

	    onMouseDown: function onMouseDown(key) {
	        // Static -> Dragging
	        var items = _.map(this.state.items, function (item) {
	            if (item.key === key) {
	                item.type = DRAGGING;
	            }
	            return item;
	        });

	        this.setState({ items: items });
	    },

	    onMouseMove: function onMouseMove(key) {
	        // Dragging: Rearrange items based on draggable's position
	        var $draggable = $(ReactDOM.findDOMNode(this.refs[key]));
	        var $sortable = $(ReactDOM.findDOMNode(this));
	        var items = _.clone(this.state.items);
	        var item = _.findWhere(this.state.items, { key: key });
	        var margin = this.props.margin;
	        var currentIndex = _.indexOf(items, item);
	        var newIndex = 0;

	        items.splice(currentIndex, 1);

	        if (this.props.layout === HORIZONTAL) {
	            var midWidth = $draggable.offset().left - $sortable.offset().left;
	            var sumWidth = 0;
	            var cardWidth;

	            _.each(items, function (item) {
	                cardWidth = item.width;
	                if (midWidth > sumWidth + cardWidth / 2) {
	                    newIndex += 1;
	                }
	                sumWidth += cardWidth + margin;
	            });
	        } else {
	            var midHeight = $draggable.offset().top - $sortable.offset().top;
	            var sumHeight = 0;
	            var cardHeight;

	            _.each(items, function (item) {
	                cardHeight = item.height;
	                if (midHeight > sumHeight + cardHeight / 2) {
	                    newIndex += 1;
	                }
	                sumHeight += cardHeight + margin;
	            });
	        }

	        if (newIndex !== currentIndex) {
	            items.splice(newIndex, 0, item);
	            this.setState({ items: items });
	        }
	    },

	    onMouseUp: function onMouseUp(key) {
	        // Dragging -> Animating
	        var items = _.map(this.state.items, function (item) {
	            if (item.key === key) {
	                item.type = ANIMATING;
	                item.endPosition = $(ReactDOM.findDOMNode(this.refs["placeholder_" + key])).position();
	            }
	            return item;
	        }, this);

	        this.setState({ items: items });
	        // HACK: We need to know *that* the widget changed, but currently it's
	        // not set up in a nice way to tell us *how* it changed, since the
	        // permutation of the items is stored in state.
	        this.props.onChange({});
	    },

	    onAnimationEnd: function onAnimationEnd(key) {
	        // Animating -> Static
	        var items = _.map(this.state.items, function (item) {
	            if (item.key === key) {
	                item.type = STATIC;
	            }
	            return item;
	        });

	        this.setState({ items: items });
	    },

	    getOptions: function getOptions() {
	        return _.pluck(this.state.items, "option");
	    }
	});

	module.exports = Sortable;

/***/ },
/* 193 */,
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * A class for formatting number to significant digits.
	 * Copyright (C) 2001 Stephen Ostermiller
	 * http://ostermiller.org/contact.pl?regarding?JavaScript+Significant+Figures
	 *
	 * This program is free software; you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation; either version 2 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 */

	/**
	 * An object tho both scans floating points to
	 * determine the number of significant figures.
	 * and can display a floating point using any number
	 * of significant figures.
	 *
	 * @param s A string representation of a floating point.
	 */
	function SignificantFigures(s) {
	    this.order = parseOrder(s);
	    this.mantissa = parseMantissa(s);
	    this.positive = parseSign(s);

	    /**
	     * Get the number of significant figures this object uses.
	     * Leading zeros are not significant.  Traling zeros up to
	     * and after the decimal point are significant.
	     * Significant figures is good to know when the number is
	     * used in multiplication.
	     *
	     * @return the number of significant figures.
	     */
	    this.sigFigs = this.mantissa.length;

	    /**
	     * Get the least significant decimal this object uses.
	     * This is useful to know if a number is being used
	     * in addition.
	     * 400 - 2 the hundreds place (10^2) is the least significant decimal.
	     * 75 - 0 the ones place (10^0) is the least significant decimal.
	     * .543 - -3 the 1/1000's place (10^-3) is the least significant decimal.
	     *
	     * @return an integer representing the least significant decimal place.
	     */
	    this.sigDecs = this.order - this.mantissa.length;
	}

	/**
	 * Format a floating point for display using the specified
	 * number of significant figures and least significant decimal.
	 * Scientific notation may used by this method if this
	 * object is very small, very large, has many significant
	 * figures, or the number of significant figures would be
	 * ambiguous in the output if scientific notation were not
	 * used.
	 *
	 * @param f A floating point number that should be displayed
	 * @param sigFigs desired number of significant figures (integer).
	 * @param sigDecs the least significant decimal place (integer).
	 * @param scientific true iff scientific notation should always be used.
	 * @return a string of this object formatted correctly.
	 */
	function displaySigFigs(f, sigFigs, sigDecs, scientific) {
	    var s = "" + f;
	    var order = parseOrder(s);
	    var mantissa = parseMantissa(s);
	    var positive = parseSign(s);
	    var add;
	    var decAdd;
	    var sigAdd;
	    var zeroScientific = false;
	    if (f == 0 || mantissa == "" || mantissa == "0") {
	        mantissa = "";
	        for (i = 0; i < sigFigs; i++) {
	            mantissa += "0";
	        }
	        order = sigFigs + sigDecs;
	        if (sigDecs < 0 && -sigDecs >= sigFigs) {
	            zeroScientific = true;
	        }
	    } else {
	        decAdd = order - mantissa.length - sigDecs;
	        sigAdd = sigFigs - mantissa.length;
	        add = Math.min(sigAdd, decAdd);
	        if (add < 0) {
	            var rounded = round(mantissa, -add);
	            if (rounded.length > mantissa.length + add) {
	                order++;
	                if (decAdd > sigAdd) {
	                    rounded = round(rounded, 1);
	                }
	            }
	            mantissa = rounded;
	        } else if (add > 0) {
	            for (i = 0; i < add; i++) {
	                mantissa += '0';
	            }
	        }
	        if (mantissa == "" || mantissa == "0") {
	            mantissa = "0";
	            positive = true;
	            order = 1 + sigDecs;
	            if (order != 0) {
	                zeroScientific = true;
	            }
	        }
	    }
	    var useScientific = scientific || mantissa.length > 20 || order > 4 || order < -2 || order - mantissa.length > 0 && trailingZeros(mantissa) > 0 || zeroScientific;
	    var returnVal = "";
	    if (!positive) {
	        returnVal += "-";
	    }
	    if (useScientific) {
	        returnVal += mantissa.charAt(0);
	        if (mantissa.length > 1) {
	            returnVal += '.' + mantissa.substring(1, mantissa.length);
	        }
	        if (order - 1 != 0) {
	            returnVal += " x 10^" + (order - 1);
	        }
	    } else {
	        var wholePart = "";
	        var fractPart = "";
	        var needDot = true;
	        if (order > 0) {
	            if (mantissa.length > order) {
	                wholePart = mantissa.substring(0, order);
	                fractPart = mantissa.substring(order, mantissa.length);
	            } else {
	                wholePart = mantissa;
	                needDot = trailingZeros(mantissa) != 0;
	                for (var i = 0; i < order - mantissa.length; i++) {
	                    wholePart += "0";
	                }
	            }
	        } else {
	            for (i = 0; i < -order; i++) {
	                fractPart += "0";
	            }
	            fractPart += mantissa;
	        }
	        returnVal += (wholePart == "" ? "0" : wholePart) + (needDot ? "." : "") + fractPart;
	    }
	    return returnVal;
	}

	/**
	 * Count the significant trailing zeros on this object.
	 *
	 * @return the number of trailing zeros
	 */
	function trailingZeros(mantissa) {
	    var zeros = 0;
	    for (var i = mantissa.length - 1; i >= 0; i--) {
	        var c = mantissa.charAt(i);
	        if (c == '0') {
	            zeros++;
	        } else {
	            return zeros;
	        }
	    }
	    return zeros;
	}

	/**
	 * Parse a string representation of a floating point
	 * and pull out the sign.
	 *
	 * @param s the string representation of a floating point.
	 * @return true iff this is a positive number
	 */
	function parseSign(s) {
	    var beginning = true;
	    var seenDot = false;
	    var seenSomething = false;
	    var zeros = "";
	    var leadZeros = "";
	    var all = "";
	    var decPlaces = 0;
	    var totalDecs = 0;
	    var pos = true;
	    for (var i = 0; i < s.length; i++) {
	        var c = s.charAt(i);
	        if (c >= '1' && c <= '9') {
	            all += zeros + c;
	            zeros = "";
	            seenSomething = true;
	            if (!seenDot) {
	                totalDecs++;
	                decPlaces++;
	            }
	            beginning = false;
	        } else if (c == '0') {
	            if (seenDot) {
	                if (seenSomething) {
	                    all += zeros + c;
	                    zeros = "";
	                } else {
	                    leadZeros += c;
	                    decPlaces--;
	                }
	            } else {
	                totalDecs++;
	                if (seenSomething) {
	                    leadZeros += c;
	                    decPlaces++;
	                    zeros += c;
	                } else {
	                    leadZeros += c;
	                }
	            }
	            beginning = false;
	        } else if (!seenDot && c == '.') {
	            all += zeros;
	            zeros = "";
	            seenDot = true;
	            beginning = false;
	        } else if (c == 'e' || c == 'E' && i + 1 < s.length) {
	            var raised = parseInt(s.substring(i + 1, s.length));
	            decPlaces += raised;
	            totalDecs += raised;
	            i = s.length;
	        } else if (beginning && (c == '+' || c == '-')) {
	            if (c == '-') {
	                pos = !pos;
	            }
	        }
	    }
	    if (all == "") {
	        return true;
	    } else {
	        return pos;
	    }
	}

	/**
	 * Parse a string representation of a floating point
	 * and pull out the mantissa.
	 *
	 * @param s the string representation of a floating point.
	 * @return the mantissa of this number.
	 */
	function parseMantissa(s) {
	    var beginning = true;
	    var seenDot = false;
	    var seenSomething = false;
	    var zeros = "";
	    var leadZeros = "";
	    var all = "";
	    var decPlaces = 0;
	    var totalDecs = 0;
	    var pos = true;
	    for (var i = 0; i < s.length; i++) {
	        var c = s.charAt(i);
	        if (c >= '1' && c <= '9') {
	            all += zeros + c;
	            zeros = "";
	            seenSomething = true;
	            if (!seenDot) {
	                totalDecs++;
	                decPlaces++;
	            }
	            beginning = false;
	        } else if (c == '0') {
	            if (seenDot) {
	                if (seenSomething) {
	                    all += zeros + c;
	                    zeros = "";
	                } else {
	                    leadZeros += c;
	                    decPlaces--;
	                }
	            } else {
	                totalDecs++;
	                if (seenSomething) {
	                    leadZeros += c;
	                    decPlaces++;
	                    zeros += c;
	                } else {
	                    leadZeros += c;
	                }
	            }
	            beginning = false;
	        } else if (!seenDot && c == '.') {
	            all += zeros;
	            zeros = "";
	            seenDot = true;
	            beginning = false;
	        } else if (c == 'e' || c == 'E' && i + 1 < s.length) {
	            var raised = parseInt(s.substring(i + 1, s.length));
	            decPlaces += raised;
	            totalDecs += raised;
	            i = s.length;
	        } else if (beginning && (c == '+' || c == '-')) {
	            if (c == '-') {
	                pos = !pos;
	            }
	        }
	    }
	    if (all == "") {
	        return leadZeros;
	    } else {
	        return all;
	    }
	}

	/**
	 * Parse a string representation of a floating point
	 * and pull out the exponent.
	 *
	 * @param s the string representation of a floating point.
	 * @return (integer) the number after the e.
	 */
	function parseOrder(s) {
	    var beginning = true;
	    var seenDot = false;
	    var seenSomething = false;
	    var zeros = "";
	    var leadZeros = "";
	    var all = "";
	    var decPlaces = 0;
	    var totalDecs = 0;
	    var pos = true;
	    for (var i = 0; i < s.length; i++) {
	        var c = s.charAt(i);
	        if (c >= '1' && c <= '9') {
	            all += zeros + c;
	            zeros = "";
	            seenSomething = true;
	            if (!seenDot) {
	                totalDecs++;
	                decPlaces++;
	            }
	            beginning = false;
	        } else if (c == '0') {
	            if (seenDot) {
	                if (seenSomething) {
	                    all += zeros + c;
	                    zeros = "";
	                } else {
	                    leadZeros += c;
	                    decPlaces--;
	                }
	            } else {
	                totalDecs++;
	                if (seenSomething) {
	                    leadZeros += c;
	                    decPlaces++;
	                    zeros += c;
	                } else {
	                    leadZeros += c;
	                }
	            }
	            beginning = false;
	        } else if (!seenDot && c == '.') {
	            all += zeros;
	            zeros = "";
	            seenDot = true;
	            beginning = false;
	        } else if (c == 'e' || c == 'E' && i + 1 < s.length) {
	            var raised = parseInt(s.substring(i + 1, s.length));
	            decPlaces += raised;
	            totalDecs += raised;
	            i = s.length;
	        } else if (beginning && (c == '+' || c == '-')) {
	            if (c == '-') {
	                pos = !pos;
	            }
	        }
	    }
	    if (all == "") {
	        return totalDecs;
	    } else {
	        return decPlaces;
	    }
	}

	/**
	 * Remove the specified number of digits from string by
	 * rounding.  Proper rounding rules for scientific purposes
	 * are followed.
	 * This method may cause an extra significant figure
	 * to be added to the number.  For example, if 999999
	 * were rounded, A one would carry over and become
	 * a significant figure.  Those who call this method
	 * should check for this and call round again if needed.
	 *
	 * @param mantissa A string representing an whole number of arbitrary length.
	 * @param digits A number of digits to remove
	 * @return A string represted the rounded version of mantissa
	 */
	function round(mantissa, digits) {
	    var last = mantissa.length - digits - 1;
	    if (last < 0) {
	        return "";
	    } else if (last >= mantissa.length - 1) {
	        return mantissa;
	    } else {
	        var nextToLast = mantissa.charAt(last + 1);
	        var lastChar = mantissa.charAt(last);
	        var roundUp = false;
	        if (nextToLast > '5') {
	            roundUp = true;
	        } else if (nextToLast == '5') {
	            for (var j = last + 2; j < mantissa.length; j++) {
	                if (mantissa.charAt(j) != '0') {
	                    roundUp = true;
	                }
	            }
	            if (lastChar % 2 == 1) {
	                roundUp = true;
	            }
	        }
	        var result = "";
	        for (var i = last; i >= 0; i--) {
	            var c = mantissa.charAt(i);
	            if (roundUp) {
	                var nextChar;
	                if (c == '9') {
	                    nextChar = '0';
	                } else {
	                    switch (c) {
	                        case '0':
	                            nextChar = '1';break;
	                        case '1':
	                            nextChar = '2';break;
	                        case '2':
	                            nextChar = '3';break;
	                        case '3':
	                            nextChar = '4';break;
	                        case '4':
	                            nextChar = '5';break;
	                        case '5':
	                            nextChar = '6';break;
	                        case '6':
	                            nextChar = '7';break;
	                        case '7':
	                            nextChar = '8';break;
	                        case '8':
	                            nextChar = '9';break;
	                    }
	                    roundUp = false;
	                }
	                result = nextChar + result;
	            } else {
	                result = c + result;
	            }
	        }
	        if (roundUp) {
	            result = '1' + result;
	        }
	        return result;
	    }
	}

	module.exports = {
	    SignificantFigures: SignificantFigures,
	    displaySigFigs: displaySigFigs
	};

/***/ },
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style, comma-dangle, no-var, one-var, space-unary-ops */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var _ = __webpack_require__(20);

	var Util = __webpack_require__(8);
	var Graphie = __webpack_require__(67);
	var Plot = Graphie.Plot;
	var kpoint = __webpack_require__(197).point;

	var DEFAULT_BACKGROUND_IMAGE = {
	    url: null
	};

	// TODO(charlie): These really need to go into a utility file as they're being
	// used by both interactive-graph and now grapher.
	function canonicalSineCoefficients(coeffs) {
	    // For a curve of the form f(x) = a * Sin(b * x - c) + d,
	    // this function ensures that a, b > 0, and c is its
	    // smallest possible positive value.
	    var amplitude = coeffs[0];
	    var angularFrequency = coeffs[1];
	    var phase = coeffs[2];
	    var verticalOffset = coeffs[3];

	    // Guarantee a > 0
	    if (amplitude < 0) {
	        amplitude *= -1;
	        angularFrequency *= -1;
	        phase *= -1;
	    }

	    var period = 2 * Math.PI;
	    // Guarantee b > 0
	    if (angularFrequency < 0) {
	        angularFrequency *= -1;
	        phase *= -1;
	        phase += period / 2;
	    }

	    // Guarantee c is smallest possible positive value
	    while (phase > 0) {
	        phase -= period;
	    }
	    while (phase < 0) {
	        phase += period;
	    }

	    return [amplitude, angularFrequency, phase, verticalOffset];
	}

	function canonicalTangentCoefficients(coeffs) {
	    // For a curve of the form f(x) = a * Tan(b * x - c) + d,
	    // this function ensures that a, b > 0, and c is its
	    // smallest possible positive value.
	    var amplitude = coeffs[0];
	    var angularFrequency = coeffs[1];
	    var phase = coeffs[2];
	    var verticalOffset = coeffs[3];

	    // Guarantee a > 0
	    if (amplitude < 0) {
	        amplitude *= -1;
	        angularFrequency *= -1;
	        phase *= -1;
	    }

	    var period = Math.PI;
	    // Guarantee b > 0
	    if (angularFrequency < 0) {
	        angularFrequency *= -1;
	        phase *= -1;
	        phase += period / 2;
	    }

	    // Guarantee c is smallest possible positive value
	    while (phase > 0) {
	        phase -= period;
	    }
	    while (phase < 0) {
	        phase += period;
	    }

	    return [amplitude, angularFrequency, phase, verticalOffset];
	}

	var PlotDefaults = {
	    areEqual: function areEqual(coeffs1, coeffs2) {
	        return Util.deepEq(coeffs1, coeffs2);
	    },

	    Movable: Plot,

	    getPropsForCoeffs: function getPropsForCoeffs(coeffs) {
	        return {
	            fn: _.partial(this.getFunctionForCoeffs, coeffs)
	        };
	    }
	};

	var Linear = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/67aaf581e6d9ef9038c10558a1f70ac21c11c9f8.png",

	    defaultCoords: [[0.25, 0.75], [0.75, 0.75]],

	    getCoefficients: function getCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];

	        var denom = p2[0] - p1[0];
	        var num = p2[1] - p1[1];

	        if (denom === 0) {
	            return;
	        }

	        var m = num / denom;
	        var b = p2[1] - m * p2[0];
	        return [m, b];
	    },

	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        var m = coeffs[0],
	            b = coeffs[1];
	        return m * x + b;
	    },

	    getEquationString: function getEquationString(coords) {
	        var coeffs = this.getCoefficients(coords);
	        var m = coeffs[0],
	            b = coeffs[1];
	        return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
	    }
	});

	var Quadratic = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/e23d36e6fc29ee37174e92c9daba2a66677128ab.png",

	    defaultCoords: [[0.5, 0.5], [0.75, 0.75]],

	    Movable: Graphie.Parabola,

	    getCoefficients: function getCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];

	        // Parabola with vertex (h, k) has form: y = a * (h - k)^2 + k
	        var h = p1[0];
	        var k = p1[1];

	        // Use these to calculate familiar a, b, c
	        var a = (p2[1] - k) / ((p2[0] - h) * (p2[0] - h));
	        var b = -2 * h * a;
	        var c = a * h * h + k;

	        return [a, b, c];
	    },

	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2];
	        return (a * x + b) * x + c;
	    },

	    getPropsForCoeffs: function getPropsForCoeffs(coeffs) {
	        return {
	            a: coeffs[0],
	            b: coeffs[1],
	            c: coeffs[2]
	        };
	    },

	    getEquationString: function getEquationString(coords) {
	        var coeffs = this.getCoefficients(coords);
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2];
	        return "y = " + a.toFixed(3) + "x^2 + " + b.toFixed(3) + "x + " + c.toFixed(3);
	    }
	});

	var Sinusoid = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/3d68e7718498475f53b206c2ab285626baf8857e.png",

	    defaultCoords: [[0.5, 0.5], [0.6, 0.6]],

	    Movable: Graphie.Sinusoid,

	    getCoefficients: function getCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];

	        var a = p2[1] - p1[1];
	        var b = Math.PI / (2 * (p2[0] - p1[0]));
	        var c = p1[0] * b;
	        var d = p1[1];

	        return [a, b, c, d];
	    },

	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2],
	            d = coeffs[3];
	        return a * Math.sin(b * x - c) + d;
	    },

	    getPropsForCoeffs: function getPropsForCoeffs(coeffs) {
	        return {
	            a: coeffs[0],
	            b: coeffs[1],
	            c: coeffs[2],
	            d: coeffs[3]
	        };
	    },

	    getEquationString: function getEquationString(coords) {
	        var coeffs = this.getCoefficients(coords);
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2],
	            d = coeffs[3];
	        return "y = " + a.toFixed(3) + " sin(" + b.toFixed(3) + "x - " + c.toFixed(3) + ") + " + d.toFixed(3);
	    },

	    areEqual: function areEqual(coeffs1, coeffs2) {
	        return Util.deepEq(canonicalSineCoefficients(coeffs1), canonicalSineCoefficients(coeffs2));
	    }
	});

	var Tangent = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/7db80d23c35214f98659fe1cf0765811c1bbfbba.png",

	    defaultCoords: [[0.5, 0.5], [0.75, 0.75]],

	    getCoefficients: function getCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];

	        var a = p2[1] - p1[1];
	        var b = Math.PI / (4 * (p2[0] - p1[0]));
	        var c = p1[0] * b;
	        var d = p1[1];

	        return [a, b, c, d];
	    },

	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2],
	            d = coeffs[3];
	        return a * Math.tan(b * x - c) + d;
	    },

	    getEquationString: function getEquationString(coords) {
	        var coeffs = this.getCoefficients(coords);
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2],
	            d = coeffs[3];
	        return "y = " + a.toFixed(3) + " sin(" + b.toFixed(3) + "x - " + c.toFixed(3) + ") + " + d.toFixed(3);
	    },

	    areEqual: function areEqual(coeffs1, coeffs2) {
	        return Util.deepEq(canonicalTangentCoefficients(coeffs1), canonicalTangentCoefficients(coeffs2));
	    }
	});

	var Exponential = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/9cbfad55525e3ce755a31a631b074670a5dad611.png",

	    defaultCoords: [[0.5, 0.55], [0.75, 0.75]],

	    defaultAsymptote: [[0, 0.5], [1.0, 0.5]],

	    /**
	     * Add extra constraints for movement of the points or asymptote (below):
	     *   newCoord: [x, y]
	     *     The end position of the point or asymptote endpoint
	     *   oldCoord: [x, y]
	     *     The old position of the point or asymptote endpoint
	     *   coords:
	     *     An array of coordinates representing the proposed end configuration
	     *     of the plot coordinates.
	     *   asymptote:
	     *     An array of coordinates representing the proposed end configuration
	     *     of the asymptote.
	     *
	     * Return: either a coordinate (to be used as the resulting coordinate of
	     * the move) or a boolean, where `true` uses newCoord as the resulting
	     * coordinate, and `false` uses oldCoord as the resulting coordinate.
	     */
	    extraCoordConstraint: function extraCoordConstraint(newCoord, oldCoord, coords, asymptote, graph) {
	        var y = _.head(asymptote)[1];
	        return _.all(coords, function (coord) {
	            return coord[1] !== y;
	        });
	    },

	    extraAsymptoteConstraint: function extraAsymptoteConstraint(newCoord, oldCoord, coords, asymptote, graph) {
	        var y = newCoord[1];
	        var isValid = _.all(coords, function (coord) {
	            return coord[1] > y;
	        }) || _.all(coords, function (coord) {
	            return coord[1] < y;
	        });

	        if (isValid) {
	            return [oldCoord[0], y];
	        } else {
	            // Snap the asymptote as close as possible, i.e., if the user moves
	            // the mouse really quickly into an invalid region
	            var oldY = oldCoord[1];
	            var wasBelow = _.all(coords, function (coord) {
	                return coord[1] > oldY;
	            });
	            if (wasBelow) {
	                var bottomMost = _.min(_.map(coords, function (coord) {
	                    return coord[1];
	                }));
	                return [oldCoord[0], bottomMost - graph.snapStep[1]];
	            } else {
	                var topMost = _.max(_.map(coords, function (coord) {
	                    return coord[1];
	                }));
	                return [oldCoord[0], topMost + graph.snapStep[1]];
	            }
	        }
	    },

	    allowReflectOverAsymptote: true,

	    getCoefficients: function getCoefficients(coords, asymptote) {
	        var p1 = coords[0];
	        var p2 = coords[1];

	        var c = _.head(asymptote)[1];
	        var b = Math.log((p1[1] - c) / (p2[1] - c)) / (p1[0] - p2[0]);
	        var a = (p1[1] - c) / Math.exp(b * p1[0]);
	        return [a, b, c];
	    },

	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2];
	        return a * Math.exp(b * x) + c;
	    },

	    getEquationString: function getEquationString(coords, asymptote) {
	        if (!asymptote) {
	            return null;
	        }
	        var coeffs = this.getCoefficients(coords, asymptote);
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2];
	        return "y = " + a.toFixed(3) + "e^(" + b.toFixed(3) + "x) + " + c.toFixed(3);
	    }
	});

	var Logarithm = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/f6491e99d34af34d924bfe0231728ad912068dc3.png",

	    defaultCoords: [[0.55, 0.5], [0.75, 0.75]],

	    defaultAsymptote: [[0.5, 0], [0.5, 1.0]],

	    extraCoordConstraint: function extraCoordConstraint(newCoord, oldCoord, coords, asymptote, graph) {
	        var x = _.head(asymptote)[0];
	        return _.all(coords, function (coord) {
	            return coord[0] !== x;
	        }) && coords[0][1] !== coords[1][1];
	    },

	    extraAsymptoteConstraint: function extraAsymptoteConstraint(newCoord, oldCoord, coords, asymptote, graph) {
	        var x = newCoord[0];
	        var isValid = _.all(coords, function (coord) {
	            return coord[0] > x;
	        }) || _.all(coords, function (coord) {
	            return coord[0] < x;
	        });

	        if (isValid) {
	            return [x, oldCoord[1]];
	        } else {
	            // Snap the asymptote as close as possible, i.e., if the user moves
	            // the mouse really quickly into an invalid region
	            var oldX = oldCoord[0];
	            var wasLeft = _.all(coords, function (coord) {
	                return coord[0] > oldX;
	            });
	            if (wasLeft) {
	                var leftMost = _.min(_.map(coords, function (coord) {
	                    return coord[0];
	                }));
	                return [leftMost - graph.snapStep[0], oldCoord[1]];
	            } else {
	                var rightMost = _.max(_.map(coords, function (coord) {
	                    return coord[0];
	                }));
	                return [rightMost + graph.snapStep[0], oldCoord[1]];
	            }
	        }
	    },

	    allowReflectOverAsymptote: true,

	    getCoefficients: function getCoefficients(coords, asymptote) {
	        // It's easiest to calculate the logarithm's coefficients by thinking
	        // about it as the inverse of the exponential, so we flip x and y and
	        // perform some algebra on the coefficients. This also unifies the
	        // logic between the two 'models'.
	        var flip = function flip(coord) {
	            return [coord[1], coord[0]];
	        };
	        var inverseCoeffs = Exponential.getCoefficients(_.map(coords, flip), _.map(asymptote, flip));
	        var c = -inverseCoeffs[2] / inverseCoeffs[0];
	        var b = 1 / inverseCoeffs[0];
	        var a = 1 / inverseCoeffs[1];
	        return [a, b, c];
	    },

	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x, asymptote) {
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2];
	        return a * Math.log(b * x + c);
	    },

	    getEquationString: function getEquationString(coords, asymptote) {
	        if (!asymptote) {
	            return null;
	        }
	        var coeffs = this.getCoefficients(coords, asymptote);
	        var a = coeffs[0],
	            b = coeffs[1],
	            c = coeffs[2];
	        return "y = ln(" + a.toFixed(3) + "x + " + b.toFixed(3) + ") + " + c.toFixed(3);
	    }
	});

	var AbsoluteValue = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/8256a630175a0cb1d11de223d6de0266daf98721.png",

	    defaultCoords: [[0.5, 0.5], [0.75, 0.75]],

	    getCoefficients: function getCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];

	        var denom = p2[0] - p1[0];
	        var num = p2[1] - p1[1];

	        if (denom === 0) {
	            return;
	        }

	        var m = Math.abs(num / denom);
	        if (p2[1] < p1[1]) {
	            m *= -1;
	        }
	        var horizontalOffset = p1[0];
	        var verticalOffset = p1[1];

	        return [m, horizontalOffset, verticalOffset];
	    },

	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        var m = coeffs[0],
	            horizontalOffset = coeffs[1],
	            verticalOffset = coeffs[2];
	        return m * Math.abs(x - horizontalOffset) + verticalOffset;
	    },

	    getEquationString: function getEquationString(coords) {
	        var coeffs = this.getCoefficients(coords);
	        var m = coeffs[0],
	            horizontalOffset = coeffs[1],
	            verticalOffset = coeffs[2];
	        return "y = " + m.toFixed(3) + "| x - " + horizontalOffset.toFixed(3) + "| + " + verticalOffset.toFixed(3);
	    }
	});

	/* Utility functions for dealing with graphing interfaces. */
	var functionTypeMapping = {
	    "linear": Linear,
	    "quadratic": Quadratic,
	    "sinusoid": Sinusoid,
	    "tangent": Tangent,
	    "exponential": Exponential,
	    "logarithm": Logarithm,
	    "absolute_value": AbsoluteValue
	};

	var allTypes = _.keys(functionTypeMapping);

	function functionForType(type) {
	    return functionTypeMapping[type];
	}

	var GrapherUtil = {
	    validate: function validate(state, rubric) {
	        if (state.type !== rubric.correct.type) {
	            return {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: null
	            };
	        }

	        // We haven't moved the coords
	        if (state.coords == null) {
	            return {
	                type: "invalid",
	                message: null
	            };
	        }

	        // Get new function handler for grading
	        var grader = functionForType(state.type);
	        var guessCoeffs = grader.getCoefficients(state.coords, state.asymptote);
	        var correctCoeffs = grader.getCoefficients(rubric.correct.coords, rubric.correct.asymptote);

	        if (guessCoeffs == null || correctCoeffs == null) {
	            return {
	                type: "invalid",
	                message: null
	            };
	        } else if (grader.areEqual(guessCoeffs, correctCoeffs)) {
	            return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else {
	            return {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: null
	            };
	        }
	    },

	    getEquationString: function getEquationString(props) {
	        var plot = props.plot;
	        if (plot.type && plot.coords) {
	            var handler = functionForType(plot.type);
	            var result = handler.getEquationString(plot.coords, plot.asymptote);
	            return result || "";
	        } else {
	            return "";
	        }
	    },

	    pointsFromNormalized: function pointsFromNormalized(coordsList, range, step, snapStep) {
	        var numSteps = function numSteps(range, step) {
	            return Math.floor((range[1] - range[0]) / step);
	        };

	        return _.map(coordsList, function (coords) {
	            var unsnappedPoint = _.map(coords, function (coord, i) {
	                var currRange = range[i];
	                var currStep = step[i];
	                var nSteps = numSteps(currRange, currStep);
	                var tick = Math.round(coord * nSteps);
	                return currRange[0] + currStep * tick;
	            });
	            // In some graphing widgets, e.g. interactive-graph, you can rely
	            // on the Graphie to handle snapping. Here, we need the points
	            // returned to already be snapped so that the plot that goes
	            // through them is correct.
	            return kpoint.roundTo(unsnappedPoint, snapStep);
	        });
	    },

	    maybePointsFromNormalized: function maybePointsFromNormalized(coordsList, range, step, snapStep) {
	        if (coordsList) {
	            return this.pointsFromNormalized(coordsList, range, step, snapStep);
	        } else {
	            return coordsList;
	        }
	    },

	    /* Given a plot type, return the appropriate default value for a grapher
	     * widget's plot props: type, default coords, default asymptote. */
	    defaultPlotProps: function defaultPlotProps(type, graph) {
	        // The coords are null by default, to indicate that the user has not
	        // moved them from the default position, and that this widget should
	        // therefore be considered empty and ineligible for grading. The user
	        // *can* move the coords from the default position and then back if
	        // they really want to submit the default coords as their answer, but
	        // we currently don't write questions that require this.
	        //
	        // We *do* write questions in which the asymptote should be left in
	        // the default position. For this reason, we fill in the default
	        // asymptote rather than leaving it null; if the user moves the coords
	        // but not the asymptote, the widget is non-empty and eligible for
	        // grading.
	        //
	        // TODO(mattdr): Consider an updated scoring function that marks the
	        // default coords as empty *unless* they're the correct coords. This
	        // would remove this default-coords-are-always-wrong constraints on
	        // the questions we write, while still maintaining our kind behavior
	        // when users forget to update a widget... but we'd also be revealing
	        // extra information. It would be valid to always submit the default
	        // widget before even reading the question; you can't lose, but you
	        // might get a free win.
	        var model = functionForType(type);
	        var gridStep = [1, 1];
	        var snapStep = Util.snapStepFromGridStep(gridStep);
	        return {
	            type: type,
	            asymptote: this.maybePointsFromNormalized(model.defaultAsymptote, graph.range, graph.step, snapStep),
	            coords: null
	        };
	    },

	    /* Given a list of available types, choose which to use. */
	    chooseType: _.first,

	    getGridAndSnapSteps: function getGridAndSnapSteps(options, boxSize) {
	        var gridStep = options.gridStep || Util.getGridStep(options.range, options.step, boxSize);
	        var snapStep = options.snapStep || Util.snapStepFromGridStep(gridStep);
	        return {
	            gridStep: gridStep,
	            snapStep: snapStep
	        };
	    }
	};

	var DEFAULT_GRAPHER_PROPS = {};

	DEFAULT_GRAPHER_PROPS.graph = {
	    labels: ["x", "y"],
	    range: [[-10, 10], [-10, 10]],
	    step: [1, 1],
	    backgroundImage: DEFAULT_BACKGROUND_IMAGE,
	    markings: "graph",
	    rulerLabel: "",
	    rulerTicks: 10,
	    valid: true
	};

	DEFAULT_GRAPHER_PROPS.plot = GrapherUtil.defaultPlotProps("linear", DEFAULT_GRAPHER_PROPS.graph);

	DEFAULT_GRAPHER_PROPS.availableTypes = [DEFAULT_GRAPHER_PROPS.plot.type];

	function typeToButton(type) {
	    var capitalized = type.charAt(0).toUpperCase() + type.substring(1);
	    return {
	        value: type,
	        title: capitalized,
	        content: React.createElement("img", { src: functionForType(type).url, alt: capitalized })
	    };
	}

	module.exports = {
	    GrapherUtil: GrapherUtil,
	    allTypes: allTypes,
	    typeToButton: typeToButton,
	    functionForType: functionForType,
	    DEFAULT_GRAPHER_PROPS: DEFAULT_GRAPHER_PROPS,
	    DEFAULT_BACKGROUND_IMAGE: DEFAULT_BACKGROUND_IMAGE
	};

/***/ },
/* 200 */,
/* 201 */,
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, indent, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var ButtonGroup = __webpack_require__(58);
	var React = __webpack_require__(19);

	var ArrowPicker = React.createClass({
	    displayName: "ArrowPicker",

	    propTypes: {
	        value: React.PropTypes.string,
	        onChange: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: ""
	        };
	    },

	    render: function render() {
	        return React.createElement(ButtonGroup, { value: this.props.value,
	            allowEmpty: false,
	            buttons: [{ value: "", content: React.createElement(
	                    "span",
	                    null,
	                    "—"
	                ) }, { value: "->", content: React.createElement(
	                    "span",
	                    null,
	                    "→"
	                ) }],
	            onChange: this.props.onChange });
	    }
	});

	module.exports = ArrowPicker;

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var ButtonGroup = __webpack_require__(58);
	var React = __webpack_require__(19);
	var _ = __webpack_require__(20);

	var KhanColors = __webpack_require__(189);

	var ColorPicker = React.createClass({
	    displayName: "ColorPicker",

	    COLORS: [KhanColors.BLACK, KhanColors.BLUE, KhanColors.GREEN, KhanColors.PINK, KhanColors.PURPLE, KhanColors.RED, KhanColors.GRAY],

	    LIGHT_COLORS: [KhanColors.LIGHT_BLUE, KhanColors.LIGHT_ORANGE, KhanColors.LIGHT_PINK, KhanColors.LIGHT_GREEN, KhanColors.LIGHT_PURPLE, KhanColors.LIGHT_RED, "#fff"],

	    propTypes: {
	        value: React.PropTypes.string,
	        lightColors: React.PropTypes.bool,
	        onChange: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: KhanColors.BLACK,
	            lightColors: false
	        };
	    },

	    render: function render() {
	        var colors = this.props.lightColors ? this.LIGHT_COLORS : this.COLORS;
	        return React.createElement(ButtonGroup, { value: this.props.value,
	            allowEmpty: false,
	            buttons: _.map(colors, function (color) {
	                return {
	                    value: color,
	                    content: React.createElement(
	                        "span",
	                        null,
	                        React.createElement("span", {
	                            className: "colorpicker-circle",
	                            style: { background: color } }),
	                        " "
	                    )
	                };
	            }),
	            onChange: this.props.onChange });
	    }
	});

	module.exports = ColorPicker;

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);
	var TeX = __webpack_require__(61);

	var ButtonGroup = __webpack_require__(58);
	var Changeable = __webpack_require__(172);
	var MathInput = __webpack_require__(178);
	var NumberInput = __webpack_require__(175);

	var ConstraintEditor = React.createClass({
	    displayName: "ConstraintEditor",

	    mixins: [Changeable],

	    propTypes: {
	        constraint: React.PropTypes.string,
	        snap: React.PropTypes.number,
	        constraintFn: React.PropTypes.string,
	        onChange: React.PropTypes.func.isRequired,
	        constraintXMin: React.PropTypes.string,
	        constraintXMax: React.PropTypes.string,
	        constraintYMin: React.PropTypes.string,
	        constraintYMax: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            constraint: "none",
	            snap: 0.5,
	            constraintFn: "0",
	            constraintXMin: "-10",
	            constraintXMax: "10",
	            constraintYMin: "-10",
	            constraintYMax: "10"
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Constraint: ",
	                React.createElement(ButtonGroup, { value: this.props.constraint,
	                    allowEmpty: false,
	                    buttons: [{ value: "none", content: "None" }, { value: "snap", content: "Snap" }, { value: "x", content: "x=" }, { value: "y", content: "y=" }],
	                    onChange: this.change("constraint") })
	            ),
	            this.props.constraint === "snap" && React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                "Snap: ",
	                React.createElement(NumberInput, {
	                    value: this.props.snap,
	                    placeholder: 0,
	                    onChange: this.change("snap") })
	            ),
	            this.props.constraint === "x" && React.createElement(
	                "div",
	                { className: "graph-settings" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    React.createElement(
	                        TeX,
	                        null,
	                        "x="
	                    ),
	                    " ",
	                    React.createElement(MathInput, {
	                        buttonSets: [],
	                        buttonsVisible: "never",
	                        value: this.props.constraintFn,
	                        onChange: this.change("constraintFn") })
	                )
	            ),
	            this.props.constraint === "y" && React.createElement(
	                "div",
	                { className: "graph-settings" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    React.createElement(
	                        TeX,
	                        null,
	                        "y="
	                    ),
	                    " ",
	                    React.createElement(MathInput, {
	                        buttonSets: [],
	                        buttonsVisible: "never",
	                        value: this.props.constraintFn,
	                        onChange: this.change("constraintFn") })
	                )
	            ),
	            "Ensure these are set so nothing can be dragged off the canvas:",
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    React.createElement(
	                        TeX,
	                        null,
	                        "x \\in \\Large["
	                    ),
	                    " ",
	                    React.createElement(MathInput, {
	                        buttonSets: [],
	                        buttonsVisible: "never",
	                        value: this.props.constraintXMin,
	                        onChange: this.change("constraintXMin") }),
	                    React.createElement(
	                        TeX,
	                        null,
	                        ", "
	                    ),
	                    " ",
	                    React.createElement(MathInput, {
	                        buttonSets: [],
	                        buttonsVisible: "never",
	                        value: this.props.constraintXMax,
	                        onChange: this.change("constraintXMax")
	                    }),
	                    " ",
	                    React.createElement(
	                        TeX,
	                        null,
	                        "\\Large]"
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-widget-row" },
	                React.createElement(
	                    "div",
	                    { className: "perseus-widget-row" },
	                    React.createElement(
	                        TeX,
	                        null,
	                        "y \\in \\Large["
	                    ),
	                    " ",
	                    React.createElement(MathInput, {
	                        buttonSets: [],
	                        buttonsVisible: "never",
	                        value: this.props.constraintYMin,
	                        onChange: this.change("constraintYMin") }),
	                    React.createElement(
	                        TeX,
	                        null,
	                        ", "
	                    ),
	                    " ",
	                    React.createElement(MathInput, {
	                        buttonSets: [],
	                        buttonsVisible: "never",
	                        value: this.props.constraintYMax,
	                        onChange: this.change("constraintYMax")
	                    }),
	                    " ",
	                    React.createElement(
	                        TeX,
	                        null,
	                        "\\Large]"
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = ConstraintEditor;

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var ButtonGroup = __webpack_require__(58);
	var React = __webpack_require__(19);

	var DashPicker = React.createClass({
	    displayName: "DashPicker",

	    propTypes: {
	        value: React.PropTypes.string,
	        onChange: React.PropTypes.func.isRequired
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: ""
	        };
	    },

	    render: function render() {
	        return React.createElement(ButtonGroup, { value: this.props.value,
	            allowEmpty: false,
	            buttons: [{ value: "", content: React.createElement(
	                    "span",
	                    null,
	                    "—"
	                ) }, { value: "-", content: React.createElement(
	                    "span",
	                    null,
	                    "–––"
	                ) }, { value: "- ", content: React.createElement(
	                    "span",
	                    null,
	                    "–  –"
	                ) }, { value: ".", content: React.createElement(
	                    "span",
	                    null,
	                    "····"
	                ) }, { value: ". ", content: React.createElement(
	                    "span",
	                    null,
	                    "· · ·"
	                ) }],
	            onChange: this.props.onChange });
	    }
	});

	module.exports = DashPicker;

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	var React = __webpack_require__(19);

	var _require = __webpack_require__(39);

	var iconChevronDown = _require.iconChevronDown;
	var iconChevronRight = _require.iconChevronRight;
	var iconCircleArrowDown = _require.iconCircleArrowDown;
	var iconCircleArrowUp = _require.iconCircleArrowUp;
	var iconTrash = _require.iconTrash;

	var InlineIcon = __webpack_require__(40);

	var ElementContainer = React.createClass({
	    displayName: "ElementContainer",

	    propTypes: {
	        initiallVisible: React.PropTypes.bool,
	        title: React.PropTypes.node
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            initiallyVisible: false,
	            title: "More"
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            show: this.props.initiallyVisible,
	            title: "More",
	            onUp: null,
	            onDown: null,
	            onDelete: null
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "perseus-interaction-element" },
	            React.createElement(
	                "a",
	                { href: "#", className: "perseus-interaction-element-title " + (this.state.show ? "open" : "closed"),
	                    onClick: this.toggle },
	                this.state.show ? React.createElement(InlineIcon, iconChevronDown) : React.createElement(InlineIcon, iconChevronRight),
	                this.props.title
	            ),
	            React.createElement(
	                "div",
	                { className: "perseus-interaction-element-content " + (this.state.show ? "enter" : "leave") },
	                this.props.children,
	                (this.props.onUp != null || this.props.onDown != null || this.props.onDelete != null) && React.createElement(
	                    "div",
	                    { className: "edit-controls" },
	                    this.props.onUp != null && React.createElement(
	                        "button",
	                        {
	                            onClick: this.props.onUp },
	                        React.createElement(InlineIcon, iconCircleArrowUp)
	                    ),
	                    this.props.onDown != null && React.createElement(
	                        "button",
	                        {
	                            onClick: this.props.onDown },
	                        React.createElement(InlineIcon, iconCircleArrowDown)
	                    ),
	                    this.props.onDelete != null && React.createElement(
	                        "button",
	                        {
	                            onClick: this.props.onDelete },
	                        React.createElement(InlineIcon, iconTrash)
	                    )
	                )
	            )
	        );
	    },

	    toggle: function toggle(e) {
	        e.preventDefault();
	        this.setState({ show: !this.state.show });
	    }
	});

	module.exports = ElementContainer;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/**
	 * Draw some text into a 2D canvas drawing context.
	 *
	 * Args:
	 *     ctx: the 2D drawing context
	 *     item: the rendering instruction for the text.  Must look like: {
	 *         type: "text",
	 *         pos: [x, y],
	 *         value: "some text to draw",
	 *     }
	 *
	 */
	function drawText(ctx, item) {
	    if (item.value === null) {
	        return;
	    }
	    ctx.fillStyle = styles.fgColor;
	    ctx.font = styles.font;
	    ctx.fillText(item.value, item.pos[0] - styles.fontSizePx / 2 + 1, item.pos[1] + styles.fontSizePx / 2);
	}

	/**
	 * Draw a double line into a 2D canvas drawing context.
	 *
	 * Apparently the way you do this is to stroke an extra-wide line in the
	 * foreground color and then a smaller line in the background color. 5:3
	 * foreground:background width looks reasonable for drawing chemical bonds.
	 *
	 * Args:
	 *     ctx: the 2D drawing context
	 *     item: the rendering instruction for the line.  Must look like: {
	 *         type: "line:double",
	 *         startPos: [x, y],
	 *         endPos: [x, y],
	 *     }
	 */
	function drawDoubleLine(ctx, item) {
	    // Outer line that forms both of the bond lines.
	    var path = new Path2D();
	    ctx.lineWidth = 5 * styles.lineWidth;
	    ctx.strokeStyle = styles.fgColor;
	    path.moveTo(item.startPos[0], item.startPos[1]);
	    path.lineTo(item.endPos[0], item.endPos[1]);
	    ctx.stroke(path);

	    // Inner white line that separates the two bond lines.
	    path = new Path2D();
	    ctx.lineWidth = 3 * styles.lineWidth;
	    ctx.strokeStyle = styles.bgColor;
	    path.moveTo(item.startPos[0], item.startPos[1]);
	    path.lineTo(item.endPos[0], item.endPos[1]);
	    ctx.stroke(path);
	}

	/**
	 * Draw a triple line into a 2D canvas drawing context.
	 *
	 * Following the strategy for the double line, we stroke a very wide
	 * foreground-color line, then a medium background-color line, then a narrow
	 * foreground-color line.
	 *
	 * Args:
	 *     ctx: the 2D drawing context
	 *     item: the rendering instruction for the line.  Must look like: {
	 *         type: "line:triple",
	 *         startPos: [x, y],
	 *         endPos: [x, y],
	 *     }
	 */
	function drawTripleLine(ctx, item) {
	    // TODO(colin): consolidate duplicated code from the three line drawing
	    // functions.

	    // Outer line that will form the two outer bond lines.
	    var path = new Path2D();
	    ctx.lineWidth = 7 * styles.lineWidth;
	    ctx.strokeStyle = styles.fgColor;
	    path.moveTo(item.startPos[0], item.startPos[1]);
	    path.lineTo(item.endPos[0], item.endPos[1]);
	    ctx.stroke(path);

	    // Middle white line that separates the bonds
	    path = new Path2D();
	    ctx.lineWidth = 5 * styles.lineWidth;
	    ctx.strokeStyle = styles.bgColor;
	    path.moveTo(item.startPos[0], item.startPos[1]);
	    path.lineTo(item.endPos[0], item.endPos[1]);
	    ctx.stroke(path);

	    // Inner line that forms the middle bond line.
	    drawLine(ctx, item);
	}

	/**
	 * Draw a single line into a 2D canvas drawing context
	 *
	 * Args:
	 *     ctx: the 2D drawing context
	 *     item: the rendering instruction for the line.  Must look like: {
	 *         type: "line:single",
	 *         startPos: [x, y],
	 *         endPos: [x, y],
	 *     }
	 */
	function drawLine(ctx, item) {
	    var path = new Path2D();
	    ctx.lineWidth = styles.lineWidth;
	    ctx.strokeStyle = styles.fgColor;
	    path.moveTo(item.startPos[0], item.startPos[1]);
	    path.lineTo(item.endPos[0], item.endPos[1]);
	    ctx.stroke(path);
	}

	/**
	 * Lookup table that maps drawing instruction types to the functions that
	 * render them.
	 */
	var drawingFuncs = {
	    text: drawText,
	    "line:single": drawLine,
	    "line:double": drawDoubleLine,
	    "line:triple": drawTripleLine
	};

	/**
	 * Draw a single rendering instruction into a 2D canvas drawing context.
	 */
	function drawItem(ctx) {
	    return function (item) {
	        drawingFuncs[item.type](ctx, item);
	    };
	}

	/**
	 * Lookup table for drawing priorities.
	 *
	 * Types with lower priorities are drawn first.
	 */
	var ordering = {
	    "line:single": 0,
	    "line:double": 0,
	    "line:triple": 0,
	    text: 1
	};

	/**
	 * Sorting comparison function that orders rendering instructions according to
	 * their type's priority.
	 */
	function compareElements(item0, item1) {
	    return ordering[item0.type] - ordering[item1.type];
	}

	/**
	 * Draw an array of rendering instructions into a 2D canvas drawing context.
	 */
	function draw(ctx, items) {
	    items.sort(compareElements).forEach(drawItem(ctx));
	}

	var styles = {
	    bgColor: 'rgb(255, 255, 255)',
	    fgColor: 'rgb(0, 0, 0)',
	    fontSizePx: 12,
	    lineWidth: 1
	};

	styles.font = styles.fontSizePx + "px sans";

	module.exports = draw;

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable brace-style */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/**
	 * A molecule layout engine.
	 *
	 * This module transforms the SMILES syntax tree into a set of rendering
	 * instructions.  A rendering instruction is an object indicating what type of
	 * thing to render (e.g. text or line), where to render it, and any other style
	 * properties needed.
	 *
	 * For instance, an oxygen atom might be rendered as
	 * {type: "text", value: "O", pos: [0, 0], idx: "1,0"}
	 */

	// Default length of the bond.  This currently corresponds directly to pixels
	// in the renderer, but we may want this just to be arbitrary in the future.
	var bondLength = 30;

	/**
	 * Compute a coordinate by moving an angle and length from an origin point.
	 *
	 * Args:
	 *     origin: a list of the [x, y] coordinates of the origin
	 *     angle: an angle in degrees from the origin, following the typical
	 *         convention of +x axis = 0 degrees, +y axis = 90 degrees.
	 *     length: the distance to the new point
	 * Return:
	 *     a two-element list containing the [x, y] coordinates of the point.
	 */
	function polarAdd(origin, angle, length) {
	    var x = origin[0];
	    var y = origin[1];
	    return [x + Math.cos(angle * 2 * Math.PI / 360) * length, y + -1.0 * Math.sin(angle * 2 * Math.PI / 360) * length];
	}

	/**
	 * Compute the layout for a single atom.
	 *
	 * Args:
	 *     atom: the atom node for which layout is being created, as returned from
	 *         convertTree; the computed position of this atom is added to this
	 *         object in place, in addition to being returned in the layout
	 *         instruction.
	 *         TODO(colin): refactor so that we don't need to modify this in place
	 *     atoms: the list of all atoms, as returned from convertTree, used to
	 *         position this atom appropriately relative to its neighbors
	 *     bonds: the list of all bonds, as returned from convertTree, used to
	 *         determine the geometry based on bond type
	 *     rotationAngle: a constant rotation for the whole molecule (in degrees)
	 *
	 * Return:
	 *     a rendering instruction for the atom, containing a type (text), the text
	 *     to render, the position, and the atom index
	 */
	function atomLayout(atom, atoms, bonds, rotationAngle) {
	    var textValue = atom.symbol;
	    if (textValue === "C" && Object.keys(atoms).length !== 1) {
	        // By convention, don't render the C for carbon in a chain.
	        textValue = null;
	    }

	    if (atom.idx === "1,0") {
	        // The first atom is special-cased because there are no neighbors for
	        // relative positioning.
	        var _pos = [0, 0];
	        atom.pos = _pos;
	        // Conventionally, molecules are rendered where the first bond is not
	        // horizontal, but at a 30 degree angle, so subtract 30 degrees for the
	        // first atom's direction.
	        atom.baseAngle = -30 + rotationAngle;
	        return { type: "text", value: textValue, pos: _pos, idx: atom.idx };
	    }
	    // If we're an atom with any other index than the case just handled, we're
	    // guaranteed to have a neighbor who has a defined position.
	    var prevPositionedAtom = atoms[atom.connections.find(function (c) {
	        return atoms[c].pos;
	    })];

	    // Find this atom's index in the previous atom's connections
	    var myIndex = prevPositionedAtom.connections.indexOf(atom.idx);

	    var baseAngleIncrement = 60;
	    var angleIncrement = 120;
	    if (prevPositionedAtom.connections.length === 4) {
	        // By convention, if an atom has 4 bonds, we represent it with 90
	        // degree angles in 2D, even though it would have tetrahedral geometry
	        // with ~110 degree angles in 3D.
	        angleIncrement = 90;
	        baseAngleIncrement = 90;
	    } else if (bonds.find(function (bond) {
	        return bond.bondType === "triple" && bond.to === atom.idx;
	    }) || bonds.find(function (bond) {
	        return bond.bondType === "triple" && bond.to === prevPositionedAtom.idx;
	    })) {
	        // Triple bonds have a bond angle of 180 degrees, so don't change the
	        // direction in which we made the previous bond.
	        angleIncrement = 0;
	        baseAngleIncrement = 0;
	    }

	    var angle = 0;
	    var idxPath = prevPositionedAtom.idx.split(":");
	    var lastAtomIdx = idxPath[idxPath.length - 1].split(",")[0];

	    // Conventionally, a single chain of atoms is rendered as a zig-zag pattern
	    // with 120 degree angles.  This means we need to flip the angle every
	    // other atom.  The parser ensures that indices always alternate odd-even,
	    // including taking into account branch points.
	    // TODO(colin): don't depend on the parser's indexing scheme and just track
	    // this entirely in the layout engine.
	    if (parseInt(lastAtomIdx) % 2 !== 0) {
	        angle = prevPositionedAtom.baseAngle - (baseAngleIncrement - angleIncrement * myIndex);
	    } else {
	        angle = prevPositionedAtom.baseAngle + (baseAngleIncrement - angleIncrement * myIndex);
	    }

	    var pos = polarAdd(prevPositionedAtom.pos, angle, bondLength);

	    atom.pos = pos;
	    atom.baseAngle = angle;

	    return { type: "text", value: textValue, pos: pos, idx: atom.idx };
	}

	/**
	 * Get the start and end position for a bond connecting two atoms.
	 *
	 * If we have non-carbon atoms that render with explicit letters connected by a
	 * bond, we don't want the line for the bond to extend into the lettering for
	 * the atom.
	 *
	 * This function returns the start and end positions of the bond's line, taking
	 * into account that one or both end points might need to be moved to make room
	 * for text.
	 *
	 * TODO(colin): this makes assumptions about the relative sizes of the length
	 * of a bond and the text.  Think about alternate ways to represent this that
	 * might not have that problem.
	 */
	function maybeShrinkLines(fromAtom, toAtom) {
	    var shrinkFactor = 0.25;
	    var fromPos = [fromAtom.pos[0], fromAtom.pos[1]];
	    var toPos = [toAtom.pos[0], toAtom.pos[1]];
	    if (fromAtom.symbol !== "C") {
	        fromPos = [toAtom.pos[0] - (1 - shrinkFactor) * (toAtom.pos[0] - fromAtom.pos[0]), toAtom.pos[1] - (1 - shrinkFactor) * (toAtom.pos[1] - fromAtom.pos[1])];
	    }
	    if (toAtom.symbol !== "C") {
	        // For carbon atoms, conventionally we don't draw any letter, so this
	        // special cases drawing the bond lines all the way to the point where
	        // they meet.
	        toPos = [fromAtom.pos[0] - (1 - shrinkFactor) * (fromAtom.pos[0] - toAtom.pos[0]), fromAtom.pos[1] - (1 - shrinkFactor) * (fromAtom.pos[1] - toAtom.pos[1])];
	    }
	    return [fromPos, toPos];
	}

	/**
	 * Compute the layout for a bond between two atoms.
	 *
	 * Args:
	 *     bond: the bond node for which the layout is being computed, as returned
	 *         by convertTree
	 *     atoms: the list of all atoms returned by convertTree, which should
	 *         already have been processed for layout and thus have positions set
	 *
	 * Return:
	 *     a rendering instruction for the bond containing a type
	 *     (line:{single,double,triple}) and the line's endpoints
	 */
	function bondLayout(bond, atoms) {
	    var fromAtom = atoms[bond.from];
	    var toAtom = atoms[bond.to];
	    var startAndEndPos = maybeShrinkLines(fromAtom, toAtom);
	    return {
	        type: "line:" + bond.bondType,
	        startPos: startAndEndPos[0],
	        endPos: startAndEndPos[1]
	    };
	}

	/**
	 * Convert an array of atom indices to a single string unique identifier.
	 *
	 * For linear molecules, or for atoms in the main chain, this will just be the
	 * atom index, something like "0,1".  For branched molecules, however, we
	 * uniquely identify atoms by an array of atoms where the branching happened,
	 * followed by the index in the current branch (like ["0,1", "1,2", "1,1"]).
	 * This function just joins the parts with a colon so that we can have nice
	 * object keys that still track the series of branches to get to an atom, which
	 * is guaranteed to be a unique identifier.
	 *
	 */
	function idxString(idx) {
	    return idx.join(":");
	}

	/**
	 * Convert the parse tree output by the parser into an ordered list of atoms
	 * and bonds to render.
	 *
	 * Args:
	 *     atoms: the output list of atoms that we're in the process of building.
	 *         This should be the empty list if not being called recursively.
	 *     bonds: the output list of bonds that we're in the process of building.
	 *         This should be the empty list if not being called recursively.
	 *     tree: the parse tree generated by the SMILES parser module.
	 *
	 * Return:
	 *     the final value of atoms and bonds, which are lists of all the atom
	 *     nodes and bond nodes, respectively, that need to be rendered.
	 */
	function convertTree(atoms, bonds, tree) {
	    if (tree === null) {
	        return [atoms, bonds];
	    }
	    if (tree.type === "atom") {
	        (function () {
	            var treeIdx = idxString(tree.idx);
	            atoms[treeIdx] = { idx: treeIdx, symbol: tree.symbol, connections: [] };
	            if (tree.bonds) {
	                tree.bonds.forEach(function (b) {
	                    var toIdx = idxString(b.to.idx);
	                    atoms[treeIdx].connections.push(toIdx);
	                    bonds.push({ from: treeIdx, to: toIdx, bondType: b.bondType });
	                    convertTree(atoms, bonds, b.to);
	                    atoms[toIdx].connections.push(treeIdx);
	                });
	            }
	        })();
	    }
	    return [atoms, bonds];
	}

	/**
	 * Recursively process the queue of atoms that need to have layout computed.
	 *
	 * Args:
	 *     outputs: the array of atom rendering instructions we're in the process
	 *         of building.  This should be the empty array if not being called
	 *         recursively.
	 *     atomProcessingQueue: the array of unique identifier strings (see the
	 *         comment for idxString for more information about these) of atoms
	 *         currently in line to be processed.  When not being called
	 *         recursively, this should be a array with a single element, the
	 *         unique identifier of the first atom in the structure ("1,0" in the
	 *         current scheme).
	 *     atoms: the array of all atom nodes to be rendered, as returned by
	 *         convertTree
	 *     bonds: the array of all bond nodes to be rendered, as returned by
	 *         convertTree
	 *
	 * Return:
	 *     an array of rendering instructions for all the atoms in the molecule
	 */
	function atomLayoutHelper(outputs, atomProcessingQueue, atoms, bonds, rotationAngle) {
	    if (atomProcessingQueue.length === 0) {
	        return outputs;
	    }

	    var queuedAtomIdx = atomProcessingQueue.shift();
	    var atom = atoms[queuedAtomIdx];
	    atom.connections.forEach(function (c) {
	        if (!atoms[c].pos) {
	            atomProcessingQueue.push(c);
	        }
	    });
	    return atomLayoutHelper(outputs.concat(atomLayout(atom, atoms, bonds, rotationAngle)), atomProcessingQueue, atoms, bonds, rotationAngle);
	}

	/**
	 * Recursively process the queue of bonds that need to have layout computed.
	 *
	 * Args:
	 *     outputs: the array of bond rendering instructions we're in the process
	 *         of building.  This should be the empty array or the array of all
	 *         atom rendering instructions if not being called recursively.
	 *     atoms: the array of all atom nodes to be rendered, as returned by
	 *         convertTree
	 *     bonds: the array of all bond nodes to be rendered, as returned by
	 *         convertTree
	 *
	 * Return:
	 *     an array of rendering instructions for all the bonds in the molecule
	 *     concatenated to the initial value of outputs
	 */
	function bondLayoutHelper(outputs, atoms, bonds) {
	    if (bonds.length === 0) {
	        return outputs;
	    }
	    return bondLayoutHelper(outputs.concat(bondLayout(bonds[0], atoms)), atoms, bonds.slice(1));
	}

	/**
	 * Compute an array of rendering instructions from the parse tree of a molecule.
	 *
	 * Args:
	 *     tree: the parse tree as returned by the SMILES parser module
	 *     rotationAngle: a global rotation (in degrees) to be applied to the whole
	 *         molecule; this is manually adjustable in the widget.
	 *
	 * Return:
	 *     an array of rendering instructions for all the atoms and bonds in the
	 *     molecule suitable for processing by the renderer
	 */
	function layout(tree, rotationAngle) {
	    var converted = convertTree({}, [], tree);
	    var atoms = converted[0];
	    var bonds = converted[1];
	    var outputs = atomLayoutHelper([], ["1,0"], atoms, bonds, rotationAngle);
	    return bondLayoutHelper(outputs, atoms, bonds);
	}

	module.exports = {
	    layout: layout,
	    // The remainder are exported for testing and are not intended for external
	    // use.
	    _atomLayout: atomLayout,
	    _bondLayout: bondLayout,
	    _bondLength: bondLength,
	    _convertTree: convertTree
	};

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// Regexp defining characters that are valid SMILES characters that this parser
	// can parse.  In addition to serving as a sort of validation, this also keeps
	// out unimplemented features (like cycles and stereochemistry), which use
	// additional characters.
	var smilesRe = new RegExp("^[A-Za-z\\[\\]()=#+-]*$");

	// Regexp defining what characters are valid as atom names.  This includes
	// common 1-character elements, Cl and Br for convenience, and the open
	// bracket, which can be used to include anything as an atom name.
	var atomRe = new RegExp("^(Cl|Br|[CONPSFBI]|\\[)");

	function ParseError(message) {
	    this.message = message;
	}

	/**
	 * Perform a functional update of a possibly nested object.
	 *
	 * Args:
	 *     obj: an object, will not be modified
	 *     keylist: a list of keys whose values will be updated in the object.
	 *         This represents a path to a value inside nested objects.  For
	 *         example, if keylist == ["a", "b", "c"], then a new object is
	 *         returned with obj["a"]["b"]["c"] updated.  Note that if any of the
	 *         keys is not already present, this will insert {} as a default value
	 *         for that key.
	 *     val: the new value to associate with the keypath
	 *
	 * Return: a new object, which is a shallow copy of the original with the value
	 *     at the specified keypath replaced.
	 */
	function _mset(obj, keylist, val) {
	    var k0 = keylist[0];
	    var rest = keylist.slice(1);
	    var newObj = void 0;
	    if (Array.isArray(obj)) {
	        newObj = [].concat(obj);
	    } else {
	        newObj = _extends({}, obj || {});
	    }
	    var newVal = val;
	    if (rest.length > 0) {
	        newVal = _mset(newObj[k0], rest, val);
	    }
	    newObj[k0] = newVal;
	    return newObj;
	}

	/**
	 * Perform a functional increment of a value in a nested object.
	 *
	 * Args:
	 *     obj: an object; this will not be modified
	 *     keylist: a list of keys representing a path into a nested object.  (See
	 *         `_mset` for examples.)
	 *
	 * Return:
	 *     an object that is a shallow copy of obj, with the value at the specified
	 *     path incremeneted.
	 */
	function _inc(obj, keylist) {
	    var val = keylist.reduce(function (acc, elt) {
	        return acc[elt];
	    }, obj);

	    return _mset(obj, keylist, val + 1);
	}

	function validate(smiles) {
	    return smilesRe.test(smiles);
	}

	/**
	 * Parse a bond modifier character, updating the context object so that the
	 * next bond created has this modifier.
	 */
	function parseBondModifier(smiles, ctx) {
	    var firstChar = smiles[0];
	    var rest = smiles.slice(1);
	    if (firstChar === "=") {
	        return parse(rest, _mset(ctx, ["bond", "bondType"], "double"));
	    } else if (firstChar === "#") {
	        return parse(rest, _mset(ctx, ["bond", "bondType"], "triple"));
	    }
	    throw new ParseError("Invalid character: " + firstChar);
	}

	/**
	 * Slice the input string, removing a parenthesized expression.
	 * (Will handle nested parentheses.)
	 *
	 * parenStack should be a list containing any open parentheses already
	 * encountered.  (Usually, this will be ["("])
	 */
	function sliceFromMatchingCloseParen(smiles, parenStack) {
	    if (parenStack.length === 0) {
	        return smiles;
	    }

	    if (smiles === "") {
	        throw new ParseError("Mismatched parentheses");
	    }

	    var firstChar = smiles[0];
	    var rest = smiles.slice(1);

	    if (firstChar === "(") {
	        return sliceFromMatchingCloseParen(rest, parenStack.concat(firstChar));
	    }

	    if (firstChar === ")") {
	        return sliceFromMatchingCloseParen(rest, parenStack.slice(1));
	    }

	    return sliceFromMatchingCloseParen(rest, parenStack);
	}

	/**
	 * Parse a branch, as indicated by the presence of a parenthesized experession.
	 *
	 * This returns a list of all branches (including the continuation of the
	 * backbone) that should be added to the previous atom's bond list.
	 */
	function parseParenthesizedExpression(smiles, ctx) {
	    var firstChar = smiles[0];
	    var rest = smiles.slice(1);
	    if (firstChar === "(") {
	        var newCtx = _extends({}, ctx, { parens: ctx.parens + "(" });
	        // increment the branch index
	        newCtx = _inc(ctx, ["idx", ctx.idx.length - 1, 1]);

	        var inBranchIdx = -1;
	        if (ctx.idx[ctx.idx.length - 1][0] % 2 === 0) {
	            // HACK(colin): this is so that we preserve the odd/even series in
	            // indices in branches; the layout engine uses this to select
	            // angles, and if we don't do this, editing one part of a molecule
	            // can cause another to flop around oddly.
	            // TODO(colin): this should just start at 0 all the time, and the
	            // layout engine should figure out continuity.
	            inBranchIdx = 0;
	        }
	        var parenCtx = _extends({}, newCtx, {
	            idx: newCtx.idx.concat([[inBranchIdx, 0]]),
	            parens: newCtx.parens.concat("(")
	        });
	        var parenExpr = parse(rest, parenCtx);
	        var remainder = parse(sliceFromMatchingCloseParen(rest, ["("]), newCtx);
	        return [parenExpr].concat(remainder);
	    } else if (firstChar === ")") {
	        if (ctx.parens[ctx.parens.length - 1] !== "(") {
	            throw new ParseError("Mismatched parentheses");
	        }
	        return null;
	    } else {
	        throw new ParseError("Invalid bare character: " + firstChar);
	    }
	}

	/**
	 * Get the symbol of the next atom in the molecule.
	 *
	 * Return a 2-element list containing that symbol and the remainder of the
	 * molecule.
	 */
	function readAtomSymbol(smiles, _ctx) {
	    var sym = null;
	    var rest = null;
	    if (smiles[0] === "[") {
	        var closingIdx = smiles.indexOf("]");
	        if (closingIdx === -1) {
	            return ["", smiles];
	        }
	        sym = smiles.slice(1, closingIdx);
	        rest = smiles.slice(closingIdx + 1);
	    } else {
	        var match = atomRe.exec(smiles);
	        sym = match[1];
	        rest = smiles.slice(sym.length);
	    }

	    return [sym, rest];
	}

	/**
	 * Parse the next atom in the molecule, returning an atom object if this is the
	 * first atom in the molecule, or a bond object with this atom as the
	 * destination of the bond if this is not the first atom.
	 */
	function parseAtom(smiles, ctx) {
	    var symbolInfo = readAtomSymbol(smiles, ctx);
	    var atom = symbolInfo[0];
	    if (atom === "") {
	        return ["error", "Unable to parse bracketed atom."];
	    }
	    var rest = symbolInfo[1];

	    // Atoms are indexed by a list of two-element lists.  In each two-element
	    // list, the first element is the atom counter, and the second element is
	    // the branch counter.  Branches are 1-indexed so that the main chain of
	    // the molecule can be indicated by 0.  Atoms may be either 0- or
	    // 1-indexed, defaulting to 1, to maintain a alternating pattern of
	    // odd/even indices. So, for example, if an atom has a branch off the main
	    // chain, and its atom index is x, then the indices of atoms are:
	    //     Atom where branch occurs: [[x, 0]]
	    //     First atom in the branch: [[x, 1], [1, 0]]  (assuming x is even)
	    //     Next atom in the main chain: [[x + 1, 0]]

	    // increment the atom counter and reset the branch counter
	    var newCtx = _mset(ctx, ["idx", ctx.idx.length - 1], [1 + ctx.idx[ctx.idx.length - 1][0], 0]);
	    var restOfMolecule = parse(rest, _mset(newCtx, ["bond", "bondType"], "single"));
	    if (!Array.isArray(restOfMolecule) && !!restOfMolecule) {
	        //TODO(colin): fix this awkwardness.
	        restOfMolecule = [restOfMolecule];
	    }
	    var atomObj = {
	        type: "atom",
	        symbol: atom,
	        bonds: restOfMolecule,
	        idx: newCtx.idx
	    };
	    if (ctx.bond) {
	        return {
	            type: "bond",
	            bondType: ctx.bond.bondType,
	            to: atomObj
	        };
	    }
	    return atomObj;
	}

	function startsWithAtom(s) {
	    return atomRe.test(s);
	}

	function isModifierChar(s) {
	    return s === "=" || s === "#";
	}

	/**
	 * Parse a SMILES string to an internal tree representation.
	 *
	 * Args:
	 *   smiles [string]: a string representing the molecule.
	 *
	 * Returns: the parse tree (see top-of file docstring for details).
	 *
	 * Throws:
	 *     ParseError: if the input is not valid SMILES or contains features not
	 *         yet implemented.
	 */
	function parse(smiles, ctx) {
	    if (!validate(smiles)) {
	        throw new ParseError("Invalid input.");
	    }

	    if (!smiles || smiles.length === 0) {
	        return null;
	    }

	    if (startsWithAtom(smiles)) {
	        return parseAtom(smiles, ctx || { idx: [[0, 0]], parens: [], stack: [],
	            bondModifiers: [] });
	    } else if (isModifierChar(smiles[0])) {
	        // TODO(colin): add a better error message in the case where the input
	        // is invalid and starts with a modifier character?
	        return parseBondModifier(smiles, ctx);
	    } else {
	        // TODO(colin): add additional cases for unimplemented bits of SMILES
	        // syntax.
	        return parseParenthesizedExpression(smiles, ctx);
	    }
	}

	module.exports = { parse: parse, ParseError: ParseError };

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */

	/* globals $_ */
	var React = __webpack_require__(19);
	var SimpleMarkdown = __webpack_require__(161);
	var _ = __webpack_require__(20);

	var START_REF_PREFIX = "start-ref-";
	var END_REF_PREFIX = "end-ref-";
	var REF_STYLE = {
	    display: "inline-block",
	    width: 0,
	    visibility: "hidden"
	};

	var LABEL_OUTER_STYLE = {
	    // for some reason we need these to keep the nbsp from wrapping when the
	    // inner circle/square is display: inline-block
	    display: "inline",
	    whiteSpace: "nowrap"
	};

	var SQUARE_LABEL_STYLE = {
	    display: "inline-block",
	    color: "rgb(255, 255, 255)",
	    backgroundColor: "rgb(90, 90, 90)",
	    paddingLeft: 10,
	    paddingRight: 10,
	    userSelect: "none",
	    WebkitUserSelect: "none"
	};

	var CIRCLE_LABEL_STYLE = {
	    display: "inline-block",
	    color: "rgb(255, 255, 255)",
	    backgroundColor: "rgb(90, 90, 90)",
	    userSelect: "none",
	    WebkitUserSelect: "none",
	    width: 22,
	    height: 22,
	    borderRadius: "50%",
	    textAlign: "center"
	};

	var RefStart = React.createClass({
	    displayName: "RefStart",

	    propTypes: {
	        refContent: React.PropTypes.node.isRequired
	    },

	    render: function render() {
	        return React.createElement(
	            "span",
	            { style: REF_STYLE },
	            "_"
	        );
	    },

	    getRefContent: function getRefContent() {
	        return this.props.refContent;
	    }
	});

	var RefEnd = React.createClass({
	    displayName: "RefEnd",

	    render: function render() {
	        return React.createElement(
	            "span",
	            { style: REF_STYLE },
	            "_"
	        );
	    }
	});

	var rules = {
	    newline: SimpleMarkdown.defaultRules.newline,
	    paragraph: SimpleMarkdown.defaultRules.paragraph,
	    escape: SimpleMarkdown.defaultRules.escape,
	    passageFootnote: {
	        order: SimpleMarkdown.defaultRules.escape.order + .1,
	        match: SimpleMarkdown.inlineRegex(/^\^/),
	        parse: function parse(capture, _parse, state) {
	            // if no footnotes have been seen, we're id 1. otherwise,
	            // we're the next subsequent id
	            var id = state.lastFootnote.id + 1;
	            var footnote = {
	                id: id,
	                // our text is what to output. if there is only one footnote,
	                // it's a *; otherwise it's a superscript number
	                text: id === 1 ? "*" : "" + id
	            };

	            // If the previous footnote was a *, we need to adjust it to be
	            // a number, since now we know there is more than one footnote
	            if (state.lastFootnote.text === "*") {
	                state.lastFootnote.text = "" + state.lastFootnote.id;
	            }

	            // and update our last footnote, + return.
	            state.lastFootnote = footnote;
	            return footnote;
	        },
	        react: function react(node, output, state) {
	            return React.createElement(
	                "sup",
	                { key: state.key },
	                node.text
	            );
	        }
	    },
	    refStart: {
	        order: SimpleMarkdown.defaultRules.escape.order + .2,
	        match: function match(source, state) {
	            var capture = /^\{\{/.exec(source);
	            if (capture) {
	                // We need to do extra processing here to capture the
	                // full text of the reference, which we include so that
	                // we can use that information as a screenreader
	                var closeIndex = 2; // start looking after the opening "{{"
	                var refNestingLevel = 0;

	                // Find the closing "}}" for our opening "{{"
	                while (closeIndex < source.length) {
	                    var token = source.slice(closeIndex, closeIndex + 2);
	                    if (token === "{{") {
	                        refNestingLevel++;
	                        // increment an extra character so we get the
	                        // full 2-char token
	                        closeIndex++;
	                    } else if (token === "}}") {
	                        if (refNestingLevel > 0) {
	                            refNestingLevel--;
	                            // increment an extra character so we get the
	                            // full 2-char token
	                            closeIndex++;
	                        } else {
	                            break;
	                        }
	                    }
	                    closeIndex++;
	                }

	                var refText = source.slice(2, closeIndex);

	                // A "magic" capture that matches the opening {{
	                // but captures the full ref text internally :D
	                return [capture[0], refText];
	            } else {
	                return null;
	            }
	        },
	        parse: function parse(capture, _parse2, state) {
	            if (!state.useRefs) {
	                return {
	                    ref: null,
	                    refContent: null
	                };
	            }

	            var ref = state.lastRef + 1;
	            state.lastRef = ref;
	            state.currentRef.push(ref);

	            var refContent = _parse2(
	            // Curly quotes
	            "(“" + capture[1] + "”)\n\n", _.defaults({
	                // We don't want to parse refs while looking through
	                // this refs contents. We definitely don't want
	                // to make those refs into react refs on the
	                // passage, for instance!
	                useRefs: false
	            }, INITIAL_PARSE_STATE));

	            return {
	                ref: ref,
	                refContent: refContent
	            };
	        },
	        react: function react(node, output, state) {
	            if (node.ref == null) {
	                return null;
	            }

	            // We don't pass state here because this is parsed
	            // and output out-of-band. We don't want to affect
	            // our state by the double-output here :).
	            var refContent = output(node.refContent, {});
	            return React.createElement(RefStart, {
	                ref: START_REF_PREFIX + node.ref,
	                key: START_REF_PREFIX + node.ref,
	                refContent: refContent });
	        }
	    },
	    refEnd: {
	        order: SimpleMarkdown.defaultRules.escape.order + .3,
	        match: SimpleMarkdown.inlineRegex(/^\}\}/),
	        parse: function parse(capture, _parse3, state) {
	            if (!state.useRefs) {
	                return {
	                    ref: null
	                };
	            }

	            var ref = state.currentRef.pop() || null;
	            return {
	                ref: ref
	            };
	        },
	        react: function react(node, output, state) {
	            if (node.ref != null) {
	                return React.createElement(RefEnd, {
	                    ref: END_REF_PREFIX + node.ref,
	                    key: END_REF_PREFIX + node.ref });
	            } else {
	                // if we didn't have a matching start reference, or
	                // we aren't parsing refs for this pass (we do this
	                // inside of refContent), don't output a ref
	                return null;
	            }
	        }
	    },
	    squareLabel: {
	        order: SimpleMarkdown.defaultRules.escape.order + .4,
	        match: SimpleMarkdown.inlineRegex(/^\[\[(\w+)\]\]( *)/),
	        parse: function parse(capture, _parse4, state) {
	            if (!state.firstQuestionRef) {
	                state.firstQuestionRef = capture[1];
	            }
	            return {
	                content: capture[1],
	                space: capture[2].length > 0
	            };
	        },
	        react: function react(node, output, state) {
	            return [React.createElement(
	                "span",
	                {
	                    key: "visual-square",
	                    className: "perseus-passage-square-label",
	                    style: LABEL_OUTER_STYLE,
	                    "aria-hidden": "true" },
	                React.createElement(
	                    "span",
	                    { style: SQUARE_LABEL_STYLE },
	                    node.content
	                )
	            ), React.createElement(
	                "span",
	                { key: "alt-text", className: "perseus-sr-only" },
	                $_({ number: node.content }, "[Marker for question %(number)s]")
	            ), node.space ? " " : null];
	        }
	    },
	    circleLabel: {
	        order: SimpleMarkdown.defaultRules.escape.order + .5,
	        match: SimpleMarkdown.inlineRegex(/^\(\((\w+)\)\)( *)/),
	        parse: function parse(capture, _parse5, state) {
	            return {
	                content: capture[1],
	                space: capture[2].length > 0
	            };
	        },
	        react: function react(node, output, state) {
	            return [React.createElement(
	                "span",
	                {
	                    key: "visual-circle",
	                    className: "perseus-passage-circle-label",
	                    style: LABEL_OUTER_STYLE,
	                    "aria-hidden": true },
	                React.createElement(
	                    "span",
	                    { style: CIRCLE_LABEL_STYLE },
	                    node.content
	                )
	            ), React.createElement(
	                "span",
	                { key: "alt-text", className: "perseus-sr-only" },
	                $_({ number: node.content }, "[Circle marker %(number)s]")
	            ), node.space ? " " : null];
	        }
	    },
	    squareBracketRef: {
	        order: SimpleMarkdown.defaultRules.escape.order + .6,
	        match: SimpleMarkdown.inlineRegex(/^\[(\d+)\]( *)/),
	        parse: function parse(capture, _parse6, state) {
	            if (!state.firstSentenceRef) {
	                state.firstSentenceRef = capture[1];
	            }
	            return {
	                content: capture[1],
	                space: capture[2].length > 0
	            };
	        },
	        react: function react(node, output, state) {
	            return [React.createElement(
	                "span",
	                {
	                    key: "visual-brackets",
	                    className: "perseus-passage-bracket-label",
	                    "aria-hidden": "true" },
	                "[",
	                node.content,
	                "]"
	            ), React.createElement(
	                "span",
	                { key: "alt-text", className: "perseus-sr-only" },
	                $_({ number: node.content }, "[Sentence %(number)s]")
	            ), node.space ? " " : null];
	        }
	    },
	    strong: SimpleMarkdown.defaultRules.strong,
	    u: SimpleMarkdown.defaultRules.u,
	    em: SimpleMarkdown.defaultRules.em,
	    del: SimpleMarkdown.defaultRules.del,
	    text: SimpleMarkdown.defaultRules.text
	};

	var INITIAL_PARSE_STATE = {
	    currentRef: [],
	    useRefs: true,
	    lastRef: 0,
	    lastFootnote: { id: 0, text: "" }
	};
	var builtParser = SimpleMarkdown.parserFor(rules);
	var parse = function parse(source, state) {
	    state = state || {};
	    var paragraphedSource = source + "\n\n";
	    return builtParser(paragraphedSource, _.extend(state, INITIAL_PARSE_STATE));
	};

	module.exports = {
	    parse: parse,
	    output: SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, "react")),
	    START_REF_PREFIX: START_REF_PREFIX,
	    END_REF_PREFIX: END_REF_PREFIX,
	    _rulesForTesting: rules
	};

/***/ }
]));