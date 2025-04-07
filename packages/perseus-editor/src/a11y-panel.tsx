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
    let axeIsInstalled = false;
    // let warningShown = false;

    const injectAxeCore = () => {
        const iFrame = document.querySelector("iframe");
        // // @ts-expect-error TS2339: Property 'axe' does not exist on type 'Window'
        // if (iFrame?.contentWindow && !iFrame.contentWindow.axe) {
        //     // eslint-disable-next-line no-console
        //     console.log(`      Axe-Core missing from iFrame. Adding it now...`);
        //     // @ts-expect-error TS2339: Property 'eval' does not exist on type 'Window'
        //     iFrame.contentWindow?.eval(
        //         `import('https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js')`,
        //     );
        //     warningShown = false;
        // } else if (!warningShown) {
        //     // eslint-disable-next-line no-console
        //     console.warn(
        //         `Unable to locate preview iframe element. Accessibility test not attempted.`,
        //     );
        //     warningShown = true;
        // }

        // @ts-expect-error TS2339: Property 'axe' does not exist on type 'Window'
        axeIsInstalled = iFrame?.contentWindow && iFrame.contentWindow.axe;
    };

    const runAxeCore = () => {
        if (!isInStorybook) {
            injectAxeCore();
        }
        if (axeIsInstalled) {
            // eslint-disable-next-line no-console
            console.log(`      Executing timeout...`);
            const options = isInStorybook
                ? axeCoreStorybookOptions
                : axeCoreEditorOptions;
            // eslint-disable-next-line no-console
            console.log(`      Axe Core options: `, options);
            axeCore.configure({reporter: "v2"});
            // eslint-disable-next-line no-console
            console.log(`      Starting axe-core...`);
            // @ts-expect-error TS2769: No overload matches this call.
            axeCore.run(options).then(
                (results) => {
                    // eslint-disable-next-line no-console
                    console.log(`Accessibility Results: `, results);
                    setViolations(results.violations);
                    setIncompletes(results.incomplete);
                },
                (error) => {
                    // eslint-disable-next-line no-console
                    console.log(`      Error: `, error);
                },
            );
        }
    };

    const executeAxeCore = () => {
        // eslint-disable-next-line no-console
        console.log("Executing axe-core...");
        // eslint-disable-next-line no-alert
        const code: string | null = prompt(
            "Code to execute: ",
            (document.getElementById("axe-core-code") as HTMLInputElement)
                .value,
        );
        if (code) {
            // eslint-disable-next-line no-console
            console.log(`   Code:\n`, code);
            eval(code);
        }
    };

    const runAxeCoreOnUpdate = () => {
        // eslint-disable-next-line no-console
        console.log(`\nrunAxeCoreOnUpdate`);
        // eslint-disable-next-line no-console
        console.log(`   Clearing timeout ID: `, timeoutId);
        clearTimeout(timeoutId);
        // eslint-disable-next-line no-console
        console.log(`   Setting new timeout...`);
        timeoutId = setTimeout(runAxeCore, 1500);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isInStorybook = !!document.getElementById("storybook-root");
        if (isInStorybook) {
            window.addEventListener("message", runAxeCoreOnUpdate);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            axeIsInstalled = true;
        } else {
            injectAxeCore();
            // setInterval(runAxeCore, 1500);
        }
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
                    <span>Issues</span>
                    <button onClick={executeAxeCore}>Accessibility</button>
                    <input
                        type={"hidden"}
                        id="axe-core-code"
                        value={`
                        const useIFrameAxe = false;
                        const iFrameAxe = document.querySelector("iframe").contentWindow.axe;
                        console.log("   iFrame: ", document.querySelector("iframe"));
                        console.log("   Content Window: ", document.querySelector("iframe").contentWindow);
                        console.log("   iFrame Axe: ", iFrameAxe);
                        const options = useIFrameAxe
                            ? "#page-container"
                            : ${JSON.stringify(axeCoreEditorOptions)};
                        const axeCore = useIFrameAxe ? iFrameAxe : window.axe;
                        axeCore.configure({reporter: "v2"});
                        console.log("Element: ",document.querySelector("iframe").contentDocument.getElementById("page-container"));
                        axeCore.run(options).then(
                            (results) => {
                                console.log(\`   Accessibility Results: \`, results);
                            },
                            (error) => {
                                console.log(\`   Error: \`, error);
                            },
                        );`}
                    />
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
    // eslint-disable-next-line no-console
    console.log(`\nShow Me`);
    const issueElements = getIssueElements(issue.nodes);
    // eslint-disable-next-line no-console
    console.log(`   Issue Elements: `, issueElements);
    const issueBoundary = issueElements.reduce(
        (boundary, element, index) => {
            const elementBoundary = element.getBoundingClientRect();
            // eslint-disable-next-line no-console
            console.log(`      Initial Boundary: `, boundary);
            // eslint-disable-next-line no-console
            console.log(`      Element: `, element);
            // eslint-disable-next-line no-console
            console.log(`      Element Boundary: `, elementBoundary);
            boundary.top += elementBoundary.top;
            boundary.left += elementBoundary.left;
            if (index === issueElements.length - 1) {
                boundary.height = elementBoundary.height;
                boundary.width = elementBoundary.width;
            }
            // eslint-disable-next-line no-console
            console.log(`      Adjusted Boundary: `, boundary);
            return boundary;
        },
        {top: 0, left: 0, height: 0, width: 0},
    );
    // eslint-disable-next-line no-console
    console.log(`      Final Boundary: `, issueBoundary);
    const showMeStyle = {
        marginTop: "1em",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
    };
    const showMeOutlineStyle: CSSProperties =
        showMe && issueBoundary.width !== 0
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

    // eslint-disable-next-line
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
    const nodeToCheck = nodes.length > 0 ? [nodes[0]] : [];
    // @ts-expect-error TS2322: Type 'string[]' is not assignable to type 'Element[]'.
    return nodeToCheck.flatMap((node) => {
        // @ts-expect-error TS2769: No overload matches this call.
        return node.target.reduce((elements: Element[], target: string) => {
            // eslint-disable-next-line no-console
            console.log(`   Issue Target: `, target);
            let element: Element | null;
            if (
                elements.length > 0 &&
                elements[elements.length - 1].tagName.toLowerCase() === "iframe"
            ) {
                // eslint-disable-next-line no-console
                console.log(`   Prior target is iFrame`);
                element =
                    // @ts-expect-error TS2551: Property 'contentDocument' does not exist on type 'Element'
                    elements[elements.length - 1].contentDocument.querySelector(
                        target,
                    );
            } else {
                // eslint-disable-next-line no-console
                console.log(`   Prior target is NOT iFrame`);
                element = document.querySelector(target);
            }
            // eslint-disable-next-line no-console
            console.log(`   Element: `, element);
            if (element) {
                elements.push(element);
            }
            return elements;
        }, []);
    });
};

export default AccessibilityPanel;
