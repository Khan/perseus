/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, indent, no-var, object-curly-spacing, one-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-infix-ops */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");
var _ = require("underscore");

var lens = require("../../hubble/index.js");

var Changeable = require("../mixins/changeable.jsx");

var InfoTip = require("../components/info-tip.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var SortableArea = require("react-components/sortable.jsx");
var TeX = require("react-components/tex.jsx");// OldExpression only
var TexButtons = require("../components/tex-buttons.jsx");

var Expression = require("./expression.jsx").Expression;

// An answer can be considered correct, wrong, or ungraded.
var CONSIDERED = ["correct", "wrong", "ungraded"];

var answerFormType = React.PropTypes.shape({
    considered: React.PropTypes.oneOf(CONSIDERED).isRequired,
    value: React.PropTypes.string.isRequired,
    form: React.PropTypes.bool.isRequired,
    simplify: React.PropTypes.bool.isRequired
});

var ExpressionEditor = React.createClass({
    mixins: [Changeable],

    propTypes: {
        answerForms: React.PropTypes.arrayOf(answerFormType),
        times: React.PropTypes.bool,
        buttonSets: TexButtons.buttonSetsType,
        functions: React.PropTypes.arrayOf(React.PropTypes.string)
    },

    getDefaultProps: function() {
        return {
            answerForms: [],
            times: false,
            buttonSets: ["basic"],
            functions: ["f", "g", "h"]
        };
    },

    getInitialState: function() {
        // Is the format of `value` TeX or plain text?
        // TODO(alex): Remove after backfilling everything to TeX
        // TODO(joel) - sucks if you edit some expression without
        // backslashes or curly braces, then come back to the question and
        // it's surprisingly not TeX anymore.

        var isTex;
        // default to TeX if new;
        if (this.props.answerForms.length === 0) {
            isTex = true;
        } else {
            isTex = _(this.props.answerForms).any(form => {
                var { value } = form;
                // only TeX has backslashes and curly braces
                return _.indexOf(value, "\\") !== -1 ||
                       _.indexOf(value, "{")  !== -1;
            });
        }

        return { isTex };
    },

    render: function() {
        var answerOptions = this.props.answerForms
            .map((obj, ix) => {
                var expressionProps = {
                        // note we're using
                        // *this.props*.{times,functions,buttonSets} since each
                        // answer area has the same settings for those
                        times: this.props.times,
                        functions: this.props.functions,
                        buttonSets: this.props.buttonSets,

                        buttonsVisible: "focused",
                        form: obj.form,
                        simplify: obj.simplify,
                        value: obj.value,

                        onChange: props => this.updateForm(ix, props),
                        trackInteraction: () => {},

                        widgetId: this.props.widgetId + "-" + ix,
                };

                return lens(obj)
                    .merge([], {
                        draggable: true,
                        onChange: props => this.updateForm(ix, props),
                        onDelete: () => this.handleRemoveForm(ix),
                        expressionProps: expressionProps
                    })
                    .freeze();
            })
            .map(obj => <AnswerOption {...obj} />);

        var sortable = <SortableArea components={answerOptions}
                                     onReorder={this.handleReorder}
                                     className="answer-options-list" />;

        // checkboxes to choose which sets of input buttons are shown
        var buttonSetChoices = _(TexButtons.buttonSets).map((set, name) => {
            // The first one gets special cased to always be checked, disabled,
            // and float left.
            var isFirst = name === "basic";
            var checked = _.contains(this.props.buttonSets, name) || isFirst;
            var className = isFirst ?
                "button-set-label-float" :
                "button-set-label";
            return <label className={className} key={name}>
                <input type="checkbox"
                       checked={checked}
                       disabled={isFirst}
                       onChange={() => this.handleButtonSet(name)} />
                {name}
            </label>;
        });

        buttonSetChoices.splice(1, 1, <label key="show-div">
            <input type="checkbox"
                   onChange={this.handleToggleDiv} />
            <span className="show-div-button">
                show <TeX>\div</TeX> button
            </span>
        </label>);

        return <div className="perseus-widget-expression-editor">
            <h3 className="expression-editor-h3">Global Options</h3>

            <div>
                <PropCheckBox
                    times={this.props.times}
                    onChange={this.props.onChange}
                    labelAlignment="right"
                    label="Use × for rendering multiplication instead of a
                        center dot." />
                <InfoTip>
                    <p>For pre-algebra problems this option displays
                    multiplication as \times instead of \cdot in both the
                    rendered output and the acceptable formats examples.</p>
                </InfoTip>
            </div>

            <div>
                <label>
                {"Function variables: "}
                <input type="text"
                    defaultValue={this.props.functions.join(" ")}
                    onChange={this.handleFunctions} />
                </label>
                <InfoTip><p>
                    Single-letter variables listed here will be
                    interpreted as functions. This let us know that f(x) means
                    "f of x" and not "f times x".
                </p></InfoTip>
            </div>

            <div>
                <div>Button sets:</div>
                {buttonSetChoices}
            </div>

            {this.state.isTex && <TexButtons
                className="math-input-buttons"
                sets={this.props.buttonSets}
                convertDotToTimes={this.props.times}
                onInsert={this.handleTexInsert} />}

            <h3 className="expression-editor-h3">Answers</h3>

            <p style={{margin: "4px 0"}}>
                student responses area matched against these from top to bottom
            </p>

            {sortable}

            <div>
                <button className="simple-button orange"
                        style={{fontSize: 13}}
                        onClick={this.newAnswer}
                        type="button">
                    Add new answer
                </button>
            </div>

        </div>;
    },

    serialize: function() {
        var formSerializables = ["value", "form", "simplify", "considered",
            // it's a little weird to serialize the react key, but saves some
            // effort reconstructing them when this item is loaded later.
            "key"];
        var serializables = ["answerForms", "buttonSets", "functions",
            "times"];

        var answerForms = this.props.answerForms.map(form => {
            return _(form).pick(formSerializables);
        });

        return lens(this.props)
            .set(["answerForms"], answerForms)
            .mod([], props => _(props).pick(serializables))
            .freeze();
    },

    getSaveWarnings: function() {
        var issues = [];

        if (this.props.answerForms.length === 0) {
            issues.push("No answers specified");
        } else {

            var hasCorrect = !!_(this.props.answerForms).find(form => {
                return form.considered === "correct";
            });
            if (!hasCorrect) {
                issues.push("No correct answer specified");
            }

            _(this.props.answerForms).each((form, ix) => {
                if (this.props.value === "") {
                    issues.push(`Answer ${ix+1} is empty`);
                } else {
                    // note we're not using icu for content creators
                    var expression = KAS.parse(form.value);
                    if (!expression.parsed) {
                        issues.push(`Couldn't parse ${form.value}`);
                    } else if (form.simplify &&
                               !expression.expr.isSimplified()) {
                        issues.push(
                            `${form.value} isn't simplified, but is required" +
                            " to be`);
                    }
                }
            });

            // TODO(joel) - warn about:
            //   - unreachable answers (how??)
            //   - specific answers following unspecific answers
            //   - incorrect answers as the final form
        }

        return issues;
    },

    _newEmptyAnswerForm: function() {
        return {
            considered: 'correct',
            form: false,

            // note: the key means "n-th form created" - not "form in
            // position n" and will stay the same for the life of this form
            key: this.props.answerForms.length,

            simplify: false,
            value: "",
        };
    },

    newAnswer: function() {
        var answerForms = this.props.answerForms.slice();
        answerForms.push(this._newEmptyAnswerForm());
        this.change({ answerForms });
    },

    handleRemoveForm: function(i) {
        var answerForms = this.props.answerForms.slice(0, -1);
        this.change({ answerForms });
    },

    // called when the options (including the expression itself) to an answer
    // form change
    updateForm: function(i, props) {
        var answerForms = lens(this.props.answerForms)
            .merge([i], props)
            .freeze();

        this.change({ answerForms });
    },

    handleReorder: function(components) {
        var answerForms = _(components).map(component => {
            var form = _(component.props)
                .pick("considered", "form", "simplify", "value");
            form.key = component.key;
            return form;
        });

        this.change({ answerForms });
    },

    // called when the selected buttonset changes
    handleButtonSet: function(changingName) {
        var buttonSetNames = _(TexButtons.buttonSets).keys();

        // Filter to preserve order - using .union and .difference would always
        // move the last added button set to the end.
        var buttonSets = _(buttonSetNames).filter(set => {
            return _(this.props.buttonSets).contains(set) !==
                   (set === changingName);
        });

        this.props.onChange({ buttonSets });
    },

    handleToggleDiv: function() {
        // We always want buttonSets to contain exactly one of "basic" and
        // "basic+div". Toggle between the two of them.
        // If someone can think of a more elegant formulation of this (there
        // must be one!) feel free to change it.
        var keep, remove;
        if (_(this.props.buttonSets).contains("basic+div")) {
            keep = "basic";
            remove = "basic+div";
        } else {
            keep = "basic+div";
            remove = "basic";
        }

        var buttonSets = _(this.props.buttonSets)
            .reject(set => set === remove)
            .concat(keep);

        this.change("buttonSets", buttonSets);
    },

    // called when the correct answer changes
    handleTexInsert: function(str) {
        this.refs.expression.insert(str);
    },

    // called when the function variables change
    handleFunctions: function(e) {
        var newProps = {};
        newProps.functions = _.compact(e.target.value.split(/[ ,]+/));
        this.props.onChange(newProps);
    }
});

// Find the next element in arr after val, wrapping around to the first.
var findNextIn = function(arr, val) {
    var ix = _(arr).indexOf(val);
    ix = (ix + 1) % arr.length;
    return arr[ix];
};

var AnswerOption = React.createClass({
    mixins: [Changeable],

    propTypes: {
        considered: React.PropTypes.oneOf(CONSIDERED).isRequired,
        expressionProps: React.PropTypes.object.isRequired,

        // Must the answer have the same form as this answer.
        form: React.PropTypes.bool.isRequired,

        // Must the answer be simplified.
        simplify: React.PropTypes.bool.isRequired,

        onChange: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return { deleteFocused: false };
    },

    handleDeleteBlur: function() {
        this.setState({ deleteFocused: false });
    },

    render: function() {
        var removeButton = null;
        if (this.state.deleteFocused) {
            removeButton = <button type="button"
                                   className="simple-button orange"
                                   onClick={this.handleImSure}
                                   onBlur={this.handleDeleteBlur}>
                                I'm sure!
                           </button>;
        } else {
            removeButton = <button type="button"
                                   className="simple-button orange"
                                   onClick={this.handleDelete}>
                                Delete
                           </button>;
        }

        return <div className="expression-answer-option">

            <div className="answer-handle" />

            <div className="answer-body">

                <div className="answer-considered">
                    <div onClick={this.toggleConsidered}
                         className={"answer-status " + this.props.considered}>
                        {this.props.considered}
                    </div>

                    <div className="answer-expression">
                        <Expression {...this.props.expressionProps} />
                    </div>
                </div>

                <div className="answer-option">
                    <PropCheckBox
                        form={this.props.form}
                        onChange={this.props.onChange}
                        labelAlignment="right"
                        label="Answer expression must have the same form." />
                    <InfoTip>
                        <p>
                            The student's answer must be in the same form.
                            Commutativity and excess negative signs are
                            ignored.
                        </p>
                    </InfoTip>
                </div>

                <div className="answer-option">
                    <PropCheckBox
                        simplify={this.props.simplify}
                        onChange={this.props.onChange}
                        labelAlignment="right"
                        label="Answer expression must be fully expanded and
                            simplified." />
                    <InfoTip>
                        <p>
                            The student's answer must be fully expanded and
                            simplified. Answering this equation (x^2+2x+1) with
                            this factored equation (x+1)^2 will render this
                            response "Your answer is not fully expanded and
                            simplified."
                        </p>
                    </InfoTip>
                </div>

                <div className="remove-container">{removeButton}</div>

            </div>

        </div>;
    },

    handleImSure: function() {
        this.props.onDelete();
    },

    handleDelete: function() {
        this.setState({ deleteFocused: true });
    },

    toggleConsidered: function() {
        var newVal = findNextIn(CONSIDERED, this.props.considered);
        this.change({ considered: newVal });
    },
});

module.exports = ExpressionEditor;
