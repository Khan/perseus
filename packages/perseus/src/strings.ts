/**
 * The translated strings that are used to render Perseus.
 */
export type PerseusStrings = {
    closeKeypad: string;
    openKeypad: string;
    mathInputBox: string;
    removeHighlight: string;
    addHighlight: string;
    hintPos: ({pos}: {pos: number}) => string;
    errorRendering: ({error}: {error: string}) => string;
    APPROXIMATED_PI_ERROR: string;
    EXTRA_SYMBOLS_ERROR: string;
    NEEDS_TO_BE_SIMPLFIED_ERROR: string;
    MISSING_PERCENT_ERROR: string;
    MULTIPLICATION_SIGN_ERROR: string;
    WRONG_CASE_ERROR: string;
    WRONG_LETTER_ERROR: string;
    invalidSelection: string;
    ERROR_TITLE: string;
    ERROR_MESSAGE: string;
    hints: string;
    getAnotherHint: string;
    deprecatedStandin: string;
    keepTrying: string;
    tryAgain: string;
    check: string;
    correctExcited: string;
    nextQuestion: string;
    skipToTitle: ({title}: {title: string}) => string;
    current: string;
    correct: string;
    correctSelected: string;
    correctCrossedOut: string;
    incorrect: string;
    incorrectSelected: string;
    hideExplanation: string;
    explain: string;
    INVALID_MESSAGE_PREFIX: string;
    DEFAULT_INVALID_MESSAGE_1: string;
    DEFAULT_INVALID_MESSAGE_2: string;
    integerExample: string;
    properExample: string;
    simplifiedProperExample: string;
    improperExample: string;
    simplifiedImproperExample: string;
    mixedExample: string;
    decimalExample: string;
    percentExample: string;
    piExample: string;
    yourAnswer: string;
    yourAnswerLabel: string;
    addPoints: string;
    addVertices: string;
    tapMultiple: string;
    tapSingle: string;
    clickMultiple: string;
    clickSingle: string;
    choices: string;
    answers: ({num}: {num: number}) => string;
    hideAnswersToggleLabel: string;
    moves: ({num}: {num: number}) => string;
    clickTiles: string;
    turnOffLights: string;
    fillAllCells: string;
    molecularDrawing: ({content}: {content: string}) => string;
    switchDirection: string;
    circleOpen: string;
    circleFilled: string;
    numDivisions: string;
    divisions: ({divRangeString}: {divRangeString: string}) => string;
    lineRange: ({lineRange}: {lineRange: string}) => string;
    lineNumber: ({lineNumber}: {lineNumber: string}) => string;
    symbolPassage: ({
        questionSymbol,
        questionNumber,
    }: {
        questionSymbol: string;
        questionNumber: string;
    }) => string;
    symbolQuestion: ({sentenceSymbol}: {sentenceSymbol: string}) => string;
    lineLabel: string;
    beginningPassage: string;
    beginningFootnotes: string;
    endPassage: string;
    questionMarker: ({number}: {number: string}) => string;
    circleMarker: ({number}: {number: string}) => string;
    sentenceMarker: ({number}: {number: string}) => string;
    dragHandles: string;
    tapAddPoints: string;
    false: string;
    true: string;
    no: string;
    yes: string;
    chooseCorrectNum: string;
    notNoneOfTheAbove: string;
    noneOfTheAbove: string;
    chooseNumAnswers: ({numCorrect}: {numCorrect: string}) => string;
    chooseAllAnswers: string;
    chooseOneAnswer: string;
    choiceCheckedCorrect: ({letter}: {letter: string}) => string;
    choiceCrossedOutCorrect: ({letter}: {letter: string}) => string;
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceCrossedOutIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choiceCrossedOut: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    crossOut: string;
    crossOutOption: string;
    crossOutChoice: ({letter}: {letter: string}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
    rightArrow: string;
    dontUnderstandUnits: string;
    checkSigFigs: string;
    answerNumericallyIncorrect: string;
    checkUnits: string;
    dontUnderstand: string;
    loading: string;
    videoTranscript: string;
    somethingWrong: string;
    videoWrapper: string;
    mathInputTitle: string;
    mathInputDescription: string;
    sin: string;
    cos: string;
    tan: string;
    simulationLoadFail: string;
    simulationLocaleWarning: string;
    selectAnAnswer: string;
    // The following strings are used for interactive graph SR descriptions.
    addPoint: string;
    removePoint: string;
    graphKeyboardPrompt: string;
    closePolygon: string;
    openPolygon: string;
    srPointAtCoordinates: ({
        num,
        x,
        y,
    }: {
        num: number;
        x: string;
        y: string;
    }) => string;
    srInteractiveElements: ({elements}: {elements: string}) => string;
    srNoInteractiveElements: string;
    srCircleGraph: string;
    srCircleShape: ({
        centerX,
        centerY,
    }: {
        centerX: string;
        centerY: string;
    }) => string;
    srCircleRadiusPoint: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadius: ({radius}: {radius: number}) => string;
    srCircleOuterPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
        point4X,
        point4Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
        point4X: string;
        point4Y: string;
    }) => string;
    srLinearGraph: string;
    srLinearGraphPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearGraphSlopeIncreasing: string;
    srLinearGraphSlopeDecreasing: string;
    srLinearGraphSlopeHorizontal: string;
    srLinearGraphSlopeVertical: string;
    srLinearGraphXOnlyIntercept: ({xIntercept}: {xIntercept: string}) => string;
    srLinearGraphYOnlyIntercept: ({yIntercept}: {yIntercept: string}) => string;
    srLinearGraphBothIntercepts: ({
        xIntercept,
        yIntercept,
    }: {
        xIntercept: string;
        yIntercept: string;
    }) => string;
    srLinearGraphOriginIntercept: string;
    srLinearGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srAngleSideAtCoordinates: ({
        point,
        side,
        x,
        y,
    }: {
        point: number;
        side: string;
        x: string;
        y: string;
    }) => string;
    srAngleVertexAtCoordinatesWithAngleMeasure: ({
        x,
        y,
        angleMeasure,
    }: {
        x: string;
        y: string;
        angleMeasure: string;
    }) => string;
    srAngleGraphAriaLabel: string;
    srAngleGraphAriaDescription: ({
        angleMeasure,
        vertexX,
        vertexY,
        isX,
        isY,
        tsX,
        tsY,
    }: {
        angleMeasure: string;
        vertexX: string;
        vertexY: string;
        isX: string;
        isY: string;
        tsX: string;
        tsY: string;
    }) => string;
    srSegmentGraphAriaLabel: string;
    srSegmentGraphAriaDescription: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        length,
        indexOfSegment
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        length: string;
        indexOfSegment: number;
    }) => string;
    srSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
    }) => string;
    // The above strings are used for interactive graph SR descriptions.
};

/**
 * Untranslated strings used in Perseus. To be used by an external
 * translator to produce translated strings, passed in as `PerseusStrings`.
 */
export const strings: {
    [key in keyof PerseusStrings]:
        | string
        | {context?: string; message: string}
        | {context?: string; one: string; other: string};
} = {
    closeKeypad: "close math keypad",
    openKeypad: "open math keypad",
    mathInputBox: "Math input box",
    removeHighlight: "Remove highlight",
    addHighlight: "Add highlight",
    hintPos: "Hint #%(pos)s",
    errorRendering: "Error rendering: %(error)s",
    APPROXIMATED_PI_ERROR:
        "Your answer is close, but you may " +
        "have approximated pi. Enter your " +
        "answer as a multiple of pi, like " +
        "<code>12\\ \\text{pi}</code> or " +
        "<code>2/3\\ \\text{pi}</code>",
    EXTRA_SYMBOLS_ERROR:
        "We could not understand your " +
        "answer. Please check your answer for extra " +
        "text or symbols.",
    NEEDS_TO_BE_SIMPLFIED_ERROR:
        "Your answer is almost correct, " + "but it needs to be simplified.",
    MISSING_PERCENT_ERROR:
        "Your answer is almost correct, " +
        "but it is missing a " +
        "<code>\\%</code> at the end.",
    MULTIPLICATION_SIGN_ERROR:
        "I'm a computer. I only understand " +
        "multiplication if you use an asterisk " +
        "(*) as the multiplication sign.",
    WRONG_CASE_ERROR:
        "Your answer includes use of a variable with the wrong case.",
    WRONG_LETTER_ERROR: "Your answer includes a wrong variable letter.",
    invalidSelection: "Make sure you select something for every row.",
    ERROR_TITLE: "Oops!",
    ERROR_MESSAGE: "Sorry, I don't understand that!",
    hints: "Hints",
    getAnotherHint: "Get another hint",
    deprecatedStandin:
        "Sorry, this part of the question is no longer available. 😅 Don't worry, you won't be graded on this part. Keep going!",
    keepTrying: "Keep trying",
    tryAgain: "Try again",
    check: "Check",
    correctExcited: "Correct!",
    nextQuestion: "Next question",
    skipToTitle: "Skip to %(title)s",
    current: "Current",
    correct: "Correct",
    correctSelected: "Correct (selected)",
    correctCrossedOut: "Correct (but you crossed it out)",
    incorrect: "Incorrect",
    incorrectSelected: "Incorrect (selected)",
    hideExplanation: "Hide explanation",
    explain: "Explain",
    INVALID_MESSAGE_PREFIX: "We couldn't grade your answer.",
    DEFAULT_INVALID_MESSAGE_1: "It looks like you left something blank or ",
    DEFAULT_INVALID_MESSAGE_2: "entered in an invalid answer.",
    integerExample: "an integer, like $6$",
    properExample: "a *proper* fraction, like $1/2$ or $6/10$",
    simplifiedProperExample: "a *simplified proper* fraction, like $3/5$",
    improperExample: "an *improper* fraction, like $10/7$ or $14/8$",
    simplifiedImproperExample: "a *simplified improper* fraction, like $7/4$",
    mixedExample: "a mixed number, like $1\\ 3/4$",
    decimalExample: "an *exact* decimal, like $0.75$",
    percentExample: "a percent, like $12.34\\%$",
    piExample: "a multiple of pi, like $12\\ \\text{pi}$ or $2/3\\ \\text{pi}$",
    yourAnswer: "**Your answer should be** ",
    yourAnswerLabel: "Your answer:",
    addPoints: "Click to add points",
    addVertices: "Click to add vertices",
    tapMultiple: "Tap each dot on the image to select all answers that apply.",
    tapSingle: "Tap each dot on the image to select an answer.",
    clickMultiple:
        "Click each dot on the image to select all answers that apply.",
    clickSingle: "Click each dot on the image to select an answer.",
    choices: "Choices:",
    answers: {
        one: "%(num)s answer",
        other: "%(num)s answers",
    },
    hideAnswersToggleLabel: "Hide answer choices",
    moves: {
        one: "Moves: %(num)s",
        other: "Moves: %(num)s",
    },
    clickTiles: "Click on the tiles to change the lights.",
    turnOffLights: "You must turn on all of the lights to continue.",
    fillAllCells: "Make sure you fill in all cells in the matrix.",
    molecularDrawing:
        "A molecular structure drawing. SMILES notation: %(content)s",
    switchDirection: "Switch direction",
    circleOpen: "Make circle open",
    circleFilled: "Make circle filled",
    numDivisions: "Number of divisions:",
    divisions:
        "Please make sure the number of divisions is in the range %(divRangeString)s.",
    lineRange: "lines %(lineRange)s",
    lineNumber: "line %(lineNumber)s",
    symbolPassage:
        "The symbol %(questionSymbol)s indicates that question %(questionNumber)s references this portion of the passage.",
    symbolQuestion:
        " The symbol %(sentenceSymbol)s indicates that the following sentence is referenced in a question.",
    lineLabel: {
        context: "a label next to a reading passage to denote the line number",
        message: "Line",
    },
    beginningPassage: "Beginning of reading passage.",
    beginningFootnotes: "Beginning of reading passage footnotes.",
    endPassage: "End of reading passage.",
    questionMarker: "[Marker for question %(number)s]",
    circleMarker: "[Circle marker %(number)s]",
    sentenceMarker: "[Sentence %(number)s]",
    dragHandles: "Drag handles to make graph",
    tapAddPoints: "Tap to add points",
    false: "False",
    true: "True",
    no: "No",
    yes: "Yes",
    chooseCorrectNum: "Please choose the correct number of answers.",
    notNoneOfTheAbove:
        "'None of the above' may not be selected when other answers are selected.",
    noneOfTheAbove: "None of the above",
    chooseNumAnswers: "Choose %(numCorrect)s answers:",
    chooseAllAnswers: "Choose all answers that apply:",
    chooseOneAnswer: "Choose 1 answer:",
    choiceCheckedCorrect: "(Choice %(letter)s, Checked, Correct)",
    choiceCrossedOutCorrect: "(Choice %(letter)s, Crossed out, Correct)",
    choiceCorrect: "(Choice %(letter)s, Correct)",
    choiceCheckedIncorrect: "(Choice %(letter)s, Checked, Incorrect)",
    choiceCrossedOutIncorrect: "(Choice %(letter)s, Crossed out, Incorrect)",
    choiceIncorrect: "(Choice %(letter)s, Incorrect)",
    choiceChecked: "(Choice %(letter)s, Checked)",
    choiceCrossedOut: "(Choice %(letter)s, Crossed out)",
    choice: "(Choice %(letter)s)",
    crossOut: "Cross out",
    crossOutOption: "Cross out option",
    crossOutChoice: "Cross out Choice %(letter)s",
    bringBack: "Bring back",
    openMenuForChoice: "Open menu for Choice %(letter)s",
    letters: {
        context:
            "This is a list of single-character labels that will appear in front of multiple-choice options. For instance, a multiple-choice question with three options would display (A) first option (B) second option (C) third option. There must be spaces between each of the different characters. The characters will show up next to options in the order that they are listed here. Most multiple choice questions have 5 or fewer options.",
        message: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
    },
    rightArrow: "Reaction arrow pointing to the right.",
    dontUnderstandUnits: "I couldn't understand those units.",
    checkSigFigs: "Check your significant figures.",
    answerNumericallyIncorrect: "That answer is numerically incorrect.",
    checkUnits: "Check your units.",
    dontUnderstand: "I don't understand that",
    loading: "Loading...",
    videoTranscript: "See video transcript",
    somethingWrong: "Something went wrong.",
    videoWrapper: "Khan Academy video wrapper",
    mathInputTitle: "mathematics keyboard",
    mathInputDescription:
        "Use keyboard/mouse to interact with math-based input fields",
    sin: "sin",
    cos: "cos",
    tan: "tan",
    simulationLoadFail: "Sorry, this simulation cannot load.",
    simulationLocaleWarning:
        "Sorry, this simulation isn't available in your language.",
    selectAnAnswer: "Select an answer",

    // The following strings are used for interactive graph SR descriptions.
    addPoint: "Add Point",
    removePoint: "Remove Point",
    graphKeyboardPrompt: "Press Shift + Enter to interact with the graph",
    closePolygon: "Close shape",
    openPolygon: "Re-open shape",
    srInteractiveElements: "Interactive elements: %(elements)s",
    srNoInteractiveElements: "No interactive elements",
    // TODO(LEMS-2660): The following strings are ones that will need
    // translation tickets after all interactive graph SR strings have
    // been finalized. Remove this comment after the tickets have been
    // created.
    srPointAtCoordinates: {
        context: "Screenreader-accessible description of a point on a graph",
        message: "Point %(num)s at %(x)s comma %(y)s",
    },
    srCircleGraph: {
        context: "Aria label for the circle graph as a whole.",
        message: "A circle on a coordinate plane.",
    },
    srCircleShape: {
        context:
            "Aria label for the interactive circle shape in a circle graph.",
        message:
            "Circle. The center point is at %(centerX)s comma %(centerY)s.",
    },
    srCircleRadiusPoint: {
        context:
            "Aria label for the interactive point that sits on the edge of the circle in a circle graph. Moving this point updates the radius of the circle",
        message: "Radius point at %(radiusPointX)s comma %(radiusPointY)s.",
    },
    srCircleRadius: {
        context:
            "Screenreader-only description of the radius of a circle in a circle graph.",
        message: "Circle radius is %(radius)s.",
    },
    srCircleOuterPoints: {
        context:
            "Screenreader-only description of key points on a circle in a circle graph.",
        message:
            "Points on the circle at %(point1X)s comma %(point1Y)s, %(point2X)s comma %(point2Y)s, %(point3X)s comma %(point3Y)s, %(point4X)s comma %(point4Y)s.",
    },
    srLinearGraph: {
        context: "Aria label for the linear graph as a whole.",
        message: "A line on a coordinate plane.",
    },
    srLinearGraphPoints: {
        context:
            "Additional information about the points for the linear graph as a whole.",
        message:
            "The line has two points, point 1 at %(point1X)s comma %(point1Y)s and point 2 at %(point2X)s comma %(point2Y)s.",
    },
    srLinearGraphSlopeIncreasing: {
        context:
            "Screenreader-only description of a line's decreasing slope on a linear graph.",
        message: "Its slope increases from left to right.",
    },
    srLinearGraphSlopeDecreasing: {
        context:
            "Screenreader-only description of a line's increasing slope on a linear graph.",
        message: "Its slope decreases from left to right.",
    },
    srLinearGraphSlopeHorizontal: {
        context:
            "Screenreader-only description of a line's horizontal slope on a linear graph.",
        message: "Its slope is zero.",
    },
    srLinearGraphSlopeVertical: {
        context:
            "Screenreader-only description of a line's vertical slope on a linear graph.",
        message: "Its slope is undefined.",
    },
    srLinearGraphXOnlyIntercept: {
        context:
            "Screenreader-only description of a line's x-intercept on a linear graph when it only has an x intercept.",
        message: "The line crosses the X-axis at %(xIntercept)s comma 0.",
    },
    srLinearGraphYOnlyIntercept: {
        context:
            "Screenreader-only description of a line's y-intercept on a linear graph when it only has a y intercept.",
        message: "The line crosses the Y-axis at 0 comma %(yIntercept)s.",
    },
    srLinearGraphBothIntercepts: {
        context:
            "Screenreader-only description of a line's x and y intercepts on a linear graph when both intercepts are present.",
        message:
            "The line crosses the X-axis at %(xIntercept)s comma 0 and the Y-axis at 0 comma %(yIntercept)s.",
    },
    srLinearGraphOriginIntercept: {
        context:
            "Screenreader-only description of the line's intercept when the intercept is the graph's origin.",
        message: "The line crosses the x and y axes at the graph's origin.",
    },
    srLinearGrabHandle: {
        context:
            "Screenreader-only label on the grab handle for the line on a linear graph.",
        message:
            "Line from %(point1X)s comma %(point1Y)s to %(point2X)s comma %(point2Y)s.",
    },
    srAngleSideAtCoordinates: {
        context:
            "Screenreader-accessible description of the side / vertex of an angle graph",
        message: "Point %(point)s, %(side)s at %(x)s comma %(y)s",
    },
    srAngleVertexAtCoordinatesWithAngleMeasure: {
        context:
            "Screenreader-accessible description of a vertex on an angle graph with an angle measure",
        message:
            "Point 2, vertex at %(x)s comma %(y)s. Angle %(angleMeasure)s degrees",
    },
    srAngleGraphAriaLabel: {
        context:
            "Screenreader-accessible label for an angle on a coordinate plane.",
        message: "An angle on a coordinate plane",
    },
    srAngleGraphAriaDescription: {
        context:
            "Screenreader-only description of an angle on a coordinate plane.",
        message:
            "The angle measure is %(angleMeasure)s degrees with a vertex at %(vertexX)s comma %(vertexY)s, a point on the initial side at %(isX)s comma %(isY)s and a point on the terminal side at %(tsX)s comma %(tsY)s",
    },
    srSegmentGraphAriaLabel: {
        context:
            "Screenreader-accessible description of a line segment on a coordinate plane.",
        message: "A line segment on a coordinate plane",
    },
    srSegmentGraphAriaDescription: {
        context:
            "Screenreader-only description of a line segment on a coordinate plane.",
        message:
            "Segment %(indexOfSegment)s. Endpoint 1 at %(point1X)s comma %(point1Y)s. Endpoint 2 %(point2X)s comma %(point2Y)s. Segment length %(length)s units.",
    },
    srSegmentGraphEndpointAriaLabel: {
        context:
            "Screenreader-accessible label for an endpoint of a line segment on a coordinate plane.",
        message: "Endpoint $(endpointNumber)s at $(x)s comma $(y)s",
    },
    // The above strings are used for interactive graph SR descriptions.
};

/**
 * Mock strings for the Perseus package, to be used for tests and Storybook.
 */
export const mockStrings: PerseusStrings = {
    closeKeypad: "close math keypad",
    openKeypad: "open math keypad",
    mathInputBox: "Math input box",
    removeHighlight: "Remove highlight",
    addHighlight: "Add highlight",
    hintPos: ({pos}) => `Hint #${pos}`,
    errorRendering: ({error}) => `Error rendering: ${error}`,
    APPROXIMATED_PI_ERROR:
        "Your answer is close, but you may " +
        "have approximated pi. Enter your " +
        "answer as a multiple of pi, like " +
        "<code>12\\ \\text{pi}</code> or " +
        "<code>2/3\\ \\text{pi}</code>",
    EXTRA_SYMBOLS_ERROR:
        "We could not understand your " +
        "answer. Please check your answer for extra " +
        "text or symbols.",
    NEEDS_TO_BE_SIMPLFIED_ERROR:
        "Your answer is almost correct, " + "but it needs to be simplified.",
    MISSING_PERCENT_ERROR:
        "Your answer is almost correct, " +
        "but it is missing a " +
        "<code>\\%</code> at the end.",
    MULTIPLICATION_SIGN_ERROR:
        "I'm a computer. I only understand " +
        "multiplication if you use an asterisk " +
        "(*) as the multiplication sign.",
    WRONG_CASE_ERROR:
        "Your answer includes use of a variable with the wrong case.",
    WRONG_LETTER_ERROR: "Your answer includes a wrong variable letter.",
    invalidSelection: "Make sure you select something for every row.",
    ERROR_TITLE: "Oops!",
    ERROR_MESSAGE: "Sorry, I don't understand that!",
    hints: "Hints",
    getAnotherHint: "Get another hint",
    deprecatedStandin:
        "Sorry, this part of the question is no longer available. 😅 Don't worry, you won't be graded on this part. Keep going!",
    keepTrying: "Keep trying",
    tryAgain: "Try again",
    check: "Check",
    correctExcited: "Correct!",
    nextQuestion: "Next question",
    skipToTitle: ({title}) => `Skip to ${title}`,
    current: "Current",
    correct: "Correct",
    correctSelected: "Correct (selected)",
    correctCrossedOut: "Correct (but you crossed it out)",
    incorrect: "Incorrect",
    incorrectSelected: "Incorrect (selected)",
    hideExplanation: "Hide explanation",
    explain: "Explain",
    INVALID_MESSAGE_PREFIX: "We couldn't grade your answer.",
    DEFAULT_INVALID_MESSAGE_1: "It looks like you left something blank or ",
    DEFAULT_INVALID_MESSAGE_2: "entered in an invalid answer.",
    integerExample: "an integer, like $6$",
    properExample: "a *proper* fraction, like $1/2$ or $6/10$",
    simplifiedProperExample: "a *simplified proper* fraction, like $3/5$",
    improperExample: "an *improper* fraction, like $10/7$ or $14/8$",
    simplifiedImproperExample: "a *simplified improper* fraction, like $7/4$",
    mixedExample: "a mixed number, like $1\\ 3/4$",
    decimalExample: "an *exact* decimal, like $0.75$",
    percentExample: "a percent, like $12.34\\%$",
    piExample: "a multiple of pi, like $12\\ \\text{pi}$ or $2/3\\ \\text{pi}$",
    yourAnswer: "**Your answer should be** ",
    yourAnswerLabel: "Your answer:",
    addPoints: "Click to add points",
    addVertices: "Click to add vertices",
    tapMultiple: "Tap each dot on the image to select all answers that apply.",
    tapSingle: "Tap each dot on the image to select an answer.",
    clickMultiple:
        "Click each dot on the image to select all answers that apply.",
    clickSingle: "Click each dot on the image to select an answer.",
    choices: "Choices:",
    answers: ({num}) => (num === 1 ? `${num} answer` : `${num} answers`),
    hideAnswersToggleLabel: "Hide answer choices",
    moves: ({num}) => (num === 1 ? `Moves: ${num}` : `Moves: ${num}`),
    clickTiles: "Click on the tiles to change the lights.",
    turnOffLights: "You must turn on all of the lights to continue.",
    fillAllCells: "Make sure you fill in all cells in the matrix.",
    molecularDrawing: ({content}) =>
        `A molecular structure drawing. SMILES notation: ${content}`,
    switchDirection: "Switch direction",
    circleOpen: "Make circle open",
    circleFilled: "Make circle filled",
    numDivisions: "Number of divisions:",
    divisions: ({divRangeString}) =>
        `Please make sure the number of divisions is in the range ${divRangeString}.`,
    lineRange: ({lineRange}: {lineRange: string}) => `lines ${lineRange}`,
    lineNumber: ({lineNumber}: {lineNumber: string}) => `line ${lineNumber}`,
    symbolPassage: ({questionSymbol, questionNumber}) =>
        `The symbol ${questionSymbol} indicates that question ${questionNumber} references this portion of the passage.`,
    symbolQuestion: ({sentenceSymbol}) =>
        ` The symbol ${sentenceSymbol} indicates that the following sentence is referenced in a question.`,
    lineLabel: "Line",
    beginningPassage: "Beginning of reading passage.",
    beginningFootnotes: "Beginning of reading passage footnotes.",
    endPassage: "End of reading passage.",
    questionMarker: ({number}) => `[Marker for question ${number}]`,
    circleMarker: ({number}) => `[Circle marker ${number}]`,
    sentenceMarker: ({number}) => `[Sentence ${number}]`,
    dragHandles: "Drag handles to make graph",
    tapAddPoints: "Tap to add points",
    false: "False",
    true: "True",
    no: "No",
    yes: "Yes",
    chooseCorrectNum: "Please choose the correct number of answers.",
    notNoneOfTheAbove:
        "'None of the above' may not be selected when other answers are selected.",
    noneOfTheAbove: "None of the above",
    chooseNumAnswers: ({numCorrect}) => `Choose ${numCorrect} answers:`,
    chooseAllAnswers: "Choose all answers that apply:",
    chooseOneAnswer: "Choose 1 answer:",
    choiceCheckedCorrect: ({letter}) => `(Choice ${letter}, Checked, Correct)`,
    choiceCrossedOutCorrect: ({letter}) =>
        `(Choice ${letter}, Crossed out, Correct)`,
    choiceCorrect: ({letter}) => `(Choice ${letter}, Correct)`,
    choiceCheckedIncorrect: ({letter}) =>
        `(Choice ${letter}, Checked, Incorrect)`,
    choiceCrossedOutIncorrect: ({letter}) =>
        `(Choice ${letter}, Crossed out, Incorrect)`,
    choiceIncorrect: ({letter}) => `(Choice ${letter}, Incorrect)`,
    choiceChecked: ({letter}) => `(Choice ${letter}, Checked)`,
    choiceCrossedOut: ({letter}) => `(Choice ${letter}, Crossed out)`,
    choice: ({letter}) => `(Choice ${letter})`,
    crossOut: "Cross out",
    crossOutOption: "Cross out option",
    crossOutChoice: ({letter}) => `Cross out Choice ${letter}`,
    bringBack: "Bring back",
    openMenuForChoice: ({letter}) => `Open menu for Choice ${letter}`,
    letters: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
    rightArrow: "Reaction arrow pointing to the right.",
    dontUnderstandUnits: "I couldn't understand those units.",
    checkSigFigs: "Check your significant figures.",
    answerNumericallyIncorrect: "That answer is numerically incorrect.",
    checkUnits: "Check your units.",
    dontUnderstand: "I don't understand that",
    loading: "Loading...",
    videoTranscript: "See video transcript",
    somethingWrong: "Something went wrong.",
    videoWrapper: "Khan Academy video wrapper",
    mathInputTitle: "mathematics keyboard",
    mathInputDescription:
        "Use keyboard/mouse to interact with math-based input fields",
    sin: "sin",
    cos: "cos",
    tan: "tan",
    simulationLoadFail: "Sorry, this simulation cannot load.",
    simulationLocaleWarning:
        "Sorry, this simulation isn't available in your language.",
    selectAnAnswer: "Select an answer",

    // The following strings are used for interactive graph SR descriptions.
    graphKeyboardPrompt: "Press Shift + Enter to interact with the graph",
    addPoint: "Add Point",
    removePoint: "Remove Point",
    closePolygon: "Close shape",
    openPolygon: "Re-open shape",
    srPointAtCoordinates: ({num, x, y}) => `Point ${num} at ${x} comma ${y}`,
    srInteractiveElements: ({elements}) => `Interactive elements: ${elements}`,
    srNoInteractiveElements: "No interactive elements",
    srCircleGraph: "A circle on a coordinate plane.",
    srCircleShape: ({centerX, centerY}) =>
        `Circle. The center point is at ${centerX} comma ${centerY}.`,
    srCircleRadiusPoint: ({radiusPointX, radiusPointY}) =>
        `Radius point at ${radiusPointX} comma ${radiusPointY}.`,
    srCircleRadius: ({radius}) => `Circle radius is ${radius}.`,
    srCircleOuterPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
        point4X,
        point4Y,
    }) =>
        `Points on the circle at ${point1X} comma ${point1Y}, ${point2X} comma ${point2Y}, ${point3X} comma ${point3Y}, ${point4X} comma ${point4Y}.`,
    srLinearGraph: "A line on a coordinate plane.",
    srLinearGraphPoints: ({point1X, point1Y, point2X, point2Y}) =>
        `The line has two points, point 1 at ${point1X} comma ${point1Y} and point 2 at ${point2X} comma ${point2Y}.`,
    srLinearGraphSlopeIncreasing: "Its slope increases from left to right.",
    srLinearGraphSlopeDecreasing: "Its slope decreases from left to right.",
    srLinearGraphSlopeHorizontal: "Its slope is zero.",
    srLinearGraphSlopeVertical: "Its slope is undefined.",
    srLinearGraphXOnlyIntercept: ({xIntercept}) =>
        `The line crosses the X-axis at ${xIntercept} comma 0.`,
    srLinearGraphYOnlyIntercept: ({yIntercept}) =>
        `The line crosses the Y-axis at 0 comma ${yIntercept}.`,
    srLinearGraphBothIntercepts: ({xIntercept, yIntercept}) =>
        `The line crosses the X-axis at ${xIntercept} comma 0 and the Y-axis at 0 comma ${yIntercept}.`,
    srLinearGraphOriginIntercept:
        "The line crosses the x and y axes at the graph's origin.",
    srLinearGrabHandle: ({point1X, point1Y, point2X, point2Y}) =>
        `Line from ${point1X} comma ${point1Y} to ${point2X} comma ${point2Y}.`,
    srAngleSideAtCoordinates: ({point, side, x, y}) =>
        `Point ${point}, ${side} at ${x} comma ${y}`,
    srAngleVertexAtCoordinatesWithAngleMeasure: ({x, y, angleMeasure}) =>
        `Point 2, vertex at ${x} comma ${y}. Angle ${angleMeasure} degrees`,
    srAngleGraphAriaLabel: "An angle on a coordinate plane.",
    srAngleGraphAriaDescription: ({
        angleMeasure,
        vertexX,
        vertexY,
        isX,
        isY,
        tsX,
        tsY,
    }) =>
        `The angle measure is ${angleMeasure} degrees with a vertex at ${vertexX} comma ${vertexY}, a point on the initial side at ${isX} comma ${isY} and a point on the terminal side at ${tsX} comma ${tsY}.`,
    srSegmentGraphAriaLabel: "A line segment on a coordinate plane.",
    srSegmentGraphAriaDescription: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        length,
        indexOfSegment
    }) =>
        `Segment ${indexOfSegment}. Endpoint 1 at ${point1X} comma ${point1Y}. Endpoint 2 at ${point2X} comma ${point2Y}. Segment length ${length} units.`,
    srSegmentGraphEndpointAriaLabel: ({endpointNumber, x, y}) =>
        `Endpoint ${endpointNumber} at ${x} comma ${y}`,
    // The above strings are used for interactive graph SR descriptions.
};
