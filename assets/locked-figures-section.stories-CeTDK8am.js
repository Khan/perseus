import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-CFuaP2rl.js";import{L as s}from"./locked-figures-section-BOk2w9Dk.js";import{g as u}from"./util-DDTZEnTo.js";import"./heading-juP4fx5V.js";import"./toggleable-caret-CRLxdhyi.js";import"./color-select-BWVyLB5v.js";import"./Popper-Qbe8fQC5.js";import"./locked-ellipse-settings-DRUk0_OR.js";import"./item-version-dbi47DrE.js";import"./article-renderer-CWbQ3RaI.js";import"./server-item-renderer-W-hRuRM8.js";import"./hints-renderer-Cq53Ebn7.js";import"./components-DpoOYy7y.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CPmighY0.js";import"./locked-label-settings-B-3wqLqn.js";import"./trash-bold-C9Txfyrj.js";import"./line-stroke-select-ClGJ3YTb.js";import"./line-weight-select-_5ACBSVD.js";import"./locked-figure-aria-vxoXcOq6.js";import"./locked-function-settings-BWydfy9-.js";import"./line-swatch-CascVpyn.js";import"./locked-line-settings-DIlM9L_p.js";import"./locked-point-settings-BSML9zQg.js";import"./labeled-switch-CveO_yVA.js";import"./locked-polygon-settings-DvaRuJ2c.js";import"./locked-vector-settings-DwTV_fmr.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
