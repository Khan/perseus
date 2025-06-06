import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-BDVJISiT.js";import{L as s}from"./locked-figures-section-k4XC8mNH.js";import{g as u}from"./util-BFVF9o4I.js";import"./heading-CBjodYFy.js";import"./toggleable-caret-I5R8h03X.js";import"./color-select-CPHaHaV9.js";import"./Popper-D6gtNNrd.js";import"./locked-ellipse-settings-BAzZ0V3H.js";import"./item-version-rBwLKTlF.js";import"./article-renderer-BTwqu2s8.js";import"./server-item-renderer-Vgm5yKO_.js";import"./hints-renderer-BpiauPQE.js";import"./components-Cyxr-qtA.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-jBEEntx6.js";import"./locked-label-settings-CvwUphhc.js";import"./trash-bold-Br1SAYQH.js";import"./line-stroke-select-Obg_bq70.js";import"./locked-figure-aria-B5_7h-gu.js";import"./locked-function-settings-CZqTlViL.js";import"./line-swatch-CWxs9vmP.js";import"./locked-line-settings-D3JGC-1C.js";import"./locked-point-settings-BNRRw4IW.js";import"./labeled-switch-BRTsq9tn.js";import"./locked-polygon-settings-DxT5tDnV.js";import"./locked-vector-settings-DMSDDaji.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
