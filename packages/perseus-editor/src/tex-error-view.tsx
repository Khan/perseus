import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import caretRight from "@phosphor-icons/core/bold/caret-right-bold.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    errorList: ReadonlyArray<{math: string; message: string}>;
};

type State = {
    showErrors: boolean;
};

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

        const iconStyle = showErrors
            ? styles.iconExpanded
            : styles.iconCollapsed;

        return (
            <View style={styles.errorContainer}>
                <View style={styles.title} onClick={this.handleToggleTexErrors}>
                    <PhosphorIcon icon={caretRight} style={iconStyle} />
                    &nbsp; TeX Errors ({errorList.length})
                </View>
                {showErrors && (
                    <View style={styles.errorExplanation}>
                        If your math doesn't display correctly, these errors
                        might help you troubleshoot. Message #content-kitchen
                        for help.
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
        padding: "4px 10px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    errorContainer: {
        border: "1px solid #ddd",
        borderTop: "none",
    },
    errorExplanation: {
        padding: "4px 10px",
        backgroundColor: "pink",
    },
    error: {
        padding: "4px 10px",
    },
    iconCollapsed: {
        transition: ".15s",
    },
    iconExpanded: {
        transform: "rotate(90deg)",
        transition: ".15s",
    },
});

export default TexErrorView;
