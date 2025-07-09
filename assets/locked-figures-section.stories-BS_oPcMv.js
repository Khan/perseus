import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-BfGmgqQL.js";import{L as s}from"./locked-figures-section-BbrwNqrV.js";import{g as u}from"./util-ehWwi9-K.js";import"./heading-B1d5Xxfj.js";import"./toggleable-caret-BK0E61Ku.js";import"./color-select-BL-iSzCn.js";import"./Popper-B6Qw_wGp.js";import"./locked-ellipse-settings-BnvYtcfe.js";import"./item-version-BDaxewFE.js";import"./article-renderer-CN8BN6YT.js";import"./server-item-renderer-D3LnnBfW.js";import"./hints-renderer-DT9PPkpF.js";import"./components-B0sfFe2K.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-DuNqBrh9.js";import"./locked-label-settings-B2lUxUhK.js";import"./trash-bold-Brgr7b7T.js";import"./line-stroke-select-Ckyq44lU.js";import"./line-weight-select-BtJGrbfT.js";import"./locked-figure-aria-CFlU2oqz.js";import"./locked-function-settings-Bq1xenA5.js";import"./line-swatch-B3hM_3t_.js";import"./locked-line-settings-DqZmeCgR.js";import"./locked-point-settings-DA8w8tKn.js";import"./labeled-switch-CCJGdtN_.js";import"./locked-polygon-settings-DiMaEcSk.js";import"./locked-vector-settings-q7uCWSRi.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
