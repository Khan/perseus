import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-dtRUXA0K.js";import{L as s}from"./locked-figures-section-DoYotTrq.js";import{g as u}from"./util-CfvQLB2H.js";import"./heading-COfVQ2wF.js";import"./toggleable-caret-FKh2f3cJ.js";import"./color-select-BzE4WvfI.js";import"./Popper-C2-c6jHx.js";import"./locked-ellipse-settings-ChHN6Ppf.js";import"./item-version-DMJCE50v.js";import"./article-renderer-Byw2HVqp.js";import"./server-item-renderer-qMN3rKYq.js";import"./hints-renderer-vaNkg7zC.js";import"./components-sXKLdkR2.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-D0lIy96v.js";import"./locked-label-settings-DtT-Xtg4.js";import"./trash-bold-jwHsoyvY.js";import"./line-stroke-select-iLpAr8tM.js";import"./line-weight-select-D-rkj1hD.js";import"./locked-figure-aria-Dw1In3RR.js";import"./locked-function-settings-DJU3WB-P.js";import"./line-swatch-Ao22XXhz.js";import"./locked-line-settings-C4KQpR7W.js";import"./locked-point-settings-DIR5ME7l.js";import"./labeled-switch-DhF5QZEX.js";import"./locked-polygon-settings-Dk9DD4Yd.js";import"./locked-vector-settings-CsYKgRQH.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
