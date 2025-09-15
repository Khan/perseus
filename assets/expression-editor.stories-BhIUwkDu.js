import{j as m}from"./iframe-CuR3KNJy.js";import{E as p}from"./editor-page-with-storybook-preview-BKXkM_yk.js";import{a as c,r as d}from"./register-all-widgets-and-editors-for-testing-DOj5_j8C.js";import"./changeable-DppTJ5Sz.js";import"./article-renderer-C538LY9g.js";import"./server-item-renderer-CYGlTWET.js";import"./hints-renderer-BFgXZv_8.js";import"./content-preview-DI2rPqMi.js";import"./components-BQkhYxBC.js";import"./icon-paths-xgSKFl2u.js";import"./editor-page-DneGi9rv.js";import"./tex-error-view-DqmwLGpn.js";import"./item-extras-editor-DSK5zQ7H.js";import"./editor-jsonify-Bk_nc3aX.js";import"./blur-input-BiLnDF-a.js";import"./free-response-editor-NoE8PKKT.js";import"./input-number-editor-DLnk0ioH.js";import"./Popper-Cz2vcuP0.js";import"./label-image-editor-BsXEBVbc.js";import"./matcher-editor-B8ZFKAfo.js";import"./number-line-editor-BWsYG4HB.js";import"./phet-simulation-editor-D-NbB2Ls.js";import"./plotter-editor-DgRaxLDm.js";import"./python-program-editor-D06pnDQm.js";import"./sorter-editor-C7R9qT1M.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__;d();const K={title:"Widgets/Expression/Editor Demo",component:c,tags:["!dev"]},u={content:`This is a cool expression question

[[☃ expression 1]]

`,images:{},widgets:{"expression 1":{alignment:"default",graded:!0,options:{answerForms:[{considered:"correct",form:!0,key:"0",simplify:!1,value:"16+88i"}],buttonSets:["basic"],functions:["f","g","h"],times:!1},static:!1,type:"expression",version:{major:1,minor:0}}}},o={args:{onChange:g("onChange")}},r={render:()=>m.jsx(p,{question:u})};var e,t,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(i=(t=o.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var s,n,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (): React.ReactElement => <EditorPageWithStorybookPreview question={question} />
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const L=["Default","WithinEditorPage"];export{o as Default,r as WithinEditorPage,L as __namedExportsOrder,K as default};
