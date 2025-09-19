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
    "content": "When you run a trial the simulator below, it produces a sequence of four random digits. If at least one of these digits is a zero, the trial is counted as a success.\n\n**Run the simulation to estimate the probability of it generating a successful trial.**  (Your answer will be marked correct if it is within $0.05$ of the true probability.)\n\n [[☃ numeric-input 1]]\n\n[[☃ cs-program 1]]",
    "images": {
      "web+graphie://ka-perseus-graphie.s3.amazonaws.com/4559c8e0bd022d37bc3291ef5e600ae917046ab2": {
        "height": 240,
        "width": 300
      }
    },
    "widgets": {
      "cs-program 1": {
        "alignment": "block",
        "graded": true,
        "options": {
          "height": 400,
          "programID": "5900231381221376",
          "settings": [
            {
              "name": "",
              "value": ""
            }
          ],
          "showButtons": false,
          "showEditor": false,
          "width": 400
        },
        "type": "cs-program",
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "numeric-input 1": {
        "alignment": "default",
        "graded": true,
        "options": {
          "answers": [
            {
              "maxError": 0.05,
              "message": "",
              "simplify": "required",
              "status": "correct",
              "strict": false,
              "value": 0.3333
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
