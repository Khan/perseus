---
"@khanacademy/perseus-editor": major
---

Replace deprecated `Changeable.ChangeableProps` / `ChangeHandler` with concrete typed `onChange` signatures on `Editor` and `ArticleEditor`. The deprecated change handler carried unused `callback` and `silent` parameters that no caller actually passed through; the new signatures are `onChange: (changes: Partial<PerseusRenderer>) => void` for `Editor` and `onChange: (changes: {json: PerseusArticle}) => void` for `ArticleEditor`.
