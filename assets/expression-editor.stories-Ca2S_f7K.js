import{j as m}from"./iframe-B9L61ZNL.js";import{E as p}from"./editor-page-with-storybook-preview-BKkspb5w.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-DQvsVT3t.js";import"./changeable-f3jAW3P9.js";import"./article-renderer-BlPaXFZN.js";import"./server-item-renderer-Bk13Q33N.js";import"./hints-renderer-BKhTPXa8.js";import"./content-preview-CTxsm23F.js";import"./components-BdL8WZIq.js";import"./icon-paths-v_ImfsYm.js";import"./editor-page--4NNTvmO.js";import"./tex-error-view-Drb5weWp.js";import"./item-extras-editor-Ba19Ojoo.js";import"./editor-jsonify-CGgHSSUU.js";import"./blur-input-DeWJTh5j.js";import"./free-response-editor-ZGs-A56E.js";import"./input-number-editor-BOqyZdvw.js";import"./Popper-CtjfWoAT.js";import"./label-image-editor-Cua0x44o.js";import"./matcher-editor-Cf3LpIly.js";import"./number-line-editor-BcFsQPPc.js";import"./phet-simulation-editor-C1Mni-_K.js";import"./plotter-editor-COmSqk6p.js";import"./python-program-editor-W40RqiJM.js";import"./sorter-editor-CJMCWBvd.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
