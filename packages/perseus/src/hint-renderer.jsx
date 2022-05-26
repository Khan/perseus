// @flow
import * as PerseusLinter from "@khanacademy/perseus-linter";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import classnames from "classnames";
import * as React from "react";

import Renderer from "./renderer.jsx";
import {
    baseUnitPx,
    hintBorderWidth,
    kaGreen,
    gray97,
} from "./styles/constants.js";
import mediaQueries from "./styles/media-queries.js";

import type {APIOptions, LinterContextProps} from "./types.js";

type Props = {|
    apiOptions: APIOptions,
    className?: string,
    hint: $FlowFixMe,
    lastHint?: boolean,
    lastRendered?: boolean,
    pos: number,
    totalHints?: number,
    findExternalWidgets?: $FlowFixMe,
    linterContext: LinterContextProps,
|};

type DefaultProps = {|
    linterContext: Props["linterContext"],
|};

/* Renders just a hint preview */
class HintRenderer extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        linterContext: PerseusLinter.linterContextDefault,
    };

    getSerializedState: () => void = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.renderer.getSerializedState();
    };

    restoreSerializedState: (
        $FlowFixMe,
        (...args: $ReadOnlyArray<$FlowFixMe>) => mixed,
    ) => void = (state, callback) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.renderer.restoreSerializedState(state, callback);
    };

    render(): React.Node {
        const {
            apiOptions,
            className,
            hint,
            lastHint,
            lastRendered,
            pos,
            totalHints,
        } = this.props;

        const {isMobile} = apiOptions;

        const classNames = classnames(
            !isMobile && "perseus-hint-renderer",
            isMobile && css(styles.newHint),
            isMobile && lastRendered && css(styles.lastRenderedNewHint),
            lastHint && "last-hint",
            lastRendered && "last-rendered",
            className,
        );

        // TODO(charlie): Allowing `staticRender` here would require that we
        // extend `HintsRenderer` and `HintRenderer` to implement the full
        // "input' API, so that clients could access the static inputs. Allowing
        // `customKeypad` would require that we extend `ItemRenderer` to support
        // nested inputs in the `HintsRenderer`. For now, we disable these
        // options. Instead, clients will get standard <input/> elements, which
        // aren't nice to use on mobile, but are at least usable.
        const rendererApiOptions = {
            ...apiOptions,
            customKeypad: false,
            staticRender: false,
        };

        return (
            <div className={classNames} tabIndex="-1">
                {!apiOptions.isMobile && (
                    <span className="perseus-sr-only">
                        {i18n._("Hint #%(pos)s", {pos: pos + 1})}
                    </span>
                )}
                {!apiOptions.isMobile &&
                    !apiOptions.satStyling &&
                    totalHints &&
                    pos != null && (
                        <span
                            className="perseus-hint-label"
                            style={{
                                display: "block",
                                color: apiOptions.hintProgressColor,
                            }}
                        >
                            {`${pos + 1} / ${totalHints}`}
                        </span>
                    )}
                <Renderer
                    // eslint-disable-next-line react/no-string-refs
                    ref="renderer"
                    widgets={hint.widgets}
                    content={hint.content || ""}
                    images={hint.images}
                    apiOptions={rendererApiOptions}
                    findExternalWidgets={this.props.findExternalWidgets}
                    linterContext={PerseusLinter.pushContextStack(
                        this.props.linterContext,
                        "hint",
                    )}
                />
            </div>
        );
    }
}

const styles = StyleSheet.create({
    newHint: {
        marginBottom: 1.5 * baseUnitPx,

        borderLeftColor: gray97,
        borderLeftStyle: "solid",
        borderLeftWidth: hintBorderWidth,

        // Only apply left-padding on tablets, to avoid being flush with the
        // border. On phones, padding is applied internally by the child
        // renderers. Some content on phones that is rendered at full-bleed may
        // end up flush with the border, but that's acceptable for now.
        [mediaQueries.lgOrSmaller]: {
            paddingLeft: baseUnitPx,
        },
        [mediaQueries.smOrSmaller]: {
            paddingLeft: 0,
        },

        ":focus": {
            outline: "none",
        },
    },

    lastRenderedNewHint: {
        marginBottom: 0,
        borderLeftColor: kaGreen,
    },
});

export default HintRenderer;
