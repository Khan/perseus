import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactJson from "react-json-view";

type Props = {
    rendererTitle: React.ReactNode;
    renderer: React.ReactNode;
    JSONTitle?: string;
    jsonObject: any;
};

/**
 * This component is used in Storybook to render both the renderer and the JSON object in a split view.
 * Currently, the renderer is displayed above the JSON object.
 */
const SplitView = ({
    rendererTitle = "Renderer",
    renderer,
    JSONTitle = "Perseus JSON",
    jsonObject,
}: Props): React.ReactElement => {
    return (
        <View style={styles.sideBySide}>
            <View className="framework-perseus">
                <Heading size="large">{rendererTitle}</Heading>
                {renderer}
            </View>
            <View>
                <Heading size="large">{JSONTitle}</Heading>
                <ReactJson
                    style={{marginTop: "10px"}}
                    quotesOnKeys={false}
                    enableClipboard={false}
                    collapsed={true}
                    src={jsonObject}
                />
            </View>
        </View>
    );
};

const styles = {
    sideBySide: {
        display: "flex",
        flexDirection: "column",
        gap: spacing.large_24,
        padding: `0px ${spacing.large_24}px`,
    },
} as const;

export default SplitView;
