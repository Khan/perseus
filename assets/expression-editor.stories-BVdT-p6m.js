import{j as m}from"./iframe-twR19s2R.js";import{E as p}from"./editor-page-with-storybook-preview-D7i2irUl.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-CQ1O6Ciw.js";import"./changeable-BRbhUt4-.js";import"./article-renderer-DUCTLZ0_.js";import"./server-item-renderer-DEJrks84.js";import"./hints-renderer-dNA-Hqdu.js";import"./content-preview-CPQY52xb.js";import"./components-APFiw_-E.js";import"./icon-paths-C060-huy.js";import"./editor-page-D5nvwEs8.js";import"./tex-error-view-BeQDspTd.js";import"./item-extras-editor-BQPzoatM.js";import"./editor-jsonify-DusSMkrZ.js";import"./blur-input-CIveKNmL.js";import"./free-response-editor-C-0FRDGb.js";import"./input-number-editor-BXmQQzsk.js";import"./Popper-DAXHXale.js";import"./label-image-editor-CONGiQFU.js";import"./matcher-editor-Bg9W3vnX.js";import"./number-line-editor-CPf3rYpS.js";import"./phet-simulation-editor-C9T7kR4t.js";import"./plotter-editor-C955EJd5.js";import"./python-program-editor-ZcbSTA1y.js";import"./sorter-editor-CQuliCRL.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
