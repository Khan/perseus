import{j as o,r as k,V as R,n as y,s as d,e as w}from"./iframe-C7PW0sis.js";import{L as s}from"./locked-figures-section-CL7WjbmT.js";import{g as u}from"./util-CZ-1dilU.js";import"./heading-CPkfh8c0.js";import"./toggleable-caret-Ca_NQ1rT.js";import"./color-select-D6FTkYE6.js";import"./Popper-ChXQ5gks.js";import"./locked-ellipse-settings-BG8J04k_.js";import"./item-version-DIeKpaj3.js";import"./article-renderer-BQoFzl2S.js";import"./server-item-renderer-DD0DwK9e.js";import"./hints-renderer-Ccd9Ou7K.js";import"./components-B6sji5Cj.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-5HwE-YEH.js";import"./locked-label-settings-CG5lhsLI.js";import"./perseus-editor-accordion-C1gIZO7M.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-B7G4JZ0N.js";import"./locked-figure-aria-BJchdu7I.js";import"./locked-function-settings-CCJS1dQ6.js";import"./line-swatch-CEPKNkkj.js";import"./locked-line-settings-ji0VnhxO.js";import"./locked-point-settings-BGE5MPk9.js";import"./labeled-switch-CHdK5mnq.js";import"./locked-polygon-settings-BflHKkJq.js";import"./locked-vector-settings-8s5b6Iq9.js";const te={title:"PerseusEditor/Components/Locked Figures Section",component:s},e=n=>o.jsx(s,{...n});e.args={};const r={render:function(){const[i,a]=k.useState([]),p=c=>{a(c.lockedFigures)};return o.jsx(s,{figures:i,onChange:p})}},t={render:function(){const[i,a]=k.useState([u("point"),u("line")]),p=c=>{a(c.lockedFigures)};return o.jsx(R,{style:D.prodSizeContainer,children:o.jsx(s,{figures:i,onChange:p})})}},_=310,C=10,j=_+2*C,D=y.StyleSheet.create({prodSizeContainer:{width:j,padding:C,marginInlineStart:d.medium_16,border:`1px solid ${w.offBlack32}`,borderRadius:d.xxxSmall_4}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,g,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
