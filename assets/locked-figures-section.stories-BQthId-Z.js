import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-CTOs5xNT.js";import{L as s}from"./locked-figures-section-B5X8Fo5m.js";import{g as u}from"./util-SDpAv-jP.js";import"./heading-5bHVAc6V.js";import"./toggleable-caret-B969b4-6.js";import"./color-select-Dj6aF5hw.js";import"./Popper-CCxsJDV-.js";import"./locked-ellipse-settings-DG6iiLj_.js";import"./item-version-Cc_SfDGX.js";import"./article-renderer-DhN21r3O.js";import"./server-item-renderer-BDe2OHhV.js";import"./hints-renderer-DgXLEwYt.js";import"./components-DJE46TyK.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-wERWZtL8.js";import"./locked-label-settings-CPlK9InF.js";import"./perseus-editor-accordion-XLuAycyM.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-DWvz4J06.js";import"./locked-figure-aria-DVtYBv8e.js";import"./locked-function-settings-CTmou3-F.js";import"./line-swatch-DntDs-_C.js";import"./locked-line-settings-C2CV80su.js";import"./locked-point-settings-CyB5mzas.js";import"./labeled-switch-CirbpeVz.js";import"./locked-polygon-settings-Bao61V1i.js";import"./locked-vector-settings-Dnei8i9f.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
