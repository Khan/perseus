// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
  "question": {
    "content": "Move the line on the first graph so it is in the same position as the line on the second graph.\n\n[[☃ interactive-graph 1]]\n\n[[☃ interactive-graph 2]]",
    "images": {},
    "widgets": {
      "interactive-graph 1": {
        "type": "interactive-graph",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "step": [
            1,
            1
          ],
          "backgroundImage": {
            "url": null
          },
          "markings": "graph",
          "labels": [
            "x",
            "y"
          ],
          "showProtractor": false,
          "showTooltips": false,
          "range": [
            [
              -10,
              10
            ],
            [
              -10,
              10
            ]
          ],
          "graph": {
            "type": "linear"
          },
          "correct": {
            "type": "linear",
            "coords": [
              [
                -3,
                0
              ],
              [
                0,
                2
              ]
            ],
            "hasBeenInteractedWith": true,
            "range": [
              [
                -10,
                10
              ],
              [
                -10,
                10
              ]
            ],
            "snapStep": [
              0.5,
              0.5
            ]
          }
        },
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "interactive-graph 2": {
        "type": "interactive-graph",
        "alignment": "default",
        "static": true,
        "graded": true,
        "options": {
          "step": [
            1,
            1
          ],
          "backgroundImage": {
            "url": null
          },
          "markings": "graph",
          "labels": [
            "x",
            "y"
          ],
          "showProtractor": false,
          "showTooltips": false,
          "range": [
            [
              -10,
              10
            ],
            [
              -10,
              10
            ]
          ],
          "graph": {
            "type": "linear"
          },
          "correct": {
            "type": "linear",
            "coords": [
              [
                -3,
                0
              ],
              [
                0,
                2
              ]
            ],
            "hasBeenInteractedWith": true,
            "range": [
              [
                -10,
                10
              ],
              [
                -10,
                10
              ]
            ],
            "snapStep": [
              0.5,
              0.5
            ]
          }
        },
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
      "content": "This graph is set to be `static`, so you should not be able to move the line or select it with the keyboard.\n\n[[☃ interactive-graph 1]]\n\n",
      "images": {},
      "widgets": {
        "interactive-graph 1": {
          "type": "interactive-graph",
          "alignment": "default",
          "static": true,
          "graded": true,
          "options": {
            "step": [
              1,
              1
            ],
            "backgroundImage": {
              "url": null
            },
            "markings": "graph",
            "labels": [
              "x",
              "y"
            ],
            "showProtractor": false,
            "showTooltips": false,
            "range": [
              [
                -10,
                10
              ],
              [
                -10,
                10
              ]
            ],
            "graph": {
              "type": "linear"
            },
            "correct": {
              "type": "linear",
              "coords": null
            }
          },
          "version": {
            "major": 0,
            "minor": 0
          }
        }
      }
    }
  ]
}
