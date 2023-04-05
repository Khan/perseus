/**
 * React PropTypes that may be shared between components.
 */

import PropTypes from "prop-types";

import {
    BorderDirections,
    EchoAnimationTypes,
    IconTypes,
    KeyTypes,
    KeypadTypes,
} from "../consts";
import KeyConfigs from "../data/key-configs";

import * as CursorContexts from "./input/cursor-contexts";

export const iconPropType = PropTypes.shape({
    type: PropTypes.oneOf(Object.keys(IconTypes)).isRequired,
    data: PropTypes.string.isRequired,
});

export const keyIdPropType = PropTypes.oneOf(Object.keys(KeyConfigs));

export const keyConfigPropType = PropTypes.shape({
    ariaLabel: PropTypes.string,
    id: keyIdPropType.isRequired,
    type: PropTypes.oneOf(Object.keys(KeyTypes)).isRequired,
    childKeyIds: PropTypes.arrayOf(keyIdPropType),
    icon: iconPropType.isRequired,
});

export const keypadConfigurationPropType = PropTypes.shape({
    keypadType: PropTypes.oneOf(Object.keys(KeypadTypes)).isRequired,
    extraKeys: PropTypes.arrayOf(keyIdPropType),
});

// NOTE(jared): This is no longer guaranteed to be React element
export const keypadElementPropType = PropTypes.shape({
    activate: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    configure: PropTypes.func.isRequired,
    setCursor: PropTypes.func.isRequired,
    setKeyHandler: PropTypes.func.isRequired,
    getDOMNode: PropTypes.func.isRequired,
});

export const bordersPropType = PropTypes.arrayOf(
    PropTypes.oneOf(Object.keys(BorderDirections)),
);

export const boundingBoxPropType = PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
});

export const echoPropType = PropTypes.shape({
    animationId: PropTypes.string.isRequired,
    animationType: PropTypes.oneOf(Object.keys(EchoAnimationTypes)).isRequired,
    borders: bordersPropType,
    id: keyIdPropType.isRequired,
    initialBounds: boundingBoxPropType.isRequired,
});

export const cursorContextPropType = PropTypes.oneOf(
    Object.keys(CursorContexts),
);

export const popoverPropType = PropTypes.shape({
    parentId: keyIdPropType.isRequired,
    bounds: boundingBoxPropType.isRequired,
    childKeyIds: PropTypes.arrayOf(keyIdPropType).isRequired,
});

export const childrenPropType = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
]);
