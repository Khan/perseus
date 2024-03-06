import{j as o,a as g}from"./jsx-runtime-BGVbfQ2Z.js";import{a as m}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{K as r}from"./button-assets-K2ZoY3Yc.js";import{K as y}from"./keypad-button-qf5RMNu9.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./index-V35CFGao.js";import"./index-4JcgVDnF.js";import"./index-awljIyHI.js";import"./index-tvtfaFq4.js";import"./index-eZ2N530f.js";import"./index-ACL0N2lY.js";import"./index-hYQ6Pa3_.js";const F={title:"math-input/components/Keypad Button",args:{keyConfig:r.PLUS,tintColor:"#F6F6F7",coord:[0,0]},argTypes:{keyConfig:{control:"select",options:{...r}},tintColor:{control:"color"}}},u=({...a})=>o("div",{style:{width:200,height:200,backgroundColor:"#DBDCDD",display:"flex"},children:o("div",{style:{width:58,margin:"auto"},children:o(y,{...a,onClickKey:m("pressed")})})}),e=u.bind({}),t=({...a})=>o("div",{style:{backgroundColor:"#DBDCDD",display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"25px"},children:Object.keys(r).map(n=>g("div",{style:{width:58,margin:"auto",overflowWrap:"break-word"},children:[n,o(y,{keyConfig:r[n],onClickKey:m("pressed"),coord:[0,0]})]},n))});var i,s,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
    </div>`,...(d=(s=e.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var p,l,c;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`({
  ...args
}: KeypadButtonProps): React.ReactElement => <div style={{
  backgroundColor: "#DBDCDD",
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: "25px"
}}>
        {Object.keys(KeyConfigs).map(key => <div key={key} style={{
    width: 58,
    margin: "auto",
    overflowWrap: "break-word"
  }}>
                {key}
                <KeypadButton keyConfig={KeyConfigs[key]} onClickKey={action("pressed")} coord={[0, 0]} />
            </div>)}
    </div>`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const O=["Default","AllButtons"];export{t as AllButtons,e as Default,O as __namedExportsOrder,F as default};
