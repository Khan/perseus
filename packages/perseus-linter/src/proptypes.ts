// Define the shape of the linter context object that is passed through the
// tree with additional information about what we are checking.
import PropTypes from "prop-types";

import type {LinterContextProps} from "./types";

export const linterContextProps = PropTypes.shape({
    contentType: PropTypes.string,
    highlightLint: PropTypes.bool,
    paths: PropTypes.arrayOf(PropTypes.string),
    stack: PropTypes.arrayOf(PropTypes.string),
});

export const linterContextDefault: LinterContextProps = {
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
};
