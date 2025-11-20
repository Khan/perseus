/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable jsx-a11y/alt-text, react/no-unsafe */
// TODO(scottgrant): Enable the alt-text eslint rule above.

import * as React from "react";

import {type Dimensions, type PerseusDependenciesV2} from "../types";

import {withDependencies} from "./with-dependencies";

const Status = {
    PENDING: "pending",
    LOADING: "loading",
    LOADED: "loaded",
    FAILED: "failed",
} as const;

export type ImageProps = {
    alt: string;
    title?: string;
    ["aria-hidden"]?: boolean;
    tabIndex?: number;
    style?: Dimensions;
};

type Props = {
    children?: React.ReactNode;
    imgProps: ImageProps;
    onError?: (event: Event) => void;
    onLoad?: (event: Event) => void;
    // When the DOM updates to replace the preloader with the image, or
    // vice-versa, we trigger this callback.
    onUpdate: (status: (typeof Status)[keyof typeof Status]) => void;
    preloader: (() => React.ReactNode) | null | undefined;
    src: string;
    dependencies: PerseusDependenciesV2;
};

type State = {
    status: (typeof Status)[keyof typeof Status];
};

/**
 * Component to display an image (or other React components) while the desired
 * image is loading.
 *
 * Derived from
 * https://github.com/hzdg/react-imageloader/blob/master/src/index.js
 * to better suit our environment/build tools. Additionally, this one does
 * not introduce a wrapper element, which makes styling easier.
 */
class ImageLoader extends React.Component<Props, State> {
    img: HTMLImageElement | null | undefined;

    constructor(props: Props) {
        super(props);
        this.state = {status: props.src ? Status.LOADING : Status.PENDING};
    }

    componentDidMount() {
        if (this.state.status === Status.LOADING) {
            this.createLoader();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (this.props.src !== nextProps.src) {
            this.setState({
                status: nextProps.src ? Status.LOADING : Status.PENDING,
            });
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.state.status === Status.LOADING && !this.img) {
            this.createLoader();
        }

        if (prevState.status !== this.state.status) {
            this.props.onUpdate(this.state.status);
        }
    }

    componentWillUnmount() {
        this.destroyLoader();
    }

    createLoader: () => void = () => {
        this.destroyLoader(); // We can only have one loader at a time.

        this.img = new Image();
        this.img.onload = this.handleLoad;
        // @ts-expect-error: Type 'string | Event' is not assignable to type 'Event'.
        this.img.onerror = this.handleError;
        this.img.src = this.props.src;
    };

    destroyLoader: () => void = () => {
        if (this.img) {
            this.img.onload = null;
            this.img.onerror = null;
            this.img = null;
        }
    };

    handleLoad: (event: Event) => void = (event: Event) => {
        this.destroyLoader();
        this.setState({status: Status.LOADED});

        if (this.props.onLoad) {
            this.props.onLoad(event);
        }
    };

    handleError: (error: Event) => void = (error: Event) => {
        this.destroyLoader();
        this.setState({status: Status.FAILED});

        if (this.props.onError) {
            this.props.onError(error);
        }
    };

    /**
     * If the image is clickable, render a <Clickable> component over the image.
     * Otherwise, render the image itself.
     *
     * This approach is used to ensure that the button and the image remain
     * separate elements in the DOM. This is important for accessibility, as
     * the button and the image should be separate elements for screen readers
     * to identify. This way, the image has the alt text to identify the image
     * content, and the button has the click prompt that informs the user that
     * they can click for some action (i.e. zooming in on the image).
     */
    renderImg: () => React.ReactElement<React.ComponentProps<"img">> = () => {
        const {src, imgProps} = this.props;
        // Destructure to exclude props that shouldn't be on the <img> element

        return (
            <img
                // Class name makes this img findable in Cypress tests.
                className="image-loader-img"
                src={this.props.dependencies.generateUrl({
                    url: src,
                    context: "image_loader:image_url",
                })}
                // Stop the image size from being larger than 100%
                // when width and height are not explicitly provided.
                style={{
                    // Using `display: block` to make sure the image outline
                    // is flush with the image itself. Using a different
                    // display value could cause a 4px gap below images.
                    display: "block",
                    ...(imgProps.style ?? {
                        // Not adding `height` to styles here, because it
                        // gets set automatically based on the width and
                        // aspect ratio of the image. Setting `height: 100%`
                        // could cause the image to stretch vertically in
                        // certain cases (example: images inside markdown
                        // tables in Safari).
                        width: "100%",
                    }),
                }}
                {...imgProps}
            />
        );
    };

    render(): React.ReactNode {
        switch (this.state.status) {
            case Status.LOADED:
                return this.renderImg();

            case Status.FAILED:
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
    }
}

export default withDependencies(ImageLoader);
