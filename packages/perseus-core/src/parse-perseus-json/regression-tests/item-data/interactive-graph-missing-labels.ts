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
      "content": "This graph shows what happens to point $R$ when you translate the figure by $\\langle\\red{3},\\purple{7}\\rangle.$  The point moves by $\\red{+3}$ horizontally and $\\purple{+7}$ vertically.\n\n$R$ $(1,-3)$ is transformed into $R'$ $(4,4)$.\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/0450d707e93ac22809e8e4063f74b98bf35d079e.png)",
      "widgets": {}
    },
    {
      "content": "We can transform the other vertices by adding $\\red{3}$ to the $x$-coordinate and adding $\\purple{7}$ to the $y$-coordinate.\n \n$G$ $(-3,-3)$ is transformed into $G'$ $(0,4)$.  \n$A$ $(1,0)$ is transformed into $A'$ $(4,7)$.  ",
      "widgets": {}
    },
    {
      "content": "The translated image looks like this:\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/dcbfde322f50640db9f40bf4b79824ad9014d8db.png)\n",
      "widgets": {}
    }
  ],
  "question": {
    "content": "**Arrange the vertices of the movable triangle to construct the image of $\\triangle GAR$ after a translation by $\\langle3,7\\rangle$.**\n\n[[☃ interactive-graph 1]]",
    "images": {},
    "widgets": {
      "interactive-graph 1": {
        "graded": true,
        "options": {
          "backgroundImage": {
            "bottom": 0,
            "height": 425,
            "left": 0,
            "scale": 1,
            "url": "https://ka-perseus-graphie.s3.amazonaws.com/31eb6c4f83e061ca7e28bb4382469cb4d682f7b4.png",
            "width": 425
          },
          "correct": {
            "coords": [
              [
                4,
                7
              ],
              [
                0,
                4
              ],
              [
                4,
                4
              ]
            ],
            "numSides": 3,
            "type": "polygon"
          },
          "graph": {
            "numSides": 3,
            "type": "polygon"
          },
          "markings": "none",
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
          "showProtractor": false,
          "step": [
            1,
            1
          ]
        },
        "type": "interactive-graph"
      }
    }
  }
}
