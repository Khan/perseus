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
    "type": "multiple"
  },
  "hints": [],
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "question": {
    "content": "[[☃ sorter 1]]\n\n",
    "images": {},
    "widgets": {
      "simulator 1": {
        "graded": true,
        "options": {
          "numTrials": 100,
          "proportionLabel": "Underlying proportion",
          "proportionOrPercentage": "proportion",
          "xAxisLabel": "Proportion (%)",
          "yAxisLabel": "Number of times seen"
        },
        "type": "simulator",
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "sorter 1": {
        "graded": true,
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
      }
    }
  }
}
