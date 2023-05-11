/**
 * A component that renders the RIGHT iconograpy in SVG.
 */
import * as React from "react";

import Arrow from "./arrow";

const Right = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48">
            <Arrow transform="rotate(180 24 24)" />
        </svg>
    );
};

export default Right;
