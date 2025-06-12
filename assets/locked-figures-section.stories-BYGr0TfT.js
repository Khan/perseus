import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-B-MePfAZ.js";import{L as s}from"./locked-figures-section-CHLzVDXl.js";import{g as u}from"./util-unHKDo6q.js";import"./heading-DqeM3XAm.js";import"./toggleable-caret-Jz2bDP8K.js";import"./color-select-CUk3VHIj.js";import"./Popper-DrInZW2l.js";import"./locked-ellipse-settings-D5VaJFTr.js";import"./item-version-D1pH_PC-.js";import"./article-renderer-y4x7JTXv.js";import"./server-item-renderer-DZvNOm3a.js";import"./hints-renderer-8p3yRY3p.js";import"./components-DBVJyJl-.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CKKP3FTA.js";import"./locked-label-settings-DUhS3OdR.js";import"./trash-bold-B79vkR1V.js";import"./line-stroke-select-BP1s05xB.js";import"./locked-figure-aria-D4ikBPZd.js";import"./locked-function-settings-OI10KUwo.js";import"./line-swatch-Dtm1fvLo.js";import"./locked-line-settings-DAxKFO1t.js";import"./locked-point-settings-Dl0KBdt8.js";import"./labeled-switch-CWtU1C4F.js";import"./locked-polygon-settings-C3VR9dhH.js";import"./locked-vector-settings-iFwnVIaj.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
