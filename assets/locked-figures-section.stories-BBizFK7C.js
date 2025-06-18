import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-BrZ1H8ZK.js";import{L as s}from"./locked-figures-section-BYxtfvJ6.js";import{g as u}from"./util-BV9IRbPv.js";import"./heading-Dd5mYZzd.js";import"./toggleable-caret-DZEUx8d8.js";import"./color-select-Drqrxf9j.js";import"./Popper-El47U0sO.js";import"./locked-ellipse-settings-Duig0Tr5.js";import"./item-version-DFykEjDa.js";import"./article-renderer-BGqm1xOZ.js";import"./server-item-renderer-BFvp-8bw.js";import"./hints-renderer-CIxBRI6H.js";import"./components-CZOyNMWg.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-1eYC2IET.js";import"./locked-label-settings-DRY8G7F1.js";import"./trash-bold-DfvYDK3y.js";import"./line-stroke-select-CQ7mA6Xk.js";import"./locked-figure-aria-FozlI6ws.js";import"./locked-function-settings-D2Qk7O58.js";import"./line-swatch-BEK_bS3V.js";import"./locked-line-settings-BCPXBDJM.js";import"./locked-point-settings-6NYl--m6.js";import"./labeled-switch-q8D-dq2g.js";import"./locked-polygon-settings-C8nnjHoJ.js";import"./locked-vector-settings-DfVvfGi_.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
