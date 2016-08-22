/* globals i18n */
/**
 * Renders answer bar for mobile graded groups. [STATELESS]
 */
const React = require('react');

const ApiOptions = require('../perseus-api.jsx').Options;
const InlineIcon = require('../components/inline-icon.jsx');
const {iconStar, iconTryAgain} = require('../icon-paths.js');

const {
    boldFontFamily,
    gray68,
    gray76,
    gray85,
    gray95,
    kaGreen,
    phoneMargin,
    negativePhoneMargin,
} = require('../styles/constants.js');

const ANSWER_BAR_STATES = {
    // Initial state before the question is answerable.  The user must complete
    // each of the widgets before the answer bar becomes visible.
    HIDDEN: Symbol('HIDDEN'),

    // The 'Check' button is active whenever the question is answerable or any
    // of the input widgets have been modified after getting the answer wrong.
    ACTIVE: Symbol('ACTIVE'),

    // The 'Check' button is disabled and there is no message.  This occurs when
    // some of the widgets haven't been filled in after the has already become
    // visible.
    INACTIVE: Symbol('INACTIVE'),

    // This happens immediately after clicking 'Check' with a wrong answer.
    // The 'Check' button is disabled and the 'Try Again' message is displayed.
    INCORRECT: Symbol('INCORRECT'),

    // Final state.  This occurs after the user submits the correct answer.
    // The widgets in this grade-group are disabled.
    CORRECT: Symbol('CORRECT'),
};

const GradedGroupAnswerBar = React.createClass({
    propTypes: {
        // TODO(kevinb) update to oneOf once we update to 15.2
        answerBarState: React.PropTypes.any.isRequired,
        apiOptions: ApiOptions.propTypes,
        onCheckAnswer: React.PropTypes.func.isRequired,
    },

    render() {
        const {apiOptions, answerBarState, onCheckAnswer} = this.props;

        const answerBarStyle = {
            ...styles.answerBar,
            backgroundColor: answerBarState === ANSWER_BAR_STATES.CORRECT
                ? gray95 : 'white',
            justifyContent: answerBarState === ANSWER_BAR_STATES.CORRECT
                ? 'center' : 'space-between',
        };

        const buttonStyle = {
            ...styles.button,
            backgroundColor: answerBarState === ANSWER_BAR_STATES.ACTIVE
                ? kaGreen : gray85,
        };

        const textStyle = {
            ...styles.text,
            color: answerBarState === ANSWER_BAR_STATES.CORRECT
                ? kaGreen : gray68,
        };


        const message = answerBarState === ANSWER_BAR_STATES.INCORRECT ?
            <span style={textStyle}>
                <span style={styles.tryAgainIcon}>
                    <InlineIcon {...iconTryAgain} />
                </span>
                <span style={{marginLeft: 8}}>{i18n._('Keep trying')}</span>
            </span> :
            <span />;  // empty span keeps the button the right side

        if (answerBarState !== ANSWER_BAR_STATES.CORRECT) {
            const buttonLabel = answerBarState === ANSWER_BAR_STATES.INCORRECT
                ? i18n._("Try again")
                : i18n._("Check");

            // Use <button> instead of <input> b/c iOS 9.3 on iPhone 6 renders
            // the <input> as a faded out green button instead of using our
            // styles.
            return <div style={answerBarStyle}>
                {message}
                <button
                    style={buttonStyle}
                    disabled={apiOptions.readOnly ||
                        answerBarState !== ANSWER_BAR_STATES.ACTIVE}
                    onClick={onCheckAnswer}
                >{buttonLabel}</button>
            </div>;
        } else {
            return <div style={answerBarStyle}>
                <span style={textStyle}>
                    <span style={{fontSize: 28, color: '#FFB300'}}>
                        <InlineIcon {...iconStar} style={{marginBottom: 5}} />
                    </span>
                    <span style={{marginLeft: 8}}>Correct</span>
                </span>
            </div>;
        }
    },
});

const fontSize = 17;

const styles = {
    answerBar: {
        display: 'flex',
        alignItems: 'center',
        height: 68, // so that we don't have calculate the vertical padding
        marginLeft: negativePhoneMargin,
        marginRight: negativePhoneMargin,
        marginBottom: negativePhoneMargin,
        marginTop: phoneMargin,
        paddingLeft: phoneMargin,
        paddingRight: 10,
        borderTop: `1px solid ${gray76}`,
    },

    // TODO(kevinb) figure out a way inject styles/components from webapp
    button: {
        height: 48,
        width: 143,
        borderRadius: 4,
        color: 'white',
        fontFamily: boldFontFamily,
        fontSize: fontSize,
        border: 'none',
    },

    tryAgainIcon: {
        fontSize: 28,
        color: '#63D9EA',
        transform: 'scale(-1,1) rotate(-268deg)',
    },

    text: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: boldFontFamily,
        fontSize: fontSize,
    },
};

GradedGroupAnswerBar.ANSWER_BAR_STATES = ANSWER_BAR_STATES;

module.exports = GradedGroupAnswerBar;
