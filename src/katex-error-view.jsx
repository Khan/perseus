/**
 * Displays a collapsable list of KaTeX rendering errors.
 */
const React = require('react');
const {css, StyleSheet} = require('aphrodite');

const KatexErrorView = React.createClass({
    propTypes: {
        errorList: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                math: React.PropTypes.string.isRequired,
                message: React.PropTypes.string.isRequired,
            })
        ).isRequired,
    },

    getInitialState() {
        return {
            showErrors: false,
        };
    },

    handleToggleKatexErrors(e) {
        this.setState({showErrors: !this.state.showErrors});
    },

    render() {
        const {errorList} = this.props;
        const {showErrors} = this.state;

        // TODO(riley) replace with SVG icons
        const disclosureClass = showErrors
            ? "icon-chevron-down"
            : "icon-chevron-right";

        return <div className={css(styles.errorContainer)}>
            <div
                className={css(styles.title)}
                onClick={this.handleToggleKatexErrors}
            >
                <i className={disclosureClass} style={{fontSize:14}} />
                &nbsp;
                KaTeX Errors
                ({errorList.length})
            </div>
            {showErrors && <div className={css(styles.errorExplanation)}>
                These errors will cause your LaTeX to load really slowly for
                the student. Please fix them if you can. If you can’t because
                KaTeX doesn’t support the feature you need, please message Cam.
            </div>}
            {showErrors && errorList.map((e, index) =>
                <div className={css(styles.error)} key={index}>
                    <div style={{color:'red'}}>{e.math}</div>
                    <div>{e.message}</div>
                </div>
            )}
        </div>;
    },
});

const styles = StyleSheet.create({
    title: {
        backgroundColor: '#eee',
        fontSize: '1.25em',
        padding: '4px 10px',
    },
    errorContainer: {
        border: '1px solid #ddd',
        borderTop: 'none',
    },
    errorExplanation: {
        padding: '4px 10px',
        backgroundColor: 'pink',
    },
    error: {
        padding: '4px 10px',
    },
});

module.exports = KatexErrorView;
