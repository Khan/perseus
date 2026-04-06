import {isSuccess} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import type {Result} from "@khanacademy/perseus-core";

type Props<TData> = {
    multiLine: boolean;
    value: TData;
    onChange: (newJson: TData) => void;
    parser: (json: string) => Result<TData, unknown>;
    editingDisabled: boolean;
};

type State = {
    currentValue: string | undefined;
    valid: boolean | undefined;
};

class JsonEditor<TData> extends React.Component<Props<TData>, State> {
    static displayName: "JsonEditor";

    constructor(props: Props<TData>) {
        super(props);
        this.state = this.getInitialState();

        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    getInitialState() {
        return {
            currentValue: JSON.stringify(this.props.value, null, 4),
            valid: true,
        };
    }

    componentDidUpdate(prevProps: Props<TData>) {
        if (!_.isEqual(prevProps.value, this.props.value)) {
            const shouldReplaceContent =
                !this.state.valid ||
                !_.isEqual(this.props.value, this.getCurrentValueAsJson());

            if (shouldReplaceContent) {
                this.setState({
                    currentValue: JSON.stringify(this.props.value, null, 4),
                    valid: true,
                });
            }
        }
    }

    getCurrentValueAsJson() {
        try {
            return this.state.currentValue
                ? this.typesafeParseOrThrow(this.state.currentValue)
                : {};
        } catch {
            return null;
        }
    }

    handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        // This handler allows the tab character to be entered by pressing
        // tab, instead of jumping to the next (non-existant) field
        if (e.key === "Tab") {
            const textarea = e.currentTarget;
            const cursorPos = textarea.selectionStart;
            const v = textarea.value;
            const textBefore = v.substring(0, cursorPos);
            const textAfter = v.substring(cursorPos, v.length);
            textarea.value = textBefore + "    " + textAfter;
            textarea.selectionStart = textBefore.length + 4;
            textarea.selectionEnd = textBefore.length + 4;

            e.preventDefault();
            this.processChange(textarea.value);
        }
    }

    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.processChange(e.target.value);
    }

    processChange(nextString: string) {
        try {
            const json = this.typesafeParseOrThrow(nextString);
            // This callback unfortunately causes multiple renders,
            // but seems to be necessary to avoid componentWillReceiveProps
            // being called before setState has gone through
            this.setState(
                {
                    currentValue: nextString,
                    valid: true,
                },
                () => {
                    this.props.onChange(json);
                },
            );
        } catch {
            this.setState({
                currentValue: nextString,
                valid: false,
            });
        }
    }

    // You can type whatever you want as you're typing, but if it's not valid
    // when you blur, it will revert to the last valid value.
    handleBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
        const nextString = e.target.value;
        try {
            const json = this.typesafeParseOrThrow(nextString);
            // This callback unfortunately causes multiple renders,
            // but seems to be necessary to avoid componentWillReceiveProps
            // being called before setState has gone through
            this.setState(
                {
                    currentValue: JSON.stringify(json, null, 4),
                    valid: true,
                },
                () => {
                    this.props.onChange(json);
                },
            );
        } catch {
            this.setState({
                currentValue: JSON.stringify(this.props.value, null, 4),
                valid: true,
            });
        }
    }

    private typesafeParseOrThrow(json: string): TData {
        const parsed = this.props.parser(json);
        if (isSuccess(parsed)) {
            return parsed.value;
        }

        // Parse JSON embedded in quoted strings. This makes it easier to
        // paste in data from e.g. the browser devtools' Network tab.
        const parsedFromQuotedString = this.props.parser(JSON.parse(json));
        if (isSuccess(parsedFromQuotedString)) {
            return parsedFromQuotedString.value;
        }

        throw new TypeError("JsonEditor: parse failure");
    }

    render() {
        const classes =
            "perseus-json-editor " + (this.state.valid ? "valid" : "invalid");

        return (
            <textarea
                className={classes}
                value={this.state.currentValue}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}
                disabled={this.props.editingDisabled}
            />
        );
    }
}

export default JsonEditor;
