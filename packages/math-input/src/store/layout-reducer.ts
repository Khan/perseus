import {tabletCutoffPx} from "../components/common-style";
import {computeLayoutParameters} from "../components/compute-layout-parameters";
import {DeviceOrientations, DeviceTypes, LayoutModes} from "../consts";

import {defaultKeypadType, keypadForType} from "./shared";

import type {Action} from "./actions";
import type {LayoutState} from "./types";

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
} as const;

/**
 * Compute the additional layout state based on the provided page and grid
 * dimensions.
 */
const layoutParametersForDimensions = (
    pageDimensions:
        | {
              pageHeightPx: never;
              pageWidthPx: never;
          }
        | {
              pageHeightPx: number;
              pageWidthPx: number;
          },
    gridDimensions,
) => {
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
            const {pageWidthPx, pageHeightPx} = action;
            const pageDimensions = {pageWidthPx, pageHeightPx} as const;

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

export default layoutReducer;
