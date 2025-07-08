import{j as e,r as V,L as c,V as i}from"./iframe-BGwaWJut.js";import{S as n}from"./scrollless-number-text-field-C9nyfk9m.js";const F={title:"PerseusEditor/Components/Scrollless Number Text Field",component:n},t=o=>e.jsx(n,{...o}),C={value:"",onChange:()=>{}};t.args=C;const r={render:function(){const[a,l]=V.useState("");return e.jsx(n,{value:a,onChange:l})}};r.parameters={chromatic:{disableSnapshot:!0}};const s={render:function(){const[a,l]=V.useState("");return e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Scroll down to see the input."}),e.jsx(i,{style:{height:"100vh"}}),e.jsx(c,{children:"Observe that scrolling on the input field with a mouse wheel changes the number, but does not scroll the page."}),e.jsx(n,{value:a,onChange:l}),e.jsx(i,{style:{height:"100vh"}})]})}};s.parameters={chromatic:{disableSnapshot:!0}};t.__docgenInfo={description:`Uncontrolled story. Interact with the control panel to see the component
reflect the props.`,methods:[],displayName:"Default"};var u,d,h,p,m;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
  return <ScrolllessNumberTextField {...args} />;
}`,...(h=(d=t.parameters)==null?void 0:d.docs)==null?void 0:h.source},description:{story:`Uncontrolled story. Interact with the control panel to see the component
reflect the props.`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.description}}};var g,b,x,f,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = React.useState("");
    return <ScrolllessNumberTextField value={value} onChange={setValue} />;
  }
}`,...(x=(b=r.parameters)==null?void 0:b.docs)==null?void 0:x.source},description:{story:`Controlled story. The text field's state is managed by its parent.
Typing in the input field should work as expected.`,...(S=(f=r.parameters)==null?void 0:f.docs)==null?void 0:S.description}}};var w,v,y,L,j;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(y=(v=s.parameters)==null?void 0:v.docs)==null?void 0:y.source},description:{story:`In this example, we can see how the input field behaves when it is placed
in a long page. Scrolling on the input field with a mouse wheel or trackpad
changes the number, but does not scroll the page.`,...(j=(L=s.parameters)==null?void 0:L.docs)==null?void 0:j.description}}};const N=["Default","Controlled","LongPageScroll"];export{r as Controlled,t as Default,s as LongPageScroll,N as __namedExportsOrder,F as default};
