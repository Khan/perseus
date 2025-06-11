import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-B9Y7vzCP.js";import{L as s}from"./locked-figures-section-Dv-8u3O0.js";import{g as u}from"./util-B5dMkSHv.js";import"./heading-CTbg6Otk.js";import"./toggleable-caret-CICFKSdT.js";import"./color-select-fRo4Scor.js";import"./Popper-CPg4ycx6.js";import"./locked-ellipse-settings-DKmfb8gK.js";import"./item-version-DjfTV3sU.js";import"./article-renderer-Qt00rsy4.js";import"./server-item-renderer-qvZIhmuu.js";import"./hints-renderer-DMpno9jz.js";import"./components-DPPD5gWW.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-mQ-e5vcd.js";import"./locked-label-settings-BTe4ZWYt.js";import"./trash-bold-D-mo8Y8i.js";import"./line-stroke-select-BW8aVZ0a.js";import"./locked-figure-aria-CVbdorZ1.js";import"./locked-function-settings-Bi34T8mt.js";import"./line-swatch-DqttLEPb.js";import"./locked-line-settings-Dc7RUPdQ.js";import"./locked-point-settings-BWFE5M0x.js";import"./labeled-switch-D6W1hgog.js";import"./locked-polygon-settings-CSBJts-F.js";import"./locked-vector-settings-DG7wF9A1.js";const re={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
