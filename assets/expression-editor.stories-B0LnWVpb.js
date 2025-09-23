import{j as m}from"./iframe-CP-zQJ4F.js";import{E as p}from"./editor-page-with-storybook-preview-C019e7ry.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-Dd2vjF87.js";import"./changeable-CjqAqEVY.js";import"./article-renderer-D4qfPA-R.js";import"./server-item-renderer-DsZI4mLS.js";import"./hints-renderer-fXYeMMVS.js";import"./content-preview-nn6ks2ki.js";import"./components-k4nJQ0qy.js";import"./icon-paths-CVznYdNt.js";import"./editor-page--AQKCqxJ.js";import"./tex-error-view-mXx-Lxrg.js";import"./item-extras-editor-OE97ZMpQ.js";import"./editor-jsonify-BXNpLk4Q.js";import"./blur-input-bgaSN98S.js";import"./free-response-editor-D-57GQxa.js";import"./input-number-editor-i2FTfofw.js";import"./Popper-bA2i84KG.js";import"./label-image-editor-H2KVFOYO.js";import"./matcher-editor-Dk-kYUJu.js";import"./number-line-editor-D05YSWRq.js";import"./phet-simulation-editor-s3_NphIQ.js";import"./plotter-editor-DUW69QCD.js";import"./python-program-editor-j58H3se8.js";import"./sorter-editor-BwaFDsW4.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
