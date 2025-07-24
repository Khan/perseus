import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-JBJONHHl.js";import{L as s}from"./locked-figures-section-CbNJCW9Q.js";import{g as u}from"./util-YNxvp7px.js";import"./heading-D-j1hC6v.js";import"./toggleable-caret-CGOdYgso.js";import"./color-select-C0VutpKM.js";import"./Popper-C6tyzPej.js";import"./locked-ellipse-settings-DfR9UYfx.js";import"./item-version-DMyJMDPk.js";import"./article-renderer-ISec000u.js";import"./server-item-renderer-DM0y70U2.js";import"./hints-renderer-HTTi4Bca.js";import"./components-BhOs_jtJ.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-DOF6pgyb.js";import"./locked-label-settings-CYeWuF6E.js";import"./perseus-editor-accordion-BxmCKcMU.js";import"./caret-up-bold-DYHm6Jyl.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-CGq0wUFP.js";import"./line-weight-select-CEoMQR8j.js";import"./locked-figure-aria-sqeSPsJa.js";import"./locked-function-settings-Du_lf_k4.js";import"./line-swatch-D-BiY-6n.js";import"./locked-line-settings-D1fQIOlZ.js";import"./locked-point-settings-SmATkllp.js";import"./labeled-switch-BCXy64zS.js";import"./locked-polygon-settings-DRXtevl0.js";import"./locked-vector-settings-BPw3UGG3.js";const se={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(P=(x=t.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};const ne=["Default","Controlled","WithProdWidth"];export{r as Controlled,e as Default,t as WithProdWidth,ne as __namedExportsOrder,se as default};
