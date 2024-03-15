import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
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
        gap: Spacing.large_24,
        padding: `0px ${Spacing.large_24}px`,
    },
    leftPanel: {
        flexBasis: `${interactiveSizes.defaultBoxSize}px`,
    },
    rightPanel: {
        flexGrow: 1,
        flexBasis: `${interactiveSizes.defaultBoxSize}px`,
        maxWidth: "50%",
    },
} as const;

export default SideBySide;
