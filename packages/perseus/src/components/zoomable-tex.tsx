/**
 * ZoomableTeX is a wrapper around TeX to be used on mobile.  Without wrapping
 * TeX we run into issues of measuring at the incorrect time resulting in bad
 * measurements.
 */

import * as React from "react";

import AssetContext from "../asset-context";

import TeX from "./tex";
import Zoomable from "./zoomable";

type Props = {
    children: string;
};
type State = {
    isRendered: boolean;
};

const computeMathBounds = (
    parentNode: HTMLElement,
    parentBounds: {width: number; height: number},
) => {
    const textElement = parentNode.querySelector(".MathJax");
    const textBounds = {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'offsetWidth' does not exist on type 'Element'.
        width: textElement.offsetWidth,
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'offsetHeight' does not exist on type 'Element'.
        height: textElement.offsetHeight,
    } as const;

    // HACK(benkomalo): when measuring math content, note that
    // sometimes it actually peeks outside of the
    // container in some cases. Just be conservative and use
    // the maximum value of the text and the parent. :(
    // NOTE: In situations where the math is hidden from view (e.g. inside an
    // explanation widget), an ancestor element may have a width of 0.
    // In those cases, we need to adjust how we determine the final bounds.
    // When the ancestor width is 0, it can cause the parent height to be quite
    // tall, so we should ignore it.
    const hiddenAncestor = parentNode.closest(`[aria-hidden="true"]`);
    const height =
        hiddenAncestor?.getBoundingClientRect().width === 0
            ? textBounds.height
            : Math.max(parentBounds.height, textBounds.height);

    // eslint-disable-next-line no-console
    console.log(`Parent: `, parentNode);
    // eslint-disable-next-line no-console
    console.log(`   Bounds: `, parentBounds);
    // eslint-disable-next-line no-console
    console.log(`Element: `, textElement);
    // eslint-disable-next-line no-console
    console.log(`   Bounds: `, textBounds);
    // eslint-disable-next-line no-console
    console.log(`Hidden Ancestor: `, hiddenAncestor);
    // eslint-disable-next-line no-console
    console.log(`   Bounds: `, hiddenAncestor?.getBoundingClientRect());
    return {
        width: Math.max(parentBounds.width, textBounds.width),
        height: height,
    };
};

export default class ZoomableTeX extends React.Component<Props, State> {
    constructor() {
        // @ts-expect-error - TS2554 - Expected 1-2 arguments, but got 0.
        super();

        this.state = {isRendered: false};
    }

    handleRender: () => void = () => {
        this.setState({isRendered: true});
    };

    render(): React.ReactNode {
        return (
            <Zoomable
                readyToMeasure={this.state.isRendered}
                computeChildBounds={computeMathBounds}
                animateHeight={false}
                disableEntranceAnimation={true}
            >
                <AssetContext.Consumer>
                    {({setAssetStatus}) => (
                        <TeX
                            onRender={this.handleRender}
                            setAssetStatus={setAssetStatus}
                        >
                            {this.props.children}
                        </TeX>
                    )}
                </AssetContext.Consumer>
            </Zoomable>
        );
    }
}
