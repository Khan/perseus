import{j as m}from"./iframe-D2B-WNnt.js";import{E as p}from"./editor-page-with-storybook-preview-BsyZk3ul.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-CxFiihsB.js";import"./changeable-DpCEeNNp.js";import"./article-renderer-CSvygoT0.js";import"./server-item-renderer-hg0Rxt4F.js";import"./hints-renderer-DypTrDzm.js";import"./content-preview-C44jDRIl.js";import"./components-CweT6quV.js";import"./icon-paths-VAMmt5bn.js";import"./editor-page-cMRqRZIU.js";import"./tex-error-view-BzG7ypY-.js";import"./item-extras-editor-nfpqw3GL.js";import"./editor-jsonify-DlS2FFph.js";import"./blur-input-BqgNtyin.js";import"./free-response-editor-HrvP9wGT.js";import"./input-number-editor-Lz64HDFH.js";import"./Popper-DcRilstM.js";import"./label-image-editor-CZy3RY6q.js";import"./matcher-editor-6wT3OdaC.js";import"./number-line-editor-tOqMAiCr.js";import"./phet-simulation-editor-B9sz9FMW.js";import"./plotter-editor-Bx69mrmJ.js";import"./python-program-editor-B7-U6ZrN.js";import"./sorter-editor-CKxRwvf5.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
