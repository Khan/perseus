// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
  "question": {
    "content": "The magnetic field of the Earth is $B_E$ at a location where the magnetic dip is $I=+45\\degree$.\n\n**Which of these best describes the vertical component of the magnetic field vector at this location?**  \n*Note: $\\uparrow$ and $\\downarrow$ indicate upward and downward direction respectively.*\n\n[[☃ radio 1]]",
    "images": {
      "https://ka-perseus-images.s3.amazonaws.com/88526ae51e43ccf8a96bbdb602d9397d073479e1.svg": {
        "width": 352,
        "height": 429
      }
    },
    "widgets": {
      "radio 1": {
        "type": "radio",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "choices": [
            {
              "content": "$B_E\\ \\cos{45\\degree} \\uparrow$",
              "correct": false
            },
            {
              "content": "$B_E\\ \\cos{45\\degree} \\downarrow$",
              "correct": false
            },
            {
              "isNoneOfTheAbove": false,
              "content": "$B_E\\ \\sin{45\\degree} \\downarrow$",
              "correct": true
            },
            {
              "isNoneOfTheAbove": false,
              "content": "$B_E\\ \\sin{45\\degree}\\uparrow$",
              "correct": false
            },
            {
              "isNoneOfTheAbove": false,
              "content": "$B_E\\ \\tan {45\\degree} \\uparrow$",
              "correct": false
            },
            {
              "isNoneOfTheAbove": false,
              "content": "$B_E\\ \\tan {45\\degree} \\downarrow$",
              "correct": false
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
  "hints": [
    {
      "replace": false,
      "content": "##Strategy\n\nLet's remember what magnetic dip means. It is the angle that the magnetic field makes with the horizontal at a place. So, we can start by drawing a vector arrow for the magnetic field $B_E$ and take component of this vector to find the vertical component.\n\n*Tip: The **dip** angle is **positive** when the magnetic field **dips**!*",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "##Solution\n\nHere, the dip angle is **positive**, so the magnetic field is **below** the horizontal as shown below.\n\n[[☃ image 1]]\n\nAs we can see the direction of the vertical component is downwards $(\\downarrow)$, now let's find the magnitude.",
      "images": {},
      "widgets": {
        "image 1": {
          "type": "image",
          "alignment": "block",
          "static": false,
          "graded": true,
          "options": {
            "static": false,
            "title": "",
            "range": [
              [
                0,
                10
              ],
              [
                0,
                10
              ]
            ],
            "box": [
              255,
              151
            ],
            "backgroundImage": {
              "url": "https://ka-perseus-images.s3.amazonaws.com/d36824c27f73d6263d9a1c548ead1fdac535243e.svg",
              "width": 255,
              "height": 151
            },
            "labels": [],
            "alt": "",
            "caption": ""
          },
          "version": {
            "major": 0,
            "minor": 0
          }
        }
      }
    },
    {
      "replace": false,
      "content": "Taking the vertical component of $B_E$,\n\n$\\begin{align} \n\\purpleD{B_V} &= B_E \\sin I \\\\\\\\\n&= B_E \\sin 45\\degree \n \\end{align}$\n\n[[☃ explanation 1]]",
      "images": {},
      "widgets": {
        "explanation 1": {
          "type": "explanation",
          "alignment": "default",
          "static": false,
          "graded": true,
          "options": {
            "static": false,
            "showPrompt": "How sin 45° and not cos 45°?",
            "hidePrompt": "Got it, thanks!",
            "explanation": "We can move $\\purpleD {B_V}$ to the right in the diagram to get the right angle triangle as shown below.\n\n[[☃ image 1]]\n\nNow, taking sine of the angle $I$,\n\n$\\begin{align} \n\\sin I &= \\dfrac{\\text{Perpendicular}}{\\text{Hypotenuse}} \\\\\\\\\n&= \\dfrac{\\purpleD{B_V}}{B_E}\\\\\\\\\n\\Rightarrow \\purpleD{B_V}&=B_E \\sin I \\end{align}$",
            "widgets": {
              "interactive-graph 1": {
                "options": {
                  "labels": [
                    "x",
                    "y"
                  ],
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
                  "step": [
                    1,
                    1
                  ],
                  "valid": true,
                  "backgroundImage": {
                    "url": null
                  },
                  "markings": "graph",
                  "showProtractor": false,
                  "showRuler": false,
                  "showTooltips": false,
                  "rulerLabel": "",
                  "rulerTicks": 10,
                  "correct": {
                    "type": "linear",
                    "coords": null
                  }
                },
                "type": "interactive-graph",
                "version": {
                  "major": 0,
                  "minor": 0
                }
              },
              "image 1": {
                "options": {
                  "static": false,
                  "title": "",
                  "range": [
                    [
                      0,
                      10
                    ],
                    [
                      0,
                      10
                    ]
                  ],
                  "box": [
                    255,
                    156
                  ],
                  "backgroundImage": {
                    "url": "https://ka-perseus-images.s3.amazonaws.com/d3b512adb0f11756344a3838f91aa35eda75439b.svg",
                    "width": 255,
                    "height": 156
                  },
                  "labels": [],
                  "alt": "",
                  "caption": ""
                },
                "type": "image",
                "version": {
                  "major": 0,
                  "minor": 0
                },
                "graded": true,
                "alignment": "block",
                "static": false
              }
            }
          },
          "version": {
            "major": 0,
            "minor": 0
          }
        }
      }
    },
    {
      "replace": false,
      "content": "The vertical component of the magnetic field vector is:\n\n$B_E\\ \\sin{45\\degree}\\downarrow$\n",
      "images": {},
      "widgets": {}
    }
  ]
}
