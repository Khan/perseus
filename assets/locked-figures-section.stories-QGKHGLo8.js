import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-oVdCiwLc.js";import{L as s}from"./locked-figures-section-CwHc0KyB.js";import{g as u}from"./util-DKG8wQoS.js";import"./heading-BjpdwqK_.js";import"./toggleable-caret-YYbn8vgR.js";import"./color-select-CtVpOXsy.js";import"./Popper-CVgS00Y6.js";import"./locked-ellipse-settings-CqqmzdEa.js";import"./item-version-DOq5lPyi.js";import"./article-renderer-BghgEmMn.js";import"./server-item-renderer-B19zWJQi.js";import"./hints-renderer-JZ7chtEs.js";import"./components-Xo-rMjfd.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-DjivOxeE.js";import"./locked-label-settings-C6MT0prM.js";import"./trash-bold-CGZ-cXVd.js";import"./line-stroke-select-Dru8Hikp.js";import"./line-weight-select-CSKwZ6CJ.js";import"./locked-figure-aria-BalhOl75.js";import"./locked-function-settings-BebRpkdA.js";import"./line-swatch-Bov0nPD6.js";import"./locked-line-settings-nGTOQoH8.js";import"./locked-point-settings-DlgCWgs2.js";import"./labeled-switch-DDDgPoho.js";import"./locked-polygon-settings-DpwxYpMd.js";import"./locked-vector-settings-CGA6NEFL.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
