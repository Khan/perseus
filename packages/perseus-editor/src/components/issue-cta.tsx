import Button from "@khanacademy/wonder-blocks-button";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {getCtaForIssueId} from "../util/issue-ctas-utils";

import type {Issue} from "./issues-panel";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

interface Props {
    issue: Issue;
    question: PerseusRenderer;
    onEditorChange: (newProps: any) => void;
}

const IssueCta = ({issue, question, onEditorChange}: Props) => {
    const cta = getCtaForIssueId(issue.id, question, onEditorChange);

    if (!cta) {
        return null;
    }

    return (
        <Button
            key={issue.id}
            size="small"
            onClick={cta.onClick}
            style={styles.button}
        >
            {cta.label}
        </Button>
    );
};

export default IssueCta;

// TODO: Use CSS modules after Wonder Blocks styles
// are moved to a different layer.
const styles = {
    button: {
        marginTop: sizing.size_080,
        marginBottom: sizing.size_080,
    },
};
