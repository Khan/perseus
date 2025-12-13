import $ from "jquery";
import * as React from "react";
import _ from "underscore";

const textWidthCache: Record<string, any> = {};
function getTextWidth(text: any) {
    if (!textWidthCache[text]) {
        // Hacky way to guess the width of an input box
        const $test = $("<span>").text(text).appendTo("body");
        // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
        textWidthCache[text] = $test.width() + 5;
        $test.remove();
    }
    return textWidthCache[text];
}

interface Props {
    options: ReadonlyArray<string | number>;
    layout: "horizontal" | "vertical";
    onChange: (items: string[], cb?: any) => void;
}

interface State {
    items: string[];
}

class TextListEditor extends React.Component<Props, State> {
    static defaultProps = {
        options: [],
        layout: "horizontal",
    };

    state: State = {
        // Turn everything into a string, and add an empty string to the end
        // for the new empty input.
        items: [...this.props.options.map(String), ""],
    };

    inputRefs: Map<number, React.RefObject<HTMLInputElement>> = new Map();

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.setState({
            items: [...nextProps.options.map(String), ""],
        });
    }

    getInputRef(index: number): React.RefObject<HTMLInputElement> {
        let ref = this.inputRefs.get(index);
        if (!ref) {
            ref = React.createRef<HTMLInputElement>();
            this.inputRefs.set(index, ref);
        }
        return ref;
    }

    onChange: (
        arg1: number,
        arg2: React.ChangeEvent<HTMLInputElement>,
    ) => void = (index, event) => {
        let items = _.clone(this.state.items);
        items[index] = event.target.value;

        if (index === items.length - 1) {
            items = items.concat("");
        }

        this.setState({items: items});
        this.props.onChange(_.compact(items));
    };

    onKeyDown: (arg1: number, arg2: React.KeyboardEvent) => void = (
        index,
        event,
    ) => {
        const which = event.nativeEvent.keyCode;

        // Backspace deletes an empty input...
        if (which === 8 /* backspace */ && this.state.items[index] === "") {
            event.preventDefault();

            const items = _.clone(this.state.items);
            const focusIndex = index === 0 ? 0 : index - 1;

            if (
                index === items.length - 1 &&
                (index === 0 || items[focusIndex] !== "")
            ) {
                // ...except for the last one, iff it is the only empty
                // input at the end.
                this.getInputRef(focusIndex).current?.focus();
            } else {
                items.splice(index, 1);
                this.setState({items: items}, () => {
                    this.getInputRef(focusIndex).current?.focus();
                });
            }

            // Deleting the last character in the second-to-last input
            // removes it
        } else if (
            which === 8 /* backspace */ &&
            this.state.items[index].length === 1 &&
            index === this.state.items.length - 2
        ) {
            event.preventDefault();

            const items = _.clone(this.state.items);
            items.splice(index, 1);
            this.setState({items: items});
            this.props.onChange(_.compact(items));

            // Enter adds an option below the current one...
        } else if (which === 13 /* enter */) {
            event.preventDefault();

            const items = _.clone(this.state.items);
            const focusIndex = index + 1;

            if (index === items.length - 2) {
                // ...unless the empty input is just below.
                this.getInputRef(focusIndex).current?.focus();
            } else {
                items.splice(focusIndex, 0, "");
                this.setState({items: items}, () => {
                    this.getInputRef(focusIndex).current?.focus();
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

        const inputs = this.state.items?.map((item: string, i: number) => (
            <li key={i}>
                <input
                    ref={this.getInputRef(i)}
                    type="text"
                    value={item}
                    onChange={(e) => this.onChange(i, e)}
                    onKeyDown={(e) => this.onKeyDown(i, e)}
                    style={{width: getTextWidth(item)}}
                />
            </li>
        ));

        return <ul className={className}>{inputs}</ul>;
    }
}

export default TextListEditor;
