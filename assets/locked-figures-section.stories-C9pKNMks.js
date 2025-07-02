import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-D3VzT3LL.js";import{L as s}from"./locked-figures-section-UeO4_pGX.js";import{g as u}from"./util-BqQaeTdh.js";import"./heading-BysWKNzT.js";import"./toggleable-caret-CcWTVfgu.js";import"./color-select-fF9B68dj.js";import"./Popper-BINN5MFU.js";import"./locked-ellipse-settings-2uxhlZ0d.js";import"./item-version-m_0hhLH7.js";import"./article-renderer-CT6n8g1l.js";import"./server-item-renderer-TtIqDjpg.js";import"./hints-renderer-C7KhoaEn.js";import"./components-DRJn21hJ.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-Xh5HxFDA.js";import"./locked-label-settings-BUQcaqGP.js";import"./trash-bold-BVYeKEKD.js";import"./line-stroke-select-JKM01Ujq.js";import"./locked-figure-aria-BUFjaQOM.js";import"./locked-function-settings-zti7lYgy.js";import"./line-swatch-DVjpz481.js";import"./locked-line-settings-B9SuCdY4.js";import"./locked-point-settings-DYC2PvzW.js";import"./labeled-switch-Bf0lvwtt.js";import"./locked-polygon-settings-BQ4bB-Xe.js";import"./locked-vector-settings-Cu8RS0Zd.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
