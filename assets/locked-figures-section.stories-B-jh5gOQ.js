import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-BILzkKRO.js";import{L as s}from"./locked-figures-section-pvK-ghgP.js";import{g as u}from"./util-rMrxO8bv.js";import"./heading-0oNVnUkx.js";import"./toggleable-caret-QZfatxQ4.js";import"./color-select-BprMzO6O.js";import"./Popper-CLpPPWl3.js";import"./locked-ellipse-settings-CAp-JtI0.js";import"./item-version-C8UhxAl3.js";import"./article-renderer-CVOzbHwq.js";import"./server-item-renderer-BupeiuMF.js";import"./hints-renderer-BGUZEZ3V.js";import"./components-Cj7GY96Z.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-BQQxkNQ1.js";import"./locked-label-settings-UcW8xMYx.js";import"./trash-bold-Co_9nyHz.js";import"./line-stroke-select-T_1rvKa4.js";import"./locked-figure-aria-BdRLl7Iq.js";import"./locked-function-settings-COxAGdNi.js";import"./line-swatch-CymnLI0i.js";import"./locked-line-settings-CIQ0PHcp.js";import"./line-weight-select-DKvNhGry.js";import"./locked-point-settings-Bs6OCZVY.js";import"./labeled-switch-BGgmZ_Mw.js";import"./locked-polygon-settings-C0JnfDRc.js";import"./locked-vector-settings-QO35Hiix.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(P=(x=t.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};const oe=["Default","Controlled","WithProdWidth"];export{r as Controlled,e as Default,t as WithProdWidth,oe as __namedExportsOrder,te as default};
