import{j as e}from"./jsx-runtime-63Ea5SlK.js";import{a as c}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{K as m,m as g}from"./button-assets-ozecF1qE.js";import{K as l}from"./keypad-button-BlFICMi6.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./v4-yQnnJER4.js";import"./index-xfryX26Z.js";import"./index-0DbkllkJ.js";import"./index-awljIyHI.js";import"./react-router-dom-VIBHfbW6.js";import"./index-deFLJwr4.js";const a=m(g),j={title:"math-input/components/Keypad Button",args:{keyConfig:a.PLUS,coord:[0,0]},argTypes:{keyConfig:{control:"select",options:{...a}}}},r=({keyConfig:o=m.PLUS,coord:n=[0,0]})=>e.jsx("div",{style:{width:200,height:200,backgroundColor:"#DBDCDD",display:"flex"},children:e.jsx("div",{style:{width:58,margin:"auto"},children:e.jsx(l,{keyConfig:o,coord:n,onClickKey:c("pressed")})})}),t=({...o})=>e.jsx("div",{style:{backgroundColor:"#DBDCDD",display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"25px"},children:Object.keys(a).map(n=>e.jsxs("div",{style:{width:58,margin:"auto",overflowWrap:"break-word"},children:[n,e.jsx(l,{keyConfig:a[n],onClickKey:c("pressed"),coord:[0,0]})]},n))});r.__docgenInfo={description:"",methods:[],displayName:"Default",props:{coord:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:"[0, 0]",computed:!1}},keyConfig:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
    </div>`,...(y=(s=r.parameters)==null?void 0:s.docs)==null?void 0:y.source}}};var u,d,p;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`({
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
    </div>`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const x=["Default","AllButtons"];export{t as AllButtons,r as Default,x as __namedExportsOrder,j as default};