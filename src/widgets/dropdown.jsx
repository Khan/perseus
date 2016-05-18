const classNames = require("classnames");
const FancySelect = require("../components/fancy-select.jsx");
const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");

const FancyOption = FancySelect.Option;

const ApiClassNames = require("../perseus-api.jsx").ClassNames;
const ApiOptions = require("../perseus-api.jsx").Options;

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
            apiOptions: ApiOptions.defaults,
        };
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
    },

    render: function() {
        const choices = this.props.choices.slice();

        const selectClasses = classNames({
            "perseus-widget-dropdown": true,
            "perseus-fancy-dropdown": this.props.apiOptions.fancyDropdowns,
        });

        if (this.props.apiOptions.fancyDropdowns) {
            return <FancySelect
                onChange={this._handleChange}
                className={selectClasses + " " + ApiClassNames.INTERACTIVE}
                value={this.props.selected}
            >
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
                value={this.props.selected}
            >
                <option value={0} disabled>
                    {this.props.placeholder}
                </option>
                {choices.map((choice, i) => {
                    return <option
                        key={"" + (i + 1)}
                        value={i + 1}
                    >
                        {choice}
                    </option>;
                })}
            </select>;
        }
    },
});

_.extend(Dropdown, {
    validate: function(state, rubric) {
        const selected = state.value;
        if (selected === 0) {
            return {
                type: "invalid",
                message: null,
            };
        } else {
            const correct = rubric.choices[selected - 1].correct;
            return {
                type: "points",
                earned: correct ? 1 : 0,
                total: 1,
                message: null,
            };
        }
    },
});

const propTransform = (editorProps) => {
    return {
        placeholder: editorProps.placeholder,
        choices: _.map(editorProps.choices, (choice) => choice.content),
    };
};

module.exports = {
    name: "dropdown",
    displayName: "Drop down",
    defaultAlignment: "inline-block",
    accessible: true,
    widget: Dropdown,
    transform: propTransform,
};
