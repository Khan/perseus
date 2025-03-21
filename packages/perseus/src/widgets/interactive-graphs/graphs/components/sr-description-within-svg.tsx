import * as React from "react";

import a11y from "../../../../util/a11y";

type Props = {
    id: string;
    children: React.ReactNode | string;
};

/**
 * If an element has an `aria-describedby` attribute, it needs to point to
 * a separate description element that contains the description for that
 * element.
 *
 * If the element is within an SVG, the description element must be a
 * `<span>` within a `<foreignObject>` in order for some browser/SR
 * combos to be able to access it.
 *
 * Use this SRDescInSVG component to create the <foreignObject>
 * and styling for this description element.
 */
function SRDescInSVG(props: Props) {
    const {id, children} = props;

    return (
        <foreignObject>
            <span
                id={id}
                // Hidden visually
                style={a11y.srOnly}
                // Hidden from screen readers so they don't read this
                // again outside of the element that it describes.
                aria-hidden={true}
            >
                {children}
            </span>
        </foreignObject>
    );
}

export default SRDescInSVG;
