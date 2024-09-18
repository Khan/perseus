import _ from "underscore";

function sorterValidator(state: any, rubric: any) {
    const correct = _.isEqual(state.options, rubric.correct);

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}
