import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-C0-lSMGx.js";import{L as s}from"./locked-figures-section-puewLuGT.js";import{g as u}from"./util-CgJKHNIC.js";import"./heading-wUF4X-H3.js";import"./toggleable-caret-9YO25AlX.js";import"./color-select-BPgsHWmK.js";import"./Popper-rOL93a94.js";import"./locked-ellipse-settings-C2UGwawP.js";import"./item-version-CMQ17jd8.js";import"./article-renderer-CuBmqWtm.js";import"./server-item-renderer-DBHmEuGj.js";import"./hints-renderer-BhBsNahl.js";import"./components-BU12cmMr.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-Beibnikl.js";import"./locked-label-settings-D9JKk2gR.js";import"./trash-bold-XSHKwhL_.js";import"./line-stroke-select-DYlFfY7F.js";import"./locked-figure-aria-DOBaW10N.js";import"./locked-function-settings-BVgo1WeV.js";import"./line-swatch-C-xrTZle.js";import"./locked-line-settings-jjjWeF9H.js";import"./locked-point-settings-D-b2VOR7.js";import"./labeled-switch-Xf6BhCt4.js";import"./locked-polygon-settings-DTQPjWVv.js";import"./locked-vector-settings-BqIVsx2R.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
