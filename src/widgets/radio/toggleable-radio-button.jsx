const React = require('react');
const _ = require("underscore");


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
const ToggleableRadioButton = React.createClass({
    propTypes: {
        // Whether the radio button should be checked or unchecked (this is a
        // controlled component).
        checked: React.PropTypes.bool.isRequired,

        // A ref function to attach to the <input> element.
        inputRef: React.PropTypes.func,

        // A function that will be called whenever the radio button is checked
        // or unchecked. It's possible for this to be called twice for a single
        // checking or unchecking.
        onChecked: React.PropTypes.func.isRequired,
    },

    handleClick: function(event) {
        this.props.onChecked(!this.props.checked);

        // NOTE(johnsullivan): Preventing default would make sense to do here
        //     because we're fully controlling the state of the check box and
        //     don't really want it to be (un)checked accidently. React
        //     requires that we *don't* call preventDefault from the onClick or
        //     onChecked handlers of a controlled component though.
    },

    handleKeyUp: function(event) {
        // Make hitting the spacebar with the element selected equivalent to
        // clicking it. Some browsers do this as part of the radio button's
        // default behavior, but since some browsers don't we normalize the
        // behavior here.
        if (event.key === " ") {
            this.props.onChecked(!this.props.checked);
            event.preventDefault();
        }
    },

    handleChange: function(event) {
        // If the checkbox is going from unchecked to checked, we'll handle it
        // here.
        // NOTE(johnsullivan): The onClick/onKeyUp handler most likely *also*
        //     handled this, but we're being defensive against browsers/devices
        //     that might not call those handlers like we'd expect. It's
        //     unclear to me whether this is strictly necessary.
        if (!this.props.checked && event.target.checked) {
            this.props.onChecked(true);
        }
    },

    handleKeyDown: function(event) {
        // This is necessary in order to prevent IE9 from creating a duplicate
        // click event on the radio button when the space bar is hit.
        if (event.key === " ") {
            event.preventDefault();
        }
    },

    render: function() {
        const inputProps = _.extend({}, this.props, {
            type: "radio",
            onChange: this.handleChange,
            onClick: this.handleClick,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            ref: this.props.inputRef,
        });

        return <input {...inputProps} />;
    },
});

module.exports = ToggleableRadioButton;
