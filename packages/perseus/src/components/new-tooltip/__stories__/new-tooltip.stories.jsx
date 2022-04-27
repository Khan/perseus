// @flow
import Button from "@khanacademy/wonder-blocks-button";
import {OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import mediaQueries from "../../../styles/media-queries.js";
import NewTooltip from "../new-tooltip.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/New Tooltip",
}: Story);

const styles = StyleSheet.create({
    wrapper: {
        margin: "50px auto",
        border: "1px solid #aaa",
        height: 44,
        width: 44,
    },

    wrapperSmall: {
        height: 4,
        width: 4,
        fontSize: 0,
        background: "red",
    },

    wrapperLeft: {
        marginLeft: 0,
    },

    wrapperRight: {
        marginRight: 0,
    },

    target: {
        height: "100%",
        width: "100%",
        textAlign: "center",
    },

    scrollContainer: {
        overflow: "scroll",
        width: "100%",
        height: 100,
    },

    scrollContainerPadder: {
        paddingTop: 120,
        paddingBottom: 120,
        paddingLeft: "105%",
        paddingRight: "105%",
    },

    modal: {
        width: "90%",
        height: 350,
        backgroundColor: "#ffeeff",
        border: "solid 1px #eeeeee",
    },

    modalScrollTesterCase: {
        height: 500,
        overflow: "scroll",
    },
});

class DismissDemo extends React.PureComponent<Empty, {|dismissed: boolean|}> {
    state = {dismissed: false};

    render(): React.Node {
        return (
            <div>
                <div className={css(styles.wrapper)}>
                    <NewTooltip
                        content={content}
                        dismissed={this.state.dismissed}
                        dismissOnClickClose
                        onDismiss={() => this.setState({dismissed: true})}
                        toggleOnHover={false}
                        showOnMount
                        a11y={{title: "Controlled dismissable tooltip"}}
                    >
                        <div className={css(styles.target)}>Hover me!</div>
                    </NewTooltip>
                </div>
                <div style={{textAlign: "center"}}>
                    <Button
                        disabled={!this.state.dismissed}
                        onClick={(e) => this.setState({dismissed: false})}
                    >
                        Undismiss
                    </Button>
                </div>
            </div>
        );
    }
}

class ContentChangingTooltip extends React.PureComponent<
    Empty,
    {|now: number|},
> {
    _interval: ?IntervalID;
    state = {now: Date.now()};

    componentDidMount() {
        // TODO(jeff, WEB-1378): Use Wonder Blocks Timing API.
        // eslint-disable-next-line no-restricted-syntax
        this._interval = setInterval(this._updateTime, 1000);
    }

    componentWillUnmount() {
        if (this._interval) {
            // TODO(jeff, WEB-1378): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            clearInterval(this._interval);
        }
    }

    _updateTime = () => {
        this.setState({now: Date.now()});
    };

    render(): React.Node {
        return (
            <div className={css(styles.wrapper)}>
                <NewTooltip
                    content={"Timestamp: " + this.state.now}
                    toggleOnHover={false}
                    showOnMount
                    a11y={{title: "Content-changing permanent tooltip"}}
                >
                    <div className={css(styles.target)}>Hover me!</div>
                </NewTooltip>
            </div>
        );
    }
}

const content = "Hello, world! How are you today? I am quite well!";

type ModalTesterProps = {||};
type ModalTesterState = {|
    showModal: boolean,
|};

class ModalTester extends React.Component<ModalTesterProps, ModalTesterState> {
    state = {
        showModal: false,
    };

    renderModal() {
        const {showModal} = this.state;

        if (!showModal) {
            return null;
        }

        return (
            <OnePaneDialog
                style={styles.modal}
                onClose={() => this.setState({showModal: false})}
                title="Tooltip Demo"
                content={
                    <>
                        <h1>This is a test of tooltips in modals</h1>
                        <h2>Scroll down to see more tooltips</h2>

                        <div className={css(styles.modalScrollTesterCase)}>
                            <h2>Mouse over</h2>
                            <div className={css(styles.wrapper)}>
                                <NewTooltip
                                    content={content}
                                    a11y={{
                                        title: "Mouse Over Demo",
                                    }}
                                >
                                    <div className={css(styles.target)}>
                                        Hover me!
                                    </div>
                                </NewTooltip>
                            </div>

                            <h2 id="tooltiplabel">Static and Scroll</h2>
                            <p>Scroll</p>
                            <p>Scroll</p>
                            <p>Scroll</p>
                            <p>Scroll</p>
                            <div className={css(styles.wrapper)}>
                                <NewTooltip
                                    content={content}
                                    toggleOnHover={false}
                                    showOnMount
                                    a11y={{
                                        title: {id: "tooltiplabel"},
                                    }}
                                >
                                    <div className={css(styles.target)}>
                                        Hover me!
                                    </div>
                                </NewTooltip>
                            </div>
                            <p>Scroll</p>
                            <p>Scroll</p>
                            <p>Scroll</p>
                            <p>Scroll</p>
                            <p>Scroll</p>
                            <p>Scroll</p>
                        </div>
                    </>
                }
            />
        );
    }

    render(): React.Node {
        return (
            <div>
                <button onClick={() => this.setState({showModal: true})}>
                    SHOW THE MODAL
                </button>
                {this.renderModal()}
            </div>
        );
    }
}

const ShouldNotRender = () => {
    throw new Error(
        "The always-dismissed tooltip should never be open, so its " +
            "content should never render, but it happened anyway!",
    );
};

const Wrapper = (props) => (
    <div className={css(styles.wrapper)}>
        <NewTooltip {...props} />
    </div>
);

const ScrollWrapper = (props) => (
    <div className={css(styles.scrollContainer)}>
        <div className={css(styles.scrollContainerPadder)}>
            <div className={css(styles.wrapper)}>
                <NewTooltip {...props} />
            </div>
        </div>
    </div>
);

const SmallWrapperLeft = (props) => (
    <div
        className={css(styles.wrapper, styles.wrapperSmall, styles.wrapperLeft)}
    >
        <NewTooltip {...props} />
    </div>
);

const SmallWrapperRight = (props) => (
    <div
        className={css(
            styles.wrapper,
            styles.wrapperSmall,
            styles.wrapperRight,
        )}
    >
        <NewTooltip {...props} />
    </div>
);

export const BasicHoverTooltipAndAriaLive = (args: StoryArgs): React.Node => {
    const params = {
        content,
        a11y: {title: "Basic hover tooltip", assertiveness: "polite"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const BasicPermanentTooltip = (args: StoryArgs): React.Node => {
    const params = {
        content,
        toggleOnHover: false,
        showOnMount: true,
        a11y: {title: "Basic permanent tooltip"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const BasicPermanentTooltipBottom = (args: StoryArgs): React.Node => {
    const params = {
        content,
        side: "bottom",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {title: "Basic permanent tooltip (bottom)"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const BasicPermanentTooltipLeft = (args: StoryArgs): React.Node => {
    const params = {
        content,
        side: "left",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {title: "Basic permanent tooltip (left)"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const BasicPermanentTooltipRight = (args: StoryArgs): React.Node => {
    const params = {
        content,
        side: "right",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {title: "Basic permanent tooltip (right)"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const BasicDismissableTooltip = (args: StoryArgs): React.Node => {
    const params = {
        content,
        dismissOnClickClose: true,
        toggleOnHover: false,
        showOnMount: true,
        a11y: {title: "Basic dismissable tooltip"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const ControlledDismissableTooltip = (args: StoryArgs): React.Node => {
    return <DismissDemo />;
};

export const AlwaysDismissedTooltip = (args: StoryArgs): React.Node => {
    const params = {
        content: <ShouldNotRender />,
        side: "left",
        dismissed: true,
        toggleOnHover: false,
        showOnMount: true,
        a11y: {title: "Always-dismissed tooltip"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

// To test that content changes pass through the portal correctly.
export const ContentChangingPermanentTooltip = (
    args: StoryArgs,
): React.Node => {
    return <ContentChangingTooltip />;
};

export const PermanentTooltipInScrollableContainer = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        toggleOnHover: false,
        showOnMount: true,
        a11y: {
            title: "Permanent tooltip in scrollable container",
        },
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <ScrollWrapper {...params} />;
};

export const PermanentTooltipInScrollableContainerBottom = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        side: "bottom",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {
            title: "Permanent tooltip in scrollable container (bottom)",
        },
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <ScrollWrapper {...params} />;
};

export const PermanentTooltipInScrollableContainerLeft = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        side: "left",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {
            title: "Permanent tooltip in scrollable container (left)",
        },
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <ScrollWrapper {...params} />;
};

export const PermanentTooltipInScrollableContainerRight = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        side: "right",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {
            title: "Permanent tooltip in scrollable container (right)",
        },
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <ScrollWrapper {...params} />;
};

export const InvertedPermanentTooltip = (args: StoryArgs): React.Node => {
    const params = {
        content,
        inverted: true,
        toggleOnHover: false,
        dismissOnClickClose: true,
        showOnMount: true,
        a11y: {title: "Inverted permanent tooltip"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const BluePermanentTooltip = (args: StoryArgs): React.Node => {
    const params = {
        content,
        color: "blue",
        toggleOnHover: false,
        dismissOnClickClose: true,
        showOnMount: true,
        a11y: {title: "Blue permanent tooltip"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const InvertedBluePermanentTooltip = (args: StoryArgs): React.Node => {
    const params = {
        content,
        color: "blue",
        inverted: true,
        dismissOnClickClose: true,
        toggleOnHover: false,
        showOnMount: true,
        a11y: {title: "Inverted blue permanent tooltip"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const PermanentTooltipAtFarrrLeftSmallTarget = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        showOnMount: true,
        a11y: {title: "Permanent tooltip at farrr left (small target)"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <SmallWrapperLeft {...params} />;
};

export const PermanentTooltipAtFarrrRightSmallTarget = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        showOnMount: true,
        a11y: {title: "Permanent tooltip at farrr right (small target)"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <SmallWrapperRight {...params} />;
};

export const PermanentTooltipWithArrowTouchingTarget = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        offsetFrom: "arrow",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {title: "Permanent tooltip with arrow touching target"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const PermanentTooltipWithArrowTouchingTargetBottom = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        side: "bottom",
        offsetFrom: "arrow",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {
            title: "Permanent tooltip with arrow touching target (bottom)",
        },
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const PermanentTooltipWithArrowTouchingTargetLeft = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        side: "left",
        offsetFrom: "arrow",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {
            title: "Permanent tooltip with arrow touching target (left)",
        },
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const PermanentTooltipWithArrowTouchingTargetRight = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        side: "right",
        offsetFrom: "arrow",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {
            title: "Permanent tooltip with arrow touching target (right)",
        },
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const PermanentTooltipWith5pxOffsetFromBubble = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        offset: 5,
        toggleOnHover: false,
        showOnMount: true,
        a11y: {
            title: "Permanent tooltip with 5px offset from bubble",
        },
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const PermanentTooltipWith5pxOffsetFromArrow = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content,
        offset: 5,
        offsetFrom: "arrow",
        toggleOnHover: false,
        showOnMount: true,
        a11y: {
            title: "Permanent tooltip with 5px offset from arrow",
        },
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const PermanentTooltipWith25pxMargin = (args: StoryArgs): React.Node => {
    const params = {
        content,
        tooltipMargin: 100,
        toggleOnHover: false,
        showOnMount: true,
        a11y: {
            title: "Permanent tooltip with 100px margin",
        },
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return <Wrapper {...params} />;
};

export const MobileOnlyTooltip = (args: StoryArgs): React.Node => {
    const params = {
        content,
        toggleOnHover: false,
        showOnMount: true,
        media: mediaQueries.smOrSmaller,
        a11y: {title: "Mobile-only tooltip"},
        children: <div className={css(styles.target)}>Hover me!</div>,
    };
    return (
        <div>
            <Wrapper {...params} />
            <div style={{textAlign: "center"}}>
                Resize your browser so that its very narrow to see the tooltip
            </div>
        </div>
    );
};

export const DesktopMobileTooltipWithDifferentStylesAndAriaLive = (
    args: StoryArgs,
): React.Node => {
    const params = {
        content: "Hello, mobile! I'm red and on the left!",
        side: "left",
        color: "red",
        toggleOnHover: false,
        showOnMount: true,
        media: mediaQueries.smOrSmaller,
        a11y: {
            title: "Mobile tooltip with different style",
            assertiveness: "polite",
        },
        children: (
            <NewTooltip
                content="Hello, desktop! I'm blue and on the right!"
                side="right"
                color="blue"
                toggleOnHover={false}
                showOnMount
                media={mediaQueries.mdOrLarger}
                a11y={{
                    title: "Desktop tooltip with different style",
                    assertiveness: "polite",
                }}
            >
                <div className={css(styles.target)}>Hover me!</div>
            </NewTooltip>
        ),
    };
    return <Wrapper {...params} />;
};

export const TooltipsInModals = (args: StoryArgs): React.Node => {
    return <ModalTester />;
};
