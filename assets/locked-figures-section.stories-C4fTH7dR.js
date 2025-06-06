import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-CdKw17cY.js";import{L as s}from"./locked-figures-section-ByLRV-5i.js";import{g as u}from"./util-0cUl0iG6.js";import"./heading-jLdVa31z.js";import"./toggleable-caret-DMRl3lzz.js";import"./color-select-B6jgMiF9.js";import"./Popper-COwVOKD4.js";import"./locked-ellipse-settings-CB0_0MVs.js";import"./item-version-M67OA0Xz.js";import"./article-renderer-CR-MsTDv.js";import"./server-item-renderer-DDcQhKB2.js";import"./hints-renderer-AS4jLqdB.js";import"./components-B_aY1Nxk.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-DRln1rGy.js";import"./locked-label-settings-C_7KH_kA.js";import"./trash-bold-Cu5qKUK7.js";import"./line-stroke-select-BuvoEUAG.js";import"./locked-figure-aria-DPcPcm5I.js";import"./locked-function-settings-gw0b0hu4.js";import"./line-swatch-D9cX1W51.js";import"./locked-line-settings-DJzfZbhz.js";import"./locked-point-settings-C6AzVMBC.js";import"./labeled-switch-gTe-eJA1.js";import"./locked-polygon-settings-Bt6UAIF2.js";import"./locked-vector-settings-BBq57NxO.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
