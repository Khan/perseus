import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-B7rrjhX-.js";import{L as s}from"./locked-figures-section-DnMXAiSZ.js";import{g as u}from"./util-DpBZvdzG.js";import"./heading-Bd-IZBo_.js";import"./toggleable-caret-BpIVJqTO.js";import"./color-select-rH8ph09C.js";import"./Popper-BIyp_Cbc.js";import"./locked-ellipse-settings-Dmhx5y3T.js";import"./item-version-C71bDQee.js";import"./article-renderer-CKpNj7Wm.js";import"./server-item-renderer-CzC3QTOf.js";import"./hints-renderer-B1JL43nH.js";import"./components-Dr_1lztj.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-DbOJ7h5p.js";import"./locked-label-settings-BK3uwQNs.js";import"./perseus-editor-accordion-CN6XVc66.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-DtYh1ZyJ.js";import"./line-weight-select-Dy0ziK87.js";import"./locked-figure-aria-BnZcOiY1.js";import"./locked-function-settings-CagGTrka.js";import"./line-swatch-BYnZZCki.js";import"./locked-line-settings-CRIapeIF.js";import"./locked-point-settings-GmclWHrC.js";import"./labeled-switch-3rtrXmxF.js";import"./locked-polygon-settings-HS3-tLTF.js";import"./locked-vector-settings-BE-ykiZt.js";const oe={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(P=(x=t.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};const se=["Default","Controlled","WithProdWidth"];export{r as Controlled,e as Default,t as WithProdWidth,se as __namedExportsOrder,oe as default};
