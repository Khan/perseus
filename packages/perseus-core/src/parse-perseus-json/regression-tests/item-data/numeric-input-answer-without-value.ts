export default {
  "question": {
    "content": "$\\bigg(\\dfrac{2}{3} \\bigg)^3 =$ [[☃ expression 1]]",
    "images": {},
    "widgets": {
      "numeric-input 1": {
        "type": "numeric-input",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "answers": [
            {
              "status": "correct",
              "message": "",
              "simplify": "required",
              "strict": false,
              "maxError": null,
              "answerForms": [
                "proper",
                "improper"
              ]
            }
          ],
          "size": "normal",
          "coefficient": false,
          "labelText": "",
          "rightAlign": false,
          "static": false,
          "multipleNumberInput": false
        },
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "expression 1": {
        "options": {
          "answerForms": [
            {
              "considered": "correct",
              "form": true,
              "key": 0,
              "simplify": true,
              "value": "\\frac{8}{27}",
              "times": false,
              "functions": [
                "f",
                "g",
                "h"
              ],
              "buttonSets": [
                "basic"
              ],
              "buttonsVisible": "focused",
              "linterContext": {
                "contentType": "",
                "highlightLint": false,
                "paths": [],
                "stack": []
              }
            }
          ],
          "times": false,
          "buttonSets": [
            "basic"
          ],
          "functions": [
            "f",
            "g",
            "h"
          ],
          "static": false
        },
        "type": "expression",
        "version": {
          "major": 1,
          "minor": 0
        },
        "graded": true,
        "alignment": "default",
        "static": false
      }
    }
  },
  "answerArea": {
    "calculator": false,
    "chi2Table": false,
    "financialCalculatorMonthlyPayment": false,
    "financialCalculatorTotalAmount": false,
    "financialCalculatorTimeToPayOff": false,
    "periodicTable": false,
    "periodicTableWithKey": false,
    "tTable": false,
    "zTable": false
  },
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "hints": [
    {
      "replace": false,
      "content": "$\\bigg(\\dfrac{2}{3} \\bigg)^3 =\\dfrac{2}{3}\\times \\dfrac{2}{3}\\times\\dfrac{2}{3}$\n\nLet's perform this multiplication to find the answer.",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "On multiplying, we see that\n\n$\\dfrac{2}{3}\\times \\dfrac{2}{3}\\times\\dfrac{2}{3}=\\boxed{\\dfrac{8}{27}}$.",
      "images": {},
      "widgets": {}
    }
  ]
}
