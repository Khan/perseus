/* eslint-disable @babel/no-invalid-this */
/* eslint-disable react/no-unsafe */
import * as React from "react";
import _ from "underscore";

type Props = {
    value: any;
};

type DefaultProps = {
    value: Props["value"];
};

export class JsonEditor extends React.Component<Props> {
    static displayName: "JsonEditor";
    currentValue: string | undefined;
    valid: boolean | undefined;

    static defaultProps: DefaultProps = {
        value: 0,
    };

    getInitialState() {
        return {
            currentValue: JSON.stringify(this.props.value, null, 4),
            valid: true,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const shouldReplaceContent =
            !this.valid ||
            !_.isEqual(
                nextProps.value,
                JSON.parse(this.currentValue ? this.currentValue : ""),
            );

        if (shouldReplaceContent) {
            this.setState(this.getInitialState());
        }
    }

    handleKeyDown(e) {
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
    }

    handleChange(e) {
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
    }

    // You can type whatever you want as you're typing, but if it's not valid
    // when you blur, it will revert to the last valid value.
    handleBlur(e) {
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
    }

    render() {
        const classes =
            "perseus-json-editor " + (this.valid ? "valid" : "invalid");

        return (
            <textarea
                className={classes}
                value={this.currentValue}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}
            />
        );
    }
}

export default JsonEditor;
