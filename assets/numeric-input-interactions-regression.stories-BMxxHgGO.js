import{aB as i,j as a,t as T,A as b}from"./iframe-4salNE05.js";import{S as f}from"./server-item-renderer-Dy4WjDAc.js";import{n as r}from"./numeric-input-question-builder-6lxfIute.js";import"./hints-renderer-CCNA6GhL.js";const q={title:"Widgets/Numeric Input/Visual Regression Tests/Interactions",component:F,tags:["!autodocs"],parameters:{docs:{description:{component:"Regression tests for the numeric input widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page."}},chromatic:{disableSnapshot:!1}}},n={args:{item:i({question:r().withSize("normal").build()})},play:async({canvas:e})=>{e.getByRole("textbox").focus()}},s={args:{item:i({question:r().withSize("normal").withAnswer({answerForms:["integer"]}).build()})},play:async({canvas:e})=>{e.getByRole("textbox").focus()}},o={args:{item:i({question:r().withSize("normal").withAnswer({answerForms:["integer","decimal"]}).build()})},play:async({canvas:e})=>{e.getByRole("textbox").focus()}};function F(e){const{item:t,rtl:y}=e,x={padding:20};return a.jsx("div",{dir:y?"rtl":"ltr",style:x,children:a.jsx(f,{item:t,apiOptions:{...b.defaults},dependencies:T})})}var u,c,p;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: numericInputQuestionBuilder().withSize("normal").build()
    })
  },
  play: async ({
    canvas
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const inputToFocus = canvas.getByRole("textbox");
    inputToFocus.focus();
  }
}`,...(p=(c=n.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var l,m,d;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: numericInputQuestionBuilder().withSize("normal").withAnswer({
        answerForms: ["integer"]
      }).build()
    })
  },
  play: async ({
    canvas
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const inputToFocus = canvas.getByRole("textbox");
    inputToFocus.focus();
  }
}`,...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,h,w;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: numericInputQuestionBuilder().withSize("normal").withAnswer({
        answerForms: ["integer", "decimal"]
      }).build()
    })
  },
  play: async ({
    canvas
  }) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const inputToFocus = canvas.getByRole("textbox");
    inputToFocus.focus();
  }
}`,...(w=(h=o.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};const v=["Focus","With1Tooltip","WithMultipleTooltips"];export{n as Focus,s as With1Tooltip,o as WithMultipleTooltips,v as __namedExportsOrder,q as default};
