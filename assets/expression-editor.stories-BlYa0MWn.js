import{j as m}from"./iframe-BlaVeZ39.js";import{E as p}from"./editor-page-with-storybook-preview-D1vvFzdG.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-D4UOjRYA.js";import"./changeable-BC4l_XWb.js";import"./article-renderer-BMKPdclk.js";import"./server-item-renderer-eObpF2B_.js";import"./hints-renderer-C5J5gysr.js";import"./content-preview-pHsJYMin.js";import"./components-phdiDwe-.js";import"./icon-paths-DH7JIVt4.js";import"./editor-page-GFSUFVPe.js";import"./tex-error-view-Bcz87FNJ.js";import"./item-extras-editor-C5ASQT4r.js";import"./editor-jsonify-_GFufwN_.js";import"./blur-input-BRXUj7AE.js";import"./free-response-editor-3T-rHx6l.js";import"./input-number-editor-Cz2sdCMa.js";import"./Popper-CWt_rvVt.js";import"./label-image-editor-0MgE9mgC.js";import"./matcher-editor-DasyA75G.js";import"./number-line-editor-4X7MaAGZ.js";import"./phet-simulation-editor-Banfddf6.js";import"./plotter-editor-BdGZ7eeu.js";import"./python-program-editor-Caiimr7m.js";import"./sorter-editor-DUkzipxV.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
