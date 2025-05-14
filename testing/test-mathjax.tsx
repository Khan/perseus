import {MathJaxRenderer} from "@khanacademy/mathjax-renderer";
import * as React from "react";
import "@khanacademy/mathjax-renderer/src/css/mathjax.css";

// if you want \text{} to look good on Safari:
import "@khanacademy/mathjax-renderer/src/css/safari-hacks.css";

// if you want copy-paste support:
import "@khanacademy/mathjax-renderer/src/css/selectable.css";

const renderer = new MathJaxRenderer({
    // shouldFixUnicodeLayout ensures that non-ASCII text is correctly
    // measured and positioned in e.g. \overbrace and \underbrace expressions.
    // Set shouldFixUnicodeLayout to false if you're rendering in an
    // environment without a layout engine, e.g. jsdom.
    shouldFixUnicodeLayout: true,
    fontURL: "https://cdn.kastatic.org/fonts/mathjax",
    locale: "en",
});

type Props = {
    children: string;
    onRender?: (root?: any) => unknown;
};

export function TestMathjax({children: tex, onRender}: Props) {
    const ref = React.useRef<HTMLSpanElement>(null);
    const {domElement, addLabelWhenPresentational} = React.useMemo(
        () => renderer.render(tex),
        [tex],
    );

    React.useLayoutEffect(() => {
        if (ref.current) {
            addLabelWhenPresentational(ref.current);
            ref.current.innerHTML = "";
            ref.current.appendChild(domElement);
        }
    });

    React.useEffect(() => {
        renderer.updateStyles();
        onRender?.();
    }, [tex, onRender]);

    return <span ref={ref} />;
}
