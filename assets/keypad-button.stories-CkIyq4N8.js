import{K as c,j as e,m as g,a as l}from"./iframe-BiGC5sW5.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,a=c(g),f={title:"Math Input/Components/Keypad Button",args:{keyConfig:a.PLUS,coord:[0,0]},argTypes:{keyConfig:{control:"select",options:{...a}}},tags:["!dev"]},t=({keyConfig:o=c.PLUS,coord:n=[0,0]})=>e.jsx("div",{style:{width:200,height:200,backgroundColor:"#DBDCDD",display:"flex"},children:e.jsx("div",{style:{width:58,margin:"auto"},children:e.jsx(l,{keyConfig:o,coord:n,onClickKey:m("pressed")})})}),r=({...o})=>e.jsx("div",{style:{backgroundColor:"#DBDCDD",display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"25px"},children:Object.keys(a).map(n=>e.jsxs("div",{style:{width:58,margin:"auto",overflowWrap:"break-word"},children:[n,e.jsx(l,{keyConfig:a[n],onClickKey:m("pressed"),coord:[0,0]})]},n))});t.__docgenInfo={description:"",methods:[],displayName:"Default",props:{coord:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:"[0, 0]",computed:!1}},keyConfig:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    id: KeypadKey;
    type: KeyType;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]",required:!0}},{key:"type",value:{name:"unknown[number]",raw:"(typeof KeyTypes)[number]",required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},description:"",defaultValue:{value:'KeyConfigs["PLUS"]',computed:!0}},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};r.__docgenInfo={description:"",methods:[],displayName:"AllButtons",props:{coord:{required:!0,tsType:{name:"unknown"},description:""},keyConfig:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    id: KeypadKey;
    type: KeyType;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]",required:!0}},{key:"type",value:{name:"unknown[number]",raw:"(typeof KeyTypes)[number]",required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};var i,s,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
  keyConfig = KeyConfigs["PLUS"],
  coord = [0, 0]
}: KeypadButtonProps): React.ReactElement => <div style={{
  width: 200,
  height: 200,
  backgroundColor: "#DBDCDD",
  display: "flex"
}}>
        <div style={{
    width: 58,
    margin: "auto"
  }}>
            <KeypadButton keyConfig={keyConfig} coord={coord} onClickKey={action("pressed")} />
        </div>
    </div>`,...(d=(s=t.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var y,u,p;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`({
  ...args
}: KeypadButtonProps): React.ReactElement => <div style={{
  backgroundColor: "#DBDCDD",
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: "25px"
}}>
        {Object.keys(keyConfigs).map(key => <div key={key} style={{
    width: 58,
    margin: "auto",
    overflowWrap: "break-word"
  }}>
                {key}
                <KeypadButton keyConfig={keyConfigs[key]} onClickKey={action("pressed")} coord={[0, 0]} />
            </div>)}
    </div>`,...(p=(u=r.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const v=["Default","AllButtons"];export{r as AllButtons,t as Default,v as __namedExportsOrder,f as default};
