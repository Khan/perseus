import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-DCWh3-Gk.js";import{L as s}from"./locked-figures-section--frAz08n.js";import{g as u}from"./util-DE9sHTJp.js";import"./heading-BwOR8Uj5.js";import"./toggleable-caret-V2pIG45n.js";import"./color-select-j3WTv9KL.js";import"./Popper-BOPsS5hJ.js";import"./locked-ellipse-settings-DbKE4uNW.js";import"./item-version-xCn4KfKi.js";import"./article-renderer-CUBxJhO5.js";import"./server-item-renderer-NjuUIoy7.js";import"./hints-renderer-U5A_Kgj2.js";import"./components-BwjcOWjH.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-C9Z6HyDo.js";import"./locked-label-settings-nt3uwhKw.js";import"./trash-bold-ByhvThuc.js";import"./line-stroke-select-BUJeuVVG.js";import"./locked-figure-aria-DEXq6EY6.js";import"./locked-function-settings-2N49a1am.js";import"./line-swatch-w1hJp8uj.js";import"./locked-line-settings-DK_9s9Jk.js";import"./locked-point-settings-D1wk7mnn.js";import"./labeled-switch-Dzu1YvJ5.js";import"./locked-polygon-settings-Dh4UXUWa.js";import"./locked-vector-settings-cl6YY-d7.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
