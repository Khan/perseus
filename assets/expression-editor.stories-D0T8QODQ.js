import{j as m}from"./iframe-3GGxRJhQ.js";import{E as p}from"./editor-page-with-storybook-preview-NyOpUD9H.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-Dea0u4Gn.js";import"./item-version-BEu79Ulj.js";import"./article-renderer-DRaAA58b.js";import"./server-item-renderer-DNwTl69h.js";import"./hints-renderer-yDRR9REL.js";import"./content-preview-DoxoRUV6.js";import"./components-Dvp3BuUs.js";import"./icon-paths-CqL_w7ML.js";import"./editor-page-DnKu0Mhz.js";import"./tex-error-view-CCgNe8wz.js";import"./item-extras-editor-CN-BngnG.js";import"./editor-jsonify-BfVaLICj.js";import"./blur-input-BZiOa47b.js";import"./free-response-editor-gPyhZuf7.js";import"./input-number-editor-BQkQ20dC.js";import"./Popper-CK6FMInW.js";import"./label-image-editor-XFSfndFh.js";import"./matcher-editor-BH9P2kpH.js";import"./number-line-editor-D9v_qlyy.js";import"./phet-simulation-editor-DtlpJp_y.js";import"./plotter-editor-B0kJRUyM.js";import"./python-program-editor-B5TsbxA9.js";import"./sorter-editor-zd5tZ3HV.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
