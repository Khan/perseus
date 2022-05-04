/**
 * A component that renders the UP iconograpy in SVG.
 */
import * as React from "react";

import Arrow from "./arrow.js";

const Up = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48">
            <Arrow transform="rotate(90 24 24)" />
        </svg>
    );
};

export default Up;
