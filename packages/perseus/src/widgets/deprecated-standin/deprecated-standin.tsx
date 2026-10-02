import Banner from "@khanacademy/wonder-blocks-banner";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";
import {forwardRef} from "react";

import {usePerseusI18n} from "../../components/i18n-context";

import type {Widget, WidgetExports} from "../../types";

// forwardRef is only needed because WidgetContainer passes a ref
// but React complains when you pass a ref to a functional component
// without forwardRef
const DeprecatedStandin = forwardRef<Widget>(function DeprecatedStandin() {
    const {strings} = usePerseusI18n();

    return (
        <div
            style={{
                paddingBlockStart: sizing.size_080,
                paddingBlockEnd: sizing.size_080,
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
