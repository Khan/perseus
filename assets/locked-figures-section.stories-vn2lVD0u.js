import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-2mn_P961.js";import{L as s}from"./locked-figures-section-CUW_YxYT.js";import{g as u}from"./util-C7EwdJhK.js";import"./heading-C7VOD2cr.js";import"./toggleable-caret-B25jLAak.js";import"./color-select-Bm3BgliV.js";import"./Popper-wTckCh2k.js";import"./locked-ellipse-settings-5IKTjSPJ.js";import"./item-version-DM2DahxC.js";import"./article-renderer-BJ0ERF-7.js";import"./server-item-renderer-CZRgO9-K.js";import"./hints-renderer-Bi4cn4Bc.js";import"./components-Bu559I3z.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CalUj8jR.js";import"./locked-label-settings-BYBFCU4w.js";import"./trash-bold-CIICLN4v.js";import"./line-stroke-select-C1U6wmG4.js";import"./line-weight-select-Dk-mH1YW.js";import"./locked-figure-aria-C432q6hg.js";import"./locked-function-settings-Y-moHVZ3.js";import"./line-swatch-C9LjvkST.js";import"./locked-line-settings-CckEJ3Fa.js";import"./locked-point-settings-BpSrDWcD.js";import"./labeled-switch-BQddU1CS.js";import"./locked-polygon-settings-CCgQURro.js";import"./locked-vector-settings-Dl3Ukk_1.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
