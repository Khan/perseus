import{j as t,a as g}from"./jsx-runtime-5BUNAZ9W.js";import{a as c}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{K as m,m as k}from"./button-assets-Z9EPvaqZ.js";import{K as l}from"./keypad-button-oI-0wQJh.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./index-EhcO8HWm.js";import"./index-awljIyHI.js";import"./react-router-dom-hVaNq8bQ.js";import"./index-tvtfaFq4.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-eVQtxZE-.js";const a=m(k),x={title:"math-input/components/Keypad Button",args:{keyConfig:a.PLUS,coord:[0,0]},argTypes:{keyConfig:{control:"select",options:{...a}}}},n=({keyConfig:o=m.PLUS,coord:e=[0,0]})=>t("div",{style:{width:200,height:200,backgroundColor:"#DBDCDD",display:"flex"},children:t("div",{style:{width:58,margin:"auto"},children:t(l,{keyConfig:o,coord:e,onClickKey:c("pressed")})})}),r=({...o})=>t("div",{style:{backgroundColor:"#DBDCDD",display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"25px"},children:Object.keys(a).map(e=>g("div",{style:{width:58,margin:"auto",overflowWrap:"break-word"},children:[e,t(l,{keyConfig:a[e],onClickKey:c("pressed"),coord:[0,0]})]},e))});n.__docgenInfo={description:"",methods:[],displayName:"Default",props:{coord:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:"[0, 0]",computed:!1}},keyConfig:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    id: Key;
    type: KeyType;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeyArray)[number]",required:!0}},{key:"type",value:{name:"unknown[number]",raw:"(typeof KeyTypes)[number]",required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},description:"",defaultValue:{value:'KeyConfigs["PLUS"]',computed:!0}},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key, event?: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};r.__docgenInfo={description:"",methods:[],displayName:"AllButtons",props:{coord:{required:!0,tsType:{name:"unknown"},description:""},keyConfig:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    id: Key;
    type: KeyType;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeyArray)[number]",required:!0}},{key:"type",value:{name:"unknown[number]",raw:"(typeof KeyTypes)[number]",required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key, event?: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};var i,s,y;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
    </div>`,...(y=(s=n.parameters)==null?void 0:s.docs)==null?void 0:y.source}}};var p,d,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`({
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
    </div>`,...(u=(d=r.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const L=["Default","AllButtons"];export{r as AllButtons,n as Default,L as __namedExportsOrder,x as default};
