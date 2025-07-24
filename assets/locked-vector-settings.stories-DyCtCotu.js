import{j as i,r as E}from"./iframe-C-wjKudE.js";import{L as s}from"./locked-vector-settings-Bmjy4PBT.js";import{g as k}from"./util-llrT9vA5.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-Dr-Kty07.js";import"./item-version-a7DtHh5j.js";import"./article-renderer-B2JAE8o_.js";import"./server-item-renderer-DbBQSC2v.js";import"./hints-renderer-Dxk8feSH.js";import"./components-Vk11JFRY.js";import"./color-select-BQfLMAlG.js";import"./Popper-CzCRypv7.js";import"./scrollless-number-text-field-C3KDqXp5.js";import"./perseus-editor-accordion-hoHt6nwA.js";import"./trash-bold-BLGUig5L.js";import"./line-swatch-DE7CwASx.js";import"./line-weight-select-4PRs8gwm.js";import"./locked-figure-aria-Dd4TxHDD.js";const q={title:"PerseusEditor/Components/Locked Vector Settings",component:s},e=n=>i.jsx(s,{...n}),c={...k("vector"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=c;const o={render:function(){const[r,p]=E.useState(c),a=d=>{p({...r,...d})};return i.jsx(s,{...r,expanded:!0,onChangeProps:a})}},t={render:function(){const[r,p]=E.useState(c),a=d=>{p({...r,...d})};return i.jsx(s,{...r,points:[[0,0],[0,0]],expanded:!0,onChangeProps:a})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,u,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedVectorSettings {...args} />;
}`,...(l=(u=e.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};var P,g,h;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedVectorSettings {...props} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(h=(g=o.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,x,S,R,v;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedVectorSettings {...props} points={[[0, 0], [0, 0]]} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(S=(x=t.parameters)==null?void 0:x.docs)==null?void 0:S.source},description:{story:`If the two points defining the vector are the same, the vector is invalid
as that would give it a length of 0. An error message is displayed
in this case.`,...(v=(R=t.parameters)==null?void 0:R.docs)==null?void 0:v.description}}};const z=["Default","Expanded","WithInvalidPoints"];export{e as Default,o as Expanded,t as WithInvalidPoints,z as __namedExportsOrder,q as default};
