import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-B_16MRTp.js";import{L as s}from"./locked-figures-section-CTIBI8jX.js";import{g as u}from"./util-8jB5qdwX.js";import"./heading-BE5fl9Ha.js";import"./toggleable-caret-DDqyWnhw.js";import"./color-select-BSL8fz8E.js";import"./Popper-CMBk6tY9.js";import"./locked-ellipse-settings-DmWH0MUs.js";import"./item-version-9W43G8cZ.js";import"./article-renderer-LUbgHaPn.js";import"./server-item-renderer-1LUmkp6m.js";import"./hints-renderer-B-q9yvuG.js";import"./components-CA-pBWcu.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-DUF2EDN8.js";import"./locked-label-settings-D9gsdh3s.js";import"./perseus-editor-accordion-CUKo9tOI.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-Da6T46Zr.js";import"./locked-figure-aria-EX74BjUV.js";import"./locked-function-settings-D3vpoAaf.js";import"./line-swatch-DrIy6YmM.js";import"./locked-line-settings-CUkAfJLC.js";import"./locked-point-settings-DE1D1D7-.js";import"./labeled-switch-D8HPlhqM.js";import"./locked-polygon-settings-TMOUjLKb.js";import"./locked-vector-settings-Dyum1fSo.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
