/* eslint-disable react/prop-types */
/* eslint-disable @babel/no-invalid-this */
/* eslint-disable react/sort-comp */
// @flow
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import {Errors} from "../logging/log.js";
import {PerseusError} from "../perseus-error.js";

/* A checkbox that syncs its value to props using the
 * renderer's onChange method, and gets the prop name
 * dynamically from its props list
 */
const PropCheckBox: any = createReactClass({
    displayName: "PropCheckBox",

    propTypes: {
        labelAlignment: PropTypes.oneOf(["left", "right"]),
    },

    DEFAULT_PROPS: {
        label: null,
        onChange: null,
        labelAlignment: "left",
    },

    getDefaultProps: function () {
        return this.DEFAULT_PROPS;
    },

    propName: function () {
        const propName = _.find(
            _.keys(this.props),
            function (localPropName) {
                return !_.has(this.DEFAULT_PROPS, localPropName);
            },
            this,
        );

        if (!propName) {
            throw new PerseusError(
                "Attempted to create a PropCheckBox with no prop!",
                Errors.InvalidInput,
            );
        }

        return propName;
    },

    _labelAlignLeft: function () {
        return this.props.labelAlignment === "left";
    },

    render: function () {
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

    toggle: function () {
        const propName = this.propName();
        const changes = {};
        changes[propName] = !this.props[propName];
        this.props.onChange(changes);
    },
});

export default PropCheckBox;
