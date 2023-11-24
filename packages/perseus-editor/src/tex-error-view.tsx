import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import caretCircleDown from "@phosphor-icons/core/bold/caret-circle-down-bold.svg";
import caretCircleRight from "@phosphor-icons/core/bold/caret-circle-right-bold.svg";
import {css, StyleSheet} from "aphrodite";
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

        const icon = showErrors ? caretCircleDown : caretCircleRight;

        return (
            <View style={styles.errorContainer}>
                <View style={styles.title} onClick={this.handleToggleTexErrors}>
                    <PhosphorIcon icon={icon} />
                    &nbsp; TeX Errors ({errorList.length})
                </View>
                {showErrors && (
                    <View style={styles.errorExplanation}>
                        These errors will cause your TeX to load slowly or not
                        at all for the student. Please fix them if you can. If
                        you can’t because MathJax doesn’t support the feature
                        you need, please ask in the #team-lc channel.
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
});

export default TexErrorView;
