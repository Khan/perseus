import{aJ as C}from"./iframe-Bs0680DQ.js";const L={component:C,title:"Widgets/Free Response",tags:["!dev"],parameters:{docs:{description:{component:"A widget that provides a text area for users to enter open-ended responses,                    supporting long-form answers and essay-type questions."}}}},e={args:{allowUnlimitedCharacters:!1,characterLimit:500,placeholder:"Enter your answer here",question:"What is the theme of the essay?"}},r={args:{allowUnlimitedCharacters:!1,characterLimit:500,placeholder:"Enter your answer here",question:"What is the theme of the essay?"}},a={args:{allowUnlimitedCharacters:!1,characterLimit:500,placeholder:"Enter your answer here",question:"**What is the theme of the essay?**"}},t={args:{allowUnlimitedCharacters:!0,characterLimit:500,placeholder:"Enter your answer here",question:`What is the theme of the essay?

**Put your answer in your own words.**`}},s={name:"Question with TeX content",args:{allowUnlimitedCharacters:!0,characterLimit:500,placeholder:"Enter your answer here",question:"What changes are required to solve the following equation? $\\dfrac{6-3}{1-0}=\\dfrac{3}{1}=3$"}};var o,n,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    allowUnlimitedCharacters: false,
    characterLimit: 500,
    placeholder: "Enter your answer here",
    question: "What is the theme of the essay?"
  }
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var c,h,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    allowUnlimitedCharacters: false,
    characterLimit: 500,
    placeholder: "Enter your answer here",
    question: "What is the theme of the essay?"
  }
}`,...(l=(h=r.parameters)==null?void 0:h.docs)==null?void 0:l.source}}};var m,d,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    allowUnlimitedCharacters: false,
    characterLimit: 500,
    placeholder: "Enter your answer here",
    question: "**What is the theme of the essay?**"
  }
}`,...(u=(d=a.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var p,w,y;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    allowUnlimitedCharacters: true,
    characterLimit: 500,
    placeholder: "Enter your answer here",
    question: "What is the theme of the essay?\\n\\n**Put your answer in your own words.**"
  }
}`,...(y=(w=t.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var f,g,q;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Question with TeX content",
  args: {
    allowUnlimitedCharacters: true,
    characterLimit: 500,
    placeholder: "Enter your answer here",
    question: "What changes are required to solve the following equation? $\\\\dfrac{6-3}{1-0}=\\\\dfrac{3}{1}=3$"
  }
}`,...(q=(g=s.parameters)==null?void 0:g.docs)==null?void 0:q.source}}};const U=["Primary","CharacterLimit","BoldedQuestion","UnlimitedCharacters","QuestionWithTex"];export{a as BoldedQuestion,r as CharacterLimit,e as Primary,s as QuestionWithTex,t as UnlimitedCharacters,U as __namedExportsOrder,L as default};
