import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-DtbX7KBe.js";import{L as s}from"./locked-figures-section-CGpd9bzA.js";import{g as u}from"./util-Bj2ekDMv.js";import"./heading-CUIhAKtf.js";import"./toggleable-caret-BhpQX-a5.js";import"./color-select-D306VRiY.js";import"./Popper-CMu4EmI3.js";import"./locked-ellipse-settings-Wh6KciVw.js";import"./item-version-BEL4jV8Z.js";import"./article-renderer-Dl2x5ihV.js";import"./server-item-renderer-BExEo_fl.js";import"./hints-renderer-BGyx14Rl.js";import"./components-dXgi6rqD.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-ENd4KcRs.js";import"./locked-label-settings-leiLgfZ2.js";import"./perseus-editor-accordion-Ds6n-yl4.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-DUSU6RPC.js";import"./line-weight-select-C700oXJx.js";import"./locked-figure-aria-BXlQV6_G.js";import"./locked-function-settings-DDWGdzYH.js";import"./line-swatch-DQ8DdR61.js";import"./locked-line-settings-C0L3ADRm.js";import"./locked-point-settings-BQs0gdeJ.js";import"./labeled-switch-WaSQphHV.js";import"./locked-polygon-settings-Bgoe1x7z.js";import"./locked-vector-settings-NppM9TWf.js";const oe={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(P=(x=t.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};const se=["Default","Controlled","WithProdWidth"];export{r as Controlled,e as Default,t as WithProdWidth,se as __namedExportsOrder,oe as default};
