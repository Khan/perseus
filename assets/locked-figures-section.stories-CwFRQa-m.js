import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-Fv9__JIn.js";import{L as s}from"./locked-figures-section-Bwn059-w.js";import{g as u}from"./util-DTnki1AO.js";import"./heading-IrYSvwQL.js";import"./toggleable-caret-wjA8lorm.js";import"./color-select-jDOn1p5o.js";import"./Popper-CbrqrQ01.js";import"./locked-ellipse-settings-BXjcohGf.js";import"./item-version-Bq0Objmq.js";import"./article-renderer-UejcvxLK.js";import"./server-item-renderer-B5MufK4m.js";import"./hints-renderer-KmMPHYF1.js";import"./components-D5IfPqjC.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-C1cCFdIL.js";import"./locked-label-settings-DK-HYlXZ.js";import"./trash-bold-BXOwgqOZ.js";import"./line-stroke-select-DuSL_BD5.js";import"./locked-figure-aria-BVGR8kkY.js";import"./locked-function-settings-Dwb_D8nc.js";import"./line-swatch-DQ_Eq31u.js";import"./locked-line-settings-Ccov66B6.js";import"./line-weight-select-Cqor9uhN.js";import"./locked-point-settings-K_ekoSNo.js";import"./labeled-switch-B1k5rKl3.js";import"./locked-polygon-settings-BPdgU_lx.js";import"./locked-vector-settings-C7lJMm0q.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
