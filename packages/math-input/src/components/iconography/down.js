/**
 * A component that renders the DOWN iconograpy in SVG.
 */
const React = require("react");

const Arrow = require("./arrow");

const Down = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48">
            <Arrow transform="rotate(270 24 24)" />
        </svg>
    );
};

module.exports = Down;
