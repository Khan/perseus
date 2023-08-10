import {DeviceOrientation, LayoutMode} from "../../../enums";
import {computeLayoutParameters} from "../compute-layout-parameters";

import {defaultKeypadType, keypadForType} from "./shared";

import type {Action} from "./actions";
import type {GridDimensions, LayoutState, WidthHeight} from "./types";

const expandedViewThreshold = 600;
const navigationViewThreshold = 800;

const initialLayoutState: LayoutState = {
    gridDimensions: {
        numRows: keypadForType[defaultKeypadType].rows,
        numColumns: keypadForType[defaultKeypadType].columns,
        numMaxVisibleRows: keypadForType[defaultKeypadType].maxVisibleRows,
        numPages: keypadForType[defaultKeypadType].numPages,
    },
    buttonDimensions: {
        width: 48,
        height: 48,
    },
    pageDimensions: {
        width: 0,
        height: 0,
    },
    containerDimensions: {
        width: 0,
        height: 0,
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
    pageDimensions: WidthHeight,
    containerDimensions: WidthHeight,
    gridDimensions: GridDimensions,
) => {
    // Determine the device type and orientation.
    const deviceOrientation =
        containerDimensions.width > containerDimensions.height
            ? DeviceOrientation.LANDSCAPE
            : DeviceOrientation.PORTRAIT;

    // Using that information, make some decisions (or assumptions)
    // about the resulting layout.
    const navigationPadEnabled =
        containerDimensions.width > navigationViewThreshold;
    const paginationEnabled = containerDimensions.width < expandedViewThreshold;
    // const navigationPadEnabled = deviceType === DeviceType.TABLET;
    // console.log(navigationPadEnabled);
    // const paginationEnabled =
    //     deviceType === DeviceType.PHONE &&
    //     deviceOrientation === DeviceOrientation.PORTRAIT;
    const toolbarEnabled = true;

    return {
        ...computeLayoutParameters(
            gridDimensions,
            pageDimensions,
            containerDimensions,
            deviceOrientation,
            navigationPadEnabled,
            paginationEnabled,
            toolbarEnabled,
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
    const stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "ConfigureKeypad":
            const {keypadType} = action.configuration;
            const gridDimensions = {
                numRows: keypadForType[keypadType].rows,
                numColumns: keypadForType[keypadType].columns,
                numMaxVisibleRows: keypadForType[keypadType].maxVisibleRows,
                numPages: keypadForType[keypadType].numPages,
            } as const;

            const layoutParams = layoutParametersForDimensions(
                stateCopy.pageDimensions,
                stateCopy.containerDimensions,
                gridDimensions,
            );

            return {
                ...stateCopy,
                ...layoutParams,
                gridDimensions,
            };

        case "SetPageSize":
            const {pageWidth, pageHeight, containerWidth, containerHeight} =
                action;
            const pageDimensions = {
                width: pageWidth,
                height: pageHeight,
            } as const;
            const containerDimensions = {
                width: containerWidth,
                height: containerHeight,
            } as const;

            return {
                ...stateCopy,
                ...layoutParametersForDimensions(
                    pageDimensions,
                    containerDimensions,
                    stateCopy.gridDimensions,
                ),
                pageDimensions,
                containerDimensions,
            };

        default:
            return stateCopy;
    }
};

export default layoutReducer;
