import{j as m}from"./iframe-6XrUlqeQ.js";import{E as p}from"./editor-page-with-storybook-preview-CSPvNKbS.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-CPSKyzHg.js";import"./item-version-CbuYwno6.js";import"./article-renderer-Cmgg8ycl.js";import"./server-item-renderer-DInPrT9z.js";import"./hints-renderer-DAbHopwt.js";import"./content-preview-HFN1iAGT.js";import"./components-ByFKNKK9.js";import"./icon-paths-D5hWskTp.js";import"./editor-page-C9Kkfh0H.js";import"./tex-error-view-QD4pafET.js";import"./item-extras-editor-BDH0nfYK.js";import"./editor-jsonify-D9Ic8d08.js";import"./blur-input-qQZbWfOy.js";import"./free-response-editor-Cnd4qllz.js";import"./input-number-editor-BWfLt2A7.js";import"./Popper-UI7PxSXR.js";import"./label-image-editor-0QDvReg2.js";import"./matcher-editor-Dz6OaIM5.js";import"./number-line-editor-DwxlC54z.js";import"./phet-simulation-editor-DK0KftBs.js";import"./plotter-editor-C0ybJnBA.js";import"./python-program-editor-C-IcLfN2.js";import"./sorter-editor-D90ZEpnY.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
