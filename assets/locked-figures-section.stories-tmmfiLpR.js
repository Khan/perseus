import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-DhYGLGdk.js";import{L as s}from"./locked-figures-section-UG100dyK.js";import{g as u}from"./util-BRk0WVpw.js";import"./heading-4RYOD5ao.js";import"./toggleable-caret-B1j-PB6s.js";import"./color-select-Dq9jCQAs.js";import"./Popper-jQ5tTMby.js";import"./locked-ellipse-settings-6bpCBIiI.js";import"./item-version-aCyemDon.js";import"./article-renderer-DmqwZkiO.js";import"./server-item-renderer-P-lmrzRz.js";import"./hints-renderer-Cf1oFcBH.js";import"./components-CQdW-ezA.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-B4LD_kBv.js";import"./locked-label-settings-Di2IrFV7.js";import"./trash-bold-BDZM3Sb7.js";import"./line-stroke-select-Cm7qUQPp.js";import"./locked-figure-aria-DHwus-9w.js";import"./locked-function-settings-DK9mdH1M.js";import"./line-swatch-5OEkWn7N.js";import"./locked-line-settings-DFXwjZRr.js";import"./locked-point-settings-K4Spr5MZ.js";import"./labeled-switch-D0dQBFuq.js";import"./locked-polygon-settings-CLZiBN_s.js";import"./locked-vector-settings-DQ8XQ2Ua.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
