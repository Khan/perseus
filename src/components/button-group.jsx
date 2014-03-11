/** @jsx React.DOM */

/* ButtonGroup is an aesthetically pleasing group of buttons.
 *
 * The class requires these properties:
 *   buttons - an array of objects with keys:
 *     "value": this is the value returned when the button is selected
 *     "text": this is the text shown on the button
 *     "title": this is the title-text shown on hover
 *   onChange - a function that is provided with the updated value
 *     (which it then is responsible for updating)
 *
 * The class has these optional properties:
 *   value - the initial value of the button selected, defaults to null.
 *   allowEmpty - if false, exactly one button _must_ be selected; otherwise
 *     it defaults to true and _at most_ one button (0 or 1) may be selected.
 *
 * Requires stylesheets/perseus-admin-package/editor.less to look nice.
 */

var ButtonGroup = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        buttons: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired,
        allowEmpty: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            value: null,
            allowEmpty: true
        };
    },

    render: function() {
        var buttons = this.props.buttons;
        var value = this.props.value;

        return <div className="perseus-button-group">
            {_.map(buttons, function(button, i) {
                return <button title={button.title}
                    id={"" + i} key = {"" + i}
                    className={button.value === value ? "selected" : ""}
                    onClick={this.toggleSelect.bind(this, button.value)}>
                        {button.text}
                </button>;
            }, this)}
        </div>;
    },

    focus: function() {
        this.getDOMNode().focus();
        return true;
    },

    toggleSelect: function(newValue) {
        var value = this.props.value;

        if (this.props.allowEmpty) {
            // Select the new button or unselect if it's already selected
            this.props.onChange(value !== newValue ? newValue : null);
        } else {
            this.props.onChange(newValue);
        }
    }
});

module.exports = ButtonGroup;
