/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');

module.exports = {
    propTypes: React.PropTypes.shape({
        toolTipFormats: React.PropTypes.bool.isRequired,
        useMathQuill: React.PropTypes.bool.isRequired,
        // TODO(charlie): Once the XOM Manatee Beta has completed, clean up this
        // flag.
        newHintStyles: React.PropTypes.bool,
    }).isRequired,

    defaults: {
        newHintStyles: false,
        // TODO(jack): Remove this two options
        toolTipFormats: true,
        useMathQuill: false
    }
};
