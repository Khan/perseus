export default {
  "question": {
    "content": "Consider this matrix transformation:\n\n$\\left[\\begin{array}{c}\n0 & 2 & 1 & -3\n\\\\\\\\ \n-1 & 2 & -3 & 0\n\\\\\\\\\n2 & -2 & 0 &1\n\\\\\\\\\n1 & 1 & -1 & -1\n\\end{array}\\right]$\n\n**What is the image of $\\left[\\begin{array}{c}\n-5\n\\\\\\\\\n1\n\\\\\\\\\n3\n\\\\\\\\\n-2\n\\end{array}\\right]$ under this transformation?**\n\n[[☃ matrix 1]]",
    "images": {},
    "widgets": {
      "matrix 1": {
        "type": "matrix",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "static": false,
          "matrixBoardSize": [
            4,
            1
          ],
          "answers": [
            [
              "11"
            ],
            [
              -2
            ],
            [
              -14
            ],
            [
              -5
            ]
          ],
          "prefix": "",
          "suffix": "",
          "cursorPosition": [
            0,
            0
          ]
        },
        "version": {
          "major": 0,
          "minor": 0
        }
      }
    }
  },
  "answerArea": {
    "calculator": true,
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
      "content": "In general terms, suppose we have\n\n- an $n$-dimensional square matrix whose columns are $\\vec{v_1},\\vec{v_2},...,\\,\\vec{v_n}$ and\n- an $n$-dimensional vector $\\vec x=\\left[\\begin{array}{c}x_1\\\\\\\\x_2\\\\\\\\...\\\\\\\\x_n\\end{array}\\right]$,\n\nthen this is the image of the vector under the matrix transformations:\n\n$x_1\\cdot\\vec{v_1}+x_2\\cdot\\vec{v_2}+...+x_n\\cdot\\vec{v_n}$\n\n[[☃ explanation 1]]",
      "images": {},
      "widgets": {
        "explanation 1": {
          "type": "explanation",
          "alignment": "default",
          "static": false,
          "graded": true,
          "options": {
            "static": false,
            "showPrompt": "Why is this true?",
            "hidePrompt": "Got it, thanks!",
            "explanation": "We learned that for 2-dimensional matrices, the first column is the image of the unit vector $\\left[\\begin{array}{c}1\\\\\\\\0\\end{array}\\right]$ and the second column is the image of the unit vector $\\left[\\begin{array}{c}0\\\\\\\\1\\end{array}\\right]$.\n\nThis can be generalized to higher dimensions, only now we have $n$ unit vectors which are full of zeros except for their $i^{\\text{th}}$ entry. For example, these are the four unit vectors in 4D:\n\n$\\left[\\begin{array}{c}1\\\\\\\\0\\\\\\\\0\\\\\\\\0\\end{array}\\right]\n\\left[\\begin{array}{c}0\\\\\\\\1\\\\\\\\0\\\\\\\\0\\end{array}\\right]\n\\left[\\begin{array}{c}0\\\\\\\\0\\\\\\\\1\\\\\\\\0\\end{array}\\right]\n\\left[\\begin{array}{c}0\\\\\\\\0\\\\\\\\0\\\\\\\\1\\end{array}\\right]$\n\nEach column of a 4D matrix tells us where it maps each unit vector, and we can write the general 4D vector $\\left[\\begin{array}{c}x_1\\\\\\\\x_2\\\\\\\\x_3\\\\\\\\x_4\\end{array}\\right]$ as:\n\n$x_1\\cdot\\left[\\begin{array}{c}1\\\\\\\\0\\\\\\\\0\\\\\\\\0\\end{array}\\right]\n+x_2\\cdot\\left[\\begin{array}{c}0\\\\\\\\1\\\\\\\\0\\\\\\\\0\\end{array}\\right]\n+x_3\\cdot\\left[\\begin{array}{c}0\\\\\\\\0\\\\\\\\1\\\\\\\\0\\end{array}\\right]\n+x_4\\cdot\\left[\\begin{array}{c}0\\\\\\\\0\\\\\\\\0\\\\\\\\1\\end{array}\\right]$",
            "widgets": {}
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
      "content": "$\\begin{align}\n&\\phantom{=}\\left[\\begin{array}{c}\n\\tealE{0} & \\redE{2} & \\purpleE{1} & \\goldE{-3}\n\\\\\\\\ \n\\tealE{-1} & \\redE{2} & \\purpleE{-3} & \\goldE{0}\n\\\\\\\\\n\\tealE{2} & \\redE{-2} & \\purpleE{0} &\\goldE{1}\n\\\\\\\\\n\\tealE{1} & \\redE{1} & \\purpleE{-1} & \\goldE{-1}\n\\end{array}\\right]\n\\left(\\left[\\begin{array}{c}\n-5\n\\\\\\\\\n1\n\\\\\\\\\n3\n\\\\\\\\\n-2\n\\end{array}\\right]\\right)\n\\\\\\\\\n&=-5\\cdot \\left[\\begin{array}{c}\n\\tealE{0}\n\\\\\\\\ \n\\tealE{-1}\n\\\\\\\\\n\\tealE{2}\n\\\\\\\\\n\\tealE{1}\n\\end{array}\\right]+1\\cdot\\left[\\begin{array}{c}\n\\redE{2}\n\\\\\\\\ \n\\redE{2}\n\\\\\\\\\n\\redE{-2}\n\\\\\\\\\n\\redE{1}\n\\end{array}\\right]+3\\cdot \\left[\\begin{array}{c}\n\\purpleE{1}\n\\\\\\\\ \n\\purpleE{-3}\n\\\\\\\\\n\\purpleE{0}\n\\\\\\\\\n\\purpleE{-1}\n\\end{array}\\right]+(-2)\\cdot\\left[\\begin{array}{c}\n\\goldE{-3}\n\\\\\\\\ \n\\goldE{0}\n\\\\\\\\\n\\goldE{1}\n\\\\\\\\\n\\goldE{-1}\n\\end{array}\\right]\n\\\\\\\\\n&=\\left[\\begin{array}{c}\n0\n\\\\\\\\ \n5\n\\\\\\\\\n-10\n\\\\\\\\\n-5\n\\end{array}\\right]+\\left[\\begin{array}{c}\n2\n\\\\\\\\ \n2\n\\\\\\\\\n-2\n\\\\\\\\\n1\n\\end{array}\\right]+\\left[\\begin{array}{c}\n3\n\\\\\\\\ \n-9\n\\\\\\\\\n0\n\\\\\\\\\n-3\n\\end{array}\\right]+\\left[\\begin{array}{c}\n6\n\\\\\\\\ \n0\n\\\\\\\\\n-2\n\\\\\\\\\n2\n\\end{array}\\right]\n\\\\\\\\\n&=\\left[\\begin{array}{c}\n11\n\\\\\\\\\n-2\n\\\\\\\\\n-14\n\\\\\\\\\n-5\n\\end{array}\\right]\n\\end{align}$",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "This is the image we obtain when we perform the transformation $\\left[\\begin{array}{c}\n0 & 2 & 1 & -3\n\\\\\\\\ \n-1 & 2 & -3 & 0\n\\\\\\\\\n2 & -2 & 0 &1\n\\\\\\\\\n1 & 1 & -1 & -1\n\\end{array}\\right]$ on the pre-image $\\left[\\begin{array}{c}\n-5\n\\\\\\\\\n1\n\\\\\\\\\n3\n\\\\\\\\\n-2\n\\end{array}\\right]$:\n\n$\\left[\\begin{array}{c}\n11\n\\\\\\\\\n-2\n\\\\\\\\\n-14\n\\\\\\\\\n-5\n\\end{array}\\right]$",
      "images": {},
      "widgets": {}
    }
  ]
}
