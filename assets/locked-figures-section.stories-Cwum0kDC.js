import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-CIFRGchV.js";import{L as s}from"./locked-figures-section-ClhgZZYK.js";import{g as u}from"./util-DinHn52X.js";import"./heading-vdE-ZblU.js";import"./toggleable-caret-CO5EEiwK.js";import"./color-select-D8K0bsbR.js";import"./Popper-DR6QQEUk.js";import"./locked-ellipse-settings-osAN811j.js";import"./item-version-LGKaA1ST.js";import"./article-renderer-B42KUb76.js";import"./server-item-renderer-Cs9PsFu1.js";import"./hints-renderer-GxUEtri3.js";import"./components-DnWpo-Sg.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CaV3jg60.js";import"./locked-label-settings-DGCu5b5U.js";import"./trash-bold-Dhlat321.js";import"./line-stroke-select-DRXovVrk.js";import"./locked-figure-aria-D6OXVxRN.js";import"./locked-function-settings-CP7MJyii.js";import"./line-swatch-BuEAShIg.js";import"./locked-line-settings-Db8TaTvR.js";import"./locked-point-settings-BnjKP6N6.js";import"./labeled-switch-CSWBlz6J.js";import"./locked-polygon-settings-BieihMM5.js";import"./locked-vector-settings-VgZpHFVL.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
