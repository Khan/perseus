import{A as h}from"./article-renderer-with-debug-ui-cluS1yXI.js";import{s as O,m as _,p as C,b as M,c as W}from"./article-renderer.testdata-BhE1T5ao.js";import"./iframe-DhYGLGdk.js";import"./test-keypad-context-wrapper-BuZHiFuX.js";import"./article-renderer-DmqwZkiO.js";import"./split-view-BZULNzmT.js";import"./main-D2iYrMm2.js";const{action:F}=__STORYBOOK_MODULE_ACTIONS__,D={title:"Perseus/Renderers/Article Renderer",component:h,argTypes:{useNewStyles:{control:"boolean"}}},e={args:{json:O}},r={args:{json:_}},s={args:{json:C}},o={args:{json:M,apiOptions:{onFocusChange:F("onFocusChange")}}},t={args:{json:W}};var n,a,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    json: singleSectionArticle
  }
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,p,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    json: multiSectionArticle
  }
}`,...(l=(p=r.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var m,u,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    json: passageArticle
  }
}`,...(g=(u=s.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var A,S,d;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    json: articleSectionWithExpression,
    apiOptions: {
      onFocusChange: action("onFocusChange")
    }
  }
}`,...(d=(S=o.parameters)==null?void 0:S.docs)==null?void 0:d.source}}};var j,x,E;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    json: multiSectionArticleWithExpression
  }
}`,...(E=(x=t.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};const I=["ASingleSectionArticle","BMultiSectionArticle","PassageArticle","ExpressionArticle","MultiSectionedExpressionArticle"];export{e as ASingleSectionArticle,r as BMultiSectionArticle,o as ExpressionArticle,t as MultiSectionedExpressionArticle,s as PassageArticle,I as __namedExportsOrder,D as default};
