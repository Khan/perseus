import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-vtNTHGDv.js";import{L as s}from"./locked-figures-section-BG3K8ePu.js";import{g as u}from"./util-CjbfVMCM.js";import"./heading-rsFzD0cV.js";import"./toggleable-caret-5q3XEKFn.js";import"./color-select-xMp51Mzj.js";import"./Popper-DqUqJOM7.js";import"./locked-ellipse-settings-B6ES2yaN.js";import"./item-version-BWxdKDJ6.js";import"./article-renderer-6IuYt5fY.js";import"./server-item-renderer-DTmnVKjc.js";import"./hints-renderer-CKfy0FDV.js";import"./components-DwN7FnWB.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-C02XBNh2.js";import"./locked-label-settings-C1kmmuEe.js";import"./trash-bold-Dnc91Nih.js";import"./line-stroke-select-t57VhVFi.js";import"./locked-figure-aria-CFWSg9Uy.js";import"./locked-function-settings-BUV4vAbq.js";import"./line-swatch-BJRrT8vC.js";import"./locked-line-settings-Bl6TGzYb.js";import"./locked-point-settings-uigXOr2L.js";import"./labeled-switch-BV_x3_qs.js";import"./locked-polygon-settings-Dv7Bia8n.js";import"./locked-vector-settings-BzQfo7nG.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
