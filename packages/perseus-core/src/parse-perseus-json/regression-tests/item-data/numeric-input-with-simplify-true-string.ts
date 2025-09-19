export default {
  "question": {
    "content": "Michael is $12$ years older than Brandon. Seventeen years ago, Michael was $4$ times as old as Brandon. \n\n **How old is Michael now?**\n\n[[☃ numeric-input 1]]",
    "images": {},
    "widgets": {
      "numeric-input 1": {
        "type": "numeric-input",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "static": false,
          "answers": [
            {
              "maxError": 0,
              "status": "correct",
              "strict": false,
              "value": 33,
              "simplify": "true",
              "message": ""
            }
          ],
          "size": "normal",
          "coefficient": false,
          "labelText": ""
        },
        "version": {
          "major": 0,
          "minor": 0
        }
      }
    }
  },
  "answerArea": {
    "zTable": false,
    "calculator": false,
    "chi2Table": false,
    "financialCalculatorMonthlyPayment": false,
    "financialCalculatorTotalAmount": false,
    "financialCalculatorTimeToPayOff": false,
    "periodicTable": false,
    "periodicTableWithKey": false,
    "tTable": false
  },
  "hints": [
    {
      "replace": false,
      "content": "We can use the given information to write down two equations that describe the ages of Michael and Brandon.",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "Let Michael's current age be $m$ and Brandon's current age be $b$.",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "The information in the first sentence can be expressed in the following equation:\n\n $\\blue{m = b + 12}$\n",
      "images": {
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/ca9d3feac6a8385bbb89193669b96559b861d979": {
          "width": 400,
          "height": 342
        }
      },
      "widgets": {}
    },
    {
      "replace": false,
      "content": "Seventeen years ago, Michael was $m - 17$ years old, and Brandon was $b - 17$ years old.",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "The information in the second sentence can be expressed in the following equation:\n\n $\\red{m - 17 = 4(b - 17)}$\n",
      "images": {
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/36c5150b272beb2433a9c77b262bbc89c5a03f83": {
          "width": 400,
          "height": 342
        }
      },
      "widgets": {}
    },
    {
      "replace": false,
      "content": "Now we have two independent equations, and we can solve for our two unknowns.",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "Because we are looking for $m$, it might be easiest to solve our first equation for $b$ and substitute it into our second equation.",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "Solving our first equation for $b$, we get: $\\blue{b = m - 12}$. Substituting this into our second equation, we get the equation: \n\n  $\\red{m - 17 = 4(} \\blue{(m - 12)}\\red{ - 17)}$ \n\n which combines the information about $m$ from both of our original equations.",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "Simplifying the right side of this equation, we get: $m - 17 = 4m - 116$.",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "Solving for $m$, we get: $3 m = 99$.",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "$m = 33$.",
      "images": {},
      "widgets": {}
    }
  ]
}
