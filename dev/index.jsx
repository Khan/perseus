import * as React from "react"
import {render} from "react-dom"
import {Renderer} from "@khanacademy/perseus/src";
import {
    angleQuestion
} from "@khanacademy/perseus/src/widgets/__testdata__/interactive-graph.testdata";
import {storybookTestDependencies} from "../testing/test-dependencies";
import {setDependencies} from "@khanacademy/perseus/src/dependencies";
import "@khanacademy/perseus/src/styles/perseus-renderer.less"
// import "@khanacademy/perseus/src/styles/widgets/grapher.less"

setDependencies(storybookTestDependencies);

render(
    <QuestionRenderer question={angleQuestion} />,
    document.getElementById("app-root"),
)

function QuestionRenderer(props) {
    const {question, apiOptions = {}} = props
    return <Renderer
        content={question.content}
        images={question.images}
        widgets={question.widgets}
        problemNum={0}
        apiOptions={apiOptions}
        // reviewMode={reviewMode}
    />
}
