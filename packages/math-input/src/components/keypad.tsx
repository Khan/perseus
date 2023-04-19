/**
 * A keypad component that acts as a container for rows or columns of buttons,
 * and manages the rendering of echo animations on top of those buttons.
 */

import * as React from "react";
import ReactDOM from "react-dom";

import {View} from "../fake-react-native-web/index";

import EchoManager from "./echo-manager";
import GestureManager from "./gesture-manager";
import PopoverManager from "./popover-manager";

import type {Popover, Echo} from "../types";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    children: React.ReactNode;
    style?: StyleType;
    removeEcho?: (animationId: string) => void;
    active: boolean;
    echoes: ReadonlyArray<Echo>;
    gestureManager: GestureManager;
    gestureFocus: any;
    popover: Popover | null;
    heightPx: number;
    widthPx: number;
};

// eslint-disable-next-line react/no-unsafe
class Keypad extends React.Component<Props> {
    _isMounted: boolean | undefined;
    _resizeTimeout: number | null | undefined;
    _container: DOMRect | null | undefined;

    componentDidMount() {
        this._isMounted = true;

        window.addEventListener("resize", this._onResize);
        this._updateSizeAndPosition();
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!this._container && (newProps.popover || newProps.echoes.length)) {
            this._computeContainer();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;

        window.removeEventListener("resize", this._onResize);
    }

    _computeContainer = () => {
        const domNode = ReactDOM.findDOMNode(this) as Element;
        this._container = domNode.getBoundingClientRect();
    };

    _updateSizeAndPosition = () => {
        // Mark the container for recalculation next time the keypad is
        // opened.
        // TODO(charlie): Since we're not recalculating the container
        // immediately, if you were to resize the page while a popover were
        // active, you'd likely get unexpected behavior. This seems very
        // difficult to do and, as such, incredibly unlikely, but we may
        // want to reconsider the caching here.
        this._container = null;
    };

    _onResize = () => {
        // Whenever the page resizes, we need to recompute the container's
        // bounding box. This is the only time that the bounding box can change.

        // Throttle resize events -- taken from:
        //    https://developer.mozilla.org/en-US/docs/Web/Events/resize
        if (this._resizeTimeout == null) {
            this._resizeTimeout = window.setTimeout(() => {
                this._resizeTimeout = null;

                if (this._isMounted) {
                    this._updateSizeAndPosition();
                }
            }, 66);
        }
    };

    render() {
        const {
            children,
            echoes,
            removeEcho,
            popover,
            style,
            heightPx,
            widthPx,
            gestureManager,
            gestureFocus,
        } = this.props;

        // Translate the echo boxes, as they'll be positioned absolutely to
        // this relative container.
        const relativeEchoes = echoes.map((echo) => {
            const {initialBounds, ...rest} = echo;
            return {
                ...rest,
                initialBounds: {
                    // @ts-expect-error TS2533
                    top: initialBounds.top - this._container.top,
                    // @ts-expect-error TS2533
                    right: initialBounds.right - this._container.left,
                    // @ts-expect-error TS2533
                    bottom: initialBounds.bottom - this._container.top,
                    // @ts-expect-error TS2533
                    left: initialBounds.left - this._container.left,
                    width: initialBounds.width,
                    height: initialBounds.height,
                },
            };
        });

        // Translate the popover bounds from page-absolute to keypad-relative.
        // Note that we only need three bounds, since popovers are anchored to
        // the bottom left corners of the keys over which they appear.
        const relativePopover = popover && {
            ...popover,
            bounds: {
                bottom:
                    // @ts-expect-error TS2533
                    this._container.height -
                    // @ts-expect-error TS2533
                    (popover.bounds.bottom - this._container.top),
                // @ts-expect-error TS2533
                left: popover.bounds.left - this._container.left,
                width: popover.bounds.width,
            },
        };

        return (
            <View style={style}>
                {children}
                <EchoManager
                    echoes={relativeEchoes}
                    onAnimationFinish={removeEcho}
                    heightPx={heightPx}
                    widthPx={widthPx}
                />
                <PopoverManager
                    popover={relativePopover}
                    heightPx={heightPx}
                    widthPx={widthPx}
                    gestureManager={gestureManager}
                    gestureFocus={gestureFocus}
                />
            </View>
        );
    }
}

export default Keypad;
