/**
 * Component to display an image (or other React components) while the desired
 * image is loading.
 *
 * Derived from
 * https://github.com/hzdg/react-imageloader/blob/master/src/index.js
 * to better suit our environment/build tools. Additionally, this one does
 * not introduce a wrapper element, which makes styling easier.
 */

const React = require("react");

const {PropTypes} = React;

const Status = {
    PENDING: 'pending',
    LOADING: 'loading',
    LOADED: 'loaded',
    FAILED: 'failed',
};


const ImageLoader = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node,
        ]),
        imgProps: PropTypes.any,
        onError: PropTypes.func,
        onLoad: PropTypes.func,

        // When the DOM updates to replace the preloader with the image, or
        // vice-versa, we trigger this callback.
        onUpdate: PropTypes.func,

        preloader: PropTypes.func,
        src: PropTypes.string,
    },

    getInitialState: function(props) {
        return {status: this.props.src ? Status.LOADING : Status.PENDING};
    },

    componentDidMount: function() {
        if (this.state.status === Status.LOADING) {
            this.createLoader();
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.props.src !== nextProps.src) {
            this.setState({
                status: nextProps.src ? Status.LOADING : Status.PENDING,
            });
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.status === Status.LOADING && !this.img) {
            this.createLoader();
        }

        if (prevState.status !== this.state.status) {
            this.props.onUpdate();
        }
    },

    componentWillUnmount: function() {
        this.destroyLoader();
    },

    createLoader: function() {
        this.destroyLoader();  // We can only have one loader at a time.

        this.img = new Image();
        this.img.onload = this.handleLoad;
        this.img.onerror = this.handleError;
        this.img.src = this.props.src;
    },

    destroyLoader: function() {
        if (this.img) {
            this.img.onload = null;
            this.img.onerror = null;
            this.img = null;
        }
    },

    handleLoad: function(event) {
        this.destroyLoader();
        this.setState({status: Status.LOADED});

        if (this.props.onLoad) {
            this.props.onLoad(event);
        }
    },

    handleError: function(error) {
        this.destroyLoader();
        this.setState({status: Status.FAILED});

        if (this.props.onError) {
            this.props.onError(error);
        }
    },

    renderImg: function() {
        const {src, imgProps} = this.props;
        const props = {src};

        for (const k in imgProps) {
            if (imgProps.hasOwnProperty(k)) {
                props[k] = imgProps[k];
            }
        }

        return <img {...props} />;
    },

    render: function() {
        switch (this.state.status) {
            case Status.LOADED:
                return this.renderImg();

            case Status.FAILED:
                if (this.props.children) {
                    return this.props.children;
                }
                break;
            default:
                if (this.props.preloader) {
                    return this.props.preloader();
                }
        }
        return null;
    },
});

module.exports = ImageLoader;
