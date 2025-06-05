import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-Df1l_qdN.js";import{L as s}from"./locked-figures-section-RY736MJo.js";import{g as u}from"./util-v0xq8fOo.js";import"./heading-CMOT-Oya.js";import"./toggleable-caret-Cf92G3WI.js";import"./color-select-Do5_PlVz.js";import"./Popper-D68LALif.js";import"./locked-ellipse-settings-UZuxz1nD.js";import"./item-version-n2dIChhg.js";import"./article-renderer-DUFs70BB.js";import"./server-item-renderer-a7Aw--JL.js";import"./hints-renderer-D3j6BERN.js";import"./components-BXvGFzmc.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-C2i4TLpi.js";import"./locked-label-settings-BnIatLc3.js";import"./trash-bold-DWZJ7XkV.js";import"./line-stroke-select-Dh5WI0RA.js";import"./locked-figure-aria-Epm04XIR.js";import"./locked-function-settings-CVaTWKs0.js";import"./line-swatch-C9mImIo-.js";import"./locked-line-settings-D0Eqs_9B.js";import"./locked-point-settings-COSR2AfL.js";import"./labeled-switch-CmHlPrYt.js";import"./locked-polygon-settings-ZlAtUUr9.js";import"./locked-vector-settings-CoDK_2yA.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
