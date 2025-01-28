import {
    flattenScores,
    scoreWidgetsFunctional,
    type PerseusGroupRubric,
    type PerseusGroupUserInput,
    type PerseusScore,
} from "@khanacademy/perseus-score";

// The `group` widget is basically a widget hosting a full Perseus system in
// it. As such, scoring a group means scoring all widgets it contains.
function scoreGroup(
    userInput: PerseusGroupUserInput,
    rubric: PerseusGroupRubric,
    locale: string,
): PerseusScore {
    const scores = scoreWidgetsFunctional(
        rubric.widgets,
        Object.keys(rubric.widgets),
        userInput,
        locale,
    );

    return flattenScores(scores);
}

export default scoreGroup;
