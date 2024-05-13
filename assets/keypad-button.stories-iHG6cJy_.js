import{j as e,a as u}from"./jsx-runtime-BGVbfQ2Z.js";import{a as m}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{K as y,m as k}from"./button-assets-cmoMUwP4.js";import{K as g}from"./keypad-button-Xf3EMv8Q.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./index-IxqgEL7X.js";import"./index-awljIyHI.js";import"./index-tvtfaFq4.js";import"./index-4c2J3ov1.js";import"./index-25YgVP-A.js";const n=y(k),R={title:"math-input/components/Keypad Button",args:{keyConfig:n.PLUS,coord:[0,0]},argTypes:{keyConfig:{control:"select",options:{...n}}}},r=({keyConfig:a=y.PLUS,coord:o=[0,0]})=>e("div",{style:{width:200,height:200,backgroundColor:"#DBDCDD",display:"flex"},children:e("div",{style:{width:58,margin:"auto"},children:e(g,{keyConfig:a,coord:o,onClickKey:m("pressed")})})}),t=({...a})=>e("div",{style:{backgroundColor:"#DBDCDD",display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"25px"},children:Object.keys(n).map(o=>u("div",{style:{width:58,margin:"auto",overflowWrap:"break-word"},children:[o,e(g,{keyConfig:n[o],onClickKey:m("pressed"),coord:[0,0]})]},o))});var i,s,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
    </div>`,...(d=(s=r.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var p,c,l;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`({
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
    </div>`,...(l=(c=t.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const E=["Default","AllButtons"];export{t as AllButtons,r as Default,E as __namedExportsOrder,R as default};
