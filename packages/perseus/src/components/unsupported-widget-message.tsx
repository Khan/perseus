import Banner from "@khanacademy/wonder-blocks-banner";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {useDependencies} from "../dependencies";

import {usePerseusI18n} from "./i18n-context";

type Props = {
    widgetType: string;
    widgetSubType: string;
    widgetId: string;
    /** Why the widget can't be shown */
    reason?: string;
};

/**
 * Shown in place of a widget that learners can't use. Each one is logged
 * once, when it mounts, so we can find and fix the content.
 */
export default function UnsupportedWidgetMessage({
    widgetType,
    widgetSubType,
    widgetId,
    reason = "widget-not-registered",
}: Props) {
    const {strings} = usePerseusI18n();
    const dependencies = useDependencies();

    useOnMountEffect(() => {
        dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:unsupported",
            payload: {
                widgetType,
                widgetSubType,
                widgetId,
                reason,
            },
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
