import Banner from "@khanacademy/wonder-blocks-banner";
import * as React from "react";
import {forwardRef} from "react";

import {usePerseusI18n} from "../../components/i18n-context";

import type {Widget, WidgetExports} from "../../types";

const DeprecatedStandin = forwardRef<Widget>(function DeprecatedStandin() {
    const {strings} = usePerseusI18n();

    return (
        <div
            style={{
                paddingBlockStart: 8,
                paddingBlockEnd: 8,
            }}
        >
            <Banner text={strings.deprecatedStandin} kind="info" />
        </div>
    );
});

export default {
    name: "deprecated-standin",
    displayName: "Deprecated Standin",
    widget: DeprecatedStandin,
    hidden: true,
} satisfies WidgetExports<typeof DeprecatedStandin>;
