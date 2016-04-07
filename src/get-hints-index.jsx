/**
 * Given a parsed representation of the problem markdown & a placement string,
 * return the index at which the hints should be inserted.
 */

const findIndex = (array, predicate) => {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return i;
        }
    }
    return -1;
};

function getHintsIndex(parsedMarkdown, hintsPlacement) {
    // TODO(jared): maybe change the markdown to have a token indicating
    // where hints should be shown, instead of injecting them here based
    // on a heuristic.
    if (hintsPlacement === "before-widget") {
        const widgetPos = findIndex(parsedMarkdown, item => {
            return (
                item.type === 'paragraph' &&
                item.content.length === 1 &&
                item.content[0].type === 'widget'
            );
        });
        return widgetPos === -1 ? parsedMarkdown.length : widgetPos;
    } else if (hintsPlacement === "end") {
        return parsedMarkdown.length;
    } else {
        throw new Error("Invalid hintsPlacement " + hintsPlacement +
                        " when hintsArea was given");
    }
}

module.exports = getHintsIndex;
