import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-C-wjKudE.js";import{L as s}from"./locked-figures-section-CPRmkUMN.js";import{g as u}from"./util-llrT9vA5.js";import"./heading-BCQLsfto.js";import"./toggleable-caret-p13zq2nY.js";import"./color-select-BQfLMAlG.js";import"./Popper-CzCRypv7.js";import"./locked-ellipse-settings-0ZCIZeCI.js";import"./item-version-a7DtHh5j.js";import"./article-renderer-B2JAE8o_.js";import"./server-item-renderer-DbBQSC2v.js";import"./hints-renderer-Dxk8feSH.js";import"./components-Vk11JFRY.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-C3KDqXp5.js";import"./locked-label-settings-Dr-Kty07.js";import"./perseus-editor-accordion-hoHt6nwA.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-CjbrhS0j.js";import"./line-weight-select-4PRs8gwm.js";import"./locked-figure-aria-Dd4TxHDD.js";import"./locked-function-settings-Dx6g5RIE.js";import"./line-swatch-DE7CwASx.js";import"./locked-line-settings-BrqEne5N.js";import"./locked-point-settings-geSabJ92.js";import"./labeled-switch-CNTXkYv7.js";import"./locked-polygon-settings-D0WwRKRV.js";import"./locked-vector-settings-Bmjy4PBT.js";const oe={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
