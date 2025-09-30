import{j as m}from"./iframe-Da852Jbn.js";import{E as p}from"./editor-page-with-storybook-preview-DUpOMzgK.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-u-e74vB4.js";import"./changeable-BxawrcPz.js";import"./article-renderer-VfBK7v9e.js";import"./server-item-renderer-C-UYZ0Mi.js";import"./hints-renderer-CDGwEx0Y.js";import"./content-preview-DqEjzJCN.js";import"./components-CdQb559Y.js";import"./icon-paths-DyslO3o8.js";import"./editor-page-DMpVlKsC.js";import"./tex-error-view-B3MyBrFc.js";import"./item-extras-editor-C0GPMbub.js";import"./editor-jsonify-yWsMAQBR.js";import"./blur-input-D3KRKkwg.js";import"./free-response-editor-KV8kY9hU.js";import"./input-number-editor-DvD_hcZt.js";import"./Popper-CJ_xej-s.js";import"./label-image-editor-SnTfcGvh.js";import"./matcher-editor-DamRmpkE.js";import"./number-line-editor-tEs76nfB.js";import"./phet-simulation-editor-BU6eHc9-.js";import"./plotter-editor-BlfJCyHl.js";import"./python-program-editor-Kuluf1r3.js";import"./sorter-editor-BtFopwo8.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
