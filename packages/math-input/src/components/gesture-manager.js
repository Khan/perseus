/**
 * A high-level manager for our gesture system. In particular, this class
 * connects our various bits of logic for managing gestures and interactions,
 * and links them together.
 */

const NodeManager = require("./node-manager");
const PopoverStateMachine = require("./popover-state-machine");
const GestureStateMachine = require("./gesture-state-machine");

const coordsForEvent = (evt) => {
    return [evt.changedTouches[0].clientX, evt.changedTouches[0].clientY];
};

class GestureManager {
    constructor(options, handlers, disabledSwipeKeys, multiPressableKeys) {
        const {swipeEnabled} = options;

        this.swipeEnabled = swipeEnabled;

        // Events aren't tracked until event tracking is enabled.
        this.trackEvents = false;

        this.nodeManager = new NodeManager();
        this.popoverStateMachine = new PopoverStateMachine({
            onActiveNodesChanged: (activeNodes) => {
                const {popover, ...rest} = activeNodes;
                handlers.onActiveNodesChanged({
                    popover: popover && {
                        parentId: popover.parentId,
                        bounds: this.nodeManager.layoutPropsForId(
                            popover.parentId,
                        ).initialBounds,
                        childKeyIds: popover.childIds,
                    },
                    ...rest,
                });
            },
            /**
             * `onClick` takes two arguments:
             *
             * @param {string} keyId - the identifier key that should initiate
             *                         a click
             * @param {string} domNodeId - the identifier of the DOM node on
             *                             which the click should be considered
             *                             to have occurred
             * @param {bool} inPopover - whether the key was contained within a
             *                           popover
             *
             * These two parameters will often be equivalent. They will differ,
             * though, when a popover button is itself clicked, in which case
             * we need to mimic the effects of clicking on its 'primary' child
             * key, but animate the click on the popover button.
             */
            onClick: (keyId, domNodeId, inPopover) => {
                handlers.onClick(
                    keyId,
                    this.nodeManager.layoutPropsForId(domNodeId),
                    inPopover,
                );
            },
        });
        this.gestureStateMachine = new GestureStateMachine(
            {
                onFocus: (id) => {
                    this.popoverStateMachine.onFocus(id);
                },
                onLongPress: (id) => {
                    this.popoverStateMachine.onLongPress(id);
                },
                onTouchEnd: (id) => {
                    this.popoverStateMachine.onTouchEnd(id);
                },
                onBlur: () => {
                    this.popoverStateMachine.onBlur();
                },
                onSwipeChange: handlers.onSwipeChange,
                onSwipeEnd: handlers.onSwipeEnd,
                onTrigger: (id) => {
                    this.popoverStateMachine.onTrigger(id);
                },
            },
            {},
            disabledSwipeKeys,
            multiPressableKeys,
        );
    }

    /**
     * Handle a touch-start event that originated in a node registered with the
     * gesture system.
     *
     * @param {TouchEvent} evt - the raw touch event from the browser
     * @param {string} id - the identifier of the DOM node in which the touch
     *                      occurred
     */
    onTouchStart(evt, id) {
        if (!this.trackEvents) {
            return;
        }

        const [x] = coordsForEvent(evt);

        // TODO(charlie): It doesn't seem to be guaranteed that every touch
        // event on `changedTouches` originates from the node through which this
        // touch event was sent. In that case, we'd be inappropriately reporting
        // the starting node ID.
        for (let i = 0; i < evt.changedTouches.length; i++) {
            this.gestureStateMachine.onTouchStart(
                () => id,
                evt.changedTouches[i].identifier,
                x,
            );
        }

        // If an event started in a view that we're managing, we'll handle it
        // all the way through.
        evt.preventDefault();
    }

    /**
     * Handle a touch-move event that originated in a node registered with the
     * gesture system.
     *
     * @param {TouchEvent} evt - the raw touch event from the browser
     */
    onTouchMove(evt) {
        if (!this.trackEvents) {
            return;
        }

        const swipeLocked = this.popoverStateMachine.isPopoverVisible();
        const swipeEnabled = this.swipeEnabled && !swipeLocked;
        const [x, y] = coordsForEvent(evt);
        for (let i = 0; i < evt.changedTouches.length; i++) {
            this.gestureStateMachine.onTouchMove(
                () => this.nodeManager.idForCoords(x, y),
                evt.changedTouches[i].identifier,
                x,
                swipeEnabled,
            );
        }
    }

    /**
     * Handle a touch-end event that originated in a node registered with the
     * gesture system.
     *
     * @param {TouchEvent} evt - the raw touch event from the browser
     */
    onTouchEnd(evt) {
        if (!this.trackEvents) {
            return;
        }

        const [x, y] = coordsForEvent(evt);
        for (let i = 0; i < evt.changedTouches.length; i++) {
            this.gestureStateMachine.onTouchEnd(
                () => this.nodeManager.idForCoords(x, y),
                evt.changedTouches[i].identifier,
                x,
            );
        }
    }

    /**
     * Handle a touch-cancel event that originated in a node registered with the
     * gesture system.
     *
     * @param {TouchEvent} evt - the raw touch event from the browser
     */
    onTouchCancel(evt) {
        if (!this.trackEvents) {
            return;
        }

        for (let i = 0; i < evt.changedTouches.length; i++) {
            this.gestureStateMachine.onTouchCancel(
                evt.changedTouches[i].identifier,
            );
        }
    }

    /**
     * Register a DOM node with a given identifier.
     *
     * @param {string} id - the identifier of the given node
     * @param {node} domNode - the DOM node linked to the identifier
     * @param {string[]} childIds - the identifiers of any DOM nodes that
     *                              should be considered children of this node,
     *                              in that they should take priority when
     *                              intercepting touch events
     * @param {object} borders - an opaque object describing the node's borders
     */
    registerDOMNode(id, domNode, childIds, borders) {
        this.nodeManager.registerDOMNode(id, domNode, childIds, borders);
        this.popoverStateMachine.registerPopover(id, childIds);
    }

    /**
     * Unregister the DOM node with the given identifier.
     *
     * @param {string} id - the identifier of the node to unregister
     */
    unregisterDOMNode(id) {
        this.nodeManager.unregisterDOMNode(id);
        this.popoverStateMachine.unregisterPopover(id);
    }

    /**
     * Enable event tracking for the gesture manager.
     */
    enableEventTracking() {
        this.trackEvents = true;
    }

    /**
     * Disable event tracking for the gesture manager. When called, the gesture
     * manager will drop any events received by managed nodes.
     */
    disableEventTracking() {
        this.trackEvents = false;
    }
}

module.exports = GestureManager;
