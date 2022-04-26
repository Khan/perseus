// @flow
/* eslint-disable static-service/require-fixture */

import * as React from "react";
import ReactJson from "react-json-view";
import {View} from "@khanacademy/wonder-blocks-core";

import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";

const SideBySide = ({
    leftTitle = "Renderer",
    left,
    perseusObject,
}: {|
    leftTitle: string,
    left: React.Node,
    perseusObject: any,
|}): React.Node => {
    return (
        <View style={styles.sideBySide}>
            <View style={styles.leftPanel} className="framework-perseus">
                <HeadingMedium>{leftTitle}</HeadingMedium>
                {left}
            </View>
            <View style={styles.rightPanel}>
                <HeadingMedium>Perseus JSON</HeadingMedium>
                <ReactJson
                    style={{marginTop: "10px"}}
                    quotesOnKeys={false}
                    enableClipboard={false}
                    collapsed={5}
                    src={perseusObject}
                />
            </View>
        </View>
    );
};

const styles = {
    sideBySide: {
        display: "flex",
        flexDirection: "row",
    },
    leftPanel: {
        paddingRight: "30px",
        flexGrow: 1,
    },
    rightPanel: {
        flexGrow: 1,
        maxWidth: "50%",
        padding: "5px",
    },
    code: {
        fontSize: "10pt",
        marginTop: "22px",
        fontFamily: "monospace",
    },
};

export default SideBySide;
