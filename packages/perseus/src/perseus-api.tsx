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
import * as React from "react";

import type {APIOptionsWithDefaults} from "./types";

export const ApiOptions = {
    // eslint-disable-next-line no-restricted-syntax
    defaults: {
        isArticle: false,
        isMobile: false,
        isMobileApp: false,
        editingDisabled: false,
        onFocusChange: function () {},
        showAlignmentOptions: false,
        readOnly: false,
        baseElements: {
            Link: (
                props: any,
            ): React.ReactElement<React.ComponentProps<"a">> => {
                const {children, ...rest} = props;
                return <a {...rest}>{children}</a>;
            },
        },
    } as APIOptionsWithDefaults,
} as const;

export const ClassNames = {
    RENDERER: "perseus-renderer",
    TWO_COLUMN_RENDERER: "perseus-renderer-two-columns",
    RESPONSIVE_RENDERER: "perseus-renderer-responsive",
    INPUT: "perseus-input",
    FOCUSED: "perseus-focused",
    MOBILE: "perseus-mobile",
} as const;
