/* eslint-disable react/prop-types, react/sort-comp */

const React = require("react");
const _ = require("underscore");

/* A checkbox that syncs its value to props using the
 * renderer's onChange method, and gets the prop name
 * dynamically from its props list
 */
const PropCheckBox = React.createClass({
    propTypes: {
        labelAlignment: React.PropTypes.oneOf(["left", "right"]),
    },

    DEFAULT_PROPS: {
        label: null,
        onChange: null,
        labelAlignment: "left",
    },

    getDefaultProps: function() {
        return this.DEFAULT_PROPS;
    },

    propName: function() {
        const propName = _.find(
            _.keys(this.props),
            function(localPropName) {
                return !_.has(this.DEFAULT_PROPS, localPropName);
            },
            this
        );

        if (!propName) {
            throw new Error(
                "Attempted to create a PropCheckBox with no prop!"
            );
        }

        return propName;
    },

    _labelAlignLeft: function() {
        return this.props.labelAlignment === "left";
    },

    render: function() {
        const propName = this.propName();
        return (
            <label>
                {this._labelAlignLeft() && this.props.label}
                <input
                    type="checkbox"
                    checked={this.props[propName]}
                    onChange={this.toggle}
                />
                {!this._labelAlignLeft() && this.props.label}
            </label>
        );
    },

    toggle: function() {
        const propName = this.propName();
        const changes = {};
        changes[propName] = !this.props[propName];
        this.props.onChange(changes);
    },
});

module.exports = PropCheckBox;
