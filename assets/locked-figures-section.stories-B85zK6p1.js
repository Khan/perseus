import{j as o,r as k,V as R,p as y,s as d,d as w}from"./iframe-CiZ4rom4.js";import{L as s}from"./locked-figures-section-B0Dmj8Aq.js";import{g as u}from"./util-H5sE61uR.js";import"./heading-wxXfEAgh.js";import"./toggleable-caret-DeF0TsVu.js";import"./locked-ellipse-settings-DpmTb_t-.js";import"./item-version-DIvEicZT.js";import"./article-renderer-DEKiL95x.js";import"./server-item-renderer-BPtEzFPN.js";import"./hints-renderer-DUBe4pQj.js";import"./components-zJqkJmyj.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-D9uDYSfu.js";import"./locked-label-settings-C_Cnfp2w.js";import"./trash-bold-CBNk1Rb_.js";import"./color-select-DEYIoEID.js";import"./line-stroke-select-BqvcYVMh.js";import"./locked-figure-aria-DsPtqjuL.js";import"./locked-function-settings-Cfpc8u2u.js";import"./line-swatch-ICDQTLM-.js";import"./locked-line-settings-DoUmbb6i.js";import"./locked-point-settings-B0MdsZoC.js";import"./labeled-switch-BwqH28ms.js";import"./locked-polygon-settings-B17AF9_7.js";import"./locked-vector-settings-B-epqlxQ.js";const ee={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(P=(x=t.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};const re=["Default","Controlled","WithProdWidth"];export{r as Controlled,e as Default,t as WithProdWidth,re as __namedExportsOrder,ee as default};
