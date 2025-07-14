import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-C-YZwPnJ.js";import{L as s}from"./locked-figures-section-DBuhbXPL.js";import{g as u}from"./util-A4MrrFAC.js";import"./heading-BHkqyD8v.js";import"./toggleable-caret-B7wbmvFn.js";import"./color-select-DW3ntfE2.js";import"./Popper-CXH154Pb.js";import"./locked-ellipse-settings-C2elm4ja.js";import"./item-version-OzlzzROo.js";import"./article-renderer-CmWwmVzJ.js";import"./server-item-renderer-DHiEvEo0.js";import"./hints-renderer-CSsTWbgg.js";import"./components-Bva_OheH.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-C4giiXWl.js";import"./locked-label-settings-CTTx_5Ib.js";import"./trash-bold-BDudMrDq.js";import"./line-stroke-select-DYPNiWkK.js";import"./line-weight-select-BnnK0xFp.js";import"./locked-figure-aria-BfJCw69Z.js";import"./locked-function-settings-BVf0Ayry.js";import"./line-swatch-CPbvusn6.js";import"./locked-line-settings-DtFtkLX4.js";import"./locked-point-settings-9-czYM1g.js";import"./labeled-switch-DGIS2mfZ.js";import"./locked-polygon-settings-BozYejbU.js";import"./locked-vector-settings-IPiG_LkP.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
