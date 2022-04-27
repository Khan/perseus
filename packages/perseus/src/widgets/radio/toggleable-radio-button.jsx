// @flow
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

/**
 * A radio button that can be unchecked by clicking it again.
 *
 * This component behaves much like a checkbox in that when you click it again
 * (or hit space bar or select it in some other way), it will become unchecked.
 * (Hopefully) it behaves exactly like a radio button in every other way though
 * (arrow keys can still be used to select it within a group for example).
 *
 * Here's a summary of which of our event handlers fire for each way to select
 * or deselect the button:
 *
 * - Clicking a button: handleClick, handleChange
 * - Pressing spacebar with button focussed: handleKeyDown, handleKeyUp (we
 *   suppress the default behavior of some browsers to synthesize a click event
 *   here).
 * - When radio button A is selected, pressing down arrow to select B:
 *   handleKeyDown (A), handleClick (B), handleChange (B), handleKeyUp (B)
 * - Clicking with mac screenreader: handleClick, handleChange
 */
class ToggleableRadioButton extends React.Component<$FlowFixMe, $FlowFixMe> {
    _inputElement: ?HTMLInputElement;

    static propTypes = {
        // Whether the radio button should be checked or unchecked (this is a
        // controlled component).
        checked: PropTypes.bool.isRequired,

        // A ref function to attach to the <input> element.
        inputRef: PropTypes.func,

        // A function that will be called whenever the radio button is checked
        // or unchecked. It's possible for this to be called twice for a single
        // checking or unchecking.
        onChecked: PropTypes.func.isRequired,

        // Callbacks for when the user presses the up/left arrow or down/right
        // arrow (respectively) to navigate between choices. When called, the
        // parent finds the prev/next choice, focuses the input, and checks the
        // radio button if appropriate. (The reason we have custom behavior is
        // that we actually _don't_ want to auto-select crossed-out choices!)
        goToPrevChoice: PropTypes.func.isRequired,
        goToNextChoice: PropTypes.func.isRequired,
    };

    handleClick: (SyntheticMouseEvent<>) => void = (event) => {
        this.props.onChecked(!this.props.checked);

        // NOTE(johnsullivan): Preventing default would make sense to do here
        //     because we're fully controlling the state of the check box and
        //     don't really want it to be (un)checked accidently. React
        //     requires that we *don't* call preventDefault from the onClick or
        //     onChecked handlers of a controlled component though.
    };

    handleKeyUp: (SyntheticKeyboardEvent<>) => void = (event) => {
        // Make hitting the spacebar with the element selected equivalent to
        // clicking it. Some browsers do this as part of the radio button's
        // default behavior, but since some browsers don't we normalize the
        // behavior here.
        if (event.key === " ") {
            this.props.onChecked(!this.props.checked);
            event.preventDefault();
        }
    };

    handleChange: (SyntheticInputEvent<>) => void = (event) => {
        // If the checkbox is going from unchecked to checked, we'll handle it
        // here.
        // NOTE(johnsullivan): The onClick/onKeyUp handler most likely *also*
        //     handled this, but we're being defensive against browsers/devices
        //     that might not call those handlers like we'd expect. It's
        //     unclear to me whether this is strictly necessary.
        if (!this.props.checked && event.target.checked) {
            this.props.onChecked(true);
        }
    };

    handleKeyDown: (SyntheticKeyboardEvent<>) => void = (event) => {
        // This is necessary in order to prevent IE9 from creating a duplicate
        // click event on the radio button when the space bar is hit.
        if (event.key === " ") {
            event.preventDefault();
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            this.props.goToPrevChoice();
            event.preventDefault();
        } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            this.props.goToNextChoice();
            event.preventDefault();
        }
    };

    /**
     * We keep a reference to the input element ourselves, and provide it to
     * the parent, too.
     */
    handleRef: (HTMLInputElement) => void = (inputElement) => {
        this._inputElement = inputElement;
        this.props.inputRef && this.props.inputRef(inputElement);
    };

    render(): React.Node {
        const {
            // eslint-disable-next-line no-unused-vars
            inputRef,
            // eslint-disable-next-line no-unused-vars
            onChecked,
            // eslint-disable-next-line no-unused-vars
            goToPrevChoice,
            // eslint-disable-next-line no-unused-vars
            goToNextChoice,
            ...otherProps
        } = this.props;

        return (
            <input
                {...otherProps}
                type="radio"
                onChange={this.handleChange}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                ref={this.handleRef}
            />
        );
    }
}

export default ToggleableRadioButton;
