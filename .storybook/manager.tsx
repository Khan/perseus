import * as React from "react";
import {Button, TooltipLinkList, WithTooltip} from "storybook/internal/components";
import {addons, types, useGlobals} from "storybook/manager-api";
import theme from "./theme";

import PerseusFeatureFlags from "../packages/perseus-core/src/feature-flags";

addons.setConfig({
    sidebar: {
        // This will hide the root nodes in the sidebar and show it as folders instead.
        // See docs https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#roots
        showRoots: false,
    },
    theme: theme,
});

const TOOL_ID = "perseus/feature-flags/tool";

function FeatureFlagsToolbar() {
    const [globals, updateGlobals] = useGlobals();
    const activeFlags: string[] = globals.featureFlags ?? [];

    const toggleFlag = (flag: string) => {
        updateGlobals({
            featureFlags: activeFlags.includes(flag)
                ? activeFlags.filter((f) => f !== flag)
                : [...activeFlags, flag],
        });
    };

    const links = [...PerseusFeatureFlags].map((flag) => {
        const isActive = activeFlags.includes(flag);
        return {
            id: flag,
            title: (
                <span style={{display: "flex", alignItems: "center", gap: 6}}>
                    <span
                        aria-hidden="true"
                        style={{
                            width: 14,
                            textAlign: "center",
                            flexShrink: 0,
                            fontWeight: "bold",
                        }}
                    >
                        {isActive ? "✓" : ""}
                    </span>
                    {flag}
                </span>
            ),
            active: isActive,
            onClick: () => toggleFlag(flag),
        };
    });

    const label =
        activeFlags.length === 0
            ? "Feature Flags"
            : `Feature Flags: ${activeFlags.length} on`;

    return (
        <React.Suspense fallback={null}>
            <WithTooltip
                placement="bottom"
                trigger="click"
                closeOnOutsideClick
                tooltip={<TooltipLinkList links={links} />}
            >
                <Button
                    size="small"
                    variant="outline"
                    active={activeFlags.length > 0}
                    title="Feature Flags"
                >
                    {label}
                </Button>
            </WithTooltip>
        </React.Suspense>
    );
}

addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Feature Flags",
    match: () => true,
    render: () => <FeatureFlagsToolbar />,
});
