import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-CFgdDBZ0.js";import{L as s}from"./locked-figures-section-Bvl4OzGE.js";import{g as u}from"./util-DGgsS3rj.js";import"./heading-C2QkgtWi.js";import"./toggleable-caret-4s52dE5l.js";import"./color-select-mhrIWUMy.js";import"./Popper-RzlI5AGI.js";import"./locked-ellipse-settings-Bh68K4SZ.js";import"./item-version-Cbo_E6qa.js";import"./article-renderer-C177145R.js";import"./server-item-renderer-C8TvH69k.js";import"./hints-renderer-C0YRMi4r.js";import"./components-qkQE1Gjs.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-Bz2JITFT.js";import"./locked-label-settings-UFG0Yv6e.js";import"./trash-bold-DQmEOG2F.js";import"./line-stroke-select-Bo7UPC9F.js";import"./locked-figure-aria-CuhFMhFA.js";import"./locked-function-settings-Tg4AxZkg.js";import"./line-swatch-CRTY19mr.js";import"./locked-line-settings-DyWeW6sl.js";import"./locked-point-settings-BtGPUiQH.js";import"./labeled-switch-CmIJnGxQ.js";import"./locked-polygon-settings-1duUcZhQ.js";import"./locked-vector-settings-BjaUH9il.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
