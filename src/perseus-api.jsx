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
 *  * interceptInputFocus:
 *    When non-null, inputs will not receive focus events,
 *    but instead this function will be called
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
var React = require("react");

module.exports = {
    Options: {
        propTypes: React.PropTypes.shape({
            isMobile: React.PropTypes.bool,
            fancyDropdowns: React.PropTypes.bool.isRequired,
            interceptInputFocus: React.PropTypes.func,
            onInputError: React.PropTypes.func.isRequired,
            onFocusChange: React.PropTypes.func.isRequired,
            staticRender: React.PropTypes.bool.isRequired,
            readOnly: React.PropTypes.bool.isRequired,
            baseElements: React.PropTypes.shape({
                Link: React.PropTypes.func,
            }),
        }).isRequired,

        defaults: {
            isMobile: false,
            fancyDropdowns: false,
            interceptInputFocus: null,
            onInputError: function() { },
            onFocusChange: function() { },
            staticRender: false,
            readOnly: false,
            baseElements: {
                Link: (props) => {
                    return <a {...props} />;
                },
            },
        }
    },
    ClassNames: {
        INPUT: "perseus-input",
        FOCUSED: "perseus-focused",
        RADIO: {
            OPTION: "perseus-radio-option",
            SELECTED: "perseus-radio-selected",
            OPTION_CONTENT: "perseus-radio-option-content"
        }
    }
};
