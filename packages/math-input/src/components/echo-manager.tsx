/**
 * A component that renders and animates the selection state effect effect.
 */

import * as React from "react";
import {TransitionGroup, CSSTransition} from "react-transition-group";

import {KeyType, EchoAnimationType} from "../consts";
import KeyConfigs from "../data/key-configs";
import Keys from "../data/keys";

import KeypadButton from "./keypad-button";
import * as zIndexes from "./z-indexes";

import type {Border, Bound} from "../types";

type EchoProps = {
    animationDurationMs: number;
    borders: Border;
    id: Keys;
    initialBounds: Bound;
    onAnimationFinish: () => void;
};

class Echo extends React.Component<EchoProps> {
    componentDidMount() {
        // NOTE(charlie): This is somewhat unfortunate, as the component is
        // encoding information about its own animation, of which it should be
        // ignorant. However, there doesn't seem to be a cleaner way to make
        // this happen, and at least here, all the animation context is
        // colocated in this file.
        const {animationDurationMs, onAnimationFinish} = this.props;
        setTimeout(() => onAnimationFinish(), animationDurationMs);
    }

    render() {
        const {borders, id, initialBounds} = this.props;
        const {icon} = KeyConfigs[id];

        const containerStyle: any = {
            zIndex: zIndexes.echo,
            position: "absolute",
            pointerEvents: "none",
            ...initialBounds,
        };

        // NOTE(charlie): In some browsers, Aphrodite doesn't seem to flush its
        // styles quickly enough, so there's a flickering effect on the first
        // animation. Thus, it's much safer to do the styles purely inline.
        // <View> makes this difficult because some of its defaults, which are
        // applied via StyleSheet, will override our inlines.
        return (
            <div style={containerStyle}>
                <KeypadButton
                    icon={icon}
                    type={KeyType.ECHO}
                    borders={borders}
                />
            </div>
        );
    }
}

type EchoPropType = {
    animationId: string;
    animationType: EchoAnimationType;
    borders: Border;
    id: Keys;
    initialBounds: Bound;
};

type EchoManagerProps = {
    echoes: ReadonlyArray<EchoPropType>;
    onAnimationFinish?: (animationId: string) => void;
};

class EchoManager extends React.Component<EchoManagerProps> {
    _animationConfigForType = (animationType) => {
        // NOTE(charlie): These must be kept in sync with the transition
        // durations and classnames specified in echo.css.
        let animationDurationMs;
        let animationTransitionName;

        switch (animationType) {
            case EchoAnimationType.SLIDE_AND_FADE:
                animationDurationMs = 400;
                animationTransitionName = "echo-slide-and-fade";
                break;

            case EchoAnimationType.FADE_ONLY:
                animationDurationMs = 300;
                animationTransitionName = "echo-fade-only";
                break;

            case EchoAnimationType.LONG_FADE_ONLY:
                animationDurationMs = 400;
                animationTransitionName = "echo-long-fade-only";
                break;

            default:
                throw new Error(
                    `Invalid echo animation type: ${animationType}`,
                );
        }

        return {
            animationDurationMs,
            animationTransitionName,
        };
    };

    render() {
        const {echoes, onAnimationFinish} = this.props;

        return (
            <span>
                {Object.keys(EchoAnimationType).map((animationType) => {
                    // Collect the relevant parameters for the animation type, and
                    // filter for the appropriate echoes.
                    const {animationDurationMs, animationTransitionName} =
                        this._animationConfigForType(animationType);
                    const echoesForType = echoes.filter((echo) => {
                        return echo.animationType === animationType;
                    });

                    // TODO(charlie): Manage this animation with Aphrodite styles.
                    // Right now, there's a bug in the autoprefixer that breaks CSS
                    // transitions on mobile Safari.
                    // See: https://github.com/Khan/aphrodite/issues/68.
                    // As such, we have to do this with a stylesheet.
                    return (
                        <TransitionGroup key={animationType}>
                            {echoesForType.map((echo) => {
                                const {animationId} = echo;
                                return (
                                    <CSSTransition
                                        classNames={animationTransitionName}
                                        enter={true}
                                        exit={false}
                                        timeout={{
                                            enter: animationDurationMs,
                                        }}
                                        key={animationId}
                                    >
                                        <Echo
                                            animationDurationMs={
                                                animationDurationMs
                                            }
                                            onAnimationFinish={() =>
                                                onAnimationFinish?.(animationId)
                                            }
                                            {...echo}
                                        />
                                    </CSSTransition>
                                );
                            })}
                        </TransitionGroup>
                    );
                })}
            </span>
        );
    }
}

export default EchoManager;
