/**
 * An component that renders the LEFT iconograpy in SVG.
 */
import React from "react";

const Arrow = require("./arrow.js");

const Left = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48">
            <Arrow />
        </svg>
    );
};

export default Left;
