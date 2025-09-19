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
  "hints": [],
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "question": {
    "content": "** Combine like terms to simplify the expression: **\n\n  ${\\dfrac{2}{5}k-\\dfrac35+\\dfrac{1}{10}k}$\n\n[[☃ expression 1]]",
    "images": {},
    "widgets": {
      "expression 1": {
        "alignment": "default",
        "graded": true,
        "options": {
          "answerForms": [
            {
              "considered": "correct",
              "form": true,
              "key": 0,
              "simplify": true
            }
          ],
          "buttonSets": [
            "basic"
          ],
          "functions": [
            "f",
            "g",
            "h"
          ],
          "times": false
        },
        "type": "expression",
        "version": {
          "major": 1,
          "minor": 0
        }
      }
    }
  }
}
