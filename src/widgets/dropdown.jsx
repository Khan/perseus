/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const {StyleSheet, css} = require("aphrodite");
const classNames = require("classnames");
const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");

const ApiClassNames = require("../perseus-api.jsx").ClassNames;
const ApiOptions = require("../perseus-api.jsx").Options;
const InlineIcon = require("../components/inline-icon.jsx");
const styleConstants = require("../styles/constants.js");

const {iconDropdownArrow} = require("../icon-paths.js");
const captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

const dropdownArrowSize = 24;

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
        });

        return <div>
                <select
                    onChange={this._handleChangeEvent}
                    onTouchStart={captureScratchpadTouchStart}
                    className={selectClasses +
                        " " + css(styles.dropdown) +
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
            </select>
            <InlineIcon
                {...iconDropdownArrow}
                style={{
                    marginLeft: `-${dropdownArrowSize}px`,
                    height: dropdownArrowSize,
                    width: dropdownArrowSize,
                }}
            />
        </div>;
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

const styles = StyleSheet.create({
    dropdown: {
        appearance: 'none',
        backgroundColor: 'transparent',
        border: `1px solid ${styleConstants.gray76}`,
        borderRadius: 4,
        boxShadow: 'none',
        fontFamily: styleConstants.baseFontFamily,
        padding: `9px ${dropdownArrowSize + 1}px 9px 9px`,

        ':focus': {
            outline: 'none',
            border: `2px solid ${styleConstants.kaGreen}`,
            padding: `8px ${dropdownArrowSize}px 8px 8px`,
        },

        ':focus + svg': {
            color: `${styleConstants.kaGreen}`,
        },

        ':disabled': {
            color: styleConstants.gray68,
        },

        ':disabled + svg' : {
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
