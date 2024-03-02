/**
 * Wrapper around the TeX component from react-components-package
 * which adds logic to track whether all pieces of math in an exercise
 * have been loaded.  This tracking is facilitated by the AssetContext.
 */
import * as React from "react";

import {getDependencies} from "../dependencies";

type Props = {
    children: string;
    // Pass through prop to TeX from react-components-package.
    onRender: () => void;
    // If provided, use AssetContext.Consumer, see renderer.jsx.
    // If not, it defaults to a no-op.
    setAssetStatus: (assetKey: string, loaded: boolean) => void;
};

type State = {
    rendered: boolean;
};

export default class Tex extends React.Component<Props, State> {
    _hasRendered: boolean;

    static defaultProps: {
        onRender: () => void;
        setAssetStatus: (src: string, status: boolean) => void;
    } = {
        onRender: () => {},
        setAssetStatus: (src: string, status: boolean) => {},
    };

    constructor(props: Props) {
        super(props);
        this.props.setAssetStatus(this.props.children, false);
        this.state = {
            rendered: false,
        };
        this._hasRendered = false;
    }

    handleRender: () => void = () => {
        this.setState({rendered: true});

        this.props.onRender();

        // We can't use BaseTeX's onRender callback directly b/c it
        // can fire from BaseTeX's componentDidMount() method and we
        // need to wait for all of the constructors in the perseus
        // render tree to first first.
        if (!this._hasRendered) {
            this._hasRendered = true;
            this.props.setAssetStatus(this.props.children, true);
        }
    };

    render(): React.ReactNode {
        const {TeX: BaseTeX} = getDependencies();
        return (
            <BaseTeX onRender={this.handleRender}>
                {this.props.children}
            </BaseTeX>
        );
    }
}
