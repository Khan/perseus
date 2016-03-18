/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, comma-dangle, indent, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* global i18n, $_ */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var ReactDOM = require("react-dom");
var _ = require("underscore");

var ApiClassNames = require("../../perseus-api.jsx").ClassNames;
var Renderer = require("../../renderer.jsx");


var captureScratchpadTouchStart =
        require("../../util.js").captureScratchpadTouchStart;

var classNames = require("classnames");


var Choice = require("./choice.jsx");

var ChoiceNoneAbove = React.createClass({
    propTypes: {
        showContent: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            showContent: true
        };
    },

    render: function() {
        var choiceProps = _.extend({}, this.props, {
            className: classNames(this.props.className, "none-of-above"),
            content: (this.props.showContent ?
                this.props.content :
                // We use a Renderer here because that is how
                // `this.props.content` is wrapped otherwise.
                // We pass in a key here so that we avoid a semi-spurious
                // react warning when we render this in the same place
                // as the previous choice content renderer.
                // Note this destroys state, but since all we're doing
                // is outputting "None of the above", that is okay.
                <Renderer
                    key="noneOfTheAboveRenderer"
                    content={i18n._("None of the above")} />
            ),
        });

        return <Choice {...choiceProps} />;
    }
});

var BaseRadio = React.createClass({
    propTypes: {
        labelWrap: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onCheckedChange: React.PropTypes.func,
        onePerLine: React.PropTypes.bool,
        apiOptions: React.PropTypes.object,
        reviewModeRubric: React.PropTypes.object,
        deselectEnabled: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            onePerLine: true,
        };
    },

    render: function() {
        // TODO(aria): Stop this from mutating the id every time someone
        // clicks on a radio :(
        var radioGroupName = _.uniqueId("perseus_radio_");
        var inputType = this.props.multipleSelect ? "checkbox" : "radio";
        var rubric = this.props.reviewModeRubric;

        return <fieldset className="perseus-widget-radio-fieldset">
            <legend className="perseus-sr-only">{this.props.multipleSelect ?
                <$_>Select all that apply.</$_> :
                <$_>Please choose from one of the following options.</$_>
            }</legend>
            <ul className={"perseus-widget-radio " +
                "above-scratchpad blank-background"}>
                {this.props.multipleSelect &&
                    <div className="instructions">
                        <$_>Select all that apply.</$_>
                    </div>}
                {this.props.choices.map(function(choice, i) {
                    // True if we're in review mode and a clue (aka rationale)
                    // is available. These are only used for SAT questions,
                    // though there was historically an inconclusive AB test
                    // that showed clues for other exercises.
                    // (See content/targeted_clues_exercises.py for more)
                    // TODO(marcia): Aria recommends bringing this logic up a
                    // level, as with this.props.questionCompleted.
                    var reviewModeClues = !!(rubric && rubric.choices[i].clue);

                    var Element = Choice;
                    var elementProps = {
                        ref: `radio${i}`,
                        checked: choice.checked,
                        correct: (rubric && rubric.choices[i].correct),
                        clue: choice.clue,
                        content: choice.content,
                        disabled: this.props.apiOptions.readOnly,
                        groupName: radioGroupName,
                        showClue: reviewModeClues,
                        type: inputType,
                        pos: i,
                        deselectEnabled: this.props.deselectEnabled,
                        onChecked: (checked) => {
                            this.checkOption(i, checked);
                        }
                    };

                    if (choice.isNoneOfTheAbove) {
                        Element = ChoiceNoneAbove;
                        _.extend(elementProps, {showContent: choice.correct});
                    }

                    var className = classNames(
                        // TODO(aria): Make test case for these API classNames
                        ApiClassNames.RADIO.OPTION,
                        choice.checked && ApiClassNames.RADIO.SELECTED,
                        !this.props.onePerLine && "inline",
                        (rubric && rubric.choices[i].correct &&
                            ApiClassNames.CORRECT
                        ),
                        (rubric && !rubric.choices[i].correct &&
                            ApiClassNames.INCORRECT
                        )
                    );

                    // TODO(mattdr): Index isn't a *good* choice of key here;
                    // is there a better one? Can we use choice content
                    // somehow? Would changing our choice of key somehow break
                    // any voodoo happening inside a choice's child Renderers
                    // by changing when we mount/unmount?
                    return <li className={className} key={i}
                            onTouchStart={!this.props.labelWrap ?
                                null : captureScratchpadTouchStart
                            }>
                        <Element {...elementProps} />
                    </li>;
                }, this)}
            </ul>
        </fieldset>;
    },

    checkOption: function(radioIndex, shouldBeChecked) {
        var newChecked;
        if (this.props.multipleSelect) {
            // When multipleSelect is on, clicking an index toggles the
            // selection of just that index.
            newChecked = _.map(this.props.choices, (choice, i) => {
                return (i === radioIndex) ? shouldBeChecked : choice.checked;
            });
        } else {
            // When multipleSelect is turned off we always unselect everything
            // that wasn't clicked.
            newChecked = _.map(this.props.choices, (choice, i) => {
                return i === radioIndex && shouldBeChecked;
            });
        }

        // We send just the array of [true/false] checked values here;
        // onCheckedChange reconstructs the new choices to send to
        // this.props.onChange
        this.props.onCheckedChange(newChecked);
    },

    focus: function(i) {
        ReactDOM.findDOMNode(this.refs["radio" + (i || 0)]).focus();
        return true;
     }
});

module.exports = BaseRadio;
