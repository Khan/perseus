import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-BT7dGlf3.js";import{L as s}from"./locked-figures-section-QT53dQBK.js";import{g as u}from"./util-BJTB277V.js";import"./heading-CsCX1IZA.js";import"./toggleable-caret-CFxdiSLs.js";import"./color-select-DRRaiwiQ.js";import"./Popper-F_i5sdBw.js";import"./locked-ellipse-settings-DwC16PE2.js";import"./item-version-C7889Hsx.js";import"./article-renderer-5bctE__9.js";import"./server-item-renderer-DYK2JkIt.js";import"./hints-renderer-Btvs3bhD.js";import"./components-CvRtWeXJ.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-B56gXjlz.js";import"./locked-label-settings-B7Om3HIv.js";import"./trash-bold-D5Oq8RhI.js";import"./line-stroke-select-CIZB_Rk4.js";import"./line-weight-select-CkGBT0Md.js";import"./locked-figure-aria-Ck5UQsWS.js";import"./locked-function-settings-ByyPVCYQ.js";import"./line-swatch-ChHwULG1.js";import"./locked-line-settings-E1lphBQG.js";import"./locked-point-settings-CI2tCH_L.js";import"./labeled-switch-DuPDZMBJ.js";import"./locked-polygon-settings-Cbjzug6s.js";import"./locked-vector-settings-Dk_lgZZE.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
