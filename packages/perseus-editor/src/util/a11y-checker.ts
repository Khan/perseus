import * as axeCore from "axe-core";

import issuesList from "./a11y-issues-list";

import type {Issue} from "../components/issues-panel";
import type axe from "axe-core";

const assistanceNeededMessage =
    "Developer assistance needed - Please send this exercise and warning info to the LEMS team for review.";

const previewIframeSelector =
    '.perseus-question-container iframe[data-name="content-preview"]';
const axeCoreEditorOptions = {
    include: "#page-container",
    exclude: '[target="lint-help-window"]',
};

// NOTE: The following is the correct way to scan within iframes. However,
//           this isn't working within the exercise editor (works fine in Storybook).
//       Keeping this here for reference in case the issue ever gets figured out.
// const axeCoreEditorOptions = {
//     include: {
//         fromFrames: [previewIframeSelector, "#page-container"],
//     },
//     exclude: {
//         fromFrames: [previewIframeSelector, '[target="lint-help-window"]'],
//     },
// };
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

const getIssueElements = (
    nodes: axe.NodeResult[],
    iFrameElement: HTMLIFrameElement | null,
): Element[] => {
    // eslint-disable-next-line no-console
    console.log(`** iFrame: `, iFrameElement);
    // eslint-disable-next-line no-console
    console.log(`** Result nodes: `, nodes);
    // @ts-expect-error TS2322: Type 'string[]' is not assignable to type 'Element[]'.
    return nodes.flatMap((node) => {
        // eslint-disable-next-line no-console
        console.log(`*** Node target: `, node.target);
        // @ts-expect-error TS2769: No overload matches this call.
        return node.target.reduce((elements: Element[], target: string) => {
            // eslint-disable-next-line no-console
            console.log(`**** Target: `, target);
            let element: Element | null = null;
            if (
                elements.length > 0 &&
                elements[elements.length - 1].tagName.toLowerCase() === "iframe"
            ) {
                // eslint-disable-next-line no-console
                console.log(`***** Node target contains an iFrame *****`);
                // eslint-disable-next-line no-console
                console.log(`***** Replacing iFrame element with actual element *****`);
                elements[elements.length - 1] =
                    // @ts-expect-error TS2551: Property 'contentDocument' does not exist on type 'Element'
                    elements[elements.length - 1].contentDocument.querySelector(
                        target,
                    );
            } else if (iFrameElement) {
                // eslint-disable-next-line no-console
                console.log(`***** Editor iFrame provided - using it for reference *****`);
                element =
                    iFrameElement.contentDocument?.querySelector(target) ||
                    null;
            } else {
                // eslint-disable-next-line no-console
                console.log(`***** No iFrame detected *****`);
                element = document.querySelector(target);
            }
            // eslint-disable-next-line no-console
            console.log(`***** Element: `, element);
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
    iFrameElement: HTMLIFrameElement | null,
): Issue[] => {
    return results.map((result) => {
        // eslint-disable-next-line no-console
        console.log(`* Result: `, result);
        const isUserFixable =
            type === "Alert" &&
            issuesList["axe-core"]["user-fixable"].some(
                (testId) => testId === result.id,
            );
        const description = isUserFixable ? "" : assistanceNeededMessage;
        const issueInfo = {
            id: result.id,
            description: description,
            elements: getIssueElements(result.nodes, iFrameElement),
            helpUrl: result.helpUrl,
            help: result.help,
            impact: convertAxeImpactToIssueImpact(result.impact),
            message: getIssueMessage(result.nodes),
            type: type,
        };
        // eslint-disable-next-line no-console
        console.log(`* Result Info: `, issueInfo);
        return issueInfo;
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
    const options = isInStorybook
        ? axeCoreStorybookOptions
        : axeCoreEditorOptions;
    // eslint-disable-next-line no-console
    console.log("Axe Core options: ", options);
    const previewWindow = document.querySelector(
        previewIframeSelector,
    ) as HTMLIFrameElement | null;
    const axeCoreProper = isInStorybook
        ? axeCore
        : // @ts-expect-error TS2339: Property axe does not exist on type Window.
          previewWindow?.contentWindow?.axe;
    axeCoreProper.configure({reporter: "v2"});
    axeCoreProper.run(options).then(
        (results) => {
            // eslint-disable-next-line no-console
            console.log(`Accessibility Results: `, results);
            const violations = mapResultsToIssues(
                results.violations,
                "Alert",
                isInStorybook ? null : previewWindow,
            );
            const incompletes = mapResultsToIssues(
                results.incomplete,
                "Warning",
                isInStorybook ? null : previewWindow,
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
