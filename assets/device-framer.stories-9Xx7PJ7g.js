import{c,s as D}from"./index-QHkT31Yt.js";import{r as e}from"./index-6oxdNXpR.js";import{D as n}from"./device-framer-C3twM9Ra.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./constants-p_UgHLsb.js";const y={component:n,title:"PerseusEditor/Components/Device Framer"},a=()=>e.createElement("div",{style:{backgroundColor:c.blue,color:c.offWhite,width:"90%",height:"300px",padding:D.medium_16}},"The DeviceFramer controls the size of the content inside the frame. So there's not much to look at here except how large each device type's size is."),r={render:()=>e.createElement(n,{deviceType:"phone",nochrome:!0},e.createElement(a,null))},t={render:()=>e.createElement(n,{deviceType:"tablet",nochrome:!0},e.createElement(a,null))},o={render:()=>e.createElement(n,{deviceType:"desktop",nochrome:!0},e.createElement(a,null))};var s,m,p;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <DeviceFramer deviceType="phone" nochrome>
            <SampleContent />
        </DeviceFramer>
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var i,d,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <DeviceFramer deviceType="tablet" nochrome>
            <SampleContent />
        </DeviceFramer>
}`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var h,u,v;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <DeviceFramer deviceType="desktop" nochrome>
            <SampleContent />
        </DeviceFramer>
}`,...(v=(u=o.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};const S=["Phone","Tablet","Desktop"];export{o as Desktop,r as Phone,t as Tablet,S as __namedExportsOrder,y as default};
