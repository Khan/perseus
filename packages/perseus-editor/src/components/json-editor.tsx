import * as React from "react";
import ReactJson from "react-json-view";
import _ from "underscore";

const JsonEditor = (props: any) => {
    const [currentValue, setCurrentValue] = React.useState(
        JSON.stringify(props.value, null, 4),
    );
    const [valid, setValid] = React.useState(true);

    React.useEffect(() => {
        const shouldReplaceContent =
            !valid || !_.isEqual(currentValue, JSON.parse(currentValue));

        if (shouldReplaceContent) {
            setCurrentValue(JSON.stringify(props.value, null, 4));
            setValid(true);
        }
    }, [currentValue, props.value, valid]);

    const handleChange = React.useCallback(
        (e) => {
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
                setCurrentValue(nextString);
                setValid(true);

                props.onChange(json);
            } catch (ex: any) {
                setCurrentValue(nextString);
                setValid(true);
            }
        },
        [props],
    );

    const handleKeyDown = React.useCallback(
        (e) => {
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
                handleChange(e);
            }
        },
        [handleChange],
    );

    // You can type whatever you want as you're typing, but if it's not valid
    // when you blur, it will revert to the last valid value.
    const handleBlur = React.useCallback((e) => {
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
    }, []);

    const classes = "perseus-json-editor " + (valid ? "valid" : "invalid");

    return (
        <textarea
            className={classes}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        />
    );
};

JsonEditor.displayName = "JsonEditor";

export default JsonEditor;
