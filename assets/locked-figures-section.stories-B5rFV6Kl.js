import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-gHPTgJAT.js";import{L as s}from"./locked-figures-section-B_lzwLDf.js";import{g as u}from"./util-DlVOUldk.js";import"./heading-C-UaFYDX.js";import"./toggleable-caret-FnYowP9e.js";import"./color-select-Dh8aaETA.js";import"./Popper-cacjySX8.js";import"./locked-ellipse-settings-9CgcgQoB.js";import"./item-version-BiEcwQw5.js";import"./article-renderer-CJgVKQva.js";import"./server-item-renderer-CKnw9Tcb.js";import"./hints-renderer-pWFvPMC8.js";import"./components-WUX2y3_o.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-BXijIN6q.js";import"./locked-label-settings-Scaahz01.js";import"./trash-bold-BOD_tO_K.js";import"./line-stroke-select-aWYlh_Nv.js";import"./locked-figure-aria-CQS-WfIm.js";import"./locked-function-settings-CZp3Xq9-.js";import"./line-swatch-CNwVtvMF.js";import"./locked-line-settings-Db0BiRGk.js";import"./locked-point-settings-CnVF4FnJ.js";import"./labeled-switch-ClRWyayb.js";import"./locked-polygon-settings-D4GD3ZWo.js";import"./locked-vector-settings-D4CYS0WT.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
