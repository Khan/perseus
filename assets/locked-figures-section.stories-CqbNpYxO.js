import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-JwIKGAjj.js";import{L as s}from"./locked-figures-section--gZ_fCt_.js";import{g as u}from"./util-COBBksVd.js";import"./heading-D2iov7oc.js";import"./toggleable-caret-DV9XSWWj.js";import"./color-select-DAvFGwVO.js";import"./Popper-FXiokIzt.js";import"./locked-ellipse-settings-CHz66PGx.js";import"./item-version-ARiCEFOU.js";import"./article-renderer-9ES78zh7.js";import"./server-item-renderer-Ck3ZIC3R.js";import"./hints-renderer-B78aTo8X.js";import"./components-B97u6owF.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-COsXlPuF.js";import"./locked-label-settings-CiSqCmqO.js";import"./trash-bold-CB0SclRT.js";import"./line-stroke-select-wq2TFoSn.js";import"./locked-figure-aria-B91BmKgj.js";import"./locked-function-settings-yB0EkluS.js";import"./line-swatch-BAzH_MiP.js";import"./locked-line-settings-BeAiIkN5.js";import"./locked-point-settings-CiijpLaU.js";import"./labeled-switch-CtB3yO7C.js";import"./locked-polygon-settings-CU-D6jl5.js";import"./locked-vector-settings-B8I14FLE.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
