import{a as c}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{r as e}from"./index-6oxdNXpR.js";import{K as m,m as g}from"./button-assets-lecB0YuJ.js";import{K as l}from"./keypad-button-Q1001UgL.js";import"./v4-yQnnJER4.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./underscore-885MUNGo.js";import"./get-decimal-separator-C5N_K9o2.js";import"./random-util-wZstT-Qs.js";import"./index-k8usAFZT.js";import"./index-iTGWTR8W.js";import"./no-important-xCWWYXQR.js";import"./tiny-invariant-bHgPayXn.js";import"./index-QHkT31Yt.js";const a=m(g),R={title:"math-input/components/Keypad Button",args:{keyConfig:a.PLUS,coord:[0,0]},argTypes:{keyConfig:{control:"select",options:{...a}}}},r=({keyConfig:o=m.PLUS,coord:n=[0,0]})=>e.createElement("div",{style:{width:200,height:200,backgroundColor:"#DBDCDD",display:"flex"}},e.createElement("div",{style:{width:58,margin:"auto"}},e.createElement(l,{keyConfig:o,coord:n,onClickKey:c("pressed")}))),t=({...o})=>e.createElement("div",{style:{backgroundColor:"#DBDCDD",display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"25px"}},Object.keys(a).map(n=>e.createElement("div",{key:n,style:{width:58,margin:"auto",overflowWrap:"break-word"}},n,e.createElement(l,{keyConfig:a[n],onClickKey:c("pressed"),coord:[0,0]}))));r.__docgenInfo={description:"",methods:[],displayName:"Default",props:{coord:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:"[0, 0]",computed:!1}},keyConfig:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    id: Key;
    type: KeyType;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeyArray)[number]",required:!0}},{key:"type",value:{name:"unknown[number]",raw:"(typeof KeyTypes)[number]",required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},description:"",defaultValue:{value:'KeyConfigs["PLUS"]',computed:!0}},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key, event?: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};t.__docgenInfo={description:"",methods:[],displayName:"AllButtons",props:{coord:{required:!0,tsType:{name:"unknown"},description:""},keyConfig:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    id: Key;
    type: KeyType;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeyArray)[number]",required:!0}},{key:"type",value:{name:"unknown[number]",raw:"(typeof KeyTypes)[number]",required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key, event?: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};var i,s,y;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
    </div>`,...(y=(s=r.parameters)==null?void 0:s.docs)==null?void 0:y.source}}};var p,u,d;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`({
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
    </div>`,...(d=(u=t.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const L=["Default","AllButtons"];export{t as AllButtons,r as Default,L as __namedExportsOrder,R as default};
