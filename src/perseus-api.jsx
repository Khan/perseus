/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * [Most of] the Perseus client API.
 *
 * If making a change to this file, or otherwise to the perseus
 * API, you should increment:
 *  * the perseus api major version if it is a breaking change
 *  * the perseus api minor version if it is an additive-only change
 *  * nothing if it is purely a bug fix.
 *
 * Callbacks passed to Renderer/ItemRenderer:
 *  * onInputError:
 *    Called when there is an error grading a widget
 *  * onFocusChange: (newFocus, oldFocus)
 *    Called when the user focus changes. Each parameter is an object
 *    containing two fields, `path` and `element`.
 *    `path` is an array uniquely identifying the input to perseus
 *    `element` is a DOM element representing the area covered by
 *    the input (but is not necessarily an `<input>` element).
 *    When focus changes to or from nothing being selected, `path`
 *    will be null.
 *  * interactionCallback: Called when the user interacts with a widget.
 *  * answerableCallback: Called with the current `answerability` of the
 *    problem, e.g. whether all required fields have input.
 *  * getAnotherHint: If provided, a button is rendered at the bottom of the
 *    hints (only when at least one hint has been shown, and not all hints
 *    have been shown) allowing the user to take another hint. This function
 *    is then called when the user clicks the button.
 *
 * Stable CSS ClassNames:
 * These are css class names that will continue to preserve their
 * semantic meaning across the same perseus api major version.
 */
var React = require("react");

var StubTagEditor = require("./components/stub-tag-editor.jsx");

module.exports = {
    Options: {
        propTypes: React.PropTypes.shape({
            isArticle: React.PropTypes.bool.isRequired,
            fancyDropdowns: React.PropTypes.bool.isRequired,
            responsiveStyling: React.PropTypes.bool.isRequired,
            mobileStyling: React.PropTypes.bool.isRequired,
            satStyling: React.PropTypes.bool.isRequired,
            onInputError: React.PropTypes.func.isRequired,
            onFocusChange: React.PropTypes.func.isRequired,
            staticRender: React.PropTypes.bool.isRequired,
            GroupMetadataEditor: React.PropTypes.func.isRequired,
            showAlignmentOptions: React.PropTypes.bool.isRequired,
            readOnly: React.PropTypes.bool.isRequired,

            answerableCallback: React.PropTypes.func,
            getAnotherHint: React.PropTypes.func,
            interactionCallback: React.PropTypes.func,

            // A function that takes in the relative problem number (starts at
            // 0 and is incremented for each group widget), and the ID of the
            // group widget, then returns a react component that will be added
            // immediately above the renderer in the group widget. If the
            // function returns null, no annotation will be added.
            groupAnnotator: React.PropTypes.func.isRequired,

            // If imagePlaceholder or widgetPlaceholder are set, perseus will
            // render the placeholder instead of the image or widget node.
            imagePlaceholder: React.PropTypes.node,
            widgetPlaceholder: React.PropTypes.node,

            // Function that takes dimensions and returns a React component
            // to display while an image is loading
            imagePreloader: React.PropTypes.func,

            // Function that takes an object argument. The object should
            // include type and id, both strings, at least and can optionally
            // include a boolean "correct" value. This is used for keeping
            // track of widget interactions.
            trackInteraction: React.PropTypes.func,

            // A boolean that indicates whether or not a software keypad is
            // being used.  For mobile web this will be the ProvidedKeypad
            // component.  In this situation we the MathInput component from
            // the math-input repo instead of the existing perseus math input
            // components.
            softwareKeypad: React.PropTypes.bool,
        }).isRequired,

        defaults: {
            isArticle: false,
            fancyDropdowns: false,
            responsiveStyling: false,
            mobileStyling: false,
            satStyling: false,
            onInputError: function() { },
            onFocusChange: function() { },
            staticRender: false,
            GroupMetadataEditor: StubTagEditor,
            showAlignmentOptions: false,
            readOnly: false,
            groupAnnotator: function() { return null; },
        },
    },
    ClassNames: {
        RENDERER: "perseus-renderer",
        TWO_COLUMN_RENDERER: "perseus-renderer-two-columns",
        RESPONSIVE_RENDERER: "perseus-renderer-responsive",
        INPUT: "perseus-input",
        FOCUSED: "perseus-focused",
        RADIO: {
            OPTION: "perseus-radio-option",
            SELECTED: "perseus-radio-selected",
            OPTION_CONTENT: "perseus-radio-option-content",
        },
        INTERACTIVE: "perseus-interactive",
        CORRECT: "perseus-correct",
        INCORRECT: "perseus-incorrect",
        UNANSWERED: "perseus-unanswered",
    },
};
