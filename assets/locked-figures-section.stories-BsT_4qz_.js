import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-BrZki5aV.js";import{L as s}from"./locked-figures-section-BKHxE7xj.js";import{g as u}from"./util-D3bF6ycH.js";import"./heading-C3ommlNE.js";import"./toggleable-caret--dRH_Me5.js";import"./color-select-C8WhaQ1B.js";import"./Popper-DabCz0PI.js";import"./locked-ellipse-settings-CNJKibaC.js";import"./item-version-CZs_lB4_.js";import"./article-renderer-DluLuKbE.js";import"./server-item-renderer-DQT5DUvS.js";import"./hints-renderer-BIjefl_K.js";import"./components-CkzJH8Q9.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-DKPOyT2t.js";import"./locked-label-settings-DCDEiNAK.js";import"./trash-bold-BNSzINQh.js";import"./line-stroke-select-dNppHcxV.js";import"./line-weight-select-gV90JqXx.js";import"./locked-figure-aria-4DYBVJsn.js";import"./locked-function-settings-B25VeWrA.js";import"./line-swatch-apgWy0aW.js";import"./locked-line-settings-KljKSiqR.js";import"./locked-point-settings-DHgOonGP.js";import"./labeled-switch-DVvuYrTK.js";import"./locked-polygon-settings-CfiGYnsM.js";import"./locked-vector-settings-CsLJJSge.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
