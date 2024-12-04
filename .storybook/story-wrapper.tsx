import * as React from "react";

import "./webapp-styles.less";

/**
 * Wrapper for Storybook stories that
 * 1. Renders the story inside of a .framework-perseus container
 * 2. Includes the global styles from webapp
 */
function StoryWrapper(props) {
    // Most of our components have an expectation to be
    // rendered inside of a .framework-perseus container.
    // We want to make sure we can include it here, since it
    // can also affect the styling.
    return (
        <div className="framework-perseus box-sizing-border-box-reset">
            {props.children}
        </div>
    );
}

export default StoryWrapper;
