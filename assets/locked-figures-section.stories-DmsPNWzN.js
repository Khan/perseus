import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-C_FVBbyS.js";import{L as s}from"./locked-figures-section-BiMIFQD5.js";import{g as u}from"./util-D5YmjnLD.js";import"./heading-6Fyy0Ud1.js";import"./toggleable-caret-uYLhJBkC.js";import"./color-select-D7CnjrnU.js";import"./Popper-B75AFG2E.js";import"./locked-ellipse-settings-BKx5caJG.js";import"./item-version-Dg33Ll3Y.js";import"./article-renderer-DaKBJR0u.js";import"./server-item-renderer-BY7itV5_.js";import"./hints-renderer-BBvEvVOB.js";import"./components-CxTrYglq.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-Bh3Kyziq.js";import"./locked-label-settings-4UK0K7-x.js";import"./perseus-editor-accordion-BxZTU1MM.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-BOcFpz1T.js";import"./line-weight-select-Ct-1Whqg.js";import"./locked-figure-aria-BEZSJSoI.js";import"./locked-function-settings-QZaHlQiV.js";import"./line-swatch-CIkfAWQI.js";import"./locked-line-settings-DX5Yi11U.js";import"./locked-point-settings-Ctmf3gZd.js";import"./labeled-switch-4FqSKfWI.js";import"./locked-polygon-settings-CeduTbsJ.js";import"./locked-vector-settings-kYmSKH7S.js";const oe={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
