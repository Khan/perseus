/* eslint-disable jsx-a11y/alt-text, react/no-unsafe */
// @flow
// TODO(scottgrant): Enable the alt-text eslint rule above.
/**
 * Component to display an image (or other React components) while the desired
 * image is loading.
 *
 * Derived from
 * https://github.com/hzdg/react-imageloader/blob/master/src/index.js
 * to better suit our environment/build tools. Additionally, this one does
 * not introduce a wrapper element, which makes styling easier.
 */

import * as React from "react";

import {getDependencies} from "../dependencies.js";

import type {Dimensions} from "../types.js";

const Status = {
    PENDING: "pending",
    LOADING: "loading",
    LOADED: "loaded",
    FAILED: "failed",
};

export type ImageProps = {|
    alt: string,
    title?: string,
    "aria-hidden"?: boolean,
    tabIndex?: string,
    onClick?: (e: SyntheticEvent<>) => void,
    style?: Dimensions,
|};

type Props = {|
    children?: React.Node,
    imgProps: ImageProps,
    onError?: (event: Event) => void,
    onLoad?: (event: Event) => void,

    // When the DOM updates to replace the preloader with the image, or
    // vice-versa, we trigger this callback.
    onUpdate: (status: $Values<typeof Status>) => void,

    preloader: ?() => React.Node,
    src: string,
|};

type State = {|
    status: $Values<typeof Status>,
|};

class ImageLoader extends React.Component<Props, State> {
    img: ?Image;

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

    renderImg: () => React.Element<"img"> = () => {
        const {src, imgProps} = this.props;
        let onKeyUp = null;
        let onKeyDown = null;
        if (imgProps.onClick != null) {
            onKeyUp = (e: SyntheticKeyboardEvent<>) => {
                // 13 is enter key, 32 is space key
                if (e.keyCode === 13 || e.keyCode === 32) {
                    imgProps.onClick && imgProps.onClick(e);
                }
            };
            onKeyDown = (e: SyntheticKeyboardEvent<>) => {
                // 32 is space key
                if (e.keyCode === 32) {
                    // don't scroll on space when the image is focused
                    e.preventDefault();
                }
            };
        }
        const staticUrl = getDependencies().staticUrl;

        return (
            <img
                src={staticUrl(src)}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                {...imgProps}
            />
        );
    };

    render(): React.Node {
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
    }
}

export default ImageLoader;
