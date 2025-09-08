import{j as m}from"./iframe-DQKhkWRL.js";import{E as p}from"./editor-page-with-storybook-preview-Bwsh49Z1.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-DKf091rT.js";import"./item-version-DwoE3wq9.js";import"./article-renderer-D9NHecpR.js";import"./server-item-renderer-65hXZClS.js";import"./hints-renderer-Cz8S4fKT.js";import"./content-preview-BbwTjztP.js";import"./components-BZrxdghS.js";import"./icon-paths-B28DqO3E.js";import"./editor-page-CopgpDP3.js";import"./tex-error-view-BXjVKl26.js";import"./item-extras-editor-BZbIK0PH.js";import"./editor-jsonify-BBhJ6zh0.js";import"./blur-input-B8uHi4BM.js";import"./free-response-editor-D53tiusK.js";import"./input-number-editor-RBCfdd-R.js";import"./Popper-B06p5A2u.js";import"./label-image-editor-C_kPIJGy.js";import"./matcher-editor-D7AEz5H5.js";import"./number-line-editor-gIP2YKnA.js";import"./phet-simulation-editor-DVfYrtKV.js";import"./plotter-editor-C8aHLENn.js";import"./python-program-editor-DieRYGDY.js";import"./sorter-editor-CEbUBAgW.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
