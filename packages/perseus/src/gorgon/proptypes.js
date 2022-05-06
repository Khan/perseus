// @flow
// Define the shape of the linter context object that is passed through the
// tree with additional information about what we are checking.

import PropTypes from "prop-types";

import type {LinterContextProps} from "../types.js";

export const linterContextProps: React$PropType$Primitive<{
    contentType?: string,
    highlightLint?: boolean,
    // eslint-disable-next-line flowtype/no-mutable-array
    paths?: Array<string>,
    // eslint-disable-next-line flowtype/no-mutable-array
    stack?: Array<string>,
    ...
}> = PropTypes.shape({
    contentType: PropTypes.string,
    highlightLint: PropTypes.bool,
    paths: PropTypes.arrayOf(PropTypes.string),
    stack: PropTypes.arrayOf(PropTypes.string),
});

export const linterContextDefault: LinterContextProps = {
    contentType: "",
    highlightLint: false,
    paths: ([]: $ReadOnlyArray<any>),
    stack: ([]: $ReadOnlyArray<any>),
};
