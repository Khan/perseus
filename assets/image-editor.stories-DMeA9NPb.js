import{j as r,g as b}from"./iframe-BiGC5sW5.js";import{E as T}from"./editor-page-with-storybook-preview-dajIheMe.js";import{I as k,r as y}from"./register-all-widgets-and-editors-for-testing-D6W3flYL.js";import{g as D,a as f}from"./image-widget-generator-BkbJOfbU.js";import"./item-version-yQFAuGb2.js";import"./article-renderer-9SBKnsn3.js";import"./server-item-renderer-Dv931R2x.js";import"./hints-renderer-DOe55Um_.js";import"./content-preview-BS8TNKp5.js";import"./components-FTGlurjV.js";import"./icon-paths-Dew99ilD.js";import"./editor-page-BzpMRtVE.js";import"./tex-error-view-C9Q-PFor.js";import"./item-extras-editor-DVkRAZoh.js";import"./editor-jsonify-mBnSCGsv.js";import"./blur-input-De9zWWgf.js";import"./free-response-editor-QQgWs1RW.js";import"./input-number-editor-3yi4G5RC.js";import"./Popper-DyYdIu0t.js";import"./label-image-editor-CvMvz6l0.js";import"./matcher-editor-Blh7xI4X.js";import"./number-line-editor-oBGnSGQ3.js";import"./phet-simulation-editor-BHCyayT4.js";import"./plotter-editor-BQ95foHv.js";import"./python-program-editor-B5FR9-EV.js";import"./sorter-editor-DCXMRsnP.js";const w=330,I=(W,{args:P})=>r.jsx("div",{style:{width:w},children:r.jsx(T,{question:b({content:"[[☃ image 1]]",widgets:{"image 1":D({options:f({...P})})}})})});y();const $={title:"Widgets/Image/Editor Demo",component:k,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg"},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
