import{j as e,a as s}from"./jsx-runtime-FVsy8kgq.js";import{Z as m}from"./zoomable-CA1NzpZD.js";import"./index-TT1qJ6UJ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-7vsPyIck.js";const h={title:"Perseus/Components/Zoomable",argTypes:{disableEntranceAnimation:{control:{type:"boolean"}}}},i=(n,c)=>({width:1e3,height:500}),o=n=>e(m,{computeChildBounds:i,disableEntranceAnimation:!!n.disableEntranceAnimation,children:s("span",{children:["Here's some zoomed-out content.",e("br",{}),e("br",{}),"Click on the content to zoom/unzoom."]})});o.__docgenInfo={description:"",methods:[],displayName:"ZoomableExample"};var t,a,r;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Zoomable computeChildBounds={computeChildBounds} disableEntranceAnimation={!!args.disableEntranceAnimation}>
            <span>
                Here's some zoomed-out content.
                <br />
                <br />
                Click on the content to zoom/unzoom.
            </span>
        </Zoomable>;
}`,...(r=(a=o.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};const E=["ZoomableExample"];export{o as ZoomableExample,E as __namedExportsOrder,h as default};
