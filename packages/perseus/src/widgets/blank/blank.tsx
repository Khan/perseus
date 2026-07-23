import * as React from "react";
import {forwardRef, useImperativeHandle} from "react";
import _ from "underscore";

//import {PerseusI18nContext} from "../../components/i18n-context";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/blank/blank-ai-utils";

import styles from "./blank-widget.module.css";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {BlankPromptJSON} from "../../widget-ai-utils/blank/blank-ai-utils";
import type {
    PerseusBlankWidgetOptions,
    PerseusBlankUserInput,
} from "@khanacademy/perseus-core";

type WidgetHandle = Pick<Widget, "getPromptJSON">;

export type BlankProps = WidgetProps<
    PerseusBlankWidgetOptions,
    PerseusBlankUserInput
>;

const BlankWidget = forwardRef<WidgetHandle, BlankProps>(
    function BlankWidget(props, ref) {
        //const context = React.useContext(PerseusI18nContext);

        useImperativeHandle(ref, () => ({
            getPromptJSON: (): BlankPromptJSON => _getPromptJSON(props),
        }));
        const classes = [styles.container]
            .concat(props.displayType !== "normal" ? [styles["super-sub"]] : [])
            .join(" ");

        return <div className={classes} data-testid="blank-widget" />;
    },
);
export default {
    name: "blank",
    displayName: "Blank",
    widget: BlankWidget,
    isLintable: true,
} satisfies WidgetExports<typeof BlankWidget>;
