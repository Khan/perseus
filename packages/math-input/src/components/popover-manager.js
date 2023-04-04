/**
 * A component that renders and animates the popovers that appear over the
 * multi-functional keys.
 */

import PropTypes from "prop-types";
import * as React from "react";
import {CSSTransition} from "react-transition-group";

import KeyConfigs from "../data/key-configs";

import MultiSymbolPopover from "./multi-symbol-popover";
import {
    boundingBoxPropType,
    keyConfigPropType,
    popoverPropType,
} from "./prop-types";

// NOTE(charlie): These must be kept in sync with the transition durations and
// classnames specified in popover.less.
const animationTransitionName = "popover";
const animationDurationMs = 200;

// A container component used to position a popover absolutely at a specific
// position.
class PopoverContainer extends React.Component {
    static propTypes = {
        bounds: boundingBoxPropType.isRequired,
        childKeys: PropTypes.arrayOf(keyConfigPropType).isRequired,
    };

    render() {
        const {bounds, childKeys} = this.props;

        const containerStyle = {
            position: "absolute",
            ...bounds,
        };

        return (
            <div style={containerStyle}>
                <MultiSymbolPopover keys={childKeys} />
            </div>
        );
    }
}

class PopoverManager extends React.Component {
    static propTypes = {
        popover: popoverPropType,
    };

    render() {
        const {popover} = this.props;

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
                />
            </CSSTransition>
        ) : null;
    }
}

export default PopoverManager;
