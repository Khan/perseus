interface Choice {
    correct?: boolean;
}

export function deriveNumCorrect(choices: Choice[]) {
    return choices.filter((c) => c.correct).length;
}
