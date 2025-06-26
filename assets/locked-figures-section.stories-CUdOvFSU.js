import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-D9rAzJ36.js";import{L as s}from"./locked-figures-section-VhDxw_XK.js";import{g as u}from"./util-B1TocK4h.js";import"./heading-DhgFb7l_.js";import"./toggleable-caret-Bx6Fw2qS.js";import"./color-select-pdVYC5o5.js";import"./Popper-DiikopbE.js";import"./locked-ellipse-settings-BpFe7_ul.js";import"./item-version-DHULgNSn.js";import"./article-renderer-D103Rxyu.js";import"./server-item-renderer-DPRFYaNi.js";import"./hints-renderer-BOcngWg2.js";import"./components-Br9t_cqf.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-D63OlmaC.js";import"./locked-label-settings-C_NbDNKf.js";import"./trash-bold-5ai_Guyw.js";import"./line-stroke-select-BclxK8u9.js";import"./locked-figure-aria-8XAkNeHD.js";import"./locked-function-settings-BSLKY1e5.js";import"./line-swatch-DfKWQbw5.js";import"./locked-line-settings-BObIxNz6.js";import"./locked-point-settings-x2jTi6Ez.js";import"./labeled-switch-9qEVPv-0.js";import"./locked-polygon-settings-BwzvvUrX.js";import"./locked-vector-settings-qRj9gFRm.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
