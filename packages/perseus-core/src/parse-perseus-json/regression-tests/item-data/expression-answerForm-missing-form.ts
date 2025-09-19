// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
  "question": {
    "content": "Jake is younger than Sophie.  Sophie is $14$ years old.  \n\n**Write an inequality that compares Jake's age in years, $j$, to Sophie's age.**\n\n[[☃ expression 1]]",
    "images": {},
    "widgets": {
      "expression 1": {
        "type": "expression",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "answerForms": [
            {
              "value": "j<14",
              "considered": "correct",
              "key": 0
            }
          ],
          "buttonSets": [
            "basic",
            "basic relations",
            "advanced relations"
          ],
          "functions": [
            "f",
            "g"
          ],
          "times": false
        },
        "version": {
          "major": 1,
          "minor": 0
        }
      }
    }
  },
  "answerArea": {
    "calculator": false,
    "chi2Table": false,
    "periodicTable": false,
    "tTable": false,
    "zTable": false
  },
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "hints": []
}
