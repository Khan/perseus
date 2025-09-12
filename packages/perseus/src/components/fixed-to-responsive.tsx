/**
 * A wrapper for a component that would otherwise have a fixed width and
 * height, that magically makes it reponsive while preserving its aspect ratio.
 * Specifically, the component will shrink dynamically when it needs to but
 * won't ever grow past its original dimensions.
 *
 * Can wrap multiple components with the same dimensions at the same time;
 * these will be overlaid on top of each other.
 *
 * Usage:
 * <FixedToResponsive width={400} height={400}>
 *     <img src="bottom-layer.png" />
 *     <img src="top-layer.png" />
 * </FixedToResponsive>
 */
import classNames from "classnames";
import * as React from "react";

import {negativePhoneMargin} from "../styles/constants";

const MIN_VIEWPORT_HEIGHT = 480;

type Props = {
    width: number;
    height: number;
    children: React.ReactNode;
    className?: string;
    constrainHeight?: boolean;
    allowFullBleed?: boolean;
    withinImageWidget?: boolean;
};

type DefaultProps = {
    className: Props["className"];
    constrainHeight: Props["constrainHeight"];
    allowFullBleed: Props["allowFullBleed"];
    withinImageWidget: Props["withinImageWidget"];
};

type State = {
    viewportHeight: number | null;
    viewportWidth: number | null;
};

class FixedToResponsive extends React.Component<Props, State> {
    _isMounted = false;

    static defaultProps: DefaultProps = {
        className: "",
        constrainHeight: false,
        allowFullBleed: false,
        withinImageWidget: false,
    };

    state: State = {
        viewportHeight: null,
        viewportWidth: null,
    };

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        // Cache viewport sizes instead of computing on each render.
        // We setState() in componentDidMount(), even though it's a React
        // anti-pattern, because we do actually want to trigger a re-render
        // after the initial render (because initial render may be
        // server-side).
        // TODO(david): Don't do this for each image. Do this once per page.
        if (window.innerHeight < MIN_VIEWPORT_HEIGHT) {
            // There is a weird issue when this gets rendered in an Android
            // webview where window.innerHeight might be initially very small,
            // like 46, but seems to be good after ~400ms.
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(this._cacheViewportSize, 800);
        } else {
            this._cacheViewportSize();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _cacheViewportSize: () => void = (): void => {
        if (this._isMounted) {
            this.setState({
                viewportHeight: Math.max(
                    MIN_VIEWPORT_HEIGHT,
                    window.innerHeight,
                ),
                viewportWidth: window.innerWidth,
            });
        }
    };

    render() {
        // The ideal behavior for responsified, fixed size child components is
        // that they shrink when they need to (while preserving aspect ratio)
        // but never grow larger than their original dimensions. We accomplish
        // this by absolutely positioning the children and telling them to fill
        // up all of a space that has the correct aspect ratio.
        const aspectRatio = this.props.width / this.props.height;

        // This works because padding percentages are interpreted in terms of
        // the width of the containing block, so:
        //     (fixed height / fixed width) * display width = display height
        // Based on http://refills.bourbon.io/components/#video && medium.com
        const spacer = (
            <div
                style={{
                    // @ts-expect-error - TS2362 - The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
                    paddingBottom: (1 / aspectRatio).toFixed(4) * 100 + "%",
                }}
            />
        );

        let {width, height} = this.props;

        // Constrain height to be at most 2/3 viewport height, maintaining
        // aspect ratio.
        if (this.props.constrainHeight && this.state.viewportHeight) {
            const maxHeight = (2 / 3) * this.state.viewportHeight;
            if (this.props.height >= maxHeight) {
                height = maxHeight;
                width = maxHeight * aspectRatio;
            }
        }

        // Prevent child components from growing (aka "the Peter Pan effect")
        const style = {
            maxWidth: width,
            maxHeight: height,
        } as const;

        // NOTE(jeremy): This depends on styles defined in perseus-renderer.css
        const className = classNames(
            "fixed-to-responsive",
            this.props.className,
        );

        const container = (
            <div className={className} style={style}>
                {!this.props.withinImageWidget && spacer}
                {this.props.children}
            </div>
        );

        const shouldFullBleed =
            this.props.allowFullBleed &&
            this.state.viewportWidth &&
            width >= this.state.viewportWidth;

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (shouldFullBleed) {
            return (
                <div
                    style={{
                        marginLeft: negativePhoneMargin,
                        marginRight: negativePhoneMargin,
                    }}
                >
                    {container}
                </div>
            );
        }
        return container;
    }
}

export default FixedToResponsive;
