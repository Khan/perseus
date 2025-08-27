import{j as m}from"./iframe-DrenmEsb.js";import{E as p}from"./editor-page-with-storybook-preview-D69VkAZj.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-DqkDOcDz.js";import"./item-version-DWOGl_3A.js";import"./article-renderer-DiAhqv4P.js";import"./server-item-renderer-Dk0InSHQ.js";import"./hints-renderer-EKE0ysCH.js";import"./content-preview-mEwKVDqr.js";import"./components-DRJtDzFc.js";import"./icon-paths-CjY0sQEg.js";import"./editor-page-DN3pvWor.js";import"./tex-error-view-IbvgHgaq.js";import"./item-extras-editor-xFt4rM2c.js";import"./editor-jsonify-a0-cuTTe.js";import"./blur-input-Db4dJB3Q.js";import"./free-response-editor-BN5ar-77.js";import"./input-number-editor-CIyioWhj.js";import"./Popper-DHgsclpW.js";import"./label-image-editor-7ELczuAW.js";import"./matcher-editor-CI1h_zZ_.js";import"./number-line-editor-Bk3xchmS.js";import"./phet-simulation-editor-DX-69Tbo.js";import"./plotter-editor-fGiKlehc.js";import"./python-program-editor-c-9K8szC.js";import"./sorter-editor-z2WlqZJi.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
