// @flow
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import FlexiblePosition from "../flexible-position.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Flexible Position",
}: Story);

const styles = StyleSheet.create({
    wrapper: {
        background: "#fcfcfc",
        borderColor: "gray",
        borderStyle: "solid",
        borderWidth: "2px 0",
        boxSizing: "content-box",
        margin: "0 auto",
        width: 800,
    },

    wrapperVertical: {
        borderWidth: "0 2px",
        height: 800,
        width: 200,
    },

    wrapperSmall: {
        width: 100,
    },

    wrapperSmallVertical: {
        height: 100,
    },

    // `content` and `contentInner` together have a natural width of 200px.
    // However, if the available space is smaller, `content` will overflow with
    // scrollbars in order to fit the content in the available space. This
    // effect is visible in the "very small container" fixture.
    content: {
        background: "#fcc",
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: "0 2px",
        boxSizing: "border-box",
        textAlign: "center",
        overflow: "auto",
    },

    contentVertical: {
        borderWidth: "2px 0",
    },

    contentInner: {
        width: 196,
    },

    contentInnerVertical: {
        height: 196,
    },
});

const Wrapper = (props: React.ElementConfig<typeof FlexiblePosition>) => (
    <div className={css(styles.wrapper)}>
        <FlexiblePosition {...props} />
    </div>
);

const SmallWrapper = (props: React.ElementConfig<typeof FlexiblePosition>) => (
    <div className={css(styles.wrapper, styles.wrapperSmall)}>
        <FlexiblePosition {...props} />
    </div>
);

const VerticalWrapper = (
    props: React.ElementConfig<typeof FlexiblePosition>,
) => (
    <div className={css(styles.wrapper, styles.wrapperVertical)}>
        <FlexiblePosition {...props} />
    </div>
);

const SmallVerticalWrapper = (
    props: React.ElementConfig<typeof FlexiblePosition>,
) => (
    <div
        className={css(
            styles.wrapper,
            styles.wrapperVertical,
            styles.wrapperSmallVertical,
        )}
    >
        <FlexiblePosition {...props} />
    </div>
);

export const CenteredAtHalfHorizontal = (args: StoryArgs): React.Node => {
    const params = {
        direction: "horizontal",
        pxFromStart: 400,
        pxFromEnd: 400,
        children: (
            <div className={css(styles.content)}>
                <div className={css(styles.contentInner)}>Hello, world!</div>
            </div>
        ),
    };
    return <Wrapper {...params} />;
};

export const CenteredAtQuarterFromLeftHorizontal = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "horizontal",
        pxFromStart: 200,
        pxFromEnd: 600,
        children: (
            <div className={css(styles.content)}>
                <div className={css(styles.contentInner)}>Hello, world!</div>
            </div>
        ),
    };
    return <Wrapper {...params} />;
};

export const CenteredAtQuarterFromRightHorizontal = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "horizontal",
        pxFromStart: 600,
        pxFromEnd: 200,
        children: (
            <div className={css(styles.content)}>
                <div className={css(styles.contentInner)}>Hello, world!</div>
            </div>
        ),
    };
    return <Wrapper {...params} />;
};

export const CenteredAtEigthFromLeftExactlyAtEdgeHorizontal = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "horizontal",
        pxFromStart: 100,
        pxFromEnd: 700,
        children: (
            <div className={css(styles.content)}>
                <div className={css(styles.contentInner)}>Hello, world!</div>
            </div>
        ),
    };
    return <Wrapper {...params} />;
};

export const CenteredAtEigthFromRightExactlyAtEdgeHorizontal = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "horizontal",
        pxFromStart: 700,
        pxFromEnd: 100,
        children: (
            <div className={css(styles.content)}>
                <div className={css(styles.contentInner)}>Hello, world!</div>
            </div>
        ),
    };
    return <Wrapper {...params} />;
};

export const CenteredAtSixteengthFromLeftWouldOverflowHorizontal = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "horizontal",
        pxFromStart: 50,
        pxFromEnd: 750,
        children: (
            <div className={css(styles.content)}>
                <div className={css(styles.contentInner)}>Hello, world!</div>
            </div>
        ),
    };
    return <Wrapper {...params} />;
};

export const CenteredAtSixteengthFromRightWouldOverflowHorizontal = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "horizontal",
        pxFromStart: 750,
        pxFromEnd: 50,
        children: (
            <div className={css(styles.content)}>
                <div className={css(styles.contentInner)}>Hello, world!</div>
            </div>
        ),
    };
    return <Wrapper {...params} />;
};

export const CenteredAt0FromLeftWouldOverflowHorizontal = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "horizontal",
        pxFromStart: 0,
        pxFromEnd: 800,
        children: (
            <div className={css(styles.content)}>
                <div className={css(styles.contentInner)}>Hello, world!</div>
            </div>
        ),
    };
    return <Wrapper {...params} />;
};

export const CenteredAt0FromRightWouldOverflowHorizontal = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "horizontal",
        pxFromStart: 800,
        pxFromEnd: 0,
        children: (
            <div className={css(styles.content)}>
                <div className={css(styles.contentInner)}>Hello, world!</div>
            </div>
        ),
    };
    return <Wrapper {...params} />;
};

export const CenteredInVerySmallContainerWouldOverflowHorizontal = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "horizontal",
        pxFromStart: 50,
        pxFromEnd: 50,
        children: (
            <div className={css(styles.content)}>
                <div className={css(styles.contentInner)}>Hello, world!</div>
            </div>
        ),
    };
    return <SmallWrapper {...params} />;
};

export const CenteredAtHalfVertical = (args: StoryArgs): React.Node => {
    const params = {
        direction: "vertical",
        pxFromStart: 400,
        pxFromEnd: 400,
        children: (
            <div className={css(styles.content, styles.contentVertical)}>
                <div className={css(styles.contentInnerVertical)}>
                    Hello, world!
                </div>
            </div>
        ),
    };
    return <VerticalWrapper {...params} />;
};

export const CenteredAtQuarterFromTopVertical = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "vertical",
        pxFromStart: 200,
        pxFromEnd: 600,
        children: (
            <div className={css(styles.content, styles.contentVertical)}>
                <div className={css(styles.contentInnerVertical)}>
                    Hello, world!
                </div>
            </div>
        ),
    };
    return <VerticalWrapper {...params} />;
};

export const CenteredAtQuarterFromBottomVertical = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "vertical",
        pxFromStart: 600,
        pxFromEnd: 200,
        children: (
            <div className={css(styles.content, styles.contentVertical)}>
                <div className={css(styles.contentInnerVertical)}>
                    Hello, world!
                </div>
            </div>
        ),
    };
    return <VerticalWrapper {...params} />;
};

export const CenteredAtEigthFromTopExactlyAtEdgeVertical = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "vertical",
        pxFromStart: 100,
        pxFromEnd: 700,
        children: (
            <div className={css(styles.content, styles.contentVertical)}>
                <div className={css(styles.contentInnerVertical)}>
                    Hello, world!
                </div>
            </div>
        ),
    };
    return <VerticalWrapper {...params} />;
};

export const CenteredAtEigthFromBottomExactlyAtEdgeVertical = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "vertical",
        pxFromStart: 700,
        pxFromEnd: 100,
        children: (
            <div className={css(styles.content, styles.contentVertical)}>
                <div className={css(styles.contentInnerVertical)}>
                    Hello, world!
                </div>
            </div>
        ),
    };
    return <VerticalWrapper {...params} />;
};

export const CenteredAtSixteengthFromTopWouldOverflowVertical = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "vertical",
        pxFromStart: 50,
        pxFromEnd: 750,
        children: (
            <div className={css(styles.content, styles.contentVertical)}>
                <div className={css(styles.contentInnerVertical)}>
                    Hello, world!
                </div>
            </div>
        ),
    };
    return <VerticalWrapper {...params} />;
};

export const CenteredAtSixteengthFromBottomWouldOverflowVertical = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "vertical",
        pxFromStart: 750,
        pxFromEnd: 50,
        children: (
            <div className={css(styles.content, styles.contentVertical)}>
                <div className={css(styles.contentInnerVertical)}>
                    Hello, world!
                </div>
            </div>
        ),
    };
    return <VerticalWrapper {...params} />;
};

export const CenteredAt0FromTopWouldOverflowVertical = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "vertical",
        pxFromStart: 0,
        pxFromEnd: 800,
        children: (
            <div className={css(styles.content, styles.contentVertical)}>
                <div className={css(styles.contentInnerVertical)}>
                    Hello, world!
                </div>
            </div>
        ),
    };
    return <VerticalWrapper {...params} />;
};

export const CenteredAt0FromBottomWouldOverflowVertical = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "vertical",
        pxFromStart: 800,
        pxFromEnd: 0,
        children: (
            <div className={css(styles.content, styles.contentVertical)}>
                <div className={css(styles.contentInnerVertical)}>
                    Hello, world!
                </div>
            </div>
        ),
    };
    return <VerticalWrapper {...params} />;
};

export const CenteredInVerySmallContainerWouldOverflowVertical = (
    args: StoryArgs,
): React.Node => {
    const params = {
        direction: "vertical",
        pxFromStart: 50,
        pxFromEnd: 50,
        children: (
            <div className={css(styles.content, styles.contentVertical)}>
                <div className={css(styles.contentInnerVertical)}>
                    Hello, world!
                </div>
            </div>
        ),
    };
    return <SmallVerticalWrapper {...params} />;
};
