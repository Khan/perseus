import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-rTh-qpeb.js";import{L as s}from"./locked-figures-section-DdhQ0kzB.js";import{g as u}from"./util-DjjtM5U6.js";import"./heading-riR7FstB.js";import"./toggleable-caret-BNjvLEqZ.js";import"./color-select-ZLI54ust.js";import"./Popper-BPNXaN-S.js";import"./locked-ellipse-settings-ZMKmd0G1.js";import"./item-version-BoPwVzYW.js";import"./article-renderer-BMePpXSB.js";import"./server-item-renderer-CMOhgjPp.js";import"./hints-renderer-Ced41RaC.js";import"./components-xEihcWtl.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CW8TMcoB.js";import"./locked-label-settings-Cv_EQp5n.js";import"./trash-bold-CFPyNgOF.js";import"./line-stroke-select-BAw8Ybd0.js";import"./locked-figure-aria-BxXAeiIZ.js";import"./locked-function-settings-_s4kHVZr.js";import"./line-swatch-HtsxTl2t.js";import"./locked-line-settings-CVip7JuM.js";import"./locked-point-settings-w9rhbGF3.js";import"./labeled-switch-B1FkQnSY.js";import"./locked-polygon-settings-CK8slwhq.js";import"./locked-vector-settings-B3ckyeix.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
