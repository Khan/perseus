/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * In review mode (currently only visible in the sat-mission), NumericInput and
 * InputNumber use this component to display the set of correct answers.
 */

var React = require("react");
var _ = require("underscore");

var PossibleAnswers = React.createClass({
    propTypes: {
        answers: React.PropTypes.arrayOf(React.PropTypes.string)
    },
    render: function() {
        // It's redundant to show duplicate answers.
        // So, remove duplicates from the given list of answer strings.
        var answers = _.uniq(this.props.answers);

        var answerComponents = _.map(answers, (answer) => {
            // Plus, now that our answers are distinct, we can safely use the
            // answer string as a key.
            return <dd key={answer}>
                {answer}
            </dd>;
        });
        return <dl className="perseus-possible-answers">
            <dt>Correct Answer</dt>
            {answerComponents}
        </dl>;
    }
});

module.exports = PossibleAnswers;
