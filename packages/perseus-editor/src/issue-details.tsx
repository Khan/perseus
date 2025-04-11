// WidgetIssueDetails.tsx
import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import PerseusEditorAccordion from "./components/perseus-editor-accordion";

type IssueProps = {
    issueType: "violation" | "incomplete";
    issue: any;
};

const IssueDetails = (props: IssueProps) => {
    const {issue, issueType} = props;
    const [expanded, setExpanded] = React.useState(false);
    const toggleVisibility = () => setExpanded(!expanded);
    const title = issueType === "violation" ? "Violation" : "Investigate";

    return (
        <PerseusEditorAccordion
            animated={true}
            expanded={expanded}
            onToggle={toggleVisibility}
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
                    {`${title}: ${issue.id}`}
                </LabelLarge>
            }
        >
            <LabelSmall style={{fontWeight: "bold"}}>Description:</LabelSmall>
            <a href={issue.helpUrl} target="_blank" rel="noreferrer">
                {issue.help}
            </a>
            <LabelSmall style={{marginTop: "1em", fontWeight: "bold"}}>
                Impact:
            </LabelSmall>
            <span style={{fontWeight: "initial"}}> {issue.impact}</span>
            <LabelSmall style={{fontWeight: "bold"}}>Issue:</LabelSmall>
            <span>{issue.message}</span>
        </PerseusEditorAccordion>
    );
};

export default IssueDetails;
