import{j as o,g as b,A as f}from"./iframe-BRRXc9Qf.js";import"./changeable-Y1AgwDPJ.js";import"./article-renderer-Do1TdVLh.js";import"./server-item-renderer-sVF9rCGW.js";import"./hints-renderer-CBS4qmP1.js";import{g as w}from"./feature-flags-util-Vxq3J9D8.js";import{E as T}from"./editor-page-with-storybook-preview-DgiwKuVm.js";import{I as k,r as y}from"./register-all-widgets-and-editors-for-testing-C1zjv4Pp.js";import{g as D,a as W}from"./image-widget-generator-BkbJOfbU.js";import"./content-preview-CkqWpyxm.js";import"./components-STZo5d38.js";import"./icon-paths-BEyp8wAc.js";import"./editor-page-C-PvAD0w.js";import"./tex-error-view-DW_h2_l1.js";import"./item-extras-editor-BRZhFD0P.js";import"./editor-jsonify-lgBPHaY7.js";import"./blur-input-9pCVACAN.js";import"./free-response-editor-DO1Oixda.js";import"./input-number-editor-BM4bXEyW.js";import"./Popper-C374ZHB_.js";import"./label-image-editor-ByyAVAnD.js";import"./matcher-editor-DCmPXbUY.js";import"./number-line-editor-BKmIFK9V.js";import"./phet-simulation-editor-DKg7iHcQ.js";import"./plotter-editor-BcNZ-l1N.js";import"./python-program-editor-o7Q-alnA.js";import"./sorter-editor-YCqG2kAd.js";const x=330,I=(j,{args:P})=>o.jsx("div",{style:{width:x},children:o.jsx(T,{apiOptions:{...f.defaults,flags:w({"image-widget-upgrade":!0})},question:b({content:"[[☃ image 1]]",widgets:{"image 1":D({options:W({...P})})}})})});y();const re={title:"Widgets/Image/Editor Demo",component:k,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},r={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[I],args:{backgroundImage:{}}},t={name:"Populated (Within Editor Page)",decorators:[I],args:{backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",width:400,height:225},alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}};var a,i,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    backgroundImage: {}
  }
}`,...(s=(i=r.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,d,p,m,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
      url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",
      width: 400,
      height: 225
    },
    alt: "The moon showing behind the Earth in space.",
    caption: "Captured via XYZ Telescope",
    title: "The Moon"
  }
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source},description:{story:"This Image widget editor has all options set.",...(E=(h=t.parameters)==null?void 0:h.docs)==null?void 0:E.description}}};const oe=["Default","Empty","Populated"];export{r as Default,e as Empty,t as Populated,oe as __namedExportsOrder,re as default};
