/* eslint-disable max-lines */
import type {ErrorCodes} from "@khanacademy/perseus-core";

/**
 * The translated strings that are used to render Perseus.
 */
export type PerseusStrings = {
    // `num` is a special variable name that is used to determine the plurality
    // of the translated string.
    characterCount: ({used, num}: {used: number; num: number}) => string;
    closeKeypad: string;
    openKeypad: string;
    mathInputBox: string;
    removeHighlight: string;
    addHighlight: string;
    hintPos: ({pos}: {pos: number}) => string;
    errorRendering: ({error}: {error: string}) => string;
    APPROXIMATED_PI_ERROR: string;
    EMPTY_RESPONSE_ERROR: string;
    EXTRA_SYMBOLS_ERROR: string;
    NEEDS_TO_BE_SIMPLFIED_ERROR: string;
    MISSING_PERCENT_ERROR: string;
    MULTIPLICATION_SIGN_ERROR: string;
    WRONG_CASE_ERROR: string;
    WRONG_LETTER_ERROR: string;
    invalidSelection: string;
    INVALID_CHOICE_SELECTION: string;
    ERROR_TITLE: string;
    ERROR_MESSAGE: string;
    USER_INPUT_EMPTY: string;
    USER_INPUT_TOO_LONG: string;
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
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    notSelected: string;
    choicesSelected: ({num}: {num: number}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
    scrollAnswers: string;
    scrollStart: string;
    scrollEnd: string;
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
    srGraphInstructions: string;
    srUnlimitedGraphInstructions: string;
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
    srCircleRadiusPointRight: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadiusPointLeft: ({
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
    srAngleStartingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleEndingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleVertexWithAngleMeasure: ({
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
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        angleMeasure: string;
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srAngleInteractiveElements: ({
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srSingleSegmentGraphAriaLabel: string;
    srMultipleSegmentGraphAriaLabel: ({
        countOfSegments,
    }: {
        countOfSegments: number;
    }) => string;
    srMultipleSegmentIndividualLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        indexOfSegment,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        indexOfSegment: number;
    }) => string;
    srSingleSegmentLabel: ({
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
    srSegmentLength: ({length}: {length: string}) => string;
    srSingleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
    }) => string;
    srMultipleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
        indexOfSegment,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
        indexOfSegment: number;
    }) => string;
    srSegmentGrabHandle: ({
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
    srLinearSystemGraph: string;
    srLinearSystemPoints: ({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemPoint({
        lineNumber,
        pointSequence,
        x,
        y,
    }: {
        lineNumber: number;
        pointSequence: number;
        x: string;
        y: string;
    }): string;
    srLinearSystemGrabHandle({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }): string;
    srLinearSystemIntersection({x, y}: {x: string; y: string}): string;
    srLinearSystemParallel: string;
    srRayGraph: string;
    srRayPoints: ({
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
    srRayEndpoint: ({x, y}: {x: string; y: string}) => string;
    srRayTerminalPoint: ({x, y}: {x: string; y: string}) => string;
    srRayGrabHandle: ({
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
    srQuadraticGraph: string;
    srQuadraticFaceUp: string;
    srQuadraticFaceDown: string;
    srQuadraticGraphVertexOrigin: string;
    srQuadraticGraphVertexXAxis: string;
    srQuadraticGraphVertexYAxis: string;
    srQuadraticGraphVertexQuadrant: ({quadrant}: {quadrant: number}) => string;
    srQuadraticTwoXIntercepts: ({
        intercept1,
        intercept2,
    }: {
        intercept1: string;
        intercept2: string;
    }) => string;
    srQuadraticOneXIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticYIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticPointOrigin: ({pointNumber}: {pointNumber: number}) => string;
    srQuadraticPointAxis: ({
        pointNumber,
        x,
        y,
    }: {
        pointNumber: number;
        x: string;
        y: string;
    }) => string;
    srQuadraticPointQuadrant: ({
        pointNumber,
        x,
        y,
        quadrant,
    }: {
        pointNumber: number;
        x: string;
        y: string;
        quadrant: number;
    }) => string;
    srQuadraticInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
    }) => string;
    srPolygonGraph: string;
    srPolygonGraphCoordinatePlane: string;
    srPolygonGraphPointsNum: ({num}: {num: number}) => string;
    srPolygonGraphPointsOne: string;
    srPolygonElementsNum: ({num}: {num: number}) => string;
    srPolygonElementsOne: string;
    srPolygonPointAngleApprox: ({angle}: {angle: string}) => string;
    srPolygonPointAngle: ({angle}: {angle: number}) => string;
    srPolygonSideLength: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srPolygonSideLengthApprox: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srUnlimitedPolygonEmpty: string;
    srSinusoidGraph: string;
    srSinusoidRootPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMaxPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMinPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidFlatPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidDescription: ({
        minValue,
        maxValue,
        cycleStart,
        cycleEnd,
    }: {
        minValue: string;
        maxValue: string;
        cycleStart: string;
        cycleEnd: string;
    }) => string;
    srSinusoidInteractiveElements: ({
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
    imageExploreButton: string;
    imageAlternativeTitle: string;
    imageDescriptionLabel: string;
    imageZoomAriaLabel: string;
    imageResetZoomAriaLabel: string;
    gifPlayAriaLabel: string;
    gifPauseAriaLabel: string;
};

/**
 * Untranslated strings used in Perseus. To be used by an external
 * translator to produce translated strings, passed in as `PerseusStrings`.
 * !! Note: Ensure that all escape sequences are double-escaped. (e.g. `\\text` -> `\\\\text`)
 */
export const strings = {
    // `num` is a special variable name that is used to determine the plurality
    // of the translated string.
    characterCount: {
        one: "%(used)s / %(num)s Character",
        other: "%(used)s / %(num)s Characters",
    },
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
        "12 pi or " +
        "2/3 pi",
    EMPTY_RESPONSE_ERROR:
        "There are still more parts of this question to answer.",
    EXTRA_SYMBOLS_ERROR:
        "We could not understand your " +
        "answer. Please check your answer for extra " +
        "text or symbols.",
    NEEDS_TO_BE_SIMPLFIED_ERROR:
        "Your answer is almost correct, " + "but it needs to be simplified.",
    MISSING_PERCENT_ERROR:
        "Your answer is almost correct, " +
        "but it is missing a " +
        "<code>\\\\%</code> at the end.",
    MULTIPLICATION_SIGN_ERROR:
        "I'm a computer. I only understand " +
        "multiplication if you use an asterisk " +
        "(*) as the multiplication sign.",
    USER_INPUT_EMPTY: "Your answer is empty.",
    USER_INPUT_TOO_LONG: "Please shorten your response.",
    WRONG_CASE_ERROR:
        "Your answer includes use of a variable with the wrong case.",
    WRONG_LETTER_ERROR: "Your answer includes a wrong variable letter.",
    invalidSelection: "Make sure you select something for every row.",
    INVALID_CHOICE_SELECTION: "Invalid choice selection",
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
    mixedExample: "a mixed number, like $1\\\\ 3/4$",
    decimalExample: "an *exact* decimal, like $0.75$",
    percentExample: "a percent, like $12.34\\\\%$",
    piExample: "a multiple of pi, like $12$ pi or $2/3$ pi",
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
    choiceCorrect: "(Choice %(letter)s, Correct)",
    choiceCheckedIncorrect: "(Choice %(letter)s, Checked, Incorrect)",
    choiceIncorrect: "(Choice %(letter)s, Incorrect)",
    choiceChecked: "(Choice %(letter)s, Checked)",
    choice: "(Choice %(letter)s)",
    notSelected: {
        context: "Screen reader announcement for a choice that is not selected",
        message: "not selected",
    },
    choicesSelected: {
        one: "%(num)s choice selected",
        other: "%(num)s choices selected",
    },
    bringBack: "Bring back",
    openMenuForChoice: "Open menu for Choice %(letter)s",
    letters: {
        context:
            "This is a list of single-character labels that will appear in front of multiple-choice options. For instance, a multiple-choice question with three options would display (A) first option (B) second option (C) third option. There must be spaces between each of the different characters. The characters will show up next to options in the order that they are listed here. Most multiple choice questions have 5 or fewer options.",
        message: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
    },
    scrollAnswers: "Scroll Answers",
    scrollStart: "Scroll to view start of the content",
    scrollEnd: "Scroll to view the end of the content",
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
    addPoint: "Add Point",
    removePoint: "Remove Point",
    graphKeyboardPrompt: "Press Shift + Enter to interact with the graph",
    srInteractiveElements: "Interactive elements: %(elements)s",
    srNoInteractiveElements: "No interactive elements",
    closePolygon: {
        context:
            "Button label for the button that closes an incomplete polygon created by the user in the interactive graph widget.",
        message: "Close shape",
    },
    openPolygon: {
        context:
            "Button label for the button that opens a closed polygon created by the user in the interactive graph widget.",
        message: "Re-open shape",
    },
    srGraphInstructions: {
        context:
            "Screen reader-only instructions for using the keyboard to move through the interactive elements in the interactive graph widget.",
        message:
            "Use the Tab key to move through the interactive elements in the graph. When an interactive element has focus, use Control + Shift + Arrows to move it.",
    },
    srUnlimitedGraphInstructions: {
        context:
            "Screen reader-only instructions for using the keyboard to move through the 'unlimited' (addable/deletable by the user) interactive elements in the interactive graph widget.",
        message:
            "Press Shift + Enter to interact with the graph. Use the Tab key to move through the interactive elements in the graph and access the graph Action Bar. When an interactive element has focus, use Control + Shift + Arrows to move it or use the Delete key to remove it from the graph. Use the buttons in the Action Bar to add or adjust elements within the graph.",
    },
    srPointAtCoordinates: {
        context:
            "Aria label for an interactive Point element in the interactive graph widget, including the count for its order in the points (e.g. 'Point 1 at 0 comma 0'). Coordinate (x, y) is written out as 'x comma y'.",
        message: "Point %(num)s at %(x)s comma %(y)s.",
    },
    srCircleGraph: {
        context:
            "Aria label for the container containing the Circle and its interactive elements in the interactive graph widget.",
        message: "A circle on a coordinate plane.",
    },
    srCircleShape: {
        context:
            "Aria label for the interactive Circle element in the interactive graph widget.",
        message:
            "Circle. The center point is at %(centerX)s comma %(centerY)s.",
    },
    srCircleRadiusPointRight: {
        context:
            "Aria label for the interactive Point element that represents the radius endpoint when it's on the right side of the Circle in the interactive graph widget.",
        message:
            "Right radius endpoint at %(radiusPointX)s comma %(radiusPointY)s.",
    },
    srCircleRadiusPointLeft: {
        context:
            "Aria label for the interactive Point element that represents the radius endpoint when it's on the left side of the Circle in the interactive graph widget.",
        message:
            "Left radius endpoint at %(radiusPointX)s comma %(radiusPointY)s.",
    },
    srCircleRadius: {
        context:
            "Screen reader description for the radius of the Circle in the interactive graph widget.",
        message: "Circle radius is %(radius)s.",
    },
    srCircleOuterPoints: {
        context:
            "Screen reader description for four key points on the Circle in the interactive graph widget.",
        message:
            "Points on the circle at %(point1X)s comma %(point1Y)s, %(point2X)s comma %(point2Y)s, %(point3X)s comma %(point3Y)s, %(point4X)s comma %(point4Y)s.",
    },
    srLinearGraph: {
        context:
            "Aria label for the container containing the Line and its interactive elements in the interactive graph widget.",
        message: "A line on a coordinate plane.",
    },
    srLinearGraphPoints: {
        context:
            "Screen reader description for the two points defining the Line in the interactive graph widget.",
        message:
            "The line has two points, point 1 at %(point1X)s comma %(point1Y)s and point 2 at %(point2X)s comma %(point2Y)s.",
    },
    srLinearGraphSlopeIncreasing: {
        context:
            "Screen reader description for the upward slope of the Line in the interactive graph widget.",
        message: "Its slope increases from left to right.",
    },
    srLinearGraphSlopeDecreasing: {
        context:
            "Screen reader description for the downward slope of the Line in the interactive graph widget.",
        message: "Its slope decreases from left to right.",
    },
    srLinearGraphSlopeHorizontal: {
        context:
            "Screen reader description for the slope of a horizontal Line in the interactive graph widget.",
        message: "Its slope is zero.",
    },
    srLinearGraphSlopeVertical: {
        context:
            "Screen reader description for the slope of a vertical Line in the interactive graph widget.",
        message: "Its slope is undefined.",
    },
    srLinearGraphXOnlyIntercept: {
        context:
            "Screen reader description for the intercept of the Line in the interactive graph widget when it only intersects the X-axis.",
        message: "The line crosses the X-axis at %(xIntercept)s comma 0.",
    },
    srLinearGraphYOnlyIntercept: {
        context:
            "Screen reader description for the intercept of the Line in the interactive graph widget when it only intersects the Y-axis.",
        message: "The line crosses the Y-axis at 0 comma %(yIntercept)s.",
    },
    srLinearGraphBothIntercepts: {
        context:
            "Screen reader description for the intercepts of the Line in the interactive graph widget when it intersects both the X-axis and Y-axis.",
        message:
            "The line crosses the X-axis at %(xIntercept)s comma 0 and the Y-axis at 0 comma %(yIntercept)s.",
    },
    srLinearGraphOriginIntercept: {
        context:
            "Screen reader description for the intercept of the Line in the interactive graph widget when it intersects both the X-axis and Y-axis at the origin.",
        message: "The line crosses the X and Y axes at the graph's origin.",
    },
    srLinearGrabHandle: {
        context:
            "Aria label for the interactive segment that allows the user to move the whole Line in the interactive graph widget.",
        message:
            "Line going through point %(point1X)s comma %(point1Y)s and point %(point2X)s comma %(point2Y)s.",
    },
    srAngleStartingSide: {
        context:
            "Aria label for interactive Point 3 of the Angle in the interactive graph widget, explaining it's on the starting side of the Angle.",
        message: "Point 3, starting side at %(x)s comma %(y)s.",
    },
    srAngleEndingSide: {
        context:
            "Aria label for interactive Point 2 of the Angle in the interactive graph widget, explaining it's on the ending side of the Angle.",
        message: "Point 2, ending side at %(x)s comma %(y)s.",
    },
    srAngleVertexWithAngleMeasure: {
        context:
            "Aria label for interactive Point 1 of the Angle in the interactive graph widget, explaining it's the vertex of the Angle.",
        message:
            "Point 1, vertex at %(x)s comma %(y)s. Angle %(angleMeasure)s degrees.",
    },
    srAngleGraphAriaLabel: {
        context:
            "Aria label for the container containing the Angle and its interactive elements in the interactive graph widget.",
        message: "An angle on a coordinate plane.",
    },
    srAngleGraphAriaDescription: {
        context:
            "Screen reader description for the measure of the Angle in the interactive graph widget.",
        message:
            "The angle measure is %(angleMeasure)s degrees with a vertex at %(vertexX)s comma %(vertexY)s, a point on the starting side at %(startingSideX)s comma %(startingSideY)s and a point on the ending side at %(endingSideX)s comma %(endingSideY)s",
    },
    srAngleInteractiveElements: {
        context:
            "Screen reader description of all the elements available to interact with within the Angle graph in the interactive graph widget.",
        message:
            "An angle formed by 3 points. The vertex is at %(vertexX)s comma %(vertexY)s. The starting side point is at %(startingSideX)s comma %(startingSideY)s. The ending side point is at %(endingSideX)s comma %(endingSideY)s.",
    },
    srSingleSegmentGraphAriaLabel: {
        context:
            "Aria label for the container containing one Line Segment in the interactive graph widget.",
        message: "A line segment on a coordinate plane.",
    },
    srMultipleSegmentGraphAriaLabel: {
        context:
            "Aria label for the container containing multiple Line Segments in the interactive graph widget.",
        message: "%(countOfSegments)s line segments on a coordinate plane.",
    },
    srMultipleSegmentIndividualLabel: {
        context:
            "Screen reader description for one individual Line Segment in the interactive graph widget, including the count for its order in the segments (e.g. 'Segment 1', 'Segment 2', etc.)",
        message:
            "Segment %(indexOfSegment)s: Endpoint 1 at %(point1X)s comma %(point1Y)s. Endpoint 2 at %(point2X)s comma %(point2Y)s.",
    },
    srSingleSegmentLabel: {
        context:
            "Screen reader description for one individual Line Segment in the interactive graph widget.",
        message:
            "Endpoint 1 at %(point1X)s comma %(point1Y)s. Endpoint 2 at %(point2X)s comma %(point2Y)s.",
    },
    srSegmentLength: {
        context:
            "Screen reader description for the length of a Line Segment in the interactive graph widget.",
        message: "Segment length %(length)s units.",
    },
    srSingleSegmentGraphEndpointAriaLabel: {
        context:
            "Screen reader description for the endpoint of a Line Segment in the interactive graph widget when there is only one segment.",
        message: "Endpoint %(endpointNumber)s at %(x)s comma %(y)s.",
    },
    srMultipleSegmentGraphEndpointAriaLabel: {
        context:
            "Screen reader description for the endpoint of a Line Segment in the interactive graph widget when there are multiple segments. Includes the count for the segment's order (e.g. 'Segment 1', 'Segment 2', etc.)",
        message:
            "Endpoint %(endpointNumber)s on segment %(indexOfSegment)s at %(x)s comma %(y)s.",
    },
    srSegmentGrabHandle: {
        context:
            "Aria label for the interactive segment that allows the user to move the whole Line Segment in the interactive graph widget.",
        message:
            "Segment from %(point1X)s comma %(point1Y)s to %(point2X)s comma %(point2Y)s.",
    },
    srLinearSystemGraph: {
        context:
            "Aria label for the container containing two lines as part of a Linear System in the interactive graph widget.",
        message: "Two lines on a coordinate plane.",
    },
    srLinearSystemPoints: {
        context:
            "Screen reader description for the points of a line in the Linear System in the interactive graph widget.",
        message:
            "Line %(lineNumber)s has two points, point 1 at %(point1X)s comma %(point1Y)s and point 2 at %(point2X)s comma %(point2Y)s.",
    },
    srLinearSystemPoint: {
        context:
            "Screen reader description for a point on a line in the Linear System in the interactive graph widget.",
        message:
            "Point %(pointSequence)s on line %(lineNumber)s at %(x)s comma %(y)s.",
    },
    srLinearSystemGrabHandle: {
        context:
            "Aria label for the interactive segment that allows the user to move a whole line in the Linear System in the interactive graph widget.",
        message:
            "Line %(lineNumber)s going through point %(point1X)s comma %(point1Y)s and point %(point2X)s comma %(point2Y)s.",
    },
    srLinearSystemIntersection: {
        context:
            "Screen reader description for the intersection of two lines in the Linear System in the interactive graph widget.",
        message: "Line 1 and line 2 intersect at point %(x)s comma %(y)s.",
    },
    srLinearSystemParallel: {
        context:
            "Screen reader description when two lines are parallel in the Linear System in the interactive graph widget.",
        message: "Line 1 and line 2 are parallel.",
    },
    srRayGraph: {
        context:
            "Screen reader description for the container containing a Ray in the interactive graph widget.",
        message: "A ray on a coordinate plane.",
    },
    srRayPoints: {
        context:
            "Screen reader description for the points of a ray in the interactive graph widget.",
        message:
            "The endpoint is at %(point1X)s comma %(point1Y)s and the ray goes through point %(point2X)s comma %(point2Y)s.",
    },
    srRayGrabHandle: {
        context:
            "Aria label for the interactive segment that allows the user to move the whole Ray in the interactive graph widget.",
        message:
            "Ray with endpoint %(point1X)s comma %(point1Y)s going through point %(point2X)s comma %(point2Y)s.",
    },
    srRayEndpoint: {
        context:
            "Aria label for the initial point of a Ray (the point at which the ray starts) in the interactive graph widget.",
        message: "Endpoint at %(x)s comma %(y)s.",
    },
    srRayTerminalPoint: {
        context:
            "Aria label for the point that determines the direction of the Ray in the interactive graph widget. The ray passes through this point.",
        message: "Through point at %(x)s comma %(y)s.",
    },
    srQuadraticGraph: {
        context:
            "Aria label for the container containing a Quadratic function in the interactive graph widget.",
        message: "A parabola on a 4-quadrant coordinate plane.",
    },
    srQuadraticFaceUp: {
        context:
            "Screen reader description for the direction of the Quadratic function in the interactive graph widget when it opens upward.",
        message: "The parabola opens upward.",
    },
    srQuadraticFaceDown: {
        context:
            "Screen reader description for the direction of the Quadratic function in the interactive graph widget when it opens downward.",
        message: "The parabola opens downward.",
    },
    srQuadraticGraphVertexOrigin: {
        context:
            "Screen reader description for the Quadratic function in the interactive graph widget when its vertex is at the origin.",
        message: "Vertex is at the origin.",
    },
    srQuadraticGraphVertexXAxis: {
        context:
            "Screen reader description for the Quadratic function in the interactive graph widget when its vertex is on the X-axis.",
        message: "Vertex is on the X-axis.",
    },
    srQuadraticGraphVertexYAxis: {
        context:
            "Screen reader description for the Quadratic function in the interactive graph widget when its vertex is on the Y-axis.",
        message: "Vertex is on the Y-axis.",
    },
    srQuadraticGraphVertexQuadrant: {
        context:
            "Screen reader description for the Quadratic function in the interactive graph widget when its vertex is in a specific quadrant (quadrant 1, 2, 3, or 4).",
        message: "Vertex is in quadrant %(quadrant)s.",
    },
    srQuadraticTwoXIntercepts: {
        context:
            "Screen reader description for the X-intercepts of the Quadratic function in the interactive graph widget when there are two X-intercepts.",
        message:
            "The X-intercepts are at %(intercept1)s comma 0 and %(intercept2)s comma 0.",
    },
    srQuadraticOneXIntercept: {
        context:
            "Screen reader description for the X-intercept of the Quadratic function in the interactive graph widget when there is only one X-intercept.",
        message: "The X-intercept is at %(intercept)s comma 0.",
    },
    srQuadraticYIntercept: {
        context:
            "Screen reader description for the Y-intercept of the Quadratic function in the interactive graph widget.",
        message: "The Y-intercept is at 0 comma %(intercept)s.",
    },
    srQuadraticPointOrigin: {
        context:
            "Aria label for an interactive Point on the Quadratic function in the interactive graph widget when the Point is at the origin.",
        message: "Point %(pointNumber)s on parabola at the origin.",
    },
    srQuadraticPointAxis: {
        context:
            "Aria label for an interactive Point on the Quadratic function in the interactive graph widget when the Point is on the X-axis or Y-axis.",
        message: "Point %(pointNumber)s on parabola at %(x)s comma %(y)s.",
    },
    srQuadraticPointQuadrant: {
        context:
            "Aria label for an interactive Point on the Quadratic function in the interactive graph widget when the Point is in a specific quadrant.",
        message:
            "Point %(pointNumber)s on parabola in quadrant %(quadrant)s at %(x)s comma %(y)s.",
    },
    srQuadraticInteractiveElements: {
        context:
            "Screen reader description of all the elements available to interact with within the Quadratic function in the interactive graph widget.",
        message:
            "Parabola with points at %(point1X)s comma %(point1Y)s, %(point2X)s comma %(point2Y)s, and %(point3X)s comma %(point3Y)s.",
    },
    srPolygonGraph: {
        context:
            "Aria label for the container containing a Polygon in the interactive graph widget when it's on a plane/grid without axes.",
        message: "A polygon.",
    },
    srPolygonGraphCoordinatePlane: {
        context:
            "Aria label for the container containing a Polygon in the interactive graph widget when it's on a coordinate plane.",
        message: "A polygon on a coordinate plane.",
    },
    srPolygonGraphPointsNum: {
        context:
            "Screen reader description for the number of points in the Polygon in the interactive graph widget.",
        message: "The polygon has %(num)s points.",
    },
    srPolygonGraphPointsOne: {
        context:
            "Screen reader description for the number of points in the Polygon in the interactive graph widget when there is only one point.",
        message: "The polygon has 1 point.",
    },
    srPolygonElementsNum: {
        context:
            "Screen reader description for the Polygon in the interactive graph widget explaining that it has a certain number of points.",
        message: "A polygon with %(num)s points.",
    },
    srPolygonElementsOne: {
        context:
            "Screen reader description for the Polygon in the interactive graph widget explaining that it has one point.",
        message: "A polygon with 1 point.",
    },
    srPolygonPointAngleApprox: {
        context:
            "Screen reader description for the angle of a point in the Polygon in the interactive graph widget when it's not an exact integer.",
        message: "Angle approximately equal to %(angle)s degrees.",
    },
    srPolygonPointAngle: {
        context:
            "Screen reader description for the angle of a point in the Polygon in the interactive graph widget when it's an integer.",
        message: "Angle equal to %(angle)s degrees.",
    },
    srPolygonSideLength: {
        context:
            "Screen reader description for the side of the Polygon in the interactive graph widget when its length is an exact integer.",
        message:
            "A line segment, length equal to %(length)s units, connects to point %(pointNum)s.",
    },
    srPolygonSideLengthApprox: {
        context:
            "Screen reader description for the side of the Polygon in the interactive graph widget when its length is not an exact integer.",
        message:
            "A line segment, length approximately equal to %(length)s units, connects to point %(pointNum)s.",
    },
    srUnlimitedPolygonEmpty: {
        context:
            "Screen reader description for the empty container that will eventually contain a Polygon in the interactive graph widget after the user has added points.",
        message: "An empty coordinate plane.",
    },
    srSinusoidGraph: {
        context:
            "Aria label for the container containing a Sinusoid function in the interactive graph widget.",
        message: "A sinusoid function on a coordinate plane.",
    },
    srSinusoidRootPoint: {
        context:
            "Aria label for the Point defining the midline intersection of the Sinusoid function in the interactive graph widget.",
        message: "Midline intersection at %(x)s comma %(y)s.",
    },
    srSinusoidMaxPoint: {
        context:
            "Aria label for the Point defining the maximum of the Sinusoid function in the interactive graph widget.",
        message: "Maximum point at %(x)s comma %(y)s.",
    },
    srSinusoidMinPoint: {
        context:
            "Aria label for the Point defining the minimum of the Sinusoid function in the interactive graph widget.",
        message: "Minimum point at %(x)s comma %(y)s.",
    },
    srSinusoidFlatPoint: {
        context:
            "Aria label for the Point defining the amplitude of the Sinusoid function in the interactive graph widget when the amplitude is 0.",
        message: "Line through point at %(x)s comma %(y)s.",
    },
    srSinusoidDescription: {
        context:
            "Screen reader description of the Sinusoid function in the interactive graph widget.",
        message:
            "The graph shows a wave with a minimum value of %(minValue)s and a maximum value of %(maxValue)s. The wave completes a full cycle from %(cycleStart)s to %(cycleEnd)s.",
    },
    srSinusoidInteractiveElements: {
        context:
            "Screen reader description of all the elements available to interact with within the Sinusoid function in the interactive graph widget.",
        message:
            "Sinusoid graph with midline intersection point at %(point1X)s comma %(point1Y)s and extremum point at %(point2X)s comma %(point2Y)s.",
    },
    imageExploreButton: "Explore image",
    imageAlternativeTitle: "Explore image and description",
    imageDescriptionLabel: "Description",
    imageZoomAriaLabel: "Zoom image.",
    imageResetZoomAriaLabel: "Reset zoom.",
    gifPlayAriaLabel: "Play animation.",
    gifPauseAriaLabel: "Pause animation.",
} satisfies {
    [key in keyof PerseusStrings]:
        | string
        | {context?: string; message: string}
        | {context?: string; one: string; other: string};
};

/**
 * Mock strings for the Perseus package, to be used for tests and Storybook.
 */
export const mockStrings: PerseusStrings = {
    characterCount: ({used, num}) =>
        num === 1
            ? `${used} / ${num} Character`
            : `${used} / ${num} Characters`,
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
    EMPTY_RESPONSE_ERROR:
        "There are still more parts of this question to answer.",
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
    USER_INPUT_EMPTY: "Your answer is empty.",
    USER_INPUT_TOO_LONG: "Please shorten your response.",
    WRONG_CASE_ERROR:
        "Your answer includes use of a variable with the wrong case.",
    WRONG_LETTER_ERROR: "Your answer includes a wrong variable letter.",
    invalidSelection: "Make sure you select something for every row.",
    INVALID_CHOICE_SELECTION: "Invalid choice selection",
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
    choiceCorrect: ({letter}) => `(Choice ${letter}, Correct)`,
    choiceCheckedIncorrect: ({letter}) =>
        `(Choice ${letter}, Checked, Incorrect)`,
    choiceIncorrect: ({letter}) => `(Choice ${letter}, Incorrect)`,
    choiceChecked: ({letter}) => `(Choice ${letter}, Checked)`,
    choice: ({letter}) => `(Choice ${letter})`,
    notSelected: "not selected",
    choicesSelected: ({num}) =>
        num === 1 ? `${num} choice selected` : `${num} choices selected`,
    bringBack: "Bring back",
    openMenuForChoice: ({letter}) => `Open menu for Choice ${letter}`,
    letters: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
    scrollAnswers: "Scroll Answers",
    scrollStart: "Scroll to view start of the content",
    scrollEnd: "Scroll to view the end of the content",
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
    srGraphInstructions:
        "Use the Tab key to move through the interactive elements in the graph. When an interactive element has focus, use Control + Shift + Arrows to move it.",
    srUnlimitedGraphInstructions:
        "Press Shift + Enter to interact with the graph. Use the Tab key to move through the interactive elements in the graph and access the graph Action Bar. When an interactive element has focus, use Control + Shift + Arrows to move it or use the Delete key to remove it from the graph. Use the buttons in the Action Bar to add or adjust elements within the graph.",
    graphKeyboardPrompt: "Press Shift + Enter to interact with the graph",
    addPoint: "Add Point",
    removePoint: "Remove Point",
    closePolygon: "Close shape",
    openPolygon: "Re-open shape",
    srPointAtCoordinates: ({num, x, y}) => `Point ${num} at ${x} comma ${y}.`,
    srInteractiveElements: ({elements}) => `Interactive elements: ${elements}`,
    srNoInteractiveElements: "No interactive elements",
    srCircleGraph: "A circle on a coordinate plane.",
    srCircleShape: ({centerX, centerY}) =>
        `Circle. The center point is at ${centerX} comma ${centerY}.`,
    srCircleRadiusPointRight: ({radiusPointX, radiusPointY}) =>
        `Right radius endpoint at ${radiusPointX} comma ${radiusPointY}.`,
    srCircleRadiusPointLeft: ({radiusPointX, radiusPointY}) =>
        `Left radius endpoint at ${radiusPointX} comma ${radiusPointY}.`,
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
        "The line crosses the X and Y axes at the graph's origin.",
    srLinearGrabHandle: ({point1X, point1Y, point2X, point2Y}) =>
        `Line going through point ${point1X} comma ${point1Y} and point ${point2X} comma ${point2Y}.`,
    srAngleStartingSide: ({x, y}) =>
        `Point 3, starting side at ${x} comma ${y}.`,
    srAngleEndingSide: ({x, y}) => `Point 2, ending side at ${x} comma ${y}.`,
    srAngleVertexWithAngleMeasure: ({x, y, angleMeasure}) =>
        `Point 1, vertex at ${x} comma ${y}. Angle ${angleMeasure} degrees.`,
    srAngleGraphAriaLabel: "An angle on a coordinate plane.",
    srAngleGraphAriaDescription: ({
        angleMeasure,
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }) =>
        `The angle measure is ${angleMeasure} degrees with a vertex at ${vertexX} comma ${vertexY}, a point on the starting side at ${startingSideX} comma ${startingSideY} and a point on the ending side at ${endingSideX} comma ${endingSideY}.`,
    srAngleInteractiveElements: ({
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }) =>
        `An angle formed by 3 points. The vertex is at ${vertexX} comma ${vertexY}. The starting side point is at ${startingSideX} comma ${startingSideY}. The ending side point is at ${endingSideX} comma ${endingSideY}.`,
    srSingleSegmentGraphAriaLabel: "A line segment on a coordinate plane.",
    srMultipleSegmentGraphAriaLabel: ({countOfSegments}) =>
        `${countOfSegments} segments on a coordinate plane.`,
    srMultipleSegmentIndividualLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        indexOfSegment,
    }) =>
        `Segment ${indexOfSegment}: Endpoint 1 at ${point1X} comma ${point1Y}. Endpoint 2 at ${point2X} comma ${point2Y}.`,
    srSingleSegmentLabel: ({point1X, point1Y, point2X, point2Y}) =>
        `Endpoint 1 at ${point1X} comma ${point1Y}. Endpoint 2 at ${point2X} comma ${point2Y}.`,
    srSegmentLength: ({length}) => `Segment length ${length} units.`,
    srSingleSegmentGraphEndpointAriaLabel: ({endpointNumber, x, y}) =>
        `Endpoint ${endpointNumber} at ${x} comma ${y}.`,
    srMultipleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
        indexOfSegment,
    }) =>
        `Endpoint ${endpointNumber} on segment ${indexOfSegment} at ${x} comma ${y}.`,
    srSegmentGrabHandle: ({point1X, point1Y, point2X, point2Y}) =>
        `Segment from ${point1X} comma ${point1Y} to ${point2X} comma ${point2Y}.`,
    srLinearSystemGraph: "Two lines on a coordinate plane.",
    srLinearSystemPoints: ({lineNumber, point1X, point1Y, point2X, point2Y}) =>
        `Line ${lineNumber} has two points, point 1 at ${point1X} comma ${point1Y} and point 2 at ${point2X} comma ${point2Y}.`,
    srLinearSystemPoint: ({lineNumber, pointSequence, x, y}) =>
        `Point ${pointSequence} on line ${lineNumber} at ${x} comma ${y}.`,
    srLinearSystemGrabHandle: ({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }) =>
        `Line ${lineNumber} going through point ${point1X} comma ${point1Y} and point ${point2X} comma ${point2Y}.`,
    srLinearSystemIntersection: ({x, y}) =>
        `Line 1 and line 2 intersect at point ${x} comma ${y}.`,
    srLinearSystemParallel: "Line 1 and line 2 are parallel.",
    srRayGraph: "A ray on a coordinate plane.",
    srRayPoints: ({point1X, point1Y, point2X, point2Y}) =>
        `The endpoint is at ${point1X} comma ${point1Y} and the ray goes through point ${point2X} comma ${point2Y}.`,
    srRayGrabHandle: ({point1X, point1Y, point2X, point2Y}) =>
        `Ray with endpoint ${point1X} comma ${point1Y} going through point ${point2X} comma ${point2Y}.`,
    srRayEndpoint: ({x, y}) => `Endpoint at ${x} comma ${y}.`,
    srRayTerminalPoint: ({x, y}) => `Through point at ${x} comma ${y}.`,
    srQuadraticGraph: "A parabola on a 4-quadrant coordinate plane.",
    srQuadraticFaceUp: "The parabola opens upward.",
    srQuadraticFaceDown: "The parabola opens downward.",
    srQuadraticGraphVertexOrigin: "Vertex is at the origin.",
    srQuadraticGraphVertexXAxis: "Vertex is on the X-axis.",
    srQuadraticGraphVertexYAxis: "Vertex is on the Y-axis.",
    srQuadraticGraphVertexQuadrant: ({quadrant}) =>
        `Vertex is in quadrant ${quadrant}.`,
    srQuadraticTwoXIntercepts: ({intercept1, intercept2}) =>
        `The X-intercepts are at ${intercept1} comma 0 and ${intercept2} comma 0.`,
    srQuadraticOneXIntercept: ({intercept}) =>
        `The X-intercept is at ${intercept} comma 0.`,
    srQuadraticYIntercept: ({intercept}) =>
        `The Y-intercept is at 0 comma ${intercept}.`,
    srQuadraticPointOrigin: ({pointNumber}) =>
        `Point ${pointNumber} on parabola at the origin.`,
    srQuadraticPointAxis: ({pointNumber, x, y}) =>
        `Point ${pointNumber} on parabola at ${x} comma ${y}.`,
    srQuadraticPointQuadrant: ({pointNumber, x, y, quadrant}) =>
        `Point ${pointNumber} on parabola in quadrant ${quadrant} at ${x} comma ${y}.`,
    srQuadraticInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
    }) =>
        `Parabola with points at ${point1X} comma ${point1Y}, ${point2X} comma ${point2Y}, and ${point3X} comma ${point3Y}.`,
    srPolygonGraph: "A polygon.",
    srPolygonGraphCoordinatePlane: "A polygon on a coordinate plane.",
    srPolygonGraphPointsNum: ({num}) => `The polygon has ${num} points.`,
    srPolygonGraphPointsOne: "The polygon has 1 point.",
    srPolygonElementsNum: ({num}) => `A polygon with ${num} points.`,
    srPolygonElementsOne: "A polygon with 1 point.",
    srPolygonPointAngleApprox: ({angle}) =>
        `Angle approximately equal to ${angle} degrees.`,
    srPolygonPointAngle: ({angle}) => `Angle equal to ${angle} degrees.`,
    srPolygonSideLength: ({pointNum, length}) =>
        `A line segment, length equal to ${length} units, connects to point ${pointNum}.`,
    srPolygonSideLengthApprox: ({pointNum, length}) =>
        `A line segment, length approximately equal to ${length} units, connects to point ${pointNum}.`,
    srUnlimitedPolygonEmpty: "An empty coordinate plane.",
    srSinusoidGraph: "A sinusoid function on a coordinate plane.",
    srSinusoidRootPoint: ({x, y}) => `Midline intersection at ${x} comma ${y}.`,
    srSinusoidMaxPoint: ({x, y}) => `Maximum point at ${x} comma ${y}.`,
    srSinusoidMinPoint: ({x, y}) => `Minimum point at ${x} comma ${y}.`,
    srSinusoidFlatPoint: ({x, y}) => `Line through point at ${x} comma ${y}.`,
    srSinusoidDescription: ({minValue, maxValue, cycleStart, cycleEnd}) =>
        `The graph shows a wave with a minimum value of ${minValue} and a maximum value of ${maxValue}. The wave completes a full cycle from ${cycleStart} to ${cycleEnd}.`,
    srSinusoidInteractiveElements: ({point1X, point1Y, point2X, point2Y}) =>
        `Sinusoid graph with midline intersection point at ${point1X} comma ${point1Y} and extremum point at ${point2X} comma ${point2Y}.`,
    imageExploreButton: "Explore image",
    imageAlternativeTitle: "Explore image and description",
    imageDescriptionLabel: "Description",
    imageZoomAriaLabel: "Zoom image.",
    imageResetZoomAriaLabel: "Reset zoom.",
    gifPlayAriaLabel: "Play animation.",
    gifPauseAriaLabel: "Pause animation.",
};

// This type helps us make sure all error codes are mapped to strings
type ErrorStringMap = {
    [K in keyof typeof ErrorCodes]: keyof PerseusStrings;
};

/**
 * Map an error string to a PerseusStrings key
 * that we can use to get the translated error message
 */
const errorToString: ErrorStringMap = {
    APPROXIMATED_PI_ERROR: "APPROXIMATED_PI_ERROR",
    CHOOSE_CORRECT_NUM_ERROR: "chooseCorrectNum",
    EMPTY_RESPONSE_ERROR: "EMPTY_RESPONSE_ERROR",
    EXTRA_SYMBOLS_ERROR: "EXTRA_SYMBOLS_ERROR",
    FILL_ALL_CELLS_ERROR: "fillAllCells",
    INVALID_CHOICE_SELECTION: "INVALID_CHOICE_SELECTION",
    INVALID_SELECTION_ERROR: "invalidSelection",
    MISSING_PERCENT_ERROR: "MISSING_PERCENT_ERROR",
    MULTIPLICATION_SIGN_ERROR: "MULTIPLICATION_SIGN_ERROR",
    NEEDS_TO_BE_SIMPLIFIED_ERROR: "NEEDS_TO_BE_SIMPLFIED_ERROR",
    NOT_NONE_ABOVE_ERROR: "notNoneOfTheAbove",
    USER_INPUT_EMPTY: "USER_INPUT_EMPTY",
    USER_INPUT_TOO_LONG: "USER_INPUT_TOO_LONG",
    WRONG_CASE_ERROR: "WRONG_CASE_ERROR",
    WRONG_LETTER_ERROR: "WRONG_LETTER_ERROR",
};

export function mapErrorToString(
    // the string representing an error code
    err: string | null | undefined,
    // the translated Perseus strings
    translatedStrings: PerseusStrings,
) {
    if (!err) {
        return err;
    }

    return translatedStrings[errorToString[err]] || err;
}
