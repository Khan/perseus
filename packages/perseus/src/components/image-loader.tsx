/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable jsx-a11y/alt-text, react/no-unsafe */
// TODO(scottgrant): Enable the alt-text eslint rule above.

import * as React from "react";

import {getDependencies} from "../dependencies";

import type {Dimensions} from "../types";

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
    onClick?: (e: React.SyntheticEvent) => void;
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

    renderImg: () => React.ReactElement<React.ComponentProps<"img">> = () => {
        const {src, imgProps} = this.props;
        let onKeyUp;
        let onKeyDown;
        if (imgProps.onClick != null) {
            onKeyUp = (e: React.KeyboardEvent) => {
                // 13 is enter key, 32 is space key
                if (e.keyCode === 13 || e.keyCode === 32) {
                    imgProps.onClick?.(e);
                }
            };
            onKeyDown = (e: React.KeyboardEvent) => {
                // 32 is space key
                if (e.keyCode === 32) {
                    // don't scroll on space when the image is focused
                    e.preventDefault();
                }
            };
        }
        const staticUrl = getDependencies().staticUrl;

        // If the image is interactive, it should have a role of "button"
        // to indicate that it is interactive.
        const imageRole = imgProps.onClick !== null ? "button" : "img";

        return (
            // (LEMS-2871) NOTE: This image IS interactive if it requires zooming, and LevelAccess specifically requested
            // that the role and tabIndex be set here. When users interact with the image on mobile, it will zoom in.
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- TODO(LEMS-2871): Address a11y error
                tabIndex={0}
                role={imageRole}
                src={staticUrl(src)}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                {...imgProps}
                style={
                    imgProps.style ?? {
                        width: "100%",
                        height: "100%",
                    }
                }
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

export default ImageLoader;
