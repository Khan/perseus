import * as React from "react";

const textWidthCache = new Map<string, number>();
function getTextWidth(text: string): number {
    let width = textWidthCache.get(text);
    if (width === undefined) {
        // Hacky way to guess the width of an input box
        const test = document.createElement("span");
        test.textContent = text;
        document.body.appendChild(test);
        width = test.offsetWidth + 5;
        test.remove();
        textWidthCache.set(text, width);
    }
    return width;
}

type Props = {
    options?: string[];
    layout?: "horizontal" | "vertical";
    onChange: (options: string[]) => void;
};

/**
 * A list of text inputs that always keeps one empty input at the end, so there
 * is somewhere to type the next entry. Enter adds an entry below the current
 * one and backspace on an empty entry removes it, both moving focus to match.
 */
export default function TextListEditor({
    options = [],
    layout = "horizontal",
    onChange,
}: Props) {
    const [items, setItems] = React.useState<string[]>(() => [...options, ""]);

    // Whenever a new `options` array arrives, it replaces whatever is being
    // edited locally. Editing calls `onChange`, so the incoming value is
    // normally the parent's echo of an edit we just made.
    const [syncedOptions, setSyncedOptions] = React.useState(options);
    if (syncedOptions !== options) {
        setSyncedOptions(options);
        setItems([...options, ""]);
    }

    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

    // Focus can only move to an input once the updated list has been committed
    // to the DOM, so the handlers below record where focus should land and this
    // applies it after the render that adds or removes an input.
    const pendingFocusIndex = React.useRef<number | null>(null);
    React.useLayoutEffect(() => {
        if (pendingFocusIndex.current != null) {
            inputRefs.current[pendingFocusIndex.current]?.focus();
            pendingFocusIndex.current = null;
        }
    });

    const handleChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        let nextItems = [...items];
        nextItems[index] = event.target.value;

        if (index === nextItems.length - 1) {
            nextItems = nextItems.concat("");
        }

        setItems(nextItems);
        onChange(nextItems.filter(Boolean));
    };

    const handleKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        // Backspace deletes an empty input...
        if (event.key === "Backspace" && items[index] === "") {
            event.preventDefault();

            const focusIndex = index === 0 ? 0 : index - 1;

            if (
                index === items.length - 1 &&
                (index === 0 || items[focusIndex] !== "")
            ) {
                // ...except for the last one, iff it is the only empty
                // input at the end.
                inputRefs.current[focusIndex]?.focus();
            } else {
                const nextItems = [...items];
                nextItems.splice(index, 1);
                pendingFocusIndex.current = focusIndex;
                setItems(nextItems);
            }

            // Deleting the last character in the second-to-last input
            // removes it
        } else if (
            event.key === "Backspace" &&
            items[index].length === 1 &&
            index === items.length - 2
        ) {
            event.preventDefault();

            const nextItems = [...items];
            nextItems.splice(index, 1);
            setItems(nextItems);
            onChange(nextItems.filter(Boolean));

            // Enter adds an option below the current one...
        } else if (event.key === "Enter") {
            event.preventDefault();

            const focusIndex = index + 1;

            if (index === items.length - 2) {
                // ...unless the empty input is just below.
                inputRefs.current[focusIndex]?.focus();
            } else {
                const nextItems = [...items];
                nextItems.splice(focusIndex, 0, "");
                pendingFocusIndex.current = focusIndex;
                setItems(nextItems);
            }
        }
    };

    const className = [
        "perseus-text-list-editor",
        "perseus-clearfix",
        "layout-" + layout,
    ].join(" ");

    return (
        <ul className={className}>
            {items.map((item, i) => (
                <li key={i}>
                    <input
                        ref={(node) => {
                            inputRefs.current[i] = node;
                        }}
                        type="text"
                        value={item}
                        onChange={(event) => handleChange(i, event)}
                        onKeyDown={(event) => handleKeyDown(i, event)}
                        style={{width: getTextWidth(item)}}
                    />
                </li>
            ))}
        </ul>
    );
}
