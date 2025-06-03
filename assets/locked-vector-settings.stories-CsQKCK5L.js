import{j as c,r as E}from"./iframe-CiZ4rom4.js";import{L as s}from"./locked-vector-settings-B-epqlxQ.js";import{g as k}from"./util-H5sE61uR.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-C_Cnfp2w.js";import"./item-version-DIvEicZT.js";import"./article-renderer-DEKiL95x.js";import"./server-item-renderer-BPtEzFPN.js";import"./hints-renderer-DUBe4pQj.js";import"./components-zJqkJmyj.js";import"./scrollless-number-text-field-D9uDYSfu.js";import"./trash-bold-CBNk1Rb_.js";import"./color-select-DEYIoEID.js";import"./line-swatch-ICDQTLM-.js";import"./locked-figure-aria-DsPtqjuL.js";const O={title:"PerseusEditor/Components/Locked Vector Settings",component:s},e=n=>c.jsx(s,{...n}),i={...k("vector"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=i;const o={render:function(){const[r,p]=E.useState(i),a=d=>{p({...r,...d})};return c.jsx(s,{...r,expanded:!0,onChangeProps:a})}},t={render:function(){const[r,p]=E.useState(i),a=d=>{p({...r,...d})};return c.jsx(s,{...r,points:[[0,0],[0,0]],expanded:!0,onChangeProps:a})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,u,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
in this case.`,...(v=(R=t.parameters)==null?void 0:R.docs)==null?void 0:v.description}}};const T=["Default","Expanded","WithInvalidPoints"];export{e as Default,o as Expanded,t as WithInvalidPoints,T as __namedExportsOrder,O as default};
