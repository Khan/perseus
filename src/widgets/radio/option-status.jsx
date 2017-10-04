// @flow

/**
 * Renders text indicating whether the choice was correct or
 * not and whether the choice was selected or not.
 * This information is redundant with that provided in the
 * ChoiceIcon visualizations but is meant to make the distinctions
 * between the states more immediately clear to users.
 */

/* globals i18n */

const React = require("react");
const {StyleSheet, css} = require("aphrodite");

const styleConstants = require("../../styles/constants.js");

class OptionStatus extends React.Component {
    props: {
        // Was this option the correct answer?
        correct: boolean,
        // Did the user select this option as the answer?
        checked: boolean,
    }

    render() {
        const {checked, correct} = this.props;
        const correctness = correct ? i18n._("correct") : i18n._("incorrect");
        const selectedness = checked ? i18n._("(selected)") : "";
        const text = `${correctness} ${selectedness}`;
        const textStyle = correct ? styles.correct : styles.incorrect;
        return <div className={css(styles.text, textStyle)}>
            {text}
        </div>;
    }
}

const styles = StyleSheet.create({
    text: {
        alignItems: "center",
        display: "flex",
        fontSize: 12,
        height: 32,
        textTransform: "uppercase",
    },
    correct: {
        color: styleConstants.kaGreen,
    },
    incorrect: {
        color: styleConstants.warning1,
    },
});

module.exports = OptionStatus;
