// Define the shape of the linter context object that is passed through the
// tree with additional information about what we are checking.

const React = require("react");

export const linterContextProps = React.PropTypes.shape({
    highlightLint: React.PropTypes.bool,
    paths: React.PropTypes.arrayOf(React.PropTypes.string),
});

export const linterContextDefault = {
    highlightLint: false,
    paths: [],
};
