import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-tEFC830a.js";import{L as s}from"./locked-figures-section-C19yYo_i.js";import{g as u}from"./util-DOYqah_z.js";import"./heading-CtdOiPh9.js";import"./toggleable-caret-BcFJSagT.js";import"./color-select-CvzOjvze.js";import"./Popper-lHh3WoTY.js";import"./locked-ellipse-settings-SrNuN3CX.js";import"./item-version-eHqMuAxM.js";import"./article-renderer-DxNUbkng.js";import"./server-item-renderer-Dsot-jEX.js";import"./hints-renderer-B-HVvaIf.js";import"./components-DYB2Jg9i.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-B_ejFlaG.js";import"./locked-label-settings-DV4eKpj3.js";import"./trash-bold-DZzteOGU.js";import"./line-stroke-select-4LcGVrFp.js";import"./line-weight-select-B46dr1C1.js";import"./locked-figure-aria-CxDsQfTf.js";import"./locked-function-settings-yl-OlnLX.js";import"./line-swatch-CPY7Uq6g.js";import"./locked-line-settings-5n4EGd_f.js";import"./locked-point-settings-IN80pU7l.js";import"./labeled-switch-ByXxsCec.js";import"./locked-polygon-settings-B0mBqf5m.js";import"./locked-vector-settings-xmjWAqO2.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
