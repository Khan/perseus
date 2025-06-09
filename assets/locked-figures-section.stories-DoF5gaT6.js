import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-DTktfcfm.js";import{L as s}from"./locked-figures-section-BVWCUJHa.js";import{g as u}from"./util-Bn69jzv6.js";import"./heading-ch1yxYo0.js";import"./toggleable-caret-DTKWgYtv.js";import"./color-select-DgKfqFoq.js";import"./Popper-DlaF0ENk.js";import"./locked-ellipse-settings-CVHmlFPX.js";import"./item-version-BvWhgKyI.js";import"./article-renderer-D4VzMFep.js";import"./server-item-renderer-CJUvzYwm.js";import"./hints-renderer-Dab54eyk.js";import"./components-B5t7-my3.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-B54fnWRI.js";import"./locked-label-settings-mKUISBaq.js";import"./trash-bold-CHhxdmM7.js";import"./line-stroke-select-BYns5wdv.js";import"./locked-figure-aria-CQfizhEc.js";import"./locked-function-settings-D_Zqd-ho.js";import"./line-swatch-DfW98qhs.js";import"./locked-line-settings-BhXd-jii.js";import"./locked-point-settings-tIq3Ieev.js";import"./labeled-switch-DJTlJ4P5.js";import"./locked-polygon-settings-CNGFe6tu.js";import"./locked-vector-settings-BP82AbKh.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
