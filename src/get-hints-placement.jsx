/**
 * Determine where hints should be placed from the Perseus problem JSON.
 *
 * NOTE(jared): Currently we only check for problems that have one widget,
 * that is a radio widget. We'll probably add more heuristics later.
 */

const getValues = object => Object.keys(object).map(key => object[key]);

function getHintsPlacement(item) {
    const widgets = getValues(item.question.widgets);
    if (widgets.length === 1 && widgets[0].type === "radio") {
        return "before-widget";
    }
    return "end";
}

module.exports = getHintsPlacement;
