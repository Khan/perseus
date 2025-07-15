import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-DLWI6uzF.js";import{L as s}from"./locked-figures-section-BziV-CNA.js";import{g as u}from"./util-B7doZQq0.js";import"./heading-Nodwu4tg.js";import"./toggleable-caret-BrVuGfNB.js";import"./color-select-BWkKt7so.js";import"./Popper-Bq9O6c5f.js";import"./locked-ellipse-settings-BSuA_CGn.js";import"./item-version-BmTx6a5n.js";import"./article-renderer-qnvGESzG.js";import"./server-item-renderer-D4lOQ3Yn.js";import"./hints-renderer-BKzF6YmD.js";import"./components-CTYeY55B.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-BRbqCNc2.js";import"./locked-label-settings-BercU7fK.js";import"./trash-bold-CACcza_X.js";import"./line-stroke-select-CUqfxfHP.js";import"./line-weight-select-DcBGbIXv.js";import"./locked-figure-aria-J7X9XKLu.js";import"./locked-function-settings-FxmTafMQ.js";import"./line-swatch-DYTqmqYy.js";import"./locked-line-settings-B_h5ExAB.js";import"./locked-point-settings-DESIHqxq.js";import"./labeled-switch-QwjASxSN.js";import"./locked-polygon-settings-DdthoWqL.js";import"./locked-vector-settings-Cj9dxy8R.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
