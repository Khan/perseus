import * as PerseusLinter from "@khanacademy/perseus-linter";
import {StyleSheet, css} from "aphrodite";
import classnames from "classnames";
import * as React from "react";

import {PerseusI18nContext} from "./components/i18n-context";
import Renderer from "./renderer";
import {baseUnitPx, hintBorderWidth, kaGreen, gray97} from "./styles/constants";
import mediaQueries from "./styles/media-queries";

import type {SharedRendererProps} from "./types";

type Props = SharedRendererProps & {
    className?: string;
    hint: any;
    lastHint?: boolean;
    lastRendered?: boolean;
    pos: number;
    totalHints?: number;
    findExternalWidgets?: any;
};

type DefaultProps = {
    linterContext: Props["linterContext"];
};

/* Renders just a hint preview */
class HintRenderer extends React.Component<Props> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        linterContext: PerseusLinter.linterContextDefault,
    };

    // TODO(LEMS-3185): remove serializedState/restoreSerializedState
    /**
     * @deprecated - do not use in new code.
     */
    getSerializedState: () => void = () => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'getSerializedState' does not exist on type 'ReactInstance'.
        return this.refs.renderer.getSerializedState();
    };

    // TODO(LEMS-3185): remove serializedState/restoreSerializedState
    /**
     * @deprecated - do not use in new code.
     */
    restoreSerializedState: (
        arg1: any,
        arg2: (...args: ReadonlyArray<any>) => unknown,
    ) => void = (state, callback) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'restoreSerializedState' does not exist on type 'ReactInstance'.
        this.refs.renderer.restoreSerializedState(state, callback);
    };

    render(): React.ReactNode {
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
            "hint",
            !isMobile && "perseus-hint-renderer",
            isMobile && css(styles.newHint),
            isMobile && lastRendered && css(styles.lastRenderedNewHint),
            lastHint && "last-hint",
            lastRendered && "last-rendered",
            className,
        );

        // TODO(charlie): Allowing `customKeypad` would require that we
        // extend `ItemRenderer` to support nested inputs in the `HintsRenderer`.
        // For now, we disable this option.
        // Instead, clients will get standard <input/> elements, which
        // aren't nice to use on mobile, but are at least usable.
        const rendererApiOptions = {
            ...apiOptions,
            customKeypad: false,
        } as const;

        return (
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
            <div className={classNames} tabIndex="-1">
                {!apiOptions.isMobile && (
                    <span className="perseus-sr-only">
                        {this.context.strings.hintPos({pos: pos + 1})}
                    </span>
                )}
                {!apiOptions.isMobile && totalHints != null && pos != null && (
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
                    strings={this.context.strings}
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
