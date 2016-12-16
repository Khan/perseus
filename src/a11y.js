/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * Identifies whether or not a given perseus item requires the use of a mouse
 * or screen, based on the widgets it contains.
 */

var _ = require("underscore");

var Traversal = require("./traversal.jsx");
var Widgets = require("./widgets.js");

module.exports = {
    // Returns a list of widgets that cause a given perseus item to require
    // the use of a screen or mouse.
    //
    // For now we'll just check the `accessible` field on each of the widgets
    // in the item data, but in the future we may specify accessibility on
    // each widget with higher granularity.
    violatingWidgets: function(itemData) {
        // TODO(jordan): Hints as well
        var widgets = [];

        if (itemData._multi) {
            // We're in a multi-renderer item. We don't have a good way to find
            // violating widgets for now, so just bail out.
            // TODO(emily): Make this actually find violating widgets in the
            // multi-item! We might need to have access to the shape of the
            // item in order to do so.
            return [];
        }

        // Traverse the question data
        Traversal.traverseRendererDeep(
            itemData.question,
            null,
            function(info) {
                if (info.type && !Widgets.isAccessible(info)) {
                    widgets.push(info.type);
                }
            }
        );

        // Uniquify the list of widgets (by type)
        return _.uniq(widgets);
    },
};
