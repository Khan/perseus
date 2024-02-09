/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
import * as React from "react";
import {render} from "react-dom";

import {Renderer} from "../packages/perseus/src";
import {setDependencies} from "../packages/perseus/src/dependencies";
import {angleQuestion} from "../packages/perseus/src/widgets/__testdata__/interactive-graph.testdata";
import {storybookTestDependencies} from "../testing/test-dependencies";

setDependencies(storybookTestDependencies);

render(
    <QuestionRenderer question={angleQuestion} />,
    document.getElementById("app-root"),
);

function QuestionRenderer(props) {
    const {question, apiOptions = {}} = props;
    return (
        <Renderer
            content={question.content}
            images={question.images}
            widgets={question.widgets}
            problemNum={0}
            apiOptions={apiOptions}
        />
    );
}
