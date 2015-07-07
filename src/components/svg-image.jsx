var _ = require("underscore");

var FixedToResponsive = require("../components/fixed-to-responsive.jsx");
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

// Write our own JSONP handler because all the other ones don't do things we
// need.
var doJSONP = function(url, options) {
    options = _.extend({}, {
        callbackName: "callback",
        success: $.noop,
        error: $.noop
    }, options);

    // Create the script
    var script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("src", url);

    // A cleanup function to run when we're done.
    function cleanup() {
        document.head.removeChild(script);
        delete window[options.callbackName];
    }

    // Add the global callback.
    window[options.callbackName] = function() {
        cleanup();
        options.success.apply(null, arguments);
    };

    // Add the error handler.
    script.addEventListener("error", function() {
        cleanup();
        options.error.apply(null, arguments);
    });

    // Insert the script to start the download.
    document.head.appendChild(script);
};

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

function shouldUseLocalizedData() {
    // TODO(emily): Remove this depenency on `KA` and pass it down with
    // Perseus' initialization. (Also used in renderer.jsx)
    return typeof KA !== "undefined" && KA.language !== "en";
}

// A regex to split at the last / of a URL, separating the base part from the
// hash. This is used to create the localized label data URLs.
var splitHashRegex = /\/(?=[^/]+$)/;

function getLocalizedDataUrl(url) {
    if (typeof KA !== "undefined") {
        // Parse out the hash and base so that we can insert the locale
        // directory in the middle.
        var [base, hash] = getBaseUrl(url).split(splitHashRegex);
        return `${base}/${KA.language}/${hash}-data.json`;
    } else {
        return getDataUrl(url);
    }
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
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        scale: React.PropTypes.number,

        // By default, this component attempts to be responsive whenever
        // possible (specifically, when width and height are passed in).
        // You can expliclty force unresponsive behavior by *either*
        // not passing in width/height *or* setting this prop to false.
        // The difference is that forcing via this prop will result in
        // explicit width and height styles being set on the rendered
        // component.
        responsive: React.PropTypes.bool,

        extraGraphie: React.PropTypes.shape({
            box: React.PropTypes.array.isRequired,
            range: React.PropTypes.array.isRequired,
            labels: React.PropTypes.array.isRequired,
        }),
    },

    getDefaultProps: function() {
        return {
            src: "",
            scale: 1,
            responsive: true,
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
        var dimensions = {
            width: width,
            height: height,
        };

        // To make an image responsive, we need to know what its width and
        // height are in advance (before inserting it into the DOM) so that we
        // can ensure it doesn't grow past those limits. We don't always have
        // this information, especially in places where <Renderer /> is used
        // to render inline Markdown images within a widget. See Radio, Sorter,
        // Matcher, etc.
        // TODO(alex): Make all of those image rendering locations aware of
        // width+height so that they too can render responsively.
        var responsive = this.props.responsive && !!(width && height);

        // An additional <Graphie /> may be inserted after the image/graphie
        // pair. Only used by the image widget, for its legacy labels support.
        // Note that since the image widget always provides width and height
        // data, extraGraphie can be ignored for unresponsive images.
        // TODO(alex): Convert all existing uses of that to web+graphie. This
        // is tricky because web+graphie doesn't support labels on non-graphie
        // images.
        var extraGraphie;
        if (this.props.extraGraphie && this.props.extraGraphie.labels.length) {
            extraGraphie = <Graphie
                box={this.props.extraGraphie.box}
                range={this.props.extraGraphie.range}
                options={{labels: this.props.extraGraphie.labels}}
                responsive={true}
                setup={this.setupGraphie} />;
        }

        // Just use a normal image if a normal image is provided
        if (!isLabeledSVG(this.props.src)) {
            if (responsive) {
                return <FixedToResponsive
                            className="svg-image"
                            width={width}
                            height={height}>
                    <img src={this.props.src} {...imageProps} />
                    {extraGraphie}
                </FixedToResponsive>;
            } else {
                return <img src={this.props.src}
                            style={dimensions}
                            {...imageProps} />;
            }
            
        }

        var imageUrl = getSvgUrl(this.props.src);

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
                responsive={responsive}
                setup={this.setupGraphie} />;
        }

        if (responsive) {
            return <FixedToResponsive
                        className="svg-image"
                        width={width}
                        height={height}>
                <img
                    src={imageUrl}
                    onLoad={this.onImageLoad}
                    {...imageProps} />
                {graphie}
                {extraGraphie}
            </FixedToResponsive>;
        } else {
            return <div
                        className="unresponsive-svg-image"
                        style={dimensions} >
                <img
                    src={imageUrl}
                    onLoad={this.onImageLoad}
                    style={dimensions}
                    {...imageProps} />
                {graphie}
            </div>;
        }
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

            var retrieveData = (url, errorCallback) => {
                doJSONP(url, {
                    callbackName: "svgData" + hash,
                    success: (data) => {
                        cacheData.data = data;
                        cacheData.loaded = true;

                        _.each(cacheData.dataCallbacks, callback => {
                            callback(cacheData.data);
                        });
                    },
                    error: errorCallback
                });
            };

            if (shouldUseLocalizedData()) {
                retrieveData(
                    getLocalizedDataUrl(this.props.src),
                    (x, status, error) => {
                        // If there is isn't any localized data, fall back to
                        // the original, unlocalized data
                        retrieveData(
                            getDataUrl(this.props.src),
                            (x, status, error) => {
                                console.error(
                                    "Data load failed:",
                                    getDataUrl(this.props.src), error
                                );
                            }
                        );
                    }
                );
            } else {
                retrieveData(
                    getDataUrl(this.props.src),
                    (x, status, error) => {
                        console.error(
                            "Data load failed:",
                            getDataUrl(this.props.src), error
                        );
                    }
                );
            }
        }
    },

    onDataLoaded: function(data) {
        if (this.isMounted()) {
            this.setState({
                dataLoaded: true,
                labels: data.labels,
                range: data.range
            });
        }
    },

    sizeProvided: function() {
        return this.props.width != null && this.props.height != null;
    },

    onImageLoad: function() {
        // Only need to do this if rendering a Graphie
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

            // Convert absolute positioning css from pixels to percentages
            // TODO(alex): Dynamically resize font-size as well. This almost
            // certainly means listening to throttled window.resize events.
            var position = label.position();
            var height = this.props.height * this.props.scale;
            var width = this.props.width * this.props.scale;
            label.css({
                top: position.top / height * 100 + '%',
                left: position.left / width * 100 + '%',
            });
        });
    }
});

module.exports = SvgImage;
