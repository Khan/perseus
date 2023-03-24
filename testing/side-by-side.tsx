import {View} from "@khanacademy/wonder-blocks-core";
import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactJson from "react-json-view";

const SideBySide: React.FC<{
    leftTitle: string,
    left: React.ReactNode,
    perseusObject: any
}> = (
    {
        leftTitle = "Renderer",
        left,
        perseusObject,
    },
): React.ReactElement => {
    return (
// @ts-expect-error [FEI-5003] - TS2786 - 'View' cannot be used as a JSX component.
        <View style={styles.sideBySide}>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'View' cannot be used as a JSX component. | TS2769 - No overload matches this call. */}
            <View style={styles.leftPanel} className="framework-perseus">
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'HeadingMedium' cannot be used as a JSX component. */}
                <HeadingMedium>{leftTitle}</HeadingMedium>
                {left}
            </View>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'View' cannot be used as a JSX component. */}
            <View style={styles.rightPanel}>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'HeadingMedium' cannot be used as a JSX component. */}
                <HeadingMedium>Perseus JSON</HeadingMedium>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'ReactJson' cannot be used as a JSX component. */}
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
} as const;

export default SideBySide;
