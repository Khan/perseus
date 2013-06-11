/** @jsx React.DOM */
(function(Perseus) {

var InputNumber = React.createClass({
    render: function() {
        var type = window.Modernizr && Modernizr.touch ? "number" : "text";
        return <input ref="input" type={type} className=
            {"perseus-input-size-" + (this.props.size || "normal")} />;
    },

    focus: function() {
        this.refs.input.getDOMNode().focus();
        return true;
    },

    toJSON: function(skipValidation) {
        return {
            value: this.refs.input.getDOMNode().value
        };
    },

    simpleValidate: function(rubric) {
        return InputNumber.validate(this.toJSON(), rubric);
    }
});

_.extend(InputNumber, {
    validate: function(state, rubric) {
        var val = Khan.answerTypes.number.createValidatorFunctional(
            rubric.value, {
                simplify: rubric.simplify
            });
        var result = val(state.value);

        if (state.value === "" || result === "") {
            return {
                type: "invalid",
                message: null
            };
        } else if (typeof result === "string") {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: result
            };
        } else {
            return {
                type: "points",
                earned: result === true ? 1 : 0,
                total: 1,
                message: null
            };
        }
    },

    examples: function(options) {
        var integer = $._("an integer, like $6$");

        var proper, improper;
        if (options.simplify === "optional") {
            proper = $._("a *proper* fraction, like $1/2$ or $6/10$");
            improper = $._("an *improper* fraction, like $10/7$ or $14/8$");
        } else {
            proper = $._("a *simplified proper* fraction, like $3/5$");
            improper = $._("a *simplified improper* fraction, like $7/4$");
        }

        var mixed = $._("a mixed number, like $1\\ 3/4$");

        var decimal = $._("an *exact* decimal, like $0.75$");

        return [integer, proper, improper, mixed, decimal];
    }
});

var InputNumberEditor = React.createClass({
    getDefaultProps: function() {
        return {
            value: "0",
            simplify: "required",
            size: "normal"
        };
    },

    componentDidMount: function() {
        // TODO(alpert): How to do this at initialization instead of here?
        this.refs.size.getDOMNode().value = this.props.size;
    },

    render: function() {
        return <div>
            <div><label>
                Correct answer:
                <input type="text" ref="input" value={this.props.value}
                    onBlur={function(e) {
                        var ans = "" + (Perseus.Util.firstNumericalParse(
                                e.target.value) || 0);
                        e.target.value = ans;
                        this.props.onChange({value: ans});
                    }.bind(this)} />
            </label></div>

            <div><label>
                <input type="checkbox"
                    checked={this.props.simplify === "required"}
                    onChange={function(e) {
                        this.props.onChange({simplify: e.target.checked ?
                                "required" : "optional"});
                    }.bind(this)} />
                Require simplification
            </label></div>

            <div><label>
                Width
                <select ref="size"
                        onChange={function(e) {
                            this.props.onChange({size: e.target.value});
                        }.bind(this)}>
                    <option value="normal">Normal (80px)</option>
                    <option value="small">Small (40px)</option>
                </select>
            </label></div>
        </div>;
    },

    focus: function() {
        this.refs.input.getDOMNode().focus();
        return true;
    },

    toJSON: function() {
        return _.pick(this.props, "value", "simplify", "size");
    }
});

Perseus.Widgets.register("input-number", InputNumber);
Perseus.Widgets.register("input-number-editor", InputNumberEditor);

})(Perseus);
