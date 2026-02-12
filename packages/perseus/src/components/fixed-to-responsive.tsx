/**
 * A wrapper for a component that would otherwise have a fixed width and
 * height, that magically makes it responsive while preserving its aspect ratio.
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
    /**
     * When the content is at least as wide as the viewport (i.e. mobile),
     * allow the content to fill the entire viewport.
     */
    allowFullBleed?: boolean;
};

type DefaultProps = {
    className: Props["className"];
    constrainHeight: Props["constrainHeight"];
    allowFullBleed: Props["allowFullBleed"];
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
    };

    state: State = {
        viewportHeight: null,
        viewportWidth: null,
    };

    componentDidMount() {
        // NOTE(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        // Cache viewport sizes instead of computing on each render.
        // We setState() in componentDidMount(), even though it's a React
        // anti-pattern, because we do actually want to trigger a re-render
        // after the initial render (because initial render may be
        // server-side).
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
        // this using the modern CSS aspect-ratio property, which maintains
        // the correct aspect ratio without requiring a spacer div.
        const aspectRatio = this.props.width / this.props.height;

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
        // and maintain the aspect ratio.
        const style = {
            maxWidth: width,
            maxHeight: height,
            aspectRatio: aspectRatio.toFixed(4),
        } as React.CSSProperties;

        // NOTE(jeremy): This depends on styles defined in perseus-renderer-part-1.css
        const className = classNames(
            "fixed-to-responsive",
            this.props.className,
        );

        const container = (
            <div className={className} style={style}>
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
