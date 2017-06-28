webpackJsonpPerseus([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* globals __EDITOR__ */
	// As new widgets get added here, please also make sure they get added in
	// webapp perseus/traversal.py so they can be properly translated.
	module.exports = [ [ __webpack_require__(45), false ], [ __webpack_require__(46), false ], [ __webpack_require__(47), false ], [ __webpack_require__(48), false ], [ __webpack_require__(49), false ], [ __webpack_require__(50), false ], [ __webpack_require__(51), false ], [ __webpack_require__(52), false ], [ __webpack_require__(53), false ], [ __webpack_require__(54), false ], [ __webpack_require__(55), false ], [ __webpack_require__(56), false ], [ __webpack_require__(57), false ], [ __webpack_require__(58), false ], [ __webpack_require__(59), false ], [ __webpack_require__(60), false ], [ __webpack_require__(61), false ], [ __webpack_require__(62), false ], [ __webpack_require__(63), false ], [ __webpack_require__(64), false ], [ __webpack_require__(65), false ], [ __webpack_require__(66), false ], [ __webpack_require__(67), false ], [ __webpack_require__(68), false ], [ __webpack_require__(69), false ], [ __webpack_require__(70), false ], [ __webpack_require__(71), false ], [ __webpack_require__(72), false ], [ __webpack_require__(73), false ], [ __webpack_require__(74), false ], [ __webpack_require__(75), false ], [ __webpack_require__(76), false ], // These widgets are only used when testing things, so remove them in the
	// non-editor bundle.
	false, false, false ];

/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _fullBleedContainer;

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, no-undef, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var React = __webpack_require__(11);

	var classNames = __webpack_require__(13);

	var Changeable = __webpack_require__(88);

	var WidgetJsonifyDeprecated = __webpack_require__(108);

	var _ = __webpack_require__(10);

	var ApiClassNames = __webpack_require__(18).ClassNames;

	var ApiOptions = __webpack_require__(18).Options;

	var _require2 = __webpack_require__(92), iconCircle = _require2.iconCircle, iconCircleThin = _require2.iconCircleThin;

	var InlineIcon = __webpack_require__(89);

	var Renderer = __webpack_require__(8);

	var Util = __webpack_require__(17);

	var mediaQueries = __webpack_require__(35);

	var sharedStyles = __webpack_require__(36);

	var Categorizer = React.createClass({
	    displayName: "Categorizer",
	    propTypes: _extends({}, Changeable.propTypes, {
	        apiOptions: ApiOptions.propTypes,
	        // List of categories (across the top)
	        categories: React.PropTypes.arrayOf(React.PropTypes.string),
	        // List of items that are being categorized (along the left side)
	        items: React.PropTypes.arrayOf(React.PropTypes.string),
	        trackInteraction: React.PropTypes.func.isRequired,
	        // Ordered list of correct answers, mapping items to categories thusly:
	        //   values[<items_index>] == <categories_index>
	        values: React.PropTypes.arrayOf(React.PropTypes.number),
	        highlightLint: React.PropTypes.bool
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            items: [],
	            categories: [],
	            values: [],
	            highlightLint: false
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            uniqueId: _.uniqueId("perseus_radio_")
	        };
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    getUserInput: function getUserInput() {
	        return WidgetJsonifyDeprecated.getUserInput.call(this);
	    },
	    render: function render() {
	        var _this = this;
	        var self = this;
	        // In this context, isMobile is used to differentiate mobile from
	        // desktop.
	        var isMobile = this.props.apiOptions.isMobile;
	        var indexedItems = this.props.items.map(function(item, n) {
	            return [ item, n ];
	        });
	        this.props.randomizeItems && (indexedItems = Util.shuffle(indexedItems, this.props.problemNum));
	        var table = React.createElement("table", {
	            className: "categorizer-table"
	        }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, " "), this.props.categories.map(function(category, i) {
	            // Array index is the correct key here, as that's how
	            // category grading actually works -- no way to add or
	            // remove categories or items in the middle. (If we later
	            // add that, this should be fixed.)
	            return React.createElement("th", {
	                className: css(styles.header),
	                key: i
	            }, React.createElement(Renderer, {
	                content: category,
	                highlightLint: _this.props.highlightLint
	            }));
	        }))), React.createElement("tbody", null, indexedItems.map(function(indexedItem) {
	            var item = indexedItem[0];
	            var itemNum = indexedItem[1];
	            var uniqueId = self.state.uniqueId + "_" + itemNum;
	            return React.createElement("tr", {
	                key: itemNum
	            }, React.createElement("td", null, React.createElement(Renderer, {
	                content: item,
	                highlightLint: _this.props.highlightLint
	            })), _.range(self.props.categories.length).map(function(catNum) {
	                var selected = self.props.values[itemNum] === catNum;
	                return React.createElement("td", {
	                    className: "category " + css(styles.cell, styles.responsiveCell),
	                    key: catNum
	                }, React.createElement("div", {
	                    className: ApiClassNames.INTERACTIVE,
	                    onClick: _this.onChange.bind(_this, itemNum, catNum)
	                }, isMobile && React.createElement("input", {
	                    type: "radio",
	                    name: uniqueId,
	                    className: css(sharedStyles.responsiveInput, sharedStyles.responsiveRadioInput),
	                    checked: selected,
	                    onChange: _this.onChange.bind(_this, itemNum, catNum),
	                    onClick: function onClick(e) {
	                        return e.stopPropagation();
	                    }
	                }), !isMobile && React.createElement("span", {
	                    className: css(styles.responsiveSpan, styles.radioSpan, selected && styles.checkedRadioSpan, _this.props.static && selected && styles.staticCheckedRadioSpan)
	                }, selected ? React.createElement(InlineIcon, iconCircle) : React.createElement(InlineIcon, iconCircleThin))));
	            }));
	        })));
	        // TODO(benkomalo): kill CSS-based styling and move everything to
	        // aphrodite.
	        var extraClassNames = classNames({
	            "categorizer-container": true,
	            "static-mode": this.props.static
	        });
	        var inlineStyles = this.props.apiOptions.isMobile ? [ styles.fullBleedContainer ] : [];
	        return React.createElement("div", {
	            className: extraClassNames + " " + css.apply(void 0, inlineStyles)
	        }, table);
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
	        _.each(rubric.values, function(value, i) {
	            null == state.values[i] && (completed = false);
	            state.values[i] !== value && (allCorrect = false);
	        });
	        if (!completed) return {
	            type: "invalid",
	            message: i18n._("Make sure you select something for every row.")
	        };
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
	        overflowX: "auto"
	    }, _fullBleedContainer),
	    header: {
	        textAlign: "center",
	        verticalAlign: "bottom"
	    },
	    cell: {
	        textAlign: "center",
	        padding: 0,
	        color: "#ccc",
	        verticalAlign: "middle"
	    },
	    radioSpan: {
	        fontSize: 30,
	        paddingRight: 3,
	        ":hover": {
	            color: "#999"
	        }
	    },
	    checkedRadioSpan: {
	        color: "#333"
	    },
	    // .static-mode is applied by the Categorizer when the rendered
	    // widget is static; in this case we gray out the choices to show
	    // the user that the widget can't be interacted with.
	    staticCheckedRadioSpan: {
	        color: "#888"
	    }
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
	    },
	    isLintable: true
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	/**
	 * This widget is for embedding Khan Academy CS programs.
	 */
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Changeable = __webpack_require__(88);

	var updateQueryString = __webpack_require__(17).updateQueryString;

	var PADDING_WIDTH = 2;

	var IS_KA_SITE = /khanacademy\.org/;

	var KA_EMBED_URL = "https://{hostname}/computer-programming/program/{programID}/embedded?embed=yes&author=no";

	function getUrlFromProgramID(programID) {
	    var url = KA_EMBED_URL.replace("{programID}", programID);
	    var currentHostname = document.location.hostname;
	    var embedHostname = "www.khanacademy.org";
	    IS_KA_SITE.test(currentHostname) && (embedHostname = currentHostname);
	    return url.replace("{hostname}", embedHostname);
	}

	/* This renders the scratchpad in an iframe and handles validation via
	 * window.postMessage */
	var CSProgram = React.createClass({
	    displayName: "CSProgram",
	    propTypes: _extends({}, Changeable.propTypes, {
	        programID: React.PropTypes.string,
	        width: React.PropTypes.number,
	        height: React.PropTypes.number,
	        settings: React.PropTypes.array,
	        showEditor: React.PropTypes.bool,
	        showButtons: React.PropTypes.bool,
	        status: React.PropTypes.oneOf([ "incomplete", "incorrect", "correct" ]),
	        message: React.PropTypes.string
	    }),
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
	        if (_.isUndefined(data.testsPassed)) return;
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
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    render: function render() {
	        if (!this.props.programID) return React.createElement("div", null);
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
	        } else url += "&buttons=no";
	        // Turn array of [{name: "", value: ""}] into object
	        if (this.props.settings) {
	            var settings = {};
	            _.each(this.props.settings, function(setting) {
	                setting.name && setting.value && (settings[setting.name] = setting.value);
	            });
	            // This becomes available to programs as Program.settings()
	            url = updateQueryString(url, "settings", JSON.stringify(settings));
	        }
	        // We sandbox the iframe so that we whitelist only the functionality
	        //  that we need. This makes it a bit safer in case some content
	        //  creator "went wild".
	        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
	        return React.createElement("iframe", {
	            sandbox: "allow-popups allow-same-origin allow-scripts",
	            src: url,
	            style: style,
	            className: className,
	            allowFullScreen: true
	        });
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
	            // The iframe can tell us whether it's correct or incorrect,
	            //  and pass an optional message
	            return "correct" === state.status ? {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: state.message || null
	            } : "incorrect" === state.status ? {
	                type: "points",
	                earned: 0,
	                total: 1,
	                message: state.message || null
	            } : {
	                type: "invalid",
	                message: "Keep going, you're not there yet!"
	            };
	        }
	    }
	});

	module.exports = {
	    name: "cs-program",
	    displayName: "CS Program",
	    supportedAlignments: [ "block", "full-width" ],
	    widget: CSProgram
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var classNames = __webpack_require__(13);

	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var ApiClassNames = __webpack_require__(18).ClassNames;

	var ApiOptions = __webpack_require__(18).Options;

	var InlineIcon = __webpack_require__(89);

	var styleConstants = __webpack_require__(37);

	var _require2 = __webpack_require__(92), iconDropdownArrow = _require2.iconDropdownArrow;

	var captureScratchpadTouchStart = __webpack_require__(17).captureScratchpadTouchStart;

	var dropdownArrowSize = 24;

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
	            "perseus-widget-dropdown": true
	        });
	        return React.createElement("div", null, React.createElement("select", {
	            onChange: this._handleChangeEvent,
	            onTouchStart: captureScratchpadTouchStart,
	            className: selectClasses + " " + css(styles.dropdown) + " " + ApiClassNames.INTERACTIVE,
	            disabled: this.props.apiOptions.readOnly,
	            value: this.props.selected
	        }, React.createElement("option", {
	            value: 0,
	            disabled: true
	        }, this.props.placeholder), choices.map(function(choice, i) {
	            return React.createElement("option", {
	                key: "" + (i + 1),
	                value: i + 1
	            }, choice);
	        })), React.createElement(InlineIcon, _extends({}, iconDropdownArrow, {
	            style: {
	                marginLeft: "-" + dropdownArrowSize + "px",
	                height: dropdownArrowSize,
	                width: dropdownArrowSize
	            }
	        })));
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
	        this.props.onChange({
	            selected: selected
	        });
	    },
	    getUserInput: function getUserInput() {
	        return {
	            value: this.props.selected
	        };
	    },
	    simpleValidate: function simpleValidate(rubric) {
	        return Dropdown.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Dropdown, {
	    validate: function validate(state, rubric) {
	        var selected = state.value;
	        if (0 === selected) return {
	            type: "invalid",
	            message: null
	        };
	        return {
	            type: "points",
	            earned: rubric.choices[selected - 1].correct ? 1 : 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	var propTransform = function propTransform(editorProps) {
	    return {
	        placeholder: editorProps.placeholder,
	        choices: _.map(editorProps.choices, function(choice) {
	            return choice.content;
	        })
	    };
	};

	var styles = StyleSheet.create({
	    dropdown: {
	        appearance: "none",
	        backgroundColor: "transparent",
	        border: "1px solid " + styleConstants.gray76,
	        borderRadius: 4,
	        boxShadow: "none",
	        fontFamily: styleConstants.baseFontFamily,
	        padding: "9px " + (dropdownArrowSize + 1) + "px 9px 9px",
	        ":focus": {
	            outline: "none",
	            border: "2px solid " + styleConstants.kaGreen,
	            padding: "8px " + dropdownArrowSize + "px 8px 8px"
	        },
	        ":focus + svg": {
	            color: "" + styleConstants.kaGreen
	        },
	        ":disabled": {
	            color: styleConstants.gray68
	        },
	        ":disabled + svg": {
	            color: styleConstants.gray68
	        }
	    }
	});

	module.exports = {
	    name: "dropdown",
	    displayName: "Drop down",
	    defaultAlignment: "inline-block",
	    accessible: true,
	    widget: Dropdown,
	    transform: propTransform
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _explanationLink, _mobileExplanationLin;

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, object-curly-spacing, react/forbid-prop-types, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Changeable = __webpack_require__(88);

	var PerseusApi = __webpack_require__(18);

	var Renderer = __webpack_require__(8);

	var mediaQueries = __webpack_require__(35);

	var styleConstants = __webpack_require__(37);

	var defaultExplanationProps = {
	    showPrompt: "Explain",
	    hidePrompt: "Hide explanation",
	    explanation: "explanation goes here\n\nmore explanation",
	    widgets: {},
	    highlightLint: false
	};

	var Explanation = React.createClass({
	    displayName: "Explanation",
	    propTypes: _extends({}, Changeable.propTypes, {
	        apiOptions: PerseusApi.Options.propTypes,
	        explanation: React.PropTypes.string,
	        hidePrompt: React.PropTypes.string,
	        showPrompt: React.PropTypes.string,
	        trackInteraction: React.PropTypes.func.isRequired,
	        widgets: React.PropTypes.object,
	        highlightLint: React.PropTypes.bool
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return defaultExplanationProps;
	    },
	    getInitialState: function getInitialState() {
	        return {
	            expanded: false
	        };
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    _onClick: function _onClick() {
	        this.setState({
	            expanded: !this.state.expanded
	        });
	        this.props.trackInteraction();
	    },
	    render: function render() {
	        var Link = this.props.apiOptions.baseElements.Link;
	        var _props$apiOptions = this.props.apiOptions, readOnly = _props$apiOptions.readOnly, isMobile = _props$apiOptions.isMobile;
	        var linkAnchor = this.state.expanded ? this.props.hidePrompt : this.props.showPrompt;
	        var linkContainer = void 0;
	        var href = readOnly ? null : "javascript:void(0)";
	        var onClick = readOnly ? null : this._onClick;
	        linkContainer = isMobile ? React.createElement("div", {
	            className: css(styles.linkContainer)
	        }, React.createElement("a", {
	            className: css(styles.mobileExplanationLink),
	            href: href,
	            onClick: onClick
	        }, linkAnchor), this.state.expanded && React.createElement("svg", {
	            className: css(styles.disclosureArrow)
	        }, React.createElement("polygon", {
	            style: {
	                fill: backgroundColor
	            },
	            points: "0," + arrowHeight + " " + arrowWidth + "," + arrowHeight + " " + arrowWidth / 2 + ",0"
	        }))) : React.createElement("div", {
	            className: css(styles.linkContainer)
	        }, React.createElement(Link, {
	            className: css(styles.explanationLink),
	            href: href,
	            onClick: onClick
	        }, "[" + linkAnchor + "]"));
	        var expandedStyle = isMobile ? styles.contentExpandedMobile : styles.contentExpanded;
	        return React.createElement("div", {
	            className: css(styles.container)
	        }, linkContainer, React.createElement("div", {
	            className: css(styles.content, isMobile && styles.contentMobile, this.state.expanded && expandedStyle),
	            style: {
	                height: this.state.expanded ? "auto" : 0,
	                overflow: this.state.expanded ? "visible" : "hidden"
	            },
	            ref: "content"
	        }, React.createElement(Renderer, {
	            apiOptions: this.props.apiOptions,
	            content: this.props.explanation,
	            widgets: this.props.widgets,
	            highlightLint: this.props.highlightLint
	        })));
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
	        display: "inline",
	        position: "relative"
	    },
	    linkContainer: {
	        display: "inline-block"
	    },
	    explanationLink: (_explanationLink = {
	        fontStyle: "italic",
	        color: "#007d96"
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
	    mobileExplanationLink: (_mobileExplanationLin = {
	        color: styleConstants.kaGreen,
	        borderBottom: "dashed 1px " + styleConstants.kaGreen,
	        textDecoration: "none"
	    }, _mobileExplanationLin[mediaQueries.xl] = {
	        fontSize: 22,
	        lineHeight: 1.4
	    }, _mobileExplanationLin[mediaQueries.lgOrSmaller] = {
	        fontSize: 20,
	        lineHeight: 1.5
	    }, _mobileExplanationLin[mediaQueries.smOrSmaller] = {
	        fontSize: 18,
	        lineHeight: 1.2
	    }, _mobileExplanationLin),
	    content: {
	        position: "relative",
	        transition: "margin-top 0.1s"
	    },
	    contentExpanded: {
	        borderLeft: "5px solid #ccc",
	        marginLeft: -leftBorderSpacing,
	        paddingLeft: leftBorderSpacing,
	        paddingBottom: verticalContentPadding,
	        // Note: we still use arrow height as the vertical margin, even on
	        // desktop when there is no arrow, but it's good enough.
	        marginBottom: arrowHeight,
	        marginTop: arrowHeight
	    },
	    contentExpandedMobile: {
	        boxSizing: "content-box",
	        paddingTop: 32,
	        paddingBottom: 32,
	        marginTop: arrowHeight
	    },
	    contentMobile: {
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
	        left: "50%",
	        marginLeft: -arrowWidth / 2,
	        position: "absolute",
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
	    transform: _.identity,
	    isLintable: true
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _definitionLink, _mobileDefinitionLink;

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Changeable = __webpack_require__(88);

	var PerseusApi = __webpack_require__(18);

	var Renderer = __webpack_require__(8);

	var mediaQueries = __webpack_require__(35);

	var styleConstants = __webpack_require__(37);

	var Definition = React.createClass({
	    displayName: "Definition",
	    propTypes: _extends({}, Changeable.propTypes, {
	        apiOptions: PerseusApi.Options.propTypes,
	        definition: React.PropTypes.string,
	        togglePrompt: React.PropTypes.string,
	        trackInteraction: React.PropTypes.func.isRequired
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            togglePrompt: "define me",
	            definition: "definition goes here"
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            expanded: false,
	            contentOffsetLeft: 0
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        var _this = this;
	        // need to wait for aphrodite styles to be rendered
	        // so they can accessed for measurements in positionContent
	        setTimeout(function() {
	            _this._positionContent();
	        }, 0);
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    close: function close() {
	        this.setState({
	            expanded: false
	        });
	    },
	    _onClick: function _onClick() {
	        // close all other open definitions if opening definition
	        if (!this.state.expanded) {
	            var definitionWidgets = this.props.findWidgets("definition");
	            for (var _iterator = definitionWidgets, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
	                var _ref;
	                if (_isArray) {
	                    if (_i >= _iterator.length) break;
	                    _ref = _iterator[_i++];
	                } else {
	                    _i = _iterator.next();
	                    if (_i.done) break;
	                    _ref = _i.value;
	                }
	                var widget = _ref;
	                widget !== this && widget.close();
	            }
	        }
	        this.setState({
	            expanded: !this.state.expanded
	        });
	        this.props.trackInteraction();
	    },
	    _onMouseOver: function _onMouseOver() {
	        this.setState({
	            expanded: true
	        });
	        this.props.trackInteraction();
	    },
	    _onMouseOut: function _onMouseOut() {
	        this.setState({
	            expanded: false
	        });
	        this.props.trackInteraction();
	    },
	    /**
	    * This function positions the definition boxes so that the complete box
	    * is visible on the screen. If the word to be defined is too far to the
	    * right or left, the definition box cannot be centered (which is the
	    * default).
	    */
	    _positionContent: function _positionContent() {
	        // container is the word to be defined
	        // content is the actual definition
	        var documentWidth = document.body.clientWidth;
	        var marginWidth = this.container.parentElement.parentElement.offsetLeft;
	        var containerOffsetLeft = this.container.offsetLeft - marginWidth;
	        var containerWidth = this.container.offsetWidth;
	        var contentWidth = this.content.offsetWidth;
	        // calculate how far the arrow head is to the left
	        var arrowOffsetLeft = containerOffsetLeft + .5 * containerWidth;
	        // where the content box should be placed if not a literal edge case
	        var defaultLeft = -.5 * contentWidth + .5 * containerWidth;
	        // calculate how far the arrow head is from the right
	        var arrowOffsetRight = documentWidth - 2 * marginWidth - arrowOffsetLeft;
	        var contentLeft = void 0;
	        // left edge case
	        contentLeft = arrowOffsetLeft <= contentWidth / 2 ? containerWidth / 2 - arrowOffsetLeft : arrowOffsetRight <= contentWidth / 2 ? defaultLeft + (arrowOffsetRight - .5 * contentWidth) : defaultLeft;
	        this.setState({
	            contentOffsetLeft: contentLeft
	        });
	    },
	    render: function render() {
	        var _this2 = this;
	        var _props$apiOptions = this.props.apiOptions, readOnly = _props$apiOptions.readOnly, isMobile = _props$apiOptions.isMobile;
	        var linkAnchor = this.props.togglePrompt;
	        var link = void 0;
	        var href = readOnly ? null : "javascript:void(0)";
	        var onClick = readOnly ? null : this._onClick;
	        var onMouseOver = this._onMouseOver;
	        var onMouseOut = this._onMouseOut;
	        link = isMobile ? React.createElement("a", {
	            className: css(styles.mobileDefinitionLink),
	            href: href,
	            onClick: onClick
	        }, linkAnchor) : React.createElement("a", {
	            className: css(styles.definitionLink),
	            href: href,
	            onMouseOver: onMouseOver,
	            onMouseOut: onMouseOut
	        }, linkAnchor);
	        var expandedStyle = isMobile ? styles.contentExpandedMobile : styles.contentExpanded;
	        return React.createElement("div", {
	            className: css(styles.container),
	            ref: function ref(e) {
	                return _this2.container = e;
	            }
	        }, React.createElement("div", {
	            className: css(styles.linkContainer)
	        }, link, this.state.expanded && React.createElement("svg", {
	            className: css(styles.disclosureArrow)
	        }, React.createElement("polygon", {
	            style: {
	                fill: backgroundColor
	            },
	            points: "0," + arrowHeight + " " + arrowWidth + "," + arrowHeight + " " + arrowWidth / 2 + ",0"
	        }))), React.createElement("div", {
	            className: css(styles.content, isMobile && styles.contentMobile, this.state.expanded && expandedStyle),
	            style: {
	                height: this.state.expanded ? "auto" : 0,
	                overflow: this.state.expanded ? "visible" : "hidden",
	                left: this.state.contentOffsetLeft
	            },
	            ref: function ref(e) {
	                return _this2.content = e;
	            }
	        }, React.createElement(Renderer, {
	            apiOptions: this.props.apiOptions,
	            content: this.props.definition,
	            widgets: this.props.widgets
	        })));
	    }
	});

	var arrowWidth = 28;

	var arrowHeight = 14;

	var backgroundColor = styleConstants.gray95;

	var styles = StyleSheet.create({
	    container: {
	        display: "inline",
	        position: "relative"
	    },
	    linkContainer: {
	        display: "inline-block"
	    },
	    definitionLink: (_definitionLink = {
	        color: styleConstants.blue,
	        borderBottom: "dashed 1px " + styleConstants.blue,
	        textDecoration: "none"
	    }, _definitionLink[mediaQueries.xl] = {
	        fontSize: 20,
	        lineHeight: 1.1
	    }, _definitionLink[mediaQueries.lgOrSmaller] = {
	        fontSize: 17,
	        lineHeight: 1.4
	    }, _definitionLink[mediaQueries.smOrSmaller] = {
	        fontSize: 14,
	        lineHeight: 1.3
	    }, _definitionLink),
	    mobileDefinitionLink: (_mobileDefinitionLink = {
	        color: styleConstants.kaGreen,
	        borderBottom: "dashed 1px " + styleConstants.kaGreen,
	        textDecoration: "none"
	    }, _mobileDefinitionLink[mediaQueries.xl] = {
	        fontSize: 22,
	        lineHeight: 1.4
	    }, _mobileDefinitionLink[mediaQueries.lgOrSmaller] = {
	        fontSize: 20,
	        lineHeight: 1.5
	    }, _mobileDefinitionLink[mediaQueries.smOrSmaller] = {
	        fontSize: 18,
	        lineHeight: 1.2
	    }, _mobileDefinitionLink),
	    content: {
	        background: backgroundColor,
	        position: "absolute",
	        width: 200,
	        transition: "margin-top 0.1s",
	        paddingLeft: styleConstants.phoneMargin,
	        paddingRight: styleConstants.phoneMargin,
	        zIndex: 2
	    },
	    contentExpanded: {
	        marginTop: arrowHeight
	    },
	    contentExpandedMobile: {
	        paddingTop: 32,
	        paddingBottom: 32,
	        marginTop: arrowHeight
	    },
	    disclosureArrow: {
	        // HACK - positioning at "bottom: 0", doesn't actually position it to
	        // the real bottom, because the container is `inline-block`, and it
	        // seems to position it to the baseline? We put in a generous
	        // fudge factor to position it down to be flush with the content box
	        // below it.
	        bottom: -(arrowHeight + 5),
	        height: arrowHeight,
	        left: "50%",
	        marginLeft: -arrowWidth / 2,
	        position: "absolute",
	        width: arrowWidth,
	        zIndex: 4
	    }
	});

	module.exports = {
	    name: "definition",
	    displayName: "Definition",
	    defaultAlignment: "inline",
	    widget: Definition,
	    transform: _.identity
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable brace-style, comma-dangle, indent, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Interactive2 = __webpack_require__(109);

	var SvgImage = __webpack_require__(33);

	var Util = __webpack_require__(17);

	var ButtonGroup = __webpack_require__(110);

	/* Graphie and relevant components. */
	var Graphie = __webpack_require__(94);

	var MovablePoint = Graphie.MovablePoint;

	var MovableLine = Graphie.MovableLine;

	var WrappedLine = __webpack_require__(111);

	var knumber = __webpack_require__(165).number;

	var kvector = __webpack_require__(165).vector;

	var kpoint = __webpack_require__(165).point;

	var KhanColors = __webpack_require__(112);

	var _require = __webpack_require__(80), containerSizeClassPropType = _require.containerSizeClassPropType;

	var _require2 = __webpack_require__(37), interactiveSizes = _require2.interactiveSizes;

	var _require3 = __webpack_require__(80), getInteractiveBoxFromSizeClass = _require3.getInteractiveBoxFromSizeClass;

	/* Mixins. */
	var Changeable = __webpack_require__(88);

	var _require4 = __webpack_require__(127), GrapherUtil = _require4.GrapherUtil, typeToButton = _require4.typeToButton, functionForType = _require4.functionForType, DEFAULT_GRAPHER_PROPS = _require4.DEFAULT_GRAPHER_PROPS;

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
	    propTypes: _extends({}, Changeable.propTypes, {
	        flexibleType: React.PropTypes.bool,
	        graph: React.PropTypes.any,
	        hideHairlines: React.PropTypes.func,
	        isMobile: React.PropTypes.bool,
	        model: React.PropTypes.any,
	        onChange: React.PropTypes.func,
	        setDrawingAreaAvailable: React.PropTypes.func,
	        showHairlines: React.PropTypes.func,
	        showTooltips: React.PropTypes.bool,
	        static: React.PropTypes.bool
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            graph: {
	                range: [ [ -10, 10 ], [ -10, 10 ] ],
	                step: [ 1, 1 ]
	            },
	            coords: null,
	            asymptote: null,
	            isMobile: false
	        };
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    render: function render() {
	        var _this = this;
	        var pointForCoord = function pointForCoord(coord, i) {
	            return React.createElement(MovablePoint, {
	                key: i,
	                coord: coord,
	                static: _this.props.static,
	                constraints: [ Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function(coord) {
	                    // Always enforce that this is a function
	                    var isFunction = _.all(_this._coords(), function(otherCoord, j) {
	                        return i === j || !otherCoord || !knumber.equal(coord[0], otherCoord[0]);
	                    });
	                    // Evaluate this criteria before per-point constraints
	                    if (!isFunction) return false;
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
	                } ],
	                onMove: function onMove(newCoord, oldCoord) {
	                    var coords;
	                    // Reflect over asymptote, if allowed
	                    var asymptote = _this._asymptote();
	                    coords = asymptote && _this.props.model.allowReflectOverAsymptote && isFlipped(newCoord, oldCoord, asymptote) ? _.map(_this._coords(), function(coord) {
	                        return kpoint.reflectOverLine(coord, asymptote);
	                    }) : _.clone(_this._coords());
	                    coords[i] = newCoord;
	                    _this.props.onChange({
	                        coords: coords
	                    });
	                },
	                showHairlines: _this.props.showHairlines,
	                hideHairlines: _this.props.hideHairlines,
	                showTooltips: _this.props.showTooltips,
	                isMobile: _this.props.isMobile
	            });
	        };
	        var points = _.map(this._coords(), pointForCoord);
	        var box = this.props.graph.box;
	        var imageDescription = this.props.graph.backgroundImage;
	        var image = null;
	        if (imageDescription.url) {
	            var scale = box[0] / interactiveSizes.defaultBoxSize;
	            image = React.createElement(SvgImage, {
	                src: imageDescription.url,
	                width: imageDescription.width,
	                height: imageDescription.height,
	                scale: scale
	            });
	        }
	        return React.createElement("div", {
	            className: "perseus-widget perseus-widget-grapher",
	            style: {
	                width: box[0],
	                height: this.props.flexibleType ? "auto" : box[1],
	                boxSizing: "initial"
	            }
	        }, React.createElement("div", {
	            className: "graphie-container above-scratchpad",
	            style: {
	                width: box[0],
	                height: box[1]
	            }
	        }, image, React.createElement(Graphie, _extends({}, this.props.graph, {
	            setDrawingAreaAvailable: this.props.setDrawingAreaAvailable
	        }), this.props.model && this.renderPlot(), this.props.model && this.renderAsymptote(), this.props.model && points)));
	    },
	    renderPlot: function renderPlot() {
	        var model = this.props.model;
	        var xRange = this.props.graph.range[0];
	        var style = _extends({
	            stroke: this.props.isMobile ? KhanColors.BLUE_C : KhanColors.DYNAMIC
	        }, this.props.isMobile ? {
	            "stroke-width": 3
	        } : {});
	        var coeffs = model.getCoefficients(this._coords(), this._asymptote());
	        if (!coeffs) return;
	        var functionProps = model.getPropsForCoeffs(coeffs, xRange);
	        return React.createElement(model.Movable, _extends({}, functionProps, {
	            key: this.props.model.url,
	            range: xRange,
	            style: style
	        }));
	    },
	    renderAsymptote: function renderAsymptote() {
	        var _this2 = this;
	        var model = this.props.model;
	        var graph = this.props.graph;
	        var asymptote = this._asymptote();
	        var dashed = {
	            strokeDasharray: "- "
	        };
	        return asymptote && React.createElement(MovableLine, {
	            onMove: function onMove(newCoord, oldCoord) {
	                // Calculate and apply displacement
	                var delta = kvector.subtract(newCoord, oldCoord);
	                var newAsymptote = _.map(_this2._asymptote(), function(coord) {
	                    return kvector.add(coord, delta);
	                });
	                _this2.props.onChange({
	                    asymptote: newAsymptote
	                });
	            },
	            constraints: [ Interactive2.MovableLine.constraints.bound(), Interactive2.MovableLine.constraints.snap(), function(newCoord, oldCoord) {
	                // Calculate and apply proposed displacement
	                var delta = kvector.subtract(newCoord, oldCoord);
	                var proposedAsymptote = _.map(_this2._asymptote(), function(coord) {
	                    return kvector.add(coord, delta);
	                });
	                // Verify that resulting asymptote is valid for graph
	                if (model.extraAsymptoteConstraint) return model.extraAsymptoteConstraint(newCoord, oldCoord, _this2._coords(), proposedAsymptote, graph);
	                return true;
	            } ],
	            normalStyle: dashed,
	            highlightStyle: dashed
	        }, _.map(asymptote, function(coord, i) {
	            return React.createElement(MovablePoint, {
	                key: "asymptoteCoord-" + i,
	                coord: coord,
	                static: true,
	                draw: null,
	                extendLine: true,
	                showHairlines: _this2.props.showHairlines,
	                hideHairlines: _this2.props.hideHairlines,
	                showTooltips: _this2.props.showTooltips,
	                isMobile: _this2.props.isMobile
	            });
	        }));
	    }
	});

	/* Widget and editor. */
	var Grapher = React.createClass({
	    displayName: "Grapher",
	    propTypes: {
	        apiOptions: React.PropTypes.any,
	        availableTypes: React.PropTypes.arrayOf(React.PropTypes.any),
	        containerSizeClass: containerSizeClassPropType.isRequired,
	        graph: React.PropTypes.any,
	        markings: React.PropTypes.string,
	        onChange: React.PropTypes.func,
	        plot: React.PropTypes.any,
	        static: React.PropTypes.bool,
	        trackInteraction: React.PropTypes.func.isRequired
	    },
	    getDefaultProps: function getDefaultProps() {
	        return DEFAULT_GRAPHER_PROPS;
	    },
	    render: function render() {
	        var type = this.props.plot.type;
	        var coords = this.props.plot.coords;
	        var asymptote = this.props.plot.asymptote;
	        var typeSelector = React.createElement("div", {
	            style: typeSelectorStyle,
	            className: "above-scratchpad"
	        }, React.createElement(ButtonGroup, {
	            value: type,
	            allowEmpty: true,
	            buttons: _.map(this.props.availableTypes, typeToButton),
	            onChange: this.handleActiveTypeChange
	        }));
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
	            static: this.props.static,
	            setDrawingAreaAvailable: this.props.apiOptions.setDrawingAreaAvailable,
	            isMobile: this.props.apiOptions.isMobile,
	            showTooltips: this.props.graph.showTooltips,
	            showHairlines: this.showHairlines,
	            hideHairlines: this.hideHairlines
	        };
	        return React.createElement("div", null, React.createElement(FunctionGrapher, grapherProps), this.props.availableTypes.length > 1 && typeSelector);
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
	        return _.map(options.step, function(step, i) {
	            return Util.gridDimensionConfig(step, options.range[i], options.box[i], options.gridStep[i]);
	        });
	    },
	    _calculateMobileTickStep: function _calculateMobileTickStep(gridStep, step, ranges) {
	        var tickStep = Util.constrainedTickStepsFromTickSteps(step, ranges);
	        // According to the graphInit documentation in graphie.js, tickStep is
	        // relative to the grid units so we need to adjust all values by the
	        // grid step.
	        tickStep[0] = tickStep[0] / gridStep[0];
	        tickStep[1] = tickStep[1] / gridStep[1];
	        return tickStep;
	    },
	    _setupGraphie: function _setupGraphie(graphie, options) {
	        var isMobile = this.props.apiOptions.isMobile;
	        if ("graph" === options.markings) {
	            graphie.graphInit({
	                range: options.range,
	                scale: _.pluck(options.gridConfig, "scale"),
	                axisArrows: "<->",
	                labelFormat: function labelFormat(s) {
	                    return "\\small{" + s + "}";
	                },
	                gridStep: options.gridStep,
	                snapStep: options.snapStep,
	                tickStep: isMobile ? this._calculateMobileTickStep(options.gridStep, options.step, options.range) : _.pluck(options.gridConfig, "tickStep"),
	                labelStep: 1,
	                unityLabels: _.pluck(options.gridConfig, "unityLabel"),
	                isMobile: isMobile
	            });
	            graphie.label([ 0, options.range[1][1] ], options.labels[1], isMobile ? "below right" : "above");
	            graphie.label([ options.range[0][1], 0 ], options.labels[0], isMobile ? "above left" : "right");
	        } else "grid" === options.markings ? graphie.graphInit({
	            range: options.range,
	            scale: _.pluck(options.gridConfig, "scale"),
	            gridStep: options.gridStep,
	            axes: false,
	            ticks: false,
	            labels: false,
	            isMobile: isMobile
	        }) : "none" === options.markings && graphie.init({
	            range: options.range,
	            scale: _.pluck(options.gridConfig, "scale")
	        });
	        if (this.props.apiOptions.isMobile) {
	            var hairlineStyle = {
	                normalStyle: {
	                    strokeWidth: 1
	                }
	            };
	            this.horizHairline = new WrappedLine(graphie, [ 0, 0 ], [ 0, 0 ], hairlineStyle);
	            this.horizHairline.attr({
	                stroke: KhanColors.INTERACTIVE
	            });
	            this.horizHairline.hide();
	            this.vertHairline = new WrappedLine(graphie, [ 0, 0 ], [ 0, 0 ], hairlineStyle);
	            this.vertHairline.attr({
	                stroke: KhanColors.INTERACTIVE
	            });
	            this.vertHairline.hide();
	        }
	    },
	    showHairlines: function showHairlines(point) {
	        if (this.props.apiOptions.isMobile && "none" !== this.props.markings) {
	            // Hairlines are already initialized when the graph is loaded, so
	            // here we just move them to the updated location and make them
	            // visible.
	            this.horizHairline.moveTo([ this.props.graph.range[0][0], point[1] ], [ this.props.graph.range[0][1], point[1] ]);
	            this.horizHairline.show();
	            this.vertHairline.moveTo([ point[0], this.props.graph.range[1][0] ], [ point[0], this.props.graph.range[1][1] ]);
	            this.vertHairline.show();
	        }
	    },
	    hideHairlines: function hideHairlines() {
	        if (this.props.apiOptions.isMobile) {
	            this.horizHairline.hide();
	            this.vertHairline.hide();
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
	    if (1 === widgetProps.availableTypes.length) {
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
	        availableTypes: [ editorProps.correct.type ],
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable react/forbid-prop-types */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	/* globals i18n */
	var classNames = __webpack_require__(13);

	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var ApiOptions = __webpack_require__(18).Options;

	var Changeable = __webpack_require__(88);

	var _require = __webpack_require__(92), iconOk = _require.iconOk, iconRemove = _require.iconRemove;

	var InlineIcon = __webpack_require__(89);

	var Renderer = __webpack_require__(8);

	var GradedGroupAnswerBar = __webpack_require__(113);

	var _require2 = __webpack_require__(37), gray76 = _require2.gray76, phoneMargin = _require2.phoneMargin, negativePhoneMargin = _require2.negativePhoneMargin, tableBackgroundAccent = _require2.tableBackgroundAccent, kaGreen = _require2.kaGreen;

	var _require3 = __webpack_require__(14), StyleSheet = _require3.StyleSheet, css = _require3.css;

	// A Graded Group is more or less a Group widget that displays a check
	// answer button below the rendered content. When clicked, the widget grades
	// the stuff inside and displays feedback about whether the inputted answer was
	// correct or not.
	var GRADING_STATUSES = {
	    ungraded: "ungraded",
	    correct: "correct",
	    incorrect: "incorrect",
	    invalid: "invalid"
	};

	var ANSWER_BAR_STATES = GradedGroupAnswerBar.ANSWER_BAR_STATES;

	// Update answer bar state based on current state and whether the question is
	// answerable (all parts have been filled out) or not.
	var getNextState = function getNextState(currentState, answerable) {
	    switch (currentState) {
	      case ANSWER_BAR_STATES.HIDDEN:
	        return answerable ? ANSWER_BAR_STATES.ACTIVE : currentState;

	      case ANSWER_BAR_STATES.ACTIVE:
	        return answerable ? currentState : ANSWER_BAR_STATES.INACTIVE;

	      case ANSWER_BAR_STATES.INACTIVE:
	        return answerable ? ANSWER_BAR_STATES.ACTIVE : currentState;

	      case ANSWER_BAR_STATES.INCORRECT:
	        return answerable ? ANSWER_BAR_STATES.ACTIVE : ANSWER_BAR_STATES.INACTIVE;

	      default:
	        return currentState;
	    }
	};

	// Prepended to all invalid messages to make the widget messages a bit clearer
	var INVALID_MESSAGE_PREFIX = "We couldn't grade your answer.";

	var DEFAULT_INVALID_MESSAGE = "It looks like you left something blank or entered in an invalid answer.";

	var GradedGroup = React.createClass({
	    displayName: "GradedGroup",
	    propTypes: _extends({}, Changeable.propTypes, {
	        apiOptions: ApiOptions.propTypes,
	        content: React.PropTypes.string,
	        hasHint: React.PropTypes.bool,
	        hint: React.PropTypes.object,
	        images: React.PropTypes.object,
	        inGradedGroupSet: React.PropTypes.bool,
	        onBlur: React.PropTypes.func,
	        onFocus: React.PropTypes.func,
	        // The function to call when clicking "Next question" after correctly
	        // answering one graded group out of a set. If this is null, the
	        // "Next question" button will not appear.
	        onNextQuestion: React.PropTypes.func,
	        title: React.PropTypes.string,
	        trackInteraction: React.PropTypes.func.isRequired,
	        widgets: React.PropTypes.object,
	        highlightLint: React.PropTypes.bool
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            title: "",
	            content: "",
	            widgets: {},
	            images: {},
	            hint: null,
	            hasHint: false,
	            highlightLint: false
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            status: GRADING_STATUSES.ungraded,
	            showHint: false,
	            message: "",
	            answerBarState: ANSWER_BAR_STATES.HIDDEN
	        };
	    },
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        return nextProps !== this.props || nextState !== this.state;
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
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
	            var emptyWidgets = this.refs.renderer.emptyWidgets();
	            var answerable = 0 === emptyWidgets.length;
	            var answerBarState = this.state.answerBarState;
	            this.setState({
	                answerBarState: getNextState(answerBarState, answerable)
	            });
	        }
	    },
	    _checkAnswer: function _checkAnswer() {
	        var score = this.refs.renderer.score();
	        var status = void 0;
	        var message = void 0;
	        if ("points" === score.type) {
	            status = score.total === score.earned ? GRADING_STATUSES.correct : GRADING_STATUSES.incorrect;
	            message = score.message || "";
	        } else {
	            // score.type is "invalid"
	            status = GRADING_STATUSES.invalid;
	            message = score.message ? INVALID_MESSAGE_PREFIX + " " + score.message : INVALID_MESSAGE_PREFIX + " " + DEFAULT_INVALID_MESSAGE;
	        }
	        this.setState({
	            status: status,
	            message: message,
	            // TODO(kevinb) handle 'invalid' status
	            answerBarState: "correct" === status ? ANSWER_BAR_STATES.CORRECT : ANSWER_BAR_STATES.INCORRECT
	        });
	        this.props.trackInteraction({
	            status: status
	        });
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
	    },
	    render: function render() {
	        var _this = this, _classNames;
	        var apiOptions = _.extend({}, ApiOptions.defaults, this.props.apiOptions, {
	            // Api Rewriting to support correct onFocus/onBlur
	            // events for the mobile API
	            onFocusChange: function onFocusChange(newFocus, oldFocus) {
	                oldFocus && _this.props.onBlur(oldFocus);
	                newFocus && _this.props.onFocus(newFocus);
	            }
	        });
	        var icon = null;
	        // Colors are 10% darker than the colors in graded-group.less
	        this.state.status === GRADING_STATUSES.correct ? icon = React.createElement(InlineIcon, _extends({}, iconOk, {
	            style: {
	                color: "#526f03"
	            }
	        })) : this.state.status === GRADING_STATUSES.incorrect && (icon = React.createElement(InlineIcon, _extends({}, iconRemove, {
	            style: {
	                color: "#ff5454"
	            }
	        })));
	        var mobileClass = css(this.props.inGradedGroupSet ? styles.gradedGroupInSet : styles.gradedGroup);
	        var classes = classNames((_classNames = {}, _classNames[mobileClass] = apiOptions.isMobile, 
	        _classNames["perseus-graded-group"] = true, _classNames["answer-correct"] = !apiOptions.isMobile && this.state.status === GRADING_STATUSES.correct, 
	        _classNames["answer-incorrect"] = !apiOptions.isMobile && this.state.status === GRADING_STATUSES.incorrect, 
	        _classNames));
	        var answerBarState = this.state.answerBarState;
	        // Disabled widgets after the answer has been answered correctly to
	        // prevent a situation where the answer has been marked correct but
	        // looks incorrect because a user has modified it afterwards.
	        var isCorrect = answerBarState === ANSWER_BAR_STATES.CORRECT;
	        var readOnly = apiOptions.readOnly || apiOptions.isMobile && isCorrect;
	        return React.createElement("div", {
	            className: classes
	        }, !!this.props.title && React.createElement("div", {
	            className: css(styles.title)
	        }, this.props.title), React.createElement(Renderer, _extends({}, this.props, {
	            ref: "renderer",
	            apiOptions: _extends({}, apiOptions, {
	                readOnly: readOnly
	            }),
	            onInteractWithWidget: this._onInteractWithWidget,
	            highlightLint: this.props.highlightLint
	        })), !apiOptions.isMobile && icon && React.createElement("div", {
	            className: "group-icon"
	        }, icon), !apiOptions.isMobile && React.createElement("p", null, this.state.message), !apiOptions.isMobile && React.createElement("input", {
	            type: "button",
	            value: i18n._("Check"),
	            className: "simple-button",
	            disabled: this.props.apiOptions.readOnly,
	            onClick: this._checkAnswer
	        }), !apiOptions.isMobile && isCorrect && this.props.onNextQuestion && React.createElement("input", {
	            type: "button",
	            value: i18n._("Next question"),
	            className: "simple-button",
	            disabled: this.props.apiOptions.readOnly,
	            onClick: this.props.onNextQuestion,
	            style: {
	                marginLeft: 5
	            }
	        }), this.props.hint && this.props.hint.content && (this.state.showHint ? React.createElement("div", null, React.createElement("div", {
	            className: css(styles.explanationTitle),
	            onClick: function onClick() {
	                return _this.setState({
	                    showHint: false
	                });
	            }
	        }, i18n._("Hide explanation")), React.createElement(Renderer, _extends({}, this.props.hint, {
	            ref: "hints-renderer",
	            apiOptions: apiOptions,
	            highlightLint: this.props.highlightLint
	        }))) : React.createElement("div", {
	            onClick: function onClick() {
	                return _this.setState({
	                    showHint: true
	                });
	            },
	            className: css(styles.showHintLink)
	        }, i18n._("Explain"))), apiOptions.isMobile && answerBarState !== ANSWER_BAR_STATES.HIDDEN && React.createElement(GradedGroupAnswerBar, {
	            apiOptions: apiOptions,
	            answerBarState: answerBarState,
	            onCheckAnswer: this._checkAnswer,
	            onNextQuestion: this.props.onNextQuestion
	        }));
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
	    tracking: "all",
	    isLintable: true
	};

	var styles = StyleSheet.create({
	    gradedGroupInSet: {
	        // Reset a few desktop-only styles that come from graded-group.less
	        marginLeft: 0,
	        paddingLeft: 0
	    },
	    gradedGroup: {
	        borderTop: "1px solid " + gray76,
	        borderBottom: "1px solid " + gray76,
	        backgroundColor: tableBackgroundAccent,
	        marginLeft: negativePhoneMargin,
	        marginRight: negativePhoneMargin,
	        paddingBottom: phoneMargin,
	        paddingLeft: phoneMargin,
	        paddingRight: phoneMargin,
	        paddingTop: 10,
	        width: "auto"
	    },
	    showHintLink: {
	        marginTop: 20,
	        color: kaGreen,
	        cursor: "pointer"
	    },
	    explanationTitle: {
	        marginTop: 20,
	        color: kaGreen,
	        marginBottom: 10,
	        cursor: "pointer"
	    },
	    title: {
	        fontSize: 12,
	        color: gray76,
	        textTransform: "uppercase",
	        marginBottom: 11,
	        letterSpacing: .8
	    }
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable react/forbid-prop-types */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var ApiOptions = __webpack_require__(18).Options;

	var Changeable = __webpack_require__(88);

	var GradedGroup = __webpack_require__(51).widget;

	var _require2 = __webpack_require__(37), grayLight = _require2.grayLight, gray76 = _require2.gray76, tableBackgroundAccent = _require2.tableBackgroundAccent, kaGreen = _require2.kaGreen, phoneMargin = _require2.phoneMargin, negativePhoneMargin = _require2.negativePhoneMargin;

	var Indicators = React.createClass({
	    displayName: "Indicators",
	    propTypes: {
	        currentGroup: React.PropTypes.number.isRequired,
	        numGroups: React.PropTypes.number.isRequired,
	        onChangeCurrentGroup: React.PropTypes.func.isRequired
	    },
	    render: function render() {
	        var _this = this;
	        var items = [];
	        var _loop = function _loop(i) {
	            items.push(React.createElement("div", {
	                key: i,
	                className: css(styles.indicator, i === _this.props.currentGroup && styles.selectedIndicator),
	                onClick: function onClick() {
	                    return _this.props.onChangeCurrentGroup(i);
	                }
	            }));
	        };
	        for (var i = 0; i < this.props.numGroups; i++) _loop(i);
	        return React.createElement("div", {
	            className: css(styles.indicatorContainer)
	        }, items);
	    }
	});

	// TODO(jared): find a better name for this :) and for GradedGroup; the names
	// are currently a little confusing.
	var GradedGroupSet = React.createClass({
	    displayName: "GradedGroupSet",
	    propTypes: _extends({}, Changeable.propTypes, {
	        apiOptions: ApiOptions.propTypes,
	        gradedGroups: React.PropTypes.array,
	        trackInteraction: React.PropTypes.func.isRequired,
	        highlightLint: React.PropTypes.bool
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            gradedGroups: [],
	            highlightLint: false
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            currentGroup: 0
	        };
	    },
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        return nextProps !== this.props || nextState !== this.state;
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    // Mobile API
	    getInputPaths: function getInputPaths() {
	        return this._childGroup.getInputPaths();
	    },
	    setInputValue: function setInputValue(path, newValue, cb) {
	        return this._childGroup.setInputValue(path, newValue, cb);
	    },
	    getAcceptableFormatsForInputPath: function getAcceptableFormatsForInputPath(path) {
	        return this._childGroup.getAcceptableFormatsForInputPath(path);
	    },
	    focus: function focus() {
	        return this._childGroup.focus();
	    },
	    focusInputPath: function focusInputPath(path) {
	        this._childGroup.focusInputPath(path);
	    },
	    blurInputPath: function blurInputPath(path) {
	        this._childGroup.blurInputPath(path);
	    },
	    handleNextQuestion: function handleNextQuestion() {
	        var currentGroup = this.state.currentGroup;
	        currentGroup < this.props.gradedGroups.length - 1 && this.setState({
	            currentGroup: currentGroup + 1
	        });
	    },
	    render: function render() {
	        var _this2 = this;
	        var currentGroup = this.props.gradedGroups[this.state.currentGroup];
	        if (!currentGroup) return React.createElement("span", null, "No current group...");
	        var numGroups = this.props.gradedGroups.length;
	        var handleNextQuestion = this.state.currentGroup < numGroups - 1 ? this.handleNextQuestion : null;
	        return React.createElement("div", {
	            className: css(styles.container)
	        }, React.createElement("div", {
	            className: css(styles.top)
	        }, React.createElement("div", {
	            className: css(styles.title)
	        }, currentGroup.title), React.createElement("div", {
	            className: css(styles.spacer)
	        }), React.createElement(Indicators, {
	            numGroups: numGroups,
	            currentGroup: this.state.currentGroup,
	            onChangeCurrentGroup: function onChangeCurrentGroup(currentGroup) {
	                return _this2.setState({
	                    currentGroup: currentGroup
	                });
	            }
	        })), React.createElement(GradedGroup, _extends({
	            key: this.state.currentGroup,
	            ref: function ref(comp) {
	                return _this2._childGroup = comp;
	            }
	        }, this.props, currentGroup, {
	            inGradedGroupSet: true,
	            title: null,
	            onNextQuestion: handleNextQuestion,
	            highlightLint: this.props.highlightLint
	        })));
	    }
	});

	var traverseChildWidgets = function traverseChildWidgets(props, traverseRenderer) {
	    // NOTE(jared): I have no idea how this works
	    return {
	        groups: props.gradedGroups.map(traverseRenderer)
	    };
	};

	module.exports = {
	    name: "graded-group-set",
	    displayName: "Graded Group Set",
	    widget: GradedGroupSet,
	    traverseChildWidgets: traverseChildWidgets,
	    hidden: false,
	    tracking: "all",
	    isLintable: true
	};

	var styles = StyleSheet.create({
	    top: {
	        display: "flex",
	        flexDirection: "row"
	    },
	    spacer: {
	        flex: 1
	    },
	    title: {
	        fontSize: 12,
	        color: gray76,
	        textTransform: "uppercase",
	        marginBottom: 11,
	        letterSpacing: .8
	    },
	    indicatorContainer: {
	        display: "flex",
	        flexDirection: "row"
	    },
	    indicator: {
	        width: 10,
	        height: 10,
	        borderRadius: 5,
	        backgroundColor: grayLight,
	        marginLeft: 5,
	        cursor: "pointer"
	    },
	    selectedIndicator: {
	        backgroundColor: kaGreen
	    },
	    container: {
	        borderTop: "1px solid " + gray76,
	        borderBottom: "1px solid " + gray76,
	        backgroundColor: tableBackgroundAccent,
	        marginLeft: negativePhoneMargin,
	        marginRight: negativePhoneMargin,
	        paddingBottom: phoneMargin,
	        paddingLeft: phoneMargin,
	        paddingRight: phoneMargin,
	        paddingTop: 10,
	        width: "auto"
	    }
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var classNames = __webpack_require__(13);

	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var ApiOptions = __webpack_require__(18).Options;

	var Changeable = __webpack_require__(88);

	var Renderer = __webpack_require__(8);

	var Group = React.createClass({
	    displayName: "Group",
	    propTypes: _extends({}, Changeable.propTypes, {
	        content: React.PropTypes.string,
	        widgets: React.PropTypes.object,
	        images: React.PropTypes.object,
	        icon: React.PropTypes.object,
	        reviewModeRubric: React.PropTypes.object,
	        highlightLint: React.PropTypes.bool
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            content: "",
	            widgets: {},
	            images: {},
	            icon: null,
	            highlightLint: false
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
	                oldFocus && _this.props.onBlur(oldFocus);
	                newFocus && _this.props.onFocus(newFocus);
	            }
	        });
	        // Allow a problem number annotation to be added.
	        // This is cyclical and should probably be reconsidered. In order to
	        // render the annotation ("Question 3 of 10"), we call findWidgets to
	        // figure out our index in the list of all fellow group widgets. On
	        // first render, though, we don't exist yet in this list, and so we
	        // give ourselves number -1. To combat this, we forceUpdate in
	        // componentDidMount so that we can number ourselves properly. But,
	        // really we should have a more unidirectional flow. TODO(marcia): fix.
	        var number = _.indexOf(this.props.findWidgets("group"), this);
	        var problemNumComponent = this.props.apiOptions.groupAnnotator(number, this.props.widgetId);
	        // This is a little strange because the id of the widget that actually
	        // changed is going to be lost in favor of the group widget's id. The
	        // widgets prop also wasn't actually changed, and this only serves to
	        // alert our renderer (our parent) of the fact that some interaction
	        // has occurred.
	        var onInteractWithWidget = function onInteractWithWidget(id) {
	            _this.refs.renderer && _this.change("widgets", _this.refs.renderer.props.widgets);
	        };
	        var score = this.refs.renderer && this.refs.renderer.score();
	        var isValid = score && "invalid" !== score.type;
	        var isInvalid = score && "invalid" === score.type;
	        // TODO(mdr): Widgets inside this Renderer are not discoverable through
	        //     the parent Renderer's `findWidgets` function.
	        return React.createElement("div", {
	            className: classNames({
	                "perseus-group": true,
	                "perseus-group-valid-answer": isValid,
	                "perseus-group-invalid-answer": isInvalid
	            })
	        }, problemNumComponent, React.createElement(Renderer, _extends({}, this.props, {
	            ref: "renderer",
	            apiOptions: apiOptions,
	            findExternalWidgets: this.props.findWidgets,
	            reviewMode: !!this.props.reviewModeRubric,
	            onInteractWithWidget: onInteractWithWidget,
	            highlightLint: this.props.highlightLint
	        })), this.props.icon && React.createElement("div", {
	            className: "group-icon"
	        }, this.props.icon));
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
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
	    hidden: false,
	    isLintable: true
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
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
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Changeable = __webpack_require__(88);

	var WidgetJsonifyDeprecated = __webpack_require__(108);

	var updateQueryString = __webpack_require__(17).updateQueryString;

	/* This renders the iframe and handles validation via window.postMessage */
	var Iframe = React.createClass({
	    displayName: "Iframe",
	    propTypes: _extends({}, Changeable.propTypes, {
	        width: React.PropTypes.string,
	        height: React.PropTypes.string,
	        url: React.PropTypes.string,
	        settings: React.PropTypes.array,
	        status: React.PropTypes.oneOf([ "incomplete", "incorrect", "correct" ]),
	        message: React.PropTypes.string,
	        allowFullScreen: React.PropTypes.bool
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            status: "incomplete",
	            // optional message
	            message: null,
	            allowFullScreen: false
	        };
	    },
	    getUserInput: function getUserInput() {
	        return WidgetJsonifyDeprecated.getUserInput.call(this);
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
	        if (_.isUndefined(data.testsPassed)) return;
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
	        if (url && url.length && 0 !== url.indexOf("http")) {
	            url = "https://www.khanacademy.org/computer-programming/program/" + url + "/embedded?buttons=no&embed=yes&editor=no&author=no";
	            url = updateQueryString(url, "width", this.props.width);
	            url = updateQueryString(url, "height", this.props.height);
	            // Origin is used by output.js in deciding to send messages
	            url = updateQueryString(url, "origin", window.location.origin);
	        }
	        // Zero-rated users may incur data charges for viewing non-zero.ka.org
	        // resources, so we need to warn them first.
	        "undefined" !== typeof KA && KA.isZeroRated && (url.match(/https?:\/\/[^\/]*khanacademy.org/) ? // Internal URLs should be rewritten to point at zero.ka.org,
	        // unless they already do so
	        url.match(/zero.khanacademy.org/) || (url = url.replace("khanacademy.org", "zero.khanacademy.org")) : // External URLs should be rewritten to point at a warning
	        // interstitial
	        url = "/zero/external-link?context=iframe&url=" + encodeURIComponent(url));
	        // Turn array of [{name: "", value: ""}] into object
	        if (this.props.settings) {
	            var settings = {};
	            _.each(this.props.settings, function(setting) {
	                setting.name && setting.value && (settings[setting.name] = setting.value);
	            });
	            // This becomes available to programs as Program.settings()
	            url = updateQueryString(url, "settings", JSON.stringify(settings));
	        }
	        // We sandbox the iframe so that we whitelist only the functionality
	        //  that we need. This makes it a bit safer in case some content
	        //  creator "went wild".
	        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
	        return React.createElement("iframe", {
	            sandbox: "allow-same-origin allow-scripts",
	            style: style,
	            src: url,
	            allowFullScreen: this.props.allowFullScreen
	        });
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
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
	        // The iframe can tell us whether it's correct or incorrect,
	        //  and pass an optional message
	        return "correct" === state.status ? {
	            type: "points",
	            earned: 1,
	            total: 1,
	            message: state.message || null
	        } : "incorrect" === state.status ? {
	            type: "points",
	            earned: 0,
	            total: 1,
	            message: state.message || null
	        } : {
	            type: "invalid",
	            message: "Keep going, you're not there yet!"
	        };
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _caption;

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable no-var, object-curly-spacing */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	// TODO(kevindangoor) fix these lint errors
	/*eslint-disable react/sort-comp, react/jsx-indent-props, react/prop-types,
	    react/jsx-closing-bracket-location
	*/
	var classNames = __webpack_require__(13);

	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var ApiOptions = __webpack_require__(18).Options;

	var _require2 = __webpack_require__(37), baseUnitPx = _require2.baseUnitPx;

	var Changeable = __webpack_require__(88);

	var mediaQueries = __webpack_require__(35);

	var Renderer = __webpack_require__(8);

	var SvgImage = __webpack_require__(33);

	var defaultBoxSize = 400;

	var defaultRange = [ 0, 10 ];

	var defaultBackgroundImage = {
	    url: null,
	    width: 0,
	    height: 0
	};

	// NOTE(david): 2016-07-20: This widget supports the 4 alignments specified
	//     below, but we want to phase out the floating alignments in the next few
	//     weeks. So, we remove the float options from the editor interface.
	var supportedAlignments = [ "block", "float-left", "float-right", "full-width" ];

	var editorAlignments = [ "block", "full-width" ];

	var DEFAULT_ALIGNMENT = "block";

	var ImageWidget = React.createClass({
	    displayName: "ImageWidget",
	    propTypes: _extends({}, Changeable.propTypes, {
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
	        trackInteraction: React.PropTypes.func.isRequired,
	        highlightLint: React.PropTypes.bool
	    }),
	    statics: {
	        styles: StyleSheet.create({
	            caption: (_caption = {
	                display: "inline-block",
	                marginTop: baseUnitPx,
	                maxWidth: 640
	            }, _caption[mediaQueries.lgOrSmaller] = {
	                // TODO(david): This maxWidth is not being used because
	                //     it's overriden by the 512px max-width we have on
	                //     paragraphs.
	                maxWidth: 540
	            }, _caption[mediaQueries.smOrSmaller] = {
	                maxWidth: 450
	            }, _caption)
	        })
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            alignment: DEFAULT_ALIGNMENT,
	            title: "",
	            range: [ defaultRange, defaultRange ],
	            box: [ defaultBoxSize, defaultBoxSize ],
	            backgroundImage: defaultBackgroundImage,
	            labels: [],
	            alt: "",
	            caption: "",
	            highlightLint: false
	        };
	    },
	    render: function render() {
	        var image;
	        var alt;
	        var apiOptions = this.props.apiOptions;
	        var backgroundImage = this.props.backgroundImage;
	        backgroundImage.url && (image = React.createElement(SvgImage, {
	            src: backgroundImage.url,
	            alt: /* alt text is formatted in a sr-only
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
	            this.props.alt ? "" : void 0,
	            width: backgroundImage.width,
	            height: backgroundImage.height,
	            preloader: apiOptions.imagePreloader,
	            extraGraphie: {
	                box: this.props.box,
	                range: this.props.range,
	                labels: this.props.labels
	            },
	            trackInteraction: this.props.trackInteraction,
	            zoomToFullSizeOnMobile: apiOptions.isMobile,
	            constrainHeight: apiOptions.isMobile,
	            allowFullBleed: apiOptions.isMobile
	        }));
	        this.props.alt && (alt = React.createElement("span", {
	            className: "perseus-sr-only"
	        }, React.createElement(Renderer, {
	            content: this.props.alt,
	            apiOptions: apiOptions,
	            highlightLint: this.props.highlightLint
	        })));
	        // For mobile we combine an image's title and caption.
	        if (apiOptions.isMobile) {
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
	                    this.props.caption && !/[.?!"']\s*$/.test(_title) && (_title += ".");
	                    _title = "**" + _title + "** ";
	                }
	                var className = classNames({
	                    "perseus-image-caption": true,
	                    "has-title": !!_title
	                });
	                // Caption is left-aligned within a container that's centered
	                // below the image, with these width constraints:
	                //
	                // 1. Size caption to width of the image on-screen.
	                // 2. ... but constrain its width to a range based on the
	                //    device to optimize readability - e.g. [320px, 450px] for
	                //    phones.
	                // 3. ... unless the image is floated, in which case we don't
	                //    want the caption to overflow the image size.
	                //
	                // TODO(david): If caption is only 1 line long, center-align
	                //     the text.
	                var alignment = this.props.alignment;
	                var isImageFullWidth = "block" === alignment || "full-width" === alignment;
	                // This minWidth takes precedence over minWidth applied via
	                // Aphrodite.
	                var minWidth = isImageFullWidth ? null : "0 !important";
	                titleAndCaption = React.createElement("div", {
	                    className: className
	                }, React.createElement("div", {
	                    className: css(ImageWidget.styles.caption),
	                    style: {
	                        minWidth: minWidth
	                    }
	                }, React.createElement(Renderer, {
	                    content: _title + this.props.caption,
	                    apiOptions: apiOptions,
	                    highlightLint: this.props.highlightLint
	                })));
	            }
	            return React.createElement("div", {
	                className: "perseus-image-widget"
	            }, image, alt, titleAndCaption);
	        }
	        var title;
	        var caption;
	        this.props.title && (title = React.createElement("div", {
	            className: "perseus-image-title"
	        }, React.createElement(Renderer, {
	            content: this.props.title,
	            apiOptions: apiOptions,
	            highlightLint: this.props.highlightLint
	        })));
	        this.props.caption && (caption = React.createElement("div", {
	            className: "perseus-image-caption"
	        }, React.createElement(Renderer, {
	            content: this.props.caption,
	            apiOptions: apiOptions,
	            highlightLint: this.props.highlightLint
	        })));
	        return React.createElement("div", {
	            className: "perseus-image-widget"
	        }, title, image, alt, caption);
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
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
	    supportedAlignments: editorAlignments,
	    displayName: "Image",
	    widget: ImageWidget,
	    isLintable: true
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable brace-style, no-redeclare, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/sort-comp, space-infix-ops */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Changeable = __webpack_require__(88);

	var Graphie = __webpack_require__(94);

	var Label = Graphie.Label;

	var Line = Graphie.Line;

	var MovablePoint = Graphie.MovablePoint;

	var MovableLine = Graphie.MovableLine;

	var Plot = Graphie.Plot;

	var PlotParametric = Graphie.PlotParametric;

	var Point = Graphie.Point;

	var Rect = Graphie.Rect;

	var kvector = __webpack_require__(165).vector;

	// Memoize KAS parsing
	var KAShashFunc = function KAShashFunc(expr, options) {
	    options = options || {};
	    var result = expr + "||" + options.decimal_separatpr + "||";
	    var functions = options.functions;
	    var functionsLength = functions ? functions.length : 0;
	    for (var i = 0; i < functionsLength; i++) result += functions[i] + "|";
	    return result;
	};

	var _parseCache = Object.create(null);

	var KASparse = function KASparse(expr, options) {
	    var hash = KAShashFunc(expr, options);
	    var cached = _parseCache[hash];
	    if (cached) return cached;
	    cached = KAS.parse(expr, options);
	    _parseCache[hash] = cached;
	    return cached;
	};

	var _compileCache = Object.create(null);

	var KAScompile = function KAScompile(expr, options) {
	    var hash = KAShashFunc(expr, options);
	    var cached = _compileCache[hash];
	    if (cached) return cached;
	    var parsed = KAS.parse(expr, options).expr;
	    cached = parsed ? parsed.compile() : function() {
	        return 0;
	    };
	    _compileCache[hash] = cached;
	    return cached;
	};

	var defaultInteractionProps = {
	    graph: {
	        box: [ 400, 400 ],
	        labels: [ "x", "y" ],
	        range: [ [ -10, 10 ], [ -10, 10 ] ],
	        tickStep: [ 1, 1 ],
	        gridStep: [ 1, 1 ],
	        markings: "graph"
	    },
	    elements: []
	};

	var Interaction = React.createClass({
	    displayName: "Interaction",
	    // TODO(eater): Make more better
	    propTypes: _extends({}, Changeable.propTypes, {
	        graph: React.PropTypes.object,
	        elements: React.PropTypes.arrayOf(React.PropTypes.object)
	    }),
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
	        _.each(_.where(elements, {
	            type: "movable-point"
	        }), function(element) {
	            var subscript = element.options.varSubscript;
	            var startXExpr = KASparse(element.options.startX || "0").expr;
	            var startYExpr = KASparse(element.options.startY || "0").expr;
	            var startX = 0;
	            var startY = 0;
	            startXExpr && (startX = startXExpr.eval({}) || 0);
	            startYExpr && (startY = startYExpr.eval({}) || 0);
	            variables["x_" + subscript] = startX;
	            variables["y_" + subscript] = startY;
	        }, this);
	        _.each(_.where(elements, {
	            type: "movable-line"
	        }), function(element) {
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
	            startXExpr && (startX = startXExpr.eval({}) || 0);
	            startYExpr && (startY = startYExpr.eval({}) || 0);
	            endXExpr && (endX = endXExpr.eval({}) || 0);
	            endYExpr && (endY = endYExpr.eval({}) || 0);
	            variables["x_" + startSubscript] = startX;
	            variables["y_" + startSubscript] = startY;
	            variables["x_" + endSubscript] = endX;
	            variables["y_" + endSubscript] = endY;
	        }, this);
	        _.each(_.where(elements, {
	            type: "function"
	        }), function(element) {
	            variables[element.options.funcName] = element.options.value;
	        });
	        return variables;
	    },
	    _getInitialFunctions: function _getInitialFunctions(elements) {
	        return _.map(_.where(elements, {
	            type: "function"
	        }), function(element) {
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
	            grid: _.contains([ "graph", "grid" ], this.props.graph.markings),
	            axes: _.contains([ "graph" ], this.props.graph.markings),
	            ticks: _.contains([ "graph" ], this.props.graph.markings),
	            labels: _.contains([ "graph" ], this.props.graph.markings),
	            labelFormat: function labelFormat(s) {
	                return "\\small{" + s + "}";
	            },
	            axisArrows: "<->",
	            unityLabels: false
	        }));
	        if ("graph" === this.props.graph.markings) {
	            var labels = this.props.graph.labels;
	            var range = this.props.graph.range;
	            graphie.label([ 0, range[1][1] ], labels[1], "above");
	            graphie.label([ range[0][1], 0 ], labels[0], "right");
	        }
	    },
	    _updatePointLocation: function _updatePointLocation(subscript, coord) {
	        var variables = _.clone(this.state.variables);
	        variables["x_" + subscript] = coord[0];
	        variables["y_" + subscript] = coord[1];
	        this.setState({
	            variables: variables
	        });
	        this.props.trackInteraction();
	    },
	    _updateLineLocation: function _updateLineLocation(options, startCoord) {
	        var xDiff = this._eval("(" + options.endX + ")-(" + options.startX + ")");
	        var yDiff = this._eval("(" + options.endY + ")-(" + options.startY + ")");
	        var endCoord = kvector.add(startCoord, [ xDiff, yDiff ]);
	        var variables = _.clone(this.state.variables);
	        variables["x_" + options.startSubscript] = startCoord[0];
	        variables["y_" + options.startSubscript] = startCoord[1];
	        variables["x_" + options.endSubscript] = endCoord[0];
	        variables["y_" + options.endSubscript] = endCoord[1];
	        this.setState({
	            variables: variables
	        });
	        this.props.trackInteraction();
	    },
	    _eval: function _eval(expression, variables) {
	        var _this = this;
	        var func = KAScompile(expression, {
	            functions: this.state.functions
	        });
	        var compiledVars = _.extend({}, this.state.variables, variables);
	        _.each(_.keys(compiledVars), function(name) {
	            if (_.isString(compiledVars[name])) {
	                var func = KAScompile(compiledVars[name], {
	                    functions: _this.state.functions
	                });
	                compiledVars[name] = function(x) {
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
	        if (null == expr) return [];
	        var vars = [];
	        _.each(expr.args(), function(arg) {
	            arg && "Expr" === arg.constructor.name && (vars = vars.concat(this._extractVars(arg)));
	        }, this);
	        "Var" === expr.name() && vars.push(expr.prettyPrint());
	        return vars;
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    render: function render() {
	        return React.createElement(Graphie, {
	            box: this.props.graph.box,
	            range: this.props.graph.range,
	            options: this.props.graph,
	            setup: this._setupGraphie,
	            setDrawingAreaAvailable: this.props.apiOptions.setDrawingAreaAvailable
	        }, _.map(this.props.elements, function(element, n) {
	            var _this2 = this;
	            if ("point" === element.type) return React.createElement(Point, {
	                key: element.key,
	                coord: [ this._eval(element.options.coordX), this._eval(element.options.coordY) ],
	                color: element.options.color
	            });
	            if ("line" === element.type) {
	                var start = [ this._eval(element.options.startX), this._eval(element.options.startY) ];
	                var end = [ this._eval(element.options.endX), this._eval(element.options.endY) ];
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
	            }
	            if ("movable-point" === element.type) {
	                // TODO(eater): Would be nice if the constraint system
	                // were more flexible.
	                var constraints = [ function(coord) {
	                    return [ Math.max(_this2._eval(element.options.constraintXMin), Math.min(_this2._eval(element.options.constraintXMax), coord[0])), Math.max(_this2._eval(element.options.constraintYMin), Math.min(_this2._eval(element.options.constraintYMax), coord[1])) ];
	                } ];
	                "snap" === element.options.constraint ? constraints.push(MovablePoint.constraints.snap(element.options.snap)) : "x" === element.options.constraint ? constraints.push(function(coord) {
	                    return [ _this2._eval(element.options.constraintFn, {
	                        y: coord[1]
	                    }), coord[1] ];
	                }) : "y" === element.options.constraint && constraints.push(function(coord) {
	                    return [ coord[0], _this2._eval(element.options.constraintFn, {
	                        x: coord[0]
	                    }) ];
	                });
	                // TODO(eater): foo_[xyz] are hacky non-props to get the
	                // component to update when constraints change
	                return React.createElement(MovablePoint, {
	                    key: element.key,
	                    coord: [ this.state.variables["x_" + element.options.varSubscript], this.state.variables["y_" + element.options.varSubscript] ],
	                    constraints: constraints,
	                    foo_x: element.options.constraint,
	                    foo_y: element.options.constraintFn,
	                    foo_z: element.options.snap,
	                    onMove: _.partial(this._updatePointLocation, element.options.varSubscript)
	                });
	            }
	            if ("movable-line" === element.type) {
	                // TODO(eater): Would be nice if the constraint system
	                // were more flexible.
	                // TODO(eater): Don't duplicate this code from
	                // movable-point above
	                var constraints = [ function(coord) {
	                    return [ Math.max(_this2._eval(element.options.constraintXMin), Math.min(_this2._eval(element.options.constraintXMax), coord[0])), Math.max(_this2._eval(element.options.constraintYMin), Math.min(_this2._eval(element.options.constraintYMax), coord[1])) ];
	                } ];
	                "snap" === element.options.constraint ? constraints.push(MovablePoint.constraints.snap(element.options.snap)) : "x" === element.options.constraint ? constraints.push(function(coord) {
	                    return [ _this2._eval(element.options.constraintFn, {
	                        y: coord[1]
	                    }), coord[1] ];
	                }) : "y" === element.options.constraint && constraints.push(function(coord) {
	                    return [ coord[0], _this2._eval(element.options.constraintFn, {
	                        x: coord[0]
	                    }) ];
	                });
	                var start = [ this.state.variables["x_" + element.options.startSubscript], this.state.variables["y_" + element.options.startSubscript] ];
	                var end = [ this.state.variables["x_" + element.options.endSubscript], this.state.variables["y_" + element.options.endSubscript] ];
	                return React.createElement(MovableLine, {
	                    key: element.key,
	                    constraints: constraints,
	                    onMove: _.bind(this._updateLineLocation, this, element.options),
	                    foo_x: element.options.constraint,
	                    foo_y: element.options.constraintFn,
	                    foo_z: element.options.snap
	                }, React.createElement(MovablePoint, {
	                    coord: start,
	                    static: true,
	                    normalStyle: {
	                        stroke: "none",
	                        fill: "none"
	                    }
	                }), React.createElement(MovablePoint, {
	                    coord: end,
	                    static: true,
	                    normalStyle: {
	                        stroke: "none",
	                        fill: "none"
	                    }
	                }));
	            }
	            if ("function" === element.type) {
	                var fn = function fn(x) {
	                    return _this2._eval(element.options.value, {
	                        x: x
	                    });
	                };
	                // find all the variables referenced by this function
	                var vars = _.without(this._extractVars(KASparse(element.options.value).expr), "x");
	                // and find their values, so we redraw if any change
	                var varValues = _.object(vars, _.map(vars, function(v) {
	                    return _this2.state.variables[v];
	                }));
	                var range = [ this._eval(element.options.rangeMin, this.state.variables), this._eval(element.options.rangeMax, this.state.variables) ];
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
	                        plotPoints: 100
	                    }
	                });
	            }
	            if ("parametric" === element.type) {
	                var fn = function fn(t) {
	                    return [ _this2._eval(element.options.x, {
	                        t: t
	                    }), _this2._eval(element.options.y, {
	                        t: t
	                    }) ];
	                };
	                // find all the variables referenced by this function
	                var vars = _.without(this._extractVars(KASparse(element.options.x).expr).concat(this._extractVars(KASparse(element.options.y).expr)), "t");
	                // and find their values, so we redraw if any change
	                var varValues = _.object(vars, _.map(vars, function(v) {
	                    return _this2.state.variables[v];
	                }));
	                var range = [ this._eval(element.options.rangeMin, this.state.variables), this._eval(element.options.rangeMax, this.state.variables) ];
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
	                        plotPoints: 100
	                    }
	                });
	            }
	            if ("label" === element.type) {
	                var coord = [ this._eval(element.options.coordX), this._eval(element.options.coordY) ];
	                return React.createElement(Label, {
	                    key: n + 1,
	                    coord: coord,
	                    text: element.options.label,
	                    style: {
	                        color: element.options.color
	                    }
	                });
	            }
	            if ("rectangle" === element.type) return React.createElement(Rect, {
	                key: n + 1,
	                x: this._eval(element.options.coordX),
	                y: this._eval(element.options.coordY),
	                width: _.max([ this._eval(element.options.width), 0 ]),
	                height: _.max([ this._eval(element.options.height), 0 ]),
	                style: {
	                    stroke: "none",
	                    fill: element.options.color
	                }
	            });
	        }, this));
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable brace-style, comma-dangle, indent, max-lines, no-redeclare, no-undef, no-unused-vars, no-var, object-curly-spacing, one-var, prefer-spread, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, space-infix-ops */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Graph = __webpack_require__(118);

	var InfoTip = __webpack_require__(119);

	var Interactive2 = __webpack_require__(109);

	var NumberInput = __webpack_require__(114);

	var Util = __webpack_require__(17);

	var knumber = __webpack_require__(165).number;

	var kpoint = __webpack_require__(165).point;

	var KhanColors = __webpack_require__(112);

	var GraphUtils = __webpack_require__(120);

	var _require = __webpack_require__(37), interactiveSizes = _require.interactiveSizes;

	var _require2 = __webpack_require__(80), containerSizeClassPropType = _require2.containerSizeClassPropType, getInteractiveBoxFromSizeClass = _require2.getInteractiveBoxFromSizeClass;

	var WrappedLine = __webpack_require__(111);

	var DeprecationMixin = Util.DeprecationMixin;

	var TRASH_ICON_URI = "https://ka-perseus-graphie.s3.amazonaws.com/b1452c0d79fd0f7ff4c3af9488474a0a0decb361.png";

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
	    return eq(val, 0) ? 0 : val > 0 ? 1 : -1;
	}

	// default to defaultValue if actual is null or undefined
	function defaultVal(actual, defaultValue) {
	    return null == actual ? defaultValue : actual;
	}

	// Given rect bounding points A and B, whether point C is inside the rect
	function pointInRect(a, b, c) {
	    return c[0] <= Math.max(a[0], b[0]) && c[0] >= Math.min(a[0], b[0]) && c[1] <= Math.max(a[1], b[1]) && c[1] >= Math.min(a[1], b[1]);
	}

	// Whether line segment AB intersects line segment CD
	// http://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
	function intersects(ab, cd) {
	    var triplets = [ [ ab[0], ab[1], cd[0] ], [ ab[0], ab[1], cd[1] ], [ cd[0], cd[1], ab[0] ], [ cd[0], cd[1], ab[1] ] ];
	    var orientations = _.map(triplets, function(triplet) {
	        return sign(ccw.apply(null, triplet));
	    });
	    if (orientations[0] !== orientations[1] && orientations[2] !== orientations[3]) return true;
	    for (var i = 0; i < 4; i++) if (0 === orientations[i] && pointInRect.apply(null, triplets[i])) return true;
	    return false;
	}

	function vector(a, b) {
	    return _.map(_.zip(a, b), function(pair) {
	        return pair[0] - pair[1];
	    });
	}

	function magnitude(v) {
	    return Math.sqrt(_.reduce(v, function(memo, el) {
	        return memo + Math.pow(el, 2);
	    }, 0));
	}

	function dotProduct(a, b) {
	    return _.reduce(_.zip(a, b), function(memo, pair) {
	        return memo + pair[0] * pair[1];
	    }, 0);
	}

	function sideLengths(coords) {
	    var segments = _.zip(coords, rotate(coords));
	    return _.map(segments, function(segment) {
	        return magnitude(vector.apply(null, segment));
	    });
	}

	// Based on http://math.stackexchange.com/a/151149
	function angleMeasures(coords) {
	    var triplets = _.zip(rotate(coords, -1), coords, rotate(coords, 1));
	    var offsets = _.map(triplets, function(triplet) {
	        var p = vector(triplet[1], triplet[0]);
	        var q = vector(triplet[2], triplet[1]);
	        var raw = Math.acos(dotProduct(p, q) / (magnitude(p) * magnitude(q)));
	        return sign(ccw.apply(null, triplet)) > 0 ? raw : -raw;
	    });
	    var sum = _.reduce(offsets, function(memo, arg) {
	        return memo + arg;
	    }, 0);
	    return _.map(offsets, function(offset) {
	        return sum > 0 ? Math.PI - offset : Math.PI + offset;
	    });
	}

	// Whether two polygons are similar (or if specified, congruent)
	function similar(coords1, coords2, tolerance) {
	    if (coords1.length !== coords2.length) return false;
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
	            var factors = _.map(sidePairs, function(pair) {
	                return pair[0] / pair[1];
	            });
	            var same = _.all(factors, function(factor) {
	                return eq(factors[0], factor);
	            });
	            var congruentEnough = _.all(sidePairs, function(pair) {
	                return knumber.equal(pair[0], pair[1], tolerance);
	            });
	            if (same && congruentEnough) return true;
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
	    return 180 * Math.acos((a * a + b * b - c * c) / (2 * a * b)) / Math.PI;
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
	    while (phase > 0) phase -= period;
	    while (phase < 0) phase += period;
	    return [ amplitude, angularFrequency, phase, verticalOffset ];
	}

	// e.g. rotate([1, 2, 3]) -> [2, 3, 1]
	function rotate(array, n) {
	    n = "undefined" === typeof n ? 1 : n % array.length;
	    return array.slice(n).concat(array.slice(0, n));
	}

	function capitalize(str) {
	    return str.replace(/(?:^|-)(.)/g, function(match, letter) {
	        return letter.toUpperCase();
	    });
	}

	function getLineEquation(first, second) {
	    if (eq(first[0], second[0])) return "x = " + first[0].toFixed(3);
	    var m = (second[1] - first[1]) / (second[0] - first[0]);
	    var b = first[1] - m * first[0];
	    return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
	}

	// Stolen from the wikipedia article
	// http://en.wikipedia.org/wiki/Line-line_intersection
	function getLineIntersection(firstPoints, secondPoints) {
	    var x1 = firstPoints[0][0], y1 = firstPoints[0][1], x2 = firstPoints[1][0], y2 = firstPoints[1][1], x3 = secondPoints[0][0], y3 = secondPoints[0][1], x4 = secondPoints[1][0], y4 = secondPoints[1][1];
	    var determinant = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	    if (Math.abs(determinant) < 1e-9) return "Lines are parallel";
	    var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / determinant;
	    var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / determinant;
	    return "Intersection: (" + x.toFixed(3) + ", " + y.toFixed(3) + ")";
	}

	function numSteps(range, step) {
	    return Math.floor((range[1] - range[0]) / step);
	}

	var deprecatedProps = {
	    showGraph: function showGraph(props) {
	        return {
	            markings: props.showGraph ? "graph" : "none"
	        };
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
	            labels: [ "x", "y" ],
	            range: [ [ -10, 10 ], [ -10, 10 ] ],
	            step: [ 1, 1 ],
	            backgroundImage: defaultBackgroundImage,
	            markings: "graph",
	            showTooltips: false,
	            showProtractor: false,
	            showRuler: false,
	            rulerLabel: "",
	            rulerTicks: 10,
	            graph: {
	                type: "linear"
	            }
	        };
	    },
	    deprecatedProps: deprecatedProps,
	    componentWillMount: function componentWillMount() {
	        DeprecationMixin.componentWillMount.call(this);
	    },
	    _getShouldShowInstructions: function _getShouldShowInstructions(props) {
	        props = props || this.props;
	        return this.isClickToAddPoints(props) && (null == props.graph.coords || 0 === props.graph.coords.length);
	    },
	    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	        var oldType = prevProps.graph.type;
	        var newType = this.props.graph.type;
	        if (oldType !== newType || prevProps.graph.allowReflexAngles !== this.props.graph.allowReflexAngles || prevProps.graph.angleOffsetDeg !== this.props.graph.angleOffsetDeg || prevProps.graph.numPoints !== this.props.graph.numPoints || prevProps.graph.numSides !== this.props.graph.numSides || prevProps.graph.numSegments !== this.props.graph.numSegments || prevProps.graph.showAngles !== this.props.graph.showAngles || prevProps.graph.showSides !== this.props.graph.showSides || prevProps.graph.snapTo !== this.props.graph.snapTo || prevProps.graph.snapDegrees !== this.props.graph.snapDegrees) {
	            this["remove" + capitalize(oldType) + "Controls"]();
	            this["add" + capitalize(newType) + "Controls"]();
	        }
	        this.shouldResetGraphie && this.resetGraphie();
	    },
	    render: function render() {
	        var _this = this;
	        var typeSelect;
	        var extraOptions;
	        if (this.props.flexibleType) {
	            typeSelect = React.createElement("select", {
	                value: this.props.graph.type,
	                onChange: function onChange(e) {
	                    var type = e.target.value;
	                    _this.onChange({
	                        graph: {
	                            type: type
	                        }
	                    });
	                }
	            }, React.createElement("option", {
	                value: "linear"
	            }, "Linear function"), React.createElement("option", {
	                value: "quadratic"
	            }, "Quadratic function"), React.createElement("option", {
	                value: "sinusoid"
	            }, "Sinusoid function"), React.createElement("option", {
	                value: "circle"
	            }, "Circle"), React.createElement("option", {
	                value: "point"
	            }, "Point(s)"), React.createElement("option", {
	                value: "linear-system"
	            }, "Linear System"), React.createElement("option", {
	                value: "polygon"
	            }, "Polygon"), React.createElement("option", {
	                value: "segment"
	            }, "Line Segment(s)"), React.createElement("option", {
	                value: "ray"
	            }, "Ray"), React.createElement("option", {
	                value: "angle"
	            }, "Angle"));
	            if ("point" === this.props.graph.type) extraOptions = React.createElement("select", {
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
	                }
	            }, _.map(_.range(1, 7), function(n) {
	                return React.createElement("option", {
	                    value: n
	                }, n, " point", n > 1 && "s");
	            }), React.createElement("option", {
	                value: UNLIMITED
	            }, "unlimited")); else if ("polygon" === this.props.graph.type) extraOptions = React.createElement("div", null, React.createElement("div", null, React.createElement("select", {
	                key: "polygon-select",
	                value: this.props.graph.numSides || 3,
	                onChange: function onChange(e) {
	                    // Convert numbers, leave UNLIMITED intact:
	                    var num = +e.target.value || e.target.value;
	                    var graph = _.extend({}, _this.props.graph, {
	                        numSides: num,
	                        coords: null,
	                        snapTo: "grid"
	                    });
	                    _this.onChange({
	                        graph: graph
	                    });
	                }
	            }, _.map(_.range(3, 13), function(n) {
	                return React.createElement("option", {
	                    value: n
	                }, n, " sides");
	            }), React.createElement("option", {
	                value: UNLIMITED
	            }, "unlimited sides"))), React.createElement("div", null, React.createElement("label", null, " Snap to", " ", React.createElement("select", {
	                key: "polygon-snap",
	                value: this.props.graph.snapTo,
	                onChange: function onChange(e) {
	                    var graph = _.extend({}, _this.props.graph, {
	                        snapTo: e.target.value,
	                        coords: null
	                    });
	                    _this.onChange({
	                        graph: graph
	                    });
	                }
	            }, React.createElement("option", {
	                value: "grid"
	            }, "grid"), this.props.graph.numSides !== UNLIMITED && [ React.createElement("option", {
	                value: "angles"
	            }, " ", "interior angles", " "), React.createElement("option", {
	                value: "sides"
	            }, " ", "side measures", " ") ])), React.createElement(InfoTip, null, React.createElement("p", null, "These options affect the movement of the vertex points. The grid option will guide the points to the nearest half step along the grid."), React.createElement("p", null, "The interior angle and side measure options guide the points to the nearest whole angle or side"), " measure respectively.", " ")), React.createElement("div", null, React.createElement("label", null, "Show angle measures:", " ", React.createElement("input", {
	                type: "checkbox",
	                checked: this.props.graph.showAngles,
	                onChange: this.toggleShowAngles
	            })), React.createElement(InfoTip, null, React.createElement("p", null, "Displays the interior angle measures."))), React.createElement("div", null, React.createElement("label", null, "Show side measures:", " ", React.createElement("input", {
	                type: "checkbox",
	                checked: this.props.graph.showSides,
	                onChange: this.toggleShowSides
	            })), React.createElement(InfoTip, null, React.createElement("p", null, "Displays the side lengths.")))); else if ("segment" === this.props.graph.type) extraOptions = React.createElement("select", {
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
	                }
	            }, _.map(_.range(1, 7), function(n) {
	                return React.createElement("option", {
	                    value: n
	                }, n, " segment", n > 1 && "s");
	            })); else if ("angle" === this.props.graph.type) {
	                var allowReflexAngles = defaultVal(this.props.graph.allowReflexAngles, true);
	                extraOptions = React.createElement("div", null, React.createElement("div", null, React.createElement("label", null, "Show angle measure:", " ", React.createElement("input", {
	                    type: "checkbox",
	                    checked: this.props.graph.showAngles,
	                    onChange: this.toggleShowAngles
	                }))), React.createElement("div", null, React.createElement("label", null, "Allow reflex angles:", " ", React.createElement("input", {
	                    type: "checkbox",
	                    checked: allowReflexAngles,
	                    onChange: function onChange(newVal) {
	                        _this.onChange({
	                            graph: _.extend({}, _this.props.graph, {
	                                allowReflexAngles: !allowReflexAngles,
	                                coords: null
	                            })
	                        });
	                    }
	                })), React.createElement(InfoTip, null, React.createElement("p", null, "Reflex angles are angles with a measure greater than 180 degrees."), React.createElement("p", null, "By default, these should remain enabled."))), React.createElement("div", null, React.createElement("label", null, "Snap to increments of", " ", React.createElement(NumberInput, {
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
	                    }
	                }), " ", "degrees", " ")), React.createElement("div", null, React.createElement("label", null, " ", "With an offset of", " ", React.createElement(NumberInput, {
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
	                    }
	                }), " ", "degrees", " ")));
	            }
	        }
	        var box = getInteractiveBoxFromSizeClass(this.props.containerSizeClass);
	        var instructions;
	        this.isClickToAddPoints() && this.state.shouldShowInstructions ? "point" === this.props.graph.type ? instructions = i18n._("Click to add points") : "polygon" === this.props.graph.type && (instructions = i18n._("Click to add vertices")) : instructions = void 0;
	        var onMouseDown = this.isClickToAddPoints() ? this.handleAddPointsMouseDown : null;
	        var gridStep = this.props.gridStep || Util.getGridStep(this.props.range, this.props.step, box[0]);
	        var snapStep = this.props.snapStep || Util.snapStepFromGridStep(gridStep);
	        var isMobile = this.props.apiOptions.isMobile;
	        return React.createElement("div", {
	            className: "perseus-widget perseus-widget-interactive-graph",
	            style: {
	                width: box[0],
	                height: this.props.flexibleType ? "auto" : box[1]
	            }
	        }, React.createElement(Graph, {
	            instructions: instructions,
	            ref: "graph",
	            box: box,
	            labels: this.props.labels,
	            range: this.props.range,
	            step: isMobile ? Util.constrainedTickStepsFromTickSteps(this.props.step, this.props.range) : this.props.step,
	            gridStep: gridStep,
	            snapStep: snapStep,
	            markings: this.props.markings,
	            backgroundImage: this.props.backgroundImage,
	            showProtractor: this.props.showProtractor,
	            showRuler: this.props.showRuler,
	            rulerLabel: this.props.rulerLabel,
	            rulerTicks: this.props.rulerTicks,
	            onMouseDown: onMouseDown,
	            onGraphieUpdated: this.setGraphie,
	            setDrawingAreaAvailable: this.props.apiOptions.setDrawingAreaAvailable,
	            isMobile: isMobile
	        }), typeSelect, extraOptions);
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
	        if (!this.isClickToAddPoints()) throw new Error("handleAddPointsClick should not be registeredwhen isClickToAddPoints() is false");
	        if (!this.isCoordInTrash(coord)) {
	            var point;
	            if ("point" === this.props.graph.type) {
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
	            } else if ("polygon" === this.props.graph.type) {
	                if (this.polygon.closed()) return;
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
	        this.parabola = null;
	        this.sinusoid = null;
	        this.refs.graph.reset();
	    },
	    setupGraphie: function setupGraphie() {
	        this.setTrashCanVisibility(0);
	        this.isClickToAddPoints() && this.setTrashCanVisibility(.5);
	        if (this.props.apiOptions.isMobile) {
	            this.horizHairline = new WrappedLine(this.graphie, [ 0, 0 ], [ 0, 0 ], {
	                normalStyle: {
	                    strokeWidth: 1
	                }
	            });
	            this.horizHairline.attr({
	                stroke: KhanColors.INTERACTIVE
	            });
	            this.horizHairline.hide();
	            this.vertHairline = new WrappedLine(this.graphie, [ 0, 0 ], [ 0, 0 ], {
	                normalStyle: {
	                    strokeWidth: 1
	                }
	            });
	            this.vertHairline.attr({
	                stroke: KhanColors.INTERACTIVE
	            });
	            this.vertHairline.hide();
	        }
	        this["add" + capitalize(this.props.graph.type) + "Controls"]();
	    },
	    showHairlines: function showHairlines(point) {
	        if (this.props.apiOptions.isMobile && "none" !== this.props.markings) {
	            // Hairlines are already initialized when the graph is loaded, so
	            // here we just move them to the updated location and make them
	            // visible.
	            this.horizHairline.moveTo([ this.props.range[0][0], point[1] ], [ this.props.range[0][1], point[1] ]);
	            this.horizHairline.show();
	            this.vertHairline.moveTo([ point[0], this.props.range[1][0] ], [ point[0], this.props.range[1][1] ]);
	            this.vertHairline.show();
	        }
	    },
	    hideHairlines: function hideHairlines() {
	        if (this.props.apiOptions.isMobile) {
	            this.horizHairline.hide();
	            this.vertHairline.hide();
	        }
	    },
	    setTrashCanVisibility: function setTrashCanVisibility(opacity) {
	        var graphie = this.graphie;
	        if (knumber.equal(opacity, 0)) {
	            if (this.trashCan) {
	                this.trashCan.remove();
	                this.trashCan = null;
	            }
	        } else if (!this.props.apiOptions.isMobile) {
	            // Only if trash tooltips are not being used, we initialize the old
	            // trash can area.
	            this.trashCan || (this.trashCan = graphie.raphael.image(TRASH_ICON_URI, graphie.xpixels - 40, graphie.ypixels - 40, 40, 40));
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
	        this.props.backgroundImage.url === nextProps.backgroundImage.url && this.props.backgroundImage === nextProps.backgroundImage && this.props.containerSizeClass === nextProps.containerSizeClass || (// @Nolint
	        this.shouldResetGraphie = true);
	    },
	    isClickToAddPoints: function isClickToAddPoints(props) {
	        props = props || this.props;
	        return "point" === props.graph.type && props.graph.numPoints === UNLIMITED || "polygon" === props.graph.type && props.graph.numSides === UNLIMITED;
	    },
	    _lineStroke: function _lineStroke() {
	        return this.props.isMobile ? {
	            "stroke-width": 3
	        } : {};
	    },
	    addLine: function addLine(type) {
	        var _this2 = this;
	        var self = this;
	        var graphie = self.graphie;
	        var coords = InteractiveGraph.getLineCoords(self.props.graph, self.props);
	        var points = self.points = _.map(coords, function(coord) {
	            return Interactive2.addMaybeMobileMovablePoint(_this2, {
	                coord: coord,
	                constraints: [ Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap() ],
	                onMove: function onMove() {
	                    var graph = _.extend({}, self.props.graph, {
	                        coords: _.invoke(points, "coord")
	                    });
	                    self.onChange({
	                        graph: graph
	                    });
	                }
	            });
	        });
	        var lineConfig = {
	            points: points,
	            static: true,
	            normalStyle: _extends({
	                stroke: this.props.apiOptions.isMobile ? KhanColors.BLUE_C : KhanColors.INTERACTIVE
	            }, this._lineStroke())
	        };
	        "line" === type ? lineConfig.extendLine = true : "ray" === type && (lineConfig.extendRay = true);
	        var line = self.line = Interactive2.addMovableLine(graphie, lineConfig);
	        // A and B can't be in the same place
	        points[0].listen("constraints", "isLine", function(coord) {
	            return !kpoint.equal(coord, points[1].coord());
	        });
	        points[1].listen("constraints", "isLine", function(coord) {
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
	        var _this3 = this;
	        var graphie = this.graphie;
	        var coords = this.props.graph.coords;
	        coords || (coords = InteractiveGraph.defaultQuadraticCoords(this.props));
	        var pointA;
	        var pointB;
	        var pointC;
	        var onMoveHandler = function onMoveHandler() {
	            var graph = _.extend({}, _this3.props.graph, {
	                coords: [ pointA.coord(), pointB.coord(), pointC.coord() ]
	            });
	            _this3.onChange({
	                graph: graph
	            });
	            _this3.updateQuadratic();
	        };
	        pointA = this.pointA = Interactive2.addMaybeMobileMovablePoint(this, {
	            coord: coords[0],
	            constraints: [ Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function(coord) {
	                return !pointA || coord[0] !== pointB.coord()[0] && coord[0] !== pointC.coord()[0];
	            } ],
	            onMove: onMoveHandler
	        });
	        pointB = this.pointB = Interactive2.addMaybeMobileMovablePoint(this, {
	            coord: coords[1],
	            constraints: [ Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function(coord) {
	                return !pointB || coord[0] !== pointA.coord()[0] && coord[0] !== pointC.coord()[0];
	            } ],
	            onMove: onMoveHandler
	        });
	        pointC = this.pointC = Interactive2.addMaybeMobileMovablePoint(this, {
	            coord: coords[2],
	            constraints: [ Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function(coord) {
	                return !pointC || coord[0] !== pointA.coord()[0] && coord[0] !== pointB.coord()[0];
	            } ],
	            onMove: onMoveHandler
	        });
	        this.updateQuadratic();
	    },
	    updateQuadratic: function updateQuadratic() {
	        var coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(this.props);
	        if (!coeffs) return;
	        // Extract coefficients the parabola
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
	        // Plot and style
	        if (this.parabola) {
	            var path = this.graphie.svgParabolaPath(a, b, c);
	            this.parabola.attr({
	                path: path
	            });
	        } else {
	            this.parabola = this.graphie.parabola(a, b, c);
	            this.parabola.attr(_extends({
	                stroke: this.props.apiOptions.isMobile ? KhanColors.BLUE_C : KhanColors.DYNAMIC
	            }, this._lineStroke()));
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
	        var _this4 = this;
	        var graphie = this.graphie;
	        var coords = this.props.graph.coords;
	        coords || (coords = InteractiveGraph.defaultSinusoidCoords(this.props));
	        var pointA;
	        var pointB;
	        var onMoveHandler = function onMoveHandler() {
	            var graph = _.extend({}, _this4.props.graph, {
	                coords: [ pointA.coord(), pointB.coord() ]
	            });
	            _this4.onChange({
	                graph: graph
	            });
	            _this4.updateSinusoid();
	        };
	        pointA = this.pointA = Interactive2.addMaybeMobileMovablePoint(this, {
	            coord: coords[0],
	            constraints: [ Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function(coord) {
	                return !pointA || coord[0] !== pointB.coord()[0];
	            } ],
	            onMove: onMoveHandler
	        });
	        pointB = this.pointB = Interactive2.addMaybeMobileMovablePoint(this, {
	            coord: coords[1],
	            constraints: [ Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function(coord) {
	                return !pointA || coord[0] !== pointA.coord()[0];
	            } ],
	            onMove: onMoveHandler
	        });
	        this.updateSinusoid();
	    },
	    updateSinusoid: function updateSinusoid() {
	        var coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(this.props);
	        if (!coeffs) return;
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];
	        // Plot and style
	        if (this.sinusoid) {
	            var path = this.graphie.svgSinusoidPath(a, b, c, d);
	            this.sinusoid.attr({
	                path: path
	            });
	        } else {
	            this.sinusoid = this.graphie.sinusoid(a, b, c, d);
	            this.sinusoid.attr(_extends({
	                stroke: this.props.apiOptions.isMobile ? KhanColors.BLUE_C : KhanColors.DYNAMIC
	            }, this._lineStroke()));
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
	        var _this5 = this;
	        var graphie = this.graphie;
	        var minSnap = _.min(graphie.snap);
	        var circle = this.circle = graphie.addCircleGraph({
	            center: this.props.graph.center || [ 0, 0 ],
	            radius: this.props.graph.radius || _.min(this.props.step),
	            snapX: graphie.snap[0],
	            snapY: graphie.snap[1],
	            minRadius: minSnap,
	            snapRadius: minSnap
	        });
	        $(circle).on("move", function() {
	            var graph = _.extend({}, _this5.props.graph, {
	                center: circle.center,
	                radius: circle.radius
	            });
	            _this5.onChange({
	                graph: graph
	            });
	        });
	    },
	    removeCircleControls: function removeCircleControls() {
	        this.circle.remove();
	    },
	    addLinearSystemControls: function addLinearSystemControls() {
	        var _this6 = this;
	        var graphie = this.graphie;
	        var coords = InteractiveGraph.getLinearSystemCoords(this.props.graph, this.props);
	        var segmentColors = [ KhanColors.INTERACTIVE, KhanColors.GREEN ];
	        var points = this.points = _.map(coords, function(segmentCoords, segmentIndex) {
	            var segmentPoints = _.map(segmentCoords, function(coord, i) {
	                return Interactive2.addMaybeMobileMovablePoint(_this6, {
	                    coord: coord,
	                    constraints: [ Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function(coord) {
	                        if (!segmentPoints) // points hasn't been defined yet because
	                        // we're still creating them
	                        return;
	                        return !kpoint.equal(coord, segmentPoints[1 - i].coord());
	                    } ],
	                    onMove: function onMove() {
	                        var graph = _.extend({}, _this6.props.graph, {
	                            coords: _.map(_this6.points, function(segment) {
	                                return _.invoke(segment, "coord");
	                            })
	                        });
	                        _this6.onChange({
	                            graph: graph
	                        });
	                    },
	                    normalStyle: {
	                        fill: segmentColors[segmentIndex]
	                    },
	                    highlightStyle: {
	                        fill: segmentColors[segmentIndex]
	                    }
	                });
	            });
	            return segmentPoints;
	        });
	        var lines = this.lines = _.map(points, function(segmentPoints, segmentIndex) {
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
	        _.map(this.points, function(segment) {
	            return _.invoke(segment, "remove");
	        });
	    },
	    isCoordInTrash: function isCoordInTrash(coord) {
	        if (this.props.apiOptions.isMobile) return false;
	        var graphie = this.graphie;
	        var screenPoint = graphie.scalePoint(coord);
	        return screenPoint[0] >= graphie.xpixels - 40 && screenPoint[1] >= graphie.ypixels - 40;
	    },
	    createPointForPointsType: function createPointForPointsType(coord, i) {
	        var self = this;
	        var graphie = self.graphie;
	        var remove = function remove() {
	            self.points = _.filter(self.points, function(pt) {
	                return pt !== point;
	            });
	            // update the correct answer box
	            self.updateCoordsFromPoints();
	            // remove this movablePoint from graphie.
	            // we wait to do this until we're not inside of
	            // said point's onMoveEnd method so its state is
	            // consistent throughout this method call
	            setTimeout(point.remove.bind(point), 0);
	        };
	        var point = Interactive2.addMaybeMobileMovablePoint(this, _extends({
	            coord: coord,
	            constraints: [ Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function(coord) {
	                // TODO(jack): There ought to be a
	                // MovablePoint.constraints.avoid
	                // default that lets you do things like this
	                return _.all(self.points, function(pt) {
	                    return point === pt || !kpoint.equal(coord, pt.coord());
	                });
	            } ],
	            onMoveStart: function onMoveStart() {
	                self.isClickToAddPoints() && self.setTrashCanVisibility(1);
	            },
	            onMove: self.updateCoordsFromPoints,
	            onMoveEnd: function onMoveEnd(coord) {
	                if (self.isClickToAddPoints()) {
	                    self.isCoordInTrash(coord) && remove();
	                    // In case we mouseup'd off the graphie and that
	                    // stopped the move (in which case, we might not
	                    // be in isCoordInTrash()
	                    self.setTrashCanVisibility(.5);
	                }
	            }
	        }, this.props.apiOptions.isMobile && self.isClickToAddPoints() ? {
	            onRemove: remove
	        } : {}));
	        return point;
	    },
	    removePoint: function removePoint(point) {
	        var index = null;
	        this.points = _.filter(this.points, function(pt, i) {
	            if (pt === point) {
	                index = i;
	                return false;
	            }
	            return true;
	        });
	        return index;
	    },
	    createPointForPolygonType: function createPointForPolygonType(coord, i) {
	        var _this7 = this;
	        var graphie = this.graphie;
	        // TODO(alex): check against "grid" instead, use constants
	        var snapToGrid = !_.contains([ "angles", "sides" ], this.props.graph.snapTo);
	        // Index relative to current point -> absolute index
	        // NOTE: This does not work when isClickToAddPoints() == true,
	        // as `i` can be changed by dragging a point to the trash
	        // Currently this function is only called when !isClickToAddPoints()
	        var rel = function rel(j) {
	            return (i + j + _this7.points.length) % _this7.points.length;
	        };
	        var remove = function remove() {
	            // remove this point from points
	            var index = _this7.removePoint(point);
	            if (_this7.polygon.closed()) {
	                _this7.points = rotate(_this7.points, index);
	                _this7.polygon.update({
	                    closed: false
	                });
	            }
	            _this7.updatePolygon();
	            // the polygon is now unclosed, so we need to
	            // remove any points props
	            _this7.clearCoords();
	            // remove this movablePoint from graphie.
	            // wait to do this until we're not inside of
	            // said point's onMoveEnd method so state is
	            // consistent throughout the method call
	            setTimeout(point.remove.bind(point), 0);
	        };
	        var onMoveEndHandler = function onMoveEndHandler(coord) {
	            if (_this7.isClickToAddPoints()) {
	                if (_this7.isCoordInTrash(coord)) remove(); else if (_this7.points.length > 1 && (point === _this7.points[0] && kpoint.equal(coord, _.last(_this7.points).coord()) || point === _.last(_this7.points) && kpoint.equal(coord, _this7.points[0].coord()))) {
	                    // If the user clicked and dragged a point over endpoint,
	                    // join the them
	                    var pointToRemove = _this7.points.pop();
	                    if (_this7.points.length > 2) {
	                        _this7.polygon.update({
	                            closed: true
	                        });
	                        _this7.updateCoordsFromPoints();
	                    } else {
	                        _this7.polygon.update({
	                            closed: false
	                        });
	                        _this7.clearCoords();
	                    }
	                    _this7.updatePolygon();
	                    // remove this movablePoint from graphie.
	                    // wait to do this until we're not inside of
	                    // said point's onMoveEnd method so state is
	                    // consistent throughout the method call
	                    setTimeout(pointToRemove.remove.bind(pointToRemove), 0);
	                } else {
	                    // If the user clicked and dragged a point over any other
	                    // existing point, fix shape
	                    var shouldRemove = _.any(_this7.points, function(pt) {
	                        return pt !== point && kpoint.equal(pt.coord(), coord);
	                    });
	                    if (shouldRemove) {
	                        _this7.removePoint(point);
	                        if (_this7.points.length < 3) {
	                            _this7.polygon.update({
	                                closed: false
	                            });
	                            _this7.clearCoords();
	                        } else _this7.polygon.closed() && _this7.updateCoordsFromPoints();
	                        _this7.updatePolygon();
	                        // remove this movablePoint from graphie.
	                        // wait to do this until we're not inside
	                        // said point's onMoveEnd method so state
	                        // is consistent throughout the method call
	                        setTimeout(point.remove.bind(point), 0);
	                    } else // If this was
	                    //  * not a deletion
	                    //  * and a click on the first or last point
	                    //  * and not a drag,
	                    //  * and not a creation of a new point
	                    //    (see !point.state.isInitialMove, below),
	                    //  * and our polygon is not closed,
	                    //  * and we can close it (we need at least 3 points),
	                    // then close it
	                    if ((point === _this7.points[0] || point === _.last(_this7.points)) && !point.hasMoved() && !point.state.isInitialMove && !_this7.polygon.closed() && _this7.points.length > 2) {
	                        _this7.polygon.update({
	                            closed: true
	                        });
	                        _this7.updatePolygon();
	                        // We finally have a closed polygon, so save our
	                        // points to props
	                        _this7.updateCoordsFromPoints();
	                    }
	                }
	                // In case we mouseup'd off the graphie and that
	                // stopped the move
	                _this7.setTrashCanVisibility(.5);
	            }
	            point.state.isInitialMove = false;
	        };
	        var graphConstraint = function graphConstraint(coord) {
	            // These constraints are all relative to the other points, so if
	            // we're creating the initial points and haven't added any others
	            // to the graph, we can't enforce them.
	            if (null == _this7.points || 0 === _this7.points.length) return true;
	            var coords = _.invoke(_this7.points, "coord");
	            coords[i] = coord;
	            // Check for invalid positioning, but only if we aren't adding
	            // points one click at a time, since those added points could
	            // have already violated these constraints
	            if (!_this7.isClickToAddPoints()) {
	                // Polygons can't have consecutive collinear points
	                if (collinear(coords[rel(-2)], coords[rel(-1)], coords[i]) || collinear(coords[rel(-1)], coords[i], coords[rel(1)]) || collinear(coords[i], coords[rel(1)], coords[rel(2)])) return false;
	                var segments = _.zip(coords, rotate(coords));
	                if (_this7.points.length > 3) // Constrain to simple (non self-intersecting) polygon by
	                // testing whether adjacent segments intersect any others
	                for (var j = -1; j <= 0; j++) {
	                    var segment = segments[rel(j)];
	                    var others = _.without(segments, segment, segments[rel(j - 1)], segments[rel(j + 1)]);
	                    for (var k = 0; k < others.length; k++) {
	                        var other = others[k];
	                        if (intersects(segment, other)) return false;
	                    }
	                }
	            }
	            if ("angles" === _this7.props.graph.snapTo && _this7.points.length > 2) {
	                // Snap to whole degree interior angles
	                var angles = _.map(angleMeasures(coords), function(rad) {
	                    return 180 * rad / Math.PI;
	                });
	                _.each([ -1, 1 ], function(j) {
	                    angles[rel(j)] = Math.round(angles[rel(j)]);
	                });
	                var getAngle = function getAngle(a, vertex, b) {
	                    return (GraphUtils.findAngle(coords[rel(a)], coords[rel(b)], coords[rel(vertex)]) + 360) % 360;
	                };
	                var innerAngles = [ angles[rel(-1)] - getAngle(-2, -1, 1), angles[rel(1)] - getAngle(-1, 1, 2) ];
	                innerAngles[2] = 180 - (innerAngles[0] + innerAngles[1]);
	                // Avoid degenerate triangles
	                if (_.any(innerAngles, function(angle) {
	                    return leq(angle, 1);
	                })) return false;
	                var knownSide = magnitude(vector(coords[rel(-1)], coords[rel(1)]));
	                var onLeft = 1 === sign(ccw(coords[rel(-1)], coords[rel(1)], coords[i]));
	                // Solve for side by using the law of sines
	                var side = Math.sin(innerAngles[1] * Math.PI / 180) / Math.sin(innerAngles[2] * Math.PI / 180) * knownSide;
	                var outerAngle = GraphUtils.findAngle(coords[rel(1)], coords[rel(-1)]);
	                var offset = _this7.graphie.polar(side, outerAngle + (onLeft ? 1 : -1) * innerAngles[0]);
	                return _this7.graphie.addPoints(coords[rel(-1)], offset);
	            }
	            if ("sides" === _this7.props.graph.snapTo && _this7.points.length > 1) {
	                // Snap to whole unit side measures
	                var sides = _.map([ [ coords[rel(-1)], coords[i] ], [ coords[i], coords[rel(1)] ], [ coords[rel(-1)], coords[rel(1)] ] ], function(coords) {
	                    return magnitude(vector.apply(null, coords));
	                });
	                _.each([ 0, 1 ], function(j) {
	                    sides[j] = Math.round(sides[j]);
	                });
	                // Avoid degenerate triangles
	                if (leq(sides[1] + sides[2], sides[0]) || leq(sides[0] + sides[2], sides[1]) || leq(sides[0] + sides[1], sides[2])) return false;
	                // Solve for angle by using the law of cosines
	                var innerAngle = lawOfCosines(sides[0], sides[2], sides[1]);
	                var outerAngle = GraphUtils.findAngle(coords[rel(1)], coords[rel(-1)]);
	                var onLeft = 1 === sign(ccw(coords[rel(-1)], coords[rel(1)], coords[i]));
	                var offset = _this7.graphie.polar(sides[0], outerAngle + (onLeft ? 1 : -1) * innerAngle);
	                return _this7.graphie.addPoints(coords[rel(-1)], offset);
	            }
	            // Snap to grid (already done)
	            return true;
	        };
	        var point = Interactive2.addMaybeMobileMovablePoint(this, _extends({
	            coord: coord,
	            constraints: [ Interactive2.MovablePoint.constraints.bound(), snapToGrid ? Interactive2.MovablePoint.constraints.snap() : null, graphConstraint ],
	            onMoveStart: function onMoveStart() {
	                _this7.isClickToAddPoints() && _this7.setTrashCanVisibility(1);
	            },
	            onMove: function onMove() {
	                _this7.polygon.closed() && _this7.updateCoordsFromPoints();
	            },
	            onMoveEnd: onMoveEndHandler
	        }, this.props.apiOptions.isMobile && this.isClickToAddPoints() ? {
	            onRemove: remove
	        } : {}));
	        point.state.isInitialMove = true;
	        return point;
	    },
	    updateCoordsFromPoints: function updateCoordsFromPoints() {
	        var graph = _.extend({}, this.props.graph, {
	            // Handle old movable points with .coord, or
	            // Interactive2.MovablePoint's with .coord()
	            coords: _.map(this.points, function(point) {
	                return _.result(point, "coord");
	            })
	        });
	        this.onChange({
	            graph: graph
	        });
	    },
	    clearCoords: function clearCoords() {
	        var graph = _.extend({}, this.props.graph, {
	            coords: null
	        });
	        this.onChange({
	            graph: graph
	        });
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
	        var _this8 = this;
	        var self = this;
	        var graphie = this.graphie;
	        var coords = InteractiveGraph.getSegmentCoords(this.props.graph, this.props);
	        var createPoint = function createPoint(options) {
	            return Interactive2.addMaybeMobileMovablePoint(_this8, options);
	        };
	        this.points = [];
	        this.lines = _.map(coords, function(segment, i) {
	            var updateCoordProps = function updateCoordProps() {
	                var graph = _.extend({}, self.props.graph, {
	                    coords: _.invoke(self.lines, "coords")
	                });
	                self.onChange({
	                    graph: graph
	                });
	            };
	            var points = _.map(segment, function(coord, i) {
	                return createPoint({
	                    coord: coord,
	                    constraints: [ Interactive2.MovablePoint.constraints.bound(), Interactive2.MovablePoint.constraints.snap(), function(coord) {
	                        if (!points) // points hasn't been defined yet because
	                        // we're still creating them
	                        return;
	                        return !kpoint.equal(coord, points[1 - i].coord());
	                    } ],
	                    onMove: updateCoordProps
	                });
	            });
	            self.points = self.points.concat(points);
	            var line = Interactive2.addMovableLine(graphie, {
	                points: points,
	                static: false,
	                constraints: [ Interactive2.MovableLine.constraints.bound(), Interactive2.MovableLine.constraints.snap() ],
	                onMove: [ Interactive2.MovableLine.onMove.updatePoints, updateCoordProps ],
	                normalStyle: _extends({
	                    stroke: this.props.apiOptions.isMobile ? KhanColors.BLUE_C : KhanColors.INTERACTIVE
	                }, this._lineStroke()),
	                highlightStyle: _extends({
	                    stroke: this.props.apiOptions.isMobile ? KhanColors.BLUE_C : KhanColors.INTERACTING
	                }, this._lineStroke())
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
	        closed = this.polygon ? this.polygon.closed() : this.points.length >= 3;
	        var graphie = this.graphie;
	        var n = this.points.length;
	        // TODO(alex): check against "grid" instead, use constants
	        var snapToGrid = !_.contains([ "angles", "sides" ], this.props.graph.snapTo);
	        var angleLabels = _.times(n, function(i) {
	            return this.props.graph.showAngles && (closed || 0 !== i && i !== n - 1) ? "angles" === this.props.graph.snapTo ? "$deg0" : "$deg1" : "";
	        }, this);
	        var showRightAngleMarkers = _.times(n, function(i) {
	            return closed || 0 !== i && i !== n - 1;
	        }, this);
	        var numArcs = _.times(n, function(i) {
	            return this.props.graph.showAngles && (closed || 0 !== i && i !== n - 1) ? 1 : 0;
	        }, this);
	        var sideLabels = _.times(n, function(i) {
	            return !this.props.graph.showSides || !closed && i === n - 1 ? "" : "sides" === this.props.graph.snapTo ? "$len0" : "$len1";
	        }, this);
	        if (null == this.polygon) {
	            var self = this;
	            self.polygon = Interactive2.addMovablePolygon(graphie, {
	                constraints: [ Interactive2.MovablePolygon.constraints.bound(), snapToGrid ? Interactive2.MovablePolygon.constraints.snap() : null ],
	                closed: closed,
	                points: self.points,
	                angleLabels: angleLabels,
	                showRightAngleMarkers: showRightAngleMarkers,
	                numArcs: numArcs,
	                sideLabels: sideLabels,
	                onMove: [ Interactive2.MovablePolygon.onMove.updatePoints, function() {
	                    this.closed() && self.updateCoordsFromPoints();
	                } ],
	                normalStyle: _extends({
	                    stroke: this.props.apiOptions.isMobile ? KhanColors.BLUE_C : KhanColors.INTERACTIVE
	                }, this._lineStroke())
	            });
	        } else // We only need to pass in the properties that might've changed
	        this.polygon.update({
	            closed: closed,
	            points: this.points,
	            angleLabels: angleLabels,
	            showRightAngleMarkers: showRightAngleMarkers,
	            numArcs: numArcs,
	            sideLabels: sideLabels
	        });
	    },
	    removePolygonControls: function removePolygonControls() {
	        _.invoke(this.points, "remove");
	        this.polygon.remove();
	    },
	    addAngleControls: function addAngleControls() {
	        var _this9 = this;
	        var graphie = this.graphie;
	        var coords = InteractiveGraph.getAngleCoords(this.props.graph, this.props);
	        // The vertex snaps to the grid, but the rays don't...
	        this.points = _.map(coords, function(coord, i) {
	            return graphie.addMovablePoint(_.extend({
	                coord: coord,
	                normalStyle: {
	                    stroke: KhanColors.INTERACTIVE,
	                    fill: KhanColors.INTERACTIVE
	                }
	            }, 1 === i ? {
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
	        $(this.angle).on("move", function() {
	            var graph = _.extend({}, _this9.props.graph, {
	                coords: _this9.angle.getClockwiseCoords()
	            });
	            _this9.onChange({
	                graph: graph
	            });
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
	        this.onChange({
	            graph: graph
	        });
	    },
	    toggleShowSides: function toggleShowSides() {
	        var graph = _.extend({}, this.props.graph, {
	            showSides: !this.props.graph.showSides
	        });
	        this.onChange({
	            graph: graph
	        });
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
	        if (0 === denom) return;
	        return [ (p3[0] * (p2[1] - p1[1]) + p2[0] * (p1[1] - p3[1]) + p1[0] * (p3[1] - p2[1])) / denom, (p3[0] * p3[0] * (p1[1] - p2[1]) + p2[0] * p2[0] * (p3[1] - p1[1]) + p1[0] * p1[0] * (p2[1] - p3[1])) / denom, (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] + p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] + p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) / denom ];
	    },
	    getSinusoidCoefficients: function getSinusoidCoefficients(coords) {
	        // It's assumed that p1 is the root and p2 is the first peak
	        var p1 = coords[0];
	        var p2 = coords[1];
	        // Resulting coefficients are canonical for this sine curve
	        var amplitude = p2[1] - p1[1];
	        var angularFrequency = Math.PI / (2 * (p2[0] - p1[0]));
	        return [ amplitude, angularFrequency, p1[0] * angularFrequency, p1[1] ];
	    },
	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getLineCoords: function getLineCoords(graph, props) {
	        return graph.coords || InteractiveGraph.pointsFromNormalized(props, [ [ .25, .75 ], [ .75, .75 ] ]);
	    },
	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getPointCoords: function getPointCoords(graph, props) {
	        var numPoints = graph.numPoints || 1;
	        var coords = graph.coords;
	        if (coords) return coords;
	        switch (numPoints) {
	          case 1:
	            // Back in the day, one point's coords were in graph.coord
	            coords = [ graph.coord || [ 0, 0 ] ];
	            break;

	          case 2:
	            coords = [ [ -5, 0 ], [ 5, 0 ] ];
	            break;

	          case 3:
	            coords = [ [ -5, 0 ], [ 0, 0 ], [ 5, 0 ] ];
	            break;

	          case 4:
	            coords = [ [ -6, 0 ], [ -2, 0 ], [ 2, 0 ], [ 6, 0 ] ];
	            break;

	          case 5:
	            coords = [ [ -6, 0 ], [ -3, 0 ], [ 0, 0 ], [ 3, 0 ], [ 6, 0 ] ];
	            break;

	          case 6:
	            coords = [ [ -5, 0 ], [ -3, 0 ], [ -1, 0 ], [ 1, 0 ], [ 3, 0 ], [ 5, 0 ] ];
	            break;

	          case UNLIMITED:
	            coords = [];
	        }
	        // Transform coords from their -10 to 10 space to 0 to 1
	        // because of the old graph.coord, and also it's easier.
	        var range = [ [ -10, 10 ], [ -10, 10 ] ];
	        coords = InteractiveGraph.normalizeCoords(coords, range);
	        var coords = InteractiveGraph.pointsFromNormalized(props, coords);
	        return coords;
	    },
	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getLinearSystemCoords: function getLinearSystemCoords(graph, props) {
	        return graph.coords || _.map([ [ [ .25, .75 ], [ .75, .75 ] ], [ [ .25, .25 ], [ .75, .25 ] ] ], function(coords) {
	            return InteractiveGraph.pointsFromNormalized(props, coords);
	        });
	    },
	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getPolygonCoords: function getPolygonCoords(graph, props) {
	        var coords = graph.coords;
	        if (coords) return coords;
	        var n = graph.numSides || 3;
	        if (n === UNLIMITED) coords = []; else {
	            var angle = 2 * Math.PI / n;
	            var offset = (1 / n - .5) * Math.PI;
	            // TODO(alex): Generalize this to more than just triangles so that
	            // all polygons have whole number side lengths if snapping to sides
	            var radius = "sides" === graph.snapTo ? Math.sqrt(3) / 3 * 7 : 4;
	            // Generate coords of a regular polygon with n sides
	            coords = _.times(n, function(i) {
	                return [ radius * Math.cos(i * angle + offset), radius * Math.sin(i * angle + offset) ];
	            });
	        }
	        var range = [ [ -10, 10 ], [ -10, 10 ] ];
	        coords = InteractiveGraph.normalizeCoords(coords, range);
	        var snapToGrid = !_.contains([ "angles", "sides" ], graph.snapTo);
	        coords = InteractiveGraph.pointsFromNormalized(props, coords, /* noSnap */
	        !snapToGrid);
	        return coords;
	    },
	    /**
	     * @param {object} graph Like props.graph or props.correct
	     * @param {object} props of an InteractiveGraph instance
	     */
	    getSegmentCoords: function getSegmentCoords(graph, props) {
	        var coords = graph.coords;
	        if (coords) return coords;
	        var n = graph.numSegments || 1;
	        var ys = {
	            1: [ 5 ],
	            2: [ 5, -5 ],
	            3: [ 5, 0, -5 ],
	            4: [ 6, 2, -2, -6 ],
	            5: [ 6, 3, 0, -3, -6 ],
	            6: [ 5, 3, 1, -1, -3, -5 ]
	        }[n];
	        var range = [ [ -10, 10 ], [ -10, 10 ] ];
	        return _.map(ys, function(y) {
	            var segment = [ [ -5, y ], [ 5, y ] ];
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
	        if (coords) return coords;
	        var snap = graph.snapDegrees || 1;
	        var angle = snap;
	        while (angle < 20) angle += snap;
	        angle = angle * Math.PI / 180;
	        var offset = (graph.angleOffsetDeg || 0) * Math.PI / 180;
	        coords = InteractiveGraph.pointsFromNormalized(props, [ [ .85, .5 ], [ .5, .5 ] ]);
	        var radius = magnitude(vector.apply(null, coords));
	        // Adjust the lower point by angleOffsetDeg degrees
	        coords[0] = [ coords[1][0] + radius * Math.cos(offset), coords[1][1] + radius * Math.sin(offset) ];
	        // Position the upper point angle radians from the
	        // lower point
	        coords[2] = [ coords[1][0] + radius * Math.cos(angle + offset), coords[1][1] + radius * Math.sin(angle + offset) ];
	        return coords;
	    },
	    normalizeCoords: function normalizeCoords(coordsList, range) {
	        return _.map(coordsList, function(coords) {
	            return _.map(coords, function(coord, i) {
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
	        return _.map(coordsList, function(coords) {
	            return _.map(coords, function(coord, i) {
	                var range = props.range[i];
	                if (noSnap) return range[0] + (range[1] - range[0]) * coord;
	                var step = props.step[i];
	                var nSteps = numSteps(range, step);
	                var tick = Math.round(coord * nSteps);
	                return range[0] + step * tick;
	            });
	        });
	    },
	    getLinearEquationString: function getLinearEquationString(props) {
	        var coords = InteractiveGraph.getLineCoords(props.graph, props);
	        if (eq(coords[0][0], coords[1][0])) return "x = " + coords[0][0].toFixed(3);
	        var m = (coords[1][1] - coords[0][1]) / (coords[1][0] - coords[0][0]);
	        var b = coords[0][1] - m * coords[0][0];
	        return eq(m, 0) ? "y = " + b.toFixed(3) : "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
	    },
	    getCurrentQuadraticCoefficients: function getCurrentQuadraticCoefficients(props) {
	        // TODO(alpert): Don't duplicate
	        var coords = props.graph.coords || InteractiveGraph.defaultQuadraticCoords(props);
	        return InteractiveGraph.getQuadraticCoefficients(coords);
	    },
	    defaultQuadraticCoords: function defaultQuadraticCoords(props) {
	        var coords = [ [ .25, .75 ], [ .5, .25 ], [ .75, .75 ] ];
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
	        var coords = [ [ .5, .5 ], [ .65, .6 ] ];
	        return InteractiveGraph.pointsFromNormalized(props, coords);
	    },
	    getSinusoidEquationString: function getSinusoidEquationString(props) {
	        var coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(props);
	        return "y = " + coeffs[0].toFixed(3) + "sin(" + coeffs[1].toFixed(3) + "x - " + coeffs[2].toFixed(3) + ") + " + coeffs[3].toFixed(3);
	    },
	    getCircleEquationString: function getCircleEquationString(props) {
	        var graph = props.graph;
	        // TODO(alpert): Don't duplicate
	        var center = graph.center || [ 0, 0 ];
	        return "center (" + center[0] + ", " + center[1] + "), radius " + (graph.radius || 2);
	    },
	    getLinearSystemEquationString: function getLinearSystemEquationString(props) {
	        var coords = InteractiveGraph.getLinearSystemCoords(props.graph, props);
	        return "\n" + getLineEquation(coords[0][0], coords[0][1]) + "\n" + getLineEquation(coords[1][0], coords[1][1]) + "\n" + getLineIntersection(coords[0], coords[1]);
	    },
	    getPointEquationString: function getPointEquationString(props) {
	        return InteractiveGraph.getPointCoords(props.graph, props).map(function(coord) {
	            return "(" + coord[0] + ", " + coord[1] + ")";
	        }).join(", ");
	    },
	    getSegmentEquationString: function getSegmentEquationString(props) {
	        var segments = InteractiveGraph.getSegmentCoords(props.graph, props);
	        return _.map(segments, function(segment) {
	            return "[" + _.map(segment, function(coord) {
	                return "(" + coord.join(", ") + ")";
	            }).join(" ") + "]";
	        }).join(" ");
	    },
	    getRayEquationString: function getRayEquationString(props) {
	        var coords = InteractiveGraph.getLineCoords(props.graph, props);
	        var a = coords[0];
	        var b = coords[1];
	        var eq = InteractiveGraph.getLinearEquationString(props);
	        a[0] > b[0] ? eq += " (for x <= " + a[0].toFixed(3) + ")" : a[0] < b[0] ? eq += " (for x >= " + a[0].toFixed(3) + ")" : a[1] > b[1] ? eq += " (for y <= " + a[1].toFixed(3) + ")" : eq += " (for y >= " + a[1].toFixed(3) + ")";
	        return eq;
	    },
	    getPolygonEquationString: function getPolygonEquationString(props) {
	        var coords = InteractiveGraph.getPolygonCoords(props.graph, props);
	        return _.map(coords, function(coord) {
	            return "(" + coord.join(", ") + ")";
	        }).join(" ");
	    },
	    getAngleEquationString: function getAngleEquationString(props) {
	        var coords = InteractiveGraph.getAngleCoords(props.graph, props);
	        return GraphUtils.findAngle(coords[2], coords[0], coords[1]).toFixed(0) + "° angle at (" + coords[1].join(", ") + ")";
	    },
	    validate: function validate(state, rubric, component) {
	        // When nothing has moved, there will neither be coords nor the
	        // circle's center/radius fields. When those fields are absent, skip
	        // all these checks; just go mark the answer as empty.
	        var hasValue = !!(state.coords || state.center && state.radius);
	        if (state.type === rubric.correct.type && hasValue) if ("linear" === state.type) {
	            var guess = state.coords;
	            var correct = rubric.correct.coords;
	            // If both of the guess points are on the correct line, it's
	            // correct.
	            if (collinear(correct[0], correct[1], guess[0]) && collinear(correct[0], correct[1], guess[1])) return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if ("linear-system" === state.type) {
	            var guess = state.coords;
	            var correct = rubric.correct.coords;
	            if (collinear(correct[0][0], correct[0][1], guess[0][0]) && collinear(correct[0][0], correct[0][1], guess[0][1]) && collinear(correct[1][0], correct[1][1], guess[1][0]) && collinear(correct[1][0], correct[1][1], guess[1][1]) || collinear(correct[0][0], correct[0][1], guess[1][0]) && collinear(correct[0][0], correct[0][1], guess[1][1]) && collinear(correct[1][0], correct[1][1], guess[0][0]) && collinear(correct[1][0], correct[1][1], guess[0][1])) return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if ("quadratic" === state.type) {
	            // If the parabola coefficients match, it's correct.
	            var guessCoeffs = this.getQuadraticCoefficients(state.coords);
	            var correctCoeffs = this.getQuadraticCoefficients(rubric.correct.coords);
	            if (deepEq(guessCoeffs, correctCoeffs)) return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if ("sinusoid" === state.type) {
	            var guessCoeffs = this.getSinusoidCoefficients(state.coords);
	            var correctCoeffs = this.getSinusoidCoefficients(rubric.correct.coords);
	            var canonicalGuessCoeffs = canonicalSineCoefficients(guessCoeffs);
	            var canonicalCorrectCoeffs = canonicalSineCoefficients(correctCoeffs);
	            // If the canonical coefficients match, it's correct.
	            if (deepEq(canonicalGuessCoeffs, canonicalCorrectCoeffs)) return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if ("circle" === state.type) {
	            if (deepEq(state.center, rubric.correct.center) && eq(state.radius, rubric.correct.radius)) return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if ("point" === state.type) {
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
	            if (deepEq(guess, correct)) return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if ("polygon" === state.type) {
	            var guess = state.coords.slice();
	            var correct = rubric.correct.coords.slice();
	            var match;
	            if ("similar" === rubric.correct.match) match = similar(guess, correct, Number.POSITIVE_INFINITY); else if ("congruent" === rubric.correct.match) match = similar(guess, correct, knumber.DEFAULT_TOLERANCE); else if ("approx" === rubric.correct.match) match = similar(guess, correct, .1); else {
	                /* exact */
	                guess.sort();
	                correct.sort();
	                match = deepEq(guess, correct);
	            }
	            if (match) return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if ("segment" === state.type) {
	            var guess = state.coords.slice();
	            var correct = rubric.correct.coords.slice();
	            guess = _.invoke(guess, "sort").sort();
	            correct = _.invoke(correct, "sort").sort();
	            if (deepEq(guess, correct)) return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if ("ray" === state.type) {
	            var guess = state.coords;
	            var correct = rubric.correct.coords;
	            if (deepEq(guess[0], correct[0]) && collinear(correct[0], correct[1], guess[1])) return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        } else if ("angle" === state.type) {
	            var guess = state.coords;
	            var correct = rubric.correct.coords;
	            var match;
	            if ("congruent" === rubric.correct.match) {
	                var angles = _.map([ guess, correct ], function(coords) {
	                    return (GraphUtils.findAngle(coords[2], coords[0], coords[1]) + 360) % 360;
	                });
	                match = eq.apply(null, angles);
	            } else /* exact */
	            match = deepEq(guess[1], correct[1]) && collinear(correct[1], correct[0], guess[0]) && collinear(correct[1], correct[2], guess[2]);
	            if (match) return {
	                type: "points",
	                earned: 1,
	                total: 1,
	                message: null
	            };
	        }
	        // The input wasn't correct, so check if it's a blank input or if it's
	        // actually just wrong
	        // The input wasn't correct, so check if it's a blank input or if it's
	        // actually just wrong
	        return !hasValue || _.isEqual(state, rubric.graph) ? {
	            type: "invalid",
	            message: null
	        } : {
	            type: "points",
	            earned: 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "interactive-graph",
	    displayName: "Interactive graph",
	    widget: InteractiveGraph
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable array-bracket-spacing, comma-dangle, no-undef, no-unused-vars, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Changeable = __webpack_require__(88);

	var WidgetJsonifyDeprecated = __webpack_require__(108);

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
	    float: "right",
	    paddingRight: CELL_PADDING
	};

	var MAIN_TILE_SIZE = 50;

	var mapCells = function mapCells(cells, func) {
	    return _.map(cells, function(row, y) {
	        return _.map(row, function(value, x) {
	            return func(value, y, x);
	        });
	    });
	};

	var genCells = function genCells(height, width, func) {
	    return _.times(height, function(y) {
	        return _.times(width, function(x) {
	            return func(y, x);
	        });
	    });
	};

	var PATTERNS = {
	    plus: function plus() {
	        return [ [ false, true, false ], [ true, true, true ], [ false, true, false ] ];
	    },
	    x: function x() {
	        return [ [ true, false, true ], [ false, true, false ], [ true, false, true ] ];
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
	            onClick: this._flip
	        });
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
	        return React.createElement("div", {
	            style: TABLE_STYLE,
	            className: "no-select"
	        }, _.map(this.props.cells, function(row, y) {
	            return React.createElement("div", {
	                key: y,
	                style: ROW_STYLE
	            }, _.map(row, function(cell, x) {
	                return React.createElement("div", {
	                    key: x,
	                    style: CELL_STYLE
	                }, React.createElement(Tile, {
	                    value: cell,
	                    size: _this.props.size,
	                    onChange: _.partial(_this.props.onChange, y, x)
	                }));
	            }));
	        }));
	    }
	});

	// Returns a copy of the tiles, with tiles flipped according to
	// whether or not their y, x position satisfies the predicate
	var flipTilesPredicate = function flipTilesPredicate(oldCells, predicate) {
	    return _.map(oldCells, function(row, y) {
	        return _.map(row, function(cell, x) {
	            return predicate(y, x) ? !cell : cell;
	        });
	    });
	};

	var flipTilesPattern = function flipTilesPattern(oldCells, tileY, tileX, pattern) {
	    return flipTilesPredicate(oldCells, function(y, x) {
	        var offsetY = y - tileY;
	        var offsetX = x - tileX;
	        return Math.abs(offsetY) <= 1 && Math.abs(offsetX) <= 1 && pattern[offsetY + 1][offsetX + 1];
	    });
	};

	// The lights puzzle widget
	var LightsPuzzle = React.createClass({
	    displayName: "LightsPuzzle",
	    propTypes: _extends({}, Changeable.propTypes, {
	        cells: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.bool)),
	        startCells: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.bool)),
	        flipPattern: React.PropTypes.string.isRequired,
	        moveCount: React.PropTypes.number.isRequired
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            cells: [ [ false, false, false ], [ false, false, false ], [ false, false, false ] ],
	            startCells: [ [ false, false, false ], [ false, false, false ], [ false, false, false ] ],
	            flipPattern: "plus",
	            moveCount: 0
	        };
	    },
	    getUserInput: function getUserInput() {
	        return WidgetJsonifyDeprecated.getUserInput.call(this);
	    },
	    render: function render() {
	        var width = this._width();
	        var tileSize = MAIN_TILE_SIZE;
	        var pxWidth = width * (tileSize + 2 * CELL_PADDING);
	        return React.createElement("div", null, React.createElement(TileGrid, {
	            cells: this.props.cells,
	            size: tileSize,
	            onChange: this._flipTile
	        }), React.createElement("div", {
	            style: {
	                width: pxWidth
	            }
	        }, React.createElement("div", {
	            style: MOVE_COUNT_STYLE
	        }, "Moves: ", this.props.moveCount), React.createElement("div", {
	            style: RESET_BUTTON_STYLE
	        }, React.createElement("input", {
	            type: "button",
	            value: "Reset",
	            onClick: this._reset,
	            className: "simple-button"
	        }))), React.createElement("div", {
	            className: "clearfix"
	        }));
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    _width: function _width() {
	        return 0 !== this.props.cells.length ? this.props.cells[0].length : 0;
	    },
	    componentDidMount: function componentDidMount() {
	        this._initNextPatterns();
	    },
	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        prevProps.flipPattern !== this.props.flipPattern && this._initNextPatterns();
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
	    if (_.all(state.cells, function(row, y) {
	        return _.all(row, function(cell, x) {
	            return cell === rubric.startCells[y][x];
	        });
	    })) return {
	        type: "invalid",
	        message: i18n._("Click on the tiles to change the lights.")
	    };
	    return _.all(state.cells, function(row) {
	        return _.all(row, function(cell) {
	            return cell;
	        });
	    }) ? {
	        type: "points",
	        earned: 1,
	        total: 1,
	        message: null
	    } : rubric.gradeIncompleteAsWrong ? {
	        type: "points",
	        earned: 0,
	        total: 1,
	        message: null
	    } : {
	        type: "invalid",
	        message: i18n._("You must turn on all of the lights to continue.")
	    };
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, max-len, no-undef, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, space-before-function-paren */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var classNames = __webpack_require__(13);

	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var NumberInput = __webpack_require__(114);

	var Renderer = __webpack_require__(8);

	var TextInput = __webpack_require__(115);

	var MathOutput = __webpack_require__(116);

	var SimpleKeypadInput = __webpack_require__(83);

	var ApiOptions = __webpack_require__(18).Options;

	var KhanAnswerTypes = __webpack_require__(77);

	var keypadElementPropType = __webpack_require__(81).propTypes.keypadElementPropType;

	var assert = __webpack_require__(117).assert;

	var stringArrayOfSize = __webpack_require__(17).stringArrayOfSize;

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
	    INPUT_HEIGHT: 36,
	    INPUT_WIDTH: 64
	};

	/* Input handling: Maps a (row, column) pair to a unique ref used by React,
	 * and extracts (row, column) pairs from input paths, used to allow outsiders
	 * to focus, blur, set input values, etc. */
	var getInputPath = function getInputPath(row, column) {
	    return [ "" + row, "" + column ];
	};

	var getDefaultPath = function getDefaultPath() {
	    return getInputPath(0, 0);
	};

	var getRowFromPath = function getRowFromPath(path) {
	    // 'path' should be a (row, column) pair
	    assert(_.isArray(path) && 2 === path.length);
	    return +path[0];
	};

	var getColumnFromPath = function getColumnFromPath(path) {
	    // 'path' should be a (row, column) pair
	    assert(_.isArray(path) && 2 === path.length);
	    return +path[1];
	};

	var getRefForPath = function getRefForPath(path) {
	    return "answer" + getRowFromPath(path) + "," + getColumnFromPath(path);
	};

	var getMatrixSize = function getMatrixSize(matrix) {
	    var matrixSize = [ 1, 1 ];
	    // We need to find the widest row and tallest column to get the correct
	    // matrix size.
	    _(matrix).each(function(matrixRow, row) {
	        var rowWidth = 0;
	        _(matrixRow).each(function(matrixCol, col) {
	            null != matrixCol && matrixCol.toString().length && (rowWidth = col + 1);
	        });
	        // Matrix width:
	        matrixSize[1] = Math.max(matrixSize[1], rowWidth);
	        // Matrix height:
	        rowWidth > 0 && (matrixSize[0] = Math.max(matrixSize[0], row + 1));
	    });
	    return matrixSize;
	};

	var Matrix = React.createClass({
	    displayName: "Matrix",
	    propTypes: {
	        answers: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number ]))),
	        apiOptions: ApiOptions.propTypes,
	        cursorPosition: React.PropTypes.arrayOf(React.PropTypes.number),
	        keypadElement: keypadElementPropType,
	        matrixBoardSize: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
	        prefix: React.PropTypes.string,
	        suffix: React.PropTypes.string,
	        trackInteraction: React.PropTypes.func.isRequired,
	        highlightLint: React.PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            matrixBoardSize: [ 3, 3 ],
	            answers: [ [] ],
	            prefix: "",
	            suffix: "",
	            cursorPosition: [ 0, 0 ],
	            apiOptions: ApiOptions.defaults,
	            highlightLint: false
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            enterTheMatrix: 0
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        // Used in the `onBlur` and `onFocus` handlers
	        this.cursorPosition = [ 0, 0 ];
	    },
	    render: function render() {
	        var _this = this;
	        // Set the input sizes through JS so we can control the size of the
	        // brackets. (If we set them in CSS we won't know values until the
	        // inputs are rendered.)
	        var dimensions = void 0;
	        dimensions = this.props.apiOptions.customKeypad ? KEYPAD_INPUT_DIMENSIONS : this.props.apiOptions.staticRender ? STATIC_INPUT_DIMENSIONS : NORMAL_DIMENSIONS;
	        var _dimensions = dimensions, INPUT_MARGIN = _dimensions.INPUT_MARGIN, INPUT_HEIGHT = _dimensions.INPUT_HEIGHT, INPUT_WIDTH = _dimensions.INPUT_WIDTH;
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
	        return React.createElement("div", {
	            className: className
	        }, this.props.prefix && React.createElement("div", {
	            className: "matrix-prefix"
	        }, React.createElement(Renderer, {
	            content: this.props.prefix,
	            highlightLint: this.props.highlightLint
	        })), React.createElement("div", {
	            className: "matrix-input"
	        }, React.createElement("div", {
	            className: "matrix-bracket bracket-left",
	            style: {
	                height: bracketHeight
	            }
	        }), React.createElement("div", {
	            className: "matrix-bracket bracket-right",
	            style: {
	                height: bracketHeight,
	                left: bracketOffset
	            }
	        }), _(maxRows).times(function(row) {
	            var rowVals = _this.props.answers[row];
	            return React.createElement("div", {
	                className: "matrix-row",
	                key: row
	            }, _(maxCols).times(function(col) {
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
	                        _this.cursorPosition = [ row, col ];
	                        _this.props.onChange({
	                            cursorPosition: [ row, col ]
	                        }, function() {
	                            // This isn't a user interaction, so
	                            // return false to signal that the
	                            // matrix shouldn't be focused
	                            return false;
	                        });
	                        _this._handleFocus(row, col);
	                    },
	                    onBlur: function onBlur() {
	                        row === _this.cursorPosition[0] && col === _this.cursorPosition[1] && _this.props.onChange({
	                            cursorPosition: [ 0, 0 ]
	                        }, function() {
	                            // This isn't a user interaction,
	                            // so return false to signal that
	                            // the matrix shouldn't be focused
	                            return false;
	                        });
	                        _this._handleBlur(row, col);
	                    },
	                    onKeyDown: function onKeyDown(e) {
	                        _this.handleKeyDown(row, col, e);
	                    },
	                    onChange: function onChange(value, cb) {
	                        _this.onValueChange(row, col, value, cb);
	                    }
	                };
	                var MatrixInput = void 0;
	                if (_this.props.apiOptions.customKeypad) {
	                    var style = {
	                        margin: INPUT_MARGIN,
	                        minWidth: INPUT_WIDTH,
	                        minHeight: INPUT_HEIGHT,
	                        // Ensure that any borders are included in
	                        // the provided width.
	                        boxSizing: "border-box",
	                        backgroundColor: outside ? "#f3f3f3" : "#fff"
	                    };
	                    MatrixInput = React.createElement(SimpleKeypadInput, _extends({}, inputProps, {
	                        style: style,
	                        scrollable: true,
	                        keypadElement: _this.props.keypadElement
	                    }));
	                } else MatrixInput = _this.props.apiOptions.staticRender ? React.createElement(MathOutput, inputProps) : _this.props.numericInput ? React.createElement(NumberInput, inputProps) : React.createElement(TextInput, inputProps);
	                return React.createElement("span", {
	                    key: col,
	                    className: "matrix-input-field"
	                }, MatrixInput);
	            }));
	        })), this.props.suffix && React.createElement("div", {
	            className: "matrix-suffix"
	        }, React.createElement(Renderer, {
	            content: this.props.suffix,
	            highlightLint: this.props.highlightLint
	        })));
	    },
	    getInputPaths: function getInputPaths() {
	        var inputPaths = [];
	        var maxRows = this.props.matrixBoardSize[0];
	        var maxCols = this.props.matrixBoardSize[1];
	        _(maxRows).times(function(row) {
	            _(maxCols).times(function(col) {
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
	        0 === path.length && (path = getDefaultPath());
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
	        "ArrowUp" === e.key && row > 0 ? nextPath = getInputPath(row - 1, col) : "ArrowDown" === e.key && row + 1 < maxRow ? nextPath = getInputPath(row + 1, col) : "ArrowLeft" === e.key && col > 0 ? 0 === cursorStartPosition && 0 === cursorEndPosition && (// Only go to next input if we're at the *start* of the content
	        nextPath = getInputPath(row, col - 1)) : "ArrowRight" === e.key && col + 1 < maxCol ? cursorStartPosition === curValueString.length && (// Only go to next input if we're at the *end* of the content
	        nextPath = getInputPath(row, col + 1)) : "Enter" === e.key ? enterTheMatrix = this.state.enterTheMatrix + 1 : "Escape" === e.key && (enterTheMatrix = 0);
	        if (nextPath) {
	            // Prevent the cursor from jumping again inside the next input
	            e.preventDefault();
	            // Focus the input and move the cursor to the end of it.
	            var input = this.refs[getRefForPath(nextPath)];
	            // Multiply by 2 to ensure the cursor always ends up at the end;
	            // Opera sometimes sees a carriage return as 2 characters.
	            var inputValString = input.getStringValue();
	            var valueLength = 2 * inputValString.length;
	            input.focus();
	            "ArrowRight" === e.key ? input.setSelectionRange(0, 0) : input.setSelectionRange(valueLength, valueLength);
	        }
	        null != enterTheMatrix && this.setState({
	            enterTheMatrix: enterTheMatrix
	        });
	    },
	    onValueChange: function onValueChange(row, column, value, cb) {
	        var answers = _.map(this.props.answers, _.clone);
	        answers[row] || (answers[row] = []);
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
	        _(suppliedSize[0]).times(function(row) {
	            _(suppliedSize[1]).times(function(col) {
	                null != supplied[row][col] && 0 !== supplied[row][col].toString().length || (hasEmptyCell = true);
	                var validator = createValidator(solution[row][col], {
	                    simplify: true
	                });
	                var result = validator(supplied[row][col]);
	                result.message && (message = result.message);
	                result.correct || (incorrect = true);
	            });
	        });
	        if (hasEmptyCell) return {
	            type: "invalid",
	            message: i18n._("Make sure you fill in all cells in the matrix.")
	        };
	        if (incorrectSize) return {
	            type: "points",
	            earned: 0,
	            total: 1,
	            message: null
	        };
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
	    var blankAnswers = _(editorProps.matrixBoardSize[0]).times(function() {
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
	    widgetProps.answers = _.map(editorProps.answers, function(row) {
	        // Replace null values with empty string
	        return _.map(row, function(cell) {
	            return null != cell ? String(cell) : "";
	        });
	    });
	    return widgetProps;
	};

	module.exports = {
	    name: "matrix",
	    displayName: "Matrix",
	    widget: Matrix,
	    transform: propTransform,
	    staticTransform: staticTransform,
	    isLintable: true
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var _ = __webpack_require__(10);

	var Renderer = __webpack_require__(8);

	var Sortable = __webpack_require__(121);

	var ApiOptions = __webpack_require__(18).Options;

	var shuffle = __webpack_require__(17).shuffle;

	var seededRNG = __webpack_require__(17).seededRNG;

	var HACKY_CSS_CLASSNAME = "perseus-widget-matcher";

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
	        trackInteraction: React.PropTypes.func.isRequired,
	        highlightLint: React.PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            left: [],
	            right: [],
	            labels: [ "", "" ],
	            orderMatters: false,
	            padding: true,
	            problemNum: 0,
	            onChange: function onChange() {},
	            highlightLint: false
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
	        left = this.props.orderMatters ? shuffle(this.props.left, rng, /* ensurePermuted */ true) : this.props.left;
	        var right = shuffle(this.props.right, rng, /* ensurePermuted */ true);
	        var showLabels = _.any(this.props.labels);
	        var constraints = {
	            height: _.max([ this.state.leftHeight, this.state.rightHeight ])
	        };
	        var cellMarginPx = this.props.apiOptions.isMobile ? 8 : 5;
	        return React.createElement("table", {
	            className: css(styles.widget) + " " + HACKY_CSS_CLASSNAME
	        }, React.createElement("tbody", null, showLabels && React.createElement("tr", {
	            className: css(styles.row)
	        }, React.createElement("th", {
	            className: css(styles.column, styles.columnLabel)
	        }, React.createElement(Renderer, {
	            content: this.props.labels[0] || "...",
	            highlightLint: this.props.highlightLint
	        })), React.createElement("th", {
	            className: css(styles.column, styles.columnRight, styles.columnLabel)
	        }, React.createElement(Renderer, {
	            content: this.props.labels[1] || "...",
	            highlightLint: this.props.highlightLint
	        }))), React.createElement("tr", {
	            className: css(styles.row)
	        }, React.createElement("td", {
	            className: css(styles.column)
	        }, React.createElement(Sortable, {
	            options: left,
	            layout: "vertical",
	            padding: this.props.padding,
	            disabled: !this.props.orderMatters,
	            constraints: constraints,
	            onMeasure: this.onMeasureLeft,
	            onChange: this.changeAndTrack,
	            margin: cellMarginPx,
	            highlightLint: this.props.highlightLint,
	            ref: "left"
	        })), React.createElement("td", {
	            className: css(styles.column, styles.columnRight)
	        }, React.createElement(Sortable, {
	            options: right,
	            layout: "vertical",
	            padding: this.props.padding,
	            constraints: constraints,
	            onMeasure: this.onMeasureRight,
	            onChange: this.changeAndTrack,
	            margin: cellMarginPx,
	            highlightLint: this.props.highlightLint,
	            ref: "right"
	        })))));
	    },
	    changeAndTrack: function changeAndTrack(e) {
	        this.props.onChange(e);
	        this.props.trackInteraction();
	    },
	    onMeasureLeft: function onMeasureLeft(dimensions) {
	        var height = _.max(dimensions.heights);
	        this.setState({
	            leftHeight: height
	        });
	    },
	    onMeasureRight: function onMeasureRight(dimensions) {
	        var height = _.max(dimensions.heights);
	        this.setState({
	            rightHeight: height
	        });
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
	        return {
	            type: "points",
	            earned: _.isEqual(state.left, rubric.left) && _.isEqual(state.right, rubric.right) ? 1 : 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	var padding = 5;

	var border = "1px solid #444";

	var styles = StyleSheet.create({
	    widget: {
	        paddingTop: padding,
	        maxWidth: "100%",
	        // Need to override minWidth in CSS :(
	        minWidth: "auto"
	    },
	    row: {
	        // Need to override global rules in CSS :(
	        border: 0
	    },
	    column: {
	        // TODO(benkomalo): constraint to half width?
	        padding: 0,
	        border: 0
	    },
	    columnRight: {
	        borderLeft: border
	    },
	    columnLabel: {
	        fontWeight: "inherit",
	        borderBottom: border,
	        padding: "0 " + padding + "px " + padding + "px " + padding + "px",
	        textAlign: "center"
	    }
	});

	module.exports = {
	    name: "matcher",
	    displayName: "Two column matcher",
	    widget: Matcher,
	    isLintable: true
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable comma-dangle, indent, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _2 = __webpack_require__(10);

	var ApiOptions = __webpack_require__(18).Options;

	var GraphUtils = __webpack_require__(120);

	var defaultImage = {
	    url: null,
	    top: 0,
	    left: 0
	};

	var Measurer = React.createClass({
	    displayName: "Measurer",
	    propTypes: {
	        apiOptions: ApiOptions.propTypes,
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
	            box: [ 480, 480 ],
	            image: {},
	            showProtractor: true,
	            protractorX: 7.5,
	            protractorY: .5,
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
	        return React.createElement("div", {
	            className: "perseus-widget perseus-widget-measurer graphie-container above-scratchpad",
	            style: {
	                width: this.props.box[0],
	                height: this.props.box[1]
	            }
	        }, image.url && React.createElement("img", {
	            src: image.url,
	            style: {
	                top: image.top,
	                left: image.left
	            }
	        }), React.createElement("div", {
	            className: "graphie",
	            ref: "graphieDiv"
	        }));
	    },
	    componentDidMount: function componentDidMount() {
	        this.setupGraphie();
	    },
	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        _2.any([ "box", "showProtractor", "showRuler", "rulerLabel", "rulerTicks", "rulerPixels", "rulerLength" ], function(prop) {
	            return prevProps[prop] !== this.props[prop];
	        }, this) && this.setupGraphie();
	    },
	    setupGraphie: function setupGraphie() {
	        var graphieDiv = ReactDOM.findDOMNode(this.refs.graphieDiv);
	        $(graphieDiv).empty();
	        var graphie = this.graphie = GraphUtils.createGraphie(graphieDiv);
	        var scale = [ 40, 40 ];
	        var range = [ [ 0, this.props.box[0] / scale[0] ], [ 0, this.props.box[1] / scale[1] ] ];
	        graphie.init({
	            range: range,
	            scale: scale
	        });
	        graphie.addMouseLayer({
	            allowScratchpad: true,
	            setDrawingAreaAvailable: this.props.apiOptions.setDrawingAreaAvailable
	        });
	        this.protractor && this.protractor.remove();
	        this.props.showProtractor && (this.protractor = graphie.protractor([ this.props.protractorX, this.props.protractorY ]));
	        this.ruler && this.ruler.remove();
	        this.props.showRuler && (this.ruler = graphie.ruler({
	            center: [ (range[0][0] + range[0][1]) / 2, (range[1][0] + range[1][1]) / 2 ],
	            label: this.props.rulerLabel,
	            pixelsPerUnit: this.props.rulerPixels,
	            ticksPerUnit: this.props.rulerTicks,
	            units: this.props.rulerLength
	        }));
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
	        return _2(v0props).chain().omit("imageUrl", "imageTop", "imageLeft").extend({
	            image: {
	                url: v0props.imageUrl,
	                top: v0props.imageTop,
	                left: v0props.imageLeft
	            }
	        }).value();
	    }
	};

	module.exports = {
	    name: "measurer",
	    displayName: "Measurer",
	    widget: Measurer,
	    version: {
	        major: 1,
	        minor: 0
	    },
	    propUpgrades: propUpgrades
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable brace-style, object-curly-spacing */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var draw = __webpack_require__(128);

	var _require = __webpack_require__(129), layout = _require.layout;

	var SmilesParser = __webpack_require__(130);

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
	        return {
	            parsedSmiles: null,
	            error: null
	        };
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
	            if (!(e instanceof ParseError)) throw e;
	            this.setState({
	                error: e.message
	            });
	        }
	    },
	    setCanvasBounds: function setCanvasBounds(canvas, items) {
	        var xmax = Math.max.apply(Math, items.map(function(item) {
	            return item.pos ? item.pos[0] : -1 / 0;
	        }));
	        var ymax = Math.max.apply(Math, items.map(function(item) {
	            return item.pos ? item.pos[1] : -1 / 0;
	        }));
	        var xmin = Math.min.apply(Math, items.map(function(item) {
	            return item.pos ? item.pos[0] : 1 / 0;
	        }));
	        var ymin = Math.min.apply(Math, items.map(function(item) {
	            return item.pos ? item.pos[1] : 1 / 0;
	        }));
	        var width = xmax - xmin + 2 * borderSize;
	        var height = ymax - ymin + 2 * borderSize;
	        canvas.width = width;
	        canvas.height = height;
	        return [ borderSize - xmin, borderSize - ymin ];
	    },
	    canvasRender: function canvasRender() {
	        // Since canvas drawing happens only through an imperative API, we sync
	        // up the component with the canvas here, which happens when the
	        // component mounts or updates.
	        if (!!this.state.error || !this.state.parsedSmiles) return;
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
	        var content = React.createElement("canvas", {
	            className: "molecule-canvas",
	            id: this.props.id + "-molecule",
	            ref: "canvas"
	        }, "A molecular structure drawing.  SMILES notation:", this.props.smiles, ".");
	        this.state.error && (content = React.createElement("div", {
	            className: "error"
	        }, this.state.error));
	        return React.createElement("div", {
	            className: "molecule-canvas"
	        }, content);
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
	        return {
	            rotationAngle: 0
	        };
	    },
	    simpleValidate: function simpleValidate() {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable brace-style, no-var */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	/* globals i18n, $_ */
	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var Changeable = __webpack_require__(88);

	var NumberInput = __webpack_require__(114);

	var MathOutput = __webpack_require__(116);

	var SimpleKeypadInput = __webpack_require__(83);

	var ApiOptions = __webpack_require__(18).Options;

	var keypadElementPropType = __webpack_require__(81).propTypes.keypadElementPropType;

	var Graphie = __webpack_require__(94);

	var MovablePoint = Graphie.MovablePoint;

	var Line = Graphie.Line;

	var knumber = __webpack_require__(165).number;

	var KhanMath = __webpack_require__(86);

	var KhanColors = __webpack_require__(112);

	var bound = function bound(x, gt, lt) {
	    return Math.min(Math.max(x, gt), lt);
	};

	var assert = __webpack_require__(117).assert;

	var EN_DASH = "–";

	var horizontalPadding = 30;

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
	    return 1 === d ? "" + n : "\\dfrac{" + n + "}{" + d + "}";
	}

	function formatMixed(n, d) {
	    if (n < 0) return "-" + formatMixed(-n, d);
	    var w = Math.floor(n / d);
	    return 0 === w ? formatImproper(n, d) : n - w * d === 0 ? "" + w : w + formatImproper(n - w * d, d);
	}

	function formatNonReduced(n, d, base) {
	    return formatImproper(n * Math.floor(base / d), base);
	}

	var _label = function _label(graphie, labelStyle, pos, value, base) {
	    value = value || pos;
	    // TODO(jack): Find out if any exercises have "decimal ticks" set,
	    // and if so, re-save them and remove this check.
	    if ("decimal" === labelStyle || "decimal ticks" === labelStyle) return graphie.label([ pos, -.53 ], Math.round(100 * value) / 100, "center");
	    if ("improper" === labelStyle) {
	        var frac = KhanMath.toFraction(value);
	        return graphie.label([ pos, -.17 ], formatImproper(frac[0], frac[1]), "below");
	    }
	    if ("mixed" === labelStyle) {
	        var _frac = KhanMath.toFraction(value);
	        return graphie.label([ pos, -.17 ], formatMixed(_frac[0], _frac[1]), "below");
	    }
	    if ("non-reduced" === labelStyle) {
	        var _frac2 = KhanMath.toFraction(value);
	        return graphie.label([ pos, -.17 ], formatNonReduced(_frac2[0], _frac2[1], base), "below");
	    }
	};

	var TickMarks = Graphie.createSimpleClass(function(graphie, props) {
	    // Avoid infinite loop
	    if (!_.isFinite(props.tickStep) || props.tickStep <= 0) return [];
	    var results = [];
	    // For convenience, extract some props into separate variables
	    var range = props.range;
	    var labelRange = props.labelRange;
	    var leftLabel = null == labelRange[0] ? range[0] : labelRange[0];
	    var rightLabel = null == labelRange[1] ? range[1] : labelRange[1];
	    // Find base via GCD for non-reduced fractions
	    var base;
	    if ("non-reduced" === props.labelStyle) {
	        var fractions = [ leftLabel, rightLabel ];
	        for (var i = 0; i <= props.numDivisions; i++) {
	            var x = range[0] + i * props.tickStep;
	            fractions.push(x);
	        }
	        var getDenom = function getDenom(x) {
	            return knumber.toFraction(x)[1];
	        };
	        var denoms = _.map(fractions, getDenom);
	        base = _.reduce(denoms, function(x, y) {
	            return KhanMath.getLCM(x, y);
	        });
	    } else base = void 0;
	    // Draw and save the tick marks and tick labels
	    for (var _i = 0; _i <= props.numDivisions; _i++) {
	        var _x = range[0] + _i * props.tickStep;
	        results.push(graphie.line([ _x, -.2 ], [ _x, .2 ]));
	        (props.labelTicks || "decimal ticks" === props.labelStyle) && results.push(_label(graphie, props.labelStyle, _x, _x, base));
	    }
	    // Render the text labels
	    results.push(graphie.style(props.isMobile ? {
	        color: KhanColors.BLUE_D
	    } : {}, function() {
	        return _label(graphie, props.labelStyle, leftLabel, leftLabel, base);
	    }));
	    results.push(graphie.style(props.isMobile ? {
	        color: KhanColors.BLUE_D
	    } : {}, function() {
	        return _label(graphie, props.labelStyle, rightLabel, rightLabel, base);
	    }));
	    // Render the labels' lines
	    graphie.style({
	        stroke: props.isMobile ? KhanColors.BLUE_D : KhanColors.DYNAMIC,
	        strokeWidth: 3.5
	    }, function() {
	        results.push(graphie.line([ leftLabel, -.2 ], [ leftLabel, .2 ]));
	        results.push(graphie.line([ rightLabel, -.2 ], [ rightLabel, .2 ]));
	    });
	    return results;
	});

	var NumberLine = React.createClass({
	    displayName: "NumberLine",
	    propTypes: _extends({}, Changeable.propTypes, {
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
	        rel: React.PropTypes.oneOf([ "lt", "gt", "le", "ge" ]),
	        onFocus: React.PropTypes.func.isRequired,
	        onBlur: React.PropTypes.func.isRequired,
	        onChange: React.PropTypes.func.isRequired,
	        apiOptions: ApiOptions.propTypes,
	        keypadElement: keypadElementPropType,
	        static: React.PropTypes.bool,
	        showTooltips: React.PropTypes.bool,
	        trackInteraction: React.PropTypes.func.isRequired
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            range: [ 0, 10 ],
	            labelStyle: "decimal",
	            labelRange: [ null, null ],
	            divisionRange: [ 1, 12 ],
	            labelTicks: true,
	            isTickCtrl: false,
	            isInequality: false,
	            numLinePosition: 0,
	            snapDivisions: 2,
	            showTooltips: false,
	            rel: "ge",
	            apiOptions: ApiOptions.defaults
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            numDivisionsEmpty: false
	        };
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    isValid: function isValid() {
	        var range = this.props.range;
	        var initialX = this.props.numLinePosition;
	        var divisionRange = this.props.divisionRange;
	        initialX = null == initialX ? range[0] : initialX;
	        return range[0] < range[1] && knumber.sign(initialX - range[0]) >= 0 && knumber.sign(initialX - range[1]) <= 0 && divisionRange[0] < divisionRange[1] && 0 < this.props.numDivisions && 0 < this.props.snapDivisions;
	    },
	    onNumDivisionsChange: function onNumDivisionsChange(numDivisions, cb) {
	        var _this = this;
	        var divRange = this.props.divisionRange.slice();
	        var width = this.props.range[1] - this.props.range[0];
	        // Don't allow a fraction for the number of divisions
	        numDivisions = Math.round(numDivisions);
	        // Don't allow negative numbers for the number of divisions
	        numDivisions = numDivisions < 0 ? -1 * numDivisions : numDivisions;
	        // If the number of divisions isn't blank, update the number line
	        if (numDivisions) {
	            var nextProps = _.extend({}, this.props, {
	                tickStep: width / numDivisions
	            });
	            var newNumLinePosition = this.snapNumLinePosition(nextProps, this.props.numLinePosition);
	            this.setState({
	                numDivisionsEmpty: false
	            }, function() {
	                _this.props.onChange({
	                    divisionRange: divRange,
	                    numDivisions: numDivisions,
	                    numLinePosition: newNumLinePosition
	                }, cb);
	            });
	        } else this.setState({
	            numDivisionsEmpty: true
	        }, cb);
	    },
	    _handleTickCtrlFocus: function _handleTickCtrlFocus() {
	        this.props.onFocus([ "tick-ctrl" ]);
	    },
	    _handleTickCtrlBlur: function _handleTickCtrlBlur() {
	        this.props.onBlur([ "tick-ctrl" ]);
	    },
	    focus: function focus() {
	        if (this.props.isTickCtrl) {
	            this.refs["tick-ctrl"].focus();
	            return true;
	        }
	    },
	    focusInputPath: function focusInputPath(path) {
	        1 === path.length && this.refs[path[0]].focus();
	    },
	    blurInputPath: function blurInputPath(path) {
	        1 === path.length && this.refs[path[0]].blur();
	    },
	    getInputPaths: function getInputPaths() {
	        return this.props.isTickCtrl ? [ [ "tick-ctrl" ] ] : [];
	    },
	    getDOMNodeForPath: function getDOMNodeForPath(inputPath) {
	        if (1 === inputPath.length) return ReactDOM.findDOMNode(this.refs[inputPath[0]]);
	    },
	    getGrammarTypeForPath: function getGrammarTypeForPath(inputPath) {
	        if (1 === inputPath.length && "tick-ctrl" === inputPath[0]) return "number";
	    },
	    setInputValue: function setInputValue(inputPath, value, callback) {
	        1 === inputPath.length && "tick-ctrl" === inputPath[0] && this.onNumDivisionsChange(value, callback);
	    },
	    _renderGraphie: function _renderGraphie() {
	        var _this2 = this;
	        // Position variables
	        var range = this.props.range;
	        var width = range[1] - range[0];
	        var options = _.pick(this.props, [ "range", "isTickCtrl" ]);
	        // TODO(aria): Maybe save this as `this.calculatedProps`?
	        var props = _.extend({}, this.props, {
	            tickStep: width / this.props.numDivisions
	        });
	        return React.createElement(Graphie, {
	            ref: "graphie",
	            key: this.props.labelStyle,
	            box: [ this.props.apiOptions.isMobile ? 288 : 460, 80 ],
	            options: options,
	            onMouseDown: function onMouseDown(coord) {
	                _this2.refs.graphie.movables.numberLinePoint.grab(coord);
	            },
	            setup: this._setupGraphie,
	            setDrawingAreaAvailable: this.props.apiOptions.setDrawingAreaAvailable,
	            isMobile: this.props.apiOptions.isMobile
	        }, React.createElement(TickMarks, _extends({}, _.pick(props, [ "range", "numDivisions", "labelTicks", "labelStyle", "labelRange", "tickStep" ]), {
	            isMobile: this.props.apiOptions.isMobile
	        })), this._renderInequality(props), this._renderNumberLinePoint(props));
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
	        var _this3 = this;
	        var isOpen = _([ "lt", "gt" ]).contains(props.rel);
	        // In static mode the point's fill and stroke is blue to signify that
	        // it can't be interacted with.
	        var fill;
	        fill = isOpen ? KhanColors._BACKGROUND : props.static ? KhanColors.DYNAMIC : KhanColors.INTERACTIVE;
	        var normalStyle = {
	            fill: fill,
	            stroke: props.static ? KhanColors.DYNAMIC : KhanColors.INTERACTIVE,
	            "stroke-width": isOpen ? 3 : 1
	        };
	        var highlightStyle = {
	            fill: isOpen ? KhanColors._BACKGROUND : KhanColors.INTERACTING,
	            "stroke-width": isOpen ? 3 : 1
	        };
	        var mobileDotStyle = props.isInequality ? {
	            stroke: KhanColors.INTERACTIVE,
	            "fill-opacity": isOpen ? 0 : 1
	        } : {};
	        return React.createElement(MovablePoint, {
	            ref: "numberLinePoint",
	            pointSize: 6,
	            coord: [ props.numLinePosition, 0 ],
	            constraints: [ function(coord, prevCoord) {
	                // constrain-y
	                return [ coord[0], prevCoord[1] ];
	            }, function(coord, prevCoord) {
	                return [ _this3.snapNumLinePosition(props, coord[0]), coord[1] ];
	            } ],
	            normalStyle: normalStyle,
	            highlightStyle: highlightStyle,
	            onMove: function onMove(coord) {
	                _this3.change({
	                    numLinePosition: coord[0]
	                });
	                _this3.props.trackInteraction();
	            },
	            isMobile: this.props.apiOptions.isMobile,
	            mobileStyleOverride: mobileDotStyle,
	            showTooltips: this.props.showTooltips,
	            xOnlyTooltip: true
	        });
	    },
	    handleReverse: function handleReverse() {
	        var newRel = reverseRel[this.props.rel];
	        this.props.onChange({
	            rel: newRel
	        });
	    },
	    handleToggleStrict: function handleToggleStrict() {
	        var newRel = toggleStrictRel[this.props.rel];
	        this.props.onChange({
	            rel: newRel
	        });
	    },
	    _getInequalityEndpoint: function _getInequalityEndpoint(props) {
	        var isGreater = _([ "ge", "gt" ]).contains(props.rel);
	        var widthInPixels = 400;
	        var range = props.range;
	        var scale = (range[1] - range[0]) / 400;
	        var buffer = horizontalPadding * scale;
	        var left = range[0] - buffer;
	        var right = range[1] + buffer;
	        return isGreater ? [ right, 0 ] : [ left, 0 ];
	    },
	    _renderInequality: function _renderInequality(props) {
	        if (props.isInequality) {
	            var end = this._getInequalityEndpoint(props);
	            var style = {
	                arrows: "->",
	                stroke: this.props.apiOptions.isMobile ? KhanColors.INTERACTIVE : KhanColors.DYNAMIC,
	                strokeWidth: 3.5
	            };
	            var isGreater = [ "ge", "gt" ].includes(props.rel);
	            return React.createElement(Line, {
	                start: [ (isGreater ? .4 : -.4) + props.numLinePosition, 0 ],
	                end: end,
	                style: style
	            });
	        }
	        return null;
	    },
	    _setupGraphie: function _setupGraphie(graphie, options) {
	        // Ensure a sane configuration to avoid infinite loops
	        if (!this.isValid()) return;
	        // Position variables
	        var widthInPixels = this.props.apiOptions.isMobile ? 288 - 2 * horizontalPadding : 400;
	        var range = options.range;
	        var scale = (range[1] - range[0]) / widthInPixels;
	        var buffer = horizontalPadding * scale;
	        // Initiate the graphie without actually drawing anything
	        var left = range[0] - buffer;
	        var right = range[1] + buffer;
	        var hasFractionalLabels = "improper" === this.props.labelStyle || "mixed" === this.props.labelStyle || "non-reduced" === this.props.labelStyle;
	        var bottom = hasFractionalLabels ? -1.5 : -1;
	        var top = 1;
	        graphie.init({
	            range: [ [ left, right ], [ bottom, 1 ] ],
	            scale: [ 1 / scale, 40 ],
	            isMobile: this.props.apiOptions.isMobile
	        });
	        // Draw the number line
	        var center = (range[0] + range[1]) / 2;
	        graphie.line([ center, 0 ], [ right, 0 ], {
	            arrows: "->"
	        });
	        graphie.line([ center, 0 ], [ left, 0 ], {
	            arrows: "->"
	        });
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
	        var inequalityControls = React.createElement("div", null, React.createElement("input", {
	            type: "button",
	            className: "simple-button",
	            value: i18n._("Switch direction"),
	            onClick: this.handleReverse
	        }), React.createElement("input", {
	            type: "button",
	            className: "simple-button",
	            value: _([ "le", "ge" ]).contains(this.props.rel) ? i18n._("Make circle open") : i18n._("Make circle filled"),
	            onClick: this.handleToggleStrict
	        }));
	        var tickCtrl;
	        if (this.props.isTickCtrl) {
	            var Input;
	            Input = this.props.apiOptions.customKeypad ? SimpleKeypadInput : this.props.apiOptions.staticRender ? MathOutput : NumberInput;
	            tickCtrl = React.createElement("label", null, i18n._("Number of divisions:"), " ", React.createElement(Input, {
	                ref: "tick-ctrl",
	                value: this.state.numDivisionsEmpty ? null : this.props.numDivisions || divisionRange[0],
	                checkValidity: function checkValidity(val) {
	                    return val >= divisionRange[0] && val <= divisionRange[1];
	                },
	                onChange: this.onNumDivisionsChange,
	                onFocus: this._handleTickCtrlFocus,
	                onBlur: this._handleTickCtrlBlur,
	                useArrowKeys: true,
	                keypadElement: this.props.keypadElement
	            }));
	        }
	        return React.createElement("div", {
	            className: "perseus-widget perseus-widget-interactive-number-line"
	        }, tickCtrl, this.isValid() ? this.props.isTickCtrl && invalidNumDivisions ? React.createElement("div", {
	            className: "perseus-error"
	        }, $_({
	            divRangeString: divRangeString
	        }, "Please make sure the number of divisions is in the range %(divRangeString)s.")) : this._renderGraphie() : React.createElement("div", {
	            className: "perseus-error"
	        }, "Invalid number line configuration."), !this.props.static && this.props.isInequality && inequalityControls);
	    }
	});

	_.extend(NumberLine, {
	    validate: function validate(state, rubric) {
	        var range = rubric.range;
	        var divisionRange = state.divisionRange;
	        var start = null != rubric.initialX ? rubric.initialX : range[0];
	        var startRel = rubric.isInequality ? "ge" : "eq";
	        var correctRel = rubric.correctRel || "eq";
	        var correctPos = knumber.equal(state.numLinePosition, rubric.correctX || 0);
	        var outsideAllowedRange = state.numDivisions > divisionRange[1] || state.numDivisions < divisionRange[0];
	        return state.isTickCrtl && outsideAllowedRange ? {
	            type: "invalid",
	            message: "Number of divisions is outside the allowed range."
	        } : correctPos && correctRel === state.rel ? {
	            type: "points",
	            earned: 1,
	            total: 1,
	            message: null
	        } : state.numLinePosition === start && state.rel === startRel ? {
	            type: "invalid",
	            message: null
	        } : {
	            type: "points",
	            earned: 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	var numberLineTransform = function numberLineTransform(editorProps) {
	    var props = _.pick(editorProps, [ "range", "labelRange", "labelStyle", "labelTicks", "divisionRange", "snapDivisions", "isTickCtrl", "isInequality", "showTooltips" ]);
	    var numLinePosition = null != editorProps.initialX ? editorProps.initialX : editorProps.range[0];
	    var width = editorProps.range[1] - editorProps.range[0];
	    var numDivisions;
	    numDivisions = null != editorProps.numDivisions ? editorProps.numDivisions : null != editorProps.tickStep ? width / editorProps.tickStep : void 0;
	    _.extend(props, {
	        numLinePosition: numLinePosition,
	        numDivisions: numDivisions,
	        // Use getDefaultProps value if null
	        snapDivisions: props.snapDivisions || void 0
	    });
	    return props;
	};

	var staticTransform = function staticTransform(editorProps) {
	    var props = _.pick(editorProps, [ "range", "labelRange", "labelStyle", "labelTicks", "divisionRange", "snapDivisions", // isTickCtrl is ignored since users can't interact with it anyway
	    "isInequality" ]);
	    // The correct x is the initial position of the point
	    var numLinePosition = null != editorProps.correctX ? editorProps.correctX : editorProps.range[0];
	    var width = editorProps.range[1] - editorProps.range[0];
	    var numDivisions;
	    numDivisions = null != editorProps.numDivisions ? editorProps.numDivisions : null != editorProps.tickStep ? width / editorProps.tickStep : void 0;
	    _.extend(props, {
	        numLinePosition: numLinePosition,
	        numDivisions: numDivisions,
	        // Render the relation in the correct answer
	        rel: editorProps.isInequality ? editorProps.correctRel : null,
	        // Use getDefaultProps value if null
	        snapDivisions: props.snapDivisions || void 0
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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, max-len, no-console, no-unused-vars, no-var, one-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var Renderer = __webpack_require__(8);

	var Util = __webpack_require__(17);

	var ApiClassNames = __webpack_require__(18).ClassNames;

	var PlaceholderCard = React.createClass({
	    displayName: "PlaceholderCard",
	    propTypes: {
	        width: React.PropTypes.number.isRequired,
	        height: React.PropTypes.number.isRequired
	    },
	    render: function render() {
	        return React.createElement("div", {
	            className: "card-wrap " + ApiClassNames.INTERACTIVE,
	            style: {
	                width: this.props.width
	            }
	        }, React.createElement("div", {
	            className: "card placeholder",
	            style: {
	                height: this.props.height
	            }
	        }));
	    }
	});

	var DragHintCard = React.createClass({
	    displayName: "DragHintCard",
	    render: function render() {
	        return React.createElement("div", {
	            className: "card-wrap " + ApiClassNames.INTERACTIVE
	        }, React.createElement("div", {
	            className: "card drag-hint"
	        }));
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
	        onAnimationEnd: React.PropTypes.func,
	        highlightLint: React.PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            stack: false,
	            animating: false,
	            highlightLint: false
	        };
	    },
	    render: function render() {
	        var style = {};
	        this.props.floating && (style = {
	            position: "absolute",
	            left: this.props.startOffset.left,
	            top: this.props.startOffset.top
	        });
	        this.props.width && (style.width = this.props.width);
	        var className = [ "card" ];
	        this.props.stack && className.push("stack");
	        if (this.props.floating && !this.props.animating) {
	            className.push("dragging");
	            style.left += this.props.mouse.left - this.props.startMouse.left;
	            style.top += this.props.mouse.top - this.props.startMouse.top;
	        }
	        // Pull out the content to get rendered
	        var rendererProps = _.pick(this.props, "content");
	        var onMouseDown = this.props.animating ? $.noop : this.onMouseDown;
	        return React.createElement("div", {
	            className: "card-wrap " + ApiClassNames.INTERACTIVE,
	            style: style,
	            onMouseDown: onMouseDown,
	            onTouchStart: onMouseDown,
	            onTouchMove: this.onMouseMove,
	            onTouchEnd: this.onMouseUp,
	            onTouchCancel: this.onMouseUp
	        }, React.createElement("div", {
	            className: className.join(" ")
	        }, React.createElement(Renderer, _extends({}, rendererProps, {
	            highlightLint: this.props.highlightLint
	        }))));
	    },
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        // Cards in the bank or drag list don't usually change -- they only
	        // reorder themselves -- so we want to skip the update to things a
	        // little faster. We also need to re-render if the content changes,
	        // which happens only in the editor. (We do want to update the floating
	        // card on mouse move to update its position.)
	        // TODO(alpert): Remove ref here after fixing facebook/react#1392.
	        return this.props.floating || nextProps.floating || this.props.content !== nextProps.content || this.props.fakeRef !== nextProps.fakeRef;
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
	        loc && this.props.onMouseMove && this.props.onMouseMove(loc);
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

	var NORMAL = "normal", AUTO = "auto", HORIZONTAL = "horizontal", VERTICAL = "vertical";

	var Orderer = React.createClass({
	    displayName: "Orderer",
	    propTypes: {
	        correctOptions: React.PropTypes.array,
	        current: React.PropTypes.array,
	        height: React.PropTypes.oneOf([ NORMAL, AUTO ]),
	        layout: React.PropTypes.oneOf([ HORIZONTAL, VERTICAL ]),
	        options: React.PropTypes.array,
	        trackInteraction: React.PropTypes.func.isRequired,
	        highlightLint: React.PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            current: [],
	            options: [],
	            correctOptions: [],
	            height: NORMAL,
	            layout: HORIZONTAL,
	            highlightLint: false
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
	        _.isEqual(this.props.current, nextProps.current) || this.setState({
	            current: nextProps.current
	        });
	    },
	    render: function render() {
	        var _this = this;
	        // This is the card we are currently dragging
	        var dragging = this.state.dragging && React.createElement(Card, {
	            ref: "dragging",
	            floating: true,
	            content: this.state.dragContent,
	            startOffset: this.state.offsetPos,
	            startMouse: this.state.grabPos,
	            mouse: this.state.mousePos,
	            width: this.state.dragWidth,
	            onMouseUp: this.onRelease,
	            onMouseMove: this.onMouseMove,
	            key: this.state.dragKey || "draggingCard",
	            highlightLint: this.props.highlightLint
	        });
	        // This is the card that is currently animating
	        var animating = this.state.animating && React.createElement(Card, {
	            floating: true,
	            animating: true,
	            content: this.state.dragContent,
	            startOffset: this.state.offsetPos,
	            width: this.state.dragWidth,
	            animateTo: this.state.animateTo,
	            onAnimationEnd: this.state.onAnimationEnd,
	            key: this.state.dragKey || "draggingCard",
	            highlightLint: this.props.highlightLint
	        });
	        // This is the list of draggable, rearrangable cards
	        var sortableCards = _.map(this.state.current, function(opt, i) {
	            return React.createElement(Card, {
	                ref: "sortable" + i,
	                fakeRef: "sortable" + i,
	                floating: false,
	                content: opt.content,
	                width: opt.width,
	                key: opt.key,
	                highlightLint: this.props.highlightLint,
	                onMouseDown: this.state.animating ? $.noop : this.onClick.bind(null, "current", i)
	            });
	        }, this);
	        if (null != this.state.placeholderIndex) {
	            var placeholder = React.createElement(PlaceholderCard, {
	                ref: "placeholder",
	                width: this.state.dragWidth,
	                height: this.state.dragHeight,
	                key: "placeholder"
	            });
	            sortableCards.splice(this.state.placeholderIndex, 0, placeholder);
	        }
	        var anySortableCards = sortableCards.length > 0;
	        sortableCards.push(dragging, animating);
	        // If there are no cards in the list, then add a "hint" card
	        var sortable = React.createElement("div", {
	            className: "perseus-clearfix draggable-box"
	        }, !anySortableCards && React.createElement(DragHintCard, null), React.createElement("div", {
	            ref: "dragList"
	        }, sortableCards));
	        // This is the bank of stacks of cards
	        var bank = React.createElement("div", {
	            ref: "bank",
	            className: "bank perseus-clearfix"
	        }, _.map(this.props.options, function(opt, i) {
	            return React.createElement(Card, {
	                ref: "bank" + i,
	                floating: false,
	                content: opt.content,
	                stack: true,
	                key: i,
	                highlightLint: _this.props.highlightLint,
	                onMouseDown: _this.state.animating ? $.noop : _this.onClick.bind(null, "bank", i),
	                onMouseMove: _this.onMouseMove,
	                onMouseUp: _this.onRelease
	            });
	        }, this));
	        return React.createElement("div", {
	            className: "draggy-boxy-thing orderer height-" + this.props.height + " layout-" + this.props.layout + " above-scratchpad blank-background perseus-clearfix " + ApiClassNames.INTERACTIVE,
	            ref: "orderer"
	        }, bank, sortable);
	    },
	    onClick: function onClick(type, index, loc, draggable) {
	        var $draggable = $(ReactDOM.findDOMNode(draggable));
	        var list = this.state.current.slice();
	        var opt;
	        var placeholderIndex = null;
	        if ("current" === type) {
	            // If this is coming from the original list, remove the original
	            // card from the list
	            list.splice(index, 1);
	            opt = this.state.current[index];
	            placeholderIndex = index;
	        } else "bank" === type && (opt = this.props.options[index]);
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
	        if (null == draggable) return;
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
	        inCardBank ? // If we're in the card bank, go through the options to find the
	        // one with the same content
	        _.each(this.props.options, function(opt, i) {
	            if (opt.content === this.state.dragContent) {
	                var card = ReactDOM.findDOMNode(this.refs["bank" + i]);
	                finalOffset = $(card).position();
	            }
	        }, this) : null != this.refs.placeholder && (// Otherwise, go to the position that the placeholder is at
	        finalOffset = $(ReactDOM.findDOMNode(this.refs.placeholder)).position());
	        null == finalOffset ? // If we didn't find a card to go to, simply make the changes we
	        // would have made at the end. (should only happen if we are
	        // messing around with card contents, and not on the real site)
	        onAnimationEnd() : this.setState({
	            offsetPos: offset,
	            animateTo: finalOffset,
	            onAnimationEnd: onAnimationEnd,
	            animating: true,
	            dragging: false
	        });
	    },
	    onMouseMove: function onMouseMove(loc) {
	        var draggable = this.refs.dragging;
	        if (null == draggable) return;
	        var index;
	        index = this.isCardInBank(draggable) ? null : this.findCorrectIndex(draggable, this.state.current);
	        this.setState({
	            mousePos: loc,
	            placeholderIndex: index
	        });
	    },
	    findCorrectIndex: function findCorrectIndex(draggable, list) {
	        // Find the correct index for a card given the current cards.
	        var isHorizontal = this.props.layout === HORIZONTAL, $dragList = $(ReactDOM.findDOMNode(this.refs.dragList)), leftEdge = $dragList.offset().left, topEdge = $dragList.offset().top, midWidth = $(ReactDOM.findDOMNode(draggable)).offset().left - leftEdge, midHeight = $(ReactDOM.findDOMNode(draggable)).offset().top - topEdge, index = 0, sumWidth = 0, sumHeight = 0;
	        isHorizontal ? _.each(list, function(opt, i) {
	            var card = ReactDOM.findDOMNode(this.refs["sortable" + i]);
	            var outerWidth = $(card).outerWidth(true);
	            midWidth > sumWidth + outerWidth / 2 && (index += 1);
	            sumWidth += outerWidth;
	        }, this) : _.each(list, function(opt, i) {
	            var card = ReactDOM.findDOMNode(this.refs["sortable" + i]);
	            var outerHeight = $(card).outerHeight(true);
	            midHeight > sumHeight + outerHeight / 2 && (index += 1);
	            sumHeight += outerHeight;
	        }, this);
	        return index;
	    },
	    isCardInBank: function isCardInBank(draggable) {
	        if (null == draggable) return false;
	        var isHorizontal = this.props.layout === HORIZONTAL, $draggable = $(ReactDOM.findDOMNode(draggable)), $bank = $(ReactDOM.findDOMNode(this.refs.bank)), draggableOffset = $draggable.offset(), bankOffset = $bank.offset(), draggableHeight = $draggable.outerHeight(true), bankHeight = $bank.outerHeight(true), bankWidth = $bank.outerWidth(true), dragList = ReactDOM.findDOMNode(this.refs.dragList), dragListWidth = $(dragList).width(), draggableWidth = $draggable.outerWidth(true);
	        return isHorizontal ? draggableOffset.top + draggableHeight / 2 < bankOffset.top + bankHeight : draggableOffset.left + draggableWidth / 2 < bankOffset.left + bankWidth;
	    },
	    getUserInput: function getUserInput() {
	        return {
	            current: _.map(this.props.current, function(v) {
	                return v.content;
	            })
	        };
	    },
	    simpleValidate: function simpleValidate(rubric) {
	        return Orderer.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Orderer, {
	    validate: function validate(state, rubric) {
	        if (0 === state.current.length) return {
	            type: "invalid",
	            message: null
	        };
	        return {
	            type: "points",
	            earned: _.isEqual(state.current, _.pluck(rubric.correctOptions, "content")) ? 1 : 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "orderer",
	    displayName: "Orderer",
	    widget: Orderer,
	    isLintable: true
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
	}

	function _inherits(subClass, superClass) {
	    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	        constructor: {
	            value: subClass,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        }
	    });
	    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
	}

	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var $ = __webpack_require__(15);

	var HighlightableContent = __webpack_require__(131);

	var Renderer = __webpack_require__(8);

	var PassageMarkdown = __webpack_require__(133);

	var babelPluginFlowReactPropTypes_proptype_ChangeableProps = __webpack_require__(88).babelPluginFlowReactPropTypes_proptype_ChangeableProps || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_SerializedHighlightSet = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_SerializedHighlightSet || __webpack_require__(11).PropTypes.any;

	// A fake paragraph to measure the line height of the passage. In CSS we always
	// set the line height to 22 pixels, but when using the browser zoom feature,
	// the line height often ends up being a fractional number of pixels close to
	// 22 pixels.
	var LineHeightMeasurer = function(_React$Component) {
	    _inherits(LineHeightMeasurer, _React$Component);
	    function LineHeightMeasurer() {
	        _classCallCheck(this, LineHeightMeasurer);
	        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }
	    LineHeightMeasurer.prototype.measureLineHeight = function measureLineHeight() {
	        "number" !== typeof this._cachedLineHeight && this.forceMeasureLineHeight();
	        return this._cachedLineHeight;
	    };
	    LineHeightMeasurer.prototype.forceMeasureLineHeight = function forceMeasureLineHeight() {
	        // Add some text which magically fills an entire line.
	        this.$body.text(" ");
	        // Now, the line height is the difference between the top of the
	        // second line and the top of the first line.
	        this._cachedLineHeight = this.$end.offset().top - this.$body.offset().top;
	        // Clear out the first line so it doesn't overlap the passage.
	        this.$body.text("");
	    };
	    LineHeightMeasurer.prototype.render = function render() {
	        var _this2 = this;
	        return React.createElement("div", {
	            className: css(styles.measurer)
	        }, React.createElement("div", null, React.createElement("div", {
	            ref: function ref(e) {
	                return _this2.$body = $(e);
	            },
	            className: "paragraph"
	        }), React.createElement("div", {
	            ref: function ref(e) {
	                return _this2.$end = $(e);
	            }
	        })));
	    };
	    return LineHeightMeasurer;
	}(React.Component);

	var styles = StyleSheet.create({
	    measurer: {
	        position: "absolute",
	        width: "100%",
	        top: 0,
	        left: 0
	    }
	});

	// State kept track of by the PassageMarkdown parser.
	// Information about a passage reference, used in inter-widgets.
	var Passage = function(_React$Component2) {
	    _inherits(Passage, _React$Component2);
	    function Passage() {
	        var _temp, _this3, _ret;
	        _classCallCheck(this, Passage);
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [ this ].concat(args))), 
	        _this3), _this3.state = {
	            nLines: null,
	            startLineNumbersAfter: 0,
	            stylesAreApplied: false
	        }, _this3._handleSerializedHighlightsUpdate = function(serializedHighlights) {
	            _this3.props.onChange({
	                highlights: serializedHighlights
	            });
	        }, _temp), _possibleConstructorReturn(_this3, _ret);
	    }
	    Passage.prototype.componentDidMount = function componentDidMount() {
	        var _this4 = this;
	        this._updateState();
	        this._onResize = _.throttle(function() {
	            // Remeasure the line height on resize, because the only line
	            // height changes we expect are subpixel changes when the user
	            // zooms in/out, and the only way to listen for zoom events is to
	            // listen for resize events.
	            _this4._lineHeightMeasurer.forceMeasureLineHeight();
	            _this4._updateState();
	        }, 500);
	        window.addEventListener("resize", this._onResize);
	        // Wait for Aphrodite styles (which are guaranteed to apply after one
	        // tick), then set state.
	        //
	        // This flag is used to set the `enabled` prop of the
	        // `HighlightableContent` component. That way, we only show highlights
	        // once styles are ready, and they're measured with the correct
	        // position.
	        //
	        // HACK(mdr): It's not really the Passage's Aphrodite styles that are
	        //     causing bad measures, but more so the Khan Academy Test Prep
	        //     app's Aphrodite styles. We would ideally instead offer the
	        //     embedding application an API to signal that the app's layout has
	        //     changed in a way that affects the Renderer... but, for now, just
	        //     hardcode this hack into here.
	        window.setTimeout(function() {
	            _this4.setState({
	                stylesAreApplied: true
	            });
	        }, 0);
	    };
	    Passage.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	        return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
	    };
	    Passage.prototype.componentDidUpdate = function componentDidUpdate() {
	        this._updateState();
	    };
	    Passage.prototype.componentWillUnmount = function componentWillUnmount() {
	        window.removeEventListener("resize", this._onResize);
	    };
	    /**
	     * Line numbering
	     *
	     * These functions support passage line numbering, which is non-trivial
	     * because we manually measure lines to support resizing as well as
	     * continuing line numbers from previous passages.
	     */
	    Passage.prototype._updateState = function _updateState() {
	        this.setState({
	            nLines: this._measureLines(),
	            startLineNumbersAfter: this._getInitialLineNumber()
	        });
	    };
	    Passage.prototype._measureLines = function _measureLines() {
	        var $renderer = $(ReactDOM.findDOMNode(this.refs.content));
	        var contentsHeight = $renderer.height();
	        var lineHeight = this._getLineHeight();
	        return Math.round(contentsHeight / lineHeight);
	    };
	    Passage.prototype._getInitialLineNumber = function _getInitialLineNumber() {
	        var _this5 = this;
	        var isPassageBeforeThisPassage = true;
	        return this.props.findWidgets(function(id, widgetInfo) {
	            if ("passage" !== widgetInfo.type) return false;
	            id === _this5.props.widgetId && (isPassageBeforeThisPassage = false);
	            return isPassageBeforeThisPassage;
	        }).map(function(passageWidget) {
	            return passageWidget.getLineCount();
	        }).reduce(function(a, b) {
	            return a + b;
	        }, 0);
	    };
	    Passage.prototype._getLineHeight = function _getLineHeight() {
	        return this._lineHeightMeasurer.measureLineHeight();
	    };
	    Passage.prototype.getLineCount = function getLineCount() {
	        return null != this.state.nLines ? this.state.nLines : this._measureLines();
	    };
	    /**
	     * Passage refs
	     *
	     * These are functions to support the passage refs inter-widgets feature
	     * where other widgets can fetch the line numbers of a reference inside of
	     * a passage.
	     */
	    Passage.prototype._getStartRefLineNumber = function _getStartRefLineNumber(referenceNumber) {
	        var refRef = PassageMarkdown.START_REF_PREFIX + referenceNumber;
	        var ref = this.refs[refRef];
	        if (!ref) return null;
	        var $ref = $(ReactDOM.findDOMNode(ref));
	        // We really care about the first text after the ref, not the
	        // ref element itself:
	        var $refText = $ref.next();
	        0 === $refText.length && (// But if there are no elements after the ref, just
	        // use the ref itself.
	        $refText = $ref);
	        var vPos = $refText.offset().top;
	        return this.state.startLineNumbersAfter + 1 + this._convertPosToLineNumber(vPos);
	    };
	    Passage.prototype._getEndRefLineNumber = function _getEndRefLineNumber(referenceNumber) {
	        var refRef = PassageMarkdown.END_REF_PREFIX + referenceNumber;
	        var ref = this.refs[refRef];
	        if (!ref) return null;
	        var $ref = $(ReactDOM.findDOMNode(ref));
	        // We really care about the last text before the ref, not the
	        // ref element itself:
	        var $refText = $ref.prev();
	        0 === $refText.length && (// But if there are no elements before the ref, just
	        // use the ref itself.
	        $refText = $ref);
	        var height = $refText.height();
	        var vPos = $refText.offset().top;
	        var line = this._convertPosToLineNumber(vPos + height);
	        0 === height && (// If the element before the end ref span was the start
	        // ref span, it might have 0 height. This is obviously not
	        // the intended use case, but we should handle it gracefully.
	        // If this is the case, then the "bottom" of our element is
	        // actually the top of the line we're on, so we need to add
	        // one to the line number.
	        line += 1);
	        return this.state.startLineNumbersAfter + line;
	    };
	    Passage.prototype._convertPosToLineNumber = function _convertPosToLineNumber(absoluteVPos) {
	        var $content = $(ReactDOM.findDOMNode(this.refs.content));
	        var relativeVPos = absoluteVPos - $content.offset().top;
	        var lineHeight = this._getLineHeight();
	        return Math.round(relativeVPos / lineHeight);
	    };
	    Passage.prototype._getRefContent = function _getRefContent(referenceNumber) {
	        var refRef = PassageMarkdown.START_REF_PREFIX + referenceNumber;
	        var ref = this.refs[refRef];
	        if (!ref) return null;
	        return ref.getRefContent();
	    };
	    Passage.prototype.getReference = function getReference(referenceNumber) {
	        var refStartLine = this._getStartRefLineNumber(referenceNumber);
	        var refEndLine = this._getEndRefLineNumber(referenceNumber);
	        if (null == refStartLine || null == refEndLine) return null;
	        return {
	            startLine: refStartLine,
	            endLine: refEndLine,
	            content: this._getRefContent(referenceNumber)
	        };
	    };
	    /**
	     * Misc functions
	     *
	     * These are misc widget functions used for the widget API
	     */
	    Passage.prototype.getUserInput = function getUserInput() {
	        return null;
	    };
	    Passage.prototype.simpleValidate = function simpleValidate(rubric) {
	        return Passage.validate(this.getUserInput(), rubric);
	    };
	    /* eslint-disable react/sort-comp */
	    Passage.validate = function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
	    };
	    /* eslint-enable react/sort-comp */
	    /**
	     * Rendering
	     *
	     * Functions to render the passage widget.
	     */
	    Passage.prototype._renderInstructions = function _renderInstructions(parseState) {
	        var firstQuestionNumber = parseState.firstQuestionRef;
	        var firstSentenceRef = parseState.firstSentenceRef;
	        var instructions = "";
	        firstQuestionNumber && (instructions += i18n._("The symbol %(questionSymbol)s indicates that question %(questionNumber)s references this portion of the passage.", {
	            questionSymbol: "[[" + firstQuestionNumber + "]]",
	            questionNumber: firstQuestionNumber
	        }));
	        firstSentenceRef && (instructions += i18n._(" The symbol %(sentenceSymbol)s indicates that the following sentence is referenced in a question.", {
	            sentenceSymbol: "[" + firstSentenceRef + "]"
	        }));
	        var parsedInstructions = PassageMarkdown.parse(instructions);
	        return React.createElement("div", {
	            className: "perseus-widget-passage-instructions"
	        }, PassageMarkdown.output(parsedInstructions));
	    };
	    Passage.prototype._renderContent = function _renderContent(parsed) {
	        var _this6 = this;
	        // Wait until Aphrodite styles are applied before enabling highlights,
	        // so that we measure the correct positions.
	        var enabled = this.state.stylesAreApplied;
	        // Highlights are read-only in review mode.
	        var editable = !this.props.reviewModeRubric;
	        return React.createElement(HighlightableContent, {
	            editable: editable,
	            enabled: enabled,
	            onSerializedHighlightsUpdate: this._handleSerializedHighlightsUpdate,
	            serializedHighlights: this.props.highlights
	        }, React.createElement("div", {
	            ref: "content"
	        }, React.createElement(LineHeightMeasurer, {
	            ref: function ref(e) {
	                return _this6._lineHeightMeasurer = e;
	            }
	        }), PassageMarkdown.output(parsed)));
	    };
	    Passage.prototype._hasFootnotes = function _hasFootnotes() {
	        return !/^\s*$/.test(this.props.footnotes);
	    };
	    Passage.prototype._renderFootnotes = function _renderFootnotes() {
	        var rawContent = this.props.footnotes;
	        var parsed = PassageMarkdown.parse(rawContent);
	        return PassageMarkdown.output(parsed);
	    };
	    Passage.prototype.render = function render() {
	        var _this7 = this;
	        var lineNumbers = void 0;
	        var nLines = this.state.nLines;
	        this.props.showLineNumbers && nLines && (// lineN is the line number in the current passage;
	        // the displayed line number is
	        // lineN + this.state.startLineNumbersAfter, where
	        // startLineNumbersAfter is the sum of all line numbers
	        // in earlier passages.
	        lineNumbers = _.range(1, nLines + 1).map(function(lineN) {
	            return 4 === lineN && nLines > 4 ? React.createElement("span", {
	                key: "line-marker",
	                className: "line-marker"
	            }, "Line") : React.createElement("span", {
	                key: lineN
	            }, lineN + _this7.state.startLineNumbersAfter);
	        }));
	        var parseState = {
	            firstSentenceRef: null,
	            firstQuestionRef: null
	        };
	        var parsedContent = PassageMarkdown.parse(this.props.passageText, parseState);
	        // Check if the title has any non-empty text in it.
	        var hasTitle = /\S/.test(this.props.passageTitle);
	        return React.createElement("div", null, React.createElement("div", {
	            className: "perseus-widget-passage-container"
	        }, this._renderInstructions(parseState), React.createElement("div", {
	            className: "perseus-widget-passage"
	        }, hasTitle && React.createElement("h3", {
	            className: "passage-title"
	        }, React.createElement(Renderer, {
	            content: this.props.passageTitle,
	            highlightLint: this.props.highlightLint
	        })), lineNumbers && React.createElement("div", {
	            className: "line-numbers",
	            "aria-hidden": true
	        }, lineNumbers), !hasTitle && React.createElement("h3", {
	            className: "perseus-sr-only"
	        }, i18n._("Beginning of reading passage.")), React.createElement("div", {
	            className: "passage-text"
	        }, this._renderContent(parsedContent)), this._hasFootnotes() && [ React.createElement("h4", {
	            key: "footnote-start",
	            className: "perseus-sr-only"
	        }, i18n._("Beginning of reading passage footnotes.")), React.createElement("div", {
	            key: "footnotes",
	            className: "footnotes"
	        }, this._renderFootnotes()) ], React.createElement("div", {
	            className: "perseus-sr-only"
	        }, i18n._("End of reading passage.")))));
	    };
	    return Passage;
	}(React.Component);

	Passage.defaultProps = {
	    passageTitle: "",
	    passageText: "",
	    footnotes: "",
	    showLineNumbers: true,
	    highlights: {},
	    highlightLint: false
	};

	module.exports = {
	    name: "passage",
	    displayName: "Passage",
	    widget: Passage,
	    transform: function transform(editorProps) {
	        return _.pick(editorProps, "passageTitle", "passageText", "footnotes", "showLineNumbers");
	    },
	    isLintable: true
	};

/***/ },
/* 66 */,
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Changeable = __webpack_require__(88);

	var WidgetJsonifyDeprecated = __webpack_require__(108);

	var Renderer = __webpack_require__(8);

	var PassageRefTarget = React.createClass({
	    displayName: "PassageRefTarget",
	    propTypes: _extends({}, Changeable.propTypes, {
	        content: React.PropTypes.string,
	        highlightLint: React.PropTypes.bool
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            content: "",
	            highlightLint: false
	        };
	    },
	    getUserInput: function getUserInput() {
	        return WidgetJsonifyDeprecated.getUserInput.call(this);
	    },
	    render: function render() {
	        return React.createElement(Renderer, {
	            content: this.props.content,
	            inline: true,
	            apiOptions: this.props.apiOptions,
	            highlightLint: this.props.highlightLint
	        });
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
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
	    version: {
	        major: 0,
	        minor: 0
	    },
	    isLintable: true
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable comma-dangle, indent, no-redeclare, no-unused-vars, no-var, object-curly-spacing, one-var, react/prop-types, react/sort-comp, space-before-function-paren */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var ApiClassNames = __webpack_require__(18).ClassNames;

	var deepEq = __webpack_require__(17).deepEq;

	var KhanMath = __webpack_require__(86);

	var KhanColors = __webpack_require__(112);

	var GraphUtils = __webpack_require__(120);

	var Interactive2 = __webpack_require__(109);

	var WrappedLine = __webpack_require__(111);

	var BAR = "bar", LINE = "line", PIC = "pic", HISTOGRAM = "histogram", DOTPLOT = "dotplot";

	var widgetPropTypes = {
	    type: React.PropTypes.oneOf([ BAR, LINE, PIC, HISTOGRAM, DOTPLOT ]),
	    labels: React.PropTypes.arrayOf(React.PropTypes.string),
	    categories: React.PropTypes.arrayOf(React.PropTypes.oneOfType([ React.PropTypes.number, React.PropTypes.string ])),
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
	            labels: [ "", "" ],
	            categories: [ "" ],
	            scaleY: 1,
	            maxY: 10,
	            snapsPerLine: 2,
	            picSize: 40,
	            picBoxHeight: 48,
	            picUrl: "",
	            plotDimensions: [ 380, 300 ],
	            labelInterval: 1
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            values: this.props.starting || [ 1 ]
	        };
	    },
	    DOT_PLOT_POINT_SIZE: function DOT_PLOT_POINT_SIZE() {
	        return this.props.apiOptions.isMobile ? 6 : 4;
	    },
	    DOT_PLOT_POINT_PADDING: function DOT_PLOT_POINT_PADDING() {
	        return 8;
	    },
	    DOT_TICK_POINT_SIZE: function DOT_TICK_POINT_SIZE() {
	        return 2;
	    },
	    render: function render() {
	        // TODO(kevinb) actually compute the size of the graphie correctly and
	        // make it that size so we don't have to add extra padding.  The value
	        // was determined by eye-balling the layout.  :(
	        var paddingForBottomLabel = 75;
	        var style = {
	            marginBottom: this.props.labels[0] ? 75 : 0
	        };
	        return React.createElement("div", {
	            className: "perseus-widget-plotter graphie " + ApiClassNames.INTERACTIVE,
	            ref: "graphieDiv",
	            style: style
	        });
	    },
	    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	        this.shouldSetupGraphie && this.setupGraphie(prevState);
	    },
	    componentDidMount: function componentDidMount() {
	        this.setupGraphie(this.state);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var props = [ "type", "labels", "categories", "scaleY", "maxY", "snapsPerLine", "picUrl", "labelInterval", "static" ];
	        this.shouldSetupGraphie = _.any(props, function(prop) {
	            return !_.isEqual(this.props[prop], nextProps[prop]);
	        }, this);
	        if (!_.isEqual(this.props.starting, nextProps.starting) && !_.isEqual(this.state.values, nextProps.starting)) {
	            this.shouldSetupGraphie = true;
	            this.setState({
	                values: nextProps.starting
	            });
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
	        self.graphie.dotTicks = [];
	        var isBar = self.props.type === BAR, isLine = self.props.type === LINE, isPic = self.props.type === PIC, isHistogram = self.props.type === HISTOGRAM, isDotplot = self.props.type === DOTPLOT;
	        var isTiledPlot = isPic || isDotplot;
	        var config = {};
	        var c = config;
	        // c for short
	        var isMobile = this.props.apiOptions.isMobile;
	        c.graph = {
	            lines: [],
	            bars: [],
	            points: [],
	            dividers: []
	        };
	        c.scaleY = self.props.scaleY;
	        c.dimX = self.props.categories.length;
	        var plotDimensions = isMobile ? [ 288, 336 ] : self.props.plotDimensions;
	        if (isLine) // Subtracting 0.2 makes line have equal padding on each side
	        c.dimX += isMobile ? -.2 : 1; else if (isHistogram) {
	            c.barPad = 0;
	            c.barWidth = 1;
	        } else if (isBar) {
	            c.barPad = isMobile ? .08 : .15;
	            c.barWidth = 1 - 2 * c.barPad;
	            c.dimX += (isMobile ? -2 : 2) * c.barPad;
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
	        isDotplot && (c.picBoxHeight = 2 * this.DOT_PLOT_POINT_SIZE() + this.DOT_PLOT_POINT_PADDING());
	        c.dimY = Math.ceil(self.props.maxY / c.scaleY) * c.scaleY;
	        var padX = 25;
	        var padY = 25;
	        (isBar || isLine) && isMobile && (padX = 0 !== self.props.labels[1].length ? 17 : 11);
	        // Since dotplot doesn't have an axis along the left it looks weird
	        // with the same padding as the others
	        isDotplot && (padX /= 2);
	        isMobile && isTiledPlot && 0 === self.props.labels[1].length && (padX = 0);
	        c.scale = isMobile ? _.map([ [ c.dimX, padX ], [ c.dimY, padY ] ], // We multiply pad by 4 because we add 3*pad padding on the left
	        // and 1*pad on the right
	        function(_ref, i) {
	            var dim = _ref[0], pad = _ref[1];
	            return (plotDimensions[i] - 4 * pad) / dim;
	        }) : _.map([ c.dimX, c.dimY ], function(dim, i) {
	            return plotDimensions[i] / dim;
	        });
	        padX /= c.scale[0];
	        padY /= c.scale[1];
	        isTiledPlot && (c.scale[1] = c.picBoxHeight / c.scaleY);
	        graphie.init({
	            range: [ [ -3 * padX, c.dimX + padX ], [ -3 * padY, c.dimY + padY ] ],
	            scale: c.scale,
	            isMobile: this.props.apiOptions.isMobile
	        });
	        graphie.addMouseLayer({
	            allowScratchpad: true,
	            setDrawingAreaAvailable: this.props.apiOptions.setDrawingAreaAvailable
	        });
	        if (!isTiledPlot) {
	            // If we have isMobile, we skip the 0 label.
	            var initialY = isMobile ? c.scaleY : 0;
	            for (var y = initialY; y <= c.dimY; y += c.scaleY) {
	                graphie.label([ 0, y ], KhanMath.roundToApprox(y, 2), "left", /* isTeX */
	                true);
	                graphie.style({
	                    stroke: isMobile ? "#e9ebec" : "#000",
	                    strokeWidth: 1,
	                    opacity: isMobile ? 1 : .3
	                }, function() {
	                    graphie.line([ 0, y ], [ c.dimX, y ]);
	                });
	            }
	        }
	        (isBar || isLine) && isMobile && (self.graphie.dragPrompt = graphie.label([ c.dimX / 2, c.dimY / 2 ], "Drag handles to make graph", "center", false).css("font-weight", "bold").css("color", KhanColors.KA_GREEN).css("display", "none"));
	        self.setupCategories(config);
	        isTiledPlot && isMobile && (self.graphie.dotPrompt = graphie.label([ c.dimX / 2, c.dimY / 2 ], "Tap to add points", "center", false).css("font-weight", "bold").css("color", KhanColors.KA_GREEN).css("display", "none"));
	        isTiledPlot && self.drawPicHeights(self.state.values, prevState.values);
	        graphie.style({
	            stroke: "#000",
	            strokeWidth: 2,
	            opacity: 1
	        }, function() {
	            if (isTiledPlot) if (isDotplot) // Dotplot is a subtype of tiled plot, here we only draw
	            // the x-axis
	            graphie.style({
	                stroke: isMobile ? KhanColors.GRAY_G : "#000",
	                strokeWidth: isMobile ? 1 : 2
	            }, function() {
	                return graphie.line([ isMobile ? 0 : .5, 0 ], [ c.dimX - (isMobile ? 0 : .5), 0 ]);
	            }); else {
	                graphie.line([ 0, 0 ], [ c.dimX, 0 ]);
	                // Draw the left axis for non-dotplots
	                0 === self.props.labels[1].length && isMobile || graphie.style({
	                    stroke: isMobile ? KhanColors.GRAY_G : "#000",
	                    strokeWidth: isMobile ? 1 : 2
	                }, function() {
	                    return graphie.line([ 0, 0 ], [ 0, c.dimY ]);
	                });
	            } else {
	                // Draw normal axes
	                graphie.style({
	                    stroke: isMobile ? KhanColors.GRAY_G : "#000",
	                    strokeWidth: isMobile ? 1 : 2
	                }, function() {
	                    return graphie.line([ isMobile ? 3 * -padX : 0, 0 ], [ c.dimX + (isMobile ? padX : 0), 0 ]);
	                });
	                (isBar || isLine) && isMobile || graphie.style({
	                    stroke: isMobile ? KhanColors.GRAY_G : "#000",
	                    strokeWidth: isMobile ? 1 : 2
	                }, function() {
	                    return graphie.line([ 0, 0 ], [ 0, c.dimY ]);
	                });
	            }
	        });
	        graphie.label([ c.dimX / 2, isMobile ? 3 * -padY : -35 / c.scale[1] ], self.props.labels[0], isMobile ? "above" : "below", false).css("font-weight", "bold").css("color", isMobile && KhanColors.GRAY_F);
	        graphie.label([ (isMobile ? -35 : -60) / c.scale[0], c.dimY / 2 ], self.props.labels[1], "center", false).css("font-weight", "bold").css("color", isMobile && KhanColors.GRAY_F).addClass("rotate");
	        if (this.props.apiOptions.isMobile) {
	            this.horizHairline = new WrappedLine(this.graphie, [ 0, 0 ], [ 0, 0 ], {
	                normalStyle: {
	                    strokeWidth: 1
	                }
	            });
	            this.horizHairline.attr({
	                stroke: KhanColors.INTERACTIVE
	            });
	            this.horizHairline.hide();
	            this.hairlineRange = [ [ 0, c.dimX ], [ 0, c.dimY ] ];
	        }
	    },
	    showHairlines: function showHairlines(point) {
	        if (this.props.apiOptions.isMobile && "none" !== this.props.markings) {
	            // Hairlines are already initialized when the graph is loaded, so
	            // here we just move them to the updated location and make them
	            // visible.
	            this.horizHairline.moveTo([ this.hairlineRange[0][0], point[1] ], [ this.hairlineRange[0][1], point[1] ]);
	            this.horizHairline.show();
	        }
	    },
	    hideHairlines: function hideHairlines() {
	        this.props.apiOptions.isMobile && this.horizHairline.hide();
	    },
	    labelCategory: function labelCategory(x, category) {
	        var isMobile = this.props.apiOptions.isMobile;
	        var graphie = this.graphie;
	        category += "";
	        var isTeX = false;
	        var mathyCategory = category.match(/^\$(.*)\$$/);
	        if (mathyCategory) {
	            category = mathyCategory[1];
	            isTeX = true;
	        }
	        var hasXLabel = 0 !== this.props.labels[0].length;
	        graphie.style({
	            color: isMobile ? KhanColors.GRAY_G : "inherit",
	            transform: isMobile && !mathyCategory ? "translateX(-50%) translateX(5px) translateY(-50%) rotate(-45deg)" : "none",
	            transformOrigin: "100%"
	        }, function() {
	            return graphie.label([ x, isMobile ? -.5 : 0 ], category, "below", isTeX);
	        });
	    },
	    setupCategories: function setupCategories(config) {
	        var self = this;
	        var c = config;
	        var graphie = self.graphie;
	        var isMobile = this.props.apiOptions.isMobile;
	        if (self.props.type === HISTOGRAM) {
	            // Histograms with n labels/categories have n - 1 buckets
	            _.times(self.props.categories.length - 1, function(i) {
	                self.setupBar({
	                    index: i,
	                    startHeight: self.state.values[i],
	                    config: config,
	                    isHistogram: true
	                });
	            });
	            // Label categories
	            _.each(self.props.categories, function(category, i) {
	                var x = .5 + i * c.barWidth;
	                self.labelCategory(x, category);
	                var tickHeight = 6 / c.scale[1];
	                graphie.style({
	                    stroke: "#000",
	                    strokeWidth: isMobile ? 1 : 2,
	                    opacity: 1
	                }, function() {
	                    graphie.line([ x, -tickHeight ], [ x, 0 ]);
	                });
	            });
	        } else _.each(self.props.categories, function(category, i) {
	            var startHeight = self.state.values[i];
	            var x;
	            self.props.type === BAR ? x = self.setupBar({
	                index: i,
	                startHeight: startHeight,
	                config: config,
	                isHistogram: false
	            }) : self.props.type === LINE ? x = self.setupLine(i, startHeight, config) : self.props.type === PIC ? x = self.setupPic(i, config) : self.props.type === DOTPLOT && (x = self.setupDotplot(i, config));
	            var tickStart = 0;
	            var tickEnd = -6 / c.scale[1];
	            self.props.type !== DOTPLOT || isMobile || (tickStart = -tickEnd);
	            if (self.props.type === DOTPLOT) {
	                // Dotplot lets you specify to only show labels every 'n'
	                // ticks. It also looks nicer if it makes the labelled
	                // ticks a bit bigger.
	                if (i % self.props.labelInterval === 0 || i === self.props.categories.length - 1) {
	                    self.labelCategory(x, category);
	                    tickStart *= 1.5;
	                    tickEnd *= 1.5;
	                }
	            } else self.labelCategory(x, category);
	            graphie.style({
	                stroke: isMobile ? KhanColors.GRAY_G : "#000",
	                strokeWidth: isMobile ? 1 : 2,
	                opacity: 1
	            }, function() {
	                graphie.line([ x, tickStart ], [ x, tickEnd ]);
	            });
	        });
	    },
	    _clampValue: function _clampValue(v, min, max) {
	        return Math.max(Math.min(v, max), min);
	    },
	    _maybeUpdateDragPrompt: function _maybeUpdateDragPrompt(values) {
	        // The drag prompt is only added on certain types of plots.
	        if (null != this.graphie.dragPrompt) {
	            var shouldDisplay = values.every(function(v) {
	                return 0 === v;
	            });
	            this.graphie.dragPrompt[0].style.display = shouldDisplay ? "inline" : "none";
	        }
	    },
	    setupBar: function setupBar(args) {
	        var _this = this;
	        var isMobile = this.props.apiOptions.isMobile;
	        var i = args.index;
	        var startHeight = args.startHeight;
	        var config = args.config;
	        var isHistogram = args.isHistogram;
	        var self = this;
	        var graphie = self.graphie;
	        var barHalfWidth = config.barWidth / 2;
	        var x;
	        x = isHistogram ? .5 + i * config.barWidth + barHalfWidth : (isMobile ? barHalfWidth : .5 + config.barPad) + i;
	        /**
	         * Updates the bar with given index to the given height
	         * @param i the index of the bar to update
	         * @param height the new height of the bar
	         */
	        var scaleBar = function scaleBar(i, height) {
	            var center = graphie.scalePoint(0);
	            // Scale filled bucket (bar)
	            config.graph.bars[i].scale(1, Math.max(isMobile ? .2 : .01, height / config.scaleY), center[0], center[1]);
	            if (isHistogram) {
	                // Scale dividers between buckets
	                var leftDivider = config.graph.dividers[i - 1], rightDivider = config.graph.dividers[i];
	                if (leftDivider) {
	                    var divHeight = Math.min(self.state.values[i - 1], height);
	                    leftDivider.scale(1, Math.max(.01, divHeight / config.scaleY), center[0], center[1]);
	                }
	                if (rightDivider) {
	                    var divHeight = Math.min(self.state.values[i + 1], height);
	                    rightDivider.scale(1, Math.max(.01, divHeight / config.scaleY), center[0], center[1]);
	                }
	            }
	        };
	        graphie.style({
	            stroke: "none",
	            fill: isMobile ? KhanColors.BLUE_C : KhanColors.LIGHT_BLUE,
	            opacity: 1
	        }, function() {
	            config.graph.bars[i] = graphie.path([ [ x - barHalfWidth, 0 ], [ x - barHalfWidth, config.scaleY ], [ x + barHalfWidth, config.scaleY ], [ x + barHalfWidth, 0 ], [ x - barHalfWidth, 0 ] ]);
	        });
	        isHistogram && i > 0 && // Don't draw a divider to the left of the first bucket
	        graphie.style({
	            stroke: "#000",
	            strokeWidth: 1,
	            opacity: .3
	        }, function() {
	            config.graph.dividers.push(graphie.path([ [ x - barHalfWidth, 0 ], [ x - barHalfWidth, config.scaleY ] ]));
	        });
	        if (isMobile) {
	            var snap = config.scaleY / self.props.snapsPerLine;
	            config.graph.lines[i] = Interactive2.addMaybeMobileMovablePoint(this, {
	                coord: [ x, startHeight ],
	                constraints: [ function(coord, prev, options) {
	                    return [ x, _this._clampValue(Math.round(coord[1] / snap) * snap, 0, config.dimY) ];
	                } ],
	                onMoveStart: function onMoveStart() {
	                    config.graph.bars[i].attr({
	                        fill: KhanColors.INTERACTIVE
	                    });
	                },
	                onMove: function onMove() {
	                    var y = config.graph.lines[i].coord()[1];
	                    var values = _.clone(self.state.values);
	                    values[i] = y;
	                    self.setState({
	                        values: values
	                    });
	                    self.changeAndTrack({
	                        values: values
	                    });
	                    self._maybeUpdateDragPrompt(values);
	                    scaleBar(i, y);
	                },
	                onMoveEnd: function onMoveEnd() {
	                    config.graph.bars[i].attr({
	                        fill: KhanColors.BLUE_C
	                    });
	                }
	            });
	            // We set the z-index to 1 here so that the hairlines cover up the
	            // points
	            config.graph.lines[i].state.visibleShape.wrapper.style.zIndex = "1";
	            self._maybeUpdateDragPrompt(self.state.values);
	        } else {
	            config.graph.lines[i] = graphie.addMovableLineSegment({
	                coordA: [ x - barHalfWidth, startHeight ],
	                coordZ: [ x + barHalfWidth, startHeight ],
	                snapY: config.scaleY / self.props.snapsPerLine,
	                constraints: {
	                    constrainX: true
	                },
	                normalStyle: {
	                    stroke: KhanColors.INTERACTIVE,
	                    // Don't display graph handles in static mode
	                    "stroke-width": this.props.static ? 0 : 4
	                }
	            });
	            config.graph.lines[i].onMove = function(dx, dy) {
	                var y = this.coordA[1];
	                if (y < 0 || y > config.dimY) {
	                    y = Math.min(Math.max(y, 0), config.dimY);
	                    this.coordA[1] = this.coordZ[1] = y;
	                    // Snap the line back into range.
	                    this.transform();
	                }
	                var values = _.clone(self.state.values);
	                values[i] = y;
	                self.setState({
	                    values: values
	                });
	                self.changeAndTrack({
	                    values: values
	                });
	                scaleBar(i, y);
	            };
	        }
	        scaleBar(i, startHeight);
	        return x;
	    },
	    /**
	     * Renders a segment of an interactive line to the plotter graph
	     * @param i the index of the point to render
	     * @param startHeight the initial height of the given point
	     * @param config the graph setup, such as scale and dimensions
	     */
	    setupLine: function setupLine(i, startHeight, config) {
	        var _this2 = this;
	        var isMobile = this.props.apiOptions.isMobile;
	        var self = this;
	        var c = config;
	        var graphie = self.graphie;
	        var x = i + (isMobile ? .4 : 1);
	        if (isMobile) {
	            var snap = config.scaleY / self.props.snapsPerLine;
	            c.graph.points[i] = Interactive2.addMaybeMobileMovablePoint(this, {
	                coord: [ x, startHeight ],
	                constraints: [ function(coord, prev, options) {
	                    return [ x, _this2._clampValue(Math.round(coord[1] / snap) * snap, 0, config.dimY) ];
	                } ],
	                onMove: function onMove() {
	                    var y = c.graph.points[i].coord()[1];
	                    var values = _.clone(self.state.values);
	                    values[i] = y;
	                    self.setState({
	                        values: values
	                    });
	                    self.changeAndTrack({
	                        values: values
	                    });
	                    self._maybeUpdateDragPrompt(values);
	                }
	            });
	            self._maybeUpdateDragPrompt(self.state.values);
	            i > 0 && (c.graph.lines[i] = Interactive2.addMovableLine(graphie, {
	                points: [ c.graph.points[i - 1], c.graph.points[i] ],
	                constraints: Interactive2.MovablePoint.constraints.fixed(),
	                normalStyle: {
	                    stroke: KhanColors.BLUE_C,
	                    "stroke-width": 2
	                },
	                highlightStyle: {
	                    stroke: KhanColors.BLUE_C,
	                    "stroke-width": 2
	                }
	            }));
	        } else {
	            c.graph.points[i] = graphie.addMovablePoint({
	                coord: [ x, startHeight ],
	                constraints: {
	                    constrainX: true
	                },
	                normalStyle: {
	                    fill: KhanColors.INTERACTIVE,
	                    stroke: KhanColors.INTERACTIVE
	                },
	                snapY: c.scaleY / self.props.snapsPerLine
	            });
	            c.graph.points[i].onMove = function(x, y) {
	                y = Math.min(Math.max(y, 0), c.dimY);
	                var values = _.clone(self.state.values);
	                values[i] = y;
	                self.setState({
	                    values: values
	                });
	                self.changeAndTrack({
	                    values: values
	                });
	                return [ x, y ];
	            };
	            i > 0 && (c.graph.lines[i] = graphie.addMovableLineSegment({
	                pointA: c.graph.points[i - 1],
	                pointZ: c.graph.points[i],
	                constraints: {
	                    fixed: true
	                },
	                normalStyle: {
	                    stroke: "#9ab8ed",
	                    "stroke-width": 2
	                }
	            }));
	        }
	        return x;
	    },
	    setupDotplot: function setupDotplot(i, config) {
	        var _this3 = this;
	        var graphie = this.graphie;
	        var isMobile = this.props.apiOptions.isMobile;
	        return this.setupTiledPlot(i, isMobile ? .5 : 1, config, function(x, y) {
	            return graphie.ellipse([ x, y ], [ _this3.DOT_PLOT_POINT_SIZE() / graphie.scale[0], _this3.DOT_PLOT_POINT_SIZE() / graphie.scale[1] ], {
	                fill: KhanColors.INTERACTIVE,
	                stroke: KhanColors.INTERACTIVE
	            });
	        });
	    },
	    setupPic: function setupPic(i, config) {
	        var _this4 = this;
	        var graphie = this.graphie;
	        return this.setupTiledPlot(i, 0, config, function(x, y) {
	            var scaledCenter = graphie.scalePoint([ x, y ]);
	            var size = _this4.props.picSize;
	            return graphie.raphael.image(_this4.props.picUrl, scaledCenter[0] - size / 2, scaledCenter[1] - size / 2, size, size);
	        });
	    },
	    setupTiledPlot: function setupTiledPlot(i, bottomMargin, config, createImage) {
	        var self = this;
	        var c = config;
	        var graphie = self.graphie;
	        var pics = graphie.pics;
	        var dotTicks = graphie.dotTicks;
	        var x = i + .5 + c.picPad;
	        // In order to make sure that manipulating the graph doesn't cause
	        // dragging, we disable touch actions for the whole mouselayer.
	        // TODO(emily): Figure out a way to turn of touch actions for only the
	        // part of the widget that can be manipulated. Putting this style
	        // directly on the rects below doesn't work.
	        graphie.mouselayer.canvas.style.touchAction = "none";
	        pics[i] = [];
	        dotTicks[i] = [];
	        var n = Math.round(c.dimY / c.scaleY) + 1;
	        _(n).times(function(j) {
	            j -= 1;
	            var midY = (j + .5) * c.scaleY;
	            var leftX = x - c.picBoxWidth / 2;
	            var topY = midY + .5 * c.scaleY;
	            var coord = graphie.scalePoint([ leftX, topY + bottomMargin ]);
	            var mouseRect = graphie.mouselayer.rect(coord[0], coord[1], c.picBoxWidthPx, c.picBoxHeight);
	            $(mouseRect[0]).css({
	                fill: "#000",
	                opacity: 0,
	                cursor: "pointer"
	            }).on("vmousedown", function(e) {
	                e.preventDefault();
	                self.whichPicClicked = i;
	                self.setPicHeight(i, topY);
	                $(document).on("vmouseup.plotTile", function(e) {
	                    $(document).unbind(".plotTile");
	                });
	                $(document).on("vmousemove.plotTile", function(e) {
	                    e.preventDefault();
	                    // Reverse-engineer the initial calculation
	                    var yCoord = graphie.getMouseCoord(e)[1];
	                    var adjustedCoord = Math.floor(yCoord - bottomMargin);
	                    // Calculate top coord from j value, but don't let them
	                    // go below j = -1, which is equivalent to having '0'
	                    // on the dot plot (due to weird indexing).
	                    var newJ = Math.max(-1, Math.floor(adjustedCoord / c.scaleY));
	                    var newMidY = (newJ + .5) * c.scaleY;
	                    var newTopY = newMidY + .5 * c.scaleY;
	                    self.setPicHeight(self.whichPicClicked, newTopY);
	                });
	            });
	            if (j < 0) // Don't show a pic underneath the axis!
	            return;
	            pics[i][j] = createImage(x, midY + bottomMargin);
	            dotTicks[i][j] = graphie.ellipse([ x, midY + bottomMargin ], [ self.DOT_TICK_POINT_SIZE() / graphie.scale[0], self.DOT_TICK_POINT_SIZE() / graphie.scale[1] ], {
	                fill: "#dee1e3",
	                stroke: "#dee1e3"
	            });
	        });
	        return x;
	    },
	    setPicHeight: function setPicHeight(i, y) {
	        var values = _.clone(this.state.values);
	        values[i] = y;
	        this.drawPicHeights(values, this.state.values);
	        this.setState({
	            values: values
	        });
	        this.changeAndTrack({
	            values: values
	        });
	    },
	    changeAndTrack: function changeAndTrack(data) {
	        this.props.onChange(data);
	        this.props.trackInteraction();
	    },
	    drawPicHeights: function drawPicHeights(values, prevValues) {
	        var self = this;
	        var graphie = self.graphie;
	        var pics = graphie.pics;
	        var isMobile = this.props.apiOptions.isMobile;
	        if (isMobile) {
	            var shouldDisplay = values.every(function(v) {
	                return 0 === v;
	            });
	            graphie.dotPrompt[0].style.display = shouldDisplay ? "inline" : "none";
	        }
	        _.each(pics, function(ps, i) {
	            _.each(ps, function(pic, j) {
	                var y = (j + 1) * self.props.scaleY;
	                var show = y <= values[i];
	                if (self.props.type === DOTPLOT) {
	                    var wasShown = y <= prevValues[i];
	                    show && !wasShown && pic.animate({
	                        "stroke-width": 8
	                    }, 75, function() {
	                        return pic.animate({
	                            "stroke-width": 2
	                        }, 75);
	                    });
	                }
	                $(pic[0]).css({
	                    display: show ? "inline" : "none"
	                });
	                graphie.dotTicks[i][j][0].style.display = show || !isMobile ? "none" : "inline";
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
	        return deepEq(guess, rubric.starting) ? {
	            type: "invalid",
	            message: null
	        } : {
	            type: "points",
	            earned: deepEq(guess, rubric.correct) ? 1 : 0,
	            total: 1,
	            message: null
	        };
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(11);

	var Molecule = __webpack_require__(62).molecule;

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
	        path.moveTo(5, canvas.height / 2);
	        path.lineTo(canvas.width - 5, canvas.height / 2);
	        path.moveTo(canvas.width - 10, canvas.height / 2 - 5);
	        path.lineTo(canvas.width - 5, canvas.height / 2);
	        path.moveTo(canvas.width - 10, canvas.height / 2 + 5);
	        path.lineTo(canvas.width - 5, canvas.height / 2);
	        ctx.stroke(path);
	    },
	    render: function render() {
	        return React.createElement("div", {
	            className: "arrow-container"
	        }, React.createElement("div", {
	            className: "above-text"
	        }, this.props.data.topText), React.createElement("canvas", {
	            height: "30",
	            id: "arrowCanvas" + this.props.index,
	            ref: "arrowCanvas" + this.props.index,
	            width: this.arrowLength
	        }, "Reaction arrow pointing to the right."), React.createElement("div", {
	            className: "below-text"
	        }, this.props.data.bottomText));
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
	        return {
	            smiles: [],
	            rotationAngle: [],
	            separators: []
	        };
	    },
	    simpleValidate: function simpleValidate() {
	        return {
	            type: "points",
	            earned: 0,
	            total: 0,
	            message: null
	        };
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
	        return React.createElement("div", {
	            className: "reaction",
	            ref: "reaction"
	        }, this.props.smiles.map(function(s, i) {
	            var id = _this.props.widgetId + "-" + i;
	            return React.createElement("div", {
	                key: id,
	                className: "molecule-container"
	            }, React.createElement(Molecule, {
	                id: id,
	                rotationAngle: _this.props.rotationAngle[i],
	                smiles: s
	            }), i === _this.props.smiles.length - 1 ? null : React.createElement(Separator, {
	                data: _this.props.separators[i],
	                index: i
	            }));
	        }));
	    }
	});

	module.exports = {
	    name: "reaction-diagram",
	    displayName: "Chemical reaction",
	    hidden: false,
	    widget: ReactionDiagramWidget
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var ApiOptions = __webpack_require__(18).Options;

	var Changeable = __webpack_require__(88);

	var _require = __webpack_require__(92), iconOk = _require.iconOk;

	var InlineIcon = __webpack_require__(89);

	var Renderer = __webpack_require__(8);

	var Util = __webpack_require__(17);

	var Sequence = React.createClass({
	    displayName: "Sequence",
	    propTypes: _extends({}, Changeable.propTypes, {
	        apiOptions: ApiOptions.propTypes,
	        json: React.PropTypes.arrayOf(React.PropTypes.shape({
	            content: React.PropTypes.string,
	            images: React.PropTypes.object,
	            widgets: React.PropTypes.object
	        })),
	        trackInteraction: React.PropTypes.func.isRequired,
	        highlightLint: React.PropTypes.bool
	    }),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            json: [ {
	                content: "",
	                widgets: {},
	                images: {}
	            } ],
	            highlightLint: false
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
	        var icon = React.createElement(InlineIcon, _extends({}, iconOk, {
	            style: {
	                color: "green"
	            }
	        }));
	        var content = _.chain(this.props.json).first(this.state.visible).map(function(step, i) {
	            return "[[" + Util.snowman + " group " + i + "]]";
	        }).join("\n\n").value();
	        var widgets = {};
	        _.each(this.props.json, function(step, i) {
	            widgets["group " + i] = {
	                type: "group",
	                graded: true,
	                version: {
	                    major: 0,
	                    minor: 0
	                },
	                options: _.extend({}, step, {
	                    icon: i < _this.state.visible - 1 ? icon : null
	                })
	            };
	        });
	        return React.createElement("div", {
	            className: "perseus-sequence"
	        }, React.createElement(Renderer, {
	            ref: "renderer",
	            content: content,
	            widgets: widgets,
	            onInteractWithWidget: this._handleInteraction,
	            apiOptions: this.props.apiOptions,
	            highlightLint: this.props.highlightLint
	        }));
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    _handleInteraction: function _handleInteraction(groupWidgetId) {
	        var step = parseInt(groupWidgetId.split(" ")[1]);
	        if (step === this.state.visible - 1) {
	            var widget = this.refs.renderer.getWidgetInstance("group " + step);
	            var score = widget.simpleValidate();
	            if ("points" === score.type && score.total === score.earned) {
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
	    _.isArray(oldJson) || (oldJson = [ oldJson ]);
	    var json = _.map(oldJson, function(rendererOptions) {
	        return traverseRenderer(rendererOptions);
	    });
	    return _.extend({}, props, {
	        json: json
	    });
	};

	module.exports = {
	    name: "sequence",
	    displayName: "Graded Sequence",
	    widget: Sequence,
	    traverseChildWidgets: traverseChildWidgets,
	    tracking: "all",
	    isLintable: true
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, indent, no-unused-vars, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, space-unary-ops */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	/* globals $_, i18n */
	var InfoTip = __webpack_require__(119);

	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var Changeable = __webpack_require__(88);

	var ApiOptions = __webpack_require__(18).Options;

	var assert = __webpack_require__(117).assert;

	var Graphie = __webpack_require__(94);

	var Path = Graphie.Path, Arc = Graphie.Arc, Circle = Graphie.Circle, Label = Graphie.Label, Line = Graphie.Line, MovablePoint = Graphie.MovablePoint, MovableLine = Graphie.MovableLine;

	var NumberInput = __webpack_require__(114);

	var MathOutput = __webpack_require__(116);

	var seededRNG = __webpack_require__(17).seededRNG;

	var Util = __webpack_require__(17);

	var knumber = __webpack_require__(165).number;

	var KhanColors = __webpack_require__(112);

	var KhanMath = __webpack_require__(86);

	var defaultBoxSize = 400;

	var maxSampleSize = 1e3;

	var maxTrials = 5e3;

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
	            box: [ defaultBoxSize, defaultBoxSize ]
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
	        Util.deepEq(oldRange, nextRange) || this.setState({
	            threshold: this._getInitialThreshold(nextRange)
	        });
	    },
	    /* Renders the vertical line that users can drag across the histogram. */
	    _renderThresholdLine: function _renderThresholdLine() {
	        var _this = this;
	        // Recall the the y-range goes from [-1, yMax] to allow for ticks on
	        // the x-axis.
	        var yRange = [ 0, this._range()[1][1] ];
	        var coords = _.map(yRange, function(y) {
	            return [ _this.state.threshold, y ];
	        });
	        // Returns an inivisble, placeholder coord that anchors the line
	        var invisiblePointForCoord = function invisiblePointForCoord(coord, i) {
	            return React.createElement(MovablePoint, {
	                key: i,
	                static: true,
	                coord: coord,
	                normalStyle: {
	                    stroke: "none",
	                    fill: "none"
	                }
	            });
	        };
	        return React.createElement(MovableLine, {
	            onMove: this.handleMouseInteraction
	        }, _.map(coords, invisiblePointForCoord));
	    },
	    /* Renders the shaded circle in the top right. */
	    _renderCircle: function _renderCircle() {
	        var _this2 = this;
	        var data = this.props.data;
	        // Get proportion of results below threshold
	        var total = _.reduce(data, function(sum, next) {
	            return sum + next;
	        }, 0);
	        var numBelow = _.reduce(data, function(sum, next, i) {
	            return null != _this2.state.threshold && i <= _this2.state.threshold ? sum + next : sum;
	        }, 0);
	        var proportionBelow = numBelow / total;
	        // This is a hack around the arc taking angles modulo 360.
	        // TODO(charlie): Find a better way around this.
	        var epsilon = 1e-5;
	        var radius = 20;
	        var center = [ this.props.box[0] - 30, 30 ];
	        // Plot little circle
	        var plotBelowCircle = function plotBelowCircle() {
	            var options = {
	                key: "below",
	                center: center,
	                radius: 20,
	                startAngle: 0,
	                endAngle: proportionBelow < 1 ? 360 * proportionBelow : 360 - 1e-5,
	                sector: 1 !== proportionBelow,
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
	                radius: 20,
	                startAngle: proportionBelow > 0 ? 360 * proportionBelow : 1e-5,
	                endAngle: 360,
	                sector: 0 !== proportionBelow,
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
	                coord: [ center[0], center[1] + 30 ],
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
	        return [ proportionBelow > 0 && plotBelowCircle(), proportionBelow < 1 && plotAboveCircle(), plotLabel() ];
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
	            if (!count) return;
	            var isBelow = null != _this3.state.threshold && i <= _this3.state.threshold;
	            var style = {
	                fill: isBelow ? KhanColors.LIGHT_RED : KhanColors.LIGHT_BLUE,
	                stroke: isBelow ? KhanColors.RED : KhanColors.BLUE
	            };
	            var coords = [ [ i, 0 ], [ i, count ], [ i + 1, count ], [ i + 1, 0 ] ];
	            return React.createElement(Path, {
	                key: i,
	                coords: coords,
	                style: style
	            });
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
	            scale: [ Util.scaleFromExtent(range[0], this.props.box[0]), Util.scaleFromExtent(range[1], this.props.box[1]) ]
	        };
	        var axisStyle = {
	            stroke: "#000",
	            strokeWidth: 1,
	            opacity: 1
	        };
	        var origin = [ range[0][0], 0 ];
	        var bottomRight = [ range[0][1], 0 ];
	        return React.createElement(Graphie, {
	            box: options.box,
	            range: options.range,
	            options: options,
	            setup: this._setupGraphie,
	            onMouseMove: this.handleMouseInteraction,
	            onMouseDown: this.handleMouseInteraction,
	            setDrawingAreaAvailable: this.props.setDrawingAreaAvailable
	        }, React.createElement(Line, {
	            start: origin,
	            end: bottomRight,
	            style: axisStyle
	        }), data && this._renderData(), data && this._renderCircle(), data && this._renderThresholdLine());
	    },
	    _setupGraphie: function _setupGraphie(graphie, options) {
	        var data = options.data;
	        var range = options.range;
	        var scale = options.scale;
	        /* Plot the bars that run parallel to the x-axis. */
	        var xWidth = range[0][1] - range[0][0];
	        var yWidth = range[1][1] - 0;
	        var maxYAxisEntities = 20;
	        var ySkip = Math.ceil(yWidth / 20);
	        _.each(_.range(0, range[1][1], ySkip), function(y) {
	            // If there's no data, we don't label the axes
	            data && graphie.label([ range[0][0], y ], KhanMath.roundToApprox(y, 2), "left", /* isTeX */
	            true);
	            graphie.line([ range[0][0], y ], [ range[0][1], y ], {
	                stroke: "#000",
	                strokeWidth: 1,
	                opacity: .3
	            });
	        });
	        // If there's no data, we don't label the x-axis at all
	        if (data) {
	            // Plot the labels below the bars
	            var maxXAxisEntities = 15;
	            var xSkip = Math.ceil(xWidth / 15);
	            _.each(_.range(range[0][0], range[0][1], xSkip), function(x) {
	                graphie.label([ x, 0 ], knumber.round(x, 2), "below", true);
	                var tickHeight = 8;
	                graphie.line([ x, 0 ], [ x, -8 / scale[1] ], {
	                    stroke: "#000",
	                    strokeWidth: 1
	                });
	            });
	        }
	        // Add y axis (x axis is added later to overlap the bars)
	        var axisStyle = {
	            stroke: "#000",
	            strokeWidth: 2,
	            opacity: 1
	        };
	        var origin = [ range[0][0], 0 ];
	        var topLeft = [ range[0][0], range[1][1] ];
	        graphie.line(origin, topLeft, axisStyle);
	        // Add axis labels
	        var xMid = range[0][0] + xWidth / 2;
	        var xOffset = data ? 25 : 0;
	        graphie.label([ xMid, -xOffset / scale[1] ], options.xAxisLabel, "below", false).css("font-weight", "bold");
	        var yMid = 0 + yWidth / 2;
	        var yOffset = data ? 55 : 28;
	        graphie.label([ range[0][0] - yOffset / scale[0], yMid ], options.yAxisLabel, "center", false).css("font-weight", "bold").css("-webkit-transform", "rotate(-90deg)");
	    },
	    handleMouseInteraction: function handleMouseInteraction(point) {
	        this.setState({
	            threshold: point[0]
	        });
	    },
	    /* Convenience functions that help calculate props based on other props. */
	    _range: function _range(props) {
	        var defaultRange = [ [ 0, 100 ], [ -1, 10 ] ];
	        props = props || this.props;
	        return props.data ? this._getRangeForData(props.data) : defaultRange;
	    },
	    _getRangeForData: function _getRangeForData(data) {
	        // Find first/last non-zero entry and add some padding
	        var padding = 10;
	        var firstIndex = _.indexOf(data, _.find(data, function(n) {
	            return n > 0;
	        }));
	        var xMin = Math.max(0, firstIndex - 10);
	        var lastIndex = _.lastIndexOf(data, _.last(_.filter(data, function(n) {
	            return n > 0;
	        })));
	        var xMax = Math.min(101, lastIndex + 1 + 10);
	        // The y-axis is bounded above by largest value, and below by 0.
	        // However, the 'range' of the y-axis goes as low as -1 to allow
	        // Graphie to draw ticks on the x-Axis that extend vertically below
	        // y = 0.
	        var yMin = -1;
	        return [ [ xMin, xMax ], [ -1, _.max(data) ] ];
	    },
	    _getInitialThreshold: function _getInitialThreshold(range) {
	        // We pick a pretty-looking threshold, 1/3 of the way along the axis
	        var xRange = range[0];
	        return xRange[0] + (xRange[1] - xRange[0]) / 3;
	    }
	});

	var Simulator = React.createClass({
	    displayName: "Simulator",
	    propTypes: _extends({}, Changeable.propTypes, {
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
	    }),
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
	        null != this.props.randomSeed && (this.generateNumber = Util.seededRNG(this.props.randomSeed));
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        nextProps.randomSeed !== this.props.randomSeed && (this.generateNumber = Util.seededRNG(nextProps.randomSeed));
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
	        var proportionInput = React.createElement("div", null, React.createElement(InputComponent, {
	            ref: "userProportion",
	            style: style,
	            value: this.calculateDisplayProportion(),
	            checkValidity: this.checkProportionValidity,
	            disabled: this.props.apiOptions.readOnly,
	            onChange: this.handleUserProportionChange,
	            onFocus: function onFocus() {
	                return _this4.props.onFocus([ "userProportion" ]);
	            },
	            onBlur: function onBlur() {
	                return _this4.props.onBlur([ "userProportion" ]);
	            }
	        }), React.createElement(InfoTip, null, React.createElement("p", null, "This controls the proportion or percentage that will be used in your simulation.")));
	        var sampleSizeInput = React.createElement("div", null, React.createElement(InputComponent, {
	            ref: "sampleSize",
	            style: style,
	            value: this.props.sampleSize,
	            checkValidity: function checkValidity(val) {
	                return val >= 0;
	            },
	            disabled: this.props.apiOptions.readOnly,
	            onChange: this.handleSampleSizeChange,
	            onFocus: function onFocus() {
	                return _this4.props.onFocus([ "sampleSize" ]);
	            },
	            onBlur: function onBlur() {
	                return _this4.props.onBlur([ "sampleSize" ]);
	            }
	        }), React.createElement(InfoTip, null, React.createElement("p", null, "This controls the sample size that will be used in your simulation. For example, if you set this to 100, then for each trial, responses from 100 participants will be simulated.")));
	        var numTrialsDisplay = React.createElement("div", {
	            style: {
	                textAlign: "right"
	            }
	        }, React.createElement("b", null, this.props.numTrials), React.createElement(InfoTip, null, React.createElement("p", null, "This is the number of trials used in the simulation. For example, if set to 50, then the survey will be conducted 50 times.")));
	        // Generates a table from a set of titles and values.
	        var generateTable = function generateTable(contents) {
	            var header = React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Parameter"), React.createElement("th", null, "Value")));
	            var body = React.createElement("tbody", null, _.map(contents, function(row, i) {
	                return React.createElement("tr", {
	                    key: i
	                }, React.createElement("td", null, row.title), React.createElement("td", null, row.value));
	            }));
	            return React.createElement("table", null, header, body);
	        };
	        // Contents for the table to-be generated
	        var contents = [ {
	            title: this.props.proportionLabel + ":",
	            value: proportionInput
	        }, {
	            title: "Sample size:",
	            value: sampleSizeInput
	        }, {
	            title: "Number of trials:",
	            value: numTrialsDisplay
	        } ];
	        // The 'Run Simulation' button
	        var buttonStyle = {
	            margin: "20px 0"
	        };
	        var startButton = React.createElement("button", {
	            className: "simple-button",
	            style: buttonStyle,
	            disabled: this.props.apiOptions.readOnly,
	            onClick: this.handleRunSimulation
	        }, i18n._("Run simulation"));
	        // When we plot data, ticks on the x-axis require some vertical padding
	        var histogramStyle = {
	            paddingBottom: this.props.data ? 40 : 0
	        };
	        var histogram = React.createElement("div", {
	            style: histogramStyle
	        }, React.createElement(Histogram, {
	            data: this.props.data,
	            xAxisLabel: this.props.xAxisLabel,
	            yAxisLabel: this.props.yAxisLabel,
	            setDrawingAreaAvailable: this.props.apiOptions.setDrawingAreaAvailable
	        }));
	        return React.createElement("div", null, generateTable(contents), startButton, histogram);
	    },
	    calculateDisplayProportion: function calculateDisplayProportion() {
	        var userProportion = this.props.userProportion;
	        // If we want to display as a percentage, multiply proportion by 100.0.
	        // If we want to display as a percentage, multiply proportion by 100.0.
	        return "percentage" === this.props.proportionOrPercentage ? Math.round(100 * userProportion) : userProportion;
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    checkProportionValidity: function checkProportionValidity(value) {
	        return value >= 0 && "proportion" === this.props.proportionOrPercentage && value <= 1 || "percentage" === this.props.proportionOrPercentage && value <= 100;
	    },
	    handleUserProportionChange: function handleUserProportionChange(value, cb) {
	        var userProportion;
	        // If "percentage" mode is enabled, user will have entered value as
	        // a percentage. However, we always store as a proportion, so we cast.
	        userProportion = "percentage" === this.props.proportionOrPercentage ? value / 100 : value;
	        // If they entered a number, we may need to cap it
	        null != userProportion && (userProportion = Math.min(1, Math.max(0, userProportion)));
	        this.props.onChange({
	            userProportion: userProportion
	        }, cb);
	    },
	    handleSampleSizeChange: function handleSampleSizeChange(sampleSize, cb) {
	        null != sampleSize && (sampleSize = Math.min(maxSampleSize, Math.max(0, Math.floor(sampleSize))));
	        this.props.onChange({
	            sampleSize: sampleSize
	        }, cb);
	    },
	    handleRunSimulation: function handleRunSimulation() {
	        // If they haven't filled out a parameter field, highlight it.
	        if (null == this.props.numTrials || null == this.props.userProportion || null == this.props.sampleSize) {
	            this.setState({
	                invalidInput: true
	            });
	            return;
	        }
	        this.setState({
	            invalidInput: false
	        });
	        this.props.onChange({
	            data: this.generateData()
	        });
	        this.props.trackInteraction();
	    },
	    generateData: function generateData(props) {
	        var _this5 = this;
	        props = props || this.props;
	        return function getSampleDistribution(sampleSize, numTrials, proportion) {
	            var draw = function draw() {
	                return _this5.generateNumber() < proportion;
	            };
	            var sampleDistribution = _.times(101, function() {
	                return 0;
	            });
	            _.times(numTrials, function() {
	                var results = _.times(sampleSize, draw);
	                var count = _.filter(results, _.identity).length;
	                var normalizedCount = Math.floor(100 * count / sampleSize);
	                sampleDistribution[normalizedCount]++;
	            });
	            return sampleDistribution;
	        }(props.sampleSize, props.numTrials, props.userProportion);
	    },
	    /* InputPath API */
	    getInputPaths: function getInputPaths() {
	        return [ [ "userProportion" ], [ "sampleSize" ] ];
	    },
	    focus: function focus() {
	        var path = _.head(this.getInputPaths());
	        this.focusInputPath(path);
	        return true;
	    },
	    focusInputPath: function focusInputPath(path) {
	        assert(path.length > 0);
	        var inputID = _.head(path);
	        this.refs[inputID].focus();
	    },
	    blurInputPath: function blurInputPath(path) {
	        assert(path.length > 0);
	        var inputID = _.head(path);
	        this.refs[inputID].blur();
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
	        this["handle" + (inputID.charAt(0).toUpperCase() + inputID.slice(1)) + "Change"](newValue, cb);
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable comma-dangle, no-var, one-var, react/forbid-prop-types, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Sortable = __webpack_require__(121);

	var ApiOptions = __webpack_require__(18).Options;

	var shuffle = __webpack_require__(17).shuffle;

	var HORIZONTAL = "horizontal", VERTICAL = "vertical";

	var Sorter = React.createClass({
	    displayName: "Sorter",
	    propTypes: {
	        apiOptions: ApiOptions.propTypes,
	        correct: React.PropTypes.array,
	        layout: React.PropTypes.oneOf([ HORIZONTAL, VERTICAL ]),
	        onChange: React.PropTypes.func,
	        padding: React.PropTypes.bool,
	        problemNum: React.PropTypes.number,
	        trackInteraction: React.PropTypes.func.isRequired,
	        highlightLint: React.PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            correct: [],
	            layout: HORIZONTAL,
	            padding: true,
	            problemNum: 0,
	            onChange: function onChange() {},
	            highlightLint: false
	        };
	    },
	    render: function render() {
	        var options = shuffle(this.props.correct, this.props.problemNum, /* ensurePermuted */
	        true);
	        var marginPx = this.props.apiOptions.isMobile ? 8 : 5;
	        return React.createElement("div", {
	            className: "perseus-widget-sorter perseus-clearfix"
	        }, React.createElement(Sortable, {
	            options: options,
	            layout: this.props.layout,
	            margin: marginPx,
	            padding: this.props.padding,
	            onChange: this.handleChange,
	            highlightLint: this.props.highlightLint,
	            ref: "sortable"
	        }));
	    },
	    handleChange: function handleChange(e) {
	        this.props.onChange(e);
	        this.props.trackInteraction();
	    },
	    getUserInput: function getUserInput() {
	        return {
	            options: this.refs.sortable.getOptions()
	        };
	    },
	    simpleValidate: function simpleValidate(rubric) {
	        return Sorter.validate(this.getUserInput(), rubric);
	    }
	});

	_.extend(Sorter, {
	    validate: function validate(state, rubric) {
	        return {
	            type: "points",
	            earned: _.isEqual(state.options, rubric.correct) ? 1 : 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "sorter",
	    displayName: "Sorter",
	    widget: Sorter,
	    isLintable: true
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp, space-before-function-paren */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var MathOutput = __webpack_require__(116);

	var SimpleKeypadInput = __webpack_require__(83);

	var Renderer = __webpack_require__(8);

	var Util = __webpack_require__(17);

	var keypadElementPropType = __webpack_require__(81).propTypes.keypadElementPropType;

	var ApiOptions = __webpack_require__(18).Options;

	var KhanAnswerTypes = __webpack_require__(77);

	var assert = __webpack_require__(117).assert;

	/* Input handling: Maps a (row, column) pair to a unique ref used by React,
	 * and extracts (row, column) pairs from input paths, used to allow outsiders
	 * to focus, blur, set input values, etc. */
	var getInputPath = function getInputPath(row, column) {
	    return [ "" + row, "" + column ];
	};

	var getDefaultPath = function getDefaultPath() {
	    return getInputPath(0, 0);
	};

	var getRowFromPath = function getRowFromPath(path) {
	    // 'path' should be a (row, column) pair
	    assert(_.isArray(path) && 2 === path.length);
	    return +path[0];
	};

	var getColumnFromPath = function getColumnFromPath(path) {
	    // 'path' should be a (row, column) pair
	    assert(_.isArray(path) && 2 === path.length);
	    return +path[1];
	};

	var getRefForPath = function getRefForPath(path) {
	    return "answer" + getRowFromPath(path) + "," + getColumnFromPath(path);
	};

	var Table = React.createClass({
	    displayName: "Table",
	    propTypes: {
	        answers: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)),
	        editableHeaders: React.PropTypes.bool,
	        // The editor to use when editableHeaders is enabled
	        Editor: React.PropTypes.func,
	        headers: React.PropTypes.arrayOf(React.PropTypes.string),
	        keypadElement: keypadElementPropType,
	        trackInteraction: React.PropTypes.func.isRequired,
	        highlightLint: React.PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        var defaultRows = 4;
	        var defaultColumns = 1;
	        var blankAnswers = _(4).times(function() {
	            return Util.stringArrayOfSize(1);
	        });
	        return {
	            apiOptions: ApiOptions.defaults,
	            headers: [ "" ],
	            editableHeaders: false,
	            rows: 4,
	            columns: 1,
	            answers: blankAnswers,
	            highlightLint: false
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
	        var InputComponent = void 0;
	        var inputStyle = void 0;
	        if (this.props.apiOptions.customKeypad) {
	            InputComponent = SimpleKeypadInput;
	            // NOTE(charlie): This is intended to match the "width: 80px" in
	            // input in table.less. Those values should be kept in-sync.
	            inputStyle = {
	                width: 80
	            };
	        } else if (this.props.apiOptions.staticRender) {
	            InputComponent = MathOutput;
	            inputStyle = {};
	        } else {
	            InputComponent = "input";
	            inputStyle = {};
	        }
	        return React.createElement("table", {
	            className: "perseus-widget-table-of-values non-markdown"
	        }, React.createElement("thead", null, React.createElement("tr", null, _.map(headers, function(header, i) {
	            return _this.props.editableHeaders ? React.createElement("th", {
	                key: i
	            }, React.createElement(_this.props.Editor, {
	                ref: "columnHeader" + i,
	                apiOptions: _this.props.apiOptions,
	                content: header,
	                widgetEnabled: false,
	                onChange: _.partial(_this.onHeaderChange, i)
	            })) : React.createElement("th", {
	                key: i
	            }, React.createElement(Renderer, {
	                content: header,
	                highlightLint: _this.props.highlightLint
	            }));
	        }))), React.createElement("tbody", null, _(rows).times(function(r) {
	            return React.createElement("tr", {
	                key: r
	            }, _(columns).times(function(c) {
	                return React.createElement("td", {
	                    key: c
	                }, React.createElement(InputComponent, {
	                    ref: getRefForPath(getInputPath(r, c)),
	                    type: "text",
	                    value: _this.props.answers[r][c],
	                    keypadElement: _this.props.keypadElement,
	                    disabled: _this.props.apiOptions.readOnly,
	                    onFocus: _.partial(_this._handleFocus, getInputPath(r, c)),
	                    onBlur: _.partial(_this._handleBlur, getInputPath(r, c)),
	                    onChange: _.partial(_this.onValueChange, r, c),
	                    style: inputStyle
	                }));
	            }));
	        })));
	    },
	    getUserInput: function getUserInput() {
	        return _.map(this.props.answers, _.clone);
	    },
	    onValueChange: function onValueChange(row, column, eventOrValue) {
	        var answers = _.map(this.props.answers, _.clone);
	        // If this is coming from an "input", the last argument will be an
	        // event. If it's coming from a SimpleKeypadInput, it'll be the value.
	        answers[row][column] = eventOrValue.target ? eventOrValue.target.value : eventOrValue;
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
	        this.props.apiOptions.customKeypad ? inputComponent.focus() : this.props.apiOptions.staticRender ? inputComponent.focus() : ReactDOM.findDOMNode(inputComponent).focus();
	    },
	    blurInputPath: function blurInputPath(path) {
	        var inputID = getRefForPath(path);
	        var inputComponent = this.refs[inputID];
	        this.props.apiOptions.customKeypad ? inputComponent.blur() : this.props.apiOptions.staticRender ? inputComponent.blur() : ReactDOM.findDOMNode(inputComponent).blur();
	    },
	    getDOMNodeForPath: function getDOMNodeForPath(path) {
	        var inputID = getRefForPath(path);
	        return ReactDOM.findDOMNode(this.refs[inputID]);
	    },
	    getInputPaths: function getInputPaths() {
	        var rows = this._getRows();
	        var columns = this._getColumns();
	        var inputPaths = [];
	        _(rows).times(function(r) {
	            _(columns).times(function(c) {
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
	            return _.filter(table, function(row) {
	                // Check if row has a cell that is nonempty
	                return _.some(row, _.identity);
	            });
	        };
	        var solution = filterNonEmpty(rubric.answers);
	        var supplied = filterNonEmpty(state);
	        if (_.some(supplied, function(row) {
	            return _.some(row, function(cell) {
	                return "" === cell;
	            });
	        }) || !supplied.length) return {
	            type: "invalid",
	            message: null
	        };
	        if (supplied.length !== solution.length) return {
	            type: "points",
	            earned: 0,
	            total: 1,
	            message: null
	        };
	        var createValidator = KhanAnswerTypes.number.createValidatorFunctional;
	        var message = null;
	        return {
	            type: "points",
	            earned: _.every(solution, function(rowSolution) {
	                var i;
	                for (i = 0; i < supplied.length; i++) {
	                    var rowSupplied = supplied[i];
	                    if (_.every(rowSupplied, function(cellSupplied, i) {
	                        var cellSolution = rowSolution[i];
	                        var validator = createValidator(cellSolution, {
	                            simplify: true
	                        });
	                        var result = validator(cellSupplied);
	                        result.message && (message = result.message);
	                        return result.correct;
	                    })) {
	                        supplied.splice(i, 1);
	                        return true;
	                    }
	                }
	                return false;
	            }) ? 1 : 0,
	            total: 1,
	            message: message
	        };
	    }
	});

	var propTransform = function propTransform(editorProps) {
	    // Remove answers before passing to widget
	    var rows = editorProps.answers.length;
	    var columns = editorProps.answers[0].length;
	    var blankAnswers = _(rows).times(function() {
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
	    transform: propTransform,
	    isLintable: true
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable camelcase, comma-dangle, indent, max-lines, no-redeclare, no-undef, no-var, object-curly-spacing, prefer-spread, react/jsx-closing-bracket-location, react/jsx-indent-props, react/no-did-update-set-state, react/prop-types, react/sort-comp, space-before-function-paren, space-infix-ops */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var Graph = __webpack_require__(118);

	var InlineIcon = __webpack_require__(89);

	var NumberInput = __webpack_require__(114);

	var MathOutput = __webpack_require__(116);

	var TeX = __webpack_require__(44);

	var SimpleKeypadInput = __webpack_require__(83);

	var ApiOptions = __webpack_require__(18).Options;

	var keypadElementPropType = __webpack_require__(81).propTypes.keypadElementPropType;

	var ROTATE_SNAP_DEGREES = 15;

	var DEGREE_SIGN = "°";

	var RENDER_TRANSFORM_DELAY_IN_MS = 300;

	var ROTATE_HANDLE_DIST = 1.5;

	var REFLECT_ROTATE_HANDLE_DIST = 2;

	var REFLECT_BUTTON_SIZE = 1;

	var _require = __webpack_require__(92), iconPlus = _require.iconPlus, iconUndo = _require.iconUndo;

	var deepEq = __webpack_require__(17).deepEq;

	var getGridStep = __webpack_require__(17).getGridStep;

	var captureScratchpadTouchStart = __webpack_require__(17).captureScratchpadTouchStart;

	var knumber = __webpack_require__(165).number;

	var kvector = __webpack_require__(165).vector;

	var kpoint = __webpack_require__(165).point;

	var kray = __webpack_require__(165).ray;

	var kline = __webpack_require__(165).line;

	var KhanMath = __webpack_require__(86);

	var KhanColors = __webpack_require__(112);

	var assert = __webpack_require__(117).assert;

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
	    return _.object(_.map(object, function(value, key) {
	        return [ key, value[subKey] ];
	    }));
	}

	var defaultGraphProps = function defaultGraphProps(setProps, boxSize) {
	    setProps = setProps || {};
	    var labels = setProps.labels || [ "x", "y" ];
	    var range = setProps.range || [ [ -10, 10 ], [ -10, 10 ] ];
	    var step = setProps.step || [ 1, 1 ];
	    return {
	        box: [ boxSize, boxSize ],
	        labels: labels,
	        range: range,
	        step: step,
	        gridStep: setProps.gridStep || getGridStep(range, step, boxSize),
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
	            coord: [ 1, 6 ]
	        },
	        reflection: {
	            enabled: true,
	            required: false,
	            constraints: {
	                fixed: false
	            },
	            coords: [ [ 2, -4 ], [ 2, 2 ] ]
	        },
	        dilation: {
	            enabled: true,
	            required: false,
	            constraints: {
	                fixed: false
	            },
	            coord: [ 6, 6 ]
	        }
	    },
	    drawSolutionShape: true,
	    starting: {
	        shape: {
	            type: "polygon-3",
	            coords: [ [ 2, 2 ], [ 2, 6 ], [ 7, 2 ] ]
	        },
	        transformations: []
	    },
	    correct: {
	        shape: {
	            type: "polygon-3",
	            coords: [ [ 2, 2 ], [ 2, 6 ], [ 7, 2 ] ]
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
	    return kvector.add(dilationCenter, pvScaled);
	}

	// TODO(jack): i18nize this
	function stringFromDecimal(number) {
	    return String(KhanMath.roundTo(9, number));
	}

	function stringFromFraction(number) {
	    var frac = KhanMath.toFraction(number, knumber.DEFAULT_TOLERANCE);
	    return 1 === frac[1] ? stringFromDecimal(number) : stringFromDecimal(frac[0]) + "/" + stringFromDecimal(frac[1]);
	}

	function texFromPoint(point) {
	    return [ React.createElement(TeX, null, "("), stringFromDecimal(point[0]), React.createElement(TeX, null, ", {}"), stringFromDecimal(point[1]), React.createElement(TeX, null, ")") ];
	}

	function texFromVector(vector) {
	    return [ React.createElement(TeX, null, "\\langle"), stringFromDecimal(vector[0]), React.createElement(TeX, null, ", {}"), stringFromDecimal(vector[1]), React.createElement(TeX, null, "\\rangle") ];
	}

	function texFromAngleDeg(angleDeg) {
	    return stringFromDecimal(angleDeg) + DEGREE_SIGN;
	}

	function orderInsensitiveCoordsEqual(coords1, coords2) {
	    coords1 = _.clone(coords1).sort(kpoint.compare);
	    coords2 = _.clone(coords2).sort(kpoint.compare);
	    return _.all(_.map(coords1, function(coord1, i) {
	        var coord2 = coords2[i];
	        return kpoint.equal(coord1, coord2);
	    }));
	}

	var inputComponentForApiOptions = function inputComponentForApiOptions(apiOptions) {
	    return apiOptions.customKeypad ? SimpleKeypadInput : apiOptions.staticRender ? MathOutput : NumberInput;
	};

	/* Perform operations on raw transform objects */
	var TransformOps = {
	    apply: function apply(transform) {
	        // Any transformation with empty text boxes is a no-op until
	        // filled out (these show up as nulls in transform.vector/line/etc).
	        // TODO (jack): Merge this just into reflections now that other
	        // transforms are always valid (after merging transformation
	        // collapsing, which may use isValid)
	        // Any transformation with empty text boxes is a no-op until
	        // filled out (these show up as nulls in transform.vector/line/etc).
	        // TODO (jack): Merge this just into reflections now that other
	        // transforms are always valid (after merging transformation
	        // collapsing, which may use isValid)
	        return Transformations[transform.type].isValid(transform) ? Transformations[transform.type].apply(transform) : _.identity;
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
	        // Collapse no-op transformations at the end of the list
	        return transforms.length && TransformOps.isNoOp(_.last(transforms)) ? _.initial(transforms) : transforms;
	    },
	    _appendAndCollapseLastTwo: function _appendAndCollapseLastTwo(transformList, newTransform) {
	        if (transformList.length) {
	            var collapsed = TransformOps.collapse(_.last(transformList), newTransform);
	            return _.initial(transformList).concat(collapsed);
	        }
	        return [ newTransform ];
	    },
	    isNoOp: function isNoOp(transform) {
	        return Transformations[transform.type].isNoOp(transform);
	    },
	    collapse: function collapse(transform1, transform2) {
	        // We can only collapse transforms that have the same type
	        if (transform1.type !== transform2.type) return [ transform1, transform2 ];
	        // Clicking the button again removes empty transformations
	        if (TransformOps.isEmpty(transform1) && TransformOps.isEmpty(transform2)) return [];
	        // Don't collapse invalid transformations otherwise
	        if (!TransformOps.isValid(transform1) || !TransformOps.isValid(transform2)) return [ transform1, transform2 ];
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
	            _.isArray(collapsed) || (collapsed = [ collapsed ]);
	            // Add types to all transforms in the answer
	            _.each(collapsed, function(transform) {
	                transform.type = transform1.type;
	            });
	            return collapsed;
	        }
	        // These transforms can't be collapsed together
	        return [ transform1, transform2 ];
	    },
	    toTeX: function toTeX(transform) {
	        return Transformations[transform.type].toTeX(transform);
	    },
	    /* A react representation of this transform object */
	    ListItem: React.createClass({
	        displayName: "ListItem",
	        render: function render() {
	            if ("dynamic" === this.props.mode) return React.createElement("div", null, TransformOps.toTeX(this.props.transform));
	            if ("interactive" === this.props.mode) {
	                var TransformClass = Transformations[this.props.transform.type].Input;
	                return React.createElement(TransformClass, _extends({
	                    ref: "transform",
	                    onChange: this.handleChange,
	                    onFocus: this.props.onFocus,
	                    onBlur: this.props.onBlur,
	                    keypadElement: this.props.keypadElement,
	                    apiOptions: this.props.apiOptions
	                }, this.props.transform));
	            }
	            throw new Error("Invalid mode: " + this.props.mode);
	        },
	        value: function value() {
	            return "interactive" === this.props.mode ? _.extend({
	                type: this.props.transform.type
	            }, this.refs.transform.value()) : this.props.transform;
	        },
	        handleChange: _.debounce(function(callback) {
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
	            path && this.focusInputPath(path);
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
	                if (isNaN(value)) return;
	            }
	            this.refs.transform.setInputValue(path, value, cb);
	        },
	        getInputPaths: function getInputPaths() {
	            // If we're in dynamic mode, then the list items are made up of
	            // static text.
	            // If we're in dynamic mode, then the list items are made up of
	            // static text.
	            return "dynamic" === this.props.mode ? [] : this.refs.transform.getInputPaths();
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
	            return function(coord) {
	                return kvector.add(coord, transform.vector);
	            };
	        },
	        isValid: function isValid(transform) {
	            return _.isFinite(transform.vector[0]) && _.isFinite(transform.vector[1]);
	        },
	        isEmpty: function isEmpty(transform) {
	            return null === transform.vector[0] && null === transform.vector[1];
	        },
	        isNoOp: function isNoOp(transform) {
	            return kvector.equal(transform.vector, [ 0, 0 ]);
	        },
	        collapse: function collapse(transform1, transform2) {
	            return {
	                vector: kvector.add(transform1.vector, transform2.vector)
	            };
	        },
	        toTeX: function toTeX(transform) {
	            // I18N: As in the command, "Translation by <3, 1>"
	            return $_({
	                vector: texFromVector(transform.vector)
	            }, "Translation by %(vector)s");
	        },
	        Input: React.createClass({
	            displayName: "Input",
	            getInitialState: function getInitialState() {
	                return {
	                    vector: this.props.vector || [ null, null ]
	                };
	            },
	            componentDidUpdate: function componentDidUpdate(prevProps) {
	                deepEq(this.props, prevProps) || this.setState({
	                    vector: this.props.vector
	                });
	            },
	            render: function render() {
	                var _this = this;
	                var InputComponent = inputComponentForApiOptions(this.props.apiOptions);
	                var vector = [ React.createElement(TeX, null, "\\langle"), React.createElement(InputComponent, {
	                    ref: "x",
	                    placeholder: 0,
	                    value: this.state.vector[0],
	                    useArrowKeys: true,
	                    onChange: function onChange(val0) {
	                        var val1 = _this.state.vector[1];
	                        _this.setState({
	                            vector: [ val0, val1 ]
	                        }, function() {
	                            _this.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "x"),
	                    onBlur: _.partial(this.props.onBlur, "x"),
	                    keypadElement: this.props.keypadElement
	                }), React.createElement(TeX, null, ", {}"), React.createElement(InputComponent, {
	                    ref: "y",
	                    placeholder: 0,
	                    value: this.state.vector[1],
	                    useArrowKeys: true,
	                    onChange: function onChange(val1) {
	                        var val0 = _this.state.vector[0];
	                        _this.setState({
	                            vector: [ val0, val1 ]
	                        }, function() {
	                            _this.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "y"),
	                    onBlur: _.partial(this.props.onBlur, "y"),
	                    keypadElement: this.props.keypadElement
	                }), React.createElement(TeX, null, "\\rangle") ];
	                return React.createElement("div", null, $_({
	                    vector: vector
	                }, "Translation by %(vector)s"));
	            },
	            value: function value() {
	                return {
	                    vector: [ this.refs.x.getValue(), this.refs.y.getValue() ]
	                };
	            },
	            /* InputPath API */
	            setInputValue: function setInputValue(path, value, cb) {
	                var _this2 = this;
	                var id = _.first(path);
	                var vector = _.clone(this.state.vector);
	                "x" === id ? vector[0] = value : "y" === id && (vector[1] = value);
	                this.setState({
	                    vector: vector
	                }, function() {
	                    _this2.props.onChange(cb);
	                });
	            },
	            getInputPaths: function getInputPaths() {
	                return [ [ "x" ], [ "y" ] ];
	            }
	        })
	    },
	    rotation: {
	        // I18N: As in the command, "Rotate the polygon"
	        verbName: i18n._("Rotate"),
	        nounName: i18n._("Rotation"),
	        lowerNounName: i18n._("rotation"),
	        apply: function apply(transform) {
	            return function(coord) {
	                return kpoint.rotateDeg(coord, transform.angleDeg, transform.center);
	            };
	        },
	        isValid: function isValid(transform) {
	            return _.isFinite(transform.angleDeg) && _.isFinite(transform.center[0]) && _.isFinite(transform.center[1]);
	        },
	        isEmpty: function isEmpty(transform) {
	            return null === transform.angleDeg && null === transform.center[0] && null === transform.center[1];
	        },
	        isNoOp: function isNoOp(transform) {
	            return knumber.equal(transform.angleDeg, 0);
	        },
	        collapse: function collapse(transform1, transform2) {
	            if (!kpoint.equal(transform1.center, transform2.center)) return false;
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
	                    center: this.props.center || [ null, null ],
	                    angleDeg: this.props.angleDeg || null
	                };
	            },
	            componentDidUpdate: function componentDidUpdate(prevProps) {
	                deepEq(this.props, prevProps) || this.setState({
	                    center: this.props.center,
	                    angleDeg: this.props.angleDeg
	                });
	            },
	            render: function render() {
	                var _this3 = this;
	                var InputComponent = inputComponentForApiOptions(this.props.apiOptions);
	                var point = [ React.createElement(TeX, null, "("), React.createElement(InputComponent, {
	                    ref: "centerX",
	                    placeholder: 0,
	                    value: this.state.center[0],
	                    useArrowKeys: true,
	                    onChange: function onChange(val0) {
	                        var val1 = _this3.state.center[1];
	                        _this3.setState({
	                            center: [ val0, val1 ]
	                        }, function() {
	                            _this3.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "centerX"),
	                    onBlur: _.partial(this.props.onBlur, "centerX"),
	                    keypadElement: this.props.keypadElement
	                }), React.createElement(TeX, null, ", {}"), React.createElement(InputComponent, {
	                    ref: "centerY",
	                    placeholder: 0,
	                    value: this.state.center[1],
	                    useArrowKeys: true,
	                    onChange: function onChange(val1) {
	                        var val0 = _this3.state.center[0];
	                        _this3.setState({
	                            center: [ val0, val1 ]
	                        }, function() {
	                            _this3.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "centerY"),
	                    onBlur: _.partial(this.props.onBlur, "centerY"),
	                    keypadElement: this.props.keypadElement
	                }), React.createElement(TeX, null, ")") ];
	                var degrees = [ React.createElement(InputComponent, {
	                    ref: "angleDeg",
	                    placeholder: 0,
	                    value: this.state.angleDeg,
	                    useArrowKeys: true,
	                    onChange: function onChange(val) {
	                        _this3.setState({
	                            angleDeg: val
	                        }, function() {
	                            _this3.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "angleDeg"),
	                    onBlur: _.partial(this.props.onBlur, "angleDeg"),
	                    keypadElement: this.props.keypadElement
	                }), DEGREE_SIGN ];
	                // I18N: %(point)s must come before %(degrees)s in this phrase
	                var text = $_({
	                    point: point,
	                    degrees: degrees
	                }, "Rotation about %(point)s by %(degrees)s");
	                return React.createElement("div", null, text);
	            },
	            value: function value() {
	                return {
	                    angleDeg: this.refs.angleDeg.getValue(),
	                    center: [ this.refs.centerX.getValue(), this.refs.centerY.getValue() ]
	                };
	            },
	            /* InputPath API */
	            setInputValue: function setInputValue(path, value, cb) {
	                var _this4 = this;
	                var id = _.first(path);
	                var angleDeg = _.clone(this.state.angleDeg);
	                var center = _.clone(this.state.center);
	                "angleDeg" === id ? angleDeg = value : "centerX" === id ? center[0] = value : "centerY" === id && (center[1] = value);
	                this.setState({
	                    angleDeg: angleDeg,
	                    center: center
	                }, function() {
	                    _this4.props.onChange(cb);
	                });
	            },
	            getInputPaths: function getInputPaths() {
	                return [ [ "centerX" ], [ "centerY" ], [ "angleDeg" ] ];
	            }
	        })
	    },
	    reflection: {
	        // I18N: As in the command, "Reflect the polygon"
	        verbName: i18n._("Reflect"),
	        nounName: i18n._("Reflection"),
	        lowerNounName: i18n._("reflection"),
	        apply: function apply(transform) {
	            return function(coord) {
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
	            if (!kline.equal(transform1.line, transform2.line)) return false;
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
	                    line: this.props.line || [ [ null, null ], [ null, null ] ]
	                };
	            },
	            componentDidUpdate: function componentDidUpdate(prevProps) {
	                deepEq(this.props, prevProps) || this.setState({
	                    line: this.props.line
	                });
	            },
	            render: function render() {
	                var InputComponent = inputComponentForApiOptions(this.props.apiOptions);
	                var point1 = [ React.createElement(TeX, null, "("), React.createElement(InputComponent, {
	                    ref: "x1",
	                    value: this.state.line[0][0],
	                    useArrowKeys: true,
	                    onChange: this.changePoint.bind(this, 0, 0),
	                    onFocus: _.partial(this.props.onFocus, "x1"),
	                    onBlur: _.partial(this.props.onBlur, "x1"),
	                    keypadElement: this.props.keypadElement
	                }), React.createElement(TeX, null, ", {}"), React.createElement(InputComponent, {
	                    ref: "y1",
	                    value: this.state.line[0][1],
	                    useArrowKeys: true,
	                    onChange: this.changePoint.bind(this, 0, 1),
	                    onFocus: _.partial(this.props.onFocus, "y1"),
	                    onBlur: _.partial(this.props.onBlur, "y1"),
	                    keypadElement: this.props.keypadElement
	                }), React.createElement(TeX, null, ")") ];
	                var point2 = [ React.createElement(TeX, null, "("), React.createElement(InputComponent, {
	                    ref: "x2",
	                    value: this.state.line[1][0],
	                    useArrowKeys: true,
	                    onChange: this.changePoint.bind(this, 1, 0),
	                    onFocus: _.partial(this.props.onFocus, "x2"),
	                    onBlur: _.partial(this.props.onBlur, "x2"),
	                    keypadElement: this.props.keypadElement
	                }), React.createElement(TeX, null, ", {}"), React.createElement(InputComponent, {
	                    ref: "y2",
	                    value: this.state.line[1][1],
	                    useArrowKeys: true,
	                    onChange: this.changePoint.bind(this, 1, 1),
	                    onFocus: _.partial(this.props.onFocus, "y2"),
	                    onBlur: _.partial(this.props.onBlur, "y2"),
	                    keypadElement: this.props.keypadElement
	                }), React.createElement(TeX, null, ")") ];
	                return React.createElement("div", null, $_({
	                    point1: point1,
	                    point2: point2
	                }, "Reflection over the line from %(point1)s to %(point2)s"));
	            },
	            changePoint: function changePoint(i, j, val, cb) {
	                var _this5 = this;
	                var line = _.map(this.state.line, _.clone);
	                line[i][j] = val;
	                this.setState({
	                    line: line
	                }, function() {
	                    _this5.props.onChange(cb);
	                });
	            },
	            value: function value() {
	                return {
	                    line: [ [ this.refs.x1.getValue(), this.refs.y1.getValue() ], [ this.refs.x2.getValue(), this.refs.y2.getValue() ] ]
	                };
	            },
	            /* InputPath API */
	            setInputValue: function setInputValue(path, value, cb) {
	                var id = _.first(path);
	                var j;
	                "x" === id[0] ? j = 0 : "y" === id[0] && (j = 1);
	                var i;
	                "1" === id[1] ? i = 0 : "2" === id[1] && (i = 1);
	                this.changePoint(i, j, value, cb);
	            },
	            getInputPaths: function getInputPaths() {
	                return [ [ "x1" ], [ "y1" ], [ "x2" ], [ "y2" ] ];
	            }
	        })
	    },
	    dilation: {
	        // I18N: As in the command, "Dilate the polygon"
	        verbName: i18n._("Dilate"),
	        nounName: i18n._("Dilation"),
	        lowerNounName: i18n._("dilation"),
	        apply: function apply(transform) {
	            return function(coord) {
	                return dilatePointFromCenter(coord, transform.center, transform.scale);
	            };
	        },
	        isValid: function isValid(transform) {
	            return _.isFinite(transform.scale) && _.isFinite(transform.center[0]) && _.isFinite(transform.center[1]);
	        },
	        isEmpty: function isEmpty(transform) {
	            return null === transform.scale && null === transform.center[0] && null === transform.center[1];
	        },
	        isNoOp: function isNoOp(transform) {
	            return knumber.equal(transform.scale, 1);
	        },
	        collapse: function collapse(transform1, transform2) {
	            if (!kpoint.equal(transform1.center, transform2.center)) return false;
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
	                    center: this.props.center || [ null, null ],
	                    scale: this.props.scale || null
	                };
	            },
	            componentDidUpdate: function componentDidUpdate(prevProps) {
	                deepEq(this.props, prevProps) || this.setState({
	                    center: this.props.center,
	                    scale: this.props.scale
	                });
	            },
	            render: function render() {
	                var _this6 = this;
	                var InputComponent = inputComponentForApiOptions(this.props.apiOptions);
	                var point = [ React.createElement(TeX, null, "("), React.createElement(InputComponent, {
	                    ref: "x",
	                    placeholder: 0,
	                    value: this.state.center[0],
	                    useArrowKeys: true,
	                    onChange: function onChange(val0) {
	                        var val1 = _this6.state.center[1];
	                        _this6.setState({
	                            center: [ val0, val1 ]
	                        }, function() {
	                            _this6.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "x"),
	                    onBlur: _.partial(this.props.onBlur, "x"),
	                    keypadElement: this.props.keypadElement
	                }), React.createElement(TeX, null, ", {}"), React.createElement(InputComponent, {
	                    ref: "y",
	                    placeholder: 0,
	                    value: this.state.center[1],
	                    useArrowKeys: true,
	                    onChange: function onChange(val1) {
	                        var val0 = _this6.state.center[0];
	                        _this6.setState({
	                            center: [ val0, val1 ]
	                        }, function() {
	                            _this6.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "y"),
	                    onBlur: _.partial(this.props.onBlur, "y"),
	                    keypadElement: this.props.keypadElement
	                }), React.createElement(TeX, null, ")") ];
	                var scale = React.createElement(InputComponent, {
	                    ref: "scale",
	                    placeholder: 1,
	                    value: this.state.scale,
	                    useArrowKeys: true,
	                    onChange: function onChange(val) {
	                        _this6.setState({
	                            scale: val
	                        }, function() {
	                            _this6.props.onChange();
	                        });
	                    },
	                    onFocus: _.partial(this.props.onFocus, "scale"),
	                    onBlur: _.partial(this.props.onBlur, "scale"),
	                    keypadElement: this.props.keypadElement
	                });
	                return React.createElement("div", null, $_({
	                    point: point,
	                    scale: scale
	                }, "Dilation about %(point)s by %(scale)s"));
	            },
	            value: function value() {
	                return {
	                    scale: this.refs.scale.getValue(),
	                    center: [ this.refs.x.getValue(), this.refs.y.getValue() ]
	                };
	            },
	            /* InputPath API */
	            setInputValue: function setInputValue(path, value, cb) {
	                var _this7 = this;
	                var id = _.first(path);
	                var scale = this.state.scale;
	                var center = _.clone(this.state.center);
	                "x" === id ? center[0] = value : "y" === id ? center[1] = value : "scale" === id && (scale = value);
	                this.setState({
	                    scale: scale,
	                    center: center
	                }, function() {
	                    _this7.props.onChange(cb);
	                });
	            },
	            getInputPaths: function getInputPaths() {
	                return [ [ "x" ], [ "y" ], [ "scale" ] ];
	            }
	        })
	    }
	};

	/* Various functions to deal with different shape types */
	var ShapeTypes = {
	    getPointCountForType: function getPointCountForType(type) {
	        var splitType = type.split("-");
	        if ("polygon" === splitType[0]) return splitType[1] || 3;
	        if ("line" === splitType[0] || "lineSegment" === splitType[0]) return 2;
	        if ("angle" === splitType[0]) return 3;
	        if ("circle" === splitType[0]) return 2;
	        if ("point" === splitType[0]) return 1;
	    },
	    addMovableShape: function addMovableShape(graphie, options) {
	        if (options.editable && options.translatable) throw new Error("It doesn't make sense to have a movable shape where you can stretch the points and translate them simultaneously. options: " + JSON.stringify(options));
	        var shape;
	        var points = _.map(options.shape.coords, function(coord) {
	            var currentPoint;
	            var isMoving = false;
	            var previousCoord = coord;
	            var onMove = function onMove(x, y) {
	                if (!isMoving) {
	                    previousCoord = currentPoint.coord;
	                    isMoving = true;
	                }
	                var moveVector = kvector.subtract([ x, y ], currentPoint.coord);
	                // Translate from (x, y) semantics to (dX, dY) semantics
	                // This is more useful for translations on multiple points,
	                // where we care about how the points moved, not where any
	                // individual point ended up
	                options.onMove && (moveVector = options.onMove(moveVector[0], moveVector[1]));
	                // Perform a translation on all points in this shape when
	                // any point moves
	                options.translatable && _.each(points, function(point) {
	                    // The point itself will be updated by the
	                    // movablePoint class, so only translate the other
	                    // points
	                    point !== currentPoint && point.setCoord(kvector.add(point.coord, moveVector));
	                });
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
	                bounded: false,
	                // Don't bound it when placing it on the graph
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
	        shape.remove = function() {
	            removeShapeWithoutPoints.apply(shape);
	            _.invoke(points, "remove");
	        };
	        return shape;
	    },
	    addShape: function addShape(graphie, options, points) {
	        points = points || options.shape.coords;
	        var types = ShapeTypes._typesOf(options.shape);
	        var typeOptions = options.shape.options || ShapeTypes.defaultOptions(types);
	        var shapes = ShapeTypes._mapTypes(types, points, function(type, points, i) {
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
	            return _.map(shapes, function(shape) {
	                return shape.getOptions ? shape.getOptions() : {};
	            });
	        };
	        return {
	            type: types,
	            points: points,
	            update: update,
	            remove: remove,
	            toJSON: function toJSON() {
	                var coords = _.map(points, function(pt) {
	                    return _.isArray(pt) ? pt : pt.coord;
	                });
	                return {
	                    type: types,
	                    coords: coords,
	                    options: getOptions()
	                };
	            },
	            getOptions: getOptions
	        };
	    },
	    equal: function equal(shape1, shape2) {
	        var types1 = ShapeTypes._typesOf(shape1);
	        var types2 = ShapeTypes._typesOf(shape2);
	        if (types1.length !== types2.length) return false;
	        var shapes1 = ShapeTypes._mapTypes(types1, shape1.coords, ShapeTypes._combine);
	        var shapes2 = ShapeTypes._mapTypes(types2, shape2.coords, ShapeTypes._combine);
	        return _.all(_.map(shapes1, function(partialShape1, i) {
	            var partialShape2 = shapes2[i];
	            if (partialShape1.type !== partialShape2.type) return false;
	            return ShapeTypes._forType(partialShape1.type).equal(partialShape1.coords, partialShape2.coords);
	        }));
	    },
	    _typesOf: function _typesOf(shape) {
	        var types = shape.type;
	        _.isArray(types) || (types = [ types ]);
	        return _.map(types, function(type) {
	            return "polygon" === type ? "polygon-3" : type;
	        });
	    },
	    defaultOptions: function defaultOptions(types) {
	        return _.map(types, function(type) {
	            var typeDefaultOptions = ShapeTypes._forType(type).defaultOptions;
	            return _.extend({}, typeDefaultOptions);
	        });
	    },
	    _forType: function _forType(type) {
	        var baseType = type.split("-")[0];
	        return ShapeTypes[baseType];
	    },
	    _mapTypes: function _mapTypes(types, points, func, context) {
	        return _.map(types, function(type, i) {
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
	        if ("polygon" === type) {
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
	        }
	        if ("line" === type || "lineSegment" === type) {
	            var line = graphie.addMovableLineSegment(_.extend({}, options, lineCoords, {
	                movePointsWithLine: true,
	                fixed: true,
	                constraints: {
	                    fixed: true
	                },
	                extendLine: "line" === type
	            }));
	            // TODO(jack): Hide points on uneditable lines when translation
	            // is a vector.
	            // We can't just remove the points yet, because they are the
	            // translation handle for the line.
	            return {
	                update: line.transform.bind(line, true),
	                remove: line.remove.bind(line)
	            };
	        }
	        if ("angle" === type) {
	            // If this angle is editable, we want to be able to make angles
	            // both larger and smaller than 180 degrees.
	            // If this angle is not editable, it should always maintain
	            // it's angle measure, even if it is reflected (causing the
	            // clockwise-ness of the points to change)
	            var shouldChangeReflexivity = !!options.editable && null;
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
	        }
	        if ("circle" === type) {
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
	            points[1].remove && !options.editable && points[1].remove();
	            return {
	                update: redrawPerim,
	                remove: function remove() {
	                    // Not _.bind because the remove function changes
	                    // when the perimeter is redrawn
	                    perimeter.remove();
	                }
	            };
	        }
	        if ("point" === type) // do nothing
	        return {
	            update: null,
	            remove: null
	        };
	        throw new Error("Invalid shape type " + type);
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
	            if (!kpoint.equal(points1[1], points2[1])) return false;
	            var line1_0 = [ points1[1], points1[0] ];
	            var line1_2 = [ points1[1], points1[2] ];
	            var line2_0 = [ points2[1], points2[0] ];
	            var line2_2 = [ points2[1], points2[2] ];
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
	        if ("static" === this.props.mode) return React.createElement("span", null);
	        var transformationList = _.map(this.props.transformations, function(transform, i) {
	            return React.createElement(TransformationListItem, {
	                ref: "transformation" + i,
	                key: "transformation" + i,
	                transform: transform,
	                mode: this.props.mode,
	                onChange: this.handleChange,
	                onFocus: _.partial(this.props.onFocus, "" + i),
	                onBlur: _.partial(this.props.onBlur, "" + i),
	                keypadElement: this.props.keypadElement,
	                apiOptions: this.props.apiOptions
	            });
	        }, this);
	        return React.createElement("div", {
	            className: "perseus-transformation-list"
	        }, transformationList);
	    },
	    _transformationRefs: function _transformationRefs() {
	        var _this8 = this;
	        return _.times(this.props.transformations.length, function(i) {
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
	        0 !== transformationRefs.length && _.last(transformationRefs).focus();
	    }
	});

	var ToolButton = React.createClass({
	    displayName: "ToolButton",
	    render: function render() {
	        var classes = this.props.toggled ? "simple-button exercise-orange toggled highlighted-tool-button" : "simple-button";
	        return React.createElement("button", {
	            type: "button",
	            className: classes,
	            disabled: this.props.disabled,
	            onClick: this.props.onClick,
	            onTouchStart: captureScratchpadTouchStart
	        }, this.props.children);
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
	        var tools = _.map(Transformations, function(tool, type) {
	            if (this.props.enabled[type]) return React.createElement(ToolButton, {
	                key: type,
	                disabled: this.props.apiOptions.readOnly,
	                toggled: this.state.selected === type,
	                onClick: this.changeSelected.bind(this, type)
	            }, tool.verbName);
	        }, this);
	        return React.createElement("div", {
	            className: "transformer-tools-bar"
	        }, React.createElement("span", {
	            className: "simple-button-group"
	        }, tools), React.createElement("button", {
	            className: "transformer-undo-button simple-button",
	            type: "button",
	            disabled: this.props.apiOptions.readOnly,
	            onClick: this.props.onUndoClick,
	            onTouchStart: captureScratchpadTouchStart
	        }, React.createElement(InlineIcon, iconUndo), " ", "Undo"), React.createElement("div", {
	            className: "clear"
	        }));
	    },
	    changeSelected: function changeSelected(tool) {
	        this.props.removeTool(this.state.selected);
	        if (tool && tool !== this.state.selected) {
	            this.props.addTool(tool);
	            this.setState({
	                selected: tool
	            });
	        } else this.setState({
	            selected: null
	        });
	    }
	});

	var AddTransformBar = React.createClass({
	    displayName: "AddTransformBar",
	    render: function render() {
	        var tools = _.map(Transformations, function(tool, type) {
	            if (this.props.enabled[type]) return React.createElement(ToolButton, {
	                key: type,
	                toggled: false,
	                disabled: this.props.apiOptions.readOnly,
	                onClick: this.changeSelected.bind(this, type)
	            }, React.createElement(InlineIcon, iconPlus), " ", tool.nounName);
	        }, this);
	        return React.createElement("div", {
	            className: "transformer-tools-bar"
	        }, tools, React.createElement("button", {
	            className: "transformer-undo-button simple-button",
	            type: "button",
	            onClick: this.props.onUndoClick,
	            disabled: this.props.apiOptions.readOnly,
	            onTouchStart: captureScratchpadTouchStart
	        }, React.createElement(InlineIcon, iconUndo), " ", "Undo"), React.createElement("div", {
	            className: "clear"
	        }));
	    },
	    changeSelected: function changeSelected(tool) {
	        tool && this.props.addTool(tool);
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
	        var interactiveToolsMode = "interactive" === this.props.graphMode;
	        var ToolsBarClass = interactiveToolsMode ? ToolsBar : AddTransformBar;
	        // This style is applied inline because it is dependent on the
	        // size of the graph as set by the graph.box prop, and this also
	        // lets us specify it in the same place the graph's width is
	        // specified.
	        var toolsBar = React.createElement("div", {
	            style: {
	                width: graph.box[0]
	            }
	        }, React.createElement(ToolsBarClass, {
	            ref: "toolsBar",
	            enabled: pluckObject(this.props.tools, "enabled"),
	            apiOptions: this.props.apiOptions,
	            addTool: this.addTool,
	            removeTool: this.removeTool,
	            onUndoClick: this.handleUndoClick
	        }));
	        return React.createElement("div", {
	            className: "perseus-widget perseus-widget-transformer"
	        }, React.createElement(Graph, {
	            ref: "graph",
	            box: graph.box,
	            range: graph.range,
	            labels: graph.labels,
	            step: graph.step,
	            gridStep: graph.gridStep,
	            markings: graph.markings,
	            backgroundImage: graph.backgroundImage,
	            showProtractor: graph.showProtractor,
	            onGraphieUpdated: this.setupGraphie,
	            setDrawingAreaAvailable: this.props.apiOptions.setDrawingAreaAvailable
	        }), !interactiveToolsMode && "Add transformations below:", "static" === this.props.graphMode && [ React.createElement("br", {
	            key: "static-br"
	        }), React.createElement("em", {
	            key: "static-nomove"
	        }, " ", "Note: For this question, the shape will not move.", " ") ], interactiveToolsMode && toolsBar, React.createElement(TransformationList, {
	            ref: "transformationList",
	            mode: this.props.listMode,
	            transformations: this.props.transformations,
	            onChange: this.setTransformationProps,
	            onFocus: this._handleFocus,
	            onBlur: this._handleBlur,
	            keypadElement: this.props.keypadElement,
	            apiOptions: this.props.apiOptions
	        }), !interactiveToolsMode && toolsBar);
	    },
	    componentDidMount: function componentDidMount() {
	        this.setupGraphie(this.graphie());
	    },
	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        this.shouldSetupGraphie(this.props, prevProps) ? this.refs.graph.reset() : deepEq(this.props.transformations, this.transformations) || this.setTransformations(this.props.transformations);
	    },
	    shouldSetupGraphie: function shouldSetupGraphie(nextProps, prevProps) {
	        return !deepEq(prevProps.starting, nextProps.starting) || (prevProps.graphMode !== nextProps.graphMode || (prevProps.listMode !== nextProps.listMode || (prevProps.drawSolutionShape !== nextProps.drawSolutionShape || (!(!nextProps.drawSolutionShape || deepEq(prevProps.correct.shape, nextProps.correct.shape)) || !deepEq(this.tools, nextProps.tools)))));
	    },
	    graphie: function graphie() {
	        return this.refs.graph.graphie();
	    },
	    setupGraphie: function setupGraphie(graphie) {
	        // A background image of our solution:
	        this.props.drawSolutionShape && this.props.correct.shape && this.props.correct.shape.coords && ShapeTypes.addShape(graphie, {
	            fixed: true,
	            shape: this.props.correct.shape,
	            normalStyle: {
	                stroke: KhanColors.GRAY,
	                "stroke-dasharray": "",
	                "stroke-width": 2
	            }
	        });
	        this.currentTool = null;
	        this.refs.toolsBar.changeSelected(null);
	        this.addTransformerShape(this.props.starting.shape, /* translatable */
	        false);
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
	            showPoints: "static" !== this.props.graphMode,
	            translatable: translatable,
	            onMove: function onMove(dX, dY) {
	                dX = KhanMath.roundToNearest(graphie.snap[0], dX);
	                dY = KhanMath.roundToNearest(graphie.snap[1], dY);
	                self.addTransform({
	                    type: "translation",
	                    vector: [ dX, dY ]
	                });
	                return [ dX, dY ];
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
	        if ("interactive" === this.props.graphMode) if ("translation" === toolId) this.currentTool = this.addTranslationTool(); else if ("rotation" === toolId) this.currentTool = this.addRotationTool(); else if ("reflection" === toolId) this.currentTool = this.addReflectionTool(); else {
	            if ("dilation" !== toolId) throw new Error("Invalid tool id: " + toolId);
	            this.currentTool = this.addDilationTool();
	        } else {
	            var transform;
	            if ("translation" === toolId) transform = {
	                type: toolId,
	                vector: [ null, null ]
	            }; else if ("rotation" === toolId) transform = {
	                type: toolId,
	                center: [ null, null ],
	                angleDeg: null
	            }; else if ("reflection" === toolId) // Reflections with nulls in them won't be applied until
	            // fills in the blanks
	            transform = {
	                type: toolId,
	                line: [ [ null, null ], [ null, null ] ]
	            }; else {
	                if ("dilation" !== toolId) throw new Error("Invalid tool id: " + toolId);
	                transform = {
	                    type: toolId,
	                    center: [ null, null ],
	                    scale: null
	                };
	            }
	            this.doTransform(transform, function() {
	                self.refs.transformationList.focusLast();
	            });
	        }
	    },
	    removeTool: function removeTool(toolId) {
	        this.currentTool && this.currentTool.remove();
	        this.currentTool = null;
	    },
	    addTranslationTool: function addTranslationTool() {
	        var self = this;
	        this.shape.remove();
	        this.addTransformerShape(this.shape.toJSON(), /* translatable */
	        true);
	        return {
	            remove: function remove() {
	                self.shape.remove();
	                self.addTransformerShape(self.shape.toJSON(), /* translatable */
	                false);
	            }
	        };
	    },
	    // Snaps a coord to this.graphie()'s snap
	    snapCoord: function snapCoord(coord) {
	        var graphie = this.graphie();
	        return _.map(coord, function(val, dim) {
	            return KhanMath.roundToNearest(graphie.snap[dim], val);
	        });
	    },
	    // Normalize the coords into something that fits the new 45 degree
	    // reflection line.
	    normalizeReflectionCoords: function normalizeReflectionCoords(messyCoords) {
	        var midpoint = this.snapCoord(kline.midpoint(messyCoords));
	        var origDirectionPolar = kvector.polarDegFromCart(kvector.subtract(messyCoords[0], messyCoords[1]));
	        var directionPolar = [ 1, KhanMath.roundToNearest(45, origDirectionPolar[1]) ];
	        var direction = kvector.cartFromPolarDeg(directionPolar);
	        return _.map([ -1, 1 ], function(directionCoefficient) {
	            var coord = kvector.add(midpoint, kvector.scale(direction, directionCoefficient * this.scaleToCurrentRange(REFLECT_ROTATE_HANDLE_DIST)));
	            return this.snapCoord(coord);
	        }, this);
	    },
	    addReflectionTool: function addReflectionTool() {
	        var options = this.props.tools.reflection;
	        if (!options.enabled) return;
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
	        var reflectPoints = _.map(coords, function(coord) {
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
	        graphie.style({}, function() {
	            reflectLine = graphie.addMovableLineSegment({
	                fixed: options.constraints.fixed,
	                constraints: options.constraints,
	                pointA: reflectPoints[0],
	                pointZ: reflectPoints[1],
	                snapX: graphie.snap[0],
	                snapY: graphie.snap[1],
	                extendLine: true,
	                normalStyle: {
	                    stroke: normalColor,
	                    "stroke-width": 2,
	                    "stroke-dasharray": "- "
	                },
	                highlightStyle: {
	                    stroke: KhanColors.INTERACTING,
	                    "stroke-width": 2,
	                    "stroke-dasharray": "- "
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
	            var initRotateHandleAngle = kvector.polarDegFromCart(kvector.subtract(reflectPoints[1].coord, reflectPoints[0].coord))[1] + 90;
	            // 90 degrees off of the line
	            reflectRotateHandle = graphie.addRotateHandle({
	                center: reflectButton,
	                radius: this.scaleToCurrentRange(REFLECT_ROTATE_HANDLE_DIST),
	                angleDeg: initRotateHandleAngle,
	                width: this.scaleToCurrentRange(.24),
	                hoverWidth: this.scaleToCurrentRange(.4),
	                lengthAngle: 17,
	                onMove: function onMove(newAngle) {
	                    return KhanMath.roundToNearest(45, newAngle);
	                },
	                onMoveEnd: updateReflectionTool
	            });
	        }
	        // Move the reflectButton and reflectRotateHandle with the line
	        $(reflectLine).on("move", function() {
	            reflectButton.update();
	            $(reflectButton).trigger("move");
	        });
	        // Update the line and reflect button when the reflectRotateHandle is
	        // rotated
	        reflectRotateHandle && $(reflectRotateHandle).on("move", function() {
	            var rotateHandleApprox = self.snapCoord(reflectRotateHandle.coord);
	            var rotateVector = kvector.subtract(rotateHandleApprox, reflectButton.coord);
	            var flipped = reflectButton.isFlipped() ? 1 : 0;
	            reflectPoints[flipped].setCoord(kvector.add(reflectButton.coord, kvector.rotateDeg(rotateVector, 90)));
	            reflectPoints[1 - flipped].setCoord(kvector.add(reflectButton.coord, kvector.rotateDeg(rotateVector, -90)));
	            reflectLine.transform(true);
	            reflectButton.update();
	        });
	        return {
	            remove: function remove() {
	                reflectButton.remove();
	                reflectRotateHandle && reflectRotateHandle.remove();
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
	        if (!options.enabled) return;
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
	            normalStyle: {
	                // ugh, this seems to be a global and
	                "stroke-dasharray": "",
	                // is set to dash above
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
	            width: this.scaleToCurrentRange(.24),
	            hoverWidth: this.scaleToCurrentRange(.4),
	            onMove: function onMove(newAngle, oldAngle) {
	                var transform = self.getRotationTransformFromAngle(self.rotatePoint.coord, newAngle - oldAngle);
	                // Rotate polygon with rotateHandle
	                self.doTransform(transform);
	                return oldAngle + transform.angleDeg;
	            }
	        });
	        // Update tools.rotation.coord
	        this.rotatePoint.onMoveEnd = function(x, y) {
	            self.changeTool("rotation", {
	                coord: [ x, y ]
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
	        if (!options.enabled) return;
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
	            snapRadius: self.scaleToCurrentRange(.5),
	            onResize: function onResize(newRadius, oldRadius) {
	                self.doTransform({
	                    type: "dilation",
	                    center: self.dilationCircle.centerPoint.coord,
	                    scale: newRadius / oldRadius
	                });
	            },
	            circleNormalStyle: {
	                stroke: pointColor,
	                "stroke-width": 2,
	                "stroke-dasharray": "- ",
	                "fill-opacity": 0
	            },
	            circleHighlightStyle: {
	                stroke: KhanColors.INTERACTING,
	                "stroke-width": 2,
	                "stroke-dasharray": "",
	                fill: KhanColors.INTERACTING,
	                "fill-opacity": .05
	            },
	            centerNormalStyle: {
	                stroke: pointColor,
	                fill: pointColor,
	                "stroke-width": 2,
	                "stroke-dasharray": ""
	            },
	            centerHighlightStyle: {
	                stroke: pointColor,
	                fill: pointColor,
	                "stroke-width": 2,
	                "stroke-dasharray": ""
	            }
	        });
	        var origOnMoveEnd = this.dilationCircle.centerPoint.onMoveEnd;
	        this.dilationCircle.centerPoint.onMoveEnd = function() {
	            origOnMoveEnd && origOnMoveEnd.apply(this, _.toArray(arguments));
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
	        angleChanged > 180 && (angleChanged -= 360);
	        return {
	            type: "rotation",
	            center: center,
	            angleDeg: Math.round(angleChanged / ROTATE_SNAP_DEGREES) * ROTATE_SNAP_DEGREES
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
	        if ("static" !== this.props.graphMode) {
	            var transformFunc = TransformOps.apply(transform);
	            this.applyCoordTransformation(transformFunc);
	        }
	    },
	    // transform our polygon by transforming each point using a given function
	    applyCoordTransformation: function applyCoordTransformation(pointTransform) {
	        _.each(this.shape.points, function(point) {
	            var newCoord = pointTransform(point.coord);
	            point.setCoord(newCoord);
	        });
	        this.shape.update();
	    },
	    resetCoords: function resetCoords() {
	        var startCoords = this.props.starting.shape.coords;
	        _.each(this.shape.points, function(point, i) {
	            point.setCoord(startCoords[i]);
	        });
	        this.shape.update();
	    },
	    // Remove the last transformation
	    handleUndoClick: function handleUndoClick() {
	        this.refs.toolsBar.changeSelected(null);
	        this.props.transformations.length && this.props.onChange({
	            transformations: _.initial(this.props.transformations)
	        });
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
	        return _.reduce(transforms, function(coords, transform) {
	            return _.map(coords, TransformOps.apply(transform));
	        }, startCoords);
	    },
	    getEditorJSON: function getEditorJSON() {
	        var json = _.pick(this.props, "grading", "starting", "graphMode", "listMode", "tools", "drawSolutionShape", "gradeEmpty");
	        json.graph = this.refs.graph.toJSON();
	        json.version = 1.2;
	        // Give us some safety to change the format
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
	        var refPath = [ "transformationList", "transformation" + transformationID ];
	        // Follow the path of references
	        var component = this;
	        _.each(refPath, function(ref) {
	            component = component.refs[ref];
	        });
	        return component;
	    },
	    getInputPaths: function getInputPaths() {
	        var _this9 = this;
	        // If we're in static mode, then there is no transformation list, and,
	        // as a result, no input paths.
	        if ("static" === this.props.listMode) return [];
	        var inputPaths = [];
	        _.each(this.props.transformations, function(transformation, i) {
	            var transformation = _this9._getTransformationForID(i);
	            var innerPaths = transformation.getInputPaths();
	            var fullPaths = _.map(innerPaths, function(innerPath) {
	                return [ "" + i ].concat(innerPath);
	            });
	            inputPaths = inputPaths.concat(fullPaths);
	        });
	        return inputPaths;
	    },
	    _passToInner: function _passToInner(functionName, path) {
	        if (!path || !path.length) return;
	        // First argument tells us which transformation will receive the call;
	        // remaining arguments are used within that transformation to identify
	        // a specific input.
	        var innerPath = _.rest(path);
	        var args = [ innerPath ].concat(_.rest(arguments, 2));
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
	        if (0 === path.length) return false;
	        assert(path.length >= 2);
	        return this._passToInner("focusInputPath", path);
	    },
	    blurInputPath: function blurInputPath(path) {
	        // Since the transformer exposes the input API, it needs to be robust
	        // to empty paths (which indicate a blurring of the entire widget,
	        // e.g., when switching from interacting with the transformer to
	        // interacting with some other widget).
	        if (0 === path.length) return false;
	        assert(path.length >= 2);
	        return this._passToInner("blurInputPath", path);
	    },
	    setInputValue: function setInputValue(path, value, cb) {
	        assert(path.length >= 2);
	        return this._passToInner("setInputValue", path, value, cb);
	    },
	    getDOMNodeForPath: function getDOMNodeForPath(path) {
	        assert(path.length >= 2);
	        return this._passToInner("getDOMNodeForPath", path);
	    },
	    getGrammarTypeForPath: function getGrammarTypeForPath(path) {
	        assert(path.length >= 2);
	        return this._passToInner("getGrammarTypeForPath", path);
	    }
	});

	_.extend(Transformer, {
	    validate: function validate(guess, rubric) {
	        // Check for any required transformations
	        for (var type in Transformations) if (rubric.tools[type].required) {
	            var isUsed = _.any(_.map(guess.transformations, function(transform) {
	                // Required transformations must appear in the
	                // transformation list, and must not be no-ops
	                return transform.type === type && !TransformOps.isEmpty(transform) && !TransformOps.isNoOp(transform);
	            }));
	            if (!isUsed) return {
	                type: "invalid",
	                message: i18n._("Your transformation must use a %(type)s.", {
	                    type: Transformations[type].lowerNounName
	                })
	            };
	        }
	        // Compare shapes
	        // Compare shapes
	        return ShapeTypes.equal(guess.shape, rubric.correct.shape) ? {
	            type: "points",
	            earned: 1,
	            total: 1,
	            message: null
	        } : !rubric.gradeEmpty && deepEq(guess.shape.coords, rubric.starting.shape.coords) ? {
	            type: "invalid",
	            message: i18n._("Use the interactive graph to define a correct transformation.")
	        } : {
	            type: "points",
	            earned: 0,
	            total: 1,
	            message: null
	        };
	    }
	});

	module.exports = {
	    name: "transformer",
	    displayName: "Transformer",
	    widget: Transformer
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, no-redeclare, no-undef, no-unused-vars, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	// TODO(joel): teach KAS how to accept an answer only if it's expressed in
	// terms of a certain type.
	// TODO(joel): Allow sigfigs within a range rather than an exact expected
	// value?
	var lens = __webpack_require__(124);

	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var ApiClassNames = __webpack_require__(18).ClassNames;

	var ApiOptions = __webpack_require__(18).Options;

	var Changeable = __webpack_require__(88);

	var MathOutput = __webpack_require__(116);

	var _require = __webpack_require__(122), SignificantFigures = _require.SignificantFigures, displaySigFigs = _require.displaySigFigs;

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
	    propTypes: _extends({}, Changeable.propTypes, {
	        value: React.PropTypes.string
	    }),
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
	        return React.createElement("div", {
	            className: "old-unit-input"
	        }, input, React.createElement("div", {
	            ref: "error",
	            className: "error",
	            style: {
	                display: "none"
	            }
	        }, i18n._("I don't understand that")));
	    },
	    _errorTimeout: null,
	    _showError: function _showError() {
	        if ("" === this.props.value) return;
	        var $error = $(ReactDOM.findDOMNode(this.refs.error));
	        $error.is(":visible") || $error.css({
	            top: 50,
	            opacity: .1
	        }).show().animate({
	            top: 0,
	            opacity: 1
	        }, 300);
	    },
	    _hideError: function _hideError() {
	        var $error = $(ReactDOM.findDOMNode(this.refs.error));
	        $error.is(":visible") && $error.animate({
	            top: 50,
	            opacity: .1
	        }, 300, function() {
	            $(this).hide();
	        });
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        clearTimeout(this._errorTimeout);
	        KAS.unitParse(this.props.value).parsed ? this._hideError() : this._errorTimeout = setTimeout(this._showError, 2e3);
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        clearTimeout(this._errorTimeout);
	    },
	    handleBlur: function handleBlur() {
	        this.props.onBlur([]);
	        clearTimeout(this._errorTimeout);
	        KAS.unitParse(this.props.value).parsed || this._showError();
	    },
	    handleChange: function handleChange(event) {
	        this._hideError();
	        this.props.onChange({
	            value: event.target.value
	        });
	    },
	    simpleValidate: function simpleValidate(rubric, onInputError) {
	        onInputError = onInputError || function() {};
	        return OldUnitInput.validate(this.getUserInput(), rubric);
	    },
	    getUserInput: function getUserInput() {
	        return this.props.value;
	    },
	    // begin mobile stuff
	    getInputPaths: function getInputPaths() {
	        // The widget itself is an input, so we return a single empty list to
	        // indicate this.
	        return [ [] ];
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
	        if (!guess.parsed) return {
	            type: "invalid",
	            message: i18n._("I couldn't understand those units.")
	        };
	        // Note: we check sigfigs, then numerical correctness, then units, so
	        // the most significant things come last, that way the user will see
	        // the most important message.
	        var message = null;
	        // did the user specify the right number of sigfigs?
	        // TODO(joel) - add a grading mode where the wrong number of sigfigs
	        // isn't marked wrong
	        var sigfigs = rubric.sigfigs;
	        var sigfigsCorrect = countSigfigs(guess.coefficient) === sigfigs;
	        sigfigsCorrect || (message = i18n._("Check your significant figures."));
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
	        numericallyCorrect || (message = i18n._("That answer is numerically incorrect."));
	        var kasCorrect;
	        var guessUnit = primUnits(guess.expr.simplify());
	        var answerUnit = primUnits(answer.simplify());
	        // We're accepting all units - KAS does the hard work of figuring
	        // out if the user's unit is equivalent to the author's unit.
	        kasCorrect = rubric.accepting === ALL ? KAS.compare(guessUnit, answerUnit).equal : _(rubric.acceptingUnits).any(function(unit) {
	            var thisAnswerUnit = primUnits(KAS.unitParse(unit).unit.simplify());
	            return KAS.compare(thisAnswerUnit, guessUnit).equal;
	        });
	        if (!kasCorrect) var message = i18n._("Check your units.");
	        return {
	            type: "points",
	            earned: kasCorrect && numericallyCorrect && sigfigsCorrect ? 1 : 0,
	            total: 1,
	            message: message
	        };
	    }
	});

	module.exports = {
	    name: "unit-input",
	    displayName: "Unit",
	    defaultAlignment: "inline-block",
	    widget: OldUnitInput,
	    transform: function transform(x) {
	        return lens(x).del([ "value" ]).freeze();
	    },
	    version: {
	        major: 0,
	        minor: 1
	    },
	    countSigfigs: countSigfigs,
	    sigfigPrint: sigfigPrint,
	    hidden: true
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable no-var */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	/**
	 * This is a video widget for embedding videos in articles.
	 */
	var React = __webpack_require__(11);

	var _ = __webpack_require__(10);

	var Changeable = __webpack_require__(88);

	var FixedToResponsive = __webpack_require__(93);

	// Current default is 720p, based on the typical videos we upload currently
	var DEFAULT_WIDTH = 1280;

	var DEFAULT_HEIGHT = 720;

	var KA_EMBED = "https://{hostname}/embed_video?slug={slug}&internal_video_only=1";

	var IS_URL = /^https?:\/\//;

	var IS_KA_SITE = /khanacademy\.org/;

	/**
	 * Video renderer.
	 */
	var Video = React.createClass({
	    displayName: "Video",
	    propTypes: _extends({}, Changeable.propTypes, {
	        alignment: React.PropTypes.string,
	        location: React.PropTypes.string
	    }),
	    getUserInput: function getUserInput() {
	        return null;
	    },
	    simpleValidate: function simpleValidate(rubric) {
	        return Video.validate(null, rubric);
	    },
	    change: function change() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return Changeable.change.apply(this, args);
	    },
	    render: function render() {
	        var location = this.props.location;
	        if (!location) return React.createElement("div", null);
	        var url;
	        if (IS_URL.test(location)) url = location; else {
	            url = KA_EMBED.replace("{slug}", location);
	            var currentHostname = document.location.hostname;
	            var embedHostname = "www.khanacademy.org";
	            IS_KA_SITE.test(currentHostname) && (embedHostname = currentHostname);
	            url = url.replace("{hostname}", embedHostname);
	        }
	        return React.createElement(FixedToResponsive, {
	            width: DEFAULT_WIDTH,
	            height: DEFAULT_HEIGHT,
	            key: location + this.props.alignment
	        }, React.createElement("iframe", {
	            className: "perseus-video-widget",
	            sandbox: "allow-same-origin allow-scripts",
	            width: DEFAULT_WIDTH,
	            height: DEFAULT_HEIGHT,
	            src: url,
	            allowFullScreen: true
	        }));
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
	    supportedAlignments: [ "block", "float-left", "float-right", "full-width" ],
	    widget: Video
	};

/***/ },
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
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* ButtonGroup is an aesthetically pleasing group of buttons.
	 *
	 * The class requires these properties:
	 *   buttons - an array of objects with keys:
	 *     "value": this is the value returned when the button is selected
	 *     "content": this is the JSX shown within the button, typically a string
	 *         that gets rendered as the button's display text
	 *     "title": this is the title-text shown on hover
	 *   onChange - a function that is provided with the updated value
	 *     (which it then is responsible for updating)
	 *
	 * The class has these optional properties:
	 *   value - the initial value of the button selected, defaults to null.
	 *   allowEmpty - if false, exactly one button _must_ be selected; otherwise
	 *     it defaults to true and _at most_ one button (0 or 1) may be selected.
	 *
	 * Requires stylesheets/perseus-admin-package/editor.less to look nice.
	 */
	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var styles = __webpack_require__(171);

	var css = __webpack_require__(14).css;

	var ButtonGroup = React.createClass({
	    displayName: "ButtonGroup",
	    propTypes: {
	        value: React.PropTypes.any,
	        buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
	            value: React.PropTypes.any.isRequired,
	            content: React.PropTypes.node,
	            title: React.PropTypes.string
	        })).isRequired,
	        onChange: React.PropTypes.func.isRequired,
	        allowEmpty: React.PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: null,
	            allowEmpty: true
	        };
	    },
	    focus: function focus() {
	        ReactDOM.findDOMNode(this).focus();
	        return true;
	    },
	    toggleSelect: function toggleSelect(newValue) {
	        var value = this.props.value;
	        this.props.allowEmpty ? // Select the new button or unselect if it's already selected
	        this.props.onChange(value !== newValue ? newValue : null) : this.props.onChange(newValue);
	    },
	    render: function render() {
	        var _this = this;
	        var value = this.props.value;
	        var buttons = this.props.buttons.map(function(button, i) {
	            return React.createElement("button", {
	                title: button.title,
	                type: "button",
	                id: "" + i,
	                ref: "button" + i,
	                key: "" + i,
	                className: css(styles.button.buttonStyle, button.value === value && styles.button.selectedStyle),
	                onClick: _this.toggleSelect.bind(_this, button.value)
	            }, button.content || "" + button.value);
	        });
	        var outerStyle = {
	            display: "inline-block"
	        };
	        return React.createElement("div", {
	            style: outerStyle
	        }, buttons);
	    }
	});

	module.exports = ButtonGroup;

/***/ },
/* 111 */,
/* 112 */,
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* globals i18n */
	/**
	 * Renders answer bar for mobile graded groups. [STATELESS]
	 */
	var React = __webpack_require__(11);

	var ApiOptions = __webpack_require__(18).Options;

	var InlineIcon = __webpack_require__(89);

	var _require = __webpack_require__(92), iconStar = _require.iconStar, iconTryAgain = _require.iconTryAgain;

	var _require2 = __webpack_require__(37), boldFontFamily = _require2.boldFontFamily, gray68 = _require2.gray68, gray76 = _require2.gray76, gray85 = _require2.gray85, gray95 = _require2.gray95, kaGreen = _require2.kaGreen, phoneMargin = _require2.phoneMargin, negativePhoneMargin = _require2.negativePhoneMargin;

	var ANSWER_BAR_STATES = {
	    // Initial state before the question is answerable.  The user must complete
	    // each of the widgets before the answer bar becomes visible.
	    HIDDEN: Symbol("HIDDEN"),
	    // The 'Check' button is active whenever the question is answerable or any
	    // of the input widgets have been modified after getting the answer wrong.
	    ACTIVE: Symbol("ACTIVE"),
	    // The 'Check' button is disabled and there is no message.  This occurs when
	    // some of the widgets haven't been filled in after the has already become
	    // visible.
	    INACTIVE: Symbol("INACTIVE"),
	    // This happens immediately after clicking 'Check' with a wrong answer.
	    // The 'Check' button is disabled and the 'Try Again' message is displayed.
	    INCORRECT: Symbol("INCORRECT"),
	    // Final state.  This occurs after the user submits the correct answer.
	    // The widgets in this grade-group are disabled.
	    CORRECT: Symbol("CORRECT")
	};

	var GradedGroupAnswerBar = React.createClass({
	    displayName: "GradedGroupAnswerBar",
	    propTypes: {
	        // TODO(kevinb) update to oneOf once we update to 15.2
	        answerBarState: React.PropTypes.any.isRequired,
	        apiOptions: ApiOptions.propTypes,
	        onCheckAnswer: React.PropTypes.func.isRequired,
	        // The function to call when clicking "Next question" after correctly
	        // answering one graded group out of a set. If this is null, the
	        // "Next question" button will not appear.
	        onNextQuestion: React.PropTypes.func
	    },
	    render: function render() {
	        var _props = this.props, apiOptions = _props.apiOptions, answerBarState = _props.answerBarState, onCheckAnswer = _props.onCheckAnswer, onNextQuestion = _props.onNextQuestion;
	        var answerBarStyle = _extends({}, styles.answerBar, {
	            backgroundColor: answerBarState === ANSWER_BAR_STATES.CORRECT ? gray95 : "white",
	            // Center the "Correct!" message only when there's no next question
	            justifyContent: answerBarState !== ANSWER_BAR_STATES.CORRECT || onNextQuestion ? "space-between" : "center"
	        });
	        var buttonStyle = _extends({}, styles.button, {
	            // "Check" and "Next question" buttons should both be green
	            backgroundColor: answerBarState === ANSWER_BAR_STATES.ACTIVE || answerBarState === ANSWER_BAR_STATES.CORRECT ? kaGreen : gray85
	        });
	        var textStyle = _extends({}, styles.text, {
	            color: answerBarState === ANSWER_BAR_STATES.CORRECT ? kaGreen : gray68
	        });
	        var message = answerBarState === ANSWER_BAR_STATES.INCORRECT ? React.createElement("span", {
	            style: textStyle
	        }, React.createElement("span", {
	            style: styles.tryAgainIcon
	        }, React.createElement(InlineIcon, iconTryAgain)), React.createElement("span", {
	            style: {
	                marginLeft: 8
	            }
	        }, i18n._("Keep trying"))) : React.createElement("span", null);
	        // empty span keeps the button on the right side
	        if (answerBarState !== ANSWER_BAR_STATES.CORRECT) {
	            var buttonLabel = answerBarState === ANSWER_BAR_STATES.INCORRECT ? i18n._("Try again") : i18n._("Check");
	            // Use <button> instead of <input> b/c iOS 9.3 on iPhone 6 renders
	            // the <input> as a faded out green button instead of using our
	            // styles.
	            return React.createElement("div", {
	                style: answerBarStyle
	            }, message, React.createElement("button", {
	                style: buttonStyle,
	                disabled: apiOptions.readOnly || answerBarState !== ANSWER_BAR_STATES.ACTIVE,
	                onClick: onCheckAnswer
	            }, buttonLabel));
	        }
	        return React.createElement("div", {
	            style: answerBarStyle
	        }, React.createElement("span", {
	            style: textStyle
	        }, React.createElement("span", {
	            style: {
	                fontSize: 28,
	                color: "#FFB300"
	            }
	        }, React.createElement(InlineIcon, _extends({}, iconStar, {
	            style: {
	                marginBottom: 5
	            }
	        }))), React.createElement("span", {
	            style: {
	                marginLeft: 8
	            }
	        }, i18n._("Correct!"))), onNextQuestion && React.createElement("button", {
	            style: buttonStyle,
	            onClick: onNextQuestion
	        }, i18n._("Next question")));
	    }
	});

	var fontSize = 17;

	var styles = {
	    answerBar: {
	        display: "flex",
	        alignItems: "center",
	        height: 68,
	        // so that we don't have calculate the vertical padding
	        marginLeft: negativePhoneMargin,
	        marginRight: negativePhoneMargin,
	        marginBottom: negativePhoneMargin,
	        marginTop: phoneMargin,
	        paddingLeft: phoneMargin,
	        paddingRight: 10,
	        borderTop: "1px solid " + gray76
	    },
	    // TODO(kevinb) figure out a way inject styles/components from webapp
	    button: {
	        height: 48,
	        width: 143,
	        borderRadius: 4,
	        color: "white",
	        fontFamily: boldFontFamily,
	        fontSize: fontSize,
	        border: "none"
	    },
	    tryAgainIcon: {
	        fontSize: 28,
	        color: "#63D9EA",
	        transform: "scale(-1,1) rotate(-268deg)"
	    },
	    text: {
	        display: "flex",
	        flexDirection: "row",
	        alignItems: "center",
	        fontFamily: boldFontFamily,
	        fontSize: fontSize
	    }
	};

	GradedGroupAnswerBar.ANSWER_BAR_STATES = ANSWER_BAR_STATES;

	module.exports = GradedGroupAnswerBar;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, max-len, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var classNames = __webpack_require__(13);

	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var firstNumericalParse = __webpack_require__(17).firstNumericalParse;

	var captureScratchpadTouchStart = __webpack_require__(17).captureScratchpadTouchStart;

	var knumber = __webpack_require__(165).number;

	var KhanMath = __webpack_require__(86);

	var toNumericString = KhanMath.toNumericString;

	var getNumericFormat = KhanMath.getNumericFormat;

	/* An input box that accepts only numeric strings
	 *
	 * Calls onChange(value, format) for valid numbers.
	 * Reverts to the current value onBlur or on [ENTER],
	 *   but maintains the format (i.e. 3/2, 1 1/2, 150%)
	 * Accepts empty input and sends it to onChange as null
	 *   if no numeric placeholder is set.
	 * If given a checkValidity function, will turn
	 *   the background/outline red when invalid
	 * If useArrowKeys is set to true, up/down arrows will
	 *   increment/decrement integers
	 * Optionally takes a size ("mini", "small", "normal")
	 */
	var NumberInput = React.createClass({
	    displayName: "NumberInput",
	    propTypes: {
	        value: React.PropTypes.number,
	        format: React.PropTypes.string,
	        placeholder: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number ]),
	        onChange: React.PropTypes.func.isRequired,
	        onFormatChange: React.PropTypes.func,
	        checkValidity: React.PropTypes.func,
	        size: React.PropTypes.string,
	        label: React.PropTypes.oneOf([ "put your labels outside your inputs!" ])
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: null,
	            placeholder: null,
	            format: null,
	            onFormatChange: function onFormatChange() {
	                return null;
	            },
	            checkValidity: function checkValidity() {
	                return true;
	            },
	            useArrowKeys: false
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            format: this.props.format
	        };
	    },
	    render: function render() {
	        var classes = classNames({
	            "number-input": true,
	            "invalid-input": !this._checkValidity(this.props.value),
	            mini: "mini" === this.props.size,
	            small: "small" === this.props.size,
	            normal: "normal" === this.props.size
	        });
	        null != this.props.className && (classes = classes + " " + this.props.className);
	        return React.createElement("input", _extends({}, this.props, {
	            className: classes,
	            type: "text",
	            ref: "input",
	            onChange: this._handleChange,
	            onFocus: this._handleFocus,
	            onBlur: this._handleBlur,
	            onKeyPress: this._handleBlur,
	            onKeyDown: this._onKeyDown,
	            onTouchStart: captureScratchpadTouchStart,
	            defaultValue: toNumericString(this.props.value, this.state.format),
	            value: void 0
	        }));
	    },
	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        knumber.equal(this.getValue(), this.props.value) || this._setValue(this.props.value, this.state.format);
	    },
	    /* Return the current "value" of this input
	     * If empty, it returns the placeholder (if it is a number) or null
	     */
	    getValue: function getValue() {
	        return this.parseInputValue(ReactDOM.findDOMNode(this.refs.input).value);
	    },
	    /* Return the current string value of this input */
	    getStringValue: function getStringValue() {
	        return ReactDOM.findDOMNode(this.refs.input).value.toString();
	    },
	    parseInputValue: function parseInputValue(value) {
	        if ("" === value) {
	            var placeholder = this.props.placeholder;
	            return _.isFinite(placeholder) ? +placeholder : null;
	        }
	        var result = firstNumericalParse(value);
	        return _.isFinite(result) ? result : this.props.value;
	    },
	    /* Set text input focus to this input */
	    focus: function focus() {
	        ReactDOM.findDOMNode(this.refs.input).focus();
	        this._handleFocus();
	    },
	    blur: function blur() {
	        ReactDOM.findDOMNode(this.refs.input).blur();
	        this._handleBlur();
	    },
	    setSelectionRange: function setSelectionRange(selectionStart, selectionEnd) {
	        ReactDOM.findDOMNode(this).setSelectionRange(selectionStart, selectionEnd);
	    },
	    getSelectionStart: function getSelectionStart() {
	        return ReactDOM.findDOMNode(this).selectionStart;
	    },
	    getSelectionEnd: function getSelectionEnd() {
	        return ReactDOM.findDOMNode(this).selectionEnd;
	    },
	    _checkValidity: function _checkValidity(value) {
	        if (null == value) return true;
	        var val = firstNumericalParse(value);
	        var checkValidity = this.props.checkValidity;
	        return _.isFinite(val) && checkValidity(val);
	    },
	    _handleChange: function _handleChange(e) {
	        var text = e.target.value;
	        var value = this.parseInputValue(text);
	        var format = getNumericFormat(text);
	        this.props.onChange(value);
	        if (format) {
	            this.props.onFormatChange(value, format);
	            this.setState({
	                format: format
	            });
	        }
	    },
	    _handleFocus: function _handleFocus() {
	        this.props.onFocus && this.props.onFocus();
	    },
	    _handleBlur: function _handleBlur(e) {
	        // Only continue on blur or "enter"
	        if (e && "keypress" === e.type && 13 !== e.keyCode) return;
	        this._setValue(this.props.value, this.state.format);
	        this.props.onBlur && this.props.onBlur();
	    },
	    _onKeyDown: function _onKeyDown(e) {
	        this.props.onKeyDown && this.props.onKeyDown(e);
	        if (!this.props.useArrowKeys || !_.contains([ "ArrowUp", "ArrowDown" ], e.key)) return;
	        var val = this.getValue();
	        if (val !== Math.floor(val)) return;
	        "ArrowUp" === e.key ? val += 1 : "ArrowDown" === e.key && (val -= 1);
	        this._checkValidity(val) && this.props.onChange(val);
	    },
	    _setValue: function _setValue(val, format) {
	        $(ReactDOM.findDOMNode(this.refs.input)).val(toNumericString(val, format));
	    }
	});

	module.exports = NumberInput;

/***/ },
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable brace-style, comma-dangle, no-redeclare, no-var, object-curly-spacing, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _ = __webpack_require__(10);

	var Util = __webpack_require__(17);

	var GraphUtils = __webpack_require__(120);

	var _require = __webpack_require__(37), interactiveSizes = _require.interactiveSizes;

	var SvgImage = __webpack_require__(33);

	var defaultBackgroundImage = {
	    url: null
	};

	/* Style objects */
	var defaultInstructionsStyle = {
	    fontStyle: "italic",
	    fontWeight: "bold",
	    fontSize: "32px",
	    width: "100%",
	    height: "100%",
	    textAlign: "center",
	    backgroundColor: "white",
	    position: "absolute",
	    zIndex: 1,
	    transition: "opacity .25s ease-in-out",
	    "-moz-transition": "opacity .25s ease-in-out",
	    "-webkit-transition": "opacity .25s ease-in-out"
	};

	var instructionsTextStyle = {
	    position: "relative",
	    top: "25%"
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
	        onClick: React.PropTypes.func,
	        setDrawingAreaAvailable: React.PropTypes.func,
	        isMobile: React.PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            labels: [ "x", "y" ],
	            range: [ [ -10, 10 ], [ -10, 10 ] ],
	            step: [ 1, 1 ],
	            gridStep: [ 1, 1 ],
	            snapStep: [ .5, .5 ],
	            markings: "graph",
	            backgroundImage: defaultBackgroundImage,
	            showProtractor: false,
	            showRuler: false,
	            rulerLabel: "",
	            rulerTicks: 10,
	            instructions: null,
	            onGraphieUpdated: null,
	            onClick: null,
	            onMouseDown: null,
	            isMobile: false
	        };
	    },
	    render: function render() {
	        var image;
	        var imageData = this.props.backgroundImage;
	        if (imageData.url) {
	            var scale = this.props.box[0] / interactiveSizes.defaultBoxSize;
	            image = React.createElement(SvgImage, {
	                src: imageData.url,
	                width: imageData.width,
	                height: imageData.height,
	                scale: scale,
	                responsive: false
	            });
	        } else image = null;
	        return React.createElement("div", {
	            className: "graphie-container above-scratchpad",
	            style: {
	                width: this.props.box[0],
	                height: this.props.box[1]
	            },
	            onMouseOut: this.onMouseOut,
	            onMouseOver: this.onMouseOver,
	            onClick: this.onClick
	        }, image, React.createElement("div", {
	            className: "graphie",
	            ref: "graphieDiv"
	        }));
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
	        var potentialChanges = [ "labels", "range", "step", "markings", "showProtractor", "showRuler", "rulerLabel", "rulerTicks", "gridStep", "snapStep" ];
	        var self = this;
	        _.each(potentialChanges, function(prop) {
	            _.isEqual(self.props[prop], nextProps[prop]) || (self._shouldSetupGraphie = true);
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
	        return _.map(coordsList, function(coords) {
	            return _.map(coords, function(coord, i) {
	                var range = self.props.range[i];
	                if (noSnap) return range[0] + (range[1] - range[0]) * coord;
	                var step = self.props.step[i];
	                var nSteps = numSteps(range, step);
	                var tick = Math.round(coord * nSteps);
	                return range[0] + step * tick;
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
	        if (this._hasSetupGraphieThisUpdate) return;
	        var graphieDiv = ReactDOM.findDOMNode(this.refs.graphieDiv);
	        $(graphieDiv).empty();
	        var labels = this.props.labels;
	        var range = this.props.range;
	        var graphie = this._graphie = GraphUtils.createGraphie(graphieDiv);
	        var gridConfig = this._getGridConfig();
	        graphie.snap = this.props.snapStep;
	        if ("graph" === this.props.markings) {
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
	                unityLabels: _.pluck(gridConfig, "unityLabel"),
	                isMobile: this.props.isMobile
	            });
	            graphie.label([ 0, range[1][1] ], labels[1], this.props.isMobile ? "below right" : "above");
	            graphie.label([ range[0][1], 0 ], labels[0], this.props.isMobile ? "above left" : "right");
	        } else "grid" === this.props.markings ? graphie.graphInit({
	            range: range,
	            scale: _.pluck(gridConfig, "scale"),
	            gridStep: this.props.gridStep,
	            axes: false,
	            ticks: false,
	            labels: false,
	            isMobile: this.props.isMobile
	        }) : "none" === this.props.markings && graphie.init({
	            range: range,
	            scale: _.pluck(gridConfig, "scale"),
	            isMobile: this.props.isMobile
	        });
	        // Add instructions just before mouse layer
	        var visible = .5;
	        var invisible = 0;
	        var $instructionsWrapper;
	        if (this.props.instructions) {
	            var $instructionsWrapper = $("<div/>");
	            _.each(defaultInstructionsStyle, function(value, key) {
	                $instructionsWrapper.css(key, value);
	            });
	            $instructionsWrapper.css("opacity", .5);
	            var $instructions = $("<span/>", {
	                text: this.props.instructions
	            });
	            _.each(instructionsTextStyle, function(value, key) {
	                $instructions.css(key, value);
	            });
	            $instructionsWrapper.append($instructions);
	            $(graphieDiv).append($instructionsWrapper);
	        } else $instructionsWrapper = void 0;
	        // Add some handlers for instructions text (if necessary)
	        var onMouseDown = $instructionsWrapper || this.props.onMouseDown ? _.bind(function(coord) {
	            if ($instructionsWrapper) {
	                $instructionsWrapper.remove();
	                $instructionsWrapper = null;
	            }
	            this.props.onMouseDown(coord);
	        }, this) : null;
	        var onMouseOver = $instructionsWrapper ? function() {
	            $instructionsWrapper && $instructionsWrapper.css("opacity", 0);
	        } : null;
	        var onMouseOut = $instructionsWrapper ? function() {
	            $instructionsWrapper && $instructionsWrapper.css("opacity", .5);
	        } : null;
	        graphie.addMouseLayer({
	            onClick: this.props.onClick,
	            onMouseDown: onMouseDown,
	            onMouseOver: onMouseOver,
	            onMouseOut: onMouseOut,
	            onMouseUp: this.props.onMouseUp,
	            onMouseMove: this.props.onMouseMove,
	            allowScratchpad: true,
	            setDrawingAreaAvailable: this.props.setDrawingAreaAvailable
	        });
	        this._updateProtractor();
	        this._updateRuler();
	        // We set this flag before jumping into our callback
	        // to avoid recursing if our callback calls reset() itself
	        this._hasSetupGraphieThisUpdate = true;
	        !initialMount && this.props.onGraphieUpdated && // Calling a parent callback in componentDidMount is bad and
	        // results in hard-to-reason-about lifecycle problems (esp. with
	        // refs), so we do it only on update and rely on the parent to
	        // query for the graphie object on initial mount
	        this.props.onGraphieUpdated(graphie);
	    },
	    _getGridConfig: function _getGridConfig() {
	        var self = this;
	        return _.map(self.props.step, function(step, i) {
	            return Util.gridDimensionConfig(step, self.props.range[i], self.props.box[i], self.props.gridStep[i]);
	        });
	    },
	    _updateProtractor: function _updateProtractor() {
	        this.protractor && this.protractor.remove();
	        if (this.props.showProtractor) {
	            var coord = this.pointsFromNormalized([ [ .5, .05 ] ])[0];
	            this.protractor = this._graphie.protractor(coord);
	        }
	    },
	    _updateRuler: function _updateRuler() {
	        this.ruler && this.ruler.remove();
	        if (this.props.showRuler) {
	            var coord = this.pointsFromNormalized([ [ .5, .25 ] ])[0];
	            var extent = this._graphie.range[0][1] - this._graphie.range[0][0];
	            this.ruler = this._graphie.ruler({
	                center: coord,
	                label: this.props.rulerLabel,
	                pixelsPerUnit: this._graphie.scale[0],
	                ticksPerUnit: this.props.rulerTicks,
	                units: Math.round(.8 * extent)
	            });
	        }
	    },
	    toJSON: function toJSON() {
	        return _.pick(this.props, "range", "step", "markings", "labels", "backgroundImage", "showProtractor", "showRuler", "rulerLabel", "rulerTicks", "gridStep", "snapStep");
	    }
	});

	module.exports = Graph;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * A wrapper around react-components/info-tip.jsx that can be rendered on the
	 * server without causing a checksum mismatch on the client.
	 * (RCSS generates classnames with a randomSuffix, which ensures that any
	 * two sets of generated classnames will not match.)
	 */
	var React = __webpack_require__(11);

	var ReactComponentsInfoTip = __webpack_require__(173);

	var InfoTip = React.createClass({
	    displayName: "InfoTip",
	    getInitialState: function getInitialState() {
	        return {
	            didMount: false
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        /* eslint-disable react/no-did-mount-set-state */
	        this.setState({
	            didMount: true
	        });
	    },
	    render: function render() {
	        return this.state.didMount ? React.createElement(ReactComponentsInfoTip, this.props) : React.createElement("div", null);
	    }
	});

	module.exports = InfoTip;

/***/ },
/* 120 */,
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable comma-dangle, indent, max-len, no-irregular-whitespace, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var React = __webpack_require__(11);

	var ReactDOM = __webpack_require__(12);

	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var _ = __webpack_require__(10);

	var Util = __webpack_require__(17);

	var Renderer = __webpack_require__(8);

	var ApiClassNames = __webpack_require__(18).ClassNames;

	var HORIZONTAL = "horizontal";

	var VERTICAL = "vertical";

	var STATIC = "static";

	var DRAGGING = "dragging";

	var ANIMATING = "animating";

	var DISABLED = "disabled";

	// A placeholder that appears in the sortable whenever an item is dragged.
	var Placeholder = React.createClass({
	    displayName: "Placeholder",
	    propTypes: {
	        layout: React.PropTypes.oneOf([ HORIZONTAL, VERTICAL ]),
	        width: React.PropTypes.number.isRequired,
	        height: React.PropTypes.number.isRequired
	    },
	    render: function render() {
	        var layout = this.props.layout;
	        var className = css(styles.card, styles.placeholder, layout === HORIZONTAL && styles.horizontalCard);
	        var style = {
	            width: this.props.width,
	            height: this.props.height
	        };
	        null != this.props.margin && (style.margin = this.props.margin);
	        return React.createElement("li", {
	            className: className,
	            style: style
	        });
	    }
	});

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
	        content: React.PropTypes.string.isRequired,
	        endPosition: React.PropTypes.object.isRequired,
	        includePadding: React.PropTypes.bool,
	        layout: React.PropTypes.oneOf([ HORIZONTAL, VERTICAL ]),
	        onAnimationEnd: React.PropTypes.func.isRequired,
	        onMouseDown: React.PropTypes.func.isRequired,
	        onMouseMove: React.PropTypes.func.isRequired,
	        onMouseUp: React.PropTypes.func.isRequired,
	        onRender: React.PropTypes.func.isRequired,
	        type: React.PropTypes.oneOf([ STATIC, DRAGGING, ANIMATING, DISABLED ]),
	        highlightLint: React.PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            includePadding: true,
	            type: STATIC,
	            highlightLint: false
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            startPosition: {
	                left: 0,
	                top: 0
	            },
	            startMouse: {
	                left: 0,
	                top: 0
	            },
	            mouse: {
	                left: 0,
	                top: 0
	            }
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        this.isMouseMoveUpBound = false;
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        // Event handlers should be unbound before component unmounting, but
	        // just in case...
	        this.isMouseMoveUpBound && this.unbindMouseMoveUp();
	    },
	    getCurrentPosition: function getCurrentPosition() {
	        return {
	            left: this.state.startPosition.left + this.state.mouse.left - this.state.startMouse.left,
	            top: this.state.startPosition.top + this.state.mouse.top - this.state.startMouse.top
	        };
	    },
	    render: function render() {
	        var _props = this.props, includePadding = _props.includePadding, layout = _props.layout, type = _props.type;
	        // We need to keep backwards compatbility with rules specified directly
	        // in CSS. Hence the hacky tacking on of manual classNames.
	        // See sortable.less for details.
	        var className = css(styles.card, styles.draggable, layout === HORIZONTAL && styles.horizontalCard, layout === VERTICAL && styles.verticalCard, type === DRAGGING && styles.dragging, type === ANIMATING && styles.animating, type === DISABLED && styles.disabled, !includePadding && styles.unpaddedCard) + " " + ApiClassNames.INTERACTIVE + " perseus-sortable-draggable";
	        includePadding || (className += " perseus-sortable-draggable-unpadded");
	        var style = {
	            position: "static"
	        };
	        this.props.type !== DRAGGING && this.props.type !== ANIMATING || _.extend(style, {
	            position: "absolute"
	        }, this.getCurrentPosition());
	        this.props.width && (style.width = this.props.width + 1);
	        this.props.height && (style.height = this.props.height);
	        null != this.props.margin && (style.margin = this.props.margin);
	        return React.createElement("li", {
	            className: className,
	            style: style,
	            onMouseDown: this.onMouseDown,
	            onTouchStart: this.onMouseDown,
	            onTouchMove: this.onMouseMove,
	            onTouchEnd: this.onMouseUp,
	            onTouchCancel: this.onMouseUp
	        }, React.createElement(Renderer, {
	            content: this.props.content,
	            highlightLint: this.props.highlightLint,
	            onRender: this.props.onRender
	        }));
	    },
	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        if (this.props.type === prevProps.type) return;
	        if (this.props.type === ANIMATING) {
	            // Start animating
	            var current = this.getCurrentPosition();
	            var duration = 15 * Math.sqrt(Math.sqrt(Math.pow(this.props.endPosition.left - current.left, 2) + Math.pow(this.props.endPosition.top - current.top, 2)));
	            $(ReactDOM.findDOMNode(this)).animate(this.props.endPosition, {
	                duration: Math.max(duration, 1),
	                // Animating -> Static
	                complete: this.props.onAnimationEnd
	            });
	        } else this.props.type === STATIC && // Ensure that any animations are done
	        $(ReactDOM.findDOMNode(this)).finish();
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
	        if (this.props.type !== STATIC) return;
	        if (!(0 === event.button || null != event.touches && 1 === event.touches.length)) return;
	        event.preventDefault();
	        var loc = Util.extractPointerLocation(event);
	        loc && this.setState({
	            startPosition: $(ReactDOM.findDOMNode(this)).position(),
	            startMouse: loc,
	            mouse: loc
	        }, function() {
	            this.bindMouseMoveUp();
	            // Static -> Dragging
	            this.props.onMouseDown();
	        });
	    },
	    onMouseMove: function onMouseMove(event) {
	        if (this.props.type !== DRAGGING) return;
	        event.preventDefault();
	        var loc = Util.extractPointerLocation(event);
	        loc && this.setState({
	            mouse: loc
	        }, this.props.onMouseMove);
	    },
	    onMouseUp: function onMouseUp(event) {
	        if (this.props.type !== DRAGGING) return;
	        event.preventDefault();
	        if (Util.extractPointerLocation(event)) {
	            this.unbindMouseMoveUp();
	            // Dragging -> Animating
	            this.props.onMouseUp();
	        }
	    }
	});

	// The main sortable component.
	var Sortable = React.createClass({
	    displayName: "Sortable",
	    propTypes: {
	        constraints: React.PropTypes.object,
	        disabled: React.PropTypes.bool,
	        layout: React.PropTypes.oneOf([ HORIZONTAL, VERTICAL ]),
	        margin: React.PropTypes.number,
	        onChange: React.PropTypes.func,
	        onMeasure: React.PropTypes.func,
	        options: React.PropTypes.array.isRequired,
	        padding: React.PropTypes.bool,
	        highlightLint: React.PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            layout: HORIZONTAL,
	            padding: true,
	            disabled: false,
	            constraints: {},
	            onMeasure: function onMeasure() {},
	            margin: 5,
	            onChange: function onChange() {},
	            highlightLint: false
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            items: this.itemsFromProps(this.props)
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var prevProps = this.props;
	        _.isEqual(nextProps.options, prevProps.options) ? nextProps.layout === prevProps.layout && nextProps.padding === prevProps.padding && nextProps.disabled === prevProps.disabled && _.isEqual(nextProps.constraints, prevProps.constraints) || // Clear item measurements
	        this.setState({
	            items: this.clearItemMeasurements(this.state.items)
	        }) : // Regenerate items
	        this.setState({
	            items: this.itemsFromProps(nextProps)
	        });
	    },
	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        // Measure items if their dimensions have been reset
	        this.state.items.length && !this.state.items[0].width && this.measureItems();
	    },
	    itemsFromProps: function itemsFromProps(props) {
	        var type = props.disabled ? DISABLED : STATIC;
	        return _.map(props.options, function(option, i) {
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
	        return _.map(items, function(item) {
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
	        var $items = _.map(items, function(item) {
	            return $(ReactDOM.findDOMNode(this.refs[item.key]));
	        }, this);
	        var widths = _.invoke($items, "outerWidth");
	        var heights = _.invoke($items, "outerHeight");
	        var constraints = this.props.constraints;
	        var layout = this.props.layout;
	        var syncWidth;
	        constraints.width ? // Items must be at least as wide as the specified constraint
	        syncWidth = _.max(widths.concat(constraints.width)) : layout === VERTICAL && (// Sync widths to get a clean column
	        syncWidth = _.max(widths));
	        var syncHeight;
	        constraints.height ? // Items must be at least as high as the specified constraint
	        syncHeight = _.max(heights.concat(constraints.height)) : layout === HORIZONTAL && (// Sync widths to get a clean row
	        syncHeight = _.max(heights));
	        items = _.map(items, function(item, i) {
	            item.width = syncWidth || widths[i];
	            item.height = syncHeight || heights[i];
	            return item;
	        });
	        this.setState({
	            items: items
	        }, function() {
	            _this.props.onMeasure({
	                widths: widths,
	                heights: heights
	            });
	        });
	    },
	    remeasureItems: _.debounce(function() {
	        this.setState({
	            // Clear item measurements
	            items: this.clearItemMeasurements(this.state.items)
	        });
	    }, 20),
	    render: function render() {
	        var cards = [];
	        var layout = this.props.layout;
	        // We need to keep backwards compatbility with rules specified directly
	        // in CSS. See sortable.less for details.
	        var className = css(styles.sortable) + " perseus-sortable";
	        _.each(this.state.items, function(item, i, items) {
	            var isLast = i === items.length - 1;
	            var isStatic = item.type === STATIC || item.type === DISABLED;
	            var margin;
	            this.props.layout === HORIZONTAL ? margin = "0 " + this.props.margin + "px 0 0" : this.props.layout === VERTICAL && (margin = "0 0 " + this.props.margin + "px 0");
	            cards.push(React.createElement(Draggable, {
	                content: item.option,
	                key: item.key,
	                type: item.type,
	                ref: item.key,
	                width: item.width,
	                height: item.height,
	                layout: layout,
	                includePadding: this.props.padding,
	                margin: isLast && isStatic ? 0 : margin,
	                endPosition: item.endPosition,
	                highlightLint: this.props.highlightLint,
	                onRender: this.remeasureItems,
	                onMouseDown: this.onMouseDown.bind(this, item.key),
	                onMouseMove: this.onMouseMove.bind(this, item.key),
	                onMouseUp: this.onMouseUp.bind(this, item.key),
	                onTouchMove: this.onMouseMove.bind(this, item.key),
	                onTouchEnd: this.onMouseUp.bind(this, item.key),
	                onTouchCancel: this.onMouseUp.bind(this, item.key),
	                onAnimationEnd: this.onAnimationEnd.bind(this, item.key)
	            }));
	            item.type !== DRAGGING && item.type !== ANIMATING || cards.push(React.createElement(Placeholder, {
	                key: "placeholder_" + item.key,
	                ref: "placeholder_" + item.key,
	                width: item.width,
	                height: item.height,
	                layout: layout,
	                margin: isLast ? 0 : margin
	            }));
	        }, this);
	        return React.createElement("ul", {
	            className: className
	        }, cards);
	    },
	    onMouseDown: function onMouseDown(key) {
	        // Static -> Dragging
	        var items = _.map(this.state.items, function(item) {
	            item.key === key && (item.type = DRAGGING);
	            return item;
	        });
	        this.setState({
	            items: items
	        });
	    },
	    onMouseMove: function onMouseMove(key) {
	        // Dragging: Rearrange items based on draggable's position
	        var $draggable = $(ReactDOM.findDOMNode(this.refs[key]));
	        var $sortable = $(ReactDOM.findDOMNode(this));
	        var items = _.clone(this.state.items);
	        var item = _.findWhere(this.state.items, {
	            key: key
	        });
	        var margin = this.props.margin;
	        var currentIndex = _.indexOf(items, item);
	        var newIndex = 0;
	        items.splice(currentIndex, 1);
	        if (this.props.layout === HORIZONTAL) {
	            var midWidth = $draggable.offset().left - $sortable.offset().left;
	            var sumWidth = 0;
	            var cardWidth;
	            _.each(items, function(item) {
	                cardWidth = item.width;
	                midWidth > sumWidth + cardWidth / 2 && (newIndex += 1);
	                sumWidth += cardWidth + margin;
	            });
	        } else {
	            var midHeight = $draggable.offset().top - $sortable.offset().top;
	            var sumHeight = 0;
	            var cardHeight;
	            _.each(items, function(item) {
	                cardHeight = item.height;
	                midHeight > sumHeight + cardHeight / 2 && (newIndex += 1);
	                sumHeight += cardHeight + margin;
	            });
	        }
	        if (newIndex !== currentIndex) {
	            items.splice(newIndex, 0, item);
	            this.setState({
	                items: items
	            });
	        }
	    },
	    onMouseUp: function onMouseUp(key) {
	        // Dragging -> Animating
	        var items = _.map(this.state.items, function(item) {
	            if (item.key === key) {
	                item.type = ANIMATING;
	                item.endPosition = $(ReactDOM.findDOMNode(this.refs["placeholder_" + key])).position();
	            }
	            return item;
	        }, this);
	        this.setState({
	            items: items
	        });
	        // HACK: We need to know *that* the widget changed, but currently it's
	        // not set up in a nice way to tell us *how* it changed, since the
	        // permutation of the items is stored in state.
	        this.props.onChange({});
	    },
	    onAnimationEnd: function onAnimationEnd(key) {
	        // Animating -> Static
	        var items = _.map(this.state.items, function(item) {
	            item.key === key && (item.type = STATIC);
	            return item;
	        });
	        this.setState({
	            items: items
	        });
	    },
	    getOptions: function getOptions() {
	        return _.pluck(this.state.items, "option");
	    }
	});

	var styles = StyleSheet.create({
	    sortable: {
	        boxSizing: "border-box",
	        float: "left",
	        padding: 0,
	        margin: 0
	    },
	    card: {
	        boxSizing: "border-box",
	        background: "#fff",
	        border: "1px solid #ddd",
	        borderRadius: 4,
	        cursor: "pointer",
	        minWidth: 25,
	        minHeight: 44,
	        padding: 10,
	        listStyleType: "none",
	        userSelect: "none",
	        touchAction: "none"
	    },
	    placeholder: {
	        background: "#ddd",
	        border: "1px solid #ccc"
	    },
	    draggable: {
	        textAlign: "center"
	    },
	    horizontalCard: {
	        float: "left",
	        cursor: "ew-resize"
	    },
	    verticalCard: {
	        maxWidth: "100%",
	        cursor: "ns-resize"
	    },
	    unpaddedCard: {
	        padding: 0
	    },
	    dragging: {
	        background: "#ffedcd",
	        opacity: "0.8"
	    },
	    disabled: {
	        backgroundColor: "inherit",
	        border: "1px solid transparent",
	        cursor: "default"
	    }
	});

	module.exports = Sortable;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable eqeqeq, indent, keyword-spacing, max-len, no-mixed-spaces-and-tabs, no-unused-vars, no-var, semi, space-infix-ops */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
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
	    if (0 == f || "" == mantissa || "0" == mantissa) {
	        mantissa = "";
	        for (i = 0; i < sigFigs; i++) mantissa += "0";
	        order = sigFigs + sigDecs;
	        sigDecs < 0 && -sigDecs >= sigFigs && (zeroScientific = true);
	    } else {
	        decAdd = order - mantissa.length - sigDecs;
	        sigAdd = sigFigs - mantissa.length;
	        add = Math.min(sigAdd, decAdd);
	        if (add < 0) {
	            var rounded = round(mantissa, -add);
	            if (rounded.length > mantissa.length + add) {
	                order++;
	                decAdd > sigAdd && (rounded = round(rounded, 1));
	            }
	            mantissa = rounded;
	        } else if (add > 0) for (i = 0; i < add; i++) mantissa += "0";
	        if ("" == mantissa || "0" == mantissa) {
	            mantissa = "0";
	            positive = true;
	            order = 1 + sigDecs;
	            0 != order && (zeroScientific = true);
	        }
	    }
	    var useScientific = scientific || mantissa.length > 20 || order > 4 || order < -2 || order - mantissa.length > 0 && trailingZeros(mantissa) > 0 || zeroScientific;
	    var returnVal = "";
	    positive || (returnVal += "-");
	    if (useScientific) {
	        returnVal += mantissa.charAt(0);
	        mantissa.length > 1 && (returnVal += "." + mantissa.substring(1, mantissa.length));
	        order - 1 != 0 && (returnVal += " x 10^" + (order - 1));
	    } else {
	        var wholePart = "";
	        var fractPart = "";
	        var needDot = true;
	        if (order > 0) if (mantissa.length > order) {
	            wholePart = mantissa.substring(0, order);
	            fractPart = mantissa.substring(order, mantissa.length);
	        } else {
	            wholePart = mantissa;
	            needDot = 0 != trailingZeros(mantissa);
	            for (var i = 0; i < order - mantissa.length; i++) wholePart += "0";
	        } else {
	            for (i = 0; i < -order; i++) fractPart += "0";
	            fractPart += mantissa;
	        }
	        returnVal += ("" == wholePart ? "0" : wholePart) + (needDot ? "." : "") + fractPart;
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
	        if ("0" != mantissa.charAt(i)) return zeros;
	        zeros++;
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
	        if (c >= "1" && c <= "9") {
	            all += zeros + c;
	            zeros = "";
	            seenSomething = true;
	            if (!seenDot) {
	                totalDecs++;
	                decPlaces++;
	            }
	            beginning = false;
	        } else if ("0" == c) {
	            if (seenDot) if (seenSomething) {
	                all += zeros + c;
	                zeros = "";
	            } else {
	                leadZeros += c;
	                decPlaces--;
	            } else {
	                totalDecs++;
	                if (seenSomething) {
	                    leadZeros += c;
	                    decPlaces++;
	                    zeros += c;
	                } else leadZeros += c;
	            }
	            beginning = false;
	        } else if (seenDot || "." != c) if ("e" == c || "E" == c && i + 1 < s.length) {
	            var raised = parseInt(s.substring(i + 1, s.length));
	            decPlaces += raised;
	            totalDecs += raised;
	            i = s.length;
	        } else !beginning || "+" != c && "-" != c || "-" == c && (pos = !pos); else {
	            all += zeros;
	            zeros = "";
	            seenDot = true;
	            beginning = false;
	        }
	    }
	    return "" == all || pos;
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
	        if (c >= "1" && c <= "9") {
	            all += zeros + c;
	            zeros = "";
	            seenSomething = true;
	            if (!seenDot) {
	                totalDecs++;
	                decPlaces++;
	            }
	            beginning = false;
	        } else if ("0" == c) {
	            if (seenDot) if (seenSomething) {
	                all += zeros + c;
	                zeros = "";
	            } else {
	                leadZeros += c;
	                decPlaces--;
	            } else {
	                totalDecs++;
	                if (seenSomething) {
	                    leadZeros += c;
	                    decPlaces++;
	                    zeros += c;
	                } else leadZeros += c;
	            }
	            beginning = false;
	        } else if (seenDot || "." != c) if ("e" == c || "E" == c && i + 1 < s.length) {
	            var raised = parseInt(s.substring(i + 1, s.length));
	            decPlaces += raised;
	            totalDecs += raised;
	            i = s.length;
	        } else !beginning || "+" != c && "-" != c || "-" == c && (pos = !pos); else {
	            all += zeros;
	            zeros = "";
	            seenDot = true;
	            beginning = false;
	        }
	    }
	    return "" == all ? leadZeros : all;
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
	        if (c >= "1" && c <= "9") {
	            all += zeros + c;
	            zeros = "";
	            seenSomething = true;
	            if (!seenDot) {
	                totalDecs++;
	                decPlaces++;
	            }
	            beginning = false;
	        } else if ("0" == c) {
	            if (seenDot) if (seenSomething) {
	                all += zeros + c;
	                zeros = "";
	            } else {
	                leadZeros += c;
	                decPlaces--;
	            } else {
	                totalDecs++;
	                if (seenSomething) {
	                    leadZeros += c;
	                    decPlaces++;
	                    zeros += c;
	                } else leadZeros += c;
	            }
	            beginning = false;
	        } else if (seenDot || "." != c) if ("e" == c || "E" == c && i + 1 < s.length) {
	            var raised = parseInt(s.substring(i + 1, s.length));
	            decPlaces += raised;
	            totalDecs += raised;
	            i = s.length;
	        } else !beginning || "+" != c && "-" != c || "-" == c && (pos = !pos); else {
	            all += zeros;
	            zeros = "";
	            seenDot = true;
	            beginning = false;
	        }
	    }
	    return "" == all ? totalDecs : decPlaces;
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
	    if (last < 0) return "";
	    if (last >= mantissa.length - 1) return mantissa;
	    var nextToLast = mantissa.charAt(last + 1);
	    var lastChar = mantissa.charAt(last);
	    var roundUp = false;
	    if (nextToLast > "5") roundUp = true; else if ("5" == nextToLast) {
	        for (var j = last + 2; j < mantissa.length; j++) "0" != mantissa.charAt(j) && (roundUp = true);
	        lastChar % 2 == 1 && (roundUp = true);
	    }
	    var result = "";
	    for (var i = last; i >= 0; i--) {
	        var c = mantissa.charAt(i);
	        if (roundUp) {
	            var nextChar;
	            if ("9" == c) nextChar = "0"; else {
	                switch (c) {
	                  case "0":
	                    nextChar = "1";
	                    break;

	                  case "1":
	                    nextChar = "2";
	                    break;

	                  case "2":
	                    nextChar = "3";
	                    break;

	                  case "3":
	                    nextChar = "4";
	                    break;

	                  case "4":
	                    nextChar = "5";
	                    break;

	                  case "5":
	                    nextChar = "6";
	                    break;

	                  case "6":
	                    nextChar = "7";
	                    break;

	                  case "7":
	                    nextChar = "8";
	                    break;

	                  case "8":
	                    nextChar = "9";
	                }
	                roundUp = false;
	            }
	            result = nextChar + result;
	        } else result = c + result;
	    }
	    roundUp && (result = "1" + result);
	    return result;
	}

	module.exports = {
	    SignificantFigures: SignificantFigures,
	    displaySigFigs: displaySigFigs
	};

/***/ },
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable brace-style, comma-dangle, no-var, one-var, space-unary-ops */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	var _ = __webpack_require__(10);

	var Util = __webpack_require__(17);

	var Graphie = __webpack_require__(94);

	var Plot = Graphie.Plot;

	var kpoint = __webpack_require__(165).point;

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
	    while (phase > 0) phase -= period;
	    while (phase < 0) phase += period;
	    return [ amplitude, angularFrequency, phase, verticalOffset ];
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
	    while (phase > 0) phase -= period;
	    while (phase < 0) phase += period;
	    return [ amplitude, angularFrequency, phase, verticalOffset ];
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
	    defaultCoords: [ [ .25, .75 ], [ .75, .75 ] ],
	    getCoefficients: function getCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];
	        var denom = p2[0] - p1[0];
	        var num = p2[1] - p1[1];
	        if (0 === denom) return;
	        var m = num / denom;
	        return [ m, p2[1] - m * p2[0] ];
	    },
	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        return coeffs[0] * x + coeffs[1];
	    },
	    getEquationString: function getEquationString(coords) {
	        var coeffs = this.getCoefficients(coords);
	        var m = coeffs[0], b = coeffs[1];
	        return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
	    }
	});

	var Quadratic = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/e23d36e6fc29ee37174e92c9daba2a66677128ab.png",
	    defaultCoords: [ [ .5, .5 ], [ .75, .75 ] ],
	    Movable: Graphie.Parabola,
	    getCoefficients: function getCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];
	        // Parabola with vertex (h, k) has form: y = a * (h - k)^2 + k
	        var h = p1[0];
	        var k = p1[1];
	        // Use these to calculate familiar a, b, c
	        var a = (p2[1] - k) / ((p2[0] - h) * (p2[0] - h));
	        return [ a, -2 * h * a, a * h * h + k ];
	    },
	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        return (coeffs[0] * x + coeffs[1]) * x + coeffs[2];
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
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
	        return "y = " + a.toFixed(3) + "x^2 + " + b.toFixed(3) + "x + " + c.toFixed(3);
	    }
	});

	var Sinusoid = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/3d68e7718498475f53b206c2ab285626baf8857e.png",
	    defaultCoords: [ [ .5, .5 ], [ .6, .6 ] ],
	    Movable: Graphie.Sinusoid,
	    getCoefficients: function getCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];
	        var a = p2[1] - p1[1];
	        var b = Math.PI / (2 * (p2[0] - p1[0]));
	        return [ a, b, p1[0] * b, p1[1] ];
	    },
	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];
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
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];
	        return "y = " + a.toFixed(3) + " sin(" + b.toFixed(3) + "x - " + c.toFixed(3) + ") + " + d.toFixed(3);
	    },
	    areEqual: function areEqual(coeffs1, coeffs2) {
	        return Util.deepEq(canonicalSineCoefficients(coeffs1), canonicalSineCoefficients(coeffs2));
	    }
	});

	var Tangent = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/7db80d23c35214f98659fe1cf0765811c1bbfbba.png",
	    defaultCoords: [ [ .5, .5 ], [ .75, .75 ] ],
	    getCoefficients: function getCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];
	        var a = p2[1] - p1[1];
	        var b = Math.PI / (4 * (p2[0] - p1[0]));
	        return [ a, b, p1[0] * b, p1[1] ];
	    },
	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];
	        return a * Math.tan(b * x - c) + d;
	    },
	    getEquationString: function getEquationString(coords) {
	        var coeffs = this.getCoefficients(coords);
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];
	        return "y = " + a.toFixed(3) + " sin(" + b.toFixed(3) + "x - " + c.toFixed(3) + ") + " + d.toFixed(3);
	    },
	    areEqual: function areEqual(coeffs1, coeffs2) {
	        return Util.deepEq(canonicalTangentCoefficients(coeffs1), canonicalTangentCoefficients(coeffs2));
	    }
	});

	var Exponential = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/9cbfad55525e3ce755a31a631b074670a5dad611.png",
	    defaultCoords: [ [ .5, .55 ], [ .75, .75 ] ],
	    defaultAsymptote: [ [ 0, .5 ], [ 1, .5 ] ],
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
	        return _.all(coords, function(coord) {
	            return coord[1] !== y;
	        });
	    },
	    extraAsymptoteConstraint: function extraAsymptoteConstraint(newCoord, oldCoord, coords, asymptote, graph) {
	        var y = newCoord[1];
	        if (_.all(coords, function(coord) {
	            return coord[1] > y;
	        }) || _.all(coords, function(coord) {
	            return coord[1] < y;
	        })) return [ oldCoord[0], y ];
	        // Snap the asymptote as close as possible, i.e., if the user moves
	        // the mouse really quickly into an invalid region
	        var oldY = oldCoord[1];
	        if (_.all(coords, function(coord) {
	            return coord[1] > oldY;
	        })) {
	            var bottomMost = _.min(_.map(coords, function(coord) {
	                return coord[1];
	            }));
	            return [ oldCoord[0], bottomMost - graph.snapStep[1] ];
	        }
	        var topMost = _.max(_.map(coords, function(coord) {
	            return coord[1];
	        }));
	        return [ oldCoord[0], topMost + graph.snapStep[1] ];
	    },
	    allowReflectOverAsymptote: true,
	    getCoefficients: function getCoefficients(coords, asymptote) {
	        var p1 = coords[0];
	        var p2 = coords[1];
	        var c = _.head(asymptote)[1];
	        var b = Math.log((p1[1] - c) / (p2[1] - c)) / (p1[0] - p2[0]);
	        return [ (p1[1] - c) / Math.exp(b * p1[0]), b, c ];
	    },
	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
	        return a * Math.exp(b * x) + c;
	    },
	    getEquationString: function getEquationString(coords, asymptote) {
	        if (!asymptote) return null;
	        var coeffs = this.getCoefficients(coords, asymptote);
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
	        return "y = " + a.toFixed(3) + "e^(" + b.toFixed(3) + "x) + " + c.toFixed(3);
	    }
	});

	var Logarithm = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/f6491e99d34af34d924bfe0231728ad912068dc3.png",
	    defaultCoords: [ [ .55, .5 ], [ .75, .75 ] ],
	    defaultAsymptote: [ [ .5, 0 ], [ .5, 1 ] ],
	    extraCoordConstraint: function extraCoordConstraint(newCoord, oldCoord, coords, asymptote, graph) {
	        var x = _.head(asymptote)[0];
	        return _.all(coords, function(coord) {
	            return coord[0] !== x;
	        }) && coords[0][1] !== coords[1][1];
	    },
	    extraAsymptoteConstraint: function extraAsymptoteConstraint(newCoord, oldCoord, coords, asymptote, graph) {
	        var x = newCoord[0];
	        if (_.all(coords, function(coord) {
	            return coord[0] > x;
	        }) || _.all(coords, function(coord) {
	            return coord[0] < x;
	        })) return [ x, oldCoord[1] ];
	        // Snap the asymptote as close as possible, i.e., if the user moves
	        // the mouse really quickly into an invalid region
	        var oldX = oldCoord[0];
	        if (_.all(coords, function(coord) {
	            return coord[0] > oldX;
	        })) return [ _.min(_.map(coords, function(coord) {
	            return coord[0];
	        })) - graph.snapStep[0], oldCoord[1] ];
	        return [ _.max(_.map(coords, function(coord) {
	            return coord[0];
	        })) + graph.snapStep[0], oldCoord[1] ];
	    },
	    allowReflectOverAsymptote: true,
	    getCoefficients: function getCoefficients(coords, asymptote) {
	        // It's easiest to calculate the logarithm's coefficients by thinking
	        // about it as the inverse of the exponential, so we flip x and y and
	        // perform some algebra on the coefficients. This also unifies the
	        // logic between the two 'models'.
	        var flip = function flip(coord) {
	            return [ coord[1], coord[0] ];
	        };
	        var inverseCoeffs = Exponential.getCoefficients(_.map(coords, flip), _.map(asymptote, flip));
	        var c = -inverseCoeffs[2] / inverseCoeffs[0];
	        var b = 1 / inverseCoeffs[0];
	        return [ 1 / inverseCoeffs[1], b, c ];
	    },
	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x, asymptote) {
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
	        return a * Math.log(b * x + c);
	    },
	    getEquationString: function getEquationString(coords, asymptote) {
	        if (!asymptote) return null;
	        var coeffs = this.getCoefficients(coords, asymptote);
	        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
	        return "y = ln(" + a.toFixed(3) + "x + " + b.toFixed(3) + ") + " + c.toFixed(3);
	    }
	});

	var AbsoluteValue = _.extend({}, PlotDefaults, {
	    url: "https://ka-perseus-graphie.s3.amazonaws.com/8256a630175a0cb1d11de223d6de0266daf98721.png",
	    defaultCoords: [ [ .5, .5 ], [ .75, .75 ] ],
	    getCoefficients: function getCoefficients(coords) {
	        var p1 = coords[0];
	        var p2 = coords[1];
	        var denom = p2[0] - p1[0];
	        var num = p2[1] - p1[1];
	        if (0 === denom) return;
	        var m = Math.abs(num / denom);
	        p2[1] < p1[1] && (m *= -1);
	        return [ m, p1[0], p1[1] ];
	    },
	    getFunctionForCoeffs: function getFunctionForCoeffs(coeffs, x) {
	        var m = coeffs[0], horizontalOffset = coeffs[1], verticalOffset = coeffs[2];
	        return m * Math.abs(x - horizontalOffset) + verticalOffset;
	    },
	    getEquationString: function getEquationString(coords) {
	        var coeffs = this.getCoefficients(coords);
	        var m = coeffs[0], horizontalOffset = coeffs[1], verticalOffset = coeffs[2];
	        return "y = " + m.toFixed(3) + "| x - " + horizontalOffset.toFixed(3) + "| + " + verticalOffset.toFixed(3);
	    }
	});

	/* Utility functions for dealing with graphing interfaces. */
	var functionTypeMapping = {
	    linear: Linear,
	    quadratic: Quadratic,
	    sinusoid: Sinusoid,
	    tangent: Tangent,
	    exponential: Exponential,
	    logarithm: Logarithm,
	    absolute_value: AbsoluteValue
	};

	var allTypes = _.keys(functionTypeMapping);

	function functionForType(type) {
	    return functionTypeMapping[type];
	}

	var GrapherUtil = {
	    validate: function validate(state, rubric) {
	        if (state.type !== rubric.correct.type) return {
	            type: "points",
	            earned: 0,
	            total: 1,
	            message: null
	        };
	        // We haven't moved the coords
	        if (null == state.coords) return {
	            type: "invalid",
	            message: null
	        };
	        // Get new function handler for grading
	        var grader = functionForType(state.type);
	        var guessCoeffs = grader.getCoefficients(state.coords, state.asymptote);
	        var correctCoeffs = grader.getCoefficients(rubric.correct.coords, rubric.correct.asymptote);
	        return null == guessCoeffs || null == correctCoeffs ? {
	            type: "invalid",
	            message: null
	        } : grader.areEqual(guessCoeffs, correctCoeffs) ? {
	            type: "points",
	            earned: 1,
	            total: 1,
	            message: null
	        } : {
	            type: "points",
	            earned: 0,
	            total: 1,
	            message: null
	        };
	    },
	    getEquationString: function getEquationString(props) {
	        var plot = props.plot;
	        if (plot.type && plot.coords) {
	            return functionForType(plot.type).getEquationString(plot.coords, plot.asymptote) || "";
	        }
	        return "";
	    },
	    pointsFromNormalized: function pointsFromNormalized(coordsList, range, step, snapStep) {
	        var numSteps = function numSteps(range, step) {
	            return Math.floor((range[1] - range[0]) / step);
	        };
	        return _.map(coordsList, function(coords) {
	            var unsnappedPoint = _.map(coords, function(coord, i) {
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
	        return coordsList ? this.pointsFromNormalized(coordsList, range, step, snapStep) : coordsList;
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
	        var gridStep = [ 1, 1 ];
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
	        return {
	            gridStep: gridStep,
	            snapStep: options.snapStep || Util.snapStepFromGridStep(gridStep)
	        };
	    }
	};

	var DEFAULT_GRAPHER_PROPS = {};

	DEFAULT_GRAPHER_PROPS.graph = {
	    labels: [ "x", "y" ],
	    range: [ [ -10, 10 ], [ -10, 10 ] ],
	    step: [ 1, 1 ],
	    backgroundImage: DEFAULT_BACKGROUND_IMAGE,
	    markings: "graph",
	    rulerLabel: "",
	    rulerTicks: 10,
	    valid: true,
	    showTooltips: false
	};

	DEFAULT_GRAPHER_PROPS.plot = GrapherUtil.defaultPlotProps("linear", DEFAULT_GRAPHER_PROPS.graph);

	DEFAULT_GRAPHER_PROPS.availableTypes = [ DEFAULT_GRAPHER_PROPS.plot.type ];

	function typeToButton(type) {
	    var capitalized = type.charAt(0).toUpperCase() + type.substring(1);
	    return {
	        value: type,
	        title: capitalized,
	        content: React.createElement("img", {
	            src: functionForType(type).url,
	            alt: capitalized
	        })
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable brace-style */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
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
	    if (null === item.value) return;
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
	    return function(item) {
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
	    bgColor: "rgb(255, 255, 255)",
	    fgColor: "rgb(0, 0, 0)",
	    fontSizePx: 12,
	    lineWidth: 1
	};

	styles.font = styles.fontSizePx + "px sans";

	module.exports = draw;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* eslint-disable brace-style */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
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
	    return [ x + Math.cos(2 * angle * Math.PI / 360) * length, y + -1 * Math.sin(2 * angle * Math.PI / 360) * length ];
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
	    "C" === textValue && 1 !== Object.keys(atoms).length && (// By convention, don't render the C for carbon in a chain.
	    textValue = null);
	    if ("1,0" === atom.idx) {
	        // The first atom is special-cased because there are no neighbors for
	        // relative positioning.
	        var _pos = [ 0, 0 ];
	        atom.pos = _pos;
	        // Conventionally, molecules are rendered where the first bond is not
	        // horizontal, but at a 30 degree angle, so subtract 30 degrees for the
	        // first atom's direction.
	        atom.baseAngle = -30 + rotationAngle;
	        return {
	            type: "text",
	            value: textValue,
	            pos: _pos,
	            idx: atom.idx
	        };
	    }
	    // If we're an atom with any other index than the case just handled, we're
	    // guaranteed to have a neighbor who has a defined position.
	    var prevPositionedAtom = atoms[atom.connections.find(function(c) {
	        return atoms[c].pos;
	    })];
	    // Find this atom's index in the previous atom's connections
	    var myIndex = prevPositionedAtom.connections.indexOf(atom.idx);
	    var baseAngleIncrement = 60;
	    var angleIncrement = 120;
	    if (4 === prevPositionedAtom.connections.length) {
	        // By convention, if an atom has 4 bonds, we represent it with 90
	        // degree angles in 2D, even though it would have tetrahedral geometry
	        // with ~110 degree angles in 3D.
	        angleIncrement = 90;
	        baseAngleIncrement = 90;
	    } else if (bonds.find(function(bond) {
	        return "triple" === bond.bondType && bond.to === atom.idx;
	    }) || bonds.find(function(bond) {
	        return "triple" === bond.bondType && bond.to === prevPositionedAtom.idx;
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
	    angle = parseInt(lastAtomIdx) % 2 !== 0 ? prevPositionedAtom.baseAngle - (baseAngleIncrement - angleIncrement * myIndex) : prevPositionedAtom.baseAngle + (baseAngleIncrement - angleIncrement * myIndex);
	    var pos = polarAdd(prevPositionedAtom.pos, angle, bondLength);
	    atom.pos = pos;
	    atom.baseAngle = angle;
	    return {
	        type: "text",
	        value: textValue,
	        pos: pos,
	        idx: atom.idx
	    };
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
	    var shrinkFactor = .25;
	    var fromPos = [ fromAtom.pos[0], fromAtom.pos[1] ];
	    var toPos = [ toAtom.pos[0], toAtom.pos[1] ];
	    "C" !== fromAtom.symbol && (fromPos = [ toAtom.pos[0] - .75 * (toAtom.pos[0] - fromAtom.pos[0]), toAtom.pos[1] - .75 * (toAtom.pos[1] - fromAtom.pos[1]) ]);
	    "C" !== toAtom.symbol && (// For carbon atoms, conventionally we don't draw any letter, so this
	    // special cases drawing the bond lines all the way to the point where
	    // they meet.
	    toPos = [ fromAtom.pos[0] - .75 * (fromAtom.pos[0] - toAtom.pos[0]), fromAtom.pos[1] - .75 * (fromAtom.pos[1] - toAtom.pos[1]) ]);
	    return [ fromPos, toPos ];
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
	    if (null === tree) return [ atoms, bonds ];
	    if ("atom" === tree.type) {
	        var treeIdx = idxString(tree.idx);
	        atoms[treeIdx] = {
	            idx: treeIdx,
	            symbol: tree.symbol,
	            connections: []
	        };
	        tree.bonds && tree.bonds.forEach(function(b) {
	            var toIdx = idxString(b.to.idx);
	            atoms[treeIdx].connections.push(toIdx);
	            bonds.push({
	                from: treeIdx,
	                to: toIdx,
	                bondType: b.bondType
	            });
	            convertTree(atoms, bonds, b.to);
	            atoms[toIdx].connections.push(treeIdx);
	        });
	    }
	    return [ atoms, bonds ];
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
	    if (0 === atomProcessingQueue.length) return outputs;
	    var queuedAtomIdx = atomProcessingQueue.shift();
	    var atom = atoms[queuedAtomIdx];
	    atom.connections.forEach(function(c) {
	        atoms[c].pos || atomProcessingQueue.push(c);
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
	    if (0 === bonds.length) return outputs;
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
	    return bondLayoutHelper(atomLayoutHelper([], [ "1,0" ], atoms, bonds, rotationAngle), atoms, bonds);
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
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

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
	    newObj = Array.isArray(obj) ? [].concat(obj) : _extends({}, obj || {});
	    var newVal = val;
	    rest.length > 0 && (newVal = _mset(newObj[k0], rest, val));
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
	    return _mset(obj, keylist, keylist.reduce(function(acc, elt) {
	        return acc[elt];
	    }, obj) + 1);
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
	    if ("=" === firstChar) return parse(rest, _mset(ctx, [ "bond", "bondType" ], "double"));
	    if ("#" === firstChar) return parse(rest, _mset(ctx, [ "bond", "bondType" ], "triple"));
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
	    if (0 === parenStack.length) return smiles;
	    if ("" === smiles) throw new ParseError("Mismatched parentheses");
	    var firstChar = smiles[0];
	    var rest = smiles.slice(1);
	    if ("(" === firstChar) return sliceFromMatchingCloseParen(rest, parenStack.concat(firstChar));
	    if (")" === firstChar) return sliceFromMatchingCloseParen(rest, parenStack.slice(1));
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
	    if ("(" === firstChar) {
	        var newCtx = _extends({}, ctx, {
	            parens: ctx.parens + "("
	        });
	        // increment the branch index
	        newCtx = _inc(ctx, [ "idx", ctx.idx.length - 1, 1 ]);
	        var inBranchIdx = -1;
	        ctx.idx[ctx.idx.length - 1][0] % 2 === 0 && (// HACK(colin): this is so that we preserve the odd/even series in
	        // indices in branches; the layout engine uses this to select
	        // angles, and if we don't do this, editing one part of a molecule
	        // can cause another to flop around oddly.
	        // TODO(colin): this should just start at 0 all the time, and the
	        // layout engine should figure out continuity.
	        inBranchIdx = 0);
	        return [ parse(rest, _extends({}, newCtx, {
	            idx: newCtx.idx.concat([ [ inBranchIdx, 0 ] ]),
	            parens: newCtx.parens.concat("(")
	        })) ].concat(parse(sliceFromMatchingCloseParen(rest, [ "(" ]), newCtx));
	    }
	    if (")" === firstChar) {
	        if ("(" !== ctx.parens[ctx.parens.length - 1]) throw new ParseError("Mismatched parentheses");
	        return null;
	    }
	    throw new ParseError("Invalid bare character: " + firstChar);
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
	    if ("[" === smiles[0]) {
	        var closingIdx = smiles.indexOf("]");
	        if (-1 === closingIdx) return [ "", smiles ];
	        sym = smiles.slice(1, closingIdx);
	        rest = smiles.slice(closingIdx + 1);
	    } else {
	        sym = atomRe.exec(smiles)[1];
	        rest = smiles.slice(sym.length);
	    }
	    return [ sym, rest ];
	}

	/**
	 * Parse the next atom in the molecule, returning an atom object if this is the
	 * first atom in the molecule, or a bond object with this atom as the
	 * destination of the bond if this is not the first atom.
	 */
	function parseAtom(smiles, ctx) {
	    var symbolInfo = readAtomSymbol(smiles, ctx);
	    var atom = symbolInfo[0];
	    if ("" === atom) return [ "error", "Unable to parse bracketed atom." ];
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
	    var newCtx = _mset(ctx, [ "idx", ctx.idx.length - 1 ], [ 1 + ctx.idx[ctx.idx.length - 1][0], 0 ]);
	    var restOfMolecule = parse(rest, _mset(newCtx, [ "bond", "bondType" ], "single"));
	    Array.isArray(restOfMolecule) || !restOfMolecule || (//TODO(colin): fix this awkwardness.
	    restOfMolecule = [ restOfMolecule ]);
	    var atomObj = {
	        type: "atom",
	        symbol: atom,
	        bonds: restOfMolecule,
	        idx: newCtx.idx
	    };
	    if (ctx.bond) return {
	        type: "bond",
	        bondType: ctx.bond.bondType,
	        to: atomObj
	    };
	    return atomObj;
	}

	function startsWithAtom(s) {
	    return atomRe.test(s);
	}

	function isModifierChar(s) {
	    return "=" === s || "#" === s;
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
	    if (!validate(smiles)) throw new ParseError("Invalid input.");
	    if (!smiles || 0 === smiles.length) return null;
	    return startsWithAtom(smiles) ? parseAtom(smiles, ctx || {
	        idx: [ [ 0, 0 ] ],
	        parens: [],
	        stack: [],
	        bondModifiers: []
	    }) : isModifierChar(smiles[0]) ? parseBondModifier(smiles, ctx) : parseParenthesizedExpression(smiles, ctx);
	}

	module.exports = {
	    parse: parse,
	    ParseError: ParseError
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
	}

	function _inherits(subClass, superClass) {
	    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	        constructor: {
	            value: subClass,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        }
	    });
	    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
	}

	/**
	 * The entry point for highlighting!
	 *
	 * Given a content node and a set of serialized highlights, this component
	 * renders the content with the given highlights applied. The content's DOM is
	 * not modified by this process, so any content should be safe to pass to this
	 * component.
	 *
	 * This component also renders controls for the user to add/remove/update
	 * highlights. When the user does so, this component will update the full set
	 * of highlights, serialize them, and call `onSerializedHighlightsUpdate` with
	 * new set of serialized highlights, which you can then persist and send back
	 * down to this component. Easy peasy!
	 */
	var React = __webpack_require__(11);

	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var HighlightingUI = __webpack_require__(190);

	var WordIndexer = __webpack_require__(180);

	var _require2 = __webpack_require__(181), addHighlight = _require2.addHighlight, buildHighlight = _require2.buildHighlight, deserializeHighlight = _require2.deserializeHighlight, serializeHighlight = _require2.serializeHighlight;

	var babelPluginFlowReactPropTypes_proptype_DOMRange = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMRange || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_SerializedHighlightSet = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_SerializedHighlightSet || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMHighlightSet = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMHighlightSet || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMHighlight = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMHighlight || __webpack_require__(11).PropTypes.any;

	var HighlightableContent = function(_React$PureComponent) {
	    _inherits(HighlightableContent, _React$PureComponent);
	    function HighlightableContent() {
	        var _temp, _this, _ret;
	        _classCallCheck(this, HighlightableContent);
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [ this ].concat(args))), 
	        _this), _this.state = {
	            wordRanges: []
	        }, _this._handleAddHighlight = function(highlight) {
	            var newDomHighlights = addHighlight(_this._getDOMHighlights(), highlight);
	            var newSerializedHighlights = {};
	            for (var _iterator = Object.keys(newDomHighlights), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
	                var _ref;
	                if (_isArray) {
	                    if (_i >= _iterator.length) break;
	                    _ref = _iterator[_i++];
	                } else {
	                    _i = _iterator.next();
	                    if (_i.done) break;
	                    _ref = _i.value;
	                }
	                var key = _ref;
	                newSerializedHighlights[key] = serializeHighlight(newDomHighlights[key]);
	            }
	            _this.props.onSerializedHighlightsUpdate(newSerializedHighlights);
	        }, _this._handleRemoveHighlight = function(keyToRemove) {
	            var serializedHighlights = _this.props.serializedHighlights;
	            var newSerializedHighlights = _extends({}, serializedHighlights);
	            delete newSerializedHighlights[keyToRemove];
	            _this.props.onSerializedHighlightsUpdate(newSerializedHighlights);
	        }, _this._handleWordsUpdate = function(wordRanges) {
	            _this.setState({
	                wordRanges: wordRanges
	            });
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	    // References to the mounted container and content divs.
	    HighlightableContent.prototype._buildHighlight = function _buildHighlight(highlightRange) {
	        // TODO(mdr): If _buildHighlight starts getting called more often, we
	        //     might want to cache the DOMHighlightSet instead of recomputing
	        //     it here.
	        return buildHighlight(this._getDOMHighlights(), this.state.wordRanges, highlightRange);
	    };
	    /**
	     * Take the highlights from props, and deserialize them into DOMHighlights,
	     * according to the latest cache of word ranges.
	     */
	    HighlightableContent.prototype._getDOMHighlights = function _getDOMHighlights() {
	        var serializedHighlights = this.props.serializedHighlights;
	        var wordRanges = this.state.wordRanges;
	        var domHighlights = {};
	        for (var _iterator2 = Object.keys(serializedHighlights), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
	            var _ref2;
	            if (_isArray2) {
	                if (_i2 >= _iterator2.length) break;
	                _ref2 = _iterator2[_i2++];
	            } else {
	                _i2 = _iterator2.next();
	                if (_i2.done) break;
	                _ref2 = _i2.value;
	            }
	            var key = _ref2;
	            domHighlights[key] = deserializeHighlight(serializedHighlights[key], wordRanges);
	        }
	        return domHighlights;
	    };
	    /**
	     * Add the given DOMHighlight to the current set.
	     */
	    /**
	     * Remove the given highlight from the list, and call our callback with the
	     * new set of highlights.
	     */
	    /**
	     * When our WordIndexer sends us a new cache of word ranges, store it in
	     * our component state.
	     */
	    HighlightableContent.prototype.render = function render() {
	        var _this2 = this;
	        var highlights = this._getDOMHighlights();
	        // NOTE(mdr): This lambda is rebuilt every time this component updates,
	        //     so every update to HighlightableContent triggers an update in
	        //     the child HighlightingUI and SelectionTracker, even if the
	        //     behavior hasn't changed.
	        //
	        //     Over-updating is preferable to under-updating here, because some
	        //     updates in this component's props/state *do* affect
	        //     `buildHighlight`'s behavior, and *should* trigger an update.
	        //
	        //     A more performant approach would be to cache this function
	        //     object until its implicitly-bound inputs change. If profiling
	        //     leads us to implement such caching, this draft might be a good
	        //     starting point: https://phabricator.khanacademy.org/D35623?id=170698
	        var buildHighlight = function buildHighlight(r) {
	            return _this2._buildHighlight(r);
	        };
	        return React.createElement("div", {
	            className: css(styles.container),
	            ref: function ref(container) {
	                return _this2._container = container;
	            }
	        }, React.createElement("div", null, this.props.enabled && this._container && this._content && React.createElement(HighlightingUI, {
	            buildHighlight: buildHighlight,
	            contentNode: this._content,
	            editable: this.props.editable,
	            highlights: highlights,
	            offsetParent: this._container,
	            zIndexes: {
	                // The content has a z-index of 1, so, to be above
	                // or below the content, use z-index of 2 or 0,
	                // respectively.
	                aboveContent: 2,
	                belowContent: 0
	            },
	            onAddHighlight: this._handleAddHighlight,
	            onRemoveHighlight: this._handleRemoveHighlight
	        })), React.createElement("div", {
	            className: css(styles.content),
	            ref: function ref(content) {
	                return _this2._content = content;
	            }
	        }, React.createElement(WordIndexer, {
	            onWordsUpdate: this._handleWordsUpdate
	        }, this.props.children)));
	    };
	    return HighlightableContent;
	}(React.PureComponent);

	HighlightableContent.propTypes = {
	    children: __webpack_require__(11).PropTypes.any,
	    editable: __webpack_require__(11).PropTypes.bool.isRequired,
	    enabled: __webpack_require__(11).PropTypes.bool.isRequired,
	    onSerializedHighlightsUpdate: __webpack_require__(11).PropTypes.func.isRequired,
	    serializedHighlights: babelPluginFlowReactPropTypes_proptype_SerializedHighlightSet
	};

	var styles = StyleSheet.create({
	    // We render content with z-index 1, and highlights with z-index 0, so that
	    // content will receive the browser's native pointer events. (Highlights
	    // have their own magic code to manage hover detection, despite being
	    // behind the content.)
	    container: {
	        // Position the container and give it a z-index, to scope the z-indexes
	        // inside by creating a stacking context.
	        // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
	        //
	        // This way, content's z-index of 1, and highlights' z-index of 0, and
	        // tooltips' z-index of 2 don't interact with anything external;
	        // external UI will see `HighlightableContent` as a single flat layer
	        // with a z-index of 0. This removes the need for us to coordinate our
	        // choices of z-index with external UI.
	        position: "relative",
	        zIndex: 0
	    },
	    content: {
	        // NOTE(mdr): Creating a stacking context for content of z-index 1 may
	        //    be problematic if the content and external page want to
	        //    interleave layers between each other, e.g., if the application UI
	        //    wants to render something above some parts of our content, but
	        //    below other parts. It's not relevant for the current Passage-only
	        //    call site, but could be relevant someday…
	        position: "relative",
	        zIndex: 1
	    }
	});

	module.exports = HighlightableContent;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * A highlight, defined relative to the current DOM.
	 *
	 * A DOMHighlight, by depending on DOMRange, is inherently coupled to a
	 * particular DOM session, and must be serialized into a SerializedRange before
	 * being persisted.
	 */
	/**
	 * A range of highlightable content, defined relative to the current DOM.
	 *
	 * This is actually just the built-in DOM type Range, aliased for consistency
	 * with DOMHighlight and SerializedHighlight.
	 * https://developer.mozilla.org/en-US/docs/Web/API/Range
	 *
	 * A DOMRange is inherently coupled to a particular DOM session, and must be
	 * serialized into a SerializedRange before being persisted.
	 */
	Object.defineProperty(module.exports, "babelPluginFlowReactPropTypes_proptype_SerializedRange", __webpack_require__(11).PropTypes.shape({
	    type: __webpack_require__(11).PropTypes.oneOf([ "word-indexes" ]).isRequired,
	    firstWordIndex: __webpack_require__(11).PropTypes.number.isRequired,
	    lastWordIndex: __webpack_require__(11).PropTypes.number.isRequired
	}));

	/**
	 * A range of highlightable content, serialized into a DOM-independent format
	 * so that it can be restored in subsequent browser sessions.
	 *
	 * We currently serialize ranges by the index of the first highlighted word and
	 * index of the last highlighted word, each with respect to the full body of
	 * the highlightable content.
	 *
	 * TODO(mdr): Word index serialization is fragile in environments where the
	 *     highlightable content is liable to change. Currently, our only call
	 *     sites is the test prep app, which saves Perseus state against a
	 *     particular *version* of a Perseus item, so it's impossible for the
	 *     content to change - but, if we try to generalize further, we'll need to
	 *     create new types of range serialization that are more robust to change.
	 *     (Maybe some quoted text, and we scan the content for matches?)
	 *
	 *     Note, too, that changes to the definition of "word" are liable to break
	 *     already-persisted word-index ranges, too. If we significantly change the
	 *     definition, we should consider adding a versioning field here - even if
	 *     we don't support *all* historical word implementations, we still might
	 *     want to hide old highlights altogether if our word definition has
	 *     changed sufficiently radically.
	 */
	Object.defineProperty(module.exports, "babelPluginFlowReactPropTypes_proptype_DOMHighlight", __webpack_require__(11).PropTypes.shape({
	    firstWordIndex: __webpack_require__(11).PropTypes.number.isRequired,
	    lastWordIndex: __webpack_require__(11).PropTypes.number.isRequired,
	    domRange: __webpack_require__(11).PropTypes.any.isRequired
	}));

	/**
	 * A highlight, serialized into a DOM-independent format so that it can be
	 * restored in subsequent browser sessions.
	 */
	Object.defineProperty(module.exports, "babelPluginFlowReactPropTypes_proptype_DOMHighlightSet", __webpack_require__(11).PropTypes.shape({}));

	Object.defineProperty(module.exports, "babelPluginFlowReactPropTypes_proptype_SerializedHighlight", __webpack_require__(11).PropTypes.shape({
	    range: __webpack_require__(11).PropTypes.shape({
	        type: __webpack_require__(11).PropTypes.oneOf([ "word-indexes" ]).isRequired,
	        firstWordIndex: __webpack_require__(11).PropTypes.number.isRequired,
	        lastWordIndex: __webpack_require__(11).PropTypes.number.isRequired
	    }).isRequired
	}));

	Object.defineProperty(module.exports, "babelPluginFlowReactPropTypes_proptype_SerializedHighlightSet", __webpack_require__(11).PropTypes.shape({}));

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
	/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
	/* To fix, remove an entry above, run ka-lint, and fix errors. */
	/* globals $_ */
	var React = __webpack_require__(11);

	var SimpleMarkdown = __webpack_require__(125);

	var _ = __webpack_require__(10);

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
	        return React.createElement("span", {
	            style: REF_STYLE
	        }, "_");
	    },
	    getRefContent: function getRefContent() {
	        return this.props.refContent;
	    }
	});

	var RefEnd = React.createClass({
	    displayName: "RefEnd",
	    render: function render() {
	        return React.createElement("span", {
	            style: REF_STYLE
	        }, "_");
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
	                text: 1 === id ? "*" : "" + id
	            };
	            // If the previous footnote was a *, we need to adjust it to be
	            // a number, since now we know there is more than one footnote
	            "*" === state.lastFootnote.text && (state.lastFootnote.text = "" + state.lastFootnote.id);
	            // and update our last footnote, + return.
	            state.lastFootnote = footnote;
	            return footnote;
	        },
	        react: function react(node, output, state) {
	            return React.createElement("sup", {
	                key: state.key
	            }, node.text);
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
	                var closeIndex = 2;
	                // start looking after the opening "{{"
	                var refNestingLevel = 0;
	                // Find the closing "}}" for our opening "{{"
	                while (closeIndex < source.length) {
	                    var token = source.slice(closeIndex, closeIndex + 2);
	                    if ("{{" === token) {
	                        refNestingLevel++;
	                        // increment an extra character so we get the
	                        // full 2-char token
	                        closeIndex++;
	                    } else if ("}}" === token) {
	                        if (!(refNestingLevel > 0)) break;
	                        refNestingLevel--;
	                        // increment an extra character so we get the
	                        // full 2-char token
	                        closeIndex++;
	                    }
	                    closeIndex++;
	                }
	                var refText = source.slice(2, closeIndex);
	                // A "magic" capture that matches the opening {{
	                // but captures the full ref text internally :D
	                return [ capture[0], refText ];
	            }
	            return null;
	        },
	        parse: function parse(capture, _parse2, state) {
	            if (!state.useRefs) return {
	                ref: null,
	                refContent: null
	            };
	            var ref = state.lastRef + 1;
	            state.lastRef = ref;
	            state.currentRef.push(ref);
	            return {
	                ref: ref,
	                refContent: _parse2(// Curly quotes
	                "(“" + capture[1] + "”)\n\n", _.defaults({
	                    // We don't want to parse refs while looking through
	                    // this refs contents. We definitely don't want
	                    // to make those refs into react refs on the
	                    // passage, for instance!
	                    useRefs: false
	                }, INITIAL_PARSE_STATE))
	            };
	        },
	        react: function react(node, output, state) {
	            if (null == node.ref) return null;
	            // We don't pass state here because this is parsed
	            // and output out-of-band. We don't want to affect
	            // our state by the double-output here :).
	            var refContent = output(node.refContent, {});
	            return React.createElement(RefStart, {
	                ref: START_REF_PREFIX + node.ref,
	                key: START_REF_PREFIX + node.ref,
	                refContent: refContent
	            });
	        }
	    },
	    refEnd: {
	        order: SimpleMarkdown.defaultRules.escape.order + .3,
	        match: SimpleMarkdown.inlineRegex(/^\}\}/),
	        parse: function parse(capture, _parse3, state) {
	            if (!state.useRefs) return {
	                ref: null
	            };
	            return {
	                ref: state.currentRef.pop() || null
	            };
	        },
	        react: function react(node, output, state) {
	            return null != node.ref ? React.createElement(RefEnd, {
	                ref: END_REF_PREFIX + node.ref,
	                key: END_REF_PREFIX + node.ref
	            }) : null;
	        }
	    },
	    squareLabel: {
	        order: SimpleMarkdown.defaultRules.escape.order + .4,
	        match: SimpleMarkdown.inlineRegex(/^\[\[(\w+)\]\]( *)/),
	        parse: function parse(capture, _parse4, state) {
	            state.firstQuestionRef || (state.firstQuestionRef = capture[1]);
	            return {
	                content: capture[1],
	                space: capture[2].length > 0
	            };
	        },
	        react: function react(node, output, state) {
	            return [ React.createElement("span", {
	                key: "visual-square",
	                className: "perseus-passage-square-label",
	                style: LABEL_OUTER_STYLE,
	                "aria-hidden": "true"
	            }, React.createElement("span", {
	                style: SQUARE_LABEL_STYLE
	            }, node.content)), React.createElement("span", {
	                key: "alt-text",
	                className: "perseus-sr-only"
	            }, $_({
	                number: node.content
	            }, "[Marker for question %(number)s]")), node.space ? " " : null ];
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
	            return [ React.createElement("span", {
	                key: "visual-circle",
	                className: "perseus-passage-circle-label",
	                style: LABEL_OUTER_STYLE,
	                "aria-hidden": true
	            }, React.createElement("span", {
	                style: CIRCLE_LABEL_STYLE
	            }, node.content)), React.createElement("span", {
	                key: "alt-text",
	                className: "perseus-sr-only"
	            }, $_({
	                number: node.content
	            }, "[Circle marker %(number)s]")), node.space ? " " : null ];
	        }
	    },
	    squareBracketRef: {
	        order: SimpleMarkdown.defaultRules.escape.order + .6,
	        match: SimpleMarkdown.inlineRegex(/^\[(\d+)\]( *)/),
	        parse: function parse(capture, _parse6, state) {
	            state.firstSentenceRef || (state.firstSentenceRef = capture[1]);
	            return {
	                content: capture[1],
	                space: capture[2].length > 0
	            };
	        },
	        react: function react(node, output, state) {
	            return [ React.createElement("span", {
	                key: "visual-brackets",
	                className: "perseus-passage-bracket-label",
	                "aria-hidden": "true"
	            }, "[", node.content, "]"), React.createElement("span", {
	                key: "alt-text",
	                className: "perseus-sr-only"
	            }, $_({
	                number: node.content
	            }, "[Sentence %(number)s]")), node.space ? " " : null ];
	        }
	    },
	    highlight: {
	        order: SimpleMarkdown.defaultRules.escape.order + .7,
	        match: SimpleMarkdown.inlineRegex(/^{highlighting.start}(.+?){highlighting.end}/),
	        parse: function parse(capture, _parse7, state) {
	            return {
	                content: capture[1]
	            };
	        },
	        react: function react(node, output, state) {
	            return [ React.createElement("span", {
	                className: "perseus-highlight"
	            }, node.content) ];
	        }
	    },
	    reviewHighlight: {
	        order: SimpleMarkdown.defaultRules.escape.order + .7,
	        match: SimpleMarkdown.inlineRegex(/^{review-highlighting.start}(.+?){review-highlighting.end}/),
	        parse: function parse(capture, _parse8, state) {
	            return {
	                content: capture[1]
	            };
	        },
	        react: function react(node, output, state) {
	            return [ React.createElement("span", {
	                className: "perseus-review-highlight"
	            }, node.content) ];
	        }
	    },
	    strong: SimpleMarkdown.defaultRules.strong,
	    u: SimpleMarkdown.defaultRules.u,
	    em: SimpleMarkdown.defaultRules.em,
	    del: SimpleMarkdown.defaultRules.del,
	    text: _extends({}, SimpleMarkdown.defaultRules.text, {
	        react: function react(node, output, state) {
	            return React.createElement("span", {
	                key: state.key
	            }, node.content);
	        }
	    })
	};

	var INITIAL_PARSE_STATE = {
	    currentRef: [],
	    useRefs: true,
	    lastRef: 0,
	    lastFootnote: {
	        id: 0,
	        text: ""
	    }
	};

	var builtParser = SimpleMarkdown.parserFor(rules);

	var parse = function parse(source, state) {
	    state = state || {};
	    return builtParser(source + "\n\n", _.extend(state, INITIAL_PARSE_STATE));
	};

	module.exports = {
	    parse: parse,
	    output: SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, "react")),
	    START_REF_PREFIX: START_REF_PREFIX,
	    END_REF_PREFIX: END_REF_PREFIX,
	    _rulesForTesting: rules
	};

/***/ },
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
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
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var StyleSheet = __webpack_require__(14).StyleSheet;

	var button = StyleSheet.create({
	    buttonStyle: {
	        backgroundColor: "white",
	        border: "1px solid #ccc",
	        borderLeft: "0",
	        cursor: "pointer",
	        margin: "0",
	        padding: "5px 10px",
	        position: "relative",
	        // for hover
	        ":first-child": {
	            borderLeft: "1px solid #ccc",
	            borderTopLeftRadius: "3px",
	            borderBottomLeftRadius: "3px"
	        },
	        ":last-child": {
	            borderRight: "1px solid #ccc",
	            borderTopRightRadius: "3px",
	            borderBottomRightRadius: "3px"
	        },
	        ":hover": {
	            backgroundColor: "#ccc"
	        },
	        ":focus": {
	            zIndex: "2"
	        }
	    },
	    selectedStyle: {
	        backgroundColor: "#ddd"
	    }
	});

	module.exports = {
	    button: button
	};

/***/ },
/* 172 */,
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var React = __webpack_require__(11);

	var colors = {
	    grayLight: "#aaa",
	    basicBorderColor: "#ccc",
	    white: "#fff"
	};

	var triangleBeforeAfter = {
	    borderBottom: "9px solid transparent",
	    borderTop: "9px solid transparent",
	    content: '" "',
	    height: "0",
	    position: "absolute",
	    top: "0",
	    width: "0"
	};

	var styles = StyleSheet.create({
	    infoTip: {
	        display: "inline-block",
	        marginLeft: "5px",
	        position: "relative"
	    },
	    infoTipContainer: {
	        position: "absolute",
	        top: "-12px",
	        left: "22px",
	        zIndex: "1000"
	    },
	    infoTipTriangle: {
	        height: "10px",
	        left: "0",
	        position: "absolute",
	        top: "8px",
	        width: "0",
	        zIndex: "1",
	        ":before": Object.assign({}, triangleBeforeAfter, {
	            borderRight: "9px solid #bbb",
	            right: "0"
	        }),
	        ":after": Object.assign({}, triangleBeforeAfter, {
	            borderRight: "9px solid " + colors.white,
	            right: "-1px"
	        })
	    },
	    verticalShadow: {
	        border: "1px solid " + colors.basicBorderColor,
	        boxShadow: "0 1px 3px " + colors.basicBorderColor,
	        borderBottom: "1px solid " + colors.grayLight
	    },
	    infoTipContentContainer: {
	        background: colors.white,
	        padding: "5px 10px",
	        width: "240px"
	    }
	});

	var questionMark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2N2M3NTAxYS04YmVlLTQ0M2MtYmRiNS04OGM2N2IxN2NhYzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUJCRTk4Qjc4NjAwMTFFMzg3QUJDNEI4Mzk2QTRGQkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUJCRTk4QjY4NjAwMTFFMzg3QUJDNEI4Mzk2QTRGQkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NGE5ZDI0OTMtODk1NC00OGFkLTlhMTgtZDAwM2MwYWNjNDJlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY3Yzc1MDFhLThiZWUtNDQzYy1iZGI1LTg4YzY3YjE3Y2FjMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pqm89uYAAADMSURBVHjaXJA9DoJAEIUH1M4TUHIFsCMGen9OwCGw1YRGW2ntKel0exsojHIBC0ouQAyUviFDstmXfNmZeS+zm7XSNCXRFiRgJf0bXIHixpbhGdxBBJYC1w/xaA424MhNEATkui71fU9KqfEU78UbD9PdbJRlOdae55GmhIP+1NV1TcMwkOM41DSNHvRtMhTHMRVFQW3b6mOLgx99kue5GRp/gIOZuZGvNpTNwjD8oliANU+qqqKu6/TQBdymN57AHjzBT+B6Jx79BRgAvc49kQA4yxgAAAAASUVORK5CYII=";

	var InfoTip = React.createClass({
	    displayName: "InfoTip",
	    propTypes: {
	        children: React.PropTypes.node
	    },
	    getInitialState: function getInitialState() {
	        return {
	            hover: false
	        };
	    },
	    handleMouseEnter: function handleMouseEnter() {
	        this.setState({
	            hover: true
	        });
	    },
	    handleMouseLeave: function handleMouseLeave() {
	        this.setState({
	            hover: false
	        });
	    },
	    render: function render() {
	        return React.createElement("div", {
	            className: css(styles.infoTip)
	        }, React.createElement("img", {
	            width: 10,
	            height: 10,
	            src: questionMark,
	            onMouseEnter: this.handleMouseEnter,
	            onMouseLeave: this.handleMouseLeave
	        }), React.createElement("div", {
	            className: css(styles.infoTipContainer),
	            style: {
	                display: this.state.hover ? "block" : "none"
	            }
	        }, React.createElement("div", {
	            className: css(styles.infoTipTriangle)
	        }), React.createElement("div", {
	            className: css(styles.verticalShadow, styles.infoTipContentContainer)
	        }, this.props.children)));
	    }
	});

	module.exports = InfoTip;

/***/ },
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
	}

	function _inherits(subClass, superClass) {
	    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	        constructor: {
	            value: subClass,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        }
	    });
	    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
	}

	/**
	 * This component, whenever its content updates, traverses the DOM to find
	 * semantic words and send the corresponding DOMRanges to the caller via a
	 * callback.
	 *
	 * A "word" here is a sequence of non-whitespace text characters, uninterrupted
	 * by the start/end of a non-inline element. That is, a word can span across
	 * text nodes and inline tags like <b>, but cannot span across block
	 * paragraphs.
	 *
	 * The words yielded by WordIndexer are sorted in document order, which makes
	 * them amenable to binary search - see `findBoundaryWordIndex` in ranges.js.
	 */
	var React = __webpack_require__(11);

	var babelPluginFlowReactPropTypes_proptype_DOMRange = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMRange || __webpack_require__(11).PropTypes.any;

	var WordIndexer = function(_React$PureComponent) {
	    _inherits(WordIndexer, _React$PureComponent);
	    function WordIndexer() {
	        _classCallCheck(this, WordIndexer);
	        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
	    }
	    /* eslint-enable react/sort-comp */
	    /* eslint-disable react/sort-comp */
	    WordIndexer.prototype.componentDidMount = function componentDidMount() {
	        this._sendWordsUpdate();
	    };
	    WordIndexer.prototype.componentDidUpdate = function componentDidUpdate() {
	        this._sendWordsUpdate();
	    };
	    WordIndexer.prototype._sendWordsUpdate = function _sendWordsUpdate() {
	        this.props.onWordsUpdate(this._getWordRanges());
	    };
	    WordIndexer.prototype._getWordRanges = function _getWordRanges() {
	        var container = this._container;
	        if (!container) throw new Error("invariant violation: `this._container` is not defined, but this method is only called after mount/update");
	        // Create a TreeWalker that visits text nodes and element nodes.
	        // We select the types of nodes we're interested in by bitwise-ORing
	        // the desired filters together.
	        var treeWalker = container.ownerDocument.createTreeWalker(container, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, function() {
	            return NodeFilter.FILTER_ACCEPT;
	        }, false);
	        // Traverse the container's descendant text nodes in DOM order,
	        // indexing the words we find.
	        var index = [];
	        var trailingWordRange = null;
	        while (treeWalker.nextNode()) {
	            var node = treeWalker.currentNode;
	            if (node.nodeType === Node.ELEMENT_NODE) {
	                var element = node;
	                "inline" !== getComputedStyle(element).display && (// Block-level elements interrupt text words, so set the
	                // current trailing word to `null`.
	                //
	                // This includes exiting one paragraph to visit another,
	                // but also includes text interrupted by inline-block
	                // elements.
	                //
	                // TODO(mdr): Is this behavior *generalizably* correct?
	                // TODO(mdr): I don't *fully* understand the performance
	                //     implications of `getComputedStyle`, but I think it's
	                //     gonna be nbd at the current call sites. If we try to
	                //     generalize to frequently-updating content, we might
	                //     want to watch this as a potential performance
	                //     bottleneck.
	                trailingWordRange = null);
	            } else if (node.nodeType === Node.TEXT_NODE) {
	                var text = node.nodeValue;
	                // A "word" is here simply defined as a maximal-length
	                // substring of non-space characters.
	                //
	                // Loop over all the words in the string, by repeatedly calling
	                // `wordPattern.exec(text)`.
	                var wordPattern = /\S+/g;
	                var wordMatch = void 0;
	                var newTrailingWordRange = null;
	                while (null !== (wordMatch = wordPattern.exec(text))) {
	                    var startOffset = wordMatch.index;
	                    var endOffset = wordMatch.index + wordMatch[0].length;
	                    var range = void 0;
	                    if (0 === startOffset && trailingWordRange) {
	                        // This word is at the start of this text node, and
	                        // there's a trailing word from the previous text node,
	                        // and there was no non-inline element between them.
	                        // This word and the trailing word are probably
	                        // intended to be two parts of the same word.
	                        //
	                        // So, instead of creating a new word range, we add
	                        // this word to the previous range by extending it.
	                        range = trailingWordRange;
	                        range.setEnd(node, endOffset);
	                    } else {
	                        // Otherwise, start a new word range here, and add it
	                        // to the list.
	                        range = node.ownerDocument.createRange();
	                        range.setStart(node, startOffset);
	                        range.setEnd(node, endOffset);
	                        index.push(range);
	                    }
	                    endOffset === text.length && (newTrailingWordRange = range);
	                }
	                trailingWordRange = newTrailingWordRange;
	            }
	        }
	        return index;
	    };
	    WordIndexer.prototype.render = function render() {
	        var _this2 = this;
	        return React.createElement("div", {
	            ref: function ref(container) {
	                return _this2._container = container;
	            }
	        }, this.props.children);
	    };
	    return WordIndexer;
	}(React.PureComponent);

	WordIndexer.propTypes = {
	    children: __webpack_require__(11).PropTypes.any,
	    onWordsUpdate: __webpack_require__(11).PropTypes.func.isRequired
	};

	module.exports = WordIndexer;

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Utility functions for manipulating highlights.
	 */
	var _require = __webpack_require__(209), findFirstAndLastWordIndexes = _require.findFirstAndLastWordIndexes, unionRanges = _require.unionRanges, spanRanges = _require.spanRanges, rangeIncludes = _require.rangeIncludes;

	/**
	 * Given a list of DOMHighlights, return a new list that also includes the
	 * given DOMRange as a new DOMHighlight. If the DOMHighlight intersects
	 * existing DOMHighlights, the other Highlights are removed and their ranges
	 * are merged into the new DOMHighlight.
	 */
	var babelPluginFlowReactPropTypes_proptype_DOMRange = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMRange || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_SerializedHighlight = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_SerializedHighlight || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMHighlightSet = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMHighlightSet || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMHighlight = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMHighlight || __webpack_require__(11).PropTypes.any;

	function addHighlight(existingHighlights, newHighlight) {
	    var newHighlights = {};
	    // Merge the new highlight with any existing highlights that intersect it.
	    var mergedDomRange = newHighlight.domRange;
	    var mergedFirstWordIndex = newHighlight.firstWordIndex;
	    var mergedLastWordIndex = newHighlight.lastWordIndex;
	    for (var _iterator = Object.keys(existingHighlights), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
	        var _ref;
	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	        }
	        var key = _ref;
	        var h = existingHighlights[key];
	        var newMergedDomRange = unionRanges(h.domRange, mergedDomRange);
	        if (newMergedDomRange) {
	            // This highlight's range was successfully merged into the new
	            // highlight. Update `mergedDomRange`, and *don't* add it to the
	            // new set of highlights.
	            mergedDomRange = newMergedDomRange;
	            mergedFirstWordIndex = Math.min(h.firstWordIndex, mergedFirstWordIndex);
	            mergedLastWordIndex = Math.max(h.lastWordIndex, mergedLastWordIndex);
	        } else // This highlight's range can't be merged into the new highlight.
	        // Add it to the new set of highlights.
	        newHighlights[key] = h;
	    }
	    var newMergedHighlight = {
	        firstWordIndex: mergedFirstWordIndex,
	        lastWordIndex: mergedLastWordIndex,
	        domRange: mergedDomRange
	    };
	    newHighlights[createNewUniqueKey(Object.keys(newHighlights))] = newMergedHighlight;
	    return newHighlights;
	}

	/**
	 * Given a DOMRange and a list of word ranges, build a corresponding
	 * DOMHighlight.
	 *
	 * If the DOMRange is not a valid highlight given the word ranges, return null.
	 */
	function buildHighlight(existingHighlights, wordRanges, newHighlightRange) {
	    // If any existing highlight fully contains the new highlight range, it's
	    // redundant and therefore not valid to build this as a highlight.
	    // Return null.
	    //
	    // NOTE(mdr): Really, our goal is to determine whether the new range's
	    //     content is already fully highlighted, so you could imagine this
	    //     logic not catching the case where a range's contents are fully
	    //     highlighted, but by multiple ranges.
	    //
	    //     However, words aren't actually adjacent; they have spaces between
	    //     them. So, even if each word in the range is currently highlighted,
	    //     the space between a pair of words will only be highlighted if
	    //     they're included in the same highlight range.
	    //
	    //     Therefore, if this new range isn't fully contained by an existing
	    //     highlight, then there's at *least* an unhighlighted space within the
	    //     range. In that case, it makes sense to offer this as a new highlight
	    //     that, when added, will merge with the highlights that it intersects.
	    for (var _iterator2 = Object.keys(existingHighlights), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
	        var _ref2;
	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }
	        var key = _ref2;
	        var existingHighlightRange = existingHighlights[key].domRange;
	        if (rangeIncludes(existingHighlightRange, newHighlightRange)) return null;
	    }
	    // If the new highlight range doesn't span two words from the content, it's
	    // not valid to build this as a highlight. Return null.
	    var indexes = findFirstAndLastWordIndexes(newHighlightRange, wordRanges);
	    if (!indexes) return null;
	    var firstWordIndex = indexes[0], lastWordIndex = indexes[1];
	    var firstWord = wordRanges[firstWordIndex];
	    var lastWord = wordRanges[lastWordIndex];
	    return {
	        firstWordIndex: firstWordIndex,
	        lastWordIndex: lastWordIndex,
	        domRange: spanRanges(firstWord, lastWord)
	    };
	}

	/**
	 * Given a list of keys, return a new unique key that is not in the list.
	 */
	function createNewUniqueKey(existingKeys) {
	    // The base of the key is the current time, in milliseconds since epoch.
	    var base = "" + new Date().getTime();
	    if (!existingKeys.includes(base)) return base;
	    // But, if the user is a fast-clicker or time-traveler or something, and
	    // already has a highlight from this millisecond, then let's attach a
	    // suffix and keep incrementing it until we find an unused suffix.
	    var suffix = 0;
	    var key = void 0;
	    do {
	        key = base + "-" + suffix;
	        suffix++;
	    } while (existingKeys.includes(key));
	    return key;
	}

	/**
	 * Given a SerializedHightlight and the current set of word ranges, return a
	 * DOMHighlight representing the SerializedHighlight.
	 *
	 * If the SerializedHighlight is not valid given the list of word ranges, throw
	 * an error.
	 */
	function deserializeHighlight(serializedHighlight, wordRanges) {
	    var _serializedHighlight$ = serializedHighlight.range, firstWordIndex = _serializedHighlight$.firstWordIndex, lastWordIndex = _serializedHighlight$.lastWordIndex;
	    var firstWord = wordRanges[firstWordIndex];
	    if (!firstWord) throw new Error("first word index " + firstWord + " is out of bounds: must be 0–" + (wordRanges.length - 1) + " inclusive");
	    var lastWord = wordRanges[lastWordIndex];
	    if (!lastWord) throw new Error("last word index " + lastWord + " is out of bounds: must be 0–" + (wordRanges.length - 1) + " inclusive");
	    return {
	        firstWordIndex: firstWordIndex,
	        lastWordIndex: lastWordIndex,
	        domRange: spanRanges(firstWord, lastWord)
	    };
	}

	/**
	 * Return a SerializedHighlight representing the given DOMHighlight.
	 */
	function serializeHighlight(highlight) {
	    return {
	        range: {
	            type: "word-indexes",
	            firstWordIndex: highlight.firstWordIndex,
	            lastWordIndex: highlight.lastWordIndex
	        }
	    };
	}

	module.exports = {
	    addHighlight: addHighlight,
	    buildHighlight: buildHighlight,
	    deserializeHighlight: deserializeHighlight,
	    serializeHighlight: serializeHighlight
	};

/***/ },
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
	}

	function _inherits(subClass, superClass) {
	    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	        constructor: {
	            value: subClass,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        }
	    });
	    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
	}

	/**
	 * This component, given a set of DOMHighlights, draws highlight rectangles in
	 * the same absolute position as the highlighted content, as computed by the
	 * range's `getClientRects` method.
	 *
	 * TODO(mdr): Many things can affect the correct positioning of highlighting,
	 *     and this component does not attempt to anticipate them. If we start
	 *     using this highlighting library on content with a more dynamic layout,
	 *     we should add a hook to allow the parent to `forceUpdate` the
	 *     `HighlightingUI`.
	 */
	var React = __webpack_require__(11);

	var HighlightSetRenderer = __webpack_require__(219);

	var HighlightTooltip = __webpack_require__(220);

	var _require = __webpack_require__(209), rangesOverlap = _require.rangesOverlap;

	var SelectionTracker = __webpack_require__(221);

	var babelPluginFlowReactPropTypes_proptype_ZIndexes = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_ZIndexes || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMRange = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_DOMRange || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMHighlightSet = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_DOMHighlightSet || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMHighlight = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_DOMHighlight || __webpack_require__(11).PropTypes.any;

	/* global i18n */
	var babelPluginFlowReactPropTypes_proptype_TrackedSelection = __webpack_require__(221).babelPluginFlowReactPropTypes_proptype_TrackedSelection || __webpack_require__(11).PropTypes.any;

	var HighlightingUI = function(_React$PureComponent) {
	    _inherits(HighlightingUI, _React$PureComponent);
	    function HighlightingUI() {
	        _classCallCheck(this, HighlightingUI);
	        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
	    }
	    HighlightingUI.prototype._handleAddHighlight = function _handleAddHighlight(highlightToAdd) {
	        this.props.onAddHighlight(highlightToAdd);
	        // Deselect the newly-highlighted text, by collapsing the selection
	        // to the end of the range.
	        var selection = document.getSelection();
	        selection && selection.collapseToEnd();
	    };
	    HighlightingUI.prototype._selectionIsValid = function _selectionIsValid(trackedSelection) {
	        if (!trackedSelection) return false;
	        var contentNode = this.props.contentNode;
	        // Create a range over the content node.
	        var contentRange = new Range();
	        contentRange.selectNodeContents(contentNode);
	        // Create a range over the focus position.
	        var focusRange = new Range();
	        focusRange.setStart(trackedSelection.focusNode, trackedSelection.focusOffset);
	        focusRange.collapse(true);
	        return rangesOverlap(contentRange, focusRange);
	    };
	    HighlightingUI.prototype.render = function render() {
	        var _this2 = this;
	        return React.createElement(SelectionTracker, {
	            buildHighlight: this.props.buildHighlight,
	            enabled: this.props.editable
	        }, function(trackedSelection, userIsMouseSelecting) {
	            return React.createElement("div", null, React.createElement(HighlightSetRenderer, {
	                editable: /* An existing highlight is editable when the
	                         * component is in editable mode, and there's no
	                         * selection in progress. */
	                _this2.props.editable && !_this2._selectionIsValid(trackedSelection),
	                highlights: _this2.props.highlights,
	                offsetParent: _this2.props.offsetParent,
	                onRemoveHighlight: _this2.props.onRemoveHighlight,
	                zIndexes: _this2.props.zIndexes
	            }), _this2._selectionIsValid(trackedSelection) && !userIsMouseSelecting && React.createElement(HighlightTooltip, {
	                label: i18n._("Add highlight"),
	                onClick: function onClick() {
	                    return _this2._handleAddHighlight(trackedSelection.proposedHighlight);
	                },
	                focusNode: trackedSelection.focusNode,
	                focusOffset: trackedSelection.focusOffset,
	                offsetParent: _this2.props.offsetParent,
	                zIndex: _this2.props.zIndexes.aboveContent
	            }));
	        });
	    };
	    return HighlightingUI;
	}(React.PureComponent);

	HighlightingUI.propTypes = {
	    buildHighlight: __webpack_require__(11).PropTypes.func.isRequired,
	    contentNode: __webpack_require__(11).PropTypes.any.isRequired,
	    editable: __webpack_require__(11).PropTypes.bool.isRequired,
	    highlights: babelPluginFlowReactPropTypes_proptype_DOMHighlightSet,
	    offsetParent: __webpack_require__(11).PropTypes.any.isRequired,
	    onAddHighlight: __webpack_require__(11).PropTypes.func.isRequired,
	    onRemoveHighlight: __webpack_require__(11).PropTypes.func.isRequired,
	    zIndexes: babelPluginFlowReactPropTypes_proptype_ZIndexes
	};

	module.exports = HighlightingUI;

/***/ },
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Given two DOMRange objects, and a choice of start/end point for each, compare
	 * the two chosen points. Return -1 if a's comes first in the document, return
	 * 1 if b's comes first in the document, or 0 if they represent the same point
	 * in the document.
	 *
	 * NOTE(mdr): This function exists primarily to cover over some confusing parts
	 *     of the DOM's `compareBoundaryPoints` API, and to cover over a Flow bug
	 *     documented here: https://github.com/facebook/flow/issues/3734.
	 */
	var babelPluginFlowReactPropTypes_proptype_DOMRange = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMRange || __webpack_require__(11).PropTypes.any;

	/**
	 * Utility functions for manipulating ranges of highlightable content.
	 */
	function compareRangeBoundaryPoints(a, whichA, b, whichB) {
	    var mode = void 0;
	    // $FlowFixMe(mdr)
	    mode = "start" === whichA && "start" === whichB ? Range.START_TO_START : "start" === whichA && "end" === whichB ? Range.END_TO_START : "end" === whichA && "start" === whichB ? Range.START_TO_END : Range.END_TO_END;
	    return a.compareBoundaryPoints(mode, b);
	}

	/**
	 * Given two DOMRanges, return a DOMRange whose start point comes from A, and
	 * whose end point comes from B.
	 */
	function spanRanges(a, b) {
	    var range = a.cloneRange();
	    range.setEnd(b.endContainer, b.endOffset);
	    return range;
	}

	/**
	 * Given two DOMRanges, return whether they overlap.
	 *
	 * We here treat ranges like closed intervals: the boundary points are
	 * considered to be included in the range, and, if a ends exactly where b
	 * starts, they are considered to overlap.
	 */
	function rangesOverlap(a, b) {
	    return !(compareRangeBoundaryPoints(a, "end", b, "start") < 0 || compareRangeBoundaryPoints(b, "end", a, "start") < 0);
	}

	/**
	 * Given two DOMRanges, return whether the first includes the second: whether
	 * all points that B contains are also contained by A.
	 */
	function rangeIncludes(a, b) {
	    return compareRangeBoundaryPoints(a, "start", b, "start") <= 0 && compareRangeBoundaryPoints(a, "end", b, "end") >= 0;
	}

	/**
	 * Given two DOMRanges, intersect them: return a range that contains all points
	 * that both A contains and B contains, and contains no other points.
	 *
	 * If A and B do not overlap, no intersection exists; return null.
	 */
	function intersectRanges(a, b) {
	    if (!rangesOverlap(a, b)) return null;
	    return spanRanges(compareRangeBoundaryPoints(a, "start", b, "start") > 0 ? a : b, compareRangeBoundaryPoints(a, "end", b, "end") < 0 ? a : b);
	}

	/**
	 * Given two DOMRanges, union them: return a range that contains all points
	 * that either A contains or B contains, and contains no other points.
	 *
	 * If A and B do not overlap, no union exists; return null.
	 */
	function unionRanges(a, b) {
	    if (!rangesOverlap(a, b)) return null;
	    return spanRanges(compareRangeBoundaryPoints(a, "start", b, "start") < 0 ? a : b, compareRangeBoundaryPoints(a, "end", b, "end") > 0 ? a : b);
	}

	/**
	 * Given a list of word ranges, and a selection range, binary search the list
	 * and return the index of the goal word, or -1 if no satisfactory goal word
	 * exists in the list.
	 *
	 * If `goal` is "first", return the index of the first word whose end point is
	 * after the selection's start point.
	 *
	 * If `goal` is "last", return the index of the last word whose start point is
	 * before the selection's end point.
	 */
	function findBoundaryWordIndex(selectionRange, wordRanges, goal, initialLowerBound, initialUpperBound) {
	    var bestValidWordIndex = -1;
	    var lowerBound = initialLowerBound;
	    var upperBound = initialUpperBound;
	    var iterationCount = 0;
	    while (lowerBound <= upperBound) {
	        iterationCount++;
	        if (iterationCount > 2 * wordRanges.length) throw new Error("Assertion error: Binary search isn't terminating? lower=" + lowerBound + ", upper=" + upperBound);
	        var mid = Math.floor((lowerBound + upperBound) / 2);
	        if ("first" === goal) {
	            if (compareRangeBoundaryPoints(wordRanges[mid], "end", selectionRange, "start") <= 0) // If this word's end point is before or equal to the
	            // selection's start point, then this word is not a valid
	            // candidate, nor are any of the words before it.
	            //
	            // Update our bounds to look for a valid word after this one.
	            lowerBound = mid + 1; else {
	                // If this word's end point is after the selection's start
	                // point, then this word is valid, and is, by nature of the
	                // search, the earliest valid word we're aware of.
	                //
	                // Update our bounds to look for a better valid word before
	                // this one.
	                bestValidWordIndex = mid;
	                upperBound = mid - 1;
	            }
	        } else {
	            if (compareRangeBoundaryPoints(wordRanges[mid], "start", selectionRange, "end") >= 0) // If this word's start point is after or equal to the
	            // selection's end point, then this word is not a valid
	            // candidate, nor are any of the words after it.
	            //
	            // Update our bounds to look for a valid word before this one.
	            upperBound = mid - 1; else {
	                // If this word's start point is before the selection's end
	                // point, then this word is valid, and is, by nature of the
	                // search, the latest valid word we're aware of.
	                //
	                // Update our bounds to look for a better valid word after
	                // this one.
	                bestValidWordIndex = mid;
	                lowerBound = mid + 1;
	            }
	        }
	    }
	    return bestValidWordIndex;
	}

	/**
	 * Given a list of word ranges, and a selection range, binary search the list
	 * and return the indexes of the first and last words that the selection
	 * intersects, or `null` if the range includes no words.
	 */
	function findFirstAndLastWordIndexes(selectionRange, wordRanges) {
	    // Find the first word whose end point is after the selection's start
	    // point.
	    //
	    // Note that this does *not* alone prove that this word is *intersected* by
	    // the current range; to intersect, the first word's start point must also
	    // be before the selection's end point. This is proven by the success of
	    // the second search.
	    //
	    // (For example, imagine highlighting the space between two words. This
	    // search would return the first word after the selection, despite not
	    // intersecting the selection.)
	    var firstWordIndex = findBoundaryWordIndex(selectionRange, wordRanges, "first", 0, wordRanges.length - 1);
	    if (firstWordIndex < 0) return null;
	    // Find the last word whose start point is before the selection's end
	    // point.
	    //
	    // Start the search with our candidate first word, because, while we don't
	    // know whether our candidate first word intersects the selection, we *do*
	    // know that no *earlier* word intersects the selection, or else it would
	    // have been yielded as the candidate first word instead.
	    var lastWordIndex = findBoundaryWordIndex(selectionRange, wordRanges, "last", firstWordIndex, wordRanges.length - 1);
	    if (lastWordIndex < 0) return null;
	    // Now, we have discovered a candidate first word F, and a candidate last
	    // word L. Let's prove that these are indeed the first and last intersected
	    // words of the selection S.
	    //
	    // Syntax: Let A1 and A2 represent the start and end point of range A.
	    //
	    // Definition: A1 <= A2 for any range A.
	    //
	    // Theorem 1: Two ranges A and B intersect iff A1 <= B2 and B1 <= A2.
	    // Proof: See http://www.rgrjr.com/emacs/overlap.html, and extend the
	    //     result to closed intervals by also accepting equality.
	    //
	    // Given 1: F1 <= L1 and F2 <= L2. That is, either the first and last word
	    //     are the same, or the last word comes after, because we provided
	    //     `firstWordIndex` as the lower bound when search for L.
	    // Given 2: S1 <= F2, and no earlier word's end point is >= S1, because
	    //     F was returned by `findBoundaryWordIndex` with goal "first".
	    // Given 3: L1 <= S2, and no later word's start point is <= S2, because
	    //     L was returned by `findBoundaryWordIndex` with goal "last".
	    //
	    // Conclusion 1: F intersects S.
	    // Proof: By Theorem 1, we must show that F1 <= S2 and S1 <= F2.
	    //     F1 <= L1 <= S2, by Given 1 and Given 3.
	    //     S1 <= F2, by Given 2. QED.
	    //
	    // Conclusion 2: L intersects S.
	    // Proof: By Theorem 1, we must show that L1 <= S2 and S1 <= L2.
	    //     L1 <= S2 by Given 3.
	    //     S1 <= F2 <= L2, by Given 1 and Given 2. QED.
	    //
	    // Conclusion 3: No word earlier than F intersects S.
	    // Proof: Consider some word W earlier than F.
	    //     W2 < S1, by Given 2. Therefore, it's false that S1 <= W2.
	    //     Therefore, W and S do not intersect, by Theorem 1. QED.
	    //
	    // Conclusion 4: No word later than L intersects S.
	    // Proof: Consider some word W later than L.
	    //     W1 > S2, by Given 2. Therefore, it's false that W1 <= S2.
	    //     Therefore, W and S do not intersect, by Theorem 1, QED.
	    //
	    // Therefore, while neither of these two searches alone proves that F is
	    // the first intersected word of S, or that L is the last intersected word
	    // of S, the implications of the two searches are sufficient proof when
	    // combined. Return these two indexes with confidence, hooray!
	    return [ firstWordIndex, lastWordIndex ];
	}

	module.exports = {
	    findFirstAndLastWordIndexes: findFirstAndLastWordIndexes,
	    rangesOverlap: rangesOverlap,
	    rangeIncludes: rangeIncludes,
	    intersectRanges: intersectRanges,
	    unionRanges: unionRanges,
	    spanRanges: spanRanges
	};

/***/ },
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
	}

	function _inherits(subClass, superClass) {
	    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	        constructor: {
	            value: subClass,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        }
	    });
	    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
	}

	/**
	 * Render a set of highlights. See HighlightRenderer for more details about how
	 * each highlight is rendered.
	 *
	 * This component manages the state of the "Remove highlight" tooltip. To
	 * determine the currently-hovered highlight, it calls the `isHovered` method
	 * on each HighlightRenderer.
	 */
	var React = __webpack_require__(11);

	var HighlightRenderer = __webpack_require__(233);

	var HighlightTooltip = __webpack_require__(220);

	/* global i18n */
	var babelPluginFlowReactPropTypes_proptype_ZIndexes = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_ZIndexes || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_Position = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_Position || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMHighlightSet = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_DOMHighlightSet || __webpack_require__(11).PropTypes.any;

	var HighlightSetRenderer = function(_React$PureComponent) {
	    _inherits(HighlightSetRenderer, _React$PureComponent);
	    function HighlightSetRenderer() {
	        var _temp, _this, _ret;
	        _classCallCheck(this, HighlightSetRenderer);
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [ this ].concat(args))), 
	        _this), _this.state = {
	            mouseClientPosition: null,
	            hoveringTooltipFor: null
	        }, _this._highlightRenderers = {}, _this._handleMouseMove = function(e) {
	            _this.setState({
	                mouseClientPosition: {
	                    left: e.clientX,
	                    top: e.clientY
	                }
	            });
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	    // eslint-disable-next-line react/sort-comp
	    HighlightSetRenderer.prototype.componentDidMount = function componentDidMount() {
	        this._updateEditListeners(false, this.props.editable);
	    };
	    HighlightSetRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        this._updateEditListeners(this.props.editable, nextProps.editable);
	        // If we were previously hovering over the tooltip for a highlight that
	        // has since been removed, reset the hover state accordingly.
	        "string" !== typeof this.state.hoveringTooltipFor || this.state.hoveringTooltipFor in nextProps.highlights || this.setState({
	            hoveringTooltipFor: null
	        });
	    };
	    HighlightSetRenderer.prototype.componentWillUnmount = function componentWillUnmount() {
	        this._updateEditListeners(this.props.editable, false);
	    };
	    /**
	     * Given whether we were previously listening to mousemove events, and
	     * whether we will now listen to mousemove events, add or remove the
	     * listener accordingly.
	     */
	    HighlightSetRenderer.prototype._updateEditListeners = function _updateEditListeners(wasListening, willListen) {
	        if (!wasListening && willListen) window.addEventListener("mousemove", this._handleMouseMove); else if (wasListening && !willListen) {
	            window.removeEventListener("mousemove", this._handleMouseMove);
	            // Additionally, reset the mouse position. Our child components
	            // won't be checking `mouseClientPosition` when we're not
	            // listening, anyway, but this guards against errors where we
	            // re-enter listening mode and have stale coordinates stored in
	            // state.
	            this.setState({
	                mouseClientPosition: null
	            });
	        }
	    };
	    HighlightSetRenderer.prototype._getHoveredHighlightKey = function _getHoveredHighlightKey() {
	        var _this2 = this;
	        // If we're hovering over the tooltip, the hovered highlight is the
	        // highlight that the tooltip is pointing to.
	        var hoveringTooltipFor = this.state.hoveringTooltipFor;
	        if ("string" === typeof hoveringTooltipFor) return hoveringTooltipFor;
	        return Object.keys(this.props.highlights).find(function(key) {
	            var highlightRenderer = _this2._highlightRenderers[key];
	            return highlightRenderer && highlightRenderer.isHovered(_this2.state.mouseClientPosition);
	        });
	    };
	    HighlightSetRenderer.prototype._renderTooltip = function _renderTooltip() {
	        var _this3 = this;
	        var hoveredHighlightKey = this._getHoveredHighlightKey();
	        if ("string" !== typeof hoveredHighlightKey) return null;
	        var hoveredHighlight = this.props.highlights[hoveredHighlightKey];
	        return React.createElement(HighlightTooltip, {
	            label: i18n._("Remove highlight"),
	            focusNode: hoveredHighlight.domRange.endContainer,
	            focusOffset: hoveredHighlight.domRange.endOffset,
	            offsetParent: this.props.offsetParent,
	            zIndex: this.props.zIndexes.aboveContent,
	            onClick: function onClick() {
	                return _this3.props.onRemoveHighlight(hoveredHighlightKey);
	            },
	            onMouseEnter: function onMouseEnter() {
	                return _this3.setState({
	                    hoveringTooltipFor: hoveredHighlightKey
	                });
	            },
	            onMouseLeave: function onMouseLeave() {
	                return _this3.setState({
	                    hoveringTooltipFor: null
	                });
	            }
	        });
	    };
	    HighlightSetRenderer.prototype.render = function render() {
	        var _this4 = this;
	        return React.createElement("div", null, Object.keys(this.props.highlights).map(function(key) {
	            return React.createElement(HighlightRenderer, {
	                ref: function ref(r) {
	                    r ? _this4._highlightRenderers[key] = r : delete _this4._highlightRenderers[key];
	                },
	                editable: _this4.props.editable,
	                key: key,
	                highlight: _this4.props.highlights[key],
	                highlightKey: key,
	                mouseClientPosition: _this4.state.mouseClientPosition,
	                offsetParent: _this4.props.offsetParent,
	                onRemoveHighlight: _this4.props.onRemoveHighlight,
	                zIndexes: _this4.props.zIndexes
	            });
	        }), this.props.editable && this._renderTooltip());
	    };
	    return HighlightSetRenderer;
	}(React.PureComponent);

	HighlightSetRenderer.propTypes = {
	    editable: __webpack_require__(11).PropTypes.bool.isRequired,
	    highlights: babelPluginFlowReactPropTypes_proptype_DOMHighlightSet,
	    offsetParent: __webpack_require__(11).PropTypes.any.isRequired,
	    onRemoveHighlight: __webpack_require__(11).PropTypes.func.isRequired,
	    zIndexes: babelPluginFlowReactPropTypes_proptype_ZIndexes
	};

	module.exports = HighlightSetRenderer;

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
	}

	function _inherits(subClass, superClass) {
	    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	        constructor: {
	            value: subClass,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        }
	    });
	    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
	}

	/**
	 * A tooltip to point to the focus of a highlight.
	 */
	var React = __webpack_require__(11);

	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var _require2 = __webpack_require__(234), getRelativePosition = _require2.getRelativePosition;

	var babelPluginFlowReactPropTypes_proptype_Position = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_Position || __webpack_require__(11).PropTypes.any;

	var HighlightTooltip = function(_React$PureComponent) {
	    _inherits(HighlightTooltip, _React$PureComponent);
	    function HighlightTooltip() {
	        _classCallCheck(this, HighlightTooltip);
	        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
	    }
	    HighlightTooltip.prototype._getPosition = function _getPosition() {
	        var _props = this.props, focusNode = _props.focusNode, focusOffset = _props.focusOffset, offsetParent = _props.offsetParent;
	        // Get a range of *just* the focus point of the selection.
	        var focusRange = document.createRange();
	        focusRange.setStart(focusNode, focusOffset);
	        focusRange.setEnd(focusNode, focusOffset);
	        // Then, get the bounding box of the collapsed range. This will be a
	        // zero-width rectangle, but still have positioning information, which
	        // we can use the position the tooltip.
	        //
	        // NOTE(mdr): If we used getClientBoundingRect here instead, Safari
	        //     would return an unpositioned rect. But all tested browsers at
	        //     time of writing (latest Chrome, Firefox, Safari) return at least
	        //     one rectangle from getClientRects, and it's well-positioned.
	        var focusRect = focusRange.getClientRects()[0];
	        // Compute the desired position of the tooltip relative to the offset
	        // parent.
	        var offsetParentRect = offsetParent.getBoundingClientRect();
	        return getRelativePosition(focusRect, offsetParentRect);
	    };
	    HighlightTooltip.prototype.render = function render() {
	        var position = this._getPosition();
	        return React.createElement("div", {
	            className: css(styles.tooltip),
	            onClick: this.props.onClick,
	            onMouseEnter: this.props.onMouseEnter,
	            onMouseLeave: this.props.onMouseLeave,
	            style: {
	                left: position.left,
	                top: position.top,
	                zIndex: this.props.zIndex
	            }
	        }, React.createElement("div", {
	            className: css(styles.label)
	        }, this.props.label), React.createElement("div", {
	            className: css(styles.arrow)
	        }));
	    };
	    return HighlightTooltip;
	}(React.PureComponent);

	HighlightTooltip.propTypes = {
	    label: __webpack_require__(11).PropTypes.string.isRequired,
	    onClick: __webpack_require__(11).PropTypes.func.isRequired,
	    onMouseEnter: __webpack_require__(11).PropTypes.func,
	    onMouseLeave: __webpack_require__(11).PropTypes.func,
	    focusNode: __webpack_require__(11).PropTypes.any.isRequired,
	    focusOffset: __webpack_require__(11).PropTypes.number.isRequired,
	    offsetParent: __webpack_require__(11).PropTypes.any.isRequired,
	    zIndex: __webpack_require__(11).PropTypes.number.isRequired
	};

	var styles = StyleSheet.create({
	    tooltip: {
	        // Positioning.
	        //
	        // Position the tooltip's *center-bottom* point at the left/top
	        // coordinates, instead of the tooltip's top-left point, by translating
	        // left by half the tooltip's width and up by the tooltip's full
	        // height.
	        //
	        // `left`, `top`, and `zIndex` are specified via the `style` attribute.
	        position: "absolute",
	        transform: "translate(-50%, -100%)",
	        // Cursor interaction.
	        cursor: "pointer",
	        userSelect: "none"
	    },
	    label: {
	        // Box appearance.
	        background: "#314453",
	        borderRadius: 2,
	        boxShadow: "0 1px 4px 0 rgba(97, 101, 105, 0.42)",
	        padding: "8px 11px",
	        // Text appearance.
	        color: "white",
	        fontSize: 12,
	        lineHeight: 1.5,
	        textAlign: "center"
	    },
	    // A 12px-width, 6px-height downward-facing arrow.
	    //
	    // Implemented by creating a box whose only content is its top, left, and
	    // right borders. The joints between two borders are a diagonal line, so
	    // the arrow element renders divided into these three areas:
	    //
	    // +-------+
	    // |\ top /|
	    // | \   / |
	    // |  \ /  |
	    // |L  v  R|
	    // +-------+
	    //
	    // Therefore, if we color the top border, and make the left and right
	    // borders transparent, we end up with a triangle!
	    //
	    // https://css-tricks.com/snippets/css/css-triangle/
	    arrow: {
	        // Make the inner dimensions of the box 0x0, so that its only content
	        // is its top, left, and right borders.
	        height: 0,
	        width: 0,
	        // The sum of our left and right border widths will be the width of our
	        // triangle, so set them to 6px + 6px = 12px.
	        borderLeft: "6px solid transparent",
	        borderRight: "6px solid transparent",
	        // The top border height will be the height of our triangle, so set it
	        // to 6px.
	        borderTop: "6px solid #314453",
	        // Center the arrow within the tooltip container.
	        margin: "0 auto"
	    }
	});

	module.exports = HighlightTooltip;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
	}

	function _inherits(subClass, superClass) {
	    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	        constructor: {
	            value: subClass,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        }
	    });
	    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
	}

	/**
	 * Tracks the user's current selection, and exposes it to the subtree using the
	 * function-as-children pattern.
	 */
	var React = __webpack_require__(11);

	var babelPluginFlowReactPropTypes_proptype_DOMRange = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_DOMRange || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMHighlight = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_DOMHighlight || __webpack_require__(11).PropTypes.any;

	Object.defineProperty(module.exports, "babelPluginFlowReactPropTypes_proptype_TrackedSelection", __webpack_require__(11).PropTypes.shape({
	    focusNode: __webpack_require__(11).PropTypes.any.isRequired,
	    focusOffset: __webpack_require__(11).PropTypes.number.isRequired,
	    proposedHighlight: babelPluginFlowReactPropTypes_proptype_DOMHighlight
	}));

	var SelectionTracker = function(_React$PureComponent) {
	    _inherits(SelectionTracker, _React$PureComponent);
	    function SelectionTracker() {
	        var _temp, _this, _ret;
	        _classCallCheck(this, SelectionTracker);
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [ this ].concat(args))), 
	        _this), _this.state = {
	            mouseState: "up",
	            trackedSelection: null
	        }, _this._handleSelectionChange = function() {
	            _this._updateTrackedSelection(_this.props.buildHighlight);
	            "down" === _this.state.mouseState && _this.setState({
	                mouseState: "down-and-selecting"
	            });
	        }, _this._handleMouseDown = function() {
	            _this.setState({
	                mouseState: "down"
	            });
	        }, _this._handleMouseUp = function() {
	            _this.setState({
	                mouseState: "up"
	            });
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	    SelectionTracker.prototype.componentDidMount = function componentDidMount() {
	        this._updateListeners(false, this.props.enabled);
	    };
	    SelectionTracker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        this.props.buildHighlight !== nextProps.buildHighlight && // The highlight-building function changed, so the
	        // proposedHighlight we built with it might be different, or no
	        // longer be valid. Update accordingly.
	        this._updateTrackedSelection(nextProps.buildHighlight);
	        this._updateListeners(this.props.enabled, nextProps.enabled);
	    };
	    SelectionTracker.prototype.componentWillUnmount = function componentWillUnmount() {
	        this._updateListeners(this.props.enabled, false);
	    };
	    SelectionTracker.prototype._updateListeners = function _updateListeners(wasListening, willListen) {
	        if (!wasListening && willListen) {
	            window.addEventListener("mousedown", this._handleMouseDown);
	            window.addEventListener("mouseup", this._handleMouseUp);
	            document.addEventListener("selectionchange", this._handleSelectionChange);
	        } else if (wasListening && !willListen) {
	            window.removeEventListener("mousedown", this._handleMouseDown);
	            window.removeEventListener("mouseup", this._handleMouseUp);
	            document.removeEventListener("selectionchange", this._handleSelectionChange);
	            // Additionally, reset the state, to guard against errors where we
	            // re-enter listening mode and have stale values stored.
	            this.setState({
	                mouseState: "up",
	                trackedSelection: null
	            });
	        }
	    };
	    /**
	     * Get the current selection focus and range, if present and non-collapsed.
	     *
	     * Otherwise, if there is no current selection or it's collapsed, return
	     * null.
	     */
	    SelectionTracker.prototype._computeFocusAndRange = function _computeFocusAndRange() {
	        var selection = document.getSelection();
	        if (!selection || 0 === selection.rangeCount) return null;
	        var range = selection.getRangeAt(0);
	        if (range.collapsed) return null;
	        return {
	            focusNode: selection.focusNode,
	            focusOffset: selection.focusOffset,
	            range: range
	        };
	    };
	    /**
	     * Compute the current TrackedSelection from the document state.
	     */
	    SelectionTracker.prototype._computeTrackedSelection = function _computeTrackedSelection(buildHighlight) {
	        var focusAndRange = this._computeFocusAndRange();
	        if (!focusAndRange) return null;
	        var focusNode = focusAndRange.focusNode, focusOffset = focusAndRange.focusOffset, range = focusAndRange.range;
	        var proposedHighlight = buildHighlight(range);
	        if (!proposedHighlight) return null;
	        return {
	            focusNode: focusNode,
	            focusOffset: focusOffset,
	            proposedHighlight: proposedHighlight
	        };
	    };
	    /**
	     * Update the TrackedSelection to reflect the document state.
	     */
	    SelectionTracker.prototype._updateTrackedSelection = function _updateTrackedSelection(buildHighlight) {
	        var trackedSelection = this._computeTrackedSelection(buildHighlight);
	        this.setState({
	            trackedSelection: trackedSelection
	        });
	    };
	    SelectionTracker.prototype.render = function render() {
	        var _state = this.state, mouseState = _state.mouseState, trackedSelection = _state.trackedSelection;
	        var userIsMouseSelecting = "down-and-selecting" === mouseState;
	        return this.props.children && React.createElement("div", null, this.props.children(trackedSelection, userIsMouseSelecting));
	    };
	    return SelectionTracker;
	}(React.PureComponent);

	SelectionTracker.propTypes = {
	    buildHighlight: __webpack_require__(11).PropTypes.func.isRequired,
	    children: __webpack_require__(11).PropTypes.func,
	    enabled: __webpack_require__(11).PropTypes.bool.isRequired
	};

	module.exports = SelectionTracker;

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var babelPluginFlowReactPropTypes_proptype_DOMRange = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMRange || __webpack_require__(11).PropTypes.any;

	// Import the DOM-related types from the parent directory, and re-export them
	// to the UI code.
	var babelPluginFlowReactPropTypes_proptype_DOMHighlightSet = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMHighlightSet || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMHighlight = __webpack_require__(132).babelPluginFlowReactPropTypes_proptype_DOMHighlight || __webpack_require__(11).PropTypes.any;

	Object.defineProperty(module.exports, "babelPluginFlowReactPropTypes_proptype_Position", __webpack_require__(11).PropTypes.shape({
	    left: __webpack_require__(11).PropTypes.number.isRequired,
	    top: __webpack_require__(11).PropTypes.number.isRequired
	}));

	Object.defineProperty(module.exports, "babelPluginFlowReactPropTypes_proptype_ZIndexes", __webpack_require__(11).PropTypes.shape({
	    aboveContent: __webpack_require__(11).PropTypes.number.isRequired,
	    belowContent: __webpack_require__(11).PropTypes.number.isRequired
	}));

/***/ },
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
	}

	function _inherits(subClass, superClass) {
	    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	        constructor: {
	            value: subClass,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        }
	    });
	    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
	}

	/**
	 * This component, given a single DOMHighlight, draws highlight rectangles in
	 * the same absolute position as the highlighted content, as computed via
	 * `getClientRects`.
	 *
	 * TODO(mdr): Many things can affect the correct positioning of highlighting,
	 *     and this component does not attempt to anticipate them. If we start
	 *     using this highlighting library on content with a more dynamic layout,
	 *     we should add a hook to allow the parent to `forceUpdate` the
	 *     `HighlightRenderer`.
	 */
	var React = __webpack_require__(11);

	var _require = __webpack_require__(14), StyleSheet = _require.StyleSheet, css = _require.css;

	var _require2 = __webpack_require__(234), getClientRectsForTextInRange = _require2.getClientRectsForTextInRange, getRelativePosition = _require2.getRelativePosition, getRelativeRect = _require2.getRelativeRect;

	var babelPluginFlowReactPropTypes_proptype_ZIndexes = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_ZIndexes || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_Rect = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_Rect || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_Position = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_Position || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMHighlight = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_DOMHighlight || __webpack_require__(11).PropTypes.any;

	var HighlightRenderer = function(_React$PureComponent) {
	    _inherits(HighlightRenderer, _React$PureComponent);
	    function HighlightRenderer() {
	        var _temp, _this, _ret;
	        _classCallCheck(this, HighlightRenderer);
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [ this ].concat(args))), 
	        _this), _this.state = {
	            cachedHighlightRects: _this._computeRects(_this.props),
	            tooltipIsHovered: false
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	    HighlightRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        this.props.highlight === nextProps.highlight && this.props.offsetParent === nextProps.offsetParent || this.setState({
	            cachedHighlightRects: this._computeRects(nextProps)
	        });
	    };
	    /**
	     * Compute the set of rectangles that cover the highlighted content, with
	     * coordinates relative to the offset parent. That way, we can use them
	     * for CSS positioning.
	     */
	    HighlightRenderer.prototype._computeRects = function _computeRects(props) {
	        var highlight = props.highlight, offsetParent = props.offsetParent;
	        // Get the set of rectangles that covers the range's text, relative to
	        // the offset parent.
	        var clientRects = getClientRectsForTextInRange(highlight.domRange);
	        var offsetParentRect = offsetParent.getBoundingClientRect();
	        return clientRects.map(function(rect) {
	            return getRelativeRect(rect, offsetParentRect);
	        });
	    };
	    /**
	     * Return whether the given mouse position (coordinates relative to this
	     * component's offset parent) is hovering over the given rectangle
	     * (coordinates also relative to this component's offset parent).
	     */
	    HighlightRenderer.prototype._rectIsHovered = function _rectIsHovered(rect, mouseOffsetPosition) {
	        var positionWithinRect = getRelativePosition(mouseOffsetPosition, rect);
	        return 0 <= positionWithinRect.left && positionWithinRect.left < rect.width && 0 <= positionWithinRect.top && positionWithinRect.top < rect.height;
	    };
	    /**
	     * Return whether the given mouse position (coordinates relative to the
	     * viewport) is hovering over this highlight.
	     */
	    HighlightRenderer.prototype.isHovered = function isHovered(mouseClientPosition) {
	        var _this2 = this;
	        if (!mouseClientPosition) return false;
	        var offsetParent = this.props.offsetParent;
	        var cachedHighlightRects = this.state.cachedHighlightRects;
	        // Convert the client-relative mouse coordinates to be relative to the
	        // offset parent. That way, we can compare them to the cached highlight
	        // rectangles.
	        var offsetParentRect = offsetParent.getBoundingClientRect();
	        var mouseOffsetPosition = getRelativePosition(mouseClientPosition, offsetParentRect);
	        return cachedHighlightRects.some(function(rect) {
	            return _this2._rectIsHovered(rect, mouseOffsetPosition);
	        });
	    };
	    HighlightRenderer.prototype.render = function render() {
	        var _this3 = this;
	        var rects = this.state.cachedHighlightRects;
	        return React.createElement("div", null, rects.map(function(rect, index) {
	            return React.createElement("div", {
	                key: index,
	                className: css(styles.highlightRect),
	                style: {
	                    // NOTE(mdr): We apply `position: absolute` here
	                    //     rather than in Aphrodite styles, because
	                    //     Aphrodite styles are delayed. If this
	                    //     element temporarily has `position: static`,
	                    //     then it'll displace the content, and other
	                    //     highlights rendering during this update will
	                    //     measure the displaced content instead, oops!
	                    position: "absolute",
	                    width: rect.width,
	                    height: rect.height,
	                    top: rect.top,
	                    left: rect.left,
	                    zIndex: _this3.props.zIndexes.belowContent
	                }
	            });
	        }));
	    };
	    return HighlightRenderer;
	}(React.PureComponent);

	HighlightRenderer.propTypes = {
	    highlight: babelPluginFlowReactPropTypes_proptype_DOMHighlight,
	    highlightKey: __webpack_require__(11).PropTypes.string.isRequired,
	    offsetParent: __webpack_require__(11).PropTypes.any.isRequired,
	    zIndexes: babelPluginFlowReactPropTypes_proptype_ZIndexes
	};

	var styles = StyleSheet.create({
	    highlightRect: {
	        background: "#fffabe"
	    }
	});

	module.exports = HighlightRenderer;

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
	    }
	    return target;
	};

	var babelPluginFlowReactPropTypes_proptype_Rect = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_Rect || __webpack_require__(11).PropTypes.any;

	/**
	 * Utility functions for highlighting UI.
	 */
	var babelPluginFlowReactPropTypes_proptype_Position = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_Position || __webpack_require__(11).PropTypes.any;

	var babelPluginFlowReactPropTypes_proptype_DOMRange = __webpack_require__(222).babelPluginFlowReactPropTypes_proptype_DOMRange || __webpack_require__(11).PropTypes.any;

	var _require = __webpack_require__(209), rangesOverlap = _require.rangesOverlap, intersectRanges = _require.intersectRanges;

	/**
	 * Given two positions relative to the same origin, return `child`'s position
	 * relative to `parent`'s position.
	 */
	function getRelativePosition(child, parent) {
	    return {
	        left: child.left - parent.left,
	        top: child.top - parent.top
	    };
	}

	/**
	 * `getRelativePosition`, but for Rects.
	 *
	 * Given a rectangle and a position relative to the same origin, return a new
	 * rectangle of the same size, whose position is relative to the given
	 * position.
	 */
	function getRelativeRect(child, parent) {
	    return _extends({}, getRelativePosition(child, parent), {
	        width: child.width,
	        height: child.height
	    });
	}

	/**
	 * Given a DOMRange, return a list of client-relative rects that cover the text
	 * inside the DOMRange.
	 *
	 * This behaves differently than the browser's built-in `getClientRects` method
	 * for DOMRanges, because this method only gets rects for the *text* nodes,
	 * whereas the browser's method will also return rects for any fully-contained
	 * *element* nodes.
	 *
	 * For example, if an entire paragraph is selected, then `getClientRects` will
	 * return a rectangle that covers the entire paragraph block, whereas this
	 * method will only return rectangles for the text inside the paragraph.
	 */
	function getClientRectsForTextInRange(range) {
	    var mutableRects = [];
	    addClientRectsForTextInNodeAndRange(range.commonAncestorContainer, range, mutableRects);
	    return mutableRects;
	}

	/**
	 * A helper method for getClientRectsForTextInRange.
	 *
	 * Given a node and a range, find text that is contained within both the node
	 * and the range by recursing down the node's subtree, and push the text's
	 * client rects onto the given `mutableRects` array.
	 */
	function addClientRectsForTextInNodeAndRange(node, range, mutableRects) {
	    var nodeContentsRange = new Range();
	    nodeContentsRange.selectNodeContents(node);
	    if (node.nodeType === Node.TEXT_NODE) {
	        // Get the text that appears both in this text node and in the range
	        // we're searching.
	        var intersectedRange = intersectRanges(range, nodeContentsRange);
	        intersectedRange && addClientRectsForText(node, intersectedRange, mutableRects);
	    } else if (node.nodeType === Node.ELEMENT_NODE) {
	        // Don't bother deep-traversing a node that doesn't even overlap the
	        // range we're searching.
	        if (!rangesOverlap(range, nodeContentsRange)) return;
	        // NOTE(mdr): Safari returns a non-iterable `childNodes` object, so
	        //     convert it to an array.
	        for (var _iterator = Array.from(node.childNodes), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
	            var _ref;
	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }
	            var child = _ref;
	            // TODO(mdr): If this parent has overflow: hidden, bound the child
	            //     rects accordingly. This would allow us to remove the hack
	            //     we added to .perseus-sr-only.
	            addClientRectsForTextInNodeAndRange(child, range, mutableRects);
	        }
	    }
	}

	/**
	 * Given a DOMRange of text fully contained by the given `textNode`, compute
	 * rectangles that visually cover the range, and push them onto the given
	 * `mutableRects` array.
	 *
	 * This function adjusts the rectangles to the line height of the text, to
	 * match the visual behavior of native text selection, and remove annoying gaps
	 * between lines that disrupt hover behavior.
	 */
	function addClientRectsForText(textNode, textRange, mutableRects) {
	    var parentElement = textNode.parentElement;
	    var computedStyle = window.getComputedStyle(parentElement);
	    // NOTE(mdr): I'm not sure how computed line height works in all contexts
	    //     in all browsers. It's valid to specify line height as a ratio,
	    //     relative to font size. Latest Chrome seems to transform this into a
	    //     px value, but maybe some browsers don't, so I'm being defensive here
	    //     and only using the computed line height if it's explicitly a px
	    //     value. We could also handle other browsers by computing font size
	    //     and doing the math ourselves, but let's punt that until we need it.
	    var lineHeight = null;
	    if ("string" === typeof computedStyle.lineHeight && computedStyle.lineHeight.endsWith("px")) {
	        var parsedLineHeight = parseFloat(computedStyle.lineHeight);
	        isNaN(parsedLineHeight) || (lineHeight = parsedLineHeight);
	    }
	    // NOTE(mdr): Safari returns a non-iterable `getClientRects` object, so
	    //     convert it to an array.
	    var boundingRects = Array.from(textRange.getClientRects());
	    for (var _iterator2 = boundingRects, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
	        var _ref2;
	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }
	        var boundingRect = _ref2;
	        var rect = {
	            left: boundingRect.left,
	            top: boundingRect.top,
	            height: boundingRect.height,
	            width: boundingRect.width
	        };
	        // Adjust the rectangle according to the text's line height. It should
	        // keep the same bottom coordinate, so the top coordinate will move
	        // accordingly.
	        if (null !== lineHeight) {
	            var heightIncrease = lineHeight - rect.height;
	            rect.top -= heightIncrease;
	            rect.height = lineHeight;
	        }
	        mutableRects.push(rect);
	    }
	}

	module.exports = {
	    getClientRectsForTextInRange: getClientRectsForTextInRange,
	    getRelativePosition: getRelativePosition,
	    getRelativeRect: getRelativeRect
	};

/***/ }
]);