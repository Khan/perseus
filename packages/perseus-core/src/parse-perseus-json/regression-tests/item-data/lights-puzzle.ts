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
  "question": {
    "content": "**Light up all the squares by clicking on them.** When you click on a square, it will turn on (if it's off), or off (if it's on), as will each of the squares next to it.\n\n[[☃ lights-puzzle 1]]",
    "images": {},
    "widgets": {
      "lights-puzzle 1": {
        "graded": true,
        "options": {
          "gradeIncompleteAsWrong": false,
          "startCells": [
            [
              true,
              false,
              true
            ],
            [
              false,
              true,
              false
            ],
            [
              true,
              false,
              true
            ]
          ]
        },
        "type": "lights-puzzle"
      }
    }
  }
}
