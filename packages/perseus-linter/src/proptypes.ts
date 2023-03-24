// Define the shape of the linter context object that is passed through the
// tree with additional information about what we are checking.

import PropTypes from "prop-types";

import type {LinterContextProps} from './types';

// @ts-expect-error [FEI-5003] - TS2694 - Namespace 'React' has no exported member 'PropType'.
export const linterContextProps: React.PropType<{
    contentType?: string,
    highlightLint?: boolean,
    // eslint-disable-next-line ft-flow/no-mutable-array
    paths?: Array<string>,
    // eslint-disable-next-line ft-flow/no-mutable-array
    stack?: Array<string>
}> = PropTypes.shape({
    contentType: PropTypes.string,
    highlightLint: PropTypes.bool,
    paths: PropTypes.arrayOf(PropTypes.string),
    stack: PropTypes.arrayOf(PropTypes.string),
});

export const linterContextDefault: LinterContextProps = {
    contentType: "",
    highlightLint: false,
    paths: ([] as ReadonlyArray<any>),
    stack: ([] as ReadonlyArray<any>),
};
