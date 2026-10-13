import Banner from "@khanacademy/wonder-blocks-banner";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {usePerseusI18n} from "./i18n-context";

/**
 * Shown in place of a widget whose type this build of Perseus doesn't
 * implement.
 */
export default function UnsupportedWidget() {
    const {strings} = usePerseusI18n();

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
