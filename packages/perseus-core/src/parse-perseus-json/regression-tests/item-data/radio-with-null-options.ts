export default {
  "question": {
    "content": "**Pick the expression that matches this description:**\\n\\nA polynomial of the $3^{\\text{th}}$ degree with a leading coefficient of $5$ and a constant term of $-2$\n\n[[☃ radio 1]]",
    "widgets": {
      "radio 1": {
        "type": "radio",
        "static": false,
        "graded": true,
        "alignment": "default",
        "id": null,
        "key": null,
        "version": {
          "major": 1,
          "minor": 0
        },
        "options": null
      }
    },
    "replace": null,
    "metadata": null,
    "images": {}
  },
  "answerArea": {
    "type": "",
    "static": false,
    "graded": false,
    "alignment": "",
    "id": null,
    "key": null,
    "version": null,
    "zTable": false,
    "chi2Table": false,
    "tTable": false,
    "calculator": false,
    "periodicTable": false,
    "periodicTableWithKey": false,
    "financialCalculatorMonthlyPayment": false,
    "financialCalculatorTotalAmount": false,
    "financialCalculatorTimeToPayOff": false,
    "options": null
  },
  "hints": [
    {
      "content": "The description gives us three clues.\\n\\n**Clue 1: \\\\\\\"polynomial of the $\\\\blueD{5}^\\\\text{th}$ degree\\\\\\\"**\\n\\nThe degree of a polynomial is the highest degree of its terms.\\n\\nSo our highest degree term looks like $kx^\\\\blueD{5}$, where $k$ is a constant coefficient.[[☃ explanation 1]]",
      "widgets": {
        "explanation 1": {
          "type": "explanation",
          "static": false,
          "graded": true,
          "alignment": "default",
          "id": null,
          "key": null,
          "version": {
            "major": 0,
            "minor": 0
          },
          "options": {
            "showPrompt": "Explain",
            "hidePrompt": "Hide explanation",
            "explanation": "Suppose we have the polynomial $4x + 2x^6 -7x^3 + 3$.\\n\\nLook for the exponent of the variable in each term.\\n\\n**Term** | $4x$ | $2x^6$ | $-7x^3$ | $3$\\n:- | :-: | :-: | :-: | :-:\\n**Degree** | $1$ | $6$ | $3$ | $0$\\n\\nThe term with the highest degree is $2x^\\\\maroonD{6}$, so the degree of the polynomial is $\\\\maroonD{6}$.",
            "widgets": {},
            "static": false
          }
        }
      },
      "replace": false,
      "metadata": null,
      "images": {}
    },
    {
      "content": "**Clue 2: \\\\\\\"leading coefficient of $\\\\goldD{7}$\\\\\\\"**\\n\\nA *leading coefficient* is the coefficient of the highest-degree term.\\n\\nSo our highest degree term looks like $\\\\goldD{7} x^\\\\blueD{5}$.",
      "widgets": {},
      "replace": false,
      "metadata": null,
      "images": {}
    },
    {
      "content": "**Clue 3: \\\\\\\"constant term of $\\\\greenD{6}$\\\\\\\"**\\n\\nA *constant term* is a term without a variable part.\\n\\nSo our expression must contain the terms $\\\\goldD{7} x^\\\\blueD{5}$ and $\\\\greenD{6}$.",
      "widgets": {},
      "replace": false,
      "metadata": null,
      "images": {}
    },
    {
      "content": "Only one expression matches all three clues in the description:\\n\\n$\\\\goldD{7}x^\\\\blueD{5}+2x^2+\\\\greenD{6}$",
      "widgets": {},
      "replace": false,
      "metadata": null,
      "images": {}
    }
  ]
}
