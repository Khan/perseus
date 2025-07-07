import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-8K8iPrpx.js";import{L as s}from"./locked-figures-section-B_wsAgoi.js";import{g as u}from"./util-Db-GkxCq.js";import"./heading-DrDZst5C.js";import"./toggleable-caret-m_JH6YZ5.js";import"./color-select-C0km1Y9B.js";import"./Popper-hPDgkMc9.js";import"./locked-ellipse-settings-BSrscMpg.js";import"./item-version-FZDypMGe.js";import"./article-renderer-CR1fMGzP.js";import"./server-item-renderer-KPt9k4Nr.js";import"./hints-renderer-1O0YE-j9.js";import"./components-B9E5XdeO.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-0vBP349P.js";import"./locked-label-settings-BybDvbi_.js";import"./trash-bold-D694LOwc.js";import"./line-stroke-select-CSgjJZG8.js";import"./line-weight-select-BF8rCezy.js";import"./locked-figure-aria-BKhuoMhS.js";import"./locked-function-settings-DxzlmQTQ.js";import"./line-swatch-Dmh6rfEs.js";import"./locked-line-settings-BanRpHwE.js";import"./locked-point-settings-D5dLSWtN.js";import"./labeled-switch-CU5ryvh5.js";import"./locked-polygon-settings-DOQjRatq.js";import"./locked-vector-settings-p_dQ5_Sf.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
