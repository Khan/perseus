import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ToggleableCaret from "./components/toggleable-caret";

interface Props {
    errorList: ReadonlyArray<{math: string; message: string}>;
}

interface State {
    showErrors: boolean;
}

/**
 * Displays a collapsable list of TeX rendering errors.
 */
class TexErrorView extends React.Component<Props, State> {
    state: State = {
        showErrors: false,
    };

    handleToggleTexErrors: (arg1: React.MouseEvent) => void = (e) => {
        this.setState({showErrors: !this.state.showErrors});
    };

    render(): React.ReactNode {
        const {errorList} = this.props;
        const {showErrors} = this.state;

        return (
            <View style={styles.errorContainer}>
                <View style={styles.title} onClick={this.handleToggleTexErrors}>
                    <ToggleableCaret isExpanded={showErrors} />
                    &nbsp; TeX Errors ({errorList.length})
                </View>
                {showErrors && (
                    <View style={styles.errorExplanation}>
                        If your math doesn&apos;t display correctly, these
                        errors might help you troubleshoot. Message
                        #content-kitchen for help.
                    </View>
                )}
                {showErrors &&
                    errorList.map((e, index) => (
                        <View style={styles.error} key={index}>
                            <View style={{color: "red"}}>{e.math}</View>
                            <View>{e.message}</View>
                        </View>
                    ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: "#eee",
        fontSize: "1.25em",
        paddingBlock: "4px",
        paddingInline: "10px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    errorContainer: {
        border: "1px solid #ddd",
        borderBlockStart: "none",
    },
    errorExplanation: {
        paddingBlock: "4px",
        paddingInline: "10px",
        backgroundColor: "pink",
    },
    error: {
        paddingBlock: "4px",
        paddingInline: "10px",
    },
});

export default TexErrorView;
