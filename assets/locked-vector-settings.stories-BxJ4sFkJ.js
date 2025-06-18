import{j as i,r as E}from"./iframe-C7PW0sis.js";import{L as s}from"./locked-vector-settings-8s5b6Iq9.js";import{g as k}from"./util-CZ-1dilU.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-CG5lhsLI.js";import"./item-version-DIeKpaj3.js";import"./article-renderer-BQoFzl2S.js";import"./server-item-renderer-DD0DwK9e.js";import"./hints-renderer-Ccd9Ou7K.js";import"./components-B6sji5Cj.js";import"./color-select-D6FTkYE6.js";import"./Popper-ChXQ5gks.js";import"./scrollless-number-text-field-5HwE-YEH.js";import"./perseus-editor-accordion-C1gIZO7M.js";import"./trash-bold-BLGUig5L.js";import"./line-swatch-CEPKNkkj.js";import"./locked-figure-aria-BJchdu7I.js";const b={title:"PerseusEditor/Components/Locked Vector Settings",component:s},e=n=>i.jsx(s,{...n}),c={...k("vector"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=c;const o={render:function(){const[r,p]=E.useState(c),a=d=>{p({...r,...d})};return i.jsx(s,{...r,expanded:!0,onChangeProps:a})}},t={render:function(){const[r,p]=E.useState(c),a=d=>{p({...r,...d})};return i.jsx(s,{...r,points:[[0,0],[0,0]],expanded:!0,onChangeProps:a})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,u,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
in this case.`,...(v=(R=t.parameters)==null?void 0:R.docs)==null?void 0:v.description}}};const q=["Default","Expanded","WithInvalidPoints"];export{e as Default,o as Expanded,t as WithInvalidPoints,q as __namedExportsOrder,b as default};
