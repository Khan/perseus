import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-BGwaWJut.js";import{L as s}from"./locked-figures-section-Dq9mTtyD.js";import{g as u}from"./util-BWylIJC3.js";import"./heading-Dqn5b5gU.js";import"./toggleable-caret-BEvCiUC8.js";import"./color-select-BaW2XMCt.js";import"./Popper-CLUC9pHF.js";import"./locked-ellipse-settings-BFl5Nfk2.js";import"./item-version-CPsKRKIp.js";import"./article-renderer-DYIe-t54.js";import"./server-item-renderer-C9rE-tAG.js";import"./hints-renderer-DFM3F4Tx.js";import"./components-Bji0qxmY.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-C9nyfk9m.js";import"./locked-label-settings-BRDon7mi.js";import"./trash-bold-GTBLaCgY.js";import"./line-stroke-select-ZI0HPcLq.js";import"./line-weight-select-Cz9w8qCF.js";import"./locked-figure-aria-EHOrVog0.js";import"./locked-function-settings-Bt6-tbm_.js";import"./line-swatch-BaJwOEQ2.js";import"./locked-line-settings-bj4ybmC6.js";import"./locked-point-settings-jnQFOBbn.js";import"./labeled-switch-CQiC_HN7.js";import"./locked-polygon-settings-Djs3IzK3.js";import"./locked-vector-settings-Dl4OpBb4.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
