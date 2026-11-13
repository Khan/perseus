import {lintPerseusRenderer} from "../lint-content";

import type {Lint} from "../lint";
import type {PerseusGradedGroupWidgetOptions} from "@khanacademy/perseus-core";

interface Context {
    contentType: "exercise" | "article" | "renderer";
}

export function lintGradedGroup(
    options: PerseusGradedGroupWidgetOptions,
    {contentType}: Context,
): Lint[] {
    const {hint} = options;

    const issues = [...lintPerseusRenderer(options, contentType)];

    if (hint) {
        const hintIssues = lintPerseusRenderer(hint, contentType).map(
            (lint) => ({...lint, message: `(in hint) ${lint.message}`}),
        );
        issues.push(...hintIssues);
    }

    return issues;
}
