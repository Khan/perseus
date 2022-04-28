/**
 * An arrow icon, used by the other navigational keys.
 */
const React = require("react");

const Arrow = (props) => {
    return (
        <g fill="none" fillRule="evenodd" {...props}>
            <path fill="none" d="M0 0h48v48H0z" />
            <path fill="none" d="M12 12h24v24H12z" />
            <path
                stroke="#888D93"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 18l-6 6 6 6M16 24h16"
            />
        </g>
    );
};

module.exports = Arrow;
