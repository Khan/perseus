import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-DNbQgjGT.js";import{L as s}from"./locked-figures-section-STaurz6w.js";import{g as u}from"./util-oQyb-f4h.js";import"./heading-Dz-mBSNl.js";import"./toggleable-caret-DkIB0fYY.js";import"./color-select-2hjirrCw.js";import"./Popper-DUrDoNvt.js";import"./locked-ellipse-settings-B6mDVGr_.js";import"./item-version-BiARHrCi.js";import"./article-renderer-E8oLjVIL.js";import"./server-item-renderer-DT6HFeiY.js";import"./hints-renderer-DRWGABRz.js";import"./components-CGVS3hVu.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-aTts9tEH.js";import"./locked-label-settings-B6HjpmLH.js";import"./trash-bold-DV2DLnq_.js";import"./line-stroke-select-CaxWSCYy.js";import"./locked-figure-aria-Bs0LHmQW.js";import"./locked-function-settings-BQMWWSbN.js";import"./line-swatch-B1RmQghm.js";import"./locked-line-settings-CcbYebo9.js";import"./locked-point-settings-6_It75v-.js";import"./labeled-switch-49CHyqIx.js";import"./locked-polygon-settings-CcBmaVmp.js";import"./locked-vector-settings-D9f_zCBC.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
