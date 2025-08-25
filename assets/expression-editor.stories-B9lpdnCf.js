import{j as m}from"./iframe-3hb076BO.js";import{E as p}from"./editor-page-with-storybook-preview-D-wggRiA.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-D_jjt1rR.js";import"./item-version-Bdpm_HQi.js";import"./article-renderer-DKu7MGU_.js";import"./server-item-renderer-BIEks0VV.js";import"./hints-renderer-CoakVpcE.js";import"./content-preview-f0RCUblx.js";import"./components-DBinYojL.js";import"./icon-paths-BsAPaswM.js";import"./editor-page-Cf6JGYRP.js";import"./tex-error-view-Du-uB-Bk.js";import"./item-extras-editor-BgE4tkqh.js";import"./editor-jsonify-7QY0pyve.js";import"./blur-input-DhXYlAxY.js";import"./free-response-editor-B79FNboU.js";import"./input-number-editor-D1SP5ihL.js";import"./Popper-BmY6TTDj.js";import"./label-image-editor-CStMYJUC.js";import"./matcher-editor-BUE23TiH.js";import"./number-line-editor-CF3MWCoA.js";import"./phet-simulation-editor-1tAbGGWB.js";import"./plotter-editor-DrHwtcKt.js";import"./python-program-editor-DqYeUjft.js";import"./sorter-editor-BAYsNly5.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
