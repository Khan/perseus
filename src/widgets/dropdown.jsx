/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const {StyleSheet, css} = require("aphrodite");
const classNames = require("classnames");
const FancySelect = require("../components/fancy-select.jsx");
const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");

const FancyOption = FancySelect.Option;

const ApiClassNames = require("../perseus-api.jsx").ClassNames;
const ApiOptions = require("../perseus-api.jsx").Options;
const styleConstants = require("../styles/constants.js");

const captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

const Dropdown = React.createClass({
    propTypes: {
        apiOptions: ApiOptions.propTypes,
        choices: React.PropTypes.arrayOf(React.PropTypes.string),
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        selected: React.PropTypes.number,
        trackInteraction: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            choices: [],
            selected: 0,
            placeholder: "",
            apiOptions: ApiOptions.defaults
        };
    },

    render: function() {
        var choices = this.props.choices.slice();

        var selectClasses = classNames({
            "perseus-widget-dropdown": true,
            "perseus-fancy-dropdown": this.props.apiOptions.fancyDropdowns
        });

        if (this.props.apiOptions.fancyDropdowns) {
            return <FancySelect
                    onChange={this._handleChange}
                    className={selectClasses + " " + ApiClassNames.INTERACTIVE}
                    value={this.props.selected}>
                <FancyOption value={0} visible={false}>
                    <span className="placeholder">
                        {this.props.placeholder}
                    </span>
                </FancyOption>
                {choices.map((choice, i) => {
                    // Always visible so we can animate them with css
                    return <FancyOption key={i + 1} value={i + 1} visible>
                        {choice}
                    </FancyOption>;
                })}
            </FancySelect>;

        } else {
            const mobileStyling = this.props.apiOptions.xomManatee;
            return <select
                    onChange={this._handleChangeEvent}
                    onTouchStart={captureScratchpadTouchStart}
                    className={selectClasses +
                        " " + css(mobileStyling && styles.dropdownMobile) +
                        " " + ApiClassNames.INTERACTIVE}
                    disabled={this.props.apiOptions.readOnly}
                    value={this.props.selected}>
                <option value={0} disabled>
                    {this.props.placeholder}
                </option>
                {choices.map((choice, i) => {
                    return <option
                            key={"" + (i + 1)}
                            value={i + 1}>
                        {choice}
                    </option>;
                })}
            </select>;
        }
    },

    focus: function() {
        ReactDOM.findDOMNode(this).focus();
        return true;
    },

    _handleChangeEvent: function(e) {
        this._handleChange(parseInt(e.target.value));
    },

    _handleChange: function(selected) {
        this.props.trackInteraction();
        this.props.onChange({selected: selected});
    },

    getUserInput: function() {
        return {value: this.props.selected};
    },

    simpleValidate: function(rubric) {
        return Dropdown.validate(this.getUserInput(), rubric);
    }
});

_.extend(Dropdown, {
    validate: function(state, rubric) {
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

var propTransform = (editorProps) => {
    return {
        placeholder: editorProps.placeholder,
        choices: _.map(editorProps.choices, (choice) => choice.content)
    };
};

const dropDownArrowSize = 24;
const styles = StyleSheet.create({
    dropdownMobile: {
        appearance: 'none',
        background: 'url(/images/dropdown.png) no-repeat right',
        backgroundColor: 'transparent',
        border: `1px solid ${styleConstants.gray76}`,
        borderRadius: 4,
        boxShadow: 'none',
        fontFamily: styleConstants.baseFontFamily,
        padding: `9px ${dropDownArrowSize + 1}px 9px 9px`,

        ':focus': {
            outline: 'none',
            background: 'url(/images/dropdown-focused.png) no-repeat right',
            border: `2px solid ${styleConstants.kaGreen}`,
            padding: `8px ${dropDownArrowSize}px 8px 8px`,
        },

        ':disabled': {
            color: styleConstants.gray68,
        },
    },
});

module.exports = {
    name: "dropdown",
    displayName: "Drop down",
    defaultAlignment: "inline-block",
    accessible: true,
    widget: Dropdown,
    transform: propTransform
};
