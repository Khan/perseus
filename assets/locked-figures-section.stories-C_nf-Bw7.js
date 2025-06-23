import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-AqpKHAY9.js";import{L as s}from"./locked-figures-section-RZ55f2WZ.js";import{g as u}from"./util-ClB3_ScO.js";import"./heading-DXAMLT5x.js";import"./toggleable-caret-Dm3_NyAl.js";import"./color-select-MR3llq9r.js";import"./Popper-1Z0P4ALo.js";import"./locked-ellipse-settings-BUSXOvrb.js";import"./item-version-B8Toki3N.js";import"./article-renderer-CMSUfeiO.js";import"./server-item-renderer-BJjmxO8L.js";import"./hints-renderer-BTjqbEcf.js";import"./components-B4KlTTTG.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CEqWsi5k.js";import"./locked-label-settings-DyGpqt7a.js";import"./perseus-editor-accordion-BNn5RI9j.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-DPZWkXCk.js";import"./locked-figure-aria-Cv1mfy-e.js";import"./locked-function-settings-B_LmJBhr.js";import"./line-swatch-BCp0Lzna.js";import"./locked-line-settings-FnEyip1a.js";import"./locked-point-settings-vt6XeiJ0.js";import"./labeled-switch-DaKhQMcD.js";import"./locked-polygon-settings-B_xzHcfP.js";import"./locked-vector-settings-DoTHQlet.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
