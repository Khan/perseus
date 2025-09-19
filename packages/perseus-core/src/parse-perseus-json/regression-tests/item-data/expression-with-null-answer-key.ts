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
      "content": "First, since this triangle is equilateral, the triangles on the right and left are congruent, so we can label some other measures with variables:\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/6b0c27f7b0e3b583f30e8fbc0dfa4e685a3c583c.png)",
      "images": {
        "https://ka-perseus-graphie.s3.amazonaws.com/6b0c27f7b0e3b583f30e8fbc0dfa4e685a3c583c.png": {
          "height": 288,
          "width": 288
        }
      },
      "widgets": {}
    },
    {
      "content": "Since the bisected side is $6$ and it's being cut in half, we have: \n\n$2 \\purple{b} = 6$\n\n$\\purple{b} = 3$",
      "images": {},
      "widgets": {}
    },
    {
      "content": "Since the angles of a triangle add up to $\\pi$ radians, we can see that:\n\n$3\\pink{\\varphi} = \\pi$\n\n$\\pink{\\varphi} = \\dfrac{\\pi}{3}$",
      "images": {},
      "widgets": {}
    },
    {
      "content": "And since $\\pink{\\varphi} = 2\\blue{\\theta}$,\n\n$\\blue\\theta = \\dfrac{\\pi}{6}$",
      "images": {},
      "widgets": {}
    },
    {
      "content": "Finally, let's find $\\red{a}$. We can use the right triangle:\n\n$\\begin{align} \\red{a}^2+ \\purple{b}^2 &= 6^2 \\\\\n\\red{a}^2 + \\purple{\\left(3\\right)}^2 &= 36 \\\\\n\\red{a}^2 &=27 \\\\\n\\red{a} &= \\pm \\sqrt{27} \\\\\n&= 3\\sqrt{3}\n\\end{align}$\n\n($\\red{a}$ is positive because it's a length.)",
      "images": {},
      "widgets": {}
    },
    {
      "content": "The sine of an angle in a right triangle is the ratio of the opposite leg to the hypotenuse. In the left right triangle, the side opposite $\\theta$ is $3$ and the hypotenuse is $6$, so:\n\n$\\begin{align}\\sin (\\blue{\\theta})&=\\dfrac{3}{6}\\\\ &= \\frac{1}{2}\\end{align}$",
      "images": {},
      "widgets": {}
    },
    {
      "content": "To sum up:\n\n- $\\purple{b} = 3$\n\n\n- $\\red{a} = 3 \\sqrt 3$\n\n\n- $\\blue{\\theta} = \\dfrac{\\pi}{6}$\n\n\n- $\\sin (\\blue{\\theta}) =\\dfrac{1}{2}$\n",
      "images": {},
      "widgets": {}
    }
  ],
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "question": {
    "content": "The following drawing contains an equilateral triangle whose side is $6$ units.  \n$a$ is perpendicular to one of the sides of the triangle.\n\n**Find the values of the following expressions. Don't round. Angle measures should be given in *radians*.**\n\n$\\qquad\\purple{b} = $ [[☃ expression 2]]\n\n$\\qquad\\red{a} = $ [[☃ expression 1]]\n\n$\\qquad\\blue{\\theta} =$ [[☃ expression 3]]\n\n$\\qquad\\sin(\\blue{\\theta}) = $ [[☃ expression 4]]\n\n$\\qquad$![](https://ka-perseus-graphie.s3.amazonaws.com/bee05e004428ab4fb0d8af9c5ca0fe67bc991312.png)\n",
    "images": {
      "https://ka-perseus-graphie.s3.amazonaws.com/bee05e004428ab4fb0d8af9c5ca0fe67bc991312.png": {
        "height": 288,
        "width": 288
      }
    },
    "widgets": {
      "expression 1": {
        "graded": true,
        "options": {
          "answerForms": [
            {
              "considered": "correct",
              "form": false,
              "simplify": false,
              "value": "sqrt(3)*3"
            }
          ],
          "buttonSets": [
            "basic",
            "prealgebra"
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
      },
      "expression 2": {
        "graded": true,
        "options": {
          "answerForms": [
            {
              "considered": "correct",
              "value": "3"
            }
          ],
          "buttonSets": [
            "basic",
            "prealgebra"
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
      },
      "expression 3": {
        "graded": true,
        "options": {
          "answerForms": [
            {
              "considered": "correct",
              "form": false,
              "simplify": false,
              "value": "pi/6"
            }
          ],
          "buttonSets": [
            "basic",
            "prealgebra"
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
      },
      "expression 4": {
        "graded": true,
        "options": {
          "answerForms": [
            {
              "considered": "wrong",
              "form": true,
              "key": "1",
              "simplify": false,
              "value": "\\sin\\left(\\frac{\\pi}{6}\\right)"
            },
            {
              "considered": "correct",
              "form": false,
              "key": null,
              "simplify": false,
              "value": "1/2"
            }
          ],
          "buttonSets": [
            "basic",
            "prealgebra"
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
