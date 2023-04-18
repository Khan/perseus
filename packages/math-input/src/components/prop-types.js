/**
 * React PropTypes that may be shared between components.
 */

import PropTypes from "prop-types";

// NOTE(jared): This is no longer guaranteed to be React element
// NOTE(matthewc): only seems to be used in Perseus
export const keypadElementPropType = PropTypes.shape({
    activate: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    configure: PropTypes.func.isRequired,
    setCursor: PropTypes.func.isRequired,
    setKeyHandler: PropTypes.func.isRequired,
    getDOMNode: PropTypes.func.isRequired,
});
