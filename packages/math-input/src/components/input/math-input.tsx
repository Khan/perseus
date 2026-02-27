/* eslint-disable max-lines */
import {KeypadContext} from "@khanacademy/keypad-context";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {entries} from "@khanacademy/wonder-stuff-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import ReactDOM from "react-dom";

import {MathInputI18nContext} from "../i18n-context";

import CursorHandle from "./cursor-handle";
import {
    cursorHandleRadiusPx,
    cursorHandleDistanceMultiplier,
} from "./cursor-styles";
import DragListener from "./drag-listener";
import MathWrapper from "./math-wrapper";
import {scrollIntoView} from "./scroll-into-view";

import type {Cursor, KeypadAPI, KeypadContextType} from "../../types";

const constrainingFrictionFactor = 0.8;

type Props = {
    keypadElement?: KeypadAPI;
    ariaLabel: string;
    onBlur: () => void;
    onChange: (value: string, callback: any) => void;
    onFocus: () => void;
    style: any;
    value: string;
};

type DefaultProps = {
    style: Props["style"];
    value: Props["value"];
};

type HandleState = {
    animateIntoPosition?: boolean;
    visible: boolean;
    x?: number;
    y?: number;
};

type State = {
    // Whether the input is currently the focused element.
    focused: boolean;
    handle: HandleState;
    // Whether to show the focus style for the input. We are handling this separately, as
    // we want the input to appear focused even when the focus is actually on the keypad.
    showInputFocusStyle: boolean;
};

// eslint-disable-next-line react/no-unsafe
class MathInput extends React.Component<Props, State> {
    static contextType = MathInputI18nContext;
    declare context: React.ContextType<typeof MathInputI18nContext>;

    didTouchOutside: boolean | null | undefined;
    didScroll: boolean | null | undefined;
    mathField: any;
    recordTouchStartOutside!: (arg1: any) => void;
    blurOnTouchEndOutside!: (arg1: any) => void;
    blurOnClickOutside!: (arg1: any) => void;
    dragListener: any;
    inputRef: HTMLDivElement | null | undefined;
    _isMounted: boolean | null | undefined;
    _mathContainer: any;
    _container!: HTMLDivElement;
    _root: any;
    _containerBounds!: ClientRect;

    static defaultProps: DefaultProps = {
        style: {},
        value: "",
    };

    state: State = {
        focused: false,
        showInputFocusStyle: false,
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
            this.props.ariaLabel,
            this.context.strings,
            this.context.locale,
            {
                onCursorMove: (cursor: Cursor) => {
                    this.props.keypadElement?.setCursor(cursor);
                },
            },
        );

        this.mathField.setContent(this.props.value);

        this._updateInputPadding();

        this._container = ReactDOM.findDOMNode(this) as HTMLDivElement;
        this._root = this._container.querySelector(".mq-root-block");
        this._root.addEventListener("scroll", this._handleScroll);

        const isWithinKeypadBounds = (x: number, y: number): boolean => {
            const bounds = this._getKeypadBounds();

            // If there are no bounds, then the keypad is not mounted, so we
            // assume that the event is not within the keypad bounds.
            if (!bounds) {
                return false;
            }

            return (
                (bounds.left <= x &&
                    bounds.right >= x &&
                    bounds.top <= y &&
                    bounds.bottom >= y) ||
                bounds.bottom < y
            );
        };

        // Record the initial scroll displacement on touch start. This allows
        // us to detect whether a touch event was a scroll and only blur the
        // input on non-scrolls--blurring the input on scroll makes for a
        // frustrating user experience.
        this.recordTouchStartOutside = (evt: any) => {
            if (this.state.focused) {
                // Only blur if the touch is both outside of the input, and
                // above or to the left or right of the keypad (if it has been
                // provided). The reasoning for not blurring when touches occur
                // below the keypad is that the keypad may be anchored above
                // the 'Check answer' bottom bar, in which case, we don't want
                // to dismiss the keypad on check.
                if (!this._container.contains(evt.target)) {
                    let touchDidStartInOrBelowKeypad = false;
                    if (
                        this.props.keypadElement &&
                        this.props.keypadElement.getDOMNode()
                    ) {
                        for (let i = 0; i < evt.changedTouches.length; i++) {
                            const [x, y] = [
                                evt.changedTouches[i].clientX,
                                evt.changedTouches[i].clientY,
                            ];
                            if (isWithinKeypadBounds(x, y)) {
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
            if (this.state.focused && this.didTouchOutside && !this.didScroll) {
                this.blur();
                this.mathField.blur();
                this.props.onBlur?.();
            }

            this.didTouchOutside = false;
            this.didScroll = false;

            if (this.dragListener) {
                this.dragListener.detach();
            }
        };

        // We want to allow the user to blur the input by clicking outside of it
        // when using ChromeOS third-party browsers that use mobile user agents,
        // but don't actually simulate touch events.
        this.blurOnClickOutside = (evt: any) => {
            if (this.state.focused) {
                if (!this._container.contains(evt.target)) {
                    if (
                        this.props.keypadElement &&
                        this.props.keypadElement.getDOMNode()
                    ) {
                        const [x, y] = [evt.clientX, evt.clientY];

                        // We only want to blur if the click is above the keypad,
                        // to the left of the keypad, or to the right of the keypad.
                        // The reasoning for not blurring for any clicks below the keypad is
                        // that the keypad may be anchored above the 'Check answer' bottom bar,
                        // in which case we don't want to dismiss the keypad on check.
                        if (!isWithinKeypadBounds(x, y)) {
                            this.blur();
                            this.props.onBlur?.();
                        }
                    }
                }
            }
        };

        window.addEventListener("touchstart", this.recordTouchStartOutside);
        window.addEventListener("touchend", this.blurOnTouchEndOutside);
        window.addEventListener("touchcancel", this.blurOnTouchEndOutside);
        window.addEventListener("click", this.blurOnClickOutside);
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
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
        window.removeEventListener("click", this.blurOnClickOutside);
    }

    _updateInputPadding: () => void = () => {
        this._container = ReactDOM.findDOMNode(this) as HTMLDivElement;
        this._root = this._container.querySelector(".mq-root-block");

        const padding = this.getInputInnerPadding();
        // NOTE(diedra): This overrides the default 2px padding from Mathquil.
        this._root.style.padding =
            `${padding.paddingTop}px ${padding.paddingRight}px` +
            ` ${padding.paddingBottom}px ${padding.paddingLeft}px`;
        this._root.style.fontSize = `${fontSizePt}pt`;
    };

    /** Returns the current bounds of the keypadElement */
    _getKeypadBounds(): DOMRect | null {
        const keypadNode = this.props.keypadElement?.getDOMNode();

        // If the keypad is mounted, return its bounds. Otherwise, return null.
        if (keypadNode instanceof Element) {
            return keypadNode.getBoundingClientRect();
        }

        return null;
    }

    _updateCursorHandle: (arg1?: boolean) => void = (animateIntoPosition) => {
        const containerBounds = this._container.getBoundingClientRect();
        const cursor: any = this._container.querySelector(".mq-cursor");
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

    _hideCursorHandle: () => void = () => {
        this.setState({
            handle: {
                visible: false,
                x: 0,
                y: 0,
            },
        });
    };

    _handleScroll: () => void = () => {
        // If animateIntoPosition is false, the user is currently manually positioning
        // the cursor. This is important because the user can scroll the input field
        // with the curor handle, and we don't want to override that ability.
        // But we do want to hide the handle is the user is just scrolling the input field
        // normally, because the handle will not move with the scroll.
        if (this.state.handle.animateIntoPosition !== false) {
            this._hideCursorHandle();
        }
    };

    blur: () => void = () => {
        this.mathField.blur();

        this.setState({
            showInputFocusStyle: false,
            handle: {
                visible: false,
            },
        });
    };

    // [Jan 2025] Third: While testing, I've discovered that we likely don't
    // need to be passing setKeypadActive here at all. Removing the parameter
    // still results in the same behavior.
    focus: (setKeypadActive: KeypadContextType["setKeypadActive"]) => void = (
        setKeypadActive,
    ) => {
        // Pass this component's handleKey method to the keypad so it can call
        // it whenever it needs to trigger a keypress action.
        this.props.keypadElement?.setKeyHandler((key) => {
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

        this.props?.onFocus();
        setKeypadActive(true);

        this.setState({focused: true, showInputFocusStyle: true}, () => {
            // NOTE(charlie): We use `setTimeout` to allow for a layout pass to
            // occur. Otherwise, the keypad is measured incorrectly. Ideally,
            // we'd use requestAnimationFrame here, but it's unsupported on
            // Android Browser 4.3.
            setTimeout(() => {
                if (this._isMounted) {
                    const maybeKeypadNode =
                        this.props.keypadElement?.getDOMNode();
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
     * @param {DOMRect} containerBounds - bounds of the container node
     * @param {number} x - the initial x coordinate in the viewport
     * @param {number} y - the initial y coordinate in the viewport
     * @param {number} dx - horizontal spacing between elementFromPoint calls
     * @param {number} dy - vertical spacing between elementFromPoint calls,
     *                      sign determines direction.
     * @returns {boolean} - true if a node was hit, false otherwise.
     */
    _findHitNode: (
        arg1: ClientRect,
        arg2: number,
        arg3: number,
        arg4: number,
        arg5: number,
    ) => boolean = (containerBounds, x, y, dx, dy) => {
        while (y >= containerBounds.top && y <= containerBounds.bottom) {
            y += dy;

            const points: [number, number][] = [
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

            let hitNode: Element | null = null;

            // Contains only DOMNodes without child elements.  These should
            // contain some amount of text though.
            const leafElements: Array<Element | null> = [];

            // Contains only DOMNodes with child elements.
            const nonLeafElements: Array<Element | null> = [];

            let max = 0;
            const counts: {
                [key: string]: number;
            } = {};
            const elementsById: Record<string, any> = {};

            for (const element of elements) {
                const id = element?.getAttribute("mathquill-command-id");
                if (id != null) {
                    leafElements.push(element);

                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
            for (const [id, count] of entries(counts)) {
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
    _insertCursorAtClosestNode: (arg1: number, arg2: number) => void = (
        x,
        y,
    ) => {
        const cursor = this.mathField.getCursor();

        // Pre-emptively check if the input has any child nodes; if not, the
        // input is empty, so we throw the cursor at the start.
        if (!this._root.hasChildNodes()) {
            cursor.insAtLeftEnd(this.mathField.mathField.controller().root);
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
            cursor.insAtRightEnd(this.mathField.mathField.controller().root);
        } else {
            cursor.insAtLeftEnd(this.mathField.mathField.controller().root);
        }
        // In that event, we need to update the cursor context ourselves.
        this.props.keypadElement?.setCursor({
            context: this.mathField.contextForCursor(),
        });
    };

    handleTouchStart = (
        e: React.TouchEvent<Element>,
        keypadActive: KeypadContextType["keypadActive"],
        setKeypadActive: KeypadContextType["setKeypadActive"],
    ): void => {
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

        // If we're already focused, but the keypad isn't active, activate it.
        if (this.state.focused && !keypadActive) {
            setKeypadActive(true);
        }

        // Trigger a focus event, if we're not already focused.
        if (!this.state.focused) {
            this.focus(setKeypadActive);
        }

        // If the user clicked on the input using a mouse or tap gesture,
        // we want to set the focus to the inputRef so that the keyUp
        // event will be triggered when the user types on the keyboard.
        // This is necessary to support Chromebooks as they use mobile user
        // agents, do not simulate touch events, and have physical keyboards.
        this.inputRef?.focus();
    };

    // We want to allow the user to be able to focus the input via click
    // when using ChromeOS third-party browsers that use mobile user agents,
    // but don't actually simulate touch events.
    handleClick = (
        e: React.MouseEvent,
        keypadActive: KeypadContextType["keypadActive"],
        setKeypadActive: KeypadContextType["setKeypadActive"],
    ): void => {
        e.stopPropagation();

        // Hide the cursor handle on click
        this._hideCursorHandle();

        // Cache the container bounds, so as to avoid re-computing. If we don't
        // have any content, then it's not necessary, since the cursor can't be
        // moved anyway.
        if (this.mathField.getContent() !== "") {
            this._containerBounds = this._container.getBoundingClientRect();

            // Make the cursor visible and set the handle-less cursor's
            // location.
            this._insertCursorAtClosestNode(e.clientX, e.clientY);
        }

        // If we're already focused, but the keypad isn't active, activate it.
        if (this.state.focused && !keypadActive) {
            setKeypadActive(true);
        }

        // Trigger a focus event, if we're not already focused.
        if (!this.state.focused) {
            this.focus(setKeypadActive);
        }

        // If the user clicked on the input using a mouse or tap gesture,
        // we want to set the focus to the inputRef so that the keyUp
        // event will be triggered when the user types on the keyboard.
        // This is necessary to support Chromebooks as they use mobile user
        // agents, do not simulate touch events, and have physical keyboards.
        this.inputRef?.focus();
    };

    handleTouchMove: (arg1: React.TouchEvent<Element>) => void = (e) => {
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

    handleTouchEnd: (arg1: React.TouchEvent<Element>) => void = (e) => {
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
    onCursorHandleTouchStart: (
        arg1: React.TouchEvent<HTMLSpanElement>,
    ) => void = (e) => {
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

    _constrainToBound: (
        arg1: number,
        arg2: number,
        arg3: number,
        arg4: number,
    ) => number = (value, min, max, friction) => {
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
    onCursorHandleTouchMove: (arg1: React.TouchEvent<HTMLSpanElement>) => void =
        (e) => {
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
    onCursorHandleTouchEnd: (arg1: React.TouchEvent<HTMLSpanElement>) => void =
        (e) => {
            e.stopPropagation();

            this._updateCursorHandle(true);
        };

    /**
     * If the gesture is cancelled mid-drag, simply hide it.
     *
     * @param {TouchEvent} e - the raw touch event from the browser
     */
    onCursorHandleTouchCancel: (
        arg1: React.TouchEvent<HTMLSpanElement>,
    ) => void = (e) => {
        e.stopPropagation();

        this._updateCursorHandle(true);
    };

    domKeyToMathQuillKey: (arg1: string) => string | null | undefined = (
        key,
    ) => {
        const keyMap = {
            "+": "PLUS",
            "-": "MINUS",
            "*": "TIMES",
            "/": "DIVIDE",
            ".": "DECIMAL",
            "%": "PERCENT",
            "=": "EQUAL",
            ">": "GT",
            "<": "LT",
            "^": "EXP",
        } as const;

        // Numbers
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key)) {
            return `NUM_${key}`;
        }

        // Movement keys
        else if (key === "Backspace") {
            return "BACKSPACE";
        }

        // Operators
        else if (key in keyMap) {
            return keyMap[key];
        }

        // The key pressed doesn't map to any of the math input operators
        return null;
    };

    handleKeyUp: (arg1: React.KeyboardEvent<HTMLDivElement>) => void = (
        event,
    ) => {
        const mathQuillKey = this.domKeyToMathQuillKey(event.key);

        if (mathQuillKey) {
            this.mathField.pressKey(mathQuillKey);

            const value = this.mathField.getContent();
            if (this.props.value !== value) {
                this.mathField.setContent(this.props.value);
                this.props.onChange(value, () => {});
                this._hideCursorHandle();
            }
        }
    };

    getBorderWidthPx: () => number = () => {
        const normalBorderWidthPx = 1;
        const focusedBorderWidthPx = 2;

        return this.state.focused ? focusedBorderWidthPx : normalBorderWidthPx;
    };

    // Calculate the appropriate padding based on the border width (which is
    // considered 'padding', since we're using 'border-box') and the fact
    // that MathQuill automatically applies 2px of padding to the inner
    // input.
    getInputInnerPadding: () => {
        paddingTop: number;
        paddingRight: number;
        paddingBottom: number;
        paddingLeft: number;
    } = () => {
        const paddingInset = totalDesiredPadding - this.getBorderWidthPx();

        // Now, translate that to the appropriate padding for each direction.
        // The complication here is that we want numerals to be centered within
        // the input. However, Symbola (MathQuill's font of choice) renders
        // numerals with approximately 3px of padding below and 1px of padding
        // above (to make room for ascenders and descenders). So we ignore those
        // padding values for the vertical directions.
        const symbolaPaddingBottom = 3;
        const symbolaPaddingTop = 1;
        // We also add a little padding for the cursor to ensure there's no
        // overflow when the input is empty and set to right aligned.
        const cursorPadding = 2;
        const padding = {
            paddingTop: paddingInset - symbolaPaddingTop,
            paddingRight: paddingInset + cursorPadding,
            paddingBottom: paddingInset - symbolaPaddingBottom,
            paddingLeft: paddingInset + cursorPadding,
        } as const;

        return padding;
    };

    render(): React.ReactNode {
        const {showInputFocusStyle, handle} = this.state;
        const {style} = this.props;

        const innerStyle = {
            ...inlineStyles.innerContainer,
            borderWidth: this.getBorderWidthPx(),
            ...(showInputFocusStyle
                ? {
                      borderColor:
                          semanticColor.core.border.instructive.default,
                  }
                : {}),
            ...style,
        } as const;

        // NOTE(diedra): This label explicitly refers to tapping because this field
        // is currently only seen if the user is using a mobile device.
        // We added the tapping instructions because there is currently a bug where
        // Android users need to use two fingers to tap the input field to make the
        // keyboard appear. It should only require one finger, which is how iOS works.
        const ariaLabel =
            this.context.strings.mathInputBox +
            " " +
            this.context.strings.fingerTap;

        return (
            <KeypadContext.Consumer>
                {({keypadActive, setKeypadActive}) => (
                    <View
                        style={styles.input}
                        onTouchStart={(e) => {
                            this.handleTouchStart(
                                e,
                                keypadActive,
                                setKeypadActive,
                            );
                        }}
                        onTouchMove={this.handleTouchMove}
                        onTouchEnd={this.handleTouchEnd}
                        onClick={(e) => {
                            this.handleClick(e, keypadActive, setKeypadActive);
                        }}
                        role={"textbox"}
                        aria-label={ariaLabel}
                    >
                        {/* NOTE(charlie): This is used purely to namespace the styles in
                overrides.css. */}
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO(LEMS-2871): Address a11y error */}
                        <div
                            className="keypad-input"
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- TODO(LEMS-2871): Address a11y error
                            tabIndex={0}
                            ref={(node) => {
                                this.inputRef = node;
                            }}
                            onFocus={() => {
                                this.focus(setKeypadActive);
                            }}
                            onBlur={this.blur}
                            onKeyUp={this.handleKeyUp}
                        >
                            {/* NOTE(charlie): This element must be styled with inline
                    styles rather than with Aphrodite classes, as MathQuill
                    modifies the class names on the DOM node. */}
                            <div
                                ref={(node) => {
                                    this._mathContainer =
                                        ReactDOM.findDOMNode(node);
                                }}
                                style={innerStyle}
                            />
                        </div>
                        {showInputFocusStyle && handle.visible && (
                            <CursorHandle
                                {...handle}
                                onTouchStart={this.onCursorHandleTouchStart}
                                onTouchMove={this.onCursorHandleTouchMove}
                                onTouchEnd={this.onCursorHandleTouchEnd}
                                onTouchCancel={this.onCursorHandleTouchCancel}
                            />
                        )}
                    </View>
                )}
            </KeypadContext.Consumer>
        );
    }
}

MathInput.contextType = MathInputI18nContext;

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
        borderColor: semanticColor.core.border.neutral.default,
        borderRadius: 4,
        color: semanticColor.core.foreground.neutral.strong,
    },
} as const;

export default MathInput;
