// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
  "question": {
    "content": "**Classify the resource under its category**\n\n[[☃ categorizer 1]]\n",
    "images": {},
    "widgets": {
      "categorizer 1": {
        "type": "categorizer",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "items": [
            "Wind",
            "Oil",
            "Solar energy",
            "Coal"
          ],
          "categories": [
            "Renewable",
            "Non-renewable"
          ],
          "values": [
            0,
            1,
            0,
            1
          ],
          "randomizeItems": true,
          "static": false,
          "linterContext": {
            "contentType": "",
            "highlightLint": false,
            "paths": [],
            "stack": []
          }
        },
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "sorter 1": {
        "options": {
          "correct": [
            "$x$",
            "$y$",
            "$z$"
          ],
          "layout": "horizontal",
          "padding": true
        },
        "type": "sorter",
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "matcher 1": {
        "options": {
          "left": [
            "$x$",
            "$y$",
            "$z$"
          ],
          "right": [
            "$1$",
            "$2$",
            "$3$"
          ],
          "labels": [
            "test",
            "label"
          ],
          "orderMatters": false,
          "padding": true
        },
        "type": "matcher",
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "label-image 1": {
        "options": {
          "choices": [],
          "imageAlt": "",
          "imageUrl": "",
          "imageWidth": 0,
          "imageHeight": 0,
          "markers": [],
          "multipleAnswers": false,
          "hideChoicesFromInstructions": false
        },
        "type": "label-image",
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "dropdown 1": {
        "options": {
          "placeholder": "",
          "choices": [
            {
              "content": "",
              "correct": false
            }
          ]
        },
        "type": "dropdown",
        "version": {
          "major": 0,
          "minor": 0
        }
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
      "content": "Renewable sources of energy cannot be exhuasted even after using it continously\n\nNon-renewable source can be exhausted with continuous use",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "Wind and solar energy are renewable, while oil and coal are non-renewable fossil fuels.",
      "images": {},
      "widgets": {}
    }
  ]
}
