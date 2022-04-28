const Redux = require("redux");

const {tabletCutoffPx} = require("../components/common-style");
const computeLayoutParameters = require("../components/compute-layout-parameters");
const {
    DeviceOrientations,
    DeviceTypes,
    EchoAnimationTypes,
    KeyTypes,
    KeypadTypes,
    LayoutModes,
} = require("../consts");
const Keys = require("../data/keys");
const KeyConfigs = require("../data/key-configs");
const CursorContexts = require("../components/input/cursor-contexts");
const GestureManager = require("../components/gesture-manager");
const VelocityTracker = require("../components/velocity-tracker");

const FractionKeypad = require("../components/fraction-keypad");
const ExpressionKeypad = require("../components/expression-keypad");

const keypadForType = {
    [KeypadTypes.FRACTION]: FractionKeypad,
    [KeypadTypes.EXPRESSION]: ExpressionKeypad,
};

const createStore = () => {
    const initialInputState = {
        keyHandler: null,
        cursor: {
            context: CursorContexts.NONE,
        },
    };

    const inputReducer = function(state = initialInputState, action) {
        switch (action.type) {
            case "SetKeyHandler":
                return {
                    ...state,
                    keyHandler: action.keyHandler,
                };

            case "PressKey":
                const keyConfig = KeyConfigs[action.key];
                if (keyConfig.type !== KeyTypes.KEYPAD_NAVIGATION) {
                    // This is probably an anti-pattern but it works for the
                    // case where we don't actually control the state but we
                    // still want to communicate with the other object
                    return {
                        ...state,
                        cursor: state.keyHandler(keyConfig.id),
                    };
                }

                // TODO(kevinb) get state from MathQuill and store it?
                return state;

            case "SetCursor":
                return {
                    ...state,
                    cursor: action.cursor,
                };

            default:
                return state;
        }
    };

    const defaultKeypadType = KeypadTypes.EXPRESSION;

    const initialKeypadState = {
        extraKeys: ["x", "y", Keys.THETA, Keys.PI],
        keypadType: defaultKeypadType,
        active: false,
    };

    const keypadReducer = function(state = initialKeypadState, action) {
        switch (action.type) {
            case "DismissKeypad":
                return {
                    ...state,
                    active: false,
                };

            case "ActivateKeypad":
                return {
                    ...state,
                    active: true,
                };

            case "ConfigureKeypad":
                return {
                    ...state,
                    // Default `extraKeys` to the empty array.
                    extraKeys: [],
                    ...action.configuration,
                };

            case "PressKey":
                const keyConfig = KeyConfigs[action.key];
                // NOTE(charlie): Our keypad system operates by triggering key
                // presses with key IDs in a dumb manner, such that the keys
                // don't know what they can do--instead, the store is
                // responsible for interpreting key presses and triggering the
                // right actions when they occur. Hence, we figure off a
                // dismissal here rather than dispatching a dismiss action in
                // the first place.
                if (keyConfig.id === Keys.DISMISS) {
                    return keypadReducer(state, {type: "DismissKeypad"});
                }
                return state;

            default:
                return state;
        }
    };

    // We default to the right-most page. This is done so-as to enforce a
    // consistent orientation between the view pager layout and the flattened
    // layout, where our default page appears on the far right.
    const getDefaultPage = (numPages) => numPages - 1;

    const initialPagerState = {
        animateToPosition: false,
        currentPage: getDefaultPage(keypadForType[defaultKeypadType].numPages),
        // The cumulative differential in the horizontal direction for the
        // current swipe.
        dx: 0,
        numPages: keypadForType[defaultKeypadType].numPages,
        pageWidthPx: 0,
        velocityTracker: new VelocityTracker(),
    };

    const pagerReducer = function(state = initialPagerState, action) {
        switch (action.type) {
            case "ConfigureKeypad":
                const {keypadType} = action.configuration;
                const {numPages} = keypadForType[keypadType];
                return {
                    ...state,
                    numPages,
                    animateToPosition: false,
                    currentPage: getDefaultPage(numPages),
                    dx: 0,
                };

            case "SetPageSize":
                return {
                    ...state,
                    pageWidthPx: action.pageWidthPx,
                };

            case "PressKey":
                const keyConfig = KeyConfigs[action.key];

                // Reset the keypad page if the user performs a math operation.
                if (
                    keyConfig.type === KeyTypes.VALUE ||
                    keyConfig.type === KeyTypes.OPERATOR
                ) {
                    return pagerReducer(state, {type: "ResetKeypadPage"});
                }
                return state;

            case "ResetKeypadPage":
                return {
                    ...state,
                    animateToPosition: true,
                    // We start at the right-most page.
                    currentPage: getDefaultPage(state.numPages),
                    dx: 0,
                };

            case "PageKeypadRight":
                const nextPage = Math.min(
                    state.currentPage + 1,
                    state.numPages - 1,
                );
                return {
                    ...state,
                    animateToPosition: true,
                    currentPage: nextPage,
                    dx: 0,
                };

            case "PageKeypadLeft":
                const prevPage = Math.max(state.currentPage - 1, 0);
                return {
                    ...state,
                    animateToPosition: true,
                    currentPage: prevPage,
                    dx: 0,
                };

            case "OnSwipeChange":
                state.velocityTracker.push(action.dx);

                return {
                    ...state,
                    animateToPosition: false,
                    dx: action.dx,
                };

            case "OnSwipeEnd":
                const {pageWidthPx, velocityTracker} = state;
                const {dx} = action;
                const velocity = velocityTracker.getVelocity();

                // NOTE(charlie): These will need refinement. The velocity comes
                // from Framer.
                const minFlingVelocity = 0.1;
                const minFlingDistance = 10;

                const shouldPageRight =
                    dx < -pageWidthPx / 2 ||
                    (velocity < -minFlingVelocity && dx < -minFlingDistance);

                const shouldPageLeft =
                    dx > pageWidthPx / 2 ||
                    (velocity > minFlingVelocity && dx > minFlingDistance);

                if (shouldPageRight) {
                    return pagerReducer(state, {type: "PageKeypadRight"});
                } else if (shouldPageLeft) {
                    return pagerReducer(state, {type: "PageKeypadLeft"});
                }

                return {
                    ...state,
                    animateToPosition: true,
                    dx: 0,
                };

            default:
                return state;
        }
    };

    const createGestureManager = (swipeEnabled) => {
        return new GestureManager(
            {
                swipeEnabled,
            },
            {
                onSwipeChange: (dx) => {
                    store.dispatch({
                        type: "OnSwipeChange",
                        dx,
                    });
                },
                onSwipeEnd: (dx) => {
                    store.dispatch({
                        type: "OnSwipeEnd",
                        dx,
                    });
                },
                onActiveNodesChanged: (activeNodes) => {
                    store.dispatch({
                        type: "SetActiveNodes",
                        activeNodes,
                    });
                },
                onClick: (key, layoutProps, inPopover) => {
                    store.dispatch({
                        type: "PressKey",
                        key,
                        ...layoutProps,
                        inPopover,
                    });
                },
            },
            [],
            [Keys.BACKSPACE, Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT],
        );
    };

    const initialGestureState = {
        popover: null,
        focus: null,
        gestureManager: createGestureManager(
            keypadForType[defaultKeypadType].numPages > 1,
        ),
    };

    const gestureReducer = function(state = initialGestureState, action) {
        switch (action.type) {
            case "DismissKeypad":
                // NOTE(charlie): In the past, we enforced the "gesture manager
                // will not receive any events when the keypad is hidden"
                // assumption by assuming that the keypad would be hidden when
                // dismissed and, as such, that none of its managed DOM nodes
                // would be able to receive touch events. However, on mobile
                // Safari, we're seeing that some of the keys receive touch
                // events even when off-screen, inexplicably. So, to guard
                // against that bug and make the contract explicit, we enable
                // and disable event tracking on activation and dismissal.
                state.gestureManager.disableEventTracking();
                return state;

            case "ActivateKeypad":
                state.gestureManager.enableEventTracking();
                return state;

            case "SetActiveNodes":
                return {
                    ...state,
                    ...action.activeNodes,
                };

            case "ConfigureKeypad":
                const {keypadType} = action.configuration;
                const {numPages} = keypadForType[keypadType];
                const swipeEnabled = numPages > 1;
                return {
                    popover: null,
                    focus: null,
                    gestureManager: createGestureManager(swipeEnabled),
                };

            default:
                return state;
        }
    };

    // Used to generate unique animation IDs for the echo animations. The actual
    // values are irrelevant as long as they are unique.
    let _lastAnimationId = 0;

    const initialEchoState = {
        echoes: [],
    };

    const echoReducer = function(state = initialEchoState, action) {
        switch (action.type) {
            case "PressKey":
                const keyConfig = KeyConfigs[action.key];

                // Add in the echo animation if the user performs a math
                // operation.
                if (
                    keyConfig.type === KeyTypes.VALUE ||
                    keyConfig.type === KeyTypes.OPERATOR
                ) {
                    return {
                        ...state,
                        echoes: [
                            ...state.echoes,
                            {
                                animationId: "" + _lastAnimationId++,
                                animationType: action.inPopover
                                    ? EchoAnimationTypes.LONG_FADE_ONLY
                                    : EchoAnimationTypes.FADE_ONLY,
                                borders: action.borders,
                                id: keyConfig.id,
                                initialBounds: action.initialBounds,
                            },
                        ],
                    };
                }
                return state;

            case "RemoveEcho":
                const remainingEchoes = state.echoes.filter((echo) => {
                    return echo.animationId !== action.animationId;
                });
                return {
                    ...state,
                    echoes: remainingEchoes,
                };

            default:
                return state;
        }
    };

    const initialLayoutState = {
        gridDimensions: {
            numRows: keypadForType[defaultKeypadType].rows,
            numColumns: keypadForType[defaultKeypadType].columns,
            numMaxVisibleRows: keypadForType[defaultKeypadType].maxVisibleRows,
            numPages: keypadForType[defaultKeypadType].numPages,
        },
        buttonDimensions: {
            widthPx: 48,
            heightPx: 48,
        },
        pageDimensions: {
            pageWidthPx: 0,
            pageHeightPx: 0,
        },
        layoutMode: LayoutModes.FULLSCREEN,
        paginationEnabled: false,
        navigationPadEnabled: false,
    };

    /**
     * Compute the additional layout state based on the provided page and grid
     * dimensions.
     */
    const layoutParametersForDimensions = (pageDimensions, gridDimensions) => {
        const {pageWidthPx, pageHeightPx} = pageDimensions;

        // Determine the device type and orientation.
        const deviceOrientation =
            pageWidthPx > pageHeightPx
                ? DeviceOrientations.LANDSCAPE
                : DeviceOrientations.PORTRAIT;
        const deviceType =
            Math.min(pageWidthPx, pageHeightPx) > tabletCutoffPx
                ? DeviceTypes.TABLET
                : DeviceTypes.PHONE;

        // Using that information, make some decisions (or assumptions)
        // about the resulting layout.
        const navigationPadEnabled = deviceType === DeviceTypes.TABLET;
        const paginationEnabled =
            deviceType === DeviceTypes.PHONE &&
            deviceOrientation === DeviceOrientations.PORTRAIT;

        const deviceInfo = {deviceOrientation, deviceType};
        const layoutOptions = {
            navigationPadEnabled,
            paginationEnabled,
            // HACK(charlie): It's not great that we're making assumptions about
            // the toolbar (which is rendered by webapp, and should always be
            // visible and anchored to the bottom of the page for phone and
            // tablet exercises). But this is primarily a heuristic (the goal is
            // to preserve a 'good' amount of space between the top of the
            // keypad and the top of the page) so we afford to have some margin
            // of error.
            toolbarEnabled: true,
        };

        return {
            ...computeLayoutParameters(
                gridDimensions,
                pageDimensions,
                deviceInfo,
                layoutOptions,
            ),
            // Pass along some of the layout information, so that other
            // components in the heirarchy can adapt appropriately.
            navigationPadEnabled,
            paginationEnabled,
        };
    };

    const layoutReducer = function(state = initialLayoutState, action) {
        switch (action.type) {
            case "ConfigureKeypad":
                const {keypadType} = action.configuration;
                const gridDimensions = {
                    numRows: keypadForType[keypadType].rows,
                    numColumns: keypadForType[keypadType].columns,
                    numMaxVisibleRows: keypadForType[keypadType].maxVisibleRows,
                    numPages: keypadForType[keypadType].numPages,
                };

                return {
                    ...state,
                    ...layoutParametersForDimensions(
                        state.pageDimensions,
                        gridDimensions,
                    ),
                    gridDimensions,
                };

            case "SetPageSize":
                const {pageWidthPx, pageHeightPx} = action;
                const pageDimensions = {pageWidthPx, pageHeightPx};

                return {
                    ...state,
                    ...layoutParametersForDimensions(
                        pageDimensions,
                        state.gridDimensions,
                    ),
                    pageDimensions,
                };

            default:
                return state;
        }
    };

    const reducer = Redux.combineReducers({
        input: inputReducer,
        keypad: keypadReducer,
        pager: pagerReducer,
        gestures: gestureReducer,
        echoes: echoReducer,
        layout: layoutReducer,
    });

    // TODO(charlie): This non-inlined return is necessary so as to allow the
    // gesture manager to dispatch actions on the store in its callbacks. We
    // should come up with a better pattern to remove the two-way dependency.
    const store = Redux.createStore(reducer);

    return store;
};

module.exports = createStore;
