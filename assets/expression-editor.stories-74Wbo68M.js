import{j as m}from"./iframe-BJEvBpNN.js";import{E as p}from"./editor-page-with-storybook-preview-C0XTOwEV.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-nUn67HC0.js";import"./item-version-C0PfWFgG.js";import"./article-renderer-2AScVx07.js";import"./server-item-renderer-CVaJNtxc.js";import"./hints-renderer-Ca7G1BPm.js";import"./content-preview-D1rsF397.js";import"./components-DWcPDyc_.js";import"./icon-paths-Eava6PL-.js";import"./editor-page-BDyjm4__.js";import"./tex-error-view-D7pP2ABq.js";import"./item-extras-editor-C0COFSvV.js";import"./editor-jsonify-BgjN-USO.js";import"./blur-input-2WAgaPvP.js";import"./free-response-editor-CO_OLX-p.js";import"./input-number-editor-DemANi2B.js";import"./Popper-DpreiVGL.js";import"./label-image-editor-DHPun3fs.js";import"./matcher-editor-Bw6XDieY.js";import"./number-line-editor-CbWzvs7i.js";import"./phet-simulation-editor-C0gf4nib.js";import"./plotter-editor-DJ5v4Ppd.js";import"./python-program-editor-D8ildDMQ.js";import"./sorter-editor-CablJwyE.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
