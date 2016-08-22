/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * A version of the `math-input` subrepo's KeypadInput component that adheres to
 * the same API as Perseus's  MathOuput and NumberInput, allowing it to be
 * dropped in as a replacement for those components without any modifications.
 *
 * TODO(charlie): Once the keypad API has stabilized, move this into the
 * `math-input` subrepo and use it everywhere as a simpler, keypad-coupled
 * interface to `math-input`'s MathInput component.
 */

const React = require('react');

const {KeypadInput} = require("../../math-input").components;
const {KeypadTypes} = require("../../math-input").consts;
const {keypadElementPropType} = require("../../math-input").propTypes;

const SimpleKeypadInput = React.createClass({
    propTypes: {
        keypadElement: keypadElementPropType,
        onFocus: React.PropTypes.func,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
    },

    focus() {
        this.refs.input.focus();
    },

    blur() {
        this.refs.input.blur();
    },

    getValue: function() {
        return this.props.value;
    },

    render() {
        // Intercept the `onFocus` prop, as we need to configure the keypad
        // before continuing with the default focus logic for Perseus inputs.
        // Intercept the `value` prop so as to map `null` to the empty string,
        // as the `KeypadInput` does not support `null` values.
        const {keypadElement, onFocus, value, ...rest} = this.props;

        return <KeypadInput
            ref="input"
            keypadElement={keypadElement}
            onFocus={() => {
                if (keypadElement) {
                    keypadElement.configure({
                        keypadType: KeypadTypes.FRACTION,
                    }, () => {
                        if (this.isMounted()) {
                            onFocus && onFocus();
                        }
                    });
                } else {
                    onFocus && onFocus();
                }
            }}
            value={value == null ? "" : "" + value}
            {...rest}
        />;
    },
});

module.exports = SimpleKeypadInput;
