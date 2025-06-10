import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-B7jCOty_.js";import{L as s}from"./locked-figures-section-N1T3Jn9-.js";import{g as u}from"./util-0icrRHBP.js";import"./heading-a2CEOSMP.js";import"./toggleable-caret-es7niPTO.js";import"./color-select-DiYttdaI.js";import"./Popper-MSVxpL3K.js";import"./locked-ellipse-settings-ie-t1-cn.js";import"./item-version-0aj83p6L.js";import"./article-renderer-rVLmfG8X.js";import"./server-item-renderer-DsVgY6_U.js";import"./hints-renderer-CEDzZJBN.js";import"./components-DOungNYC.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-C0mYEJt4.js";import"./locked-label-settings-DGu1IJNB.js";import"./trash-bold-C7MUjCib.js";import"./line-stroke-select-CdUcdpE8.js";import"./locked-figure-aria-RRUk1hsX.js";import"./locked-function-settings-DrzW3xS-.js";import"./line-swatch-D5l0a2EV.js";import"./locked-line-settings-BLSi5tPM.js";import"./locked-point-settings-CfOpNlyO.js";import"./labeled-switch-Bjvzwaf3.js";import"./locked-polygon-settings-B2lqxd9U.js";import"./locked-vector-settings-BjI_Ri_b.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
