import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-ZFgYqQyF.js";import{L as s}from"./locked-figures-section-DXVnHIGA.js";import{g as u}from"./util-hPLuWl9N.js";import"./heading-MJqREhF6.js";import"./toggleable-caret-DP52IPrH.js";import"./color-select-Clrxd-hW.js";import"./Popper-CQ-YRHq8.js";import"./locked-ellipse-settings-D3cZ4alQ.js";import"./item-version-DlZtwoiJ.js";import"./article-renderer-JA5_WgFZ.js";import"./server-item-renderer-jYLlYdnt.js";import"./hints-renderer-CpFykfe9.js";import"./components-DUZEt7jG.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-DO39ZtnD.js";import"./locked-label-settings-bv-VCU_i.js";import"./trash-bold-Bvu4MXin.js";import"./line-stroke-select-BmoMxyaO.js";import"./locked-figure-aria-CUcjdw6F.js";import"./locked-function-settings-BF5qB3At.js";import"./line-swatch-vQoM0xDs.js";import"./locked-line-settings-D1qj47N6.js";import"./locked-point-settings-6cQBouRK.js";import"./labeled-switch-CnBOUinv.js";import"./locked-polygon-settings-B80vEw15.js";import"./locked-vector-settings-C-9cFlAY.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedFiguresSection {...args} />;
}`,...(l=(g=e.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};var f,F,S;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: function Render() {
    const [figures, setFigures] = React.useState([]);
    const handlePropsUpdate = newProps => {
      setFigures(newProps.lockedFigures);
    };
    return <LockedFiguresSection figures={figures} onChange={handlePropsUpdate} />;
  }
}`,...(S=(F=r.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};var h,x,P;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const [figures, setFigures] = React.useState([getDefaultFigureForType("point"), getDefaultFigureForType("line")]);
    const handlePropsUpdate = newProps => {
      setFigures(newProps.lockedFigures);
    };
    return <View style={styles.prodSizeContainer}>
                <LockedFiguresSection figures={figures} onChange={handlePropsUpdate} />
            </View>;
  }
}`,...(P=(x=t.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};const te=["Default","Controlled","WithProdWidth"];export{r as Controlled,e as Default,t as WithProdWidth,te as __namedExportsOrder,re as default};
