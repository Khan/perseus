import * as PerseusLinter from "@khanacademy/perseus-linter";
import {StyleSheet, css} from "aphrodite";
import classnames from "classnames";
import * as React from "react";

import {PerseusI18nContext} from "./components/i18n-context";
import {DependenciesContext} from "./dependencies";
import Renderer from "./renderer";
import {baseUnitPx, hintBorderWidth, kaGreen, gray97} from "./styles/constants";
import mediaQueries from "./styles/media-queries";
import UserInputManager from "./user-input-manager";

import type {PerseusDependenciesV2, SharedRendererProps} from "./types";
import type {Hint} from "@khanacademy/perseus-core";

type Props = SharedRendererProps & {
    className?: string;
    hint: Hint;
    lastHint?: boolean;
    lastRendered?: boolean;
    pos: number;
    totalHints?: number;
    findExternalWidgets?: any;
    dependencies: PerseusDependenciesV2;
};

type DefaultProps = {
    linterContext: Props["linterContext"];
};

/* Renders just a hint preview */
class HintRenderer extends React.Component<Props> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    rendererRef = React.createRef<Renderer>();

    static defaultProps: DefaultProps = {
        linterContext: PerseusLinter.linterContextDefault,
    };

    // TODO(LEMS-3185): remove serializedState
    /**
     * @deprecated - do not use in new code.
     */
    getSerializedState: () => void = () => {
        return this.rendererRef.current?.getSerializedState();
    };

    render(): React.ReactNode {
        if (this.props.hint.placeholder) {
            // TODO(LEMS-3806): there's probably a better way to do this,
            // but this can't be null because other components
            // reference the ref on HintRenderer
            return <span />;
        }

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
            <DependenciesContext.Provider value={this.props.dependencies}>
                {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'. */}
                <div className={classNames} tabIndex="-1">
                    {!apiOptions.isMobile && (
                        <span className="perseus-sr-only">
                            {this.context.strings.hintPos({pos: pos + 1})}
                        </span>
                    )}
                    {!apiOptions.isMobile &&
                        totalHints != null &&
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

                    <UserInputManager widgets={hint.widgets} problemNum={0}>
                        {({
                            userInput,
                            handleUserInput,
                            initializeUserInput,
                        }) => (
                            <Renderer
                                ref={this.rendererRef}
                                userInput={userInput}
                                handleUserInput={handleUserInput}
                                initializeUserInput={initializeUserInput}
                                widgets={hint.widgets}
                                content={hint.content || ""}
                                images={hint.images}
                                apiOptions={rendererApiOptions}
                                findExternalWidgets={
                                    this.props.findExternalWidgets
                                }
                                linterContext={PerseusLinter.pushContextStack(
                                    this.props.linterContext,
                                    "hint",
                                )}
                                strings={this.context.strings}
                            />
                        )}
                    </UserInputManager>
                </div>
            </DependenciesContext.Provider>
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
