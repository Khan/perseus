var _ = require("underscore");

var Graphie = require("../components/graphie.jsx");
var Util = require("../util.js");

// The global cache of label data. Its format is:
// {
//   hash (e.g. "c21435944d2cf0c8f39d9059cb35836aa701d04a"): {
//     loaded: a boolean of whether the data has been loaded or not
//     dataCallbacks: a list of callbacks to call with the data when the data
//                    is loaded
//     data: the other data for this hash
//   },
//   ...
// }
var labelDataCache = {};

var svgLabelsRegex = /^web\+graphie\:/;
var hashRegex = /\/([^/]+)$/;

function isLabeledSVG(url) {
    return svgLabelsRegex.test(url);
}

// For each svg+labels, there are two urls we need to download from. This gets
// the base url without the suffix, and `getSvgUrl` and `getDataUrl` apply
// appropriate suffixes to get the image and other data
function getBaseUrl(url) {
    // Force HTTPS connection unless we're on HTTP, so that IE works.
    var protocol = window.location.protocol === "http:" ? "http:" : "https:";

    return url.replace(svgLabelsRegex, protocol);
}

function getSvgUrl(url) {
    return getBaseUrl(url) + ".svg";
}

function getDataUrl(url) {
    return getBaseUrl(url) + "-data.json";
}

// Get the hash from the url, which is just the filename
function getUrlHash(url) {
    var match = url.match(hashRegex);

    return match && match[1];
}

var SvgImage = React.createClass({
    statics: {
        // Sometimes other components want to download the actual image e.g. to
        // determine its size. Here, we transform an .svg-labels url into the
        // correct image url, and leave normal image urls alone
        getRealImageUrl: function(url) {
            if (isLabeledSVG(url)) {
                return getSvgUrl(url);
            } else {
                return url;
            }
        }
    },

    propTypes: {
        src: React.PropTypes.string.isRequired,
        alt: React.PropTypes.string,
        title: React.PropTypes.string,
        bottom: React.PropTypes.number,
        left: React.PropTypes.number,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        scale: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            src: "",
            bottom: 0,
            left: 0,
            scale: 1,
        };
    },

    getInitialState: function() {
        return {
            imageLoaded: false,
            imageDimensions: null,
            dataLoaded: false,
            labels: [],
            range: [[0, 0], [0, 0]],
        };
    },

    // Check if all of the resources are loaded in a given state
    isLoadedInState: function(state) {
        return state.imageLoaded && state.dataLoaded;
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // If the props changed, we definitely need to update
        if (!_.isEqual(this.props, nextProps)) {
            return true;
        }

        // If something changed but 
        if (!isLabeledSVG(nextProps.src)) {
            return false;
        }

        var wasLoaded = this.isLoadedInState(this.state);
        var nextLoaded = this.isLoadedInState(nextState);

        return wasLoaded !== nextLoaded;
    },

    render: function() {
        // Props to send to all images
        var imageProps = {
            alt: this.props.alt,
            title: this.props.title
        };

        var width = this.props.width && this.props.width * this.props.scale;
        var height = this.props.height && this.props.height * this.props.scale;

        var style = {
            width: width,
            height: height,
            bottom: this.props.bottom,
            left: this.props.left,
        };

        // Just use a normal image if a normal image is provided
        if (!isLabeledSVG(this.props.src)) {
            return <img style={style}
                        src={this.props.src}
                        {...imageProps} />;
        }

        var imageUrl = getSvgUrl(this.props.src);
        var image = <img style={{
                             width: style.width,
                             height: style.height,
                         }}
                         src={imageUrl}
                         ref="image"
                         onLoad={this.onImageLoad}
                         {...imageProps} />;

        var graphie;
        // Since we only want to do the graphie setup once, we only render the
        // graphie once everything is loaded
        if (this.isLoadedInState(this.state)) {
            // Use the provided width and height to size the graphie if
            // possible, otherwise use our own calculated size
            var box;
            if (this.sizeProvided()) {
                box = [width, height];
            } else {
                box = [this.state.imageDimensions[0] * this.props.scale,
                       this.state.imageDimensions[1] * this.props.scale];
            }

            var scale = [40 * this.props.scale, 40 * this.props.scale];

            graphie = <Graphie
                ref="graphie"
                box={box}
                scale={scale}
                range={this.state.range}
                options={_.pick(this.state, "labels")}
                setup={this.setupGraphie} />;
        }

        return <div className="svg-image"
                    style={style}>
            {graphie}
            {image}
        </div>;
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.props.src !== nextProps.src) {
            this.setState({
                imageLoaded: false,
                dataLoaded: false,
            });
        }
    },

    componentDidMount: function() {
        if (isLabeledSVG(this.props.src)) {
            this.loadResources();
        }
    },

    componentDidUpdate: function() {
        if (isLabeledSVG(this.props.src) &&
            !this.isLoadedInState(this.state)) {
            this.loadResources();
        }
    },

    loadResources: function() {
        var hash = getUrlHash(this.props.src);

        // We can't make multiple jsonp calls to the same file because their
        // callbacks will collide with each other. Instead, we cache the data
        // and only make the jsonp calls once.
        if (labelDataCache[hash]) {
            if (labelDataCache[hash].loaded) {
                this.onDataLoaded(labelDataCache[hash].data);
            } else {
                labelDataCache[hash].dataCallbacks.push(this.onDataLoaded);
            }
        } else {
            var cacheData = {
                loaded: false,
                dataCallbacks: [this.onDataLoaded],
                data: null,
            };

            labelDataCache[hash] = cacheData;

            var dataUrl = getDataUrl(this.props.src);

            $.ajax({
                url: dataUrl,
                dataType: "jsonp",
                jsonp: false,
                jsonpCallback: "svgData" + hash,
                success: data => {
                    cacheData.data = data;
                    cacheData.loaded = true;

                    _.each(cacheData.dataCallbacks, callback => {
                        callback(cacheData.data);
                    });
                },
                error: (x, status, error) => {
                    console.error("Data load failed:", urls.data, error);
                }
            });
        }
    },

    onDataLoaded: function(data) {
        this.setState({
            dataLoaded: true,
            labels: data.labels,
            range: data.range
        });
    },

    sizeProvided: function() {
        return this.props.width != null && this.props.height != null;
    },

    onImageLoad: function() {
        if (this.sizeProvided()) {
            // If width and height are provided, we don't need to calculate the
            // size ourselves
            this.setState({
                imageLoaded: true
            });
        } else {
            Util.getImageSize(this.props.src, (width, height) => {
                this.setState({
                    imageLoaded: true,
                    imageDimensions: [width, height],
                });
            });
        }
    },

    setupGraphie: function(graphie, options) {
        _.map(options.labels, (labelData) => {
            // Create labels from the data
            var label = graphie.label(
                labelData.coordinates,
                labelData.content,
                labelData.alignment,
                labelData.typesetAsMath,
                {"font-size": (100 * this.props.scale) + "%"}
            );

            // Add back the styles to each of the labels
            _.each(labelData.style, (styleValue, styleName) => {
                label.css(styleName, styleValue);
            });
        });
    }
});

module.exports = SvgImage;
