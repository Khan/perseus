// @flow
/**
 * In review mode (currently only visible in the sat-mission), NumericInput and
 * InputNumber use this component to display the set of correct answers.
 */

import * as i18n from "@khanacademy/wonder-blocks-i18n";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

class PossibleAnswers extends React.Component<$FlowFixMe> {
    static propTypes = {
        answers: PropTypes.arrayOf(PropTypes.string),
    };

    render(): React.Node {
        // It's redundant to show duplicate answers.
        // So, remove duplicates from the given list of answer strings.
        const answers = _.uniq(this.props.answers);

        const answerComponents = _.map(answers, (answer) => {
            // Plus, now that our answers are distinct, we can safely use the
            // answer string as a key.
            return <dd key={answer}>{answer}</dd>;
        });
        return (
            <dl className="perseus-possible-answers">
                <dt>{i18n.doNotTranslate("Correct Answer")}</dt>
                {answerComponents}
            </dl>
        );
    }
}

export default PossibleAnswers;
