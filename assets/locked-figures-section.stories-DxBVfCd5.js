import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-CvVOl_wM.js";import{L as s}from"./locked-figures-section-VoRYrzNa.js";import{g as u}from"./util-B4a-q7sG.js";import"./heading-B0GVhEW2.js";import"./toggleable-caret-CoiMk4BN.js";import"./color-select-DR8bHOOP.js";import"./Popper-BXFGUwWp.js";import"./locked-ellipse-settings-DaVfBeWm.js";import"./item-version-CM-vdOGJ.js";import"./article-renderer-ifo9MFST.js";import"./server-item-renderer-BWrjrsdx.js";import"./hints-renderer-vP4aZU-y.js";import"./components-v5t4oZhn.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-Bu6NCVBV.js";import"./locked-label-settings-D9Za8aYj.js";import"./trash-bold-rI1QN0T5.js";import"./line-stroke-select-D0k0wPGq.js";import"./locked-figure-aria-DplTfXtS.js";import"./locked-function-settings-_mMHyQIG.js";import"./line-swatch-B6aoiWSV.js";import"./locked-line-settings-DnWqJw17.js";import"./locked-point-settings-D4LDCX5f.js";import"./labeled-switch-UIHuEqCp.js";import"./locked-polygon-settings-BKvOI_33.js";import"./locked-vector-settings-DD8F39Nv.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
