import * as axeCore from "axe-core";

import issuesList from "./a11y-issues-list";

import type {Issue, IssueType} from "../components/issues-panel";
import type axe from "axe-core";

const assistanceNeededMessage =
    "Developer assistance needed - Please send this exercise and warning info to the LEMS team for review.";

const axeCoreEditorOptions = {
    include: {
        fromFrames: ['iframe[src^="/perseus/frame"]', "#page-container"],
    },
    exclude: {
        fromFrames: [
            'iframe[src^="/perseus/frame"]',
            '[target="lint-help-window"]',
        ],
    },
};
const axeCoreStorybookOptions = {
    include: ["#preview-panel"],
    exclude: ['[target="lint-help-window"]'],
};

const convertAxeImpactToIssueImpact = (
    impact?: axe.ImpactValue,
): Issue["impact"] => {
    switch (impact) {
        case "critical":
            return "high";
        case "serious":
            return "high";
        case "moderate":
            return "medium";
        case "minor":
            return "low";
        default:
            return "low";
    }
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

const mapResultsToIssues = (
    results: axe.Result[],
    type: IssueType,
): Issue[] => {
    console.log("Issues List: ", issuesList);
    console.log("User Fixable Issues: ", issuesList["user-fixable"]);
    return results.map((result) => {
        const isUserFixable =
            type === "Alert" &&
            issuesList["axe-core"]["user-fixable"].some(
                (testId) => testId === result.id,
            );
        const description = isUserFixable ? "" : assistanceNeededMessage;
        return {
            id: result.id,
            description: description,
            elements: getIssueElements(result.nodes),
            helpUrl: result.helpUrl,
            help: result.help,
            impact: convertAxeImpactToIssueImpact(result.impact),
            message: getIssueMessage(result.nodes),
            type: type,
        };
    });
};

const runAxeCore = (updateIssuesFn: (issues: Issue[]) => void): void => {
    const isInStorybook = !!document.getElementById("storybook-root");
    if (!isInStorybook) {
        let frameHasLoaded = false;
        const frame = document.querySelector('iframe[src^="/perseus/frame"]');
        if (frame) {
            const frameDocument =
                // @ts-expect-error TS2551: Property 'contentDocument' does not exist on type 'Element'.
                frame.contentDocument || frame.contentWindow?.document;
            frameHasLoaded = frameDocument?.readyState === "complete";
        }
        if (!frameHasLoaded) {
            console.log("Frame has NOT loaded");
            setTimeout(runAxeCore, 100);
            return;
        }
    }
    const options = isInStorybook
        ? axeCoreStorybookOptions
        : axeCoreEditorOptions;
    axeCore.configure({reporter: "v2"});
    // @ts-expect-error TS2769: No overload matches this call.
    axeCore.run(options).then(
        (results) => {
            // eslint-disable-next-line no-console
            console.log(`Accessibility Results: `, results);
            const violations = mapResultsToIssues(results.violations, "Alert");
            const incompletes = mapResultsToIssues(
                results.incomplete,
                "Warning",
            );
            const issues = violations.concat(incompletes);
            console.log(`  Issues: `, issues);
            if (
                violations.length === 0 &&
                incompletes.length === 0 &&
                results.passes.length === 0
            ) {
                console.log("No valid results - Retrying...");
                setTimeout(runAxeCore, 1000, updateIssuesFn); // No valid results indicates that content may not be fully loaded yet
            } else {
                updateIssuesFn(issues);
            }
        },
        (error) => {
            // eslint-disable-next-line no-console
            console.log(`      Error: `, error);
        },
    );
};

export const runAxeCoreOnUpdate = (priorTimeoutId, setState): any => {
    clearTimeout(priorTimeoutId);
    return setTimeout(runAxeCore, 1500, setState);
};
