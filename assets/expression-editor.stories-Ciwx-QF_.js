import{j as m}from"./iframe-B-YbJrpL.js";import{E as p}from"./editor-page-with-storybook-preview-DZ0tnltz.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-BHccCyt0.js";import"./item-version-DWuaT6Dp.js";import"./article-renderer-C9d66jzF.js";import"./server-item-renderer-DpP8Wvrh.js";import"./hints-renderer-tP8TvJtv.js";import"./content-preview-BjjJIyVg.js";import"./components-B2xlT8XQ.js";import"./icon-paths-CqVqAUCv.js";import"./editor-page-KxmoBM2j.js";import"./tex-error-view-Pe8Bm6Od.js";import"./item-extras-editor-hiHfNfD9.js";import"./editor-jsonify-BrST9XXc.js";import"./blur-input-viKADifv.js";import"./free-response-editor-CNe9SLVw.js";import"./input-number-editor-BWHp8_SV.js";import"./Popper-D0xjopZW.js";import"./label-image-editor-BhYqhzz7.js";import"./matcher-editor-CNNI6zSx.js";import"./number-line-editor-CBPql9EF.js";import"./phet-simulation-editor-DF3DDcEU.js";import"./plotter-editor-zTtTAKDZ.js";import"./python-program-editor-BQwsm-0Z.js";import"./sorter-editor-BtehrS5u.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
