import{j as r,g as b}from"./iframe-B7TMQJdi.js";import{E as T}from"./editor-page-with-storybook-preview-BT3wymAv.js";import{I as w,r as k}from"./register-all-widgets-and-editors-for-testing-COGy_iU0.js";import{g as y,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-DWTm3KG2.js";import"./article-renderer-C3ugB7CD.js";import"./server-item-renderer-Dp-6ctHj.js";import"./hints-renderer-BrPYys6H.js";import"./content-preview-CqVWiCl5.js";import"./components--W1lCDFk.js";import"./icon-paths-CP6jQddt.js";import"./editor-page-5HEW8n07.js";import"./tex-error-view-D1eJ6Loy.js";import"./item-extras-editor-BKQqIVIq.js";import"./editor-jsonify-DXplw2MQ.js";import"./blur-input-DodOUuP6.js";import"./free-response-editor-D_wrW1KX.js";import"./input-number-editor-xNB8HRxz.js";import"./Popper-Cq-tr5nC.js";import"./label-image-editor-B008PUN1.js";import"./matcher-editor-CXNJqYWo.js";import"./number-line-editor-CPMmD342.js";import"./phet-simulation-editor-DBOfbdi4.js";import"./plotter-editor-Dkz93pM2.js";import"./python-program-editor-C2_SEQSc.js";import"./sorter-editor-BkSVzONe.js";const f=330,I=(W,{args:P})=>r.jsx("div",{style:{width:f},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":y({options:D({...P})})}})})});k();const $={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    backgroundImage: {}
  }
}`,...(s=(i=o.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,d,p,m,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Empty (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: {}
  }
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source},description:{story:"This Image widget editor does not have any options set.",...(c=(m=e.parameters)==null?void 0:m.docs)==null?void 0:c.description}}};var g,l,h,u,E;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Populated (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: {
      url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",
      width: 400,
      height: 225
    },
    alt: "The moon showing behind the Earth in space.",
    caption: "Captured via XYZ Telescope",
    title: "The Moon"
  }
}`,...(h=(l=t.parameters)==null?void 0:l.docs)==null?void 0:h.source},description:{story:"This Image widget editor has all options set.",...(E=(u=t.parameters)==null?void 0:u.docs)==null?void 0:E.description}}};const ee=["Default","Empty","Populated"];export{o as Default,e as Empty,t as Populated,ee as __namedExportsOrder,$ as default};
