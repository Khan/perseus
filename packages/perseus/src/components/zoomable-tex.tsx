/**
 * ZoomableTeX is a wrapper around TeX to be used on mobile.  Without wrapping
 * TeX we run into issues of measuring at the incorrect time resulting in bad
 * measurements.
 */

import * as React from "react";

import AssetContext from '../asset-context';

import TeX from './tex';
import Zoomable from './zoomable';

type Props = {
    children: string
};
type State = {
    isRendered: boolean
};

const computeMathBounds = (parentNode: HTMLElement, parentBounds: Bounds) => {
    const textElement =
        parentNode.querySelector(".katex-html") ||
        parentNode.querySelector(".MathJax");
    const textBounds = {
        // $FlowFixMe[incompatible-use]
        width: textElement.offsetWidth,
        // $FlowFixMe[incompatible-use]
        height: textElement.offsetHeight,
    } as const;

    // HACK(benkomalo): when measuring math content, note that
    // sometimes it actually peeks outside of the
    // container in some cases. Just be conservative and use
    // the maximum value of the text and the parent. :(
    return {
        width: Math.max(parentBounds.width, textBounds.width),
        height: Math.max(parentBounds.height, textBounds.height),
    };
};

export default class ZoomableTeX extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {isRendered: false};
    }

    handleRender: () => void = () => {
        this.setState({isRendered: true});
    };

    render(): React.ReactElement {
        return (
            <Zoomable
                readyToMeasure={this.state.isRendered}
                computeChildBounds={computeMathBounds}
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
