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
    const {domElement, addLabel} = React.useMemo(
        () => renderer.render(tex),
        [tex],
    );

    React.useLayoutEffect(() => {
        if (ref.current) {
            // TODO(LEMS-3157): this `if (isPresentationalForSR()) addLabel()`
            // duplicates logic in khan/frontend that adds an aria label to the
            // rendered math. We don't need to (and can't really) test this
            // behavior within Perseus. Consider removing this code.
            if (isPresentationalForSR(ref.current)) {
                addLabel().catch(console.error);
            }
            ref.current.innerHTML = "";
            ref.current.appendChild(domElement);
        }
    }, [ref, addLabel, domElement]);

    React.useEffect(() => {
        renderer.updateStyles();
        onRender?.();
    }, [tex, onRender]);

    return <span ref={ref} />;
}

function isPresentationalForSR(element: HTMLElement | null): boolean {
    if (element == null) {
        return false;
    }
    return (
        presentationalRoles.some((role) => element.matches(`[role=${role}]`)) ||
        isPresentationalForSR(element.parentElement)
    );
}

/**
 * List of aria-roles that apply "presentation" to descendants, which strips
 * math markup of its semantic meaning, which makes it inaccessible to screen
 * readers and other assistive technology.
 *
 * Taken from this rule from WAI-ARIA 1.2:
 * https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion
 */
const presentationalRoles = [
    "button",
    "checkbox",
    "img",
    "menuitemcheckbox",
    "menuitemradio",
    "meter",
    "option",
    "progressbar",
    "radio",
    "scrollbar",
    "separator",
    "slider",
    "switch",
    "tab",
    // "combobox" is NOT included in the WAI-ARIA 1.2 list of aria-roles that
    // apply "presentation" to descendants, but screenreaders seem to treat it
    // as presentational anyway. For context, see:
    // - https://github.com/Khan/mathjax-renderer/commit/d706d27eab482f32d0d1c93f23fb6af6d1add8cf
    // - https://khanacademy.atlassian.net/browse/LIT-1425
    "combobox",
] as const;
