import $ from "jquery";
import * as React from "react";

const textWidthCache: Record<string, number> = {};
function getTextWidth(text: string): number {
    if (!(text in textWidthCache)) {
        // Hacky way to guess the width of an input box
        const $test = $("<span>").text(text).appendTo("body");
        // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
        textWidthCache[text] = $test.width() + 5;
        $test.remove();
    }
    return textWidthCache[text];
}

type Props = {
    options: string[];
    layout: "horizontal" | "vertical";
    onChange: (options: string[]) => void;
};

type State = {
    items: string[];
};

class TextListEditor extends React.Component<Props, State> {
    static defaultProps: Pick<Props, "options" | "layout"> = {
        options: [],
        layout: "horizontal",
    };

    state: State = {
        items: this.props.options.concat(""),
    };

    // The rendered inputs, keyed by their index in `state.items`, so that
    // keyboard handling can move focus between them.
    inputRefs: Map<number, HTMLInputElement> = new Map();

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.setState({
            items: nextProps.options.concat(""),
        });
    }

    onChange: (
        arg1: number,
        arg2: React.ChangeEvent<HTMLInputElement>,
    ) => void = (index, event) => {
        let items = [...this.state.items];
        items[index] = event.target.value;

        if (index === items.length - 1) {
            items = items.concat("");
        }

        this.setState({items: items});
        this.props.onChange(items.filter(Boolean));
    };

    onKeyDown: (arg1: number, arg2: React.KeyboardEvent) => void = (
        index,
        event,
    ) => {
        // Backspace deletes an empty input...
        if (event.key === "Backspace" && this.state.items[index] === "") {
            event.preventDefault();

            const items = [...this.state.items];
            const focusIndex = index === 0 ? 0 : index - 1;

            if (
                index === items.length - 1 &&
                (index === 0 || items[focusIndex] !== "")
            ) {
                // ...except for the last one, iff it is the only empty
                // input at the end.
                this.inputRefs.get(focusIndex)?.focus();
            } else {
                items.splice(index, 1);
                this.setState({items: items}, () => {
                    this.inputRefs.get(focusIndex)?.focus();
                });
            }

            // Deleting the last character in the second-to-last input
            // removes it
        } else if (
            event.key === "Backspace" &&
            this.state.items[index].length === 1 &&
            index === this.state.items.length - 2
        ) {
            event.preventDefault();

            const items = [...this.state.items];
            items.splice(index, 1);
            this.setState({items: items});
            this.props.onChange(items.filter(Boolean));

            // Enter adds an option below the current one...
        } else if (event.key === "Enter") {
            event.preventDefault();

            const items = [...this.state.items];
            const focusIndex = index + 1;

            if (index === items.length - 2) {
                // ...unless the empty input is just below.
                this.inputRefs.get(focusIndex)?.focus();
            } else {
                items.splice(focusIndex, 0, "");
                this.setState({items: items}, () => {
                    this.inputRefs.get(focusIndex)?.focus();
                });
            }
        }
    };

    render(): React.ReactNode {
        const className = [
            "perseus-text-list-editor",
            "perseus-clearfix",
            "layout-" + this.props.layout,
        ].join(" ");

        const inputs = this.state.items.map((item, i) => {
            return (
                <li key={i}>
                    <input
                        ref={(node) => {
                            if (node) {
                                this.inputRefs.set(i, node);
                            } else {
                                this.inputRefs.delete(i);
                            }
                        }}
                        type="text"
                        value={item}
                        onChange={(event) => this.onChange(i, event)}
                        onKeyDown={(event) => this.onKeyDown(i, event)}
                        style={{width: getTextWidth(item)}}
                    />
                </li>
            );
        });

        return <ul className={className}>{inputs}</ul>;
    }
}

export default TextListEditor;
