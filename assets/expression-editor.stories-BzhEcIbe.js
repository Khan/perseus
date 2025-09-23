import{j as m}from"./iframe-DlBZI7Ll.js";import{E as p}from"./editor-page-with-storybook-preview-CSo16wlT.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-C5MR9u4v.js";import"./changeable-DaaWs0qv.js";import"./article-renderer-B66uGFCV.js";import"./server-item-renderer-Du7ghijY.js";import"./hints-renderer-CN5PPsTA.js";import"./content-preview-DTAQ2I_5.js";import"./components-BQ4bHmFT.js";import"./icon-paths-Bmf-OpRB.js";import"./editor-page-esAGW4JJ.js";import"./tex-error-view-Cf6zuEgE.js";import"./item-extras-editor-nJMsT_iA.js";import"./editor-jsonify-B4f1pDpI.js";import"./blur-input-AiRPyhYZ.js";import"./free-response-editor-B54mFQ3Q.js";import"./input-number-editor-B84XuZut.js";import"./Popper-CNLQpm5J.js";import"./label-image-editor-CjzJL_4O.js";import"./matcher-editor-ByqTA09b.js";import"./number-line-editor-D3lRA6ph.js";import"./phet-simulation-editor-CeANbhMS.js";import"./plotter-editor-2JJGALyH.js";import"./python-program-editor-BtwTqJFB.js";import"./sorter-editor-CMrx6EEe.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
