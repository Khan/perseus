import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-YKV31o64.js";import{L as s}from"./locked-figures-section-q7JAgwbH.js";import{g as u}from"./util-ckYU2rVO.js";import"./heading-DosG8RGd.js";import"./toggleable-caret-BuWd1xiK.js";import"./color-select-DuLtDjT7.js";import"./Popper-BWTOPqNy.js";import"./locked-ellipse-settings-DVp-Td5a.js";import"./item-version-CXVZxRsh.js";import"./article-renderer-DqRsdQha.js";import"./server-item-renderer-UUlWUSLm.js";import"./hints-renderer-D-t2fIeV.js";import"./components-DeHeXBes.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-B-5jSEKO.js";import"./locked-label-settings-DUe-0Crc.js";import"./trash-bold-Deco_rzA.js";import"./line-stroke-select-BQLttffs.js";import"./locked-figure-aria-DiyTbo2R.js";import"./locked-function-settings-BFJKx1yg.js";import"./line-swatch-BKhf-5GR.js";import"./locked-line-settings-1BcEgNlR.js";import"./locked-point-settings-Dv7vnQw2.js";import"./labeled-switch-BmEUZMli.js";import"./locked-polygon-settings-BECfC7y0.js";import"./locked-vector-settings-B0gd72Mg.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
