import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactJson from "react-json-view";

import {interactiveSizes} from "../packages/perseus/src/styles/constants";

type Props = {
    leftTitle: React.ReactNode;
    left: React.ReactNode;
    rightTitle?: string;
    jsonObject: any;
};

const SideBySide = ({
    leftTitle = "Renderer",
    left,
    rightTitle = "Perseus JSON",
    jsonObject,
}: Props): React.ReactElement => {
    return (
        <View style={styles.sideBySide}>
            <View style={styles.leftPanel} className="framework-perseus">
                <HeadingMedium>{leftTitle}</HeadingMedium>
                {left}
            </View>
            <View style={styles.rightPanel}>
                <HeadingMedium>{rightTitle}</HeadingMedium>
                <ReactJson
                    style={{marginTop: "10px"}}
                    quotesOnKeys={false}
                    enableClipboard={false}
                    collapsed={5}
                    src={jsonObject}
                />
            </View>
        </View>
    );
};

const styles = {
    sideBySide: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        gap: spacing.large_24,
        padding: `0px ${spacing.large_24}px`,
    },
    leftPanel: {
        flex: `1 0 ${interactiveSizes.defaultBoxSize}px`,
        overflow: "auto",
    },
    rightPanel: {
        flex: `1 1 ${interactiveSizes.defaultBoxSizeSmall}px`,
        maxWidth: "50%",
    },
} as const;

export default SideBySide;
