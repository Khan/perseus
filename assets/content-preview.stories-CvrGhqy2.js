import{j as e,V as g,s as v,P as w,g as j,r as W}from"./iframe-Dj55CS30.js";import"./item-version-D67BNdCM.js";import"./article-renderer-BW55wHa-.js";import"./server-item-renderer-CKbs9Utm.js";import"./hints-renderer-PYjpjTlK.js";import{a as E}from"./article-renderer.testdata-BhE1T5ao.js";import{q}from"./radio.testdata-Cft01BGH.js";import{D as y}from"./device-framer-Bmv1R65U.js";import{C as x,V as C}from"./content-preview-DpKdWsu5.js";/* empty css                       */import"./components-1sa-rXiw.js";import"./icon-paths-Cfjy_uoj.js";const P=r=>{const[o,f]=W.useState("phone");return e.jsxs(g,{children:[e.jsx(C,{deviceType:o,onViewportSizeChanged:f}),e.jsx(y,{nochrome:!1,deviceType:o,children:e.jsx(x,{...r})})]})},I={title:"Editors/Content Preview",component:x,decorators:[r=>e.jsx(g,{style:{margin:v.xxSmall_6},children:e.jsx(w,{strings:j,locale:"en",children:e.jsx(r,{})})})],render:r=>e.jsx(P,{...r})},t={args:{question:q}},n={args:{question:E}},s={args:{linterContext:{contentType:"exercise",highlightLint:!0,stack:[],paths:[]},question:{content:`# H1s bad

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
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var h,u,l;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(l=(u=s.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const O=["Exercise","Article","WithLintErrors"];export{n as Article,t as Exercise,s as WithLintErrors,O as __namedExportsOrder,I as default};
