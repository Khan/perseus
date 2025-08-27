import{j as r,g as b}from"./iframe-DEsRcbaN.js";import{E as T}from"./editor-page-with-storybook-preview-CgZo918I.js";import{I as k,r as y}from"./register-all-widgets-and-editors-for-testing-zHGNa4Eg.js";import{g as D,a as f}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-oo7QNaUX.js";import"./article-renderer-pfikFLIx.js";import"./server-item-renderer-BeQNbDtb.js";import"./hints-renderer-DqE_eCvF.js";import"./content-preview-USZDIign.js";import"./components-CDlHODTc.js";import"./icon-paths-BQfJPJcl.js";import"./editor-page-Dk6r5Uv4.js";import"./tex-error-view-BgRzAEyN.js";import"./item-extras-editor-B_-b7-rG.js";import"./editor-jsonify-KJPreVaX.js";import"./blur-input-lDJhmjfG.js";import"./free-response-editor-Doz5PgCJ.js";import"./input-number-editor-BcW3FcA5.js";import"./Popper-BW_Im_ZP.js";import"./label-image-editor-4yB1f6lB.js";import"./matcher-editor-B9LjcSNB.js";import"./number-line-editor-Bug1StFN.js";import"./phet-simulation-editor-DEL_rjcQ.js";import"./plotter-editor-eb5tLEd8.js";import"./python-program-editor-Bzz7I-YJ.js";import"./sorter-editor-D1Qzqr1R.js";const w=330,I=(W,{args:P})=>r.jsx("div",{style:{width:w},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":D({options:f({...P})})}})})});y();const $={title:"Widgets/Image/Editor Demo",component:k,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg"},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    backgroundImage: {}
  }
}`,...(s=(i=o.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,d,p,m,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Empty (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: {}
  }
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source},description:{story:"This Image widget editor does not have any options set.",...(c=(m=e.parameters)==null?void 0:m.docs)==null?void 0:c.description}}};var g,l,u,h,E;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Populated (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: {
      url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg"
    },
    alt: "The moon showing behind the Earth in space.",
    caption: "Captured via XYZ Telescope",
    title: "The Moon"
  }
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source},description:{story:"This Image widget editor has all options set.",...(E=(h=t.parameters)==null?void 0:h.docs)==null?void 0:E.description}}};const ee=["Default","Empty","Populated"];export{o as Default,e as Empty,t as Populated,ee as __namedExportsOrder,$ as default};
