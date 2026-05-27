import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {AlignmentSelect} from "./alignment-select";
import LabeledSwitch from "./labeled-switch";

import "./widget-editor-settings.css";

import type {Alignment, PerseusWidget} from "@khanacademy/perseus-core";

interface BestPracticesLink {
    url: string;
    label: string;
}

interface WidgetEditorSettingsProps {
    bestPractices?: BestPracticesLink;
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
}

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
        <View className="widget-editor-settings-container">
            {bestPractices && (
                <View className="best-practices-container">
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
