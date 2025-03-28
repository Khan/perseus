import{a as c}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import{r as e}from"./index-C6mWTJJr.js";import{K as m,m as g}from"./button-assets-CICggd4J.js";import{K as l}from"./keypad-button-Ce4opAXu.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-BosuxZz1.js";import"./underscore-U-AHniOr.js";import"./get-decimal-separator-B2cicA45.js";import"./core-widget-registry-2tCIH_GM.js";import"./index-1LDQje0j.js";import"./index-CskvhqFA.js";import"./no-important-DlFk8a1I.js";import"./tiny-invariant-CopsF_GD.js";import"./index-CC9jxhwQ.js";const a=m(g),R={title:"math-input/components/Keypad Button",args:{keyConfig:a.PLUS,coord:[0,0]},argTypes:{keyConfig:{control:"select",options:{...a}}}},t=({keyConfig:o=m.PLUS,coord:n=[0,0]})=>e.createElement("div",{style:{width:200,height:200,backgroundColor:"#DBDCDD",display:"flex"}},e.createElement("div",{style:{width:58,margin:"auto"}},e.createElement(l,{keyConfig:o,coord:n,onClickKey:c("pressed")}))),r=({...o})=>e.createElement("div",{style:{backgroundColor:"#DBDCDD",display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"25px"}},Object.keys(a).map(n=>e.createElement("div",{key:n,style:{width:58,margin:"auto",overflowWrap:"break-word"}},n,e.createElement(l,{keyConfig:a[n],onClickKey:c("pressed"),coord:[0,0]}))));t.__docgenInfo={description:"",methods:[],displayName:"Default",props:{coord:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:"[0, 0]",computed:!1}},keyConfig:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};var i,s,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
    </div>`,...(p=(s=t.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};var y,d,u;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`({
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
    </div>`,...(u=(d=r.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const L=["Default","AllButtons"];export{r as AllButtons,t as Default,L as __namedExportsOrder,R as default};
