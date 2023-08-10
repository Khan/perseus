import {DeviceOrientation, DeviceType, LayoutMode} from "../../../enums";
import {tabletCutoffPx} from "../../common-style";
import {computeLayoutParameters} from "../compute-layout-parameters";

import {defaultKeypadType, keypadForType} from "./shared";

import type {Action} from "./actions";
import type {LayoutState} from "./types";

const expandedViewThreshold = 600;
const navigationViewThreshold = 1000;

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
        pageWidth: 0,
        pageHeight: 0,
    },
    layoutMode: LayoutMode.FULLSCREEN,
    paginationEnabled: false,
    navigationPadEnabled: false,
} as const;

/**
 * Compute the additional layout state based on the provided page and grid
 * dimensions.
 */
const layoutParametersForDimensions = (
    containerDimensions: {
        containerHeight: number;
        containerWidth: number;
    },
    gridDimensions,
) => {
    const {containerWidth, containerHeight} = containerDimensions;

    // Determine the device type and orientation.
    const deviceOrientation =
        containerWidth > containerHeight
            ? DeviceOrientation.LANDSCAPE
            : DeviceOrientation.PORTRAIT;
    console.log({containerWidth, containerHeight, tabletCutoffPx});
    const deviceType =
        Math.min(containerWidth, containerHeight) > tabletCutoffPx
            ? DeviceType.TABLET
            : DeviceType.PHONE;

    // Using that information, make some decisions (or assumptions)
    // about the resulting layout.
    const useExpandedView = containerWidth > expandedViewThreshold;
    const navigationPadEnabled = containerWidth > navigationViewThreshold;
    const paginationEnabled = !useExpandedView;
    // const navigationPadEnabled = deviceType === DeviceType.TABLET;
    // console.log(navigationPadEnabled);
    // const paginationEnabled =
    //     deviceType === DeviceType.PHONE &&
    //     deviceOrientation === DeviceOrientation.PORTRAIT;

    const deviceInfo = {deviceOrientation, deviceType} as const;
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
    } as const;

    return {
        ...computeLayoutParameters(
            gridDimensions,
            containerDimensions,
            deviceInfo,
            layoutOptions,
        ),
        // Pass along some of the layout information, so that other
        // components in the heirarchy can adapt appropriately.
        navigationPadEnabled,
        paginationEnabled,
    };
};

const layoutReducer = function (
    state: LayoutState = initialLayoutState,
    action: Action,
): LayoutState {
    switch (action.type) {
        case "ConfigureKeypad":
            const {keypadType} = action.configuration;
            const gridDimensions = {
                numRows: keypadForType[keypadType].rows,
                numColumns: keypadForType[keypadType].columns,
                numMaxVisibleRows: keypadForType[keypadType].maxVisibleRows,
                numPages: keypadForType[keypadType].numPages,
            } as const;

            return {
                ...state,
                ...layoutParametersForDimensions(
                    state.pageDimensions,
                    gridDimensions,
                ),
                gridDimensions,
            };

        case "SetPageSize":
            const {pageWidth, pageHeight, containerWidth, containerHeight} =
                action;
            const pageDimensions = {
                pageWidth,
                pageHeight,
            } as const;
            const containerDimensions = {
                containerWidth,
                containerHeight,
            } as const;

            return {
                ...state,
                ...layoutParametersForDimensions(
                    containerDimensions,
                    state.gridDimensions,
                ),
                pageDimensions,
            };

        default:
            return state;
    }
};

export default layoutReducer;
