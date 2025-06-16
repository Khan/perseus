import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-2g4VQTYH.js";import{L as s}from"./locked-figures-section-DdR9V0Cb.js";import{g as u}from"./util-B2DTO1is.js";import"./heading-CNSMZpjp.js";import"./toggleable-caret-Ci5tFpiQ.js";import"./color-select-BAY9bjzo.js";import"./Popper-Dw-YncXa.js";import"./locked-ellipse-settings-Cs-1dwRj.js";import"./item-version-BJeOYaNJ.js";import"./article-renderer-DrqxFyKt.js";import"./server-item-renderer-CeFddfkI.js";import"./hints-renderer-B15MfxEL.js";import"./components-Dw4odbRc.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CBCI2Rrr.js";import"./locked-label-settings-BXQTDNpJ.js";import"./trash-bold-BPEssxMr.js";import"./line-stroke-select-CiaDu7Ic.js";import"./locked-figure-aria-CYDIGRDZ.js";import"./locked-function-settings-Mk1C3Kkc.js";import"./line-swatch-BWcUvxRe.js";import"./locked-line-settings-BOj7JG8N.js";import"./locked-point-settings-DIkXAgK2.js";import"./labeled-switch-B3xTOLnw.js";import"./locked-polygon-settings-BzUmK2-Z.js";import"./locked-vector-settings-DImK8g_H.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
