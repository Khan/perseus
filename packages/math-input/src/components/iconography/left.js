/**
 * An component that renders the LEFT iconograpy in SVG.
 */
const React = require("react");

const Arrow = require("./arrow");

const Left = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48">
            <Arrow />
        </svg>
    );
};

module.exports = Left;
