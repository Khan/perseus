import{j as m}from"./iframe-D6io2pYB.js";import{E as p}from"./editor-page-with-storybook-preview-BSBb8dlZ.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-DpOqMxCe.js";import"./changeable-BncRqfy4.js";import"./article-renderer-CIxoIdOL.js";import"./server-item-renderer-z3xie12G.js";import"./hints-renderer-BVlrcHrr.js";import"./content-preview-D18FuOgf.js";import"./components-B8qfgrLL.js";import"./icon-paths-BTNbt9UA.js";import"./editor-page-C71SDBFQ.js";import"./tex-error-view-BG9AUnwp.js";import"./item-extras-editor-CIIzTnPw.js";import"./editor-jsonify-CD-kW_AC.js";import"./blur-input-CI2eWg2L.js";import"./free-response-editor-IAnS-JsP.js";import"./input-number-editor-CVOzMJ8q.js";import"./Popper-DdDoOMb3.js";import"./label-image-editor-jE-XhxkC.js";import"./matcher-editor-QSaQI8ze.js";import"./number-line-editor-D9-MkP-S.js";import"./phet-simulation-editor-Co88q20c.js";import"./plotter-editor-jkVdLh--.js";import"./python-program-editor-D7w0p5MW.js";import"./sorter-editor-CqOR5Ruq.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
