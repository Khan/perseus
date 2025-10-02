import{j as m}from"./iframe-BnR2CVlk.js";import{E as p}from"./editor-page-with-storybook-preview-DtQuzR9J.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-CxQJxN7z.js";import"./changeable-Cs5R8WQC.js";import"./article-renderer-BDeAmHcF.js";import"./server-item-renderer-CVkwPyWY.js";import"./hints-renderer-CJq1w6aN.js";import"./content-preview-CEat8EVg.js";import"./components-CGgHTwyb.js";import"./icon-paths-BuhQPCr2.js";import"./editor-page-h7AkCcbt.js";import"./tex-error-view-BamCS-X4.js";import"./item-extras-editor-Bmzzm6i0.js";import"./editor-jsonify-CFS3iLUM.js";import"./blur-input-BdK6OW6B.js";import"./free-response-editor-DT1RMxKd.js";import"./input-number-editor-BXsAyk7G.js";import"./Popper-DTGSAPpT.js";import"./label-image-editor-MW6g5w8w.js";import"./matcher-editor-BkRJ8pV4.js";import"./number-line-editor-m7ouKPg1.js";import"./phet-simulation-editor-Cftgsm38.js";import"./plotter-editor-B11uq4k7.js";import"./python-program-editor-B5KDqgAo.js";import"./sorter-editor-PX6c-a56.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
