import{aJ as y}from"./iframe-D5ZxZp1t.js";const f={component:y,title:"Widgets/Free Response",tags:["!dev"],parameters:{docs:{description:{component:"A widget that provides a text area for users to enter open-ended responses,                    supporting long-form answers and essay-type questions."}}}},e={args:{allowUnlimitedCharacters:!1,characterLimit:500,placeholder:"Enter your answer here",question:"What is the theme of the essay?"}},r={args:{allowUnlimitedCharacters:!1,characterLimit:500,placeholder:"Enter your answer here",question:"What is the theme of the essay?"}},a={args:{allowUnlimitedCharacters:!0,characterLimit:500,placeholder:"Enter your answer here",question:`What is the theme of the essay?

Put your answer in your own words.`}},t={name:"Question with TeX content",args:{allowUnlimitedCharacters:!0,characterLimit:500,placeholder:"Enter your answer here",question:"What changes are required to solve the following equation? $\\dfrac{6-3}{1-0}=\\dfrac{3}{1}=3$"}};var s,o,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    allowUnlimitedCharacters: false,
    characterLimit: 500,
    placeholder: "Enter your answer here",
    question: "What is the theme of the essay?"
  }
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var i,c,h;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    allowUnlimitedCharacters: false,
    characterLimit: 500,
    placeholder: "Enter your answer here",
    question: "What is the theme of the essay?"
  }
}`,...(h=(c=r.parameters)==null?void 0:c.docs)==null?void 0:h.source}}};var l,m,d;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    allowUnlimitedCharacters: true,
    characterLimit: 500,
    placeholder: "Enter your answer here",
    question: "What is the theme of the essay?\\n\\nPut your answer in your own words."
  }
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,p,w;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Question with TeX content",
  args: {
    allowUnlimitedCharacters: true,
    characterLimit: 500,
    placeholder: "Enter your answer here",
    question: "What changes are required to solve the following equation? $\\\\dfrac{6-3}{1-0}=\\\\dfrac{3}{1}=3$"
  }
}`,...(w=(p=t.parameters)==null?void 0:p.docs)==null?void 0:w.source}}};const q=["Primary","CharacterLimit","UnlimitedCharacters","QuestionWithTex"];export{r as CharacterLimit,e as Primary,t as QuestionWithTex,a as UnlimitedCharacters,q as __namedExportsOrder,f as default};
