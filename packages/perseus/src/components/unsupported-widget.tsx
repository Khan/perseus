import {Errors} from "@khanacademy/perseus-core";
import Banner from "@khanacademy/wonder-blocks-banner";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {Log} from "../logging/log";

import {usePerseusI18n} from "./i18n-context";

type Props = {
    // The type and ID of the widget this is shown in place of.
    type: string;
    widgetId: string;
    // Why the widget can't be shown:
    // - "unregistered": this build doesn't implement the widget's type.
    // - "exceeds-card-limit": a legacy sorter with more cards than the
    //   editor now allows.
    reason: "unregistered" | "exceeds-card-limit";
};

/**
 * Shown in place of a widget that learners can't use. Each one is logged
 * once, when it mounts, so we can find and fix the content.
 */
export default function UnsupportedWidget({type, widgetId, reason}: Props) {
    const {strings} = usePerseusI18n();

    useOnMountEffect(() => {
        Log.error("Unsupported widget rendered", Errors.NotAllowed, {
            loggedMetadata: {type, widgetId, reason},
        });
    });

    return (
        <div
            style={{
                paddingBlockStart: sizing.size_080,
                paddingBlockEnd: sizing.size_080,
            }}
        >
            <Banner text={strings.unsupportedWidget} kind="info" />
        </div>
    );
}
