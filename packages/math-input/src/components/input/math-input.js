const React = require("react");
const PropTypes = require("prop-types");
const ReactDOM = require("react-dom");
const {StyleSheet} = require("aphrodite");

const {View} = require("../../fake-react-native-web");
const CursorHandle = require("./cursor-handle");
const MathWrapper = require("./math-wrapper");
const scrollIntoView = require("./scroll-into-view");
const DragListener = require("./drag-listener");
const {
    cursorHandleRadiusPx,
    cursorHandleDistanceMultiplier,
} = require("../common-style");

import Color from "@khanacademy/wonder-blocks-color";
const {keypadElementPropType} = require("../prop-types");
const {wonderBlocksBlue, offBlack} = require("../common-style");
const Keys = require("../../data/keys");

const i18n = window.i18n || {_: (s) => s};

const constrainingFrictionFactor = 0.8;

class MathInput extends React.Component {
    static propTypes = {
        // The React element node associated with the keypad that will send
        // key-press events to this input. If provided, this can be used to:
        //   (1) Avoid blurring the input, on user interaction with the keypad.
        //   (2) Scroll the input into view, if it would otherwise be obscured
        //       by the keypad on focus.
        keypadElement: keypadElementPropType,
        onBlur: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        onFocus: PropTypes.func,
        // An extra, vanilla style object, to be applied to the math input.
        style: PropTypes.any,
        value: PropTypes.string,
    };

    static defaultProps = {
        style: {},
        value: "",
    };

    state = {
        focused: false,
        handle: {
            animateIntoPosition: false,
            visible: false,
            x: 0,
            y: 0,
        },
    };

    componentDidMount() {
        this._isMounted = true;

        this.mathField = new MathWrapper(
            this._mathContainer,
            {},
            {
                onCursorMove: (cursor) => {
                    // TODO(charlie): It's not great that there is so much coupling
                    // between this keypad and the input behavior. We should wrap
                    // this `MathInput` component in an intermediary component
                    // that translates accesses on the keypad into vanilla props,
                    // to make this input keypad-agnostic.
                    this.props.keypadElement &&
                        this.props.keypadElement.setCursor(cursor);
                },
            },
        );

        // NOTE(charlie): MathQuill binds this handler to manage its
        // drag-to-select behavior. For reasons that I can't explain, the event
        // itself gets triggered even if you tap slightly outside of the
        // bound container (maybe 5px outside of any boundary). As a result, the
        // cursor appears when tapping at those locations, even though the input
        // itself doesn't receive any touch start or mouse down event and, as
        // such, doesn't focus itself. This makes for a confusing UX, as the
        // cursor appears, but the keypad does not and the input otherwise
        // treats itself as unfocused. Thankfully, we don't need this behavior--
        // we manage all of the cursor interactions ourselves--so we can safely
        // unbind the handler.
        this.mathField.mathField.__controller.container.unbind(
            "mousedown.mathquill",
        );

        this.mathField.setContent(this.props.value);

        this._updateInputPadding();

        this._container = ReactDOM.findDOMNode(this);
        this._root = this._container.querySelector(".mq-root-block");
        this._root.addEventListener("scroll", this._handleScroll);

        // Record the initial scroll displacement on touch start. This allows
        // us to detect whether a touch event was a scroll and only blur the
        // input on non-scrolls--blurring the input on scroll makes for a
        // frustrating user experience.
        this.touchStartInitialScroll = null;
        this.recordTouchStartOutside = (evt) => {
            if (this.state.focused) {
                // Only blur if the touch is both outside of the input, and
                // above or to the left or right of the keypad (if it has been
                // provided). The reasoning for not blurring when touches occur
                // below the keypad is that the keypad may be anchored above
                // the 'Check answer' bottom bar, in which case, we don't want
                // to dismiss the keypad on check.
                // TODO(charlie): Inject this logic.
                if (!this._container.contains(evt.target)) {
                    let touchDidStartInOrBelowKeypad = false;
                    if (
                        this.props.keypadElement &&
                        this.props.keypadElement.getDOMNode()
                    ) {
                        const bounds = this._getKeypadBounds();
                        for (let i = 0; i < evt.changedTouches.length; i++) {
                            const [x, y] = [
                                evt.changedTouches[i].clientX,
                                evt.changedTouches[i].clientY,
                            ];
                            if (
                                (bounds.left <= x &&
                                    bounds.right >= x &&
                                    bounds.top <= y &&
                                    bounds.bottom >= y) ||
                                bounds.bottom < y
                            ) {
                                touchDidStartInOrBelowKeypad = true;
                                break;
                            }
                        }
                    }

                    if (!touchDidStartInOrBelowKeypad) {
                        this.didTouchOutside = true;

                        if (this.dragListener) {
                            this.dragListener.detach();
                        }

                        this.dragListener = new DragListener(() => {
                            this.didScroll = true;
                            this.dragListener.detach();
                        }, evt);
                        this.dragListener.attach();
                    }
                }
            }
        };

        this.blurOnTouchEndOutside = (evt) => {
            // If the user didn't scroll, blur the input.
            // TODO(charlie): Verify that the touch that ended actually started
            // outside the keypad. Right now, you can touch down on the keypad,
            // touch elsewhere, release the finger on the keypad, and trigger a
            // dismissal. This code needs to be generalized to handle
            // multi-touch.
            if (this.state.focused && this.didTouchOutside && !this.didScroll) {
                this.blur();
            }

            this.didTouchOutside = false;
            this.didScroll = false;

            if (this.dragListener) {
                this.dragListener.detach();
                this.removeListeners = null;
            }
        };

        window.addEventListener("touchstart", this.recordTouchStartOutside);
        window.addEventListener("touchend", this.blurOnTouchEndOutside);
        window.addEventListener("touchcancel", this.blurOnTouchEndOutside);

        // HACK(benkomalo): if the window resizes, the keypad bounds can
        // change. That's a bit peeking into the internals of the keypad
        // itself, since we know bounds can change only when the viewport
        // changes, but seems like a rare enough thing to get wrong that it's
        // not worth wiring up extra things for the technical "purity" of
        // having the keypad notify of changes to us.
        window.addEventListener("resize", this._clearKeypadBoundsCache);
        window.addEventListener(
            "orientationchange",
            this._clearKeypadBoundsCache,
        );
    }

    componentWillReceiveProps(props) {
        if (this.props.keypadElement !== props.keypadElement) {
            this._clearKeypadBoundsCache();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.mathField.getContent() !== this.props.value) {
            this.mathField.setContent(this.props.value);
        }

        if (prevState.focused !== this.state.focused) {
            this._updateInputPadding();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;

        window.removeEventListener("touchstart", this.recordTouchStartOutside);
        window.removeEventListener("touchend", this.blurOnTouchEndOutside);
        window.removeEventListener("touchcancel", this.blurOnTouchEndOutside);
        window.removeEventListener("resize", this._clearKeypadBoundsCache());
        window.removeEventListener(
            "orientationchange",
            this._clearKeypadBoundsCache(),
        );
    }

    _clearKeypadBoundsCache = (keypadNode) => {
        this._keypadBounds = null;
    };

    _cacheKeypadBounds = (keypadNode) => {
        this._keypadBounds = keypadNode.getBoundingClientRect();
    };

    _updateInputPadding = () => {
        this._container = ReactDOM.findDOMNode(this);
        this._root = this._container.querySelector(".mq-root-block");

        const padding = this.getInputInnerPadding();
        // NOTE(diedra): This overrides the default 2px padding from Mathquil.
        this._root.style.padding =
            `${padding.paddingTop}px ${padding.paddingRight}px` +
            ` ${padding.paddingBottom}px ${padding.paddingLeft}px`;
        this._root.style.fontSize = `${fontSizePt}pt`;
    };

    /** Gets and cache they bounds of the keypadElement */
    _getKeypadBounds = () => {
        if (!this._keypadBounds) {
            const node = this.props.keypadElement.getDOMNode();
            this._cacheKeypadBounds(node);
        }
        return this._keypadBounds;
    };

    _updateCursorHandle = (animateIntoPosition) => {
        const containerBounds = this._container.getBoundingClientRect();
        const cursor = this._container.querySelector(".mq-cursor");
        const cursorBounds = cursor.getBoundingClientRect();

        const cursorWidth = cursorBounds.width;
        const gapBelowCursor = 2;

        const inputInnerPadding = this.getInputInnerPadding();

        // The cursor should never be further right or left than the edge of the
        // container's values.
        const furthestRightCursorBound =
            containerBounds.right -
            cursorWidth -
            inputInnerPadding.paddingRight;
        const furthestLeftCursorBound =
            containerBounds.left + cursorWidth + inputInnerPadding.paddingLeft;

        let cursorBoundsLeft = cursorBounds.left;
        if (cursorBounds.left > furthestRightCursorBound) {
            cursorBoundsLeft = furthestRightCursorBound;
        } else if (cursorBounds.left < furthestLeftCursorBound) {
            cursorBoundsLeft = furthestLeftCursorBound;
        }

        this.setState({
            handle: {
                visible: true,
                animateIntoPosition,
                // We subtract containerBounds' left/top to correct for the
                // position of the container within the page.
                x: cursorBoundsLeft + cursorWidth / 2 - containerBounds.left,
                y: cursorBounds.bottom + gapBelowCursor - containerBounds.top,
            },
        });
    };

    _hideCursorHandle = () => {
        this.setState({
            handle: {
                visible: false,
                x: 0,
                y: 0,
            },
        });
    };

    _handleScroll = () => {
        // If animateIntoPosition is false, the user is currently manually positioning
        // the cursor. This is important because the user can scroll the input field
        // with the curor handle, and we don't want to override that ability.
        // But we do want to hide the handle is the user is just scrolling the input field
        // normally, because the handle will not move with the scroll.
        if (this.state.handle.animateIntoPosition !== false) {
            this._hideCursorHandle();
        }
    };

    blur = () => {
        this.mathField.blur();
        this.props.onBlur && this.props.onBlur();
        this.setState({focused: false, handle: {visible: false}});
    };

    focus = () => {
        // Pass this component's handleKey method to the keypad so it can call
        // it whenever it needs to trigger a keypress action.
        this.props.keypadElement.setKeyHandler((key) => {
            const cursor = this.mathField.pressKey(key);

            // Trigger an `onChange` if the value in the input changed, and hide
            // the cursor handle whenever the user types a key. If the value
            // changed as a result of a keypress, we need to be careful not to
            // call `setState` until after `onChange` has resolved.
            const hideCursor = () => {
                this.setState({
                    handle: {
                        visible: false,
                    },
                });
            };
            const value = this.mathField.getContent();
            if (this.props.value !== value) {
                this.props.onChange(value, hideCursor);
            } else {
                hideCursor();
            }

            return cursor;
        });

        this.mathField.focus();
        this.props.onFocus && this.props.onFocus();
        this.setState({focused: true}, () => {
            // NOTE(charlie): We use `setTimeout` to allow for a layout pass to
            // occur. Otherwise, the keypad is measured incorrectly. Ideally,
            // we'd use requestAnimationFrame here, but it's unsupported on
            // Android Browser 4.3.
            setTimeout(() => {
                if (this._isMounted) {
                    // TODO(benkomalo): the keypad is animating at this point,
                    // so we can't call _cacheKeypadBounds(), even though
                    // it'd be nice to do so. It should probably be the case
                    // that the higher level controller tells us when the
                    // keypad is settled (then scrollIntoView wouldn't have
                    // to make assumptions about that either).
                    const maybeKeypadNode =
                        this.props.keypadElement &&
                        this.props.keypadElement.getDOMNode();
                    scrollIntoView(this._container, maybeKeypadNode);
                }
            });
        });
    };

    /**
     * Tries to determine which DOM node to place the cursor next to based on
     * where the user drags the cursor handle.  If it finds a node it will
     * place the cursor next to it, update the handle to be under the cursor,
     * and return true.  If it doesn't find a node, it returns false.
     *
     * It searches for nodes by doing it tests at the following points:
     *
     *   (x - dx, y), (x, y), (x + dx, y)
     *
     * If it doesn't find any nodes from the rendered math it will update y
     * by adding dy.
     *
     * The algorithm ends its search when y goes outside the bounds of
     * containerBounds.
     *
     * @param {ClientRect} containerBounds - bounds of the container node
     * @param {number} x - the initial x coordinate in the viewport
     * @param {number} y - the initial y coordinate in the viewport
     * @param {number} dx - horizontal spacing between elementFromPoint calls
     * @param {number} dy - vertical spacing between elementFromPoint calls,
     *                      sign determines direction.
     * @returns {boolean} - true if a node was hit, false otherwise.
     */
    _findHitNode = (containerBounds, x, y, dx, dy) => {
        while (y >= containerBounds.top && y <= containerBounds.bottom) {
            y += dy;

            const points = [
                [x - dx, y],
                [x, y],
                [x + dx, y],
            ];

            const elements = points
                .map((point) => document.elementFromPoint(...point))
                // We exclude the root container itself and any nodes marked
                // as non-leaf which are fractions, parens, and roots.  The
                // children of those nodes are included in the list because
                // those are the items we care about placing the cursor next
                // to.
                //
                // MathQuill's mq-non-leaf is not applied to all non-leaf nodes
                // so the naming is a bit confusing.  Although fractions are
                // included, neither mq-numerator nor mq-denominator nodes are
                // and neither are subscripts or superscripts.
                .filter(
                    (element) =>
                        element &&
                        this._root.contains(element) &&
                        ((!element.classList.contains("mq-root-block") &&
                            !element.classList.contains("mq-non-leaf")) ||
                            element.classList.contains("mq-empty") ||
                            element.classList.contains("mq-hasCursor")),
                );

            let hitNode = null;

            // Contains only DOMNodes without child elements.  These should
            // contain some amount of text though.
            const leafElements = [];

            // Contains only DOMNodes with child elements.
            const nonLeafElements = [];

            let max = 0;
            const counts = {};
            const elementsById = {};

            for (const element of elements) {
                const id = element.getAttribute("mathquill-command-id");
                if (id != null) {
                    leafElements.push(element);

                    counts[id] = (counts[id] || 0) + 1;
                    elementsById[id] = element;
                } else {
                    nonLeafElements.push(element);
                }
            }

            // When determining which DOMNode to place the cursor beside, we
            // prefer leaf nodes.  Hitting a leaf node is a good sign that the
            // cursor is really close to some piece of math that has been
            // rendered because leaf nodes contain text.  Non-leaf nodes may
            // contain a lot of whitespace so the cursor may be further away
            // from actual text within the expression.
            //
            // Since we're doing three hit tests per loop it's possible that
            // we hit multiple leaf nodes at the same time.  In this case we
            // we prefer the DOMNode with the most hits.
            // TODO(kevinb) consider preferring nodes hit by [x, y].
            for (const [id, count] of Object.entries(counts)) {
                if (count > max) {
                    max = count;
                    hitNode = elementsById[id];
                }
            }

            // It's possible that two non-leaf nodes are right beside each
            // other.  We don't bother counting the number of hits for each,
            // b/c this seems like an unlikely situation.  Also, ignoring the
            // hit count in the situation should not have serious effects on
            // the overall accuracy of the algorithm.
            if (hitNode == null && nonLeafElements.length > 0) {
                hitNode = nonLeafElements[0];
            }

            if (hitNode !== null) {
                this.mathField.setCursorPosition(x, y, hitNode);
                return true;
            }
        }

        return false;
    };

    /**
     * Inserts the cursor at the DOM node closest to the given coordinates,
     * based on hit-tests conducted using #_findHitNode.
     *
     * @param {number} x - the x coordinate in the viewport
     * @param {number} y - the y coordinate in the viewport
     */
    _insertCursorAtClosestNode = (x, y) => {
        const cursor = this.mathField.getCursor();

        // Pre-emptively check if the input has any child nodes; if not, the
        // input is empty, so we throw the cursor at the start.
        if (!this._root.hasChildNodes()) {
            cursor.insAtLeftEnd(this.mathField.mathField.__controller.root);
            return;
        }

        // NOTE(diedra): The adding and subtracting of 10 or 15 pixels here accounts
        // for the padding that surrounds the input values.
        if (y > this._containerBounds.bottom) {
            y = this._containerBounds.bottom - 10;
        } else if (y < this._containerBounds.top) {
            y = this._containerBounds.top + 10;
        }
        if (x > this._containerBounds.right) {
            x = this._containerBounds.right - 15;
        } else if (x < this._containerBounds.left) {
            x = this._containerBounds.left + 15;
        }

        let dy;

        // Vertical spacing between hit tests
        // dy is negative because we're moving upwards.
        dy = -8;

        // Horizontal spacing between hit tests
        // Note: This value depends on the font size.  If the gap is too small
        // we end up placing the cursor at the end of the expression when we
        // shouldn't.
        const dx = 5;

        if (this._findHitNode(this._containerBounds, x, y, dx, dy)) {
            return;
        }

        // If we haven't found anything start from the top.
        y = this._containerBounds.top;

        // dy is positive b/c we're going downwards.
        dy = 8;

        if (this._findHitNode(this._containerBounds, x, y, dx, dy)) {
            return;
        }

        const firstChildBounds = this._root.firstChild.getBoundingClientRect();
        const lastChildBounds = this._root.lastChild.getBoundingClientRect();

        const left = firstChildBounds.left;
        const right = lastChildBounds.right;

        // We've exhausted all of the options. We're likely either to the right
        // or left of all of the math, so we place the cursor at the end to
        // which it's closest.
        if (Math.abs(x - right) < Math.abs(x - left)) {
            cursor.insAtRightEnd(this.mathField.mathField.__controller.root);
        } else {
            cursor.insAtLeftEnd(this.mathField.mathField.__controller.root);
        }
        // In that event, we need to update the cursor context ourselves.
        this.props.keypadElement &&
            this.props.keypadElement.setCursor({
                context: this.mathField.contextForCursor(cursor),
            });
    };

    handleTouchStart = (e) => {
        e.stopPropagation();

        // Hide the cursor handle on touch start, if the handle itself isn't
        // handling the touch event.
        this._hideCursorHandle();

        // Cache the container bounds, so as to avoid re-computing. If we don't
        // have any content, then it's not necessary, since the cursor can't be
        // moved anyway.
        if (this.mathField.getContent() !== "") {
            this._containerBounds = this._container.getBoundingClientRect();

            // Make the cursor visible and set the handle-less cursor's
            // location.
            const touch = e.changedTouches[0];
            this._insertCursorAtClosestNode(touch.clientX, touch.clientY);
        }

        // Trigger a focus event, if we're not already focused.
        if (!this.state.focused) {
            this.focus();
        }
    };

    handleTouchMove = (e) => {
        e.stopPropagation();

        // Update the handle-less cursor's location on move, if there's any
        // content in the box. Note that if the user touched outside the keypad
        // (e.g., with a different finger) during this touch interaction, we
        // may have blurred, in which case we should ignore the touch (since
        // the cursor is no longer visible and the input is no longer
        // highlighted).
        if (this.mathField.getContent() !== "" && this.state.focused) {
            const touch = e.changedTouches[0];
            this._insertCursorAtClosestNode(touch.clientX, touch.clientY);
        }
    };

    handleTouchEnd = (e) => {
        e.stopPropagation();

        // And on touch-end, reveal the cursor, unless the input is empty. Note
        // that if the user touched outside the keypad (e.g., with a different
        // finger) during this touch interaction, we may have blurred, in which
        // case we should ignore the touch (since the cursor is no longer
        // visible and the input is no longer highlighted).
        if (this.mathField.getContent() !== "" && this.state.focused) {
            this._updateCursorHandle();
        }
    };

    /**
     * When a touch starts in the cursor handle, we track it so as to avoid
     * handling any touch events ourself.
     *
     * @param {TouchEvent} e - the raw touch event from the browser
     */
    onCursorHandleTouchStart = (e) => {
        // NOTE(charlie): The cursor handle is a child of this view, so whenever
        // it receives a touch event, that event would also typically be bubbled
        // up to our own handlers. However, we want the cursor to handle its own
        // touch events, and for this view to only handle touch events that
        // don't affect the cursor. As such, we `stopPropagation` on any touch
        // events that are being handled by the cursor, so as to avoid handling
        // them in our own touch handlers.
        e.stopPropagation();

        e.preventDefault();

        // Cache the container bounds, so as to avoid re-computing.
        this._containerBounds = this._container.getBoundingClientRect();
    };

    _constrainToBound = (value, min, max, friction) => {
        if (value < min) {
            return min + (value - min) * friction;
        } else if (value > max) {
            return max + (value - max) * friction;
        } else {
            return value;
        }
    };

    /**
     * When the user moves the cursor handle update the position of the cursor
     * and the handle.
     *
     * @param {TouchEvent} e - the raw touch event from the browser
     */
    onCursorHandleTouchMove = (e) => {
        e.stopPropagation();

        const x = e.changedTouches[0].clientX;
        const y = e.changedTouches[0].clientY;

        const relativeX = x - this._containerBounds.left;
        const relativeY =
            y -
            2 * cursorHandleRadiusPx * cursorHandleDistanceMultiplier -
            this._containerBounds.top;

        // We subtract the containerBounds left/top to correct for the
        // MathInput's position on the page. On top of that, we subtract an
        // additional 2 x {height of the cursor} so that the bottom of the
        // cursor tracks the user's finger, to make it visible under their
        // touch.
        this.setState({
            handle: {
                animateIntoPosition: false,
                visible: true,
                // TODO(charlie): Use clientX and clientY to avoid the need for
                // scroll offsets. This likely also means that the cursor
                // detection doesn't work when scrolled, since we're not
                // offsetting those values.
                x: this._constrainToBound(
                    relativeX,
                    0,
                    this._containerBounds.width,
                    constrainingFrictionFactor,
                ),
                y: this._constrainToBound(
                    relativeY,
                    0,
                    this._containerBounds.height,
                    constrainingFrictionFactor,
                ),
            },
        });

        // Use a y-coordinate that's just above where the user is actually
        // touching because they're dragging the handle which is a little
        // below where the cursor actually is.
        const distanceAboveFingerToTrySelecting = 22;
        const adjustedY = y - distanceAboveFingerToTrySelecting;

        this._insertCursorAtClosestNode(x, adjustedY);
    };

    /**
     * When the user releases the cursor handle, animate it back into place.
     *
     * @param {TouchEvent} e - the raw touch event from the browser
     */
    onCursorHandleTouchEnd = (e) => {
        e.stopPropagation();

        this._updateCursorHandle(true);
    };

    /**
     * If the gesture is cancelled mid-drag, simply hide it.
     *
     * @param {TouchEvent} e - the raw touch event from the browser
     */
    onCursorHandleTouchCancel = (e) => {
        e.stopPropagation();

        this._updateCursorHandle(true);
    };

    domKeyToMathQuillKey = (key) => {
        const keyMap = {
            "+": Keys.PLUS,
            "-": Keys.MINUS,
            "*": Keys.TIMES,
            "/": Keys.DIVIDE,
            ".": Keys.DECIMAL,
            "%": Keys.PERCENT,
            "=": Keys.EQUAL,
            ">": Keys.GT,
            "<": Keys.LT,
            "^": Keys.EXP,
        };

        // Numbers
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key)) {
            return `NUM_${key}`;
        }

        // Movement keys
        else if (key == "Backspace") {
            return Keys.BACKSPACE;
        }

        // Operators
        else if (key in keyMap) {
            return keyMap[key];
        }

        // The key pressed doesn't map to any of the math input operators
        return null;
    };

    handleKeyUp = (event) => {
        const mathQuillKey = this.domKeyToMathQuillKey(event.key);

        if (mathQuillKey) {
            this.mathField.pressKey(mathQuillKey);

            // TODO(diedra): If the new value being added is off-screen to the right
            // due to the max-width of the text box, scroll the box to show the newest
            // value
            const value = this.mathField.getContent();
            if (this.props.value !== value) {
                this.mathField.setContent(this.props.value);
                this.props.onChange(value, false);
                this._hideCursorHandle();
            }
        }
    };

    getBorderWidthPx = () => {
        // TODO(diedra): Move these to the common style package.
        const normalBorderWidthPx = 1;
        const focusedBorderWidthPx = 2;

        return this.state.focused ? focusedBorderWidthPx : normalBorderWidthPx;
    };

    // Calculate the appropriate padding based on the border width (which is
    // considered 'padding', since we're using 'border-box') and the fact
    // that MathQuill automatically applies 2px of padding to the inner
    // input.
    getInputInnerPadding = () => {
        const paddingInset = totalDesiredPadding - this.getBorderWidthPx();

        // Now, translate that to the appropriate padding for each direction.
        // The complication here is that we want numerals to be centered within
        // the input. However, Symbola (MathQuill's font of choice) renders
        // numerals with approximately 3px of padding below and 1px of padding
        // above (to make room for ascenders and descenders). So we ignore those
        // padding values for the vertical directions.
        const symbolaPaddingBottom = 3;
        const symbolaPaddingTop = 1;
        const padding = {
            paddingTop: paddingInset - symbolaPaddingTop,
            paddingRight: paddingInset,
            paddingBottom: paddingInset - symbolaPaddingBottom,
            paddingLeft: paddingInset,
        };

        return padding;
    };

    render() {
        const {focused, handle} = this.state;
        const {style} = this.props;

        const innerStyle = {
            ...inlineStyles.innerContainer,
            borderWidth: this.getBorderWidthPx(),
            ...(focused
                ? {
                      borderColor: wonderBlocksBlue,
                  }
                : {}),
            ...style,
        };

        // NOTE(diedra): This label explicitly refers to tapping because this field
        // is currently only seen if the user is using a mobile device.
        // We added the tapping instructions because there is currently a bug where
        // Android users need to use two fingers to tap the input field to make the
        // keyboard appear. It should only require one finger, which is how iOS works.
        // TODO(diedra): Fix the bug that is causing Android to require a two finger tap
        // to the open the keyboard, and then remove the second half of this label.
        const ariaLabel =
            i18n._("Math input box") +
            " " +
            i18n._("Tap with one or two fingers to open keyboard");

        return (
            <View
                style={styles.input}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
                onClick={(e) => e.stopPropagation()}
                role={"textbox"}
                ariaLabel={ariaLabel}
            >
                {/* NOTE(charlie): This is used purely to namespace the styles in
                overrides.css. */}
                <div
                    className="keypad-input"
                    tabIndex={"0"}
                    ref={(node) => {
                        this.inputRef = node;
                    }}
                    onKeyUp={this.handleKeyUp}
                >
                    {/* NOTE(charlie): This element must be styled with inline
                    styles rather than with Aphrodite classes, as MathQuill
                    modifies the class names on the DOM node. */}
                    <div
                        ref={(node) => {
                            this._mathContainer = ReactDOM.findDOMNode(node);
                        }}
                        style={innerStyle}
                    />
                </div>
                {focused && handle.visible && (
                    <CursorHandle
                        {...handle}
                        onTouchStart={this.onCursorHandleTouchStart}
                        onTouchMove={this.onCursorHandleTouchMove}
                        onTouchEnd={this.onCursorHandleTouchEnd}
                        onTouchCancel={this.onCursorHandleTouchCancel}
                    />
                )}
            </View>
        );
    }
}

const fontSizePt = 18;
const inputMaxWidth = 128;

// The height of numerals in Symbola (rendered at 18pt) is about 20px (though
// they render at 24px due to padding for ascenders and descenders). We want our
// box to be laid out such that there's 12px of padding between a numeral and the
// edge of the input, so we use this 20px number as our 'base height' and
// account for the ascender and descender padding when computing the additional
// padding in our `render` method.
const numeralHeightPx = 20;
const totalDesiredPadding = 12;
const minHeightPx = numeralHeightPx + totalDesiredPadding * 2;
const minWidthPx = 64;

const styles = StyleSheet.create({
    input: {
        position: "relative",
        display: "inline-block",
        verticalAlign: "middle",
        maxWidth: inputMaxWidth,
    },
});

const inlineStyles = {
    // Styles for the inner, MathQuill-ified input element. It's important that
    // these are done with regular inline styles rather than Aphrodite classes
    // as MathQuill adds CSS class names to the element outside of the typical
    // React flow; assigning a class to the element can thus disrupt MathQuill
    // behavior. For example, if the client provided new styles to be applied
    // on focus and the styles here were applied with Aphrodite, then Aphrodite
    // would merge the provided styles with the base styles here, producing a
    // new CSS class name that we would apply to the element, clobbering any CSS
    // class names that MathQuill had applied itself.
    innerContainer: {
        backgroundColor: "white",
        minHeight: minHeightPx,
        minWidth: minWidthPx,
        maxWidth: inputMaxWidth,
        boxSizing: "border-box",
        position: "relative",
        borderStyle: "solid",
        borderColor: Color.offBlack50,
        borderRadius: 4,
        color: offBlack,
    },
};

module.exports = MathInput;
