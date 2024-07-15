/* eslint-disable @babel/no-invalid-this */
/* eslint-disable react/sort-comp */
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {css, StyleSheet} from "aphrodite";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

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
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
            <label className={css(styles.labeledCheckbox)}>
                {this._labelAlignLeft() && (
                    <LabelSmall>{this.props.label}</LabelSmall>
                )}
                <Checkbox
                    checked={this.props[propName]}
                    onChange={this.toggle}
                />
                {!this._labelAlignLeft() && (
                    <LabelSmall>{this.props.label}</LabelSmall>
                )}
            </label>
        );
    },

    toggle: function () {
        const propName = this.propName();
        const changes: Record<string, any> = {};
        changes[propName] = !this.props[propName];
        this.props.onChange(changes);
    },
});

export const styles = StyleSheet.create({
    labeledCheckbox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});

export default PropCheckBox;
