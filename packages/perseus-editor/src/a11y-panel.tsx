import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Switch from "@khanacademy/wonder-blocks-switch";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import iconPass from "@phosphor-icons/core/fill/check-circle-fill.svg";
import iconCaution from "@phosphor-icons/core/fill/warning-fill.svg";
import iconViolations from "@phosphor-icons/core/fill/warning-octagon-fill.svg";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import * as axeCore from "axe-core";
import * as React from "react";
import {useEffect, useState} from "react";

import PerseusEditorAccordion from "./components/perseus-editor-accordion";

import type axe from "axe-core";
import type {CSSProperties} from "react";

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
            // @ts-expect-error TS2769: No overload matches this call.
            axeCore.run(options).then((results) => {
                // eslint-disable-next-line no-console
                console.log(`Accessibility Results: `, results);
                setViolations(results.violations);
                setIncompletes(results.incomplete);
            });
        }, 1500);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const message = getIssueMessage(issue.nodes);

    const headingStyle: CSSProperties = {
        textOverflow: "ellipsis",
        maxWidth: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
    };
    const labelStyle = {
        marginTop: "1em",
        fontWeight: "bold",
    };

    return (
        <PerseusEditorAccordion
            animated={true}
            expanded={expanded}
            onToggle={toggleVisibility}
            panelStyle={{backgroundColor: "white"}}
            header={
                <LabelLarge
                    style={headingStyle}
                >{`${title}: ${issue.id}`}</LabelLarge>
            }
        >
            <LabelSmall style={{fontWeight: "bold"}}>Description:</LabelSmall>
            <a href={issue.helpUrl} target="_blank" rel="noreferrer">
                {issue.help}
            </a>
            <LabelSmall style={labelStyle}>
                Impact:
                <span style={{fontWeight: "initial"}}> {issue.impact}</span>
            </LabelSmall>
            <LabelSmall style={labelStyle}>Issue:</LabelSmall>
            <span>{message}</span>
            <ShowMe issue={issue} />
        </PerseusEditorAccordion>
    );
};

const ShowMe = ({issue}: {issue: axe.Result}) => {
    const [showMe, setShowMe] = useState(false);
    const issueElements = getIssueElements(issue.nodes);
    const issueBoundary =
        Array.isArray(issueElements) && issueElements.length > 0
            ? issueElements[0].getBoundingClientRect()
            : null;
    const showMeStyle = {
        marginTop: "1em",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
    };
    const showMeOutlineStyle: CSSProperties =
        showMe && issueBoundary !== null
            ? {
                  display: "block",
                  border: "2px solid red",
                  borderRadius: "4px",
                  position: "fixed",
                  height: issueBoundary.height + 8,
                  width: issueBoundary.width + 8,
                  top: issueBoundary.top - 4,
                  left: issueBoundary.left - 4,
              }
            : {display: "none"};

    const showMeToggle = (
        <LabelSmall style={showMeStyle}>
            <span style={{marginRight: "1em"}}>Show Me</span>
            <Switch checked={showMe} onChange={setShowMe} />
            <div style={showMeOutlineStyle} />
        </LabelSmall>
    );
    const showMeUnavailable = (
        <div>
            Unable to find the offending element. Please ask a developer for
            help fixing this.
        </div>
    );

    return issueBoundary ? showMeToggle : showMeUnavailable;
};

const getIssueMessage = (nodes: axe.NodeResult[]): string => {
    return nodes
        .map((node) => {
            return node.all
                .concat(node.any, node.none)
                .map((result) => result.message)
                .join(" ");
        })
        .join(" ");
};

const getIssueElements = (nodes: axe.NodeResult[]): Element[] => {
    // @ts-expect-error TS2322: Type 'string[]' is not assignable to type 'Element[]'.
    return nodes.flatMap((node) => {
        // @ts-expect-error TS2769: No overload matches this call.
        return node.target.reduce((elements: Element[], target: string) => {
            const element = document.querySelector(target);
            if (element) {
                elements.push(element);
            }
            return elements;
        }, []);
    });
};

export default AccessibilityPanel;
