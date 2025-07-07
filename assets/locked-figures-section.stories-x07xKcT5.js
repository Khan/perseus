import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-iAiOm5Ap.js";import{L as s}from"./locked-figures-section-Cr8rLN-h.js";import{g as u}from"./util-yGxPFB_n.js";import"./heading-2hgOZEuI.js";import"./toggleable-caret-mZJGKGBd.js";import"./color-select-CTDtn5_B.js";import"./Popper-Bt_XS3y4.js";import"./locked-ellipse-settings-MyFGeREm.js";import"./item-version-C5i0v7iA.js";import"./article-renderer-p79UJ7Qj.js";import"./server-item-renderer-dGwu8wgv.js";import"./hints-renderer-Brs_fc6P.js";import"./components-CdSEnTNx.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-BrgzPkPA.js";import"./locked-label-settings-CY6O8gkz.js";import"./trash-bold-BGuWDQ7Q.js";import"./line-stroke-select-RIsl9SSu.js";import"./line-weight-select-BJxwmXG1.js";import"./locked-figure-aria-CLcyVw6I.js";import"./locked-function-settings-BYHVSgAp.js";import"./line-swatch-Cn9oZD9h.js";import"./locked-line-settings-C5rS8XS8.js";import"./locked-point-settings-BDqqJGq9.js";import"./labeled-switch-B6qccixh.js";import"./locked-polygon-settings-Mcud45N7.js";import"./locked-vector-settings-YPjc3lhh.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
