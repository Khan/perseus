/**
 * Zooms child to fit with tap-to-zoom behavior.
 */

const React = require("react");
const ReactDOM = require("react-dom");

const Zoomable = React.createClass({
    propTypes: {
        children: React.PropTypes.element.isRequired,
        // If this prop is specified, we wait until the deferred is resolved
        // before measuring the child element.  This is necessary in cases
        // where the child size depends on whether or not resources, such as
        // fonts, have been loaded.
        readyToMeasureDeferred: React.PropTypes.shape({
            then: React.PropTypes.func.isRequired,
            reject: React.PropTypes.func.isRequired,
        }).isRequired,
    },

    getInitialState() {
        return {
            animate: false,
            scale: 1.0,
            zoomed: true,
        };
    },

    componentDidMount() {
        this._node = ReactDOM.findDOMNode(this);
        this.props.readyToMeasureDeferred.then(() => this.scaleChildToFit());
    },

    componentWillUnmount() {
        this.props.readyToMeasureDeferred.reject();
    },

    scaleChildToFit() {
        const childBounds =
            this._node.firstElementChild.getBoundingClientRect();
        const parentBounds = this._node.getBoundingClientRect();

        if (childBounds.width > parentBounds.width) {
            const scale = parentBounds.width / childBounds.width;

            this.setState({
                scale: scale,
                zoomed: false,
            });
        }
    },

    handleClick() {
        this.setState({
            animate: true,
            zoomed: !this.state.zoomed,
        });
    },

    render() {
        const { scale, animate, zoomed } = this.state;

        const style = {
            display: 'block',
            transform: zoomed
                ? 'scale(1, 1)'
                : `scale(${scale}, ${scale})`,
            transformOrigin: '0 50%',
            transition: animate ? 'transform 0.3s' : '',
            transitionTimingFunction: animate ? 'ease-out' : '',
        };

        return <span style={style} onClick={this.handleClick}>
            {this.props.children}
        </span>;
    },
});

module.exports = Zoomable;
