import * as React from "react";
import {forwardRef, useImperativeHandle} from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/blank/blank-ai-utils";

import styles from "./blank-widget.module.css";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {BlankPromptJSON} from "../../widget-ai-utils/blank/blank-ai-utils";
import type {
    PerseusBlankWidgetOptions,
    PerseusBlankUserInput,
} from "@khanacademy/perseus-core";

type BlankProps = WidgetProps<PerseusBlankWidgetOptions, PerseusBlankUserInput>;

const BlankWidget = forwardRef<Widget, BlankProps>(
    function BlankWidget(props, ref) {
        useImperativeHandle(ref, () => ({
            getPromptJSON: (): BlankPromptJSON =>
                _getPromptJSON(props, props.userInput),
        }));
        const classes = [styles.container]
            .concat(props.displayType !== "normal" ? [styles["super-sub"]] : [])
            .join(" ");

        //TO-DO: Remove testid once we have a better way to identify a blank-widget
        return <div className={classes} data-testid="blank-widget" />;
    },
);
export default {
    name: "blank",
    displayName: "Blank",
    widget: BlankWidget,
    isLintable: true,
    hidden: true,
} satisfies WidgetExports<typeof BlankWidget>;
