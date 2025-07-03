import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-DDS5SomD.js";import{L as s}from"./locked-figures-section-Tcvwhy9v.js";import{g as u}from"./util-D1FA_FJ6.js";import"./heading-CW26vpiV.js";import"./toggleable-caret-B7SIXqxc.js";import"./color-select-DGh29EQo.js";import"./Popper-DY556ZEG.js";import"./locked-ellipse-settings-CZEDXeXk.js";import"./item-version-sYlQ00Hh.js";import"./article-renderer-kfe8qSSt.js";import"./server-item-renderer-OPOrIXJf.js";import"./hints-renderer-tAOY0Yso.js";import"./components-6Tmmsdhc.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-BdrkQ7Fg.js";import"./locked-label-settings-cyQ6PLze.js";import"./trash-bold-CjCUhiBv.js";import"./line-stroke-select-DQnvcSQd.js";import"./locked-figure-aria-DGdDhiyJ.js";import"./locked-function-settings-DPT84udQ.js";import"./line-swatch-5lxr_aAd.js";import"./locked-line-settings-CJvrmJYn.js";import"./locked-point-settings-D0-5uNk6.js";import"./labeled-switch-BfXYfVx1.js";import"./locked-polygon-settings-D_-BAsO8.js";import"./locked-vector-settings-DLfdvAd8.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
