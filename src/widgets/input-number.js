/** @jsx React.DOM */
(function(Perseus) {

var answerTypes = {
    number: {name: "Numbers",
             forms: "integer, decimal, proper, improper, mixed"},
    decimal: {name: "Decimals", forms: "decimal"},
    integer: {name: "Integers", forms: "integer"},
    rational: {name: "Rationals", forms: "integer, proper, improper, mixed"},
    improper: {name: "Improper numbers", forms: "integer, proper, improper"},
    mixed: {name: "Mixed numbers", forms: "integer, proper, mixed"},
    percent: {name: "Percents",
              forms: "decimal, proper, improper, mixed, percent"},
    pi: {name: "Numbers with pi", forms: "pi"}
};

var formExamples = {
    "integer": function(options) { return $._("an integer, like $6$"); },
    "proper": function(options) {
        if (options.simplify === "optional") {
            return $._("a *proper* fraction, like $1/2$ or $6/10$");
        } else {
            return $._("a *simplified proper* fraction, like $3/5$");
        }
    },
    "improper": function(options) {
        if (options.simplify === "optional") {
            return $._("an *improper* fraction, like $10/7$ or $14/8$");
        } else {
            return $._("a *simplified improper* fraction, like $7/4$");
        }
    },
    "mixed": function(options) {
        return $._("a mixed number, like $1\\ 3/4$");
    },
    "decimal": function(options) {
        return $._("an *exact* decimal, like $0.75$");
    },
    "percent": function(options) {
        return $._("a percent, like $12.34\\%$");
    },
    "pi": function(options) {
        return $._("a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$");
    }
};

var InputNumber = React.createClass({
    render: function() {
        return <input ref="input" type="text" className=
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
    },

    examples: function() {
        var type = this.props.answerType || "number";
        var forms = answerTypes[type].forms.split(/\s*,\s*/);

        var examples = _.map(forms, function(form) {
            return formExamples[form](this.props);
        }, this);

        return examples;
    }
});

_.extend(InputNumber, {
    validate: function(state, rubric) {
        if (rubric.answerType == null) {
            rubric.answerType = "number";
        }
        var val = Khan.answerTypes.number.createValidatorFunctional(
            rubric.value, {
                simplify: rubric.simplify,
                inexact: rubric.inexact || undefined,
                maxError: rubric.maxError,
                forms: answerTypes[rubric.answerType].forms
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
    }
});

var InputNumberEditor = React.createClass({
    getDefaultProps: function() {
        return {
            value: "0",
            simplify: "required",
            size: "normal",
            inexact: false,
            maxError: 0.1,
            answerType: "number"
        };
    },

    componentDidMount: function() {
        // TODO(alpert): How to do this at initialization instead of here?
        this.refs.size.getDOMNode().value = this.props.size;
    },

    render: function() {
        var answerTypeOptions = _.map(answerTypes, function(v, k) {
            return <option selected={k === this.props.answerType}
                    value={k}>{v.name}</option>;
        }, this);

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
                <input type="checkbox"
                    checked={this.props.inexact}
                    onChange={function(e) {
                        this.props.onChange({inexact: e.target.checked});
                    }.bind(this)} />
                Allow inexact answers
            </label>

            <label>
            <input /* TODO(emily): don't use a hidden checkbox for alignment */
                type="checkbox" style={{visibility: "hidden"}} />
            Max error:
            <input type="text" disabled={!this.props.inexact}
                value={this.props.maxError}
                onBlur={function(e) {
                    var ans = "" + (Perseus.Util.firstNumericalParse(
                            e.target.value) || 0);
                    e.target.value = ans;
                    this.props.onChange({maxError: ans});
                }.bind(this)} />
            </label></div>

            <div>
            Answer type:
            <select onChange={function(e) {
                    this.props.onChange({answerType: e.target.value});
                }.bind(this)}>
                {answerTypeOptions}
            </select>
            </div>

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
        return _.pick(this.props,
                "value", "simplify", "size", "inexact", "maxError",
                "answerType");
    }
});

Perseus.Widgets.register("input-number", InputNumber);
Perseus.Widgets.register("input-number-editor", InputNumberEditor);

})(Perseus);
