import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-ClpJ2tSX.js";import{L as s}from"./locked-figures-section-S8WEH9JN.js";import{g as u}from"./util-CjYOiRFR.js";import"./heading-DsU2hfzh.js";import"./toggleable-caret-XcTMhoc0.js";import"./color-select-C92XDuV1.js";import"./Popper-UOVHR52E.js";import"./locked-ellipse-settings-BWuhXiI-.js";import"./item-version-CQubXDjk.js";import"./article-renderer-swXFKa55.js";import"./server-item-renderer-DLm0hFtk.js";import"./hints-renderer-m5to_iUG.js";import"./components-BTpdromP.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-B4A8hgv0.js";import"./locked-label-settings-CxVe76wq.js";import"./trash-bold-CF2loVbk.js";import"./line-stroke-select-Dgim2eOA.js";import"./line-weight-select-PhK6FtRb.js";import"./locked-figure-aria-Cw_mXcqZ.js";import"./locked-function-settings-PD8k23BE.js";import"./line-swatch-B2RHZ_Sz.js";import"./locked-line-settings-B66nWiBu.js";import"./locked-point-settings-BmnJnbvL.js";import"./labeled-switch-kS7yDyia.js";import"./locked-polygon-settings-D9khRmA6.js";import"./locked-vector-settings-D6FnpZDZ.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
