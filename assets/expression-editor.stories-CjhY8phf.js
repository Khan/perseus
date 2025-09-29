import{j as m}from"./iframe-BDfd20el.js";import{E as p}from"./editor-page-with-storybook-preview-BFZ_Bq1x.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-2gXPGWsC.js";import"./changeable-CBopxQ_h.js";import"./article-renderer-CnKwc4WG.js";import"./server-item-renderer-ZCFSVAca.js";import"./hints-renderer-Co5MT86T.js";import"./content-preview-CwnbiJ74.js";import"./components-4zEMKafp.js";import"./icon-paths-DMcntd5r.js";import"./editor-page-DVBZj4Of.js";import"./tex-error-view-I7r5TBK2.js";import"./item-extras-editor-CWLIQMCy.js";import"./editor-jsonify-DYIEPtQw.js";import"./blur-input-C2TicqLT.js";import"./free-response-editor-ToCor6qD.js";import"./input-number-editor-Bf2-Gzba.js";import"./Popper-B6zSMaWm.js";import"./label-image-editor-BPU6uBsA.js";import"./matcher-editor-D0sqelcK.js";import"./number-line-editor-C0F_uS6T.js";import"./phet-simulation-editor-zKqcQoul.js";import"./plotter-editor-CvZKNGYV.js";import"./python-program-editor-DvN7CljA.js";import"./sorter-editor-B4vbnbjd.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
