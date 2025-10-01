import{j as m}from"./iframe-DX_TRIrP.js";import{E as p}from"./editor-page-with-storybook-preview-c0ORTL3b.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-IzBwQu3-.js";import"./changeable-i3_3swUP.js";import"./article-renderer-DVe5Guy-.js";import"./server-item-renderer-BQsQV7p9.js";import"./hints-renderer-DkD3HAF5.js";import"./content-preview-Bvz4S4xm.js";import"./components-BTmTOPpx.js";import"./icon-paths-D8QBa6tB.js";import"./editor-page-BYGqIxOB.js";import"./tex-error-view-8DE0iN9K.js";import"./item-extras-editor-cDu32Atj.js";import"./editor-jsonify-BiWJamii.js";import"./blur-input-aTT0omZ8.js";import"./free-response-editor-BBc7PKUE.js";import"./input-number-editor-DsrbJsug.js";import"./Popper-Bax8sFlj.js";import"./label-image-editor-CPEEY_cK.js";import"./matcher-editor-UbLB9Grz.js";import"./number-line-editor-BCWZvukt.js";import"./phet-simulation-editor-B0cMBplB.js";import"./plotter-editor-OOfkDAUl.js";import"./python-program-editor-DF_QEAK_.js";import"./sorter-editor-BjHXeMse.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
