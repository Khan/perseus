import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-Bhupwh5w.js";import{L as s}from"./locked-figures-section-B_3jSUO6.js";import{g as u}from"./util-CrHNlbRq.js";import"./heading-QAIlcDVb.js";import"./toggleable-caret-DkN-dMzj.js";import"./color-select-BY5hSW6z.js";import"./Popper-jfYSIreo.js";import"./locked-ellipse-settings-CV8s95WG.js";import"./item-version-BvnWmnrc.js";import"./article-renderer-BOD8X9FD.js";import"./server-item-renderer-B4bVe63V.js";import"./hints-renderer-BRXn_qM1.js";import"./components-CTVSIdpE.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CzO1RTfR.js";import"./locked-label-settings-upXbDCQt.js";import"./trash-bold-BCH5dp9w.js";import"./line-stroke-select-BLhijXgP.js";import"./locked-figure-aria-DBme-zk4.js";import"./locked-function-settings-CtjvI7RX.js";import"./line-swatch-C7zGSE1Q.js";import"./locked-line-settings-Cto846ZH.js";import"./locked-point-settings-Cby0M-k0.js";import"./labeled-switch-MOY2Lort.js";import"./locked-polygon-settings-BVWDdurX.js";import"./locked-vector-settings-DtMk7jkO.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
