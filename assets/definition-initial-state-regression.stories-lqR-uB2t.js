import{aB as c,j as m,ao as d}from"./iframe-Drd1SmRq.js";import{t as p}from"./modes-unQmZwy9.js";import{S as l}from"./server-item-renderer-with-debug-ui-BWwKiLHX.js";import{A as u}from"./article-renderer-QWMa5iwH.js";import{q as g,a as f}from"./definition.testdata-z1lAUP5t.js";import"./server-item-renderer-DSCwYT3W.js";import"./hints-renderer-nULHa8p5.js";import"./main-F-7RzE_d.js";import"./test-keypad-context-wrapper-iC1DAP1t.js";import"./Popper-Ci4RRPxU.js";const w={title:"Widgets/Definition/Visual Regression Tests/Initial State",component:l,tags:["!dev"],parameters:{docs:{description:{component:"Regression tests for the definition widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page."}},chromatic:{disableSnapshot:!1,modes:p}}},t={args:{item:c({question:g})}},e=()=>m.jsx(u,{json:f,dependencies:d});e.__docgenInfo={description:"",methods:[],displayName:"Article"};var r,s,o;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question
    })
  }
}`,...(o=(s=t.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var i,a,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactNode => {
  return <ArticleRenderer json={article} dependencies={storybookDependenciesV2} />;
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const D=["Exercise","Article"];export{e as Article,t as Exercise,D as __namedExportsOrder,w as default};
