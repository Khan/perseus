import * as React from "react";
import {forwardRef} from "react";

import styles from "./blank-widget.module.css";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {
    PerseusBlankWidgetOptions,
    PerseusBlankUserInput,
} from "@khanacademy/perseus-core";

type BlankProps = WidgetProps<PerseusBlankWidgetOptions, PerseusBlankUserInput>;

const BlankWidget = forwardRef<Widget, BlankProps>(function BlankWidget(props) {
    const classes = [styles.container]
        .concat(props.displayType !== "normal" ? [styles["super-sub"]] : [])
        .join(" ");

    //TO-DO (LEMS-4448): Remove testid once we have a better way to identify a blank-widget
    return <div className={classes} data-testid="blank-widget" />;
});
export default {
    name: "blank",
    displayName: "Blank",
    widget: BlankWidget,
    isLintable: true,
    hidden: true,
} satisfies WidgetExports<typeof BlankWidget>;
