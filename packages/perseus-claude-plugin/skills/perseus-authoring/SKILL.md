---
name: perseus-authoring
description: Use when writing or editing Perseus items: `.perseus.json` files, widget references like `[[☃ radio 1]]`, or the fields `question`, `hints`, `widgets`, `content`.
---

# Writing Perseus items

One item per `.perseus.json` file. Write and edit items with your Read, Edit
and Write tools.

## Item shape

```json
{
    "question": {"content": "...", "images": {}, "widgets": {}},
    "hints": [{"content": "...", "images": {}, "widgets": {}}],
    "answerArea": {"calculator": false}
}
```

`question` and each hint are renderer blocks: Perseus Markdown in `content`,
plus the `widgets` and `images` it references.

## Content

- Math goes in TeX between `$` signs: `$\frac{1}{2}$`.
- Place a widget with `[[☃ <widget-id>]]` on its own line.

## Widgets

- IDs are `<widget-type> N`, numbered from 1 per type: `radio 1`, `radio 2`.
- Every key in `widgets` has exactly one `[[☃ <id>]]` in `content`, and every
  reference has a key. Each hint checks this on its own.
- Never invent widget fields. Look up a widget's options with the
  `perseus-widgets` skill, or copy them from an existing item.
- Every scored widget has a correct answer: no empty `answers`, no radio
  without a `correct: true` choice.

## Hints

- Each hint moves one step toward the answer, in order.
- Only the last hint gives the full answer and worked solution.

## Before finishing

Work out the correct answer yourself, then check that every widget's answer
field in the question and hints matches it.
