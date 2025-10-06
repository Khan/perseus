// WidgetIssueDetails.tsx
import {color} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import PerseusEditorAccordion from "./components/perseus-editor-accordion";
import IssueCta from "./issue-cta";

import type {Issue} from "./issues-panel";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

type IssueProps = {
    issue: Issue;
    question?: PerseusRenderer;
    onEditorChange: (newProps: any) => void;
    cta?: React.ReactNode;
};

const IssueDetails = ({issue, question, onEditorChange}: IssueProps) => {
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
            <IssueCta
                issue={issue}
                question={question}
                onEditorChange={onEditorChange}
            />
        </PerseusEditorAccordion>
    );
};

export default IssueDetails;
