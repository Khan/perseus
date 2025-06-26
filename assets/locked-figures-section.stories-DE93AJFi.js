import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-Oo-GQJqP.js";import{L as s}from"./locked-figures-section-smlgpT_W.js";import{g as u}from"./util-DNCTHf5V.js";import"./heading-CyX26RGU.js";import"./toggleable-caret-Cdx6rZJ2.js";import"./color-select-Bo66qpBQ.js";import"./Popper-CO3y_-vH.js";import"./locked-ellipse-settings-CrFpHhih.js";import"./item-version-BT0M_TQO.js";import"./article-renderer-CbFZ1AVI.js";import"./server-item-renderer-JT-oBpKQ.js";import"./hints-renderer-DVunkuAj.js";import"./components-R-BMGwjI.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-nVVbuiMx.js";import"./locked-label-settings-Dx2grI4a.js";import"./trash-bold-D7huKe_N.js";import"./line-stroke-select-2BfDZABu.js";import"./locked-figure-aria-TgWQ4miM.js";import"./locked-function-settings-CPehXeQ6.js";import"./line-swatch-BKCG3M_O.js";import"./locked-line-settings-BivuhmX_.js";import"./locked-point-settings-DxZyomC_.js";import"./labeled-switch-OtnITxvl.js";import"./locked-polygon-settings-TXNezX_1.js";import"./locked-vector-settings-BQc4BxPc.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
