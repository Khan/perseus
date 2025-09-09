import{j as m}from"./iframe-BxN7j4nx.js";import{E as p}from"./editor-page-with-storybook-preview-6WRsdLRy.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-CIPdQ4mA.js";import"./changeable-D3ATpbEp.js";import"./article-renderer-DwiAwhGg.js";import"./server-item-renderer-B4CCd0ty.js";import"./hints-renderer-B9_CYciC.js";import"./content-preview-Dyuy5as9.js";import"./components-B51XGnmB.js";import"./icon-paths-WFOnyYME.js";import"./editor-page-CJs2lVav.js";import"./tex-error-view-7e9DRdYV.js";import"./item-extras-editor-Dziuy5Yo.js";import"./editor-jsonify-BUXMRN6C.js";import"./blur-input-niGJhybi.js";import"./free-response-editor-BW6zuibc.js";import"./input-number-editor-BGqIpF0b.js";import"./Popper-CwI11sDL.js";import"./label-image-editor-a_hSV9dZ.js";import"./matcher-editor-CV60txty.js";import"./number-line-editor-BXkZ5WeC.js";import"./phet-simulation-editor-t3WOrgcU.js";import"./plotter-editor-Dbh5pl0i.js";import"./python-program-editor-IH518kYe.js";import"./sorter-editor-OO7TFggb.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
