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
 *
 * Stable CSS ClassNames:
 * These are css class names that will continue to preserve their
 * semantic meaning across the same perseus api major version.
 */

var StubTagEditor = require("./components/stub-tag-editor.jsx");

module.exports = {
    Options: {
        propTypes: React.PropTypes.shape({
            fancyDropdowns: React.PropTypes.bool.isRequired,
            onInputError: React.PropTypes.func.isRequired,
            onFocusChange: React.PropTypes.func.isRequired,
            staticRender: React.PropTypes.bool.isRequired,
            GroupMetadataEditor: React.PropTypes.func.isRequired,
            // Enable old answer types in test.html
            // TODO(aria) Remove when Alex kills the answer area
            enableOldAnswerTypes: React.PropTypes.bool.isRequired,
        }).isRequired,

        defaults: {
            fancyDropdowns: false,
            onInputError: function() { },
            onFocusChange: function() { },
            staticRender: false,
            GroupMetadataEditor: StubTagEditor,
            enableOldAnswerTypes: false,
        }
    },
    ClassNames: {
        RENDERER: "perseus-renderer",
        TWO_COLUMN_RENDERER: "perseus-renderer-two-columns",
        INPUT: "perseus-input",
        FOCUSED: "perseus-focused",
        RADIO: {
            OPTION: "perseus-radio-option",
            SELECTED: "perseus-radio-selected",
            OPTION_CONTENT: "perseus-radio-option-content"
        },
        INTERACTIVE: "perseus-interactive"
    }
};

