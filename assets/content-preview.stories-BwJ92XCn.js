import{j as e,V as g,s as v,n as w,o as j,r as W}from"./iframe-CiZ4rom4.js";import"./item-version-DIvEicZT.js";import"./article-renderer-DEKiL95x.js";import"./server-item-renderer-BPtEzFPN.js";import"./hints-renderer-DUBe4pQj.js";import{a as E}from"./article-renderer.testdata-BhE1T5ao.js";import{q}from"./radio.testdata-C1vj3X_t.js";import{D as y}from"./device-framer-KY4WP1IA.js";import{V as C}from"./viewport-resizer-BbCz18w_.js";import{C as x}from"./content-preview-DDM6UGkU.js";/* empty css                       */import"./constants-kyOY0S4e.js";import"./components-zJqkJmyj.js";import"./icon-paths-BU5otBoc.js";const P=r=>{const[s,f]=W.useState("phone");return e.jsxs(g,{children:[e.jsx(C,{deviceType:s,onViewportSizeChanged:f}),e.jsx(y,{nochrome:!1,deviceType:s,children:e.jsx(x,{...r})})]})},_={title:"PerseusEditor/Content Preview",component:x,decorators:[r=>e.jsx(g,{style:{margin:v.xxSmall_6},children:e.jsx(w,{strings:j,locale:"en",children:e.jsx(r,{})})})],render:r=>e.jsx(P,{...r})},t={args:{question:q}},n={args:{question:E}},o={args:{linterContext:{contentType:"exercise",highlightLint:!0,stack:[],paths:[]},question:{content:`# H1s bad

Here is some unclosed math: $1+1=3

We should use \`\\dfrac{}\` instead of \`\\frac{}\`: $\\frac{3}{5}$

What is the best color in the world?

[[☃ radio 1]]`,widgets:{"radio 1":{type:"radio",options:{choices:[{content:"Red"},{content:"# Green"},{content:"Blue",correct:!0},{content:"None of these!",isNoneOfTheAbove:!0}]}}},images:{}}}};var i,a,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    question
  }
}`,...(c=(a=t.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};var m,p,d;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    question: articleWithImages
  }
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var h,u,l;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    linterContext: {
      contentType: "exercise",
      highlightLint: true,
      stack: [],
      paths: []
    },
    question: {
      content: \`# H1s bad

Here is some unclosed math: $1+1=3

We should use \\\`\\\\dfrac{}\\\` instead of \\\`\\\\frac{}\\\`: $\\\\frac{3}{5}$

What is the best color in the world?

[[☃ radio 1]]\`,
      widgets: {
        "radio 1": {
          type: "radio",
          options: {
            choices: [{
              content: "Red"
            }, {
              content: "# Green"
            }, {
              content: "Blue",
              correct: true
            }, {
              content: "None of these!",
              isNoneOfTheAbove: true
            }]
          }
        }
      },
      images: {}
    }
  }
}`,...(l=(u=o.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const z=["Exercise","Article","WithLintErrors"];export{n as Article,t as Exercise,o as WithLintErrors,z as __namedExportsOrder,_ as default};
