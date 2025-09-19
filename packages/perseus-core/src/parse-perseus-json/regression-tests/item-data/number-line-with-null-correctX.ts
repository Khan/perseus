// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
  "question": {
    "content": "**Evaluate** $-31-8+31$.\n\n [[☃ numeric-input 1]]",
    "images": {},
    "widgets": {
      "numeric-input 1": {
        "type": "numeric-input",
        "graded": true,
        "options": {
          "answers": [
            {
              "value": -8,
              "status": "correct",
              "message": "",
              "simplify": "required",
              "strict": false,
              "maxError": null
            }
          ],
          "size": "normal",
          "coefficient": false
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
            0,
            10
          ],
          "labelRange": [
            null,
            null
          ],
          "divisionRange": [
            1,
            12
          ],
          "labelStyle": "decimal",
          "labelTicks": true,
          "numDivisions": 5,
          "tickStep": null,
          "snapDivisions": 2,
          "correctRel": "eq",
          "correctX": null,
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
      "content": "$\\phantom{=}-31-8+31$\n\n\n$=(31-31) -8$",
      "images": {},
      "widgets": {}
    },
    {
      "content": "$ =0-8$",
      "images": {},
      "widgets": {}
    },
    {
      "content": "$=-8$",
      "images": {},
      "widgets": {}
    }
  ]
}
