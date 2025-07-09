import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-CDICB6G3.js";import{L as s}from"./locked-figures-section-BUqyEtiA.js";import{g as u}from"./util-C2hgOE3_.js";import"./heading-Ds3pKX9j.js";import"./toggleable-caret-hRBkWCSY.js";import"./color-select-CleryZGZ.js";import"./Popper-Bs07-cRs.js";import"./locked-ellipse-settings-w5F8oscz.js";import"./item-version-RjIY43mf.js";import"./article-renderer-C2HkK7E8.js";import"./server-item-renderer-DFw71DzG.js";import"./hints-renderer-BYV49TfX.js";import"./components-Dh66qsYN.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-yzZCaBCL.js";import"./locked-label-settings-BwEVHR65.js";import"./trash-bold-Pss1fL4h.js";import"./line-stroke-select-Tz_KmVEk.js";import"./line-weight-select-jecTt4lF.js";import"./locked-figure-aria-WdX5a7jH.js";import"./locked-function-settings-CbgZNEhs.js";import"./line-swatch-S5H7OX8N.js";import"./locked-line-settings-CL4B89Wg.js";import"./locked-point-settings-CQa9gKMe.js";import"./labeled-switch-B_AfHY_Q.js";import"./locked-polygon-settings-CPHyLyTd.js";import"./locked-vector-settings-C3usp4ff.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(P=(x=t.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};const oe=["Default","Controlled","WithProdWidth"];export{r as Controlled,e as Default,t as WithProdWidth,oe as __namedExportsOrder,te as default};
