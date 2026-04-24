import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {AlignmentSelect} from "./alignment-select";
import LabeledSwitch from "./labeled-switch";

import type {Alignment, PerseusWidget} from "@khanacademy/perseus-core";

type BestPractices = {
    url: string;
    label: string;
};

type WidgetEditorSettingsProps = {
    bestPractices?: BestPractices;
    supportsStaticMode: boolean;
    isStatic: boolean;
    onStaticChange: (value: boolean) => unknown;
    supportsGradedToggle: boolean;
    isGraded: boolean;
    onGradedChange: (value: boolean) => unknown;
    supportedAlignments: ReadonlyArray<Alignment>;
    widgetInfo: PerseusWidget;
    onAlignmentChange: (e: React.SyntheticEvent<HTMLSelectElement>) => unknown;
    isEditingDisabled: boolean;
};

function WidgetEditorSettings(props: WidgetEditorSettingsProps) {
    const {
        bestPractices,
        supportsStaticMode,
        isStatic,
        onStaticChange,
        supportsGradedToggle,
        isGraded,
        onGradedChange,
        supportedAlignments,
        widgetInfo,
        onAlignmentChange,
        isEditingDisabled,
    } = props;

    const hasControls =
        supportsStaticMode ||
        supportsGradedToggle ||
        supportedAlignments.length > 1;

    if (!bestPractices && !hasControls) {
        return null;
    }

    return (
        <View
            style={{
                paddingInline: spacing.small_12,
                paddingBlockStart: spacing.small_12,
            }}
        >
            {bestPractices && (
                <View style={{marginBlockEnd: sizing.size_060}}>
                    <Link href={bestPractices.url} target="_blank">
                        {bestPractices.label}
                    </Link>
                </View>
            )}
            {hasControls && (
                <div className="perseus-widget-row">
                    {supportsStaticMode && (
                        <LabeledSwitch
                            label="Static"
                            checked={isStatic}
                            disabled={isEditingDisabled}
                            onChange={onStaticChange}
                            style={{marginBlockEnd: sizing.size_060}}
                        />
                    )}
                    {supportsGradedToggle && (
                        <LabeledSwitch
                            label="Interactive but ungraded"
                            checked={!isGraded}
                            disabled={isEditingDisabled}
                            onChange={(e) => {
                                onGradedChange(!e);
                            }}
                            style={{marginBlockEnd: sizing.size_060}}
                        />
                    )}
                    {supportedAlignments.length > 1 && (
                        <AlignmentSelect
                            supportedAlignments={supportedAlignments}
                            widgetInfo={widgetInfo}
                            isEditingDisabled={isEditingDisabled}
                            onChange={onAlignmentChange}
                            style={{marginBlockEnd: sizing.size_060}}
                        />
                    )}
                </div>
            )}
        </View>
    );
}

export default WidgetEditorSettings;
