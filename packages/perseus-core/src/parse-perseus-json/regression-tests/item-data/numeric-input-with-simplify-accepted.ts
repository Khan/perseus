// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
  "answerArea": {
    "calculator": true,
    "chi2Table": false,
    "periodicTable": false,
    "tTable": false,
    "zTable": false
  },
  "hints": [
    {
      "content": "### The strategy\n\n- Model the situation as a right triangle.\n\n- Determine the appropriate trigonometric ratio in order to find the missing side.\n\n- Form an equation and solve for the missing side.\n\n- Calculate the final result and round.",
      "images": {},
      "replace": false,
      "widgets": {}
    },
    {
      "content": "### Modeling as a right triangle\n\nThis situation can be modeled by the following right triangle. The hypotenuse is $2.1\\text{ km}$ and the angle on the right is $37^\\circ$. We are asked to find the distance between the skydiving center and Stella's landing point, which is the base of the triangle.\n\n\n\n[[☃ image 1]]\n\n### Determining the appropriate trigonometric ratio\n\nWe are given the measure of an angle and the length of the $\\purpleC{\\text{hypotenuse}}$. We are asked to find the side $\\maroonC{\\text{adjacent}}$ to the given angle. The appropriate trigonometric ratio is therefore the $\\Large\\text{cosine}$.\n",
      "images": {},
      "replace": false,
      "widgets": {
        "image 1": {
          "alignment": "block",
          "graded": true,
          "options": {
            "alt": "A right triangle where the base is unknown. The angle on the right side of the base is thirty-seven degrees. The angle on the left side of the base is the right angle. The hypotenuse is two point one.",
            "backgroundImage": {
              "height": 252,
              "url": "web+graphie://cdn.kastatic.org/ka-perseus-graphie/5b2b177fc0ba3ba56c75d2e21329191582aeb5bc",
              "width": 300
            },
            "box": [
              300,
              252
            ],
            "caption": "",
            "labels": [],
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
            "static": false,
            "title": ""
          },
          "static": false,
          "type": "image",
          "version": {
            "major": 0,
            "minor": 0
          }
        }
      }
    },
    {
      "content": "### Forming an equation and solving\n\nDenoting the missing side by $x$, we obtain the equation $\\cos(37^\\circ)=\\dfrac{x}{2.1}$.\n\nSolving the equation, we get $x=2.1\\cdot\\cos(37^\\circ)$.\n\nEvaluating this result in the calculator and rounding to the nearest hundredth, we get $x=1.68\\text{ km}$.",
      "images": {},
      "replace": false,
      "widgets": {}
    },
    {
      "content": "### Summary\n\nStella landed $1.68$ kilometers from the skydiving center.",
      "images": {},
      "replace": false,
      "widgets": {}
    }
  ],
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "question": {
    "content": "Stella's friends got her a skydiving lesson for her birthday. Her helicopter took off from the skydiving center, ascending in an angle of $37^\\circ$, and traveled a distance of $2.1$ kilometers before she fell in a straight line perpendicular to the ground.\n \n**How far from the skydiving center did Stella land?** \n*Round your final answer to the nearest hundredth.*\n\n[[☃ numeric-input 1]] kilometers\n \n\n\n[[☃ image 1]]\n\n",
    "images": {},
    "widgets": {
      "image 1": {
        "alignment": "block",
        "graded": true,
        "options": {
          "alt": "A rectangle that represents the ground. A point is on the top of the rectangle. A helicopter is above the ground with a person parachuting beneath it. The distance from the helicopter to the point is two point one kilometers and is the hypotenuse. The inside angle from the point to the helicopter is thirty-seven degrees.",
          "backgroundImage": {
            "height": 270,
            "url": "https://cdn.kastatic.org/ka-perseus-graphie/532e339d4d95f9cf6423e66bdc70dd06f1143a97.png",
            "width": 300
          },
          "box": [
            300,
            270
          ],
          "caption": "",
          "labels": [],
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
          "static": false,
          "title": ""
        },
        "static": false,
        "type": "image",
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
              "maxError": 0.01,
              "message": "",
              "simplify": "required",
              "status": "correct",
              "strict": false,
              "value": 1.68
            },
            {
              "maxError": 0.2,
              "message": "You probably solved correctly but your answer is not precise enough. Try rounding only at the last step of your solution.",
              "simplify": "accepted",
              "status": "ungraded",
              "strict": false,
              "value": 1.68
            },
            {
              "maxError": 0.5,
              "message": "You probably used radians instead of degrees. Make sure your calculator is set to degrees.",
              "simplify": "accepted",
              "status": "ungraded",
              "strict": false,
              "value": 1.61
            },
            {
              "maxError": 0.1,
              "message": "This is the height of Stella's fall. We asked for the distance from her landing point to the skydiving center.",
              "simplify": "required",
              "status": "wrong",
              "strict": false,
              "value": 1.2
            }
          ],
          "coefficient": false,
          "labelText": "",
          "multipleNumberInput": false,
          "rightAlign": false,
          "size": "normal",
          "static": false
        },
        "static": false,
        "type": "numeric-input",
        "version": {
          "major": 0,
          "minor": 0
        }
      }
    }
  }
}
