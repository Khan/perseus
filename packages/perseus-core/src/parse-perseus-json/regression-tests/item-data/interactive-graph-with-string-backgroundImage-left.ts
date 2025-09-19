export default {
  "question": {
    "content": "Ally is excited to compete in a $6$-mile race. The race organizers plotted the course on a coordinate map. The starting point is at $(4,3)$, and the ending point is at $(4,9)$.  Ally's family decides to stand at $(4,6)$ on the map.\n\n**Plot the starting point, ending point, and place where Ally's family stands on the map.**\n\n[[☃ interactive-graph 1]]\n\n**How far along will Ally be in the race when she reaches her family?**  \n[[☃ radio 1]]",
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
            "url": "",
            "scale": "1",
            "bottom": "4",
            "left": "0",
            "width": 0,
            "height": 0
          },
          "markings": "graph",
          "labels": [
            "x",
            "y"
          ],
          "showProtractor": false,
          "showRuler": false,
          "showTooltips": false,
          "rulerLabel": "",
          "rulerTicks": 10,
          "range": [
            [
              -1,
              10
            ],
            [
              -1,
              10
            ]
          ],
          "gridStep": [
            1,
            1
          ],
          "snapStep": [
            0.5,
            0.5
          ],
          "graph": {
            "type": "point",
            "numPoints": 3
          },
          "correct": {
            "type": "point",
            "coords": [
              [
                4,
                3
              ],
              [
                4,
                6
              ],
              [
                4,
                9
              ]
            ],
            "numPoints": 3
          }
        },
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "radio 1": {
        "type": "radio",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "choices": [
            {
              "correct": false,
              "content": "Less than halfway through the race"
            },
            {
              "correct": true,
              "content": "Halfway through the race"
            },
            {
              "content": "More than halfway through the race"
            }
          ],
          "randomize": false,
          "multipleSelect": false,
          "countChoices": false,
          "displayCount": null,
          "hasNoneOfTheAbove": false,
          "deselectEnabled": false
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
