import{j as i,r as E}from"./iframe-BfGmgqQL.js";import{L as s}from"./locked-vector-settings-q7uCWSRi.js";import{g as k}from"./util-ehWwi9-K.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-B2lUxUhK.js";import"./item-version-BDaxewFE.js";import"./article-renderer-CN8BN6YT.js";import"./server-item-renderer-D3LnnBfW.js";import"./hints-renderer-DT9PPkpF.js";import"./components-B0sfFe2K.js";import"./color-select-BL-iSzCn.js";import"./Popper-B6Qw_wGp.js";import"./scrollless-number-text-field-DuNqBrh9.js";import"./trash-bold-Brgr7b7T.js";import"./line-swatch-B3hM_3t_.js";import"./line-weight-select-BtJGrbfT.js";import"./locked-figure-aria-CFlU2oqz.js";const b={title:"PerseusEditor/Components/Locked Vector Settings",component:s},e=n=>i.jsx(s,{...n}),c={...k("vector"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=c;const o={render:function(){const[r,p]=E.useState(c),a=d=>{p({...r,...d})};return i.jsx(s,{...r,expanded:!0,onChangeProps:a})}},t={render:function(){const[r,p]=E.useState(c),a=d=>{p({...r,...d})};return i.jsx(s,{...r,points:[[0,0],[0,0]],expanded:!0,onChangeProps:a})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,u,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
