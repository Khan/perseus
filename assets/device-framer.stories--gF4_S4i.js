import{j as e}from"./jsx-runtime-63Ea5SlK.js";import{c,s as x}from"./index-deFLJwr4.js";import{D as s}from"./device-framer-MUDr0WgQ.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./constants-p_UgHLsb.js";const y={component:s,title:"PerseusEditor/Components/Device Framer"},n=()=>e.jsx("div",{style:{backgroundColor:c.blue,color:c.offWhite,width:"90%",height:"300px",padding:x.medium_16},children:"The DeviceFramer controls the size of the content inside the frame. So there's not much to look at here except how large each device type's size is."}),r={render:()=>e.jsx(s,{deviceType:"phone",nochrome:!0,children:e.jsx(n,{})})},o={render:()=>e.jsx(s,{deviceType:"tablet",nochrome:!0,children:e.jsx(n,{})})},t={render:()=>e.jsx(s,{deviceType:"desktop",nochrome:!0,children:e.jsx(n,{})})};var a,m,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <DeviceFramer deviceType="phone" nochrome>
            <SampleContent />
        </DeviceFramer>
}`,...(i=(m=r.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var p,d,h;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <DeviceFramer deviceType="tablet" nochrome>
            <SampleContent />
        </DeviceFramer>
}`,...(h=(d=o.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var l,u,v;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <DeviceFramer deviceType="desktop" nochrome>
            <SampleContent />
        </DeviceFramer>
}`,...(v=(u=t.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};const S=["Phone","Tablet","Desktop"];export{t as Desktop,r as Phone,o as Tablet,S as __namedExportsOrder,y as default};