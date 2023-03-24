/**
 * Displays a collapsable list of KaTeX rendering errors.
 */
import {css, StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";

type Props = any;
type State = any;

class KatexErrorView extends React.Component<Props, State> {
    static propTypes = {
        errorList: PropTypes.arrayOf(
            PropTypes.shape({
                math: PropTypes.string.isRequired,
                message: PropTypes.string.isRequired,
            }),
        ).isRequired,
    };

    state: State = {
        showErrors: false,
    };

    handleToggleKatexErrors: (arg1: React.MouseEvent) => void = (e) => {
        this.setState({showErrors: !this.state.showErrors});
    };

    render(): React.ReactElement {
        const {errorList} = this.props;
        const {showErrors} = this.state;

        // TODO(riley) replace with SVG icons
        const disclosureClass = showErrors
            ? "icon-chevron-down"
            : "icon-chevron-right";

        return (
            <div className={css(styles.errorContainer)}>
                <div
                    className={css(styles.title)}
                    onClick={this.handleToggleKatexErrors}
                >
                    <i className={disclosureClass} style={{fontSize: 14}} />
                    &nbsp; KaTeX Errors ({errorList.length})
                </div>
                {showErrors && (
                    <div className={css(styles.errorExplanation)}>
                        These errors will cause your LaTeX to load really slowly
                        for the student. Please fix them if you can. If you
                        can’t because KaTeX doesn’t support the feature you
                        need, please message Cam.
                    </div>
                )}
                {showErrors &&
                    errorList.map((e, index) => (
                        <div className={css(styles.error)} key={index}>
                            <div style={{color: "red"}}>{e.math}</div>
                            <div>{e.message}</div>
                        </div>
                    ))}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: "#eee",
        fontSize: "1.25em",
        padding: "4px 10px",
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

export default KatexErrorView;
