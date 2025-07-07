import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-fUEXi0re.js";import{L as s}from"./locked-figures-section-CqmIMDAu.js";import{g as u}from"./util-CGoQxivr.js";import"./heading-D79Qv17Y.js";import"./toggleable-caret-DBQDNPyQ.js";import"./color-select-B7QP3UMD.js";import"./Popper-CM_zqNf8.js";import"./locked-ellipse-settings-6xPNzxye.js";import"./item-version-DOxEkpQr.js";import"./article-renderer-6DecqqJL.js";import"./server-item-renderer-C9k6fabb.js";import"./hints-renderer-DbnyAC28.js";import"./components-DKKKr1Z9.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-QDcrfemU.js";import"./locked-label-settings-Coy7R8en.js";import"./trash-bold-D6_Q64QE.js";import"./line-stroke-select-MHC5-s2h.js";import"./line-weight-select-DFFYofUA.js";import"./locked-figure-aria-x0z2SrV0.js";import"./locked-function-settings-B-bnh3EX.js";import"./line-swatch-Dpxx5fpI.js";import"./locked-line-settings-C6cNCW5C.js";import"./locked-point-settings-BXZepLNQ.js";import"./labeled-switch-DYdBkrQe.js";import"./locked-polygon-settings-DIQacP7t.js";import"./locked-vector-settings-DfnTFAc2.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
