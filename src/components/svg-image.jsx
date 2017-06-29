/* globals KA */
const classNames = require("classnames");
const React = require("react");
const $ = require("jquery");
const _ = require("underscore");

const FixedToResponsive = require("../components/fixed-to-responsive.jsx");
const Graphie = require("../components/graphie.jsx");
const ImageLoader = require("../components/image-loader.jsx");
const Util = require("../util.js");
const Zoom = require("../zoom.js");

// Minimum image width to make an image appear as zoomable.
const ZOOMABLE_THRESHOLD = 700;

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
const labelDataCache = {};

// Write our own JSONP handler because all the other ones don't do things we
// need.
const doJSONP = function(url, options) {
    options = {
        callbackName: "callback",
        success: $.noop,
        error: $.noop,
        ...options,
    };

    // Create the script
    const script = document.createElement("script");
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

const svgLabelsRegex = /^web\+graphie\:/;
const hashRegex = /\/([^/]+)$/;

function isLabeledSVG(url) {
    return svgLabelsRegex.test(url);
}

function isImageProbablyPhotograph(imageUrl) {
    // TODO(david): Do an inventory to refine this heuristic. For example, what
    //     % of .png images are illustrations?
    return /\.(jpg|jpeg)$/i.test(imageUrl);
}

// For each svg+labels, there are two urls we need to download from. This gets
// the base url without the suffix, and `getSvgUrl` and `getDataUrl` apply
// appropriate suffixes to get the image and other data
function getBaseUrl(url) {
    // Force HTTPS connection unless we're on HTTP, so that IE works.
    const protocol = window.location.protocol === "http:" ? "http:" : "https:";

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

function shouldRenderJipt() {
    return typeof KA !== "undefined" && KA.language === "en-pt";
}

const specialChars = {
    // escaped: original
    "\\t": "\t",
    "\\n": "\n",
    "\\r": "\r",
    "\\\\": "\\",
};

const rEscapedChars = /\\t|\\n|\\r|\\\\/g;

const jiptLabels = [];
if (shouldRenderJipt()) {
    if (!KA.jipt_dom_insert_checks) {
        KA.jipt_dom_insert_checks = [];
    }

    KA.jipt_dom_insert_checks.push(function(text, node, attribute) {
        const index = $(node).data("jipt-label-index");
        if (node && typeof index !== "undefined") {
            const {label, useMath} = jiptLabels[index];

            label.text("");

            text = text.replace(rEscapedChars, function(ch) {
                return specialChars[ch];
            });

            if (useMath) {
                const mathRegex = /^\$(.*)\$$/;
                const match = text.match(mathRegex);
                const mathText = match
                    ? match[1]
                    : "\\color{red}{\\text{Invalid Math}}";
                label.processMath(mathText, true);
            } else {
                label.processText(text);
            }

            return false;
        }
        return text;
    });
}

// A regex to split at the last / of a URL, separating the base part from the
// hash. This is used to create the localized label data URLs.
const splitHashRegex = /\/(?=[^/]+$)/;

function getLocalizedDataUrl(url) {
    if (typeof KA !== "undefined") {
        // Parse out the hash and base so that we can insert the locale
        // directory in the middle.
        const [base, hash] = getBaseUrl(url).split(splitHashRegex);
        return `${base}/${KA.language}/${hash}-data.json`;
    } else {
        return getDataUrl(url);
    }
}

// Get the hash from the url, which is just the filename
function getUrlHash(url) {
    const match = url.match(hashRegex);

    return match && match[1];
}

function defaultPreloader() {
    return React.DOM.span({
        style: {
            background: "url(/images/spinner.gif) no-repeat",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            minWidth: "20px",
        },
    });
}

const SvgImage = React.createClass({
    propTypes: {
        allowFullBleed: React.PropTypes.bool,
        alt: React.PropTypes.string,
        constrainHeight: React.PropTypes.bool,

        extraGraphie: React.PropTypes.shape({
            box: React.PropTypes.array.isRequired,
            range: React.PropTypes.array.isRequired,
            labels: React.PropTypes.array.isRequired,
        }),

        height: React.PropTypes.number,

        // When the DOM updates to replace the preloader with the image, or
        // vice-versa, we trigger this callback.
        onUpdate: React.PropTypes.func,

        preloader: React.PropTypes.func,

        // By default, this component attempts to be responsive whenever
        // possible (specifically, when width and height are passed in).
        // You can expliclty force unresponsive behavior by *either*
        // not passing in width/height *or* setting this prop to false.
        // The difference is that forcing via this prop will result in
        // explicit width and height styles being set on the rendered
        // component.
        responsive: React.PropTypes.bool,

        scale: React.PropTypes.number,
        src: React.PropTypes.string.isRequired,
        title: React.PropTypes.string,
        trackInteraction: React.PropTypes.func,
        width: React.PropTypes.number,

        // Whether clicking this image will allow it to be fully zoomed in to
        // its original size on click, and allow the user to scroll in that
        // state. This also does some hacky viewport meta tag changing to
        // ensure this works on mobile devices, so I (david@) don't recommend
        // enabling this on desktop yet.
        zoomToFullSizeOnMobile: React.PropTypes.bool,
    },

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
        },
    },

    getDefaultProps: function() {
        return {
            constrainHeight: false,
            onUpdate: () => {},
            responsive: true,
            src: "",
            scale: 1,
            zoomToFullSizeOnMobile: false,
        };
    },

    getInitialState: function() {
        return {
            imageLoaded: false,
            imageDimensions: null,
            dataLoaded: false,
            labelDataIsLocalized: false,
            labels: [],
            range: [[0, 0], [0, 0]],
        };
    },

    componentDidMount: function() {
        if (isLabeledSVG(this.props.src)) {
            this.loadResources();
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

    shouldComponentUpdate: function(nextProps, nextState) {
        // If the props changed, we definitely need to update
        if (!_.isEqual(this.props, nextProps)) {
            return true;
        }

        if (!isLabeledSVG(nextProps.src)) {
            return false;
        }

        const wasLoaded = this.isLoadedInState(this.state);
        const nextLoaded = this.isLoadedInState(nextState);

        return wasLoaded !== nextLoaded;
    },

    componentDidUpdate: function() {
        if (isLabeledSVG(this.props.src) && !this.isLoadedInState(this.state)) {
            this.loadResources();
        }
    },

    // Check if all of the resources are loaded in a given state
    isLoadedInState: function(state) {
        return state.imageLoaded && state.dataLoaded;
    },

    loadResources: function() {
        const hash = getUrlHash(this.props.src);

        // We can't make multiple jsonp calls to the same file because their
        // callbacks will collide with each other. Instead, we cache the data
        // and only make the jsonp calls once.
        if (labelDataCache[hash]) {
            if (labelDataCache[hash].loaded) {
                const {data, localized} = labelDataCache[hash];
                this.onDataLoaded(data, localized);
            } else {
                labelDataCache[hash].dataCallbacks.push(this.onDataLoaded);
            }
        } else {
            const cacheData = {
                loaded: false,
                dataCallbacks: [this.onDataLoaded],
                data: null,
                localized: shouldUseLocalizedData(),
            };

            labelDataCache[hash] = cacheData;

            const retrieveData = (url, errorCallback) => {
                doJSONP(url, {
                    callbackName: "svgData" + hash,
                    success: data => {
                        cacheData.data = data;
                        cacheData.loaded = true;

                        _.each(cacheData.dataCallbacks, callback => {
                            callback(cacheData.data, cacheData.localized);
                        });
                    },
                    error: errorCallback,
                });
            };

            if (shouldUseLocalizedData()) {
                retrieveData(
                    getLocalizedDataUrl(this.props.src),
                    (x, status, error) => {
                        cacheData.localized = false;

                        // If there is isn't any localized data, fall back to
                        // the original, unlocalized data
                        retrieveData(
                            getDataUrl(this.props.src),
                            (x, status, error) => {
                                 // eslint-disable-next-line no-console
                                console.error(
                                    "Data load failed:",
                                    getDataUrl(this.props.src),
                                    error
                                );
                            }
                        );
                    }
                );
            } else {
                retrieveData(getDataUrl(this.props.src), (x, status, error) => {
                    // eslint-disable-next-line no-console
                    console.error(
                        "Data load failed:",
                        getDataUrl(this.props.src),
                        error
                    );
                });
            }
        }
    },

    onDataLoaded: function(data, localized) {
        if (this.isMounted() && data.labels && data.range) {
            this.setState({
                dataLoaded: true,
                labelDataIsLocalized: localized,
                labels: data.labels,
                range: data.range,
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
                imageLoaded: true,
            });
        } else {
            Util.getImageSize(this.props.src, (width, height) => {
                if (this.isMounted()) {
                    this.setState({
                        imageLoaded: true,
                        imageDimensions: [width, height],
                    });
                }
            });
        }
    },

    setupGraphie: function(graphie, options) {
        _.map(options.labels, labelData => {
            if (shouldRenderJipt() && this.state.labelDataIsLocalized) {
                // If we're using JIPT translation and we got proper JIPT tags,
                // render the labels as plain text (so JIPT can find them) and
                // add some extra properties to the element so we can properly
                // re-render the label once it is replaced with translated
                // text.
                const elem = graphie.label(
                    labelData.coordinates,
                    labelData.content,
                    labelData.alignment,
                    false
                );

                $(elem).data("jipt-label-index", jiptLabels.length);
                jiptLabels.push({
                    label: elem,
                    useMath: labelData.typesetAsMath,
                });
            } else if (labelData.coordinates) {
                // Create labels from the data
                // TODO(charlie): Some erroneous labels are being sent down
                // without coordinates. They don't seem to have any content, so
                // it seems fine to just ignore them (rather than error), but
                // we should figure out why this is happening.
                const label = graphie.label(
                    labelData.coordinates,
                    labelData.content,
                    labelData.alignment,
                    labelData.typesetAsMath,
                    {"font-size": 100 * this.props.scale + "%"}
                );

                // Convert absolute positioning css from pixels to percentages
                // TODO(alex): Dynamically resize font-size as well. This
                // almost certainly means listening to throttled window.resize
                // events.
                const labelStyle = label[0].style;
                let labelTop = this._tryGetPixels(labelStyle.top);
                let labelLeft = this._tryGetPixels(labelStyle.left);
                if (labelTop === null || labelLeft === null) {
                    // Graphie labels are supposed to have an explicit position,
                    // but to be on the safe side, let's fall back to using
                    // jQuery's position(). The reason we're not always using
                    // this is that in the presence of CSS transforms, it will
                    // give the rendered position, which may be scaled and
                    // not equal to the explicitly specified one.
                    const labelPosition = label.position();
                    labelTop = labelPosition.top;
                    labelLeft = labelPosition.left;
                }
                const svgHeight = this.props.height * this.props.scale;
                const svgWidth = this.props.width * this.props.scale;
                label.css({
                    top: labelTop / svgHeight * 100 + "%",
                    left: labelLeft / svgWidth * 100 + "%",
                });

                // Add back the styles to each of the labels
                _.each(labelData.style, (styleValue, styleName) => {
                    label.css(styleName, styleValue);
                });
            }
        });
    },

    // Try to parse a CSS value as pixels. Returns null if the parameter string
    // does not contain a number followed by "px".
    _tryGetPixels: function(value) {
        value = value || "";
        // While this doesn't check that there are no other alphabetical
        // characters prior to "px", that should be taken care of by the DOM,
        // which won't accept invalid units.
        if (!value.endsWith("px")) {
            return null;
        }
        // parseFloat() ignores trailing non-numerical characters.
        return parseFloat(value) || null;
    },

    _handleZoomClick: function(e) {
        const $image = $(e.target);

        // It's possible that the image is already displayed at its
        // full size, but we don't really know that until we get a chance
        // to measure it (just now, after the user clicks). We only zoom
        // if there's more image to be shown.
        //
        // TODO(kevindangoor) If the window is narrow and the image is
        // already displayed as wide as possible, we may want to do
        // nothing in that case as well. Figuring this out correctly
        // likely required accounting for the image alignment and margins.
        if (
            $image.width() < this.props.width ||
            this.props.zoomToFullSizeOnMobile
        ) {
            Zoom.ZoomService.handleZoomClick(
                e,
                this.props.zoomToFullSizeOnMobile
            );
        }
        this.props.trackInteraction && this.props.trackInteraction();
    },

    render: function() {
        const imageSrc = this.props.src;

        // Props to send to all images
        const imageProps = {
            alt: this.props.alt,
            title: this.props.title,
        };

        const width = this.props.width && this.props.width * this.props.scale;
        const height =
            this.props.height && this.props.height * this.props.scale;
        const dimensions = {
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
        const responsive = this.props.responsive && !!(width && height);

        // An additional <Graphie /> may be inserted after the image/graphie
        // pair. Only used by the image widget, for its legacy labels support.
        // Note that since the image widget always provides width and height
        // data, extraGraphie can be ignored for unresponsive images.
        // TODO(alex): Convert all existing uses of that to web+graphie. This
        // is tricky because web+graphie doesn't support labels on non-graphie
        // images.
        let extraGraphie;
        if (this.props.extraGraphie && this.props.extraGraphie.labels.length) {
            extraGraphie = (
                <Graphie
                    box={this.props.extraGraphie.box}
                    range={this.props.extraGraphie.range}
                    options={{labels: this.props.extraGraphie.labels}}
                    responsive={true}
                    addMouseLayer={false}
                    setup={this.setupGraphie}
                />
            );
        }

        // If preloader is undefined, we use the default. If it's
        // null, there will be no preloader in use.
        const preloaderBaseFunc =
            this.props.preloader === undefined
                ? defaultPreloader
                : this.props.preloader;

        const preloader = preloaderBaseFunc
            ? () => preloaderBaseFunc(dimensions)
            : null;

        // Just use a normal image if a normal image is provided
        if (!isLabeledSVG(imageSrc)) {
            if (responsive) {
                const wrapperClasses = classNames({
                    zoomable: width > ZOOMABLE_THRESHOLD,
                    "svg-image": true,
                });

                imageProps.onClick = this._handleZoomClick;

                return (
                    <FixedToResponsive
                        className={wrapperClasses}
                        width={width}
                        height={height}
                        constrainHeight={this.props.constrainHeight}
                        allowFullBleed={
                            this.props.allowFullBleed &&
                            isImageProbablyPhotograph(imageSrc)
                        }
                    >
                        <ImageLoader
                            src={imageSrc}
                            imgProps={imageProps}
                            preloader={preloader}
                            onUpdate={this.props.onUpdate}
                        />
                        {extraGraphie}
                    </FixedToResponsive>
                );
            } else {
                imageProps.style = dimensions;
                return (
                    <ImageLoader
                        src={imageSrc}
                        preloader={preloader}
                        imgProps={imageProps}
                        onUpdate={this.props.onUpdate}
                    />
                );
            }
        }

        const imageUrl = getSvgUrl(imageSrc);

        let graphie;
        // Since we only want to do the graphie setup once, we only render the
        // graphie once everything is loaded
        if (this.isLoadedInState(this.state)) {
            // Use the provided width and height to size the graphie if
            // possible, otherwise use our own calculated size
            let box;
            if (this.sizeProvided()) {
                box = [width, height];
            } else {
                box = [
                    this.state.imageDimensions[0] * this.props.scale,
                    this.state.imageDimensions[1] * this.props.scale,
                ];
            }

            const scale = [40 * this.props.scale, 40 * this.props.scale];

            graphie = (
                <Graphie
                    ref="graphie"
                    box={box}
                    scale={scale}
                    range={this.state.range}
                    options={_.pick(this.state, "labels")}
                    responsive={responsive}
                    addMouseLayer={false}
                    setup={this.setupGraphie}
                />
            );
        }

        if (responsive) {
            return (
                <FixedToResponsive
                    className="svg-image"
                    width={width}
                    height={height}
                    constrainHeight={this.props.constrainHeight}
                >
                    <ImageLoader
                        src={imageUrl}
                        onLoad={this.onImageLoad}
                        onUpdate={this.props.onUpdate}
                        preloader={preloader}
                        imgProps={imageProps}
                    />
                    {graphie}
                    {extraGraphie}
                </FixedToResponsive>
            );
        } else {
            imageProps.style = dimensions;
            return (
                <div className="unresponsive-svg-image" style={dimensions}>
                    <ImageLoader
                        src={imageUrl}
                        onLoad={this.onImageLoad}
                        onUpdate={this.props.onUpdate}
                        preloader={preloader}
                        imgProps={imageProps}
                    />
                    {graphie}
                </div>
            );
        }
    },
});

module.exports = SvgImage;
