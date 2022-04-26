// @flow
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import classnames from "classnames";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import Gorgon from "./gorgon/gorgon.js";
import {linterContextDefault} from "./gorgon/proptypes.js";
import HintRenderer from "./hint-renderer.jsx";
import {ApiOptions} from "./perseus-api.jsx";
import typeof Renderer from "./renderer.jsx";
import {
    baseUnitPx,
    hintBorderWidth,
    kaGreen,
    gray85,
    gray17,
} from "./styles/constants.js";
import mediaQueries from "./styles/media-queries.js";
import sharedStyles from "./styles/shared.js";
import Util from "./util.js";

import type {APIOptionsWithDefaults} from "./types.js";

type Props = {|
    ...React.ElementConfig<Renderer>,
    className?: string,
    hints: $ReadOnlyArray<$FlowFixMe>,
    hintsVisible?: number,
|};

type DefaultProps = {|
    linterContext: Props["linterContext"],
|};

type State = {|
    isFinalHelpPage: boolean,
|};

// Use of UNSAFE_componentWillReceiveProps:
// eslint-disable-next-line react/no-unsafe
class HintsRenderer extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        linterContext: linterContextDefault,
    };

    // The isFinalHelpPage property determines if the user has requested help
    // after answering an exercise question incorrectly, which differs from
    // the case when the user is requesting successive hints. In the case
    // where isFinalHelpPage property is true, we want to display all hints.
    // We know the user is on the final help page when the hintsVisible
    // property jumps from 0 to the total number of hints.
    state: $FlowFixMe = {isFinalHelpPage: false};

    componentDidMount() {
        this._cacheHintImages();
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        // $FlowFixMe[unsafe-addition]
        if (nextProps.hintsVisible - this.props.hintsVisible > 1) {
            this.setState({isFinalHelpPage: true});
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (
            !_.isEqual(prevProps.hints, this.props.hints) ||
            prevProps.hintsVisible !== this.props.hintsVisible
        ) {
            this._cacheHintImages();
        }

        // When a new hint is displayed we immediately focus it
        // $FlowFixMe[invalid-compare]
        if (prevProps.hintsVisible < this.props.hintsVisible) {
            // $FlowFixMe[unsafe-addition]
            const pos = this.props.hintsVisible - 1;
            // $FlowFixMe[prop-missing]
            // $FlowFixMe[incompatible-use]
            ReactDOM.findDOMNode(this.refs["hintRenderer" + pos]).focus(); // eslint-disable-line react/no-string-refs
        }
    }

    _hintsVisible: () => number = () => {
        if (this.props.hintsVisible == null || this.props.hintsVisible === -1) {
            return this.props.hints.length;
        }
        return this.props.hintsVisible;
    };

    _cacheImagesInHint: ($FlowFixMe) => void = (hint) => {
        _.each(hint.images, (data, src) => {
            const image = new Image();
            image.src = Util.getRealImageUrl(src);
        });
    };

    _cacheHintImages: () => $FlowFixMe = () => {
        // Only cache images in the first hint at the start. When hints are
        // taken, cache images in the rest of the hints
        if (this._hintsVisible() > 0) {
            _.each(this.props.hints, this._cacheImagesInHint);
        } else if (this.props.hints.length > 0) {
            this._cacheImagesInHint(this.props.hints[0]);
        }
    };

    getApiOptions: () => APIOptionsWithDefaults = () => {
        // When an item is answered correctly, the entire exercise is set to
        // `readOnly = true` so that the user cannot switch answers. However, this
        // makes hyperlinks in hints unclickable. Thus, we always set readOnly to be
        // false in hints.
        return {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            readOnly: false,
        };
    };

    getSerializedState: () => $FlowFixMe = () => {
        return _.times(this._hintsVisible(), (i) => {
            // eslint-disable-next-line react/no-string-refs
            return this.refs["hintRenderer" + i].getSerializedState();
        });
    };

    restoreSerializedState: (
        $FlowFixMe,
        (...args: $ReadOnlyArray<$FlowFixMe>) => mixed,
    ) => void = (state, callback) => {
        // We need to wait until all the renderers are finished restoring their
        // state before we fire our callback.
        let numCallbacks = 1;
        const fireCallback = () => {
            --numCallbacks;
            if (callback && numCallbacks === 0) {
                callback();
            }
        };

        _.each(state, (hintState, i) => {
            // eslint-disable-next-line react/no-string-refs
            const hintRenderer = this.refs["hintRenderer" + i];
            // This is not ideal in that it doesn't restore state
            // if the hint isn't visible, but we can't exactly restore
            // the state to an unmounted renderer, so...
            // If you want to restore state to hints, make sure to
            // have the appropriate number of hints visible already.
            if (hintRenderer) {
                ++numCallbacks;
                hintRenderer.restoreSerializedState(hintState, fireCallback);
            }
        });

        // This makes sure that the callback is fired if there aren't any
        // mounted renderers.
        fireCallback();
    };

    render(): React.Node {
        const apiOptions = this.getApiOptions();
        const hintsVisible = this._hintsVisible();
        const hints = [];
        const isFinalHelpPage = this.state.isFinalHelpPage;
        this.props.hints.slice(0, hintsVisible).forEach((hint, i) => {
            const lastHint =
                i === this.props.hints.length - 1 && !/\*\*/.test(hint.content);
            const lastRendered = i === hintsVisible - 1;

            const renderer = (
                <HintRenderer
                    lastHint={lastHint}
                    lastRendered={lastRendered}
                    hint={hint}
                    pos={i}
                    totalHints={this.props.hints.length}
                    ref={"hintRenderer" + i}
                    key={"hintRenderer" + i}
                    apiOptions={apiOptions}
                    findExternalWidgets={this.props.findExternalWidgets}
                    linterContext={Gorgon.pushContextStack(
                        this.props.linterContext,
                        "hints[" + i + "]",
                    )}
                />
            );

            if (isFinalHelpPage) {
                hints.push(renderer);
            } else {
                if (hint.replace && hints.length > 0) {
                    hints[hints.length - 1] = renderer;
                } else {
                    hints.push(renderer);
                }
            }
        });

        const {getAnotherHint} = apiOptions;

        const showGetAnotherHint =
            getAnotherHint &&
            hintsVisible > 0 &&
            hintsVisible < this.props.hints.length;
        const hintRatioCopy = `(${hintsVisible}/${this.props.hints.length})`;

        const classNames = classnames(
            this.props.className,
            apiOptions.isMobile &&
                hintsVisible > 0 &&
                css(styles.mobileHintStylesHintsRenderer),
        );

        return (
            <div className={classNames}>
                {apiOptions.isMobile && hintsVisible > 0 && (
                    <div
                        className={css(
                            styles.mobileHintStylesHintTitle,
                            sharedStyles.responsiveLabel,
                        )}
                    >
                        {i18n._("Hints")}
                    </div>
                )}
                {hints}
                {showGetAnotherHint && (
                    <button
                        rel="button"
                        className={css(
                            styles.linkButton,
                            styles.getAnotherHintButton,
                            apiOptions.isMobile &&
                                styles.mobileHintStylesGetAnotherHintButton,
                        )}
                        onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (getAnotherHint) {
                                getAnotherHint();
                            }
                        }}
                    >
                        <span
                            className={css(
                                styles.plusText,
                                apiOptions.isMobile &&
                                    styles.mobileHintStylesPlusText,
                            )}
                        >
                            +
                        </span>
                        <span className={css(styles.getAnotherHintText)}>
                            {i18n._("Get another hint")} {hintRatioCopy}
                        </span>
                    </button>
                )}
            </div>
        );
    }
}

const hintIndentation = baseUnitPx + hintBorderWidth;

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    rendererMargins: {
        marginTop: baseUnitPx,
    },

    linkButton: {
        cursor: "pointer",
        border: "none",
        backgroundColor: "transparent",
        fontSize: "100%",
        fontFamily: "inherit",
        fontWeight: "bold",
        color: kaGreen,
        padding: 0,
        position: "relative",
    },

    plusText: {
        fontSize: 20,
        position: "absolute",
        top: -3,
        left: 0,
    },
    getAnotherHintText: {
        marginLeft: 16,
    },

    mobileHintStylesHintsRenderer: {
        marginTop: 4 * baseUnitPx,
        border: `solid ${gray85}`,
        borderWidth: "1px 0 0 0",

        position: "relative",
        ":before": {
            content: '""',
            display: "table",
            clear: "both",
        },
        ":after": {
            content: '""',
            display: "table",
            clear: "both",
        },
    },

    mobileHintStylesHintTitle: {
        fontFamily: "inherit",
        fontStyle: "normal",
        fontWeight: "bold",
        color: gray17,

        paddingTop: baseUnitPx,
        paddingBottom: 1.5 * baseUnitPx,

        [mediaQueries.lgOrSmaller]: {
            paddingLeft: 0,
        },
        [mediaQueries.smOrSmaller]: {
            // On phones, ensure that the button is aligned with the hint body
            // content, which is inset at the standard `baseUnitPx`, plus an
            // additional `hintBorderWidth`.
            paddingLeft: hintIndentation,
        },
    },

    getAnotherHintButton: {
        marginTop: 1.5 * baseUnitPx,
    },

    mobileHintStylesGetAnotherHintButton: {
        [mediaQueries.lgOrSmaller]: {
            paddingLeft: 0,
        },
        [mediaQueries.smOrSmaller]: {
            // As with the title, on phones, ensure that the button is aligned
            // with the hint body content.
            paddingLeft: hintIndentation,
        },
    },

    mobileHintStylesPlusText: {
        [mediaQueries.lgOrSmaller]: {
            left: 0,
        },
        [mediaQueries.smOrSmaller]: {
            left: hintIndentation,
        },
    },
});

export default HintsRenderer;
