import{j as o,a as u}from"./jsx-runtime-BGVbfQ2Z.js";import{a as y}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{K as r,m as a}from"./button-assets-j_a3DoNi.js";import{K as g}from"./keypad-button-YUQpjb9n.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./index-1P5txiDe.js";import"./index-awljIyHI.js";import"./index-tvtfaFq4.js";import"./index-4c2J3ov1.js";import"./index-fuyzzUuV.js";const T={title:"math-input/components/Keypad Button",args:{keyConfig:r.PLUS,tintColor:"#F6F6F7",coord:[0,0]},argTypes:{keyConfig:{control:"select",options:{...r(a)}},tintColor:{control:"color"}}},k=({...s})=>o("div",{style:{width:200,height:200,backgroundColor:"#DBDCDD",display:"flex"},children:o("div",{style:{width:58,margin:"auto"},children:o(g,{...s,onClickKey:y("pressed")})})}),e=k.bind({}),t=({...s})=>o("div",{style:{backgroundColor:"#DBDCDD",display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"25px"},children:Object.keys(r(a)).map(n=>u("div",{style:{width:58,margin:"auto",overflowWrap:"break-word"},children:[n,o(g,{keyConfig:r(a)[n],onClickKey:y("pressed"),coord:[0,0]})]},n))});var i,d,p;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`({
  ...args
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
            <KeypadButton {...args} onClickKey={action("pressed")} />
        </div>
    </div>`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var l,c,m;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`({
  ...args
}: KeypadButtonProps): React.ReactElement => <div style={{
  backgroundColor: "#DBDCDD",
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: "25px"
}}>
        {Object.keys(KeyConfigs(mockStrings)).map(key => <div key={key} style={{
    width: 58,
    margin: "auto",
    overflowWrap: "break-word"
  }}>
                {key}
                <KeypadButton keyConfig={KeyConfigs(mockStrings)[key]} onClickKey={action("pressed")} coord={[0, 0]} />
            </div>)}
    </div>`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const E=["Default","AllButtons"];export{t as AllButtons,e as Default,E as __namedExportsOrder,T as default};
