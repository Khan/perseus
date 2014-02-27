/** @jsx React.DOM */

/* MultiButtonGroup is an aesthetically pleasing group of buttons,
 * which allows multiple buttons to be selected at the same time.
 *
 * The class requires these properties:
 *   buttons - an array of objects with keys:
 *     "value": this is the value returned when the button is selected
 *     "text": this is the text shown on the button
 *     "title": this is the title-text shown on hover
 *   onChange - a function that is provided with an array of the updated
 *     values (which it then is responsible for updating)
 *
 * The class has these optional properties:
 *   values - an array of the initial values of the buttons selected.
 *
 * Requires stylesheets/perseus-admin-package/editor.less to look nice.
 */

var MultiButtonGroup = React.createClass({
    propTypes: {
        values: React.PropTypes.array,
        buttons: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            values: []
        }
    },

    render: function() {
        var buttons = this.props.buttons;
        var values = this.props.values;

        return <div className="perseus-button-group">
            {_.map(buttons, function(button, i) {
                var isSelected = _.contains(values, button.value);
                return <button title={button.title}
                    id={"" + i} key = {"" + i}
                    className={isSelected ? "selected" : ""}
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
        var values = this.props.values;

        if (_.contains(values, newValue)) {
            // If the value is already selected, unselect it
            this.props.onChange(_.without(values, newValue));
        } else {
            // Otherwise merge with other values and return
            this.props.onChange(_.union(values, [newValue]));
        }
    }
});

module.exports = MultiButtonGroup;
