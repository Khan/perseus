/**
 * A component that renders and animates the popovers that appear over the
 * multi-functional keys.
 */

import * as React from "react";
import {CSSTransition} from "react-transition-group";

import KeyConfigs from "../data/key-configs";

import MultiSymbolPopover from "./multi-symbol-popover";

import type {Popover, KeyConfig} from "../types";
import GestureManager from "./gesture-manager";

// NOTE(charlie): These must be kept in sync with the transition durations and
// classnames specified in popover.less.
const animationTransitionName = "popover";
const animationDurationMs = 200;

type Props = {
    // TODO(matthewc) should be something like Bound, but couldn't fix errors
    bounds: any;
    childKeys: ReadonlyArray<KeyConfig>;
    gestureManager: GestureManager;
    gestureFocus: any;
    popover: Popover | null;
    heightPx: number;
    widthPx: number;
};

// A container component used to position a popover absolutely at a specific
// position.
class PopoverContainer extends React.Component<Props> {
    render() {
        const {
            bounds,
            childKeys,
            gestureManager,
            gestureFocus,
            popover,
            heightPx,
            widthPx,
        } = this.props;

        const containerStyle = {
            position: "absolute",
            ...bounds,
        };

        return (
            <div style={containerStyle}>
                <MultiSymbolPopover
                    keys={childKeys}
                    gestureManager={gestureManager}
                    gestureFocus={gestureFocus}
                    popover={popover}
                    heightPx={heightPx}
                    widthPx={widthPx}
                />
            </div>
        );
    }
}

type PopoverManagerProps = {
    popover: Popover | null;
    gestureManager: GestureManager;
    gestureFocus: any;
    heightPx: number;
    widthPx: number;
};

class PopoverManager extends React.Component<PopoverManagerProps> {
    render() {
        const {popover, gestureManager, gestureFocus, heightPx, widthPx} =
            this.props;

        return popover ? (
            <CSSTransition
                in={true}
                classNames={animationTransitionName}
                enter={true}
                exit={false}
                timeout={{
                    enter: animationDurationMs,
                }}
            >
                <PopoverContainer
                    key={popover.childKeyIds[0]}
                    bounds={popover.bounds}
                    childKeys={popover.childKeyIds.map((id) => KeyConfigs[id])}
                    popover={popover}
                    gestureManager={gestureManager}
                    gestureFocus={gestureFocus}
                    heightPx={heightPx}
                    widthPx={widthPx}
                />
            </CSSTransition>
        ) : null;
    }
}

export default PopoverManager;
