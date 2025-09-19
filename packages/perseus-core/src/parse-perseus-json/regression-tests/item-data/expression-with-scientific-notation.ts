export default {
  "question": {
    "content": "Incandescent light bulbs produce light by heating a metal filament until it glows. The most common filament is tungsten, a grayish metal with atomic number $74$. \n\n[[☃ image 1]]\n\nA certain tungsten filament has a mass of $0.0176\\text{ g}$. \n\n**How many tungsten atoms make up the filament?**  \n*Express your answer in scientific notation with two decimal places.*\n\n[[☃ explanation 2]]\n\n[[☃ expression 1]] atoms of tungsten",
    "images": {
      "https://cdn.kastatic.org/ka-content-images/d541931875bede1ddddb66e9f7622b093b7d8cc8.png": {
        "width": 350,
        "height": 233
      }
    },
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
            350,
            233
          ],
          "backgroundImage": {
            "url": "https://cdn.kastatic.org/ka-content-images/d541931875bede1ddddb66e9f7622b093b7d8cc8.png",
            "width": 350,
            "height": 233
          },
          "labels": [],
          "alt": "A photograph of several incandescent light bulbs",
          "caption": "*Incandescent light bulbs with tungsten filaments*"
        },
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "explanation 2": {
        "type": "explanation",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "static": false,
          "showPrompt": "Show Avogadro's number",
          "hidePrompt": "Hide Avogadro's number",
          "explanation": "Avogadro's number $= 6.022\\times 10^{23}$",
          "widgets": {}
        },
        "version": {
          "major": 0,
          "minor": 0
        }
      },
      "expression 1": {
        "type": "expression",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "answerForms": [
            {
              "value": "5.77\\times10^{19}",
              "form": true,
              "simplify": false,
              "considered": "correct",
              "key": 0
            },
            {
              "value": "5.76\\times10^{19}",
              "form": false,
              "simplify": false,
              "considered": "correct",
              "key": 1
            },
            {
              "value": "5.78\\times10^{19}",
              "form": false,
              "simplify": false,
              "considered": "correct",
              "key": 2
            }
          ],
          "buttonSets": [
            "basic",
            "prealgebra",
            "scientific"
          ],
          "functions": [
            "f",
            "g",
            "h"
          ],
          "times": true
        },
        "version": {
          "major": 1,
          "minor": 0
        }
      },
      "explanation 1": {
        "type": "explanation",
        "alignment": "default",
        "static": false,
        "graded": true,
        "options": {
          "static": false,
          "showPrompt": "Show Avogadro's number",
          "hidePrompt": "$6.022\\times 10^{23}$",
          "explanation": "explanation goes here\n\nmore explanation",
          "widgets": {}
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
    "financialCalculatorMonthlyPayment": false,
    "financialCalculatorTotalAmount": false,
    "financialCalculatorTimeToPayOff": false,
    "periodicTable": true,
    "periodicTableWithKey": true,
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
      "content": "To solve this problem, we need to identify the connection between what we’re given and what we want to find. We’re given the amount of tungsten in *grams*, and we’re asked to find how many *atoms* that represents.\n\nThere’s no single quantity that converts from grams to the number of atoms, so we must use multiple conversion factors. ",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "Let’s start with our known: $0.0176\\text{ g}$ of tungsten. We can’t convert that directly to the number of atoms, but we can change that to moles using the molar mass.\n\nThe molar mass of an element is the mass of one mole of atoms of that element. We can determine an element’s molar mass by looking at the periodic table. The molar mass of an element is the exact same number as its average atomic mass, but expressed in grams/mole.\n\nThe molar mass of tungsten is $183.84\\text{ g/mol}$.\n",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "Using this value, let’s convert grams of tungsten to moles of tungsten. We start with our known, and set up conversion factors so the units cancel:\n \n$0.0176\\bcancel{\\text{ g }\\ce{W}}\\times \\dfrac{1\\text{ mol }\\ce{W}}{183.84\\bcancel{\\text{ g }\\ce{W}}}$\n\nThis gives us our first “step” in the chain of conversion factors. Now we need to convert moles of tungsten to the number of atoms of tungsten.\n",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "We can make this conversion using Avogadro’s number, which tells us how many things are in one mole of that thing. Avogadro’s number is ${6.022\\times 10^{23}}.$ So one mole of tungsten contains ${6.022\\times 10^{23}}$ atoms of tungsten.\n\nUsing this value, let’s convert moles of tungsten to the number of atoms of tungsten. We add it to the chain as another conversion factor, making sure to arrange it so the units cancel:\n \n$0.0176\\bcancel{\\text{ g }\\ce{W}}\\times \\dfrac{1\\bcancel{\\text{ mol }\\ce{W}}}{183.84\\bcancel{\\text{ g }\\ce{W}}}\\times \\dfrac{6.022\\times 10^{23}\\text{ atoms }\\ce{W}}{1\\bcancel{\\text{ mol }\\ce{W}}}=5.7652\\times 10^{19}\\text{ atoms }\\ce{W}$\n\nRounding the answer correctly to three significant figures gives us $5.77\\times 10^{19}$ atoms.\n",
      "images": {},
      "widgets": {}
    },
    {
      "replace": false,
      "content": "There are $5.77\\times 10^{19}$ atoms of tungsten in the light bulb filament. ",
      "images": {},
      "widgets": {}
    }
  ]
}
