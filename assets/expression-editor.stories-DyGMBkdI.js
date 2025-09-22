import{j as m}from"./iframe-Bs0680DQ.js";import{E as p}from"./editor-page-with-storybook-preview-B5QC7TJd.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-BIDxG2YE.js";import"./changeable-8-ECgKAd.js";import"./article-renderer-B2RUnVv_.js";import"./server-item-renderer-Cl2DFJ5h.js";import"./hints-renderer-74VnI3Mi.js";import"./content-preview-Bf5F4g4H.js";import"./components-CsAmRibY.js";import"./icon-paths-CE6HmnNM.js";import"./editor-page-C7vT6Gn8.js";import"./tex-error-view-xADJuHSa.js";import"./item-extras-editor-XMTvr4b1.js";import"./editor-jsonify-B8RpmSYm.js";import"./blur-input-zunoP0_d.js";import"./free-response-editor-2txeYnMj.js";import"./input-number-editor-CxOrU4SW.js";import"./Popper-CkbgcNVe.js";import"./label-image-editor-DN5PHFuM.js";import"./matcher-editor-CmfHIqTL.js";import"./number-line-editor-CdE_Y9vr.js";import"./phet-simulation-editor-BH-SbZB1.js";import"./plotter-editor-CabBjapK.js";import"./python-program-editor-CPaJrpqt.js";import"./sorter-editor-D5D0BLRN.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
