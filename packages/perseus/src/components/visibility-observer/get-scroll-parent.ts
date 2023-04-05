// Utility for finding the scroll parent of a chile
// Taken and updated to our standards from
// https://github.com/olahol/scrollparent.js

const getParents = function (node: Node, parents): ReadonlyArray<Node> {
    if (!node.parentNode) {
        return parents;
    }

    return getParents(node.parentNode, parents.concat([node]));
};

const style = function (node: Element, prop) {
    return getComputedStyle(node).getPropertyValue(prop);
};

const overflow = function (node: Element) {
    return (
        style(node, "overflow") +
        style(node, "overflow-y") +
        style(node, "overflow-x")
    );
};

const scroll = function (node: Element) {
    return /(auto|scroll)/.test(overflow(node));
};

export const getScrollParent = function (
    node: Element,
): Element | null | undefined {
    if (!(node instanceof HTMLElement)) {
        return;
    }

    const parents = node.parentNode ? getParents(node.parentNode, []) : [];

    for (let i = 0; i < parents.length; i += 1) {
        const element = parents[i] as Element;
        if (scroll(element)) {
            return element;
        }
    }

    return document.documentElement;
};
