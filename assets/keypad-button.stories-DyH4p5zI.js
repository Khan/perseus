import{j as e}from"./jsx-runtime-BT65X5dW.js";import{a as c}from"./index-B-lxVbXh.js";import{K as m,m as g}from"./button-assets-B5B2nyv6.js";import{K as l}from"./keypad-button-WXddGD2b.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CtRu48qb.js";import"./get-decimal-separator-B2cicA45.js";import"./underscore-U-AHniOr.js";import"./core-widget-registry-BDqK5cn0.js";import"./index-CazpBUXm.js";import"./extends-DDykod_l.js";import"./no-important-DlFk8a1I.js";import"./index-B1Gws05u.js";import"./index-CW2s7ekB.js";import"./index-Ds5N5m2R.js";const a=m(g),E={title:"math-input/components/Keypad Button",args:{keyConfig:a.PLUS,coord:[0,0]},argTypes:{keyConfig:{control:"select",options:{...a}}}},r=({keyConfig:o=m.PLUS,coord:n=[0,0]})=>e.jsx("div",{style:{width:200,height:200,backgroundColor:"#DBDCDD",display:"flex"},children:e.jsx("div",{style:{width:58,margin:"auto"},children:e.jsx(l,{keyConfig:o,coord:n,onClickKey:c("pressed")})})}),t=({...o})=>e.jsx("div",{style:{backgroundColor:"#DBDCDD",display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"25px"},children:Object.keys(a).map(n=>e.jsxs("div",{style:{width:58,margin:"auto",overflowWrap:"break-word"},children:[n,e.jsx(l,{keyConfig:a[n],onClickKey:c("pressed"),coord:[0,0]})]},n))});r.__docgenInfo={description:"",methods:[],displayName:"Default",props:{coord:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:"[0, 0]",computed:!1}},keyConfig:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    id: KeypadKey;
    type: KeyType;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]",required:!0}},{key:"type",value:{name:"unknown[number]",raw:"(typeof KeyTypes)[number]",required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},description:"",defaultValue:{value:'KeyConfigs["PLUS"]',computed:!0}},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};t.__docgenInfo={description:"",methods:[],displayName:"AllButtons",props:{coord:{required:!0,tsType:{name:"unknown"},description:""},keyConfig:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    id: KeypadKey;
    type: KeyType;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]",required:!0}},{key:"type",value:{name:"unknown[number]",raw:"(typeof KeyTypes)[number]",required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};var i,s,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
    </div>`,...(p=(s=r.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};var d,y,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
    </div>`,...(u=(y=t.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};const L=["Default","AllButtons"];export{t as AllButtons,r as Default,L as __namedExportsOrder,E as default};
