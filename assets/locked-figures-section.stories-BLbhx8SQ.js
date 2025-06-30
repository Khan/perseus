import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-BFBE40jw.js";import{L as s}from"./locked-figures-section-CzWMPM_y.js";import{g as u}from"./util-DpNWkRrm.js";import"./heading-mZNtMeZl.js";import"./toggleable-caret-D3ue1a8q.js";import"./color-select-BFqrC3IC.js";import"./Popper-iHmo5qQ4.js";import"./locked-ellipse-settings-BgYz8i8m.js";import"./item-version-DPPrvkrd.js";import"./article-renderer-CEcI6UIH.js";import"./server-item-renderer-McPgKEqx.js";import"./hints-renderer-C00xdREK.js";import"./components-BKDWucW4.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-9Q1LO1WF.js";import"./locked-label-settings-BD8wS156.js";import"./trash-bold-Bkx6RHOP.js";import"./line-stroke-select-q8ljRCik.js";import"./locked-figure-aria-CFUE7Qjc.js";import"./locked-function-settings-ghjHOhKE.js";import"./line-swatch-BI4vYFVC.js";import"./locked-line-settings-9-A2oz8G.js";import"./locked-point-settings-CfJHaqW5.js";import"./labeled-switch-1-0SuBBy.js";import"./locked-polygon-settings-D4U-362l.js";import"./locked-vector-settings-kUJvDPfR.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
