// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
  "answerArea": {
    "calculator": false,
    "options": {
      "content": "",
      "images": {},
      "widgets": {}
    },
    "periodicTable": false,
    "type": "multiple"
  },
  "hints": [
    {
      "content": "What times $a$ gives us $b$?",
      "images": {},
      "widgets": {}
    },
    {
      "content": "If we multiply each $a$-value by $\\blue{0.25}$, we get each corresponding $b$-value:\n\n> $b=\\blue{0.25}a$",
      "images": {},
      "widgets": {}
    },
    {
      "content": "The *constant of proportionality* $(r)$ in the equation $b=ra$ is $\\blue{0.25}$.",
      "images": {},
      "widgets": {
        "explanation 1": {
          "graded": true,
          "options": {
            "explanation": "Let's check the values of $a$ and $b$ given in the table above.",
            "hidePrompt": "Okay, I'm convinced.",
            "showPrompt": "Skeptical? Look at some examples."
          },
          "type": "explanation",
          "version": {
            "major": 0,
            "minor": 0
          }
        }
      }
    }
  ],
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "question": {
    "content": "The quantities $a$ and $b$ are proportional.\n\n$a$ | $b$ | \n:-: | :-: |\n$8$ | $2$ \n$16$ | $4$\n$32$ | $8$\n\n**Find the *constant of proportionality* $(r)$ in the equation $b=ra$.**\n\n$r =  $ [[☃ numeric-input 1]] ",
    "images": {},
    "widgets": {
      "numeric-input 1": {
        "graded": true,
        "options": {
          "answers": [
            {
              "maxError": null,
              "message": "",
              "simplify": "required",
              "status": "correct",
              "strict": false,
              "value": 0.25
            }
          ],
          "coefficient": false,
          "labelText": "",
          "size": "normal"
        },
        "type": "numeric-input",
        "version": {
          "major": 0,
          "minor": 0
        }
      }
    }
  }
}
