/**
 * A gesture recognizer that detects 'drags', crudely defined as either scrolls
 * or touches that move a sufficient distance.
 */

// The 'slop' factor, after which we consider the use to be dragging. The value
// is taken from the Android SDK. It won't be robust to page zoom and the like,
// but it should be good enough for our purposes.
const touchSlopPx = 8;

class DragListener {
    _scrollListener: () => void;
    _moveListener: (evt: TouchEvent) => void;
    _endAndCancelListener: (evt: TouchEvent) => void;

    constructor(onDrag, initialEvent) {
        // We detect drags in two ways. First, by listening for the window
        // scroll event (we consider any legitimate scroll to be a drag).
        this._scrollListener = () => {
            onDrag();
        };

        // And second, by listening for touch moves and tracking the each
        // finger's displacement. This allows us to track, e.g., when the user
        // scrolls within an individual view.
        const touchLocationsById = {};
        for (let i = 0; i < initialEvent.changedTouches.length; i++) {
            const touch = initialEvent.changedTouches[i];
            touchLocationsById[touch.identifier] = [
                touch.clientX,
                touch.clientY,
            ];
        }

        this._moveListener = (evt) => {
            for (let i = 0; i < evt.changedTouches.length; i++) {
                const touch = evt.changedTouches[i];
                const initialTouchLocation =
                    touchLocationsById[touch.identifier];
                if (initialTouchLocation) {
                    const touchLocation = [touch.clientX, touch.clientY];
                    const dx = touchLocation[0] - initialTouchLocation[0];
                    const dy = touchLocation[1] - initialTouchLocation[1];

                    const squaredDist = dx * dx + dy * dy;
                    const squaredTouchSlop = touchSlopPx * touchSlopPx;

                    if (squaredDist > squaredTouchSlop) {
                        onDrag();
                    }
                }
            }
        };

        // Clean-up any terminated gestures, since some browsers reuse
        // identifiers.
        this._endAndCancelListener = (evt) => {
            for (let i = 0; i < evt.changedTouches.length; i++) {
                delete touchLocationsById[evt.changedTouches[i].identifier];
            }
        };
    }

    attach() {
        window.addEventListener("scroll", this._scrollListener);
        window.addEventListener("touchmove", this._moveListener);
        window.addEventListener("touchend", this._endAndCancelListener);
        window.addEventListener("touchcancel", this._endAndCancelListener);
    }

    detach() {
        window.removeEventListener("scroll", this._scrollListener);
        window.removeEventListener("touchmove", this._moveListener);
        window.removeEventListener("touchend", this._endAndCancelListener);
        window.removeEventListener("touchcancel", this._endAndCancelListener);
    }
}

export default DragListener;
