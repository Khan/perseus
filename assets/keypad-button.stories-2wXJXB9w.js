import{j as t,a as g}from"./jsx-runtime-5BUNAZ9W.js";import{a as l}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{K as m,m as k}from"./button-assets-W0P3gTHH.js";import{K as c}from"./keypad-button-SJOhniA6.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./index-AFG5vh6r.js";import"./index-awljIyHI.js";import"./index-tvtfaFq4.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";const a=m(k),N={title:"math-input/components/Keypad Button",args:{keyConfig:a.PLUS,coord:[0,0]},argTypes:{keyConfig:{control:"select",options:{...a}}}},n=({keyConfig:i=m.PLUS,coord:e=[0,0]})=>t("div",{style:{width:200,height:200,backgroundColor:"#DBDCDD",display:"flex"},children:t("div",{style:{width:58,margin:"auto"},children:t(c,{keyConfig:i,coord:e,onClickKey:l("pressed")})})}),r=({...i})=>t("div",{style:{backgroundColor:"#DBDCDD",display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"25px"},children:Object.keys(a).map(e=>g("div",{style:{width:58,margin:"auto",overflowWrap:"break-word"},children:[e,t(c,{keyConfig:a[e],onClickKey:l("pressed"),coord:[0,0]})]},e))});n.__docgenInfo={description:"",methods:[],displayName:"Default",props:{coord:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:"[0, 0]",computed:!1}},keyConfig:{required:!1,tsType:{name:"union",raw:"NonManyKeyConfig | ManyKeyConfig",elements:[{name:"signature",type:"object",raw:`{
    id: Key;
    type: Exclude<KeyType, "MANY">;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeyArray)[number]",required:!0}},{key:"type",value:{name:"Exclude",elements:[{name:"unknown[number]",raw:"(typeof KeyTypes)[number]"},{name:"literal",value:'"MANY"'}],raw:'Exclude<KeyType, "MANY">',required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},{name:"intersection",raw:`Omit<NonManyKeyConfig, "type"> & {
    type: Extract<KeyType, "MANY">;
    childKeyIds: ReadonlyArray<string>;
}`,elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
    id: Key;
    type: Exclude<KeyType, "MANY">;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeyArray)[number]",required:!0}},{key:"type",value:{name:"Exclude",elements:[{name:"unknown[number]",raw:"(typeof KeyTypes)[number]"},{name:"literal",value:'"MANY"'}],raw:'Exclude<KeyType, "MANY">',required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},{name:"literal",value:'"type"'}],raw:'Omit<NonManyKeyConfig, "type">'},{name:"signature",type:"object",raw:`{
    type: Extract<KeyType, "MANY">;
    childKeyIds: ReadonlyArray<string>;
}`,signature:{properties:[{key:"type",value:{name:"Extract",elements:[{name:"unknown[number]",raw:"(typeof KeyTypes)[number]"},{name:"literal",value:'"MANY"'}],raw:'Extract<KeyType, "MANY">',required:!0}},{key:"childKeyIds",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}}]}]},description:"",defaultValue:{value:'KeyConfigs["PLUS"]',computed:!0}},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key, event?: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};r.__docgenInfo={description:"",methods:[],displayName:"AllButtons",props:{coord:{required:!0,tsType:{name:"unknown"},description:""},keyConfig:{required:!0,tsType:{name:"union",raw:"NonManyKeyConfig | ManyKeyConfig",elements:[{name:"signature",type:"object",raw:`{
    id: Key;
    type: Exclude<KeyType, "MANY">;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeyArray)[number]",required:!0}},{key:"type",value:{name:"Exclude",elements:[{name:"unknown[number]",raw:"(typeof KeyTypes)[number]"},{name:"literal",value:'"MANY"'}],raw:'Exclude<KeyType, "MANY">',required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},{name:"intersection",raw:`Omit<NonManyKeyConfig, "type"> & {
    type: Extract<KeyType, "MANY">;
    childKeyIds: ReadonlyArray<string>;
}`,elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
    id: Key;
    type: Exclude<KeyType, "MANY">;
    icon: IconConfig;
    ariaLabel: string;
}`,signature:{properties:[{key:"id",value:{name:"unknown[number]",raw:"(typeof KeyArray)[number]",required:!0}},{key:"type",value:{name:"Exclude",elements:[{name:"unknown[number]",raw:"(typeof KeyTypes)[number]"},{name:"literal",value:'"MANY"'}],raw:'Exclude<KeyType, "MANY">',required:!0}},{key:"icon",value:{name:"signature",type:"object",raw:`{
    data: string;
}`,signature:{properties:[{key:"data",value:{name:"string",required:!0}}]},required:!0}},{key:"ariaLabel",value:{name:"string",required:!0}}]}},{name:"literal",value:'"type"'}],raw:'Omit<NonManyKeyConfig, "type">'},{name:"signature",type:"object",raw:`{
    type: Extract<KeyType, "MANY">;
    childKeyIds: ReadonlyArray<string>;
}`,signature:{properties:[{key:"type",value:{name:"Extract",elements:[{name:"unknown[number]",raw:"(typeof KeyTypes)[number]"},{name:"literal",value:'"MANY"'}],raw:'Extract<KeyType, "MANY">',required:!0}},{key:"childKeyIds",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}}]}]},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key, event?: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},action:{required:!1,tsType:{name:"boolean"},description:""},secondary:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};var o,y,u;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`({
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
    </div>`,...(u=(y=n.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};var s,p,d;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`({
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
    </div>`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const Y=["Default","AllButtons"];export{r as AllButtons,n as Default,Y as __namedExportsOrder,N as default};
