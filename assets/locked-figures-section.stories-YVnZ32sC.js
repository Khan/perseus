import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-97DLHr7_.js";import{L as s}from"./locked-figures-section-CveNWorL.js";import{g as u}from"./util-oMHdU0ja.js";import"./heading-CmGfDdcu.js";import"./toggleable-caret-Bq4QZNTc.js";import"./color-select-Bbj_MZWy.js";import"./Popper-BJ5IysKc.js";import"./locked-ellipse-settings-Boc2URz8.js";import"./item-version-B7NSTz3N.js";import"./article-renderer-BeLDF-1h.js";import"./server-item-renderer-D_pEvYK6.js";import"./hints-renderer-DipfMXxv.js";import"./components-Coe1cn55.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-DCqDld5i.js";import"./locked-label-settings-D7PRFWNd.js";import"./trash-bold-BL8qeOU5.js";import"./line-stroke-select-DXUk1FTN.js";import"./locked-figure-aria-D0_uxw2y.js";import"./locked-function-settings-DZlbZh8g.js";import"./line-swatch-BTpkqxp7.js";import"./locked-line-settings-Dx4OyHcp.js";import"./locked-point-settings-Ba2BIb4q.js";import"./labeled-switch-Bb-AHqfg.js";import"./locked-polygon-settings-RtkBxh8O.js";import"./locked-vector-settings-XQtBIKtN.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
