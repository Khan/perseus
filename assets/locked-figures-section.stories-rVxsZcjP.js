import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-CHyJX4M4.js";import{L as s}from"./locked-figures-section-CGL2tCgS.js";import{g as u}from"./util-DgoBsP2o.js";import"./heading-CnlmwecP.js";import"./toggleable-caret-Cib9YrlI.js";import"./color-select-DO9YQW7B.js";import"./Popper-BICro7bh.js";import"./locked-ellipse-settings-i4Fv8EcI.js";import"./item-version-BXIllmSv.js";import"./article-renderer-DZh_xXjl.js";import"./server-item-renderer-J5PHmMM-.js";import"./hints-renderer-BSDON6Vl.js";import"./components-CkqhwenY.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-B0H87epB.js";import"./locked-label-settings-DRPZK-mY.js";import"./trash-bold-D4eDHxnb.js";import"./line-stroke-select-4zByI_1A.js";import"./locked-figure-aria-DiO5S3vH.js";import"./locked-function-settings-3iVmGpB8.js";import"./line-swatch-C7kX1awk.js";import"./locked-line-settings-DQsMpWi1.js";import"./locked-point-settings-CHDG-AUQ.js";import"./labeled-switch-B1ZVhQ_W.js";import"./locked-polygon-settings-BreQeU5y.js";import"./locked-vector-settings-CJss9oik.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
