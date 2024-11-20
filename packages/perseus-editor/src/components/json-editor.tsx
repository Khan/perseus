/* eslint-disable @babel/no-invalid-this */
/* eslint-disable react/no-unsafe */
import createReactClass from "create-react-class";
import * as React from "react";
import _ from "underscore";

const JsonEditor: any = createReactClass({
    displayName: "JsonEditor",

    getInitialState: function () {
        return {
            currentValue: JSON.stringify(this.props.value, null, 4),
            valid: true,
        };
    },

    UNSAFE_componentWillReceiveProps: function (nextProps) {
        const shouldReplaceContent =
            !this.state.valid ||
            !_.isEqual(nextProps.value, JSON.parse(this.state.currentValue));

        if (shouldReplaceContent) {
            this.setState(this.getInitialState());
        }
    },

    handleKeyDown: function (e) {
        // This handler allows the tab character to be entered by pressing
        // tab, instead of jumping to the next (non-existant) field
        if (e.key === "Tab") {
            const cursorPos = e.target.selectionStart;
            const v = e.target.value;
            const textBefore = v.substring(0, cursorPos);
            const textAfter = v.substring(cursorPos, v.length);
            e.target.value = textBefore + "    " + textAfter;
            e.target.selectionStart = textBefore.length + 4;
            e.target.selectionEnd = textBefore.length + 4;

            e.preventDefault();
            this.handleChange(e);
        }
    },

    handleChange: function (e) {
        const nextString = e.target.value;
        try {
            let json = JSON.parse(nextString);
            // Some extra handling to allow copy-pasting from /api/vi
            if (_.isString(json)) {
                json = JSON.parse(json);
            }
            // This callback unfortunately causes multiple renders,
            // but seems to be necessary to avoid componentWillReceiveProps
            // being called before setState has gone through
            this.setState(
                {
                    currentValue: nextString,
                    valid: true,
                },
                function () {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    this.props.onChange(json);
                },
            );
        } catch (ex: any) {
            this.setState({
                currentValue: nextString,
                valid: false,
            });
        }
    },

    // You can type whatever you want as you're typing, but if it's not valid
    // when you blur, it will revert to the last valid value.
    handleBlur: function (e) {
        const nextString = e.target.value;
        try {
            let json = JSON.parse(nextString);
            // Some extra handling to allow copy-pasting from /api/vi
            if (_.isString(json)) {
                json = JSON.parse(json);
            }
            // This callback unfortunately causes multiple renders,
            // but seems to be necessary to avoid componentWillReceiveProps
            // being called before setState has gone through
            this.setState(
                {
                    currentValue: JSON.stringify(json, null, 4),
                    valid: true,
                },
                function () {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    this.props.onChange(json);
                },
            );
        } catch (ex: any) {
            this.setState({
                currentValue: JSON.stringify(this.props.value, null, 4),
                valid: true,
            });
        }
    },

    render: function () {
        const classes =
            "perseus-json-editor " + (this.state.valid ? "valid" : "invalid");

        return (
            <textarea
                className={classes}
                value={this.state.currentValue}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}
            />
        );
    },
});

export default JsonEditor;
