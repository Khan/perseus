/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var classNames = require("classnames");
var FancySelect = require("../components/fancy-select.jsx");
var React = require('react');
var ReactDOM = require("react-dom");
var _ = require("underscore");

var FancyOption = FancySelect.Option;

var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var ApiOptions = require("../perseus-api.jsx").Options;

var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var Dropdown = React.createClass({
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
            return <select
                    onChange={this._handleChangeEvent}
                    onTouchStart={captureScratchpadTouchStart}
                    className={selectClasses + " " + ApiClassNames.INTERACTIVE}
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

module.exports = {
    name: "dropdown",
    displayName: "Drop down",
    defaultAlignment: "inline-block",
    accessible: true,
    widget: Dropdown,
    transform: propTransform
};
