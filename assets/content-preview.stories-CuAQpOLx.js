import{j as e,V as g,s as v,P as w,w as j,r as W}from"./iframe-Av__LOls.js";import"./item-version-CHgavrtG.js";import"./article-renderer-C0sZ0ydP.js";import"./server-item-renderer-aIl7SK8E.js";import"./hints-renderer-C2VM9sFD.js";import{a as E}from"./article-renderer.testdata-BhE1T5ao.js";import{q as P}from"./radio.testdata-CcPAYXhw.js";import{D as q}from"./device-framer-QpvgHk4r.js";import{V as y}from"./viewport-resizer-B0oj_rcP.js";import{C as x}from"./content-preview-CxBpCb1v.js";/* empty css                       */import"./constants-kyOY0S4e.js";import"./components-BrYWmJxs.js";import"./icon-paths-BU5otBoc.js";const C=r=>{const[o,f]=W.useState("phone");return e.jsxs(g,{children:[e.jsx(y,{deviceType:o,onViewportSizeChanged:f}),e.jsx(q,{nochrome:!1,deviceType:o,children:e.jsx(x,{...r})})]})},_={title:"PerseusEditor/Content Preview",component:x,decorators:[r=>e.jsx(g,{style:{margin:v.xxSmall_6},children:e.jsx(w,{strings:j,locale:"en",children:e.jsx(r,{})})})],render:r=>e.jsx(C,{...r})},t={args:{question:P}},n={args:{question:E}},s={args:{linterContext:{contentType:"exercise",highlightLint:!0,stack:[],paths:[]},question:{content:`# H1s bad

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
}`,...(l=(u=s.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const z=["Exercise","Article","WithLintErrors"];export{n as Article,t as Exercise,s as WithLintErrors,z as __namedExportsOrder,_ as default};
