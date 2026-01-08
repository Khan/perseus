import * as axeCore from "axe-core";

import issuesList from "./a11y-issues-list";

import type {Issue} from "../components/issues-panel";
import type axe from "axe-core";

const assistanceNeededMessage =
    "Developer assistance needed - Please send this exercise and warning info to the LEMS team for review.";

const previewIframeSelector =
    '.perseus-question-container iframe[data-name="content-preview"]';
// 'iframe[data-name="content-preview"][src^="/perseus/frame"]';
const axeCoreEditorOptions = {
    include: {
        fromFrames: [previewIframeSelector, "#page-container"],
    },
    exclude: {
        fromFrames: [previewIframeSelector, '[target="lint-help-window"]'],
    },
};
const axeCoreStorybookOptions = {
    include: {
        fromFrames: [
            'iframe[data-name="content-preview"]',
            "#storybook-root > .framework-perseus",
        ],
    },
    exclude: {
        fromFrames: [
            'iframe[data-name="content-preview"]',
            '[target="lint-help-window"]',
        ],
    },
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
        .flatMap((node) => {
            return node.all
                .concat(node.any, node.none)
                .map((result) => result.message);
        })
        .filter(
            (message, index, allMessages) =>
                allMessages.indexOf(message) === index,
        )
        .join(". ");
};

const getIssueElements = (nodes: axe.NodeResult[]): Element[] => {
    const nodeToCheck = nodes.length > 0 ? [nodes[0]] : [];
    // @ts-expect-error TS2322: Type 'string[]' is not assignable to type 'Element[]'.
    return nodeToCheck.flatMap((node) => {
        // @ts-expect-error TS2769: No overload matches this call.
        return node.target.reduce((elements: Element[], target: string) => {
            let element: Element | null;
            if (
                elements.length > 0 &&
                elements[elements.length - 1].tagName.toLowerCase() === "iframe"
            ) {
                element =
                    // @ts-expect-error TS2551: Property 'contentDocument' does not exist on type 'Element'
                    elements[elements.length - 1].contentDocument.querySelector(
                        target,
                    );
            } else {
                element = document.querySelector(target);
            }
            if (element) {
                elements.push(element);
            }
            return elements;
        }, []);
    });
};

const mapResultsToIssues = (
    results: axe.Result[],
    type: "Warning" | "Alert",
): Issue[] => {
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
        const frame = document.querySelector(previewIframeSelector);
        if (frame) {
            const frameDocument =
                // @ts-expect-error TS2551: Property 'contentDocument' does not exist on type 'Element'.
                frame.contentDocument || frame.contentWindow?.document;
            frameHasLoaded = frameDocument?.readyState === "complete";
        }
        if (!frameHasLoaded) {
            setTimeout(runAxeCore, 100, updateIssuesFn);
            return;
        }
    }
    const userInput = document.getElementById(
        "axe-core-context",
    ) as HTMLInputElement | null;
    const userSuppliedOptions = userInput?.value;
    const options = userSuppliedOptions
        ? JSON.parse(userSuppliedOptions)
        : isInStorybook
          ? axeCoreStorybookOptions
          : axeCoreEditorOptions;
    // eslint-disable-next-line no-console
    console.log("Axe Core options: ", options);
    // eslint-disable-next-line no-console
    console.log("Axe Core options (stringified): ", JSON.stringify(options));
    axeCore.configure({reporter: "v2"});
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
            // eslint-disable-next-line no-console
            console.log(`  Issues: `, issues);
            if (
                violations.length === 0 &&
                incompletes.length === 0 &&
                results.passes.length === 0
            ) {
                setTimeout(runAxeCore, 1500, updateIssuesFn); // No valid results indicates that content may not be fully loaded yet
            } else {
                updateIssuesFn(issues);
            }
        },
        (error) => {
            // eslint-disable-next-line no-console
            console.log(`*** Error: `, error);
        },
    );
};

export const runAxeCoreOnUpdate = (priorTimeoutId, setState): any => {
    clearTimeout(priorTimeoutId);
    return setTimeout(runAxeCore, 1500, setState);
};
