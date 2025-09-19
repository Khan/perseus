// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
  "question": {
    "content": "**Which of the following inequalities are correct?**\n\n[[☃ radio 2]]\n\n\n",
    "images": {},
    "widgets": {
      "radio 2": {
        "type": "radio",
        "graded": true,
        "options": {
          "choices": [
            {
              "content": " $\\,-1\\,\\,\\,<\\,-10$",
              "correct": false
            },
            {
              "correct": true,
              "content": " $-10\\,\\,\\,<\\,\\,\\,1$"
            },
            {
              "content": "  $\\,\\,\\,\\,\\,10\\,\\,\\,< \\,-1$",
              "correct": false
            }
          ],
          "randomize": true,
          "multipleSelect": true,
          "displayCount": null,
          "noneOfTheAbove": false,
          "onePerLine": true,
          "deselectEnabled": false
        },
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "number-line 1": {
        "type": "number-line",
        "graded": true,
        "options": {
          "range": [
            -1,
            1
          ],
          "labelStyle": "improper",
          "correctX": -0.375,
          "isTickCtrl": false,
          "labelRange": [
            "",
            ""
          ],
          "divisionRange": [
            1,
            10
          ],
          "labelTicks": true,
          "numDivisions": 8,
          "tickStep": null,
          "snapDivisions": 2,
          "correctRel": "eq",
          "initialX": null
        },
        "version": {
          "major": 0,
          "minor": 0
        }
      }
    }
  },
  "answerArea": {
    "type": "multiple",
    "options": {
      "content": "",
      "images": {},
      "widgets": {}
    },
    "calculator": false
  },
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "hints": [
    {
      "content": "Let's locate $\\blue{-10}$ ,  $\\pink{-1}$ , $\\green{1}$ , and $\\purple{10}$ on the number line.\n\n\n\n\n![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/4b88e4a5b0c1cdbbf946c65129b05712429aef5b)",
      "images": {
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/4b88e4a5b0c1cdbbf946c65129b05712429aef5b": {
          "width": 460,
          "height": 80
        }
      },
      "widgets": {}
    },
    {
      "content": "On the number line, numbers to the left are less than numbers to the right.",
      "images": {},
      "widgets": {}
    },
    {
      "content": "The following inequality is correct: \n\n*   $\\blue{-10}\\,\\,\\,<\\,\\,\\,\\green1$",
      "images": {
        "https://ka-perseus-graphie.s3.amazonaws.com/63a5858779841415a4ae8978975790b8f8eef811.png": {
          "width": 460,
          "height": 80
        }
      },
      "widgets": {}
    }
  ]
}
