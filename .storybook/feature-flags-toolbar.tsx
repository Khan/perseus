import * as React from "react";
import {Button, WithTooltip} from "storybook/internal/components";
import {useGlobals} from "storybook/manager-api";

import PerseusFeatureFlags from "../packages/perseus-core/src/feature-flags";

/**
 * Storybook toolbar button that lets developers toggle Perseus feature flags
 * on and off globally across all stories. Flags are sourced automatically
 * from PerseusFeatureFlags and apply on top of any story-level flag overrides.
 */
export function FeatureFlagsToolbar() {
    const [globals, updateGlobals] = useGlobals();
    const activeFlags: string[] = globals.featureFlags ?? [];

    const toggleFlag = (flag: string) => {
        updateGlobals({
            featureFlags: activeFlags.includes(flag)
                ? activeFlags.filter((f) => f !== flag)
                : [...activeFlags, flag],
        });
    };

    const label =
        activeFlags.length === 0
            ? "Feature Flags"
            : `Feature Flags: ${activeFlags.length} on`;

    return (
        <WithTooltip
            placement="bottom"
            trigger="click"
            closeOnOutsideClick
            tooltip={
                <FlagList activeFlags={activeFlags} onToggle={toggleFlag} />
            }
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
    );
}

type FlagListProps = {
    activeFlags: string[];
    onToggle: (flag: string) => void;
};

/**
 * Renders the dropdown list of feature flags with checkboxes for the
 * Storybook toolbar. Each flag can be toggled independently.
 */
function FlagList({activeFlags, onToggle}: FlagListProps) {
    return (
        <div style={{padding: 4, minWidth: 180}}>
            {[...PerseusFeatureFlags].map((flag) => (
                <label
                    key={flag}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "7px 10px",
                        cursor: "pointer",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={activeFlags.includes(flag)}
                        onChange={() => onToggle(flag)}
                    />
                    {flag}
                </label>
            ))}
        </div>
    );
}
