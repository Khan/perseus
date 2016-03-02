/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * Functions for extracting data from items for use in i18n.
 */
var _ = require("underscore");

var traversal = require("./traversal.jsx");
var PerseusMarkdown = require("./perseus-markdown.jsx");

// Takes a renderer content and parses the markdown for images
function findImagesInContent(content, images) {
    var parsed = PerseusMarkdown.parse(content);

    PerseusMarkdown.traverseContent(parsed, function(node) {
        if (node.type === "image") {
            images.push(node.target);
        }
    });
}

// Background images in some widgets are annoying to deal with because
// sometimes the objects aren't full when there isn't an image. So, we do some
// extra checking to make sure we don't cause an error or push an empty image.
function handleBackgroundImage(graph, images) {
    if (graph && graph.backgroundImage && graph.backgroundImage.url) {
        images.push(graph.backgroundImage.url);
    }
}

// The callback called for each widget. We check each of the areas of each
// widget where they contain a renderer for images by calling
// findImagesInContent. We don't have to recurse through child widgets, because
// traverseRendererDeep does that for us.
function widgetCallback(widgetInfo, images) {
    if (!widgetInfo.options) {
        return;
    }

    // TODO(emily/aria): Move this into the widget files, so we don't have the
    // logic out here.
    if (widgetInfo.type === "categorizer") {
        _.each(widgetInfo.options.items, function(item) {
            findImagesInContent(item, images);
        });
        _.each(widgetInfo.options.categories, function(category) {
            findImagesInContent(category, images);
        });
    } else if (widgetInfo.type === "image") {
        findImagesInContent(widgetInfo.options.title, images);
        findImagesInContent(widgetInfo.options.caption, images);
    } else if (widgetInfo.type === "matcher") {
        _.each(widgetInfo.options.left, function(option) {
            findImagesInContent(option, images);
        });
        _.each(widgetInfo.options.right, function(option) {
            findImagesInContent(option, images);
        });
        _.each(widgetInfo.options.labels, function(label) {
            findImagesInContent(label, images);
        });
    } else if (widgetInfo.type === "matrix") {
        findImagesInContent(widgetInfo.options.prefix, images);
        findImagesInContent(widgetInfo.options.suffix, images);
    } else if (widgetInfo.type === "orderer") {
        _.each(widgetInfo.options.options, function(option) {
            findImagesInContent(option.content, images);
        });
    } else if (widgetInfo.type === "passage") {
        findImagesInContent(widgetInfo.options.passageTitle, images);
    } else if (widgetInfo.type === "radio") {
        _.each(widgetInfo.options.choices, function(choice) {
            findImagesInContent(choice.content, images);
        });
    } else if (widgetInfo.type === "sorter") {
        _.each(widgetInfo.options.correct, function(option) {
            findImagesInContent(option, images);
        });
    } else if (widgetInfo.type === "table") {
        _.each(widgetInfo.options.headers, function(header) {
            findImagesInContent(header, images);
        });
    }

    if (widgetInfo.type === "grapher") {
        handleBackgroundImage(widgetInfo.options.graph, images);
    } else if (widgetInfo.type === "image") {
        handleBackgroundImage(widgetInfo.options, images);
    } else if (widgetInfo.type === "interactive-graph") {
        handleBackgroundImage(widgetInfo.options, images);
    } else if (widgetInfo.type === "measurer" && widgetInfo.options.image) {
        images.push(widgetInfo.options.image.url);
    } else if (widgetInfo.type === "plotter") {
        images.push(widgetInfo.options.picUrl);
    } else if (widgetInfo.type === "transformer") {
        handleBackgroundImage(widgetInfo.options.graph, images);
    }
}


function findImagesInRenderers(renderers) {
    var images = [];

    _.each(renderers, (renderer) => {
        traversal.traverseRendererDeep(
            renderer,
            (content) => {
                findImagesInContent(content, images);
            },
            (widget) => widgetCallback(widget, images)
        );
    });

    return images;

}

// Calls findImagesInContent on all of the different content areas for
// assessment items
function findImagesInItemData(itemData) {
    var renderers = [itemData.question].concat(itemData.hints);

    return findImagesInRenderers(renderers);
}

// Calls findImagesInContent on all of the different content areas for
// articles
function findImagesInArticles(perseusContent) {
    return findImagesInRenderers(perseusContent);
}


module.exports = {
    findImagesInArticles: findImagesInArticles,
    findImagesInItemData: findImagesInItemData,
};
