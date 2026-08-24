import * as React from "react";

const BlankComponent = () => {
    const classes = [styles.container]
        .concat(
            props.options.displayType !== "normal" ? [styles["super-sub"]] : [],
        )
        .join(" ");
};
