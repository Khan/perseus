import{j as m}from"./iframe-CWALGMeL.js";import{E as p}from"./editor-page-with-storybook-preview-Clw1Xokm.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-Bua-YzQz.js";import"./changeable-Cofc6APC.js";import"./article-renderer-C3qc8_-8.js";import"./server-item-renderer-DO1beWR7.js";import"./hints-renderer-DQ6RBTDt.js";import"./content-preview-rtt1EdAO.js";import"./components-BlmQ54dN.js";import"./icon-paths-CKRqeZyq.js";import"./editor-page-CCEv8P_G.js";import"./tex-error-view-DljeqxgT.js";import"./item-extras-editor-B2Olfyzd.js";import"./editor-jsonify-RjMlH4rF.js";import"./blur-input-DE4McZNG.js";import"./free-response-editor-D003hSpU.js";import"./input-number-editor-C--EBmja.js";import"./Popper-C7kbDKRW.js";import"./label-image-editor-DaRZ4Z6k.js";import"./matcher-editor-Bf_7Qygo.js";import"./number-line-editor-DeInwrL_.js";import"./phet-simulation-editor-CR10u54U.js";import"./plotter-editor-DwU7mmZ1.js";import"./python-program-editor-C3y1ZaAY.js";import"./sorter-editor-DZfe87Gi.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
