import{j as m}from"./iframe-BUqiAjvg.js";import{E as p}from"./editor-page-with-storybook-preview-CbWYbzxa.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-Uzkd3OLT.js";import"./changeable-BIIkL6QK.js";import"./article-renderer-BMdS74on.js";import"./server-item-renderer-BWbA54HK.js";import"./hints-renderer-RXA74GFK.js";import"./content-preview-ibOG6CPd.js";import"./components-40MYzgN1.js";import"./icon-paths-Dw3QWWRN.js";import"./editor-page-C0hWEKkq.js";import"./tex-error-view-CRi9y7ze.js";import"./item-extras-editor-BEZCtRSL.js";import"./editor-jsonify-BmGheLxA.js";import"./blur-input-BwMCEkN5.js";import"./free-response-editor-C1dxHW-x.js";import"./input-number-editor-ETe6qJbG.js";import"./Popper-o2UhZJdE.js";import"./label-image-editor-BYHaAA4y.js";import"./matcher-editor-Zdm32iLj.js";import"./number-line-editor-CM1tckUG.js";import"./phet-simulation-editor-B2oKM35F.js";import"./plotter-editor-BDhC--_l.js";import"./python-program-editor-DUg5h9xD.js";import"./sorter-editor-BNnlJerm.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
