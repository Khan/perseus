import Button from "@khanacademy/wonder-blocks-button";
import * as React from "react";

import {getAllCtasMap} from "./util/issue-ctas-utils";

import type {Issue} from "./issues-panel";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

interface Props {
    issues: Issue[];
    question?: PerseusRenderer;
    onEditorChange: (newProps: any) => void;
}

const IssueCtas = ({issues, question, onEditorChange}: Props) => {
    const uniqueIssueIds = [...new Set(issues.map((issue) => issue.id))];
    const allCtasMap = getAllCtasMap(question!, onEditorChange);

    return (
        <>
            {uniqueIssueIds.map((id) => {
                const cta = allCtasMap[id];
                if (cta === undefined) {
                    return null;
                }

                return (
                    <Button key={id} size="small" onClick={cta.onClick}>
                        {cta.label}
                    </Button>
                );
            })}
        </>
    );
};

export default IssueCtas;
