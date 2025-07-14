import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-UKFlrubJ.js";import{L as s}from"./locked-figures-section-l7_OwjU-.js";import{g as u}from"./util-CPyI0Cd4.js";import"./heading-CUPRy0FH.js";import"./toggleable-caret-DPLA7cPa.js";import"./color-select-TWunj21a.js";import"./Popper-lX8H-Sow.js";import"./locked-ellipse-settings-D0O0Js6N.js";import"./item-version-DsSHwW-f.js";import"./article-renderer-Dnf1WoEY.js";import"./server-item-renderer-Bw0y83Z9.js";import"./hints-renderer-A5pw74Cg.js";import"./components-Db1Gg-Ik.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-5mWAIYps.js";import"./locked-label-settings-U9yGjtyp.js";import"./trash-bold-DFoW-t4p.js";import"./line-stroke-select-kOrlu0__.js";import"./line-weight-select-DNiWP4wy.js";import"./locked-figure-aria-Ctiqr5wR.js";import"./locked-function-settings-MmWose6g.js";import"./line-swatch-Bdx8CXpm.js";import"./locked-line-settings-B1e_9632.js";import"./locked-point-settings-DPqyjs87.js";import"./labeled-switch-BANmlvi_.js";import"./locked-polygon-settings-B_0qtRxo.js";import"./locked-vector-settings-Cii0kG2T.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
