import type {LintHelpLink} from "./rule";

// The link a lint issue gets when its rule doesn't set its own `helpLink`.
export const DEFAULT_HELP_LINK = {
    text: "Learn more about best practices for authoring items",
    url: "https://docs.google.com/document/d/1N13f4sY-7EXWDwQ04ivA9vJBVvPPd60qjBT73B4NHuM/edit?tab=t.0",
} satisfies LintHelpLink;

// Shared markdown table documentation link.
export const TABLE_HELP_LINK = {
    text: "Learn more about perseus table markup",
    url: "https://khanacademy.atlassian.net/wiki/x/vQC-LQE",
} satisfies LintHelpLink;
