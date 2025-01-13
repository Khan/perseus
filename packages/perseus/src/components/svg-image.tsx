/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/no-unsafe */
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import classNames from "classnames";
import $ from "jquery";
import * as React from "react";
import _ from "underscore";

import {getDependencies} from "../dependencies";
import Util from "../util";
import {loadGraphie} from "../util/graphie-utils";
import * as Zoom from "../zoom";

import FixedToResponsive from "./fixed-to-responsive";
import Graphie from "./graphie";
import ImageLoader from "./image-loader";

import type {ImageProps} from "./image-loader";
import type {Coord} from "../interactive2/types";
import type {Alignment, Dimensions} from "../types";
import type {Size} from "@khanacademy/perseus-core";

// Minimum image width to make an image appear as zoomable.
const ZOOMABLE_THRESHOLD = 700;

function isImageProbablyPhotograph(imageUrl) {
    // TODO(david): Do an inventory to refine this heuristic. For example, what
    //     % of .png images are illustrations?
    return /\.(jpg|jpeg)$/i.test(imageUrl);
}

function defaultPreloader(dimensions: Dimensions) {
    return (
        <span
            style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                minWidth: "20px",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <CircularSpinner size="medium" />
        </span>
    );
}

type Props = {
    allowFullBleed?: boolean;
    alt: string;
    constrainHeight?: boolean;
    extraGraphie?: {
        box: Size;
        range: [Coord, Coord];
        labels: ReadonlyArray<any>;
    };
    height?: number;
    /**
     * When the DOM updates to replace the preloader with the image, or
     * vice-versa, we trigger this callback.
     */
    onUpdate: () => void;
    /**
     * If alt is provided, DO NOT set aria-hidden=true unless this override flag
     * is set.
     */
    overrideAriaHidden?: boolean;
    preloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * By default, this component attempts to be responsive whenever
     * possible (specifically, when width and height are passed in).
     *
     * You can expliclty force unresponsive behavior by *either*
     * not passing in width/height *or* setting this prop to false.
     *
     * The difference is that forcing via this prop will result in
     * explicit width and height styles being set on the rendered
     * component.
     */
    responsive: boolean;
    scale: number;
    src: string;
    title?: string;
    trackInteraction?: () => void;
    width?: number;
    /**
     * Whether clicking this image will allow it to be fully zoomed in to
     * its original size on click, and allow the user to scroll in that
     * state. This also does some hacky viewport meta tag changing to
     * ensure this works on mobile devices, so I (david@) don't recommend
     * enabling this on desktop yet.
     */
    zoomToFullSizeOnMobile?: boolean;
    /**
     * If provided, use AssetContext.Consumer, see renderer.jsx.
     * If not, it defaults to a no-op.
     */
    setAssetStatus: (assetKey: string, loaded: boolean) => void;
};

type DefaultProps = {
    constrainHeight: NonNullable<Props["constrainHeight"]>;
    onUpdate: NonNullable<Props["onUpdate"]>;
    responsive: NonNullable<Props["responsive"]>;
    scale: NonNullable<Props["scale"]>;
    setAssetStatus: NonNullable<Props["setAssetStatus"]>;
    src: NonNullable<Props["src"]>;
    zoomToFullSizeOnMobile: NonNullable<Props["zoomToFullSizeOnMobile"]>;
};

type Label = {
    coordinates: ReadonlyArray<any>;
    content: string;
    alignment: Alignment;
    typesetAsMath: boolean;
};

type LabelsRenderedMap = {
    [label: string]: boolean;
};

type State = {
    // For labeled SVGs, when both dataLoaded and imageLoaded are true,
    // indicates that loading has completed.
    dataLoaded: boolean;
    imageDimensions: [number, number] | null | undefined;
    // Used to indicate when a non-labeled SVG image is finished loading
    // and for labeled SVGs, indicates that it's safe to set up the graphie
    // containing the labels.
    imageLoaded: boolean;
    // Some graphies have labels which are rendered after the main image is
    // loaded.  This object keeps track of whether those labels have been
    // rendered.
    labelsRendered: LabelsRenderedMap;
    labelDataIsLocalized: boolean;
    labels: ReadonlyArray<Label>;
    range: [Coord, Coord];
};

class SvgImage extends React.Component<Props, State> {
    _isMounted: boolean;

    static defaultProps: DefaultProps = {
        constrainHeight: false,
        onUpdate: () => {},
        responsive: true,
        src: "",
        scale: 1,
        zoomToFullSizeOnMobile: false,
        setAssetStatus: (src: string, status: boolean) => {},
    };

    constructor(props: Props) {
        super(props);
        props.setAssetStatus(props.src, false);

        this._isMounted = false;

        this.state = {
            imageLoaded: false,
            imageDimensions: null,
            dataLoaded: false,
            labelDataIsLocalized: false,
            labels: [],
            labelsRendered: {},
            range: [[0, 0], [0, 0] as Coord],
        };
    }

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        if (Util.isLabeledSVG(this.props.src)) {
            this.loadResources();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (this.props.src !== nextProps.src) {
            this.setState({
                imageLoaded: false,
                dataLoaded: false,
            });
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        // If the props changed, we definitely need to update
        if (!_.isEqual(this.props, nextProps)) {
            return true;
        }

        const wasLoaded = this.isLoadedInState(this.state);
        const nextLoaded = this.isLoadedInState(nextState);

        return wasLoaded !== nextLoaded;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const wasLoaded = this.isLoadedInState(prevState);
        const isLoaded = this.isLoadedInState(this.state);

        if (Util.isLabeledSVG(this.props.src) && !isLoaded) {
            this.loadResources();
        }

        if (!wasLoaded && isLoaded) {
            this.props.setAssetStatus(this.props.src, true);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // Check if all of the resources are loaded in a given state
    isLoadedInState(state: State): boolean {
        return Util.isLabeledSVG(this.props.src)
            ? state.imageLoaded && state.dataLoaded
            : state.imageLoaded;
    }

    loadResources() {
        loadGraphie(this.props.src, (data, localized) => {
            if (this._isMounted && data.labels && data.range) {
                const labelsRendered: LabelsRenderedMap = {};
                data.labels.forEach((label) => {
                    labelsRendered[label.content] = false;
                });

                this.setState({
                    dataLoaded: true,
                    labelDataIsLocalized: localized,
                    labelsRendered,
                    labels: data.labels,
                    range: data.range,
                });
            }
        });
    }

    sizeProvided(): boolean {
        return this.props.width != null && this.props.height != null;
    }

    onImageLoad: () => void = () => {
        // Only need to do this if rendering a Graphie
        if (this.sizeProvided()) {
            // If width and height are provided, we don't need to calculate the
            // size ourselves
            this.setState({
                imageLoaded: true,
            });
        } else {
            Util.getImageSize(this.props.src, (width, height) => {
                if (this._isMounted) {
                    this.setState({
                        imageLoaded: true,
                        imageDimensions: [width, height],
                    });
                }
            });
        }
    };

    setupGraphie: (graphie?: any, options?: any) => void = (
        graphie: any,
        options: any,
    ) => {
        _.map(options.labels, (labelData) => {
            const {JIPT} = getDependencies();
            if (JIPT.useJIPT && this.state.labelDataIsLocalized) {
                // If we're using JIPT translation and we got proper JIPT tags,
                // render the labels as plain text (so JIPT can find them) and
                // add some extra properties to the element so we can properly
                // re-render the label once it is replaced with translated
                // text.
                const elem = graphie.label(
                    labelData.coordinates,
                    labelData.content,
                    labelData.alignment,
                    false,
                );

                getDependencies().svgImageJiptLabels.addLabel(
                    elem,
                    labelData.typesetAsMath,
                );
            } else if (labelData.coordinates) {
                // Create labels from the data
                // TODO(charlie): Some erroneous labels are being sent down
                // without coordinates. They don't seem to have any content, so
                // it seems fine to just ignore them (rather than error), but
                // we should figure out why this is happening.

                // 'styling' - When a default scale (1) is used,
                //     setting the font size to 100% is redundant.
                // Also, setting the font size to 100% can counteract other scale-based styling.
                // Therefore, when the scale is not applicable,
                //     we set the value to 'null' so that no additional styling will be set.
                const styling =
                    this.props.scale !== 1
                        ? {"font-size": 100 * this.props.scale + "%"}
                        : null;
                const label = graphie.label(
                    labelData.coordinates,
                    labelData.content,
                    labelData.alignment,
                    labelData.typesetAsMath,
                    styling,
                );

                // Convert absolute positioning css from pixels to percentages
                // TODO(alex): Dynamically resize font-size as well. This
                // almost certainly means listening to throttled window resize
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
                const svgHeight = (this.props.height || 0) * this.props.scale;
                const svgWidth = (this.props.width || 0) * this.props.scale;
                label.css({
                    // @ts-expect-error - TS2531 - Object is possibly 'null'.
                    top: (labelTop / svgHeight) * 100 + "%",
                    // @ts-expect-error - TS2531 - Object is possibly 'null'.
                    left: (labelLeft / svgWidth) * 100 + "%",
                });

                // Add back the styles to each of the labels
                _.each(labelData.style, (styleValue, styleName) => {
                    label.css(styleName, styleValue);
                });
            }
            this.setState({
                labelsRendered: {
                    ...this.state.labelsRendered,
                    [labelData.content]: true,
                },
            });
        });
    };

    // Try to parse a CSS value as pixels. Returns null if the parameter string
    // does not contain a number followed by "px".
    _tryGetPixels(value: string): null | number {
        value = value || "";
        // While this doesn't check that there are no other alphabetical
        // characters prior to "px", that should be taken care of by the DOM,
        // which won't accept invalid units.
        if (!value.endsWith("px")) {
            return null;
        }
        // parseFloat() ignores trailing non-numerical characters.
        return parseFloat(value) || null;
    }

    _handleZoomClick: (e: React.SyntheticEvent) => void = (
        e: React.SyntheticEvent,
    ) => {
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
            // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
            $image.width() < this.props.width ||
            this.props.zoomToFullSizeOnMobile
        ) {
            Zoom.ZoomService.handleZoomClick(
                e,
                this.props.zoomToFullSizeOnMobile,
            );
        }
        this.props.trackInteraction?.();
    };

    handleUpdate: (status: string) => void = (status: string) => {
        this.props.onUpdate();
        // NOTE: Labeled SVG images use this.onImageLoad to set imageLoaded
        // to true and we only use the imageLoaded state when isLabeledSVG
        // is true setting imageLoaded true here shouldn't cause issues.
        if (!Util.isLabeledSVG(this.props.src) && status === "loaded") {
            this.setState({imageLoaded: true});
        }
    };

    render():
        | React.ReactElement<React.ComponentProps<"div">>
        | React.ReactNode {
        const imageSrc = this.props.src;

        // Props to send to all images
        const imageProps: ImageProps = {
            alt: this.props.alt,
            title: this.props.title,
        };

        const width = this.props.width && this.props.width * this.props.scale;
        const height =
            this.props.height && this.props.height * this.props.scale;
        const dimensions = {width, height} as const;

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
        if (!Util.isLabeledSVG(imageSrc)) {
            if (responsive) {
                const wrapperClasses = classNames({
                    zoomable: (width || 0) > ZOOMABLE_THRESHOLD,
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
                            onUpdate={this.handleUpdate}
                        />
                        {extraGraphie}
                    </FixedToResponsive>
                );
            }
            imageProps.style = dimensions;
            return (
                <ImageLoader
                    src={imageSrc}
                    preloader={preloader}
                    imgProps={imageProps}
                    onUpdate={this.handleUpdate}
                />
            );
        }

        const imageUrl = Util.getSvgUrl(imageSrc);

        let graphie;
        // Since we only want to do the graphie setup once, we only render the
        // graphie once everything is loaded
        if (this.isLoadedInState(this.state)) {
            // Use the provided width and height to size the graphie if
            // possible, otherwise use our own calculated size
            let box;
            if (this.sizeProvided()) {
                box = [width, height];
            } else if (this.state.imageDimensions) {
                box = [
                    this.state.imageDimensions[0] * this.props.scale,
                    this.state.imageDimensions[1] * this.props.scale,
                ];
            } else {
                throw new PerseusError(
                    "svg-image has no dimensions",
                    Errors.InvalidInput,
                    {
                        metadata: {src: this.props.src},
                    },
                );
            }

            // TODO: the "40" scale factor was introduced in D14974 but is not
            // documented where it came from.
            graphie = (
                <Graphie
                    // eslint-disable-next-line react/no-string-refs
                    ref="graphie"
                    box={box}
                    scale={[40 * this.props.scale, 40 * this.props.scale]}
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
                        onUpdate={this.handleUpdate}
                        preloader={preloader}
                        imgProps={imageProps}
                    />
                    {graphie}
                    {extraGraphie}
                </FixedToResponsive>
            );
        }
        imageProps.style = dimensions;
        return (
            <div className="unresponsive-svg-image" style={dimensions}>
                <ImageLoader
                    src={imageUrl}
                    onLoad={this.onImageLoad}
                    onUpdate={this.handleUpdate}
                    preloader={preloader}
                    imgProps={imageProps}
                />
                {graphie}
            </div>
        );
    }
}

export default SvgImage;
