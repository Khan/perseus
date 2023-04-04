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
 *  * onFocusChange: (newFocusPath, oldFocusPath, keypadDOMNode)
 *    Called when the user focus changes. The first two parameters are `path`
 *    arrays uniquely identifying the respect inputs. The third parameter,
 *    `keypadDOMNode`, is the DOM node of the custom keypad, or `null` if the
 *    keypad is disabled, which can be used by clients to accommodate for the
 *    appearance of the keypad on the screen.
 *    When focus changes to or from nothing being selected, `path` will be null.
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
import PropTypes from "prop-types";
import * as React from "react";

import StubTagEditor from "./components/stub-tag-editor";

import type {APIOptionsWithDefaults} from "./types";

export const ApiOptions = {
    propTypes: PropTypes.shape({
        isArticle: PropTypes.bool.isRequired,

        onInputError: PropTypes.func.isRequired,
        onFocusChange: PropTypes.func.isRequired,
        GroupMetadataEditor: PropTypes.func.isRequired,
        showAlignmentOptions: PropTypes.bool.isRequired,
        readOnly: PropTypes.bool.isRequired,

        answerableCallback: PropTypes.func,
        getAnotherHint: PropTypes.func,
        interactionCallback: PropTypes.func,

        // A function that takes in the relative problem number (starts at
        // 0 and is incremented for each group widget), and the ID of the
        // group widget, then returns a react component that will be added
        // immediately above the renderer in the group widget. If the
        // function returns null, no annotation will be added.
        groupAnnotator: PropTypes.func.isRequired,

        // If imagePlaceholder or widgetPlaceholder are set, perseus will
        // render the placeholder instead of the image or widget node.
        imagePlaceholder: PropTypes.node,
        widgetPlaceholder: PropTypes.node,

        // Base React elements that can be used in place of the standard DOM
        // DOM elements. For example, when provided, <Link /> will be used
        // in place of <a />. This allows clients to provide pre-styled
        // components or components with custom behavior.
        baseElements: PropTypes.shape({
            // The <Link /> component provided here must adhere to the same
            // interface as React's base <a /> component.
            Link: PropTypes.func,
        }),

        // Function that takes dimensions and returns a React component
        // to display while an image is loading
        imagePreloader: PropTypes.func,

        // Function that takes an object argument. The object should
        // include type and id, both strings, at least and can optionally
        // include a boolean "correct" value. This is used for keeping
        // track of widget interactions.
        trackInteraction: PropTypes.func,

        // A boolean that indicates whether or not a custom keypad is
        // being used.  For mobile web this will be the ProvidedKeypad
        // component.  In this situation we use the MathInput component
        // from the math-input repo instead of the existing perseus math
        // input components.
        customKeypad: PropTypes.bool,

        // If this is provided, it is called instead of appending an instance
        // of `math-input`'s keypad to the body. This is used by the native
        // apps so they can have the keypad be defined on the native side.
        // It is called with an function that, when called, blurs the input,
        // and is expected to return an object of the shape
        // keypadElementPropType from math-input/src/prop-types.js.
        nativeKeypadProxy: PropTypes.func,

        // Indicates whether or not to use mobile styling.
        isMobile: PropTypes.bool,

        // A function, called with a bool indicating whether use of the
        // drawing area (scratchpad) should be allowed/disallowed.
        // Previously handled by `Khan.scratchpad.enable/disable`
        setDrawingAreaAvailable: PropTypes.func,

        // Whether to use the Draft.js editor or the legacy textarea
        useDraftEditor: PropTypes.bool,

        // The color used for the hint progress indicator (eg. 1 / 3)
        hintProgressColor: PropTypes.string,

        // Whether this Renderer is allowed to auto-scroll the rest of the
        // page. For example, if this is enabled, the most recently used
        // radio widget will attempt to keep the "selected" answer in view
        // after entering review mode.
        //
        // Defaults to `false`.
        canScrollPage: PropTypes.bool,

        // Whether or not we are rendering content inside of a modal.
        inModal: PropTypes.bool,

        // Whether to enable the cross-out feature on multiple-choice radio
        // widgets. This allows users to note which answers they believe to
        // be incorrect, to find the answer by process of elimination.
        //
        // We plan to roll this out to all call sites eventually, but for
        // now we have this flag, to add it to Generalized Test Prep first.
        crossOutEnabled: PropTypes.bool,

        // The value in milliseconds by which the local state of content
        // in a editor is delayed before propagated to a prop. For example,
        // when text is typed in the text area of an Editor component,
        // there will be a delay equal to the value of `editorChangeDelay`
        // before the change is propagated. This is added for better
        // responsiveness of the editor when used in certain contexts such
        // as StructuredItem exercises where constant re-rendering for each
        // keystroke caused text typed in the text area to appear in it
        // only after a good few seconds.
        editorChangeDelay: PropTypes.number,
    }).isRequired,

    defaults: {
        isArticle: false,
        isMobile: false,
        onInputError: function () {},
        onFocusChange: function () {},
        GroupMetadataEditor: StubTagEditor,
        showAlignmentOptions: false,
        readOnly: false,
        groupAnnotator: function (): null {
            return null;
        },
        baseElements: {
            Link: (
                props: any,
            ): React.ReactElement<React.ComponentProps<"a">> => {
                return <a {...props} />;
            },
        },
        setDrawingAreaAvailable: function () {},
        useDraftEditor: false,
        canScrollPage: false,
        inModal: false,
        crossOutEnabled: false,
        editorChangeDelay: 0,
    } as APIOptionsWithDefaults,
} as const;

export const ClassNames = {
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
    MOBILE: "perseus-mobile",
} as const;
