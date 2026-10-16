import {Errors} from "@khanacademy/perseus-core";
import Banner from "@khanacademy/wonder-blocks-banner";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {Log} from "../logging/log";

import {usePerseusI18n} from "./i18n-context";

type Props = {
    type: string;
    widgetId: string;
    /** Why the widget can't be shown */
    reason?: string;
};

/**
 * Shown in place of a widget that learners can't use. Each one is logged
 * once, when it mounts, so we can find and fix the content.
 */
export default function UnsupportedWidgetMessage({
    type,
    widgetId,
    reason = "widget-not-registered",
}: Props) {
    const {strings} = usePerseusI18n();

    useOnMountEffect(() => {
        Log.error("Unsupported widget rendered", Errors.NotAllowed, {
            loggedMetadata: {type, widgetId, reason},
        });
    });

    return (
        <div
            style={{
                paddingBlock: sizing.size_080,
            }}
        >
            <Banner text={strings.unsupportedWidget} kind="info" />
        </div>
    );
}
