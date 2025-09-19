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
      "content": "Whenever  we subtract a number from itself, we get $0$.\n\nThis is true whether the number is positive, negative, or $0$.",
      "images": {},
      "widgets": {}
    },
    {
      "content": "$(x-x)=0$",
      "images": {},
      "widgets": {}
    }
  ],
  "question": {
    "content": "**Compare the two values using the number line below.**  \n\n$\\qquad(x-x)$ [[☃ dropdown 1]] $0$  \n\n![](https://ka-perseus-graphie.s3.amazonaws.com/50cd6aeb1b50fe0f12c2fb5697eea1b00a4bc7b6.png)",
    "images": {
      "https://ka-perseus-graphie.s3.amazonaws.com/50cd6aeb1b50fe0f12c2fb5697eea1b00a4bc7b6.png": {
        "height": 80,
        "width": 460
      }
    },
    "widgets": {
      "dropdown 1": {
        "graded": true,
        "options": {
          "choices": [
            {
              "content": ">",
              "correct": false
            },
            {
              "content": "<",
              "correct": false
            },
            {
              "content": "=",
              "correct": true
            }
          ]
        },
        "type": "dropdown"
      }
    }
  }
}
