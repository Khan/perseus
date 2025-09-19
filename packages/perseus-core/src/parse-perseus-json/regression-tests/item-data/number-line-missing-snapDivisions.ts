export default {
  "answerArea": {
    "calculator": false,
    "chi2Table": false,
    "periodicTable": false,
    "tTable": false,
    "zTable": false
  },
  "hints": [
    {
      "content": "Janey wants to earn enough money to buy a CD for $\\$13.50$.\n\nCan Janey buy the CD if she has. . . | Response\n-|-\nLess than $\\$13.50$? | No\nExactly $\\$13.50$? | **Yes**\nMore than $\\$13.50$? | **Yes**\nConclusion| Total dollars $\\maroonD{\\geq} 13.50$\n\nIf Janie does $c$ chores, she will earn $\\greenD{1.2}c$ dollars for doing chores, plus $\\blueD{3}$ dollars she already has.  The amount she has is :\n\n$\\blueD{3}+\\greenD{1.2}c$\n\nThis amount must be *greater than or equal to* $\\purpleC{13.50}$, so the inequality is:\n\n$\\blueD{3}+\\greenD{1.2c}\\maroonD{\\geq}\\purpleC{13.50}$",
      "images": {},
      "replace": false,
      "widgets": {}
    },
    {
      "content": "To solve the inequality, let's start by subtracting $\\blueD{3}$ from both sides of the inequality:\n\n$\\begin{align}\n3+1.2c &≥ 13.5\\\\\\\\\n3+1.2c -\\blueD{3} &≥ 13.5- \\blueD{ 3}\\\\\\\\\n1.2c &≥ 10.5\n\\\\\\\\\n\\dfrac{1.2c}{\\greenD{1.2}} &≥ \\dfrac{10.5}{\\greenD{1.2}}\\\\\n\\\\\nc &≥ 8.75\n\\end{align}$\n\nJanie must do $8.75$ or more chores to have enough money to purchase the CD.",
      "images": {},
      "replace": false,
      "widgets": {}
    },
    {
      "content": "To graph the inequality $c\\geq 8.75$, we first draw a circle at $8.75$.  This circle divides the number line into two sections: one that contains solutions to the inequality and one that does not.  \n\nThe solution  includes the point $c=8.75$, so we *fill in* the circle at $8.75$.\n\nBecause the solution to the inequality says that $c\\geq 8.75$, this means that solutions are numbers to the *right* of $8.75$.",
      "images": {},
      "replace": false,
      "widgets": {}
    },
    {
      "content": "The inequality is:\n\n$3+1.2c\\geq 13.50$\n\nThe graph of the solution of the inequality, $c ≥ 8.75$, looks like this:\n\n[[☃ number-line 3]]",
      "images": {
        "https://ka-perseus-graphie.s3.amazonaws.com/1f33350b0a703e439e6f9923dab48413e9b12710.png": {
          "height": 80,
          "width": 460
        }
      },
      "replace": false,
      "widgets": {
        "number-line 3": {
          "alignment": "default",
          "graded": true,
          "options": {
            "correctRel": "ge",
            "correctX": 8.75,
            "divisionRange": [
              1,
              12
            ],
            "initialX": 7.5,
            "isInequality": true,
            "isTickCtrl": false,
            "labelRange": [
              null,
              null
            ],
            "labelStyle": "decimal",
            "labelTicks": true,
            "numDivisions": null,
            "range": [
              5,
              10
            ],
            "showTooltips": false,
            "snapDivisions": null,
            "static": false,
            "tickStep": 0.5
          },
          "static": true,
          "type": "number-line",
          "version": {
            "major": 0,
            "minor": 0
          }
        }
      }
    }
  ],
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "question": {
    "content": "Janie has $\\$3$.  She earns $\\$1.20$ for each chore she does and can do fractions of chores.  She wants to earn enough money to buy a CD for $\\$13.50$.\n\n**Write an inequality to determine the number of chores, $c$, Janie could do to have enough money to buy the CD.**\n\n[[☃ expression 1]]\n\n**Graph the solution set to this inequality.**\n\n[[☃ number-line 1]]",
    "images": {
      "https://ka-perseus-graphie.s3.amazonaws.com/1f33350b0a703e439e6f9923dab48413e9b12710.png": {
        "height": 80,
        "width": 460
      },
      "https://ka-perseus-graphie.s3.amazonaws.com/49de5812223589549db52f64ee864673ec1941f8.png": {
        "height": 80,
        "width": 460
      },
      "https://ka-perseus-graphie.s3.amazonaws.com/889400758083e0abba1d64433788cf92cf67f6ad.png": {
        "height": 80,
        "width": 460
      },
      "https://ka-perseus-graphie.s3.amazonaws.com/bf50e3ef3e86d65899d785dd675b4c01b9b512ae.png": {
        "height": 80,
        "width": 460
      }
    },
    "widgets": {
      "expression 1": {
        "alignment": "default",
        "graded": true,
        "options": {
          "answerForms": [
            {
              "considered": "correct",
              "form": false,
              "simplify": false,
              "value": "1.2c+3\\ge13.5"
            }
          ],
          "buttonSets": [
            "basic",
            "basic relations",
            "advanced relations"
          ],
          "functions": [
            "f",
            "g",
            "h"
          ],
          "times": false
        },
        "static": false,
        "type": "expression",
        "version": {
          "major": 1,
          "minor": 0
        }
      },
      "number-line 1": {
        "alignment": "default",
        "graded": true,
        "options": {
          "correctRel": "ge",
          "correctX": 8.75,
          "divisionRange": [
            1,
            12
          ],
          "initialX": 7.5,
          "isInequality": true,
          "isTickCtrl": false,
          "labelRange": [
            null,
            null
          ],
          "labelStyle": "decimal",
          "labelTicks": true,
          "numDivisions": null,
          "range": [
            5,
            10
          ],
          "showTooltips": false,
          "snapDivisions": null,
          "static": false,
          "tickStep": 0.5
        },
        "static": false,
        "type": "number-line",
        "version": {
          "major": 0,
          "minor": 0
        }
      }
    }
  }
}
