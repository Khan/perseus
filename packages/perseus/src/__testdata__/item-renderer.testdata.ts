import type {
    InputNumberWidget,
    LabelImageWidget,
    PerseusItem,
    PerseusRenderer,
} from "../perseus-types";

export const codeblockItem: PerseusItem = {
    question: {
        content:
            'Charlotte is writing code to turn sentences into Pig Latin.\n\nThis is what she has so far:\n\n```\nsentence ← ""\nword1 ←  "Hello"\nfirstLetter1 ← SUBSTRING(word1, 1, 1)\notherLetters1 ← SUBSTRING(word1, 2, LENGTH(word1) - 1)\npigLatin1 ← CONCAT(otherLetters1, firstLetter1, "ay")\nsentence ← CONCAT(sentence, pigLatin1, " ")\nword2 ←  "Mister"\nfirstLetter2 ← SUBSTRING(word2, 1, 1)\notherLetters2 ← SUBSTRING(word2, 2, LENGTH(word2) - 1)\npigLatin2 ← CONCAT(otherLetters2, firstLetter2, "ay")\nsentence ← CONCAT(sentence, pigLatin2, " ")\nword3 ←  "Rogers"\nfirstLetter3 ← SUBSTRING(word3, 1, 1)\notherLetters3 ← SUBSTRING(word3, 2, LENGTH(word3) - 1)\npigLatin3 ← CONCAT(otherLetters3, firstLetter3, "ay")\nsentence ← CONCAT(sentence, pigLatin3, " ")\nDISPLAY(sentence)\n```\n\nThe code relies on two string procedures:\n\nName | Description\n- | - | -\n`CONCATENATE (string1, string2, ...)` | Returns a single string that combines the provided strings together in order.\n`SUBSTRING (string, startPos, numChars)` | Returns a substring of `string` starting at `startPos` of length `numChars`. The first character in the string is at position 1.\n\nA friend points out that she can reduce the complexity of her code by using the abstractions of lists and loops. \n\nCharlotte decides to "refactor" the code, to rewrite it so that it produces the same output but is structured better.\n\n**Which of these is the best refactor of the code?**\n\n[[☃ radio 1]]\n\n🤔[[☃ explanation 1]]',
        images: {},
        widgets: {
            "radio 1": {
                type: "radio",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    choices: [
                        {
                            content:
                                '```\nwords ← ["Hello", "Mister", "Rogers"]\nsentence ← ""\nFOR EACH word IN words\n{\n    firstLetter ← SUBSTRING(word, 1, 1)\n    otherLetters ← SUBSTRING(word, 2, LENGTH(word) - 1)\n    pigLatin ← CONCAT(otherLetters, firstLetter, "ay")\n    sentence ← CONCAT(sentence, pigLatin, " ")\n}\nDISPLAY(sentence)\n```',
                            correct: true,
                        },
                        {
                            content:
                                '```\nwords ← ["Hello", "Mister", "Rogers"]\nsentence ← ""\nFOR EACH word IN words\n{\n    firstLetter ← SUBSTRING(words[1], 1, 1)\n    otherLetters ← SUBSTRING(words[1], 2, LENGTH(words[1]) - 1)\n    pigLatin ← CONCAT(otherLetters, firstLetter, "ay")\n    sentence ← CONCAT(sentence, pigLatin, " ")\n}\nDISPLAY(sentence)\n```',
                            correct: false,
                        },
                        {
                            isNoneOfTheAbove: false,
                            content:
                                '```\nwords ← ["Hello", "Mister", "Rogers"]\nFOR EACH word IN words\n{\n    sentence ← ""\n    firstLetter ← SUBSTRING(word, 1, 1)\n    otherLetters ← SUBSTRING(word, 2, LENGTH(word) - 1)\n    pigLatin ← CONCAT(otherLetters, firstLetter, "ay")\n    sentence ← CONCAT(sentence, pigLatin, " ")\n}\nDISPLAY(sentence)\n```',
                            correct: false,
                        },
                        {
                            isNoneOfTheAbove: false,
                            content:
                                '```\nwords ← ["Hello", "Mister", "Rogers"]\nsentence ← ""\nFOR EACH word IN words\n{\n    firstLetter ← SUBSTRING(word, 1, 1)\n    otherLetters ← SUBSTRING(word, 2, LENGTH(word) - 1)\n    pigLatin ← CONCAT(otherLetters, firstLetter, "ay")\n    sentence ← CONCAT(sentence, pigLatin, " ")\n    DISPLAY(sentence)\n}\n```',
                            correct: false,
                        },
                        {
                            isNoneOfTheAbove: false,
                            content:
                                '```\nwords ← ["Hello", "Mister", "Rogers"]\nFOR EACH word IN words\n{\n    sentence ← ""\n    firstLetter ← SUBSTRING(word, 1, 1)\n    otherLetters ← SUBSTRING(word, 2, LENGTH(word) - 1)\n    pigLatin ← CONCAT(otherLetters, firstLetter, "ay")\n    sentence ← CONCAT(sentence, pigLatin, " ")\n    DISPLAY(sentence)\n}\n```',
                        },
                    ],
                    randomize: true,
                    multipleSelect: false,
                    countChoices: false,
                    displayCount: null,
                    hasNoneOfTheAbove: false,
                    deselectEnabled: false,
                },
                version: {
                    major: 1,
                    minor: 0,
                },
            },
            "explanation 1": {
                type: "explanation",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    showPrompt: "What language is the code in?",
                    hidePrompt: "Hide explanation",
                    explanation:
                        "This code is written in **pseudocode**. You can't actually run pseudocode, but we use it for planning programs and for thinking about code independently of specific programming language. \n\nAP CSP exam questions use pseudocode, so it's helpful to become familiar with it.\n\nHere is a reference for the pseudocode used here:\n\n****\n\n`a ← expression`\n\nEvaluates `expression` and assigns the result to the variable `a`.\n\n****\n\n`list ← [value1, value2, value3]`\n\nCreates a list with 3 values. The first value is located at index 1, the second at index 2, the third at index 3.\n\n****\n\n```\nFOR EACH value IN list\n{\n   <instructions>\n}\n```\n\nAssigns `value` to the value of each element in `list` sequentially, starting from the first element and ending with the last element. Executes the code in `instructions` once for each `value`.\n",
                    widgets: {},
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [
        {
            replace: false,
            content:
                'The first step in refactoring this code is to recognize the related variables that can be combined into a list.\n\nIn this case, that\'s `word1`, `word2`, and `word3` from the original code. We can tell they\'re related from the naming, but more importantly, from the way the same code is repeated for each of them.\n\nWe\'ll store the values of those 3 variables in a single list:\n\n```words ← ["Hello", "Mister", "Rogers"]```',
            images: {},
            widgets: {},
        },
        {
            replace: false,
            content:
                "The next step in refactoring this code is to identify the code that is only executed once versus the code that is executed for each element in that list.",
            images: {},
            widgets: {},
        },
        {
            replace: false,
            content:
                'We can see that there are 3 blocks of code that deal with each of the original variables.\n\nCode for `word1`:\n\n```\nword1 ←  "Hello"\nfirstLetter1 ← SUBSTRING(word1, 1, 1)\notherLetters1 ← SUBSTRING(word1, 2, LENGTH(word1) - 1)\npigLatin1 ← CONCAT(otherLetters1, firstLetter1, "ay")\nsentence ← CONCAT(sentence, pigLatin1, " ")\n```\n\n\nCode for `word2`:\n\n```\nword2 ←  "Mister"\nfirstLetter2 ← SUBSTRING(word2, 1, 1)\notherLetters2 ← SUBSTRING(word2, 2, LENGTH(word2) - 1)\npigLatin2 ← CONCAT(otherLetters2, firstLetter2, "ay")\nsentence ← CONCAT(sentence, pigLatin2, " ")\n```\n\nCode for `word3`:\n\n```\nword3 ←  "Rogers"\nfirstLetter3 ← SUBSTRING(word3, 1, 1)\notherLetters3 ← SUBSTRING(word3, 2, LENGTH(word3) - 1)\npigLatin3 ← CONCAT(otherLetters3, firstLetter3, "ay")\nsentence ← CONCAT(sentence, pigLatin3, " ")\n```\n\nEach of these blocks of code do the same operations:\n\n1. store the word in a variable\n2. store a substring of the word, the first letter in it\n3. store another substring of the word, the rest of the letters\n4. store a new string that concatenates the two substrings and "ay"\n5. concatenate that string with the existing `sentence`',
            images: {},
            widgets: {},
        },
        {
            replace: false,
            content:
                'Now that we\'ve put the variables into a list, we can use a loop to execute those same operations on each element:\n\n```\nFOR EACH word in words\n{\n    firstLetter ← SUBSTRING(word, 1, 1)\n    otherLetters ← SUBSTRING(word, 2, LENGTH(word) - 1)\n    pigLatin ← CONCAT(otherLetters, firstLetter, "ay")\n    sentence ← CONCAT(sentence, pigLatin, " ")\n}\n```\n\nYou\'ll notice there are only four lines of code inside the loop, versus the five lines in the grouped blocks from before. That\'s because the `FOR EACH` header takes care of storing the current list element in `word`. The value of `word` will first be "Hello", then "Mister", then "Rogers", according to the order of the values in the list.\n',
            images: {},
            widgets: {},
        },
        {
            replace: false,
            content:
                'There are two lines of code that we haven\'t refactored yet.\n\nOne is the very first line of the original code:\n\n`sentence ← ""`\n\nIn the new code, this needs to happen _before_ the `FOR EACH` loop, since the value of `sentence` is manipulated inside the loop.',
            images: {},
            widgets: {},
        },
        {
            replace: false,
            content:
                "The remaining line is the very last line of the original code:\n\n```DISPLAY(sentence)```\n\nIn the new code, this needs to happen _after_ the `FOR EACH` loop, since it should display the value after all the concatenations happen.",
            images: {},
            widgets: {},
        },
        {
            replace: false,
            content:
                'Thus, this is the best refactor of the original code to use lists and loops:\n\n```\nwords ← ["Hello", "Mister", "Rogers"]\nsentence ← ""\nFOR EACH word IN words\n{\n    firstLetter ← SUBSTRING(word, 1, 1)\n    otherLetters ← SUBSTRING(word, 2, LENGTH(word) - 1)\n    pigLatin ← CONCAT(otherLetters, firstLetter, "ay")\n    sentence ← CONCAT(sentence, pigLatin, " ")\n}\nDISPLAY(sentence)\n```',
            images: {},
            widgets: {},
        },
    ],
    _multi: null,
    answer: null,
};

export const itemWithInput: PerseusItem = {
    question: {
        content:
            "Enter the number $$-42$$ in the box: [[\u2603 input-number 1]]",
        images: {},
        widgets: {
            "input-number 1": {
                type: "input-number",
                graded: true,
                options: {
                    answerType: "number",
                    value: "-42",
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                },
            } as InputNumberWidget,
        },
    },
    hints: [
        {content: "Hint #1", images: {}, widgets: {}},
        {content: "Hint #2", images: {}, widgets: {}},
        {content: "Hint #3", images: {}, widgets: {}},
    ],
    answerArea: null,
    _multi: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};

export const labelImageItem: PerseusItem = {
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
    },
    _multi: null,
    answer: null,
    hints: [],
    itemDataVersion: {major: 0, minor: 1},
    question: {
        content:
            "Catherine created a chart and a bar graph to show how many dogs of each breed the animal shelter placed into good homes last year. \n\nDog breed  | Number of dogs \n:- | :-: \nBulldog | $32$ \nGreyhound | $72$ \nMastiff | $56$ \nCollie | $40$ \n\n**Label each bar on the bar graph.**\n\n[[☃ label-image 1]]\n\n\n\n",
        images: {
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2f60b533892fe6cb9351f704ffdada8ae4bc655c":
                {height: 365, width: 503},
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/75f937c6ea133d655dd9f698a58182efd6cc85d4":
                {height: 293, width: 331},
        },
        widgets: {
            "label-image 1": {
                alignment: "default",
                graded: true,
                static: false,
                type: "label-image",
                version: {major: 0, minor: 0},
                options: {
                    choices: ["Bulldog", "Greyhound", "Mastiff", "Collie"],
                    hideChoicesFromInstructions: true,
                    imageAlt:
                        "A bar graph with four bar lines shows the horizontal axis labeled Dog breed and the vertical axis labeled Number of dogs. The vertical axis is labeled from the bottom of the axis to the top of the axis as follows: 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, and 80. The horizontal axis has, from left to right, four unlabeled bar lines as follows: the first unlabeled bar line extends to 56, the second unlabeled bar line extends to 72, the third unlabeled bar line extends to 40, and the fourth unlabeled bar line extends to 32.",
                    imageHeight: 293,
                    imageUrl:
                        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/64ace45942546183c3dc842cb0e9e4f64a312727",
                    imageWidth: 331,
                    markers: [
                        {
                            answers: ["Bulldog"],
                            label: "The fourth unlabeled bar line.",
                            x: 87.3,
                            y: 90.2,
                        },
                        {
                            answers: ["Collie"],
                            label: "The third unlabeled bar line.",
                            x: 67.7,
                            y: 90.5,
                        },
                        {
                            answers: ["Greyhound"],
                            label: "The second unlabeled bar line.",
                            x: 47.7,
                            y: 90.2,
                        },
                        {
                            answers: ["Mastiff"],
                            label: "The first unlabeled bar line.",
                            x: 27.8,
                            y: 90.5,
                        },
                    ],
                    multipleAnswers: false,
                    static: false,
                },
            } as LabelImageWidget,
        },
    },
};

// Note that if this item is used, you _must_ first register the MockWidget
export const mockedItem: PerseusItem = {
    // The mock widget type is not part of the PerseusWidget type union (and
    // we don't want to make it such to avoid polluting our production types
    // for test purposes) so we force TypeScript to accept it here.
    // @ts-expect-error - TS2352 - Conversion of type '{ content: string; images: {}; widgets: { "mock-widget 1": { graded: true; version: { major: number; minor: number; }; static: false; type: "mock-widget"; options: { static: false; smiling: boolean; }; alignment: string; }; "mock-widget 2": { ...; }; "mock-widget 3": { ...; }; "mock-widget 4": { ...; }; }; }' to type 'PerseusRenderer' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
    question: {
        content:
            "Mock widget ==> [[\u2603 mock-widget 1]] [[\u2603 mock-widget 2]] [[\u2603 mock-widget 3]] [[\u2603 mock-widget 4]]",
        images: {},
        widgets: {
            "mock-widget 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "mock-widget",
                options: {static: false, smiling: true},
                alignment: "default",
            },
            "mock-widget 2": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "mock-widget",
                options: {static: false, smiling: false},
                alignment: "default",
            },
            "mock-widget 3": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "mock-widget",
                options: {static: false, smiling: true},
                alignment: "default",
            },
            "mock-widget 4": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "mock-widget",
                options: {static: false, smiling: false},
                alignment: "default",
            },
        },
    } as PerseusRenderer,
    hints: [],
    answerArea: null,
    _multi: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};
