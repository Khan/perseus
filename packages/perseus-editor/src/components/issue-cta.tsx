import Button from "@khanacademy/wonder-blocks-button";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {getCtaForIssueId} from "../util/issue-ctas-utils";
import useItemEditorContext from "../util/item-editor-context";

import type {Issue} from "./issues-panel";

interface Props {
    issue: Issue;
}

const IssueCta = ({issue}: Props) => {
    const {question, onEditorChange} = useItemEditorContext();
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
