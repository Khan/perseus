import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import AssetContext from "../../asset-context";
import {SvgImage} from "../../components";
import {interactiveSizes} from "../../styles/constants";
import {getInteractiveBoxFromSizeClass} from "../../util/sizing-utils";

import type {PerseusImageBackground} from "../../perseus-types";
import type {SizeClass} from "../../util/sizing-utils";

export const LegacyGrid = (props: {
    backgroundImage?: PerseusImageBackground;
    containerSizeClass: SizeClass;
}) => {
    const {url, width, height} = props.backgroundImage ?? {};
    if (url && typeof url === "string") {
        const box = getInteractiveBoxFromSizeClass(props.containerSizeClass);
        const scale = box[0] / interactiveSizes.defaultBoxSize;
        return (
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                }}
            >
                <AssetContext.Consumer>
                    {({setAssetStatus}) => (
                        <SvgImage
                            src={url}
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
