import {View} from "@khanacademy/wonder-blocks-core";
import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactJson from "react-json-view";

type Props = {
    leftTitle: string;
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
    },
    leftPanel: {
        paddingRight: "30px",
        flexBasis: "400px",
    },
    rightPanel: {
        flexGrow: 1,
        maxWidth: "50%",
        flexBasis: "400px",
        padding: "5px",
    },
    code: {
        fontSize: "10pt",
        marginTop: "22px",
        fontFamily: "monospace",
    },
} as const;

export default SideBySide;
