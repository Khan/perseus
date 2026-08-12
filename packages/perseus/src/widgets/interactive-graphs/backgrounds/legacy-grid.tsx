import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import AssetContext from "../../../asset-context";
import {SvgImage} from "../../../components";
import {interactiveSizes} from "../../../styles/constants";
import {X} from "../math";

import type {PerseusImageBackground} from "@khanacademy/perseus-core";

interface Props {
    box: [number, number];
    backgroundImage?: PerseusImageBackground;
}

/**
 * If a graphie URL is provided in `backgroundImage`, will return the rendered graphie background.
 * Otherwise, returns `null`.
 */
export const LegacyGrid = ({box, backgroundImage}: Props) => {
    const {url, width, height} = backgroundImage ?? {};
    if (url && typeof url === "string") {
        const scale = box[X] / interactiveSizes.defaultBoxSize;
        return (
            <View
                style={{
                    position: "absolute",
                    // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: pins the coordinate layer to an LTR plot origin; the plot doesn't flip with page direction, so converting to logical insets would misplace/misalign it in RTL
                    bottom: 0,
                    // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: pins the coordinate layer to an LTR plot origin; the plot doesn't flip with page direction, so converting to logical insets would misplace/misalign it in RTL
                    left: 0,
                }}
            >
                <AssetContext.Consumer>
                    {({setAssetStatus}) => (
                        <SvgImage
                            src={url}
                            // Don't allow zooming on an image that's being
                            // used as a graph background.
                            allowZoom={false}
                            width={width}
                            height={height}
                            scale={scale}
                            responsive={false}
                            setAssetStatus={setAssetStatus}
                            alt=""
                        />
                    )}
                </AssetContext.Consumer>
            </View>
        );
    }
    return null;
};
