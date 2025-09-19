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
  "hints": [
    {
      "content": "Let's start by plotting $(0,3)$ and $(3,7)$ and connecting the points.\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/2ec9d27633dc52440d8e82fcf99c314f3fad19ff.png)",
      "images": {
        "https://ka-perseus-graphie.s3.amazonaws.com/2ec9d27633dc52440d8e82fcf99c314f3fad19ff.png": {
          "height": 425,
          "width": 425
        }
      },
      "widgets": {}
    },
    {
      "content": "We know two sides are parallel to the $x$-axis, so those two sides must extend $5$ units horizontally from the two vertices we just drew. Since the rhombus is in the first quadrant, we extend the lines to the *right*.\n\nPlotting the remaining vertices at $(8,7)$ and $(5,3)$ gives the rhombus sides of length $5$ units, two of which are parallel to the $x$-axis.  \n\n![](https://ka-perseus-graphie.s3.amazonaws.com/c0be5c686e6d43155376ac6f4c5037ffd44e16de.png)",
      "images": {
        "https://ka-perseus-graphie.s3.amazonaws.com/c0be5c686e6d43155376ac6f4c5037ffd44e16de.png": {
          "height": 425,
          "width": 425
        }
      },
      "widgets": {}
    },
    {
      "content": " \nWe end up with a rhombus that looks like this:  \n\n![](https://ka-perseus-graphie.s3.amazonaws.com/2d6395b8d7d4ad3b0772e0ac5420106ea7e114f2.png)",
      "images": {
        "https://ka-perseus-graphie.s3.amazonaws.com/2d6395b8d7d4ad3b0772e0ac5420106ea7e114f2.png": {
          "height": 425,
          "width": 425
        }
      },
      "widgets": {}
    }
  ],
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "question": {
    "content": "**Click on the graph to draw a rhombus with an acute angle at $(0, 3)$, another vertex at $(3,7)$, side length of $5$ units, and two sides parallel to the $x$-axis.**  \n\nDraw the rhombus in the first quadrant.\n\n\n\n[[☃ interactive-graph 1]]",
    "images": {},
    "widgets": {
      "interactive-graph 1": {
        "graded": true,
        "options": {
          "backgroundImage": {
            "bottom": 0,
            "left": 0,
            "scale": 1,
            "url": null
          },
          "correct": {
            "coords": [
              [
                3,
                7
              ],
              [
                0,
                3
              ],
              [
                5,
                3
              ],
              [
                8,
                7
              ]
            ],
            "match": "exact",
            "numSides": "unlimited",
            "showSides": true,
            "snapTo": "grid",
            "type": "polygon"
          },
          "graph": {
            "numSides": "unlimited",
            "showSides": true,
            "snapTo": "grid",
            "type": "polygon"
          },
          "gridStep": [
            1,
            1
          ],
          "labels": [
            "x",
            "y"
          ],
          "markings": "graph",
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
          "rulerLabel": "",
          "rulerTicks": 10,
          "showProtractor": false,
          "showRuler": false,
          "snapStep": [
            1,
            1
          ],
          "step": [
            1,
            1
          ]
        },
        "type": "interactive-graph",
        "version": {
          "major": 0,
          "minor": 0
        }
      }
    }
  }
}
