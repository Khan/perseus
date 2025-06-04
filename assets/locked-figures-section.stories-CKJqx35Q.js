import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-CTGSzrNH.js";import{L as s}from"./locked-figures-section-G4XU04cQ.js";import{g as u}from"./util-C9DwK49w.js";import"./heading-ByNJiuzm.js";import"./toggleable-caret-DCPtMmYb.js";import"./color-select-B_Vw5xlX.js";import"./Popper-RYu6c3xB.js";import"./locked-ellipse-settings-CMXZKibI.js";import"./item-version-BsSM4L11.js";import"./article-renderer-BA1u0GL-.js";import"./server-item-renderer-5SrB5Xy-.js";import"./hints-renderer-DPlBwx24.js";import"./components-bjs_Jbog.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CYjEuSuP.js";import"./locked-label-settings-CaelBZJW.js";import"./trash-bold-c-akrhsS.js";import"./line-stroke-select-CLCHQF7o.js";import"./locked-figure-aria-DA36Dn4i.js";import"./locked-function-settings-BGab0sj2.js";import"./line-swatch-CCPDgrwm.js";import"./locked-line-settings-GHlqIisr.js";import"./locked-point-settings-BIZ3V85Y.js";import"./labeled-switch-D9e-Q2_x.js";import"./locked-polygon-settings-f5B-T-XR.js";import"./locked-vector-settings-DPhb7HC2.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
