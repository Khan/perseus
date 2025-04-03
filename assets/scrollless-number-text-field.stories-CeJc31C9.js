import{j as e}from"./jsx-runtime-BT65X5dW.js";import{V as c}from"./index-CskvhqFA.js";import{L as i}from"./index-CbNKSLRm.js";import{r as V}from"./index-C6mWTJJr.js";import{S as s}from"./scrollless-number-text-field-BqR5S4dr.js";import"./no-important-DlFk8a1I.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-CieYLtDP.js";import"./index-B-CZbs2J.js";import"./index-C9RM_t1w.js";import"./index-CIHqsnLr.js";const U={title:"PerseusEditor/Components/Scrollless Number Text Field",component:s},t=n=>e.jsx(s,{...n}),C={value:"",onChange:()=>{}};t.args=C;const r={render:function(){const[a,l]=V.useState("");return e.jsx(s,{value:a,onChange:l})}};r.parameters={chromatic:{disableSnapshot:!0}};const o={render:function(){const[a,l]=V.useState("");return e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Scroll down to see the input."}),e.jsx(c,{style:{height:"100vh"}}),e.jsx(i,{children:"Observe that scrolling on the input field with a mouse wheel changes the number, but does not scroll the page."}),e.jsx(s,{value:a,onChange:l}),e.jsx(c,{style:{height:"100vh"}})]})}};o.parameters={chromatic:{disableSnapshot:!0}};t.__docgenInfo={description:`Uncontrolled story. Interact with the control panel to see the component
reflect the props.`,methods:[],displayName:"Default"};var p,u,d,h,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`(args): React.ReactElement => {
  return <ScrolllessNumberTextField {...args} />;
}`,...(d=(u=t.parameters)==null?void 0:u.docs)==null?void 0:d.source},description:{story:`Uncontrolled story. Interact with the control panel to see the component
reflect the props.`,...(m=(h=t.parameters)==null?void 0:h.docs)==null?void 0:m.description}}};var g,b,f,x,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = React.useState("");
    return <ScrolllessNumberTextField value={value} onChange={setValue} />;
  }
}`,...(f=(b=r.parameters)==null?void 0:b.docs)==null?void 0:f.source},description:{story:`Controlled story. The text field's state is managed by its parent.
Typing in the input field should work as expected.`,...(S=(x=r.parameters)==null?void 0:x.docs)==null?void 0:S.description}}};var w,v,y,L,j;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = React.useState("");
    return <>
                <LabelLarge>Scroll down to see the input.</LabelLarge>
                <View style={{
        height: "100vh"
      }} />
                <LabelLarge>
                    Observe that scrolling on the input field with a mouse wheel
                    changes the number, but does not scroll the page.
                </LabelLarge>
                <ScrolllessNumberTextField value={value} onChange={setValue} />
                <View style={{
        height: "100vh"
      }} />
            </>;
  }
}`,...(y=(v=o.parameters)==null?void 0:v.docs)==null?void 0:y.source},description:{story:`In this example, we can see how the input field behaves when it is placed
in a long page. Scrolling on the input field with a mouse wheel or trackpad
changes the number, but does not scroll the page.`,...(j=(L=o.parameters)==null?void 0:L.docs)==null?void 0:j.description}}};const q=["Default","Controlled","LongPageScroll"];export{r as Controlled,t as Default,o as LongPageScroll,q as __namedExportsOrder,U as default};
