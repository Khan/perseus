 /**
  * Provides a simple styled button
  *
  */

const React = require('react');
const {StyleSheet, css} = require('aphrodite');

const SimpleButton = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        color: React.PropTypes.oneOf(['orange', 'green']),
        onClick: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            children: null,
            color: 'green',
            onClick: () => {},
        };
    },

    render: function() {
        return <div
            className={css(styles.baseButton, styles[this.props.color])}
            onClick={this.props.onClick}
        >
            {this.props.children}
        </div>;
    },
});

const styles = StyleSheet.create({
    baseButton: {
        top: '0',
        fontSize: '11px',
        padding: '3px 10px',
        backgroundRepeat: 'repeat-x',
        borderColor: `
            rgba(0, 0, 0, 0.1)
            rgba(0, 0, 0, 0.1)
            rgba(0, 0, 0, 0.25)
        `,
        color: '#ffffff',
        borderRadius: '3px',
        lineHeight: '15px',
        cursor: 'pointer',
        transition: 'box-shadow ease-in-out 0.15s',
        appearance: 'none',
        textDecoration: 'none',
        textAlign: 'center',
        ':hover': {
            boxShadow: `0 1px 1px rgba(0, 0, 0, 0.35),
                inset 0 0 50px 5px rgba(255, 255, 255, 0.2)`,
        },
    },
    green: {
        border: '1px solid #7fab07',
        backgroundColor: '#80ac07',
        backgroundImage: 'linear-gradient(to bottom, #8aba08, #719807)',
        ':hover': {
            borderBottomColor: '#547105',
            backgroundColor: '#719807',
        },
    },
    orange: {
        border: '1px solid #d45704',
        backgroundColor: '#d55704',
        backgroundImage: 'linear-gradient(to bottom, #e35d04, #c04f03)',
        ':hover': {
            borderBottomColor: '#983e03',
            bakgroundColor: '#c04f03',
        },
    },
});

module.exports = SimpleButton;
