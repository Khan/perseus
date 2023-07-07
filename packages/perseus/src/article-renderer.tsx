/**
 * An article renderer. Articles are long-form pieces of content,
 * composed of multiple (Renderer) sections concatenated together.
 */

import * as PerseusLinter from "@khanacademy/perseus-linter";
import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";

import ProvideKeypad from "./mixins/provide-keypad";
import {ClassNames as ApiClassNames, ApiOptions} from "./perseus-api";
import Renderer from "./renderer";
import Util from "./util";

const rendererProps = PropTypes.shape({
    content: PropTypes.string,
    widgets: PropTypes.objectOf(PropTypes.any),
    images: PropTypes.objectOf(PropTypes.any),
});

class ArticleRenderer extends React.Component<any, any> {
    _currentFocus: any;

    static propTypes = {
        ...ProvideKeypad.propTypes,
        apiOptions: PropTypes.shape({
            onFocusChange: PropTypes.func,
            isMobile: PropTypes.bool,
        }),
        json: PropTypes.oneOfType([
            rendererProps,
            PropTypes.arrayOf(rendererProps),
        ]).isRequired,

        // Whether to use the new Bibliotron styles for articles
        useNewStyles: PropTypes.bool,
        linterContext: PerseusLinter.linterContextProps,
        legacyPerseusLint: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps: any = {
        apiOptions: {},
        useNewStyles: false,
        linterContext: PerseusLinter.linterContextDefault,
    };

    constructor(props: any) {
        super(props);
        this.state = ProvideKeypad.getInitialState.call(this);
    }

    componentDidMount() {
        ProvideKeypad.componentDidMount.call(this);
        this._currentFocus = null;
    }

    shouldComponentUpdate(nextProps: any, nextState: any): any {
        return nextProps !== this.props || nextState !== this.state;
    }

    componentWillUnmount() {
        ProvideKeypad.componentWillUnmount.call(this);
    }

    keypadElement: () => void = () => {
        return ProvideKeypad.keypadElement.call(this);
    };

    _handleFocusChange: (arg1: any, arg2: any) => void = (
        newFocusPath,
        oldFocusPath,
    ) => {
        // TODO(charlie): DRY this up--some of this logic is repeated in
        // ItemRenderer.
        if (newFocusPath) {
            this._setCurrentFocus(newFocusPath);
        } else {
            this._onRendererBlur(oldFocusPath);
        }
    };

    _setCurrentFocus: (arg1: any) => void = (newFocusPath) => {
        const keypadElement = this.keypadElement();

        const prevFocusPath = this._currentFocus;
        this._currentFocus = newFocusPath;

        // Use the section prefix to extract the relevant Renderer's input
        // paths, so as to check whether the focused path represents an
        // input.
        let didFocusInput = false;
        if (this._currentFocus) {
            const [sectionRef, ...focusPath] = this._currentFocus;
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'getInputPaths' does not exist on type 'ReactInstance'.
            const inputPaths = this.refs[sectionRef].getInputPaths();
            didFocusInput = inputPaths.some((inputPath) => {
                return Util.inputPathsEqual(inputPath, focusPath);
            });
        }

        if (this.props.apiOptions.onFocusChange != null) {
            this.props.apiOptions.onFocusChange(
                this._currentFocus,
                prevFocusPath,
                // @ts-expect-error [FEI-5003] - TS2339 - Property 'getDOMNode' does not exist on type 'never'.
                didFocusInput && keypadElement && keypadElement.getDOMNode(),
            );
        }

        // @ts-expect-error [FEI-5003] - TS1345 - An expression of type 'void' cannot be tested for truthiness.
        if (keypadElement) {
            if (didFocusInput) {
                // @ts-expect-error [FEI-5003] - TS2339 - Property 'activate' does not exist on type 'never'.
                keypadElement.activate();
            } else {
                // @ts-expect-error [FEI-5003] - TS2339 - Property 'dismiss' does not exist on type 'never'.
                keypadElement.dismiss();
            }
        }
    };

    _onRendererBlur: (arg1: any) => void = (blurPath) => {
        const blurringFocusPath = this._currentFocus;

        // Failsafe: abort if ID is different, because focus probably happened
        // before blur.
        if (!Util.inputPathsEqual(blurPath, blurringFocusPath)) {
            return;
        }

        // Wait until after any new focus events fire this tick before declaring
        // that nothing is focused, since if there were a focus change across
        // sections, we could receive the blur before the focus.
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
        // eslint-disable-next-line no-restricted-syntax
        setTimeout(() => {
            if (Util.inputPathsEqual(this._currentFocus, blurringFocusPath)) {
                this._setCurrentFocus(null);
            }
        });
    };

    blur: () => void = () => {
        if (this._currentFocus) {
            const [sectionRef, ...inputPath] = this._currentFocus;
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'blurPath' does not exist on type 'ReactInstance'.
            this.refs[sectionRef].blurPath(inputPath);
        }
    };

    _sections: () => any = () => {
        return Array.isArray(this.props.json)
            ? this.props.json
            : [this.props.json];
    };

    render(): React.ReactNode {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            isArticle: true,
        } as const;

        const classes = classNames({
            "framework-perseus": true,
            "perseus-article": true,
            "bibliotron-article": this.props.useNewStyles,
            // NOTE(charlie): For exercises, this is applied outside of Perseus
            // (in webapp).
            [ApiClassNames.MOBILE]: apiOptions.isMobile,
        });

        // TODO(alex): Add mobile api functions and pass them down here
        const sections = this._sections().map((section, i) => {
            const refForSection = `section-${i}`;
            return (
                <div key={i} className="clearfix">
                    <Renderer
                        {...section}
                        ref={refForSection}
                        key={i}
                        key_={i}
                        keypadElement={this.keypadElement()}
                        apiOptions={{
                            ...apiOptions,
                            onFocusChange: (newFocusPath, oldFocusPath) => {
                                // Prefix the paths with the relevant section,
                                // so as to allow us to distinguish between
                                // equivalently-named inputs across Renderers.
                                this._handleFocusChange(
                                    newFocusPath &&
                                        [refForSection].concat(newFocusPath),
                                    oldFocusPath &&
                                        [refForSection].concat(oldFocusPath),
                                );
                            },
                        }}
                        linterContext={PerseusLinter.pushContextStack(
                            this.props.linterContext,
                            "article",
                        )}
                        legacyPerseusLint={this.props.legacyPerseusLint}
                    />
                </div>
            );
        });

        return <div className={classes}>{sections}</div>;
    }
}

export default ArticleRenderer;
