/**
 * React PropTypes that may be shared between components.
 */

const PropTypes = require("prop-types");

const KeyConfigs = require("../data/key-configs");
const CursorContexts = require("./input/cursor-contexts");
const {
    BorderDirections,
    EchoAnimationTypes,
    IconTypes,
    KeyTypes,
    KeypadTypes,
} = require("../consts");

const iconPropType = PropTypes.shape({
    type: PropTypes.oneOf(Object.keys(IconTypes)).isRequired,
    data: PropTypes.string.isRequired,
});

const keyIdPropType = PropTypes.oneOf(Object.keys(KeyConfigs));

const keyConfigPropType = PropTypes.shape({
    ariaLabel: PropTypes.string,
    id: keyIdPropType.isRequired,
    type: PropTypes.oneOf(Object.keys(KeyTypes)).isRequired,
    childKeyIds: PropTypes.arrayOf(keyIdPropType),
    icon: iconPropType.isRequired,
});

const keypadConfigurationPropType = PropTypes.shape({
    keypadType: PropTypes.oneOf(Object.keys(KeypadTypes)).isRequired,
    extraKeys: PropTypes.arrayOf(keyIdPropType),
});

// NOTE(jared): This is no longer guaranteed to be React element
const keypadElementPropType = PropTypes.shape({
    activate: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    configure: PropTypes.func.isRequired,
    setCursor: PropTypes.func.isRequired,
    setKeyHandler: PropTypes.func.isRequired,
    getDOMNode: PropTypes.func.isRequired,
});

const bordersPropType = PropTypes.arrayOf(
    PropTypes.oneOf(Object.keys(BorderDirections)),
);

const boundingBoxPropType = PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
});

const echoPropType = PropTypes.shape({
    animationId: PropTypes.string.isRequired,
    animationType: PropTypes.oneOf(Object.keys(EchoAnimationTypes)).isRequired,
    borders: bordersPropType,
    id: keyIdPropType.isRequired,
    initialBounds: boundingBoxPropType.isRequired,
});

const cursorContextPropType = PropTypes.oneOf(Object.keys(CursorContexts));

const popoverPropType = PropTypes.shape({
    parentId: keyIdPropType.isRequired,
    bounds: boundingBoxPropType.isRequired,
    childKeyIds: PropTypes.arrayOf(keyIdPropType).isRequired,
});

const childrenPropType = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
]);

module.exports = {
    keyConfigPropType,
    keyIdPropType,
    keypadConfigurationPropType,
    keypadElementPropType,
    bordersPropType,
    boundingBoxPropType,
    echoPropType,
    cursorContextPropType,
    popoverPropType,
    iconPropType,
    childrenPropType,
};
