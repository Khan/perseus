/**
 * A manager for our node-to-ID system. In particular, this class is
 * responsible for maintaing a mapping between DOM nodes and node IDs, and
 * translating touch events from the raw positions at which they occur to the
 * nodes over which they are occurring. This differs from browser behavior, in
 * which touch events are only sent to the node in which a touch started.
 */

class NodeManager {
    constructor() {
        // A mapping from IDs to DOM nodes.
        this._nodesById = {};

        // A mapping from IDs to the borders around the DOM nodes, which can be
        // useful for layout purposes.
        this._bordersById = {};

        // An ordered list of IDs, where DOM nodes that are "higher" on the
        // page come earlier in the list. Note that an ID may be present in
        // this ordered list but not be registered to a DOM node (i.e., if it
        // is registered as a child of another DOM node, but hasn't appeared in
        // the DOM yet).
        this._orderedIds = [];

        // Cache bounding boxes aggressively, re-computing on page resize. Our
        // caching here makes the strict assumption that if a node is reasonably
        // assumed to be on-screen, its bounds won't change. For example, if we
        // see that a touch occurred within the bounds of a node, we cache those
        // bounds.
        // TODO(charlie): It'd be great if we could pre-compute these when the
        // page is idle and the keypad is visible (i.e., the nodes are in their
        // proper positions).
        this._cachedBoundingBoxesById = {};
        window.addEventListener("resize", () => {
            this._cachedBoundingBoxesById = {};
        });
    }

    /**
     * Register a DOM node with a given identifier.
     *
     * @param {string} id - the identifier of the given node
     * @param {node} domNode - the DOM node linked to the identifier
     * @param {object} borders - an opaque object describing the node's borders
     */
    registerDOMNode(id, domNode, childIds, borders) {
        this._nodesById[id] = domNode;
        this._bordersById[id] = borders;

        // Make sure that any children appear first.
        // TODO(charlie): This is a very simplistic system that wouldn't
        // properly handle multiple levels of nesting.
        const allIds = [...(childIds || []), id, ...this._orderedIds];

        // De-dupe the list of IDs.
        const orderedIds = [];
        const seenIds = {};
        for (const id of allIds) {
            if (!seenIds[id]) {
                orderedIds.push(id);
                seenIds[id] = true;
            }
        }

        this._orderedIds = orderedIds;
    }

    /**
     * Unregister the DOM node with the given identifier.
     *
     * @param {string} id - the identifier of the node to unregister
     */
    unregisterDOMNode(id) {
        delete this._nodesById[id];
    }

    /**
     * Return the identifier of the topmost node located at the given
     * coordinates.
     *
     * @param {number} x - the x coordinate at which to search for a node
     * @param {number} y - the y coordinate at which to search for a node
     * @returns {null|string} - null or the identifier of the topmost node at
     *                          the given coordinates
     */
    idForCoords(x, y) {
        for (const id of this._orderedIds) {
            const domNode = this._nodesById[id];
            if (domNode) {
                const bounds = domNode.getBoundingClientRect();
                if (
                    bounds.left <= x &&
                    bounds.right > x &&
                    bounds.top <= y &&
                    bounds.bottom > y
                ) {
                    this._cachedBoundingBoxesById[id] = bounds;
                    return id;
                }
            }
        }
    }

    /**
     * Return the necessary layout information, including the bounds and border
     * values, for the node with the given identifier.
     *
     * @param {string} id - the identifier of the node for which to return the
     *                      layout information
     * @returns {object} - the bounding client rect for the given node, along
     *                     with its borders
     */
    layoutPropsForId(id) {
        if (!this._cachedBoundingBoxesById[id]) {
            const node = this._nodesById[id];

            this._cachedBoundingBoxesById[id] = node
                ? node.getBoundingClientRect()
                : new DOMRect();
        }

        return {
            initialBounds: this._cachedBoundingBoxesById[id],
            borders: this._bordersById[id],
        };
    }
}

module.exports = NodeManager;
