import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-o1pCwqXX.js";import{L as s}from"./locked-figures-section-hWCsp0iX.js";import{g as u}from"./util-CwtzpObJ.js";import"./heading-CojK7qhc.js";import"./toggleable-caret-BGLrXD5X.js";import"./color-select-CqogY1OW.js";import"./Popper-DFWX8J_S.js";import"./locked-ellipse-settings-tlXOthgq.js";import"./item-version-BAQ_i9c-.js";import"./article-renderer-lXMRMr8O.js";import"./server-item-renderer-DqXChjhQ.js";import"./hints-renderer-BLa8_CQu.js";import"./components-DJhNo76G.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-Do7us6uT.js";import"./locked-label-settings-NBObVULI.js";import"./trash-bold-DpTA5oLD.js";import"./line-stroke-select-C0m8ifdA.js";import"./locked-figure-aria-fsWeTzXe.js";import"./locked-function-settings-D_jOqr-i.js";import"./line-swatch-GXfkQ6EX.js";import"./locked-line-settings-CqKzrWa1.js";import"./locked-point-settings-BN05Vom5.js";import"./labeled-switch-CCO2prf8.js";import"./locked-polygon-settings-CqNzw8_3.js";import"./locked-vector-settings-CnrplYIy.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
