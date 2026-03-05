import {components} from "@khanacademy/perseus";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {alignmentInfoMap} from "./util";

import type {Alignment, PerseusWidget} from "@khanacademy/perseus-core";

const {InfoTip} = components;

interface Props {
    supportedAlignments: ReadonlyArray<Alignment>;
    widgetInfo: PerseusWidget;
    isEditingDisabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function AlignmentSelect({
    supportedAlignments,
    widgetInfo,
    isEditingDisabled,
    onChange,
}: Props) {
    return (
        <>
            <InfoTip>
                <ul>
                    {supportedAlignments.map((alignment, index) => (
                        <li key={alignment}>
                            {alignmentInfoMap[alignment]}
                            {/* Put line breaks after each alignment description
                                except the last one. */}
                            {index < supportedAlignments.length - 1 && (
                                <>
                                    <br />
                                    <br />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </InfoTip>
            <select
                className="alignment"
                value={widgetInfo.alignment}
                disabled={isEditingDisabled}
                onChange={onChange}
                style={{marginLeft: sizing.size_060}}
            >
                {supportedAlignments.map((alignment) => (
                    <option key={alignment}>{alignment}</option>
                ))}
            </select>
        </>
    );
}
