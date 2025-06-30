import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-Bcg17xLF.js";import{L as s}from"./locked-figures-section-CWDToVw_.js";import{g as u}from"./util-Dg7Zt9il.js";import"./heading-Eu3LUtzl.js";import"./toggleable-caret-EIsqGJ2g.js";import"./color-select-B5Js-S1X.js";import"./Popper-Bksjufvv.js";import"./locked-ellipse-settings-BYIH_cOB.js";import"./item-version-Cq6y6B1E.js";import"./article-renderer-CkfdpRoI.js";import"./server-item-renderer-CUMfm4hX.js";import"./hints-renderer-CrMQM1rf.js";import"./components-z5lU3uB1.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-D6QHuXR4.js";import"./locked-label-settings-Dof-jKA5.js";import"./trash-bold-VOo_FpSm.js";import"./line-stroke-select-dKlzNf26.js";import"./locked-figure-aria-DlJDjBMQ.js";import"./locked-function-settings-C93XwnMM.js";import"./line-swatch-BoPfg3Ut.js";import"./locked-line-settings-BsAiw3de.js";import"./locked-point-settings-CsAFNTfd.js";import"./labeled-switch-BgeUIb4I.js";import"./locked-polygon-settings-2I91X3B9.js";import"./locked-vector-settings-sIBGqgnk.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
