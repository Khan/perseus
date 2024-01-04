/**
 * An article renderer. Articles are long-form pieces of content,
 * composed of multiple (Renderer) sections concatenated together.
 */

import * as PerseusLinter from "@khanacademy/perseus-linter";
import classNames from "classnames";
import * as React from "react";

import {DependenciesContext} from "./dependencies";
import {ClassNames as ApiClassNames, ApiOptions} from "./perseus-api";
import Renderer from "./renderer";
import Util from "./util";

import type {PerseusRenderer} from "./perseus-types";
import type {APIOptions, PerseusDependenciesV2} from "./types";
import type {KeypadAPI} from "@khanacademy/math-input";
import type {KeypadContextRendererInterface} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type Props = Partial<React.ContextType<typeof DependenciesContext>> & {
    apiOptions: APIOptions;
    json: PerseusRenderer | ReadonlyArray<PerseusRenderer>;
    // Whether to use the new Bibliotron styles for articles
    /**
     * @deprecated Does nothing
     */
    useNewStyles: boolean;
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
    keypadElement?: KeypadAPI | null | undefined;
    dependencies: PerseusDependenciesV2;
};

type DefaultProps = {
    apiOptions: Props["apiOptions"];
    useNewStyles: Props["useNewStyles"];
    linterContext: Props["linterContext"];
};

class ArticleRenderer
    extends React.Component<Props>
    implements KeypadContextRendererInterface
{
    _currentFocus: any;
    sectionRenderers: Array<Renderer> = [];

    static defaultProps: DefaultProps = {
        apiOptions: ApiOptions.defaults,
        useNewStyles: false,
        linterContext: PerseusLinter.linterContextDefault,
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this._currentFocus = null;
    }

    shouldComponentUpdate(nextProps: Props): boolean {
        return nextProps !== this.props;
    }

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
        const {keypadElement, apiOptions} = this.props;
        const {isMobile} = apiOptions;

        const prevFocusPath = this._currentFocus;
        this._currentFocus = newFocusPath;

        // Use the section prefix to extract the relevant Renderer's input
        // paths, so as to check whether the focused path represents an
        // input.
        let didFocusInput = false;
        let focusedInput;

        if (this._currentFocus) {
            const [sectionIndex, ...focusPath] = this._currentFocus;

            const inputPaths =
                this.sectionRenderers[sectionIndex].getInputPaths();

            didFocusInput = inputPaths.some((inputPath) => {
                return Util.inputPathsEqual(inputPath, focusPath);
            });
            focusedInput =
                this.sectionRenderers[sectionIndex].getDOMNodeForPath(
                    focusPath,
                );
        }

        const {onFocusChange} = this.props.apiOptions;
        if (onFocusChange) {
            // Wait for the keypad to mount before getting the height
            setTimeout(() => {
                const keypadDomNode =
                    keypadElement?.getDOMNode() as HTMLElement;
                const keypadHeight =
                    keypadDomNode && didFocusInput
                        ? keypadDomNode.getBoundingClientRect().height
                        : 0;

                onFocusChange(
                    this._currentFocus,
                    prevFocusPath,
                    keypadHeight,
                    didFocusInput ? focusedInput : null,
                );
            }, 0);
        }

        if (keypadElement && isMobile) {
            if (didFocusInput) {
                keypadElement.activate();
            } else {
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
            const [sectionIndex, ...inputPath] = this._currentFocus;
            this.sectionRenderers[sectionIndex].blurPath(inputPath);
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
            // NOTE(charlie): For exercises, this is applied outside of Perseus
            // (in webapp).
            [ApiClassNames.MOBILE]: apiOptions.isMobile,
        });

        // TODO(alex): Add mobile api functions and pass them down here
        // We're using the index as the key here because we don't have a unique
        // identifier for each section. This should be fine as we never remove
        // or reorder sections.
        const sections = this._sections().map((section, sectionIndex) => {
            return (
                <div key={sectionIndex} className="clearfix">
                    <Renderer
                        {...section}
                        ref={(elem) => {
                            if (elem) {
                                this.sectionRenderers[sectionIndex] = elem;
                            }
                        }}
                        key={sectionIndex}
                        key_={sectionIndex}
                        keypadElement={this.props.keypadElement}
                        apiOptions={{
                            ...apiOptions,
                            onFocusChange: (newFocusPath, oldFocusPath) => {
                                // Prefix the paths with the relevant section index,
                                // so as to allow us to distinguish between
                                // equivalently-named inputs across Renderers.
                                this._handleFocusChange(
                                    newFocusPath &&
                                        [sectionIndex].concat(newFocusPath),
                                    oldFocusPath &&
                                        [sectionIndex].concat(oldFocusPath),
                                );
                            },
                        }}
                        linterContext={PerseusLinter.pushContextStack(
                            this.props.linterContext,
                            "article",
                        )}
                        legacyPerseusLint={this.props.legacyPerseusLint}
                        {...this.props.dependencies}
                    />
                </div>
            );
        });

        return (
            <div className={classes}>
                <DependenciesContext.Provider value={this.props.dependencies}>
                    {sections}
                </DependenciesContext.Provider>
            </div>
        );
    }
}

export default ArticleRenderer;
