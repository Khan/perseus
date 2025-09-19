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
      "content": "Barn | Antal mål\n- | :-: \nCalista | $\\blue2$ \nWilliam |$\\red3$ \nMichaela | $\\green5$ \nJames | $\\gray2$\n\n$$\n\n$\\green5 - \\red3= \\purple{2}$",
      "images": {},
      "widgets": {}
    },
    {
      "content": "Michaela gjorde $\\purple{2}$ korgar mer än William.  ",
      "images": {},
      "widgets": {}
    }
  ],
  "itemDataVersion": {
    "major": 0,
    "minor": 1
  },
  "question": {
    "content": "En familj spelar basket.  Pictogrammet visar hur många mål varje barn gjorde.  \n\n**Michaela gjorde [[☃ input-number 1]] fler mål än William.**\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/01794c4768ba6b824954277b869aaaefd551a0e5.png)\n\n\n![](https://ka-perseus-images.s3.amazonaws.com/2875f6cdd7dea3db2fef714b1225366c7250c49d.png)",
    "images": {
      "https://ka-perseus-graphie.s3.amazonaws.com/01794c4768ba6b824954277b869aaaefd551a0e5.png": {
        "height": 37,
        "width": 120
      },
      "https://ka-perseus-images.s3.amazonaws.com/2875f6cdd7dea3db2fef714b1225366c7250c49d.png": {
        "height": 336,
        "width": 474
      }
    },
    "widgets": {
      "input-number 1": {
        "graded": true,
        "options": {
          "answerType": "number",
          "inexact": false,
          "maxError": 0.1,
          "simplify": "required",
          "size": "normal",
          "value": 2
        },
        "type": "input-number",
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "plotter 1": {
        "options": {
          "categories": [
            "Calista",
            "WIlliam",
            "Michaela",
            "James"
          ],
          "correct": [
            1,
            1,
            1,
            1
          ],
          "labels": [
            "Child",
            "Baskets"
          ],
          "maxY": 5,
          "picUrl": "http://i.imgur.com/B8mGnxB.png",
          "starting": [
            1,
            1,
            1,
            1
          ],
          "type": "pic"
        },
        "type": "plotter"
      }
    }
  }
}
