// WidgetIssueDetails.tsx
import {color} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import PerseusEditorAccordion from "./components/perseus-editor-accordion";

import type {Issue} from "./issues-panel";

type IssueProps = {
    issue: Issue;
};

const IssueDetails = ({issue}: IssueProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const toggleVisibility = () => setExpanded(!expanded);

    return (
        <PerseusEditorAccordion
            animated={true}
            expanded={expanded}
            onToggle={toggleVisibility}
            containerStyle={{backgroundColor: color.fadedGold8}}
            panelStyle={{backgroundColor: "white"}}
            header={
                <LabelLarge
                    style={{
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {`Warning: ${issue.id}`}
                </LabelLarge>
            }
        >
            <LabelSmall style={{fontWeight: "bold"}}>Description:</LabelSmall>
            <span>{issue.description}</span>
            <a href={issue.helpUrl} target="_blank" rel="noreferrer">
                {issue.help}
            </a>
            <LabelSmall style={{marginTop: "1em", fontWeight: "bold"}}>
                Impact:
            </LabelSmall>
            <span style={{fontWeight: "initial"}}> {issue.impact}</span>
            <LabelSmall style={{marginTop: "1em", fontWeight: "bold"}}>
                Issue:
            </LabelSmall>
            <span>{issue.message}</span>
        </PerseusEditorAccordion>
    );
};

export default IssueDetails;
