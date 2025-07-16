import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-Av__LOls.js";import{L as s}from"./locked-figures-section-Dv79jiaI.js";import{g as u}from"./util-CCGhTNPr.js";import"./heading-CiiG0P4q.js";import"./toggleable-caret-DNzgtAzx.js";import"./color-select-02PaXCTn.js";import"./Popper-CA1_56rf.js";import"./locked-ellipse-settings-CO5LjbDH.js";import"./item-version-CHgavrtG.js";import"./article-renderer-C0sZ0ydP.js";import"./server-item-renderer-aIl7SK8E.js";import"./hints-renderer-C2VM9sFD.js";import"./components-BrYWmJxs.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-2FORyDxz.js";import"./locked-label-settings-CTtUMaUi.js";import"./trash-bold-rRr2v9fV.js";import"./line-stroke-select-CWY0Jjok.js";import"./line-weight-select-BPcx5QYg.js";import"./locked-figure-aria-dMeY4YzW.js";import"./locked-function-settings-DwzeAX5N.js";import"./line-swatch-5AzRRd-X.js";import"./locked-line-settings-D38duLHV.js";import"./locked-point-settings-CfvJO6PA.js";import"./labeled-switch-x2dzRBB-.js";import"./locked-polygon-settings-C3jGkoiF.js";import"./locked-vector-settings-M2V_1T4-.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
