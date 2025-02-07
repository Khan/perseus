import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import iconPass from "@phosphor-icons/core/fill/check-circle-fill.svg";
import iconCaution from "@phosphor-icons/core/fill/warning-fill.svg";
import iconViolations from "@phosphor-icons/core/fill/warning-octagon-fill.svg";
import * as axeCore from "axe-core";
import * as React from "react";
import {useEffect, useState} from "react";

import PerseusEditorAccordion from "./components/perseus-editor-accordion";

import type axe from "axe-core";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

const axeCoreEditorOptions = {
    include: {
        fromFrames: ["iframe", "#page-container"],
    },
    exclude: {
        fromFrames: ["iframe", '[target="lint-help-window"]'],
    },
    reporter: "v2",
};

const axeCoreStorybookOptions = {
    include: ["#preview-panel"],
};

const AccessibilityPanel = () => {
    const [violations, setViolations] = useState([] as axe.Result[]);
    const [incompletes, setIncompletes] = useState([] as axe.Result[]);
    const [showDetails, setShowDetails] = useState(false);

    // Variables needed within the setTimeout function (useState doesn't work within setTimeout)
    let timeoutId = setTimeout(() => {});
    let isInStorybook = false;

    const runAxeCoreOnUpdate = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const options = isInStorybook
                ? axeCoreStorybookOptions
                : axeCoreEditorOptions;
            if (isInStorybook) {
                axeCore.configure({reporter: "v2"});
            }
            axeCore.run(options).then((results) => {
                // eslint-disable-next-line no-console
                console.log(`Accessibility Results: `, results);
                setViolations(results.violations);
                setIncompletes(results.incomplete);
            });
        }, 1500);
    };

    useEffect(() => {
        isInStorybook = !!document.getElementById("storybook-root");
        window.addEventListener("message", runAxeCoreOnUpdate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleIcon = showDetails ? caretDown : caretRight;
    const togglePanel = () => {
        setShowDetails(!showDetails);
    };
    const buttonStyle = {
        marginRight: 0,
        flexGrow: 0,
    };
    const editorClasses =
        "perseus-widget-editor" +
        (showDetails ? " perseus-widget-editor-open" : "");
    const icon =
        violations.length > 0
            ? iconViolations
            : incompletes.length > 0
              ? iconCaution
              : iconPass;
    const iconColor =
        violations.length > 0
            ? wbColor.red
            : incompletes.length > 0
              ? wbColor.gold
              : wbColor.green;
    const issuesCount = `${violations.length + incompletes.length} issue${violations.length + incompletes.length === 1 ? "" : "s"}`;

    // TODO: Build UI for panel
    //          Panel should be pre-collapsed, with issue counts & icons in header
    //          List out violations and incompletes as accordion sections (when header accordion is expanded)
    //          Details are listed in accordion panel
    //          Highlight element toggle
    return (
        <div className={editorClasses}>
            <div className="perseus-widget-editor-title">
                <div className="perseus-widget-editor-title-id">
                    <IconButton
                        icon={toggleIcon}
                        kind="secondary"
                        size="small"
                        onClick={togglePanel}
                        style={buttonStyle}
                    />
                    <span>Accessibility</span>
                </div>
                {issuesCount}
                <PhosphorIcon icon={icon} size="medium" color={iconColor} />
            </div>
            <div className="perseus-widget-editor-panel">
                <div className="perseus-widget-editor-content">
                    {violations.map((issue) => (
                        <IssueDetails
                            key={issue.id}
                            issue={issue}
                            issueType="violation"
                        />
                    ))}
                    {incompletes.map((issue) => (
                        <IssueDetails
                            key={issue.id}
                            issue={issue}
                            issueType="incomplete"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

type IssueProps = {
    issueType: "violation" | "incomplete";
    issue: axe.Result;
};

const IssueDetails = (props: IssueProps) => {
    const {issue, issueType} = props;
    const [expanded, setExpanded] = useState(false);
    const toggleVisibility = () => setExpanded(!expanded);
    const title = issueType === "violation" ? "Violation" : "Investigate";
    const headingStyle = {
        textOverflow: "ellipsis",
        maxWidth: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
    };
    console.log(`Issue: `, issue);

    return (
        <PerseusEditorAccordion
            animated={true}
            expanded={expanded}
            onToggle={toggleVisibility}
            header={<LabelLarge style={headingStyle}>{`${title}: ${issue.id}`}</LabelLarge>}
        >
            Details
        </PerseusEditorAccordion>
    );
};

export default AccessibilityPanel;
